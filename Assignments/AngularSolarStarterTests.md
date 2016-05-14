## Overview

Look at [directive template names][dir-names] slide. This shows that we can use a template called **elfRenewable** in several difference ways in our angular templates. In other words there are more choices than just <elf-renewable></elf-renewable>

[dir-names]: https://docs.google.com/presentation/d/1QHZunZfwAQIplala60HkLaGYaRGzJ5eO4oKIg_S1iyk/edit#slide=id.g9ad18c47f_0_91

**NOTE** _Be sure to remove controller as from **public/javascripts/app.js**. In general, scour your files looking for and removing the case sensitive references to **mainController**. Don't remove **MainController**, but do remove **mainController**. Look at least in all your javascript jade and html files._

## Branching

The description of the branching part of this assignment can now be find here:

- [Git Branch Weeks][git-branch-weeks]

[git-branch-weeks]: http://www.ccalvert.net/books/CloudNotes/Assignments/GitBranchWeeks.html

## Loading Files

Before getting started, make sure you are loading **angular-route.js** in the files section of **karma-conf.js**. We load this file in **layout.jade**, so we should be sure to load it here.

```javascript
files: [
  'public/components/jquery/dist/jquery.min.js',
  'public/components/angular/angular.js',
  'public/components/angular-mocks/angular-mocks.js',
  'public/components/angular-route/angular-route.js',
  'node_modules/jasmine-jquery/lib/*.js',
  etc...
```

We also need **angular-mocks** in our tests, but not in our program. That is why it is included here but not in **layout.jade**.

## All Tests

Now it is time to start filling out all our tests. When done, all our tests should look at least a bit like this:

<pre>
$ karma start
11 05 2016 11:40:58.127:WARN [karma]: No captured browser, open http://localhost:9876/
11 05 2016 11:40:58.140:INFO [karma]: Karma v0.13.22 server started at http://localhost:9876/
11 05 2016 11:40:58.146:INFO [launcher]: Starting browser PhantomJS
11 05 2016 11:40:58.689:INFO [PhantomJS 2.1.1 (Linux 0.0.0)]: Connected on socket /#JH6RX6HZ4uCmsKBMAAAA with id 91505964

  Elvenware Fixture and Template Cache Suite
    ✓ expects true to be true
    ✓ should find the index
    ✓ should have a getRenewable method
    ✓ should be possible to access the fixture
    ✓ tests template loaded through simple raw text
    ✓ tests template loaded through more complex raw text
    ✓ tests scope variable access in template loaded through fixture

  Elvenware Simple Mocks with HttpBackend Suite
    ✓ proves we can run tests
    ✓ should find the index
    ✓ should have a getRenewable method
    ✓ proves we can detect request

  Renewables Suite
    ✓ proves we can run tests
    ✓ proves we can get renewableUtils name
    ✓ proves we can get renewableUtils method called getItemCount
    ✓ proves we can get from renewableUtils a particular renewable object by index
    ✓ proves we can transform our json into a new array consisting only of years
    ✓ proves our array of years contains the expected data
    ✓ proves we can transform our json into an array with three properties: geo, solar, and wind
    ✓ proves that getSimpleStringFormat returns the expected string data
    ✓ proves that getSimpleFormat returns the expected numeric data

  Simple Format HttpBackend Suite
    ✓ expects true to be true
    ✓ tests simple-format directive loaded through fixture with httpBackend
    ✓ tests that we can index through simple-format directive

  Simple Format Suite
    ✓ expects true to be true
    ✓ should find the index
    ✓ should be possible to access the fixture
</pre>

It will take us a while to get there. But this gives you sense of where we are headed.

## HttpBackend

Use the Angular **$httpBackend** object from **angular-mocks** to fake or "mock" the loading of JSON from the server.

**NOTE**: _Angular mocks and httpBackend do much more than just allow us to mock loading JSON, but lets start there, and move on to mocking whole objects a bit later on. If you have not done so already, to install angular-mocks type this: **npm install angular-mocks --save-dev**._

