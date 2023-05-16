---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/SendMeToElvenware.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
fileName: SendMeToElvenware.md
relativePath: /web/JavaScript/SendMeToElvenware.md
title: SendMeToElvenware
directoryName: JavaScript
category: JavaScript-guide
---

## Overview

An important part of the engine behind the world wide web is the synergy
formed by the combination of three related technologies called HTML, CSS
and JavaScript. Though the differences between the roles played by these
technologies can blur at times, the following assertions will help you
get started understanding them:

-   HTML allows you to declare or specify content
-   CSS let's you define how the content should appear
-   JavaScript allows you to perform actions that animate the content.

Hello World in the Browser {#helloWorldInTheBrowser}
--------------------------

JavaScript can be written as a standalone script that runs from the
command prompt like a batch file or shell script. It can also be run as
server side code like Python or PHP via a relatively new technology
called [nodejs](http://nodejs.org/). Most commonly, however, JavaScript
is imbedded in or attached to an HTML file.

In Listing 01, for instance, you can see a very simple “Hello World”
program that uses JavaScript. You can save this file as
**VerySimple.html**.

**Listing 01: Hello world in JavaScript.**

```html
<!DOCTYPE html>
<html>

<head>
 <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
 <title>Very Simple</title>
 <script type="text/javascript">
 document.writeln("<p>A very simple JavaScript Hello-World program.</p>");
 </script>
</head>

<body>
</body>
</html>
```

What are you supposed to do with this file? Well, you can open it in a
web browser, and see the output that it produces. This is usually simply
a matter of using the Windows Explorer or some similar tool to locate
your file. Then you can double click on it, or right click and choose
"Open with..." Because the file has an HTML extension, it should open
automatically in a web browser or allow you to choose the browser in
which you want to run it. Most browsers will also let you choose **File
| Open** from the menu and browse for the file you want to open. If you
are using Chrome, press Ctrl + O to open a file.

![Very Simple JavaScript file](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/javascript/VerySimpleJavaScript.png)

**Figure 01: The VerySimple02.html file running in Chrome.**

You can see the path to the file in the address bar. This is a normal
Windows path with slashes rather than back-slashes. Notice also that it
is prefaced with the code **file:///.**  Later you can learn how to set
up a web server to publish your code, but for now, it is fine to just
browse for the file on your hard drive.

In the above example, the JavaScript is embedded in the head element.
Alternatively, you can place your JavaScript smack dab in the middle of
your HTML:

```html
<!DOCTYPE html>
<html>
<head>
 <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
 <title>Very Simple</title>
</head>
<body>
        <script type="text/javascript">
               document.writeln("<p>A very simple JavaScript Hello-World program.</p>");
        </script>
</body>
</html>
```

I prefer, however, not to put HTML and JavaScript in the same file.
Instead, I create two or more files: one for my html; one or more for my
JavaScript. I then provide a link from the \<head\> element in the HTML
to my JavaScript file or files:

**Listing 03: The HTML File**

```html
<!DOCTYPE html>
<html>

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>Very Simple</title>  
    <script src="VerySimple.js" type="text/javascript"></script>
</head>

<body>    
</body>
</html>
```

**Listing 04: The JavaScript file: VerySimple.js.**

```javascript
document.writeln("<p>A very simple JavaScript Hello-World program.</p>");
```

**Note: You can download this sample from
[here](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/downloads/VerySimple.zip).**

**NOTE**: When running the code in Listings 03 and 04, you should be
sure to put both files in the same directory. For instance, you may have
a folder called **C:\\Src** where you store your source files. Put both
files in that directory:

    C:\Src\VerySimple.html
    C:\Src\VerySimple.js

I believe it is nearly always best not to put your JavaScript code in
the same file as your HTML. I believe this, despite the fact that there
is nothing inherently wrong with putting JavaScript and HTML in the same
file. Certainly your code will work if you follow that pattern. However,
I consider it a good practice to always separate your HTML code into
three files:

-   Put your content in HTML files with an HTML extension: MyFile.html
-   Put your presentation code in CSS files with a CSS extension:
    MyFile.css
-   Put your  JavaScript in JavaScript files with JS extension:
    MyFile.js

If you need to use the same CSS or JavaScript in multiple HTML files,
then it is obvious that it is best to put that CSS or JavaScript in a
separate file. Otherwise, you would be forced to endlessly repeat the
same code in multiple HTML files. Then, if you wanted to fix a bug in
your JavaScript or CSS, you would need to fix it in each HTML file that
included the code. In a large web site, that might mean you would need
to edit thousands of HTML files just to make one simple fix.

But suppose you CSS or JavaScript that you only wanted to use in one
file? Why should you split them up into three files? Wouldn't it mean
that:

-   Your code ran faster because there would be one download instead of
    3?
-   It would be easier to make sure that code that belonged together
    never got separated?

The answer to both these questions is yes. And still, despite these
arguments, I think you should always separate your code out into three
files. I believe this for the following reasons:

-   It promotes good habits
-   More often than you think, there will come a time when you will want
    to use the CSS or JavaScript in a second
    HTML file. If it is not already split out into multiple files, then
    you will get lazy and copy it from one file to another, ending up
    with duplicate code.
-   Ultimate, it is easier to write good clean, easy to read, and easy
    to maintain code if you don't mix different types of source in a
    single file
-   And finally, there are tools that can be run over HTML files before
    you release them that will automatically consolidate them into a
    single file. 

*NOTE: This last point is not really as good an argument as it sounds.
Ultimately, I believe you are better off with a maintainable code base
that runs a bit slow, than you are with a fast code base that is
impossible to understand, maintain or improve. Furthermore, most
developers who try to optimize their code end up spending hours, days,
or even months fussing with code in order to save milliseconds that the
user never notices. The rule you want to follow is simple: unless you
can see obvious, and certain, proof that you have a performance problem,
you should not waste time trying to optimize your code. Instead, focus
on writing clean code that is easy to maintain. One thing we know for
certain: users always prefer code that works and has the right features
to code that does not work and lacks key features. If you write messy,
hard to maintain code, you will nearly always find it harder to add
features to that code base than it is to add features to well written
programs.*

The Case of File Names {#theCaseOfFileNames}
----------------------

I should say a word about the case of the file names I create. There are
six different ways to name files, three of which are wrong, and three of
which are right:

1.  file01.html
2.  vrysmpl.html
3.  verysimple.html
4.  very\_simple.html
5.  very-simple.html
6.  VerySimple.html

The first example is wrong because the name has no meaning: it tells you
nothing about the contents of the file. The second name is wrong because
it contains abbreviations. Twenty years ago developers used
abbreviations to save space on machines where memory or hard drive space
was scarce, or where operating systems did not support names with more
than 8 characters. This is no longer necessary for a variety of reasons,
and now abbreviations are merely a sign that developers are too lazy to
type out the whole word. (To every rule, there are exceptions, and there
are occasions when the code in very short methods is easier to read when
it makes use of abbreviations. But those are the exceptions to a good
rule, and there is rarely a case where any good is accomplished by
showing newcomers such shortcuts.) The third example is wrong because it
provides no means of helping the reader to separate out the face that
**verysimple** is a name consisting of two words.

The fourth example is correct, but is now considered a bit old
fashioned. Most people prefer using a dash, rather than an underscore,
because they believe it is easier to type. In either case, the basic
strategy is good, because there are no abbreviations, and the words are
cleanly separated. The whole issue of case is moot in this strategy,
since all letters are rendered in lower case. The last example is the
one I prefer, because it is most familiar to me, and I find it easier to
read a long list of names rendered in this format. It uses Pascal
casing, where multiword names are run together into one name, and each
word in the name begins with a capital letter.

NOTE: One good argument from the folks who prefer using dashes to using
Pascal casing runs as follows. Suppose you have a common acronym such as
IBM. Perhaps you have method from IBM that performs fast addition. You
would want to call this method **IBMFastAddition**. This name runs the
words IBM and Fast together into one name and thereby breaks an
important rule about clearly delineating the words in a name. I
therefore would name this method **IbmFastAddition;** now we can clearly
see that Ibm is meant to be treated as a discreet unit. In fact, I
always treat acronyms this way: I capitalize the first letter and put
the other letters in lower case. This system works, but some find it
less than optimal. If you used dashes, you could write something like
this instead: **ibm-fast-addition**. This is arguably easier to read
than the Pascal casing example. But I don't find so terribly much
difference, and sometimes I think Pascal casing is easier to read. For
instance, I think **SimpleHtmlToElvenwareConverter** is easier to read
than **simple-html-to-elvenware-converter**. But gosh, it is a silly
thing to get upset about. I distrust anyone who gets overly excited
about such issues. I think even great programmers, such as Douglas
Crockford, do little more than display their rare blind spots when they
get overly exercised over issues that so clearly are more matters of
taste than of science. In fact, I have seen people foolishly ignore
Crockfords may strengths because he is so obviously overly zealous in
this one area. He's doing more harm to himself than good by being so
narrow minded.

Ultimately, the choice you make between the last three "correct"
examples is a matter of personal taste. There are only two primary
caveats you need to keep in mind:

-   Whatever strategy you pick: stick with it! Once you have decided on
    a strategy then you, and everyone who works with you, must stick to
    that strategy in all the code you produce.
-   If you go to work for a shop that has already adopted a strategy,
    then you must happily conform with it. A good manager will work with
    you, and have patience while you come to see the error of your ways.
    Bad managers will simply make your life miserable until you either
    come to your senses or move on. In either case, there is no question
    that it is irrational and counter productive to create code that
    uses a style that does conform to the needs of the others in your
    group.

The case of a file name is one thing, but the case of formatting code in
a source file is a different matter. Almost all languages have an agreed
upon style of casing, indentation, etc. You should make a real effort to
discover the strategy for the language you are using, and to follow it
as best you can. In this document, I attempt to follow the standards for
formatting JavaScript code. With a few minor exceptions, if you see me
vary from what you consider to be the best strategy for formatting
JavaScript, then please send me email and let me know. My goal is to
conform to the standards set by the JavaScript community. If I want to
assert my individuality, I wrote prose or poetry; when I write code, I
try to conform to standards. The only case for individuality in code is
the case for writing the cleanest, easiest to understand code of any
developer on your team. There is no place for a quirky style of
capitalization or indentation.

A Simple JavaScript Development Strategy {#aSimpleJavaScriptDevelopmentStrategy}
----------------------------------------

JavaScript run in the browser has one set of rules when run in a
browser, and another set when run outside a browser. If you are using
JavaScript primarily to write client side scripts meant to be run in a
browser, then it is best to learn JavaScript, and develop JavaScript,
under that scenario. It is true that there are legitimate and important
ways to run JavaScript from outside the browser. For instance, you can
run JavaScript from the command prompt, or directly from inside some
IDEs. At first, however, such stratagems can lead to much confusion. As
a result, I suggest that you begin by developing JavaScript inside a
browser.

**NOTE**: _I should probably qualify what I say above. The basic syntax
of the language does not change when you switch from a browser to some
environment. (The only exception, of course, is when a browser has a
buggy implementation of JavaScript, and that still happens quite
frequently.) But even when everything works correctly, certain key
features of the language, such as the **this** keyword, have a
different significance inside a browser and outside a browser. Also, key
elements of the API, such as the **alert** function, are available in a
browser and not outside a browser. These and other differences become
manageable when you gain proficiency in the language, but at first, it
is best to avoid such subtle pitfalls by running JavaScript in the
environment in which you intend to use it. Of course, if you are
intending to write mostly server side JavaScript with **nodejs**, then
this advice is less convincing. I don't not think there are serious
disadvantages to learning JavaScript in a browser even if you want to
use it on the server side, but you will find that there are differences.
In general, I think it is easier to move from the browser to **nodejs**,
than it is to move from **nodejs** to the quirky world of browsers._

It turns out that the code you saw in the previous section provides a
good framework for beginning and intermediate level JavaScript
programmers who want to learn more about the langauge. Start out by
opening up code similar to what you see in Listing 3 and 4. As a matter
of fact, you can simply reuse VerySimple.html over and over again. As we
explore the JavaScript language, all you need do is change the name of
the JavaScript file that you are linking in. For instance, linking
VerySimple01.js for one program, then VerySimple02.js for the next
program. Better yet, follow best practices and rename each JavaScript
file to reflect its contents. For instance, ExploringLoops.js would be a
good name for a JavaScript file that you created when you wanted to
learn about how loops are written in JavaScript.

Before leaving the subject of how to structure your code, there is one
last subject to cover. A key tool developers use when debugging their
code, and when they are exploring JavaScript, is a call to
**console.log**:

```javascript
console.log("This is a a debug message");
```

Console.Log {#console.Log}
-----------

Suppose you are a beginning level JavaScript programmer who wants to
learn how to write a function that adds numbers. Now it is a good and
admirable thing to want to design an HTML file that will allow the user
to enter numbers, push a button, and display the result of an operation
on those numbers. However, in this life there is a time for everything,
and lets suppose that right now you don't want to focus on inputting or
displaying numbers: you just want to write a method called **add**and
see if it works. Here is how to proceed.

Begin your the same basic HTML file described above:

**Listing 05: The HTML File**

```html
<!DOCTYPE html>
<html>

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <title>Very Simple</title>  
    <script src="calculator.js" type="text/javascript"></script>
</head>

<body>    
</body>
</html>
```

As you can see, the code shown in Listing 5 is similar to the code found
in Listing 3. The only difference is that the source file linked in is
called **Calculator.js** rather than **VerySimple.js**. Here is the code
for **Calculator.js**:

 

 

Learn More {#learnMore}
----------

Here is a rendering of the hidden code that prints the first two lines
found on this page:

```html
<div>
<script type="text/javascript">
 document.writeln("<p>Hello world!</p>");
 document.writeln("<p>These lines written using JavaScript.</p>");
</script>
</div>
```

This code changes the page you are viewing by inserting two lines of
text when the document loads. Because the change occurs as the document
is first loaded, you are not aware that an action is being performed.
Nevertheless, this is a dynamic event, and not a static rendering of
text as you see in standard HTML. For a more dynamic example of how
JavaScript can change the appearance of a page, see the next section,
called Insert Adjacent HTML.

The code shown above is embedded in this document directly below the
caption that reads **JavaScript Basics**. Right click this document and
choose **View Source** to see it.

NOTE: _It is important to understand that the text you see above is not
the actual code that gets executed. The real code is inside this HTML
page, but hidden from view. Whenever you include an angle bracket: \<\>
in your HTML, then the words inside those brackets are called a tag, and
they become hidden from view when the page is rendered in a browser. In
this case, all the words between the opening \<script\> and closing
\</script\> tags are considered part of the script tag, and are hidden
from view. To show an angle bracket to the reader of an HTML page, you
write the following code: **&lt;** or **&gt;**. The first bit of code is
an open angle bracket, and the second a close angle bracket. HTML is
pretty simple and straight forward most of the time, but this is one of
those places where it can be a bit hard to understand what is going on
if you are a newcomer. Nothing will better help you grasp these concepts
than actually getting your hands dirty and writing some code. Sometimes
you can learn best by doing._

Install the JavaScript ChromeTools Debugger in Eclipse:

[HowToInstall Old Link](https://code.google.com/archive/p/chromedevtools/wikis/HowToInstall.wiki)

The Right Tools {#theRightTools}
---------------

There are some wonderful tools out there for developing big applications
with HTML and JavaScript. Three that I use frequently are
Eclipse/Aptana, Visual Studio and Expression Web. (You can substitute
DreamWeaver for Expression web if you can afford it.)

If you are writing the kind of simple program needed to follow along
with this text, however, I think it is simplest to use the following
tools:

-   notepad++
-   chrome

Hello World at the Command Prompt {#helloWorldAtTheCommandPrompt}
---------------------------------

If you want to learn JavaScript, it can be helpful to start with a
command line utility. One possible course of action is to install node,
and one scripts from the command prompt.

Also, see:

-   [http://www.phpied.com/javascript-shell-scripting/](http://www.phpied.com/javascript-shell-scripting/)

JavaScript Simple Types {#javaScriptSimpleTypes}
-----------------------

There are only five simple types. Numbers, booleans and strings are all
simple types. There are two other simple types called **null** and
**undefined.**Simple types have methods, but they are not objects.
Unlike true objects, simple types are immutable.

You can use the **typeof** to determine the type of a variable. Given
the following declaration:

```javascript
var myInt = 3;
```

Then the following would return the string **number:**

```javascript
typeof myInt; // Returns number
```

Here is another example:

```javascript
var myString = "A String";
var type = typeof myString; // Sets type = string
```

Objects
-------

You can declare an object like this:

```javascript
var myObject = {};
```

Objects can contain properties, methods and other objects. Through a
feature called a **prototype**, objects can implement inheritance.

Properties are name value pairs, where name is a string.

```javascript
var myObject = { 'myProperty': 12 };
```

TThe quotes around a property name are optional if the name is a legal
Javascript identifier:

    var myObject = { myProperty: 12 };

You can access a property with either of two notations:

    myObject.myProperty;
    myObject['myProperty'];

Though both examples are legal, the first is much more common.

[Try it.](BasicSyntax.html#sameProprties)

When you declare an object as we do myObject, you don't ever call
**new** on it.

JavaScript Functions {#javaScriptFunctions}
--------------------

In JavaScript, functions are very powerful tools. They are easy to use,
but hard to fully understand.

Obviously functions are unique in that they can be invoked, they can be
executed. At the same time, functions are like any other value in
JavaScript. In particular, functions are objects. Because functions are
just a value like any other in the language, you can do the same things
with them that you can do with a string or integer. For instance, you
can:

-   Store them in a variable
-   Put them in an **array**
-   Pass them to a **function**

Because functions are objects, you can do the same things with them that
you can do with any other object:

-   You can give them properties and methods
-   They have a constructor, which in this case is the **function**
    itself
-   They can support inheritance via the **prototype** property. We will
    discuss prototypes in more depth later on in this document.

Here is one way to write a JavaScript function:

```javascript
function Test01()
{
 var name = "Test01";
 $("#Test01").html(name);
}
```

This declaration has the following parts:

-   The keyword function
-   A name, which in this case is Test01
-   A parameter list, which in this case is empty
-   An implementation, which appears between curly braces. In this case
    we declare a variable, and then use jQuery to show its value in a
    web page.

A function can be passed parameters and can return a value:

```javascript
function multiply(a, b)
{
  return a * b;
}
```

Notice that we don't declare the types of the parameters, nor the type
of the return value. There is no type checking on these parameters. If
we omit a parameter when invoking the function then that parameter will
have the value **undefined**. If we pass in too many parameters when
calling a function, then the extra parameters will simply be ignored.

Here is a second way to declare a function. This time we will store an
anonymous function in a variable:

    var Test01 = function()
    {
     var name = "Test01";
     $("#Test01").html(name);
    }

Each function that you declare in JavaScript is an object. When you look
at the following code, you might therefore be forgiven for supposing
that **name** is a field of Test01, and that a call to print that name
would work. In fact, **name** is a private field of the object, and
therefore cannot be seen by an instance of Test01. The **description**
property, shown below, is a public member of Test01, and it will be
accessible from an instance of the object.

```javascript
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
```

When Test02 is called, the code shown above prints out the string "This
is a test object" but it does not print out the words "Test01." That is
because the property **description** is visible to an instance of
**Test01**, but the field **name** is unknown.

To make name a public field of the object, write code that qualifies the
instance of **nameStr**with the keyword **this**:

```javascript
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
```

Now the code shown above behaves as expected, and inserts both
**nameStr** and **description** into the appropriate tags in our HTML.

Like Extensions methods in C\#, you can use Prototype to change the way
existing classes work. In the following example, we will add a method
called Decorate to the built-in JavaScript String class:

```javascript
String.prototype.decorate = function() {
  return "-***-" + this + "-***-";
}
```

Now when you create a string, you can call its decorate method:

```javascript
this.testDecoration = function() {
  var testStr = "All my strings can be decorated";
  $("#testPlain").html(testStr);
  $("#testDecorate").html(testStr.decorate());
}
```

[Click here to try decorating a string](BasicSyntax.html#decorate).

Classes
-------

To the degree that we can talk coherently about classes in JavaScript,
we can do so by focusing on their prototype. All the members of a class
share the same prototype. If two objects have the same prototype, then
they are members of the same class.

Two constructors with quite different contents are nonetheless members
of the same class if they have the same prototype:

By convention, classes always begin with a capital letter, while methods
and functions begin with lower case letters.

Binding
-------

You can use bind to bind a function to an object, or rather to an
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

JavaScript Dictionaries are Associative Arrays {#javaScriptDictionariesAreAssociativeArrays}
----------------------------------------------

Debugging Strategies {#debuggingStrategies}
--------------------

All the major browsers have good debuggers in them, but I probably
prefer the one that ships with Chrome.

Load your page in the browser, and press F12 to bring up the [Chrome
Debugger and Development
Tools](https://developers.google.com/chrome-developer-tools/). If you
click around a bit, you can have the debugger in one window and your
browser in another window, which can be a good strategy.

We have talked some about debugging strategies with these tools before,
but digging into them is very wise. The **Resources page** can help you
find JavaScript or HTML files which are badly broken due to syntax
issues. The Scripts page allows you to set break points in JavaScript
files. The Elements page helps you study an HTML file.

See also these pages:

- [https://developers.google.com/chrome-developer-tools/](https://developers.google.com/chrome-developer-tools/)
- [Dev Tools on Chromium](https://www.chromium.org/devtools)

Insert Adjacent HTML {#insertAdjacentHTML}
--------------------

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

-   beforebegin
-   afterbegin
-   beforeend
-   afterend

The after and before phrases refer to after and before a tag. Suppose
you have an element like this:

    <p>This element</p>

The statement can insert text before the first \<p\> tag, after that
tag, or before the closing \<p\> tag, or after it.

If you want to learn more about the DOM, go to this page:

[Gecko Dom Reference](https://developer.mozilla.org/en/Gecko_DOM_Reference).

Here is the code for the button:

```html
<input name="insertAdjacentButton" type="button" value="Insert Adjacent Text" onclick="TestInsertAdjacent()">
```
