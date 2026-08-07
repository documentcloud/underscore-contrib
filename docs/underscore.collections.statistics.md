### statistics

> Statisctics Functions. <a href="docs/underscore.collections.statistics.js.html" class="btn btn-primary btn-xs">View Annotated Source</a>

#### mean

Signature: `_.mean(... array:Array ...)`

The `_.mean` function finds out the average value from the array of numbers.

Link for reference <a href="https://en.wikipedia.org/wiki/Mean" target="_blank" class="btn btn-primary btn-xs">Mean</a>

```javascript

_.mean([]);
//=> 0

_.mean([0, 1, 2, 3, 4]);
//=> 2

_.mean(null)
//=> 0

```

#### median

Signature: `_.median(... array:Array ...)`

The `_.median` function finds out the middle value from the array of numbers.

Calulation of median is done using the following method.

If the array is odd length then median is the middle element.

If the array is even numbers then average of middle two numbers is the median value.

Link for reference <a href="https://en.wikipedia.org/wiki/Median" target="_blank" class="btn btn-primary btn-xs">Median</a>

```javascript

_.median([]);
//=> undefined

_.median([1, 2, 3]);
//=> 2

_.median([1, 2, 3, 4])
// => 2.5

```

#### sum

Signature: `_.sum(... array:Array ...)`

The `_.sum` function calculates the sum of the given array.

```javascript

_.sum([]);
//=> 0

_.sum([0, 1, 2, 3, 4]);
//=> 10
```

#### variance

Signature: `_.variance(... array:Array ...)`

The `_.variance` function return the variance of the numeric elements of the collection.

Link for reference <a href="https://en.wikipedia.org/wiki/Variance" target="_blank" class="btn btn-primary btn-xs">Variance</a>

```javascript

_.variance([]);
//=> 0

_.variance([0, 1, 2, 3, 4]);
//=> 1.25
```

#### standardDeviation

Signature: `_.standardDeviation(... array:Array ...)`

The `_.standardDeviation` function return the standard deviation of the numeric elements of the collection.

Link for reference <a href="https://en.wikipedia.org/wiki/Standard_deviation" target="_blank" class="btn btn-primary btn-xs">Standard Deviation</a>

```javascript

_.standardDeviation([]);
//=> 0

_.standardDeviation([1, 2, 3, 4]);
//=> 1.118
```

#### standardError

Signature: `_.standardError(... array:Array ...)`

The `_.standardError` function return the standard error of the numeric elements of the collection.

Link for reference <a href="https://en.wikipedia.org/wiki/Standard_error" target="_blank" class="btn btn-primary btn-xs">Standard Error</a>

```javascript

_.standardError([]);
//=> 0

_.standardError([1, 2, 3, 4]);
//=> 0.64
```

#### mode

Signature: `_.mode(... array:Array ...)`

The `_.mode` function return the element (or element-based computation) that appears most frequently in the collection.

Link for reference <a href="https://en.wikipedia.org/wiki/Mode_(statistics)" target="_blank" class="btn btn-primary btn-xs">Mode</a>

```javascript

_.mode([]);
//=> undefined

_.mode([1, 1, 3, 4]);
//=> 1
```

#### statRange

Signature: `_.statRange(... array:Array ...)`

The `_.statRange` function return the difference of the max and min value of the elements in the array.

Link for reference <a href="https://en.wikipedia.org/wiki/Range_(statistics)" target="_blank" class="btn btn-primary btn-xs">Range</a>

```javascript

_.statRange([]);
//=> -Infinity

_.statRange([1, 1, 3, 4]);
//=> 3
```

#### percentile

Signature: `_.percentile(... array:Array ...,percentileVal:number)`

The `_.percentile` function return the percentile value of the numeric elements from the collection like 50th,75th,99th etc.

Link for reference <a href="https://en.wikipedia.org/wiki/Percentile" target="_blank" class="btn btn-primary btn-xs">Percentile</a>


```javascript

_.percentile([], 10);
//=> 0

_.percentile([1, 1, 3, 4], 50);
//=> 2
```