$(document).ready(function() {

  module("underscore.object.selectors");

  test("accessor", function() {
    var a = [{a: 1, b: 2}, {c: 3}];

    equal(_.accessor('a')(a[0]), 1, 'should return a function that plucks');
    equal(_.accessor('a')(a[1]), undefined, 'should return a function that plucks, or returns undefined');
    deepEqual(_.map(a, _.accessor('a')), [1, undefined], 'should return a function that plucks');
  });

  test("dictionary", function() {
    var a = [{a: 1, b: 2}, {c: 3}];

    equal(_.dictionary(a[0])('a'), 1, 'should return a function that acts as a dictionary');
    equal(_.dictionary(a[1])('a'), undefined, 'should return a function that acts as a dictionary, or returns undefined');
  });

  test("selectKeys", function() {
    deepEqual(_.selectKeys({'a': 1, 'b': 2}, ['a']), {'a': 1}, 'shold return a map of the desired keys');
    deepEqual(_.selectKeys({'a': 1, 'b': 2}, ['z']), {}, 'shold return an empty map if the desired keys are not present');
  });

  test("getPath", function() {
    var deepObject = { a: { b: { c: "c" } }, falseVal: false, nullVal: null, undefinedVal: undefined };

    equal(_.getPath(deepObject, ["a", "b", "c"]), "c", "should get a deep property's value");

    equal(_.getPath(deepObject, ["undefinedVal"]), undefined, "should return undefined for undefined properties");
    equal(_.getPath(deepObject, ["nullVal"]), undefined, "should return undefined for null properties");
    equal(_.getPath(deepObject, ["a", "notHere"]), undefined, "should return undefined for non-existent properties");

    equal(_.getPath(deepObject, ["undefinedVal"], "myDefault"), "myDefault", "should return a default value instead of undefined if one is provided");
  });

});
