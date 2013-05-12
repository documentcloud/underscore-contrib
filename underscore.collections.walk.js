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
  var breaker = {};

  var notTreeError = 'Not a tree: same object found in two different branches';

  // A version of `collect` which, when called on an object, returns an object
  // rather than a list. The keys in the returned object are the same as the
  // original object, and the values are the result of invoking `visitor` on
  // each of the original object's values.
  function collectWithKeys(obj, visitor, context) {
    if (_.isArray(obj)) return _.collect(obj, visitor, context);

    var results = {};
    _.each(obj, function(value, key) {
      results[key] = visitor.call(context, value, key, obj);
    });
    return results;
  }

  // Walk the tree recursively beginning with `root`, calling `beforeFunc`
  // before visiting an objects descendents, and `afterFunc` afterwards.
  function walk(root, beforeFunc, afterFunc, context, iterStrategy) {
    var visited = [];
    return (function _walk(value, key, parent) {
      if (beforeFunc && beforeFunc.call(context, value, key, parent) === breaker)
        return;

      var subResults;
      if (_.isObject(value) || _.isArray(value)) {
        // Keep track of objects that have been visited, and throw an exception
        // when trying to visit the same object twice.
        if (visited.indexOf(value) >= 0) throw new TypeError(notTreeError);
        visited.push(value);

        var target = _.isElement(value) ? value.children : value;
        subResults = iterStrategy.call(null, target, _walk, context);
      }
      if (afterFunc) return afterFunc.call(context, value, key, parent, subResults);
    })(root);
  }

  function pluck(obj, propertyName, recursive) {
    var results = [];
    _.walk.preorder(obj, function(value, key) {
      if (key === propertyName) {
        results[results.length] = value;
        if (!recursive) return breaker;
      }
    });
    return results;
  }

  // Add the `walk` namespace
  // ------------------------

  _.walk = walk;
  _.extend(walk, {
    // Recursively traverses `obj` in a depth-first fashion, invoking the
    // `visitor` function for each object only after traversing its children.
    postorder: function(obj, visitor, context) {
      walk(obj, null, visitor, context, _.each);
    },

    // Recursively traverses `obj` in a depth-first fashion, invoking the
    // `visitor` function for each object before traversing its children.
    preorder: function(obj, visitor, context) {
      walk(obj, visitor, null, context, _.each);
    },

    // Produces a new array of values by recursively traversing `obj` and
    // mapping each value through the transformation function `visitor`.
    // `strategy` is the traversal function to use, e.g. `preorder` or
    // `postorder`.
    map: function(obj, strategy, visitor, context) {
      var results = [];
      strategy.call(null, obj, function(value, key, parent) {
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

    // Builds up a single value by doing a pre-order traversal of `obj` and
    // calling the `visitor` function on each object in the tree. The `memo`
    // argument to `visitor` is a collection of the results of invoking
    // `visitor` on each of the subtrees.
    reduce: function(obj, visitor, context) {
      var reducer = function(value, key, parent, memo) {
        return visitor(memo, value, key, parent);
      };
      return walk(obj, null, reducer, context, collectWithKeys);
    }
  });
  _.walk.collect = _.walk.map;  // Alias `map` as `collect`.
})(this);
