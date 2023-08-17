import {
  ISvelteComponentOutput,
  ISvelteComponentParentSpec,
  ISvelteComponentSpec,
  specChain,
} from "@/src/svlete/spec-chain.ts";
import { generateSveltePage } from "@/src/svlete/svelte-page-gen.ts";
import { generateSvelteComponent } from "@/src/svlete/svelte-component-gen.ts";
import { testLoader } from "@/src/loaders/cheerio.ts";

Deno.removeSync("./dist", { recursive: true });
Deno.mkdirSync("./dist");
Deno.mkdirSync("./dist/pages");

// const overallChain = new SimpleSequentialChain({
//   chains: [analystChain],
//   verbose: true,
// });

// const spec = (await specChain.run(`
// Task:
//   Create a page for a calculator.
//   Project Structure:

//   <CalculatorPage
//     <Header [title: string]
//     <Calculator
//     <Footer [author: string]

// `)) as any as ISvelteComponentOutput;

// const spec = JSON.parse(
//   Deno.readTextFileSync("./spec.json")
// ) as ISvelteComponentOutput;

// const res = JSON.stringify(response);
// Deno.writeTextFileSync("dist/spec.json", JSON.stringify(spec));
// testStore();
testLoader();
// const tasks = spec.components;

// for (const task of tasks) {
//   await generateTask(task);
// }

// async function generateTask(
//   task: ISvelteComponentSpec,
//   parent?: ISvelteComponentParentSpec
// ) {
//   if (task.type === "svelte-page") {
//     const res = await generateSveltePage(task);
//     if (res.children) {
//       for (const child of res.children) {
//         if (child) {
//           await generateTask(child, res);
//         }
//       }
//     }
//   } else if (task.type === "svelte-component") {
//     await generateSvelteComponent(task, parent);
//   }
// }
