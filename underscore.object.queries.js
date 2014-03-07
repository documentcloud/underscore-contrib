// Underscore-contrib (underscore.object.queries.js 0.0.1)
// (c) 2014 Jonah Dahlquist, DocumentCloud and Investigative Reporters & Editors
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------

  
  // Mixing in the query encoding
  // ----------------------------

  _.mixin({

    fromQuery: function(str) {
      var parameters = str.split('&');
      var parameter;
      obj = {}
      for (var index in parameters) {
        parameter = parameters[index].split('=');
        obj[decodeURIComponent(parameter[0])] = decodeURIComponent(parameter[1]);
      }
      return obj;
    },

    toQuery: function(obj) {
      var parameters = []
      for (var key in obj) {
        parameters.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
      return parameters.join('&');
    },

  });

})(this);
