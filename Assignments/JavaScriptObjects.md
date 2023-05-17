---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/JavaScriptObjects.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: JavaScriptObjects.md
relativePath: /JavaScriptObjects.md
title: JavaScriptObjects
directoryName: Assignments
category : assignments-guide
---

# Java Script Objects

In this assignment we will learn about JavaScript objects.

These slide decks have useful information in them:

* [http://bit.ly/elven-javascript-basics](http://bit.ly/elven-javascript-basics)
* [http://bit.ly/function-types](http://bit.ly/function-types)
* JavaScript Intro: [http://bit.ly/javascript-intro](http://bit.ly/javascript-intro)
* JavaScript Node: [http://bit.ly/JavaScriptNode](http://bit.ly/JavaScriptNode)

Also see the section of Elvenware on Object Literals, and consider reading the entire opening sections of the Elvenware JavaScript Objects document:

- [Object Literals][elf-obj-literal]
- [Elvenware JavaScript Objects][ejo]

[elf-obj-literal]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#object-literal
[ejo]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html

The Elvenware JavaScript Objects document is a primary reference for this assignment. Note also, that in this exercise, we are mostly working with object literals, not function or constructor objects.

## Part One

Create or use a folder called one of the following:

- Prog109: Use your **javascript-tests** directory.
- Others: Create a directory called **Week0X-JavaScriptObjects**, where X is the current week.

Inside it create a single file called **javascript-objects-work.js**. In that file build a JavaScript object literal called **person** with two properties:

* firstName
* lastName

Set them to _your_ first and last names. Write the two properties to the console with **console.log()**.

**NOTE**: _You do not have to run this code from an HTML file or as an Express program in a browser. But if you want to do things that way, I will not take off for it. But really, it is simpler for me if this program just stays in a single nodejs file called **javascript-objects-work.js** that runs from the command line. Some students in advanced courses might want to use other tools such as EsLint or Prettier._

Now run it by typing something like:

```
node javascript-objects-work.js
```

The output should look something like this:

```
George
Washington
```

## Part Two

Add a **fullName** method to the **person** object. Make it part of the Object literal. The method should concatenate the first and last names, and return the result. Call the method and print out the return value with **console.log**.

```
node javascript-objects-work.js
George
Washington
George Washington
```

## Part Three

In the same file, using JavaScript Object Literal syntax, create a new object called **calculator**.

Inside the object literal, create two properties called:

* operand01
* operand02

Initialize these properties to -1, much as we initialized the name property of **person** to **'Suzie'** or some similar name in the first of the two examples in [Part Zero](#Part Zero). Of course, this property is of type **number**, not of type **string**.  

**HINT**: _See [this slide][obj-slide] for help understanding what I want._

Inside your program, but outside the object literal declaration, set the properties to the number of letters in your first and last name using dot notation:

```javascript
calculator.operand01 = person.firstName.length;
etc...
```

Use **console.log** to display the values of **operand01** and **operand02**.

## Simple Math

Add two methods with zero parameters that operate on **calculator.operand01** and **calculator.operand02**:

* add
* subtract

Put **add** and **subtract** inside the object literal. Implement a **multiply** method [outside][obj-outside] the object literal declaration using dot notation:

```javascript
var calculator = {
	// CODE OMITTED HERE
	// PUT ADD AND SUBTRACT IN HERE
};

calculator.multiply = etc.... // IMPLEMENT MULTIPLY HERE
```

The **multiply** function should take two parameters and return their product. When you call **multiply**, pass in the **operand01** and **operand02** properties of the **calculator** object.

Print the output. For instance, since my name is Charlie Calvert:

```
14
0
49
```

## Gussie it up

Add this method:

```javascript
function divider(title) {
	console.log("\n====================================");
	console.log(title);
	console.log("====================================\n");
}
```

Call it like this:

```javascript
divider('Calculator');
console.log('operand01 =', calculator.operand01);
```

And produced output like this:

```bash
$ node javascript-objects-work.js
====================================
Person
====================================

First Name: George
Last Name: Washington
Full Name: George Washington

====================================
Calculator
====================================

operand01 is the length of firstName: 6
operand02 is the length of lastName: 10
Add length of first and lastNames:  16
Subtract length of first and lastNames:  -4
Multiply length of first anhd lastNames:  60
```

Unless your name is George Washington, your output will probably differ, but this should give you some general idea of what to produce.

**NOTE**: _Prog109 students can ignore the following sections on formatting and testing. Instead, they should skip to directly to the [Turn it in](#turn-it-in) section._

## Format and Check

**NOTE**: _Prog109 students should skip this section._

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
total 44
drwxrwxr-x  3 charlie charlie 4096 Apr 10 20:12 ./
drwxrwxr-x 19 charlie charlie 4096 Jun  2  2018 ../
-rw-r--r--  1 charlie charlie  212 Apr 10 20:12 .eslintignore
-rw-r--r--  1 charlie charlie  988 Apr 10 20:12 .eslintrc.json
drwxrwxr-x  3 charlie charlie 4096 Nov 30 17:38 .idea/
-rwxr-xr-x  1 charlie charlie   48 Apr 10 20:12 installEslintPackages*
-rwxr-xr-x  1 charlie charlie  219 Apr 10 20:12 prettier*
-rw-r--r--  1 charlie charlie   55 Apr 10 20:12 .prettierignore
-rw-r--r--  1 charlie charlie   46 Apr 10 20:12 .prettierrc
-rwxrwxr-x  1 charlie charlie 1490 Apr 20  2018 javascript-objects-work.js*
```

Run prettier like this:

```code
./prettier
javascript-objects-work.js 42ms
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

**NOTE**: _Prog109 students should skip this section._

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
package name: (javascriptobjects)
version: (1.0.0)
description: Learn JavaScript Objects
entry point: (javascript-objects-work.js)
test command: jest
git repository: https://github.com/charliecalvert/prog272-calvert-2019
keywords: JavaScript Objects
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
  "start": "node javascript-objects-work.js",
  "test": "jest"
},
```

Your **package.json** file might now look a bit like this:

```javascript
{
  "name": "javascriptobjects",
  "version": "1.0.0",
  "description": "Learn JavaScript Objects",
  "main": "javascript-objects-work.js",
  "scripts": {
    "start": "node javascript-objects-work.js",
    "test": "jest"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/charliecalvert/prog272-calvert-2019.git"
  },
  "keywords": [
    "JavaScript",
    "Objects"
  ],
  "author": "Charlie Calvert",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/charliecalvert/prog272-calvert-2019/issues"
  },
  "homepage": "https://github.com/charliecalvert/prog272-calvert-2019#readme",
  "dependencies": {
    "jest": "^24.7.1"
  }
}
```

Notice the **scripts** and **dependencies** properties. Notice also that JSON is nothing but a simple JavaScript object.

## Write the Test {#write-test}

**NOTE**: _Prog109 students should skip this section._

At the bottom of **javascript-objects-work.js** add this line:

```JavaScript
module.exports = calculator;
```

This gives us access to the **calculator** object from outside of **javascript-objects-work.js**. More explicitly, it **exports** the **calculator** object from the **javascript-objects-work.js** module. Below you will see how to import it into another module using **require**. (For now, you can think of **module** and the words **JavaScript file** as being nearly synonymous terms.)

Create a file called **work.test.js** in the same directory as **javascript-objects-work.js**:

```javascript
const calculator = require('./work');

test('proves that multiply returns 24 if passed 2 and 12', () => {
    expect(calculator.multiply(12, 2)).toBe(24);
});
```

This code first uses **require** to import the **calculator** object from **javascript-objects-work.js** and then runs a test against it proving that its **multiply** method works correctly.

Because of the way we have set this up, we get a lot of extraneous output from our **console.log** statements. But if you ignore them for now, the output looks a bit like this:

```code
$ npm test

> javascriptobjects@1.0.0 test /media/charlie/elfdisk/Git/writings/UnitTests/Js/JavaScriptObjects
> jest

 PASS  ./work.test.js
  ✓ proves that multiply returns 24 if passed 2 and 12 (2ms)

  console.log javascript-objects-work.js:39

    ====================================

  console.log javascript-objects-work.js:40
    Person

  console.log javascript-objects-work.js:41
    ====================================


  console.log javascript-objects-work.js:14
    First Name: George

   // LOTS OF OUTPUT OMITTED HERE

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.674s, estimated 1s
Ran all test suites.
```


## Turn it in {#turn-it-in}

Save your work to your repository. Submit the url of your project and/or the directory in which you did your work.

Take a screenshot of the output of your program and attach it to the assignment when you turn it in.

In summary:

- The **firstName** and **lastName** properties of the **person** object should be declared with object literal syntax.
- The **fullName**, **add** and **subject** methods should be declared inside the object literals
- The **multiply** method should be part of the **calculator** object but declared outside the original object literal declaration for the **calculator** object.

If you unclear what all this means, look at the JavaScript Basics slide deck again.

## Hint for Linux Users {#linux-hint}

**NOTE**: _Prog109 students should skip this section._

You can put a hash bang at the top of a file like **javascript-objects-work.js**:

```javascript
#!/usr/bin/env node

var person = {
	etc...
}
```

Then mark it as executable:

```bash
chmod +x javascript-objects-work.js
```

Now you can start it like this:

```bash
./javascript-objects-work.js
```

<!--       -->
<!-- links -->
<!--       -->

[obj-outside]: /javascript-guide/JavaScriptObjects.html#outside
[obj-slide]: https://docs.google.com/presentation/d/1uT8eqrBayG6ZgdBsGIWbxOr9Lf7nWnTZSHi1mlKfZks/edit#slide=id.g29c371fd0_022
[resl]: /teach/assignments/react/ReactEsLint.html
[gg]: /teach/assignments/git/GetGist.html
