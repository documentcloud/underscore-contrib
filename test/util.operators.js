$(document).ready(function() {

  QUnit.module("underscore.util.operators");

  QUnit.test("add", function(assert) {
    assert.equal(_.add(1, 1), 2, '1 + 1 = 2');
    assert.equal(_.add(3, 5), 8, '3 + 5 = 8');
    assert.equal(_.add(1, 2, 3, 4), 10, 'adds multiple operands');
    assert.equal(_.add([1, 2, 3, 4]), 10, 'adds multiple operands, when specified in an array');
  });

  QUnit.test("sub", function(assert) {
    assert.equal(_.sub(1, 1), 0, '1 - 1 = 0');
    assert.equal(_.sub(5, 3), 2, '5 - 3 = 2');
    assert.equal(_.sub(10, 9, 8, 7), -14, 'subtracts multiple operands');
    assert.equal(_.sub([10, 9, 8, 7]), -14, 'subtracts multiple operands, when specified in an array');
  });

  QUnit.test("mul", function(assert) {
    assert.equal(_.mul(1, 1), 1, '1 * 1 = 1');
    assert.equal(_.mul(5, 3), 15, '5 * 3 = 15');
    assert.equal(_.mul(1, 2, 3, 4), 24, 'multiplies multiple operands');
    assert.equal(_.mul([1, 2, 3, 4]), 24, 'multiplies multiple operands, when specified in an array');
  });

  QUnit.test("div", function(assert) {
    assert.equal(_.div(1, 1), 1, '1 / 1 = 1');
    assert.equal(_.div(15, 3), 5, '15 / 3 = 5');
    assert.equal(_.div(15, 0), Infinity, '15 / 0 = Infinity');
    assert.equal(_.div(24, 2, 2, 2), 3, 'divides multiple operands');
    assert.equal(_.div([24, 2, 2, 2]), 3, 'divides multiple operands, when specified in an array');
  });

  QUnit.test("mod", function(assert) {
    assert.equal(_.mod(3, 2), 1, '3 / 2 = 1');
    assert.equal(_.mod(15, 3), 0, '15 / 3 = 0');
  });

  QUnit.test("inc", function(assert) {
    assert.equal(_.inc(1), 2, '++1 = 2');
    assert.equal(_.inc(15), 16, '++15 = 16');
  });

  QUnit.test("dec", function(assert) {
    assert.equal(_.dec(2), 1, '--2 = 1');
    assert.equal(_.dec(15), 14, '--15 = 15');
  });

  QUnit.test("neg", function(assert) {
    assert.equal(_.neg(2), -2, 'opposite of 2');
    assert.equal(_.neg(-2), 2, 'opposite of -2');
    assert.equal(_.neg(true), -1, 'opposite of true');
  });

  QUnit.test("eq", function(assert) {
    assert.equal(_.eq(1, 1), true, '1 == 1');
    assert.equal(_.eq(1, true), true, '1 == true');
    assert.equal(_.eq(1, false), false, '1 != false');
    assert.equal(_.eq(1, '1'), true, '1 == "1"');
    assert.equal(_.eq(1, 'one'), false, '1 != "one"');
    assert.equal(_.eq(0, 0), true, '0 == 0');
    assert.equal(_.eq(0, false), true, '0 == false');
    assert.equal(_.eq(0, '0'), true, '0 == "0"');
    assert.equal(_.eq({}, {}), false, '{} == {}');
    assert.equal(false, false, 'failing placeholder');
    assert.equal(_.eq(0, 0, 1), false, 'compares a list of arguments');
    assert.equal(_.eq([0, 0, 1]), false, 'compares a list of arguments, when specified as an array');
  });
  QUnit.test("seq", function(assert) {
    assert.equal(_.seq(1, 1), true, '1 === 1');
    assert.equal(_.seq(1, '1'), false, '1 !== "1"');
    assert.equal(_.seq(0, 0, 1), false, 'compares a list of arguments');
    assert.equal(_.seq([0, 0, 1]), false, 'compares a list of arguments, when specified as an array');
  });
  QUnit.test("neq", function(assert) {
    assert.equal(_.neq('a', 'b'), true, '"a" != "b"');
    assert.equal(_.neq(1, '1'), false, '1 == "1"');
    assert.equal(_.neq(0, 0, 1), true, 'compares a list of arguments');
    assert.equal(_.neq([0, 0, 1]), true, 'compares a list of arguments, when specified as an array');
  });
  QUnit.test("sneq", function(assert) {
    assert.equal(_.sneq('a', 'b'), true, '"a" !== "b"');
    assert.equal(_.sneq(1, '1'), true, '1 !== "1"');
    assert.equal(_.sneq(0, 0, 1), true, 'compares a list of arguments');
    assert.equal(_.sneq([0, 0, 1]), true, 'compares a list of arguments, when specified as an array');
  });
  QUnit.test("not", function(assert) {
    assert.equal(_.not(true), false, 'converts true to false');
    assert.equal(_.not(false), true, 'converts false to true');
    assert.equal(_.not('truthy'), false, 'converts truthy values to false');
    assert.equal(_.not(null), true, 'converts falsy values to true');
  });
  QUnit.test("gt", function(assert) {
    assert.equal(_.gt(3, 2), true, '3 > 2');
    assert.equal(_.gt(1, 3), false, '1 > 3');
    assert.equal(_.gt(1, 2, 1), false, 'compares a list of arguments');
    assert.equal(_.gt([1, 2, 1]), false, 'compares a list of arguments, when specified as an array');
  });
  QUnit.test("lt", function(assert) {
    assert.equal(_.lt(3, 2), false, '3 < 2');
    assert.equal(_.lt(1, 3), true, '1 < 3');
    assert.equal(_.lt(1, 2, 1), false, 'compares a list of arguments');
    assert.equal(_.lt([1, 2, 1]), false, 'compares a list of arguments, when specified as an array');
  });
  QUnit.test("gte", function(assert) {
    assert.equal(_.gte(3, 2), true, '3 >= 2');
    assert.equal(_.gte(1, 3), false, '1 >= 3');
    assert.equal(_.gte(3, 3), true, '3 >= 3');
    assert.equal(_.gte(2, 3, 1), false, 'compares a list of arguments');
    assert.equal(_.gte([2, 3, 1]), false, 'compares a list of arguments, when specified as an array');
  });
  QUnit.test("lte", function(assert) {
    assert.equal(_.lte(3, 2), false, '3 <= 2');
    assert.equal(_.lte(1, 3), true, '1 <= 3');
    assert.equal(_.lte(3, 3), true, '3 <= 3');
    assert.equal(_.lte(2, 2, 1), false, 'compares a list of arguments');
    assert.equal(_.lte([2, 2, 1]), false, 'compares a list of arguments, when specified as an array');
  });
  QUnit.test("bitwiseAnd", function(assert) {
    assert.equal(_.bitwiseAnd(1, 1), 1, '1 & 1');
    assert.equal(_.bitwiseAnd(1, 0), 0, '1 & 0');
    assert.equal(_.bitwiseAnd(1, 1, 0), 0, 'operates on multiple arguments');
    assert.equal(_.bitwiseAnd([1, 1, 0]), 0, 'operates on multiple arguments, when specified as an array');
  });
  QUnit.test("bitwiseOr", function(assert) {
    assert.equal(_.bitwiseOr(1, 1), 1, '1 | 1');
    assert.equal(_.bitwiseOr(1, 0), 1, '1 | 0');
    assert.equal(_.bitwiseOr(1, 1, 2), 3, 'operates on multiple arguments');
    assert.equal(_.bitwiseOr([1, 1, 2]), 3, 'operates on multiple arguments, when specified as an array');
  });
  QUnit.test("bitwiseXor", function(assert) {
    assert.equal(_.bitwiseXor(1, 1), 0, '1 ^ 1');
    assert.equal(_.bitwiseXor(1, 2), 3, '1 ^ 2');
    assert.equal(_.bitwiseXor(1, 2, 3), 0, 'operates on multiple arguments');
    assert.equal(_.bitwiseXor([1, 2, 3]), 0, 'operates on multiple arguments, when specified as an array');
  });
  QUnit.test("bitwiseNot", function(assert) {
    assert.equal(_.bitwiseNot(1), -2, '~1');
    assert.equal(_.bitwiseNot(2), -3, '~2');
  });
  QUnit.test("bitwiseLeft", function(assert) {
    assert.equal(_.bitwiseLeft(1, 1), 2, '1 << 1');
    assert.equal(_.bitwiseLeft(1, 0), 1, '1 << 0');
    assert.equal(_.bitwiseLeft(1, 1, 1), 4, 'operates on multiple arguments');
    assert.equal(_.bitwiseLeft([1, 1, 1]), 4, 'operates on multiple arguments, when specified as an array');
  });
  QUnit.test("bitwiseRight", function(assert) {
    assert.equal(_.bitwiseRight(1, 1), 0, '1 >> 1');
    assert.equal(_.bitwiseRight(2, 1), 1, '2 >> 1');
    assert.equal(_.bitwiseRight(3, 1, 1), 0, 'operates on multiple arguments');
    assert.equal(_.bitwiseRight([3, 1, 1]), 0, 'operates on multiple arguments, when specified as an array');
  });
  QUnit.test("bitwiseZ", function(assert) {
    assert.equal(_.bitwiseZ(-1, 1), 2147483647, '-1 >>> 1');
    assert.equal(_.bitwiseZ(-1, 1, 1), 1073741823, 'operates on multiple arguments');
    assert.equal(_.bitwiseZ([-1, 1, 1]), 1073741823, 'operates on multiple arguments, when specified as an array');
  });

});
