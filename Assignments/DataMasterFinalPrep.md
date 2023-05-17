---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/DataMasterFinalPrep.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: DataMasterFinalPrep.md
relativePath: /DataMasterFinalPrep.md
title: DataMasterFinalPrep
directoryName: Assignments
category : assignments-guide
---

## Overview

The DataMaster Final Prep helps you get ready for the final. Major goals include:

- Be sure you can build a SPA: Single Page App
- Display data in grids
- Switch between one grid view and another
- Add a menu and remove many of the links
- Display proper error messages
- Add Login
- Understand routes and the MVC-like architecture that provides us with:
  - Loose Coupling
  - Modules
  - Single Responsibility Principle
  - [The Open Closed Principle][ocp] and the [wiki][ocp-wiki]
  - etc

Do your work in a branch called **Week11**.

[ocp-wiki]:https://en.wikipedia.org/wiki/Open/closed_principle
[ocp]:http://www.oodesign.com/open-close-principle.html

## Updated Routes

I'll put the files in JsObjects:

```bash
mkdir public/javascripts/route-provider/
cp -v $ELF_TEMPLATES/Routes/* public/javascripts/route-provider/.
```

This copies over updated, but backward compatible, copies of **routes.js** and **run-query.js**.

It is crucial that you understand how these files work. The pith explanation of how to use them:

- Add an anchor and HREF either to the menu or to some Jade file.
- In control, add a **.when** call that captures the URL in your HREF.
  - Add a templateURL if there is a HTML to be displayed
  - Specify which **controller** contains the JavaScript that works with the HTML
  - Implement the controller.

Here is a sample **.when** block

```javascript
.when('/deleteDb', {
    templateUrl: '/display-default',
    controller: queryController,
    resolve: {
        result: queryController.delete
    }
}).when('/createDb', { ... })
```

Here is a sample **controller**:

```javascript
define(['runQuery', 'utility', 'jsonToHtml'], function(runQuery, utility, jsonToHtml) {
    'use strict';

    var nameController = function(query, data) {
        utility.clearAll();
        if (query.requestFailed) {
            utility.failed(query.requestFailed);
            return;
        }

        var debug = $('#debug');
        var docs = $('#docs');
        var displayData = JSON.stringify(data, null, 5);
        if (query === '/databaseName') {
            debug.html(displayData);
        } else {
            docs.html('allDatabases: ' + displayData);
            var jsonHtmlTable = jsonToHtml(JSON.parse(displayData), 'jsonTable', 'table table-bordered table-striped', 'Download');
            $('#myTable').html(jsonHtmlTable);

        }
    };

    nameController.databaseName = function($q) {
        return runQuery('/databaseName', $q);
    };

    nameController.allDbs = function($q) {
        return runQuery('/listDb', $q);
    };

    return nameController;
});
```

That's the rhythm:

- Add menu item
- Add a three part object to **control.js** in the long series of **.when** statements.
  - HTML: Add a **templateUrl** pointing toward a pug file that generates HTML
  - Controller: Specify control
  - And specify any initialization methods in the resolve part.
- The read code you need to write:
  - The Jade that defines your templateUrl
  - The JavaScript for your controller

## The menu

The menu item requires that you copy in **$ELF_TEMPLATES/JadeMixins/mixin-nav.pug/jade**.

## The templateUrl

The HTML you create in your pug file will be loaded into index.jade in the section called:

```jade
#elfContent
```

In other words, you have to be sure that your **index.jade/pug** file contains a DIV with the ID **#elfContent**. If it is there, the routing code will insert your HTML into that DIV. See these lines in **route.js** to understand exactly what is happening:

```javascript
$('#elfContent').load(control.templateUrl, function(result) {
  that.resolveRequest(control)
});
```

## SetServer

We need to isolate the code for setting up our IP address in its own file. This is a simple refactor.

First create **routes/set-server.js**. The code in it looks like this:

```javascript
var servers = ['http://127.0.0.1:5984', 'http://192.168.2.19:5984',
    'http://192.168.2.27:5984',
    'http://168.156.41.96:5984'
];
var serverIndex = 2;
var serverUrl = servers[serverIndex];
console.log('Middleware attaching to database on: ', serverUrl);

module.exports.serverUrl = serverUrl;
```

Use it like this in **Couch.js**:

```javascript
var setServer = require('./set-server');
var nano = require('nano')(setServer.serverUrl);
// CODE OMITTED ....
var couchBulk = require('./CouchBulk')(router, dbName, setServer.serverUrl);
```

