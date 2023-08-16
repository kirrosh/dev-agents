
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { add } from "../modules/add.js";

Deno.test("add", () => {
  assertEquals(add(5, 3), 8);
  assertEquals(add(-5, 3), -2);
  assertEquals(add(0, 0), 0);
  assertEquals(add(0.5, 0.5), 1);
});
