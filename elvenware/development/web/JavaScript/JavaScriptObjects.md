---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptObjects.md
relativePath: elvenware/development/web/JavaScript/JavaScriptObjects.md
title: JavaScriptObjects
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

# JavaScript Objects

In this chapter we will start with a quick overview of the some built in JavaScript Objects such as Arrays. After covering the basics about these topics we will move on to our main subject, which is creating custom JavaScript Objects.

## Creating Objects {#createObjects}

You can declare an object like this:

```
var myObject = {};
```

This type of object declaration is called an **object literal**. You can compare this to using the new operator, which produces the same result:

```
var myObject = new Object();
```

When you declare an object as we do **myObject**, we usually don't call **new** on it. As discussed above, the following two statements are essentially identical:

```
var myObject = {};
var myObject = new Object();
```

However, we prefer the first as it can be faster, easier to read and requires less writing. Note, however, that using prototypes with the second option can save memory as each property or method is shared by multiple instances.

## Object Literal Syntax {#object-literal}

As you know, the simplest possible JavaScript object declared using [object literal][obj-lit] syntax looks like this:

```javascript
var myObject = {};
```

This is a slightly more complex object, again declared using object literal syntax:

```javascript
var person = {
  firstName: 'Suzie'
};
```

The object shown above is called **person**. It has one property called **firstName** of type string.

Here is a second way to declare the same object. First we create the object using object literal syntax, then we use dot notation to create the name property:

```javascript
var person = {};
person.firstName = 'Suzie';
```

As far as we are concerned at this point, there is no significant difference between these two ways of declaring an object.

This is a method that is part of an object literal:

```javascript
var person = {
    sayHello: function() {
        'use strict';
        console.log('Hello');
    }
};
```

This method is part of the **person** object but not part an object literal declaration:

```javascript
person.sayGoodbye: function() {
    'use strict';
    console.log('Goodbye');
}
```

**NOTE**: _Most properly constructed function return a value rather than simply writing something to the console. The **sayHello** method does not return a value because it is designed to be a very simple, if impractical, method._

## Function Objects

This is a function object:

```javascript
function bar() {
    var a: 1;
    function foo() {}
};
```

In this chapter we are not concerned with this kind of object. See the [JavaScript Functions][elf-jf] chapter for details on that subject.

## The new Operator {#new-operator}

As mentioned above, we should prefer object literals to the **new** operator. For instance:

| Preferred             | Not Preferred |
| --------------------- | ----------------------------------- |
| **var** myArray = []  | **var** myArray = new Array() |
| **var** myObject = {} | **var** myObject = new Object() |
| **var** myNumber = 3  | **var** myNumber = new Number(3) |
| **var** myStr = 'Arf' | **var** myStr = new String('arf') |
| **var** myBool = true | **var** myBool = new Boolean(false) |
| ===================== | =================================== |

Crockford covers this issue in Appendix B of **JavaScript, the Good Parts**. He writes:

> JavaScript has a set of typed wrappers. For example:

> **new Boolean(false)**

> produces an object that has a valueOf method that returns the wrapped value. This turns out to be completely unnecessary and occasionally confusing.

> Don't use **new Boolean** or **new Number** or **new String**.

> Also avoid **new Object** and **new Array**. Use **{}** and **[]** instead.

Crockford's Appendix B is on the web [here][app-b-crock].

Having said all this, I still do use **new** in one or two cases. In particular, I most often use **new** when creating my own objects using the module pattern.

This gets tricky, because Crockford follows up the text I quote above with advice that appears to say we should not use **new** even to create our own objects. I don't think that is what he meant to say, or if he did mean to say it, I don't agree. Much of the best code I've seen uses **new** when creating custom objects.

**NOTE**: _I'm not saying that all custom objects, such as though shown above in the [Object Literal](#object-literal) section, need be created with **new**. However, as you will see in the chapter on the [module pattern][mod-pat], there are times when you should use the **new** operator with **constructor** objects. In those cases, the **new** operator is the right solution._

