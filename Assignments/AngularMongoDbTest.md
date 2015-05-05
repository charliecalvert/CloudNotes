## Description

Angular Mongo Test in class.

**NOTE**: *I've noticed a few of you are using the git bash command prompt rather than the Windows Command Prompt. If you truly are more comfortable using bash instead of the Windows Command Prompt, then please continue, but if you don't have a strong preference, I think you will find it easier to use the Windows Command Prompt. I think bash is better than the Windows command, but it is meant to be run with Linux, and trying to get it to work on Windows can be a struggle.*  

## Step One

Create the base project by making a copy of **AngularMongoCrud**:

```    
set SKIP=D:\Git\prog219-calvert\Week05-AngularMongoCrud\.idea
robocopy Week05-AngularMongoCrud Week05-AngularMongoTest /XD %SKIP% /MIR
```

This is a bit artificial. We would normally have just one project and add our tests to it. But I need to grade your work, and the simplest way for me to do that is to have you start a completely new project at each stage. If we were really confident of our Git skills we could use tags and branches, but let's not rely on that quite yet.

## Step Two

Install [Jasmine](http://jasmine.github.io/2.3/introduction.html "Jasmine").

Run the following command to install yeoman generator for Jasmine. You
only need to do it once:

	npm install -g generator-jasmine

At the root of your project, type **yo jasmine**. This creates a folder called **test** with this structure:

```
test/
test/.bowerrc
test/.bower.json
test/index.html
test/spec
test/spec/test.js
test/bower_components
test/bower_components/jasmine/*
```

There are multiple files in the jasmine folder. I indicated that fact with an asterisk.

Unfortunately, the copy of Jasmine that yo installs is ancient, and of interst primarily to biblical scholars who want to reinterpret .  To fix things up, do the following:

- Open **test/bower.json** and set the version of jasmine to 2.3.0
- Run **bower install**
- Open up **test/index.html**
- Around line 10, add code to load **boot.js**

Code to load **boot.js** looks like this:

```
<script src="bower_components/jasmine/lib/jasmine-core/boot.js"></script>
```

Delete this entire section, which begins around line 16:

```
        <script>
            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;
                var htmlReporter = new jasmine.HtmlReporter();
                jasmineEnv.addReporter(htmlReporter);
                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };
                var currentWindowOnload = window.onload;
                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };
                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        </script>
```
When you are done, **index.html** might look something like this:

```
<!doctype html>
<html>
    <head>
        <title>Jasmine Spec Runner</title>
        <link rel="stylesheet" href="bower_components/jasmine/lib/jasmine-core/jasmine.css">
    </head>
    <body>
        <script src="bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
        <script src="bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
        <script src="bower_components/jasmine/lib/jasmine-core/boot.js"></script>

        <!-- include source files here... -->

        <!-- include spec files here... -->
        <script src="spec/test.js"></script>

    </body>
</html>
``` 

## Step Three

Bad luck, Charlie prefers **chai**. Start by adding [chai](http://chaijs.com/) to **test/bower.json**:

	bower install chai --save

Add this to **index.html**.

```
<script src="bower_components/chai/chai.js"></script>
```

Modify **test.js** so that it looks, in its entirety, like this:

```
(function() {
    'use strict';

    var expect = chai.expect;

    describe('Integration Tests', function() {

        it('should prove we loaded chai', function() {
            expect(true).to.equal(true);
        });

    });
})();
```

Notice that:

- We use strict
- We use **chai expect**
- We removed one **describe** suite
- We changed the descriptions of the suites and tests
- We added an expectation to our test

## Step Four

It is now time to start testing our program.

First load into **index.html** Angular and the code you want to test:

```
<!-- include source files here... -->
<script src="../public/components/angular/angular.js"></script>
<script src="../public/components/angular-mocks/angular-mocks.js"></script>
<script src="../public/javascripts/resources.js"></script>
<script src="../public/javascripts/control.js"></script>
```

Add this code beneath the word **describe** and above your first test:

```
		var MyController, scope;
		
        beforeEach(module('elvenApp'));

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MyController = $controller('MyController', {
                $scope: scope
            });
        }));
```

Now add in a real test of your object:

```
  it('should get a hint', function() {
     expect(scope.hint.length).to.equal(78);
  });
```

Do what you need to do to set up your mock object in resources.js:

```
angular.module('pres', [])
    .constant('CONFIG', {
        DB_NAME: 'elvenlab01',
        COLLECTION: 'scientists',
        API_KEY: 'qfSxFoUGHBA1EuUlqhux_op2fy6oF_wy'
    })
    .factory('scientists', function (CONFIG) {
        console.log('Scientists factory called');

   function scientists() {

   }

   scientists.prototype.query = function() {
      return [{firstName: 'Marie', lastName: 'Curie', subject: 'Radiation'}];
   };
	return new scientists();
```

A
Then run this test:

```
    it('should get a database hit', function() {
            scope.loadScientists();
            expect(scope.scientists[0].firstName).to.equal('Marie');
	});
```

## Step Five 

Grunt

When running **yo gruntfile**, we care about the DOM, but not about minification.

```
npm install -g generator-gruntfile
npm install grunt --save-dev
npm install grunt-contrib-qunit --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-watch --save-dev
yo gruntfile
```

Modify the **jshint options** section in **Gruntfile.js** to look like this:

```
browser: true,
globals: { jQuery: true, chai: true, angular: true },
boss: true,
ignores: [
    '**/components/**',
    '**/bower_components/**',
    '**/node_modules/**'
],
reporter: 'checkstyle',
reporterOutput: 'result.xml'
```

The **browser**,  and **boss** properties already exist. I'm adding them just for context. You need to modify globals by adding chai, and you need to add **ignores**, **reporter** and **reporterOutput**. Some variables that we use such as **jQuery, chai and angular** that should be ignored. That is, they should not be reported as **undefined**.

Run **grunt jshint**. Look at result.xml in your browser.

## Step Five

Load a real test

In **index.html**:

```
<!-- include source files here... -->
<script src="../public/javascripts/resources.js"></script>
```

In test.js:

