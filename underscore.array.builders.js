// Underscore-contrib (underscore.array.builders.js 0.3.0)
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
  var slice   = Array.prototype.slice,
      sort    = Array.prototype.sort;

  var existy = function(x) { return x != null; };

  // Mixing in the array builders
  // ----------------------------

  _.mixin({
    // Concatenates one or more arrays given as arguments.  If given objects and
    // scalars as arguments `cat` will plop them down in place in the result
    // array.  If given an `arguments` object, `cat` will treat it like an array
    // and concatenate it likewise.
    cat: function() {
      return _.flatten(arguments, true);
    },

    // 'Constructs' an array by putting an element at its front
    cons: function(head, tail) {
      return _.cat([head], tail);
    },

    // Takes an array and chunks it some number of times into
    // sub-arrays of size n.  Allows and optional padding array as
    // the third argument to fill in the tail chunk when n is
    // not sufficient to build chunks of the same size.
    chunk: function(array, n, pad) {
      var p = function(array) {
        if (array == null) return [];

        var part = _.take(array, n);

        if (n === _.size(part)) {
          return _.cons(part, p(_.drop(array, n)));
        }
        else {
          return pad ? [_.take(_.cat(part, pad), n)] : [];
        }
      };

      return p(array);
    },

    // Takes an array and chunks it some number of times into
    // sub-arrays of size n.  If the array given cannot fill the size
    // needs of the final chunk then a smaller chunk is used
    // for the last.
    chunkAll: function(array, n, step) {
      step = (step != null) ? step : n;

      var p = function(array, n, step) {
        if (_.isEmpty(array)) return [];

        return _.cons(_.take(array, n),
                      p(_.drop(array, step), n, step));
      };

      return p(array, n, step);
    },

    // Maps a function over an array and concatenates all of the results.
    mapcat: function(array, fun) {
      return _.flatten(_.map(array, fun), true);
    },

    // Returns an array with some item between each element
    // of a given array.
    interpose: function(array, inter) {
      if (!_.isArray(array)) throw new TypeError;
      var sz = _.size(array);
      if (sz === 0) return array;
      if (sz === 1) return array;

      return slice.call(_.mapcat(array, function(elem) {
        return _.cons(elem, [inter]);
      }), 0, -1);
    },

    // Weaves two or more arrays together
    weave: function(/* args */) {
      if (!_.some(arguments)) return [];
      if (arguments.length == 1) return arguments[0];

      return _.filter(_.flatten(_.zip.apply(null, arguments), true), function(elem) {
        return elem != null;
      });
    },
    interleave: _.weave,

    // Returns an array of a value repeated a certain number of
    // times.
    repeat: function(t, elem) {
      return _.times(t, function() { return elem; });
    },

    // Returns an array built from the contents of a given array repeated
    // a certain number of times.
    cycle: function(t, elems) {
      return _.flatten(_.times(t, function() { return elems; }), true);
    },

    // Returns an array with two internal arrays built from
    // taking an original array and spliting it at an index.
    splitAt: function(array, index) {
      return [_.take(array, index), _.drop(array, index)];
    },

    // Call a function recursively f(f(f(args))) until a second
    // given function goes falsey.  Expects a seed value to start.
    iterateUntil: function(doit, checkit, seed) {
      var ret = [];
      var result = doit(seed);

      while (checkit(result)) {
        ret.push(result);
        result = doit(result);
      }

      return ret;
    },

    // Takes every nth item from an array, returning an array of
    // the results.
    takeSkipping: function(array, n) {
      var ret = [];
      var sz = _.size(array);

      if (n <= 0) return [];
      if (n === 1) return array;

      for(var index = 0; index < sz; index += n) {
        ret.push(array[index]);
      }

      return ret;
    },

    // Returns an array of each intermediate stage of a call to
    // a `reduce`-like function.
    reductions: function(array, fun, init) {
      var ret = [];
      var acc = init;

      _.each(array, function(v,k) {
        acc = fun(acc, array[k]);
        ret.push(acc);
      });

      return ret;
    },

    // Runs its given function on the index of the elements rather than
    // the elements themselves, keeping all of the truthy values in the end.
    keepIndexed: function(array, pred) {
      return _.filter(_.map(_.range(_.size(array)), function(i) {
        return pred(i, array[i]);
      }),
      existy);
    },

    // Accepts an array-like object (other than strings) as an argument and
    // returns an array whose elements are in the reverse order. Unlike the
    // built-in `Array.prototype.reverse` method, this does not mutate the
    // original object. Note: attempting to use this method on a string will
    // result in a `TypeError`, as it cannot properly reverse unicode strings.
    reverseOrder: function(obj) {
      if (typeof obj == 'string')
        throw new TypeError('Strings cannot be reversed by _.reverseOrder');
      return slice.call(obj).reverse();
    },

    // Returns copy or array sorted according to arbitrary ordering
    // order must be an array of values; defines the custom sort
    // key must be a valid argument to _.iteratee
    collate: function(array, order, key) {
      if (typeof array.length != "number") throw new TypeError("expected an array-like first argument");
      if (typeof order.length != "number") throw new TypeError("expected an array-like second argument");

      var original = slice.call(array);
      var valA, valB;
      var cb = _.iteratee(key);
      return sort.call(original, function (a, b) {
        var rankA = _.indexOf(order, cb(a));
        var rankB = _.indexOf(order, cb(b));

        if(rankA === -1) return 1;
        if(rankB === -1) return -1;

        return rankA - rankB;
      });
    },

    // Creates an array with all possible combinations of elements from
    // the given arrays
    combinations: function(){
      return _.reduce(slice.call(arguments, 1),function(ret,newarr){
        return _.reduce(ret,function(memo,oldi){
          return memo.concat(_.map(newarr,function(newi){
            return oldi.concat([newi]);
          }));
        },[]);
      },_.map(arguments[0],function(i){return [i];}));
    }

  });

}).call(this);
