---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptFunctions.md
relativePath: elvenware/development/web/JavaScript/JavaScriptFunctions.md
title: JavaScriptFunctions
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
subject: JavaScript
---

<!-- toc -->
<!-- tocstop -->

# JavaScript Functions {#javaScriptFunctions}

Functions play a central role in the JavaScript language. They are easy to use, but hard to fully understand.

When in doubt, go back to the [index](index.html).

## Functional {#functional}

JavaScript is sometimes described as having features found in a functional language. It is not a pure functional language, but it shares some features of functional languages.

Though "functional programming" is a technical term with certain specific
meanings, for now, we can simply say that JavaScript is a functional
language in the sense that functions are the basic building blocks of well
written JavaScript code. Functions are first class citizens of JavaScript because they can be:

- assigned to variables
- passed to as parameters to function
- returned from functions
- stored in a data structure.

JavaScript functions can have properties and methods. They rely heavily on callbacks and closures, both of which are are made possible by JavaScript's remarkable implementation of functions.

There is no single way to invoke a function. In fact, they can be invoked in four different ways:

- As functions
- As methods
- As constructors
- With the methods **apply** and **call**

Each of these invocation methods has distinct features, particularly in regard to the **this** operator.

Functions play a role in JavaScript similar to that
played by objects in a language like C# or Java. They are the building blocks of the language.

**NOTE**: *If your mind is full with the wonders of a langauge like C\#,
there is good reason for your opinion. But consider this: the move to
add LINQ to C# was in part an attempt to give C# some of the features
that have long been built into JavaScript. Many of these "LINQ like"
features of JavaScript derive from the central and powerful role played
by JavaScript functions. In other words, it is not always that one
language is innately superior to another language, but rather that each
has its own virtues.*

## What are Functions

Functions are unique in that they can be invoked, they can be executed.

Somewhat unexpectedly, functions are like any other value in JavaScript. In particular, functions are **objects**. In particular, functions are instances of the built-in JavaScript **Function** object.

Because functions are objects, you can do many of the same things with them that you can do with a **string,** **number**or **object**. For instance, you can:

-   Store them in a variable
-   Put them in an **array**
-   Pass them to a **function**, or return them from a function.

Because functions are objects, you can do the same things with them that
you can do with any other object. For instance, you can give them properties
and methods. Note that functions also have:

-   a **constructor**, which is a particularly powerful tool.
-   a **prototype** property.

We will discuss **prototypes** in more depth later on in this document. The key
point to grasp at this point is simply that all functions automatically get
a constructor, which points at themselves, and an empty **prototype**.

## Types of Functions {#function-types}

There are several styles of functions. We will discuss them all in depth. Let's start, however, with a quick overview of the field. This is meant more as a reference than as an explanation. The explanations are below or elsewhere on Elvenware.

We will start by looking at functions proper:

```javascript
function fulano() {}  // Simple function

var fulano = function() {}; // Anonymous function assigned to a variable

const fulano = () => {}  // ES6 fat arrow function

function Fulano() {} // Function constructor. Capital letter means call it with new.
```

If a function is part of an **object** or **class** it is called a **method**. Note that JavaScript functions are also objects and can contain methods:

```javascript

/*
 * Simple JavaScript object
 */
var myObject = {
   prop: 1,             // Property inside an object
   fulano: function() { } // Method of an object
};
```

Old Style Function Constructor

```javascript
function Fulano() {
    // private function
    var bar  = function() {};

    // Method on a prototype
    Fulano.prototype.sayName = function() {
      console.log('Fulano.sayName');
    };  
}

// Call Fulano
var fulano = new Fulano();
fulano.sayName();
```

ES6 class with **constructor** and method called **sayName**.

```javascript
class BarFoo extends Bar {
    constructor() {
        console.log('BarFoo constructor called.');
    }

    sayName() {
        console.log('BarFoo');
    }
}

// Call ES6 BarFoo class
const barFoo = new BarFoo();
barFoo.sayName();
```

