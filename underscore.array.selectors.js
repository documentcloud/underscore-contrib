// Underscore-contrib (underscore.array.selectors.js 0.0.1)
// (c) 2013 Michael Fogus and DocumentCloud Inc.
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------
  
  // Create quick reference variables for speed access to core prototypes.
  var slice   = Array.prototype.slice,
      concat  = Array.prototype.concat;

  var existy = function(x) { return x != null; };
  var truthy = function(x) { return (x !== false) && existy(x); };

  // Mixing in the array selectors
  // ----------------------------

  _.mixin({
    // Returns the second element of an array. Passing **n** will return all but 
    // the first of the head N values in the array.  The **guard** check allows it
    // to work with `_.map`.
    second: function(array, n, guard) {
      if (array == null) return void 0;
      return (n != null) && !guard ? slice.call(array, 1, n) : array[1];
    },

    // Takes all items in an array while a given predicate returns truthy.
    takeWhile: function(pred, array) {
      if (!_.isArray(array)) throw new TypeError;

      var sz = _.size(array);

      for (var index = 0; index < sz; index++) {
        if(!truthy(pred(array[index]))) {
          break;
        }
      }

      return _.take(array, index);
    }

  });

})(this);
