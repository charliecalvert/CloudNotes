---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/IbitDay2016.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: IbitDay2016.md
relativePath: /IbitDay2016.md
title: IbitDay2016
directoryName: Assignments
category : assignments-guide
---

## Overview

Build an Angular SPA (Single Page App) and deploy it to Heroku. In the app, load and display some JSON.

## Accounts

Create a GitHub account if you don't have one already.

**NOTE**: _You want employers, friends and family to be able to find your git hub account. These decisions are up to you, but naming your account something like **a49ZZZxx32##9@** makes your code hard to find, which is probably not what you want when job hunting or trying to share information with friends. If you can, just use your last name._

Go to Cloud 9. Create an account and sign in with GitHub.

This may set up your SSH key automatically. If not, find you SSH key:

- In the Cloud 9 Dashboard click the Gear menu (Setup)
- Select SSH Keys
- Block copy the key in gray box that begins with something like **ssh-rsa AAAetc...**
- Go to GitHub and open the settings on the far top right.
- Select Settings and go to Add SSH key
- Choose New SSH Key and paste it in.

Create a repository called ibit-day-lastname:

- Add a node .gitigore file
- Add the MIT license

Get the url by selecting the green **Clone or download** button. The URL might look something like this, but with your name instead of foo:

- **git@github.com:foo/ibit-day-foo.git**

**NOTE**: _If you see a URL that begins with **https**, then something is wrong. Go back and make sure you have your Cloud 9 SSH key set up in GitHub as described above. Don't go further until you get this straightened out. If necessary, just delete your repository and start over in GitHub. See if this time the repository has a URL that begins with **git** instead of **https**._

## Create Workspace

Create a new NodeJs workspace.

- Name: ibit-day
- Repository: Use the repository you created in the previous step.

## Setup

Read the cloud nine setup from here:

- [Cloud Nine Setup Description (AutoSetup)][c9-auto]
- [Cloud Nine Setup Script][c9-setup]

[c9-auto]: http://www.ccalvert.net/books/CloudNotes/Assignments/Cloud9Intro.html#auto-setup
[c9-setup]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/CloudNineSetup

## Build

Lets create and launch a default express application. We'll give ourselves the ability to use Angular, but we won't yet add any Angular code to our application:

<pre>
CreateAllExpress ibit01
cd ibit01
npm install && bower install
bower install bootstrap angular angular-route --save
npm start
</pre>

**CreateAllExpress** is a custom script. It does much to help you set up the tools and configuration that I find useful when developing applications.

## JavaScript Start

Open **control.js** and put the following code in it:

```javascript
var myModule = angular.module('elfApp', ['ngRoute']);

myModule.config(function($routeProvider, $locationProvider) {
    'use strict';

    $routeProvider.when('/', {
        templateUrl: 'home-page',
        controller: 'HomeController'
    }).when('/first', {
        templateUrl: 'first-page',
        controller: 'FirstController'
    }).when('/about', {
        templateUrl: 'about-page',
        controller: 'AboutController'
    }).otherwise({
        redirectTo: '/'
    });
});

$(document).ready(function() {
    'use strict';
    $('.navbar-nav li.trigger-collapse a').click(function(event) {
        $('.navbar-collapse').collapse('hide');
    });
});
```

Then three very similar Controllers. I will give you the first. Save it as **public/javascripts/home.js**

```javascript
var elfApp = angular.module('elfApp');

elfApp.controller('HomeController', function($scope) {
    'use strict';

    $scope.description = 'HomeController Data';

});
```

Create two more pages:

- about.js
- first.js

Block copy the contents of **home.js** for the other two, but change the Controller name and description. For instance, for the **about** page, rename the **HomeController** to **AboutController**.

## Jade Start

Open up **views/layout.jade** and add in support for angular. These two lines should come just after the code that loads **jquery**:

<pre>
script(src="components/angular/angular.js")
script(src="components/angular-route/angular-route.js")
</pre>

**layout.jade** will also be the place where we provide a name for our primary angular module. We will place all the code for this application in this single module. Declare it like this:

<div>
body(data-ng-app="elfApp")
</div>

Go back to **control.js** and note how we instantiate an instance of this module. Notice that we use the module in our other files.

Continuing our work in **layout.jade**, add in **script** tags to load each of the JavaScript files we created in the previous section. For instance, copy the line that loads **control.js** and use it as template for loading **about.js**, **first.js** and **home.js**. Load **control.js** after you load **angular**, **jQuery** and **bootstrap** but before you load the other files we created in the previous section.

## Jade Pages

Now create a page called **views/home-page.jade**. Using Jade syntax, put in a single HTML H1 element and a custom angular directive called **home-description**:

<pre>
h1 Home

elf-home-description
</pre>

We will explain what to do with the custom directive in a bit.

Create two other pages in the same directory:

- about-page.jade
- first-page.jade

Change the H1 element to refect the page contents. In other words, they should have similar, but not identical contents. For instance, change the word **Home** to **First** and **About** as appropriate.

