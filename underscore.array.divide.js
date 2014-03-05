// Underscore-contrib (underscore.array.builders.js 0.0.1)
// (c) 2014 Yusuke Sakurai
// Underscore-contrib may be freely distributed under the MIT license.
(function(root) {
  // Baseline setup
  // Establish the root object, `window` in the browser, or `global` on the server.
  var _ = root._ || require('underscore');

  // Mixiging in accessing to array or string's content with given location and length.
  // if length wasn't given, then return object at location
  /*
    _.at([0,1,2,3,4,5],2,2); // -> [2,3]
    _.at("abcde",3,2); // -> "de"
  */
  _.mixin({
    at : function(arrayOrString, location, length) {
      var i, max, result;
      if (arrayOrString == null) {
        arrayOrString = [];
      }
      if (location == null) {
        location = -1;
      }
      if (length == null) {
        length = 0;
      }
      if (location < 0 || length > arrayOrString.length) {
        return ;
      }
      if (length === 0) {
        return arrayOrString[location];
      } else {
        result = null;
        for (i = location, max = location+length; i < max; i++) {
          if (_.isArray(arrayOrString)) {
            if (result == null) {
              result = [];
            }
            result.push(arrayOrString[i]);
          } else if (_.isString(arrayOrString)) {
            if (result == null) {
              result = "";
            }
            result += arrayOrString[i];
          }
        }
        return result;
      }
    }
  });

  // Mixing in lenear-array-division
  // , dividing an array into grouped arrays if each content has equality with the previous neighbour.
  // This method also can be used for String.
  // The equality will be evalueated by given predicate block or simply '===' operator unless block wasn't given.
  /*
  _.divide([1,1,2,2,1,2]); // -> [[1,1],[2,2],[1],[2]]
  _.divide(["ab","abc","a","bc","ac","ba","bb"], function (prev, obj) {
    return (_.at(prev,0,1) === _.at(obj,0,1));
  }); // -> [["ab","abc","a"],["bc"],["ac"],["ba","bb"]]
  _.divide("aabbaccdd"); // -> ["aa","bb","a","cc","dd"]
  */ 
  _.mixin({
    divide: function(arrayOrString, predicate) {
      var i, max, length, location, obj, prev, range, ranges, result;
      if (arrayOrString == null) {
        arrayOrString = [];
      }
      if (predicate == null) {
        predicate = function(prev, current) {
          return prev === current;
        };
      }
      prev = arrayOrString[0];
      location = -1;
      length = 1;
      ranges = [];
      for (i = 1, max = arrayOrString.length; i <= max; i++) {
        obj = i < arrayOrString.length ? arrayOrString[i] : null;
        if (predicate(prev, obj)) {
          if (location < 0) {
            location = i - 1;
          }
          length++;
        } else if (i > 1) {
          ranges.push({
            location: (location > -1 ? location : i - 1),
            length: length
          });
          length = 1;
          location = -1;
        }
        prev = obj;
      }
      result = [];
      for (i = 0, max = ranges.length; i < max; i++) {
        range = ranges[i];
        result.push(_.at(arrayOrString,range.location,range.length));
      }
      return result;
    }
  });

})(this);
