---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests/index.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests
fileName: index.md
relativePath: /web/UnitTests/index.md
title: index
directoryName: UnitTests
category : cssguide-guide
---

## Overview

Working with Unit Tests and testing.

Examples
--------

Click the links below to see a unit test in action.

-   [Basics](Basics.html)
-   [Jasmine](Jasmine.html)
-   [Mocha](Mocha.html)
-   [TestCanvasCode](TestCanvasCode.html)
-   [Grunt](Grunt.html)
-   [Karma](Karma.html)
-   [Protractor](Protractor.html);
-   [Puppeteer Basics](Puppeteer.html)
-   [Types of Assertions](#types_of_assertions)
-   [Async and Ajax Tests](#async)

The code shown here depends on QUnit. You can download the source here:

- [http://docs.jquery.com/QUnit](http://docs.jquery.com/QUnit)

Jasmine
-------

This is the unit testing framework we will use with **AngularJs**

- [Jasmine Github Home page](https://github.com/jasmine/jasmine)
- Install Jasmine: **npm install --save-dev jasmine**
- Install Jasmine Node: **npm install -g jasmine-node**
- git clone https://github.com/jasmine/jasmine.git

Karma
-----

Karma is a wrapper around unit testing frameworks. It helps automate
the way we run our tests. It is commonly used with AngularJs. It
once had a name so absurd that I refuse to repeat it here. The name
change is fairly recent, so you may find references to the old name
here and there.

To install Karma:

	npm install -g karma

Test from command line to see if it is installed:

```bash
>karma --version
Karma version: 0.10.2
```

Structure
---------

Whether you are using qUnit, Jasmine, or some other library, the
basic structure of your program stays the same. Sometimes naming
conventions change. For instance, Jasmine prefers the word Spec
rather than test, but the basic structure does not change.

Suppose we have four files in our project:

* index.html
* index.js
* TestIndex.js
* TestIndex.html


Now which html files link in which JavaScript files? Put your code
together with a structure like this:

- The file **index.html** links in **index.js**
- Then **TestIndex.html** links in both **index.js** and **TestIndex.js**, plus your unit test library.

There is no duplication of code. The code to be tested appears only
in **index.js**. There is no need to copy it to another location.

I'll give a moderately more complex example. The names I
supply are meant to be generic, and not to apply to a particular
project. In other words, you might not call a file **MyObject01.js**,
by something more specific, like **Calculator.js**:

- **index.html**: This file is for the end user and has no tests in it.
- **MyObject01.js**: One JavaScript object used by **index.html**
- **MyObject02.js**: A second JavaScript object used by **index.html**
- **TestMyObject01.html**: Run tests for **MyObject01.js**
- **TestMyObject02.html**: Run tests for **MyObject02.js**
- **TestMyObject01.js**: Tests for **MyObject01.js**
- **TestMyObject02.js**: Tests for **MyObject02.js**

Both **index.html** and **TestMyObject01.html**
should link in **MyObject01.js**. While **TestMyObject01.html**
should also link in **TestMyObject01.js**:

- index.html
	- MyObject01.js

- TestMyObject01.html
	- MyObject01.js
	- TestMyObject.js

It is **TestMyObject01.html** and **TestMyObject02.html** that
contain the links to the Jasmine files in your Library directory.

There is a school of thought that says that unit tests should be
called **specs**, since they double as specifications for your
objects. If you want to call the files MyObject01Spec.html, or
MyObject01.spec.html** instead of TestMyObject01.html, then that is
fine, but I am not yet totally onboard with this second naming
convention, though it is common in the Jasmine world.


The Code
--------

The HTML shown below hosts a unit testing framework called QUnit. which
is designed to help you test your JavaScript. It works just like an
other unit testing framework, but some of the syntax is a bit unique due
to the advanced use of makes of some rather esoteric JavaScript
features.

Note that they code includes both **qunit.js** and **qunit.css**. You
can download these files form the QUnit site:

-   [http://docs.jquery.com/QUnit](http://docs.jquery.com/QUnit)

In the code shown here, note the inclusion of tags with id's that follow
the pattern qunit-XXX. For instance, you can find qunit-fixture,
qunit-header, etc. This code provides that hooks that qunit uses when it
displays the results of a test. QUnit does what any other unit testing
framework does: it calls your methods and gives you a chance to confirm
that they behave as expected. In addition, QUnit also reports the
results of these tests in an HTML file. The code below is an example of
such a file, the qunit\_XXX hooks are the controls that get filled in
with the reports on the results of your tests. To get a better idea of
how it works, run one of the examples linked in the previous section.

```html
<!DOCTYPE html>
<html>

<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <title>QUnit Unit Test Basics</title>
  <script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>
  <link rel="stylesheet" href="../../../libs/qunit/qunit.css" type="text/css" />
  <script type="text/javascript" src="../../../libs/qunit/qunit.js"></script>
  <script type="text/javascript" src="../Scripts/testCode.js"></script>
</head>

<body>
  <div id="qunit-fixture">
    Dependencies here
  </div>


    <div id="qunit"></div>
    <div id="qunit-fixture"></div>


  <div>
    <input type="button" value="Run Test" onclick="runTests()" />
  </div>
</body>
</html>
```

The most important element is qunit-banner. This is the element that is
lit up with either green, if the test succeeds, or red, if it fails.
Note that there is a control to display there user agent.

Instead of the two \<DIV\> blocks with the ID of QUnit and
QUnit-Fixture, you can use an alternative technique not used very often
any longer:

```html
<h1 id="qunit-header">Using QUnit</h1>
<h2 id="qunit-banner"></h2>
<h2 id="qunit-userAgent"></h2>
<ol id="qunit-tests"></ol>
```

The first technique, however, is better and provides support for more
features in most cases. Just to be clear, it looks like this:

```html
<div id="qunit"></div>
<div id="qunit-fixture"></div>
```

And here is some JavaScript for testCode.js. This is the code where the
actual unit test resides. In particular, if you click the button defined
in the HTML shown above, then the JavaScript runTest() function is
called.

```javascript
function runTest()
{
    module("Basic Unit Test");

    test("Division", function () {
        var actual = add(3, 7);
        var expected = 10;
        equals(actual, expected,
        'Expected 2 as the result, result was: ' + add(4, 2));
    });


    test("Trial", function () {
        equals(2, 2, 'Is two equal to 2');
    });
}

function add(a,b)
{
    return a + b;
}

// Imitate C# string formatting (from StackOverflow)
String.prototype.format = function()
{
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number)
    {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};
```

Let's take a look at one of the tests:

```javascript
test("Trial", function () {
    equals(2, 2, 'Is two equal to 2');
});
```

We signal that we want to execute a unit test by calling qunit **test** function:

```javascript
test();
```

We pass in two parameters. The first is the name we want to give to this
particular test:

```javascript
test("Trial", ...);
```

The second parameter is a callback inside of which we will run our test:

```javascript
test("Trial", function () { ... });
```

There are a series of qunit assertions with names like **equal** or **ok**
that we can use to run our actual test. In this code, we test to make sure
that two equals two:

```javascript
test("Trial", function () {
    equals(2, 2);
});
```

Finally, if we wish, we can include a string that can be displayed when the test
is run to explain what success or failure for the test actually means.

```javascript
test("Trial", function () {
    equals(2, 2, 'Is two equal to 2');
});
```

The bit about [modules](http://docs.jquery.com/QUnit/module) is a way to
group tests into categories. If you look at the output for basics tests,
you will see the string "Basic Unit Test." This is there because we
include it in a **module** statement in function **runTest**:

```javascript
module("Basic Unit Test");
```

Types of Assertions {#types_of_assertions}
-------------------

The following assertions are available:

-   equal
-   ok
-   throws
-   notEqual
-   deepEqual
-   notDeepEqual
-   strictEqual
-   notStrictEqual

More information is available here:

[Qunit Docs](https://api.qunitjs.com/assert/)

Async Tests {#async}
-----------

Here is some simple code for running Ajax tests. This code uses the
qunit **asyncTest** method. The document ready method is used to call
the test twice, once with a valid URL, and once with an invalid URL.
Note that we call the qunit **start()** method after the callback is
called:

```javascript
$('document').ready(function()
{
    ajaxTestGood("/cgi-bin/SimpleXml.py");
    ajaxTestGood("/cgi-bin/NoGood.py");
});

function ajaxTestGood(url)
{
    asyncTest("ajaxTestGood", function() {
        $.ajax(
        {
            type: "GET",
            url: url,
            dataType: "xml",
            cache: 'False',
            success: function (xml)
            {       
                ok(true, url);
                start();
            },
            error:  function(request, ajaxOptions, thrownError)
            {
                ok(false, url);
                start();
            }
        });
    });
}
```

Here is the **wrong way** to write a test:

```javascript
$('document').ready(function()
{
    ajaxTestBad();
    $('#debug').append('<li>Document Ready Called</li>');
});

function ajaxTestBad()
{
    test("Bad Ajax!", function() {
        $('#debug').append('<li>Bar Test called</li>');
        $.ajax(
        {
            type: "GET",
            url: "/cgi-bin/SimpleXmla.py",
            dataType: "xml",
            cache: 'False',
            success: function (xml)
            {       
                $('#debug').append('<li>Success</li>');
                ok(true);
            },
            error:  function(request, ajaxOptions, thrownError)
            {
                $('#debug').append('<li>Failure</li>');
                ok(false);
            }
        });
    });
}
```

The problem with above code is that we are not using asyncTest, or,
alternatively, calling a series of stop and start statements. Because we
don't make those calls, this code may sometimes report success even when
the test fails.

This has nothing to do with its problems, but note that as a bonus, this
code assumes that there is a UL element in the HTML where we can post
little debug statements. Writing debug statements like this can be
useful, and perhaps I should not have combined an example of using them
with code that is clearly labeled as the wrong way to do something. The
problem here is not the debug statements, which can be useful, it is the
missing call to asyncTest that is causing problems. There are strategies
you can employ to make code like this work, but the best solution is to
use asyncTest.

-   [AsyncTest](http://docs.jquery.com/QUnit/asyncTest#nameexpectedtest)
-   [stop](http://docs.jquery.com/QUnit/stop)
-   [start](http://docs.jquery.com/QUnit/start)

This page is broken at this time:

- [TestAjax.html](https://www.example.com)

### Callbacks and Async Test

Callbacks can be combined with calls to **asyncTest** to give you some
powerful testing capabilities.

An **asyncTest** is just like a regular call to **test** that starts with
a call to **stop()** and that then calls **start()** when you are ready to
result. The call to **stop** puts the qunit testing system on hold until a
callback or other asyncrhonous event completes. Then you can call **start**
to get things moving again. **asyncTest** makes this process simpler by
calling **stop** for you. Now all you need to is call **start** once the
asynchronous process has completed and you are ready to proceed.

In this call I use **asyncTest** rather than **test.** At the same time, I
pass in an anonymous function which is the callback:

```javascript
asyncTest("testTwo", function() {    
   testDisplay.showDebugTest("Test Two started");
   presidents.getPresidents(function() {
       testDisplay.showDebugTest("Test Two Callback");
       len = testDisplay.rowData.length;
       ok(len > 0, "Len was: " + len);
       start();
       testDisplay.showDebugTest("Test restarted");
   });
});
```

Then in **getPresidents**, I make use of the anonymous function as a
callback:

```javascript
Presidents.prototype.getPresidents = function(callback) {
   that.clearResponse("Get Presidents called");
   presidentMode=true;    
   request = $.ajax(
   {
       type: "get",
       url: '/history',
       cache: false,
       dataType: "json",
       success: function (data) {
           $(data).each(function() {
               $(this).each(function() {
                   display.displayRow(this);    
               });                
           });
           $("input[name=responseGroup]:radio").click(that.radioSelection);
           $("input[name=responseGroup]:radio:first").attr('checked', true);
           that.radioSelection();
           if (typeof(callback) == 'function') {
               display.showDebug("Callback coming");
               callback();
           }
       },
       error: display.showError
   });
};
```

Notice that the callback is only called if it is actually passed in:

```javascript
if (typeof(callback) == 'function') {
     display.showDebug("Callback coming");
       callback();
}
```

If the argument is not passed in, then the call is never made. If it is
present, which it will be during the tests, then it executes and the
test is executed:

```javascript
len = testDisplay.rowData.length;
ok(len > 0, "Len was: " + len);
start();
```

Notice the call to **start**. This is necessary because the test was
temporarily halted waiting for the callback to execute. Once it
executes, then we must start the test machinery running once more, which
we do by calling **start**().

Private Methods
---------------

Should we test private methods? One traditional answer is that we test only
public functions (Name.prototype.whatever).

However, qunit is very flexible, and it is possible to test private
functions without too much fuss. One solution is shown below. Suppose
you have a private method called **getRoll** that returns a number between
1 and 100. You want to write a test that proves that the results it
returns are between 1 and 100. You can add a public method that contains
a unit test to the class:

```javascript
ELF.own.Scores = (function() {
	'use strict';

	function Scores() {
	}

	var getRoll = function() {
		return Math.floor(Math.random() * 100) + 1;
	};

	Scores.prototype.unitTests = function() {
		test("ScoresUnitTests", function() {
			var actual = getRoll();
			ok(actual < 101 && actual > 0, "Get Roll in range");
		});
	}

	return Scores;
}());
```

Then in the unit test code youcan call your unit test:

```javascript
function myTests() {'use strict';

	module("Normal test");

	asyncTest("Test01", function() {
		ok(1 === 1);
	});

	module("Private test");

	var privateTest = function() {
		var testScore = new ELF.own.Scores();
 		testScore.unitTests();
	};

	privateTest();
}
```


This would be a way to run one or more tests of private methods inside an
object. Clearly we are inserting code into the object that would not be used
in a shipping product. Using Templates we could have a version of our code
that had such methods, and other versions which did not.

In general, the subject of unit testing private methods is an area of
controversy. For instance, the whole point of private methods is that they
can change when you need to change them. If you start testing them, aren't
you just locking something in place that should be fluid? The controversy
can be found nearly everywhere unit testing is discussed.

Mocha and Unit Tests with Node
------------------------------

You can use a tool called [Mocha](https://github.com/mochajs/mocha) to
run tests with node. This enables us to run tests from the command line
without using qunit and a browser. It is not that Mocha is better or worse
than qUnit, it is simply an alternative to qUnit.

	npm install -g mocha

The above command installs mocha in a globally available folder. Now you don't
have to worry about running npm install mocha each time you use it. When using
some libraries global npm installs are not a good idea, and in some cases it
is optional. But with Mocha, you should use the -g (global) install option.

Now create a directory called test:

	mkdir test

Inside that directory, create a file called **test.js** with the following,
hello world style, code:

```javascript
var assert = require("assert");

describe("Test01", function() {
	it ("Is 3 equal to 3",  function() {
		assert.equal(3, 3);
	});
});
```

To run the test, just type **mocha** from inside the test folder.

- [Mocha on Github](https://github.com/mochajs/mocha)
