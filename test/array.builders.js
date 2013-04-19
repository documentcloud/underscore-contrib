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
});
