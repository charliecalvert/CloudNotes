## Overview

The goal of this assignment is to see what **this** equals in the four class types of functions.

Understanding the **this** keyword in JavaScript is not easy. One step on the way is to see how it is treated in types of functions. The four basic types of functions are explained [here][function-types] and [here][function-this].

[function-types]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptFunctions.html#function-types
[function-this]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptFunctions.html#function-this

## Get started

Install **phantomjs-prebuilt** if you have not done so already:

<pre>
npm install -g phantomjs-prebuilt
</pre>

Then get the project from the elven-assignments repository:

<pre>
cd ~/Git/elven-assignments
git pull
cp -rv FunctionThis/ ~/Git/prog272-XXX-2016/Week05-FunctionThis
cd ~/Git/prog272-XXX-2016/Week05-FunctionThis
npm install && bower install
</pre>

## Strict

In this example, set strict off. _Do not use strict in any of the functions you implement in control.js unless I explicitly say to do so._

In **Gruntfile.js** have **jshint** ignore **node_modules** and **components** and set **strict** to **false**. Also add **validthis**:

```javascript
jshint: {
    files: ['**/*.js'],

    options: {
        ignores: [
            '**/node_modules/**', '**/components/**'
        ],
        reporter: require('jshint-stylish'),
        strict: false,   // WE CHANGED THIS LINE TO FALSE
        validthis: true, // WE NEED THIS TOO
        jasmine: true
    }
},
```

## Specs

Let's look at some tests:

```javascript
/**
 * Created by charlie on 10/7/15.
 */

describe('Elvenware Simple Plain Suite', function () {

    'use strict';

    it('expects true to be true', function () {
        expect(true).toBe(true);
    });

    it('expects getNine to return 9', function () {
        var result = getNine();
        expect(result).toBe(9);
    });

    it('expects a simple function called getThis to set this to the window object', function() {
        var result = getThis();
        expect(result).toBe(window);
    });

    it('expects a simple anonymous function to set this to the window object', function() {
        var result = getThisAnonymous();
        expect(result).toBe(window);
    });

    it('expects a method of myObject called getThis to set this to myObject', function() {
        var result = myObject.getThis();
        expect(result).toBe(myObject);
    });

    it('expects a method of myFunction called getThis to show this is myFunction', function() {
        var result = myFunction.getThis();
        expect(result).toBe(myFunction);
    });

    it('expects a constructor function called MyFunction to have a public method called getThis that shows this is MyFunction', function() {
        var myFunction = new MyFunction();
        var result = myFunction.getThis();
        expect(result).toBe(myFunction);
    });

    it('shows you can set the this operator for getThis to myObject', function() {
        var result = getThis.call(myObject);
        expect(result).toBe(myObject);
    });

    it('shows that return this from a simple strict function returns undefined', function() {
       var result = getThisStrict();
        expect(typeof result).toBe('undefined');
    });
});
```

## Implement

In **control.js** we should implement some functions like this:

```javascript
function getNine() {
    return 9;
}

function getThis() {  
    return this;
}
```

Notice that we are not using strict. You implement the remaining functions specified in the tests.

## Turn it in

The usual.
