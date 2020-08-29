$(document).ready(function() {

  QUnit.module("underscore.function.combinators");

  QUnit.test("always", function(assert) {
    assert.equal(_.always(42)(10000), 42, 'should return a function that always returns the same value');
    assert.equal(_.always(42)(1,2,3), 42, 'should return a function that always returns the same value');
    assert.deepEqual(_.map([1,2,3], _.always(42)), [42,42,42], 'should return a function that always returns the same value');
  });

  QUnit.test("pipeline", function(assert) {
    var run  = _.pipeline(function(n) { return -n; }, function(n) { return "" + n; });
    var run2 = _.pipeline([function(n) { return -n; }, function(n) { return "" + n; }]);
    assert.equal(run(42), "-42", 'should apply a series of functions, originall given variadically to an initial value');
    assert.equal(run2(42), "-42", 'should apply a series of functions, originally given in an array to an initial value');
  });

  QUnit.test("conjoin", function(assert) {
    var isPositiveEven = _.conjoin(function(x) { return x > 0; }, function(x) { return (x & 1) === 0; });

    assert.equal(isPositiveEven(2), true, 'should recognize that element satisfies a conjunction');
    assert.equal(isPositiveEven(1), false, 'should recognize that element does not satisfy a conjunction');
    assert.equal(isPositiveEven([2,4,6,8]), true, 'should recognize when all elements satisfy a conjunction');
    assert.equal(isPositiveEven([2,4,6,7,8]), false, 'should recognize when an element fails to satisfy a conjunction');
  });

  QUnit.test("disjoin", function(assert) {
    var orPositiveEven = _.disjoin(function(x) { return x > 0; }, function(x) { return (x & 1) === 0; });

    assert.equal(orPositiveEven(2), true, 'should recognize that element satisfies a disjunction');
    assert.equal(orPositiveEven(-1), false, 'should recognize that element does not satisfy a disjunction');
    assert.equal(orPositiveEven([-1,2,3,4,5,6]), true, 'should recognize when all elements satisfy a disjunction');
    assert.equal(orPositiveEven([-1,-3]), false, 'should recognize when an element fails to satisfy a disjunction');
  });

  QUnit.test("comparator", function(assert) {
    var lessOrEqual = function(x, y) { return x <= y; };
    var a = [0, 1, -2];
    var b = [100, 1, 0, 10, -1, -2, -1];

    assert.deepEqual(a.sort(_.comparator(lessOrEqual)), [-2, 0, 1], 'should return a function to convert a predicate to a comparator');
    assert.deepEqual(b.sort(_.comparator(lessOrEqual)), [-2, -1, -1, 0, 1, 10, 100], 'should return a function to convert a predicate to a comparator');
  });

  QUnit.test("complement", function(assert) {
    var notOdd = _.complement(function(n) { return (n & 1) === 1; });

    assert.equal(notOdd(2), true, 'should return a function that is the opposite of the function given');
    assert.equal(notOdd(3), false, 'should return a function that is the opposite of the function given');

    var obj = {
      num: 1,
      numIsPositive: function () { return this.num > 0; }
    };
    obj.numIsNotPositive = _.complement(obj.numIsPositive);

    assert.equal(obj.numIsNotPositive(), false, 'should function as a method combinator');
  });

  QUnit.test('splat', function(assert) {
    var sumArgs = function () {
      return _.reduce(arguments, function (a, b) { return a + b; }, 0);
    };

    var sumArray = _.splat(sumArgs);

    assert.equal(sumArray([1, 2, 3]), 6, 'should return a function that takes array elements as the arguments for the original function');

    var obj = {
      a: 1,
      b: 2,
      getPropsByName: function () {
        var props = [];
        for (var i = 0; i < arguments.length; i++) {
          props.push(this[arguments[i]]);
        }
        return props;
      }
    };
    obj.getPropsByNameArray = _.splat(obj.getPropsByName);

    assert.deepEqual(obj.getPropsByNameArray(['a', 'b']), [1, 2], 'should function as a method combinator');
  });

  QUnit.test("unsplat", function(assert) {
    var echo  = _.unsplat(function (args) { return args; }),
        echo2 = _.unsplat(function (first, rest) { return [first, rest]; }),
        echo3 = _.unsplat(function (first, second, rest) { return [first, second, rest]; });

    assert.deepEqual(echo(), [], 'should return no arguments');
    assert.deepEqual(echo(1), [1], 'should return the arguments provded');
    assert.deepEqual(echo(1,2), [1,2], 'should return the arguments provded');
    assert.deepEqual(echo(1,2,3), [1,2,3], 'should return the arguments provded');

    assert.deepEqual(echo2(), [void 0, []], 'should return no arguments');
    assert.deepEqual(echo2(1), [1, []], 'should return the arguments provded');
    assert.deepEqual(echo2(1,2), [1,[2]], 'should return the arguments provded');
    assert.deepEqual(echo2(1,2,3), [1,[2,3]], 'should return the arguments provded');
    assert.deepEqual(echo2(1,2,3,4), [1,[2,3,4]], 'should return the arguments provded');

    assert.deepEqual(echo3(), [void 0, void 0, []], 'should return no arguments');
    assert.deepEqual(echo3(1), [1, void 0, []], 'should return the arguments provded');
    assert.deepEqual(echo3(1,2), [1,2,[]], 'should return the arguments provded');
    assert.deepEqual(echo3(1,2,3), [1,2,[3]], 'should return the arguments provded');
    assert.deepEqual(echo3(1,2,3,4), [1,2,[3,4]], 'should return the arguments provded');
  });

  QUnit.test("unsplatl", function(assert) {
    var echo  = _.unsplatl(function (args) { return args; }),
        echo2 = _.unsplatl(function (rest, ultimate) { return [rest, ultimate]; }),
        echo3 = _.unsplatl(function (rest, penultimate, ultimate) { return [rest, penultimate, ultimate]; });

    assert.deepEqual(echo(), [], 'should return no arguments');
    assert.deepEqual(echo(1), [1], 'should return the arguments provded');
    assert.deepEqual(echo(1,2), [1,2], 'should return the arguments provded');
    assert.deepEqual(echo(1,2,3), [1,2,3], 'should return the arguments provded');

    assert.deepEqual(echo2(), [[], void 0], 'should return no arguments');
    assert.deepEqual(echo2(1), [[], 1], 'should return the arguments provded');
    assert.deepEqual(echo2(1,2), [[1], 2], 'should return the arguments provded');
    assert.deepEqual(echo2(1,2,3), [[1, 2], 3], 'should return the arguments provded');
    assert.deepEqual(echo2(1,2,3,4), [[1, 2, 3], 4], 'should return the arguments provded');

    assert.deepEqual(echo3(), [[], void 0, void 0], 'should return no arguments');
    assert.deepEqual(echo3(1), [[], 1, void 0], 'should return the arguments provded');
    assert.deepEqual(echo3(1,2), [[], 1, 2], 'should return the arguments provded');
    assert.deepEqual(echo3(1,2,3), [[1], 2, 3], 'should return the arguments provded');
    assert.deepEqual(echo3(1,2,3,4), [[1, 2], 3, 4], 'should return the arguments provded');
  });
  
  QUnit.test("mapArgsWith", function(assert) {
    var echo  = _.unsplatl(function (args) { return args; });
    function timesTwo (n) { return n * 2; }
    function plusOne (n) { return n + 1; }
    
    assert.deepEqual(_.mapArgsWith(timesTwo, echo)(), [], "should handle the empty case");
    assert.deepEqual(_.mapArgsWith(timesTwo, echo)(42), [84], "should handle one arg");
    assert.deepEqual(_.mapArgsWith(plusOne, echo)(1, 2, 3), [2, 3, 4], "should handle many args");
    
    assert.deepEqual(_.mapArgsWith(timesTwo)(echo)(), [], "should handle the empty case");
    assert.deepEqual(_.mapArgsWith(timesTwo)(echo)(42), [84], "should handle one arg");
    assert.deepEqual(_.mapArgsWith(plusOne)(echo)(1, 2, 3), [2, 3, 4], "should handle many args");
  });

  QUnit.test("flip2", function(assert) {
    var div = function(n, d) { return n/d; };

    assert.equal(_.flip2(div)(10,2), 0.2, 'should return a function that flips the first two args to a function');

    var obj = {
      num: 5,
      addToNum: function (a, b) { return [a + this.num, b + this.num]; }
    };

    obj.reversedAddToNum = _.flip2(obj.addToNum);

    assert.deepEqual(obj.reversedAddToNum(1, 2), [7, 6], 'should function as a method combinator.');
  });

  QUnit.test("flip", function(assert) {
    var echo = function() { return Array.prototype.slice.call(arguments, 0); };

    assert.deepEqual(_.flip(echo)(1, 2, 3, 4), [4, 3, 2, 1], 'should return a function that flips the first three or more args to a function');

    var obj = {
      num: 5,
      addToNum: function (a, b) { return [a + this.num, b + this.num]; }
    };

    obj.reversedAddToNum = _.flip(obj.addToNum);

    assert.deepEqual(obj.reversedAddToNum(1, 2), [7, 6], 'should function as a method combinator.');
  });

  QUnit.test("fnull", function(assert) {
    var a = [1,2,3,null,5];
    var b = [1,2,3,undefined,5];
    var safeMult = _.fnull(function(total, n) { return total * n; }, 1, 1);

    assert.equal(_.reduce([1,2,3,5], safeMult), 30, 'should not fill in defaults when not needed');
    assert.equal(_.reduce(a, safeMult), 30, 'should fill in defaults for null');
    assert.equal(_.reduce(b, safeMult), 30, 'should fill in defaults for undefined');

    var obj = {
      a: 1,
      fallback: "fallback value",
      getPropByName: function (name) { return this[name]; }
    };

    obj.getPropByNameOrDefault = _.fnull(obj.getPropByName, "fallback");

    assert.equal(obj.getPropByNameOrDefault(), "fallback value", 'should function as a method combinator.');
  });

  QUnit.test("juxt", function(assert) {
    var run = _.juxt(function(s, n) { return s.length + n; }, parseInt, _.always(108));

    assert.deepEqual(run('42', 10), [12, 42, 108], 'should return a function that returns an array of the originally supplied functions called');

    var obj = {
      name: "Elizabeth 1",
      firstChar: function () { return this.name[0]; },
      lastChar: function () { return this.name[this.name.length - 1]; }
    };

    obj.firstAndLastChars = _.juxt(obj.firstChar, obj.lastChar);

    assert.deepEqual(obj.firstAndLastChars(), ['E', '1'], 'should function as a method combinator.');
  });

  QUnit.test("accessor", function(assert) {
    var f = _.accessor('a');

    assert.equal(f({a: 42}), 42, 'should retrieve a pluckable field');
    assert.equal(f({z: 42}), undefined, 'should fail to retrieve a field if not there');
  });

  QUnit.test("bound", function(assert) {
    var obj = {
      fun: function(b) {
        return this.a + b;
      },

      a: 'hello ',

      nofun: null
    };

    var f = _.bound(obj, 'fun');

    assert.equal(f('there'), 'hello there', 'should return concatenation of obj.a and string argument');
    assert.throws(function() {
      _.bound(obj, 'nofun');
    }, TypeError, 'should throw for non-function properties');
  });

  QUnit.test("functionalize", function(assert) {
    var rect = {
      x: 2,
      y: 3,
      area: function() {return this.x * this.y;},
      extrude: function(z) {return _.merge(this, {z: z});}
    };
    var areaFunc = _.functionalize(rect.area),
        extrudeFunc = _.functionalize(rect.extrude);
    assert.equal(areaFunc(rect), 6, "returned function's first arg becomes original method's `this`");
    assert.equal(extrudeFunc(rect, 4).z, 4, "all arguments are passed along");
  });

  QUnit.test("methodize", function(assert) {
    function area(rect) {return rect.x * rect.y;}
    function extrude(rect, z) {return _.merge(rect, {z: z});}
    var rect = {
      x: 2,
      y: 3,
      area: _.methodize(area),
      extrude: _.methodize(extrude)
    };
    assert.equal(rect.area(), 6, "returned method passes its receiver (`this`) as first arg to original function");
    assert.equal(rect.extrude(4).z, 4, "all arguments are passed along");
  });
});
