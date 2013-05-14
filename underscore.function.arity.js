// Underscore-contrib (underscore.function.arity.js 0.0.1)
// (c) 2013 Michael Fogus, DocumentCloud and Investigative Reporters & Editors
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------

  
  // Mixing in the arity functions
  // -----------------------------

  _.mixin({
    // ### Fixed arguments

    // Fixes the arguments to a function based on the parameter template defined by
    // the presence of values and the `_` placeholder.
    fix: function(fun) {
      var args = _.rest(arguments);

      var f = function() {
        var arg = 0;

        for ( var i = 0; i < args.length && arg < arguments.length; i++ ) {
          if ( args[i] === _ ) {
            args[i] = arguments[arg++];
          }
        }

        return fun.apply(null, args);
      };

      f._original = fun;

      return f;
    },

    unary: function (fun) {
      return function unary (a) {
        return fun.call(this, a);
      };
    },

    binary: function (fun) {
      return function binary (a, b) {
        return fun.call(this, a, b);
      };
    },

    ternary: function (fun) {
      return function ternary (a, b, c) {
        return fun.call(this, a, b, c);
      };
    },

    quaternary: function (fun) {
      return function quaternary (a, b, c, d) {
        return fun.call(this, a, b, c, d);
      };
    },
    
    // swiss-army-knife currying and partial application function
    // for functions taking two arguments
    //
    // if you provide an argument, it partially applies it.
    // if you do not provide an argument, performs a "greedy"
    // curry.
    call2: function (fun, optionalFirst, optionalLast) {
      if (arguments.length === 3) {
        return fun(optionalFirst, optionalLast);
      }
      else if (arguments.length === 1) {
        return function call2 (first, optionalLast) {
          if (arguments.length === 1) {
            return function (last) {
              return fun(first, last);
            };
          }
          else return fun(first, optionalLast);
        };
      }
      else return function call2 (last) {
        return fun(optionalFirst, last);
      };
    },
    
    call2flipped: function (fun, optionalLast, optionalFirst) {
      if (arguments.length === 3) {
        return fun(optionalFirst, optionalLast);
      }
      else if (arguments.length === 1) {
        return function call2flipped (last, optionalFirst) {
          if (arguments.length === 1) {
            return function (first) {
              return fun(first, last);
            };
          }
          else return fun(optionalFirst, last);
        };
      }
      else return function call2flipped (first) {
        return fun(first, optionalLast);
      };
    }
    
  });
  
  _.arity = (function () {
    var FUNCTIONS = {};
    return function arity (numberOfArgs, fun) {
      if (FUNCTIONS[numberOfArgs] == null) {
        var parameters = new Array(numberOfArgs);
        for (var i = 0; i < numberOfArgs; ++i) {
          parameters[i] = "__" + i;
        }
        var pstr = parameters.join();
        var code = "return function ("+pstr+") { return fun.apply(this, arguments); };";
        FUNCTIONS[numberOfArgs] = new Function(['fun'], code);
      }
      if (fun == null) {
        return function (fun) { return arity(numberOfArgs, fun); };
      }
      else return FUNCTIONS[numberOfArgs](fun);
    };
  })();

})(this);
