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
      return _.reduce(arguments, function(acc, elem) {
        if (_.isArguments(elem)) {
          return concat.call(acc, slice.call(elem));
        }
        else {
          return concat.call(acc, elem);
        }
      }, []);
    }
  });

})(this);
