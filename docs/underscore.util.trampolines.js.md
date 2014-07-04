### util.trampolines

> Trampoline functions.

--------------------------------------------------------------------------------

#### done

**Signature:** `_.done(value:Any)`

A utility for wrapping a function's return values so they can be used by
`_.trampoline`. [See below](#trampoline).

--------------------------------------------------------------------------------

#### trampoline

**Signature:** `_.trampoline(fun:Function[, args:Any...])`

Provides a way of creating recursive functions that won't exceed a JavaScript
engine's maximum recursion depth. Rather than writing a naive recursive
function, the function's base cases must return `_.done(someValue)`, and
recursive calls must be wrapped in a returned function.

In order to create a trampolined function that can be used in the same way as
a naive recursive function, use `_.partial` as illustrated below.

```javascript
function isEvenNaive (num) {
    if (num === 0) return true;
    if (num === 1) return false;
    return isEvenNaive(num - 2);
}

isEvenNaive(99999);
// => InternalError: too much recursion

function isEvenInner (num) {
    if (num === 0) return _.done(true);
    if (num === 1) return _.done(false);
    return function () { return isEvenInner(Math.abs(num) - 2); };
}

_.trampoline(isEvenInner, 99999);
// => false

var isEven = _.partial(_.trampoline, isEvenInner);

isEven(99999);
// => false
```

--------------------------------------------------------------------------------