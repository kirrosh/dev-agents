
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { square } from "../modules/square.js";

Deno.test("square", () => {
  assertEquals(square(0), 0);
  assertEquals(square(1), 1);
  assertEquals(square(2), 4);
  assertEquals(square(3), 9);
  assertEquals(square(4), 16);
});
