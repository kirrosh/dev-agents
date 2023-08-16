import { SimpleSequentialChain } from "langchain/chains";
import { IAnalystOutput, analystChain } from "./src/chains/analyst.ts";
import { developerChain } from "./src/chains/developer.ts";
import { moduleDeveloperChain } from "./src/chains/module-developer.ts";
import { parseMarkdownCode } from "./parseMarkdownCode.ts";
import { unitTestChain } from "./src/chains/unit-test.ts";

// remove folder ./dist
Deno.removeSync("./dist", { recursive: true });

// create folder ./dist
Deno.mkdirSync("./dist");
// creatae folder ./dist/modules
Deno.mkdirSync("./dist/modules");
// creatae folder ./dist/tests
Deno.mkdirSync("./dist/tests");

const overallChain = new SimpleSequentialChain({
  chains: [analystChain],
  verbose: true,
});

const response = (await overallChain.run(`
  Task: 
  Create a calculator that can perform basic arithmetic operations, calculate the factorial of a number, and calculate the square of a number.

  ### Examples of Usage:
  
  1. **Basic Arithmetic Operations:**
     - Input: \`calculator.add(5, 3)\`
     - Output: \`8\`
  
     - Input: \`calculator.subtract(10, 4)\`
     - Output: \`6\`
  
     - Input: \`calculator.multiply(7, 2)\`
     - Output: \`14\`
  
     - Input: \`calculator.divide(20, 5)\`
     - Output: \`4\`
  
  2. **Factorial Calculation:**
     - Input: \`calculator.factorial(5)\`
     - Output: \`120\` (since 5! = 5 * 4 * 3 * 2 * 1 = 120)
  
     - Input: \`calculator.factorial(0)\`
     - Output: \`1\` (by convention, 0! is defined as 1)
  
  3. **Square Calculation:**
     - Input: \`calculator.square(9)\`
     - Output: \`81\` (since 9^2 = 9 * 9 = 81)
  
     - Input: \`calculator.square(0)\`
     - Output: \`0\` (any number squared is 0)
  
  ### Test Cases:
  
  1. **Basic Arithmetic Operations:**
     - Test Case 1:
       - Input: \`calculator.add(15, 7)\`
       - Expected Output: \`22\`
  
     - Test Case 2:
       - Input: \`calculator.subtract(30, 10)\`
       - Expected Output: \`20\`
  
     - Test Case 3:
       - Input: \`calculator.multiply(6, 4)\`
       - Expected Output: \`24\`
  
     - Test Case 4:
       - Input: \`calculator.divide(50, 2)\`
       - Expected Output: \`25\`
  
  2. **Factorial Calculation:**
     - Test Case 1:
       - Input: \`calculator.factorial(4)\`
       - Expected Output: \`24\` (4! = 4 * 3 * 2 * 1 = 24)
  
     - Test Case 2:
       - Input: \`calculator.factorial(7)\`
       - Expected Output: \`5040\` (7! = 7 * 6 * 5 * 4 * 3 * 2 * 1 = 5040)
  
  3. **Square Calculation:**
     - Test Case 1:
       - Input: \`calculator.square(11)\`
       - Expected Output: \`121\`
  
     - Test Case 2:
       - Input: \`calculator.square(2.5)\`
       - Expected Output: \`6.25\` (2.5^2 = 6.25)
  
  Remember that when implementing these test cases, you need to compare the calculated output with the expected output and ensure they match. These examples and test cases cover a range of scenarios to ensure that your calculator functions correctly for different inputs and operations.
`)) as any as IAnalystOutput;

const tasks = response.tasks;

if (tasks) {
  const mainTask = tasks[0];
  const dependencies = tasks.filter((t) => t.dependencies.length > 0);
  const message = `
Task: ${mainTask.description}
Available modules: 
${dependencies
  .map((dependentTask) => {
    return `${dependentTask.name} - ${dependentTask.description} `;
  })
  .join("\n")}
`;

  const res = await developerChain.run(message);
  const parsedRes = parseMarkdownCode(res);
  Deno.writeTextFileSync(`dist/result.js`, parsedRes);

  for (const dependentTask of dependencies) {
    const moduleMessage = `
Task: ${dependentTask.description}
Example of ${dependentTask.name}:
${res}
  `;

    const moduleRes = await moduleDeveloperChain.run(moduleMessage);
    const unitTestRes = await unitTestChain.run(moduleMessage);
    const parsed = parseMarkdownCode(moduleRes);
    const parsedTest = parseMarkdownCode(unitTestRes);
    Deno.writeTextFileSync(`dist/modules/${dependentTask.name}.js`, parsed);
    Deno.writeTextFileSync(
      `dist/tests/${dependentTask.name}.test.js`,
      parsedTest
    );
  }
}

const res = JSON.stringify(response);
Deno.writeTextFileSync("dist/result.json", res);
console.log(res);
