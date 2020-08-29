$(document).ready(function() {

  QUnit.module("underscore.function.arity");

  QUnit.test("fix", function(assert) {
    var over = function(t, m, b) { return t / m / b; };
    var t = _.fix(over, 10, _, _);
    assert.equal(t(5, 2),  1, 'should return a function partially applied for some number of arbitrary args marked by _');
    assert.equal(t(10, 2), 0.5, 'should return a function partially applied for some number of arbitrary args marked by _');
    assert.equal(t(10, 5), 0.2, 'should return a function partially applied for some number of arbitrary args marked by _');

    var f = function () { 
      return _.map(arguments, function (arg) { 
        return typeof arg;
      }).join(', ');
    };
    var g = _.fix(f, _, _, 3);
    assert.equal(g(1), 'number, undefined, number', 'should fill "undefined" if argument not given');
    g(1, 2);
    assert.equal(g(1), 'number, undefined, number', 'should not remember arguments between calls');

    assert.equal(_.fix(parseInt, _, 10)('11'), 11, 'should "fix" common js foibles');
    
    assert.equal(_.fix(f, _, 3)(1,'a'), 'number, number', 'should ignore extra parameters');
    
  });

  QUnit.test("arity", function(assert) {
    function variadic () { return arguments.length; }
    function unvariadic  (a, b, c) { return arguments.length; }

    assert.equal( _.arity(unvariadic.length, variadic).length, unvariadic.length, "should set the length");
    assert.equal( _.arity(3, variadic)(1, 2, 3, 4, 5), unvariadic(1, 2, 3, 4, 5), "shouldn't trim arguments");
    assert.equal( _.arity(3, variadic)(1), unvariadic(1), "shouldn't pad arguments");

    // this is the big use case for _.arity:

    function reverse (list) {
      return [].reduce.call(list, function (acc, element) {
        acc.unshift(element);
        return acc;
      }, []);
    }

    function naiveFlip (fun) {
      return function () {
        return fun.apply(this, reverse(arguments));
      };
    }

    function echo (a, b, c) { return [a, b, c]; }

    assert.deepEqual(naiveFlip(echo)(1, 2, 3), [3, 2, 1], "naive flip flips its arguments");
    assert.notEqual(naiveFlip(echo).length, echo.length, "naiveFlip gets its arity wrong");

    function flipWithArity (fun) {
      return _.arity(fun.length, naiveFlip(fun));
    }

    assert.deepEqual(flipWithArity(echo)(1, 2, 3), [3, 2, 1], "flipWithArity flips its arguments");
    assert.equal(flipWithArity(echo).length, echo.length, "flipWithArity gets its arity correct");

  });

  QUnit.test("curry", function(assert) {
    var func = function (x, y, z) {
        return x + y + z;
      },
      curried = _.curry(func),
      rCurried = _.curryRight(func);

    assert.equal(func(1, 2, 3), 6, "Test pure function");
    assert.equal(typeof curried, 'function', "Curry returns a function");
    assert.equal(typeof curried(1), 'function', "Curry returns a function after partial application");
    assert.equal(curried(1)(2)(3), 6, "Curry returns a value after total application");
    assert.equal(curried(1)(2)(3), 6, "Curry invocations have no side effects and do not interact with each other");
    assert.equal(curried(2)(4)(8), 14, "Curry invocations have no side effects and do not interact with each other");
    assert.equal(rCurried('a')('b')('c'), 'cba', "Flipped curry applies arguments in reverse.");

    var addyz = curried(1);
    assert.equal(addyz(2)(3), 6, "Partial applications can be used multiple times");
    assert.equal(addyz(2)(4), 7, "Partial applications can be used multiple times");

    var failure = false;
    try {
      curried(1, 2999);
    } catch (e) {
      failure = true;
    } finally {
      assert.equal(failure, true, "Curried functions only accept one argument at a time");
    }
  });

  QUnit.test("curry2", function(assert) {

    function echo () { return [].slice.call(arguments, 0); }

    assert.deepEqual(echo(1, 2), [1, 2], "Control test");
    assert.deepEqual(_.curry2(echo)(1)(2), [1, 2], "Accepts curried arguments");

  });

  QUnit.test("curryRight2", function(assert) {

    function echo () { return [].slice.call(arguments, 0); }

    assert.deepEqual(echo(1, 2), [1, 2], "Control test");
    assert.deepEqual(_.curryRight2(echo)(1)(2), [2, 1], "Reverses curried arguments");
    assert.equal(_.curryRight2, _.rcurry2, "should have alias 'rcurry2'");
  });

  QUnit.test("curry3", function(assert) {

    function echo () { return [].slice.call(arguments, 0); }

    assert.deepEqual(echo(1, 2, 3), [1, 2, 3], "Control test");
    assert.deepEqual(_.curry3(echo)(1)(2)(3), [1, 2, 3], "Accepts curried arguments");

  });

  QUnit.test("curryRight3", function(assert) {

    function echo () { return [].slice.call(arguments, 0); }

    assert.deepEqual(echo(1, 2, 3), [1, 2, 3], "Control test");
    assert.deepEqual(_.curryRight3(echo)(1)(2)(3), [3, 2, 1], "Reverses curried arguments");
    assert.equal(_.curryRight3, _.rcurry3, "should have alias 'rcurry3'");
  });

  QUnit.test("enforce", function(assert) {
    function binary (a, b) {
      return a + b;
    }
    function ternary (a, b, c) {
      return a + b + c;
    }
    function altTernary (a, b, c) {
      return a - b - c;
    }
    var fBinary = _.enforce(binary),
        fTernary = _.enforce(ternary),
        fAltTernary = _.enforce(altTernary),
        failure = false;
    try {
      fBinary(1);
    } catch (e) {
      failure = true;
    } finally {
      assert.equal(failure, true, "Binary must have two arguments.");
    }
    assert.equal(fBinary(1, 2), 3, "Function returns after proper application");

    failure = false;
    try {
      fTernary(1, 3);
    } catch (e) {
      failure = true;
    } finally {
      assert.equal(failure, true, "Ternary must have three arguments.");
    }
    assert.equal(fTernary(1, 2, 3), 6, "Function returns after proper application");
    assert.equal(fAltTernary(1, 2, 3), -4, "Function cache does not collide");
  });
});
