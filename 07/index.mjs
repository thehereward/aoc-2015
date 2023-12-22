// @ts-check

import exp from "constants";

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
  const answers = new Map();
  const inst = inputLines
    .map((/** @type {string} */ line) => line.split(" -> "))
    .map((/** @type {string[]} */ i) => {
      const [expression, key] = i;
      if (expression.includes("NOT")) {
        const r = expression.replace("NOT ", "");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const f = signals.get(r);
          if (!f) throw Error();
          // @ts-ignore
          return ~f(signals);
        };
        return { key, fn };
      } else if (expression.includes("AND")) {
        const [l, r] = expression.split(" AND ");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const fl = l == "1" ? () => 1 : signals.get(l);
          const fr = signals.get(r);

          if (!fl || !fr) throw Error();
          // @ts-ignore
          return fl(signals) & fr(signals);
        };
        return { key, fn };
      } else if (expression.includes("OR")) {
        const [l, r] = expression.split(" OR ");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const fl = signals.get(l);
          const fr = signals.get(r);

          if (!fl || !fr) throw Error();
          // @ts-ignore
          return fl(signals) | fr(signals);
        };
        return { key, fn };
      } else if (expression.includes("LSHIFT")) {
        const [l, r] = expression.split(" LSHIFT ");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const fl = signals.get(l);

          if (!fl) throw Error();
          // @ts-ignore
          return fl(signals) << uint16(parseInt(r));
        };
        return { key, fn };
      } else if (expression.includes("RSHIFT")) {
        const [l, r] = expression.split(" RSHIFT ");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const fl = signals.get(l);

          if (!fl) throw Error();

          // @ts-ignore
          return fl(signals) >> uint16(parseInt(r));
        };
        return { key, fn };
      } else if (Number.isNaN(parseInt(expression))) {
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const f = signals.get(expression);

          if (!f) throw Error();

          // @ts-ignore
          return f(signals);
        };
        return {
          key,
          fn,
        };
      } else {
        return {
          key,
          fn: () => uint16(parseInt(expression)),
        };
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

  return inst.get(solveFor)(inst);
}

/**
 * @param {string[]} inputLines
 * @param {string} [solveFor]
 */
export function solvePart2(inputLines, solveFor) {
  const answers = new Map();
  const inst = inputLines
    .map((line) => (line.endsWith("-> b") ? "16076 -> b" : line))
    .map((/** @type {string} */ line) => line.split(" -> "))
    .map((/** @type {string[]} */ i) => {
      const [expression, key] = i;
      if (expression.includes("NOT")) {
        const r = expression.replace("NOT ", "");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const f = signals.get(r);
          if (!f) throw Error();
          // @ts-ignore
          return ~f(signals);
        };
        return { key, fn };
      } else if (expression.includes("AND")) {
        const [l, r] = expression.split(" AND ");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const fl = l == "1" ? () => 1 : signals.get(l);
          const fr = signals.get(r);

          if (!fl || !fr) throw Error();
          // @ts-ignore
          return fl(signals) & fr(signals);
        };
        return { key, fn };
      } else if (expression.includes("OR")) {
        const [l, r] = expression.split(" OR ");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const fl = signals.get(l);
          const fr = signals.get(r);

          if (!fl || !fr) throw Error();
          // @ts-ignore
          return fl(signals) | fr(signals);
        };
        return { key, fn };
      } else if (expression.includes("LSHIFT")) {
        const [l, r] = expression.split(" LSHIFT ");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const fl = signals.get(l);

          if (!fl) throw Error();
          // @ts-ignore
          return fl(signals) << uint16(parseInt(r));
        };
        return { key, fn };
      } else if (expression.includes("RSHIFT")) {
        const [l, r] = expression.split(" RSHIFT ");
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const fl = signals.get(l);

          if (!fl) throw Error();

          // @ts-ignore
          return fl(signals) >> uint16(parseInt(r));
        };
        return { key, fn };
      } else if (Number.isNaN(parseInt(expression))) {
        const fn = (/** @type {Map<string, () => number>} */ signals) => {
          const f = signals.get(expression);

          if (!f) throw Error();

          // @ts-ignore
          return f(signals);
        };
        return {
          key,
          fn,
        };
      } else {
        return {
          key,
          fn: () => uint16(parseInt(expression)),
        };
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

  return inst.get(solveFor)(inst);
}
