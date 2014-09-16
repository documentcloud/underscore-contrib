// Underscore-contrib (underscore.object.selectors.js 0.3.0)
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
  var ArrayProto = Array.prototype;
  var slice = ArrayProto.slice;

  // Internal functions that would not be exposed

  // Will take a path like 'element[0][1].subElement["Hey!.What?"]["[hey]"]'
  // and return ["element", "0", "1", "subElement", "Hey!.What?", "[hey]"]
  function parseJavaScriptPathIntoKeyNames(javascriptPath) {
    var parts = [];
    var terminatorExpected = null;
    var insideIndexer = false;
    var currentPart = "";

    function flushCurrentPart() {
      if (currentPart.length > 0) {
        parts.push(currentPart);
        currentPart = "";
      }
    }

    for (var i = 0; i < javascriptPath.length; i++) {
      var currentChar = javascriptPath[i];
      switch (currentChar) {
      case "[":
        if (!terminatorExpected) {
          flushCurrentPart();

          terminatorExpected = ']';
          insideIndexer = true;
        } else {
          currentPart += currentChar;
        }
        break;
      case "]":
        if (terminatorExpected === "]") {
          flushCurrentPart();

          terminatorExpected = null;
          insideIndexer = false;
        } else {
          currentPart += currentChar;
        }
        break;
      case ".":
        if (!terminatorExpected) {
          flushCurrentPart();
        } else {
          currentPart += currentChar;
        }
        break;
      case "\'":
        if (!terminatorExpected || terminatorExpected === "]") {
          terminatorExpected = "\'";
        } else if (terminatorExpected === "\'" && insideIndexer) {
          terminatorExpected = ']';
        } else if (terminatorExpected === "\'" && !insideIndexer) {
          flushCurrentPart();

          terminatorExpected = null;
        } else {
          currentPart += currentChar;
        }
        break;
      case "\"":
        if (!terminatorExpected || terminatorExpected === "]") {
          terminatorExpected = "\"";
        } else if (terminatorExpected === "\"" && insideIndexer) {
          terminatorExpected = ']';
        } else if (terminatorExpected === "\"" && !insideIndexer) {
          flushCurrentPart();

          terminatorExpected = null;
        } else {
          currentPart += currentChar;
        }
        break;
      default:
        currentPart += currentChar;
      } // switch (currentChar)
    } // for

    flushCurrentPart();

    return parts;
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
      ks = typeof ks === "string" ? parseJavaScriptPathIntoKeyNames(ks) : ks;

      // If we have reached an undefined property
      // then stop executing and return undefined
      if (obj === undefined) return void 0;

      // If the path array has no more elements, we've reached
      // the intended property and return its value
      if (ks.length === 0) return obj;

      // If we still have elements in the path array and the current
      // value is null, stop executing and return undefined
      if (obj === null) return void 0;

      return getPath(obj[_.first(ks)], _.rest(ks));
    },

    // Returns a boolean indicating whether there is a property
    // at the path described by the keys given
    hasPath: function hasPath (obj, ks) {
      ks = typeof ks === "string" ? parseJavaScriptPathIntoKeyNames(ks) : ks;

      var numKeys = ks.length;

      if (obj == null && numKeys > 0) return false;

      if (!(ks[0] in obj)) return false;

      if (numKeys === 1) return true;

      return hasPath(obj[_.first(ks)], _.rest(ks));
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

})(this);
