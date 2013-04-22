$(document).ready(function() {

  module("underscore.function.combinators");

  test("always", function() {
    equal(_.always(42)(10000), 42, 'should return a function that always returns the same value');
    equal(_.always(42)(1,2,3), 42, 'should return a function that always returns the same value');
    deepEqual(_.map([1,2,3], _.always(42)), [42,42,42], 'should return a function that always returns the same value');
  });

  test("pipeline", function() {
    var result = _.pipeline(42, function(n) { return -n; }, function(n) { return "" + n; });
    equal(result, "-42", 'should apply a series of functions to an initial value');
  });

  test("conjoin", function() {
    var isPositiveEven = _.conjoin(function(x) { return x > 0; }, function(x) { return (x & 1) === 0; });

    equal(isPositiveEven([2,4,6,8]), true, 'should recognize when all elements satisfy a conjunction');
    equal(isPositiveEven([2,4,6,7,8]), false, 'should recognize when an element fails to satisfy a conjunction');
  });

  test("disjoin", function() {
    var orPositiveEven = _.disjoin(function(x) { return x > 0; }, function(x) { return (x & 1) === 0; });

    equal(orPositiveEven([-1,2,3,4,5,6]), true, 'should recognize when all elements satisfy a disjunction');
    equal(orPositiveEven([-1,-3]), false, 'should recognize when an element fails to satisfy a disjunction');
  });

  test("flip2", function() {
    var div = function(n, d) { return n/d; };

    equal(_.flip2(div)(10,2), 0.2, 'should return a function that flips the first two args to a function');
  });

});
