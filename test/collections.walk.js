$(document).ready(function() {

  module("underscore.collections.walk");

  var getTestTree = function() {
    return {
      val: 0,
      l: { val: 1, l: { val: 2 }, r: { val: 3 } },
      r: { val: 4, l: { val: 5 }, r: { val: 6 } },
    };
  };

  test("basic", function() {
    // Updates the value of `node` to be the sum of the values of its subtrees.
    // Ignores leaf nodes.
    var visitor = function(node) {
      if (node.l && node.r)
        node.val = node.l.val + node.r.val;
    };

    var tree = getTestTree();
    _.bottomup(tree, visitor);
    equal(tree.val, 16, 'should visit subtrees first');
    
    tree = getTestTree();
    _.topdown(tree, visitor);
    equal(tree.val, 5, 'should visit subtrees after the node itself');
  });
  
  test("circularRefs", function() {
    tree = getTestTree();
    tree.l.l.r = tree;
    throws(function() { _.topdown(tree, _.identity) }, TypeError, 'topdown throws an exception');
    throws(function() { _.bottomup(tree, _.identity) }, TypeError, 'bottomup throws an exception');

    tree = getTestTree();
    tree.r.l = tree.r;
    throws(function() { _.topdown(tree, _.identity) }, TypeError, 'exception for a self-referencing node');
  });

  test("map", function() {
    var visitor = function(node, key, parent) {
      if (_.has(node, 'val')) return node.val;
      if (key !== 'val') throw Error('Leaf node with incorrect key');
      return this.leafChar || '-';
    };
    var visited = _.walk.map(getTestTree(), _.topdown, visitor).join('');
    equal(visited, '0-1-2-3-4-5-6-', 'top down map');

    visited = _.walk.map(getTestTree(), _.bottomup, visitor).join('');
    equal(visited, '---2-31--5-640', 'bottom up map');

    var context = { leafChar: '*' };
    visited = _.walk.map(getTestTree(), _.topdown, visitor, context).join('');
    equal(visited, '0*1*2*3*4*5*6*', 'top down with context');

    visited = _.walk.map(getTestTree(), _.bottomup, visitor, context).join('');
    equal(visited, '***2*31**5*640', 'bottom up with context');

    if (document.querySelector) {
      var root = document.querySelector('#map-test');
      var ids = _.walk.map(root, _.topdown, function(el) { return el.id; });
      deepEqual(ids, ['map-test', 'id1', 'id2'], 'top-down map with DOM elements');

      ids = _.walk.map(root, _.bottomup, function(el) { return el.id; });
      deepEqual(ids, ['id1', 'id2', 'map-test'], 'bottom-up map with DOM elements');
    }
  });

  test("pluck", function() {
    var tree = getTestTree();
    tree.val = { val: 'z' };

    var plucked = _.walk.pluckRec(tree, 'val');
    equal(plucked.shift(), tree.val);
    equal(plucked.join(''), 'z123456', 'pluckRec is recursive');

    plucked = _.walk.pluck(tree, 'val');
    equal(plucked.shift(), tree.val);
    equal(plucked.join(''), '123456', 'regular pluck is not recursive');

    tree.l.r.foo = 42;
    equal(_.walk.pluck(tree, 'foo'), 42, 'pluck a value from deep in the tree');
  });
});
