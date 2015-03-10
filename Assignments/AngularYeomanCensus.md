#Angular Yeoman Census

In our quest to do things the traditional way, we are going to adopt Yeoman, which is a scaffolding tool. It creates a ready to use Angular application with support for:

- Jasmine tests
- bootstrap
- jquery
- karma
- grunt
- angular
- jshint
- and other features such as uglification...

Partial Presentation: [http://bit.ly/angular-yeoman](http://bit.ly/angular-yeoman)

## Create the Application

This step is like typing **express MyApp**. It is the step that creates the framework, the scaffolding, for our application. Begin by making sure **yo** and **bower** are installed globally:

```
npm install -g yo
npm install -g bower
```

The server side package maintenance is handled by NPM, the client side will be handled by this new tool, called **bower**. The **yo** utility is part of **yeoman** and it handles much of the app generation.

Go to the root of your working folder, and create the application with the following commands, saying **no** to **sass/compass** and yes to most everything else. (It's not wrong to say yes to compass, but it gets more complicated than necessary):

```
mkdir census
cd census 
npm install generator-angular 
npm install generator-karma 
yo angular
```

The five lines shown above create your application in a folder called **census**. I've seen at least some people install **generator-angular** and **generator-karma** globally, as they take a long time to install, and probably don't change very often. Hopefully by Wednesday I will have a better sense of what to do in this regard.

Open up **Gruntfile.js** and change the port from 9000 to 30025.

Now that you have the application installed and set up, you can start it like this:

	grunt serve

This will not run your tests, it runs the app. It should even launch it in a browser for you. It will also refresh the browser each time you edit an HTML, JavaScript or CSS file that belongs to your project. In addition, it runs **jshint** each time we make a change.

Now open the **census** folder in WebStorm. Open up **app/views/main.html** and edit it so that you begin to create a custom version of the application. You should need do nothing more make the edit. You don't even have to save the file, as apparently WebStorm does that automatically. Just make the edit, then check the browser. Without hitting refresh, you should see the changes. 

I came up with something like this, and you should do something similar, but include your name and your own custom icons and images:

![CensusState](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGMjdaTmFWak42S1k)

You can see my custom bitmap above, and my custom icon below. You can edit favicon.ico in the gimp.

The menu item labeled **go** just points to a page that I used for testing and experiments. You need not include that page, though you might find it useful. The key page is reached with the **States** menu item, visible near the top right in light blue. When I click it I am taken to my **statesPop** page. I can use that page to query the census bureau:

![CensusQuery](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTzVxV2YxYUlzbDA)

In the screen shot shown above, I'm querying for the Asian census of Washington State. As a result, it would probably be better if the string I wrote out said "The Asian population of Washington State." As it is. Recall that you can get the value associated with the option selected by the user by writing something like this or by various other tricks:

```javascript
statePick = "&for=state:" + $("#statePick option:selected").attr("data_index");
populationType = $("#populationPick option:selected").attr("data_index");
```

##Angular Routes

We did quite a bit of work with views and routes last quarter. You can review some of that by looking again at some of the videos made last fall or earlier:

- [Angular Video Playlist](https://www.youtube.com/playlist?list=PLe8CjTxuUQ392kw7lpeSopECrFntxMgi4)

Here is the code, found in **app/scripts/app.js** where I set up my routes:

```javascript
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl"
      })
      .when("/about", {
        templateUrl: "views/about.html",
        controller: "AboutCtrl"
      })
      .when("/go", {
        templateUrl: "views/go.html",
        controller: "GoController"
      })
      .when("/statePop", {
        templateUrl: "views/statePop.html",
        controller: "StatesController"
      })
      .otherwise({
        redirectTo: "/"
      });
  });
```

The routes, such as **/go**, and **/statePop**, are declared in **index.html**, as described later in this document.

To make this work, you need to edit "index.html", as described below, and also create two files:

- app/views/statePop.html 
- app/scripts/controllers/statePop.js

The **statePop.html** file is a partial HTML file. In other words, it is a *template*. All you need is the HTML and Angular directives that are needed to generate your view, you don't need the HTML DOC or the HEAD elements. When everything is set up in the IDE correctly, it looks like this, where we are seeing the very top of **statePop.js**

![CensusIde](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGYzJEZE8yR3BXeUk)

**NOTE**: *Note that I'm not following my usual capitalization and abbreviation rules in this example. Hopefully we can return to normal on that side of things after I start to feel more comfortable with yeoman. The rules are still important, I just need to do some refactoring.*

The **statePop.js** file is a normal angular module, that begins like this:

```
"use strict";

var mod = angular.module("censusApp");

mod.factory("getUrl", function urlFactory() {

  function getUrl() {
    var statePick, populationType;
    var myKey = "YOUR_KEY_HERE";
    statePick = "&for=state:" + $("#statePick option:selected").attr("data_index");
    populationType = $("#populationPick option:selected").attr("data_index");
    var queryUrl = "http://api.census.gov/data/2010/sf1?key=" + myKey + "&get=" + populationType + ",NAME" + statePick;
    return queryUrl;
  }

  return getUrl;

});

// Now define the controller
mod.controller("StatesController", function ($scope, $http, getUrl) {

  function successFunc(response) { 
  etc...
```
Don't forget that every time the button is clicked, you will probably have to retrieve another **url** by calling the **getUrl** method returned from your factory.


## Bootstrap

In our screen shot of the IDE, you can see our **index.html** listed at the bottom left. We are not using **Jade** just now, so we edit the HTML directly. This is where you can name your application with **ng-app** directive:

```
<body ng-app="statesApp">
```

Yeoman has also linked in bootstrap, so you can set up your menu by editing the by now familiar bootstrap code:

```
 <!-- Add your site or application content here -->
    <div class="container">
      <div class="header">
        <ul class="nav nav-pills pull-right">
          <li class="active"><a ng-href="#/">Home</a></li>
          <li><a ng-href="#/statePop">States</a></li>
          <li><a ng-href="#/go">Go</a></li>
          <li><a ng-href="#/about">About</a></li>
```

This is where we defined the routes mentioned above in the section on **app.js**. You can see them in the excerpt above: **'/statePop'** and **'/go'**.

And of course, don't forget to load your JavaScript:

```
<!-- build:js({.tmp,app}) scripts/scripts.js -->
// code omitted here ... 
<script src="scripts/controllers/go.js"></script>  
<script src="scripts/controllers/statePop.js"></script>
<!-- endbuild -->
```

##JsHint

Grunt will run **jshint** for you automatically as you edit your application. There is a file called **.jshintrc** in the project root. I added this to it:

	"quotmark": "double",
	"jquery": true,

The first one, shown above, **quotmark**, is set to **"single"** by default. It is really a matter of taste, but if we have to go one way or another, I think I prefer double quotes since make it easier to put apostrophes in words like **don't**. The second item shown above, **jquery**, is not mentioned in the original file, so we need to add it.

##Final Thoughts

The application scaffolding prepared by Yeoman is similar to what is created by express. But this time everything is about the client side, the browser side. We aren't creating any server side code as we do with express. To the degree that we have server side code, it is being supplied by the US census bureau.

**NOTE**: *It is normal to combine express and yeoman in application. The server is handled by express, the client by yeoman.*

Notice the **views** directory, which is similar to the **views** directory in an express app. Only this time, instead of working with Jade, we simply put our **views**, that is our HTML, directly into the folder. The **styles** folder is just like the **public/stylesheets** folder in express. And the **scripts** folder, of course, is the equivalent of the **public/javacripts** folder. 

You will notice that we don't use **requirejs**, at least not in this version of the program. The loading of JavaScript files occurs in **index.html**, but we place the calls to load the JavaScript near the end of the body, rather than in the head section. This is considered a best practice today, as it gives the HTML a chance to load before the browser has to load and parse the JavaScript. This usually means that the user can at least see something while waiting for the application to finish loading the JavaScript. The app would not work differently if we moved the **script** tags back up into the header. The move to the south of the file was just in the interest of perceived optimization from the users point of view. Show the user something, then load the JavaScript. This is considered better than loading the JavaScript first, then showing the user something. I believe this also helps to explain the "splash" screen like affect that occurs when the app first loads, and that is seen in the first screen shot above.

##Turn it in

When you are done, turn in a screen shot of your main page, and states page. Also check your project into Git in a Week05_YeomanAngularCensus folder. Be sure to put your name on the states page so I can see it is yours.

**Make sure you add *bower_components* to your .gitignore files.** Do it now so that you don't forget! That directory can be not just large, but humongous.

We are not engaging in enough discussion, so I'm going to make the discussion graded this week. Please get up there and ask questions if you are having troubles with any of this, or if you need clarification on issues I might have left unresolved in these notes. 

  
  




