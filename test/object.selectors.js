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

  test("kv", function() {
    deepEqual(_.kv({'a': 1, 'b': 2}, 'a'), ['a', 1], 'should return the key/value pair at the desired key');
    equal(_.kv({'a': 1, 'b': 2}, 'z'), undefined, 'shold return undefined if the desired key is not present');
  });

  test("getPath", function() {
    var deepObject = { a: { b: { c: "c" } }, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ["arr"], deepArray: { contents: ["da1", "da2"] } };
    var weirdObject = { "D'artagnan": { "[0].[1]": "myValue" }, element: { "0": { "prop.1": "value1" } } };
    var deepArr = [[["thirdLevel"]]];
    var ks = ["a", "b", "c"];

    strictEqual(_.getPath(deepObject, ks), "c", "should get a deep property's value from objects");
    deepEqual(ks, ["a", "b", "c"], "should not have mutated ks argument");
    strictEqual(_.getPath(deepArr, [0, 0, 0]), "thirdLevel", "should get a deep property's value from arrays");
    strictEqual(_.getPath(deepObject, ["arrayVal", 0]), "arr", "should get a deep property's value from nested arrays and objects");
    strictEqual(_.getPath(deepObject, ["deepArray", "contents", 1]), "da2", "should get a deep property's value within arrays inside deep objects, from an array");
    strictEqual(_.getPath(deepObject, "deepArray.contents[0]"), "da1", "should get a deep property's value within arrays inside deep objects, from a complete javascript path");

    strictEqual(_.getPath(deepObject, ["undefinedVal"]), undefined, "should return undefined for undefined properties");
    strictEqual(_.getPath(deepObject, ["a", "notHere"]), undefined, "should return undefined for non-existent properties");
    strictEqual(_.getPath(deepObject, ["nullVal"]), null, "should return null for null properties");
    strictEqual(_.getPath(deepObject, ["nullVal", "notHere", "notHereEither"]), undefined, "should return undefined for non-existent descendents of null properties");

    strictEqual(_.getPath(weirdObject, ["D'artagnan", "[0].[1]"]), "myValue", "should be able to traverse complex property names, from an array");
    strictEqual(_.getPath(weirdObject, "[\"D'artagnan\"]['[0].[1]']"), "myValue", "should be able to traverse complex property names, from an accessor string");
    strictEqual(_.getPath(weirdObject, "element[0]['prop.1']"), "value1", "should be able to traverse complex property names, from an accessor string");

    strictEqual(_.getPath(deepObject, "a.b.c"), "c", "should work with keys written in dot notation");
    strictEqual(_.getPath({}, "myPath.deepProperty"), undefined, "should not break with empty objects and deep paths");
  });

  test("hasPath", function() {
    var deepObject = { a: { b: { c: "c" } }, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ["arr"], deepArray: { contents: ["da1", "da2"] } };
    var weirdObject = { "D'artagnan": { "[0].[1]": "myValue" }, element: { "0": { "prop.1": "value1" } } };
    var ks = ["a", "b", "c"];

    strictEqual(_.hasPath(deepObject, ["notHere", "notHereEither"]), false, "should return false if the path doesn't exist");
    strictEqual(_.hasPath(deepObject, ks), true, "should return true if the path exists");
    deepEqual(ks, ["a", "b", "c"], "should not have mutated ks argument");

    strictEqual(_.hasPath(deepObject, ["deepArray", "contents", 1]), true, "should return true for an existing value within arrays inside deep objects, from an array");

    strictEqual(_.hasPath(deepObject, ["arrayVal", 0]), true, "should return true for an array's index if it is defined");
    strictEqual(_.hasPath(deepObject, ["arrayVal", 999]), false, "should return false for an array's index if it is not defined");

    strictEqual(_.hasPath(deepObject, ["nullVal"]), true, "should return true for null properties");
    strictEqual(_.hasPath(deepObject, ["undefinedVal"]), true, "should return true for properties that were explicitly assigned undefined");

    strictEqual(_.hasPath(weirdObject, ["D'artagnan", "[0].[1]"]), true, "should return true for complex property names, from an array");
    strictEqual(_.hasPath(weirdObject, "[\"D'artagnan\"]['[0].[1]']"), true, "should return true for complex property names, from an accessor string");
    strictEqual(_.hasPath(weirdObject, "element[0]['prop.1']"), true, "should be return true for complex property names, from an accessor string");
    strictEqual(_.hasPath(weirdObject, ["D'artagnan", "[0].[2]"]), false, "should return false for non-existent complex property names, from an array");
    strictEqual(_.hasPath(weirdObject, "[\"D'artagnan\"]['[0].[2]']"), false, "should return true for non-existent complex property names, from an accessor string");
    strictEqual(_.hasPath(weirdObject, "element[0]['prop.2']"), false, "should be return true for non-existent complex property names, from an accessor string");

    strictEqual(_.hasPath(deepObject, ["nullVal", "notHere"]), false, "should return false for descendants of null properties");
    strictEqual(_.hasPath(deepObject, ["undefinedVal", "notHere"]), false, "should return false for descendants of undefined properties");

    strictEqual(_.hasPath(deepObject, "a.b.c"), true, "should work with keys written in dot notation.");

    strictEqual(_.hasPath(null, []), true, "should return true for null and undefined when passed no keys");
    strictEqual(_.hasPath(void 0, []), true);
    strictEqual(_.hasPath(null, ['']), false, "should return false (not throw) on null/undefined given keys");
    strictEqual(_.hasPath(void 0, ['']), false);
  });

  test("keysFromPath", function() {
    deepEqual(_.keysFromPath("a.b.c"), ["a", "b", "c"], "should convert a path into an array of keys");
    deepEqual(_.keysFromPath("a[0].b['c']"), ["a", "0", "b", "c"], "should handle bracket notation");
    deepEqual(_.keysFromPath("[\"D'artagnan\"]['[0].[1]']"), ["D'artagnan", "[0].[1]"], "should handle complex paths");
  });

  test("pickWhen", function() {
    var a = {foo: true, bar: false, baz: 42};

    deepEqual(_.pickWhen(a, _.truthy), {foo: true, baz: 42}, "should return an object with kvs that return a truthy value for the given predicate");
  });

  test("omitWhen", function() {
    var a = {foo: [], bar: "", baz: "something", quux: ['a']};

    deepEqual(_.omitWhen(a, _.isEmpty), {baz: "something", quux: ['a']}, "should return an object with kvs that return a falsey value for the given predicate");
  });
});