As [explained later](#function-this), these various ways of invoking a function alter the value of the **this** keyword inside the function.

## Simple Functions

Here is one way to write a JavaScript function:

```javascript
function simple() {
    var name = "Test01";
    console.log(name);
}
```

This declaration has the following parts:

-   The keyword **function**
-   A name, which in this case is **Test01**
-   A parameter list, which in this case is empty. The parameter list
    appears between an open and close paranthesis: ()
-   An implementation, which appears between curly braces: {}. In this
    case we declare a variable, and then use jQuery to show its value in
    a web page.

## Fat Arrow Syntax

Here is the same function declared using ES6 fat arrow syntax:

```javascript
const fatArrow = () => {
  const name = "fat arrow";
  console.log(name);
}
```

In the example above we don't use the keyword **function**. Otherwise everything appears the same. But there are caveats. Fat arrow functions differ from normal functions because they do not provide bindings to the following features:

- this
- arguments
- super
- new.target

This means that you can access the **arguments** array and you can't use them as **constructors**. Since there is no **this** assigned to the function, they use the **this** from the enclosing scope. As a result, **this** can be the **window** or **global** object even in **strict mode**.

Let's beat this poor old horse for a bit longer. Fat arrow syntax is good, but in general, we do not use it to declare a method becase of the way **this** is handled in arrow methods. We never use arrow syntax for a **constructor** in part because there is no support for the **super** keyword in an arrow function. Functions declared with arrow syntax also have no **arguments** keyword passed as a parameter. Furthermore, they do not bind **this** which means you will inherit the **this** context from the nearest lexical scope. In other words, it looks for the nearest valid **this** object outside of the fat arrow function and uses it. As a result, **this** will not usually be bound as expected in an an arrow function that is part of an **object** literal or **class**.

If all this sounds a bit too confusing, think of arrow functions as light weight functions. They do they same thing as functions, but without some of the bells and whistles. In particular, the **this** keyword often does not behave as expected. But then again, in JavaScript, it rarely does behave as one expects! The best place to use arrow functions is an lambdas.

## Anonymous Functions

Here is a second way to declare a function. This time we will store an
anonymous function in a variable called **test01**:

```javascript
var test01 = function() {
   var name = "Test01";
   $("#Test01").html(name);
};
```

There is little practical difference between assigning a function to a
variable as shown here, or the creating functions as shown above. When
assigned to a variable, as shown above, the **name** field of the function
object is not filled out. When you declare a function as shown earlier, then
the name filed is filled out.

Consider the following program:

```javascript
var variable00;
var func01 = function() {};
function func02() {}

console.log("variable00: " + variable00);
console.log("func01.name: " + func01.name);
console.log("type of func01.name: " + typeof func01.name);
console.log("func02.name: " + func02.name);
```

Here is the output:

~~~~
variable00: undefined
func01.name:
type of func01.name: string
func02.name: func02
~~~~

Notice that **func01** is assigned to a variable, and **func02** is a
standard function. Hence we see that **func01** has no **name** while
**func02** has a name.

You can find the source for this example on GitHub:

[JsObjects/JavaScript/Syntax/Function01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/Functions01)

## Arguments and Parameters

A function can be passed parameters and can return a value:

```javascript
function multiply(a, b) {
   return a * b;
}
```

This function differs from the first sample in that it takes two
parameters, called a and b. Here is a somewhat more verbose version of
the same function. This second verison has more descriptive parameters
called **operandA** and **operandB**:

```javascript
function multiply(operandA, operandB) {
		return operandA * operandB;
}
```

Notice that we don't declare the types of the parameters, nor the type
of the return value. There is no type checking on these parameters. If
we omit a parameter when invoking the function then that parameter will
have the value **undefined**. If we pass in too many parameters when
calling a function, then the extra parameters will simply be ignored.

## Value and Reference Parameters

If you pass a parameter to a function by value, then changes you make to the parameter in the function will not be visible outside the function during or after the function call.

If you pass a parameter to a function by reference, then changes you make to the parameter will be visible outside the function after the function call.

In some languages, we explicitly pass values by reference or by value. In JavaScript we can't do that. Instead, all simple types (number, string, bool, null) are passed by value. Complex types are passed by reference. If you pass an array to function, and change the array in the function, then those changes will be visible after the function ends. If you pass a number to a function, you cannot see the changes you may have made to that number inside the function.

Caveats: If a value is global or has a scope that encapsulates the function, then changes to it will be visible outside the function. You can, of course, return values from a function, then assign that returned value to a parameter you passed to it, and thus have the function at least simulate changing a parameter that was passed to it.

```javascript
const smallNumber = 3;
const smallArray = [3];

myFunction(smallNumber, smallArray);
```

**smallNumber** is passed by value, **smallArray** is passed by reference.

## The arguments Parameter

Each function is implicitly passed an object called **arguments**. Suppose
you declare a method that looks like this:

```javascript
function add() {
}
```

Suppose further that you call it like this:

```javascript
add(12, 15);
```

Even though you did not specify any parameters for the function, you can
nevertheless access the arguments that are passed in to it:

```javascript
function add() {
	if (arguments.length === 2) {
		return arguments[0] + arguments[1];
	} else if (arguments.length === 1) {
		return arguments[0] * 2;
	} else {
		throw('You must pass in either one or two parameters.');
	}
}
```

Here is a complete example:

```javascript
function UserException(message) {
   this.message = message;
   this.name = "UserException";
}

function add() {
	if (arguments.length === 2) {
		return arguments[0] + arguments[1];
	} else if (arguments.length === 1) {
		return arguments[0] * 2;
	} else {
		throw new UserException('You must pass in either one or two parameters.');
	}
}


console.log(add(2));
console.log(add(2, 3));
console.log(add());
```

The output looks like this:

```javascript
$ node index.js                                                                   
4
5

/home/bcuser/Git/JsObjects/JavaScript/Functions/FunctionArguments/index.js:14
        throw new UserException('You must pass in either one or two parameters.');
        ^
UserException: You must pass in either one or two parameters.
```

Note that our code elicits a user defined exception if we do not pass in any parameters. In particular, we define a function that is called if an exception is thrown, and we explicitly throw the exception if no parameters are passed to the function.

This code would not work if we used fat arrow functions because there would be no **arguments** parameter. We could, however, do something like this:

```javascript
const adder = (...fatArguments) => {
    console.log('FAT ARGUMENTS', fatArguments);
    if (fatArguments.length === 2) {
        return fatArguments[0] + fatArguments[1];
    } else if (fatArguments.length === 1) {
        return fatArguments[0] * 2;
    } else {
        throw new UserException('You must pass in either one or two parameters.');
    }
};

console.log(add(2));
console.log(add(2, 3));
try {
    console.log(add());
} catch(userException) {
    console.log(userException)
}
```

The source is here:

- [JsObjects FunctionObjects](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Functions/FunctionArguments)

## The <em>this</em> Keyword {#function-this}

The **this** keyword in JavaScript is often called the function context. If you
are used to C# or other object oriented langauges, you may have certain
preconceived ideas about the **this** operator which will prevent you from
understanding the role **this** plays in JavaScript.

The key point to grasp is that the function context changes depending on how you invoke a function.
The change occurs not because of the way you declare a function, but because of the way you invoke it. In particular, there are four
ways to invoke a JavaScript function:

* As a standalone function
* As method of an object
* As a constructor
* Via **call** or **apply()**

If you are working in a web browser, and you invoke a simple standalone function, then the **this**
object will usually be the global **window** object that is part of the browser:

	function runMe() { return this; }
	var functionContext = runMe();


In the code shown above, functionContext will be the **window** object.

Consider this code:

```
	var myObject = {
		runMe: function() {
			return this;
		}
	}

	var functionContext = myObject.runMe();
```

In the code shown above, functionContext will be **myObject**.

And finally, let's look at this example:

```
	function RunMe() {
		console.log(this);
	}

	var functionContext = new RunMe();
```

In this last example, we are creating a constructor by invoking the **new**
operator. In this case, functionContext is **RunMe**.

Here are all three cases pulled together in a single program from JsObjects
calld ObjectThis:

```
	function runMe() { return this; }

	var myObject = {
		runMe: function () {
			return this;
		}
	}

	function RunMe() {
		$('#test03').append(this instanceof RunMe);
	}

	$(document).ready(function() {
		"use strict";
		var functionContext = runMe();
		$('#test01').append(functionContext === window);

		var functionContext2 = myObject.runMe();
		$('#test02').append(functionContext2 === myObject);

		var functionContext3 = new RunMe();
		$('#test04').append(functionContext3 instanceof RunMe);   
	});
```

In **strict** mode, **this** is set to undefined rather than the global object when invoking a standalone method without calling **new**:

```
function hello01() {
	console.log(this);
}

hello01(); // global object

function hello02() {
	"use strict";
	console.log(this);
}

hello02(); // undefined
```

## Functions and Variables

There is no difference from the callers point of view between these two declarations:

	function saveScore() { }
	var saveScore = function() {};

One is a function named **saveScore** and the other is a variable called
**saveScore** that references an anonymous function. You can
call them both like this:

	saveScore();

The differences is that the first one has a property called **name** that is
set to the value **saveScore**, while the second has a property called
**name** that is set to an empty string.

**NOTE**: To see the difference in the name property of the two versions of
saveScore, take a look at the Functions01 example from
**JsObjects/JavaScript/Syntax**. Note also that declaration with an
anonymous function ends with a semicolon and the other does not.

If you are setting up a callback, then you just pass in a variable which is
the name of a function:

	$("#Button01").click(myButtonClickHandler);


In this case, we don't call the function, that is we don't write this:

	$("#Button01").click(myButtonClickHandler());

We just pass in its name, as shown in the first of the two examples shown
above.

All this is a bit confusing to new comers because they are not used to
languages where functions are first class members of the language. A
JavaScript function has all the power of any other object or variable.
That's why the following are the same:

	function saveScore() { }
	var saveScore = function() {};

It just doesn't matter whether you are calling a function or a variable that
points at a function. Both are objects, and both are treated the same.

## Functions and Objects

Each function that you declare in JavaScript is an object. When you look
at the following code, you might therefore be forgiven for supposing
that **name** is a field of Test01, and that a call to print that name
would work. In fact, **name** is a private field of the object, and
therefore cannot be seen by an instance of Test01. The **description**
property, shown below, is a public member of Test01, and it will be
accessible from an instance of the object.

    var Test01 = function()
    {
       var name = "Test01";
    }

    Test01.prototype.description="This is a test object";

    var Test02 = function()
    {
        var test01 = new Test01();
        $("#Description01").html(test01.description);
        $("#Name01").html(test01.name);
    }

When Test02 is called, the code shown above prints out the string "This
is a test object" but it does not print out the words "Test01." That is
because the property **description** is visible to an instance of
**Test01**, but the field **name** is unknown.

To make name a public field of the object, write code that qualifies the
instance of **nameStr**with the keyword **this**:

    var Test01 = function()
    {
        this.nameStr = "Test01";
    }

    Test01.prototype.description="This is a test object";

    var Test02 = function()
    {
        var test01 = new Test01();
        $("#Description01").html(test01.description);
        $("#Name01").html(test01.nameStr);
    }

Now the code shown above behaves as expected, and inserts both
**nameStr** and **description** into the appropriate tags in our HTML.

Like Extensions methods in C\#, you can use Prototype to change the way
existing classes work. In the following example, we will add a method
called Decorate to the built-in JavaScript String class:

    String.prototype.decorate = function() {
     return "-***-" + this + "-***-";
    }

Now when you create a string, you can call its decorate method:

    this.testDecoration = function() {
        var testStr = "All my strings can be decorated";
        $("#testPlain").html(testStr);
        $("#testDecorate").html(testStr.decorate());
    }

[Click here to try decorating a string](BasicSyntax.html#decorate).

## Strict Mode

General changes:

- Changes some silent errors to visible errors
- Helps the compiler optimize code
- Helps you write more secure code
- Prepares the way for future versions of JavaScript. Helps you write code that will be compatible with ES6

A few of the Details:

- All variables must be declared (use var)
  - var a = 2; // correct
  - a = 2; // wrong
- The **with** statement is not allowed
- Octal syntax is forbidden
- Functions outside objects have this set to undefined
- ReadOnly properties are honored
- Objects can be sealed
- Eval works in its own scope, not local or global scope
- Language is safer with strict.

## Scope

Consider this code:

```javascript
function foo() {
    const bar = 2;
}

console.log(bar);
```

It doesn't work because when console.log is called, bar is out of scope. It is inaccessible. It can't be reached.

The concept of scope is one we have only touched on in class. It would be worth discussing in more depth. An analogy might be:

An author writes a book called **Foo** and in it he talks about **bar** in great depth. The book goes out of print. It is now completely unavailable. All copies have been destroyed.

Later, he writes another book called **console.log**. In there, he says: "When I talked about **bar**, I stated its value in clear terms." Only he talked about **bar** in a totally different book which is now unavailable. In the programming world, we would say bar was out of scope.

## Callbacks: Passing Functions as Parameters {#callbacks}

Callbacks are very common in JavaScript. In other languages, they are often considered esoteric, but in JavaScript they happen all the time.

**NOTE**: *Callbacks are the key to understanding asynchronous processing in JavaScript. If we are in a browser and make a call to the server, then we don't know when, or even if, the call will return. As a result, we don't make the call synchronously. That is, we don't wait around for the call to return. Instead, we make the call, and then continue on processing code. When the call returns, we are notified. This is known as an asynchronous call, and in JavaScript we handle these calls with callbacks. Since we make lots of calls to the server in a typical JavaScript program, our ability to understand callbacks becomes key to our ability to understand even basic Web programming.*

JavaScript considers functions to be first class citizens of the language. This means that you can easily assign them to variables, and pass them around to other functions. Other languages usually provide support for function pointers of function objects, but the syntax is often awkward or challenging to use. In JavaScript, you can simply treat a function like any other type, such as a **Number**, **String** or **Boolean**.

**NOTE**: *Because functions in JavaScript are so flexible, many consider JavaScript to be a [functional][functional] programming language. Functional programming is enormously powerful, and also quite different from the type of [imperative][imperative] programming done in Java and C#. Ultimately, the flexibility of JavaScript functions will enable you to write your code in a **functional** style that is quite different from what you write when using more traditional languages. This is not the place to explore this topic in depth, but you should at least be aware of the power of functions in JavaScript, and the way that they shape our approach to the language. Functional programming is a type of [declarative programming][declarative].*

Here is an example of how to use callbacks in JavaScript:

```javascript
/**
 * @author Charlie
 */

 function hello(func) {
     const test02 = document.getElementById('test02');
     test02.textContent = "It works!";
     func();
 }

 window.onload = () => {
   "use strict";

   const test01 = document.getElementById('test01');
   test01.textContent = "Document Read called";

   hello(function() {
       const test03 = document.getElementById('test03');
       test03.textContent = "It's a nine!";
   });

 };
 ```

The complete example is here:

- [JsObjects Objects ObjectFunctionBasics02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Objects/ObjectFunctionBasics02)

In this example, we pass an anonymous function to the method **hello**. As you can see, **hello** takes a single parameter called func:

    function hello(func) {

When we call **hello** we pass in an anonymous function, a bit like this:

```javascript
    var helloParameter = function() {
        const test03 = document.getElementById('test03');
        test03.textContent = "It's a nine!";          
    }

    hello(helloParameter);
```

But in JavaScript we get a special dispensation, as it were, and don't even have to declare the variable that points at our function. Instead, we can just pass it in directly as an anonymous function:

```javascript
    hello(function() {
        const test03 = document.getElementById('test03');
        test03.textContent = "It's a nine!";        
    });
```

We call the function **anonymous** because it has no name:

```javascript
function() {
    const test03 = document.getElementById('test03');
    test03.textContent = "It's a nine!";        
}
```

Compare the above to a standard function with a name:

```javascript
function writeNine() {
    const test03 = document.getElementById('test03');
    test03.textContent = "It's a nine!";        
}
```

If callbacks and anonymous functions are unclear, think about them some more. If these subjects are still unclear, get up, take a 1 minute walk, then come back and think about it all again. Download the example and step through it. Come to terms with this syntax. You will never really understand JavaScript until you understand code of this type.

**Aside**: *Do JavaScript programmers dream callbacks? Of course!*

Here is another example designed to drive home the points outlined above:

```
/**
 * @author Charlie
 */

var Converter = (function() {

    // Private variable
    var x = 0;

    // Constructor
    function Converter(initX) {
        x = initX;
    }

    // Private method
    function square(value) {
        return value * value;        
    }

    // Public methods
    Converter.prototype.convert = function(func) {
        var result = square(x);
        return func(result);      
    };

    return Converter;
})();

$(document).ready(function() {"use strict";

    var converter = new Converter(2);

    var feet = converter.convert(function(miles) {
        return miles * 5280;
    });

    var yards = converter.convert(function(miles) {
        return miles * (5280 / 3);
    });

    $("#feet").html(feet);
    $("#yards").html(yards);
});
```


The source is here:

- [JsObjects ObjectDemoCallback](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Objects/ObjectDemoCallback03)

[functional]: http://en.wikipedia.org/wiki/Functional_programming
[declarative]: http://en.wikipedia.org/wiki/Declarative_programming
[imperative]: http://en.wikipedia.org/wiki/Imperative_programming

## Calling a JavaScript Function from a Declaration {#callFunction}

The following code demonstrates the differences between assigning a method to a variable and assigning the result of a function call to a variable. Notice the extra parentheses at the end of the getNine02. This
causes the function to be called at the time of the assignment. This means that getNine02 ends up a being a **number**, while getNine01 ends up being **function object**.

In the **getNine02** example, the open parenthesis before the word function is syntactical sugar. It does not have any other function other than to tell us that this function is going to be called immediately with the closing set of parentheses. If one is reading a long function, we want to be told up front that it is going to be called immediately. There is no good way to do that, so a convention has been developed of adding parentheses before the word function to serve as a hint that the function will be called immediately.

```javascript
    /**
     * @author Charlie
     */

    // getNine is assigned a function that returns the number 9
    var getNine01 = function() {
        return 9;
    }

    /*
     * getNine02 is set to the number 9. Notice the
     * the parentheses at the end of the statement.
     * They force the function to be called during the
     * assignment
     */
    var getNine02 = (function() {
        return 9;    
    })();

    $(document).ready(function() {
      "use strict";

      // We call getNine01() because it is a function
      var result01 = getNine01();
      $("#test01").html(result01);

      // Get Nine02 is not a function, but a simple number
      // Hence it is not called. Notice there are no parentheses
      var result02 = getNine02;
      $("#test02").html(result02);
    });
```

## Comparing JavaScript objects and JavaScript functions {#compareObjFunc}

Previously in this document, in the section on objects, we declared a
simple object that looks like this:

``` {.code}
var myObject = {                
    myProperty01: 12,
    myProperty02: 4,
    myFunction01: function() {
        return this.myProperty01 + this.myProperty02;                
    }                
);
```

We call it like this:

    myObject.myFunction01()

This is very nice, but it does not give us the option to create private
methods.

Here is what the same object would look like if declared as a function:

``` {.code}
function myFunction02() {   
    'use strict';

    var myField01 = 3;
    var myField02 = 2;
    var nestedFunction = function() {
        return myField01 + myField02;  
    };

    return nestedFunction();
}
```

We call it like this:

    myFunction02()

Let's call this the Simple Function pattern. This is very nice, but it
does not gives us the option to create public methods. As you can see,
if I want to call **nestedFunction**, I need to call it from inside of
**myFunction02**. This is less than optimal in some cases.

Here is a third technique that uses the **prototype** function syntax,
and gives us public methods, but no useful private methods:

``` {.code}
var MyFunction03 = function() {
    'use strict';       
};

MyFunction03.prototype.field01 = 2;
MyFunction03.prototype.field02 = 4;
MyFunction03.prototype.nestedFunction = function() {
    'use strict';    
    return this.field01 + this.field02;    
};
```

We call it like this:

    var myFunction03 = new MyFunction03();
    myFunction03.nestedFunction();

This is very nice, but it does not give us private methods. Note also,
that it forces us to call **new** when we create the object. If we don't
call new, then nestedFunction will not be visible when we try to use the
object. In other words, our public method won't be truly public.

And here finally, is a fourth way of writing the same object. We call
this the module pattern. It provides both public methods and private
methdos, private fields, and it gives us a constructor for initializing
the fields. It's syntax is more verbose, but it gives us everything we
need. Also, the syntax, though a bit verbose, is similar to the class
declarations in other curley brace languages such as C\#.

``` {.code}
var MyFunction04 = (function() {
    'use strict';

    var field01 = 0,
    field02 = 0;

    function MyFunction04(initField01, initField02) {
        field01 = initField01;
        field02 = initField02;
    }

    MyFunction04.prototype.nestedFunction = function() {
        return field01 + field02;
    };    

    return MyFunction04;
}());
```

We call it like this:

``` {.code}
var myFunction04 = new MyFunction04(1, 2);
myFunction04.nestedFunction();
```

This is the best solution.

Now go back and look at the original object pattern. Compare it to the
one we have created. Notice that they are two different ways of saying
the same thing, only the module pattern is more flexible, and more
powerful.

Get the Source:

- [JavaScriptObjectPatterns.zip][jsop]

## Properties and Inheritance

Inheritance is done most often through the **prototype** property. Declare a base object:

```javascript
var BaseObject = (function() {
	'use strict';

	function BaseObject() {
	}

	BaseObject.prototype.firstName = "Qux";

	return BaseObject;
}());
```

Now define the child object:

```javascript
var ChildObject = (function() {
	'use strict';

	function ChildObject() {
	}

	ChildObject.prototype = new BaseObject();

	ChildObject.prototype.lastName = "Garply";

	return ChildObject;
}());
```

The key line is this:

    ChildObject.prototype = new BaseObject();

This means that the child will inherit all the properties that are part of the parents prototype. BaseObject, in its turn, automatically inherits all the properties from the built in Object. That means that ChildObject inherits them also.

Now test the code:

```javascript
var childObject = new ChildObject();
console.log(childObject.firstName);
console.log(childObject.lastName);
```

As you can see, the child inherits the **fistName** property from the parent.
The working example is [here][simpleObject].

[simpleObject]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Objects/Inheritance01/SimpleInheritance00.js

Notice that these objects use **PascalCase**, that is, the initial letter in their name is a Capital. Like this: **ChildObject**. Not **camelCase** like this: **childObject**.

When we use Pascal case for the first letter of an object, we are saying that must be called with new:

    var childObject = new ChildObject();

If we want to use the protype property, then we must instantiate the object with **new**. In other words, prototypal inheritance in JavaScript only works with constructor objects. That is, it only works with objects instantiated with **new**.


## This and That

One of the real weak points in JavaScript is the **this** keyword. It is designed to allow an object to have access to its own properties and methods. That is common enough. The catch, however, is that the keyword **this** does not always behave as expected. In particular, in callbacks and the special case of callbacks called event handlers, the **this** keyword typically points at the object that made the call, or at the global **window** object. To get around this problem, and to allow an object to have access to itself when in a callback, we do this can use [the module pattern][elfmp]:

```javascript
var MyObject = (function() {
    var that = null;

    function MyObject() {
        console.log('THIS', this);
        this.foo = 'foo';
        that = this;
    }

    MyObject.prototype.myCallback = function() {
        that.foo = 'baz';
    };

    MyObject.prototype.useCallback = function(myCallback) {
        console.log(this.foo);
        myCallback();
        console.log(this.foo);
    };

    return MyObject;
})();

const myObject = new MyObject();
myObject.useCallback(myObject.myCallback);
```

This outputs the following:

    THIS MyObject {}
    foo
    baz

This is hard to grasp at first mostly because it does not seem possible that JavaScript should have such a serious flaw in the language. If **MyCallBack** is part of **MyObject** then inside of **MyCallback** the keyword **this** ought to point to **MyObject**. But such is not necessarily the case, and as a result, we declare the **that** variable.

The class syntax:

```javascript
let that = null;

class MyObject {

    constructor() {
        this.foo = 'foo';
        that = this;
    }

    myCallback() {
        that.foo = 'baz';
    }

    useCallback(myCallback) {
        myCallback();
    }
}

const myObject = new MyObject();
myObject.useCallback(myObject.myCallback);
```

With instrumentation:

```javascript
let that = null;

class MyObject {

    constructor() {
        console.log('THIS', this);
        this.foo = 'foo';
        console.log('THIS', this);

        that = this;
        console.log('THAT', that)
    }

    myCallback() {
        console.log('CALLBACK THIS', this);
        console.log('CALLBACK THAT', that);
        that.foo = 'baz';
    }

    useCallback(myCallback) {
        console.log('THIS USE CALL BACK', this);
        console.log(this.foo);
        myCallback();
        console.log(this.foo);
    }
}

const myObject = new MyObject();
myObject.useCallback(myObject.myCallback);
```

In general, the recommendation is not to use the new **class** syntax or to avoid using the keyword **this** outside of the constructor. Every place else, it is a danger to itself and others. We spend a lot of time learning how to write code that has no use for either **this** or **that**. But sometimes, we have no choice, and use **that**.

Here is another way to look at the same problem. Private methods and some callbacks cannot always properly access the **this** property that belongs to the object of which they are members. As a result, we must develop a work around. To solve the problem we typically declare **this** as **that**.

```javascript
function MyFunc() {

    var that = this;
    this.data = 3;

    function privateFunc() {
        console.log(that.data);
    }

    function myEvenHandler(event) {
        console.log(that.data);
    }
}
```

Please understand that this is just a convention. But it is a common convention. An experienced
JavaScript developer who sees **that** in your code expects it to be pointing to the **this**
property for the enclosing object.

<!--       -->
<!-- Links -->
<!--       -->

[jsop]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/downloads/JavaScriptObjectPatterns.zip
[elfmp]: /javascript-guide/JavaScriptModules.html
