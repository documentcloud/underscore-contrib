// Underscore-contrib (underscore.util.strings.js 0.0.1)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------

  // No reason to create regex more than once
  var plusRegex = /\+/g;
  var bracketRegex = /(?:([^\[]+))|(?:\[(.*?)\])/g;

  var URLDecode = function(s) {
    return decodeURIComponent(s.replace(plusRegex, '%20'));
  };

  var buildParams = function(prefix, obj, top) {
    if (_.isUndefined(top)) top = true;
    if (_.isObject(obj)) {
      return _.map(obj, function(value, key) {
        return buildParams(top ? key : prefix + '[' + key + ']', value, false);
      }).join('&');
    } else if (_.isArray(obj)) {
      return _.map(obj, function(value, key) {
        return buildParams(top ? key : prefix + '[]', value, false);
      }).join('&');
    } else {
      return encodeURIComponent(prefix) + '=' + encodeURIComponent(obj);
    }
  };

  // Mixing in the string utils
  // ----------------------------

  _.mixin({
    // Explodes a string into an array of chars
    explode: function(s) {
      return s.split('');
    },

    // Parses a query string into a hash
    fromQuery: function(str) {
      var parameters = str.split('&'),
          obj = {},
          parameter,
          key,
          match,
          last_key,
          sub_key,
          depth;

      // Iterate over key/value pairs
      for (var index in parameters) {
        parameter = parameters[index].split('=');
        key = URLDecode(parameter[0]);
        last_key = key;
        depth = obj;

        // Reset so we don't have issues when matching the same string
        bracketRegex.lastIndex = 0;

        // Attempt to extract nested values
        while (match = bracketRegex.exec(key)) {
          if (!_.isUndefined(match[1])) {

            // If we're at the top nested level, no new object needed
            sub_key = match[1];

          } else {

            // If we're at a lower nested level, we need to step down, and make
            // sure that there is an object to place the value into
            sub_key = match[2];
            depth[last_key] = depth[last_key] || (sub_key ? {} : []);
            depth = depth[last_key];
          }

          // Save the correct key as a hash or an array
          last_key = sub_key || _.size(depth);
        }

        // Assign value to nested object
        depth[last_key] = URLDecode(parameter[1])
      }

      return obj;
    },

    // Implodes and array of chars into a string
    implode: function(a) {
      return a.join('');
    },

    // Converts a string to camel case
    camelCase : function( string ){
      return  string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    },

    // Converts camel case to dashed (opposite of _.camelCase)
    toDash : function( string ){
      string = string.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
      // remove first dash
      return  ( string.charAt( 0 ) == '-' ) ? string.substr(1) : string;
    },

    // Creates a query string from a hash
    toQuery: function(obj) {
      return buildParams('', obj)
    },

    // Reports whether a string contains a search string.
    strContains: function(str, search) {
      if (typeof str != 'string') throw new TypeError;
      return (str.indexOf(search) != -1);
    }

  });
})(this);
