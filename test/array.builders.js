$(document).ready(function() {

  module("underscore.array.builders");

  test("cat", function() {
    deepEqual(_.cat(), [], 'should return an empty array when given no args');
  });

});
