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
    inc: function(x) {
      return ++x;
    },
    dec: function(x) {
      return --x;
    },
    neg: function(x) {
      return -x;
    },
    eq: function(x, y) {
      return x == y;
    },
    seq: function(x, y) {
      return x === y;
    },
    neq: function(x, y) {
      return x != y;
    },
    sneq: function(x, y) {
      return x !== y;
    },
    gt: function(x, y) {
      return x > y;
    },
    lt: function(x, y) {
      return x < y;
    },
    gte: function(x, y) {
      return x >= y;
    },
    lte: function(x, y) {
      return x <= y;
    },
    phalse: function(x) {
      return !x;
    },
    and: function(x, y) {
      return x & y;
    },
    or: function(x, y) {
      return x | y;
    },
    xor: function(x, y) {
      return x ^ y;
    },
    not: function(x) {
      return ~x;
    },
    lshift: function(x, y) {
      return x << y;
    },
    rshift: function(x, y) {
      return x >> y;
    },
    zshift: function(x, y) {
      return x >>> y;
    }
  });
})(this);
