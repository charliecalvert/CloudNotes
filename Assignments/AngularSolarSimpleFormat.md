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

## Simple Format Page

We are going to add a new page to the application and use it to display the **SimpleFormat** directory. When we are done, our Single Page App (SPA) will have three "pages":

- Home
- Simple Format
- About

![Home Page][as-01]

**Caption**: _The Home page displays the elf renewable directive._

![Simple Format Page][as-02]

**Caption**: _The Simple Format page displays the simple format directive._

In **index.jade**, between home and about, add the following menu item:

```javascript
li(ng-class="{ active: isActive('/simple-format')}")
  a(ng-href='#/simple-format') Simple Format
```

In **public/javascript/app.js**, between Home and About, add the following angular route:

```javascript
.when('/simple-format', {
    templateUrl: 'simple-format-page',
    controller: 'SimpleFormatController'
})
```

Make a copy of **main.js** and call it **simple-format-page.js**. We want to display the **elfRenewable** directive on the main page and the **elfSimpleFormat** directive on the **simple-format-page**. As a result, you should:

- remove the **elfSimpleFormat** directive from **main.js**
- remove the **elfRenewable** directive from **simple-format-page.js**.

Copy **main.jade** to **simple-format-page.jade** and perform similar operations. For instance:

- remove the **elfSimpleFormat** tag from **main.jade**
- remove the **elfRenewable** tag from **simple-format-page.jade**

Change the name of the **controller** in **simple-format-page.js** from **MainController** to **SimpleFormatController**:

```javascript
elfApp.controller('SimpleFormatController', function($scope, $http, renewableUtils) {
  etc...
});
```

Be sure to load **simple-format-page.js** in **layout.jade**.

[as-01]:https://s3.amazonaws.com/bucket01.elvenware.com/images/angular-solar-simple-01.png
[as-02]:https://s3.amazonaws.com/bucket01.elvenware.com/images/angular-solar-simple-02.png

## Test Rewewable by Year

Copy **main.js** to **renewable-by-year.js**. Set the controller name **RenewableByYearController**:

```javascript
elfApp.controller('RenewableByYearController', function($scope, $http, renewableUtils) {
   // We'll change this code later.
});
```

Write a method on **renewableUtils** called **getByYear(year)**. Pass it a year, and it should return an object with

  - An **index** property set to the index of the object with that year
  - The object at that index

You should also write a method on the scope of your **RenewableByYearController** called **getByYear**. It should

  - Call your new method: **var yearData = renewableUtils.getByYear(year)**
  - Set the **$scope.index** to yearData.index.
  - Create a new property **$scope.renewableBy** and set it to yearData.renewable
  - Return **renewableByYear**

Like this:

```javascript
$scope.getByYear = function(year) {
    var renewableData = $scope.renewableUtils.getByYear(year);
    $scope.index = renewableData.index;
    $scope.renewableByYear = renewableData.renewable;
    return $scope.renewableByYear;
};
```

When implementing **renewableUtils.getByYear(year)** be sure you can handle the year in either string or numeric format. For instance, consider either:

- Doing a test to see the **year** parameter is a number and if so converting it to string.
- Using **==** rather than **===** so that you can compare a string like **'2017'** to the number **2017** and get back true.

Don't forget to run:


Create **renewable-by-year.jade** and base it on **renewable.jade** but set the ID to **renewableByYear**. And don't index into renewable. For instance, where you see this:

<pre>
| First: {{renewable[index].Year}}
</pre>

Do this instead:

<pre>
| First: {{renewableByYear.Year}}
</pre>

Convert it to a fixture:

<pre>
jade views/renewable-by-year.jade --out spec/fixtures
</pre>

Also rename the **RenewableByYearController** (in **renewable-by-year.js**) method called **getRenewable** to **getRenewableByYear**. Like this:

```javascript
$scope.getRenewableByYear = function() { }
```

Your code should pass these tests which should be found in **test-renewable-by-year.js**:

