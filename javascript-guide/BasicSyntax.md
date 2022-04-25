---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/BasicSyntax.md
relativePath: javascript-guide/BasicSyntax.md
title: BasicSyntax
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: BasicSyntax.md
fileNameHTML: BasicSyntax.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

Basic Syntax Examples
=====================

- [View the source](/javascripts/dev-web/BasicSyntax02.js)

Selectors
---------

This example demonstrates how to write a jQuery selector that usess a
dependent class. This selector picks up a particular p that has a class
associated with it.. When you press the button below it calls
showSelector().

Show Selectors

Debug Tricks. Alert vs \#Debug
------------------------------

JavaScript comes with a handy **alert** function that pops up a dialog.
This first button shown calls the JavaScript **alert** utility. It is
convenient to use alert, but often one wants to send back complex,
length messages that don't fit in a dialog, or else one simply wants to
avoid having to click on a dialog each time a message appears. The
second button shows one simple solution.

Show Alert

Show Debug

Show Types
----------

Show Types

Show Two kinds of Properties are the same
-----------------------------------------

Click the button to see that **myObject.myProperty** and
**myObject['myPropery']** are two ways of saying the same thing.

Test Properties

View [JavaScript](/javascripts/dev-web/BasicSyntax02.js)

Call Test01

Call SayHello

Use Prototype to Extend the String Class
-----------------------------------------

Call Elvenware.testDecoration()

Call Show Properties
--------------------

One of the properties shown here is defined with a prototype.

call elvenware.showProperties()

Object Create
-------------

Create Object

The properties we create can be configurable, writable, or enumerable.
Push the button to see the values for myProperty in the following
object:

``` {.code}
var myObject = { myProperty: 12 };
```

Get Descriptor

-
-
-
-

You can discover the properties of an object by two means.

- Object.keys(myObject);
- Or you can enumerate over the properties in an object.

Here is an example:

```javascript
function getMyKeys()
{
    keys = Object.keys(myObject);
    for (var i = 0; i < keys.length; i++)
        $('#myObjectKeys').append(keys[i] + '<br>');
    for (var x in myObject)
        $('#myObjectKeys').append(x + ' = ' + myObject[x] + '<br>');
} 
```

Press the button below to execute this code.

Get Keys

Fancy Styles in a Form
----------------------

Call Elvenware.useWrite()

இ ௫ ௐ
=====

Õ » இ ✚ ✛ ✜ ✝

⧦ ⧨ ⧪ ⧬ ⧮ ⧳ ⧼

✥ ✪ ❉ ❆ ⧮ ♞ ♛

Randomize Array
---------------

Call elvenware.randomArray()
