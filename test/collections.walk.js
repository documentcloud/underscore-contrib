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
    _.walk.postorder(tree, visitor);
    equal(tree.val, 16, 'should visit subtrees first');
    
    tree = getTestTree();
    _.walk.preorder(tree, visitor);
    equal(tree.val, 5, 'should visit subtrees after the node itself');
  });
  
  test("circularRefs", function() {
    tree = getTestTree();
    tree.l.l.r = tree;
    throws(function() { _.walk.preorder(tree, _.identity) }, TypeError, 'preorder throws an exception');
    throws(function() { _.walk.postrder(tree, _.identity) }, TypeError, 'postorder throws an exception');

    tree = getTestTree();
    tree.r.l = tree.r;
    throws(function() { _.walk.preorder(tree, _.identity) }, TypeError, 'exception for a self-referencing node');
  });

  test("map", function() {
    var visitor = function(node, key, parent) {
      if (_.has(node, 'val')) return node.val;
      if (key !== 'val') throw Error('Leaf node with incorrect key');
      return this.leafChar || '-';
    };
    var visited = _.walk.map(getTestTree(), _.walk.preorder, visitor).join('');
    equal(visited, '0-1-2-3-4-5-6-', 'pre-order map');

    visited = _.walk.map(getTestTree(), _.walk.postorder, visitor).join('');
    equal(visited, '---2-31--5-640', 'post-order map');

    var context = { leafChar: '*' };
    visited = _.walk.map(getTestTree(), _.walk.preorder, visitor, context).join('');
    equal(visited, '0*1*2*3*4*5*6*', 'pre-order with context');

    visited = _.walk.map(getTestTree(), _.walk.postorder, visitor, context).join('');
    equal(visited, '***2*31**5*640', 'post-order with context');

    if (document.querySelector) {
      var root = document.querySelector('#map-test');
      var ids = _.walk.map(root, _.walk.preorder, function(el) { return el.id; });
      deepEqual(ids, ['map-test', 'id1', 'id2'], 'preorder map with DOM elements');

      ids = _.walk.map(root, _.walk.postorder, function(el) { return el.id; });
      deepEqual(ids, ['id1', 'id2', 'map-test'], 'postorder map with DOM elements');
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
