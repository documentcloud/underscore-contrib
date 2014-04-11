### array.selectors

> Functions to take things from arrays. <a href="docs/underscore.array.selectors.js.html" class="btn btn-primary btn-xs">View Annotated Source</a>

--------------------------------------------------------------------------------

#### dropWhile

The `_.dropWhile` function works similarly except that it *drops* elements from the original array for which the given function returns a truthy value:

```javascript
_.dropWhile([-2,-1,0,1,2], isNeg);
//=> [0,1,2]
```

--------------------------------------------------------------------------------

#### nth

The `_.nth` function is a convenience for the equivalent `array[n]`:

```javascript
_.nth(['a','b','c'], 2);
//=> 'c'
```

If given an index out of bounds then `_.nth` will return `undefined`:

```javascript
_.nth(['a','b','c'], 2000);
//=> undefined
```

The `_.nth` function can also be used in conjunction with `_.map` and `_.compact` like so:

```javascript
var b = [['a'],['b'],[]];

_.compact(_.map(b, function(e) { return _.nth(e,0) }));
//=> ['a','b']
```

If wrapping a function around `_.nth` is too tedious or you'd like to partially apply the index then Underscore-contrib offers any of `_.flip2`, `_.fix` or `rcurry2` to solve this.

--------------------------------------------------------------------------------

#### second

The `_.second` function is a convenience for the equivalent `array[1]`:

```javascript
_.second(['a','b']);
//=> 'b'

_.map([['a','b'], _.range(10,20)], _.second);
//=> ['b',11]
```

You can also pass an optional number to the `_.second` function to take a number of elements from an array starting with the second element and ending at the given index:

```javascript
_.second(_.range(10), 5)
//=> [1, 2, 3, 4]
```

--------------------------------------------------------------------------------

#### takeWhile

The `_.takeWhile` function takes an array and a function and returns a new array containing the first n elements in the original array for which the given function returns a truthy value:

```javascript
var isNeg = function(n) { return n < 0; };

_.takeWhile([-2,-1,0,1,2], isNeg);
//=> [-2,-1]
```

--------------------------------------------------------------------------------

#### third

The `_.third` function is a convenience for the equivalent `array[2]`:

```javascript
_.third(['a','b','c']);
//=> 'c'

_.map([['a','b','c'], _.range(10,20)], _.third);
//=> ['c',12]
```

You can also pass an optional number to the `_.third` function to take a number of elements from an array starting with the third element and ending at the given index:

```javascript
_.third(_.range(10), 5)
//=> [2, 3, 4]
```

--------------------------------------------------------------------------------