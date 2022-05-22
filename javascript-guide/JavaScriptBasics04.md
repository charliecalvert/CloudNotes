---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/JavaScriptBasics.md
relativePath: javascript-guide/JavaScriptBasics.md
title: JavaScriptBasics
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: JavaScriptBasics.md
fileNameHTML: JavaScriptBasics.html
subject: JavaScript
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

# JavaScript Basics

We'll begin by exploring the JavaScript type system.

Newcomers may find it hard to understand why they need to know about the type system. Isn't there something more interesting or exciting that we can talk about first?

No JavaScript programmer can thrive without knowing the language's type system. We'll therefore begin by plunging directly into the subject, taking care to proceed with caution.

**NOTE**: *This document is based on the current version of JavaScript. This includes, frequent references to the the ECMAScript 6 standard*.

## Library and Language Choices

We are in the midst of an explosively rich development environment. There are many great tools for JavaScript developers, and there are many great languages available for developers. I work hard to pick good tools and languages to teach in my courses, but I do not claim always to pick the irrefutably best tools and languages. That is because I don't believe these terms make sense any longer. For instance, React, VUE and Angular are all good frameworks. My claim is not that React is the certain best framework. I try only to pick a very good one.

I would be suspicious of anyone who says things like: "Oh React/Angular/Vue/XXX sucks. The only real choice is YYY!" The development ecosystem is too rich for that kind of thinking. Pick a good tool and learn it thoroughly.

Sometimes I'm picking tools because they work well together. For instance, NodeJs, our native browser code, React and React Native all use JavaScript. React and React Native are very similar. The goal is to eliminate the confusion that would result if we used JavaScript on the front end, Python on the back end, React Native for native apps, and Angular for web applications. That would be too much.

Let me just sum up by saying that I think all the tools we are using are very, very good. React and React Native are great. NodeJs is a powerhouse! ES6 is a great evolutionary step for JavaScript. I think Linux is a fantastic host for the kind of development we do. But I try to temper my enthusiasm for these tools by conceding that there are other great options out there

## Is Node Ready for Prime Time

