## Overview

In this assignment we will learn about JavaScript objects.

These slide decks have useful information in them:

* [http://bit.ly/elven-javascript-basics](http://bit.ly/elven-javascript-basics)
* [http://bit.ly/function-types](http://bit.ly/function-types)
* JavaScript Intro: [http://bit.ly/javascript-intro](http://bit.ly/javascript-intro)
* JavaScript Node: [http://bit.ly/JavaScriptNode](http://bit.ly/JavaScriptNode)

Also see this section of Elvenware for details on Object Literals:

- [Object Literals][elf-obj-literal]

[elf-obj-literal]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#object-literal

In this exercise, we are working with object literals, not function objects.

## Part One

Create a **nodejs** folder called **Week02-JavaScriptObjects**. Inside get started by creating a single file called **work.js**. In that file build a JavaScript object called **person** with two properties:

* firstName
* lastName

Set them to _your_ first and last names. Write the two properties to the console with **console.log()**.

**NOTE**: _You do not have to run this code as an Express program in a browser. But if you want to do things that way, I will not take off for it. But really, it is simpler for me if this program just stays in a single file called **work.js** that runs from the command line, plus any grunt related files._

Now run it:

```
cd Week02-JavaScriptObjects
node work.js
```

The output should look something like this:

```
George
Washington
```

## Part Two

Add a **fullName** method to the **person** object. The method should concatenate the first and last names, and return the result. Call the method and print out the return value with **console.log**.

```
node work.js
George
Washington
George Washington
```

## Part Three

In the same file, using JavaScript object literal syntax, create a new object called **calculator**.

Inside the object literal, create two properties called:

* operator01
* operator02

Initialize these properties to -1, much as we initialized the name property of **person** to **'Suzie'** or some similar name in the first of the two examples in [Part Zero](#Part Zero). Of course, this property is of type **number**, not of type **string**.  

**HINT**: _See [this slide][obj-slide] for help understanding what I want._

Inside your program, but outside the object literal declaration, set the properties to the number of letters in your first and last name using dot notation:

```javascript
calculator.operator01 = person.firstName.length;
etc...
```

Use **console.log** to display the values of **operator01** and **operator02**.

Add three methods with zero parameters that operate on **operator01** and **operator02**:

* add
* subtract
* multiply

Put **add** and **subtract** inside the object literal and implement **multiply** [outside][obj-outside] the object literal declaration using dot notation:

```javascript
var calculator = {
	// CODE OMITTED HERE
	// PUT ADD AND SUBTRACT IN HERE
};

calculator.multiply = etc.... // IMPLEMENT MULTIPLY HERE
```

Print the output. For instance, since my name is Charlie Calvert

```
14
0
49
```

[obj-outside]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#outside
[obj-slide]: https://docs.google.com/presentation/d/1uT8eqrBayG6ZgdBsGIWbxOr9Lf7nWnTZSHi1mlKfZks/edit#slide=id.g29c371fd0_022

## Gussie it up

I added this method:

```javascript
function divider(title) {
	console.log("====================================");
	console.log(title);
	console.log("====================================");
}
```

And made some calls like this:

```javascript
divider('Calculator');
console.log('operator01 =', calculator.operator01);
```

And produced output like this:

<pre>
$ node work.js
====================================
Person
====================================
George
Washington
George Washington
====================================
Calculator
====================================
operator01 = 6
operator02 = 10
Add:  16
Subtract: -4
Multiply: 60
</pre>

Unless you name is George Washington, your output will probably differ, but this should give you some general idea of what to produce.


## Grunt Check

As always, use Grunt to make sure your code is properly formated. If you have not yet completed the GruntCheck assignment, do so before you turn this assignment in. The point is that you will need to understand the Grunt Check assignment before you can complete this assignment.

**NOTE**: _[Previously][gc-proj], in [Grunt Check][gc-proj], I said "in this and all future projects" be sure you code passes grunt check. I will take off points if your code is clearly improperly formated. Grunt check was created to help you do the right thing. It is easier, I think, if we run it than if we don't. To make it work, of course, you need **.jscsrc** and **Gruntfile.js** plus a **package.json** file. But these are boiler plate at this time._

[gc-proj]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntCheck.html#clean-code


## Turn it in

You know the drill. Save your work to your repository. Submit the url of your project and/or the directory in which you did your work.

Take a screenshot of the output of your program and attach it to the assignment when you turn it in.

In summary: The **firstName** and **lastName** properties of the **person** object should be declared with object literal syntax. I want the **fullName**, **add** and **subject** methods to be part of object literals, and I want the **multiply** method to be part of the **calculator** object but declared outside the original object literal declaration for the **calculator** object.

## Hint

You can put a hash bang at the top of a file like **work.js**:

```javascript
#!/usr/bin/env node

var person = {
	etc...
```

Then mark it as executable:

```bash
chmod +x work.js
```

Now you can start it like this:

```bash
./work.js
```
