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
      description: z.string(),
      units: z.array(z.string()),
      type: z.enum(["unit", "module"]),
    })
  ),
});

export type IAnalystOutput = z.infer<typeof analystZodSchema>;

const template = `
You are an analyst in a software development team.
Thoroughly understand the problem to identify its key components.
Break down the solution into smallest meaningful components.
You can use 2 types of components: "unit" and "module".
Unit is a small piece of code that does one thing and does it well.
Module is a collection of units that solves a specific problem.
Define the entry point of the solution and create a "module" component for it.
Remove redundant components, avoid duplicate efforts.
If module is using functionality of unit, make sure to include it as a dependency.
Give task unique name (camelCase).
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
