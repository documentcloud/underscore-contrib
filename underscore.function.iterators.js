// Underscore-contrib (underscore.function.iterators.js 0.0.1)
// (c) 2013 Michael Fogus and DocumentCloud Inc.
// Underscore-contrib may be freely distributed under the MIT license.

(function(root) {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Helpers
  // -------
  
  var HASNTBEENRUN = {};
  
  function unary (fun) {
    return function (first) {
      return fun.call(this, first);
    };
  }
  
  function binary (fun) {
    return function (first, second) {
      return fun.call(this, first, second);
    };
  }
  
  var undefined = void 0;

  
  // Mixing in the iterator functions
  // --------------------------------

  _.iterators = {
      
      reduce: function (iter, binaryFun, seed) {
        var state, element;
        if (seed !== undefined) {
          state = seed;
        }
        else {
          state = iter();
        }
        element = iter();
        while (element != null) {
          state = binaryFun.call(element, state, element);
          element = iter();
        }
        return state;
      },
  
      unfold: function (seed, unaryFun) {
        var state = HASNTBEENRUN;
        return function () {
          if (state === HASNTBEENRUN) {
            return (state = seed);
          }
          else if (state != null) {
            return (state = unaryFun.call(state, state));
          }
          else return state;
        };
      },
  
      // note that the unfoldWithReturn behaves differently than
      // unfold with respect to the first value returned
      unfoldWithReturn: function (seed, unaryFun) {
        var state = seed,
            pair,
            value;
        return function () {
          if (state != null) {
            pair = unaryFun.call(state, state);
            value = pair[1];
            state = value != null
                    ? pair[0]
                    : undefined
            return value;
          }
          else return undefined;
        };
      },

      accumulate: function (iter, binaryFun, initial) {
        var state = initial;
        return function () {
          element = iter();
          if (element == null) {
            return element;
          }
          else {
            if (state === undefined) {
              return (state = element);
            }
            else return (state = binaryFun.call(element, state, element));
          }
        }
      },
  
      accumulateWithReturn: function (iter, binaryFun, initial) {
        var state = initial,
            stateAndReturnValue;
        return function () {
          element = iter();
          if (element == null) {
            return element;
          }
          else {
            if (state === undefined) {
              return (state = element);
            }
            else {
              stateAndReturnValue = binaryFun.call(element, state, element);
              state = stateAndReturnValue[0];
              return stateAndReturnValue[1];
            }
          }
        }
      },
  
      map: function (iter, unaryFun) {
        return function() {
          var element;
          element = iter();
          if (element != null) {
            return unaryFun.call(element, element);
          } else {
            return undefined;
          }
        };
      },

      select: function (iter, unaryPredicateFn) {
        return function() {
          var element;
          element = iter();
          while (element != null) {
            if (unaryPredicateFn.call(element, element)) {
              return element;
            }
            element = iter();
          }
          return undefined;
        };
      },
  
      reject: function (iter, unaryPredicateFn) {
        return select(iter, function (something) {
          return !unaryPredicateFn(something);
        });
      },
  
      find: function (iter, unaryPredicateFn) {
        return select(iter, unaryPredicateFn)();
      },

      slice: function (iter, numberToDrop, numberToTake) {
        var count = 0;
        while (numberToDrop-- > 0) {
          iter();
        }
        if (numberToTake != null) {
          return function() {
            if (++count <= numberToTake) {
              return iter();
            } else {
              return undefined;
            }
          };
        }
        else return iter;
      },
  
      drop: function (howMany) {
        return _.iterators.slice(howMany || 1);
      },
  
      take: function (iter, numberToTake) {
        return slice(iter, 0, numberToTake == null ? 1 : numberToTake);
      },

      List: function (array) {
        var index = 0;
        return function() {
          return array[index++];
        };
      },
  
      Tree: function (array) {
        var index, myself, state;
        index = 0;
        state = [];
        return function myself () {
          var element, tempState;
          element = array[index++];
          if (element instanceof Array) {
            state.push({
              array: array,
              index: index
            });
            array = element;
            index = 0;
            return myself();
          }
          else if (element === undefined) {
            if (state.length > 0) {
              tempState = state.pop(), array = tempState.array, index = tempState.index;
              return myself();
            }
            else return undefined;
          }
          else return element;
        };
      },
  
      K: function (value) {
        return function () {
          return value;
        };
      },

      upRange: function (from, to, by) {
        return function () {
          var was;
      
          if (from > to) {
            return undefined;
          }
          else {
            was = from;
            from = from + by;
            return was;
          }
        }
      },

      downRange: function (from, to, by) {
        return function () {
          var was;
      
          if (from < to) {
            return undefined;
          }
          else {
            was = from;
            from = from - by;
            return was;
          }
        }
      },
  
      range: function (from, to, by) {
        if (from == null) {
          return upRange(1, Infinity, 1);
        }
        else if (to == null) {
          return upRange(from, Infinity, 1);
        }
        else if (by == null) {
          if (from <= to) {
            return upRange(from, to, 1);
          }
          else return downRange(from, to, 1)
        }
        else if (by > 0) {
          return upRange(from, to, by);
        }
        else if (by < 0) {
          return downRange(from, to, Math.abs(by))
        }
        else return k(from);
      }
    };
  
  _.iterators.numbers = unary(_.iterators.range);
      
  _.iterators.foldl = _.iterators.reduce;

})(this);