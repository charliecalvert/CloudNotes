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

## Energy Json

We now want to start working with the file called **data/RenewableTypes.json**. I for see a problem here that we ought to address right off. We are already working with a file called **Renewables**. It will be too confusing if we are always trying to distinguish between **RenewablesTypesByYear** and **RenewablesByYear**. To avoid this, let's use **git mv** to rename  **data/RenewableTypes.json** to **data/HighTechEnergy.json**.

## Energy View

It is now time to start viewing and working with **HighTechEnergy.json**.

Clearly partition the _energy_ files from the rest by creating a folders called **high-tech-energy** in **public/javascripts** and **views**.

Put the following files in **public/javascript/high-tech-energy**:

- energy-overview.js  
- energy-types.js  
- msn-types.js

In **views/high-tech-energy**, place these files

- energy-overview-page.jade
- energy-types-page.jade



![Part Way](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-midterm-2016-02.png)

**Figure 01**: _Just getting far enough to see you can load the data._

![Part Way](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-midterm-2016-01.png)

**Figure 02**: _Just getting far enough to see you can load the types._

![A bit more](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-midterm-2016-01a.png)

**Figure 02a**: _Making a bit more progress on displaying types._


### Create New Page Steps {#page-steps}

Executive Summary

In **public/javascripts**

- Modify **control.js** to call **renewables.init**
- Create your main object in page: **renewables/renewables-index.js**
- In the requirejs based **main.js** load **renewables/renewables-index.js**
- In **renewables/renewables-index.js**: load **view/renewables-index.jade**

In Views:

- Create corresponding jade file: **renewables-by-index.jade**
- Add launch button or menu item to **index.jade**

See this project: [Jasmine Require Js][jasmine-requirejs]

## Testing

Again, see this project: [Jasmine Require Js][jasmine-requirejs]

<pre>
npm install karma-requirejs --save-dev
npm install requirejs --save-dev
npm install jasmine-jquery --save-dev
</pre>

We need to create a requirejs file explicitly for our tests. Call the file **spec/main-test.js**.

```javascript
/**
 * @author Charlie Calvert
 */

function loadTestsIntoArray() {
	var tests = [];
	for (var file in window.__karma__.files) {
		if (/test-/.test(file)) {
			console.log('Loaded test:', file);
			tests.push(file);
		}
	}
	return tests;
}

require.config({
	baseUrl: '/base',

    paths: {
        control: 'public/javascripts/control',
        home: 'public/javascripts/home',
        renewables: 'public/javascripts/renewables/renewables',
        // THE REST LEFT AS AN EXERCISE
    },
    deps: loadTestsIntoArray(),
    callback: window.__karma__.start
});
```

It is one of the oddities of karma that **/base** points to the root of your project.

Your **karma.conf.js** file should explicitly load **main-test.js** and explicitly ignore **public/javascripts/main.js**.

```javascript
files: [
            'public/components/jquery/dist/jquery.min.js',
            //'public/components/requirejs/require.js',
            'node_modules/jasmine-jquery/lib/*.js', {
                pattern: 'spec/test-*.js',
                included: false
            }, {
                pattern: 'spec/data/client-renewables.js',
                included: false
            }, {
                pattern: 'public/javascripts/**/*.js',
                included: false
            },
            'spec/main-test.js',
            '*.html'
        ],

        // list of files to exclude
        exclude: ['public/javascripts/main.js'],

```

Remove the **plugins** section from the end of **karma.conf.js**:

```javascript
singleRun: false,

/*
  YOU CAN JUST DELETE IT, BUT I WANT TO SHOW YOU WHAT TO DELETE
plugins: ['karma-jasmine',
    'karma-spec-reporter',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher'
] */
```

A simple test of the home page would look like this:

```javascript
define(['home'], function(home) {


    describe('Home Page Suite', function () {

        'use strict';

        it('expects true to be true', function () {
            expect(true).toBe(true);
        });

        it('expects home.color to be red', function () {
            expect(home.color).toBe('red');
        });

        it('expects home.size to be big', function () {
            expect(home.size).toBe('big');
        });

    });

});
```

You will find the tests for the midterm here:

- JsObjects/Utilities/Templates/UnitTest/SolarVoyager

Copy those files into your spec directory, and make sure they all pass.

Check regularly for updates. All the tests should pass.

