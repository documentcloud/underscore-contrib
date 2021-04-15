import isArrayLike from 'underscore/modules/_isArrayLike.js';
import values from 'underscore/modules/values.js';
import 'underscore/modules/iteratee.js';
import _ from 'underscore/modules/underscore.js';
import find from 'underscore/modules/find.js';

// Return the sum of elements (or element-based computation).
export default function sum(collection, iteratee, context) {
  var result = 0;
  if (iteratee == null || typeof iteratee == 'number'  && collection != null && typeof collection[0] != 'object') {
    collection = isArrayLike(collection) ? collection : values(collection);
    for (var i = 0, length = collection.length; i < length; i++) {
      result += collection[i];
    }
  } else {
    iteratee = _.iteratee(iteratee, context);
    find(collection, function(v, index, list) {
      result += iteratee(v, index, list);;
    });
  }
  return result;
}
