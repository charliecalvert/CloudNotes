## Overview

The goal of Elf Npm Unit Test is to refine our **Isit322-lastname** packages with new code and unit tests.

Do you work on master or the branch of your choice. Your code will be in **Week02-NpmPackage**.

Add a tag to your repository right now, before you begin work, where you decide on the version number, but use the semver scheme:

```
 git tag -a v1.4.1 -m "my version 1.4.1"
 git push origin --tags
```

- [semver explained](https://docs.npmjs.com/getting-started/semantic-versioning#semver-for-publishers)

## Jasmine

Run **TestReady**. This is a bit of overkill in our case, but it helps set things up properly.

Create the **/spec/support/jasmine.json** file. It should contain something like this:

```javascript
{
  "spec_dir": "spec",
  "spec_files": [
    "**/test*.js"
  ]
}
```

## Reporter

This is jasmine for node, and you can run it like this:

```
jasmine
```

However, it is nice to have a good reporter set up. So we should, one way or another, do the equivalent of:

```
npm install jasmine-spec-reporter --save
```

Then create a file called **jasmine-runner.js** that looks like this:

```javascript
var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter');
var noop = function() {};

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({
    print: noop
}); // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter()); // add jasmine-spec-reporter
jrunner.loadConfigFile(); // load jasmine.json configuration
jrunner.execute();
```

Run it like this:

```bash
nodemon jasmine-runner.js
```

You can put the command shown above, or some variant on it, in your **package.json** file:

```javascript
"scripts": {
  "test": "node jasmine-runner.js"
},
```

Now you can type **npm test** to run your tests.

## Some more utilities

Add these to your utils file:

```javascript
function getExtension(fileName) {
    'use strict';
    fileName = fileName.trim();
    var array = fileName.split('.');
    if (array.length === 1 || (array[0] === '' && array.length === 2)) {
        return '';
    }
    return array.pop().toLowerCase();
}

function swapExtension(fileName, ext) {
    'use strict';
    return fileName.substr(0, fileName.lastIndexOf('.')) + ext;
}

function isArray(itemToCheck) {
    'use strict';
    return Object.prototype.toString.call(itemToCheck) === '[object Array]';
}

function getHomeDir() {
    'use strict';
    var homeDir = null;
    if (os.platform() === 'linux') {
        homeDir = process.env.HOME;
    } else if (os.platform() === 'win32') {
        homeDir = process.env.USERPROFILE;
    }
    return homeDir;
}

function insertString(fileName, itemToInsert, index) {
    'use strict';
    var output = [fileName.slice(0, index), itemToInsert, fileName.slice(index)].join('');
    return output;
}

function removeFromEndAtCharacter(value, char) {
    'use strict';
    return value.substring(0, value.lastIndexOf(char));
}
```

## Test

Write tests for each of these methods.

Write tests that show you can use your log. Use this method in your tests:

```javascript
elfLog.setMessage = function(level, message) {
    'use strict';
    if (level >= this.debugLevel) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }
        var output = this.getLevel(level) + ': ' + message;
        return output;
    }
    return '';
};
```

Put elf-config in your packagen and write tests that show you can use it.

## Custom reporter

If you ever get a hankering to create your own custom reporter, here is a start:

```javascript
/**
 * Created by charlie on 3/1/16.
 */

var myReporter = {

    jasmineStarted: function(suiteInfo) {
        'use strict';
        console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
    },

    // suiteStarted is invoked when a describe starts to run
    suiteStarted: function(result) {
        'use strict';
        console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName);
    },

    // specStarted is invoked when an it starts to run (including associated beforeEach functions)
    specStarted: function(result) {
        'use strict';
        console.log('Spec started: ' + result.description + ' whose full description is: ' + result.fullName);
    },

    // specDone is invoked when an it and its associated beforeEach and afterEach functions have been run.
    // While jasmine doesn’t require any specific functions, not defining a specDone will make it
    // impossible for a reporter to know when a spec has failed.
    specDone: function(result) {
        'use strict';
        console.log('Spec: ' + result.description + ' was ' + result.status);
        for (var i = 0; i < result.failedExpectations.length; i++) {
            console.log('Failure: ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
        console.log(result.passedExpectations.length);
    },

    // suiteDone is invoked when all of the child specs and suites for a given suite have been run
    // While jasmine doesn’t require any specific functions, not defining a suiteDone will make it
    // impossible for a reporter to know when a suite has failures in an afterAll.

    suiteDone: function(result) {
        'use strict';
        // The result here is the same object as in suiteStarted but with the addition of a status and a
        // list of failedExpectations.

        console.log('Suite: ' + result.description + ' was ' + result.status);
        for (var i = 0; i < result.failedExpectations.length; i++) {

            /*
                Any failedExpectations on the suite itself are the result of a failure in an afterAll.
                Each failedExpectation has a message that describes the failure and a stack trace.
             */

            console.log('AfterAll ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    },

    jasmineDone: function() {
        'use strict';
        console.log('Finished suite');
    }
};

module.exports = myReporter;
```

And the code to run it looks like this:

```javascript
/**
 * Created by charlie on 3/1/16.
 */

var Jasmine = require('jasmine');
var customReporter = require('./custom-reporter');

var jasmineRep = new Jasmine();

//or wherever your config file is, you can use .loadConfig to pass in an object instead of a file
jasmineRep.loadConfigFile('spec/support/jasmine.json');
// add your custom reporter
jasmineRep.addReporter(customReporter);
// adds the console reporter
// jasmine.configureDefaultReporter();
jasmineRep.execute();
```
This is mostly cut and paste, so go ahead and do it, just so you will know how to create started if you ever want to create a custom reporter. Not really likely, but it could be useful at some point.

## Update your Package

You will need to update the package:

```bash
npm version minor
npm publish
```

## Turn it in

Your code will be in **Week02-NpmPackage**. Push your repository then add a tag to your repository, where the minor version number is incremented:

```
 git tag -a v1.5.0 -m "After ElfNpmUnitTest class 1.5.0"
 git push origin --tags
```
