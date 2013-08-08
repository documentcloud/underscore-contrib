Documentation should use [Journo](https://github.com/jashkenas/journo) formats and standards.

### Retrieving the second element in an array with `_.second`

The `_.second` function is a convenience for the equivalent `array[1]`:

    _.second(['a','b']);
    //=> 'b'
    
    _.map([['a','b'], _.range(10,20)], _.second);
    //=> ['b',11]

You can also pass an optional number to the `_.second` function to take a number of elements from an array starting with the second element and ending at the given index:

    _.second(_.range(10), 5)
	//=> [1, 2, 3, 4]

### Retrieving the third element in an array with `_.third`

The `_.third` function is a convenience for the equivalent `array[2]`:

    _.third(['a','b']);
    //=> 'b'
    
    _.map([['a','b'], _.range(10,20)], _.third);
    //=> ['b',11]

You can also pass an optional number to the `_.third` function to take a number of elements from an array starting with the third element and ending at the given index:

    _.third(_.range(10), 5)
	//=> [2, 3, 4, 5]


    nth: function(array, index) {
    takeWhile: function(array, pred) {
    dropWhile: function(array, pred) {
    splitWith: function(array, pred) {
    partitionBy: function(array, fun){
    best: function(array, fun) {
    keep: function(array, fun) {
