// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { readFile } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

// const r = solvePart1(readFile("./07/input-real.txt"), "lx");
// console.log(r);

describe("Day 07", () => {
  describe("Part 01", () => {
    test("test input", () =>
      strictEqual(solvePart1(readFile("./07/input-test1.txt"), "d"), 72));
    test("test input", () =>
      strictEqual(solvePart1(readFile("./07/input-test1.txt"), "e"), 507));
    test("test input", () =>
      strictEqual(solvePart1(readFile("./07/input-test1.txt"), "f"), 492));
    test("test input", () =>
      strictEqual(solvePart1(readFile("./07/input-test1.txt"), "g"), 114));
    test("test input", () =>
      strictEqual(solvePart1(readFile("./07/input-test1.txt"), "h"), 65412));
    test("test input", () =>
      strictEqual(solvePart1(readFile("./07/input-test1.txt"), "i"), 65079));
    test("test input", () =>
      strictEqual(solvePart1(readFile("./07/input-test1.txt"), "x"), 123));
    test("test input", () =>
      strictEqual(solvePart1(readFile("./07/input-test1.txt"), "y"), 456));
    test("real input", () =>
      strictEqual(solvePart1(readFile("./07/input-real.txt"), "dr"), 56763));
    test("real input", () =>
      strictEqual(solvePart1(readFile("./07/input-real.txt"), "fn"), 0));
    test("real input", () =>
      strictEqual(solvePart1(readFile("./07/input-real.txt"), "a"), 16076));
  });
  describe("Part 02", () => {
    test("real input", () =>
      strictEqual(solvePart2(readFile("./07/input-real.txt"), "a"), 2797));
  });
});
