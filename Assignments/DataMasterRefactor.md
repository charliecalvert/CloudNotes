## Overview

We will discuss this assignment on Wednesday. I'm giving it to you now in case you find it useful. It allows you to step away from Angular, and just write standard jQuery code in the **DataMaster** program. Do only as much as you find useful.

Our primary goal in the **Data Master Refactor** assignment will be to strip Angular out of our code. I will try to change the structure as little as possible, at least at first. We can make more changes later.

Our secondary, but perhaps more important goal, is to establish a framework for building our application. In doing so, we want to support:

- [Loose Coupling](http://edn.embarcadero.com/article/30372)
- [The Single Responsibility Principle][srp]
- [The Open Closed Principle][ocp]


We also need to make improvements on both the server side and the client side in order to be able to see our data better.

## Code Path

- Program starts
- In **control.js** the **Route** object is constructed
- The user clicks on a link
- Call findRoutes and pass in Route object: **findRoutes(Route)**
- Tell Route which route was selected
-   **findRoutes** calls **route.when** for each possible path
- The **when** method calls the function that needs to be resolved
- These methods call **runQuery** which typically calls the server
- The response is passed to the **queryController** or **nameController** as appropriate

Now that this framework is in place, all you need to do is implement objects like **queryController** and **nameController** and register them with the system in **findRoutes**. The point here is not that exactly how the system works, though the details are laid bare for you to examine. The point is the following:

- We support the [Open Closed Principle][ocp-wiki]: _**Modules, Classes and Functions should be open to extension by closed to modification.**_
  - To add new features to the program we simply add new objects and register them in findRoutes. We don't have to break existing code.
- We support [loose coupling][lc-wiki]. No object is linked directly to another object. Instead, we use **requireJs** to load objects as needed. We can replace any of the objects at any time.
- We support the [single-responsibility princeple][srp-wiki]. Our objects and modules all do one thing and have one reason to change.



Two other important design principle not emphasized yet in this class are:

- [Test Driven Development (TDD)][tdd]
- [Dependency Inversion Principle][dip].

Slide decks that might be useful:

- Agile Overview: [http://bit.ly/1qf6V4t](http://bit.ly/1qf6V4t)
- Refactoring: [http://bit.ly/elfrefactor](http://bit.ly/elfrefactor)

As a general rule, these are the rules, ideas and guiding principles that make possible agile development:

- <http://www.agilemanifesto.org/>
- <http://www.agilemanifesto.org/principles.html>

[tdd-wiki]:https://en.wikipedia.org/wiki/Test-driven_development
[lc-wiki]:https://en.wikipedia.org/wiki/Loose_coupling
[srp-wiki]:https://en.wikipedia.org/wiki/Single_responsibility_principle
[ocp-wiki]:https://en.wikipedia.org/wiki/Open/closed_principle
[ocp]:http://www.oodesign.com/open-close-principle.html
[dip]:http://www.oodesign.com/dependency-inversion-principle.html
[srp]:http://www.oodesign.com/single-responsibility-principle.html
[tdd]:http://agiledata.org/essays/tdd.html

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

## Require and Main

In **main.js**, insert this code. Note that it include code that will be called each time the user clicks on a hyperlink:

```javascript
/**
 * @author: Charlie Calvert
 * @name: main.js
 * Created on 10/10/16.
 */

requirejs.config({
    baseUrl: '.',
    paths: {
        'foo': 'javascripts/foo',
        'jquery': 'components/jquery/dist/jquery',
        'control': 'javascripts/control',
        'nameController': 'javascripts/name-controller',
        'queryController': 'javascripts/query-controller',
        'Route': 'javascripts/route',
        'runQuery': 'javascripts/run-query'
    }
});


requirejs(['jquery'], function($) {
    'use strict';

    requirejs(['Route', 'control'], function(Route, control) {
        $(document).ready(function() {

            var route = new Route();
            /*
             * User clicks control
             * Create Route
             * Tell Route which route was selected
             * Call findRoutes and pass in Routes object
             *   findRoutes calls route.when for each possible path
             */
            $('#databaseOptions ul li a').click(function (event) {
                event.preventDefault();
                route.setRoute(event.target.pathname);
                control(route);
            });

        });
    });
});
```

## The Jade

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

## Control

Also change this code found near the top of **control.js**:

```javascript
myModule.config(function ($routeProvider) { ... })
```

The new code for **control.js** should look like this:

```javascript
/**
 * @name Control
 */

define(['Route', 'nameController', 'queryController'], function (Route, nameController, queryController) {

    var findRoutes = (function ($routeProvider) {
        'use strict';
        $routeProvider.when('/databaseName', {
            templateUrl: 'templates/DatabaseNames.html',
            controller: nameController,
            resolve: {
                databaseName: nameController.databaseName,
                allDbs: nameController.allDbs
            }
        }).when('/deleteDb', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.delete
            }
        }).when('/createDb', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.create
            }
        }).when('/insertNpcsBulk', {
            templateUrl: 'templates/InsertReport.html',
            controller: queryController,
            resolve: {
                result: queryController.insertNpcsBulk
            }
        }).when('/insertNpcsOneDoc', {
            templateUrl: 'templates/InsertReport.html',
            controller: queryController,
            resolve: {
                result: queryController.insertNpcsOneDoc
            }
        }).when('/insertDesignDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.design
            }
        }).when('/readOne', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.readOne
            }
        }).when('/viewNpcsBulk', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewBulk
            }
        }).when('/viewNpcsOneDoc', {
            templateUrl: 'templates/QueryView.html',
            controller: queryController,
            resolve: {
                result: queryController.viewOneDoc
            }
        }).otherwise({
            redirectTo: '/'
        });
    });

    return findRoutes;

});
```

## New RouteProvider

Since we have removed Angular, we need a substitute for the Angular **RouteProvider** object. Place the following object in a file called **Route.js**. Modify **layout.jade** so that this file gets loaded.

```javascript
define(function () {

    function Route() {
        this.route = '';
    }

    Route.prototype.setRoute = function (routeInit) {
        this.route = routeInit;
    };

    Route.prototype.when = function (route, control) {
        if (route === this.route) {
            var resolver = {
                getController: function () {
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

    return Route;

});
```

This code is primarily about the **when** method. Recall that we use this method heavily in **control.js**:

```javascript
$routeProvider.when('/databaseName', {
    templateUrl: 'templates/DatabaseNames.html',
    controller: nameController,
    resolve: {
        databaseName: nameController.databaseName,
        allDbs: nameController.allDbs
    }
}).when('/deleteDb', {
    templateUrl: 'templates/QueryView.html',
    controller: queryController,
    resolve: {
        result: queryController.delete
    }
}) AND SO ON
```

Our **when** method takes two parameters:

- A route
- An anonymous control object

For instance, in the first case, the route is '/databaseName' and the control object looks like this:

```javascript
{
    templateUrl: 'templates/DatabaseNames.html',
    controller: nameController,
    resolve: {
        databaseName: nameController.databaseName,
        allDbs: nameController.allDbs
    }
}
```

The first point to grasp is that our code is called when the user clicks on the hyperlinks we created when writing our Jade in **index.jade**. Each hyperlink has a route associated with it. Consider these three hyperlinks:

```jade
li
    a(href='databaseName') Get current Database Name
li
    a(href='createDb') CreateDb
li
    a(href='deleteDb') DeleteDb
```

These route for the first of these items is called 'databaseName'. The route for the third is 'deleteDb'. When the user clicks on a link, then the route is called.

The code in in **control.js** is telling us the following: _When the '/databaseName' route is called, then we want to use the **nameController** to handle it, and we want to call two methods of that object called **databaseName** and **allDbs**._

In the second example I show above, _when the '/deleteDb' route is called then the controller that handles the call is the **queryController** and the method we want to call is **queryController.delete**._

## QueryController

In **control.js** change delete the lines:

```javascript
var myModule = angular.module('myModule', ['ngRoute']);

var queryController = myModule.controller('QueryController',
...
)
```

And let's give the queryController a new shape:

```javascript
var queryController = function (result) {
  ...
})
```

And finally, let's move the whole object into a new file called **query-conroller.js**:

```javascript
define(['runQuery'], function (runQuery) {
    var queryController = function (query, result) {
        'use strict';
        var $scope = $('#debug');
        var docs = $('#docs');
        docs.empty();
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
    };

    queryController.delete = function ($q) {
        'use strict';
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function ($q) {
        'use strict';
        return runQuery('/createDb', $q);
    };

    queryController.insertNpcsBulk = function ($q) {
        'use strict';
        return runQuery('/insertBulk?fileName=Npcs.json', $q);
    };

    queryController.insertNpcsOneDoc = function ($q) {
        'use strict';
        return runQuery('/insertFile?fileName=Npcs.json&id=oneDoc', $q);
    };

    queryController.design = function ($q) {
        'use strict';
        return runQuery('/designDoc', $q);
    };

    queryController.readOne = function ($q) {
        'use strict';
        return runQuery('/read?docName=npcsDoc', $q);
    };

    queryController.viewBulk = function ($q) {
        'use strict';
        return runQuery('/viewNpcsBulk?designDoc=game&view=npcsBulk', $q);
    };

    queryController.viewOneDoc = function ($q) {
        'use strict';
        return runQuery('/viewNpcsOneDoc?designDoc=game&view=npcsOneDoc', $q);
    };

    return queryController;
});
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

For the $scope control, consider using, for now:

```
JSON.stringify('json', null, 4);
```

## Name Controller

```javascript

define(['runQuery'], function (runQuery) {
    var nameController = function (query, data) {
        'use strict';

        var $scope = $('#debug');
        var docs = $('#docs');
        // YOU WRITE THE REST OF THE CODE
        // YOU NEED TO HANDLE WHAT HAPPENS WHEN
        // EITHER THE databaseName METHOD IS CALLED
        // OR WHEN THE allDbs METHOD IS CALLED
        // VERY SIMILAR TO queryController, but simpler.
    };

    nameController.databaseName = function ($q) {
        'use strict';
        return runQuery('/databaseName', $q);
    };

    nameController.allDbs = function ($q) {
        'use strict';
        return runQuery('/listDb', $q);
    };

    return nameController;
});
```

## Run Query

My **runQuery** method now looks like this:

```javascript
define(function (require) {

    function runQuery(query, $q) {
        'use strict';
        var controller = $q.getController();
        $.getJSON(query, function (json) {
            controller(query, json);
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

    return runQuery;
});
```

Above, I've asked you to fill in some of the code for the **queryController** and **nameController** methods. In the above code, those methods are called when this line executes:

```javascript
controller(query, json);
```

## Display

In **index.jade** I now have two tags:

```text
pre#debug

pre#docs
```

I tend to use the latter tag, **docs** when I want to show a list. The debug tag is where we report the status such as success or failure.

## Turn it in

Push your code. Signal that you are ready to be graded by submitting the assignment in Canvas.
