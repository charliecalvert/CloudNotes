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
- HTML: Add a **templateUrl** pointing toward a pug file that generates HTML
- JavaScript: Add a controller

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

## Handle Errors

We should now be able to display good error information, particularlly if we try to connect to the wrong server.

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

![Bulk](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-bulk.png)

**Figure**: _Bulk Document View_

![One Doc](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-one-doc.png)

**Figure**: _One Document View_


## Other Views

![Names](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-names.png)

**Figure**: _Names_

![Project](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-project.png)

**Figure**: _Project_

## Turn it in

Run **grunt check** one last time, push your work. Tell me the branch and project name that you want me to grade. I'm expecting:

- Branch: Week11
- Project: DataMaster

## Extra Credit

Use pug instead of Jade.
