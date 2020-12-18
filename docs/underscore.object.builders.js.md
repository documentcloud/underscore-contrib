### object.builders

> Functions to build objects.

--------------------------------------------------------------------------------

#### frequencies

**Signature:** `_.frequencies(arr:Array)`

Returns an object whose property keys are the values of `arr`'s elements. The
property values are a count of how many times that value appeared in `arr`.

```javascript
var citations = ["Plato", "Aristotle", "Plotinus", "Plato"];

_.frequencies(citations);
// => { Plato: 2, Aristotle: 1, Plotinus: 1 }
```

--------------------------------------------------------------------------------

#### merge

**Signature:** `_.merge(obj1:Object[, obj:Object...])`

Returns a new object resulting from merging the passed objects. Objects
are processed in order, so each will override properties of the same
name occurring in earlier arguments.

Returns `null` if called without arguments.

```javascript
var a = {a: "alpha"};
var b = {b: "beta"};

var threeGreekLetters = _.merge(a, b, {g: "gamma"});

a;
// => {a: "alpha"}

b;
// => {b: "beta"}

threeGreekLetters;
// => { a: "alpha", b: "beta", g: "gamma" }
```

--------------------------------------------------------------------------------

#### renameKeys

**Signature:** `_.renameKeys(obj:Object, keyMap:Object)`

Takes an object (`obj`) and a map of keys (`keyMap`) and returns a new object
where the keys of `obj` have been renamed as specified in `keyMap`.

```javascript
_.renameKeys({ a: 1, b: 2 }, { a: "alpha", b: "beta" });
// => { alpha: 1, beta: 2 }
```

--------------------------------------------------------------------------------

#### setPath

**Signature:** `_.setPath(obj:Object, value:Any, ks:Array, defaultValue:Any)`

Sets the value of a property at any depth in `obj` based on the path described
by the `ks` array. If any of the properties in the `ks` path don't exist, they
will be created with `defaultValue`.

Note that the original object will *not* be mutated. Instead, `obj` will
be cloned deeply.



```javascript

var obj = {};

var plotinusObj = _.setPath(obj, "Plotinus", ["Platonism", "Neoplatonism"], {});

obj;
// => {}

plotinusObj;
// => { Platonism: { Neoplatonism: "Plotinus" } }

obj === plotinusObj;
// => false;

```

--------------------------------------------------------------------------------

#### snapshot

**Signature:** `_.snapshot(obj:Object)`

Snapshots/clones an object deeply.

```javascript
var schools = { plato: "Academy", aristotle: "Lyceum" };

_.snapshot(schools);
// => { plato: "Academy", aristotle: "Lyceum" }

schools === _.snapshot(schools);
// => false
```

--------------------------------------------------------------------------------

#### updatePath

**Signature:** `_.updatePath(obj:Object, fun:Function, ks:Array, defaultValue:Any)`

Updates the value at any depth in a nested object based on the path described by
the `ks` array.  The function `fun` is called with the current value and is
expected to return a replacement value.  If no keys are provided, then the
object itself is presented to `fun`. If a property in the path is missing, then
it will be created with `defaultValue`.

Note that the original object will *not* be mutated. Instead, `obj` will
be cloned deeply.

```javascript
var imperialize = function (val) {
    if (val == "Republic") return "Empire";
    else return val;
};

_.updatePath({ rome: "Republic" }, imperialize,  ["rome"]);
// => { rome: "Empire" }

var obj = { earth: { rome: "Republic" } };
var imperialObj = _.updatePath(obj, imperialize, ["earth", "rome"]);

imperialObj;
// => { earth: { rome: "Empire" }}

obj;
// => { earth: { rome: "Republic" }}

obj === imperialObj;
// => false
```

--------------------------------------------------------------------------------

#### omitPath

**Signature:** `_.omitPath(obj:Object, ks:String|Array)`

Returns a copy of `obj` excluding the value represented by the `ks` path.
Path may be given as an array or as a dot-separated string.

```javascript
var test = {
    foo: true,
    bar: false,
    baz: 42,
    dada: {
        carlos: {
            pepe: 9
        },
        pedro: 'pedro'
    }
};

_.omitPath(test, 'dada.carlos.pepe');
// => {foo: true, bar: false, baz: 42, dada: {carlos: {}, pedro: 'pedro'}}
```
