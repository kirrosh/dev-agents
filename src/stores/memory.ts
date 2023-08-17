import { TextLoader } from "npm:langchain@^0.0.127/document_loaders/fs/text";
import { OpenAIEmbeddings } from "npm:langchain@^0.0.127/embeddings/openai";
import { MemoryVectorStore } from "npm:langchain@^0.0.127/vectorstores/memory";
import { openAIApiKey } from "@/src/models/models.ts";
import { svelteTutorialLoader } from "@/src/loaders/cheerio.ts";

const docs = await svelteTutorialLoader.load();

// Load the docs into the vector store
export const memoryStore = await MemoryVectorStore.fromDocuments(
  docs,
  new OpenAIEmbeddings({
    openAIApiKey,
    verbose: true,
  })
);

// Search for the most similar document
// const resultOne = await vectorStore.similaritySearch("hello world", 1);

// console.log(resultOne);
