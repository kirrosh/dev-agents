
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { subtract } from "../modules/subtract.js";

Deno.test("subtract", () => {
  assertEquals(subtract(5, 3), 2);
  assertEquals(subtract(10, 5), 5);
  assertEquals(subtract(0, 0), 0);
  assertEquals(subtract(-5, -3), -2);
  assertEquals(subtract(-10, 5), -15);
});
