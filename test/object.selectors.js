$(document).ready(function() {

  module("underscore.object.selectors");

  test("accessor", function() {
    var a = [{a: 1, b: 2}, {c: 3}];

    equal(_.accessor('a')(a[0]), 1, 'should return a function that plucks');
    equal(_.accessor('a')(a[1]), undefined, 'should return a function that plucks, or returns undefined');
    deepEqual(_.map(a, _.accessor('a')), [1, undefined], 'should return a function that plucks');
  });

  test("selectKeys", function() {
    deepEqual(_.selectKeys({'a': 1, 'b': 2}, ['a']), {'a': 1}, 'shold return a map of the desired keys');
    deepEqual(_.selectKeys({'a': 1, 'b': 2}, ['z']), {}, 'shold return an empty map if the desired keys are not present');
  });

});