```javascript
describe('Renewable By Year Suite', function () {

    'use strict';

    var scope;
    var $httpBackend;
    var $templateCache;
    var $compile;

    beforeEach(module('elfApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_, _$httpBackend_, _$controller_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $templateCache = _$templateCache_;
        $httpBackend = _$httpBackend_;
        _$controller_('RenewableByYearController', {
            $scope: scope
        });
    }));

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
        loadFixtures('renewable-by-year.html');
    });

    beforeEach(function () {
        var requestHandler = $httpBackend
            .when('GET', 'data/Renewable.json')
            .respond(renewables);

        $httpBackend.expectGET('data/Renewable.json');
        scope.getRenewableByYear();
        $httpBackend.flush();
    });

    it('expects true to be true', function () {
        expect(true).toBe(true);
    });

    it('proves renewables.getByYear returns index & expected object with string year', function() {
        var renewableByYear = {
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
        expect(result).toEqual({ index:2, renewable: renewableByYear });
    });

    it('proves renewables.getByYear returns index & expected object with numeric year', function() {
        var renewableByYear = {
            "Year": "2012",
            "Solar (quadrillion Btu)": "0.227349746",
            "Geothermal (quadrillion Btu)": "0.211592042",
            "Other biomass (quadrillion Btu)": "0.466604262",
            "Wind power (quadrillion Btu)": "1.3393646844",
            "Liquid biofuels (quadrillion Btu)": "1.0906491156",
            "Wood biomass (quadrillion Btu)": "2.010265721",
            "Hydropower (quadrillion Btu)": "2.628701965"
        };

        var result = scope.renewableUtils.getByYear(2012);
        expect(result).toEqual({ index:5, renewable: renewableByYear });

    });

    it('tests that we can get a renewable object by Year from our controller', function () {
        var renewableByYear = scope.getByYear('2015');
        //console.log(renewableByYear);
        expect(JSON.stringify(renewableByYear)).toContain('0.532293912');
    });

    it('tests that we can get a renewable object by Year in our elfRenewableByYear directive', function () {
        var simpleFormatHtml = document.getElementById('renewableByYear');
        $templateCache.put('renewable-by-year', simpleFormatHtml);
        var element = $compile('<elf-renewable-by-year></elf-renewable-by-year>')(scope);
        scope.$digest();
        var renewableByYear = scope.getByYear('2015');
        //console.log(renewableByYear);
        scope.$digest();
        //console.log(element.text());
        expect(element.text()).toContain('1.8151574968');
    });

});
```

## Get By Year Page

Create a page called **Renewable By Year**. Allow the user to enter a year using an input control. Retrieve the user input, call your **getByYear** function, and display the year.

![By Year](https://s3.amazonaws.com/bucket01.elvenware.com/images/angular-solar-simple-03.png)

**Figure 03**: _Enter a year, retrieve the data and call renewableUtils.byYear. Display the result in a directive._

Hear are some of the key steps shown in Figure 03:

- Menu Item Title seen at top of page: **Renewable By Year**,
  - url associated with menu item: **renewable-by-year**
  - Make corresponding changes in **app.js** and **index.jade**.
- Be sure that controller name is **RenewableByYearController** in **renewable-by-year.js**
  - The jade page associated with this controller should be called **renewable-by-year-page.jade**
- In **renewableByYear.js** create a directive called **renewable-by-year**.
  - Use it to display the results of your call to **getByYear**
  - Jade Name for the directive **templateUrl**: **renewable-by-year.jade**.

This is a matter of taste. Nevertheless, when doing this kind of work, I find it helpful to keep my tests running and keep my app running in Chrome with the developers tools turned to the **console** page. I use the errors as I see as guides to help me see what needs to be done next, and what I have not yet done correctly.

**NOTE**: _Watch the console and network pages in the Chrome developer tools carefully as you do this kind of work. Check, for instance, if you have remembered to load your new JavaScript page in **layout.jade**._

## Iterate by Year

There are several ways to allow the user to iterate over the years in the renewables array of data. Here is one.

The input in **renewable-by-year-page.jade** could look like this:

<pre>
input(type="number", data-ng-model="userYearInput" data-ng-change="yearChange()" min='2007' max='2017' placeholder='2013')

button.btn.btn-primary(ng-click="getRenewableByYear()") Get Renewable by Year

hr

elf-renewable-by-year

</pre>

And handle it like this:

```javascript
$scope.userYearInput = 2017;

// CODE NOT RELATED TO THIS ISSUE OMITTED HERE

$scope.yearChange = function() {
    $scope.getByYear($scope.userYearInput);
};
```

Rename **getRenewable** to **getRenewableByYear** and call $scope.getByYear in its last line.

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
