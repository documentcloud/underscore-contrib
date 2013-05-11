$(document).ready(function() {

  module("underscore.collections.walk");

  var getSimpleTestTree = function() {
    return {
      val: 0,
      l: { val: 1, l: { val: 2 }, r: { val: 3 } },
      r: { val: 4, l: { val: 5 }, r: { val: 6 } },
    };
  };

  var getMixedTestTree = function() {
    return {
      current:
        { city: 'Munich', aliases: ['Muenchen'], population: 1378000 },
      previous: [
        { city: 'San Francisco', aliases: ['SF', 'San Fran'], population: 812826 },
        { city: 'Toronto', aliases: ['TO', 'T-dot'], population: 2615000 },
      ]
    };
  };

  test("basic", function() {
    // Updates the value of `node` to be the sum of the values of its subtrees.
    // Ignores leaf nodes.
    var visitor = function(node) {
      if (node.l && node.r)
        node.val = node.l.val + node.r.val;
    };

    var tree = getSimpleTestTree();
    _.walk.postorder(tree, visitor);
    equal(tree.val, 16, 'should visit subtrees first');
    
    tree = getSimpleTestTree();
    _.walk.preorder(tree, visitor);
    equal(tree.val, 5, 'should visit subtrees after the node itself');
  });
  
  test("circularRefs", function() {
    var tree = getSimpleTestTree();
    tree.l.l.r = tree;
    throws(function() { _.walk.preorder(tree, _.identity) }, TypeError, 'preorder throws an exception');
    throws(function() { _.walk.postrder(tree, _.identity) }, TypeError, 'postorder throws an exception');

    tree = getSimpleTestTree();
    tree.r.l = tree.r;
    throws(function() { _.walk.preorder(tree, _.identity) }, TypeError, 'exception for a self-referencing node');
  });

  test("simpleMap", function() {
    var visitor = function(node, key, parent) {
      if (_.has(node, 'val')) return node.val;
      if (key !== 'val') throw Error('Leaf node with incorrect key');
      return this.leafChar || '-';
    };
    var visited = _.walk.map(getSimpleTestTree(), _.walk.preorder, visitor).join('');
    equal(visited, '0-1-2-3-4-5-6-', 'pre-order map');

    visited = _.walk.map(getSimpleTestTree(), _.walk.postorder, visitor).join('');
    equal(visited, '---2-31--5-640', 'post-order map');

    var context = { leafChar: '*' };
    visited = _.walk.map(getSimpleTestTree(), _.walk.preorder, visitor, context).join('');
    equal(visited, '0*1*2*3*4*5*6*', 'pre-order with context');

    visited = _.walk.map(getSimpleTestTree(), _.walk.postorder, visitor, context).join('');
    equal(visited, '***2*31**5*640', 'post-order with context');

    if (document.querySelector) {
      var root = document.querySelector('#map-test');
      var ids = _.walk.map(root, _.walk.preorder, function(el) { return el.id; });
      deepEqual(ids, ['map-test', 'id1', 'id2'], 'preorder map with DOM elements');

      ids = _.walk.map(root, _.walk.postorder, function(el) { return el.id; });
      deepEqual(ids, ['id1', 'id2', 'map-test'], 'postorder map with DOM elements');
    }
  });

  test("mixedMap", function() {
    var visitor = function(node, key, parent) {
      return _.isString(node) ? node.toLowerCase() : null;
    };

    var tree = getMixedTestTree();
    var preorderResult = _.walk.map(tree, _.walk.preorder, visitor);
    equal(preorderResult.length, 19, 'all nodes are visited');
    deepEqual(_.reject(preorderResult, _.isNull),
        ['munich', 'muenchen', 'san francisco', 'sf', 'san fran', 'toronto', 'to', 't-dot'],
        'pre-order map on a mixed tree');

    var postorderResult = _.walk.map(tree, _.walk.postorder, visitor);
    deepEqual(preorderResult.sort(), postorderResult.sort(), 'post-order map on a mixed tree');

    tree = [['foo'], tree];
    var result = _.walk.map(tree, _.walk.postorder, visitor);
    deepEqual(_.difference(result, postorderResult), ['foo'], 'map on list of trees');
  });

  test("pluck", function() {
    var tree = getSimpleTestTree();
    tree.val = { val: 'z' };

    var plucked = _.walk.pluckRec(tree, 'val');
    equal(plucked.shift(), tree.val);
    equal(plucked.join(''), 'z123456', 'pluckRec is recursive');

    plucked = _.walk.pluck(tree, 'val');
    equal(plucked.shift(), tree.val);
    equal(plucked.join(''), '123456', 'regular pluck is not recursive');

    tree.l.r.foo = 42;
    equal(_.walk.pluck(tree, 'foo'), 42, 'pluck a value from deep in the tree');

    tree = getMixedTestTree();
    deepEqual(_.walk.pluck(tree, 'city'), ['Munich', 'San Francisco', 'Toronto'], 'pluck from a mixed tree');
    tree = [tree, { city: 'Loserville', population: 'you' }];
    deepEqual(_.walk.pluck(tree, 'population'), [1378000, 812826, 2615000, 'you'], 'pluck from a list of trees');
  });
});
