## Renewables Refactor

Time to refactor

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



### Create New Page Steps {#page-steps}

Executive Summary

In **public/javascripts**

- Modify **control.js**
- Create your file for your page: **renewables-index**
- In **main.js**: load **renewables-index**

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
frameworks: ['jasmine', 'requirejs'],

files: [
    'public/components/jquery/dist/jquery.min.js',
    //'public/components/requirejs/require.js',
    'node_modules/jasmine-jquery/lib/*.js',
    {
        pattern : 'spec/test-*.js',
        included : false
    }, {
        pattern : 'public/javascripts/**/*.js',
        included : false
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

In general, you will find the tests here:

- JsObjects/Utilities/Templates/UnitTest/SolarVoyager

Check regularly for updates. All the tests should pass.

[jasmine-requirejs]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/JasmineRequireJs

## Turn it in

Make sure the tests from JsObjects pass and **grunt check** passes. Put your work in a branch called **week08** or **week08-midterm**. Be sure to tell me the branch it is in when you turn in the assignment.

## Hints

Be sure you renamed work.js to home.js. Rename all associated buttons, menus and files.
