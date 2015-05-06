## Description

This documents describes the Basic Unit Testing assignment.

## Overview

- Create an express project
- Add in Angular
- Use ControllerAs
- Write Tests

## Step Zero

    git clone http://github.com/charliecalvert/AngularJasmine.git
    cd AngularJasmine    
    cd test
    bower install
    cd ..
    npm install & bower install & npm start

## Step One

```
express Week05-AngularTest
cd Week05-AngularTest
yo jasmine
```

## Step Two

Open the project in WebStorm. Right click on **test/ndex.html**. Select **Run**.

Set up the project:

- In **bin/www** set the **port** to 30025. 
- In **package.json** use **nodemon** in the **start** property of the **scripts** object.

Install angular:

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

Upgrade to Jasmine 2.3.

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

## Step Four

Create a file to test.

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
    copy %ELF_TEMPLATES%\AngularControl.js public\javascripts\Control.js
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


In **index.jade**:

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