We will also need to add a new route to **routes/index.js**:

```javascript
router.get('/:id', function(req, res, next) { 'use strict';
  res.render(req.params.id, { title: 'ibitday' });
});
```

## Main Index Page

This is a SPA. As a result, our main page is always loaded. We need to have a location in that page where we load in content for our other "pages". The end result is that the top few lines of our main page are static. As the user selects items from the menu, the area below this main section morphs to reflect the content of the user's selection. Thus we have one main page that morphs into other "pages" as the user requests.

To create a place on the main page where new "pages" can be loaded, add the angular **ng-view** directive to your main page:

```javascript
extends layout

block content
  .container
    h1= title
    p Welcome to #{title}
    p Author #{author}

    div(data-ng-view="")
```

As stated above, we are building a SPA. As a result, the H1 and two paragraph elements shown above are relatively static. The new "pages" loaded when the user makes menu selections are placed inside the **ng-view**.

## Menu

```javascript
extends layout

block content
  header.navbar.navbar-inverse.navbar-fixed-top.bs-docs-nav(role='banner')
    .container
      .navbar-header
        button.navbar-toggle(type='button', data-toggle='collapse', data-target='.bs-navbar-collapse')
          span.sr-only Toggle navigation
          span.icon-bar
          span.icon-bar
          span.icon-bar
        a.navbar-brand(href='.#/') Solar Explorer
      nav.collapse.navbar-collapse.bs-navbar-collapse(role="navigation")
        ul.nav.navbar-nav
          li.trigger-collapse(ng-class="{ active: isActive('/')}")
            a(ng-href='#/') Home
          li.trigger-collapse(ng-class="{ active: isActive('/first')}")
            a(ng-href='#/first') First
          li.trigger-collapse(ng-class="{ active: isActive('/about')}")
            a(ng-href='#/about') About
  .container
    h1= title
    p Welcome to #{title}
    p Author #{author}

    div(data-ng-view="")

```

## Simple Directive:

Let's create a directive. An angular directive allows us to create custom HTML element. Examples of angular directives that we have used already are **ng-app** or **ng-view**. We can use these elements in our HTML files, yet they are not part of HTML5. They are custom elements created by the angular team.

We will call our directive **elfFirstDescription**. Recall that we already referenced it in our **first-page.jade** file:

<pre>
h1 First

elf-first-description
</pre>

To create the directive, add this code to **first.js**:

```javascript
elfApp.directive('elfFirstDescription', function() {
    'use strict';
    return {
        controller: 'FirstController',
        templateUrl: 'first-controller'
    };
});
```

We need to add the Jade that defines our **templateUrl** to a new file called **view/first-controller.jade**:

<pre>
.panel.panel-default
    .panel-heading Renewable Data
    .panel-body
        div &#123;&#123;description&#125;&#125;
</pre>

This is standard bootstrap code with a an angular expression in it. The expression is set off with double curly braces. The word description in the expression forms a link to the variable **$scope.description** found in our controller from **first.js**.

At some point, see if you can add similar directives to **home.js** and **about.js**

## Loading Data

Here is a JSON file. Save it in **public/Presidents.json**:

```json
[
    {
        "firstName": "George", "lastName": "Washington", "address": "101 June Street", "city": "Bellevue", "state": "WA"
    },
    {
        "firstName": "John", "lastName": "Adams", "address":  "101 June Street", "city": "Bellevue", "state": "WA"
    },
    {
        "firstName": "Thomas", "lastName": "Jefferson", "address":  "101 June Street", "city": "Bellevue", "state": "WA"
    },
    {
        "firstName": "James", "lastName": "Madison", "address":  "101 June Street", "city": "Bellevue", "state": "WA"
    }
]
```

Here is code to load it. As you can see we put it in the **FirstController**:

```javascript
elfApp.controller('FirstController', function($scope, $http) {
    'use strict';

    $scope.description = 'First Controller Description';

    $scope.loadData = function() {
        $http.get('Presidents.json')
            .then(function(presidents) {
                $scope.presidents = JSON.stringify(presidents, null, 4);
            })
    };

    $scope.loadData();
});
```

Here is the directive to display the data:

```javascript
elfApp.directive('elfFirstData', function() {
    'use strict';
    return {
        controller: 'FirstController',
        templateUrl: 'first-data'
    };
});
```

Here is **views/first-data.jade**. This is where our list of presidents from the **Presidents.json** file will be loaded:

<pre>
.panel.panel-default
    .panel-heading Renewable Data
    .panel-body
        pre &#123;&#123;presidents&#125;&#125;
</pre>

## Testing

We need to install angular-mocks to support testing:

<pre>
bower install angular-mocks --save-dev
npm install jasmine-jquery --save-dev
</pre>

In **karma.conf.js** let's make sure that we:

- load angular.js
- load angular-route.js
- load angular-mocks.js
- load **public/javascripts/control.js** before we load the other files in **public/javascripts**.

