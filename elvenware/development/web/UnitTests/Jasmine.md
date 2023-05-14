---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests/Jasmine.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests
fileName: Jasmine.md
relativePath: /web/UnitTests/Jasmine.md
title: Jasmine
directoryName: UnitTests
category : cssguide-guide
---

Jasmine
======

Jasmine is a unit testing tool for JavaScript. There are many
examples of how to use it in JsObjects.

- [Jasmine on JsObjects](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests)

## Jasmine Basics

In this project we use Jasmine to compose a test suite called "Angular Basic Tests." We put code like the following in **test/spec/test.js**:

```javascript
describe('Angular Basic Tests', function() {
    'use strict';
});
```

This code sets up a Jasmine Test Suite called 'Angular Basic Tests'. We group related tests inside Jasmine test suites. In particular, we will place two things inside these suite:

- Our tests.
- Code to set up and tear down the environment in which we want our suites to run

**NOTE**: _Tests are sometimes called specs, which is short for specification. This is particular true in Behavior Driven Testing._

Our tests begin with a call to the function **it()**:

```javascript
describe('Angular Basic Tests', function() {
    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });
});
```

The **it** method takes two parameters:

- A string specifying the purpose of the test.
- A callback.

Inside the callback we use the built in **expect** method. Our tests usually check boolean conditions. In this case, we test whether **true** is equal to **true**. In unit testing, we try to create methods that can be verified with boolean statements. For instance, we can use a boolean statement to confirm that a method called **add** returns the value **5** when passed **3** and **2**.

We frequently also include methods that set up the environment in which our tests run. These set up methods include calls to the Jasmine **beforeEach()** and **afterEach()** methods. Those methods are called before and after each test.

```javascript
describe('Angular Basic Tests', function() {
  'use strict';

  var name = "";

  beforeEach(function() {
    name = 'Sally';
  });

  it('expects true to be true', function() {
    expect(true).toBe(true);
  });

  it("is just a function, so it can contain any code", function() {
    name = name + ' Coder'
    expect().toEqual('Sally Coder');
  });
});
```

In the above code, we use a **beforeEach** method to ensure that name is set to 'Sally' before each test is run. Even if one of the tests modifies the string, the **beforeEach** method will reinitialize it to 'Sally'.

## Jasmine Server

This section shows how to set Jasmine up to do server side tests. We will discuss setting Jasmine up for the client elsewhere.

Install jasmine globally:

```bash
npm install -g jasmine
```
Create the **/spec/support/jasmine.json** file. It should contain something like this:

```javascript
{
  "spec_dir": "spec",
  "spec_files": [
    "**/test*.js"
  ]
}
```

This bit of JSON tells Jasmine that our tests are in a directory called **spec** and that each file that contains tests begins with the word **test**. For instance: **test-basic.js** or **test-state-parser.js**.

Here is an example test suite called **test-basic.js** to put in your spec directory:

```javascript
describe('Object Basics with Require', function() {

    it('proves true is true', function() {
        expect(true).toBe(true);
    });

    it('proves that one is smaller than two', function() {
        expect(1).toBeLessThan(2);
    });

});
```

This test suite contains two simple tests. One tests that **true** is equal to **true**, the other that 1 is smaller than 2.

## Reporter

To run your test, type the following:

```
jasmine
```

However, it is nice to have a good reporter set up. I like the jasmine-spec-reporter:

```
npm install jasmine-spec-reporter --save-dev
```

Create a file called **jasmine-runner.js** that looks like this:

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

Run it with either of the following commands:

```bash
node jasmine-runner.js
nodemon jasmine-runner.js
```

You can put the command shown above, or some variant on it, in your **package.json** file:

```javascript
"scripts": {
  "test": "node jasmine-runner.js"
},
```

Now you can type **npm test** to run your tests.

##Jasmine Spy

The [JasmineSpy](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/JasmineSpyOn) program demonstrates how to:

* Use Jasmine to test async calls
* SpyOn to create mock objects

## Focused Tests

Use the new *focused specs* feature from Jasmine 2.1 to work with one suite at a time. To do this, change **describe** to **fdescribe** or **it** to **fit**. It you make a suite with **fdescribe**, then just that one suite will run and the others won't clutter your screen:

- [Focused Spec Examples][fse]
- [Focused Spec Announcement for Jasmine 2.1][fsa]

[fse]: http://jasmine.github.io/2.1/focused_specs.html
[fsa]: https://blog.pivotal.io/labs/labs/new-key-features-jasmine-2-1

Don't forget to add this to **karma.conf.js**:

```javascript
reporters: ['spec'],

specReporter: {
    suppressSkipped: true // do not print information about skipped tests
},

plugins: [
    'karma-jasmine',
    'karma-spec-reporter',
    etc...
]

```
## Async

The Async calls use done:

	it("Integration test makes a real AJAX request", function(done) {
		textLoader.loadFile("Sources.html", function(responseText) {
			var bar = $(responseText).filter('#paragraph04').html();
			expect(bar).toBe('Fine time.');
			done();
		});
	});

Looking at the function above, do you see that the test is past **done**
as a parmater? Notice also that it calls **done()** when it is finished.
The call to done notifies Jasmine that your callback is complete.

## SpyOn

Create a mock object and instrument the object so that you can learn
key facts such as:

- Was the mock object called?
- What parameters were passed to the mock object

	it("Tests that loadFile is called with Sources.html", function() {
		// get is stubbed and never really called
		spyOn($, "get");
		textLoader.loadFile("Sources.html", function(data) {
			console.log(data);
		});
		expect($.get).toHaveBeenCalledWith("Sources.html", 	jasmine.any(Function));
	});

