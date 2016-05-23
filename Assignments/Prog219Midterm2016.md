## Overview

We are now turning a major corner in the course. Rather than learning new technologies, we are going to spend most of our time refactoring code and adding new features.

A well designed architecture supports the [Open Closed Principle][ocp-wiki]:

- _**Modules, Classes and Functions should be open to extension by closed to modification.**_

Along with [loose coupling][lc-wiki] the [single-responsibility princeple][srp-wiki] and [TDD][tdd-wiki] the open closed principle is one of the foundations of good software design. My classes are not really about Linux, git, Angular, jQuery, or express. They are about how to build applications using our core ideas:

- [Test Driven Development (TDD)][tdd]
- [Loose Coupling](http://edn.embarcadero.com/article/30372)
- [The Single Responsibility Principle][srp]
- [The Open Closed Principle][ocp]

Another important design principle not emphasized in this class is the [Dependency Inversion Principle][dip].

Slide decks that might be useful:

- Agile Overview: [http://bit.ly/1qf6V4t](http://bit.ly/1qf6V4t)
- Refactoring: [http://bit.ly/elfrefactor](http://bit.ly/elfrefactor)

As a general rule, these are the rules, ideas and guiding principles that make possible agile development:

- <http://www.agilemanifesto.org/>
- <http://www.agilemanifesto.org/principles.html>

[tdd-wiki]:https://en.wikipedia.org/wiki/Test-driven_development
[lc-wiki]:https://en.wikipedia.org/wiki/Loose_coupling
[srp-wiki]:https://en.wikipedia.org/wiki/Single_responsibility_principle
[ocp-wiki]:https://en.wikipedia.org/wiki/Open/closed_principle
[ocp]:http://www.oodesign.com/open-close-principle.html
[dip]:http://www.oodesign.com/dependency-inversion-principle.html
[srp]:http://www.oodesign.com/single-responsibility-principle.html
[tdd]:http://agiledata.org/essays/tdd.html

## New Files

Create:

- **EnergyTypesController** in **public/javascripts/energy-types/energy-types.js**
- **energy-types-page.jade** in **views/energy-types/**
- **energy-types.jade** in **views/energy-types/**

When you load **energy-types.js** in **layout.jade**, don't forget that you need to specify the directory where it lives.

In **public/javascripts** we also want to create a _home_ page. For now, it can be very simple:

<pre>
h1 Home
</pre>

## Angular Routes

As we add more pages to our app, we have to be sure that our menu and button selections will properly load them. This means making changes to **public/javascripts/app.js**. The routes we need to establish or keep include:

- home (HomeController)
- renewable (main) (MainController, RewnewableController)
- simple-format (SimpleFormatController)
- renewable-by-year (RenewableByYearController)
- energy-types (EnergyTypesController)
- energy-selector (EnergySelectorController)
- about (AboutController)


When you load **energy-types.js** in **layout.jade**, don't forget that you need to specify the directory where it lives.

Make sure menu collapses in mobile device mode:

<pre>
li.trigger-collapse(ng-class="{ active: isActive('/')}")
</pre>

```javascript
$(document).ready(function () {
    $(".navbar-nav li.trigger-collapse a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
    });
});
```

## Energy Types

We are not done with this page, but for the midterm, it should look something like this. The design is not important, but the functionality is. In other words, be creative about the way it looks, but be sure your page contains only these features:

- Menu
- The permanent elements from index.jade such as the title **Solar Explorer**.
- A title for the loaded page: **Energy Types**
- A dynamic record count showing how the length of the array you loaded (7008)
- The ability to iterate over all 7008 records
- A static list of all the unique MSN types

My page looks like this at the time of this writing:

![Energy Types](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog219-midterm-2016-01.png)

**Figure 01**: _Note the three bootstrap panels used to display the data in the energy types page._

Note that my static MSN list and iterable record list are shown inside of bootstrap panels. You don't have to use them, but it is a reasonable way to organize a page.

<pre>
h1 Energy Types


.panel.panel-default
    .panel-heading Iterate over All Energy Types
    .panel-body
        input(type="number", data-ng-model="index", min="0")
        br
        energy-types

// The remaining to panels are left as an exercise.
</pre>



## Energy Selectors



## Turn it in

The usual

## Hints

Various Hints

### Karma

In karma.conf.js, make sure you are loading all your new files:

```javascript
'public/javascripts/**/*.js',
```
