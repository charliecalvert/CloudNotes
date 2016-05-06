## Description

This documents describes the Basic Unit Testing assignment.

## Overview

- Create an express project
- Add in Angular
- Use ControllerAs
- Write Tests

## Intro

First, be sure you have the **elven-assignments** repository. We have used it in previous assignments, so you probably have it on your system already. However, if you don't have it, you can get it like this:

<pre>
cd ~/Git
git clone http://github.com/charliecalvert/elven-assignments.git
</pre>

Assuming you have **elven-assignments**, you should make sure it is up to date. Then copy it to your repository:

<pre>
cd  ~/Git/elven-assignments
git pull
</pre>

Now copy the file to your repository:

<pre>
# Do this once on Pristine Lubuntu or similar:
cp -r AngularJasmine/ ~/Git/progXXX-lastname-201X/Week03-AngularBasicUnitTest
# Do this once on Cloud9:
cp -r AngularJasmine/ ~/workspace/Week03-AngularBasicUnitTest
</pre>

Now navigate to the copy of **AngularJasmine** in your repository. Don't use the one in my repository!

At the root of the project, type the following install our npm and bower packages. Note that we have bower packages in our test folder:

<pre>
npm install && bower install && cd test && bower install
</pre>

## Step Two

To run the tests in the Cloud 9 editor, open **test/index.html** and select **Run**

If you are using WebStorm, right click on **test/index.html**. Select **Run**.

To run the application, at the bash shell type **npm start**. In Cloud9 choose "Preview running application."

## Step Three

In this project we use Jasmine to compose a test suite called "Angular Basic Tests." We put code like the following in **test/spec/test.js**:

```javascript
describe('Angular Basic Tests', function() {
    'use strict';
});
```

This code sets up a Jasmine Test Suite called 'Angular Basic Tests'. We will place two things inside these suite:

- Our tests.
  - These begin with a call to the function **it()**
- Code to set up and tear down the environment in which we want our suites to run
  - These include calls to **beforeEach()** and **afterEach()**. Those methods are called before and after each test.

Here we add code to load our Angular module before each test:

```javascript
describe('Angular Basic Tests', function() {
    'use strict';

    beforeEach(module('elvenApp'));

});
```

Then we add code to load our Angular Controller:

```javascript
describe('Angular Basic Tests', function() {
    'use strict';

    var elvenController, scope;

    beforeEach(module('elvenApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        elvenController = $controller('ElvenController', {
            $scope: scope
        });
    }));
});
```

Finally, we use standard Jasmine syntax to declare three simple tests that prove we can load our Controller and access variables declared on our scope:

```javascript
/*global describe, it */
describe('Angular Basic Tests', function() {
    'use strict';

    var elvenController, scope;

    beforeEach(module('elvenApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        elvenController = $controller('ElvenController', {
            $scope: scope
        });
    }));

        it('should prove we loaded jasmine', function() {
        expect(true).toBe(true);
    });

    it('should get a hint of eight characters', function() {
        expect(elvenController.hint.length).toBe(8);
    });

    it('should set elvenController.hint to "My hint."', function() {
        expect(elvenController.hint).toBe('My hint.');
    });
});
```

These tests are designed to prove that our tests are working and that we can access our Controller. In and of themselves, they are not particularly useful.

## Step Four

Note that in **bower.json** we use Jasmine 2.4.1.

In **test/bower.json**:

```javascript
{
  "name": "angulartest",
  "version": "0.0.2",
  "dependencies": {
    "jasmine-core": "^2.4.1"
  },
  "devDependencies": {}
}
```

Note that in **spec/index.html** we load Jasmine, Angular and our tests:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Jasmine Spec Runner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="bower_components/jasmine-core/lib/jasmine-core/jasmine.css">
    </head>
    <body>
        <script src="bower_components/jasmine-core/lib/jasmine-core/jasmine.js"></script>
        <script src="bower_components/jasmine-core/lib/jasmine-core/jasmine-html.js"></script>
        <script src="bower_components/jasmine-core/lib/jasmine-core/boot.js"></script>        

        <!-- include source files here... -->
        <script src="../public/components/angular/angular.js"></script>
        <script src="../public/components/angular-mocks/angular-mocks.js"></script>
        <script src="../public/javascripts/control.js"></script>

        <!-- include spec files here... -->
        <script src="spec/test.js"></script>


    </body>
</html>
```

Refresh your browser to confirm its works. The image shown here is a bit out of date, but it gives the general idea of what you should see:

![jasmine](https://s3.amazonaws.com/bucket01.elvenware.com/images/angular-basic-unit-tests-01.png)

## Step Five

Let's review the code in **control.js**. To create this file, I took the following steps:

- Created a file called **public/javascripts/Control.js**
- Create a simple angular controller using **ControllerAs**
- Add the **ng-app** and **Control.js** to **views/layout.jade**
- Add the controller to **views/index.jade**

In Control.js:

```
(function() {
    var app = angular.module('elvenApp', []);

    app.controller('ElvenController', function() {
        var elvenController = this;

        elvenController.hint = "My hint.";
    });

})();
```

In **layout.jade** you will find something like this:

```
    doctype html
html
  head
    title= title
    // Latest compiled and minified CSS
    link(rel='stylesheet', href='components/bootstrap/dist/css/bootstrap.min.css')
    link(rel='stylesheet', href='/stylesheets/style.css')
    // Optional theme
    link(rel='stylesheet', href='components/bootstrap/dist/css/bootstrap-theme.min.css')
    // JavaScript
    script(src='components/jquery/dist/jquery.js')
    script(src='components/bootstrap/dist/js/bootstrap.min.js')
    script(src='components/angular/angular.js')
    script(src="javascripts/Control.js")

  body(data-ng-app="elvenApp")
    block content
```

Make sure you have the following code in **index.jade**:

```
extends layout

block content
  h1= title
  p Welcome to #{title}

  #elvenController(ng-controller="ElvenController as elvenController")
    p {{elvenController.hint}}

```

## Step Six

Create methods in your controller called **square** and **add**. They first should square a single parameter passed into it, the second should add the two parameters passed into it.

Write two tests to prove the methods work. The tests should have descriptions and matching code a bit like this:

- it("should square 5 and get 25" etc....
- it("should add 3 and 2 and get 5" etc....

Or to say the same thing a different way:

- Create a function called square that takes one parameter. Pass in the number 5.
- Create a function called add, pass in two parameters: 3 and 2.

The first should return 25, the second 5. For example here is a function called getNine that returns 9:

```javascript
// In Control.js
elvenController.getNine = function() {
    return 9;
}

// In test.js
it('should get nine', function() {
  expect(elvenController.getNine()).toBe(9);
});
```

## Turn it in.

Make sure you have saved your work in the proper folder of your repository. Submit your work and include a note stating the folder where you saved your work, particularly if it differs from the default value specified in this paragraph.

## Hint

Note that we set the power to port 30025 and we use **nodemon** rather than node:

- In **bin/www** we set the **port** to 30025.
- In **package.json** we use **nodemon** in the **start** property of the **scripts** object.

Note that we use angular and bootstrap:

First create **.bowerrc** and **bower.json**. To do so, make sure you have the most recent copy of JsObjects by running **git pull** at the root of the JsObjects folder.

Then do this:

```
copy %ELF_TEMPLATES%\.bowerrc .
copy %ELF_TEMPLATES%\bower.json .
bower install angular --save
bower install angular-mocks --save
bower install jquery --save
bower install bootstrap --save
```
