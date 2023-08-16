import {
  LengthBasedExampleSelector,
  PromptTemplate,
} from "npm:langchain@^0.0.127/prompts";

export const denoTestExamplePrompt = new PromptTemplate({
  inputVariables: ["code", "test"],
  template: `
        Code: ${"code"}

        Test: ${"test"}
    `,
});

export const denoTestExampleSelector =
  await LengthBasedExampleSelector.fromExamples(
    [
      {
        code: `
        export function add(num1, num2) {
            return num1 + num2;
          }
        `,
        test: `
        Deno.test("add", () => {
            const result = add(1, 2);
            assertEquals(result, 3);
          });
          `,
      },
      {
        code: `
        export function subtract(num1, num2) {
            return num1 - num2;
          }
          `,
        test: `
        Deno.test("subtract", () => {
            const result = subtract(10, 5);
            assertEquals(result, 5);
          });
          `,
      },
    ],
    {
      examplePrompt: denoTestExamplePrompt,
      maxLength: 25,
    }
  );
