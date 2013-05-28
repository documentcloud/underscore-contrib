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
    
    // greedy currying for functions taking two arguments.
    curry2: function (fun) {
      return function curried (first, optionalLast) {
        if (arguments.length === 1) {
          return function (last) {
            return fun(first, last);
          };
        }
        else return fun(first, optionalLast);
      };
    },
    
    // greedy flipped currying for functions taking two arguments.
    curry2flipped: function (fun) {
      return function curried (last, optionalFirst) {
        if (arguments.length === 1) {
          return function (first) {
            return fun(first, last);
          };
        }
        else return fun(optionalFirst, last);
      };
    },
    
    // Flexible curry function with strict arity.
    // source: https://github.com/eborden/js-curry
    curry: (function () {
      function checkArguments (argsCount) {
        if (argsCount !== 1) {
          throw new RangeError('Only a single argument may be accepted.');
        }
      }
      function collectArgs(func, that, argCount, args, newArg, flipped) {
        if (flipped == true) {
            args.unshift(newArg);
        } else {
            args.push(newArg);
        }
        if (args.length == argCount) {
          return func.apply(that, args);
        } else {
          return function () {
            checkArguments(arguments.length);
            return collectArgs(func, that, argCount, args.slice(0), arguments[0], flipped);
          };
        }
      }
      return function curry (func, flipped) {
        var that = this;
        return function () {
          checkArguments(arguments.length);
          return collectArgs(func, that, func.length, [], arguments[0], flipped);
        };
      };
    }()),

    // Flexible right to left curry with strict arity
    curryflipped: function (func) {
        return this.curry(func, true);
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
