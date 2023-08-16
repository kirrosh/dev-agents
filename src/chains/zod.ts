import { createStructuredOutputChainFromZod } from "langchain/chains/openai_functions";

import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

const zodSchema = z.object({
  functions: z.array(
    z.object({
      name: z.string(),
      isPure: z.boolean(),
      description: z.string(),
      example: z.string(),
      inputParameters: z.array(
        z.object({
          name: z.string(),
          type: z.string(),
          description: z.string(),
        })
      ),
      outputParameters: z.array(
        z.object({
          name: z.string(),
          type: z.string(),
          description: z.string(),
        })
      ),
    })
  ),
});

const template = `You are an software architect. 
You are given an algorytm. 
You need to create a set of functions that will solve the problem.
Think in a functional programming paradigm.
Try to create functions that are as generic as possible.
Functions should be as small as possible, be reusable and have a single responsibility.
Functions preferably should not have side effects.
`;

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(template),
    HumanMessagePromptTemplate.fromTemplate("{algorytm}"),
  ],
  inputVariables: ["algorytm"],
});

export const zodChain = createStructuredOutputChainFromZod(zodSchema as any, {
  prompt,
  llm: openAIChatModel,
});
