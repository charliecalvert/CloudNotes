# Java Script Objects

In this assignment we will learn about JavaScript objects.

See the section of Elvenware on creating ECMAScript classes:

- [JavaScript Classes on Elvenware][jsclass].

Large sections of the entire Elvenware [JavaScriptObjects.html][jsobj] document is a primary reference for this assignment. Note also, that in this exercise, we are mostly Stateing with object literals, not function or constructor objects.

## Part One {#part-one}

Create or use a folder called **Week0X-JavaScriptClasses**, where X is the current week.

Inside it create a single file called **State.js**. In that file build a JavaScript Class called **State** with two properties that are initialized inide a constructor:

* stateName
* capital

In the constructor, set the properties to Washington State's name and capital. Instantiate an instance of the class with **new** and set the result to a **const** variable called **state**.

Outside the class, using ES6 syntax, create a method called **display** that you will use for all your output. This method is a wrapper around **console.log**:

```javascript
const display = (value) => {
    console.log(value);
};
```

Write the two properties to the console with the **display** method.

**NOTE**: _You do not have to run this code from an HTML file or as an Express program in a browser. But if you want to do things that way, I will not take off for it. But really, it is simpler for me if this program just stays in a single nodejs file called **State.js** that runs from the command line. Some students in advanced courses might want to use other tools such as EsLint or Prettier._

Now run it by typing something like:

```
cd Week02-JavaScriptClasses
node State.js
```

The output should look something like this:

```
Washington
Olympia
```

## Part Two

Add a **fullName** method to the **State** class. The method should concatenate the capital and state names, and return the result.

Call the **state.fullName** method and print out the return value with the **display** function.

```
node State.js
Washington
Olympia
Olympia, Washington
```

## Part Three

In a second file called **Calculator.js**, using JavaScript class syntax, create a new class called **Calculator**.

Inside the class, create two properties called:

* operand01
* operand02

