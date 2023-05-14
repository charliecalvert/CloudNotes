---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptModules.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
fileName: JavaScriptModules.md
relativePath: /web/JavaScript/JavaScriptModules.md
title: JavaScriptModules
directoryName: JavaScript
category : cssguide-guide
---

# JavaScript Modules

This document covers the JavaScript Module Pattern

When in doubt, go back to the [index](index.html).

## Related Pages

- [Basic Objects][basic-objects]
- [Compare Object Functions][compare-func]

[basic-objects]:JavaScriptObjects.html
[compare-func]:JavaScriptFunctions.html#compareObjFunc

There are many different ways to write JavaScript. Most of them are
either outright wrong, or less than optimal. There is more than one way
to write good JavaScript code. However, I think there is one commonly
used pattern that you should use as your default style. It is called the
Module Pattern.

Part I {#partI}
------

Here is an example of a simple implementation of the Module Pattern that
can serve as a basic starting point for all JavaScript files that you
create:

```javascript
var MyObject = (function() {
    'use strict';

    function MyObject() {
        // Add constructor code here
    }

    MyObject.prototype.run = function () {
        // Add your program code here
    };      

    return MyObject;
})();

// This will be called when page is ready
$(document).ready(function() {
    'use strict';

    var myObject = new MyObject();
    myObject.run();
});
```
Here is the HTML you can use with a JavaScript file like the one shown
above:

```xml
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>JavaScript00 Sample</title>
        <script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>
        <script src="JavaScriptBasics01.js" type="text/javascript"></script>
    </head>
    <body>
        <h1>This is my JavaScript Module Pattern Test Page</h1>
    </body>
</html>
```

Here is a simple way to think about the transformation that takes place
when we move from a simple JavaScript object to one that is more
complex. Here is a simple JavaScript object:

```javascript
var myApp = {
    property1: 0,
    property2: 1,
    function1: function() {},
    function2: function() {}
};
```

If you want to use this object, you might right something like this:

```javascript
myApp.function1();
myApp.property1 = 3;
```
Here is the same object using the Modular pattern:

```javascript
var MyApp = (function myFunction() {'use strict';

    var property1 = 0;
    var property2 = 1;

    function MyApp() { }

    MyApp.prototype.function1 = function() { };

    var function2 = function() { };

    return MyApp;
})();

var myApp = new MyApp();
myApp.function1();             
```

Notice that when using the modular pattern we:

-   Call new (that is, we create a constructor)
-   We can't directly access the private properties
-   We use the prototype syntax to create a public method.

Part II {#partII}
-------

Here is a more complete example of the JavaScript module pattern: 

```javascript
var Point = (function() {
    'use strict';

    // Private variables
    var x = 0;
    var y = 0;

    // Private function
    var bar = function () { return 25; };

    // Constructor
    function Point(x1, y1) {
        x = x1;
        y = y1;
    }    

    // Public method
    Point.prototype.add = function () {
        return x + y + bar();
    };      

    return Point;
}());

window.onload = function() {
    'use strict';

    var el = document.getElementById('content');    
    var point = new Point(3, 4);      
    el.innerHTML =  point.add(); // Print 32    
};
```

Notice that the entire method is wrapped in parenthesis:

```javascript
var Point = (function() {
  //Code omitted here
}());
```
For now, let's call this section of syntax the "wrapping function." The
parenthesis around the *wrapping function* are simply a means of reminding us that we are creating a wrapping function. By putting an open parenthesis at the start, we signal to ourselves that a wrapping function is about to be declared. Then we can scan down for the closing parens and its accompanying function call: ());

In this example, **x**, **y** and **bar**() are all part of the
**Closure**. When you are thinking about the closure, forget the
*wrapping function*. Focus only on the Point method, which is our
constructor. The code between it and the wrapping method is all part of
a closure. In other words, the method **Point** (our constructor) has access
to **x**, **y** and **bar()** because they are a part of closure. That is the way
closures work: a method has access to the variables and functions
immediately outside the area where it is invoked.

The closure is the function **Point** and the variables around it that it "remembers". It can access these variables even after the wrapping function has finished executing. The wrapping function is the actual owner of variables like X and Y:

```javascript
var Point = (function() {
    'use strict';

    // Private variables
    var x = 0;
    var y = 0;

    // Code omitted here
})(); // End of wrapping function
```

X and Y belong to our anonymous wrapping function. They belong to the function assigned to the variable Point in the above code fragment. But here, the closure, our **Point** constructor, can "remember" them even though the wrapping function goes out of scope after wrapping function finishes executing. You would think that x and y are gone. Have been cleaned up by the garbage collector and left this fleeting world. But it is not so. They live on because they are caught in the constructor's closure.

To create a rather silly analogy, a closure is a like a backpack that our constructor or other functions can carry in order to remember the variables that surround them, even if the function that "owns" those variables has gone out of scope. It's like an inventory in an RPG game. It is a set of tools that the function can access. I don't necessarily mean to imply that this would be a good way to implement an inventory in an RPG game, only that the function is like the character, and the variables caught in its closure are like its inventory. Its a bag of tricks it can access and carry with it, even when it leaves its home function.

The variables x and y are private. Had they been declared like this,
they would have been public:

```javascript
this.x = 1;
```

Consider this function

```javascript
var bar = function () { return 25; };
```

This is an anonymous functions assigned to the variable bar. You can
invoke the function immediately if you wish:

```javascript
var bar = function() { return 25; }();
```

In this code we are not assigning a function object to a variable.
Instead we are assigning the result of the function, which is 25, to the
variable.

The problem with this syntax is that it does not tell us that we are
invoking the method instead of returning it until we get to the very end
of the statement. In a long method that can be quite a distance.  As a
result, we have adopted the following convention:

    var bar = (function() { return 25; })();

Here the parenthesis around the anonymous function tells us right at the
start that we are going to invoke the function. This is a convention,
not a rule. We don't have to have the outer parenthesis but we are
better off if we do, and JSHint will catch us out if we don't include
it. Here is a simple example that illustrates the entire point:

```javascript
    var functionObject = function() {
        return 1;
    };

    var simpleValue = (function() {
        return 2;
    })();

    $(document).ready(function() {
        $("#functionObject").html(functionObject());
        $("#simpleValue").html(simpleValue);        
    });
```

Notice that we execute **functionObject(),** while we treat
**simpleValue** as the simple **number** type that it is:

    ...html(functionObject());
    ...html(simpleValue);

In our module pattern, however, we don't return a simple value, we
return a function, which is a constructor because we call new on it:

    function Point(x1, y1) {
            x = x1;
            y = y1;
    }    

    return Point;

... // Code omitted here

    var point = new Point(3, 4);

But what we get back is not just the function **Point,** but the entire
closure, which includes **x**, **y** and **bar**(). The reason we like
this pattern, however, is because the *wrapping function* forms a
barrier between the closure and the global name space. So we get a fully
protected functional object, with public methods that use prototype, and
private methods and variables that are part of the closure, and none of
it leaks into the global namespace!

Part III {#partIII}
--------

Now let's add a static method:

```javascript
var Point = (function() {
    'use strict';

    // Private variables
    var x = 0;
    var y = 0;

    // Private function
    var bar = function () { return 25; };

    // Constructor
    function Point(x1, y1) {
        x = x1;
        y = y1;
    }    

    // Public static
    Point.hiss = function() {
        return "Hiss";
    };

    // Public method
    Point.prototype.add = function () {
        return x + y + bar();
    };      

    return Point;
})();

window.onload = function() {
    'use strict';
    var el = document.getElementById('content');
    var el2 = document.getElementById('content2');
    var point = new Point(3, 4);      
    el.innerHTML =  point.add(); // Print 32
    el2.innerHTML = Point.hiss();
};
```

Note that we Point.hiss, not point.hiss(). This is because hiss() is
static.

Get the Source: [Point03.zip][point03]

[point03]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/downloads/Point03.zip

Cannot Read Property Prototype of Undefined {#proto}
-------------------------------------------

The "cannot read property 'prototype' of undefined" usually occurs if
you forget to declare a constructor for your object.

Suppose your module pattern object is supposed to look like this:

```javascript
var MyFunction04 = (function() {
    'use strict';

    var field01 = 0;
    var field02 = 0;

    // Constructor
    function MyFunction04(initField01, initField02) {
        field01 = initField01;
        field02 = initField02;
    }

    MyFunction04.prototype.nestedFunction = function() {
        return field01 + field02;
    };

    return MyFunction04; // Return constructor
}());
```

But by mistake, you forgot to declare the constructor:

```javascript
    var MyFunction04 = (function() {
        'use strict';

        var field01 = 0;
        var field02 = 0;

        // Somethings missing here abouts....

        MyFunction04.prototype.nestedFunction = function() {
            return field01 + field02;
        };    

        return MyFunction04;
    }());
```

Then in that case you will get the error you are getting.

So you need to be sure to follow this kind of pattern:

```javascript
var App = (function() {

    // Don't forget the constructor!
   function App() { }

    return App;
})();
```

Thoughts on Private and Public Methods and the Module Pattern
-------------------------------------------------------------

Some half formed thoughts on public and private methods.

When we use prototype, we create public methods:

	Bar.prototype.goober() = function()

When we use var foo = function() we create private methods:

	var foo = function() {}

To call a private method from a public method, just call it by name:

	foo();

When we call public methods from public methods use this:

	this.goober();

There is no simple way to call a public method from a private method using
our module pattern. Sometimes I create a private method and wrap
calls to in a public method:

```javascript
var App = (function() {
  function App() {}

   var privateBar = function() {
      // Implement Bar here
   };

  App.prototype.Bar = function() {
     privateBar();
  }

  var foo = function() {
     privateBar();
  }

  return App;
})();
```

With the system shown above we can call privateBar from either a public
function or a private function, thus exposing it to other objects but still
making it easily accessible to private methods in our class.

## Module Basics

Simplified modular pattern:

```javascript
var MyObject1 = (function() {
     function MyObject2() { }

     return MyObject2;
}());
```

The modular pattern is interested in the **MyObject2** constructor, which is what it returns. As a result MyObject1 ends up being assigned the value **MyObject2**, which is a constructor.

Since MyOjbect2 is a function constructor, it will not work properly unless you call new on it. It doesn't fail to work entirely if you don't call new. It just won't work properly. In particular, it will have no prototype. Without a properly initialized prototype object, then MyObject2 will not work properly. For instance, the method called runReader won't work. Other methods, such as parse() will work since they don't depend on the prototype. But in some cases it will be hard to get at the parse() method, but you do provide an event registration event that references it, and so that part of your code will work.

References
----------

-  [JavaScript Modules: A Beginners Guide][js-mod-begin]
-  [Elvenware Objects][elf-objects]
-  [Elvenware Basics Compare Object Functions][compfunc]
-  [http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth][adequate]
-  [http://stackoverflow.com/questions/1114024/constructors-in-javascript-objects][construct]
-  [http://addyosmani.com/resources/essentialjsdesignpatterns/book/\#designpatternsjavascript][addyo]

[elf-objects]: /javascript-guide/JavaScriptBasics.html#objects
[compfunc]: /javascript-guide/JavaScriptBasics.html#compareObjFunc
[adequate]: http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
[construct]: http://stackoverflow.com/questions/1114024/constructors-in-javascript-objects
[addyo]: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#designpatternsjavascript
[js-mod-begin]: https://www.google.com/search?q=javascript-modules-a-beginner%27s-guide
