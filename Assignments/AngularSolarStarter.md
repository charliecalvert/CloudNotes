## Overview

Angular Solar Starter

The goal of this assignment is to load a file called **Renewable.json** and iterate over its contents. This JSON file contains an array of objects. We will use a number control to iterate through the array and a directive to display the objects.

Our goal, at this stage, is to get a proof of concept app running. This will be the first of multiple iterations.

![Angular Solar Starter](https://s3.amazonaws.com/bucket01.elvenware.com/images/angular-solar-explorer-01.png)

To ensure our code works, we will take the first steps toward writing tests with HTML fixtures loaded from disk.

## Step One

From the root of your repository, copy the **AngularDirectiveTesting** project to a new project call **SolarExplorer**. Then navigate to your new project folder:

<pre>
cp -r Week04-AngularDirectiveTesting/ Week05-SolarExplorer
cd Week05-SolarExplorer
</pre>

If necessary, install your packages: **npm install && bower install**.

In **routes/index.js** change the **title** to **AngularSolarExplorer lastname**, where **lastname** is your last name. Make similar changes in **bin/www** and **package.json**.

Run **karma start** to confirm all is working.

## Step Two: Tests {#tests}

In the files section of **karma.conf.js** make sure **app.js** is loaded first:

```javascript
// CODE OMITTED HERE
'node_modules/jasmine-jquery/lib/*.js',
'public/javascripts/app.js',      << ==== HERE
'public/javascripts/*.js',
// CODE OMITTED HERE
```

In **test-basic**, let's start by declaring a variable and method that we will want to create. We will mark this as **fit** to see that we want to get those tests to pass first. Put them right after the **beforeEach** methods. Anticipating where we will be going, also modify the code that tests if we loaded a fixture:

```javascript
fit('should find the index', function() {
    expect( mainController.index).toBe(0);
});

fit('should have a getRenewable method ', function() {
    expect(mainController.getRenewable).toBeDefined();
});

it('should be possible to access the fixture', function() {
    var spanElement = document.getElementById('renewable');
    expect(spanElement).toBeDefined();        
});
```    

The first two tests may not pass yet, but they should by the time we done.

## Step Three

Let's build in Angular Routing right from the start by copying in the relevant files from **AngularRoutes**:

<pre>
cp ../Week03-AngularRoutes/views/main.jade views/.
cp ../Week03-AngularRoutes/views/about.jade views/.
cp ../Week03-AngularRoutes/public/javascripts/about.js public/javascripts/.
cp ../Week03-AngularRoutes/public/javascripts/main.js public/javascripts/.
cp ../Week03-AngularRoutes/public/javascripts/app.js public/javascripts/.
</pre>

In **layout.jade**, make sure you are loading:

- angular-route.js
- app.js
- main.js
- about.js

Use **bower install** to ensure that **angular-route** is available and that it is "saved" to **bower.json**.

**NOTE**: _I'm intentionally being a little vague here. If you need a reminder on how to set up **layout.jade** or **bower.json**, see the Angular Routes assignment._

Stop loading **control.js**, but don't delete it yet.

In **index.jade**, set up your menu as in **AngularRoutes**:

```javascript
nav.navbar-inverse.navbar-fixed-top
  .container
    navbar-header
      ul.nav.nav-pills
        li(ng-class="{ active: isActive('/')}")
          a(ng-href='#/') Home
        li(ng-class="{ active: isActive('/about')}")
          a(ng-href='#/about') About
```

Beneath this, and at the same level as the nav, create a second container, as in **Angular Routes**. Include a **DIV** with **data-ng-view** in this second **.container**. For instance, the second container, the one not in the **nav**, might look like this:

```javascript
.container
  h1= title
  p Welcome to #{title}

  div(data-ng-view="")
```

## Step Four: Get the data {#data}

Create a folder called **public/data**. Download three files I created based on public data provided by the government. Put them in your data directory. The simplest way to get them is shown below. Just block copy the lines, navigate to the root of your project, and paste them in:

<pre>
cd public
mkdir data
cd data
wget https://s3.amazonaws.com/bucket01.elvenware.com/downloads/Renewable.json
wget https://s3.amazonaws.com/bucket01.elvenware.com/downloads/EnergyTypes.json
wget https://s3.amazonaws.com/bucket01.elvenware.com/downloads/RenewableTypes.json
</pre>

Alternatively, you can download them and save them to disk:

- [Renewable](https://s3.amazonaws.com/bucket01.elvenware.com/downloads/Renewable.json)
- [EnergyTypes](https://s3.amazonaws.com/bucket01.elvenware.com/downloads/EnergyTypes.json)
- [RenewableTypes](https://s3.amazonaws.com/bucket01.elvenware.com/downloads/RenewableTypes.json)


## Step Five: Main Jade {#main-jade}

Add a button and a number control to **main.jade**:

```
button.btn.btn-primary(ng-click="mainController.getRenewable()") Energy Renewable

div
    label
        | Number:
        input(type='number', name='input', ng-model='mainController.index', min='0', max='10', required='')

hr
```

When the button is clicked, a method on your controller called **getRenwewable** will be called. When the input control is incremented or decremented, a value on your controller called **index** is modified. In particular, **index** will contain the same value as the input control.

## Step Six

Set up **main.js** and use dependency injection to pass in **$http** as the sole parameter to the anonymous callback for your **MainController**:

```javascript
  elfApp.controller('MainController', function($http) {
     // CODE OMITTED HERE
  });
```

Inside the controller add a method to load your JSON and store it in a variable called **renawable**. In particular, we are, at this stage, loading only the **Renewable.json** file:

```javascript
mainController.getRenewable = function() {
    console.log('getRenewable');
    $http.get('data/Renewable.json')
        .then(function(res){
            console.log(res.data[0]);
            mainController.renewable = res.data;
        });
}
```

We also add our **index** for tracking the data in the **INPUT** control:

```javascript
mainController.index = 0;
```

## Step Seven: Directive {#directive}

Create a directive and display all eight fields of the JSON:

elfApp.directive('elfRenewable', function() {
    'use strict';
    return {
        controller: 'MainController',
        controllerAs: 'mainController',
        template: 'First: {{mainController.renewable[mainController.index].Year}} ' +
        '<br>Solar: {{mainController.renewable[mainController.index]["Solar (quadrillion Btu)"]}}' +
        '<br>Geothermal: {{mainController.renewable[mainController.index]["Geothermal (quadrillion Btu)"]}}' +
        // CODE OMITTED HERE...
    };
});

## Turn it in

Create a **main.html** fixture and load it, and convert your "marie" tests to work with the renewable data and directive. Then push, and if necessary, specify the folder your work is in.

**NOTE**: _No nested project folders!_