For more on httpbackend, seeL

- The last few slides here: [http://bit.ly/unittestasync](http://bit.ly/unittestasync)
- [Elvenware on httpBackend][elf-http-backend]

## Get Started

Create a test called **spec/test-mocks.js**:

```javascripts
describe('Elvenware Test Mocks Suite', function() {

    'use strict';

    fit('proves we can run tests', function() {
       expect(true).toBe(true);
    });
});
```

Make sure it works.

Now angularize it by loading the **MainController**, this time adding code to load $httpBackend and adding one test to be sure we can access the **$scope** of our **MainController**:

```javascript
describe('Elvenware Test Mocks Suite', function() {

    'use strict';

    var $httpBackend;
    var scope;
    var mainController;

    // Set up the module
    beforeEach(module('elfApp'));

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

    it('proves we can run tests', function() {
       expect(true).toBe(true);
    });

    it('should find the index', function() {
      expect(scope.index).toBe(0);
    });

});
```

Notice that we also have an **afterEach** section. This ensures that there are no pending http request after our tests. In particular, we are going to use **$httpBackend** to mock the act of loading JSON. When doing so, we will set up some mock $http requests. The **afterEach** method tests that we actually called these mocks, rather than leave them hanging. This helps us ensure that we are doing what we set out to do, and that the next test starts with a clean slate.

As mentioned earlier, we add a test from our **test-basic** file that ensures we can access the index declared out **MainController's** scope. It is just a sanity check to ensure we are in a stable state and can access our **MainController**.

[elf-http-backend]: http://www.elvenware.com/charlie/development/web/JavaScript/Angular.html#mocking-objects-with-httpbackend

## Mocking JSON Requests

Here is a test that actually mocks the **$http.get** call in our **getRenewable** method. This method, as you know, retrieves data from the server. Only this time, instead of getting data from a real server, we put in our own mock data instead:

```javascript
it('proves we can mock getting JSON data', function() {

  var renewable = [{
      "Year": "2017",
      "Solar (quadrillion Btu)": "0.8045307",
      "Geothermal (quadrillion Btu)": "0.2349284",
      "Other biomass (quadrillion Btu)": "0.50916",
      "Wind power (quadrillion Btu)": "2.202328",
      "Liquid biofuels (quadrillion Btu)": "1.2329197",
      "Wood biomass (quadrillion Btu)": "1.9860924",
      "Hydropower (quadrillion Btu)": "2.5859957"
  }];

  // Define what happens when $http.get() is called.
  var requestHandler = $httpBackend
      .when('GET', 'data/Renewable.json')
      .respond(renewable);

  $httpBackend.expectGET('data/Renewable.json');
  scope.getRenewable();
  $httpBackend.flush();
  expect(scope.renewable[0].Year).toEqual('2017');

});
```

Put this method at the bottom of your **test-mocks.js** and make sure it works.

## Create JSON JavaScript

Create a JavaScript file called **spec/data/json-as-js-renewables.js**. Inside it, put **renewables.json**. It should begin a bit like this:

```javascript
var renewables = [{
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
    etc.
```

There is no real need to format, syntax check or run JSCS on this file. As a result, you can exclude the entire **data** directory from those tools. In general, whenever we create a data directory, we should tell JSCS and JsBeautify to leave it alone. It might be useful to run JsHint over that directory, but it is not strictly necessary.

## Testing Renewables

Add this to **karma.conf.js** files:

```javascript
'spec/data/*.js',
```

Put it right before or after you load the tests:

```javascript
'spec/**/*.html',
'spec/data/*.js',
'spec/test*.js'
```

## Create renewables-utils

You need to create a file called **renewables-utils.js**. For now, we can put it in the **public/javascripts** folder. Later on we can spend some time organizing our files so they are divided by category and easier to find.

Don't forget to add it to **layout.jade**!

Here is the structure for the RenewableUtils function object:

```javascript
var elfApp = angular.module('elfApp');

function RenewableUtils() {
    'use strict';

    var renewables;

    this.name = 'renewableUtils';

    this.init = function(initRenewables) {
        renewables = initRenewables;
    };

    this.getItemCount = function() {
        // YOUR CODE HERE
    };

    this.getByIndex = function(index) {
        // YOUR CODE HERE
    };

    this.getYears = function() {
        return renewables.map(function(renewable) {
            return renewable.Year;
        });
    };

    // YOU WRITE THE LASt TWO METHODS
}

elfApp.service('renewableUtils', RenewableUtils);
```

Note that this code has three sections. The first references our module:

```javascript
var elfApp = angular.module('elfApp');
```

**NOTE**: _We are still working with only one module. The purpose of modules is to help us divide the code for bit programs into discreet sections much as we divide a book into chapters. Soon we will create more than one module, but for now, continue working with elfApp. I mention this because there is argument for putting this object in its own module. But we will take that step later._

The section section is the implementation of our new object:

```javascript
function RenewableUtils() {
    'use strict';
    // CODE OMITTED HERE
}
```

Finally, we put our object in something called an Angular service:

```javascript
elfApp.service('renewableUtils', RenewableUtils);
```

A service is a major Angular tools like a **controller** or **directive**. It is very similar to an angular **factory**, which we will likely study later in the quarter. In general, we tend to refer to Angular tools of this type as **providers**.

As you can hopefully see, a service is designed to help you create a clearly partitioned place for you objects. In other words, a service is wrapper for an object. We wrap it so it can be partitioned from the rest of our code, so it can support code injection, and in general, so it acts in the way that Angular believes your objects ought to can.

As stated above, you can, and should use code injection to inject this object into your controllers or other objects as needed. Here for instance, is how we will inject this service into our **MainController**:

```javascript
elfApp.controller('MainController', function($scope, $http, renewableUtils) {

     // CODE FOR mainData and index THAT HAS NOT CHANGED OMITTED HERE

     $scope.getRenewable = function() {
         // console.log('getRenewable');
         $http.get('data/Renewable.json')
             .then(function(res) {
                 renewableUtils.init(res.data);
                 $scope.renewable = res.data;
                 $scope.renewableUtils = renewableUtils;
                 $scope.simpleFormat = renewableUtils.getSimpleFormat();
             });
     };

})
```

Note that inside our **MainController**, we updated the call to **getRenewable**. It now initializes the renewableUtils object. In particular, it passes the content of our **Renewable.json** file to the object. The object can then be used to perform certain operations on that JSON data. A main task of our program will be to manipulate the data found in JSON files and show the results to the user. So this is clearly a very important part of our program.

For the curious, and we should all be curious, here are the angular docs on factories, provides, services and so on:

- [Providers](https://docs.angularjs.org/guide/providers)
- [Services](https://docs.angularjs.org/guide/services)


## Create test-renewables

As you no doubt noticed, we did not complete **RenewableUtils** object found in **renewables-utils.js**. To help you complete that task, I have created a suite of unit tests that should guide you step by step through the process of implementing the **renewable-utils.js** object. The tests are shown below.

Put these tests for **renewable-utils.js** in a file called **spec/test-renewables.js**. Update the implementation of **RenewableUtils** so that all these tests will pass.

Before you work with these tests, take a careful look at the third call to **beforeEach** found in the tests:

```javascript
beforeEach(function() {
    //scope.renewableUtils.init(renewables);
    var requestHandler = $httpBackend
        .when('GET', 'data/Renewable.json')
        .respond(renewables);

    $httpBackend.expectGET('data/Renewable.json');
    scope.getRenewable();
    $httpBackend.flush();
});
```

As we did earlier in this assignment, we use **$httpBackend** to ensure that any calls to **$http.get** will "mock load" our data. In particular, it will load our renewables data by called **MainController.getRenwable**. You saw this method in the previous section. As you recall, it loads **Renewable.json** and passes it to our RenewableUtils object. This ensures that our utilities have data on which they can perform various operations. The object is meant to manipulate the data found in the JSON file, so obviously it needs a copy of the JSON before it can work its magic.

**NOTE**: _Don't just hurry through the assignment at this point. Take some time to make sure you understand what is happening. These kinds of operations are performed all the time in JavaScript programs, and you need to be sure you understand how they work. In particular, we need to properly partition off our objects, then feed them exactly the right amount of data so they can perform their task._

Here are the tests. Your job is to get them to pass by changing RenewableUtils. The tests themselves should not change:

```javascript
describe('Renewables Suite', function() {
    'use strict';

    var $httpBackend;
    var scope;
    var mainController;

    // Set up the module
    beforeEach(module('elfApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$controller_) {
        scope = _$rootScope_.$new();
        var $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        mainController = _$controller_('MainController', {
            $scope: scope
        });
    }));

    beforeEach(function() {        
        var requestHandler = $httpBackend
            .when('GET', 'data/Renewable.json')
            .respond(renewables);

        $httpBackend.expectGET('data/Renewable.json');
        scope.getRenewable();
        $httpBackend.flush();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('proves we can run tests', function() {
        expect(true).toBe(true);
    });

    it('proves we can get renewableUtils name', function() {
        expect(scope.renewableUtils.name).toBe('renewableUtils');
    });

    it('proves we can get renewableUtils method called getItemCount', function() {
        expect(scope.renewableUtils.getItemCount()).toBe(12);
    });

    it('proves we can get from renewableUtils a particular renewable object by index', function() {
        var renewable = scope.renewableUtils.getByIndex(0);
        expect(renewable.Year).toBe('2017');
    });

    it('proves we can transform our json into a new array consisting only of years', function() {
        var years = scope.renewableUtils.getYears();
        expect(years.length).toBe(12);
    });

    it('proves our array of years contains the expected data', function() {
        var years = scope.renewableUtils.getYears();
        expect(years[0]).toBe('2017');
        expect(years[1]).toBe('2016');
        expect(years[5]).toBe('2012');
    });

    it('proves we can transform our json into an array with three properties: geo, solar, and wind', function() {
        var simpleFormat = scope.renewableUtils.getSimpleFormat();
        var keys = Object.keys(simpleFormat[0]);
        keys.sort();
        expect(keys).toEqual(['geo', 'solar', 'wind']);
    });

    it('proves that getSimpleStringFormat returns the expected string data', function() {
        var simpleFormat = scope.renewableUtils.getSimpleStringFormat();
        expect(simpleFormat[0].geo).toBe('0.2349284');
        expect(simpleFormat[0].wind).toBe('2.202328');
        expect(simpleFormat[0].solar).toBe('0.8045307');
        expect(simpleFormat[5].geo).toBe('0.211592042');
        expect(simpleFormat[5].wind).toBe('1.3393646844');
        expect(simpleFormat[5].solar).toBe('0.227349746');
    });

    it('proves that getSimpleFormat returns the expected numeric data', function() {
        var simpleFormat = scope.renewableUtils.getSimpleFormat();
        expect(simpleFormat[0].geo).toBe(0.2349284);
        expect(simpleFormat[0].wind).toBe(2.202328);
        expect(simpleFormat[0].solar).toBe(0.8045307);
        expect(simpleFormat[5].geo).toBe(0.211592042);
        expect(simpleFormat[5].wind).toBe(1.3393646844);
        expect(simpleFormat[5].solar).toBe(0.227349746);
    });
});
```

## Turn it in

You know the drill. This will be in the **Week05-Angular_SolarExplorer** in your **week06** branch.

## Before Each

I have moved the section on **beforeEach** here:

- [Jasmine Unit Tests and beforeEach](http://www.elvenware.com/charlie/development/web/UnitTests/Jasmine.html#before-each)
