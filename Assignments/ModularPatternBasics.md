## Overview

Learn the basics of how to use the modular pattern. It is likely that many of the projects we create this quarter will follow this basic pattern. So make a note of this project so you can find it again later as it lays out several patterns that we are likely to use over and over.

You are learning three things:

- How to set up the **elf** object
- How to use the modular pattern, which provides public, private and instance methods.
- How to test code of this type.

## Step 01: Create Project {#create-project}

Make sure you have the latest from JsObjects:

```
cd $JSOBJECTS
git pull
```

Navigate to your repository and create a project with the scripts already setup in the Pristine Lubuntu **~/bin** directory:

```bash
CreateAllExpress Week01-ModularPattern
```

## Step 02: Check Setup {#check-setup}

Run the following command in the root of your project directory:

```bash
check-karma-grunt-config > CheckSetup.txt
```

This pipes the output from **check-karma-grunt-config** into a text file. If you open the text file in an editor it will look odd, but you can view it properly with the following command:

```bash
cat CheckSetup
```

All the checks should be green. You should add this file to your repository so I can view it when I pull your work down.

Handle this command the same way you did **CheckSetup**:

```bash
karma start --single-run > TestResults.txt
```

Also run **grunt check** now, and once again before you turn in the project. Make sure it comes back clean.

## Step03: Setup elf Object Failing Test {#elf-fail}

Add the following test to the **Elvenware Simple Plain Suite** in **spec/test-basic**:

```javascript
it('expects the elf object to exist', function() {
   expect(elf).toBeDefined();
});
```

Save the results of a **single-run** test to **TestResults02.txt**:

```bash
karma start --single-run > TestResults02.txt
```

I'm looking for the failed result. This test should fail. Our mantra is:

- Red, Green, Refactor
- Write a failing test
- Make the test pass
- Do any refactoring necessary to clean up our code

## Step 04: Setup elf Object

Create a file called **public/javascript/my-object.js**. Put the following content in it:

```javascript
var elf = {};
```

Run your test and place your results **RestResult03**:

```bash
karma start --single-run > TestResults03.txt
```

If you run **cat TestResults03.txt** you should see that two tests passed.

**NOTE**: *You don't have to pipe the output into a text file the first time you run a test. You can just send the output to standard out until you get the results you want, and then pipe them into a file. Before piping the content into a file you can treat **single-run** as an option that you can use or not use, as needed. In other words, any of these options would work, depending on your taste:*

```bash
npm test
karma start
karma start --single-run
```

To see all the karma start options, type **karma start --help,**, like this:

```bash
$ karma start --help
Karma - Spectacular Test Runner for JavaScript.

START - Start the server / do a single run.

Usage:
  /home/charlie/npm/bin/karma start [<configFile>] [<options>]

Options:
  --port                <integer> Port where the server is running.                            
  --auto-watch          Auto watch source files and run on change.                             
  --no-auto-watch       Do not watch source files.                                             
  --log-level           <disable | error | warn | info | debug> Level of logging.              
  --colors              Use colors when reporting and printing logs.                           
  --no-colors           Do not use colors when reporting or printing logs.                     
  --reporters           List of reporters (available: dots, progress, junit, growl, coverage). 
  --browsers            List of browsers to start (eg. --browsers Chrome,ChromeCanary,Firefox).
  --capture-timeout     <integer> Kill browser if does not capture in given time [ms].         
  --single-run          Run the test when browsers captured and exit.                          
  --no-single-run       Disable single-run.                                                    
  --report-slower-than  <integer> Report tests that are slower than given time [ms].           
  --help                Print usage and options. 
```

## Step 05: Test for elf.initialize {#elf-initialize}

Let's write two tests this time:

```javascript
    it('expects to find an elf.initialize to be defined', function() {
        expect(elf.initialize).toBeDefined();
    });

    it('expects to find an elf.initialize method', function() {
        expect(typeof elf.initialize).toBe('function');
    });
```

Show me the failing results:

```bash
 karma start --single-run > TestResults04.txt

```

## Step 06: Create the initialize method {#init-method}

Implement the method in **my-object.js**:

```javascript
var elf = {
    initialize: function() {}
};

```

And you guessed it:

```bash
karma start --single-run > TestResults05.txt
```

## Step 07: Create MyObject Failing Test {#create-my-object-failing}

