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

Note that the type of the unassigned variable **foo** is **undefined**. Do
you see how that works? We don't assign **foo** to anything: **var foo;**.
When we ask to see its type, the system tells us that **foo** is **undefined**.
You will see that a lot, especially when you are starting
out with JavaScript. The lessson here is simple: when you see that a
variable is **undefined**, it usually means that you haven't assigned
any value to it.

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
            firstName: 'George',
            lastName: 'Washington'
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
C:&#92;Temp&#92;Bar.js:5
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

Notice that the opening curley brace is on the same line as the return statement.

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
a variable with the same identifier (param1) inside the body of **foo**.

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