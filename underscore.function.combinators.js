// Underscore-contrib (underscore.function.combinators.js 0.0.1)
// (c) 2013 Michael Fogus and DocumentCloud Inc.
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------
  
  // Mixing in the array builders
  // ----------------------------

  _.mixin({
    // Takes a value and returns a function that always returns
    // said value.
    always: function(value) {
      return function() { return value; };
    },

    // Takes some value as its first argument and runs it through a
    // pipeline of functions given as the rest arguments.
    pipeline: function(seed /*, args */){
      return _.reduce(_.rest(arguments),
                      function(l,r) { return r(l); },
                      seed);
    },

    // Composes a bunch of predicates into a single predicate that
    // checks all elements of an array for conformance to all of the
    // original predicates.
    conjoin: function(/* preds */) {
      return function(coll) {
        return _.every(coll, function(e) {
          return _.every(arguments, function(p) {
            return p(e);
          });
        });
      };
    },
    k: _.always,
    t: _.pipeline
  });

})(this);
