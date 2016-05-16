## Overview

The goals:

- Write tests for a new directive called **elfSimpleFormat**
- Create the **elfSimpleFormat** directive.
- Write tests for a front end for our new directive
- Create a front end for the new directive on a new page

## Branches

Before we get started, let's set up our branch for this week. We have at least three tasks:

1. Create a new branch.
2. Check it out.
3. Rename **Week05-SolarExplorer** to **Week07-SolarExplorer**.

Something like this:

<pre>
git branch week07
git checkout week07
git mv Week05-SolarExplorer Week07-SolarExplorer
</pre>

If you have not done so already, you should also merge your work from the week06 branch into master:

<pre>
git checkout master
git merge week06
</pre>

Now switch back to week07: **git checkout week07**

## Testing Simple Format

You know from the tests in our [previous assignment][sf-structure] what an object based on our simple format looks like:

```javascript
it('proves we can transform our json into an array with three properties: geo, solar, and wind', function() {
  var simpleFormat = scope.renewableUtils.getSimpleFormat();
  var keys = Object.keys(simpleFormat[0]);
  keys.sort();
  expect(keys).toEqual(['geo', 'solar', 'wind']);
});
```

In particular, it looks something like this:

```javascript
var simpleFormat = {
  geo: 1,
  solar: 2,
  wind: 3
}
```

The instance above has its property set to random data. When working with real data, the values are very unlikely ever to be 1, 2 and 3. But those values will work fine in our tests.

What we want to do is write tests proving that we can create some HTML that will hold objects of this type. The first step, then will be to creat a **simple-format.jade** file. As you know, we can use the jade program to convert it to HTML so it can be used as a fixture in our tests:

<pre>
jade views/simple-format.jade --out='spec/fixtures/'
</pre>

In **.jscsrc** exclude the **data** folder. In **Gruntfile.js** don't try to beautify the **data** folder.

Don't forget to run **grunt check** and clean up all errors such as missing use strict, invalid quote marks, etc.

**NOTE**: _With JSCS, you can use single quotes for a string, and double quotes for embedded quotes inside a string: 'My "embedded" string'._

With angular, you can usually delete an **$(document).ready()** statements as it takes care of this for you.

## Test Simple Format

We need to create **spec/test-simple-format-fixture.js**.

**NOTE**: _In an early draft of this assignment I'd called this file **test-simple-format.js**. If necessary, ask git to rename your test suite to **test-simple-format-fixture.js**. Otherwise create it from scratch. Note that the file, which is shown below, has been updated since that earlier draft._

Do this only if necessary, only if it makes sense in the context of the current state of your project:

<pre>
cd spec
git mv test-simple-format.js test-simple-format-fixture.js
cd ..
</pre>

