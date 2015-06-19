### comparison.islike

This is a function to check things, and particularly complex objects, fit a certain pattern. It is useful when you want to check that an argument you have received has the properties you expect.

**Signature:** `_.islike(object:Any, pattern:Any)`

Returns `true` if the object is like the pattern. `false` otherwise.

```javascript
_.islike(
  {name: "James", age: 10, hobbies: ["football", "computer games", "baking"]},
  {name: "", age: 0, hobbies: [""]}
)

```

To specify that a value should be a string you can put an empty string in the pattern `""`. For a number use `0` and for an array use an empty array `[]`. Nested objects are recursively checked.

 * `""` - stands for a string
 * `0` - stands for a number
 * `false` - stands for a boolean
 * `[]` - stands for an array
 * `Function` - stands for a function

If you specify a type in the pattern then the value will be tested using `instanceof`. If you want to verify a function value (for instance a callback) you need to pass the `Function` type, since a normal `function() {}` is indistinguishable from type in Javascript. A more complex example using these follows:

```javascript
_.islike(myArgument, {
    title: "", count: "", owner: OwnerModel, success: Function, error: Function
});
```

An array value can also be type checked by passing an array of types in the pattern. For example

 * `_.islike([ 1, 2, 3, "hello" ], [ 0 ])` - returns false
 * `_.islike([ 1, 2, 3, "hello", function() {} ], [ 0, "" ])` - returns false
 * `_.islike([ 1, 2, 3, "hello" ], [ 0, "" ]}` - returns true
 * `_.islike([ 1, 2, 3, "hello", function() {} ], [ 0, "", Function ]}` - returns true

`[""]` allows an array of only strings and `["",0]` allows strings and numbers. This check is done using `typeof` so objects and arrays will fall into the same category.
