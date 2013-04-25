$(document).ready(function() {

  module("underscore.function.predicates");

  test("isValidDate", function() {
    ok(_.isValidDate(new Date));
    ok(!_.isValidDate(new Date("bad date")));
  });

});
