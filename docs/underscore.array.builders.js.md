Documentation should use [Journo](https://github.com/jashkenas/journo) formats and standards.

## Array concatenation via `_.cat`

    cat: function() {
	
## Array construction via `_.cons`

    cons: function(head, tail) {

## Array partitioning via `_.partition` and `_.partitionAll`

    partition: function(array, n, pad) {
	partitionAll: function(array, n, step) {
	
## Array flattening via `_.mapcat`
	
    mapcat: function(array, fun) {
	
## Inserting elements into an array via `_.interpose`
	
    interpose: function(array, inter) {
	
## Weaving arrays together via `_.weave` and `_.interleave`
	
    weave: function(/* args */) {
    interleave: _.weave,
	
## Building arrays from repeated value with `_.repeat` and `_.cycle`
	
    repeat: function(t, elem) {
    cycle: function(t, elems) {
	
## Splitting an array with `_.splitAt`
	
    splitAt: function(array, index) {
	
## Building an array until a condition fails via `_.iterateUntil`
	
    iterateUntil: function(doit, checkit, seed) {
	
## Taking skipped elements from an array with `_.takeSkipping`
	
    takeSkipping: function(array, n) {
	
## Storing every stage of a reduce with `_.reductions`
	
    reductions: function(array, fun, init) {
	
## Taking elements from an array based on properties of their keys
	
    keepIndexed: function(array, pred) {


