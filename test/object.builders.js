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
});