**Figure**: _Your error display need not look exactly like this, but we want it should display enough information to help a pre-release user understand what has gone wrong._

You will also need to make a change of a similar kind in **middleware.js**.

## Handle Errors

We should now be able to display good error information, particularlly if we try to connect to the wrong server.

A key point to grasp is that **run-query.js**, which will be called automatically, always sends errors to the controller in the query, the first parameter, as **requestFailed**.

So you can write code that looks like this:

```javascript
if (query.requestFailed) {
    utility.failed(query.requestFailed);
    return;
}
```

Where the **utility.failed** method is part of an object that looks like this:

```javascript
define(function() {
    'use strict';

    var utils = {

        clearAll: function() {

            function clear(selector) {
                $(selector).empty();
            }

            clear('#docs');
            clear('#debug');
            clear('#myTable');
        },

        failed: function(requestFailed) {
            var debug = $('#debug');
            debug.html(JSON.stringify(requestFailed, null, 4));
            var docs = $('#docs');
            docs.html(requestFailed.description);
        }
    };

    return utils;
});
```

Save this file as **public/javascripts/utility.js**. Don't forget to load it in **main.js.**

![data-master-error](https://s3.amazonaws.com/bucket01.elvenware.com/images/datamaster-error.gif)


## JsonToTable

This is my fork of this project:


```bash
bower install elf-json-to-html-table --save
```

In main:

```javascript
'jsonToHtml': '/components/elf-json-to-table/json-to-table',
```

Some background:

- <http://www.ccalvert.net/books/CloudNotes/Assignments/ElfLogBower.html>

## Display Table

Here is how to call jsonToHtml:

```javascript`
var jsonHtmlTable = jsonToHtml(editedGameDocs, 'jsonTable', 'table table-bordered table-striped', 'Download');

$('#myTable').html(jsonHtmlTable);
```

![Bulk](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-bulk.png)

**Figure**: _Bulk Document View_

![One Doc](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-one-doc.png)

**Figure**: _One Document View_


## Other Views

![Names](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-names.png)

**Figure**: _Names_

![Project](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-project.png)

**Figure**: _Project_

## Default Route for Jade/Pug Files {#default-route}

Near the bottom of **routes/index.js**, create a default route to handle requests for Jade files:

```javascript
router.get('/:id', function(request, response) {
    'use strict';
    console.log('Requested: ', request.params.id);
    response.render(request.params.id, {
        title: request.params.id
    });
});
```

This should be last route in the file. It says, in effect: _if none of the other routes in this file have matched the request, then assume this is a request to render a jade/pug file. For instance, if the user asks for /foo, then the code will attempt to render as HTML the file in the views directory called **foo.jade**._

Additional details are in the [NodeJs chapter on Elvenware][node-params]:

[node-params]: http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node-parameters

## Login

Google, and I believe also Twitter, won't accept an IP address for your auth callback Url. You should instead use your EC2 **Public DNS**.

On the EC2 console, on the **Instances** page, you will see that a Public DNS is automatically assigned to your app. It will be something like:

  ec2-XX-XXX-XXX-XX.us-west-2.compute.amazonaws.com

This should resolve to your elastic IP and should work fine for both Google and Twitter callback addresses in their respective consoles. I have tested it only for Google, but it did work fine for me there. You will have to edit your **routes/google-auth.js** file to make this work.

## Turn it in

Run **grunt check** one last time, push your work. Tell me the branch and project name that you want me to grade. I'm expecting:

- Branch: Week11
- Project: DataMaster

## When methods {#when-methods}

We need to be sure that not all anchors end up sending code to the series of **.when** methods in **control.js**. Here is the code that does the sorting out. Please note that I'm ensuring that all the anchors that I want routed to **control.js** have:

- a DIV or some other HTML element with the class **.databaseOptions**
  - In particular, I add that class to the **navigationBar** in the menu to meet this requirement.
- a UL
- an LI
- and an anchor.

They have to appear in that order.

```javascript
var handleClicks = function(event) {
    event.preventDefault();
    route.setRoute(event.target.pathname);
    control(route);
};
$('#navigationbar').addClass('databaseOptions');
$('#main-content').load('/menu-links', function() {
    $('.databaseOptions ul li a').click(function(event) {
        handleClicks(event);
    });
});
```

## Extra Credit

Use pug instead of Jade.
