//     Underscore-contrib
//     underscore.array.builders.js 0.0.1
//     http://underscorejs.org
//     (c) 2013 Michael Fogus
//     Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------
  
  var slice   = Array.prototype.slice,
      concat  = Array.prototype.concat;


  // Mixing in the array builders
  // ----------------------------

  _.mixin({
    // Concatenates one or more arrays given as arguments
    cat: function() {
      var head = _.first(arguments);
      var args = _.rest(arguments);
      if (head != null) {
        return concat.apply(head, args);
      }
      else {
        return [];
      }
    }
  });

})(this);
