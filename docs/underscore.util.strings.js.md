### util.strings

> Functions for working with strings.

#### camelCase

**Signature:** `_.camelCase(string:String)`

Converts a dash-separated string to camel case. Opposite of [toDash](#todash).

```javascript
_.camelCase("ancient-greece");
// => "ancientGreece"
```

#### explode

**Signature:** `_.explode(s:String)`

Explodes a string into an array of characters. Opposite of [implode](#implode).

```javascript
_.explode("Plato");
// => ["P", "l", "a", "t", "o"]
```

#### implode

**Signature:** `_.implode(a:Array)`

Implodes an array of strings into a single string. Opposite of [explode](#explode).

```javascript
_.implode(["H", "o", "m", "e", "r"]);
// => "Homer"
```

#### strContains

**Signature:** `_.strContains(str:String, search:String)`

Reports whether a string contains a search string.

```javascript
_.strContains("Acropolis", "polis");
// => true
```

#### toDash

**Signature:** `_.toDash(string:String)`

Converts a camel case string to a dashed string. Opposite of [camelCase](#camelcase).

```javascript
_.toDash("thisIsSparta");
// => "this-is-sparta"
```