[jasmine-requirejs]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/JasmineRequireJs

## Menu

<pre>
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
                a.navbar-brand(href='/') Solar Explorer
            nav.collapse.navbar-collapse.bs-navbar-collapse(role="navigation")
                ul.nav.navbar-nav
                    li.trigger-collapse(ng-class="{ active: isActive('/')}")
                        a.homeMenu Home
                    li.collapse.dropdown
                        a.dropdown-toggle(data-toggle='dropdown')
                            | Renewables
                            b.caret
                        ul.dropdown-menu(role='menu')
                            li.trigger-collapse(ng-class="{ active: isActive('/renewables')}")
                                a.renewablesMenu Renewables
														// YOU FILL IN THESE TWO ITEMS		
                    li.collapse.dropdown
                        a.dropdown-toggle(data-toggle='dropdown')
                            | Energy
                            b.caret
                        ul.dropdown-menu(role='menu')
														// BASED ON THE DROP DOWN SHOWN ABOVE
														// YOU DEFINE EnerygyOverview and EnergyTypes
                    li.trigger-collapse(ng-class="{ active: isActive('/about')}")
                        a.aboutMenu About
    .container

        h1= title
        p Welcome to #{title}

        button.homeMenu.btn.btn-primary Home
        button.renewablesMenu.btn.btn-info Renewables
        button.renewablesByIndexMenu.btn.btn-danger Renewables by Index
        button.renewablesByYearMenu.btn.btn-warning Renewables by Year
        button.aboutMenu.btn.btn-success About

        div
            button.highTechEnergyOverviewMenu.btn.btn-info High Tech Energy Overview
            button.highTechEnergyTypesMenu.btn.btn-danger High Tech Energy Types


    #elf-view

  pre#debug
</pre>


## Turn it in

Make sure the tests from JsObjects pass and **grunt check** passes. Put your work in a branch called **week08** or **week08-midterm**. Be sure to tell me the branch it is in when you turn in the assignment.

Make sure both **karma start** and **node jasmine-runner** pass without error. Use the latest versions of the tests from JsObjects. When preparing your tests for the midterm, please make sure all of the following works:

    grunt check
    node jasmine-runner.js
    karma start

If you have any **fits** or **fdescribes** in your code, please remove them so I can see all your tests running. Make sure you have the latest tests from JsObjects.

## Hints

Be sure you renamed work.js to home.js. Rename all associated buttons, menus and files.

## The Hardest Test {#hard-test}

There are several ways to solve this problem. However, I should mention that to get the test called _'expects get renewable to be defined'_ in **spec/test-renewables.js** to pass, I made some changes to the way my code is structured in **public/javascript/renewables-page.js**:

```javascript
var renewables = {
		color: 'red',
		size: 'big',
		renewablesList: [],         < ==== HERE
		getRenewable: getRenewable, < ==== HERE
		init: function() {
				console.log(renewables.color);
```

Then in **getRenewable**, I wrote code like this:

```javascript
$.getJSON('/renewables', function(response) {				
				renewables.renewablesList = response.renewables; < ==== HERE				
				showRenewable(renewables.renewablesList[index]); < ==== HERE
});
```

## client-renewables

This is the mock data used in the hard test from **test-renewables**.

```javascript
define(function() {
    'use strict';
    return [{
        "Year": "2017",
        "Solar (quadrillion Btu)": "0.8045307",
        "Geothermal (quadrillion Btu)": "0.2349284",
        "Other biomass (quadrillion Btu)": "0.50916",
        "Wind power (quadrillion Btu)": "2.202328",
        "Liquid biofuels (quadrillion Btu)": "1.2329197",
        "Wood biomass (quadrillion Btu)": "1.9860924",
        "Hydropower (quadrillion Btu)": "2.5859957"
    }, {
        "Year": "2016",
        "Solar (quadrillion Btu)": "0.6298938",
        "Geothermal (quadrillion Btu)": "0.232438",
        "Other biomass (quadrillion Btu)": "0.5113525",
        "Wind power (quadrillion Btu)": "2.0395132492",
        "Liquid biofuels (quadrillion Btu)": "1.2406718727",
        "Wood biomass (quadrillion Btu)": "1.9724914",
        "Hydropower (quadrillion Btu)": "2.5965158"
    }, {
    etc...
});