Initialize these properties to **2** and **12**, much as we initialized the name property of **State** in [Part One](#part-one). Of course, this property is of type **number**, not of type **string**.  

Instantiate your class with **new** and set the result to a **const** variable called **calculator**.

Inside your program, but outside the class declaration, set the properties to the number of letters in the state and capital names using dot notation:

```javascript
calculator.operand01 = person.firstName.length;
etc...
```

## Export and require {#require}

Create a third file called **utilities.js**. Move the **display** function into it and **export** it:

```javascript
const display = (value) => {
    console.log(value);
};

exports.display = display;
```

Now require (import) **utilities** into both **State.js** and **Calculator.js**:

```javascript
const display = require("./utilities").display;
```

Confirm that **State.js** still works:

```code
$ node State.js
Washington
Olympia
Olympia, Washington
```

Back in **Calculator.js** require and use **display** to show the values of **operand01** and **operand02**:

```code
$ node Calculator.js
2
12
```

## Simple Math

Add two methods with zero parameters that operate on **calculator.operand01** and **calculator.operand02**:

* add
* subtract
* multiply

Put **add** and **subtract** inside the object literal. Implement **multiply** [outside][class-outside] the object literal declaration using dot notation:

```javascript
class Calculator  {
	// CODE OMITTED HERE
	// PUT ADD AND SUBTRACT IN HERE
};

Calculator.prototype.multiply = etc.... // IMPLEMENT MULTIPLY HERE
```

The **multiply** function should take two parameters and return their product. When you call **multiply**, pass in the **operand01** and **operand02** properties of the **calculator** object.

Print the output. For instance, since my name is Charlie Calvert:

```
$ node Calculator.js
Operanda: 2
Operandb: 12
Add: 14
Subtract: -10
Multiply: 24
```

## Gussie it up

Add this method to **utilities.js**:

```javascript
function divider(title) {
	console.log("\n====================================");
	console.log(title);
	console.log("====================================\n");
}
```

Export just as we exported **display**. Now you have two methods that are exported from **utilities**.

Let's change the way we import it and call it:

```javascript
const utils = require("./utilities");
// CODE OMITTED HERE
utils.divider('Calculator');
```

You will also have to change the way you call display. When you are done, your output might look like this:

```code
$ node Calculator.js

====================================
Calculator
====================================

Operanda: 2
Operandb: 12
Add: 14
Subtract: -10
Multiply: 24
```

Do the same for our **State** class:

```code
$ node State.js

====================================
State
====================================

Washington
Olympia
Olympia, Washington
```

## Combine State and Calculator.

Create a fourth file called **index.js**. Take all the code that instantiates instances of **State** and **Calculator** from their respective files and paste them into **index.js**. In other words, your calls on the **new** operator and your calls to the **display** method should now all be in **index.js**.

To make this work, you will need to require **utilities.js** in **index.js**. Will you need to require **utilities.js** in either **State.js** or **Calculator.js**. You make the call and assume that making it correctly is part of your grade.

You will need to export both **State** and **Calculator** from their respective files:

```javascript
module.exports = Calculator;
module.exports = State;
```

Here we don't explicitly name the export, which means that we are choosing a default. You will, of course, need to **require** both classes in **index.js**. Again, I'll leave that part of up to you.

When you are done, running **node.js** should look like this:

```bash
$ node index.js

====================================
State
====================================

Washington
Olympia
Olympia, Washington

====================================
Calculator
====================================

Operanda: 2
Operandb: 12
Add: 14
Subtract: -10
Multiply: 24
```

To be clear, be sure that neither **State.js** or **Calculator.js** make any calls to **console.log** or **display**. All the output should be handled in **index.js** working in conjunction with **utilities.js**.

## Format and Check

Code is not complete until it is properly formatted and free of at least certain obvious errors. In Pristine Lubuntu there is a script called **get-gist.** Run it and select the first item from the menu.

To get started, type **get-gist** and press enter. Pick the first item from the menu by typing the letter **a**:

```code
Gists
  a) Run ESLintRc and Prettier (cdef)
  b) ElfDebugEnzyme
  c) .eslintrc
  d) .eslintignore
  e) prettier
  f) .prettierrc
  g) Default React Component
  h) Setup React Native Enzyme Npm
  i) Setup React Native Enzyme Yarn
  j) ElvenLogger
  k) Elven Node systemd Tools
  l) Elven Create Concurrently
  x) Exit
```

Now press **x** to exit the menu.

When you are done your directory might look something like this:

```bash
$ ll
$ ll
total 52
drwxr-xr-x  3 charlie charlie 4096 Apr 11 10:50 ./
drwxrwxr-x 20 charlie charlie 4096 Apr 11 09:23 ../
-rw-r--r--  1 charlie charlie  338 Apr 11 10:50 Calculator.js
-rw-r--r--  1 charlie charlie  212 Apr 11 10:48 .eslintignore
-rw-r--r--  1 charlie charlie  988 Apr 11 10:48 .eslintrc.json
drwxrwxr-x  2 charlie charlie 4096 Apr 11 10:50 .idea/
-rw-rw-r--  1 charlie charlie  627 Apr 11 10:49 index.js
-rwxr-xr-x  1 charlie charlie   48 Apr 11 10:48 installEslintPackages*
-rwxr-xr-x  1 charlie charlie  219 Apr 11 10:49 prettier*
-rw-r--r--  1 charlie charlie   55 Apr 11 10:49 .prettierignore
-rw-r--r--  1 charlie charlie   46 Apr 11 10:49 .prettierrc
-rw-r--r--  1 charlie charlie  217 Apr 11 10:50 State.js
-rw-rw-r--  1 charlie charlie  280 Apr 11 10:49 utilities.js
```

Run prettier like this:

```code
$ ./prettier
utilities.js 29ms
State.js 28ms
Calculator.js 29ms
index.js 30ms
```

Now run eslint by typing **eslint** followed by a space and period and then hitting **enter**:

```code
eslint .
```

If eslint spits out errors, see if you can fix them.

If you want to learn more, review these assignments, but don't try to turn them in. Just read them and see if you can make any sense of my hurried notes:

- [React ESLint][resl]
- [Get Gist][gg]

## Setup Unit Test {#test-setup}

Run **npm init** and then fill in the fields a bit like I do in this listing:

```code
npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (javascriptclasses)
version: (1.0.0)
description: Class
entry point: (index.js)
test command: jest
git repository: https://github.com/charliecalvert/prog322-calvert-2019
keywords: javascript class require
author: Charlie Calvert
license: (ISC) MIT
```

Now install Jest:

```code
npm install jest
```

You can also type:

```code
npm i jest
```

Both commands do the same thing.

Add this to your package.json file:

```javascript
"scripts": {
  "start": "node index.js",
  "test": "jest"
},
```

Your **package.json** file might now look a bit like this:

```javascript
{
    "name": "javascriptclasses",
    "version": "1.0.0",
    "description": "Class",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "test": "jest"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/charliecalvert/prog322-calvert-2019.git"
    },
    "keywords": [
        "javascript",
        "class",
        "require"
    ],
    "author": "Charlie Calvert",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/charliecalvert/prog322-calvert-2019/issues"
    },
    "homepage": "https://github.com/charliecalvert/prog322-calvert-2019#readme",
    "dependencies": {
        "jest": "^24.7.1"
    }
}
```

Notice the **scripts** and **dependencies** properties. Notice also that JSON is nothing but a simple JavaScript object.

## Write the Test {#write-test}

Create a file called **State.test.js** in the same directory as **State.js**:

```javascript
const calculator = require('./State');

test('proves that multiply returns 24 if passed 2 and 12', () => {
    expect(calculator.multiply(12, 2)).toBe(24);
});
```

Because of the way we have set this up, we get output like this:

```code
$ npm test

> javascriptclasses@1.0.0 test /media/charlie/elfdisk/Git/writings/UnitTests/Js/JavaScriptClasses
> jest

 PASS  ./State.test.js
  ✓ proves that we can call fullName (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.727s
Ran all test suites.
```

## Turn it in

Save your work to your repository. Submit the url of your project and/or the directory in which you did your work.

Take a screenshot of the output of your program and attach it to the assignment when you turn it in.

<!--       -->
<!-- links -->
<!--       -->

[jsclass]: /javascript-guide/JavaScriptObjects.html#class-basics
[jsobj]: /javascript-guide/JavaScriptObjects.html
[obj-outside]: /javascript-guide/JavaScriptObjects.html#outside
[class-outside]: /javascript-guide/JavaScriptObjects.html#dynamic-class-method
[obj-slide]: https://docs.google.com/presentation/d/1uT8eqrBayG6ZgdBsGIWbxOr9Lf7nWnTZSHi1mlKfZks/edit#slide=id.g29c371fd0_022
[resl]: /teach/assignments/react/ReactEsLint.html
[gg]: /teach/assignments/git/GetGist.html
[elf-obj-literal]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#object-literal
[ejo]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html
