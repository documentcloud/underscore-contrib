['array.builders',
 'array.selectors',
 'function.arity',
 'function.combinators',
 'function.iterators',
 'function.predicates',
 'object.builders',
 'object.selectors',
 'util.existential',
 'util.strings',
 'util.trampolines'].forEach(function (lib) {
   require('./underscore.'+lib);
 });

module.exports = require('underscore');
