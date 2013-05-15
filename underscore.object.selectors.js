// Underscore-contrib (underscore.object.selectors.js 0.0.1)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------

  // Create quick reference variables for speed access to core prototypes.
  var concat  = Array.prototype.concat;

  // Mixing in the object selectors
  // ------------------------------

  _.mixin({
    // Returns a function that will attempt to look up a named field
    // in any object that it's given.
    accessor: function(field) {
      return function(obj) {
        return (obj && obj[field]);
      };
    },
    
    // Given an object, returns a function that will attempt to look up a field
    // that it's given.
    dictionary: function (obj) {
      return function(field) {
        return (obj && field && obj[field]);
      };
    },

    // Like `_.pick` except that it takes an array of keys to pick.
    selectKeys: function (obj, ks) {
      return _.pick.apply(null, concat.call([obj], ks));
    },

    // Gets the value at any depth in a nested object based on the
    // path described by the keys given.
    getPath: function(obj, ks, defaultValue) {
      var g = function(obj, ks, defaultValue) {
        // If we have reached an undefined/null property
        // then stop executing and return the default value.
        // If no default was provided it will be undefined.
        if (obj == null) return defaultValue;

        // If the path array has no more elements, we've reached
        // the intended property and return its value
        if (ks.length === 0) return obj;

        return g(obj[[].shift.call(ks)], ks, defaultValue);
      };

      return g(obj, ks, defaultValue);
    }
  });

})(this);
