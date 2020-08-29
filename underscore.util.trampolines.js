// Underscore-contrib (underscore.util.trampolines.js 0.3.0)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// Underscore-contrib may be freely distributed under the MIT license.

// Establish the root object, `window` in the browser, or `require` it on the server.
if (typeof exports === 'object') {
  _ = module.exports = require('underscore');
}

// Mixing in the truthiness
// ------------------------

_.mixin({
  done: function(value) {
    var ret = _(value);
    ret.stopTrampoline = true;
    return ret;
  },

  trampoline: function(fun /*, args */) {
    var result = fun.apply(fun, _.rest(arguments));

    while (_.isFunction(result)) {
      result = result();
      if ((result instanceof _) && (result.stopTrampoline)) break;
    }

    return result.value();
  }
});
