import { LLMChain } from "npm:langchain@^0.0.127/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";

const template = `
You will assume the role of a software developer.
Task has a name, description and a list of available modules.
Each module contains a list of functions that you can use.
Import from modules only the functions that you need.
Import from each module separately.
Example for importing module:
import {{functionName}} from "./modules/{{moduleName}}.js";

Example for using function:
functionName(...);

You are allowed to use only the JavaScript programming language for solving the tasks.
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

export const developerChain = new LLMChain({ llm: openAIChatModel, prompt });
