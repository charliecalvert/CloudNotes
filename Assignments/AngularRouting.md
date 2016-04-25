## Description

Learn about single page applications and Angular Routing.

- Some slides are here: [http://bit.ly/angular-routes](http://bit.ly/angular-routes)
- Angular Routing View Example: [On JsObjects](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularRoutingView)

The example in the slides is not the one I want you to create for this assignment.

## Goals

- Create an express application
- Add support for Angular Routing
- Learn to use Routing to help you create a single page application
- Learn to load HTML dynamically from the server
- Work with Controllers
- Work with Controller As
- Work with Bootstrap Menus

## Step One: Create the project {#create}

Create the project in your repository:

    express Week03-AngularRoutes

Navigate into the directory you created and then run **npm install**.

Open the project in WebStorm or your choice of editor/IDE.

Set port to 30025 in **bin/www**. Use **nodemon** in **package.json**:

```javascript
"scripts": {
  "start": "nodemon ./bin/www"
},
```

In **routes/index.js** set the title to **Angular Routes LastName**, where LastName is your last name.

## Step Two: Bower {#bower}

Add angular, bower and bootstrap.

- bower init
- cp %ELF_TEMPLATES%\\.bowerrc .
- bower install angular angular-route bootstrap  --save

You should find that bootstrap brings jQuery along with it.

The **.bowerrc** in **ELF_TEMPLATES** configures bower so that it will install packages in the **public/components** folder. In particular, **.bowerrc** looks like this:

```javascript
{
  "directory": "public/components"
}
```

## Step Three: The Menu {#menu}

Now it is time to build the interface. First we'll build the menu, then the body of the UI.

Begin in Layout.jade by loading the code we will need:

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

- navbar and menu  
- The main body of the program, including a place for our routing content, our controllers.
- Footer

To get started, define the navbar:

```
extends layout

block content
  nav.navbar-inverse.navbar-fixed-top
```

Now, inside the navbar, add a container and a menu:

```
.container
  navbar-header
    ul.nav.nav-pills
      li(ng-class="{ active: isActive('/')}")
        a(ng-href='#/') Home
      li(ng-class="{ active: isActive('/about')}")
        a(ng-href='#/about') About
```

By "inside the navbar", I mean indented one tab further to the right than the **navbar**. We know the **navbar** is inside the **block content** because it is indented to the right of it. Likewise, we know our **container** is inside the **navbar** because it is also indented one tab to the right:_

```
block
- navbar
- - container
```

In Jade, indentation is everything.

**HINT**: _Try switching between navbar-inverse and navbar-default._

## Step Four: The Body {#body}

At the same level as the navbar, put the body of the page inside a second container:

```
.container
  h1= title
  p Welcome to #{title}

  h1 The View
  div(data-ng-view="")
```

When I say "at the same level", that means indented the same number of tabs:

```
block
  navbar
    container
      menu
  container
    body
```

And finally, still inside the second container, add the footer:

```
.footer
  p
    span.glyphicon.glyphicon-grain
    |  from Elvenware
```

In index.jade, the indentation should appear something like this, where each dash (-) represents a tab or an equal number of spaces:

```
block content
- navbar
- - container
- - - navbar-header
- - - - ul
- - - - - li
- - - - - li
- container
- - h1
- - p
- - h1
- - div
- - footer
- - - p
```

If you are interested, there is more information about menus here:

- [http://bit.ly/jade-mixins](http://bit.ly/jade-mixins)

## Step Five: Routes {#routes}

The main goal of this assignment is to teach you about angular routes. You can use angular routes to help you create a single page app the changes dynamically when the user selects menu application. When the user selects a menu item:

- HTML is loaded from the server
- The HTML is inserted into the main page of the application replacing existing content
- The end effect is that the page appears to change before the users eyes

As each "page" of the application is loaded, HTML is pulled from the server, and new JavaScript Angular Controller is used to define the code associated with the new page. This means that each page is usually defined primarily by a chunk of HTML and an Angular Controller.

Angular allows us to define a single method that specifies which bits of HTML, and which Controllers, are associated with each page. When the user makes a selection from the menu, this bit of code specifies what associated HTML should be loaded, and what Controller should be loaded.

Consider the case where the user selects the **About** menu. When that happens, the HTML that defines the appearance of the **About** page is loaded. The existing HTML on the main page is swapped out, and the about page is loaded into view. At the same time, the Controller associated with the About page is loaded into memory and linked to the About HTML.

Below is an example of how to define the method that handles routing for the **elfApp** module. In your **public\javascripts** directory create a file called **app.js**:

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

Note that this code specifies that **elfapp** depends on the built in [ngRoute](https://docs.angularjs.org/api/ngRoute) module. This module allows us to load various chunks of HTML into our main page. The end result is a single page application.

Note that each route found in  **myModule.config** specifies three things:

- templateUrl: This is the HTML (Jade in our case) that needs to be loaded.
- controller: This is our controller
- controllerAs: The name of our controllerAs object

Recall this bit of Jade code in **index.jade**:

<pre>
div(data-ng-view="")
</pre>

That is the place in our HTML where the loaded HTML will be inserted. We don't have to load the HTML. The routing Angular routing module and associated code will do this for us. As each page is loaded, it replaces the code currently being displayed to the user. Or at least it does in most case. The first time a route is loaded, there is nothing to replace, so it simply fills the **ng-view** with live HTML.

## Step Six: Controllers {#controllers}

Now that we know the shape of our application, lets define the controllers for the main page and the about page.

In your **public\javascripts** directory create **main.js**:

```
var elfApp = angular.module("elfApp");

elfApp.controller('MainController', function() {
    var mainController = this;
    mainController.mainData = "Main Data";
});
```

The the same directory, create **about.js**:

```
var elfApp = angular.module("elfApp");

elfApp.controller('AboutController', function() {
    var aboutController = this;
    aboutController.aboutData = "About Data";

});

```

## Step Seven: Views {#views}

In your **views** directory create the Jade that will be loaded when the user requests a new "page":

Here is **main.jade**:

```
p This is main

p {{mainController.mainData}}
```

Here is **about.jade**:

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

This code will process the requests for the _chunks_ of HTML that make up the body of the main page and body of the about page. In particular, it loads either **main.jade** or **about.jade**, converts it into HTML, and sends it via HTTP back to the client.

Be sure you understand the flow:

- The user clicks the about menu
- Angular sends a request to the server for about HTML page
- The express app routes the request index.js, where the code you just saw loads **about.jade**, transforms it to HTML, and sends it back to the client.
- Angular receives the HTML, associates it with the about controller, and displays it to the user.

If you understand this, then you are well on your way to being able to build useful Angular applications.

## Turn it in

If you have not done so already, put your work in your repository in the folder designated above. Push. Submit the name of the folder where you have you done your work.
