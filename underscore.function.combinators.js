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
    always: function(value) {
      return function() { return value; };
    },
    pipeline: function(seed /*, args */){
      return _.reduce(_.rest(arguments),
                      function(l,r) { return r(l); },
                      seed);
    },
    k: _.always,
    t: _.pipeline
  });

})(this);
