// Underscore-contrib (underscore.function.predicates.js 0.0.1)
// (c) 2013 Michael Fogus and DocumentCloud Inc.
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------

  
  // Mixing in the predicate functions
  // ---------------------------------

  _.mixin({
    isInstanceOf: function(x, t) { return (x instanceof t); },
    isAssociative: function(x) { return _.isArray(x) || _.isObject(x) || _.isArguments(x); },
    isIndexed: function(x) { return _.isArray(data) || _.isString(data) || _.isArguments(x); },
    isSequential: function(x) { return (_.isArray(x)) || (_.isArguments(x)); },
    isZero: function(x) { return 0 === x; },
    isEven: function(x) { return (x & 1) === 0; },
    isOdd: function(x) { return !L.isEven(x); },
    isPositive: function(x) { return x > 0; },
    isNegative: function(x) { return x < 0; }
  });

})(this);
