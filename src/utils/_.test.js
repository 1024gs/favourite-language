import _ from './_';

describe('_', () => {
  describe('def(x)', () => {
    it('returns false for undefined', () => {
      expect(_.def(undefined)).toBe(false);
    });
    it('returns false for undefined', () => {
      expect(_.def(void 0)).toBe(false);
    });
    it('returns true for every other value', () => {
      expect(_.def(false)).toBe(true);
      expect(_.def(null)).toBe(true);
      expect(_.def(NaN)).toBe(true);
      expect(_.def(0)).toBe(true);
      expect(_.def('')).toBe(true);
      expect(_.def({})).toBe(true);
      expect(_.def([])).toBe(true);
    });
  });

  describe('undef(x)', () => {
    it('returns true for undefined', () => {
      expect(_.undef(undefined)).toBe(true);
    });
    it('returns true for void 0', () => {
      expect(_.undef(void 0)).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.undef(false)).toBe(false);
      expect(_.undef(null)).toBe(false);
      expect(_.undef(NaN)).toBe(false);
      expect(_.undef(0)).toBe(false);
      expect(_.undef('')).toBe(false);
      expect(_.undef({})).toBe(false);
      expect(_.undef([])).toBe(false);
    });
  });

  describe('noop()', () => {
    it('is a function that does nothing and return undefined', () => {
      expect(_.noop(1)).toBe(undefined);
    });
  });

  describe('id(x)', () => {
    it('is a function that returns its argument', () => {
      expect(_.id(1)).toBe(1);
      expect(_.id(false)).toBe(false);
    });
  });

  describe('always(x)', () => {
    it('returns a function that returns the object initially supplied', () => {
      let always42 = _.always(42);
      expect(always42()).toBe(42);
      expect(always42(10)).toBe(42);
      expect(always42(false)).toBe(42);
    });
  });

  describe('on(f, g)', () => {
    it('returns a function that takes (a, b) and composes as follow f(g(a), g(b)', () => {
      const add = (a, b) => a + b;
      const square = (x) => x * x;
      expect(_.on(add, square)(2, 4)).toBe(20);
      expect(_.on(add, square)(3, 5)).toBe(add(square(3), square(5)));
    });
  });

  describe('pipe(f1, f2, .., fn)', () => {
    it('is a variadic function', () => {
      expect(typeof _.pipe).toBe('function');
      expect(_.pipe.length).toBe(0);
    });

    it('performs left-to-right function composition', () => {
      //  f :: (String, Number?) -> ([Number] -> [Number])
      let f = _.pipe(
        (x) => x + 'a',
        (x) => x + 'b',
        (x) => x + 'c'
      );

      expect(f.length).toBe(1);
      expect(f('')).toBe('abc');
    });
  });

  describe('isNil(x)', () => {
    it('returns true for undefined', () => {
      expect(_.isNil(undefined)).toBe(true);
    });
    it('returns true for void 0', () => {
      expect(_.isNil(void 0)).toBe(true);
    });
    it('returns true for null', () => {
      expect(_.isNil(null)).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.isNil(false)).toBe(false);
      expect(_.isNil(true)).toBe(false);
      expect(_.isNil(NaN)).toBe(false);
      expect(_.isNil(new Date())).toBe(false);
      expect(_.isNil(/(?:.)/)).toBe(false);
      expect(_.isNil(0)).toBe(false);
      expect(_.isNil('')).toBe(false);
      expect(_.isNil([])).toBe(false);
      expect(_.isNil({})).toBe(false);
      expect(_.isNil(function() {})).toBe(false);
      expect(_.isNil(() => {})).toBe(false);
    });
  });

  describe('isArray(x)', () => {
    it('returns true for array only', () => {
      expect(_.isArray([])).toBe(true);
      expect(_.isArray([[]])).toBe(true);
      expect(_.isArray([1])).toBe(true);
    });
    it('returns false for every other value', () => {
      expect(_.isArray(false)).toBe(false);
      expect(_.isArray(true)).toBe(false);
      expect(_.isArray(null)).toBe(false);
      expect(_.isArray(NaN)).toBe(false);
      expect(_.isArray(new Date())).toBe(false);
      expect(_.isArray(/(?:.)/)).toBe(false);
      expect(_.isArray(0)).toBe(false);
      expect(_.isArray('')).toBe(false);
      expect(_.isArray({})).toBe(false);
      expect(_.isArray(function() {})).toBe(false);
      expect(_.isArray(() => {})).toBe(false);
    });
  });

  describe('isEmpty(xs)', () => {
    it('returns true if a list is empty', () => {
      expect(_.isEmpty([])).toBe(true);
      expect(_.isEmpty([1])).toBe(false);
    });
    it('returns true for empty string', () => {
      expect(_.isEmpty('')).toBe(true);
      expect(_.isEmpty(' ')).toBe(false);
    });
    it('throws for null and undefined', () => {
      expect(() => _.isEmpty(null)).toThrowError(TypeError);
      expect(() => _.isEmpty(undefined)).toThrowError(TypeError);
    });
  });

  describe('defaultTo(x, val)', () => {
    it('returns the default value if input is null, undefined or NaN', () => {
      let defaultTo1 = _.defaultTo(1);
      expect(defaultTo1(null)).toBe(1);
      expect(defaultTo1(undefined)).toBe(1);
      expect(defaultTo1(NaN)).toBe(1);
    });

    it('returns the input value if it is not null/undefined', () => {
      let defaultTo1 = _.defaultTo(1);
      expect(defaultTo1('a real value')).toBe('a real value');
    });

    it('returns the input value even if it is considered falsy', () => {
      let defaultTo1 = _.defaultTo(1);
      expect(defaultTo1('')).toBe('');
      expect(defaultTo1(0)).toBe(0);
      expect(defaultTo1(false)).toBe(false);
      expect(defaultTo1([])).toEqual([]);
    });

    it('is curried', () => {
      expect(_.defaultTo(1, null)).toEqual(_.defaultTo(1)(null));
    });
  });

  describe('equals(a, b)', () => {
    it('returns true if values are qeual', () => {
      expect(_.equals(1, 1)).toBe(true);
      expect(_.equals(1, '1')).toBe(false);
      expect(_.equals('a', 'a')).toBe(true);
      expect(_.equals(undefined, undefined)).toBe(true);
    });
  });

  describe('max(a, b)', () => {
    it('returns the maximum value', () => {
      expect(_.max(1, 2)).toBe(2);
      expect(_.max(2, 1)).toBe(2);
    });
  });

  describe('head(xs)', () => {
    it('returns the first element of an ordered collection', () => {
      expect(_.head([1, 2, 3])).toBe(1);
      expect(_.head([2, 3])).toBe(2);
      expect(_.head([3])).toBe(3);
      expect(_.head([])).toBe(undefined);

      expect(_.head('abc')).toBe('a');
      expect(_.head('bc')).toBe('b');
      expect(_.head('c')).toBe('c');
    });
  });

  describe('tail(xs)', () => {
    it('returns all but the first element of an ordered collection', () => {
      expect(_.tail([1, 2, 3])).toEqual([2, 3]);
      expect(_.tail([2, 3])).toEqual([3]);
      expect(_.tail([3])).toEqual([]);
      expect(_.tail([])).toEqual([]);
    });
  });

  describe('map(fn, xs)', () => {
    let times2 = (x) => x * 2;
    let add1 = (x) => x + 1;
    let dec = (x) => x - 1;
    let functor = (a, b, c) => {
      if (b || c) {
        throw new Error('the functor must be called only with one argument');
      }
      return a;
    };

    it('maps simple functions over arrays', () => {
      expect(_.map(times2, [1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
    });

    it('returns empty array for an empty-array input', () => {
      expect(_.map(times2, [])).toEqual([]);
    });

    it('the functor is called only with one argument', () => {
      expect(_.map(functor, [0, 0, 0])).toEqual([0, 0, 0]);
    });

    it('is a curried function', () => {
      expect(_.map(add1)([1, 2, 3])).toEqual(_.map(add1, [1, 2, 3]));
    });
  });

  describe('mostCommon(xs)', () => {
    it('returns the most repeated element in a list', () => {
      expect(_.mostCommon([1, 2, 2, 4])).toEqual(2);
      expect(_.mostCommon([1, 2, 2, 1])).toEqual(1);
      expect(_.mostCommon(['a', 'a', 'b'])).toEqual('a');
    });
  });

  describe('prop(obj)', () => {
    it('returns a function that fetches the appropriate property', () => {
      let propName = _.prop('name');
      expect(typeof propName).toBe('function');
      expect(propName({name: 'Fred', age: 23})).toBe('Fred');
    });
  });

  describe('mergeAll([a, b, c])', () => {
    it('merges a list of objects', () => {
      let a = {a: 1};
      let b = {b: 2};
      let c = {c: 3};
      expect(_.mergeAll([a, b, c])).toEqual({a: 1, b: 2, c: 3});
    });
    it('overrides properties in the FIRST object', () => {
      let a = {w: 1, x: 2};
      let b = {w: 100, y: 3, z: 4};
      expect(_.mergeAll([a, b])).toEqual({w: 100, x: 2, y: 3, z: 4});
    });
    it('is not destructive', () => {
      let a = {w: 1, x: 2};
      let res = _.mergeAll([a, {x: 5}]);
      expect(a).not.toBe(res);
      expect(res).toEqual({w: 1, x: 5});
    });
  });
});
