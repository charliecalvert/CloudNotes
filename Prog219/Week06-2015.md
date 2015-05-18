## Overview

Topics related to Week06

- [Prog 219 Resources][p219res]

[p219res]:http://www.ccalvert.net/books/CloudNotes/Prog219/Prog219-Resources.html


Core subjects include

- UML
- Lists
- Export/Import Data from MongoLab 
- SimpleAgile: Learn to think on the meta-level while iterating
- Facade Pattern
- Unit Testing
- Code Injection

## Wednesday

- Show Structure Pane
- [Icons in Structure Tree View](https://www.jetbrains.com/phpstorm/help/symbols.html#d626436e218)
- View Violet UML for TestLive
- Code Injection 
    - Switch between Mongo and SimpleScienceData
    - Both factories called scientists
    - We switch by linking in different files
    - Both support the same API
    - We can do integration tests with SimpleScienceData
- Requesting data from Express Routes
    - The id wildcard
    - Loading HTML into a DIV


Here is the routing deck: [http://bit.ly/noderoutes](http://bit.ly/noderoutes)


## Queries

When we query by ID, we can specify the ID directly after the name of the collection. Let me help you find the ID by explaining where it is in the URL. In this first example, the ID of the record we want to retreive begins with 5543: 

- By ID: <https://api.mongolab.com/api/1/databases/elvenlab01/collections/scientists/5543bd3be4b000be4aa7b108?apiKey=qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy>
- By FirstName: <https://api.mongolab.com/api/1/databases/elvenlab01/collections/scientists?apiKey=qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy&q={\"firstName\":\"Marie\"}>

## UML

Violet UML. Download the jar file from SourceForge. Start it like this:

    java -jar violetumleditor-2.1.0.jar
    
To download Java, go here:

    

Links:

- [Download jar file for version2.1.0][violet]
- [Main Site](http://alexdp.free.fr/violetumleditor/page.php)

[violet]: http://sourceforge.net/projects/violet/files/violetumleditor/2.1.0/

## MongoLab Export {#mongo-export}

Use the URI that you created in AngularMongoCrud. 

- Run your program with **npm start**
- Launch in Chrome and open the Developer tools
- Go to network tab
- Click the **Load Scientists** button
- Look at the **Request URL** in the **headers** page
- Past it into your address bar

It will start like this:

- https://api.mongolab.com/api/1/databases/...
- <https://api.mongolab.com/api/1/databases/elvenlab01/collections/scientists?apiKey=qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy>

This will give you all the records from your database in the browser window.

If you have a copy of [MongoDb installed](http://docs.mongolab.com/connecting/#methods) locally:

- Log in to MongoLab
- Select database by clicking on it
- Select collection by clicking on it
- Tools | Json Export Collection
- Run the command you are given in the [MongoDb shell](http://docs.mongolab.com/connecting/#methods)

## Lists

Use lists to help keep you on track.

- [Wunderlist](https://www.wunderlist.com/)
- [Habit RPG](https://habitrpg.com)

## Simple Agile

We want to learn to think on the meta-level. To step back, define simple goals, and iterate once over our project to see if we can achieve these goals.

These are our steps

- Create List

The four Items in our list:

- Define Goal of iteration
- Draw Diagram
- Write Tests
- Get Tests to Pass
- Refactor

Repeat, starting by reviewing list.

Iteration Goal

- Create ScienceFacadeTests, mock up ScienceFacade, write tests to prove we can call it
- Show we can call all methods in ScienceFacade
- Write integration tests for and create simple ScienceData
- Try it in our program. Can we use ScienceFacade and ScienceData in our program? Does it do what we want?


First iteration of Facade:

```
angular.module('elvenApp').factory('ScienceFacade', function() {

    return {
        hint: "ScienceFacade",
        getAll: function() {},
        getTopic: function() {},
        getSubtopicsFromTopic: function() {},
        delete: function() {},
        add: function() {},
        update: function() {}
    }
});
```

It would have been enough to just define the hint function, but when making diagram it was easy to brainstorm on expected API.


## Facade Pattern

We want to protect ourselves from potential complexity and from change. Let's use the facade pattern for now.

Don't call the problematic API directly. Instead, place a facade, an intermediate object, between you and the API you might want to call. Then you main app, and your tests, interact only with the facade. You never directly call the problematic API.

- [Osmani Overview](http://addyosmani.com/largescalejavascript/#facadepattern)

![StepOne](https://drive.google.com/uc?id=0B25UTAlOfPRGTkZIeEhlZjFQWjA)

Above we see the first iteration, the first simple goal that we want to achieve. Implement the objects shown in the diagram, make sure you tests pass. This helps you establish a foundation on which you can build.

Now it is time for Step Two. The goal here is to start building a few real tests to see if you we can define the methods we want to use in our facade. The methods that we implement at this stage are essentially empty. They don't do anything. But we write tests for them just to prove for ourselves that we can call the methods we want to fully implement at some later point in time:

![Step Two](https://drive.google.com/uc?id=0B25UTAlOfPRGeGlWS21ZdnhJWFU)

## Dependency Injection

Angular Uses Dependency Injection to declare how one module, controller or service acquires the objects that it depends on. Here is the beginning of a declaration for an angular factory:

    angular.module('elvenApp').factory('SimpleScienceData',

Here is another factory that depends on it:

    angular.module('elvenApp').factory('ScienceFacade', function(SimpleScienceData)

We can see that **ScienceFacade** can state it's dependency on **SimpleScienceData** by only adding one word as a function parameter.

**NOTE**: *This kind of dependency injection is the simplest to use. It is called **Implicit Annotation**. It will not work, however, if you minimize or obfuscate your code. As a result, may developers prefer **Inline Array Annotation** or **Property Annotation**. We will explore these other techniques when we become more familiar with Angular.*


Probably on Wednesday, we will swap out either the FacadePattern object itself, or the more complex APIs that it relies on. By using Dependency Injection, we can do this without having to change anything but one word in **Layout.js**. That way we can change how our code works without ever changing its implementation.

## Of Interest

- [Osmani Facade][os-fac]
- [Unit Testing Angular][nate-claire]

[os-fac]:http://addyosmani.com/largescalejavascript/#facadepattern

[nate-claire]:http://nathanleclaire.com/blog/2014/04/12/unit-testing-services-in-angularjs-for-fun-and-for-profit/
