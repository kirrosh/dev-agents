import { LLMChain } from "npm:langchain@^0.0.127/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";
import {
  ISvelteComponentParentSpec,
  ISvelteComponentSpec,
} from "@/src/svlete/spec-chain.ts";
import { parseMarkdownCode } from "@/parseMarkdownCode.ts";

const template = `
You will assume the role of a software developer.
You can only create a component on Svelte fraimwork.
Add JSDoc comments in script tag.
You got a description of components that you have to write.

Generate code in the Markdown format like:
\`\`\`svelte
...
\`\`\`
  `;

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(template),
    HumanMessagePromptTemplate.fromTemplate("{tasks}"),
  ],
  inputVariables: ["tasks"],
});

export const sveltePageChain = new LLMChain({ llm: openAIChatModel, prompt });

export async function generateSvelteComponent(
  component: ISvelteComponentSpec,
  parent?: ISvelteComponentParentSpec
) {
  const message = `
    Name: ${component.name}
    Description: ${component.description}
    Children: ${component.children?.map((a) => a.name).join(", ") || "none"}

    Usage in other components: 
      Name: ${parent?.name || "none"}
      Page: ${parent?.page || "none"}
      Code: 
      \`\`\`svelte
        ${parent?.code || "none"}
      \`\`\`
    `;
  const res = await sveltePageChain.run(message);
  const parsedRes = parseMarkdownCode(res, "svelte");
  try {
    Deno.mkdirSync(`./dist/pages/${component.page}`);
  } catch (e) {}
  Deno.writeTextFileSync(
    `./dist/pages/${component.page}/${component.name}.svelte`,
    parsedRes
  );
}
