$(document).ready(function() {

  module("underscore.object.selectors");

  test("accessor", function() {
    var a = [{a: 1, b: 2}, {c: 3}];

    equal(_.accessor('a')(a[0]), 1, '');
    equal(_.accessor('a')(a[1]), undefined, '');
    deepEqual(_.map(a, _.accessor('a')), [1, undefined], '');
  });

});