Here is the updated **files** section from **karma.conf.js**:

```javascript
files: [
    'public/components/jquery/dist/jquery.min.js',
    'public/components/angular/angular.js',             <=== HERE
    'public/components/angular-mocks/angular-mocks.js', <=== HERE
    'public/components/angular-route/angular-route.js', <=== HERE
    'node_modules/jasmine-jquery/lib/*.js',
    'public/javascripts/control.js',                    <=== HERE
    'public/javascripts/*.js',
    'spec/**/*.html',
    'spec/test*.js'
],
```

In **Gruntfile.js**, ensure that we build our HTML to use in our tests:

```javascript
jade: {
    compile: {
        options: {
            pretty: true,
            data: {
                debug: false
            }
        },
        files: {
            'spec/fixtures/home-page.html': ['views/home-page.jade'],
            'spec/fixtures/first-page.html': ['views/first-page.jade'],
            'spec/fixtures/about-page.html': ['views/about-page.jade']
        }
    }
},
```

And a small modification at the bottom of the page where we add Jade to test task:

```javascript
    grunt.registerTask('test', ['jshint', 'jade', 'karma']);
```

Finally, let's modify **spec/test-basic.js**:

```javascript
describe('Elvenware Simple Plain Suite', function () {

    'use strict';

    var scope;

    beforeEach(module('elfApp'));

    /*
     * instantiate the controller without the directive
     */
    beforeEach(inject(function (_$rootScope_, _$controller_) {
        scope = _$rootScope_.$new();
        _$controller_('HomeController', {
            $scope: scope
        });
    }));

    it('expects true to be true', function () {
        expect(true).toBe(true);
    });

    it('should find the description', function () {
        expect(scope.description).toBe('HomeController Data');
    });

});
```

Now run **grunt test**.

## Test Fixture

```javascript
describe('Elvenware Test Fixture Suite', function () {

    'use strict';

    var scope;
    var $templateCache;
    var $compile;

    beforeEach(module('elfApp'));

    /*
     * instantiate the controller without the directive
     * Get the Angular compiler and templateCache for processing Angular templates
     */
    beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_, _$controller_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $templateCache = _$templateCache_;

        _$controller_('HomeController', {
            $scope: scope
        });
    }));

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
        loadFixtures('home-page.html');
    });

    it('expects true to be true', function () {
        expect(true).toBe(true);
    });

    it('should be possible to access the fixture', function() {
        var spanElement = document.getElementsByTagName('h1');
        expect(spanElement[0].innerHTML).toBe('Home');
    });
});
```

## Test Directive

```javascript
describe('Elvenware Home Directive Suite', function () {

    'use strict';

    var scope;
    var $templateCache;
    var $compile;

    beforeEach(module('elfApp'));

    /*
     * instantiate the controller without the directive
     * Get the Angular compiler and templateCache for processing Angular templates
     */
    beforeEach(inject(function (_$compile_, _$rootScope_, _$templateCache_, _$controller_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        $templateCache = _$templateCache_;

        _$controller_('HomeController', {
            $scope: scope
        });
    }));

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'base/spec/fixtures/';
        loadFixtures('home-description.html');
    });

    it('expects true to be true', function () {
        expect(true).toBe(true);
    });

    it('should be possible to access the fixture', function() {
        var spanElement = document.getElementById('homeDescription');
        //console.log(spanElement);
        expect(spanElement.innerHTML).toContain('&#123;&#123;desc');
    });

    it('should be able to see the fixture content', function() {
        var el = document.getElementById('homeDescription');
        //console.log(el);
        $templateCache.put('home-description', el);
        var element = $compile('<elf-home-description></elf-home-description>')(scope);
        scope.$digest();
        //console.log(element);
        expect(element.text()).toContain('HomeController Data');
    });
});
```

If all the tests are working, the output should look something like this:

<pre>
Elvenware Simple Plain Suite
  ✓ expects true to be true
  ✓ should find the description

Elvenware Test Fixture Suite
  ✓ expects true to be true
  ✓ should be possible to access the fixture

Elvenware Home Directive Suite
  ✓ expects true to be true
  ✓ should be possible to access the fixture
  ✓ should be able to see the directive content

PhantomJS 2.1.1 (Linux 0.0.0): Executed 7 of 7 SUCCESS (0.038 secs / 0.025 secs)
TOTAL: 7 SUCCESS
</pre>

## Heroku

Read the Heroku Setup from here:

- [Heroku Starter][heroku-starter]

[heroku-starter]: http://www.ccalvert.net/books/CloudNotes/Assignments/HerokuStarter.html

## Git Hints

You probably won't need this, but just in case you need to reset the url for your repository:

git remote set-url origin git@github.com:charliecalvert/Prog272-Calvert.git

Here is how to pull from an existing repository on GitHub into an empty directory. The code assumes you are in the directory:

<pre>
git init
git remote add origin git@github.com:charliecalvert/Prog272-Calvert.git
git pull origin master
</pre>