**NOTE**: _In the code above I include a command to navigate into the **spec** directory. I do this because I've found that some students can't see the need to do that before asking git to rename our file. However, when I give instructions on this level of details, some students who know better start becoming automatons, and forget to navigate back to the project's root directory before issuing other commands. So I provide both navigation commands. We are nearing the point in this class, however, when it should no longer be necessary to provide this level of detail when giving instructions of this type. In fact, I should be able to simply ask you to rename the file without telling you how to do it. If you feel that you can't follow instructions of that type, you should do whatever is necessary to get to that level of proficiency. For instance, work through the **Learn the Command Line** lesson on Code Academy. You could also read the free online book called [The Linux Command Line](http://linuxcommand.org/tlcl.php)._

Here are the tests themselves. Note that the last two have changed since their first appearance:

```javascript
describe('Simple Format Fixture Suite', function() {

    'use strict';

    var scope;
    var element;
    var mainController;
    var $templateCache;
    var $compile;

    beforeEach(module('elfApp'));

    /*
     * instantiate the controller without the directive
     * Get the Angular compiler and templateCache for processing Angular templates
     */
    beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_, _$controller_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $templateCache = _$templateCache_;

        mainController = _$controller_('MainController', {
            $scope: scope
        });
    }));

    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
        loadFixtures('simple-format.html');
    });

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('should find the index', function() {
        expect(scope.index).toBe(0);
    });

    it('should be possible to access the fixture', function() {
        var simpleFormatHtml = document.getElementById('simpleFormat');
        console.log(simpleFormatHtml);
        expect(simpleFormatHtml.innerHTML).toContain('Solar:');
        expect(simpleFormatHtml.innerHTML).toContain('Geo:');
        expect(simpleFormatHtml.innerHTML).toContain('Wind:');
    });

    it('should be possible to access the fixture and put real data in it.', function() {
        scope.simpleFormat = [{
            geo: 1,
            solar: 2,
            wind: 3
        }];

        var simpleFormatHtml = document.getElementById('simpleFormat');
        $templateCache.put('simple-format', simpleFormatHtml);
        var element = $compile('<elf-simple-format></elf-simple-format>')(scope);
        scope.$digest();

        console.log(simpleFormatHtml);
        expect(simpleFormatHtml.innerHTML).toContain('Solar: 2');
        expect(simpleFormatHtml.innerHTML).toContain('Geo: 1');
        expect(simpleFormatHtml.innerHTML).toContain('Wind: 3');
    });

});
```

## Simple Format Directive

Now lets create a new directive called **elfSimpleFormat**. Declare it just below the point in **main.js** where you declare the **elfRenewable** directive.

The HTML version of our new directive looks like this:

```javascript
elfApp.directive('elfSimpleFormat', function() {
  'use strict';
  return {
      controller: 'MainController',
      template: 'Solar: {{simpleFormat[index].solar}}' +
          '<br>Geo: {{simpleFormat[index].geo}}' +
          '<br>Wind: {{simpleFormat[index].wind}}'
  };
});
```

As you can see, this declaration uses **template** rather than **templateUrl**. You should:

- Convert this HTML to jade
- Save it to a file called **simple-format.jade**
- Convert the directive to use **templateUrl** rather than **template**.

It should, of course, look like this:

```javascript
elfApp.directive('elfSimpleFormat', function() {
    'use strict';
    return {
        controller: 'MainController',
        templateUrl: 'simple-format'
    };
});
```

If you have not done so already, you also need to update the **MainController's** method called **getRenewable** so that it has access to our simpleFormat object:

```javascript
$scope.getRenewable = function() {        
    $http.get('data/Renewable.json')
        .then(function(res) {
            renewableUtils.init(res.data);
            $scope.renewable = res.data;
            $scope.renewableUtils = renewableUtils;
            $scope.simpleFormat = renewableUtils.getSimpleFormat();
        });
};
```


## Test Simple Format Backend

We need to create a first take on our **spec/test-simple-format-backend.js**, which is our holy grail. This is what we have been building towards. Furthermore, we can flesh out these suite with additional tests to see if we can perform operations on our data. The first step, however, is simply to ensure that we can load our data and fill in the appropriate fields with "mock" data from our **json-as-renewables.js** file.

```javascript
describe('Simple Format HttpBackend Suite', function() {

    'use strict';

    var scope;
    var $httpBackend;
    var mainController;
    var $templateCache;
    var $compile;

    beforeEach(module('elfApp'));

    /*
     * instantiate the controller without the directive
     * Get the Angular compiler and templateCache for processing Angular templates
     */
    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$templateCache_, _$controller_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        $httpBackend = _$httpBackend_;
        mainController = _$controller_('MainController', {
            $scope: scope
        });
    }));

    beforeEach(function() {
        scope.index = 5;
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

    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
        loadFixtures('simple-format.html');
    });

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('tests simple-format directive loaded through fixture with httpBackend', function() {

        var el = document.getElementById('simpleFormat');

        $templateCache.put('simple-format', el);
        var element = $compile('<elf-simple-format></elf-simple-format>')(scope);
        scope.$digest();

        console.log(JSON.stringify(scope.simpleFormat, null, 4));
        // Check that the compiled element contains the templated content
        expect(element.text()).toContain('804');
        expect(element.text()).toContain('2.2');
    });

    it('tests that we can index through simple-format directive to the fifth element', function() {

        var el = document.getElementById('simpleFormat');
        //console.log(el);
        $templateCache.put('simple-format', el);
        var element = $compile('<elf-simple-format></elf-simple-format>')(scope);
        scope.$digest();
        scope.index = 5;
        scope.$digest();
        expect(element.text()).toContain('227');
        expect(element.text()).toContain('1.339');
        //console.log(element);
    });

});
```

When looking at this code, a key section is the **beforeEach** call to **getRenewables**:

```javascript
beforeEach(function() {
    scope.index = 5;
    var requestHandler = $httpBackend
        .when('GET', 'data/Renewable.json')
        .respond(renewables);

    $httpBackend.expectGET('data/Renewable.json');
    scope.getRenewable();
    $httpBackend.flush();
});
```

This code calls the **getRenewable** method on our **MainController's** scope.

## Exercises

Write a method:

- on **renewableUtils** called **getByYear**. Pass it a year, and it should return an object with
  - An **index** property set to the index of the object with that year
  - The object at that index
- on the scope of your **MainController** called **getByYear**. It should
  - Call your new method: **renewableUtils.getByYear(year)**
  - Set the **$scope.index** and **$scope.renewable** property to values returned by your call
  - Return the **renewable** object that you found.

Your code should pass these tests:

```javascript
describe('Simple Format Exercises Suite', function () {

    'use strict';

    var scope;
    var $httpBackend;
    var mainController;
    var $templateCache;
    var $compile;

    beforeEach(module('elfApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_, _$httpBackend_, _$controller_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        $httpBackend = _$httpBackend_;
        mainController = _$controller_('MainController', {
            $scope: scope
        });
    }));

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
        loadFixtures('simple-format.html');
    });

    beforeEach(function () {
        var requestHandler = $httpBackend
            .when('GET', 'data/Renewable.json')
            .respond(renewables);

        $httpBackend.expectGET('data/Renewable.json');
        scope.getRenewable();
        $httpBackend.flush();
    });

    it('expects true to be true', function () {
        expect(true).toBe(true);
    });

    it('proves renewables.getByYear returns index & expected object', function() {
        var renewable = {
            "Year": "2015",
            "Solar (quadrillion Btu)": "0.532293912",
            "Geothermal (quadrillion Btu)": "0.22367033",
            "Other biomass (quadrillion Btu)": "0.513842275",
            "Wind power (quadrillion Btu)": "1.8151574968",
            "Liquid biofuels (quadrillion Btu)": "1.2204771324",
            "Wood biomass (quadrillion Btu)": "2.059217456",
            "Hydropower (quadrillion Btu)": "2.388612049"
        };

        var result = scope.renewableUtils.getByYear('2015');
        expect(result).toEqual({ index:2, renewable: renewable })
    });

    it('tests that we can get an item in simpleFormat by Year', function () {
        var renewableByYear = scope.getByYear('2015');
        expect(JSON.stringify(renewableByYear)).toContain('0.532293912');
    });

    it('tests that we can get an item in simpleFormat by Year', function () {
        var simpleFormatHtml = document.getElementById('simpleFormat');
        $templateCache.put('simple-format', simpleFormatHtml);
        var element = $compile('<elf-simple-format></elf-simple-format>')(scope);
        scope.$digest();
        var renewableByYear = scope.getByYear('2015');
        scope.$digest();
        expect(element.text()).toContain('1.8151574968');
    });

});
```

## Turn it in

The usual.

## Suite Titles

Get the suite titles right for each test. They are

- Simple Format HttpBackend Suite
- Simple Format Fixture Suite
- Simple Format Exercises Suite

## Hints

In **karma.conf.js** be sure you are loading **angular**, **angular-mocks** and **angular-route**:

```javascript
files: [
    'public/components/jquery/dist/jquery.min.js',
    'public/components/angular/angular.js',
    'public/components/angular-mocks/angular-mocks.js',
    'public/components/angular-route/angular-route.js',
    'node_modules/jasmine-jquery/lib/*.js',  
    'public/javascripts/app.js',
    'public/javascripts/*.js',
    'spec/**/*.html',
    'spec/data/*.js',
    'spec/test-*.js'
],
```

[sf-structure]: http://www.ccalvert.net/books/CloudNotes/Assignments/AngularSolarStarterTests.html#create-test-renewables

## Charlie's Test Output

As an FYI:

<pre>
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
  ✓ proves we can get our wood map
  ✓ proves our array of years contains the expected data
  ✓ proves we can transform our json into an array with three properties: geo, solar, and wind
  ✓ proves that getSimpleStringFormat returns the expected string data
  ✓ proves that getSimpleFormat returns the expected numeric data

Simple Format HttpBackend Suite
  ✓ expects true to be true
  ✓ tests simple-format directive loaded through fixture with httpBackend
  ✓ tests that we can index to the fifth element

Simple Format Exercises Suite
  ✓ expects true to be true
  ✓ proves renewables.getByYear returns index & expected object
  ✓ tests that we can get an item in simpleFormat by Year
  ✓ tests that we can get an item in simpleFormat by Year

Simple Format Fixture Suite
  ✓ expects true to be true
  ✓ should find the index
  ✓ should be possible to access the fixture
  ✓ should be possible to access the fixture and put real data in it.

PhantomJS 2.1.1 (Linux 0.0.0): Executed 32 of 32 SUCCESS (0.108 secs / 0.258 secs)
TOTAL: 32 SUCCESS
</pre>
