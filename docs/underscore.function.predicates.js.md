### function.predicates

> Functions which return whether the input meets a condition.

Documentation should use [Journo](https://github.com/jashkenas/journo) formats and standards.

    isInstanceOf: function(x, t) { return (x instanceof t); },
    isAssociative: function(x) { return _.isArray(x) || _.isObject(x) || _.isArguments(x); },
    isIndexed: function(x) 
    isSequential: function(x)
    isZero: function(x) 
    isEven: function(x) 
    isOdd: function(x) 
    isPositive:
    isNegative:
    isValidDate: function(x)
    isNumeric: function(n)
    isInteger: function(i)
    isFloat: function(n)
    isIncreasing: function()
    isDecreasing: function()
    