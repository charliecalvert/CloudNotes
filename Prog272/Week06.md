Prog 272 Week 06, 2013
======================



Reply in conversations in the appropriate assignment, not just as a general
comment.

It's JavaScript first, jQuery second. jQuery is a library built on top of
JavaScript. No matter how could the library, it is the language that is primary.

Put ShowDirectories in your main object.

Working with Input and Select Controls
--------------------------------------

-   <http://localhost:1835/charlie/development/web/HtmlGuide/GettingStarted.html#input>

-   <http://localhost:1835/charlie/development/web/HtmlGuide/GettingStarted.html#select>

Variable Declarations

Regardless of where you declare a var statement, it will be moved by the
compiler to the top of the method (or scope) in which it is declared:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function run() {    var x = 0;    x = 2 + 3;    var firstName = "Tom";    var lastName = "Fielding";}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The var statements are hoisted, and this becomes:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function run() {   var x = 0;   var firstName;   var lastName;
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   x = 2 + 3;}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Globals
-------

Source from class: [ObjectVariables01.zip][1][^2]

[1]: <https://bc.instructure.com/courses/795060/files/23932861/download?wrap=1>

[^2]: <https://bc.instructure.com/courses/795060/files/23932861/download?wrap=1>

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function foo() {
   var number01 = 0;
   number02 = 0; 
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this example, number01 is not a global variable, but number02 is global. That
is, it is part of window: window.number02.

JSHint is designed to help you catch problems like this, particularly if you
turn on strict mode. In fact, in strict mode, many browsers will through a
ReferenceError if number02 is not defined.

Global Abatement
----------------

var MyApp = {};

MyApp.InitCordova = (function() { } )();

MyApp.ShowDirectories = (function() { } )();

There are also tools like AMD modules used with RequireJS or Dojo. We are not
going to cover them in this part of this course.

Separate HTML, CSS and JavaScript
---------------------------------

Reasons:

-   Separation of concerns

-   Loose coupling

If you have a JavaScript error, you want to know that the problem is in a
JavaScript file. It is simply confusing to have to look through all your code,
HTML, CSS, and JavaScript to find the error. The same rule applies to CSS and
HTML problems.

Keep HTML in HTML files and you will know where to look for solutions. This
means that we like writing code like this:

\$("#test01").addClass("green");

But we don't really like this:

\$("#test01).css( { backgroundColor: "blue" } );

If you write code like this, you are putting JavaScript in your HTML:

\<button id="myButton01" onclick="myObject.runButton01()"\>Click Me
01\</button\>

Instead, it is better to put code like this in your JavaScript file:

\$("#myButton01").click(myObject.runButton01);

Handlebars
----------

<http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#jqHandlebars>

More on ADB
-----------

You can install program, copy files, and start a shell. See here:

-   <http://www.elvenware.com/charlie/development/android/AndroidSdk.html#installAPK>

Programs to look At
-------------------

-   CordovaListDirectories

-   CordovaListDirs02

-   CordovaFileReader

-   WebFileTests

-   HandleBarDemo01

Homework - Basic File

Discuss how to create two loops.

Speed test

More on module pattern pattern

-   The book analogy

-   When writing code, structure is even more important than when creating a
    book. Code is harder to understand than text.

More on functions, methods and constructors.

More on passing functions as a parameter.  




Install Linux
-------------

-   <http://www.elvenware.com/charlie/os/linux/VirtualBox.html#server1210Install>
