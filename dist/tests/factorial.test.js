
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { factorial } from "../modules/factorial.js";

Deno.test("factorial", () => {
  assertEquals(factorial(0), 1);
  assertEquals(factorial(1), 1);
  assertEquals(factorial(5), 120);
  assertEquals(factorial(10), 3628800);
});
