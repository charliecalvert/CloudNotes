---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Prog219Midterm2016.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: Prog219Midterm2016.md
relativePath: /Prog219Midterm2016.md
title: Prog219Midterm2016
directoryName: Assignments
category : assignments-guide
---

## Overview

We are now turning a major corner in the course. Rather than learning new technologies, we are going to spend most of our time refactoring code and adding new features.

A well designed architecture supports the [Open Closed Principle][ocp-wiki]:

- _**Modules, Classes and Functions should be open to extension by closed to modification.**_

Along with [loose coupling][lc-wiki] the [single-responsibility princeple][srp-wiki] and [TDD][tdd-wiki] the open closed principle is one of the foundations of good software design. My classes are not really about Linux, git, Angular, jQuery, or express. They are about how to build applications using our core ideas:

- [Test Driven Development (TDD)][tdd]
- [Loose Coupling](http://edn.embarcadero.com/article/30372)
- [The Single Responsibility Principle][srp]
- [The Open Closed Principle][ocp]
- [Interface Segregation](https://en.wikipedia.org/wiki/Interface_segregation_principle)

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

## Angular Client Side Routes

Recall that in an angular app we often have two sets of routes. One set of routes are sent back to server and handled there. The code for handling these files is often found in **routes/index.js**. A second set of routes are handled on the client side in **public/javascripts/app.js**.  When specifying a route, we use the hash tag (#) to designate a route that should be handled on the client. For instance, this route is handled on the server: **/renewables**. This route is handled on the client: **/#/home**.

As we add more pages to our app, we have to be sure that our menu and button selections will properly load them. This means making changes to **public/javascripts/app.js**. The routes we need to establish or keep include:

- home (HomeController)
- renewable (main) (MainController: renamed to RenewablesController)
- simple-format (SimpleFormatController)
- renewable-by-year (RenewableByYearController)
- energy-types (EnergyTypesController)
- energy-selector (EnergySelectorController)
- about (AboutController)

You have already seen how to create some of this functionality in previous assignments. <uch of the remainder of this document explains how to create the files associated with the new routes listed here. In particular, we will discuss the **home** page route and the **energy** routes.

## Home Page

In **public/javascripts** we also want to create a _home_ page. For now, it can be very simple:

<pre>
h1 Home
</pre>

Feel free to add anything you want to this page to make it more interesting.

- Set up a route for it in **app.js**
- Put the JavaScript for it in **public/javascripts/home.js**
- The Jade that defines its appearance is in **views/home.jade**
- Menu items or buttons to reach it are defined in **views/index.jade**

## Display EnergyTypes.json {#new-files}

One of our goals is to start handling the **EnergyTypes.json** file from our data directory. To that end, create the following:

- **EnergyTypesController** in **public/javascripts/energy-types/energy-types.js**
- **energy-types-page.jade** in **views/energy-types/**
- **energy-types.jade** in **views/energy-types/**
- **json-as-energy-types.js** in **spec/data**

When you load **energy-types.js** in **layout.jade**, don't forget that you need to specify the directory where it lives.

My page looks like this at the time of this writing:

![Energy Types](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog219-midterm-2016-01.png)

**Figure 01**: _Note the three bootstrap panels used to display the data in the energy types page._

We may work on this page more later, but for the midterm, it should look something like this.

In spec/data create a file called json-as-energy-types.js. In it, put the contents of your energy types array. Like this:

```javascript
var energyTypes = [
{
    "MSN": "FFPRBUS",
    "YYYYMM": "194913",
    "Value": "28.748176",
    "Column_Order": "1",
    "Description": "Total Fossil Fuels Production",
    "Unit": "Quadrillion Btu"
},
{
    "MSN": "FFPRBUS",
    "YYYYMM": "195013",
    "Value": "32.562667",
    "Column_Order": "1",
    "Description": "Total Fossil Fuels Production",
    "Unit": "Quadrillion Btu"
},
etc....
```

## Energy Types

The details of your design are up to you, but you should be sure certain functionality is present. In other words, be creative about the way it looks, but be sure your page contains these features:

- The permanent elements from index.jade such as the menu and the title **Solar Explorer**.
- A title for the loaded page: **Energy Types**
- A dynamic record count showing how the length of the array you loaded (7008)
- The ability to iterate over all 7008 records
- A static list of all the unique MSN types

Note that my static MSN list and iterable record list are shown inside of bootstrap panels. You don't have to use them, but it is a reasonable way to organize a page. Here is some of the code from my jade file for creating the panels:

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

Let's take a moment to be sure we understand MSN types. Our Energy Types are defined in **data/EnergyTypes.json**. A single energy type from our array of energy types looks like this:

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

We want to know all the available MSN types. Just scanning through the file will reveal that there are several different types, such as FFPRBUS and NUETBUS. Since we have 7008 records, it is a bit hard to manually track down all the different types and their counts. So let's write code to do it, and also to break out our years and months. It turns out that the MSN value NUETBUS is used both for Nuclear Production and Nuclear Consumption. As a result, we have to distinguish the different types not on abbreviations such NUETBUS but on the description itself. Figure 01 shows that there are two NUETBUS types, one for consumption and one for production. Here you can see on of each type of object, where the description field differs even though the MSN field is the same:

```json
{
    "MSN": "NUETBUS",
    "YYYYMM": "201511",
    "Value": ".630301",
    "Column_Order": "2",
    "Description": "Nuclear Electric Power Production",
    "Unit": "Quadrillion Btu"
}
{
    "MSN": "NUETBUS",
    "YYYYMM": "201512",
    "Value": ".728298",
    "Column_Order": "10",
    "Description": "Nuclear Electric Power Consumption",
    "Unit": "Quadrillion Btu"
}
```

It might be possible to use Angular filters to find our MSN types, but I would prefer to do it myself. This would be a fairly simple task if we only wanted to find the unique MSN types. But it is better to find both the type and the accompanying description. That can get a bit fussy, so I will just give you the code, which I put in **public/javascripts/energy-types/msn-types.js**:

**NOTE**: _This code changed on Wednesday, May 25, 2016, when I realized the MSN type abbreviation is not unique. The unique field is the description._

```javascript
var elfApp = angular.module('elfApp');

elfApp.factory('msnTypes', function () {
    'use strict';

    var currentMsn = {msn: null, description: ''};
    var msnTypes = [];
    var count = 0;

    function insertMsnType(energyType) {
        currentMsn = Object.create(currentMsn);
        currentMsn.msn = energyType.MSN;
        currentMsn.description = energyType.Description;
        msnTypes.push(currentMsn);
    }

    function isUniqueMsn(description) {
        console.log('isUniqueMsn called:', count, currentMsn.msn);
        var result = true;
        for (var i = 0; i < msnTypes.length; i++) {
            if (description === msnTypes[i].description) {
                result = false;
                break;
            }
        }
        return result;
    }

    function iterateEnergyTypes(energyTypes) {
        energyTypes.forEach(function (energyType, index) {
            count = count + 1;
            energyType.Year = energyType.YYYYMM.substr(0, 4);
            energyType.Month = energyType.YYYYMM.substr(4);
            if (energyType.Description !== currentMsn.description) {
                if (isUniqueMsn(energyType.Description)) {
                    insertMsnType(energyType);
                }
            }
        });
    }

    function getMsnTypes(energyTypes) {
        console.log('getMsnTypes called');
        if (msnTypes.length === 0) {
            iterateEnergyTypes(energyTypes);
        }
        return msnTypes;
    }

    return getMsnTypes;
});
```

The code:

- Is passed our array of **energyTypes** loaded from **data/EnergyTypes.json**
- Uses **forEach** to iterate over the **energyTypes** array.

While iterating over the energy types:

- For each item in the array it pulls out the Year and Month from the **YYYYMM** field.
- It adds this data to the object as new properties called **Year** and **Month**

It also

- Defines a JavaScript object called **currentMsn** with two properties: **msn**, **description**
- Defines an array called **msnTypes** for holding our **currentMsn** objects.
- Uses **forEach** to iterate over the **energyTypes** array.
- It checks to see if the description of the MSN type differs from the description of the last unique MSN type that we found
- If it is different, it checks to see if it is unique, that is, if it is already in our list of known MSN types
- If it is not in the list, it is added to the list.

We can use it like this:

```javascript
$scope.getEnergyTypes = function () {
        $http.get('data/EnergyTypes.json')
            .then(function (response) {                
                $scope.msnTypes = msnTypes(response.data);
                etc... // CODE HERE LEFT AS EXERCISE
              }, function errorCallback(response) {
                console.log('Error:', response.status, response.statusText);
              }
            );
};
```

## Energy Selectors

The goal of the Energy Selectors page is to allow the user to click on an MSN type and see only the records of that type. There are about 7008 objects in our array, and each MSN type encapsulates about 584 of those records. The distinction between types is made on the **Description** property, not the **MSN** property.

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

Bootstrap menus are not easy to understand. I would certainly need a whole day, and perhaps two days to really explain it in depth. We don't have time for that, so here is my **index.jade**. As an exercise, I've left just a couple items for you to complete:

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
                            // ADD TWO MORE MENU ITEMS HERE (ByYear, ByIndex)    
                    li.collapse.dropdown
                        a.dropdown-toggle(data-toggle='dropdown')
                            | Energy
                            b.caret
                        ul.dropdown-menu(role='menu')
                            // ADD THE ENERGY MENU ITEMS HERE.
                            // BASE THEM ON THE RENEWABLES Menu item above
                            // THEY SHOULD Energy Types AND Energy Selectors
                    li.trigger-collapse(ng-class="{ active: isActive('/about')}")
                        a(ng-href='#/about') About
    .container
        h1= title
        p Welcome to #{title}
        p Author #{author}

        div(data-ng-view="")

```

The menu changes shape to fit properly on a mobile device. The hamburger menu for the mobile device is the bit with the **span.icon-bar** syntax.

The menu will not automatically collapse when you make a selection. To help fix this problem, we can add the following to **app.js**:

```javascript
$(document).ready(function() {
    'use strict';
    $('.navbar-nav li.trigger-collapse a').click(function(event) {
        $('.navbar-collapse').collapse('hide');
    });
});
```

Or perhaps there is a way to make this work:

<pre>
li.trigger-collapse(ng-class="{ active: isActive('/')}")
</pre>

## Testing

The tests are in **JsObjects/Utilities/Templates/UnitTest** in the [**SolarExplorer**][test-se] folder.

Run them against your own code, and make sure they pass. Depending on whether I've updated them or not, the output might look a bit like this:

<pre>
Elvenware Fixture and Template Cache Suite
  ✓ expects true to be true
  ✓ should find the index
  ✓ should have a getRenewable method
  ✓ should be possible to access the fixture
  ✓ tests template loaded through simple raw text
  ✓ tests template loaded through more complex raw text
  ✓ tests scope variable access in template loaded through fixture

Energy Types Suite
  ✓ proves we can test
  ✓ shows we can find each of the 12 MSN types

Elvenware Simple Mocks with HttpBackend Suite
  ✓ proves we can run tests
  ✓ should find the index
  ✓ should have a getRenewable method
  ✓ proves we can detect request

Renewable By Year Suite
  ✓ expects true to be true
  ✓ proves renewables.getByYear returns index & expected object with string year
  ✓ proves renewables.getByYear returns index & expected object with numeric year
  ✓ tests that we can get a renewable object by Year from our controller
  ✓ tests that we can get a renewable object by Year in our elfRenewableByYear directive

Renewables Suite
  ✓ proves we can run tests
  ✓ proves we can get renewableUtils name
  ✓ proves we can get renewableUtils method called getItemCount
  ✓ proves we can get from renewableUtils a particular renewable object by index
  ✓ proves we can transform our json into a new array consisting only of years
  ✓ proves we can get our wood map
  ✓ proves our array of years contains the expected data
  ✓ proves we can transform our json into an array with three properties: geo, solar, and wind
  ✓ proves that getSimpleStringFormat returns the expected string data
  ✓ proves that getSimpleFormat returns the expected numeric data

Simple Format HttpBackend Suite
  ✓ expects true to be true
  ✓ tests simple-format directive loaded through fixture with httpBackend
  ✓ tests that we can index to the fifth element

Simple Format Fixture Suite
  ✓ expects true to be true
  ✓ should find the index
  ✓ should be possible to access the fixture
  ✓ should be possible to access the fixture and put real data in it.

PhantomJS 2.1.1 (Linux 0.0.0): Executed 35 of 35 SUCCESS (0.06 secs / 1.045 secs)
TOTAL: 35 SUCCESS
</pre>

## Turn it in

Make sure your tests pass and **grunt check** passes, then the usual. I'm expecting it in your **week08** branch. It would be helpful if you spell out the branch even if you are putting it in **week08**. A possible alternative would be **week08-midterm** for those cases where you want to turn in something different than your current program. For instance, if there were features you are still trying to develop, but don't want to show for the midterm.

## Hints

Various Hints

### Karma

In karma.conf.js, make sure you are loading all your new files:

```javascript
'public/javascripts/**/*.js',
```

And don't forget to include **jasmine-jquery**. First check that it is installed via package.json. If it is not installed, then run this command:

<pre>
npm install jasmine-jquery --save-dev
</pre>

In the **files** section **karma.conf.js** make sure you are loading jasmine-jquery and all the HTML files from your fixtures directory:

```javascript
'node_modules/jasmine-jquery/lib/*.js',
'spec/**/*.html',
```

And I think we need to add this preprocessor directive as well in **karma.conf.js**:

```javascript
preprocessors: {
   '**/*.html': []
},
```

### File Name Conventions

Executive Summary

- If a JavaScript or Jade file ends with **-page** it is used to define the main page seen by the user for a particular subject. This is where the Controller is defined.
- If the file does not end with -page, it is the Jade file for a directive.

If you ask to see the **Renewable by Year** or **Renewable by Index** page then some HTML is loaded into the main page of the application. The JavaScript and Jade files that define what that page looks like have **-page** in their name. For instance, **renewable-by-year-page.jade**.

If you need to define some jade for use with a directive, then don't use **-page** in the name. For instance: **renewable-by-year.jade**.

Consider the **Renewable by Year** page that we display to the user. It is made up of several files.

The core files:

- public/javascript/renewable-by-year-page.js
- views/renewables/renewable-by-year-page.jade
- views/renewables/renewable-by-year.jade

The test and server side files:

- spec/test-renewable-by-year.js
- routes/index.js

Let's look at the rules governing the layout of the files above a bit more closely.

JavaScript files for a page like **Renewable by Year**:

- Client side:
  - One file In public javascript
  - Ends with -page.js
  - Example: **renewable-by-year-page.js**
- Server Side
  - For now, the only server side JavaScript is in **routes/index.js**

Jade Files:

-**renewable-by-year-page.jade**: The Jade for the page the viewer sees.
-**renewable-by-year,jade**: The Jade for the directive seen as a subset of the page.

## Hint on Energy Selector

This is your jade.

<pre>
.panel.panel-default
    .panel-heading Select MSN Type
    .panel-body
        div(data-ng-repeat="msnType in msnTypes track by msnType.description")
            a(id="{{msnType.msn}}", href="", ng-click='selectMsnType()') {{msnType.msn}}: {{msnType.description}}
</pre>

This is your ng-click handler from the anchor:

```javascript
$scope.selectMsnType = function() {
    $scope.selectedMsnType = this.msnType.description;
    $scope.filteredEnergyTypes = $scope.energyTypes.filter(function(energyType) {
        return energyType.Description === $scope.selectedMsnType;
    });
    $scope.filteredRecordCount = $scope.filteredEnergyTypes.length;
};
```

[test-se]: https://github.com/charliecalvert/JsObjects/tree/master/Utilities/Templates/UnitTest/SolarExplorer

## JSCS

It is okay to turn a JSCS test off in specific cases like this:

```javascript
// jscs:disable requireDotNotation
return {
    year: renewable.Year,
    solar: renewable['Solar (quadrillion Btu)'],
    geo: renewable['Geothermal (quadrillion Btu)'],
    otherBiomass: renewable['Other biomass (quadrillion Btu)'],
    wind: renewable['Wind power (quadrillion Btu)'],
    liquidBiofuels: renewable['Liquid biofuels (quadrillion Btu)'],
    wood: renewable['Wood biomass (quadrillion Btu)'],
    hydropower: renewable['Hydropower (quadrillion Btu)']
};
// jscs:enable requireDotNotation
```

Note the jscs:enable and jscs:disable directives.

- <http://jscs.info/overview#error-suppression>

- <http://stackoverflow.com/questions/25223149/is-there-any-way-for-jscs-to-ignore-rules-per-file-block-or-line>

Just don't do it at random. Only in small, isolated cases like this where we really have a good reason to go against the JSCS formatting rules.
