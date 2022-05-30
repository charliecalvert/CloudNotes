---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/JavaScriptBasics01.md
relativePath: javascript-guide/JavaScriptBasics01.md
title: JavaScriptBasics
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: JavaScriptBasics01.md
fileNameHTML: JavaScriptBasics01.html
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
        // do something here
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
