## Overview

Learn how to work with ES6 JavaScript arrow functions, introduce JavaScript classes. Learn about using Babel to transpile ES5 code into ES6. In this assignment, always use ES6 style code when declaring functions.

## Get Started

If your class is using Git branches, do your work in a branch called **Week03**.

Create a folder called **Week03-EcmaScript** in the root of your repository. Inside it create a file called **work.js**

```bash
mkdir Week03-EcmaScript
cd Week03-EcmaScript
touch work.js
```

## Invoke Immediately

In **work.js** write an ES6 style function that will be invoked immediately. It should contain a single expression with two operators that adds 4 and 6 and multiplies the result by 12. Assign the expression to a **const** variable called **mathResult**. The function should then use **console.log** to print out **matchResult** to stdio.

## Arrays and forEach

Create an ES6 style immediately invoked function that displays the members of the following array:

```JavaScript
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

You don't need to display the square brackets, just each item in the array. I'm expecting to see one item per line in the output:

```bash
0
1
etc...
```

You don't need to generate the members of the Fibannaci serious in the array programmatically, you can just use the array literal that I give you, and then print out its members.

## Arrays a for..of

Write a ES6 style anonymous function and assign it to a variable called **primeNumbers**. It should use **for..of** to display the members of an array. Call **primeNumbers** with this array:

```JavaScript
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
```

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

**HINT**: _You don't need to include a **constructor** in this class. It is not wrong to include it, but there is nothing that needs to be initialized in a **constructor** in order to complete this assignment._

## Turn it in

If you are using branches, specify the branch:

- Branch: WeekXX

Also specify the folder you are working in and your Git URL

- Folder: WeekXX-XXX
- Git URL: git@github.com:XXX/YYY
- GitHub Website URL: http://github.com/XXX/YYY
