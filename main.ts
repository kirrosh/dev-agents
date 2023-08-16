import { IAnalystOutput, analystChain } from "@/src/chains/analyst.ts";
import { parseMarkdownCode } from "@/parseMarkdownCode.ts";
import { moduleChain } from "@/src/chains/module.ts";
import { unitChain } from "@/src/chains/unit.ts";
import { SimpleSequentialChain } from "npm:langchain@^0.0.127/chains";
import { unitTestChain } from "@/src/chains/module-test.ts";

// remove folder ./dist
Deno.removeSync("./dist", { recursive: true });
// create folder ./dist
Deno.mkdirSync("./dist");
// creatae folder ./dist/modules
Deno.mkdirSync("./dist/modules");
// creatae folder ./dist/modules
Deno.mkdirSync("./dist/units");
// creatae folder ./dist/tests
Deno.mkdirSync("./dist/tests");

const overallChain = new SimpleSequentialChain({
  chains: [analystChain],
  verbose: true,
});

// const response = (await overallChain.run(`
//   Task:
//   Create a calculator.
//   Calculator should be a single object with methods to perform the following operations:
//   - Addition
//   - Subtraction
//   - Multiplication
//   - Division
//   - Factorial

// `)) as any as IAnalystOutput;

const response = JSON.parse(
  Deno.readTextFileSync("./result.json")
) as IAnalystOutput;

const res = JSON.stringify(response);
Deno.writeTextFileSync("dist/result.json", res);
console.log(res);

const tasks = response.tasks;

if (tasks) {
  tasks.forEach(async (task) => {
    if (task.type === "module") {
      await makeModuleComponent(task);
    } else if (task.type === "unit") {
      await makeUnitTestComponent(task);
    }
  });
}

async function makeModuleComponent(module: IAnalystOutput["tasks"][0]) {
  const message = `
Name: ${module.name}
Description: ${module.description}
Available units:
${module.units.map((u) => `- ${u}`).join("\n")}
`;

  const res = await moduleChain.run(message);
  const parsedRes = parseMarkdownCode(res);
  Deno.writeTextFileSync(`./dist/modules/${module.name}.js`, parsedRes);
  const moduleTestMessage = `
Name: ${module.name}
Description: ${module.description}
Implementation:
${res}
`;
  const moduleTestRes = await unitTestChain.run(moduleTestMessage);
  const parsedModuleTestRes = parseMarkdownCode(moduleTestRes);
  Deno.writeTextFileSync(
    `./dist/tests/${module.name}.test.js`,
    parsedModuleTestRes
  );
}

async function makeUnitTestComponent(unit: IAnalystOutput["tasks"][1]) {
  const unitMessage = `
  Name: ${unit.name}
  Description: ${unit.description}
    `;
  const unitRes = await unitChain.run(unitMessage);
  const parsed = parseMarkdownCode(unitRes);
  Deno.writeTextFileSync(`./dist/units/${unit.name}.js`, parsed);
}
