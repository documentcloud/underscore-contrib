$(document).ready(function() {

  QUnit.module("underscore.array.builders");

  QUnit.test("cat", function(assert) {
    // no args
    assert.deepEqual(_.cat(), [], 'should return an empty array when given no args');

    // one arg
    assert.deepEqual(_.cat([]), [], 'should concatenate one empty array');
    assert.deepEqual(_.cat([1,2,3]), [1,2,3], 'should concatenate one homogenious array');
    var result = _.cat([1, "2", [3], {n: 4}]);
    assert.deepEqual(result, [1, "2", [3], {n: 4}], 'should concatenate one heterogenious array');
    result = (function(){ return _.cat(arguments); })(1, 2, 3);
    assert.deepEqual(result, [1, 2, 3], 'should concatenate the arguments object');

    // two args
    assert.deepEqual(_.cat([1,2,3],[4,5,6]), [1,2,3,4,5,6], 'should concatenate two arrays');
    result = (function(){ return _.cat(arguments, [4,5,6]); })(1,2,3);
    assert.deepEqual(result, [1,2,3,4,5,6], 'should concatenate an array and an arguments object');

    // > 2 args
    var a = [1,2,3];
    var b = [4,5,6];
    var c = [7,8,9];
    var d = [0,0,0];
    assert.deepEqual(_.cat(a,b,c), [1,2,3,4,5,6,7,8,9], 'should concatenate three arrays');
    assert.deepEqual(_.cat(a,b,c,d), [1,2,3,4,5,6,7,8,9,0,0,0], 'should concatenate four arrays');
    result = (function(){ return _.cat(arguments,b,c,d); }).apply(null, a);
    assert.deepEqual(result, [1,2,3,4,5,6,7,8,9,0,0,0], 'should concatenate four arrays, including an arguments object');

    // heterogenious types
    assert.deepEqual(_.cat([1],2), [1,2], 'should concatenate mixed types');
    assert.deepEqual(_.cat([1],2,3), [1,2,3], 'should concatenate mixed types');
    assert.deepEqual(_.cat(1,2,3), [1,2,3], 'should concatenate mixed types');
    result = (function(){ return _.cat(arguments, 4,5,6); })(1,2,3);
    assert.deepEqual(result, [1,2,3,4,5,6], 'should concatenate mixed types, including an arguments object');
  });

  QUnit.test("cons", function(assert) {
    assert.deepEqual(_.cons(0, []), [0], 'should insert the first arg into the array given as the second arg');
    assert.deepEqual(_.cons(1, [2]), [1,2], 'should insert the first arg into the array given as the second arg');
    assert.deepEqual(_.cons([0], [1,2,3]), [[0],1,2,3], 'should insert the first arg into the array given as the second arg');
    assert.deepEqual(_.cons(1, 2), [1,2], 'should create a pair if the second is not an array');
    assert.deepEqual(_.cons([1], 2), [[1],2], 'should create a pair if the second is not an array');
    result = (function(){ return _.cons(0, arguments); })(1,2,3);
    assert.deepEqual(result, [0,1,2,3], 'should construct an array given an arguments object as the tail');

    var a = [1,2,3];
    var result = _.cons(0,a);

    assert.deepEqual(a, [1,2,3], 'should not modify the original tail');
  });

  QUnit.test("chunk", function(assert) {
    var a = _.range(4);
    var b = _.range(5);
    var c = _.range(7);

    assert.deepEqual(_.chunk(a, 2), [[0,1],[2,3]], 'should chunk into the size given');
    assert.deepEqual(_.chunk(b, 2), [[0,1],[2,3]], 'should chunk into the size given. Extras are dropped');

    var result = _.chunk(a, 2);
    assert.deepEqual(a, _.range(4), 'should not modify the original array');

    assert.deepEqual(_.chunk(c, 3, [7,8]), [[0,1,2],[3,4,5],[6,7,8]], 'should allow one to specify a padding array');
    assert.deepEqual(_.chunk(b, 3, 9), [[0,1,2],[3,4,9]], 'should allow one to specify a padding value');
  });

  QUnit.test("chunkAll", function(assert) {
    var a = _.range(4);
    var b = _.range(10);

    assert.deepEqual(_.chunkAll(a, 2), [[0,1],[2,3]], 'should chunk into the size given');
    assert.deepEqual(_.chunkAll(b, 4), [[0,1,2,3],[4,5,6,7],[8,9]], 'should chunk into the size given, with a small end');

    var result = _.chunkAll(a, 2);
    assert.deepEqual(a, _.range(4), 'should not modify the original array');

    assert.deepEqual(_.chunkAll(b, 2, 4), [[0,1],[4,5],[8,9]], 'should chunk into the size given, with skips');
    assert.deepEqual(_.chunkAll(b, 3, 4), [[0,1,2],[4,5,6],[8,9]], 'should chunk into the size given, with skips and a small end');
  });

  QUnit.test("mapcat", function(assert) {
    var a = [1,2,3];
    var commaize = function(e) { return _.cons(e, [","]); };

    assert.deepEqual(_.mapcat(a, commaize), [1, ",", 2, ",", 3, ","], 'should return an array with all intermediate mapped arrays concatenated');
  });

  QUnit.test("interpose", function(assert) {
    var a = [1,2,3];
    var b = [1,2];
    var c = [1];

    assert.deepEqual(_.interpose(a, 0), [1,0,2,0,3], 'should put the 2nd arg between the elements of the array given');
    assert.deepEqual(_.interpose(b, 0), [1,0,2], 'should put the 2nd arg between the elements of the array given');
    assert.deepEqual(_.interpose(c, 0), [1], 'should return the array given if nothing to interpose');
    assert.deepEqual(_.interpose([], 0), [], 'should return an empty array given an empty array');

    var result = _.interpose(b,0);
    assert.deepEqual(b, [1,2], 'should not modify the original array');
  });

  QUnit.test("weave", function(assert) {
    var a = [1,2,3];
    var b = [1,2];
    var c = ['a', 'b', 'c'];
    var d = [1, [2]];

    // zero
    assert.deepEqual(_.weave(), [], 'should weave zero arrays');

    // one
    assert.deepEqual(_.weave([]), [], 'should weave one array');
    assert.deepEqual(_.weave([1,[2]]), [1,[2]], 'should weave one array');

    // two
    assert.deepEqual(_.weave(a,b), [1,1,2,2,3], 'should weave two arrays');
    assert.deepEqual(_.weave(a,a), [1,1,2,2,3,3], 'should weave two arrays');
    assert.deepEqual(_.weave(c,a), ['a',1,'b',2,'c',3], 'should weave two arrays');
    assert.deepEqual(_.weave(a,d), [1,1,2,[2],3], 'should weave two arrays');

    // > 2
    assert.deepEqual(_.weave(a,b,c), [1,1,'a',2,2,'b',3,'c'], 'should weave more than two arrays');
    assert.deepEqual(_.weave(a,b,c,d), [1,1,'a',1,2,2,'b',[2],3,'c'], 'should weave more than two arrays');
  });

  QUnit.test("repeat", function(assert) {
    assert.deepEqual(_.repeat(3,1), [1,1,1], 'should build an array of size n with the specified element in each slot');
    assert.deepEqual(_.repeat(0), [], 'should return an empty array if given zero and no repeat arg');
    assert.deepEqual(_.repeat(0,9999), [], 'should return an empty array if given zero and some repeat arg');
  });

  QUnit.test("cycle", function(assert) {
    var a = [1,2,3];

    assert.deepEqual(_.cycle(3, a), [1,2,3,1,2,3,1,2,3], 'should build an array with the specified array contents repeated n times');
    assert.deepEqual(_.cycle(0, a), [], 'should return an empty array if told to repeat zero times');
    assert.deepEqual(_.cycle(-1000, a), [], 'should return an empty array if told to repeat negative times');
  });

  QUnit.test("splitAt", function(assert) {
    var a = [1,2,3,4,5];

    assert.deepEqual(_.splitAt(a, 2), [[1,2],[3,4,5]], 'should bifurcate an array at a given index');
    assert.deepEqual(_.splitAt(a, 0), [[], [1,2,3,4,5]], 'should bifurcate an array at a given index');
    assert.deepEqual(_.splitAt(a, 5), [[1,2,3,4,5],[]], 'should bifurcate an array at a given index');
    assert.deepEqual(_.splitAt([], 5), [[],[]], 'should bifurcate an array at a given index');
  });

  QUnit.test("iterateUntil", function(assert) {
    var dec = function(n) { return n - 1; };
    var isPos = function(n) { return n > 0; };

    assert.deepEqual(_.iterateUntil(dec, isPos, 6), [5,4,3,2,1], 'should build an array, decrementing a number while positive');
  });

  QUnit.test("takeSkipping", function(assert) {
    assert.deepEqual(_.takeSkipping(_.range(5), 0), [], 'should take nothing if told to skip by zero');
    assert.deepEqual(_.takeSkipping(_.range(5), -1), [], 'should take nothing if told to skip by negative');
    assert.deepEqual(_.takeSkipping(_.range(5), 100), [0], 'should take first element if told to skip by big number');
    assert.deepEqual(_.takeSkipping(_.range(5), 1), [0,1,2,3,4], 'should take every element in an array');
    assert.deepEqual(_.takeSkipping(_.range(10), 2), [0,2,4,6,8], 'should take every 2nd element in an array');
  });

  QUnit.test("reductions", function(assert) {
    var result = _.reductions([1,2,3,4,5], function(agg, n) {
      return agg + n;
    }, 0);

    assert.deepEqual(result, [1,3,6,10,15], 'should retain each intermediate step in a reduce');
  });

  QUnit.test("keepIndexed", function(assert) {
    var a = ['a', 'b', 'c', 'd', 'e'];
    var b = [-9, 0, 29, -7, 45, 3, -8];
    var oddy = function(k, v) { return _.isOdd(k) ? v : undefined; };
    var posy = function(k, v) { return _.isPositive(v) ? k : undefined; };

    assert.deepEqual(_.keepIndexed(a, _.isOdd), [false,true,false,true,false], 'runs the predciate on the index, and not the element');

    assert.deepEqual(_.keepIndexed(a, oddy), ['b', 'd'], 'keeps elements whose index passes a truthy test');
    assert.deepEqual(_.keepIndexed(b, posy), [2,4,5], 'keeps elements whose index passes a truthy test');
    assert.deepEqual(_.keepIndexed(_.range(10), oddy), [1,3,5,7,9], 'keeps elements whose index passes a truthy test');
  });

  QUnit.test('reverseOrder', function(assert) {
    var arr = [1, 2, 3];

    assert.deepEqual(_.reverseOrder(arr), [3, 2, 1], 'returns an array whose elements are in the opposite order of the argument');
    assert.deepEqual(arr, [1, 2, 3], 'should not mutate the argument');

    var throwingFn = function() { _.reverseOrder('string'); };
    assert.throws(throwingFn, TypeError, 'throws a TypeError when given a string');

    var argObj = (function() { return arguments; })(1, 2, 3);
    assert.deepEqual(_.reverseOrder(argObj), [3, 2, 1], 'works with other array-like objects');
  });

  QUnit.test('collate', function(assert) {
    var properOrder = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    var itemsBare = ['green', 'yellow', 'violet', 'red', 'indigo', 'orange', 'blue'];
    var itemsObj = [{'prop':'green'}, {'prop':'yellow'}, {'prop':'violet'}, {'prop':'red'}, {'prop':'indigo'}, {'prop':'orange'}, {'prop':'blue'}];
    var itemsRaw = ['g', 'y', 'v', 'r', 'i', 'o', 'b'];
    var rawConvertFunc = function(val) {
      return ({
        'r': 'red',
        'o': 'orange',
        'y': 'yellow',
        'g': 'green',
        'b': 'blue',
        'i': 'indigo',
        'v': 'violet'
      })[val];
    };

    assert.deepEqual(_.collate(itemsBare, properOrder), properOrder, 'returns an array of scalars whose elements are ordered according to provided lexicon');
    assert.deepEqual(_.collate(itemsObj, properOrder, 'prop'), [{'prop':'red'}, {'prop':'orange'}, {'prop':'yellow'}, {'prop':'green'}, {'prop':'blue'}, {'prop':'indigo'}, {'prop':'violet'}], 'returns an array of objects that are ordered according to provided lexicon');
    assert.deepEqual(_.collate(itemsRaw, properOrder, rawConvertFunc), ['r', 'o', 'y', 'g', 'b', 'i', 'v'], 'returns an array whose elements are sorted by derived value according to provided lexicon');
  });

  QUnit.test('combinations', function(assert){
    assert.deepEqual(_.combinations([1]),[[1]],'single array will merely be wrapped');
    assert.deepEqual(_.combinations([1],[2],[3]),[[1,2,3]],'arrays with single elements will merely be merged');
    var arr1 = [1,2], arr2 = [3,4,5], arr3 = [6,7],
        expected = [[1,3,6],[1,3,7],[1,4,6],[1,4,7],[1,5,6],[1,5,7],[2,3,6],[2,3,7],[2,4,6],[2,4,7],[2,5,6],[2,5,7]];
    assert.deepEqual(_.combinations(arr1,arr2,arr3),expected,'array with all possible combinations is returned');

    assert.deepEqual(_.combinations(["a",["b"]],[[1]]),[["a",[1]],[["b"],[1]]],'initial arrays can contain array elements which are then preserved');
  });
});
