$(document).ready(function() {

  module("underscore.array.selectors");

  test("second", function() {
    var a = [1,2,3,4,5];

    equal(_.second(a), 2, 'should retrieve the 2nd element in an array');
  });
});
