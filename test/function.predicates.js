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
});

