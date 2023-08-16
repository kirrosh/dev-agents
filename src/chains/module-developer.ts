import { LLMChain } from "npm:langchain@^0.0.127/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";

const template = `
You will assume the role of a software developer.
Task has a name, description.
Implement only what is described in the task.
Everything else will be implemented by other developers.
You write a module that will be used by other developers.
You will be provided with a code example that uses your module.
You should export all what is needed from your module.

You are allowed to use only the JavaScript programming language for solving the tasks.
Add JSDoc comments to your code.
Generate code in the Markdown format like:
\`\`\`javascript

\`\`\`
  `;

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(template),
    HumanMessagePromptTemplate.fromTemplate("{tasks}"),
  ],
  inputVariables: ["tasks"],
});

export const moduleDeveloperChain = new LLMChain({
  llm: openAIChatModel,
  prompt,
});
