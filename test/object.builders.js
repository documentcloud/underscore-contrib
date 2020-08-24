$(document).ready(function() {

  QUnit.module("underscore.object.builders");

  QUnit.test("merge", function(assert) {
    var o = {'a': 1, 'b': 2};

    assert.deepEqual(_.merge(o), {a: 1, b: 2}, 'should return a copy of the object if given only one');
    assert.deepEqual(_.merge({'a': 1, 'b': 2}, {b: 42}), {'a': 1, b: 42}, 'should merge two objects');
    assert.deepEqual(_.merge({a: 1, b: 2}, {b: 42}, {c: 3}), {a: 1, b: 42, c: 3}, 'should merge three or more objects');
    assert.deepEqual(_.merge({a: 1, b: 2}, {b: 42}, {c: 3}, {c: 4}), {a: 1, b: 42, c: 4}, 'should merge three or more objects');

    var a = {'a': 1, 'b': 2};
    var $ = _.merge(a, {'a': 42});

    assert.deepEqual(a, {'a': 1, 'b': 2}, 'should not modify the original');
  });

  QUnit.test("renameKeys", function(assert) {
    assert.deepEqual(_.renameKeys({'a': 1, 'b': 2}, {'a': 'A'}), {'b': 2, 'A': 1}, 'should rename the keys in the first object to the mapping in the second object');

    var a = {'a': 1, 'b': 2};
    var $ = _.renameKeys(a, {'a': 'A'});

    assert.deepEqual(a, {'a': 1, 'b': 2}, 'should not modify the original');
  });

  QUnit.test("snapshot", function(assert) {
    var o = {'a': 1, 'b': 2};
    var oSnap = _.snapshot(o);

    var a = [1,2,3,4];
    var aSnap = _.snapshot(a);

    var n = [1,{a: 1, b: [1,2,3]},{},4];
    var nSnap = _.snapshot(n);

    var c = [1,{a: 1, b: [1,2,3]},{},4];
    var cSnap = _.snapshot(c);
    c[1].b = 42;

    assert.deepEqual(o, oSnap, 'should create a deep copy of an object');
    assert.deepEqual(a, aSnap, 'should create a deep copy of an array');
    assert.deepEqual(n, nSnap, 'should create a deep copy of an array');
    assert.deepEqual(nSnap, [1,{a: 1, b: [1,2,3]},{},4], 'should allow changes to the original to not change copies');
  });

  QUnit.test("setPath", function(assert) {
    var obj = {a: {b: {c: 42, d: 108}}};
    var ary = ['a', ['b', ['c', 'd'], 'e']];
    var nest = [1, {a: 2, b: [3,4], c: 5}, 6];

    assert.deepEqual(_.setPath(obj, 9, ['a', 'b', 'c']), {a: {b: {c: 9, d: 108}}}, '');
    assert.deepEqual(_.setPath(ary, 9, [1, 1, 0]), ['a', ['b', [9, 'd'], 'e']], '');
    assert.deepEqual(_.setPath(nest, 9, [1, 'b', 1]), [1, {a: 2, b: [3,9], c: 5}, 6], ''); 

    assert.deepEqual(_.setPath(obj, 9, 'a'), {a: 9}, '');
    assert.deepEqual(_.setPath(ary, 9, 1), ['a', 9], '');

    assert.deepEqual(obj, {a: {b: {c: 42, d: 108}}}, 'should not modify the original object');
    assert.deepEqual(ary, ['a', ['b', ['c', 'd'], 'e']], 'should not modify the original array');
    assert.deepEqual(nest, [1, {a: 2, b: [3,4], c: 5}, 6], 'should not modify the original nested structure');
  });

  QUnit.test("updatePath", function(assert) {
    var obj = {a: {b: {c: 42, d: 108}}};
    var ary = ['a', ['b', ['c', 'd'], 'e']];
    var nest = [1, {a: 2, b: [3,4], c: 5}, 6];

    assert.deepEqual(_.updatePath(obj, _.always(9), ['a', 'b', 'c']), {a: {b: {c: 9, d: 108}}}, '');
    assert.deepEqual(_.updatePath(ary, _.always(9), [1, 1, 0]), ['a', ['b', [9, 'd'], 'e']], '');
    assert.deepEqual(_.updatePath(nest, _.always(9), [1, 'b', 1]), [1, {a: 2, b: [3,9], c: 5}, 6], ''); 

    assert.deepEqual(_.updatePath(obj, _.always(9), 'a'), {a: 9}, '');
    assert.deepEqual(_.updatePath(ary, _.always(9), 1), ['a', 9], '');

    assert.deepEqual(obj, {a: {b: {c: 42, d: 108}}}, 'should not modify the original object');
    assert.deepEqual(ary, ['a', ['b', ['c', 'd'], 'e']], 'should not modify the original array');
    assert.deepEqual(nest, [1, {a: 2, b: [3,4], c: 5}, 6], 'should not modify the original nested structure');
  });

});