- [How far can node go?](https://www.quora.com/How-far-can-Node-js-go)
- [Who Uses Node](https://www.netguru.co/blog/top-companies-used-nodejs-production)

## The Type System

A good understanding of JavaScript types is needed by anyone who wants to master the language. Type systems describe, in part, a language's storage and memory management. When we declare a variable, how does the system store it in the computer's memory?

For our purposes, we need only understand the core containers used by JavaScript. These containers are called types. For instance the **number** type is used to store numbers. The **boolean** type is used to store the values **true** and **false**.

JavaScript is dynamically typed. If you come from a strongly typed language such as C# or Java, the JavaScript type system may seem simplistic or even poorly constructed. Don't be too quick to form a judgment. Though it has some significant flaws, the JavaScript type system is both powerful and sophisticated.

There are two halves to the JavaScript type system:

- Primitive Types
- Objects

We will begin by exploring primitive types. In this chapter there will also be some superficial discussion of Objects. In depth discussion of Objects appear in other chapters. In particular:

- [JavaScript Objects][jObject]
- [JavaScript Functions][jFunction]

## JavaScript Primitive Types

There are six simple (primitive) types in the JavaScript language:

- Number
- Boolean
- String
- Null
- Undefined
- Symbol (ECMAScript 6)

**Number**, **Boolean** and **String** are the work horses of the language. You will use these simple types over and over again.

To create a **Number** simply write the word **var** followed by an equal sign and either an integer or a floating point number and a semicolon:

```javascript
var x = 3;
var y = 2.3;
```

You can use the **typeof** operator to determine the type of a variable.
Given the following declaration:

```javascript
var myInt = 3;
```

Then the following would return the string **number:**

```javascript
typeof myInt; // Returns number
```

The act of assigning **myInt** to the value 3 sets the type of
**myInt**. There is no way to explicitly declare the type of the
variable, but we can use the **typeof** operator to confirm that
assigning 3 to **myInt** did in fact set the type of the variable to
**number**.

There is no equivalent of the C\# **Integer**, **Float** or **Double**
types. In JavaScript, we just have the **number** type, regardless of
whether the variable is assigned to a simple integer, or a more complex
value such as a floating point number:

```javascript
var myInt = 5;
var myDouble = 3.05;
```

Both **myInt** and **myDouble** are instances of the JavaScript
**number** type.

The following are considered bad form because the contain what are
called "hanging decimal points":

```javascript
var myDouble = 3.;
var myDouble = .3;
```

Instead, write something like this:

```javascript
var myDouble = 3.0;
var myDouble = 0.3;
```

To create a **String**, repeat the above operation but assign the variable to a string:

```javascript
var myString = "Some String";
```

Here is an example of how to find the type of a string:

```javascript
var myString = "A String";
var type = typeof myString; // Sets type equal to the word string
```

You can use either single or double quotes:

```javascript
var myString = 'A string';
var myString = "A string";
```

Both are legal. This makes it easy to embed quotes in a string:

```javascript
var myQuote = "He said: 'By golly, I think it's alive!'";
```

Or, if you prefer:

```javascript
var myQuote = 'He said: "By golly, I think it&#92;'s alive!"';
```

If you want some direction here, I suggest using double quotes for strings, as it makes embedding apostrophe's easier. For instance, in the second example I was forced to use a backslash to escape the apostrophe in the word **it's**. This is, in my opinion, somewhat awkward.

There is no functional difference between single and double quotes. This is definitely one of the nice features of the JavaScript language.

Though not widely available at this time, we will be able to use backticks to declare multiline strings in EcmaScript 6:

```javascript
var myString = `Use backticks for
multi-line strings
in ecmascript 6.`;
```

For now, this is a reasonable way to handle multiline strings;

```javascript
var myString = 'Use the plus symbol for ' +
    'multi-line strings ' +
    'in most cases.'
```

Here is a basic example from a program called PrimitiveTypes.js:

```javascript
var aNumber = 3;
var aString = 'string';
var aBoolean = true;
var aNull = null;
var aUndefined = undefined;
var foo;

console.log(typeof aNumber);
console.log(typeof aString);
console.log(typeof aBoolean);
console.log(typeof aNull);
console.log(typeof aUndefined);
console.log(typeof foo);
```

If you have installed **nodejs** and type \*\*node PrimitiveTypes.js"
the output of this program is as follows:

```shell
number
string
boolean
object
undefined
undefined
```

## Null and Undefined

There are however two other primitive types, called **null** and **undefined.** They are designed
to help you know the state of an object.

Note that the type of **aNull** is object. As mentioned above, the
purpose of the **null** type is to help you know the state of an object.
It therefore makes (at least some) sense that the type itself should be
an object.

Note that the type of the unassigned variable **foo** is **undefined**.
Do you see how that works? We don't assign **foo** to anything: **var
foo;**. When we ask to see its type, the system tells us that **foo** is
**undefined**. You will see that a lot, especially when you are starting
out with JavaScript. The lessson here is simple: when you see that a
variable is **undefined**, that usually means that you haven't assigned
any value to it

It is probably best to only use undefined in your program when you want
to test if a variable has a value assigned to it. Trying to use it in
any other way can be problematic.

The most common use of **null** is to initialize a variable that you
want to assign to an object at some point in the future:

```javascript
var myObject = null;
```

You might sometimes also want to pass null into a function or return
null from a function:

```javascript
var myFunc = function(value) {
    if (value !== null) {
        // handle value here
    }
}

var myFunc = function(value) {
    if (value < 3) {
        return null;
    } else {
        // Write code here
    }
}
```

To test for undefined we write this:

```javascript
if (typeof value == 'undefined') {
    // handle undefined value here
}
```

And finally, to end on a humorous note, we can run one of my favorite
tests in the JavaScript language:

```javascript
console.log(undefined == null)
```

Because it intuitively obvious that the above will return **false**, it
should come as no surprise to learn that it returns **true**. The most
galling aspect of this absurdity is that there is a logical explanation
for it: **undefined** is derived from the type **null**. Or is it the
other way around? When things are this chaotic, can it possible matter?
Just for the record, it is not the other way around, but when the
JavaScript language decides to degenrate into incoherence, they have a
special way of doing it that reminds me that given the right
circumstance, anyone with a room temperature IQ or above could create
one of the most popular and important computer languages in the world.
The moral, of course, is that you should never give up: you simply don't
know what fate might have in store for you!

On a more serious note, there is an important lesson here: JavaScript
has serious design flaws. The langauge can be used to write good code,
but you must step in and actively craft a coherent architecture for your
program. If you just "go with the flow" of the JavaScript language, the
result will be disaster. You have to impose order on the chaos that is
JavaScript. This is a difficult task, but it can be done.

### Null vs Undefined

The difference between **null** and **undefined** is a subtlety of the
JavaScript language that we probably could have done without. Perhaps
there will be a day when I see why it is useful, but right now, I would
say that language would have been better without **undefined**. The
single keyword **null** would have been enough for my purposes.

### Immutable

You may have read that JavaScript primitive types are immutable. If you are a beginner, and have read about immutable JavaScript types, my suggestion is that you simply forgot that you read it. You should also skip the rest of this section. I say this because the subject is arcane in the extreme. It is not necessary for beginners to understand what it means to say that a primitive type is immutable.

Consider the following example:

```javascript
var myString = "My String";
myString = "A new string";
```

The code shown above is entirely valid. It behaves exactly as you would expect it to behave.

You cannot, however, write the following code:

```javascript
var myString = "Fury";
myString[0] = "B";
```

That code does not behave as expected because JavaScript strings are immutable. The variable **myString** is not immutable, however, the value assigned to it is immutable.

### No Properties for Primitive Types

If you access a "property" of a primitive type you are actually setting off a complex chain of events. Again, this is a subject that beginners need not understand. In fact, even intermediate JavaScript developers are probably better off not knowing about this subject. It can cause a developer to fret about performance when such concerns are simply not warranted.

Consider the following code:

```javascript
var myString = "My String";
var length = myString.length;
```

The above code looks simple enough, but behind the scenes a bit of sleight of hand takes place. The variable **myString** is converted from a primitive type into an object and then back into a primitive type. The following is pseudo code showing something of what happens behind the scene:

```javascript
myString = new String(myString);  // Create a String object from the primitive type.
var length = myString.length;     // Access a property of the String object.
var myString = myString.value();  // Magically convert back to a primitive type.
```

It is always upsetting for developers to know that this thing kind of thing is taking place. My strong suggestion, however, is that you just ignore it. Other languages, such as C#, do similar things, and 99.99 percent of the time it works out just fine. Only in very rare circumstances does it end up actually be the source of significant performance proplems in your code.

I realize how snobby this sounds, but I will say it anyway: It is usually amateur programmers who worry about this kind of thing. I'm referring to programnmners who think they are lot smarter than they really are. Unless you have reached the stage in your career where you are no longer flattered or irritated by the constant and overwhelming sound of people telling you how brilliant you are, then you probably aren't ready to worry about problems like this.

## Writing Code

We have said enough about the type system for now. Let's move on to a discussion of how to write and structure your code. For now we will focus on the basics. In later chapters you can dig into the details.

## Style Guide

Google's style guide is probably the gold standard at this time, though others are also worth looking at. The most important thing is to be sure that a team has a consistent style.

- [Google Style Guide][styleGuide-html]
- [Google Style Guide XML][styleGuide-xml]

Blank lines between functions. Use white space to make code more readable.

- [WhiteSpace Crockford][wsCrockford]
- [WhiteSpace MediaWiki][whiteSpace]

For more on this subject, see the Elvenware sections on EsLint.

## Expressions and Statements

There are two fundamental, low level, building blocks for programs:

 statements
 expressions

***An expression returns a value***. It can be evaluated. Consider this statement:

```javascript
 int x = 3 + 2;
```

It contains an expression that looks like this: 3 +  2.  We know that 3 + 2 returns 5, so it is an expression, it returns a value:

```javascript
 3 + 2
```

Consider this assignment statement:

```javascript
 int x = 3;
```

Here 3 is an expression that returns a value; it yields the value 3.

A function call is usually an expression:

```javascript
 var x = foo();
```

Even if **foo()** returned **void**, it still can be thought of as an expression:

```javascript
 foo();
```

Despite the call above, expressions don't usually stand on their own, though they can in many cases. They usually make up part of a statement. Statements do stand on their own. They are the smallest complete portion of a program. For instance:

```javascript
 int x = 3;
```

This is a statement because it is complete. It performs a single action in a discreet, stand alone line of code. It stands on its own and it does something. It performs an action. It assigns the value 3 to the variable x. Expressions such as **3** or **2 + 3** make no or little sense on their own:

```javascript
 3
 2 + 3
```

They don't really do anything but produce a compiler error. We typically assign expressions to variables to make statements:

```javascript
 var x = 2 + 3;
 int x = 2 + 3;
```

Statements end in semicolons in most curly brace languages.

The statements I'm showing here are all assignment statements. These are a classic kind of statement, but they are not at all the only kind of statement. Other kinds of statements include **for statements**, which are clearly not assignments:

```javascript
 for (int x = 3; x < 7; x++) {
 };
```

And **if statements** don't look like assignments:

```javascript
 if (x > 3) {
    console.log(x);
 };
```

I'm showing you these statements just so you don't oversimplify your understand of statements. They can take many shapes and forms. More than I wish to discuss in this context. We have just looked at three kinds: assignments, for statements and if statements.

- Statements on Wikipedia: <http://en.wikipedia.org/wiki/Statement_%28computer_science%29>
- Expressions on Wikipedia: <http://en.wikipedia.org/wiki/Expression_%28computer_science%29>
- Expressons in C#: <https://msdn.microsoft.com/en-us/library/ms173144.aspx>
- Statemetns in C#: <https://msdn.microsoft.com/en-us/library/ms173143.aspx>
- General C# topic: <https://msdn.microsoft.com/en-us/library/ms173142.aspx>

In the Wikipedia, they talk about evaluation rather than yielding a value, but I think they are saying the same thing, just in different terms. Expressions can be evaluated, they yield a value.

The folks who write the C# guides are really good. For instance: "**Expressions can consist of a literal value, a method invocation, an operator and its operands**, or a simple name. Simple names can be the name of a variable, type member, method parameter, namespace or type." The parts in bold describe the types of expressions discussed above. Here is an example of type of expression not covered above, the kind not in bold in this paragraph:

```javascript
 var x = y;
```

Here **y** is an expression. It is a simple name for a variable.

There are tricky areas, such as this:

```javascript
 foo();
```

It stands on its own and it returns a value. It could be thought of as an expression and a statement. But the following is clearly a statement, and not an expression:

```javascript
 var x = 3 + 2;
```

These concepts aren't really that hard, yet I think it is good for students of computer science to learn to speak in such terms. It gives us a language we can use to describe what we are doing when we write code. Also, the terms are used all the time in text books, and we want to be able to read standard texts.

## Semicolons

Placement of semicolons in JavaScript can be confusing. The general rule is to put a command after an assignment statement. One variation on this:

```javascript
    var foo;
```

The above requires a semicolon because there is an implicit assignment to undefined. It is really saying:

```javascript
    var foo = undefined;
```

When we call a function, we often put a semicolon after it:

```javascript
    myFunction();
```

I believe the assumption is that the function returns something, even if it does not:

```javascript
    var result = myFunction();
```

When we declare a function like this, we don't use a semicolon:

```javascript
    function myFunction() {
    }
```

If we declare it anonymously and assign it to a variable, we do use a semicolon:

```javascript
    var myFunction = function() {
    };
```

In many computer languages, this is an experssion:

```javascript
    2 + 2
```

This is a statement:

```javascript
    var x = 2 + 2;
```

We usually put semicolons after statements, but not after expressions. Hence we write:

```javascript
    var x = (2 + 2) - (2 * 3);
```

In the above we don't put a semicolon after 2 + 2 or 2 * 3, we put it after the whole statement. As Michael points out, these are assignment statements.

One thing you never want to do:

```javascript
    function getPerson() {
        return
        {
            firstName: "George",
            lastName: "Washington"
        };
    }
```

In this case, JavaScript will automatically insert a semicolon after return:

```javascript
    function getPerson() {
        return;
        {
            firstName: "George",
            lastName: "Washington"
        };
    }
```

Then our code produces an error, like this:

```bash
C:\Temp\Bar.js:5
            lastName: "Washington"
                    ^
SyntaxError: Unexpected token :
    at Module._compile (module.js:439:25)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:902:3
```

It inserts the semicolon without telling you, and in an attempt to help you. Hence we always write:

```javascript
    function getPerson() {
        return {
            firstName: "George",
            lastName: "Washington"
        };
    }
```

Notice that the opening curley brace is on the same line as the return statement.: **return {**

## Getting Unstuck

In what follows I'm trying to track down things that block students when we want to focus on something more important. We are focused on REST calls with **fetch** but they are blockedbecause they don't understand the spread operator or **string.split**.

One ES6 feature that gets used a lot that is not easy to understand is the spread operator. I find it is used everywhere, and so folks really need to know it.

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)  

Another even more esoteric feature which is used less often is destructuring. It is probably less important but can be a great way to work with big JSON objects.

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

Also important in ES6 or in JavaScript generally:

- **let** and **const**
- **array.map**: This one ends up being crucial, I think. It is a kind of workhorse that again is found everywhere and that I use a lot.
- **map** I call out because it is especially important. Here are some related items that you probably cover this already. We really should all know string and array manipulation tools like:

- **string.split** and **array.join**, but also **string.slice**, **string.trim**, **array.concat**, etc.
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

- Should we be learning all the shorthand object literal initializers? I don't know them, but a real guru would.

- Read ES6 (2015) bits here: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)

To sum up highlights from this doc:

- **fetch**, **promises**, **async** and **await**. (How to **promisify** the Node File System methods such as **fs.readFile**)
- [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- See the section "Rewriting promise code with **async/await**" here:
- [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)
- New ES6 features such as the **spread** operator
- Old favorites that we sometimes don't know: **array.map**, **string.split**, **array.join**.

Details on **promisify**:

[https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original)

## const, let and var

When you declare a variable, use const, let or var.

```javascript
const a = 'foo';
```

The simplest way to think of this issue is that **var** has been superseded by **const** and **let**, and we should now always use either **const** or **let**, and never use **var**.

- **var** is part of ECMAScript 5 and earlier and is now outdated. (Links to an external site.)
- **let** and **const** are part of  (Links to an external site.)ECMAScript 6 (Links to an external site.) and now preferred.

However, that is perhaps a bit overly simplistic. See below for more detail than you want.

For now, however, what you need to know is simple: use **const** and **let**, and avoid **var**.

The difference between let and **const** is that a variable declared with let can be reassigned, but a variable declared with **const** cannot be reassigned:

```javascript
const a = 'foo';
a = 'bar'; // THIS IS AN ERROR.

let a = 'foo';
a = 'bar'; // THIS IS VALID CODE
```

We prefer **const** to let, but sometimes if we are going to reassign a variable, then use let. Use **const** if you can, otherwise use let otherwise.

Here is the bit that is much more than you need to know at this point.

**var** is not only for declaring global variables but for declaring function-scoped variables.  let and **const** are blocked scoped. That is hard to understand. I'm fairly certain it means that **var** if declared in a function, will be visible throughout the function, but not outside the function. **const** or let, if declared inside a block in a function, will be visible only in that block. For instance, if you declared a variable with **const** in an **if** block, then it will be visible only in that block, and not throughout the function. **var** doesn't work that way. If you declare a variable with **var** inside a block inside a function, then the variable is visible throughout the function because it is *hoisted* to the top of the function.

But frankly, that is much more than any of you need to know at this point. Hoisting is easy to understand, it just means the variable will act as if it was declared at the start of a function regardless of where in the function it is used. It applies to **var**, but not to **const** and **let**. But again, you don't need to know all this yet. You will eventually, but not at the start.

## Variables and the Global Namespace

From a purely syntactical point of view, it is easy to declare
variables in JavaScript. For instance, you can just write the name
of a variable and assign it a value:

x = 3;

This is not, however, a good strategy.

In general, when declaring variables in JavaScript, you want to make
sure that they do not become part of the global object. What is the
global object? That depends, but when you are inside a browser, there
is an object called **window** that is the global object. The **window**
object is huge; it contains many properties. When you declare a variable
as shown above, it becomes part of the global object.

There are several problems with putting variables in the global object.

- The global object is big and complex enough already, without you further
*polluting* it by adding additional properties.
- Sometimes a library will intentionally place a variable in the global
namespace. If you by chance add your own variable with the same name,
then you will overwrite the variable from the library, and potentially
break code. Of course, this can work in reverse. You might declare
something in the global namespace, and a library will overwrite it,
hence breaking your code. In either case, you want to avoid putting
variables in the global namespace.

Ultimately, your code should place only one variable in the global
namespace, and it should use a name that you know will be unique
when you do so. Learning to do that is, unfortunately, non-trivial.
You will, however, learn how to get started in this section. At least
one viable final solution will be provided in the chapter on the
JavaScript module pattern. Each step along the way is valuable. In
other words, the information you learn in this portion of the text will
contain much valuable and useful information. It is not that you will
replace the information in this chapter with the information in the
modules pattern chapter. Rather, the modules pattern builds on, and
includes, the information found in this chapter.

### Declare Variables with var

The first time you use a variable, you should declare it by using the
keyword **var**.

Beginners sometimes write something like this:

```javascript
    myObject = new MyObject();
    myObject.run();
```

This is an error because the keyword **var** is not used when myobject
is declared. As a result, your new object will likely end up in the global name
space; that is probably not what you want. To fix the problem, write:

```javascript
    var myObject = new MyObject();
    myObject.run();
```

Note the use of the **var** keyword.

It is very easy to omit the keyword **var** when declaring a variable
for the first time. As a result, you should be sure to run JsHint over
all the JavaScript code you create:

[http://www.jshint.com/](http://www.jshint.com/)

### Declare Variables inside Objects or Functions

Consider the following code:

```javascript
var count = 3;

function addCount(x) {
 return x + count;
}
```

In this code the variable cound becomes a global variable, which is
probably not what you want. Instead, declare your code like this:

```javascript
function addCount(x) {
 var count = 3;
 return x + count;
}
```

Now var is part of addCount, and is not added to the global name space.
Of course, addCount itself is in the global namespace, but we are not
yet ready to address that issue.

Note that the following code also puts count in global namespace:

```javascript
function addCount(x) {
 count = 3;
 return x + count;
}
```

The error here is that the keyword **var** is omitted. As a result,
count becomes a property of the global object.

### Don't Declare a variable Twice

Never redeclare a variable two times. The following example declares
the variable param1 as an argument to method foo, and then declares
a variable with the same identifier (param1) inside the body of
**foo**.

```javascript
    function foo(param1) {
        var param1 = 2;
    }        
```

## Operators

There are many different operators and understanding them all takes time. However, there are a few basics that we can use as a foundation.

### Arithmatic Operators

The plus and minus operators have the lowest precedence.

```javascript
    1 + 2 * 3 = 7;
    (1 + 2) * 3 = 9;
```

The grouping operators, shown as parenthesis have the highest precedence. Since the multiplication has a higher precedence than addition, then the first statement above can be rendered like this:

```javascript
    1 + (2 * 3)
```

In the second statement above we use the grouping operator to override the default precedence for addition and multiplication operators.  

Here is the overview:

| Name                | Operator | Precedence |
|:--------------------|:---------|:-----------|
| Plus                | +        | 3          |
| Minus               | -        | 3          |
| Multiplication      | *        | 2          |
| Division            | /        | 2          |
| Remainder (modulus) | %        | 2          |
| Exponential         | **       | 1          |

This [MDN page][mdnop] on operator precedence tells you all you need to know about operators in JavaScript.

[mdnop]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

### The == Operator and the === Operator

Never use == or !=. Instead, use === and !==. The problem here is that
== can return true when you are comparing two different types of
objects. For instance:

```javascript
    3 == '3';  // returns true
    3 === '3'; return false;
```

Here is code that demonstrates this point:

```javascript
function getEqual01() {
    return '3' == 3;
}

function getEqual02() {
    return '3' === 3;
}

function fillList() {
    $("#myList").append("<li>" + getEqual01() + "</li>");
    $("#myList").append("<li>" + getEqual02() + "</li>");
}
```

The first example shown here returns **true**, the second **false**.

## Looping

There are two common ways to Loop in JavaScript:

- for loops
- while loops

We will look at the various phyla of each type.

### For Loops

The basic for loop:

```javascript
for (let i = 0; i < 5; i++) {
 console.log(i);
}
```

Iterate over an Array, arguments, iterable object, Map, NodeList, Set, String and TypedArray:

```javascript
const numbers = [1, 2, 3];
for (let number of numbers) {
     console.log(number);
}
```

Iterate over the properties of an object:

```javascript
const numbers = { 'one': 1, 'two': 2, 'three': 3 };
for (let number in numbers) {
 console.log(number);
}
```

The properties do not come in order. It is probably best not to modify an object while you are iterating over it. You can modify the property you are visiting during the loop.

### While Loops

Besides **foo loops**, the other most common way to loop over data is with a while loop.

The **while** loop will execute 0 to n times. In other words, if the initial condition is not met, it will never execute.

```javascript
var count = 0;

while (count < 5) {
 console.log(count++);
}
```

The **do..while** loop will execute at least once:

```javascript
var count = 0;

do {
    console.log(count++);
} while(count < 5)
```

### For and While Loop Example Program

Here is a short program you can run with node to test them both. To run the
program, create a file index.js with the following contents. Then type:

```shell
    node index.js
```

Below is the code:

```javascript
/**
 * @author Charlie Calvert
 */

var app = {
   basicForLoop: function() {
       'use strict';
       for (let i = 0; i < 5; i++) {
           console.log(i);
       }
   },

 forOfLoop: () => {
  const numbers = [1, 2, 3];
  for (let number of numbers) {
       console.log(number);
  }
 },


 forInLoop: () => {
  const numbers = { 'one': 1, 'two': 2, 'three': 3 };
  for (let number in numbers) {
   console.log(number);
  }
 },

   basicWhileLoop: function() {
       'use strict';
       var count = 0;

       while (count < 5) {
           console.log(count++);
       }
   },

   doWhileLoop: function() {
       'use strict';
       var count = 0;

       do {
           console.log(count++);
       } while(count < 5)
   }
};

console.log('\nHere is the for loop:');
app.basicForLoop();

console.log('\nHere is the for..of loop:');
app.forOfLoop();

console.log('\nHere is the for..in loop:');
app.forInLoop();

console.log('\nHere is the while loop:');
app.basicWhileLoop();

console.log('\nHere is the do...while loop:');
app.doWhileLoop();
```

The code shown above can be found in the examples code repository found on
GitHub. While there, you might also check out the example of nested for
loops:

- [JsObjects/JavaScript/Syntax/Loops01][loops01]
- [JsObjects/JavaScript/Syntax/ForLoopNested][fln]

## Branching

Branching is the area of computer science that covers both **if** and **switch** statements.

When we write code we often need to test if a condition is **true** or **false** in order to make a decision. In JavaScript we have three conditional statements:

- **if statement** - test if a condition is true or false. Execute code only if it is true.
- **if...else statement** - test is a condition is true or false and do one thing if it is true and another if it is false.
- **switch statement** - Sometimes lengthy **if-else** statements can be hard to read. **switch** statements provide an alternative syntax.

### If Statements

Basic:

```javascript
const x = 2;
if (x > 2) {
  console.log("x is larger than 2");
}
```

A JavaScript ojbect called **app** with a method in it called **iseven**. Inside the method we use the **remainder** operator to test if a number is even (divisable by 2).

```javascript
var app = {

 isEven: function(input) {
  if (input % 2 === 0) {
   console.log('Your input of ' + input + ' is even');
  } else {
   console.log('Your input of ' + input + ' is odd');
  }
 }
};

app.isEven(2);
app.isEven(3);
app.isEven(4);
app.isEven(5);
```

The output from this program looks like this:

```bash
$ node index.js
Your input of 2 is even
Your input of 3 is odd
Your input of 4 is even
Your input of 5 is odd
```

### More on else and if

Sometimes we want to string together a long series of if and else statements. It looks like this:

```javascript
const doA = () => {
    console.log('Doing A');
}

const doB = () => {
    console.log('Doing B');
}

const doC = () => {
    console.log('Doing C');
}

const x = 'b';

if ( x === 'a') {
    doA();
} else if (x === 'b') {
    doB();
} else if (x === 'c') {
    doC();
}
```

Read it like this: "If x equals a then do A, else, if x equals b, then do B, else, if x equals c, then do C."

Because x has been set to 'b', the first if statement is skipped. We tell the code, if the first doesn't work, try the second option. Since x is equal to 'b' that is the one that is selected. Therefore it will print out **Doing B**. There might be ways to optimize that code, but don't bother. Keeping simple code simple is usually more important than saving a few nano-seconds. Not always, but usually. The same code is also:

```html
<a href="https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Syntax/ElseIf/work.js">on JsObjects</a>.
```

### Switch Statements

Switch statements look a bit like a long series of **if..else** statements.
We pass a variable or expression to the **switch** keyword, and then a block
of one or more statements is executed if the passed variable matches a
**case** that we have set up. In effect, we are saying: "If this particular
identifier matches our expression, then execute the statements associated
with this case, else try to match the next case."

Here for instance, is the way a series of if else statements might look:

```javascript
if (stateAbbreviation == 'AL') {
 DoSomething();
} else if (stateAbbreviation == 'CA') {
 DoSomethingElse();
} etc...
```

Here is how a switch statement would handle the same task:

```javascript

Alabama = 'AL',
California = 'CA',
Texas = 'TX',
Washington = 'WA';

var statePopulation =  function(stateAbbreviation) {
 var result = 0;

 switch (stateAbbreviation) {
  case 'AL':
   result = 4800736;
   break;

  case 'CA':
   result = 38053956;
   break;

  case 'TX':
   result = 25901361;
   break;

  case 'WA':
   result = 6830038;
   break;

  default:
   result = -1;
 }

 console.log('The population of ' + stateAbbreviation + ' is ' + result);
};

var runState = function() {
 statePopulation(Alabama);
 statePopulation(California);
 statePopulation(Texas);
 statePopulation(Washington);
 statePopulation('Unknown');
}
```

You can have multiple case statements match a single set of statements that
you want to execute:

```javascript
  case 'CA':
  case 'TX':
   result = stateIsBig;
   break;
```

If you (usually accidentally) leave out a break statement, then something
similar to what we see above occurs. In other words, the code just falls
through to the next example:

```javascript
  case 'TX':
   result = 25901361;

  case 'WA':
   result = 6830038;
   break;
```

In the above code, since there is no break in the Texas case, then result will
be set to 6830038 if either Texas of Washington is passed in.

Notice also that there is an optional default case that is executed if none
of the other options are matched.

### Comparing switch and if..else Statements

As a general rule, switch statements will execute more quickly than a set of
if..else statements. However, these kinds of performance issues rarely have
serious consequences unless the code in question is being executed inside a
loop. Even if your program does have performance problems, it is unlikely
that the bottle neck will be fixed by substituting a **switch** statement for  a
series of **if..else** statements. Again, if you are in a big loop, then maybe
it will be a bottle neck, but probably not.

The better argument, in my opinion, is for the readability of **switch**
statements. A big block of **if..else** statements can be hard to parse. The
switch statement, on the other hand, lends itself to neat, easy to read
formatting.

Links:

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

### Object Maps

After all our talk about if..else and **switch** statements it is worth noting
that JavaScript provides a third mechanism that is arguable a much better
solution to this kind of problem. Consider the following example:

```javascript
var funcBranch = function(stateAbbreviation) {

 var stateMap = {
  'AL': 4800736,
  'CA': 38053956,
  'TX': 25901361,
  'WA': 6830038
 }

 console.log('The population of ' + stateAbbreviation + ' = ' + stateMap[stateAbbreviation]);
};
```

In this code we create a small object called stateMap. We can then pull out the
value we want by simply writing the following simple expression:

 stateMap[stateAbbreviation]

If, for instance, stateAbbreviation were equal to 'WA', then this expression
would return 6830038. This code is concise, easy to read, and it performs
well.

Note that you could perform more complex operations by setting up an object
that contains functions:

```javascript
var stateMap = {
 'AL': function() {
  return 4800736 /100;
 },
 'CA': function() {
  return 38053956 / 100;
 },
 etc...
}
```

This makes the solution *functionally* equivalent to a switch statement, since
each option can consist of a series of statements. For instance you could write
something like this:

```javascript
var funcBranch2 = function(stateAbbreviation) {
  var stateMap2 = {
   'AL': function() {
    return 4800736 /100;
   }(),
   'CA': function() {
    return 38053956 / 100;
   }(),
   'TX': function() {
    return 25901361 / 100;
   }(),

   'WA': function() {
    return 6830038 / 100;
   }()
  }

  console.log('The population of ' + stateAbbreviation + ' = ' + stateMap2[stateAbbreviation]);  
 };
```

If that is just too esoteric for your tastes, then you can write:

```javascript
var funcBranch2 = function(stateAbbreviation) {
 var stateMap2 = {
  'AL': function() {
   return 4800736 /100;
  },
  'CA': function() {
   return 38053956 / 100;
  },
  'TX': function() {
   return 25901361 / 100;
  },

  'WA': function() {
   return 6830038 / 100;
  }
 }

 var bar = stateMap2[stateAbbreviation];
 console.log('The population of ' + stateAbbreviation + ' = ' + bar());
};
```

It's really just a question of when you want the function to execute. The
first case saves you a bit of code, but it is arguable going to a bit hard
for some people to read.

The example program is on GitHub, in JsObjects:

[JsObjects/JavaScript/Syntax/Branching01][bran01]

[bran01]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/Branching01

## Arrays

You can declare an array in two ways:

```javascript
const emptyArray = [];
const newArray = new Array();
```

We prefer the first because it is faster and simpler. They both create a JavaScript Array.

There are dozens of methods in the JavaScript array object. Among them are:

- concat
- filter
- find
- join
- keys
- map
- slice
- sort

Right now it is not important that you know how to use all these functions, only that you understand that the JavaScript Array object is quite powerful.

### Array of Numbers

Use **const**, an identifier, and equals sign, square brackets and a comma separated list of numbers to declare an array of numbers:

```javascript
const numbers = [1, 2, 3];
console.log(numbers[0]); // 1
console.log(numbers[2]); // 3
```

We access the numbers by indexing into our zero based array of numbers. Somewhat unintuitively, numbers[0] yields 1, since the zeroth element in the array is the first item listed in the array.

Here we sort an array of numbers:

```javascript
const numbers = [2, 1, 3];
const sorted = numbers.sort((a, b) => a - b);
console.log(sorted); // [ 1, 2, 3 ]
console.log(numbers);  // [ 1, 2, 3 ]
```

The sort function returns the sorted array, but it also sorts the array itself. They call this "sorting in place".

We pass a function to sort that uses fat arrow syntax. The function defines how to sort the numbers. Use the plus operator rather than the minus operator if you want to sort in the opposite direction (Ascending vs Descending).

Two ways to loop over an array of numbers:

```javascript
for (let number of sorted) {
    console.log(number);
}

for (let i = 2; i >= 0; i--) {
    console.log(sorted[i]);
}
```

### Array of String

Here we declare an array of string. Again, JavaScript sorts the array in place.

```javascript
const words = ['one', 'two', 'three'];
const sortedWords = words.sort();
console.log(sortedWords); // [ 'one', 'three', 'two' ]
console.log(words); // [ 'one', 'three', 'two' ]
```

Note that we get the same result by displaying either **sortedWords** or **words**. This is because the array is sorted in place. We don't have to pass a function to sort in this case because JavaScript sorts arrays alphabetically by default.

### Slice and Array of String

Get the first two elements from the array:

```javascript
const newWords = ['able', 'bravo', 'charlie'];

const slip = words.slice(0,2);
console.log('SLICE', slip); // ['able', 'bravo']
```

Slice takes two parameters: **begin** and **end**. We create a new array starting at the index specified with **begin**, and ending at the index specified by **end - 1**.

We start with index 0, and go to index 2 - 1. In other words, we get items 0 and 1, which are **alpha** and **bravo**.

You don't need to start at the beginning of the array. For instance, you can start at the second item in the array:

```javascript
const slide = newWords.slice(1,3);
console.log('SLICE', slide); // ['bravo', 'charlie']```
```

If you pass in just one number, that means you want to start at a specific index and go to the end of the array. A negative number counts in from the end of the array.

Here, then, are three ways of saying the same thing:

```JavaScript
const slide = newWords.slice(1,3);
console.log('SLICE', slide);

const slate = newWords.slice(1);
console.log('SLICE', slate);

const slake = newWords.slice(-2);
console.log('SLICE', slake);
```

The three examples above all produce:

```shell
    SLICE [ 'bravo', 'charlie' ]
    SLICE [ 'bravo', 'charlie' ]
    SLICE [ 'bravo', 'charlie' ]
```

Some working code is available in [JsObjects][arrwork].

### Arrays and while Loops

We typically display arrays with **for..of** loops, but it can be done with while loops:

```javascript
const newList = ['linux', 'OS2', 'Windows']
let i = 0;
while(newList[i]) {
    console.log('WHILE', newList[i++]);
}
```

Notice the nice trick with the **while** condition. Once **i** is larger the number of items in the array, then **newWords[i]** returns **underfined** and the condition to break out of the loop is met. This is good so long as you don't have elements in your array that are undefined:

```javascript
const newList = ['linux', 'OS2', undefined, 'Windows']
```

Using our trick, we would never get to **Windows**.

Here is the **do..while** loop:

```javascript
let j = 0;
do {
    console.log('DO-WHILE', newList[j++]);
} while(newList[j])
```

This, of course, is the same as the **while** loop, only it is guaranteed to execute at least once.

If you are at all unclear as to what is happening here, use **console.log** to display all the available information:

```javascript
let j = 0;
do {
    console.log('J', j);
    console.log('DO-WHILE', newList[j++]);
    console.log('J', j);
    console.log('--------------')
} while(newList[j])
```

That above code produces this output:

```shell
J 0
DO-WHILE linux
J 1
--------------
J 1
DO-WHILE OS2
J 2
--------------
J 2
DO-WHILE Windows
J 3
--------------
```

## Array of Objects

Consider this array of objects:

```javascript
var people = [
    {
        firstName: 'George',
        lastName: 'Washington'
    },
    {
        firstName: 'John',
        lastName: 'Adams'
    },
    {
        firstName: 'Thomas',
        lastName: 'Jefferson'
    }
];

console.log('The whole array of objects:', JSON.stringify(people, null, 4));
console.log('First name of first object in array:', people[0].firstName);
console.log('Last name of second object in array:', people[1].lastName);
console.log('First and last name of third object:', people[2].firstName + ' '  + people[2].lastName);

```

The output would look like this:

```javascript
The whole array of objects: [
    {
        "firstName": "George",
        "lastName": "Washington"
    },
    {
        "firstName": "John",
        "lastName": "Adams"
    },
    {
        "firstName": "Thomas",
        "lastName": "Jefferson"
    }
]
First name of first object in array: George
Last name of second object in array: Adams
First and last name of third object: Thomas Jefferson
```

### Sorting

Suppose you have multiple items in an array and you want to sort them. If the arrays is made of strings or numbers,  just call **myArray.sort()**.

If the array is made up of objects or other arrays, JavaScript may not know how to perform the sort in many cases. For instance, if you had an array of objects with firstName and lastName properties, you have to tell JavaScript to sort on the **firstName** or sort on the **lastName.**

Like this:

```javascript
var people = [
    {
        firstName: 'George',
        lastName: 'Washington'
    },
    {
        firstName: 'John',
        lastName: 'Adams'
    },
    {
        firstName: 'Thomas',
        lastName: 'Jefferson'
    }
];

console.log('Before sort:', JSON.stringify(people, null, 4));

people.sort(function(a, b) {
    return a.lastName > b.lastName;
})

console.log('After sort:', JSON.stringify(people, null, 4));</pre>
```

To produce:

```javascript
Before sort: [
    {
        "firstName": "George",
        "lastName": "Washington"
    },
    {
        "firstName": "John",
        "lastName": "Adams"
    },
    {
        "firstName": "Thomes",
        "lastName": "Jefferson"
    }
]
After sort: [
    {
        "firstName": "John",
        "lastName": "Adams"
    },
    {
        "firstName": "Thomes",
        "lastName": "Jefferson"
    },
    {
        "firstName": "George",
        "lastName": "Washington"
    }
]
```

Of course other cases are slightly different, but this should help you get started.

Here is code for sorting an array called **presidents** by first name:

```javascript
 var sort = function(){
  presidents.sort(function (a, b) {
   if (a.firstName > b.firstName) {
    return 1;
   } else if (a.firstName < b.firstName) {
    return -1;
   } else {
    return 0;
   }
  });
 };
```

## Properties and Constants

See this example:

- [Constants](Constants.html)

## Boolean expressions

The && operator says both sides of an expression must be true. If both are true, then the last value in the expressions is returned.

Suppose we write this:

```javascript
const baby = true;
!baby && <li>Pizza</li>
```

Expressions like this are evaluated left to right. Therefore, if the first part of the expression is false, then the second half is never evaluated.

The expression will exit immediately if there is a baby because **not baby** will return false. If there is a not a baby, then the first half of the expression is true, and this allows the second half -- the list item -- to be evaluated and returned by the expression. Thus it prints out Pizza in your list.

**non-boolean** expressions such as **&lt;li&gt;Pizza&lt;/li&gt;** evaluate to **true** in JavaScript. Thus the list item returns **true**, the expression evaluates to **true**, and the last item in the expression is returned.

References:

- <https://www.google.com/search?q=mastering-javascript-and-logical-operators>

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators>

## Events and MouseDown

Use jQuery to designate the name of your event handler:

 $('#mainCanvas').click(doMouseDown);

Then you can capture the mouseDown event like this, where you need special
code to handle the behavior in FireFox:

```javascript
 var doMouseDown = function(event) {
 var mouseDownRawX = null;
 var mouseDownRawY = null;

 // Fix for FireFox which does not define offsetX
 if (typeof event.offsetX === 'undefined') {
  var elementOffset = $(this).offset();     
     mouseDownRawX = event.pageX - elementOffset.left;
     mouseDownRawY = event.pageY - elementOffset.top;
 } else {
  var mouseDownRawX = event.offsetX;
  var mouseDownRawY = event.offsetY;
 }
}
```

## Binding

You can use **bind** to bind a function to an object, or rather to an
object's scope. Suppose you have function func and object obj. You can
make a copy of func seem to be a part of obj with bind so that the this
variable used by func belongs to obj, even if func originally had a this
variable bound to some other object.

```javascript
    totem = 'bird';

    var showBind = function()
    {
     showDebug(this.totem);
    }

    function MyFunction()
    {
     this.totem = 'bear';
    }

    var showBindAgain = function()
    {
     var myFunction = new MyFunction();
     xshowBind = this.showBind.bind(myFunction);
     xshowBind();
    }

    var showDebug = function(data)
    {
     $('#debug').append('<li>' + data + '</li>');
    }
```

In the code shown above, if you called **showBind**(), and then called
**showBind()** a second time from **showBindAgain**(), the first time it
would print **fish**, and the second time it would print **bear**.

You can try this out by clicking the buttons below. Click these buttons
call showBind() and showBindAgain() from a live copy of the JavaScript
shown above:

If you would prefer an isolated example away from the text on this page,
you can also try this code here:

[BindMe.html](BindMe.html)

## Experimental Features

Try visiting this page in Chrome:

- [Flags](chrome://flags/)

## Debugging Strategies

All the major browsers have good debuggers in them, but I probably prefer the one that ships with Chrome.

Load your page in the browser, and press F12 to bring up the [Chrome Debugger and Development Tools][chromeTools]. If you click around a bit, you can have the debugger in one window and your browser in another window, which can be a good strategy.

We have talked some about debugging strategies with these tools before, but digging into them is very wise. The **Resources page** can help you find JavaScript or HTML files which are badly broken due to syntax issues. The Scripts page allows you to set break points in JavaScript files. The Elements page helps you study an HTML file.

See also these pages:

- [Developer Tools](https://developers.google.com/web/tools/chrome-devtools/)

[chromeTools]: https://developers.google.com/chrome-developer-tools/

## Insert Adjacent HTML

The
[insertAdjacentHTML](https://developer.mozilla.org/en/DOM/element.insertAdjacentHTML)
method has been part of some implementations of JavaScript and the DOM
for some time, but it is finally being standardized in HTML 5. When you
click the button shown below, the following code gets executed:

```html
<script type="text/javascript">
  function TestInsertAdjacent()
  {
    var adjacentText = document.getElementById('AdjecentText');
    adjacentText.insertAdjacentHTML('afterbegin', '[Rufus]:');
  }
</script>
```

Code like this can be placed in a separate file with .js extension, it
can be embedded in the midst of an HTML file, or it can be placed in the
\<head\> section at the top of an HTML file. This code will modify the
next paragraph by placing an arbitrary string ([Rufus]:) at the
beginning of the first sentence, that is, after the opening \<p\> tag:

This is a **p** element with the **IDAdjacentText**. Push the button
below to modify it

There are four places where it can insert text:

- beforebegin
- afterbegin
- beforeend
- afterend

The after and before phrases refer to after and before a tag. Suppose
you have an element like this:

```html
    <p>This element</p>
```

The statement can insert text before the first \<p\> tag, after that
tag, or before the closing \<p\> tag, or after it.

If you want to learn more about the DOM, go to this page:

[https://developer.mozilla.org/en/Gecko_DOM_Reference](https://developer.mozilla.org/en/Gecko_DOM_Reference).

Here is the code for the button:

```html
<input name="insertAdjacentButton" type="button" value="Insert Adjacent Text" onclick="TestInsertAdjacent()">
```

## Change

When Microsoft owned the development world, it was much simpler to teach students what they needed to know. C# was the center of the universe, and everyone needed to know it, Windows, MsSql and IIS.

Then, quite suddenly, hardly anyone was using that technology to build web apps. Everyone was switching or had switched to JavaScript, Rest, Apache, jQuery and Python/Ruby/Node/PHP. LAMP was the center of the universe, but there was no single established way to develop LAMP applications.

Since then, two things have happened:

- There is no one leader in the development world the way Microsoft was once the center of the development universe.
The Internet, Cloud computing, and GitHub created a whirlwind. Great new libraries continued to come from Microsoft, but also from Apple, Google, the Apache foundation, and just as frequently, from random developers and small companies all over the globe.
- Not only is their no center to the development world, but it is changing, growing, evolving, much faster than it did ten years ago. Certain foundational skills such as Git, HTML, CSS, JavaScript, HTTP and REST don't change, but the libraries we use to harness these technologies do change. I try to focus on the core technologies listed above, but to show how modern tools help us expedite the development process.

Five years ago, in front-end development, this industry was focused on a technology called jQuery. That was nice, but it was new, and hardly anyone in academia understood how it worked. There were no established texts, no recommended curriculum. So we studied jQuery, developed courses on the fly. And it is still true that everyone needs to know jQuery. Then the focused switched from jQuery to Angular. Last year, and two years ago, it seemed that Angular was the most important technology. And it indeed, it is still very important. But now we have a new technology called react, which is coming on very fast and very strong.

It isn't necessarily my job to always teach the latest thing. But I do have to understand what is happening in the industry, and to be sure you have the background to absorb it. I'm still struggling to find the best way to do that, which means I'm still tweaking the course and adding new materials. In short, I don't always know what I'm going to teach ahead of time and hence can't provide the kind of previews you want.

## Indenting with Tabs and Spaces

You can indent your code with tabs or with spaces, but not with both.
Choose either tabs or spaces, and stick with your decision. There are
many tools you can use to help you fix these kinds of problems. For
instance, simply selecting Source | Format in Eclipse should clean up
this issue. Both Eclipse and NotePad++ contain options that allow you to
see the content of your white space, so you can tell when you are mixing
up the two characters on the same line.

## End Functions and Statements with a Semicolon

Functions that take the form of an assignment should end with a
semicolon:

```javascript
var changeList = function() {
    ("#MyList").append("<li>List Item</li>");    
};
```

If you declare a function like the following example, there is no
assignment, and hence no statement, and hence no need for a semicolon:

```javascript
function changeList() {
    ("#MyList").append("<li>List Item</li>");    
}
```

You should, of course, always end a statement with a semicolon:

```javascript
("#MyList").append("<li>List Item</li>");
```

It would be wrong to write this:

```javascript
("#MyList").append("<li>List Item</li>")
```

## Destructuring

Here is how we have, lo these many years, created variables from an array. It is easy to understand but requires a lot of typing:

```javascript
var first = someArray[0];
var second = someArray[1];
var third = someArray[2];
```

With a destructuring assignment, our code becomes very terse:

```javascript
var [first, second, third] = someArray;
```

We set the **first**, **second,** and **third** variables to the same values in each case, but destructuring allows us to forego a lot of busywork. Also, we can now refer to</span> **someArray[0]** as **first**, which can both speed code execution when accessing the variable over and over in a loop, and also limit the amount of typing we do.

The same thing happens in Emily's example:

```javascript
function printInfo({name, info:{author}}) {
    console.log('The product name is: ' + name);
    console.log('The author is: ' + author);
}

const bookProduct = {
    id: 3,
    name: 'Javascript Cookbook',
    info: {
        author: 'XXXXX XXXX',
        publisher: 'XXXX',
        year: 2018
    }
};

printInfo(bookProduct);
```

The printInfo method shown above is more concise and requires less typing than the old way:

```JavaScript
function printInfo(bookProduct){  
    console.log('The product name is: ' + bookProduct.name);  
    console.log('The author is: ' + bookProduct.info.author);  
}
```

In particular, we can type **author** rather than **bookProduct.info.author**. Again, this can improve readability and also improve code performance if there is a loop.

It requires a bit of work to learn the syntax for destructuring, but if we can learn it, we can make create code that with less typing and hence less clutter and less room for mistakes.

Again, I apologize for my terrible introduction to this subject, but hopefully, I now understand at least a bit more about destructuring, even if I am still far from an expert on it.

For more info and a rather encyclopedic set of examples illustrating what can be done with destructuring, go here:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

That article provides this simple description of what destructuring does: "The **destructuring assignment** syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables."

Here is another example which might show what can be done on the server-side with destructuring. Assume **messyData** was returned by a web service and we want to simplify it before sending it back to the server. Note that I constructed a fake **response** object so that I could write code you can compile at the command line in a simple JavaScript file:

```javascript
const messyData = {
 "login": "octocat",
 "id": 1,
 "node_id": "MDQ6VXNlcjE=",
 "avatar_url": "https://github.com/images/error/octocat_happy.gif",
 "gravatar_id": "",
 "url": "https://api.github.com/users/octocat",
 "html_url": "https://github.com/octocat",
 "followers_url": "https://api.github.com/users/octocat/followers",
 "following_url": "https://api.github.com/users/octocat/following{/other_user}",
 "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
 "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
 "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
 "organizations_url": "https://api.github.com/users/octocat/orgs",
 "repos_url": "https://api.github.com/users/octocat/repos",
 "events_url": "https://api.github.com/users/octocat/events{/privacy}",
 "received_events_url": "https://api.github.com/users/octocat/received_events",
 "type": "User",
 "site_admin": false,
 "name": "monalisa octocat",
 "company": "GitHub",
 "blog": "https://github.com/blog",
 "location": "San Francisco",
 "email": "octocat@github.com",
 "hireable": false,
 "bio": "There once was...",
 "public_repos": 2,
 "public_gists": 1,
 "followers": 20,
 "following": 0,
 "created_at": "2008-01-14T04:33:35Z",
 "updated_at": "2008-01-14T04:33:35Z",
 "total_private_repos": 100,
 "owned_private_repos": 100,
 "private_gists": 81,
 "disk_usage": 10000,
 "collaborators": 8,
 "two_factor_authentication": true,
 "plan": {
  "name": "Medium",
  "space": 400,
  "private_repos": 20,
  "collaborators": 0
 }
}

const response = {
 send: function send(data) {
  console.log('FAKE RESPONSE.SEND:', data);
 }
}

const { name: userName, followers, plan: { name: planName, private_repos } } = messyData;

response.send({ userName: userName, followers: followers, plan: { planName: planName, privateRepos: private_repos } });
```

Hopefully, you can see how we used destructuring to simplify messyData so that we could send a relatively simple structure back to the client. I should perhaps add that we could again use destructuring to make it easier to use the simplified data on the client.

## Platforms

What technologies do I focus on most often these days?

## LAMP

I use LAMP to some degree. It stands for:

- Linux: Yes, we are using this a lot
- Apache Web Server: We will use it some, but we will serve most of our apps from the built-in Node Web Server. We should be using Apache enough that you will get a working understanding of how it is used in production environments.
- MySql: We will probably use MongoDB instead of MySQL. If we did use a SQL database, I think I might go with PostgreSQL, but it would be a close call. MySql is a good tool.
- Perl, PHP, Python: We probably won't use any of these languages. We are focused on Node. If we did pick a second language, Python would probably win, but Go might be a close second.

## Links

- [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [MDN Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference#Expressions_and_operators)

[arrwork]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/Array
[jObject]: http://elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html
[jFunction]: http://elvenware.com/charlie/development/web/JavaScript/JavaScriptFunctions.html
[loops01]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/Loops01
[fln]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/ForLoopNested

[styleGuide-xml]: https://google.github.io/styleguide/javascriptguide.xml
[styleGuide-html]: https://google.github.io/styleguide/jsguide.html
[whiteSpace]:<http://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript>](<http://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript>
[wsCrockford]:<http://javascript.crockford.com/code.html>](<http://javascript.crockford.com/code.html>
