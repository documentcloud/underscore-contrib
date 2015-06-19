$(document).ready(function() {

  module("underscore.comparison.islike");

  test("string islike string", function() {
      ok(_.islike("hello, world", ""));
  });

  test("number islike number", function() {
      ok(_.islike(32.4, 0));
  });

  test("boolean islike boolean", function() {
      ok(_.islike(true, true));
  });

  test("string is not like number", function() {
      equal(_.islike("hello", 0), false);
  });

  test("boolean is not like number", function() {
      equal(_.islike(false, 0), false);
  });

  test("array is like array", function() {
      ok(_.islike([1,2,3], []));
  });

  test("number array is typed like array", function() {
      ok(_.islike([1,2,3], [0]));
  });

  test("string array is typed like array", function() {
      ok(_.islike(["hello", "world"], [""]));
  });

  test("string array is not typed like number array", function() {
      equal(_.islike(["hello", "world"], [0]), false);
  });

  test("object is like object", function() {
      ok(_.islike(
          {name: "James", age: 10, hobbies: ["football", "computer games", "baking"]},
          {name: "", age: 0, hobbies: [""]}
      ));
  });

  test("object is not like object", function() {
      equal(_.islike(
          {name: "James", age: 10, hobbies: ["football", "computer games", "baking"]},
          {name: "", age: 0, hometown: "", hobbies: [""]}
      ), false);
  });

  test("object is like type", function() {
      var Type = function(){};
      
      ok(_.islike(new Type, Type));
  });

  test("function is like Function", function() {
      ok(_.islike(function(){}, Function));
  });

  test("function is not like function", function() {
      equal(_.islike(function(){}, function(){}), false);
  });

  test("object with functions is like object", function() {
      ok(_.islike(
          {name: "James", age: 10, hobbies: ["football", "computer games", "baking"], done: function() { console.log("done");} },
          {name: "", age: 0, hobbies: [""], done: Function}
      ));
  });

  test("object with functions is not like object", function() {
      equal(_.islike(
          {name: "James", age: 10, hobbies: ["football", "computer games", "baking"], done: true},
          {name: "", age: 0, hobbies: [""], done: Function}
      ), false);
  });
});
