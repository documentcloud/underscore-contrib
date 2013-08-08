Documentation should use [Journo](https://github.com/jashkenas/journo) formats and standards.

### Retrieving the second element in an array with `_.second`

The `_.second` function is a convenience for the equivalent `array[1]`:

    _.second(['a','b']);
    //=> 'b'
    
    _.map([['a','b'], _.range(10,20)], _.second);
    //=> ['b',11]


    nth: function(array, index) {
    takeWhile: function(array, pred) {
    dropWhile: function(array, pred) {
    splitWith: function(array, pred) {
    partitionBy: function(array, fun){
    best: function(array, fun) {
    keep: function(array, fun) {
