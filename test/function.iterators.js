$(document).ready(function() {
  
  var undefined = void 0;
  
  function sum(x, y) { return x + y; }

  module("underscore.function.iterators");

  test("List", function() {
    var i = _.iterators.List([1, 2, 3, 4, 5]);
    equal(i(), 1, "should return the first element of the underlying array");
    equal(i(), 2, "should return the next element of the underlying array");
    equal(i(), 3, "should return the next element of the underlying array");
    equal(i(), 4, "should return the next element of the underlying array");
    equal(i(), 5, "should return the next element of the underlying array");
    equal(i(), undefined, "should return undefined when out of elements");
    
    i = _.iterators.List([1, [2, 3, [4]], 5])
    equal(i(), 1, "should return the first element of the underlying array");
    notEqual(i(), 2, "should not do a deep traverse");
    equal(i(), 5, "should return the next element of the underlying array");
    equal(i(), undefined, "should return undefined when out of elements");
    
    i = _.iterators.List([])
    equal(i(), undefined, "should return undefined when there are no elements");
  
    i = _.iterators.List([[], [[]]])
    notEqual(i(), undefined, "should have a values given an empty tree");
  });

  test("Tree", function () {
    var i = _.iterators.Tree([]);
    equal(i(), undefined, "should return undefined for an empty array");
  
    i = _.iterators.Tree([[], [[]]]);
    equal(i(), undefined, "should return undefined for an empty tree");
  
    i = _.iterators.Tree([1, 2, 3, 4, 5]);
    equal(i(), 1, "should return the first element of the underlying array");
    equal(i(), 2, "should return the next element of the underlying array");
    equal(i(), 3, "should return the next element of the underlying array");
    equal(i(), 4, "should return the next element of the underlying array");
    equal(i(), 5, "should return the next element of the underlying array");
    equal(i(), undefined, "should return undefined when out of elements");
    
    i = _.iterators.Tree([1, [2, 3, [4]], 5]);
    equal(i(), 1, "should return the first element of the underlying array");
    equal(i(), 2, "should return the next element of the underlying array");
    equal(i(), 3, "should return the next element of the underlying array");
    equal(i(), 4, "should return the next element of the underlying array");
    equal(i(), 5, "should return the next element of the underlying array");
    equal(i(), undefined, "should return undefined when out of elements");
  });
  
  test("Reduce", function () {
    
    equal( _.iterators.reduce(_.iterators.Tree([1, [2, 3, [4]], 5]), sum, 0), 15, "should fold an iterator with many elements");

    equal( _.iterators.reduce(_.iterators.Tree([[[4], []]]), sum, 42), 46, "should fold an iterator with one element");

    equal( _.iterators.reduce(_.iterators.Tree([[], [[]]]), sum, 42), 42, "should fold an empty iterator");
      
    equal( _.iterators.reduce(_.iterators.Tree([1, [2, 3, [4]], 5]), sum), 15, "should fold an array with two or more elements");
      
    equal( _.iterators.reduce(_.iterators.Tree([[[4], []]]), sum), 4, "should fold an array with one element");;
      
    equal( _.iterators.reduce(_.iterators.Tree([[[], []]]), sum), undefined, "should fold an array with no elements");
  });
  
  test("Accumulate", function () {
    var i = _.iterators.accumulate(_.iterators.Tree([1, [2, 3, [4]], 5]), sum, 0)
    equal(i(), 1, "should map an iterator with many elements");
    equal(i(), 3, "should map an iterator with many elements");
    equal(i(), 6, "should map an iterator with many elements");
    equal(i(), 10, "should map an iterator with many elements");
    equal(i(), 15, "should map an iterator with many elements");
    equal(i(), undefined);
  
    i = _.iterators.accumulate(_.iterators.Tree([[[4], []]]), sum, 42);
    equal(i(), 46, "should map an iterator with one element");
    equal(i(), undefined)
  
    i = _.iterators.accumulate(_.iterators.Tree([[[], []]]), sum, 42);
    equal(i(), undefined, "should map an empty iterator");
      
    i = _.iterators.accumulate(_.iterators.Tree([1, [2, 3, [4]], 5]), sum);
    equal(i(), 1, "should map an iterator with many elements");
    equal(i(), 3, "should map an iterator with many elements");
    equal(i(), 6, "should map an iterator with many elements");
    equal(i(), 10, "should map an iterator with many elements");
    equal(i(), 15, "should map an iterator with many elements");
    equal(i(), undefined);
  
    i = _.iterators.accumulate(_.iterators.Tree([[[4], []]]), sum);
    equal(i(), 4, "should map an iterator with one element");
    equal(i(), undefined);
  
    i = _.iterators.accumulate(_.iterators.Tree([[[], []]]), sum);
    equal(i(), undefined);
    
  });

});
