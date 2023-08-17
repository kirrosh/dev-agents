import { openAIModel } from "@/src/models/models.ts";
import { RetrievalQAChain } from "npm:langchain@^0.0.127/chains";
import { parseMarkdownCode } from "@/parseMarkdownCode.ts";
import { RecursiveCharacterTextSplitter } from "npm:langchain@^0.0.127/text_splitter";
import { svelteTutorialLoader } from "@/src/loaders/cheerio.ts";
import { redisStore } from "@/src/stores/redis.ts";
try {
  Deno.removeSync("./dist", { recursive: true });
} catch (e) {}
Deno.mkdirSync("./dist");
const loaded = await svelteTutorialLoader.load();
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

const vectorStoreRetriever = redisStore.asRetriever();

// Create a chain that uses the OpenAI LLM and HNSWLib vector store.
// const chain = RetrievalQAChain.fromLLM(openAIModel, vectorStoreRetriever);
// const res = await chain.call({
//   query: "What did the president say about Justice Breyer?",
// });
// console.log({ res });

const chain = RetrievalQAChain.fromLLM(openAIModel, vectorStoreRetriever);
const res = await chain.call({
  query: `
  You will assume the role of a software developer.
  You can only create a component on Svelte fraimwork.

Create simple Svelte component.
Generate code in the Markdown format like:
\`\`\`svelte
...
\`\`\`
  `,
});

console.log(res);

const parsed = parseMarkdownCode(res.text, "svelte");

// // save res to file
Deno.writeTextFileSync("./dist/res.svelte", parsed);
