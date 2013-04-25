$(document).ready(function() {

  module("underscore.object.builders");

  test("merge", function() {
    var o = {'a': 1, 'b': 2};

    deepEqual(_.merge(o), {a: 1, b: 2}, 'should return a copy of the object if given only one');
    deepEqual(_.merge({'a': 1, 'b': 2}, {b: 42}), {'a': 1, b: 42}, 'should merge two objects');
    deepEqual(_.merge({a: 1, b: 2}, {b: 42}, {c: 3}), {a: 1, b: 42, c: 3}, 'should merge three or more objects');
    deepEqual(_.merge({a: 1, b: 2}, {b: 42}, {c: 3}, {c: 4}), {a: 1, b: 42, c: 4}, 'should merge three or more objects');

    var a = {'a': 1, 'b': 2};
    var $ = _.merge(a, {'a': 42});

    deepEqual(a, {'a': 1, 'b': 2}, 'should not modify the original');
  });

  test("renameKeys", function() {
    deepEqual(_.renameKeys({'a': 1, 'b': 2}, {'a': 'A'}), {'b': 2, 'A': 1}, 'should rename the keys in the first object to the mapping in the second object');

    var a = {'a': 1, 'b': 2};
    var $ = _.renameKeys(a, {'a': 'A'});

    deepEqual(a, {'a': 1, 'b': 2}, 'should not modify the original');
  });

  test("snapshot", function() {
    var o = {'a': 1, 'b': 2};
    var oSnap = _.snapshot(o);

    var a = [1,2,3,4];
    var aSnap = _.snapshot(a);

    var n = [1,{a: 1, b: [1,2,3]},{},4];
    var nSnap = _.snapshot(n);

    var c = [1,{a: 1, b: [1,2,3]},{},4];
    var cSnap = _.snapshot(c);
    c[1].b = 42;

    deepEqual(o, oSnap, 'should create a deep copy of an object');
    deepEqual(a, aSnap, 'should create a deep copy of an array');
    deepEqual(n, nSnap, 'should create a deep copy of an array');
    deepEqual(nSnap, [1,{a: 1, b: [1,2,3]},{},4], 'should allow changes to the original to not change copies');
  });
});
