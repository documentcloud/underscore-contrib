/*
* Tests if an object is like another. This means objects should follow the same
* structure and arrays should contain the same types.
*
* E.g.
*
* _.islike(
*   {name: "James", age: 10, hobbies: ["football", "computer games", "baking"]},
*   {name: "", age: 0, hobbies: [""]}
* )
*/
(function() {
  // Establish the root object, `window` in the browser, or `require` it on the server.
  if (typeof exports === 'object') {
    _ = module.exports = require('underscore');
  }

    var islike = function(obj, pattern) {
        if (typeof pattern === "function") {
            return obj instanceof pattern;
        }

        if (typeof obj !== typeof pattern) return false;
            if (pattern instanceof Array && !(obj instanceof Array)) return false;

                var type = typeof pattern;

                if (type == "object") {
                    if (pattern instanceof Array) {
                        if (pattern.length > 0) {
                            var oTypes = _.uniq(_.map(obj, fTypeof));
                            var pTypes = _.uniq(_.map(pattern, fTypeof));
                            if (_.difference(oTypes, pTypes).length) {
                                return false;
                            }
                        }
                    } else { // object
                        if (pattern.constructor === pattern.constructor.prototype.constructor) {
                            // for 'simple' objects we enumerate
                            for (var k in pattern) {
                                if (!pattern.hasOwnProperty(k)) {
                                    continue;
                                }
                                var p = pattern[k];
                                var o = obj[k];
                                if (!islike(o, p)) {
                                    return false;
                                }
                            }
                        } else {
                            // for 'types' we just check the inheritance chain
                            if (!(obj instanceof pattern.constructor)) {
                                return false;
                            }
                        }
                    }
                }

                return true;
    };

    var fTypeof = function(o) {
        return typeof o;
    };

    _.mixin({islike: islike});
}).call(this);



