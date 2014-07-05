$(document).ready(function() {

  module("underscore.util.operators");

  test("add", function() {
    equal(_.add(1, 1), 2);
    equal(_.add(3, 5), 8);
    equal(_.add(1, 2, 3, 4), 10, 'adds multiple operands');
  });

  test("sub", function() {
    equal(_.sub(1, 1), 0);
    equal(_.sub(5, 3), 2);
    equal(_.sub(10, 9, 8, 7), -14, 'subtracts multiple operands');
  });

  test("mul", function() {
    equal(_.mul(1, 1), 1);
    equal(_.mul(5, 3), 15);
    equal(_.mul(1, 2, 3, 4), 24, 'multiplies multiple operands');
  });

  test("div", function() {
    equal(_.div(1, 1), 1);
    equal(_.div(15, 3), 5);
    equal(_.div(15, 0), Infinity);
    equal(_.div(24, 2, 2, 2), 3, 'divides multiple operands');
  });

  test("mod", function() {
    equal(_.mod(3, 2), 1);
    equal(_.mod(15, 3), 0);
  });

  test("inc", function() {
    equal(_.inc(1), 2);
    equal(_.inc(15), 16);
  });

  test("dec", function() {
    equal(_.dec(2), 1);
    equal(_.dec(15), 14);
  });

  test("neg", function() {
    equal(_.neg(2), -2);
    equal(_.neg(-2), 2);
    equal(_.neg(true), -1, 'opposite of true');
  });

  test("eq", function() {
    equal(_.eq(1, 1), true);
    equal(_.eq(1, true), true);
    equal(_.eq(1, false), false);
    equal(_.eq(1, '1'), true);
    equal(_.eq(1, 'one'), false);
    equal(_.eq(0, 0), true);
    equal(_.eq(0, false), true);
    equal(_.eq(0, '0'), true);
    equal(_.eq({}, {}), false);
    equal(false, false, 'failing placeholder');
    equal(_.eq(0, 0, 1), false, 'compares a list of arguments');
  });
  test("seq", function() {
    equal(_.seq(1, 1), true);
    equal(_.seq(1, '1'), false);
    equal(_.seq(0, 0, 1), false, 'compares a list of arguments');
  });
  test("neq", function() {
    equal(_.neq('a', 'b'), true);
    equal(_.neq(1, '1'), false);
    equal(_.neq(0, 0, 1), true, 'compares a list of arguments');
  });
  test("sneq", function() {
    equal(_.sneq('a', 'b'), true);
    equal(_.sneq(1, '1'), true);
    equal(_.sneq(0, 0, 1), true, 'compares a list of arguments');
  });
  test("not", function() {
    equal(_.not(true), false);
    equal(_.not(false), true);
    equal(_.not('truthy'), false);
    equal(_.not(null), true, 'converts falsy values to true');
  });
  test("gt", function() {
    equal(_.gt(3, 2), true);
    equal(_.gt(1, 3), false);
    equal(_.gt(1, 2, 1), false, 'compares a list of arguments');
  });
  test("lt", function() {
    equal(_.lt(3, 2), false);
    equal(_.lt(1, 3), true);
    equal(_.lt(1, 2, 1), false, 'compares a list of arguments');
  });
  test("gte", function() {
    equal(_.gte(3, 2), true);
    equal(_.gte(1, 3), false);
    equal(_.gte(3, 3), true);
    equal(_.gte(2, 3, 1), false, 'compares a list of arguments');
  });
  test("lte", function() {
    equal(_.lte(3, 2), false);
    equal(_.lte(1, 3), true);
    equal(_.lte(3, 3), true);
    equal(_.lte(2, 2, 1), false, 'compares a list of arguments');
  });
  test("bitwiseAnd", function() {
    equal(_.bitwiseAnd(1, 1), 1);
    equal(_.bitwiseAnd(1, 0), 0);
    equal(_.bitwiseAnd(1, 1, 0), 0, 'operates on multiple arguments');
  });
  test("bitwiseOr", function() {
    equal(_.bitwiseOr(1, 1), 1);
    equal(_.bitwiseOr(1, 0), 1);
    equal(_.bitwiseOr(1, 1, 2), 3, 'operates on multiple arguments');
  });
  test("bitwiseXor", function() {
    equal(_.bitwiseXor(1, 1), 0);
    equal(_.bitwiseXor(1, 2), 3);
    equal(_.bitwiseXor(1, 2, 3), 0, 'operates on multiple arguments');
  });
  test("bitwiseNot", function() {
    equal(_.bitwiseNot(1), -2);
    equal(_.bitwiseNot(2), -3);
  });
  test("bitwiseLeft", function() {
    equal(_.bitwiseLeft(1, 1), 2);
    equal(_.bitwiseLeft(1, 0), 1);
    equal(_.bitwiseLeft(1, 1, 1), 4, 'operates on multiple arguments');
  });
  test("bitwiseRight", function() {
    equal(_.bitwiseRight(1, 1), 0);
    equal(_.bitwiseRight(2, 1), 1);
    equal(_.bitwiseRight(3, 1, 1), 0, 'operates on multiple arguments');
  });
  test("bitwiseZ", function() {
    equal(_.bitwiseZ(-1, 1), 2147483647, '-1 >>> 1');
    equal(_.bitwiseZ(-1, 1, 1), 1073741823, 'operates on multiple arguments');
  });

});
