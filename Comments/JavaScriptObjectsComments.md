# JavaScript Objects

Notes on JavaScript Objects assignment.

## Implementation

A few students wrote this for the add method:

```javascript
console.log(calculator.operator01 + calculator.operator02);
```

There were cases were **operator1** and **operator2** were not correctly declared.

I was looking for something more like this:

```javascript
var calculator = {
    operator01: 0,

    operator02: 0,

    add: function() {
        'use strict';
        return this.operator01 + this.operator02;
    },
```

The subtract method would look much the same. Here is an alternative syntax for use outside of the **calculator** object literal:

```javascript
var calculator = {
	// CODE OMITTED HERE
};

calculator.multiply = function() {
    'use strict';
    return this.operator01 * this.operator02;
};
```

## Formatting

The best way to get your formatting right is with [JSCS][jscs]. More details are available in [Grunt Check][grunt-check] assignment.

[jscs]: https://github.com/jscs-dev/node-jscs
[grunt-check]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntCheck.html

## Formatting Objects



Here is the way I prefer that you format an object:

```javascript
var myObject = {
	prop01: "prop01",

	prop02: "prop02",

	getNine: function() {
		return 9;
	}
};

console.log(myObject.prop01);
console.log(myObject.prop02);
```

Note that I indent with four spaces. Code that should not be indented is flush left. I also put an empty line between each property and method.

On that last point, I am in a small minority. Most people apparently prefer this:

```javascript
// THIS IS WIDELY ACCEPTED
var myObject = {
	prop01: "prop01",
	prop02: "prop02",
	getNine: function() {
		return 9;
	}
};

In my opinion, this is not bad:

```javascript
// I PREFER, BUT DO NOT INSIST UPON
var myObject = {
	prop01: "prop01",
	prop02: "prop02",

	getNine: function() {
		return 9;
	}
};
```

Please see the style guides listed below, particular, the Google style guide, for more information.

## Some Bad Formatting

Except in the case of very small object literals that contain no methods, don't put multiple properties on the same line:

```javascript
var myObject = {
	prop01: "prop01", prop02: "prop02",
	getNine: function() {
		return 9;
	}
};
```

Don't put functions on the same line as properties:

```javascript
var myObject = {
	prop01: "prop01", prop02: "prop02",	getNine: function() {
		return 9;
	}
};
```

## References

I should note that hardly anyone agrees with me about putting an empty line between properties:

* [google](https://google.github.io/styleguide/javascriptguide.xml)
* [mozilla](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style#JavaScript_objects)
* [jquery](https://contribute.jquery.org/style-guide/js/#spacing)
* [airbnb style quide](https://github.com/airbnb/javascript#objects)
* [github](https://github.com/styleguide/javascript)
