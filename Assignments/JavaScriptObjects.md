# JavaScriptObjects

Learn about JavaScript objects.

* [The Slide Deck](http://bit.ly/OPDg3s)

This is an object:

```javascript
var foo = { "name": "Suzie" };
```

This is a function object:

```javascript
function bar() {
	var a: 1;

    function foo() {}
};
```

In this exercise, we are working with objects, not function objects.

## Part One

Create a **nodejs** program called **Week04-JavaScriptObjects** that contains a file called **work.js**. In that file create a JavaScript object called **person** with two properties:

* firstName
* lastName

Set them to your first and last names. Write the two properties to the console.

```
node Week04-JavaScriptObjects
George
Washington
```

Take a screenshot and call it **FirstLast.png**

## Part Two

Add a full name method to the **person** object and call it.

```
node Week04-JavaScriptObjects
George
Washington
George Washington
```

Take a screen shot and call it **FullName.png**.

## Part Three

In the same file, create a new JavaScript object called **calculator**. Give it to operators called:

* operator01
* operator02

Inside your program, but outside the object declaration, set the properties to the number of letters in your first and last name:

```javascript
calculator.operator01 = person.firstName.length;
etc...
```

Add three methods with zero parameters that operate on **operator01** and **operator02**:

* add
* subtract
* multiply

Print the output. For instance, since my name is Charlie Calvert

```
14
0
49
```

## Turn it in

You know the drill. Save your work to your repository. Submit the url of your project and/or the directory in which you did your work.