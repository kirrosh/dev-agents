
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { divide } from "../modules/divide.js";

Deno.test("divide", () => {
  assertEquals(divide(10, 2), 5);
  assertEquals(divide(10, 0), Infinity);
});
