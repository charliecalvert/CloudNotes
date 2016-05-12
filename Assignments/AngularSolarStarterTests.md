## Overview

Look at [directive template names][dir-names] slide.

[dir-names]: https://docs.google.com/presentation/d/1QHZunZfwAQIplala60HkLaGYaRGzJ5eO4oKIg_S1iyk/edit#slide=id.g9ad18c47f_0_91

**NOTE** _Be sure to remove controller as from **public/javascripts/app.js**. In general, scour your files looking for and removing the case sensitive references to **mainController**._

## Git Branch

Create a new branch and check it out:

<pre>
git branch week05
git checkout week05
</pre>

Modify the readme:

  geany README.md &

We should add text like this:

<pre>
  ## Week 05 Branch

  - [Angular Solar Starter Assignment][solar-start]

</pre>

[solar-start]: http://www.ccalvert.net/books/CloudNotes/Assignments/AngularSolarStarter.html

Now check it in and bush it on the new branch and then push that branch to your BitBucket or GitHub repository:

<pre>
git status
git add README.md
git commit -m "Week05 Read me"
git push --set-upstream origin week05
</pre>

**NOTE**: _Your branch in the cloud is the **origin** in our case. When we talk about the origin, we are referring to our repository on BitBucket or GitHub. The origin doesn't have to be in the cloud or on those sites, but it is in our case._

Take a look at the new branch's metadata:

<pre>
git branch -a
</pre>

Now switch back to master and merge in your changes:

<pre>
git checkout master
git merge week05
</pre>

It might looks something like this as we merge the **week05** README with the **master** README:

<pre>
git merge week05
Updating d0aee52..7ae1b47
Fast-forward
README.md | 9 +++++++++
1 file changed, 9 insertions(+)
</pre>

## Week 06 Branch

Now create a week06 branch and modify the readme as we did in week05:

<pre>
git branch week06
git checkout week06
geany README.md &
</pre>

The changes might look like this:

<pre>
  ## Week 06 Branch

  - [Angular Solar Starter Tests Assignment][solar-start-test]
</pre>

Check the status:

<pre>
git status
git branch -a
</pre>

Add in your changes, commit and push your new branch to the cloud (BitBucket/GitHub):

<pre>
git add .
git commit -m "Week06 Readme"
git push --set-upstream origin week06
</pre>

## Merge Week06 into Master

Now we merge in our changes to the master branch:

<pre>
git checkout master
git merge week06
</pre>

**NOTE**: _We don't necessarily have to merge our changes back into master every day. You should merge them, however, before we go on to week 07. The point being that master ends up contains our latest while our branches show our status at the end of each week. This is not the only thing you can do with branches, nor is it even a common strategy, but it fits our goals in this class. In other words, its nice in this class to have a handy record of where we are at the end of each week. But other teams would do very different things with branches. One of our goals, of course, is simply to be sure we understand how to use git branches. The exact way we use them is not important._

Now check the status, and go back to **week06** where we will do our work this week:

<pre>
git branch -a
git checkout week06
</pre>

## HttpBackend

We use the Angular $httpBackend object from the **angular-mocks** to allow us to mock the loading of JSON from the server.

**NOTE**: _Angular mocks and httpBackend do much more than just allow us to mock loading JSON, but lets start there, and move on to mocking whole objects a bit later on._

For more on httpbackend, see the

- The last few slides here: [http://bit.ly/unittestasync](http://bit.ly/unittestasync)
- [Elvenware on httpBackend][elf-http-backend]

Start by creating a test called **spec/test-mocks.js**:

```javascripts
describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    fit('proves we can run tests', function() {
       expect(true).toBe(true);
    });
});
```

Now angularize it by loading the mainController, this time adding code to load $httpBackend:

```javascripts
describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    var $httpBackend, scope, mainController;

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

Notice that we also have an **afterEach** section. This ensures that there are no pending http request after our tests. In particular, we are going to use $httpBackend to mock the act of loading JSON. In particular, we will write code that ensures that calls to $http.get actually call our method, rather than making a request to a server. The **afterEach** method tests that we actually called these mocks, rather than leave them hanging. This helps us ensure that we are doing what we set out to do, and that the next test starts with a clean slate.

You might also want temporarily add a test from our **test-basic** file that ensures we can access the scope. You can delete this test later if you want, it is just a sanity check.

[elf-http-backend]: http://www.elvenware.com/charlie/development/web/JavaScript/Angular.html#mocking-objects-with-httpbackend


## Mocking JSON Requests

Here is a test that actually mocks the **$http.get** call in our **getRenewable** method. This method, as you know,   retrieves data from the server. Only this time, instead of getting data from a real server, we put in our own mock data instead:

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
    ✓ proves we can get renewableUtils method called getNine
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

## Simple Format Directive

The html directive:

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

You make it like this:

```javascript
elfApp.directive('elfSimpleFormat', function() {
    'use strict';
    return {
        controller: 'MainController',
        templateUrl: 'simple-format'
    };
});
```

You will need to create a **simple-format.jade** file and get it set up to test as a fixture:

  jade views/simple-format.jade --out='spec/fixtures/'

You will, of course, have to add this directive to **main.jade**. You can just append it to the end of the file for now.

Call the **renewableUtils.simpleFormat** from within **$scope.getRenewables**. It makes no sense to call it until you have loaded **renewables.json**. In particular, since it relies on **renewables.json** being present, it won't work properly until you have loaded that file.

In **.jscsrc** exclude the **data** folder. In **Gruntfile.js** don't try to beautify the **data** folder.

Don't forget to run **grunt check** and clean up all errors such as missing use strict, invalid quote marks, etc.

**NOTE**: _With JSCS, you can use single quotes for a string, and double quotes for embedded quotes inside a string: 'My "embedded" string'._

With angular, you can usually delete an **$(document).ready()** statements as it takes care of this for you.

## Create renewables-utils

You need to create a file called **renewables-utils.js**. For now, we can put it in the **public/javascripts** folder. Later on we can spend some time organizing our files so they are divided by category and easier to find.

Don't forget to add it to **layout.jade**!

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

## Create test-renewables

We need to test **renewable-utils.js** in **spec/test-renewables.js**

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
        //scope.renewableUtils.init(renewables);
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

    it('proves we can get renewableUtils method called getNine', function() {
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

## Test Simple Format

We need to create **spec/test-simple-format.js**.

```javascript
```
c
## Test Simple Format Backend

We need to create **spec/test-simple-format-backend.js**, which is our holy grail.

## Suite Titles

Get the suite titles right for each test.

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
