---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/EcmaScript/EcmaScriptFunctions.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/EcmaScript
fileName: EcmaScriptFunctions.md
relativePath: /EcmaScript/EcmaScriptFunctions.md
title: EcmaScriptFunctions
directoryName: EcmaScript
category : ecmascript-guide
---

## Overview

The goal of this assignment is to learn how to work with ES6 JavaScript arrow functions, loops and  JavaScript classes. We will also learn about using Babel to transpile ES6 code into ES5. In this assignment, always use ES6 style code when declaring functions.

The deck for following along in class is [here](http://bit.ly/js-es6-babel).

**NOTE**: _Be sure to use fat arrow functions in all your code for this assignment. Don't use the keyword **function**!_

- [Types of functions on Elvenware][tof]

[tof]: https://www.elvenware.com/javascript-guide/JavaScriptFunctions.html#function-types

## Get Started

If your class is using Git branches, do your work in a branch called **week03**. Otherwise, continue using the **master** branch.

Create a folder called **Week03-EcmaScript** in the root of your repository. Inside it create a file called **work.js**

```bash
mkdir Week03-EcmaScript
cd Week03-EcmaScript
touch work.js
```

## Invoke Immediately

In **work.js** write an ES6 style function that will be invoked immediately. It should contain a single expression with two operators that adds 4 and 6 and multiplies the result by 12. Inside the function, assign the result to a **const** variable called **mathResult**. The function should then use **console.log** to print a caption and **mathResult** to stdout.

The output should look like this:

    $ node work.js
    Mathresult = 120

## Arrays and forEach

Create an ES6 style immediately invoked function that displays the members of the following array:

```JavaScript
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

Study the Arrow Function slides and see how to pass in the array at the same point where you invoke the function. Here is a hint:

```JavaScript
((/* HMMM... WHAT GOES HERE? */) => {
    // YOUR CODE
})(/* PASS IN STUFF HERE */);
```




You don't need to display the square brackets, just each item in the array. I'm expecting to see one item per line in the output:

```bash
0
1
etc...
```

Don't generate the members of the Fibonacci series in the array programmatically, just use the array literal that I give you, and then print out its members.

## Arrays a for..of

Write a ES6 style anonymous function and assign it to a variable called **primeNumbers**. It should use **for..of** to display the members of an array. Call **primeNumbers** with this array:

```JavaScript
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
```

Again, you don't need to include the square brackets or do it all on one line. I'm expecting to see a list of numbers, each on its own line, as above. But if you want to get fancier, that is fine, so long as you don't step completely off the reservation...

## Property Enumeration

Create an ES6 function and assign it to a variable called **address**.  Use **for..in** to enumerate the properties of an object literal with these properties:

- firstName
- lastName
- address
- city
- state
- zip

Initialize the properties to the address of your favorite senator or any other person interests you. You must display the names of the properties in the object. If you want, you can also display the values of the properties.

## ES6 Class

Learn about [JavaScript Classes on Elvenware](/javascript-guide/JavaScriptObjects.html#class-basics).

Create an ES6 class called **calculator** with the following methods, each of which takes two parameters called **operanda** and **operandb**.

- add
- subtract
- multiply
- divide

Create an instance of the **class** and call each of the methods with the following values:

- add(2, 3);
- subtract(5, 2);
- multiply(3, 5);
- divide(15, 3);

Each method should return a number and you should use console.log to print it out:

```javascript
console.log(add(12, 34));
```

**HINT**: _You don't need to include a **constructor** in this class. It is not wrong to include it, but there is nothing that needs to be initialized in a **constructor** in order to complete this assignment._

Please add descriptive text, labels, defining what you are printing out:

```javascript
console.log('Add 12 + 34:', add(12, 34));
```


## Turn it in

If you are using branches, specify the branch:

- Branch: WeekXX

Also specify the folder you are working in and your Git URL

- Folder: WeekXX-XXX
- Git URL: git@github.com:XXX/YYY
- GitHub Website URL: http://github.com/XXX/YYY
