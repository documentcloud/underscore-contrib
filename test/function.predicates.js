$(document).ready(function() {

  QUnit.module("underscore.function.predicates");

  QUnit.test("isInstanceOf", function(assert) {
    assert.equal(_.isInstanceOf([], Array),   true,  'should identify arrays');
    assert.equal(_.isInstanceOf(null, Array), false, 'should identify that null is not an array instance');
  });

  QUnit.test("isAssociative", function(assert) {
    assert.equal(_.isAssociative({}), true, 'should identify that a map is associative');
    assert.equal(_.isAssociative(function(){}), true, 'should identify that a function is associative');
    assert.equal(_.isAssociative([]), true, 'should identify that an array is associative');
    assert.equal(_.isAssociative(new Array(10)), true, 'should identify that an array is associative');

    assert.equal(_.isAssociative(1), false, 'should identify non-associative things');
    assert.equal(_.isAssociative(0), false, 'should identify non-associative things');
    assert.equal(_.isAssociative(-1), false, 'should identify non-associative things');
    assert.equal(_.isAssociative(3.14), false, 'should identify non-associative things');
    assert.equal(_.isAssociative('undefined'), false, 'should identify non-associative things');
    assert.equal(_.isAssociative(''), false, 'should identify non-associative things');
    assert.equal(_.isAssociative(NaN), false, 'should identify non-associative things');
    assert.equal(_.isAssociative(Infinity), false, 'should identify non-associative things');
    assert.equal(_.isAssociative(true), false, 'should identify non-associative things');
  });

  QUnit.test("isIndexed", function(assert) {
    assert.equal(_.isIndexed([]), true, 'should identify indexed objects');
    assert.equal(_.isIndexed([1,2,3]), true, 'should identify indexed objects');
    assert.equal(_.isIndexed(new Array(10)), true, 'should identify indexed objects');
    assert.equal(_.isIndexed(""), true, 'should identify indexed objects');
    assert.equal(_.isIndexed("abc"), true, 'should identify indexed objects');

    assert.equal(_.isIndexed(1), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(0), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(-1), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(3.14), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(undefined), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(NaN), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(Infinity), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(true), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(false), false, 'should identify when something is not an indexed object');
    assert.equal(_.isIndexed(function(){}), false, 'should identify when something is not an indexed object');
  });

  QUnit.test("isSequential", function(assert) {
    assert.equal(_.isSequential(new Array(10)), true, 'should identify sequential objects');
    assert.equal(_.isSequential([1,2]), true, 'should identify sequential objects');
    assert.equal(_.isSequential(arguments), true, 'should identify sequential objects');

    assert.equal(_.isSequential({}), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(function(){}), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(1), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(0), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(-1), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(3.14), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential('undefined'), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(''), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(NaN), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(Infinity), false, 'should identify when something is not sequential');
    assert.equal(_.isSequential(true), false, 'should identify when something is not sequential');
  });

  QUnit.test("isPlainObject", function(assert) {
    function SomeConstructor() {}
    assert.equal(_.isPlainObject({}), true, 'should identify empty objects');
    assert.equal(_.isPlainObject({a: 1, b: 2}), true, 'should identify objects');
    assert.equal(_.isPlainObject(Object.create(null)), false, 'should reject objects with no prototype');
    assert.equal(_.isPlainObject(new SomeConstructor), false, 'should reject instances constructed by something other than Object');

    assert.equal(_.isPlainObject([]), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(function(){}), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(null), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(1), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(0), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(-1), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(3.14), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject('undefined'), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(''), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(NaN), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(Infinity), false, 'should identify when something is not a plain object');
    assert.equal(_.isPlainObject(true), false, 'should identify when something is not a plain object');
  });


  QUnit.test("isEven", function(assert) {
    assert.equal(_.isEven(0), true, 'should identify even numbers');
    assert.equal(_.isEven(2), true, 'should identify even numbers');
    assert.equal(_.isEven(-2), true, 'should identify even numbers');
    assert.equal(_.isEven(1), false, 'should identify non-even numbers');
    assert.equal(_.isEven(null), false, 'should return false for non-numbers');
    assert.equal(_.isEven(undefined), false, 'should return false for non-numbers');
    assert.equal(_.isEven([]), false, 'should return false for non-numbers');
    assert.equal(_.isEven(NaN), false, 'should return false for non-numbers');
  });

  QUnit.test("isOdd", function(assert) {
    assert.equal(_.isOdd(1), true, 'should identify odd numbers');
    assert.equal(_.isOdd(33), true, 'should identify odd numbers');
    assert.equal(_.isOdd(-55), true, 'should identify odd numbers');
    assert.equal(_.isOdd(10), false, 'should identify non-odd numbers');
    assert.equal(_.isOdd(null), false, 'should return false for non-numbers');
    assert.equal(_.isOdd(undefined), false, 'should return false for non-numbers');
    assert.equal(_.isOdd([]), false, 'should return false for non-numbers');
    assert.equal(_.isOdd(NaN), false, 'should return false for non-numbers');
  });

  QUnit.test("isPositive", function(assert) {
    assert.equal(_.isPositive(1), true, 'should identify positive numbers');
    assert.equal(_.isPositive(-1), false, 'should identify non-positive numbers');
    assert.equal(_.isPositive(0), false, 'should identify non-positive numbers');
    assert.equal(_.isPositive(+0), false, 'should identify non-positive numbers');
  });

  QUnit.test("isNegative", function(assert) {
    assert.equal(_.isNegative(-1), true, 'should identify negative numbers');
    assert.equal(_.isNegative(0), false, 'should identify non-negative numbers');
    assert.equal(_.isNegative(110), false, 'should identify non-negative numbers');
    assert.equal(_.isNegative(-0), false, 'should identify non-negative numbers');
  });

  QUnit.test("isZero", function(assert) {
    assert.equal(_.isZero(0), true, 'should know zero');
    assert.equal(_.isZero(-0), true, 'should know zero');
    assert.equal(_.isZero(+0), true, 'should know zero');
    assert.equal(_.isZero(1), false, 'should know non-zero');
    assert.equal(_.isZero(-1), false, 'should know non-zero');
  });

  QUnit.test("isNumeric", function(assert) {
    // Integer Literals
    assert.equal(_.isNumeric("-10"), true, "should identify Negative integer string");
    assert.equal(_.isNumeric("0"), true, "should identify Zero string");
    assert.equal(_.isNumeric("5"), true, "should identify Positive integer string");
    assert.equal(_.isNumeric(-16), true, "should identify Negative integer number");
    assert.equal(_.isNumeric(0), true, "should identify Zero integer number");
    assert.equal(_.isNumeric(32), true, "should identify Positive integer number");
    assert.equal(_.isNumeric("040"), true, "should identify Octal integer literal string");
    assert.equal(_.isNumeric(0144), true, "should identify Octal integer literal");
    assert.equal(_.isNumeric("0xFF"), true, "should identify Hexadecimal integer literal string");
    assert.equal(_.isNumeric(0xFFF), true, "should identify Hexadecimal integer literal");

    // Foating-Point Literals
    assert.equal(_.isNumeric("-1.6"), true, "should identify Negative floating point string");
    assert.equal(_.isNumeric("4.536"), true, "should identify Positive floating point string");
    assert.equal(_.isNumeric(-2.6), true, "should identify Negative floating point number");
    assert.equal(_.isNumeric(3.1415), true, "should identify Positive floating point number");
    assert.equal(_.isNumeric(8e5), true, "should identify Exponential notation");
    assert.equal(_.isNumeric("123e-2"), true, "should identify Exponential notation string");

    // Non-Numeric values
    assert.equal(_.isNumeric(""), false, "should identify Empty string");
    assert.equal(_.isNumeric("        "), false, "should identify Whitespace characters string");
    assert.equal(_.isNumeric("\t\t"), false, "should identify Tab characters string");
    assert.equal(_.isNumeric("abcdefghijklm1234567890"), false, "should identify Alphanumeric character string");
    assert.equal(_.isNumeric("xabcdefx"), false, "should identify Non-numeric character string");
    assert.equal(_.isNumeric(true), false, "should identify Boolean true literal");
    assert.equal(_.isNumeric(false), false, "should identify Boolean false literal");
    assert.equal(_.isNumeric("bcfed5.2"), false, "should identify Number with preceding non-numeric characters");
    assert.equal(_.isNumeric("7.2acdgs"), false, "should identify Number with trailling non-numeric characters");
    assert.equal(_.isNumeric(undefined), false, "should identify Undefined value");
    assert.equal(_.isNumeric(null), false, "should identify Null value");
    assert.equal(_.isNumeric(NaN), false, "should identify NaN value");
    assert.equal(_.isNumeric(Infinity), false, "should identify Infinity primitive");
    assert.equal(_.isNumeric(Number.POSITIVE_INFINITY), false, "should identify Positive Infinity");
    assert.equal(_.isNumeric(Number.NEGATIVE_INFINITY), false, "should identify Negative Infinity");
    assert.equal(_.isNumeric(new Date(2009,1,1)), false, "should identify Date object");
    assert.equal(_.isNumeric({}), false, "should identify Empty object");
    assert.equal(_.isNumeric(function(){}), false, "should identify Instance of a function");
  });

  QUnit.test("isInteger and isFloat", function(assert) {
    var integerChecks = [
      {value: "-10", message: "should identify Negative integer string"},
      {value: "0", message: "should identify Zero string"},
      {value: "5", message: "should identify Positive integer string"},
      {value: -16, message: "should identify Negative integer number"},
      {value: 0, message: "should identify Zero integer number"},
      {value: 32, message: "should identify Positive integer number"},
      {value: "040", message: "should identify Octal integer literal string"},
      {value: 0144, message: "should identify Octal integer literal"},
      {value: "0xFF", message: "should identify Hexadecimal integer literal string"},
      {value: 0xFFF, message: "should identify Hexadecimal integer literal"},
      {value: 1.0, message: "should identify float versions of integers"},
      {value: 8e5, message: "Exponential notation"}
    ];

    var floatChecks = [
      {value: "-1.6", message: "should identify Negative floating point string"},
      {value: "4.536", message: "should identify Positive floating point string"},
      {value: -2.6, message: "should identify Negative floating point number"},
      {value: 3.1415, message: "should identify Positive floating point number"},
      {value: 8.11e1, message: "should identify Exponential notation "},
      {value: "123e-2", message: "should identify Exponential notation string"}
    ];

    var negativeChecks = [
      {value: "abc", message: "should identify non-numeric strings"},
      {value: undefined, message: "should identify undefined"},
      {value: NaN, message: "should identify NaN"},
      {value: null, message: "should identify null"},
      {value: Infinity, message: "should identify Infinity"}
    ];

    var testMultiple = function(cases, fn, result){
      for (var i = 0; i < cases.length; i++) {
        assert.equal(fn(cases[i].value), result, cases[i].message);
      }
    };

    testMultiple(integerChecks, _.isInteger, true);
    testMultiple(floatChecks, _.isInteger, false);
    testMultiple(negativeChecks, _.isInteger, false);

    testMultiple(integerChecks, _.isFloat, false);
    testMultiple(floatChecks, _.isFloat, true);
    testMultiple(negativeChecks, _.isFloat, false);
  });

  QUnit.test("isIncreasing", function(assert) {
    var inc = [1,2,3];
    var incNM = [1,2,3,3,4];
    var dec = [5,4,3,2,1];

    assert.equal(_.isIncreasing.apply(null, inc), true, 'should identify when its arguments monotonically increase');
    assert.equal(_.isIncreasing.apply(null, incNM), false, 'should identify when its arguments monotonically increase');
    assert.equal(_.isIncreasing.apply(null, dec), false, 'should identify when its arguments do not increase');
  });

  QUnit.test("isDecreasing", function(assert) {
    var inc = [1,2,3];
    var incNM = [1,2,3,3,4];
    var dec = [5,4,3,2,1];
    var decNM = [5,4,3,3,2,1];

    assert.equal(_.isDecreasing.apply(null, inc), false, 'should identify when its arguments monotonically decrease');
    assert.equal(_.isDecreasing.apply(null, incNM), false, 'should identify when its arguments monotonically decrease');
    assert.equal(_.isDecreasing.apply(null, dec), true, 'should identify when its arguments do not decrease');
    assert.equal(_.isDecreasing.apply(null, decNM), false, 'should identify when its arguments monotonically decrease');
  });

  QUnit.test("isValidDate", function(assert) {
    assert.equal(_.isValidDate(new Date), true, 'should recognize a fresh Date instance as valid');
    assert.equal(!_.isValidDate(new Date("bad date")), true, 'should recognize a Date constructed with gibberish');
  });

});
