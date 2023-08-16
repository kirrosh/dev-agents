
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { calculator } from "@/dist/modules/calculator.js";

Deno.test("add", () => {
  assertEquals(calculator.add(2, 3), 5);
  assertEquals(calculator.add(-2, 3), 1);
  assertEquals(calculator.add(0, 0), 0);
});

Deno.test("subtract", () => {
  assertEquals(calculator.subtract(5, 3), 2);
  assertEquals(calculator.subtract(3, 5), -2);
  assertEquals(calculator.subtract(0, 0), 0);
});

Deno.test("multiply", () => {
  assertEquals(calculator.multiply(2, 3), 6);
  assertEquals(calculator.multiply(-2, 3), -6);
  assertEquals(calculator.multiply(0, 0), 0);
});

Deno.test("divide", () => {
  assertEquals(calculator.divide(6, 3), 2);
  assertEquals(calculator.divide(6, -3), -2);
  assertEquals(calculator.divide(0, 5), 0);
});

Deno.test("factorial", () => {
  assertEquals(calculator.factorial(0), 1);
  assertEquals(calculator.factorial(1), 1);
  assertEquals(calculator.factorial(5), 120);
});
