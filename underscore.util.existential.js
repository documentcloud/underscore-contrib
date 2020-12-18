// Underscore-contrib (underscore.util.existential.js 0.3.0)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// Underscore-contrib may be freely distributed under the MIT license.

// Establish the root object, `window` in the browser, or `require` it on the server.
if (typeof exports === 'object') {
  _ = module.exports = require('underscore');
}
  
// Mixing in the truthiness
// ------------------------

_.mixin({
  exists: function(x) { return x != null; },
  truthy: function(x) { return (x !== false) && _.exists(x); },
  falsey: function(x) { return !_.truthy(x); },
  not:    function(b) { return !b; },
  firstExisting: function() {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] != null) return arguments[i];
    }
  }
});
