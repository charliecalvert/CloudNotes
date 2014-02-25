## Prog 272 Week 06, 2014

toc

## Overview

This week we want to focus on:

- [Modular Pattern](http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html)
- Express routes
- Node Modules (require)
- Markdown
- Storing Markdown in MongoDB
- jQuery selectors

Programs to look At
-------------------

For parsing HTML

- [DocParse01](https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/DocParse01)
- [DocParse02](https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/DocParse02)

For working with modules:

- [NodeModules](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeModules)
- [NodeRoutes01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes01)
- [NodeRoutes02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes02)

For working with Routes:

- [NodeRoutes01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes01)
- [NodeRoutes02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes02)

Globals
-------

    function foo() {
      var number01 = 0;
      number02 = 0; 
    }


In this example, number01 is not a global variable, but number02 is global. That
is, it is part of window: window.number02.

JSHint is designed to help you catch problems like this, particularly if you
turn on strict mode. In fact, in strict mode, many browsers will through a
ReferenceError if number02 is not defined.

Module Pattern
--------------

The module pattern pattern

-   The book analogy
-   When writing code, structure is even more important than when creating a
    book. Code is harder to understand than text.

More on functions, methods and constructors.

More on passing functions as a parameter.  

Global Abatement
----------------

    var MyApp = {};
    MyApp.InitCordova = (function() { } )();
    MyApp.ShowDirectories = (function() { } )();

There are also tools like AMD modules used with RequireJS or Dojo. We are not
going to cover them in this part of this course.

MongoDb Notes
------------

These are all on [Elvenware](http://elvenware.com/charlie/development/database/NoSql/MongoDb.html)

- [Stop, start and restart MongoDb](http://elvenware.com/charlie/development/database/NoSql/MongoDb.html#stopStart)
- [MongoDb won't start](http://elvenware.com/charlie/development/database/NoSql/MongoDb.html#noStart)
- [MongoDb Help on Elvenware](http://elvenware.com/charlie/development/database/NoSql/MongoDb.html#mongoHelp)

Notes
-----

Reply in conversations in the appropriate assignment, not just as a general
comment.

It's JavaScript first, jQuery second. jQuery is a library built on top of
JavaScript. No matter how good the library, it is the language that is primary.

Working with Input and Select Controls
--------------------------------------

-   <http://localhost:1835/charlie/development/web/HtmlGuide/GettingStarted.html#input>
-   <http://localhost:1835/charlie/development/web/HtmlGuide/GettingStarted.html#select>

Variable Declarations
---------------------

Regardless of where you declare a var statement, it will be moved by the
compiler to the top of the method (or scope) in which it is declared:

    function run() {    
        var x = 0;    
        x = 2 + 3;    
        var firstName = "Tom";    
        var lastName = "Fielding";
    }

The var statements are hoisted, and this becomes:

    function run() {   
        var x = 0;   
        var firstName;   
        var lastName;
        x = 2 + 3;
    }




Separate HTML, CSS and JavaScript
---------------------------------

We want to be sure to put:

- HTML in HTML files
- CSS in CSS files
- JavaScript in JavaScript files

A few additional details are found here:

- [Details](http://elvenware.com/charlie/development/web/HtmlGuide/GettingStarted.html#seperateConcerns)

## More on ADB


We generally use ADB to connect to our AndroidX86 instances:

	adb connect 192.168.XX.XX
	
However, you can use ADB for a lot more than just establishing a 
connection. For instance, ou can install a compiled Android program 
(an APK), you can copy files to your device, and start a shell session
on the device. That is like opening the commannd prompt on the
device, but you can do it from the Windows command prompt. For more
details, see here:

- <http://www.elvenware.com/charlie/development/android/AndroidSdk.html#installAPK>


Install Linux
-------------

Just a reminder that there is some information here on installing Linux. 
This is just an fyi, just information that you might find useful:

-   <http://www.elvenware.com/charlie/os/linux/VirtualBox.html#server1210Install>

Links
-----

Nothing you have to do here, these are just links you might be interested
in seeing:

- [CodeProject Web Mailing](http://www.codeproject.com/script/Mailouts/View.aspx?mlid=10668&_z=1516867)


> Written in part with [StackEdit](https://stackedit.io/).
