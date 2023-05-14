---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptPatterns.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
fileName: JavaScriptPatterns.md
relativePath: /web/JavaScript/JavaScriptPatterns.md
title: JavaScriptPatterns
directoryName: JavaScript
category : cssguide-guide
---

## Overview

Defining responsibilities is the key step in software development. We use objects, modules, patterns and methods to separate the tasks our software performs, and to link these tasks to one another as loosely as possible.

Patterns help you:

- Create objects (Factory)
- Structure your code and design objects (Bridge)
- Allow objects to communicate (PubSub)

Seen another way, they:

- Help you solve common problems that all developers encounter frequently
- Structure your code so that it is modular and loosely coupled
- Write code that is easy to understand and easy to maintain

At first, the best approach is often to:

- Write tests defining what you want your code to do
- Write code that enables your tests to pass
- Refactor your code so that it is loosely coupled, modular, easy to maintain, and easy to understand.

It is in that last step that patterns come into play. Code that works is often code that is very hard to understand and maintain. We use patterns to get a higher level, more abstract view of the code we write. It is hard to understand a long list of detailed information. it is easier to understand a set of broad abstractions, each of which effectively encapsulates a chunk of functionality in our program.

To more directly answer your question:

- When we see ourselves creating object, then use the factory pattern or a similar pattern to manage that creation
-  When we see ourselves creating a set of objects that need to communicate with one another, then:
- Use something like the bridge pattern to find the structure for the objects
- A pattern like PubSub, Observer, or Visitor to get them effectively communicate with one another.

It takes time to get good at working with patterns. The more you understand them, the easier it is to create robust programs that are easy to maintain.

Patterns can make it easy to do something difficult. In our course, we found a way to add new types of objects to our program by stringing together a series of patterns. In the end we could add a new object (PictureObject, DocumentObject, JsonFileObject) to our program with only a few lines of code. It isn't quite true that we automated the process, but we made it so simple that anyone who understood the system could add and view a new type in just a few minutes. We took a tangled mess and made it something clean and simple. That is what patterns are all about.

## Core Principles

In any new class we create, we adhere to core principles:

