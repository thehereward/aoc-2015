// @ts-check

/**
 * @param {number} n
 */
function uint16(n) {
  return n & 0xffff;
}

const sum = (/** @type {number} */ a, /** @type {number} */ b) => a + b;
/**
 * @param {string[]} inputLines
 */
export function solvePart1(inputLines) {
  const rawLengths = inputLines.map((line) => line.length).reduce(sum);
  const actualLengths = inputLines
    .map((line) => line.slice(1, line.length - 1))
    .map((line) => line.replace(/[\\]{2}/g, "B"))
    .map((line) => line.replace(/\\\"/g, '"'))
    .map((line) => line.replace(/\\x[0-9a-f]{2}/g, "X"))
    .map((line) => line.length)
    .reduce(sum);
  return rawLengths - actualLengths;
}

/**
 * @param {string[]} inputLines
 */
export function solvePart2(inputLines) {
  const rawLengths = inputLines.map((line) => line.length).reduce(sum);
  const encodedLengths = inputLines
    .map((line) => line.replace(/[\\]{1}/g, "BB"))
    .map((line) => line.replace(/\"/g, "QQ"))
    .map((line) => line.length + 2)
    .reduce(sum);
  return encodedLengths - rawLengths;
}
