import { load } from "https://deno.land/std@0.198.0/dotenv/mod.ts";
import { ChatOpenAI } from "npm:langchain@^0.0.127/chat_models/openai";

const env = await load();
const openAIApiKey = env["OPENAI_API_KEY"];

export const openAIChatModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-0613",
  temperature: 0,
  openAIApiKey,
});