- Separation of Concerns
- Loose Coupling and Strong Cohesion
- The Open Closed Principle
- SRP: Single Responsibility Principle. Each class will have one purpose and one reason to change
- TDD: Test Driven Development
- DRY: Don't Repeat Yourself. Always review your code, looking for parallel sections. If you see two blocks of code that are essentially the same, then merge them into one block of code, and pass in a parameters or implement some other means of sorting out any minor differences there might be between the original two blocks of code.
- The [Dependency Inversion Principle](http://www.oodesign.com/dependency-inversion-principle.html)
  - Place an interface between high level and low level classes so they don't depend directly on one another.
- Working Software is the measure of Progress. Don't plan ten steps into the future. Just write the code that works now, and make it as clean and simple as possible.

The rules are simple. We use our patterns and adhere to them as closely as possible, if we can't do that, we create simple classes that adhere to DRY and SRP.

## Singleton

The Singleton should be used whenever we have an object that should only be created once.

**Case One**: If you have a series of Address objects, each of which contains a firstName and lastName field, then that would not be a good candidate for a singleton, since you probably want to track a list of addresses, and not a single address.

**Case Two**: If, on the other hand, you are creating a Factory or a JsonReader, you only need and want one instance of that object. The first Factory you create can create all the objects you will need. Having a second instance of it probably won't cause any serious harm, but it will take up extra memory, and do nothing that the first instance of the object could not do by itself. So in the interest of saving memory, and saving the tiny amount of time involved in create a new instance, we make it a singleton. Then our app will have a smaller memory footprint and one will run some tiny bit faster.

**Case Three**: You want to track a set of configuration variables, such as the folder from which you read initialization files, or the name of the current user. If you have created two instances of that object, then update only one of them, your app could read the wrong one, and try to work with the wrong directory or user name. But by making the object a singleton, you can be sure that if you update its state, all objects that use the configuration object will get the same data, and see the same updates.

There are probably other reasons to use the Singleton, but the two listed above are two of the most important.

## Bridge Pattern

The bridge pattern provides a link between you main program and a set of related objects. It is designed to allow you to modify the pattern

## Factories

Don't make too big a mystery out of factories. We normally write:

   var jsonReader = new JsonReader();

With a factory, we do much the same thing, except we write something similar to this:

   var jsonReader = myFactory.create({ objectType: 'JsonReader' });

The point is we:

- Give the factory the responsibility for calling new on the JsonReader, or doing any other necessary setup.
- Provide a single point of change for the way we manage objects. If we change the way JsonReader is created, we only have to change one place in our code, even if we call myFactory.create({ objectType: 'JsonReader' }) in fifteen different places.

## About factories.

Patterns are fundamentally different from most of the things we learn about programming. They are about how to architect a program, not how to make it work.

We learn about loops, branching and function calls because they are, in effect, the only way to accomplish certain tasks. In fact, you can do all the same things with goto statements, but we decided long ago that goto was evil, and that we should use functions, loops, etc, instead.

At any rate, we tend to see things like switch statements, if statements, while statements, for blocks, functions, even objects, as the building blocks out of which we create programs. Take those tools away, and we would tend to say: "But wait, I can't write code without those tools. They are necessities."

Patterns are not like that. Patterns don't add new or necessary functionality to our code: They help us organize our code. Most of us reach the stage in program development where we can get a program up and running using the basic tools mentioned above: loops, branches, functions and objects. But what happens in many cases, is that a program reaches a point where it becomes so complex that we can no longer understand our own code. We can get everything to compile, all the syntax is clean, and in a sense everything works, but when we try to add a new feature, or fix a bug, something funny happens: we fix one bug only to find that our fix breaks something else. So we fix that second bug, only to find that something else stops working, and then we can't find what went wrong. We use patterns to help us avoid these kinds of problems.

Patterns become useful at the second stage of development in programmer's career: after we know the basic syntax of the language, but before we see how to create robust programs that are relatively easy to maintain.

The factory pattern is designed to help with a series of problems that can occur around object creation. These are the kinds of problems that cause unexpected, and often hard to solve, bugs in our programs. Resolving the problem is not about syntax, it is not that we don't understand how constructors and the new operator work, it is that we have used our knowledge of that syntax to create a tangled mess that is hard to understand.

**Issue One**:  One object relies on another object. To create a bird object, we need the wing, beak and webbed feet objects. Suppose we have to create the bird object 267 times in our program. That means we have to first create a wing object, then a beak object, then a webbed feet object. Then we can create the bird object. Doing this 267 times is error prone in the extreme. So we create a factory, and ask it for the bird object. It creates all the sub-parts and then hands us back a bird. (https://stackoverflow.com/a/2430719/253576)

**Issue two**: We designed a shape object that can be a circle, triangle, rectangle, polygon or square. We use parameters to sort out which object is which. But suddenly you find that sometimes the system doesn't work right, and you are mixing up your triangles and circles, and your polygons and rectangles. You might find that a factory can help you sort all this out. There was nothing wrong with the constructors for the circle and triangle objects, it was just calling them properly that was error prone. So we use a factory clean up the mess.

**Issue Three**: Sorting out different types of objects with parameters works, but it makes your code hard to read. For instance, the first example might create a bird that does fly, and the second a bird that does not fly (a penguin):

    var falcon = new Bird(true);
    var penguin  = new Bird(false);

That's all well and good, and but what does true and false mean? Isn't this clearer:

    var falcon = new BirdFactory('FlyingBird');
    var falcon = new BirdFactory('FlightlessBird');

This kind of factory can also be more expressive than the boolean based alternatives shown above:

    var penguin = Bird.flightless();
    var currentTime = DataTime.now();

**Issue Four**: You create an object 450 times in your program, then decide you need to change the parameter list. It can, in some cases, be simpler to make the change in one place inside a factory, rather than in 450 scattered constructors.

## Bridges and Factories Together

The basic rules in our class look like this:

- Whenever you need to create an object, use a Factory.
- When you want to promote loose coupling, and allow objects to evolve separately from the main program, and be easier to test, then use Bridge.

If you need to create a **Bridge**, use a **Factory**. If you need to create a **Reader**, use a **Factory**.

If you want to make sure that your **Reader** and your main program don't become too dependent on one another, don't become too closely attached, then use the Bridge pattern.

![BridgeFactory](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/BridgeReaderSecondClassDiagram.png)

In the diagram shown above, notice that the core program uses **Factories** to create both **Bridges** and **Readers**. It then uses the **Bridge** to create buffer zone between the main program and the Core. **Control** actually owns **Factories**, and it uses the **Factory** to create a **Reader**, but it then passes the actual control of the **Reader** to the **Bridge**. "I wash my hands of this object," Control says. "I care only about the **Bridge** object. I don't really know anything at all about **Readers**."

##Details

Our goal is to create abstractions that make it easier for us to think about the structure of our application, easier to maintain our program, and easier to test our program. By creating a [bridge][wiki-bridge] [factory][2] and a reader factory, we provide developers with an easy way to think about how to create objects: just ask the appropriate factory for the object. Which factory? Well, if you need a BridgeReader, then ask the BridgeReaderFactory! All the details about how the object is created, what modules (files) it relies on, and how often it is created, are encapsulated in the object. (We use requirejs to encapsulate the act of pulling in the right files. We don't have to guess which ones to include in our HTML, the factory automatically pulls in the right files. And it does so only when they are needed.)

The simplest way to get starting traveling from here to Washington DC is just to head out the door and start walking east. For the first hours, I can feel very smug about how much progress I've made. The dummy who wanted to first get money from the bank, pack his bags, arrange transportation to the airport, and buy an airplane ticked, is still sitting back in his room. He hasn't even left his office yet, and look: I'm already 5 miles closer to Washington! Then we learn that the guy back in the office has to wait until 9 PM **the next day** before his flight leaves! Why, I'll be a full 20 miles down the road by then! And by gosh, he's wasting even more time booking hotel rooms, and researching restaurants! What a dummy! He'll never get on the road! I'll be so in Washington DC before he even gets started! And hey -- oh what was that? A rain drop. It's starting to rain. And its getting dark! Well, I'll have to get some shelter here. Where's a hotel? I don't think there's any up ahead. But I did pass one back about three miles. And then it really starts to pour, so I start running back to the hotel. And when I get there, it turns out that it's all booked for the night. Now what am I going to do? Then the next day, about the time my clothes start to dry out after having spent the night under an underpass, I hear an airplane go by over head. I'm a whole 25 miles closer to Washington DC, but I think he's on that plane and going to be there in five hours! What happened to my great head start? Maybe my short cut wasn't really a short cut after all!

My point, of course, is that it seems like a lot of work to set up our programs properly. But in the long run, it saves time. To set them up properly, we need to:

Learn how the language really works, rather than just figuring out the fastest way to cobble some code together. If we want to write our programs the right way, we need to know a callback from a closure, an object literal from a constructor object.

To learn how to write tests so that we can prove our objects work, and so we can refactor them when necessary
Learn patterns so we can structure our program properly so that they are not fragile, rigid, repetitive, overly complex apps that are incapable of change.

In this particular case, by creating a BridgeReaderFactory and a ReaderFactory, we learning how to do several things:

- Write modules that encapsulate functionality in one place. In this case, we encapsulate a factory in a factory module.
- Each module is a discreet entity that does not clutter the global namespace.
- Create objects that are loosely coupled. We don't create the object directly, the factory creates the object. That way we isolate our program from the details of how objects are created, allowing ourselves to change the objects when and if we need to do so. We can change how the factory creates objects without having to change the logic in our main program. We can ask the factory to create a different object by simply changing one word in our program. We don't manipulate our JsonReader directly, we form a bridge to it, and bridge handles the details. If we need a new object, we just ask the bridge to use a markdown reader instead of a JsonReader, or to swap out the SpaceyJsonReader for a PracticalJSonReader. Our app doesn't need to change, because the details are abstracted by the bridge object.
- Design objects that do one thing well: in this case our factory is designed to creates objects. Rather than having a method that creates objects and reads and writes JSON files, we create one module that creates objects, one that forms a bridge to the objects that read and write JSON, a module that reads and writes JSON, and one that simply asks the objects to do their jobs. That latter object, of course, is the main program. It's very clean, and very loosely coupled.
- Write objects arranged in modules so that we can test and refactor the objects, and decouple them from the project if we want to try a different approach. We can test them to prove they work, we can replace them if need be, and we can safely refactor them because our tests will show where our refactoring broke our code, if it did break our code.

When we are done, we can make very simple statements:

- How do I create a BridgeReader and what files do I need to include to make that happen? Easy: **Just ask the BridgeReaderFactory to do it**. It will create the object, and it will use RequireJs to automatically pull in all the files needed to use the object.
- What does a BridgeReaderFactory do? **It creates BridgeReaders**. You don't even really need to write much documentation. The object does one thing, and it does it well. It practices SRP: The Single Responsibility Principle! Just hearing its name is enough to understand what it does. So long as you have the background to understand the factory and bridge pattern. But if you know those patterns, you will know what BridgeReaderFactory does by just hearing its name. You don't even have to know if its written JavaScript, C#, C++, Python or Scala. Just know the patterns and you automatically know a good deal about how the program is structured!

It's Agile Software development:

- [Agile Manifest](http://agilemanifesto.org/)
- [Agile Principles](http://agilemanifesto.org/principles.html)

## Other Patterns:

- [DoFactory](http://www.dofactory.com/javascript-patterns.aspx)
- [Osmani](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)


- Facade in Queue Simple
- Factory in Factory*
- Decorator in Decorator and Bridge
- Bridge in BridgeSailor
- Singleton in Singleton

  [wiki-bridge]: http://en.wikipedia.org/wiki/Bridge_pattern
  [2]: http://en.wikipedia.org/wiki/Factory_%28object-oriented_programming%29

## Publish and Subscribe

The goal of this pattern is to allow you to call code in a module without having to know the name of the module, and without having to have a reference to it. This pattern promotes loose coupling.

Cowboy Ben Almon's TinyPubSub:

```
(function($) {
	'use strict';
	var o = $({});
	$.subscribe = function() {
		o.on.apply(o, arguments);
	};

	$.unsubscribe = function() {
		o.off.apply(o, arguments);
	};

	$.publish = function() {
		o.trigger.apply(o, arguments);
	};
}(jQuery));
```

Below you can see how to subscribe to an event using TinyPubSub. This kind of method could be put in a constructor:

```
$.subscribe('debugDetail', listenForDebugDetailEvent);
```

Then create a method that will be called when the event is triggered:

```
function listenForDebugDetailEvent(event, customMessage) {
	console.log(event);
}
```

Here is how to publish (trigger) an event using TinyPubSub:

```
$.publish('debugDetail', 'Publishing privateMethod.');
```

When the above line of code is executed, then the **listenForDebugDetailEvent** method will be called. Here, for instance, is a method that will trigger the event:

```
var triggerDebugDetailEvent = function() {
	$.publish('debugDetail', 'Publishing privateMethod.');
};
```

For a working example, see [PubSubTopic04 on Elvenware][ps04].

[ps04]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/PubSubTopic04

## Refactoring and Patterns

We are trying to reduce our code to a series of patterns, and to make sure each pattern is clean. In doing so, we adhere to the SRP, "every class has but one reason to change."

Often the only way to reach this goal is to frequently refactory our code. When adding a new feature, we sometimes "corrupt" our code by inserting code into an object or module where it does not belong. Seeing the mistake, we might clean up the current module by moving the code to a new location. We sometimes then find that the code does not really belong in its new location either, and so we move it a second time.

When we refactor our code multiple times like that, what are we doing? We first get our code to work, then refactor. Frequently we have to refactor multiple times to ensure that we followed the guidelines for our patterns as closely as possible.

We should always obey the canonical patterns as defined by the community as closely as possible, and when we don't follow them, we should start refactoring until we do follow them.

When working with backbone or angular, we don't go in and change the way they implemented the factory pattern just to suit our needs. We don't do that because we don't want to risk changing a big code base like angular for fear of breaking it, and for fear that we then won't be able to accept updates.

Though the incentives not to change our own implementations of patterns is not as strong, we should exercise the same discipline when we write the factory or bridge patterns ourselves. Just implement the bridge or factory as it should be implemented, and then leave it alone.

Ideally we can write all our code inside the core patterns: observer, factory, reader, bridge, singleton, modular and decorator. But if we can't, then we don't let that be a reason to corrupt the existing patterns we are using, instead we create classes that isolate, and simplify any code that we can't wedge into a pattern. (Of course, we can also look for other patterns that might solve our problem.)


## Why We like Patterns

We like these patterns for these reasons:

- Factory: To create objects cleanly in one place and to make sure they are set up fully by the time we see them.
- Bridge: To create loose coupling, or in the canonical words from the community: "decouple an abstraction from its implementation so that the two can vary independently". The abstraction in our case is the reader, and the implementation is JsonReader or MarkdownReader. The two things that vary independently is the reader itself, and the decorated bridge. (Perhaps one solution to your problem is to have the decorator in FancyBridge do the extra things that you want to do...?)
- Singleton: Ensure that a particular class can only be created once
- Reader: This is, as far as I know, our own pattern or "abstraction". It says each reader has a readFile method with two parameters, a file name and an optional callback, and the ability to create a DisplayObject that will display the content it reads. The DisplayObject is another abstraction like Reader.
- Observer: Allow objects to communicate without directly referencing one another
- Modular: Give JavaScript a more traditional object model
- Decorator: In our case we use it to extend or customize our Bridge through prototypal inheritance.

## REST

REST is an HTTP based client-server or distributed computing architecture for building web services. It is an alternative to popular protocols such as SOAP. The World Wide Web itself is an example of a RESTful architecture.

REST promotes:

- **Separation of concerns** between the client and the server. The server stores and retrieves data, the client displays data.
- **Loose coupling**: The client or server can be swapped out and replaced. The interface does not change, which means that either the client or the server can be replaced without breaking code.
- **Stateless**: In a true REST interface, there is no need to maintain state on the server side. Session state is always stored on the client side.

There are several things we can do with a REST API:

- **GET**: Retrieve an item (app.get())
- **DELETE**: Delete an item (app.delete())
- **POST**: Create a new item (app.post())
- **PUT**: Update an item, alternatively create it. (app.put())

We usually use POST to create a new item under all circumstance, while PUT will only do so if the item does not already exist.

If you want to get the index of all items:

- app.get('/item', function(){})

If you want to get a particular item:

```
app.get('/item/:id', function(request, response) {
    var id = request.params.id;
});
```

Of course, it's up to you to enforce these rules.
