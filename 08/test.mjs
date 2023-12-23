// @ts-check
import { strictEqual } from "node:assert";
import { describe, test } from "node:test";

import { readFile } from "../utils.mjs";

import { solvePart1, solvePart2 } from "./index.mjs";

describe("Day 08", () => {
  describe("Part 01", () => {
    test("test input", () =>
      strictEqual(solvePart1(readFile("./08/input-test1.txt")), 12));
    test("real input", () =>
      strictEqual(solvePart1(readFile("./08/input-real.txt")), 1342));
  });
  describe("Part 08", () => {
    test("test input", () =>
      strictEqual(solvePart2(readFile("./08/input-test1.txt")), 19));
    test("real input", () =>
      strictEqual(solvePart2(readFile("./08/input-real.txt")), 2074));
  });
});
