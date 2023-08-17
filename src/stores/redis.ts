import { createClient, createCluster } from "npm:redis";

import { svelteTutorialLoader } from "@/src/loaders/cheerio.ts";
import { RedisVectorStore } from "npm:langchain@^0.0.127/vectorstores/redis";
import { OpenAIEmbeddings } from "npm:langchain@^0.0.127/embeddings/openai";
import { openAIApiKey } from "@/src/models/models.ts";

// import redis from deno

const client = createClient({
  url: "redis://localhost:6379",
});
await client.connect();

const docs = await svelteTutorialLoader.load();

export const redisStore = await RedisVectorStore.fromDocuments(
  docs,
  new OpenAIEmbeddings({
    openAIApiKey,
  }),
  {
    redisClient: client,
    indexName: "docs",
  }
);

// await client.disconnect();
