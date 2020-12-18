$(document).ready(function() {

  QUnit.module("underscore.array.selectors");

  QUnit.test("second", function(assert) {
    var a = [1,2,3,4,5];

    assert.equal(_.second(a), 2, 'should retrieve the 2nd element in an array');
    assert.deepEqual(_.second(a, 5), [2,3,4,5], 'should retrieve all but the first element in an array');
    assert.deepEqual(_.map([a,_.rest(a)], _.second), [2,3], 'should be usable in _.map');
  });

  QUnit.test("third", function(assert) {
    var a = [1,2,3,4,5];

    assert.equal(_.third(a), 3, 'should retrieve the 3rd element in an array');
    assert.deepEqual(_.third(a, 5), [3,4,5], 'should retrieve all but the first and second element in an array');
    assert.deepEqual(_.map([a,_.rest(a)], _.third), [3,4], 'should be usable in _.map');
  });

  QUnit.test("takeWhile", function(assert) {
    var isNeg = function(n) { return n < 0; };

    assert.deepEqual(_.takeWhile([-2,-1,0,1,2], isNeg), [-2,-1], 'should take elements until a function goes truthy');
    assert.deepEqual(_.takeWhile([1,-2,-1,0,1,2], isNeg), [], 'should take elements until a function goes truthy');
  });

  QUnit.test("dropWhile", function(assert) {
    var isNeg = function(n) { return n < 0; };

    assert.deepEqual(_.dropWhile([-2,-1,0,1,2], isNeg), [0,1,2], 'should drop elements until a function goes truthy');
    assert.deepEqual(_.dropWhile([0,1,2], isNeg), [0,1,2], 'should drop elements until a function goes truthy');
    assert.deepEqual(_.dropWhile([-2,-1], isNeg), [], 'should drop elements until a function goes truthy');
    assert.deepEqual(_.dropWhile([1,-2,-1,0,1,2], isNeg), [1,-2,-1,0,1,2], 'should take elements until a function goes truthy');
    assert.deepEqual(_.dropWhile([], isNeg), [], 'should handle empty arrays');
  });

  QUnit.test("splitWith", function(assert) {
    var a = [1,2,3,4,5];
    var lessEq3p = function(n) { return n <= 3; };
    var lessEq3p$ = function(n) { return (n <= 3) ? true : null; };

    assert.deepEqual(_.splitWith(a, lessEq3p), [[1,2,3], [4,5]], 'should split an array when a function goes false');
    assert.deepEqual(_.splitWith(a, lessEq3p$), [[1,2,3], [4,5]], 'should split an array when a function goes false');
    assert.deepEqual(_.splitWith([], lessEq3p$), [[],[]], 'should split an empty array into two empty arrays');
  });

  QUnit.test("partitionBy", function(assert) {
    var a = [1, 2, null, false, undefined, 3, 4];

    assert.deepEqual(_.partitionBy(a, _.truthy), [[1,2], [null, false, undefined], [3,4]], 'should partition an array as a given predicate changes truth sense');
  });

  QUnit.test("best", function(assert) {
    var a = [1,2,3,4,5];

    assert.deepEqual(_.best(a, function(x,y) { return x > y; }), 5, 'should identify the best value based on criteria');
  });

  QUnit.test("keep", function(assert) {
    var a = _.range(10);
    var eveny = function(e) { return (_.isEven(e)) ? e : undefined; };

    assert.deepEqual(_.keep(a, eveny), [0,2,4,6,8], 'should keep only even numbers in a range tagged with null fails');
    assert.deepEqual(_.keep(a, _.isEven), [true, false, true, false, true, false, true, false, true, false], 'should keep all existy values corresponding to a predicate over a range');
  });

  QUnit.test("nth", function(assert) {
    var a = ['a','b','c'];
    var b = [['a'],['b'],[]];

    assert.equal(_.nth(a,0), 'a', 'should return the element at a given index into an array');
    assert.equal(_.nth(a,100), undefined, 'should return undefined if out of bounds');
    assert.deepEqual(_.map(b,function(e) { return _.nth(e,0); }), ['a','b',undefined], 'should be usable in _.map');
  });

  QUnit.test("nths", function(assert) {
    var a = ['a','b','c', 'd'];

    assert.deepEqual(_.nths(a,1), ['b'], 'should return the element at a given index into an array');
    assert.deepEqual(_.nths(a,1,3), ['b', 'd'], 'should return the elements at given indices into an array');
    assert.deepEqual(_.nths(a,1,5,3), ['b', undefined, 'd'], 'should return undefined if out of bounds');

    assert.deepEqual(_.nths(a,[1]), ['b'], 'should return the element at a given index into an array');
    assert.deepEqual(_.nths(a,[1,3]), ['b', 'd'], 'should return the elements at given indices into an array');
    assert.deepEqual(_.nths(a,[1,5,3]), ['b', undefined, 'd'], 'should return undefined if out of bounds');
  });

  QUnit.test("valuesAt", function(assert) {
    assert.equal(_.valuesAt, _.nths, 'valuesAt should be alias for nths');
  });

  QUnit.test("binPick", function(assert) {
    var a = ['a','b','c', 'd'];

    assert.deepEqual(_.binPick(a, false, true), ['b'], 'should return the element at a given index into an array');
    assert.deepEqual(_.binPick(a, false, true, false, true), ['b', 'd'], 'should return the elements at given indices into an array');
    assert.deepEqual(_.binPick(a, false, true, false, true, true), ['b', 'd', undefined], 'should return undefined if out of bounds');

    assert.deepEqual(_.binPick(a, [false, true]), ['b'], 'should return the element at a given index into an array');
    assert.deepEqual(_.binPick(a, [false, true, false, true]), ['b', 'd'], 'should return the elements at given indices into an array');
    assert.deepEqual(_.binPick(a, [false, true, false, true, true]), ['b', 'd', undefined], 'should return undefined if out of bounds');
  });
});

