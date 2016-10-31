## Overview

Our primary goal in the Data Master Refactor assignment will be to strip Angular out of our assignment. I will try to change the structure as little as possible, at least at first. We can make more changes later.

We also need to make improvements on both the server side and the client side in order to be able to see our data better.

## CouchView02 Updates

Thought CouchView02 still uses angular, I have updated it to provide better support on the server and the client for properly displaying data. Go to **JsObjects** and pull the most recent updates. Now run **JsObjects/Data/CouchView02** and take a look at the updates.

Let's look at some of the changes by running these commands from the routes folder:

- git diff bacf72d..3bcd3fb -- Couch.js
- git diff bacf72d..3bcd3fb -- CouchInsert.js
- git diff bacf72d..3bcd3fb -- CouchBulk.js
- git diff bacf72d..3bcd3fb -- CouchDesignDocs.js

Merge these changes into your current code.

## Create branch

In your repository, create a new branch called "Week07". Switch to that branch.

Copy the **Week0X-DataMaster** program to a folder called simply **DataMaster**. Copy **Week07-Midterm** to a folder called **DataHunter**. For the rest of the quarter, we will do most of our work in these folders. Each week, however, we will create a new branch. The work you did on these programs during Week07 will be in the **Week07** branch, the work in Week08 in the **Week08** branch, and so on.

## Remove Angular

Let's get to work on stripping Angular out of DataMaster. Make sure you are in the **Week07** branch and in the **DataMaster** folder.

The first steps are to remove angular from:

- layout.jade
- package.json

In **control.js** change delete the lines:

```javascript
var myModule = angular.module('myModule', ['ngRoute']);

var queryController = myModule.controller('QueryController',
...
)
```

Replace them with this:

```javascript
var queryController = function (result) {
  ...
})
```

Also change this code:

```javascript
myModule.config(function ($routeProvider) { ... })
```

The new code should look like this:

```javascript
var findRoutes = (function ($routeProvider) { ... })
```

In **index.jade**, wrap our hyperlinks in a DIV with an ID of databaseOptions:

```text
div#databaseOptions
    ul
        li
            a(href='databaseName') Get current Database Name
        li
            a(href='createDb') CreateDb
        li
            a(href='deleteDb') DeleteDb
    ul
        li
            a(href='insertNpcsBulk') Insert NPCs Bulk
        li
            a(href='insertNpcsOneDoc') Insert NPCs as one document
        li
            a(href="insertDesignDoc") Insert Design Doc
    ul
        li
            a(href="readOne") Read One Doc
        li
            a(href="viewNpcsBulk") View NPCs Bulk documents
        li
            a(href="viewNpcsOneDoc") View NPCs One document
```

At the very bottom of the **control.js**, insert this code which will be called each time the user clicks on a hyperlink:

```javascript
/*
 * User clicks control
 * Create Route
 * Tell Route which route was selected
 * Call findRoutes and pass in Routes object
 *   findRoutes calls route.when for each possible path
 */
$(document).ready(function () {
    $('#databaseOptions ul li a').click(function (event) {
        event.preventDefault();
        //alert('clicked' + event.target.pathname);

        var route = new Route();
        route.setRoute(event.target.pathname);
        findRoutes(route);
    });

});
```

## New RouteProvider

Since we have removed Angular, we need a substitute for the Angular **RouteProvider** object. Place the following object in a file called **Route.js**. Modify **layout.jade** so that this file gets loaded.

```javascript
var Route = function () {
    this.route = '';
};

Route.prototype.setRoute = function (routeInit) {
    this.route = routeInit;
};

Route.prototype.when = function (route, control) {
    if (route === this.route) {
        var resolver = {
            defer: function () {
                return control.controller
            }
        };

        for (var funcName in control.resolve) {
            control.resolve[funcName](resolver);
        }
    }
    return this;
};

Route.prototype.otherwise = function () {
    // DO NOTHING FOR NOW
};
```

## Run Query

My **runQuery** method now looks like this:

```javascript
function runQuery(query, $q) {
    'use strict';
    var defers = $q.defer();
    $.getJSON(query, function (json) {
        if (defers === 'QueryController') {
            queryController(json);
        } else if (defers === 'NameController') {
            nameController(query, json);
        }
    }).fail(function (jqxhr, textStatus, error) {
        var response = {error: "Unknown. Is program running?"};
        if (jqxhr.responseText) {
            response = JSON.parse(jqxhr.responseText);
            response.genericError = error;
            response.statusText = textStatus;
        }
        queryController({
            'requestFailed': response
        });

    });
}
```

## Display

In **index.jade** I now have two files:

```text
pre#debug

pre#docs
```

In the **queryController** method you can get handles to them like this:

```javascript
var $scope = $('#debug');
var docs = $('#docs');
docs.empty();
```

Since these are both PRE elements, you can put any type of data in either one. Nevertheless, I have a convention of displaying certain types of data in each element. I use the:

- **$scope** object to display simple messages like "success" or "failure".
- **docs** object to display complex rows of in formation, such as the rows of game data.

Now write code to handle several possible responses from the server, or do whatever you want to handle the data sent from the server:

```
if (result.ok) {
    YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
} else if (result.requestFailed) {
    YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
} else if (result.error) {
    YOUR CODE HERE  PUTS INFO IN $scope AND/OR docs
} else {
    YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
}
docs.html(YOUR CODE HERE PUTS INFO IN docs);
```

![scope docs](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-scope-docs.png)

In the image shown above the words "It worked" are shown in **$scope** while the array that contains a single object is shown in **docs**.
