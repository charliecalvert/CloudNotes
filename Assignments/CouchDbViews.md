---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CouchDbViews.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: CouchDbViews.md
relativePath: /CouchDbViews.md
title: CouchDbViews
directoryName: Assignments
category : assignments-guide
---

## Overview

- [CouchDb Elvenware][couchdbcc]
- [CouchDb](http://couchdb.apache.org/)

## Get Started

Create a folder in your repository called **Week03-CouchDbViews**. Use your common sense about the number of the current week if the number you see does not make sense.

In that folder, create a **package.json** that looks like this:

```javascript
{
  "name": "CouchDbViews",
  "description": "Learn about CouchDb Views",
  "version": "0.0.2",
  "private": true,
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "inquirer": "^1.2.1",
    "nano": "^6.1.2",
    "request-debug": "^0.2.0"
  }
}

```

Run **npm install**.

Then create a file called **server.js** and put the code shown in the rest of this document into it. I believe I am presenting the code sequentially, so you can just start at the top and paste in each section one at a time.

## Packages and Globals

Load packages and declare some constants or variables used in the rest of the program.

```javascript
var nano = require('nano')('http://192.168.2.23:5984');
var inquirer = require("inquirer");

var dbName = 'bc_data';
var RASPBERRY_PI = "raspberry pi";
var ARDUINO = "arduino";
var BEAGLEBONE = "beaglebone";
```

Right now these are becoming global variables, but in a later session we will reduce their scope.

As you can see, our database involves some of the small, cheap motherboards that you can buy for less than $100.

## Almost CRUD: Create, Read, Delete {#crud-like}

Here are functions for creating the database, and then creating, inserting and deleting documents. We don't yet have the ability to update an existing record, but we can delete a document and replace it with a new one, which can be similar in effect. For now, we will only be deleting the design document, which is described below.


```javascript
var readIt = function(docName) {
    'use strict';
    var db = nano.db.use(dbName);
    db.get(docName, {
        revs_info: true
    }, function(err, body) {
        if (err) {
            throw err;
        }
        console.log(body);
    });
};

function insert(data) {
    'use strict';
    var callback = function(err, body) {
        if (err) {
            throw err;
        }
        console.log(body);
        readIt();
    };
    nano.db.create(dbName);
    var prog = nano.db.use(dbName);

    for (var i = 0; i < data.length; i++) {
        prog.insert(data[i], callback);
    }
}

function deleteDoc(docUniqueId) {
    'use strict';
    var db = nano.db.use(dbName);
    db.get(docUniqueId, function(err, body) {
        if (err) {
            throw err;
        }
        var latestRev = body._rev;
        db.destroy(docUniqueId, latestRev, function(err, body, header) {
            if (err) {
                throw err;
            }
            console.log('Successfully deleted doc', docUniqueId);
        });
    });
}

function coreDataInsert() {
    var data = [{
            "_id": RASPBERRY_PI,
            "item": RASPBERRY_PI,
            "urls": {
                "Amazon": "https://www.amazon.com/Raspberry-Pi-RASP-PI-3-Model-Motherboard/dp/B01CD5VC92/",                
                "Home": "https://www.raspberrypi.org/",
                "Wiki:": "https://en.wikipedia.org/wiki/Raspberry_Pi"
            }
        },

        {
            "_id": ARDUINO,
            "item": ARDUINO,
            "urls": {
                "Amazon": "https://www.amazon.com/Arduino-Uno-R3-Microcontroller-A000066/dp/B008GRTSV6/",
                "Home": "https://www.arduino.cc/",
                "Wiki:": "https://en.wikipedia.org/wiki/Arduino"
            }
        }, {
            "_id": BEAGLEBONE,
            "item": BEAGLEBONE,
            "urls": {
                "Amazon": "https://www.amazon.com/Beagleboard-BBONE-BLACK-4G-BeagleBone-Rev-C/dp/B00K7EEX2U/",
                "Home": "http://beagleboard.org/bone",                
                "Wiki:": "https://en.wikipedia.org/wiki/BeagleBoard#BeagleBone"
            }
        }
    ];
    insert(data);
}
```

## Creating Views

First we define two views:

- simpleView: Show the Doc ID and REV
- designUrls: Show the urls of various items

Each of these views become a map. That is, they are called once for each document in the database. They then transform the document into a new format, and use **emit** to display to the result.

**maps** are a key concept in modern programming. They are often presented as part of a two step process:

- map: Transforms the objects in an array of in a list of some sort. In our case, it means transforming the documents in the database.
  - Note that you can filter out some documents at the same time
- reduce: Iterate over the maps, and return a single value or summation of that data

CouchDb makes use of Map/Reduce, but for now we are focused only on map.

Testing views can be tricky. One technique that can help is to:

- Open up futon
- Selected your database
- Set the view (in the top right) to **Temporary view**
- Paste in the anonymous function from your view.

Here is the simpleView:

```javascript
 var simpleView = function(doc) {
     emit(doc._id, doc._rev)
 };
```

Here is the anonymous function from your view:

```javascript
function(doc) {
  emit(doc._id, doc._rev)
}
```

Once you have one or more working views, place them inside a design document. The method called **createDesignDocument** demonstrates how to create a design document.

Here is the whole section of the code that involves creating views and design document. Paste it into your program.

```javascript

/*******************************
 * Views
 *******************************/

 var simpleView = function(doc) {
     emit(doc._id, doc._rev)
 };

 var designUrls = function(doc) {
     var url, key;
     if (doc.item && doc.urls) {
         for (var urlName in doc.urls) {
             url = doc.urls[urlName];
             key = [doc.item, url];
             emit(key, url);
         }
     }
 }

 function createDesignDocument() {
     var data = [{
         "_id": "_design/example",
         "views": {
             "simple": {
                 "map": simpleView
             },
             "urls": {
                 "map": designUrls
             }
         },
     }];
     insert(data);
 }

function showView(designDoc, view) {
    var nanoDb = nano.db.use(dbName);
    nanoDb.view(designDoc, view, function(err, body) {
        if (!err) {                        
            for (var i = 0; i < body.rows.length; i++) {
                console.log(body.rows[i].key);
            }
        } else {
            console.log("Error", err);            
        }
    });
}
```

## Create Bash Menu

Now that we have our CRUD-like operations, and the ability to create views, we just need a way to call these various methods. For now we will just set up a simple bash menu using the **inquirer** package.

To make this work, you may need to install the NPM package (library) called **inquirer**:

  npm install inquirer --save

**note**: _We already placed the code to install **inquirer** in our **package.json**. Nevertheless, I'm leaving in this reminder of how to install it and add it to your **package.json** file as it may be a helpful reminder for some readers._

**note**: _Inquirer and nodemon don't get along. Please use node instead of nodemon to start your program: **node server.js**. You may need to edit **package.json** to ensure you don't have **nodemon** in the start option._

Here is the menu itself:

```javascript

/***************************
 * Prompts
 ***************************/

function list() {
    "use strict";

    // Prompts
    var DESIGN = 0;
    var INSERT = 1;
    var DELETE = 2;
    var READ = 3;
    var VIEW = 4;
    var prompts = ['Design', 'Insert', "Delete", "Read", "View"];

    var options = [{
        type: "list",
        name: "theme",
        message: "What do you want to do?",
        choices: [
            prompts[DESIGN],
            prompts[INSERT],
            new inquirer.Separator(),
            prompts[VIEW],
            prompts[READ],
            prompts[DELETE]
        ]
    }];

    inquirer.prompt(options).then(function(answer) {
        console.log("Response:", answer);
        switch (answer.theme) {
            case prompts[READ]:
                console.log(prompts[READ]);
                readIt(RASPBERRY_PI);
                break;

            case prompts[DESIGN]:
                console.log(prompts[DESIGN]);
                createDesignDocument();
                break;

            case prompts[DELETE]:
                console.log(prompts[DELETE]);
                deleteDoc("_design/example");
                break;

            case prompts[INSERT]:
                console.log(prompts[INSERT]);
                coreDataInsert();
                break;

            case prompts[VIEW]:
                console.log(prompts[VIEW]);
                //showView("example", "prices");
                showView("example", "simple");
                break;

            default:
                console.log("No match");

        }
    });

}

list();
```

To better understand inquirer, see the docs and examples for this project in GitHub.

- [https://github.com/SBoudrias/Inquirer.js/](https://github.com/SBoudrias/Inquirer.js/)
- [https://github.com/SBoudrias/Inquirer.js/tree/master/examples](https://github.com/SBoudrias/Inquirer.js/tree/master/examples)

## Turn it in

Save your work and push it to the cloud. Attach a screenshot of the result from calling views function.


[couchdb]:http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html
[couchdbcc]:http://www.ccalvert.net/database/CouchDb.html
