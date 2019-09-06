/**
 * HOISTED
 */
const def = (x) => typeof x !== 'undefined';
const undef = (x) => !def(x);
const length = (xs) => xs.length;
const concat = (b, a) => a.concat(b);

/**
 * Composition
 */
const noop = () => {};
const id = (x) => x;
const always = (val) => () => val;
const on = (f, g) => (a, b) => f(g(a), g(b));
const pipe = (...fns) => (init) => fns.reduce((a, fn) => fn(a), init);
const curry = (fn, a = []) => (...b) => {
  const args = concat(b, a);
  if (length(args) < length(fn)) {
    return curry(fn, args);
  }
  return fn(...args);
};

/**
 * Boolean
 */
const isNil = (x) => undef(x) || x === null;
const isArray = (x) => Array.isArray(x);
const isEmpty = (x) => length(x) === 0;
/* eslint-disable-next-line no-self-compare */
const defaultTo = (x, val) => (isNil(val) || val !== val ? x : val);
const equals = (a, b) => a === b;

/**
 * Math
 */
const max = (a, b) => Math.max(a, b);

/**
 * Lists
 */
const head = (xs) => xs[0];
const tail = (xs) => xs.slice(1);
const map = (fn, xs) => xs.map((x) => fn(x));
const mostCommon = (xs) => {
  const l = length(xs);
  if (l === 0) {
    return;
  }
  if (l === 1) {
    return xs[0];
  }
  const map = {};
  let i = 0;
  while (i < l) {
    if (undef(map[xs[i]])) {
      map[xs[i]] = {c: 0, v: xs[i]};
    }
    map[xs[i]].c += 1;
    i += 1;
  }

  const keys = Object.keys(map);

  let k = keys[0];
  let max = map[keys[0]].c;

  i = 1;
  while (i < length(keys)) {
    if (map[keys[i]].c > max) {
      k = keys[i];
      max = map[keys[i]].c;
    }
    i += 1;
  }
  return map[k].v;
};

/**
 * Objects
 */
const prop = (x, obj) => obj[x];
const mergeAll = (objs) => Object.assign({}, ...objs);

const _ = {
  def,
  undef,

  noop,
  id,
  always,
  on: curry(on),
  pipe,
  curry,

  isNil,
  isArray,
  isEmpty,
  defaultTo: curry(defaultTo),
  equals: curry(equals),

  max: curry(max),

  head,
  tail,
  length,
  concat: curry(concat),
  map: curry(map),
  mostCommon,

  prop: curry(prop),
  mergeAll,
};

export default _;
