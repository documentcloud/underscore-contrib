$(document).ready(function() {
  
  function sum (x, y) { return x + y; }
  function square (x) { return x * x; }
  function odd (x) { return x % 2 === 1; }
  function naturalSmallerThan (x)  { return _.iterators.List(_.range(0, x)); }


  QUnit.module("underscore.function.iterators");

  QUnit.test("List", function(assert) {
    var i = _.iterators.List([1, 2, 3, 4, 5]);
    assert.equal(i(), 1, "should return the first element of the underlying array");
    assert.equal(i(), 2, "should return the next element of the underlying array");
    assert.equal(i(), 3, "should return the next element of the underlying array");
    assert.equal(i(), 4, "should return the next element of the underlying array");
    assert.equal(i(), 5, "should return the next element of the underlying array");
    assert.equal(i(), void 0, "should return undefined when out of elements");
    
    i = _.iterators.List([1, [2, 3, [4]], 5]);
    assert.equal(i(), 1, "should return the first element of the underlying array");
    assert.notEqual(i(), 2, "should not do a deep traverse");
    assert.equal(i(), 5, "should return the next element of the underlying array");
    assert.equal(i(), void 0, "should return undefined when out of elements");
    
    i = _.iterators.List([]);
    assert.equal(i(), void 0, "should return undefined when there are no elements");
  
    i = _.iterators.List([[], [[]]]);
    assert.notEqual(i(), void 0, "should have a values given an empty tree");
  });

  QUnit.test("Tree", function(assert) {
    var i = _.iterators.Tree([]);
    assert.equal(i(), void 0, "should return undefined for an empty array");
  
    i = _.iterators.Tree([[], [[]]]);
    assert.equal(i(), void 0, "should return undefined for an empty tree");
  
    i = _.iterators.Tree([1, 2, 3, 4, 5]);
    assert.equal(i(), 1, "should return the first element of the underlying array");
    assert.equal(i(), 2, "should return the next element of the underlying array");
    assert.equal(i(), 3, "should return the next element of the underlying array");
    assert.equal(i(), 4, "should return the next element of the underlying array");
    assert.equal(i(), 5, "should return the next element of the underlying array");
    assert.equal(i(), void 0, "should return undefined when out of elements");
    
    i = _.iterators.Tree([1, [2, 3, [4]], 5]);
    assert.equal(i(), 1, "should return the first element of the underlying array");
    assert.equal(i(), 2, "should return the next element of the underlying array");
    assert.equal(i(), 3, "should return the next element of the underlying array");
    assert.equal(i(), 4, "should return the next element of the underlying array");
    assert.equal(i(), 5, "should return the next element of the underlying array");
    assert.equal(i(), void 0, "should return undefined when out of elements");
  });
  
  QUnit.test("Reduce", function(assert) {
    
    assert.equal( _.iterators.reduce(_.iterators.Tree([1, [2, 3, [4]], 5]), sum, 0), 15, "should fold an iterator with many elements");

    assert.equal( _.iterators.reduce(_.iterators.Tree([[[4], []]]), sum, 42), 46, "should fold an iterator with one element");

    assert.equal( _.iterators.reduce(_.iterators.Tree([[], [[]]]), sum, 42), 42, "should fold an empty iterator");
      
    assert.equal( _.iterators.reduce(_.iterators.Tree([1, [2, 3, [4]], 5]), sum), 15, "should fold an array with two or more elements");
      
    assert.equal( _.iterators.reduce(_.iterators.Tree([[[4], []]]), sum), 4, "should fold an array with one element");
      
    assert.equal( _.iterators.reduce(_.iterators.Tree([[[], []]]), sum), void 0, "should fold an array with no elements");
  });
  
  QUnit.test("Accumulate", function(assert) {
    var i = _.iterators.accumulate(_.iterators.Tree([1, [2, 3, [4]], 5]), sum, 0);
    assert.equal(i(), 1, "should map an iterator with many elements");
    assert.equal(i(), 3, "should map an iterator with many elements");
    assert.equal(i(), 6, "should map an iterator with many elements");
    assert.equal(i(), 10, "should map an iterator with many elements");
    assert.equal(i(), 15, "should map an iterator with many elements");
    assert.equal(i(), void 0);
  
    i = _.iterators.accumulate(_.iterators.Tree([[[4], []]]), sum, 42);
    assert.equal(i(), 46, "should map an iterator with one element");
    assert.equal(i(), void 0);
  
    i = _.iterators.accumulate(_.iterators.Tree([[[], []]]), sum, 42);
    assert.equal(i(), void 0, "should map an empty iterator");
      
    i = _.iterators.accumulate(_.iterators.Tree([1, [2, 3, [4]], 5]), sum);
    assert.equal(i(), 1, "should map an iterator with many elements");
    assert.equal(i(), 3, "should map an iterator with many elements");
    assert.equal(i(), 6, "should map an iterator with many elements");
    assert.equal(i(), 10, "should map an iterator with many elements");
    assert.equal(i(), 15, "should map an iterator with many elements");
    assert.equal(i(), void 0);
  
    i = _.iterators.accumulate(_.iterators.Tree([[[4], []]]), sum);
    assert.equal(i(), 4, "should map an iterator with one element");
    assert.equal(i(), void 0);
  
    i = _.iterators.accumulate(_.iterators.Tree([[[], []]]), sum);
    assert.equal(i(), void 0);
    
  });
  
  QUnit.test("Map", function(assert) {
    var i = _.iterators.map(_.iterators.Tree([1, [2, 3, [4]], 5]), square);
    assert.equal(i(), 1, "should map an iterator with many elements");
    assert.equal(i(), 4, "should map an iterator with many elements");
    assert.equal(i(), 9, "should map an iterator with many elements");
    assert.equal(i(), 16, "should map an iterator with many elements");
    assert.equal(i(), 25, "should map an iterator with many elements");
    assert.equal(i(), void 0);
  
    i = _.iterators.map(_.iterators.Tree([[[4], []]]), square);
    assert.equal(i(), 16, "should map an iterator with one element");
    assert.equal(i(), void 0);
  
    i = _.iterators.map(_.iterators.Tree([[[], []]]), square);
    assert.equal(i(), void 0, "should map an empty iterator");
  });

  QUnit.test("mapcat", function(assert) {
    var i = _.iterators.mapcat(_.iterators.Tree([1, [2]]), naturalSmallerThan);
    assert.equal(i(), 0, "should mapcat an iterator with many elements");
    assert.equal(i(), 0, "should mapcat an iterator with many elements");
    assert.equal(i(), 1, "should mapcat an iterator with many elements");
    assert.equal(i(), void 0);

    i = _.iterators.mapcat(_.iterators.Tree([[[1], []]]), naturalSmallerThan);
    assert.equal(i(), 0, "should mapcat an iterator with one element");
    assert.equal(i(), void 0);

    i = _.iterators.mapcat(_.iterators.Tree([[[], []]]), naturalSmallerThan);
    assert.equal(i(), void 0, "should mapcat an empty iterator");
  });

  QUnit.test("filter", function(assert) {
    var i = _.iterators.filter(_.iterators.Tree([1, [2, 3, [4]], 5]), odd);
    assert.equal(i(),1);
    assert.equal(i(),3);
    assert.equal(i(),5);
    assert.equal(i(),void 0);
    
    i = _.iterators.filter(_.iterators.Tree([[[4], []]]), odd);
    assert.equal(i(),void 0);
    
    i = _.iterators.filter(_.iterators.Tree([[[], []]]), odd);
    assert.equal(i(),void 0);
    
    i = _.iterators.filter(_.iterators.List([2, 4, 6, 8, 10]), odd);
    assert.equal(i(),void 0);
  });

  QUnit.test("slice", function(assert) {
    assert.expect(0);
    QUnit.test("with two parameter", function(assert) {
      assert.expect(0);
      QUnit.test("should return an identity iterator", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 0);
        assert.equal(i(),1);
        assert.equal(i(),2);
        assert.equal(i(),3);
        assert.equal(i(),4);
        assert.equal(i(),5);
        assert.equal(i(),void 0);
      });
      QUnit.test("should return a trailing iterator", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 1);
        assert.equal(i(),2);
        assert.equal(i(),3);
        assert.equal(i(),4);
        assert.equal(i(),5);
        assert.equal(i(),void 0);
      });
      QUnit.test("should return an empty iterator when out of range", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 5);
        assert.equal(i(),void 0);
      });
    });
    QUnit.test("with three parameters", function(assert) {
      assert.expect(0);
      QUnit.test("should return an identity iterator", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 0, 5);
        assert.equal(i(),1);
        assert.equal(i(),2);
        assert.equal(i(),3);
        assert.equal(i(),4);
        assert.equal(i(),5);
        assert.equal(i(),void 0);
        i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 0, 99);
        assert.equal(i(),1);
        assert.equal(i(),2);
        assert.equal(i(),3);
        assert.equal(i(),4);
        assert.equal(i(),5);
        assert.equal(i(),void 0);
      });
      QUnit.test("should return a leading iterator", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 0, 4);
        assert.equal(i(),1);
        assert.equal(i(),2);
        assert.equal(i(),3);
        assert.equal(i(),4);
        assert.equal(i(),void 0);
      });
      QUnit.test("should return a trailing iterator", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 1, 4);
        assert.equal(i(),2);
        assert.equal(i(),3);
        assert.equal(i(),4);
        assert.equal(i(),5);
        assert.equal(i(),void 0);
        i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 1, 99);
        assert.equal(i(),2);
        assert.equal(i(),3);
        assert.equal(i(),4);
        assert.equal(i(),5);
        assert.equal(i(),void 0);
      });
      QUnit.test("should return an inner iterator", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 1, 3);
        assert.equal(i(),2);
        assert.equal(i(),3);
        assert.equal(i(),4);
        assert.equal(i(),void 0);
      });
      QUnit.test("should return an empty iterator when given a zero length", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 1, 0);
        assert.equal(i(),void 0);
      });
      QUnit.test("should return an empty iterator when out of range", function(assert) {
        var i = _.iterators.slice(_.iterators.List([1, 2, 3, 4, 5]), 5, 1);
        assert.equal(i(),void 0);
      });
    });
  });

  QUnit.test("drop", function(assert) {
    assert.expect(0);
    QUnit.test("should drop the number of items dropped", function(assert) {
      var i = _.iterators.drop(_.iterators.List([1, 2, 3, 4, 5]), 2);
      assert.equal(i(),3);
      assert.equal(i(),4);
      assert.equal(i(),5);
      assert.equal(i(),void 0);
    });
    QUnit.test("should handle overdropping", function(assert) {
      var i = _.iterators.drop(_.iterators.List([1, 2, 3, 4, 5]), 99);
      assert.equal(i(),void 0);
    });
    QUnit.test("should handle underdropping", function(assert) {
      var i = _.iterators.drop(_.iterators.List([1, 2, 3, 4, 5]), 0);
      assert.equal(i(),1);
      assert.equal(i(),2);
      assert.equal(i(),3);
      assert.equal(i(),4);
      assert.equal(i(),5);
      assert.equal(i(),void 0);
    });
    QUnit.test("should default to one", function(assert) {
      var i = _.iterators.drop(_.iterators.List([1, 2, 3, 4, 5]));
      assert.equal(i(),2);
      assert.equal(i(),3);
      assert.equal(i(),4);
      assert.equal(i(),5);
      assert.equal(i(),void 0);
    });
  });
  
  QUnit.test("accumulateWithReturn", function(assert) {
    assert.expect(0);
    QUnit.test("should pass the state and result in a pair", function(assert) {
      var i = _.iterators.accumulateWithReturn(_.iterators.List([1, 2, 3, 4, 5]), function(state, element) {
        return [state + element, 'Total is ' + (state + element)];
      }, 0);
      assert.equal(i(),'Total is 1');
      assert.equal(i(),'Total is 3');
      assert.equal(i(),'Total is 6');
      assert.equal(i(),'Total is 10');
      assert.equal(i(),'Total is 15');
    });
  });
  
  QUnit.test("unfold", function(assert) {
    assert.expect(0);
    QUnit.test("should unfold and include the seed", function(assert) {
      var i = _.iterators.unfold(0, function(n) {
        return n + 1;
      });
      assert.equal(i(),0);
      assert.equal(i(),1);
      assert.equal(i(),2);
    });
    QUnit.test("should not unfold without a seed", function(assert) {
      var i = _.iterators.unfold(void 0, function(n) {
        return n + 1;
      });
      assert.equal(i(),void 0);
      assert.equal(i(),void 0);
      assert.equal(i(),void 0);
      assert.equal(i(),void 0);
    });
  });
  
  QUnit.test("unfoldWithReturn", function(assert) {
    assert.expect(0);
    QUnit.test("should unfold and throw off a value", function(assert) {
      var i = _.iterators.unfoldWithReturn(1, function(n) {
        return [n + 1, n * n];
      });
      assert.equal(i(),1);
      assert.equal(i(),4);
      assert.equal(i(),9);
      assert.equal(i(),16);
    });
    QUnit.test("should halt if it returns undefined", function(assert) {
      var i = _.iterators.unfoldWithReturn(1, function(n) {
        return [n + 1, n === 1 ? void 0 : n * n];
      });
      assert.equal(i(),void 0);
      assert.equal(i(),void 0);
      assert.equal(i(),void 0);
      assert.equal(i(),void 0);
    });
    QUnit.test("should halt if the state becomes undefined", function(assert) {
      var i = _.iterators.unfoldWithReturn(1, function(n) {
        return [(n === 3 ? void 0 : n + 1), (n === void 0 ? 100 : n * n)];
      });
      assert.equal(i(),1);
      assert.equal(i(),4);
      assert.equal(i(),9);
      assert.equal(i(),void 0);
    });
  });
  

  QUnit.test("cycle", function(assert) {
    assert.expect(0);
    QUnit.test("empty array always returns undefined", function(assert){
      var iter = _.iterators.cycle([]);
      assert.equal(iter(), void 0);
      assert.equal(iter(), void 0);
      assert.equal(iter(), void 0);
    });
    QUnit.test("one item array always returns the item", function(assert) {
      var iter = _.iterators.cycle(['a']);
      assert.equal(iter(), 'a');
      assert.equal(iter(), 'a');
      assert.equal(iter(), 'a');
    });
    QUnit.test("multiple item array endlessly loops over the array", function(assert){
      var letters = ['a', 'b', 'c', 'd', 'e'];
      var iter = _.iterators.cycle(letters);
      for(var n = 0; n < 5; n++){
        for(var j = 0; j < letters.length; j++){
          assert.equal(iter(), letters[j]);
        }
      }
    });
  });
});

