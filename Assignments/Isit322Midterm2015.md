---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Isit322Midterm2015.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: Isit322Midterm2015.md
relativePath: /Isit322Midterm2015.md
title: Isit322Midterm2015
directoryName: Assignments
category : assignments-guide
---

# Isit322 Midterm 2015

We want to bring our Web App based Angular version of our Census data query up to some reasonable simulacrum of a first iteration on the final app.

We are interested in:

- Angular
- Query the census
- Unit tests
- Graphs
- Bootstrap ui

We are not trying to build an Android app at this stage. After the midterm we can try to do things like:

- Create a Cordova app with our angular in it
- Save screenshots to the device
- Email the screen shots to someone
- Maybe change graphs as we tilt the device? 

## More Detail on Goals for Midterm {#details}

The primary goals:

- Six pages:
	- Home
	- States
	- States Graphs
	- Zips
	- Zip Graphs
	- About
- Refactor the controllers, each in own file
	- **AboutController**
	- **MainController**
 	- **StateController**
	- **StateGraphController**
	- **ZipController** 
	- **ZipGraphController**
- Refactor factories
	-  **ChartFactory**
	- **UrlFactory**
- In States graphs
	- Graph Top Fifteen
	- Graph Top Five
	- Graph Bottom Ten
	- Graph Top 7 and Bottom 7
- In Zip Graphs
	- A similar set of buttons to those shown in states graphs
- Modules. At least two:
	- statesApp
	- utils (for ChartFactory and UrlFactory)
- Unit Tests
	- Create at least two minimal tests for each controller. They can be as simple as you want
	- Get my unit tests for the **StateGraphController** to pass
	- Create similar tests for **ZipGraphController**
- Clean up the menu
	- **HeaderController** in **app.js**

## Sample Page

This page is not complete yet, as we need more buttons, and they should be using some nice bootstrap styling, but this gives you a general idea of where we are headed:

![StateGraphs](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGY1B5MzFZdTJKVzQ)

I suppose a drop down instead of buttons would be another option.

Also, we should be able to pick the kind of graph we want.

## Extra Credit

Create a factory for $http.get. Don't call $http.get in multiple controllers, instead create a factory for it and include the factory in the various controllers that need it.

## Menu Highlights

We want to properly highlight menu items as the user selects them:

```
<div class="header" ng-controller="HeaderController">
  <ul class="nav nav-pills pull-right">
     <li ng-class="{ active: isActive('/')}"><a ng-href="#/">Home</a></li>
     <li ng-class="{ active: isActive('/statePop')}"><a ng-href="#/statePop">States</a></li>
     <li ng-class="{ active: isActive('/stateGraphs')}"><a ng-href="#/stateGraphs">State Graphs</a></li>
     <li ng-class="{ active: isActive('/stateZip')}"><a ng-href="#/stateZip">Zips</a></li>
     <li ng-class="{ active: isActive('/about')}"><a ng-href="#/about">About</a></li>

</ul>
        <h3 class="text-muted">States</h3>
      </div>
```

In **app.js** add a controller. :

```
"use srict";

angular
  .module("statesApp", [
    "googlechart",
    etc...
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl"
      })
      etc...
  }).controller('HeaderController', function($scope, $location)
  {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });

```

I suppose you could put the controller elsewhere, but this seems like the simplest place to put it.

## Unit Tests

This is likely to change, but to get started, get all these tests to pass:

```
/**
 * Created by charliecalvert on 2/8/15.
 */


describe('Controller: StatePopulation Mocks', function () {

  'use strict';

  var expect = chai.expect;

  var allStates, AboutCtrl, scope;
  var $http, $httpBackend;

  // load the controller's module
  beforeEach(function() {
    module('statesApp');
    module('googlechart');
  });

  beforeEach(inject(function(_$http_, _$httpBackend_) {
    $http = _$http_;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('StateGraphController', {
      $scope: scope
    });
    // formatted at: http://jsonformatter.curiousconcept.com/
    allStates = [["P0010001", "NAME", "state"], ["4779736", "Alabama", "01"], ["710231", "Alaska", "02"], ["6392017", "Arizona", "04"], ["2915918", "Arkansas", "05"], ["37253956", "California", "06"], ["5029196", "Colorado", "08"], ["3574097", "Connecticut", "09"], ["897934", "Delaware", "10"], ["601723", "District of Columbia", "11"], ["18801310", "Florida", "12"], ["9687653", "Georgia", "13"], ["1360301", "Hawaii", "15"], ["1567582", "Idaho", "16"], ["12830632", "Illinois", "17"], ["6483802", "Indiana", "18"], ["3046355", "Iowa", "19"], ["2853118", "Kansas", "20"], ["4339367", "Kentucky", "21"], ["4533372", "Louisiana", "22"], ["1328361", "Maine", "23"], ["5773552", "Maryland", "24"], ["6547629", "Massachusetts", "25"], ["9883640", "Michigan", "26"], ["5303925", "Minnesota", "27"], ["2967297", "Mississippi", "28"], ["5988927", "Missouri", "29"], ["989415", "Montana", "30"], ["1826341", "Nebraska", "31"], ["2700551", "Nevada", "32"], ["1316470", "New Hampshire", "33"], ["8791894", "New Jersey", "34"], ["2059179", "New Mexico", "35"], ["19378102", "New York", "36"], ["9535483", "North Carolina", "37"], ["672591", "North Dakota", "38"], ["11536504", "Ohio", "39"], ["3751351", "Oklahoma", "40"], ["3831074", "Oregon", "41"], ["12702379", "Pennsylvania", "42"], ["1052567", "Rhode Island", "44"], ["4625364", "South Carolina", "45"], ["814180", "South Dakota", "46"], ["6346105", "Tennessee", "47"], ["25145561", "Texas", "48"], ["2763885", "Utah", "49"], ["625741", "Vermont", "50"], ["8001024", "Virginia", "51"], ["6724540", "Washington", "53"], ["1852994", "West Virginia", "54"], ["5686986", "Wisconsin", "55"], ["563626", "Wyoming", "56"], ["3725789", "Puerto Rico", "72"]];
  }));

  function getData() {
    $httpBackend.whenGET(scope.url).respond(allStates);
    scope.getAllStates();
    $httpBackend.flush();
  }

  it('should get 52 states', function() {
    getData();
    expect(scope.allStates.length).to.equal(52);
  });

  it('should get 10 states in topStates by default', function() {
    getData();
    expect(scope.topStates.length).to.equal(10);
  });

  it('should be able get 15 states in topStates', function() {
    $httpBackend.whenGET(scope.url).respond(allStates);
    scope.getTopFifteenStates();
    $httpBackend.flush();

    expect(scope.topStates.length).to.equal(15);
  });

  it('should have California, Texas and New York in top 10 by default', function() {
    getData();
    expect(scope.topStates[0].c[0].v).to.equal('California');
    expect(scope.topStates[1].c[0].v).to.equal('Texas');
    expect(scope.topStates[2].c[0].v).to.equal('New York');
    expect(scope.topStates[9].c[0].v).to.equal('North Carolina');
  });

  it('should get 5 states in topStates with stateSliceStop', function() {
    $httpBackend.whenGET(scope.url).respond(allStates);
    scope.getTopFiveStates();
    $httpBackend.flush();

    expect(scope.topStates.length).to.equal(5);
  });

  it('should get 3 states in topStates with stateSliceStart and stateSliceStop', function() {
    scope.stateSliceStart = 2;
    scope.stateSliceStop = 5;
    getData();
    expect(scope.topStates.length).to.equal(3);
  });

  it('should get state with smallest population stateSliceStart and stateSliceStop', function() {
    scope.stateSliceStart = 51;
    scope.stateSliceStop = 52;
    getData();
    expect(scope.topStates.length).to.equal(1);
    expect(scope.topStates[0].c[0].v).to.equal('Wyoming');
  });

  it('should get state with smallest population stateSliceStart and stateSliceStop', function() {
    scope.stateSliceStart = 42;
    scope.stateSliceStop = 52;
    getData();
    expect(scope.topStates.length).to.equal(10);
    expect(scope.topStates[0].c[0].v).to.equal('New Hampshire');
    expect(scope.topStates[9].c[0].v).to.equal('Wyoming');
  });

});
```

Like this:

```
  Controller: StatePopulation Mocks
    ✓ should get 52 states
    ✓ should get 10 states in topStates by default
    ✓ should be able get 15 states in topStates
    ✓ should have California, Texas and New York in top 10 by default
    ✓ should get 5 states in topStates with stateSliceStop
    ✓ should get 3 states in topStates with stateSliceStart and stateSliceStop
    ✓ should get state with smallest population stateSliceStart and stateSliceStop
    ✓ should get state with smallest population stateSliceStart and stateSliceStop
```

Then do something similar for the Zip graphs page.

Also have at least two simple tests for each controller you created. The tests don't even have to make sense, they just need to show that you can access something on each page and run a test against it. For instance, you could give each page a title, and prove that you can retrieve the title and confirm that it is set to the expected string.

## Add Chai to Karma

In bower.json, add chai, probably by typing bower install chai --save-dev. I'm include angular mocks and scenario for context, but you only need to add chai:

```
"devDependencies": {
  "angular-mocks": "~1.3.0",
  "angular-scenario": "~1.3.0",
  "chai": "~1.10.0"

In karma.conf.js add chai. I'm including jquery only for context. It is not needed for chaI:

files: [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/chai/chai.js',
```
 

And in your test:

```
describe('Controller: StatePop', function () {

  var expect = chai.expect;
```

## Spec Reporter

This is the tool that gives us fancy output when we run our tests. Like having the browser, but at the command line.

To get started:

	npm install karma-spec-reporter --save-dev

In karma.conf.js add a reporters property. I include exclude and port for context and to help you find where to insert it. (Of course, within reason, it doesn't really matter where you put it, but for consistency then):

```
exclude: [],

reporters: ['spec'],

// web server port
port: 8080,

We need to reference it also in the plugins section near the bottom of karma.conf.js. I've included phantomjs, chrome and jasmine for context, but all you should have to add is karma-spec-reporter:

plugins: [
  'karma-phantomjs-launcher',
  'karma-chrome-launcher',
  'karma-jasmine',
  'karma-spec-reporter'
],
```

> Written with [StackEdit](https://stackedit.io/).