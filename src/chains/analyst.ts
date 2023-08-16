import { LLMChain } from "npm:langchain@^0.0.127/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";
import z from "https://deno.land/x/zod@v3.21.4/index.ts";
import { createStructuredOutputChainFromZod } from "npm:langchain@^0.0.127/chains/openai_functions";

export const analystZodSchema = z.object({
  tasks: z.array(
    z.object({
      index: z.number(),
      name: z.string(),
      moduleName: z.string(),
      description: z.string(),
      dependencies: z.array(z.number()),
    })
  ),
});

export type IAnalystOutput = z.infer<typeof analystZodSchema>;

const template = `
You are an analyst in a software development team.

Thoroughly understand the problem to identify its key components.
Merge similar tasks, removing unnecessary complexity.
Break down the solution into smallest meaningful tasks.
Ensure tasks can be worked on independently and concurrently.
Find the entry point to the solution, the first task to be done.
Identify task dependencies, marking tasks that others depend on.
Establish dependencies for tasks as needed, indicating task relationships.
Remove redundant tasks, avoid duplicate efforts.

Return list of tasks with uniqe name (camelCase), description, dependencies (number of task).
`;

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(template),
    HumanMessagePromptTemplate.fromTemplate("{problen}"),
  ],
  inputVariables: ["problen"],
});

export const analystChain = createStructuredOutputChainFromZod(
  analystZodSchema as any,
  {
    prompt,
    llm: openAIChatModel,
  }
);
// export const analystChain = new LLMChain({ llm: openAIChatModel, prompt });
// export const analystChain = new LLMChain({ llm: openAIChatModel, prompt });
