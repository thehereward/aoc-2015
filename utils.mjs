// @ts-check

import { readFileSync } from "fs";
import { EOL } from "os";

/**
 * @param {import("fs").PathOrFileDescriptor} filename
 */
export function readFile(filename) {
  try {
    var data = readFileSync(filename, "utf8");
    return data.split(EOL);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const logEach = (/** @type {any} */ line) => {
  console.log(line);
  return line;
};
