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
  - Etc

## Updated Routes

I'll put the files in JsObjects:

```bash
mkdir public/javascripts/route-provider/
cp -v $ELF_TEMPLATES/Routes/* public/javascripts/route-provider/.
```

This copies over updated, but backward compatible, copies of **routes.js** and **run-query.js**.

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
