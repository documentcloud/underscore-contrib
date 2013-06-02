// Underscore-contrib (underscore.function.arity.js 0.0.1)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');
  
  // Mixing in the operator functions
  // -----------------------------

  _.mixin({
    add: function(x, y) {
      return x + y;
    },
    sub: function(x, y) {
      return x - y;
    },
    mul: function(x, y) {
      return x * y;
    },
    div: function(x, y) {
      return x / y;
    },
    mod: function(x, y) {
      return x % y;
    },
    inc: function(x, y) {
      return ++x;
    },
    dec: function(x, y) {
      return --x;
    },
    neg: function(x, y) {
      return -x;
    }
  });
})(this);