Do this:

```
bower install jasmine-jquery --save
```

Make sure the Jasmine Jquery path is right in **karma.conf.js**:

```
        files: [
            'public/components/jquery/dist/jquery.min.js',
            'public/components/jasmine-jquery/lib/*.js',
            'public/javascripts/*.js',
            'spec/**/*.html',
            'spec/test*.js'
        ],
```

Then create your fixture:

```
grunt fixture
```

The test:

```javascript
    it('expects to elf.MyObject to be defined', function() {
        expect(elf.MyObject).toBeDefined();
    });
```

Show that it fails:

```
karma start --single-run > TestResults06.txt
```

## Step 08: Create MyObject {#create-my-object}

The implementation:

In **my-object.js**:

```javascript
var elf = {
    initialize: function() {
        new elf.MyObject();
    }
};

elf.MyObject = (function() {

    function MyObject() {}

    return MyObject;
}());

```

In **control.js**:

```javascript
$(document).ready(function() {
    'use strict';

    elf.initialize();
});
```

And now exclude **control.js** from the list of files loaded in **karma.conf.js**:

```javascript
// list of files to exclude
exclude: ['public/javascripts/control.js'],
```

Show that the test works:

```bash
karma start --single-run > TestResults07.txt
```

## Step09: Test Interface

Set up your fixture so we can test the interface:

```bash
grunt fixture
```

Open **spec/fixtures/fixture.html to make sure it worked**.

Load the fixture near the top of **test-basic**: 

```javascript
beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
    loadFixtures('fixture.html');
});
```

And put these near the bottom:

```javascript
    it('expects to elf.myObject to be defined', function() {
        elf.initialize();
        expect(elf.myObject).toBeDefined();
    });

    it('shows that clicking the button calls MyObject.runMyObject', function() {
        spyOn(elf.MyObject.prototype, 'runMyObject');
        elf.initialize();
        $('#runMyObject').trigger('click');
        expect(elf.MyObject.prototype.runMyObject).toHaveBeenCalled();
    });
```

And then record the failing results:

```bash
karma start --single-run > TestResults08.txt
```

## Step10: Create Interface

We want to create an interface like this, where the text shown near the bottom appears when we click the button:

![Module Pattern Basics](https://s3.amazonaws.com/bucket01.elvenware.com/images/ModularPatternBasics.png)

In **views/index.jade**:

```jade
extends layout

block content
  h1= title
  p Welcome to #{title}

  button#runMyObject Run My Object

  pre#displayArea
```

In **layout.jade**, make sure you load **my-object.js**.  In **routes/index.js**, set the title to include your last name.

In **my-object.js** setup the button click event handler:

```javascript
var elf = {
    initialize: function() {
        elf.myObject = new elf.MyObject();
    }
};

elf.MyObject = (function() {

    function MyObject() {
        $('#runMyObject').click(this.runMyObject);
    }

    MyObject.prototype.runMyObject = function() {
        $('#displayArea').html('MyObject is running');
    };

    return MyObject;
}());
```

Then pipe the results into **TestResults09.txt**. It should look something like this: 

```
$ karma start --single-run 
08 01 2016 20:28:32.692:INFO [karma]: Karma v0.13.19 server started at http://localhost:9876/
08 01 2016 20:28:32.696:INFO [launcher]: Starting browser PhantomJS
08 01 2016 20:28:32.851:INFO [PhantomJS 1.9.8 (Linux 0.0.0)]: Connected on socket /#-yyI6MdjGv8s2LE4AAAA with id 73142100

  Elvenware Simple Plain Suite
    ✓ expects true to be true
    ✓ expects the elf object to exist
    ✓ expects to find an elf.initialize to be defined
    ✓ expects to find an elf.initialize method
    ✓ expects to elf.MyObject to be defined
    ✓ expects to elf.myObject to be defined
    ✓ shows that clicking the button calls MyObject.runMyObject

PhantomJS 1.9.8 (Linux 0.0.0): Executed 7 of 7 SUCCESS (0.041 secs / 0.008 secs)
TOTAL: 7 SUCCESS
```

## Turn it in

Submit your code in the appropriate folder of your repository. Make sure **TestResults01.txt** - **TestResults09.txt** are included. Also, make sure the code works when you run it.