Here we use SpyOn to mock **jQuery.get()**:

	spyOn($, "get");

Once we have mocked it, we cn ask questions, such what parameters was it called
with:

	expect($.get).toHaveBeenCalledWith("Sources.html", 	jasmine.any(Function));

Our question here is simple: *Was **get** called with two parameters. The first
a string, the second a function. We expect the first parameter, the string, to
be "Sources.html".

When we mock an object, it is never called. Instead it is stubbed. A fake object
is put in its place.

## SpyOn Ajax

Like this:

```javascript
beforeEach(function() {
    spyOn($, 'ajax').and.callFake(function(ajaxObject) {
        ajaxObject.success(deliciousLinks);
        return {
            fail: function() {}
        };
    });
});
```

Or like this:

```javascript
spyOn($, 'getJSON').and.callFake(function(url, success) {
    success(bitlyLinks);
    return {
        fail: function() {}
    };
});
```

Or, if you want to go all the way, handling, **success**, **done**, **fail** and **always**, then like this:

```javascript
beforeEach(function () {
    spyOn($, 'getJSON').and.callFake(function (url, params, success) {
        success(tweets);
        return {
            done: function () {
                return {
                    fail: function () {
                        return {
                                always: function () {
                            }
                        }
                    }
                }
            }
        };
    });
});
```

The latter is for calls like this that have **success**, **done**, **fail** and **always** function:

```javascript
searchFull: function () {
    'use strict';
    var searchQuery = $('#searchQuery').val();
    $.getJSON('/search', {
        'q': searchQuery
    }, function (result) {
        $('#tweetData').html(JSON.stringify(result, null, 4));
        elfTwitter.clearControls();
        $.each(result.statuses, function (index, tweet) {
            if (tweet.entities.urls.length > 0) {
                elfTwitter.appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
            } else {
                elfTwitter.renderTable(tweet.text, tweet.user.name);
                $('#tweetList').append('<li>' + tweet.text + '</li>');
            }
        });
    }).done(function () {
            console.log('second success');
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
            console.log(jqxhr);
            $('#displayContainer').html(jqxhr.responseText);
        })
        .always(function () {
            console.log('Always');
        });
},
```

# Install Jasmine-node

	sudo npm install -g jasmine-node

You will also want to install request locally:

	npm install request

Or

	npm install request --save-dev

# Create Route

Create a simple route you want to test:

	app.get('/hello', function(request, response) { 'use strict';
		response.send('Hi there.');
	});


# Basic Jasmine-Node

Save the following as **Tests/SimpleSpec.js**:

	var request = require('request');

	describe("A suite", function() {
		it("should respond with hello world", function(done) {
			request("http://localhost:30025/hello", function(error, response, body) {
				expect(body).toEqual("Hi there.");
				done();
			});
		});
	});

Your tests must be saved in a file that has spec as the last four
letters in the name. For instance: FooSpec.js is good. SpecFoo.js
is not good.

# Run the test:

Now run start your server running in one shell:

	node Server.js

Then open a second shell and run your tests:

	jasmine-node Tests/

# Permanently Delete from Git Repository

A tool called BFG can make permanently deleting files from a repository
fairly easy.

- [Elvenware Git](http://www.elvenware.com/charlie/development/cloud/Git.html#permanent-delete)

## Before Each

**beforeEach** methods load before each test is run. **afterEach** methods are loaded after each test is run.

This **beforeEach** statement loads your angular module:

```javascript
beforeEach(module('elfApp'));
```

Specically, it loads the module that you define like this in **app.js** and use in **main.js** and **about.js**:

```javascript
var myModule = angular.module('elfApp', ['ngRoute']);
```

This **beforeEach** loads you HTML fixture:

```javascript
beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
    loadFixtures('renewable.html');
});
```

This before each does three things:

```javascript
beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_, _$controller_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $templateCache = _$templateCache_;

    mainController = _$controller_('MainController', {
        $scope: scope
    });
}));
```

First, it gets the scope that you are using in your application. I believe that this is a global scope object for the entire app, and this line narrows the scope down to work only with the scope of your controller:

```javascript
mainController = _$controller_('MainController', {
    $scope: scope
});
```

The above code also loads your controller.

These line gets the compile and templateCache, both of which are needed to process our fixture so that it is converted from an angular template to live HTML that contains resolved references to scope variables:

```javascript
$compile = _$compile_;
$templateCache = _$templateCache_;
```

There are also beforeEach and afterEach calls to load **$httpBackend**:

```javascript
beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$controller_) {
    scope = _$rootScope_.$new();
    var $compile = _$compile_;
    $httpBackend = _$httpBackend_;
    mainController = _$controller_('MainController', {
        $scope: scope
    });
}));

afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
});
```

The beforeEach shown above is the same as the ones we looked at before, except it does not get the compile and templateCache for handling fixtures, and instead it gets httpBackend. We use **httpBackend** for mocking calls to the server. Instead of aclled $http.get directly, we use httpBackend calls such as this to mock or fake the call to the server. Instead of making a real call, we just return pre-defined data:

```javascript
var requestHandler = $httpBackend
    .when('GET', 'data/Renewable.json')
    .respond(PUT THE MOCK DATA HERE);

$httpBackend.expectGET('data/Renewable.json');
scope.getRenewable();
$httpBackend.flush();
expect(scope.renewable[0].Year).toEqual('2017');
```

The **afterEach** code will raise an error if your set up a call to **httpBackend** but don't ever execute it by calling **httpBackend.flush()**.
