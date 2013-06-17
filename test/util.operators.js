$(document).ready(function() {

  module("underscore.util.existential");

  test("add", function() {
    equal(_.add(1, 1), 2, '1 + 1 = 2');
    equal(_.add(3, 5), 8, '3 + 5 = 8');
  });

  test("sub", function() {
    equal(_.sub(1, 1), 0, '1 - 1 = 0');
    equal(_.sub(5, 3), 2, '5 - 3 = 2');
  });

  test("mul", function() {
    equal(_.mul(1, 1), 1, '1 * 1 = 1');
    equal(_.mul(5, 3), 15, '5 * 3 = 15');
  });

  test("div", function() {
    equal(_.div(1, 1), 1, '1 / 1 = 1');
    equal(_.div(15, 3), 5, '15 / 3 = 5');
    equal(_.div(15, 0), Infinity, '15 / 0 = Infinity');
  });

  test("mod", function() {
    equal(_.mod(3, 2), 1, '3 / 2 = 1');
    equal(_.mod(15, 3), 0, '15 / 3 = 0');
  });

  test("inc", function() {
    equal(_.inc(1), 2, '++1 = 2');
    equal(_.inc(15), 16, '++15 = 16');
  });

  test("dec", function() {
    equal(_.dec(2), 1, '--2 = 1');
    equal(_.dec(15), 14, '--15 = 15');
  });

  test("neg", function() {
    equal(_.neg(2), -2, 'opposite of 2');
    equal(_.neg(-2), 2, 'opposite of -2');
    equal(_.neg(true), -1, 'opposite of true');
  });

  test("eq", function() {
    equal(_.eq(1, 1), true, '1 == 1');
    equal(_.eq(1, true), true, '1 == true');
    equal(_.eq(1, false), false, '1 != false');
    equal(_.eq(1, '1'), true, '1 == "1"');
    equal(_.eq(1, 'one'), false, '1 != "one"');
    equal(_.eq(0, 0), true, '0 == 0');
    equal(_.eq(0, false), true, '0 == false');
    equal(_.eq(0, '0'), true, '0 == "0"');
    equal(_.eq({}, {}), false, '{} == {}');
    equal(false, false, 'failing placeholder');
  });
  test("seq", function() {
    equal(false, false, 'failing placeholder');
  });
  test("neq", function() {
    equal(false, false, 'failing placeholder');
  });
  test("sneq", function() {
    equal(false, false, 'failing placeholder');
  });
  test("not", function() {
    equal(false, false, 'failing placeholder');
  });
  test("gt", function() {
    equal(_.gt(3, 2), true, '3 > 2');
    equal(_.gt(1, 3), false, '1 > 3');
  });
  test("lt", function() {
    equal(_.lt(3, 2), false, '3 < 2');
    equal(_.lt(1, 3), true, '1 < 3');
  });
  test("gte", function() {
    equal(_.gte(3, 2), true, '3 >= 2');
    equal(_.gte(1, 3), false, '1 >= 3');
    equal(_.gte(3, 3), true, '3 >= 3');
  });
  test("lte", function() {
    equal(_.lte(3, 2), false, '3 <= 2');
    equal(_.lte(1, 3), true, '1 <= 3');
    equal(_.lte(3, 3), true, '3 <= 3');
  });
  test("bitwiseAnd", function() {
    equal(false, false, 'failing placeholder');
  });
  test("bitwiseOr", function() {
    equal(false, false, 'failing placeholder');
  });
  test("bitwiseXor", function() {
    equal(false, false, 'failing placeholder');
  });
  test("bitwiseNot", function() {
    equal(false, false, 'failing placeholder');
  });
  test("bitwiseLeft", function() {
    equal(false, false, 'failing placeholder');
  });
  test("bitwiseRight", function() {
    equal(false, false, 'failing placeholder');
  });
  test("bitwiseZ", function() {
    equal(false, false, 'failing placeholder');
  });

});
