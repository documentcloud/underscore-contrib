$(document).ready(function() {

  module("underscore.function.arity");

  test("fix", function() {
    var over = function(t, m, b) { return t / m / b; };
    var t = _.fix(over, 10, _, _);
    var m = _.fix(over, _, 5, _);
    var b = _.fix(over, _, _, 2);

    equal(t(5,2),  1, 'should return a function partially applied for some number of arbitrary args marked by _');
    equal(t(10,2), 1, 'should return a function partially applied for some number of arbitrary args marked by _');
    equal(t(10,5), 1, 'should return a function partially applied for some number of arbitrary args marked by _');

    equal(_.fix(parseInt, _, 10)('11'), 11, 'should "fix" common js foibles');
  });
});
