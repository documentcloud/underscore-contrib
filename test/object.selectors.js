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
    var deepObject = { a: { b: { c: "c" } }, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ["arr"] };
    var deepArr = [[["thirdLevel"]]];

    strictEqual(_.getPath(deepObject, ["a", "b", "c"]), "c", "should get a deep property's value from objects");
    strictEqual(_.getPath(deepArr, [0, 0, 0]), "thirdLevel", "should get a deep property's value from arrays");
    strictEqual(_.getPath(deepObject, ["arrayVal", 0]), "arr", "should get a deep property's value from nested arrays and objects");

    strictEqual(_.getPath(deepObject, ["undefinedVal"]), undefined, "should return undefined for undefined properties");
    strictEqual(_.getPath(deepObject, ["a", "notHere"]), undefined, "should return undefined for non-existent properties");
    strictEqual(_.getPath(deepObject, ["nullVal"]), null, "should return null for null properties");
    strictEqual(_.getPath(deepObject, ["nullVal", "notHere", "notHereEither"]), undefined, "should return undefined for non-existent descendents of null properties");
  });

});
