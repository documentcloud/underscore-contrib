// Underscore-contrib (underscore.collections.walk.js 0.0.1)
// (c) 2013 Patrick Dubroy
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------

  // An internal object that can be returned from a visitor function to
  // prevent a top-down walk from walking subtrees of a node.
  var stopRecursion = {};

  // An internal object that can be returned from a visitor function to
  // cause the walk to immediately stop.
  var stopWalk = {};

  var notTreeError = 'Not a tree: same object found in two different branches';

  // Walk the tree recursively beginning with `root`, calling `beforeFunc`
  // before visiting an objects descendents, and `afterFunc` afterwards.
  // If `collectResults` is true, the last argument to `afterFunc` will be a
  // collection of the results of walking the node's subtrees.
  function walk(root, beforeFunc, afterFunc, context, collectResults) {
    var visited = [];
    return (function _walk(value, key, parent) {
      if (beforeFunc) {
        var result = beforeFunc.call(context, value, key, parent);
        if (result === stopWalk) return stopWalk;
        if (result === stopRecursion) return;
      }

      var subResults;
      if (_.isObject(value) || _.isArray(value)) {
        // Keep track of objects that have been visited, and throw an exception
        // when trying to visit the same object twice.
        if (visited.indexOf(value) >= 0) throw new TypeError(notTreeError);
        visited.push(value);

        var target = _.isElement(value) ? value.children : value;

        // If collecting results from subtrees, collect them in the same shape
        // as the parent node.
        if (collectResults) subResults = _.isArray(value) ? [] : {};

        var stop = _.any(target, function(obj, key) {
          var result = _walk(obj, key, value);
          if (result === stopWalk) return true;
          if (subResults) subResults[key] = result;
        });
        if (stop) return stopWalk;
      }
      if (afterFunc) return afterFunc.call(context, value, key, parent, subResults);
    })(root);
  }

  // Recursively traverses `obj` in a depth-first fashion, invoking the
  // `visitor` function for each object only after traversing its children.
  function postorder(obj, visitor, context) {
    walk(obj, null, visitor, context);
  }

  // Recursively traverses `obj` in a depth-first fashion, invoking the
  // `visitor` function for each object before traversing its children.
  function preorder(obj, visitor, context) {
    walk(obj, visitor, null, context);
  }

  function pluck(obj, propertyName, recursive) {
    var results = [];
    _.walk.preorder(obj, function(value, key) {
      if (key === propertyName) {
        results[results.length] = value;
        if (!recursive) return stopRecursion;
      }
    });
    return results;
  }

  // Recursively traverses `obj` and returns all the elements that pass a
  // truth test. `strategy` is the traversal function to use, e.g. `preorder`
  // or `postorder`.
  function filter(obj, strategy, visitor, context) {
    var results = [];
    if (obj == null) return results;
    strategy.call(this, obj, function(value, key, parent) {
      if (visitor.call(context, value, key, parent)) results.push(value);
    });
    return results;
  }

  // Add the `walk` namespace
  // ------------------------

  _.walk = walk;
  _.extend(walk, {
    // Performs a preorder traversal of `obj` and returns the first value
    // which passes a truth test.
    find: function(obj, visitor, context) {
      var result;
      preorder(obj, function(value, key, parent) {
        if (visitor.call(context, value, key, parent)) {
          result = value;
          return stopWalk;
        }
      }, context);
      return result;
    },

    filter: filter,

    // Recursively traverses `obj` and returns all the elements for which a
    // truth test fails.
    reject: function(obj, strategy, visitor, context) {
      return filter(obj, strategy, function(value, key, parent) {
        return !visitor.call(context, value, key, parent);
      });
    },

    // Produces a new array of values by recursively traversing `obj` and
    // mapping each value through the transformation function `visitor`.
    // `strategy` is the traversal function to use, e.g. `preorder` or
    // `postorder`.
    map: function(obj, strategy, visitor, context) {
      var results = [];
      strategy.call(this, obj, function(value, key, parent) {
        results[results.length] = visitor.call(context, value, key, parent);
      });
      return results;
    },

    // Return the value of properties named `propertyName` reachable from the
    // tree rooted at `obj`. Results are not recursively searched; use
    // `pluckRec` for that.
    pluck: function(obj, propertyName) {
      return pluck(obj, propertyName, false);
    },

    // Version of `pluck` which recursively searches results for nested objects
    // with a property named `propertyName`.
    pluckRec: function(obj, propertyName) {
      return pluck(obj, propertyName, true);
    },

    preorder: preorder,
    postorder: postorder,

    // Builds up a single value by doing a post-order traversal of `obj` and
    // calling the `visitor` function on each object in the tree. For leaf
    // objects, the `memo` argument to `visitor` is the value of the `leafMemo`
    // argument to `reduce`. For non-leaf objects, `memo` is a collection of
    // the results of calling `reduce` on the object's children.
    reduce: function(obj, visitor, leafMemo, context) {
      var reducer = function(value, key, parent, subResults) {
        return visitor(subResults || leafMemo, value, key, parent);
      };
      return walk(obj, null, reducer, context, true);
    }
  });
  // Set up aliases to match those in underscore.js.
  _.walk.collect = _.walk.map;
  _.walk.detect = _.walk.find;
  _.walk.select = _.walk.filter;
})(this);
