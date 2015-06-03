## Description

Learn Angular Routing basics.

- Some slides are here: [http://bit.ly/angular-routes](http://bit.ly/angular-routes)
- Angular Routing View Example: [On JsObjects](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularRoutingView)

The example in the slides is not the one I want you to create for this assignment.

## Step One

Create the project in your repository:

    express Week07-AngularRoutes

Navigate into the directory you created and then run **npm install**.
	
Open the project in WebStorm or your choice of editor/IDE.

Set port to 30025 in **bin/www**, use **nodemon** in **package.json**.

In **routes/index.js** set the title to **Angular Routes LastName**, where LastName is your last name.

## Step Two


Add angular, bower and bootstrap.

- bower init
- copy %ELF_TEMPLATES%\\.bowerrc .
- bower install angular angular-route jquery bootstrap  --save

## Step Three

In your **public\javascripts** directory:

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

In your **public\javascripts** directory:

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

In your **views** directory:

main.jade:

```
p This is main

p {{mainController.mainData}}
```

about.jade:

```
p This is about

p {{aboutController.aboutData}}
``` 

Then add this to **routes/index.js** right before **module.exports**:

```
router.get('/:id', function(req, res, nest) {
  res.render(req.params.id, { title: ' Angular Routes Calvert' });
});
```

## Five

There is information about menus here:

- [http://bit.ly/jade-mixins](http://bit.ly/jade-mixins)

In Layout.jade:

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='components/bootstrap/dist/css/bootstrap.css')
    link(rel='stylesheet', href='components/bootstrap/dist/css/bootstrap-theme.css')
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
    script(src="components/angular/angular.js")
    script(src="components/angular-route/angular-route.js")
    script(src="javascripts/app.js")
    script(src="javascripts/main.js")
    script(src="javascripts/about.js")
  body(ng-app="elfApp")
    block content
```

In **index.jade** we will have a:

- Container
- Header with menu and title
- The main body of the program, including a place for our routing content, our controllers.
- Footer

To get started, define the container:

```
extends layout

block content
  .container
```

Now, inside the container, add a menu:

```
    .header
      nav.navbar-default.navbar-fixed-top
        ul.nav.nav-pills
          li(ng-class="{ active: isActive('/')}")
            a(ng-href='#/') Home
          li(ng-class="{ active: isActive('/about')}")
            a(ng-href='#/about') About
      h3.text-muted #{title}
```

Inside the container, but not inside the header, add the body of the page:

```
    h1= title
    p Welcome to #{title}

    h1 The View
    div(data-ng-view="")
```

And finally, still inside the container, add the footer:

```
    .footer
      p
        span.glyphicon.glyphicon-grain
        |  from Elvenware
```

In index.jade, the indentation should appear something like this, where each dash (-) represents a tab or an equal number of spaces:

```
block content
- container
- - header
- - navbar
- - - nav
- - - - ul
- - - - - li
- - - - - li
- - - - - h3
- - - h1
- - - p
- - - h1
- - - div
- - - footer
- - - - p
```

## Turn it in

The usual.