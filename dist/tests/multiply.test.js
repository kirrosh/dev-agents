
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { multiply } from "../modules/multiply.js";

Deno.test("multiply", () => {
  assertEquals(multiply(5, 3), 15);
  assertEquals(multiply(0, 10), 0);
  assertEquals(multiply(-5, 4), -20);
  assertEquals(multiply(2.5, 2), 5);
});
