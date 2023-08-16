import { LLMChain } from "npm:langchain@^0.0.127/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";

const template = `
You will assume the role of a software developer.

You got a description of components that you have to write.
There are 2 types of components: "unit" and "module".
Unit is a small piece of code that does one thing and does it well.
Module is a collection of units that solves a specific problem.

You have to write a unit.
Unit should export all functionality just with word "export".
like this:
export const myUnit = () => {{
  // your code here
}};

Add JSDoc comments to your code.
Generate code in the Markdown format like:
\`\`\`javascript
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

export const unitChain = new LLMChain({ llm: openAIChatModel, prompt });