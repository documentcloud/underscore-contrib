$(document).ready(function() {

  module("underscore.array.builders");

  test("cat", function() {
    // no args
    deepEqual(_.cat(), [], 'should return an empty array when given no args');
    
    // one arg
    deepEqual(_.cat([]), [], 'should concatenate one empty array');
    deepEqual(_.cat([1,2,3]), [1,2,3], 'should concatenate one homogenious array');
    var result = _.cat([1, "2", [3], {n: 4}]);
    deepEqual(result, [1, "2", [3], {n: 4}], 'should concatenate one heterogenious array');
    result = (function(){ return _.cat(arguments); })(1, 2, 3);
    deepEqual(result, [1, 2, 3], 'should concatenate the arguments object');

    // two args
    deepEqual(_.cat([1,2,3],[4,5,6]), [1,2,3,4,5,6], 'should concatenate two arrays');
    result = (function(){ return _.cat(arguments, [4,5,6]); })(1,2,3);
    deepEqual(result, [1,2,3,4,5,6], 'should concatenate an array and an arguments object');

    // > 2 args
    var a = [1,2,3];
    var b = [4,5,6];
    var c = [7,8,9];
    var d = [0,0,0];
    deepEqual(_.cat(a,b,c), [1,2,3,4,5,6,7,8,9], 'should concatenate three arrays');
    deepEqual(_.cat(a,b,c,d), [1,2,3,4,5,6,7,8,9,0,0,0], 'should concatenate four arrays');
    result = (function(){ return _.cat(arguments,b,c,d); }).apply(null, a);
    deepEqual(result, [1,2,3,4,5,6,7,8,9,0,0,0], 'should concatenate four arrays, including an arguments object');

    // heterogenious types
    deepEqual(_.cat([1],2), [1,2], 'should concatenate mixed types');
    deepEqual(_.cat([1],2,3), [1,2,3], 'should concatenate mixed types');
    deepEqual(_.cat(1,2,3), [1,2,3], 'should concatenate mixed types');
    result = (function(){ return _.cat(arguments, 4,5,6); })(1,2,3);
    deepEqual(result, [1,2,3,4,5,6], 'should concatenate mixed types, including an arguments object');
  });

  test("cons", function() {
    deepEqual(_.cons(0, []), [0], 'should insert the first arg into the array given as the second arg');
    deepEqual(_.cons(1, [2]), [1,2], 'should insert the first arg into the array given as the second arg');
    deepEqual(_.cons([0], [1,2,3]), [[0],1,2,3], 'should insert the first arg into the array given as the second arg');
    deepEqual(_.cons(1, 2), [1,2], 'should create a pair if the second is not an array');
    deepEqual(_.cons([1], 2), [[1],2], 'should create a pair if the second is not an array');
    result = (function(){ return _.cons(0, arguments); })(1,2,3);
    deepEqual(result, [0,1,2,3], 'should construct an array given an arguments object as the tail');

    var a = [1,2,3];
    var result = _.cons(0,a);

    deepEqual(a, [1,2,3], 'should not modify the original tail');
  });

  test("partition", function() {
    var a = _.range(4);
    var b = _.range(5);
    var c = _.range(7);

    deepEqual(_.partition(a, 2), [[0,1],[2,3]], 'should partition into the size given');
    deepEqual(_.partition(b, 2), [[0,1],[2,3]], 'should partition into the size given. Extras are dropped');

    var result = _.partition(a, 2);
    deepEqual(a, _.range(4), 'should not modify the original array');

    deepEqual(_.partition(c, 3, [7,8]), [[0,1,2],[3,4,5],[6,7,8]], 'should allow one to specify a padding array');
    deepEqual(_.partition(b, 3, 9), [[0,1,2],[3,4,9]], 'should allow one to specify a padding value');
  });

  test("partitionAll", function() {
    var a = _.range(4);
    var b = _.range(10);

    deepEqual(_.partitionAll(a, 2), [[0,1],[2,3]], 'should partition into the size given');
    deepEqual(_.partitionAll(b, 4), [[0,1,2,3],[4,5,6,7],[8,9]], 'should partition into the size given, with a small end');

    var result = _.partitionAll(a, 2);
    deepEqual(a, _.range(4), 'should not modify the original array');

    deepEqual(_.partitionAll(b, 2, 4), [[0,1],[4,5],[8,9]], 'should partition into the size given, with skips');
    deepEqual(_.partitionAll(b, 3, 4), [[0,1,2],[4,5,6],[8,9]], 'should partition into the size given, with skips and a small end');
  });

  test("mapcat", function() {
    var a = [1,2,3];
    var commaize = function(e) { return _.cons(e, [","]); };

    deepEqual(_.mapcat(a, commaize), [1, ",", 2, ",", 3, ","], 'should return an array with all intermediate mapped arrays concatenated');
  });

  test("interpose", function() {
    var a = [1,2,3];
    var b = [1,2];
    var c = [1];

    deepEqual(_.interpose(a, 0), [1,0,2,0,3], 'should put the 2nd arg between the elements of the array given');
    deepEqual(_.interpose(b, 0), [1,0,2], 'should put the 2nd arg between the elements of the array given');
    deepEqual(_.interpose(c, 0), [1], 'should return the array given if nothing to interpose');
    deepEqual(_.interpose([], 0), [], 'should return an empty array given an empty array');

    var result = _.interpose(b,0);
    deepEqual(b, [1,2], 'should not modify the original array');
  });

  test("weave", function() {
    var a = [1,2,3];
    var b = [1,2];
    var c = ['a', 'b', 'c'];
    var d = [1, [2]];

    // zero
    deepEqual(_.weave(), [], 'should weave zero arrays');

    // one
    deepEqual(_.weave([]), [], 'should weave one array');
    deepEqual(_.weave([1,[2]]), [1,[2]], 'should weave one array');

    // two
    deepEqual(_.weave(a,b), [1,1,2,2,3], 'should weave two arrays');
    deepEqual(_.weave(a,a), [1,1,2,2,3,3], 'should weave two arrays');
    deepEqual(_.weave(c,a), ['a',1,'b',2,'c',3], 'should weave two arrays');
    deepEqual(_.weave(a,d), [1,1,2,[2],3], 'should weave two arrays');

    // > 2
    deepEqual(_.weave(a,b,c), [1,1,'a',2,2,'b',3,'c'], 'should weave more than two arrays');
    deepEqual(_.weave(a,b,c,d), [1,1,'a',1,2,2,'b',[2],3,'c'], 'should weave more than two arrays');
  });

  test("repeat", function() {
    deepEqual(_.repeat(3,1), [1,1,1], 'should build an array of size n with the specified element in each slot');
    deepEqual(_.repeat(0), [], 'should return an empty array if given zero and no repeat arg');
    deepEqual(_.repeat(0,9999), [], 'should return an empty array if given zero and some repeat arg');
  });

  test("cycle", function() {
    var a = [1,2,3];

    deepEqual(_.cycle(3, a), [1,2,3,1,2,3,1,2,3], 'should build an array with the specified array contents repeated n times');
    deepEqual(_.cycle(0, a), [], 'should return an empty array if told to repeat zero times');
    deepEqual(_.cycle(-1000, a), [], 'should return an empty array if told to repeat negative times');
  });

  test("splitAt", function() {
    var a = [1,2,3,4,5];

    deepEqual(_.splitAt(a, 2), [[1,2],[3,4,5]], 'should bifurcate an array at a given index');
    deepEqual(_.splitAt(a, 0), [[], [1,2,3,4,5]], 'should bifurcate an array at a given index');
    deepEqual(_.splitAt(a, 5), [[1,2,3,4,5],[]], 'should bifurcate an array at a given index');
    deepEqual(_.splitAt([], 5), [[],[]], 'should bifurcate an array at a given index');
  });

});