Just to be clear, I agree with all I have quoted from Crockford above about **Boolean**, **Array**, **Number**, and **String**. And for creating empty **Objects**. Don't use **new** with them. But using **Constructor** objects and **new**, particularly in the module pattern, is a good idea. It brings many benefits, including help with the **this** operator.

**NOTE**: _The confusion that often springs up around **Constructor** objects and the **new** keyword is a major reason to move to ES6 and its **class** syntax. I am, in fact, moving to ES6 in most of my new code. Unfortunately, that is not yet reflected in this documentation._

## Properties and Methods

The next two section briefly outline properties and methods. Once you have had a glimpse of the basic syntax, I will circle back around and discuss both properties and methods in more depth.

- [Properties in Depth](#properties)
- [Methods](#methods)

## Property Introduction {#propIntro}

Inside the curly braces of your object literal you can define your object. Objects are merely a list of name:value pairs:

```
var myObject = {
    a: 1,
    b: 2,
    c: 'three'
};
```

Each name:value pair shown in the above example is called a property. In the first example, **a** is the property name, and **1** is the property value.

## Method Introduction {#methodIntroduction}

Here is how to add a method to your object:

```
var myObject = {
    a: 1,
    b: 2,
    c: 'three',
    four: function() {}
};
```

Note that this function is just another key:value, or name:value pair:

```
name | value
four | function() {}
```

Besides properties and methods, objects can also contain other objects. Through a feature called a **prototype**, objects can implement inheritance.

Unless you specify otherwise, JavaScript objects can be modified at any time. In particular, anyone who can execute code in your runtime can add or delete methods or properties. EcmaScript 5 provides means of making objects immune to this kind of manipulation.

## Properties {#properties}

As stated above, properties are name value pairs, where name is a string.

```
var myObject = { 'myProperty': 12 };
```

The above code declares a simple object with a single property called **myProperty**. The value of **myProperty** is twelve. We talk of properties of this type as being key:value pairs. The **key** is **myProperty** and the **value** is **12**.

The quotes around a property name are optional if the name is a legal Javascript identifier:

```
var myObject = { myProperty: 12 };
```

You can access a property with either of two notations:

```
myObject.myProperty;
myObject['myProperty'];
```

You can then treat the property as you would explect. Here I try to run through the common permutations for accessing **myProperty**.

```
var myObject = {
    myProperty : 12
};

console.log(myObject.myProperty);
console.log(myObject["myProperty"])

myObject['myProperty'] = 3;
var valueA = myObject.myProperty;
console.log(valueA);

myObject.myProperty = 5;
var valueB = myObject['myProperty'];
console.log(valueB);
```

This syntax is less than ideal, however, since we are repeating the string _myProperty_ multiple times. A useful solution would look like this:

```
var myObject = {
    myProperty : 12
};

var myProperty = "myProperty";

console.log(myObject.myProperty);
console.log(myObject[myProperty]);

myObject[myProperty] = 3;
var valueA = myObject.myProperty;
console.log(valueA);

myObject.myProperty = 5;
var valueB = myObject[myProperty];
console.log(valueB);
```

I hesitated to show you this second solution as the first take because you might get confused by the expression **myObject[myProperty]**. In this code **myProperty** refers to the string declared near the top of the listing. Hungarian notation is usually not useful in JavaScript, but if we bring it back for a moment, our code would look like this:

```
var myObject = {
    myProperty : 12
};

var myPropertyStr = "myProperty";

console.log(myObject.myProperty);
console.log(myObject[myPropertyStr]);

myObject[myPropertyStr] = 3;
var valueA = myObject.myProperty;
console.log(valueA);

myObject.myProperty = 5;
var valueB = myObject[myPropertyStr];
console.log(valueB);
```

Notice that we now declare the string that represents the name of our property like this:

var myPropertyStr = "myProperty";

Hopefully that makes code like the following easier to read:

```
var myPropertyStr = "myProperty";

console.log(myObject.myProperty);
console.log(myObject[myPropertyStr]);
```

In any case, regardless of which permuation of the program you use, the output looks like this:

```
>node index.js
12
12
3
5
```

- [The source is in JsObjects][obj-name-value]

Though both examples are legal, the first is much more common.

[Try it.](BasicSyntax.html#sameProprties)

## Objects with Multiple Properties {#multipleProperties}

To declare an object with multiple properties, separate them with commas:

```
var myObject = {    
    myProperty01: 12,
    myProperty02: 4                   
};
```

Here is a JavaScript object with three properties, one of which is a function:

```
var myObject = {    
    myProperty01: 12,
    myProperty02: 4,
    myFunction: function() {
        return this.myProperty01 + this.myProperty02;
    }                   
};
```

If you have more than one function, separate them with commas:

```
var myObject = {    
    myProperty01: 12,
    myProperty02: 4,
    addProperties: function() {
        return this.myProperty01 + this.myProperty02;
    },
    multiplyProperties: function() {
        return this.myProperty01 * this.myProperty02;
    }                   
};

console.log(myObject.multiplyProperties());
```

Note that we call the function **multiplyProperties** by writing:

```
myObject.multiplyProperties()
```

In this case, it yields the result **48**, as shown in the program from JsObjects called ObjectDemo01:

- [ObjectDemo01][obj-demo-01]

**Note** We use the keyword **var** when declaring **myObject** but not when we declare **myProperty01** or **addProperties**. This can be confusing to newcomers, but the rule is simple and relatively reasonable: the properties of an object are not declared with **var**.

## Declare Dynamic Properties Outside the Object Literal {#outside}

We can create an object using object literal syntax, then add properties and methods to it using dot notation:

```javascript
var myObject = {};

myObject.name = 'Sarah';

myObject.add = function(operatorA, operatorB) {
  return operatorA + operatorB;
}
```

The point here is that we usually can, at any time, add methods and properties to an existing JavaScript. This makes the language extremely flexible, but can also sometimes introduce code that the original developer had not anticipated. It is possible to prevent this with the JavaScript [Object.freeze][ofrez] method, but it is not widely used.

[ofrez]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

## Enumerating Properties

There are several ways to get a list of the properties on an object. Consider this object:

```
var myObject = {
    myProperty01 : 12,
    myProperty02 : 4,
    addProperties : function() {'use strict';
        return this.myProperty01 + this.myProperty02;
    },
    multiplyProperties : function() {'use strict';
        return this.myProperty01 * this.myProperty02;
    }
};
```

We can get the list of properties on the object:

```
var keys = Object.keys(myObject);
```

The call to **Object.keys** returns a list of all the properties on **myObject**. As a result, **keys** now has the following properties:

```
["myProperty01", "myProperty02", "addProperties", "multiplyProperties"]
```

We can also do this:

```
for (property in myObject) {
    display(property);
};
```

The for loop shown above yields the following output.

```
myProperty01
myProperty02
addProperties
multiplyProperties
```

Because the world is a fussy place, it is usually considered best to do the following:

```
for (property in myObject) {
    if (myObject.hasOwnProperty(property)) {
        display(property);
    }
};
```

If you **use strict** then it is an error to omit the **if** clause. The **hasOwnProperty** method returns only properties declared on an object, and not those properties inherited by an object. For instance, **hasOwnProperty** returns true for **myProperty01** but false for the inherited **toString** property. The object actually has both properties, but of the two, only **myProperty01** is an **own** property. And yes, **own** is a technical term.

Interestingly, and somewhat mysteriously from my point of view, our for loop returns the same output whether or not I call **hasOwnProperty**.

## Property Attributes

Each property can be, in some circumstances:

- Enumerable (Can be discovered by enumeration with **for x in obj**)
- Configurable (Can be deleted)
- Writable (ReadWrite vs ReadOnly)

You can use getOwnPropertyDescriptor to explore the attributes of a property:

```
Object.getOwnPropertyDescriptor([object Name], [property Name])
```

For example:

```
Object.getOwnPropertyDescriptor(myObject, propName);
```

To see the method in action, let's return to this simple object:

```
var myObject = {
        myProperty01: 12,
        myProperty02: 4,
        addProperties: function() {
            'use strict';
            return this.myProperty01 + this.myProperty02;
        },
        multiplyProperties: function() {
            'use strict';
            return this.myProperty01 * this.myProperty02;
        }    
    };
```

Let's create a simple method that will display some text both in an HTML page and at the console:

```
var display = function(value) {
        console.log(value);
        $("#debug").append('<li>' + value + '</li>');
    };
```

Now let's explore the descriptor for each of myObject's properties:

```
var getPropertyDescriptor = function(propName) {
        var descriptor = Object.getOwnPropertyDescriptor(myObject, propName);
        var description = JSON.stringify(descriptor);
        display(description);
    };

    var getPropertyIsEnumerable = function(propName) {
        var isEnumerable = myObject.propertyIsEnumerable(propName) ? "true" : "false";
        display("enumerable: " + isEnumerable);
    };

    $(document).ready(function() {
        display(myObject.multiplyProperties());
        var keys = Object.keys(myObject);
        for (var i = 0; i < keys.length; i++) {
            var propName = keys[i];
            display(propName);
            getPropertyDescriptor(propName);
            getPropertyIsEnumerable(propName);
        }
    });
```

Notice how we get the list of properties on the object:

```
var keys = Object.keys(myObject);
```

The call to **Object.keys** returns a list of all the properties on **myObject**.

The key call here is to **getOwnPropertyDescriptor**. However, I also call **propertyIsEnumerable** just so you can see that the method is available. Here is the output:

```
48
myProperty01
    {"value":12,"writable":true,"enumerable":true,"configurable":true}
    enumerable: true
myProperty02
    {"value":4,"writable":true,"enumerable":true,"configurable":true}
    enumerable: true
addProperties
    {"writable":true,"enumerable":true,"configurable":true}
    enumerable: true
multiplyProperties
    {"writable":true,"enumerable":true,"configurable":true}
    enumerable: true
```

This example is [available in JsObjects][addpropdesc].

## DefineProperty

The **defineProperty** method is a fancy version of a standard JavaScript property. Here is what we normally do:

```
foo.myProperty = 3;
```

By using **defineProperty** we get what we have above, plus some additional features such as **eumerable** and **configurable**. You can also make a property read only.

Here is how to expose a readonly property called **length**:

```
function SimpleQueue() {
    dataStore = [];

    Object.defineProperty(this, "length", {
        get: function() {
                return dataStore.length;
            },
            enumerable: true,
            configurable: true
    });

        SimpleQueue.prototype.enqueue = function() {
        etc...
```

After adding the **length** property, you can now access it in your tests like this:

var len = simpleQueue.length;<br>
for (var i = 0; i < len; i++) { simpleQueue.dequeue(); }

In the code shown above, we use a relatively new feature of JavaScript called a [property][defprop]. There are several ways to use properties. In this case we define a read-only property implemented primarily in the **get** function. If you want to jump ahead and see what else can be done, you can visit the [Properties][props] folder in JsObjects.

By the way, the code shown above works exactly the same way if you are using the Modular pattern:

```
var SimpleQueue = (function() {

    var dataStore = null;

    function SimpleQueue() {
        dataStore = [];

        Object.defineProperty(this, "length", {
            get: function() {
                return dataStore.length;
            },
            enumerable: true,
            configurable: true
        });
    }

    SimpleQueue.prototype.enqueue = function() {
    etc...
```

My tests look exactly the same whether I use a standard constructor function or the modular pattern. Though we normally try to avoid **this**, creating properties in a constructor is one place where it is relatively safe to use **this**.)

In a queue, there are other places, such as **back** and **front**, where you could use properties. Doing so is optional, but if you want to learn a little more now, rather than later, then go ahead....

Newcomers to JavaScript: Don't worry too much about the Modular pattern unless you are comfortable with it. The main thing for you here is that there are several tips as to how to put together your **queue** class.

## Methods

A more indepth discussion of methods will be added here in the future.

## Use Strict and Methods

In the following example, we add the words 'use strict'; to a function:

```
var myObject = {    
    myProperty01: 12,
    myProperty02: 4,
    myFunction: function() {
        'use strict';
        return this.myProperty01 + this.myProperty02;
    }                   
};
```

This object has two properties and one function. The function adds the two properties together and returns the result.

By adding 'use strict' we force the JavaScript language to reject some coding conventions that worked in the past. The general idea is to remove features from the language that have not proved to be useful. If you define strict, then any attempt to use those features will raise an error. In the future, it is likely that strict will be turned on by default. Strict goes a long way toward mitigating some of the most egregious problems inherent in the poorly designed JavaScript architecture.

In particular, it used to be legal to declare a variable without using the keyword **var**:

```
myVariable = 3; // Bad
  var myVariable = 3; // Good
```

Omitting **var** will throw an error when **strict** is turned on. This and other features of **strict** are designed to keep you from accessing the global object unnecessarily.

Strict mode also throws exceptions in cases that would otherwise fail silently. For instance, if you try to change a property that has its writable attribute set to false.

Strict will also usually keep you from using **eval** or even including the word in your code.

Another old JavaScript feature that goes away in strict mode is **with**.

Here are some other, less important, benefits of strict mode:

- It introduces some optimizations
- It prevents you from employing syntax that is likely to conflict with a future version of the language that has not been implemented yet.

## Public and Private Variables

Here are a few comments on public and private variables in objects:

```
var Point = function (x1, y1) {
    'use strict';

    // Private variables
    var x = x1;
    var y = y1;

    // private method
    function bar() { return "Snake"; };

    // public methods
    this.hiss = function () { return "Hiss " + bar(); };
    this.add = function () {
        return x + y;
    };

};

// Public method

window.onload = function () {
    'use strict';
    var el = document.getElementById('content');
    var el2 = document.getElementById('content2');
    var point = new Point(3, 4);    
    el.innerHTML = point.add();    
    el2.innerHTML = point.hiss();
};
```

In this code x and y are private variables. Here is how the code would look if we wanted to work with public variables:

```
var Point = function (x1, y1) {
    'use strict';

    // Public variables
    this.x = x1;
    this.y = y1;

    // private method
    function bar() { return "Snake"; };

    // public methods
    this.hiss = function () { return "Hiss " + bar(); };
    this.add = function () {
        return this.x + this.y;
    };

};

window.onload = function () {
    'use strict';
    var el = document.getElementById('content');
    var el2 = document.getElementById('content2');
    var point = new Point(3, 4);
    alert(point.x);
    el.innerHTML = point.add();    
    el2.innerHTML = point.hiss();
};
```

Notice that in this new version, we had to change the add function to use this.x and this.y rather than the bare x and y. We can further modify the code to declare the **add** method using prototype:

```
var Point = function (x1, y1) {
    'use strict';

    // Public variables
    this.x = x1;
    this.y = y1;

    // private method
    function bar() { return "Snake"; };

    // public methods
    this.hiss = function () { return "Hiss " + bar(); }

};

// Public method
Point.prototype.add = function () {
    'use strict';
    return this.x + this.y;
};

window.onload = function () {
    'use strict';
    var el = document.getElementById('content');
    var el2 = document.getElementById('content2');
    var point = new Point(3, 4);    
    el.innerHTML = point.add();    
    el2.innerHTML = point.hiss();
};
```

This would not have worked had the variables x and y been private. In that case, the add method would not have been able to access the private variables x and y. It can, however, access the public properties this.x and this.y.

## Share Data Between Objects

Suppose you have two variables called playerX and playerY that you want two objects to share. One way to handle the situation is to declare a single object with two properties called **playerX** and **playerY**. You can then share the object between the two objects. Changes made to the shared object will be seen by both objects that share the data.

Consider this object:

```
ELF.own.Player = (function() {
    'use strict';
    var that = {};
    that.playerX = 1;
    that.playerY = 2;

    // Constructor
    function Player() {
        new ELF.own.ShowPlayer(that);
        $('#buttonChangePlayer').click(changePlayer);
    }

    var changePlayer = function() {
        that.playerX += 1;
        that.playerY += 2;
    };

    return Player;
})();
```

And here is the object that wants to consume playerX and playerY:

```
var ELF = {};
ELF.own = {};

ELF.own.ShowPlayer = (function() { 'use strict';

    var sharedData = null;

    function ShowPlayer(initData) {
        sharedData = initData;
        $('#buttonShowPlayer').click(showPlayerXY);
    }

    var showPlayerXY = function() {
        $('#test01').html('X = ' + sharedData.playerX + ' Y = ' + sharedData.playerY);
    };

    return ShowPlayer;
})();
```

In the first object I declare the data to be shared:

```
var that = {};
    that.playerX = 1;
    that.playerY = 2;
```

Then I share the data with the second object when the second object is created:

```
new ELF.own.ShowPlayer(that);
```

You can make the variable passed to the second object global within that second object:

```
var sharedData = null;

    // Constructor
    function ShowPlayer(initData) {
        sharedData = initData;
    }
```

Now any changes made to that.playerX by either object will be seen by both objects. In other words, it is passed by reference, not by value. The method that changes the data is called **changePlayer**, and the method that detects the change is called **showPlayerXY**.

To see this in practice, look at:

```
/JsObjects/JavaScripts/Objects/ShareVariables01
```

## Object Maps

After all our talk about if..else and **switch** statements it is worth noting that JavaScript provides a third mechanism that is arguable a much better solution to this kind of problem. Consider the following example:

```
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

In this code we create a small object called stateMap. We can then pull out the value we want by simply writing the following simple expression:

```
stateMap[stateAbbreviation]
```

If, for instance, stateAbbreviation were equal to 'WA', then this expression would return 6830038\. This code is concise, easy to read, and it performs well.

Note that you could perform more complex operations by setting up an object that contains functions:

```
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

This makes the solution _functionally_ equivalent to a switch statement, since each option can consist of a series of statements. For instance you could write something like this:

```
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

```
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

It's really just a question of when you want the function to execute. The first case saves you a bit of code, but it is arguable going to a bit hard for some people to read.

The example program is on GitHub, in JsObjects:

[JsObjects/JavaScript/Syntax/Branching01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/Branching01)

## Sorting

Here is code for sorting an array called **presidents** by first name:

```
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

## Dictionaries {#dictionaries}

JavaScript Dictionaries are Associative Arrays. JavaScript objects are a comma separated list of key value pairs:

```
var myObject = {
    a: 1,
    b: 2,
    c: 'three'
};
```

The begin with an open curly brace and end with a close curly brace and a semicolon.

In myObject, **a**, **b** and **c** are all **keys** and **1**, **2** and **'three'** are **values**.

If a **value** is a function then we call it a method:

```
var objectWithMethod = {
    a: 1,
    b: 2,
    getThree: function() {
        return 3;
    }
};
```

## Class Basics {#class-basics}

Before ES6, where was no such thing as a JavaScript class. Instead, JavaScript had objects. It is only a quite recently development that has allowed us to declare classes for our JavaScript object.

```JavaScript
class Person {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getName() {
        return this.firstName + ' ' + this.lastName;
    }

    sayName() {
        console.log('SAY NAME:', this.firstName, this.lastName);
    }

}

const person = new Person('George', 'Washington');
console.log('GET NAME:', person.getName());
person.sayName();
```

Here we declare a constructor and pass in two parameters to it:

```javascript
constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
```

We then create two properties of the object:

1. this.firstName
2. this.lastName

And we assign them to the parameters that are passed in:

```javascript
this.firstName = firstName;
this.lastName = lastName;
```

The compiler has no trouble distinguishing the parameters (firstName) from the properties of the object (this.firstName).

We pass in the arguments to the constructor when we instantiate an instance of the class:

```JavaScript
const person = new Person('George', 'Washington');
```

In the **constructor**, **George** becomes **firstName**, and **Washington** becomes **lastName**.

Before ES6, to the degree that we could talk coherently about classes in JavaScript, we did so by focusing on their prototype. All the members of a JavaScript object can share the same prototype. If two objects have the same prototype, then they are members of the same "class".

By convention, **classes** and **functions** that need to be called with the **new** operator begin with a capital letter, while methods and functions begin with lower case letters if we don't need to call them with **new**.

Link to [Working code][wccc].

## Classes and Method Declarations {#class-method-declaration}

**getName** and **sayName** are simple enough to understand. But note that we declare a method in a class:

```javascript
class MyClass {
    myMethod() { }
}

const myClass = new MyClass();
```

This code doesn't do anything, I'm just trying to strip the syntax down to the barest of bare bones so you can see how to declare a method in a class.

Here is slightly more complex example:

```JavaScript
class GetNumbers {
    getOne() { return 1 }
    getTwo() { return 2 }
}

const getNumbers = new GetNumbers();
console.log('getOne + getTwo = ', getNumbers.getOne() + getNumbers.getTwo());
```

Again, it doesn't do anything terribly interesting, but it shows how elegant and terse JavaScript classes can be.

Link to [Working code][wccc].

## Dynamic Class Methods {#dynamic-class-method}

Use the **prototype** property if you want to add a method to class dynamically.

```JavaScript
class GetNumbers {
    getOne() { return 1 }
    getTwo() { return 2 }
}

GetNumbers.prototype.getThree = function() { return 3 };

const getNumbers = new GetNumbers();
console.log('getOne + getTwo = ', getNumbers.getOne() + getNumbers.getTwo());
console.log('getOne + getThree = ', getNumbers.getOne() + getNumbers.getThree());
```

## Other Bits about Objects and Constructors

Two constructors with quite different contents are nonetheless members of the same class if they have the same prototype. (Example needed. Did I lose it, I thought I had one?)


## Links

A surprising amount of my work is making sure that I am teaching you things that matter, that are used widely and are likely to be used widely in the future. Once you start digging into this world, you will find that things like git, express, node, WebStorm, the bash shell, Jade (or at least various forms of HTML templates), are all used a lot. They are mainstream technologies in the web world.

One of the best ways to stay current is to follow the leaders in this world. They include:

- [Addy Osmani](http://addyosmani.com/blog/)
- [John Resig](http://ejohn.org/)
- Almost anyone who [SuperHeroes](http://superherojs.com/) links to.
- Yahuda Katz
- [Crockford](http://javascript.crockford.com/)
- [Nicholas Zachas](http://www.nczonline.net/)

And many more. Of course, they will not always agree with me. That would not be possible, especially in a world that is changing so fast. But if you read what those folks say and think, then you can't go too far wrong. It is still an artform to choose what is best when top folks like that disagree, but even if they pick wrong in terms of where we are headed, they still pick smart.

And of course Anders Helsberg's TypeScript is important, as is everything that Anders has done, from Pascal, to Delphi to C#.

<!--       -->
<!-- links -->
<!--       -->

[addpropdesc]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Objects/ObjectDemo01/ObjectDemo01.js
[app-b-crock]: http://archive.oreilly.com/pub/a/javascript/excerpts/javascript-good-parts/bad-parts.html
[defprop]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
[elf-jf]: /javascript-guide/JavaScriptFunctions.html
[obj-lit]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals
[props]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Properties

[obj-name-value]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Objects/ObjectNameValue

[mod-pat]:http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html

[obj-demo-01]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Objects/ObjectDemo01
[wccc]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/EcmaScript6/Class
