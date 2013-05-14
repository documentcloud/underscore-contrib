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

  // Walk the tree recursively beginning with `root`, calling `beforeFunc`
  // before visiting an objects descendents, and `afterFunc` afterwards.
  function walk(root, beforeFunc, afterFunc, context) {
    var visited = [];
    (function _walk(value, key, parent) {
      if (beforeFunc && beforeFunc.call(context, value, key, parent) === breaker)
        return;

      if (_.isObject(value) || _.isArray(value)) {
        // Keep track of objects that have been visited, and throw an exception
        // when trying to visit the same object twice.
        if (visited.indexOf(value) >= 0) throw new TypeError(notTreeError);
        visited.push(value);

        // Recursively walk this object's descendents. If it's a DOM node, walk
        // its DOM children.
        _.each(_.isElement(value) ? value.children : value, _walk, context);
      }

      if (afterFunc) afterFunc.call(context, value, key, parent);
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
      walk(obj, null, visitor, context);
    },

    // Recursively traverses `obj` in a depth-first fashion, invoking the
    // `visitor` function for each object before traversing its children.
    preorder: function(obj, visitor, context) {
      walk(obj, visitor, null, context)
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
    }
  });
  _.walk.collect = _.walk.map;  // Alias `map` as `collect`.
})(this);
