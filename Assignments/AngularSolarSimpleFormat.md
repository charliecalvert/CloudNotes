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

## Testing Simple Format

You created a **simple-format.jade** file. Now convert it to HTML so it can be used as a fixture in our tests:

  jade views/simple-format.jade --out='spec/fixtures/'

Call the **renewableUtils.simpleFormat** from within **$scope.getRenewable**. It makes no sense to call it until you have loaded **renewables.json**. In particular, since it relies on **renewables.json** being present, it won't work properly until you have loaded that file.

In **.jscsrc** exclude the **data** folder. In **Gruntfile.js** don't try to beautify the **data** folder.

Don't forget to run **grunt check** and clean up all errors such as missing use strict, invalid quote marks, etc.

**NOTE**: _With JSCS, you can use single quotes for a string, and double quotes for embedded quotes inside a string: 'My "embedded" string'._

With angular, you can usually delete an **$(document).ready()** statements as it takes care of this for you.


## Test Simple Format

We need to create **spec/test-simple-format.js**.

```javascript
/**
 * Created by charlie on 5/10/16.
 */

describe('Simple Format Suite', function() {

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
        var spanElement = document.getElementById('simpleFormat');
        expect(spanElement.innerHTML).toContain('simple');
    });

});
```

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
