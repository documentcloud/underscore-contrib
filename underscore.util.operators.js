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
    not: function(x) {
      return !x;
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
    bitwiseAnd: function(x, y) {
      return x & y;
    },
    bitwiseOr: function(x, y) {
      return x | y;
    },
    bitwiseXor: function(x, y) {
      return x ^ y;
    },
    bitwiseNot: function(x) {
      return ~x;
    },
    bitwiseLeft: function(x, y) {
      return x << y;
    },
    bitwiseRight: function(x, y) {
      return x >> y;
    },
    bitwiseZ: function(x, y) {
      return x >>> y;
    }
  });
})(this);
