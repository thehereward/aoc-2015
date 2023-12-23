// @ts-check

/**
 * @param {number} n
 */
function uint16(n) {
  return n & 0xffff;
}

/**
 * @param {string[]} inputLines
 * @param {string} [solveFor]
 */
export function solvePart1(inputLines, solveFor) {
  const instructions = getInstructions(inputLines);
  return instructions.get(solveFor)(instructions);
}

/**
 * @param {string[]} inputLines
 * @param {string} [solveFor]
 */
export function solvePart2(inputLines, solveFor) {
  const instructions = getInstructions(inputLines);
  instructions.set("b", () => 16076);
  return instructions.get(solveFor)(instructions);
}

function getInstructions(inputLines) {
  const answers = new Map();
  const inst = inputLines
    .map((/** @type {string} */ line) => line.split(" -> "))
    .map((/** @type {string[]} */ i) => {
      const [expression, key] = i;
      if (expression.includes("NOT")) {
        return { key, fn: makeNot(expression) };
      } else if (expression.includes("AND")) {
        return { key, fn: makeAnd(expression) };
      } else if (expression.includes("OR")) {
        return { key, fn: makeOr(expression) };
      } else if (expression.includes("LSHIFT")) {
        return { key, fn: makeLshift(expression) };
      } else if (expression.includes("RSHIFT")) {
        return { key, fn: makeRshift(expression) };
      } else if (Number.isNaN(parseInt(expression))) {
        return { key, fn: makePassthrough(expression) };
      } else {
        return { key, fn: makeConstant(expression) };
      }
    })
    .reduce((a, c) => {
      a.set(c.key, (inst) => {
        if (!answers.has(c.key)) {
          answers.set(c.key, uint16(c.fn(inst)));
        }
        return answers.get(c.key);
      });
      return a;
    }, new Map());
  return inst;
}

function makeConstant(expression) {
  return () => uint16(parseInt(expression));
}

function makePassthrough(expression) {
  return (/** @type {Map<string, () => number>} */ signals) => {
    const f = signals.get(expression);

    if (!f) throw Error();

    // @ts-ignore
    return f(signals);
  };
}

function makeRshift(expression) {
  const [l, r] = expression.split(" RSHIFT ");
  return (/** @type {Map<string, () => number>} */ signals) => {
    const fl = signals.get(l);

    if (!fl) throw Error();

    // @ts-ignore
    return fl(signals) >> uint16(parseInt(r));
  };
}

function makeLshift(expression) {
  const [l, r] = expression.split(" LSHIFT ");
  return (/** @type {Map<string, () => number>} */ signals) => {
    const fl = signals.get(l);

    if (!fl) throw Error();
    // @ts-ignore
    return fl(signals) << uint16(parseInt(r));
  };
}

function makeOr(expression) {
  const [l, r] = expression.split(" OR ");
  return (/** @type {Map<string, () => number>} */ signals) => {
    const fl = signals.get(l);
    const fr = signals.get(r);

    if (!fl || !fr) throw Error();
    // @ts-ignore
    return fl(signals) | fr(signals);
  };
}

function makeAnd(expression) {
  const [l, r] = expression.split(" AND ");
  return (/** @type {Map<string, () => number>} */ signals) => {
    const fl = l == "1" ? () => 1 : signals.get(l);
    const fr = signals.get(r);

    if (!fl || !fr) throw Error();
    // @ts-ignore
    return fl(signals) & fr(signals);
  };
}

function makeNot(expression) {
  const r = expression.replace("NOT ", "");
  return (/** @type {Map<string, () => number>} */ signals) => {
    const f = signals.get(r);
    if (!f) throw Error();
    // @ts-ignore
    return ~f(signals);
  };
}
