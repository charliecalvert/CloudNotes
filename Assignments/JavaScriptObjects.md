# JavaScriptObjects

Learn about JavaScript objects. There are lots of tips in this slide deck:

* [http://bit.ly/elven-javascript-basics](http://bit.ly/elven-javascript-basics)

## Part Zero

The simplest possible JavaScript object declared using object literal syntax:

```javascript
var myObject = {};
```

This is a slightly more complex object, again declared using object literal syntax:

```javascript
var person = { 'name': 'Suzie' };
```

Here is a second way to declare the same object:

```javascript
var person = {};
person.name = 'Suzie';
```

As far as we are concerned at this point, there is no significant difference between these two ways of declaring an object.

This is a function object:

```javascript
function bar() {
	var a: 1;
	function foo() {}
};
```

In this exercise, we are working with object literals, not function objects.

## Part One

Create a **nodejs** folder called **Week03-JavaScriptObjects**. Inside get started by creating a single file called **work.js**. In that file build a JavaScript object called **person** with two properties:

* firstName
* lastName

Set them to _your_ first and last names. Write the two properties to the console.

**NOTE**: _You do not have to run this code as an Express program. But if you want to do things that way, I will not take off for it. But really, it is simpler for me if this program just stays in a single file called **work.js**, plus any grunt related files._

Now run it:

```
cd Week03-JavaScriptObjects
node work.js
```

Output should look like this:

```
George
Washington
```

Take a screenshot and call it **FirstLast.png**

## Part Two

Add a **fullName** method to the **person** object and call it.

```
node work.js
George
Washington
George Washington
```

Take a screen shot and call it **FullName.png**.

## Part Three

In the same file, create a new JavaScript object called **calculator**. Using JavaScript object literal syntax, create a new object called **calculator**

Inside the object literal, give it two operators called:

* operator01
* operator02

Initialize these properties to -1, much as we initialized the name property of **person** to **'Suzie'** in the first of the two examples in [Part Zero](#Part Zero). Of course, this property is of type **number**, not of type **string**.  

Inside your program, but outside the object declaration, set the properties to the number of letters in your first and last name:

```javascript
calculator.operator01 = person.firstName.length;
etc...
```

Use **console.log** to display the values of **operator01** and **operator02**.

Add three methods with zero parameters that operate on **operator01** and **operator02**:

* add
* subtract
* multiply

Put **add** and **subtract** inside the object and implement **multiply** outside the object:

```javascript
var calculator = {
	// CODE OMITTED HERE
	// PUT ADD AND SUBJECT IN HERE
};

var multiply etc.... // IMPLEMENT MULTIPLY HERE
```

Print the output. For instance, since my name is Charlie Calvert

```
14
0
49
```

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

## Turn it in

You know the drill. Save your work to your repository. Submit the url of your project and/or the directory in which you did your work.

As always, use Grunt to make sure your code is properly formated.

**NOTE**: _[Previously][gc-proj], in [Grunt Check][gc-proj], I said "in this and all future projects" be sure you code passes grunt check. I'll let that go this time, but remember, this is implicit in all our assignments unless I say otherwise. I will, however, take off points if your code is clearly improperly formated. Grunt check was created to help you do the right thing. It is easier, I think, if we run it than if we don't. To make it work, of course, you need **.jscsrc** and **Gruntfile.js** plus a **package.json** file. But these are boiler plate at this time._

[gc-proj]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntCheck.html#clean-code

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
