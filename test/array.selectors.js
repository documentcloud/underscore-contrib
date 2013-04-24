$(document).ready(function() {

  module("underscore.array.selectors");

  test("second", function() {
    var a = [1,2,3,4,5];

    equal(_.second(a), 2, 'should retrieve the 2nd element in an array');
  });

  test("takeWhile", function() {
    var isNeg = function(n) { return n < 0; };

    deepEqual(_.takeWhile([-2,-1,0,1,2], isNeg), [-2,-1], 'should take elements until a function goes truthy');
    deepEqual(_.takeWhile([1,-2,-1,0,1,2], isNeg), [], 'should take elements until a function goes truthy');
  });

  test("dropWhile", function() {
    var isNeg = function(n) { return n < 0; };

    deepEqual(_.dropWhile([-2,-1,0,1,2], isNeg), [0,1,2], 'should drop elements until a function goes truthy');
    deepEqual(_.dropWhile([0,1,2], isNeg), [0,1,2], 'should drop elements until a function goes truthy');
    deepEqual(_.dropWhile([-2,-1], isNeg), [], 'should drop elements until a function goes truthy');
    deepEqual(_.dropWhile([1,-2,-1,0,1,2], isNeg), [1,-2,-1,0,1,2], 'should take elements until a function goes truthy');
    deepEqual(_.dropWhile([], isNeg), [], 'should handle empty arrays');
  });

});
