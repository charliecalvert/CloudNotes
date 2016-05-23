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

## MSN Types

A single energy type looks like this:

```json
{
    "MSN": "FFPRBUS",
    "YYYYMM": "194913",
    "Value": "28.748176",
    "Column_Order": "1",
    "Description": "Total Fossil Fuels Production",
    "Unit": "Quadrillion Btu"
}
```

There are two oddities here:

- The MSN property. Here it is FFPREBUS, which we see in the Description stands for "Fossile Fuel Produciton."
- The YYYYMM property, which contains the year and a month: 1949 is the 13, is the month. I believe they are using 13 to say that they don't track months for this year, and that this is the production for the entire year. Starting around 1972 they will begin tracking production by month, and then the month field will be easier to understand.

We want to know all the available MSN types. Just scanning through the file will reveal that there are several different types, such as FFPRBUS and NUETBUS. Since we have 7008 records, it is a bit hard to manually track down all the different types and their counts. So let's write code to do it, and also to break out our years and months.

It might be possible to use Angular filters to find our MSN types, but I would prefer to do it myself. This would be a fairly simple task if we only wanted to find the unique MSN types. But it is better to find both the type and the accompanying description. That can get a bit fussy, so I will just give you the code, which I put in **public/javascripts/energy-types/msn-types.js**:

```javascript
var elfApp = angular.module('elfApp');

elfApp.factory('msnTypes', function() {
    function getMsnTypes(energyTypes) {
        console.log('getMsnTypes called');
        var currentMsn = {msn: null, description: ''};
        var msnTypes = [];

        function insertNewCurrentMsn(energyType) {
            currentMsn = Object.create(currentMsn);
            currentMsn.msn = energyType.MSN;
            currentMsn.description = energyType.Description;
            msnTypes.push(currentMsn);
        }

        insertNewCurrentMsn(energyTypes[0]);

        function isUnique(msn) {
            var result = true;
            for (var i = 0; i < msnTypes.length; i++) {
                if (msn === msnTypes[i].msn) {
                    console.log('msn vs c.msn', msn, currentMsn.msn);
                    result = false;
                    break;
                }
            }
            return result;
        }

        energyTypes.forEach(function (energyType, index) {
            // console.log('energyType index and index length', index, msnTypes.length);
            energyType.Year = energyType.YYYYMM.substr(0, 4);
            energyType.Month = energyType.YYYYMM.substr(4);
            if (energyType.MSN !== currentMsn.msn) {
                if (isUnique(energyType.MSN)) {
                    //console.log('isUnique');
                    insertNewCurrentMsn(energyType);
                }
            }
        });
        return msnTypes;
    }

    return getMsnTypes
});
```

We can use it like this:

```javascript
$scope.getEnergyTypes = function () {
        $http.get('data/EnergyTypes.json')
            .then(function (response) {                
                $scope.msnTypes = msnTypes(response.data);
                etc... // CODE HERE LEFT AS EXERCISE
              }, function errorCallback(response) {
          console.log('Error:', response.status, response.statusText);
      });
};
```

## Energy Selectors

The goal of the Energy Selectors page is to allow the user to click on an MSN type and see only the records of that type. There are about 7008 objects in our array, and each MSN type encapsulates about 584 of those records.

Your pages don't have to look like the images shown below. Feel free to make the page uniquely your own. You have freedom to do what you want so long as your page includes:

- A clickable list of MSN types
- An iterable view of the 584 objects for any selected MSN type
- The count of all objects in the array
- The count of all objects for the selected MSN type


![MSN Selection](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog219-midterm-2016-02.png)

**Figure 02** Top portion of the page for selecting a subset of the msn types.

![MSN Selection](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog219-midterm-2016-03.png)

**Figure 03** Bottom portion of the page for selecting a subset of the msn types.


## The Menu

The menu is a pain. I would certainly need a whole day, and perhaps two days to really explain it in depth. We don't have time for that, so here is my **index.jade** with just a couple items left as an exercise:

```javascript
extends layout

block content
    header.navbar.navbar-inverse.navbar-fixed-top.bs-docs-nav(role='banner')
        .container
            .navbar-header
                button.navbar-toggle(type='button', data-toggle='collapse', data-target='.bs-navbar-collapse')
                    span.sr-only Toggle navigation
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar
                a.navbar-brand(href='.#/') Solar Explorer
            nav.collapse.navbar-collapse.bs-navbar-collapse(role="navigation")
                ul.nav.navbar-nav
                    li.trigger-collapse(ng-class="{ active: isActive('/')}")
                        a(ng-href='#/') Home
                    li.collapse.dropdown
                        a.dropdown-toggle(data-toggle='dropdown')
                            | Renewables
                            b.caret
                        ul.dropdown-menu(role='menu')
                            li.trigger-collapse(ng-class="{ active: isActive('/renewables')}")
                                a(ng-href='#/renewables') Renewables
                            // ADD TWO MORE MENU ITEMS HERE    
                    li.collapse.dropdown
                        a.dropdown-toggle(data-toggle='dropdown')
                            | Energy
                            b.caret
                        ul.dropdown-menu(role='menu')
                            // ADD THE ENERGY MENU ITEMS HERE.
                            // BASE THEM ON THE RENEWABLES Menu item above
                    li.trigger-collapse(ng-class="{ active: isActive('/about')}")
                        a(ng-href='#/about') About
    .container
        h1= title
        p Welcome to #{title}
        p Author #{author}

        div(data-ng-view="")

```

The key point to grasp is that it changes shape to fit properly on a mobile device. The hamburger menu for the mobile device is the bit with the **span.icon-bar** syntax.

## Turn it in

The usual

## Hints

Various Hints

### Karma

In karma.conf.js, make sure you are loading all your new files:

```javascript
'public/javascripts/**/*.js',
```
