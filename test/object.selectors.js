$(document).ready(function() {

  QUnit.module("underscore.object.selectors");

  QUnit.test("accessor", function(assert) {
    var a = [{a: 1, b: 2}, {c: 3}];

    assert.equal(_.accessor('a')(a[0]), 1, 'should return a function that plucks');
    assert.equal(_.accessor('a')(a[1]), undefined, 'should return a function that plucks, or returns undefined');
    assert.deepEqual(_.map(a, _.accessor('a')), [1, undefined], 'should return a function that plucks');
  });

  QUnit.test("dictionary", function(assert) {
    var a = [{a: 1, b: 2}, {c: 3}];

    assert.equal(_.dictionary(a[0])('a'), 1, 'should return a function that acts as a dictionary');
    assert.equal(_.dictionary(a[1])('a'), undefined, 'should return a function that acts as a dictionary, or returns undefined');
  });

  QUnit.test("selectKeys", function(assert) {
    assert.deepEqual(_.selectKeys({'a': 1, 'b': 2}, ['a']), {'a': 1}, 'shold return a map of the desired keys');
    assert.deepEqual(_.selectKeys({'a': 1, 'b': 2}, ['z']), {}, 'shold return an empty map if the desired keys are not present');
  });

  QUnit.test("kv", function(assert) {
    assert.deepEqual(_.kv({'a': 1, 'b': 2}, 'a'), ['a', 1], 'should return the key/value pair at the desired key');
    assert.equal(_.kv({'a': 1, 'b': 2}, 'z'), undefined, 'shold return undefined if the desired key is not present');
  });

  QUnit.test("getPath", function(assert) {
    var deepObject = { a: { b: { c: "c" } }, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ["arr"], deepArray: { contents: ["da1", "da2"] } };
    var weirdObject = { "D'artagnan": { "[0].[1]": "myValue" }, element: { "0": { "prop.1": "value1" } } };
    var deepArr = [[["thirdLevel"]]];
    var ks = ["a", "b", "c"];

    assert.strictEqual(_.getPath(deepObject, ks), "c", "should get a deep property's value from objects");
    assert.deepEqual(ks, ["a", "b", "c"], "should not have mutated ks argument");
    assert.strictEqual(_.getPath(deepArr, [0, 0, 0]), "thirdLevel", "should get a deep property's value from arrays");
    assert.strictEqual(_.getPath(deepObject, ["arrayVal", 0]), "arr", "should get a deep property's value from nested arrays and objects");
    assert.strictEqual(_.getPath(deepObject, ["deepArray", "contents", 1]), "da2", "should get a deep property's value within arrays inside deep objects, from an array");
    assert.strictEqual(_.getPath(deepObject, "deepArray.contents[0]"), "da1", "should get a deep property's value within arrays inside deep objects, from a complete javascript path");

    assert.strictEqual(_.getPath(deepObject, ["undefinedVal"]), undefined, "should return undefined for undefined properties");
    assert.strictEqual(_.getPath(deepObject, ["a", "notHere"]), undefined, "should return undefined for non-existent properties");
    assert.strictEqual(_.getPath(deepObject, ["nullVal"]), null, "should return null for null properties");
    assert.strictEqual(_.getPath(deepObject, ["nullVal", "notHere", "notHereEither"]), undefined, "should return undefined for non-existent descendents of null properties");

    assert.strictEqual(_.getPath(weirdObject, ["D'artagnan", "[0].[1]"]), "myValue", "should be able to traverse complex property names, from an array");
    assert.strictEqual(_.getPath(weirdObject, "[\"D'artagnan\"]['[0].[1]']"), "myValue", "should be able to traverse complex property names, from an accessor string");
    assert.strictEqual(_.getPath(weirdObject, "element[0]['prop.1']"), "value1", "should be able to traverse complex property names, from an accessor string");

    assert.strictEqual(_.getPath(deepObject, "a.b.c"), "c", "should work with keys written in dot notation");
    assert.strictEqual(_.getPath({}, "myPath.deepProperty"), undefined, "should not break with empty objects and deep paths");
  });

  QUnit.test("hasPath", function(assert) {
    var deepObject = { a: { b: { c: "c" } }, falseVal: false, nullVal: null, undefinedVal: undefined, arrayVal: ["arr"], deepArray: { contents: ["da1", "da2"] } };
    var weirdObject = { "D'artagnan": { "[0].[1]": "myValue" }, element: { "0": { "prop.1": "value1" } } };
    var ks = ["a", "b", "c"];

    assert.strictEqual(_.hasPath(deepObject, ["notHere", "notHereEither"]), false, "should return false if the path doesn't exist");
    assert.strictEqual(_.hasPath(deepObject, ks), true, "should return true if the path exists");
    assert.deepEqual(ks, ["a", "b", "c"], "should not have mutated ks argument");

    assert.strictEqual(_.hasPath(deepObject, ["deepArray", "contents", 1]), true, "should return true for an existing value within arrays inside deep objects, from an array");

    assert.strictEqual(_.hasPath(deepObject, ["arrayVal", 0]), true, "should return true for an array's index if it is defined");
    assert.strictEqual(_.hasPath(deepObject, ["arrayVal", 999]), false, "should return false for an array's index if it is not defined");

    assert.strictEqual(_.hasPath(deepObject, ["nullVal"]), true, "should return true for null properties");
    assert.strictEqual(_.hasPath(deepObject, ["undefinedVal"]), true, "should return true for properties that were explicitly assigned undefined");

    assert.strictEqual(_.hasPath(weirdObject, ["D'artagnan", "[0].[1]"]), true, "should return true for complex property names, from an array");
    assert.strictEqual(_.hasPath(weirdObject, "[\"D'artagnan\"]['[0].[1]']"), true, "should return true for complex property names, from an accessor string");
    assert.strictEqual(_.hasPath(weirdObject, "element[0]['prop.1']"), true, "should be return true for complex property names, from an accessor string");
    assert.strictEqual(_.hasPath(weirdObject, ["D'artagnan", "[0].[2]"]), false, "should return false for non-existent complex property names, from an array");
    assert.strictEqual(_.hasPath(weirdObject, "[\"D'artagnan\"]['[0].[2]']"), false, "should return true for non-existent complex property names, from an accessor string");
    assert.strictEqual(_.hasPath(weirdObject, "element[0]['prop.2']"), false, "should be return true for non-existent complex property names, from an accessor string");

    assert.strictEqual(_.hasPath(deepObject, ["nullVal", "notHere"]), false, "should return false for descendants of null properties");
    assert.strictEqual(_.hasPath(deepObject, ["undefinedVal", "notHere"]), false, "should return false for descendants of undefined properties");

    assert.strictEqual(_.hasPath(deepObject, "a.b.c"), true, "should work with keys written in dot notation.");

    assert.strictEqual(_.hasPath(null, []), true, "should return true for null and undefined when passed no keys");
    assert.strictEqual(_.hasPath(void 0, []), true);
    assert.strictEqual(_.hasPath(null, ['']), false, "should return false (not throw) on null/undefined given keys");
    assert.strictEqual(_.hasPath(void 0, ['']), false);

    assert.strictEqual(_.hasPath(deepObject, "a.b.c.d"), false, "should return false for keys which doesn't exist on nested existing objects");
  });

  QUnit.test("keysFromPath", function(assert) {
    assert.deepEqual(_.keysFromPath("a.b.c"), ["a", "b", "c"], "should convert a path into an array of keys");
    assert.deepEqual(_.keysFromPath("a[0].b['c']"), ["a", "0", "b", "c"], "should handle bracket notation");
    assert.deepEqual(_.keysFromPath("[\"D'artagnan\"]['[0].[1]']"), ["D'artagnan", "[0].[1]"], "should handle complex paths");
  });

  QUnit.test("pickWhen", function(assert) {
    var a = {foo: true, bar: false, baz: 42};

    assert.deepEqual(_.pickWhen(a, _.truthy), {foo: true, baz: 42}, "should return an object with kvs that return a truthy value for the given predicate");
  });

  QUnit.test("omitWhen", function(assert) {
    var a = {foo: [], bar: "", baz: "something", quux: ['a']};

    assert.deepEqual(_.omitWhen(a, _.isEmpty), {baz: "something", quux: ['a']}, "should return an object with kvs that return a falsey value for the given predicate");
  });

  QUnit.test("omitPath", function(assert){
    var a = {foo: true, bar: false, baz: 42, dada: {carlos: { pepe: 9 }, pedro: 'pedro', list: [{file: '..', more: {other: { a: 1, b: 2}}, name: 'aa'}, {file: '..', name: 'bb'}]}};

    assert.deepEqual(_.omitPath(a, 'dada.carlos.pepe'), {foo: true, bar: false, baz: 42, dada: {carlos: {}, pedro: 'pedro', list: [{file: '..', more: {other: { a: 1, b: 2}} , name: 'aa'}, {file: '..', name: 'bb'}]}}, "should return an object without the value that represent the path");
    assert.deepEqual(_.omitPath(a, 'dada.carlos'), {foo: true, bar: false, baz: 42, dada: {pedro: 'pedro', list: [{file: '..', more: {other: { a: 1, b: 2}} , name: 'aa'}, {file: '..', name: 'bb'}]}}, "should return an object without the value that represent the path");
    assert.deepEqual(_.omitPath(a, ''), {foo: true, bar: false, baz: 42, dada: {carlos: { pepe: 9 }, pedro: 'pedro', list: [{file: '..', more: {other: { a: 1, b: 2}} , name: 'aa'}, {file: '..', name: 'bb'}]}}, "should return the whole object because the path is empty");

    assert.deepEqual(_.omitPath(a, 'dada.list.file'), {foo: true, bar: false, baz: 42, dada: {carlos: { pepe: 9 }, pedro: 'pedro', list: [{name: 'aa', more: {other: { a: 1, b: 2}}}, {name: 'bb'}]}}, "should return an object without the value in each object of the list");
    assert.deepEqual(_.omitPath(a, 'dada.list.name'), {foo: true, bar: false, baz: 42, dada: {carlos: { pepe: 9 }, pedro: 'pedro', list: [{file: '..', more: {other: { a: 1, b: 2}}}, {file: '..'}]}}, "should return an object without the value in each object of the list");

    assert.deepEqual(_.omitPath(a, 'dada.list'), {foo: true, bar: false, baz: 42, dada: {carlos: { pepe: 9 }, pedro: 'pedro'}}, "should return an object without the list");

    assert.deepEqual(_.omitPath(a, 'dada.list.more.other.a'), {foo: true, bar: false, baz: 42, dada: {carlos: { pepe: 9 }, pedro: 'pedro', list: [{file: '..', more: {other: { b: 2}} , name: 'aa'}, {file: '..', name: 'bb'}]}}, "should return an object without the value inside the values of the list");
  });
});
