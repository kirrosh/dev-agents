import { CheerioWebBaseLoader } from "npm:langchain@^0.0.127/document_loaders/web/cheerio";

export const svelteTutorialLoader = new CheerioWebBaseLoader(
  "https://learn.svelte.dev/tutorial/dynamic-attributes",
  {
    selector: "div.text",
  }
);

export const testLoader = async () => {
  const docs = await svelteTutorialLoader.load();

  console.log(docs);
  // save docs to file
  Deno.writeTextFileSync("./dist/docs.json", JSON.stringify(docs, null, 2));
};
