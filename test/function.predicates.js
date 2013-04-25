$(document).ready(function() {

  module("underscore.function.predicates");

  test("isValidDate", function() {
    ok(_.isValidDate(new Date));
    ok(!_.isValidDate(new Date("bad date")));
  });

  test("isInvalidDate", function() {
    ok(_.isInvalidDate(new Date("bad date")));
    ok(!_.isInvalidDate(new Date));
  });

});
