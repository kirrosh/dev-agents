import { LLMChain } from "npm:langchain@^0.0.127/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";
import { ISvelteComponentSpec } from "@/src/svlete/spec-chain.ts";
import { parseMarkdownCode } from "@/parseMarkdownCode.ts";

const template = `
You will assume the role of a software developer.
You can only create a page component on Svelte fraimwork.
You got a description of components that you have to write.
Add JSDoc comments in script tag.
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

export async function generateSveltePage(page: ISvelteComponentSpec) {
  const message = `
    Name: ${page.name}
    Description: ${page.description}
    Children: ${page.children?.map((a) => a.name).join(", ") || "none"}
    `;
  const res = await sveltePageChain.run(message);
  const parsedRes = parseMarkdownCode(res, "svelte");
  try {
    Deno.mkdirSync(`./dist/pages/${page.page}`);
  } catch {}
  Deno.writeTextFileSync(`./dist/pages/${page.page}/+page.svelte`, parsedRes);
  return {
    ...page,
    code: parsedRes,
  };
}
