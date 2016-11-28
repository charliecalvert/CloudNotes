
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

![DataMaster Error Display](https://s3.amazonaws.com/bucket01.elvenware.com/images/datamaster-error.gif)

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
