import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "npm:langchain@^0.0.127/prompts";
import { openAIChatModel } from "../models/models.ts";
import z from "https://deno.land/x/zod@v3.21.4/index.ts";
import { createStructuredOutputChainFromZod } from "npm:langchain@^0.0.127/chains/openai_functions";

const baseSvelteComponentScheme = z.object({
  name: z.string(),
  description: z.string(),
  page: z.string().optional(),
  type: z.enum(["svelte-page", "svelte-component", "svelte-store"]),
  props: z.array(
    z.object({
      name: z.string(),
      type: z.enum(["string", "number", "boolean", "object"]),
      description: z.string(),
    })
  ),
});

type SvelteComponentsScheme = z.infer<typeof baseSvelteComponentScheme> & {
  children: SvelteComponentsScheme[];
};

const svelteComponentScheme: z.ZodType<SvelteComponentsScheme> =
  baseSvelteComponentScheme.extend({
    children: z.lazy(() => svelteComponentScheme.array()),
  });

export const specSchema = z.object({
  components: z.array(svelteComponentScheme),
});

export type ISvelteComponentOutput = z.infer<typeof specSchema>;

export type ISvelteComponentSpec = ISvelteComponentOutput["components"][0];
export type ISvelteComponentParentSpec = ISvelteComponentSpec & {
  code: string;
};

const template = `
  You are an analyst in a software development team.
  You are given a task to create specifications for a software.
  Thoroughly understand the problem to identify its key components.
    Identify the key components of the problem.
    Choose the name for each component (e.g. "Component").
    Choose the right component types for the problem.
    If component is belonging to a page, choose the page for it.
    
    If component should have input properties, choose the properties for it.
    Possible component types: 
    - Svelte page
        Component for a page in the application.
        Could contain Svelte components.
        Could contain Svelte stores.
    - Svelte component
        Svelte component with a specific functionality.
        Could contain Svelte components.
        Could contain Svelte stores.
    - Svelte store
        Svelte store for storing data.

    If component is using functionality of another component, make sure to include it as a dependency components list.
  `;

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(template),
    HumanMessagePromptTemplate.fromTemplate("{task}"),
  ],
  inputVariables: ["task"],
});

export const specChain = createStructuredOutputChainFromZod(specSchema as any, {
  prompt,
  llm: openAIChatModel,
});
