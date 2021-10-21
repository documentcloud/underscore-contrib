### statistics

> Statisctics Functions. <a href="docs/underscore.collections.statistics.js.html" class="btn btn-primary btn-xs">View Annotated Source</a>

#### mean

Signature: `_.mean(... arrays:Array ...)`

The `_.mean` function finds out the average value from the array of numbers.

```javascript

_.mean([]);
//=> 0

_.mean([0, 1, 2, 3, 4]);
//=> 2

_.mean(null)
//=> 0

```

#### median

Signature: `_.median(... arrays:Array ...)`

The `_.median` function finds out the middle value from the array of numbers.

Calulation of median is done using the following method.

If the array has odd numbers then median is the middle element.

If the array has even numbers then average of middle two numbers is the median value.
```javascript

_.median([]);
//=> undefined

_.median([1, 2, 3]);
//=> 2

_.median([1, 2, 3, 4])
// => 2.5

```

#### sum

Signature: `_.sum(... arrays:Array ...)`

The `_.sum` function calculates the sum of the given arrays.

```javascript

_.sum([]);
//=> 0

_.sum([0, 1, 2, 3, 4]);
//=> 10
```

#### variance

Signature: `_.variance(... arrays:Array ...)`

The `_.variance` function return the variance of the numeric elements of the collection.

```javascript

_.variance([]);
//=> 0

_.variance([0, 1, 2, 3, 4]);
//=> 1.25
```

#### standardDeviation

Signature: `_.standardDeviation(... arrays:Array ...)`

The `_.standardDeviation` function return the standard deviation of the numeric elements of the collection.

```javascript

_.standardDeviation([]);
//=> 0

_.standardDeviation([1, 2, 3, 4]);
//=> 1.118
```

#### standardError

Signature: `_.standardError(... arrays:Array ...)`

The `_.standardError` function return the standard error of the numeric elements of the collection.

```javascript

_.standardError([]);
//=> 0

_.standardError([1, 2, 3, 4]);
//=> 0.64
```

#### mode

Signature: `_.mode(... arrays:Array ...)`

The `_.mode` function return the element (or element-based computation) that appears most frequently in the collection.

```javascript

_.mode([]);
//=> undefined

_.mode([1, 1, 3, 4]);
//=> 1
```

#### statRange

Signature: `_.statRange(... arrays:Array ...)`

The `_.statRange` function return the difference of the max and min value of the elements in the array.

```javascript

_.statRange([]);
//=> -Infinity

_.statRange([1, 1, 3, 4]);
//=> 3
```

#### percentile

Signature: `_.percentile(... arrays:Array ...,percentileval:number)`

The `_.percentile` function return the percentile value of the numeric elements from the collection like 50th,75th,99th etc.

```javascript

_.percentile([], 10);
//=> 0

_.percentile([1, 1, 3, 4], 50);
//=> 2
```