### function.combinators

> Functions that are combinators.

Documentation should use [Journo](https://github.com/jashkenas/journo) formats and standards.

    always: function(value) {
    pipeline: function(/*, funs */){
    conjoin: function(/* preds */) {
    disjoin: function(/* preds */) {
    comparator: function(fun) {
    complement: function(pred) {
    splat: function(fun) {
    unsplat: function(fun) {
    unsplatl: function(fun) {
    mapArgs: curry2(baseMapArgs),
    juxt: function(/* funs */) {
    fnull: function(fun /*, defaults */) {
    flip2: function(fun) {
    flip: function(fun) {
    _.unsplatr = _.unsplat;
    _.mapArgsWith = curry2(_.flip(baseMapArgs));
    _.bound = function(obj, fname) {

