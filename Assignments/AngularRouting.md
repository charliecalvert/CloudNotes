## Description

Learn Angular Routing basics.

- Some slides are here: [http://bit.ly/angular-routes](http://bit.ly/angular-routes)
- Angular Routing View Example: [On JsObjects](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularRoutingView)

The example in the slides is not the one I want you to create for this assignment.

## Step One

Create the project in your repository:

    express Week07-AngularRoutes

Open the project in WebStorm or your choice of editor/IDE.

Set port to 30025 in **bin/www**, use **nodemon** in **package.json**.

In **routes/index.js** set the title to **Angular Routes LastName**, where LastName is your last name.

## Step Two

Add angular, bower and bootstrap.

- bower init
- copy %ELF_TEMPLATES%\.bowerrc .
- bower install angular angular-route jquery bootstrap  --save

## Step Three

Create **app.js**

```
var myModule = angular.module("elfApp", [ 'ngRoute' ]);

myModule.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl : "main",
        controller : "MainController",
        controllerAs: "mainController"
    }).when('/about', {
        templateUrl : "about",
        controller : "AboutController",
        controllerAs: 'aboutController'
    }).otherwise({
        redirectTo : '/'
    });
});
```

## Step Four

Create main.js:

```
var elfApp = angular.module("elfApp");

elfApp.controller('MainController', function() {
    var mainController = this;
    mainController.mainData = "Main Data";
});
```

about.js:

```
var elfApp = angular.module("elfApp");

elfApp.controller('AboutController', function() {
    var aboutController = this;
    aboutController.aboutData = "About Data";

});
```
main.jade:

```
<p>This is main</p>

<p>{{mainController.mainData}}</p>
```

about.jade:

```
<p>This is about</p>

<p>{{aboutController.aboutData}}</p>
``` 

## Five

In Layout.jade:

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="components/angular/angular.js")
    script(src="components/angular-route/angular-route.js")
    script(src="javascripts/app.js")
    script(src="javascripts/main.js")
    script(src="javascripts/about.js")
  body(ng-app="elfApp")
    block content
```

## Turn it in

The usual.