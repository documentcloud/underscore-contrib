import isEmpty from 'underscore/modules/isEmpty';
import groupBy from 'underscore/modules/groupBy.js';
import max from 'underscore/modules/max.js';
import first from 'underscore/modules/first.js';

// Return the element (or element-based computation) that appears most frequently in the collection.
// https://en.wikipedia.org/wiki/Mode_(statistics)
export default function mode(collection, iteratee, context) {
  if (isEmpty(collection)) return;
  
  if (typeof iteratee == 'number' && collection != null && typeof collection[0] != 'object') {
    iteratee = null;
  }
  var groups = groupBy(collection, iteratee, context);
  return first(max(groups, 'length'));
}
