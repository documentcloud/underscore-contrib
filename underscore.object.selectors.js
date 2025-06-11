// Underscore-contrib (underscore.object.selectors.js 0.3.0)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// Underscore-contrib may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `require` it on the server.
  if (typeof exports === 'object') {
    _ = module.exports = require('underscore');
  }

  // Helpers
  // -------

  // Create quick reference variables for speed access to core prototypes.
  var concat  = Array.prototype.concat;
  var ArrayProto = Array.prototype;
  var slice = ArrayProto.slice;

  // Will take a path like 'element[0][1].subElement["Hey!.What?"]["[hey]"]'
  // and return ["element", "0", "1", "subElement", "Hey!.What?", "[hey]"]
  function keysFromPath(path) {
    // from http://codereview.stackexchange.com/a/63010/8176
    /**
     * Repeatedly capture either:
     * - a bracketed expression, discarding optional matching quotes inside, or
     * - an unbracketed expression, delimited by a dot or a bracket.
     */
    var re = /\[("|')(.+)\1\]|([^.\[\]]+)/g;

    var elements = [];
    var result;
    while ((result = re.exec(path)) !== null) {
      elements.push(result[2] || result[3]);
    }
    return elements;
  }

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

    // Returns the key/value pair for a given property in an object, undefined if not found.
    kv: function(obj, key) {
      if (_.has(obj, key)) {
        return [key, obj[key]];
      }

      return void 0;
    },

    // Gets the value at any depth in a nested object based on the
    // path described by the keys given. Keys may be given as an array
    // or as a dot-separated string.
    getPath: function getPath (obj, ks) {
      ks = typeof ks == "string" ? keysFromPath(ks) : ks;

      var i = -1, length = ks.length;

      // If the obj is null or undefined we have to break as
      // a TypeError will result trying to access any property
      // Otherwise keep incrementally access the next property in
      // ks until complete
      while (++i < length && obj != null) {
        obj = obj[ks[i]];
      }
      return i === length ? obj : void 0;
    },

    // Returns a boolean indicating whether there is a property
    // at the path described by the keys given
    hasPath: function hasPath (obj, ks) {
      ks = typeof ks == "string" ? keysFromPath(ks) : ks;

      var i = -1, length = ks.length;
      while (++i < length && _.isObject(obj)) {
        if (ks[i] in obj) {
          obj = obj[ks[i]];
        } else {
          return false;
        }
      }
      return i === length;
    },

    keysFromPath: keysFromPath,

    //Returns the property with the greatest numeric value in an object along with it's key in an array [key,value]. 
    maxVal: function(obj){
      
      return Object.keys(obj).reduce(function(currentVal, key){
        return obj[key] > currentVal[1] ? [key,obj[key]] : currentVal 
      }, ["key",-Infinity]);
  
    },
  
     //Returns the property with the least numeric value in an object along with it's key in an array [key,value]. 
    minVal: function(obj){
      
      return Object.keys(obj).reduce(function(currentVal, key){
        return currentVal[1] > obj[key] ? [key,obj[key]] : currentVal 
      }, ["key",Infinity]);
  
    },
  
    pickWhen: function(obj, pred) {
      var copy = {};

      _.each(obj, function(value, key) {
        if (pred(obj[key])) copy[key] = obj[key];
      });

      return copy;
    },

    omitWhen: function(obj, pred) {
      return _.pickWhen(obj, function(e) { return !pred(e); });
    }

  });

}).call(this);
