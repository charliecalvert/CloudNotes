Basic Syntax Examples
=====================

-   [View the source](/javascripts/dev-web/BasicSyntax02.js)

Selectors
---------

This example demonstrates how to write a jQuery selector that usess a
dependent class. This selector picks up a particular p that has a class
associated with it.. When you press the button below it calls
showSelector().

 {#bar}

Show Selectors

Debug Tricks. Alert vs \#Debug {#simpleButtonClick}
------------------------------

JavaScript comes with a handy **alert** function that pops up a dialog.
This first button shown calls the JavaScript **alert** utility. It is
convenient to use alert, but often one wants to send back complex,
length messages that don't fit in a dialog, or else one simply wants to
avoid having to click on a dialog each time a message appears. The
second button shows one simple solution.

Show Alert

Show Debug

Show Types {#showTypes}
----------

Show Types

Show Two kinds of Properties are the same {#sameProperties}
-----------------------------------------

Click the button to see that **myObject.myProperty** and
**myObject['myPropery']** are two ways of saying the same thing.

Test Properties

View [JavaScript](/javascripts/dev-web/BasicSyntax02.js)

Call Test01

 

Call SayHello

 

 Use Prototype to Extend the String Class {#decorate}
-----------------------------------------

Call Elvenware.testDecoration()

 

 

Call Show Properties
--------------------

One of the properties shown here is defined with a prototype.

call elvenware.showProperties()

 

 

Object Create {#create}
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

-   Object.keys(myObject);
-   Or you can enumerate over the properties in an object.

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

 

Fancy Styles in a Form {#fancy}
----------------------

Call Elvenware.useWrite()

இ ௫ ௐ
=====

Õ » இ ✚ ✛ ✜ ✝

⧦ ⧨ ⧪ ⧬ ⧮ ⧳ ⧼

✥ ✪ ❉ ❆ ⧮ ♞ ♛

Randomize Array {#randomArray}
---------------

Call elvenware.randomArray()
