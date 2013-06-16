$(document).ready(function() {

  module("underscore.function.arity");

  test("fix", function() {
    var over = function(t, m, b) { return t / m / b; };
    var t = _.fix(over, 10, _, _);
    var m = _.fix(over, _, 5, _);
    var b = _.fix(over, _, _, 2);

    equal(t(5,2),  1, 'should return a function partially applied for some number of arbitrary args marked by _');
    equal(t(10,2), 1, 'should return a function partially applied for some number of arbitrary args marked by _');
    equal(t(10,5), 1, 'should return a function partially applied for some number of arbitrary args marked by _');

    equal(_.fix(parseInt, _, 10)('11'), 11, 'should "fix" common js foibles');
  });
  
  test("arity", function () {
    function variadic () { return arguments.length; }
    function unvariadic  (a, b, c) { return arguments.length; }
  
    equal( _.arity(unvariadic.length, variadic).length, unvariadic.length, "should set the length");
    equal( _.arity(3, variadic)(1, 2, 3, 4, 5), unvariadic(1, 2, 3, 4, 5), "shouldn't trim arguments");   
    equal( _.arity(3, variadic)(1), unvariadic(1), "shouldn't pad arguments");
    
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
      }
    }
    
    function echo (a, b, c) { return [a, b, c]; }
    
    deepEqual(naiveFlip(echo)(1, 2, 3), [3, 2, 1], "naive flip flips its arguments");
    notEqual(naiveFlip(echo).length, echo.length, "naiveFlip gets its arity wrong");
    
    function flipWithArity (fun) {
      return _.arity(fun.length, naiveFlip(fun));
    }
    
    deepEqual(flipWithArity(echo)(1, 2, 3), [3, 2, 1], "flipWithArity flips its arguments");
    equal(flipWithArity(echo).length, echo.length, "flipWithArity gets its arity correct");
    
  });
  
  test("curry", function() {
    var func = function (x, y, z) {
        return x + y + z;
      },
      curried = _.curry(func),
      rCurried = _.rCurry(func);

    equal(func(1, 2, 3), 6, "Test pure function");
    equal(typeof curried, 'function', "Curry returns a function");
    equal(typeof curried(1), 'function', "Curry returns a function after partial application");
    equal(curried(1)(2)(3), 6, "Curry returns a value after total application");
    equal(curried(1)(2)(3), 6, "Curry invocations have no side effects and do not interact with each other");
    equal(curried(2)(4)(8), 14, "Curry invocations have no side effects and do not interact with each other");
    equal(rCurried('a')('b')('c'), 'cba', "Flipped curry applies arguments in reverse.");

    var addyz = curried(1);
    equal(addyz(2)(3), 6, "Partial applications can be used multiple times");
    equal(addyz(2)(4), 7, "Partial applications can be used multiple times");

    var failure = false;
    try {
      curried(1, 2999);
    } catch (e) {
      failure = true;
    } finally {
      equal(failure, true, "Curried functions only accept one argument at a time");
    }
  });
  
  test("curry2", function () {
    
    function echo () { return [].slice.call(arguments, 0); }
    
    deepEqual(echo(1, 2), [1, 2], "Control test");
    deepEqual(_.curry2(echo)(1)(2), [1, 2], "Accepts curried arguments");
    
  });
  
  test("rcurry2", function () {
    
    function echo () { return [].slice.call(arguments, 0); }
    
    deepEqual(echo(1, 2), [1, 2], "Control test");
    deepEqual(_.rcurry2(echo)(1)(2), [2, 1], "Reverses curried arguments");
    
  });
  
  test("curry3", function () {
    
    function echo () { return [].slice.call(arguments, 0); }
    
    deepEqual(echo(1, 2, 3), [1, 2, 3], "Control test");
    deepEqual(_.curry3(echo)(1)(2)(3), [1, 2, 3], "Accepts curried arguments");
    
  });
  
  test("rcurry3", function () {
    
    function echo () { return [].slice.call(arguments, 0); }
    
    deepEqual(echo(1, 2, 3), [1, 2, 3], "Control test");
    deepEqual(_.rcurry3(echo)(1)(2)(3), [3, 2, 1], "Reverses curried arguments");
    
  });
  
});
