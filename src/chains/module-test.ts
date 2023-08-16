import { LLMChain } from "npm:langchain@^0.0.127/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";

const template = `
You will assume the role of a software developer.
You will be provided with an implementation of module.
You need to implement only unit tests for module.
You have to write unit tests for all functions in the module.
Everything else will be implemented by other developers.

You are allowed to use only the JavaScript programming language for solving the tasks.
You are allowed to use only https://deno.land/std@0.198.0/assert/mod.ts package. Import all you need from it and only.
Example: 

Deno.test("divide", () => {{
    assertEquals(divide(10, 2), 5);
    assertEquals(divide(10, 0), 5);
  }});

Imagine that code will be placed in the file \`tests/[module].test.js\` so you have to import any functionaliy from @/dist/modules/[module].js folder

Generate code in the Markdown format like:
\`\`\`javascript

\`\`\`

`;

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(template),
    HumanMessagePromptTemplate.fromTemplate("{task}"),
  ],
  inputVariables: ["task"],
});

export const unitTestChain = new LLMChain({
  llm: openAIChatModel,
  prompt,
});
