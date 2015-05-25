## Description

This documents describes the Basic Unit Testing assignment. It belongs in a folder called **Week05-AngularTests.**

## Overview

- Create an express project
- Add in Angular
- Use ControllerAs
- Write Tests


## Intro

Find **GetAngularTests.bat** from this folder:

	C:\Users\charles.calvert\Git\JsObjects\Utilities\SetupWindows
	
Copy it to your %USERPROFILE%/Bin folder.

Then naviage to the root of your repository and type:

	GetAngularTests

Let's begin by examing two ways to create an express program that includes
angular.

## Step One Option A

Find GetAngularTests.bat from this folder:

```
C:\Users\charles.calvert\Git\JsObjects\Utilities\SetupWindows
```
Copy it to your %USERPROFILE%/Bin folder.

Then naviagate to the root of your repository and type:

    GetAngularTests

## Step One OptionB

Here is an alternative way to achieve the same result as in the previous step:

    git clone http://github.com/charliecalvert/AngularJasmine.git
    cd AngularJasmine    
    cd test
    bower install
    cd ..
    npm install & bower install & npm start
    
    
And then delete the .git folder:

	rmdir /s /q .git

And then delete the .git folder:

    rmdir /s /q .git


## Step Two

Open the project in WebStorm. Right click on **test/index.html**. Select **Run**.

If not done already, set up the project:

- In **bin/www** set the **port** to 30025. 
- In **package.json** use **nodemon** in the **start** property of the **scripts** object.

If not done already, install angular:

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


Run the project itself from the project root:

```
npm install & bower install & npm start
```

## Step Three

If it has not be done for you automatically, upgrade to Jasmine 2.3.

In **test/bower.json**:

```
"dependencies": {
      "jasmine": "~2.3.0"
  },
```

At command line, in **test**, run **bower install**:

```
>bower install
bower cached        git://github.com/pivotal/jasmine.git#2.3.0
bower validate      2.3.0 against git://github.com/pivotal/jasmine.git#~2.3.0
bower new           version for git://github.com/pivotal/jasmine.git#~2.3.0
bower resolve       git://github.com/pivotal/jasmine.git#~2.3.0
bower download      https://github.com/pivotal/jasmine/archive/v2.3.1.tar.gz
bower extract       jasmine#~2.3.0 archive.tar.gz
bower resolved      git://github.com/pivotal/jasmine.git#2.3.1
bower install       jasmine#2.3.1

jasmine#2.3.1 bower_components\jasmine
```

In **test/index.html** remove the module pattern designed to initialize Jasmine 3.0. Delete this:

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

Replace the above code by loading **boot.js**:

```
<script src="bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
<script src="bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
<script src="bower_components/jasmine/lib/jasmine-core/boot.js"></script>
```

In **index.html**:

```
        <!-- include source files here... -->
        <script src="../public/components/angular/angular.js"></script>
        <script src="../public/components/angular-mocks/angular-mocks.js"></script>
        <script src="../public/javascripts/control.js"></script>
```
    
Refresh your browser to confirm its works:

![jasmine](https://drive.google.com/uc?id=1_a10tc7BcVR1uNfH6I6-uJq8W9nNRGvcXg)

Create our test:

```
/*global describe, it */
'use strict';

(function () {

    'use strict';

    var elvenController, scope;

    describe('Integration Tests', function() {

        beforeEach(module('elvenApp'));

        // Initialize the controller and a mock scope
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            elvenController = $controller('ElvenController', {
                $scope: scope
            });
        }));

        it('should prove we loaded chai', function() {
            expect(true).toBe(true);
        });

        it('should get a hint', function() {
            expect(elvenController.hint.length).toBe(8);
        });
    });
})();

```

    copy %ELF_TEMPLATES%\AngularTestSpec.js test\spec\test.js

## Step Four

If it has not been done already, create a file to test. Otherwise, just review the existing copy of **control.js**.

- Create a file called **public/javascripts/Control.js**
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

Or:

```
    copy %ELF_TEMPLATES%\AngularControl.js public\javascripts\control.js
```

In **layout.jade**:

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

  body(ng-app="elvenApp")
    block content
```

Or:

    copy %ELF_TEMPLATES%\AngularLayout.jade views\layout.jade


Make sure you have the following code in **index.jade**:

```
extends layout

block content
  h1= title
  p Welcome to #{title}

  #elvenController(ng-controller="ElvenController as elvenController")
    p {{elvenController.hint}}

```

Or: 

    copy %ELF_TEMPLATES%\AngularIndex.jade views\index.jade

## Step Five

Create methods in your controller called **square** and **add**. They first should square a single parameter passed into it, the second should add the two parameters passed into it.

Write two tests to prove the methods work. The tests should have descriptions and matching code a bit like this:

- it("should square 5 and get 25" etc....
- it("should add 3 and 2 and get 5" etc....

## Turn it in.

Save your work in a folder of your repository called **Week05-AngularTests**. Submit your work and include a note stating the folder where you saved your work, particularly if it differs from the default value specified in this paragraph. 
