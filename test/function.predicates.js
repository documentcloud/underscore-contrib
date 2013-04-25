$(document).ready(function() {

  module("underscore.function.predicates");

  test("isInstanceOf", function() {
    equal(_.isInstanceOf([], Array),   true,  'should identify arrays');
    equal(_.isInstanceOf(null, Array), false, 'should identify that null is not an array instance');
  });

  test("isAssociative", function() {
    equal(_.isAssociative({}), true, 'should identify that a map is associative');
    equal(_.isAssociative(function(){}), true, 'should identify that a function is associative');
    equal(_.isAssociative([]), true, 'should identify that an array is associative');
    equal(_.isAssociative(new Array(10)), true, 'should identify that an array is associative');

    equal(_.isAssociative(1), false, 'should identify non-associative things');
    equal(_.isAssociative(0), false, 'should identify non-associative things');
    equal(_.isAssociative(-1), false, 'should identify non-associative things');
    equal(_.isAssociative(3.14), false, 'should identify non-associative things');
    equal(_.isAssociative('undefined'), false, 'should identify non-associative things');
    equal(_.isAssociative(''), false, 'should identify non-associative things');
    equal(_.isAssociative(NaN), false, 'should identify non-associative things');
    equal(_.isAssociative(Infinity), false, 'should identify non-associative things');
    equal(_.isAssociative(true), false, 'should identify non-associative things');
  });

  test("isIndexed", function() {
    equal(_.isIndexed([]), true, 'should identify indexed objects');
    equal(_.isIndexed([1,2,3]), true, 'should identify indexed objects');
    equal(_.isIndexed(new Array(10)), true, 'should identify indexed objects');
    equal(_.isIndexed(""), true, 'should identify indexed objects');
    equal(_.isIndexed("abc"), true, 'should identify indexed objects');

    equal(_.isIndexed(1), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(0), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(-1), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(3.14), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(undefined), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(NaN), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(Infinity), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(true), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(false), false, 'should identify when something is not an indexed object');
    equal(_.isIndexed(function(){}), false, 'should identify when something is not an indexed object');
  });

  test("isSequential", function() {
    equal(_.isSequential(new Array(10)), true, 'should identify sequential objects');
    equal(_.isSequential([1,2]), true, 'should identify sequential objects');
    equal(_.isSequential(arguments), true, 'should identify sequential objects');

    equal(_.isSequential({}), false, 'should identify when something is not sequential');
    equal(_.isSequential(function(){}), false, 'should identify when something is not sequential');
    equal(_.isSequential(1), false, 'should identify when something is not sequential');
    equal(_.isSequential(0), false, 'should identify when something is not sequential');
    equal(_.isSequential(-1), false, 'should identify when something is not sequential');
    equal(_.isSequential(3.14), false, 'should identify when something is not sequential');
    equal(_.isSequential('undefined'), false, 'should identify when something is not sequential');
    equal(_.isSequential(''), false, 'should identify when something is not sequential');
    equal(_.isSequential(NaN), false, 'should identify when something is not sequential');
    equal(_.isSequential(Infinity), false, 'should identify when something is not sequential');
    equal(_.isSequential(true), false, 'should identify when something is not sequential');
  });

  test("isEven", function() {
    equal(_.isEven(0), true, 'should identify even numbers');
    equal(_.isEven(2), true, 'should identify even numbers');
    equal(_.isEven(-2), true, 'should identify even numbers');
    equal(_.isEven(1), false, 'should identify non-even numbers');
  });

  test("isOdd", function() {
    equal(_.isOdd(1), true, 'should identify odd numbers');
    equal(_.isOdd(33), true, 'should identify odd numbers');
    equal(_.isOdd(-55), true, 'should identify odd numbers');
    equal(_.isOdd(10), false, 'should identify non-odd numbers');
  });

  test("isPositive", function() {
    equal(_.isPositive(1), true, 'should identify positive numbers');
    equal(_.isPositive(-1), false, 'should identify non-positive numbers');
    equal(_.isPositive(0), false, 'should identify non-positive numbers');
    equal(_.isPositive(+0), false, 'should identify non-positive numbers');
  });

  test("isNegative", function() {
    equal(_.isNegative(-1), true, 'should identify negative numbers');
    equal(_.isNegative(0), false, 'should identify non-negative numbers');
    equal(_.isNegative(110), false, 'should identify non-negative numbers');
    equal(_.isNegative(-0), false, 'should identify non-negative numbers');
  });

  test("isZero", function() {
    equal(_.isZero(0), true, 'should know zero');
    equal(_.isZero(-0), true, 'should know zero');
    equal(_.isZero(+0), true, 'should know zero');
    equal(_.isZero(1), false, 'should know non-zero');
    equal(_.isZero(-1), false, 'should know non-zero');
  });
});

