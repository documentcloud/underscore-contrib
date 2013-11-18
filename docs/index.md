# Underscore-contrib

> The brass buckles on Underscore's utility belt - a contributors' library for [Underscore](http://underscorejs.org/).

## Introduction

### Places

  * [Documentation](http://documentcloud.github.io/underscore-contrib/)
  * [Source repository](https://github.com/documentcloud/underscore-contrib)
  * [Tickets and bug reports](https://github.com/documentcloud/underscore-contrib/issues?state=open)
  * [Maintainer's website](http://www.fogus.me)

### Why underscore-contrib?

While Underscore provides a bevy of useful tools to support functional programming in JavaScript, it can't
(and shouldn't) be everything to everyone. Underscore-contrib is intended as a home for functions that, for
various reasons, don't belong in Underscore proper. In particular, it aims to be:

  * a home for functions that are limited in scope, but solve certain point problems, and
  * a proving ground for features that belong in Underscore proper, but need some advocacy and/or evolution
(or devolution) to get them there.

### Use

First, you’ll need Underscore. Then you can grab the relevant underscore-contrib libraries and simply add
something
like the following to your pages:

    <script type="text/javascript" src="underscore.js"></script>
    <script type="text/javascript" src="underscore.object.builders.js"></script>

At the moment there are no cross-contrib dependencies (i.e. each library can stand by itself), but that may
change in the future.

### License

_.contrib is open sourced under the [MIT license](https://github.com/documentcloud/underscore-contrib/blob/master/LICENSE). 
## Sub-libraries

The _.contrib library currently contains a number of related capabilities, aggregated into the following files.

  - [underscore.array.builders](docs/underscore.array.builders.html) - functions to build arrays
  - [underscore.array.selectors](docs/underscore.array.selectors.html) - functions to take things from arrays
  - [underscore.collections.walk](docs/underscore.collections.walk.html) - functions to walk and transform nested JavaScript objects
  - [underscore.function.arity](docs/underscore.function.arity.html) - functions to manipulate and fix function argument arity
  - [underscore.function.combinators](docs/underscore.function.combinators.html) - functions to combine functions to make new functions
  - [underscore.function.iterators](docs/underscore.function.iterators.html) - functions to lazily produce, manipulate and consume sequence iterators
  - [underscore.function.predicates](docs/underscore.function.predicates.html) - functions that return `true` or `false` based on some criteria
  - [underscore.object.builders](docs/underscore.object.builders.html) - functions to build JavaScript objects
  - [underscore.object.selectors](docs/underscore.object.selectors.html) - functions to pick things from JavaScript objects
  - [underscore.util.existential](docs/underscore.util.existential.html) - functions that check for the existence or truthiness of JavaScript data types
  - [underscore.util.operators](docs/underscore.util.operators.html) - functions that wrap common (or missing) JavaScript operators
  - [underscore.util.strings](docs/underscore.util.strings.html) - functions to work with strings
  - [underscore.util.trampolines](docs/underscore.util.trampolines.html) - functions to facilitate calling functions recursively without blowing the stack

The links above are to the annotated source code.  Full-blown _.contrib documentation is in the works.  Contributors welcomed.

