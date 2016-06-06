## Description

Mongoose Basics is an ORM for MongoDB.

- Mongoose Slides: [http://bit.ly/elf-mongoose](http://bit.ly/elf-mongoose)
- [Prog219 Resources](http://www.ccalvert.net/books/CloudNotes/Prog219/Prog219-Resources.html)

## Step One

	CreateAllExpress Week09-AngularMongooseBasics
	npm install

Open the project in Web Storm.

## Step Two

Set up bower

- bower install bootstrap angular angular-route --save

Now might be a good time to start the project: **npm start**

## Step Three

Let's practice setting up the favicon. Because you used **CreateAllExpress**, you should already have a **favicon.png** file in **public.** But in case you have some reason to do it manually, here is how to get a default favicon on Linux (first example) or on Windows:

	cp $JSOBJECTS/Data/MongoBootstrap/favicon.png public/.
	copy %USERPROFILE%\Git\JsObjects\Data\MongoBootstrap\favicon.png public\.

The next step is not done for you automatically by **CreateAllExpress**, so do this by hand:

- In an editor, open up **app.js** from the root of your project. (Server side)
- On line 18 uncomment: **app.use(favicon(__dirname + '/public/favicon.ico'));**
- Change **favicon.ico** to **favicon.png**.

## Step Four

Set up and learn a little about [Mongoose](http://mongoosejs.com/). Mongoose is by far the most popular way to access MongoDb from Node Js applications.

First install **mongoose**:

	npm install mongoose --save

You may see messages about mongoose, C++ and bson. If you are concerned about them, see the Elvenware notes on [this subject][gypbson].

**NOTE**: *On Linux, you may need to install libkrb5-dev before you can install the Mongoose NPM package. This should not be an issue on Cloud 9.*

```
sudo apt-get install libkrb5-dev
```

### The Mongoose Schema

Once Mongoose is installed, you should set up a schema:

- Create a folder called models at the root of your project
- Put this code in a file called **models/presidents.js**:

```
var mongoose = require('mongoose');

var presidentsSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
});

module.exports = mongoose.model('presidents', presidentsSchema);
```

While we are at it, let's create a more complex schema which we can use once we learn the basics. Put the follow code in a file called **models/scientists.js**.

```
var mongoose = require('mongoose');

var scientistsSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "subject": String,
    "subjects": [String],
    comments: [{ body: String, date: Date }]
});

module.exports = mongoose.model('scientists', scientistsSchema);
```

In **routes/index.js** do these two things:

	var scientists = require('../models/scientists');
	var presidents = require('../models/presidents');
	var mongoose = require('mongoose');

And then create methods to open your collection:

In **index.js**, make sure that this is the last line in the file:

	module.exports = router;

## Step 5

Get the code in angular

This is **controll.js** at this early stage:

```
(function() {

    var app = angular.module('elfApp', []);

    app.controller('MongoController', function($http) {
        var mongoController = this;

        $http.get('/all-data').success(function(data) {
            mongoController.allData = data;
        }).error(function(err) {
            console.log(err);
        });
    });

})();
```

Here is index.jade:

<pre>
extends layout

block content
  h1= title
  p Welcome to #{title}


  div(ng-controller="MongoController")
    button(ng-click="insertValidData()") Insert Valid Data
    button(ng-click="getAll()") Get All
    button(ng-click="emptyCollection()") EmptyCollection

    div
      pre {{allData}}

    p {{display}}
</pre>

and layout.jade

<pre>
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
    script(src="components/angular/angular.js")
    script(src="javascripts/control.js")
  body(data-ng-app="elfApp")
    block content
</pre>

## Step Six

Here is **public/javascripts/control.js**:

```javascript
(function() {

    var app = angular.module('elfApp', []);

    app.controller('MongoController', function($scope, $http) {


        $scope.insertValidData = function() {
            $http.get('/insertValidCollection').then(function(data) {
                $scope.display = data;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.emptyCollection = function() {
            $http.get('/emptyCollection', {name: 'lincoln'}).then(function(data) {
                $scope.display = data;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.getAll = function() {
            $http.get('/all-data').then(function(data) {
                $scope.allData = JSON.stringify(data, null, 4);
            }, function(err) {
                console.log(err);
            });
        };
    });

})();

```

## Step Seven

In **routes/connect.js**:

```javascript
/**
 * Created by charlie on 6/11/2015.
 */

var mongoose = require('mongoose');

var connect = {

    connected: false,

    simpleConnect: function() {
        var url= 'mongodb://127.0.0.1:27017/test';
        connect.connected = true;
        mongoose.connect(url);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connected = true;
            console.log('Opened connection to mongo');
        });
    },

    mlabConnect:function() {
        connect.connected = true;
        var userName = 'csc';
        var password = 'Re*lD*t*22#';
        var siteAndPort = 'ds049848.mongolab.com:49848';
        var databaseName = 'elvenlab01';
        var url = 'mongodb://' + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;
        console.log(url);
        mongoose.connect(url);

        // This part is optional
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connected = true;
            console.log('Opened connection to mongo');
        });
    },

    doConnection: function(useSimple) {
        var connectType = useSimple || true;
        if (connectType) {
            connect.simpleConnect();
        } else {
            connect.mlabConnect();
        }
    }

};

module.exports = connect;
```

In **routes/index.js** append all of the following before the module statement:

```javascript
var express = require('express');
var router = express.Router();
var scientists = require('../models/scientists');
var allMongo = require('./all-mongo');
var connect = require('./connect');
//var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'Week09-MongooseBasics' });
});

var connected = false;

router.get('/all-data', function(request, response) {
  console.log("AllData route invoked.");
  if (!connect.connected) {
    connect.doConnection();
  }

  console.log("About to find scientists.");
  scientists.find({}, function(err, data) {
    console.log(data.length);
    console.log(data[0]);
    allData = data;

    allMongo.writeData('scientists.json', allData);

    response.send({
      result: 'Success',
      allData: data
    });
  });
});

router.get('/emptyCollection', function(request, response) {
  scientists.remove({}, function(err) {
    if (err) {
      response.send({result: 'err', err: err});
    } else {
      response.send({result: 'collection removed'});
    }
  });
});

router.get('/insertValidCollection', function(request, response) {
  allMongo.readDataAndInsert(response);
});

router.get('/:id', function(request, response) {
  response.render(request.params.id, {});
});


module.exports = router;
```

In **routes/all-mongo.js**:

```javascript
/**
 * Created by charlie on 6/5/16.
 */


var express = require('express');
//var router = express.Router();
var connect = require('./connect');
var scientists = require('../models/scientists');
var fs = require('fs');

var allData;
var numberOfScientists = 0;
var totalScientistsSaved = 0;

function allMongo() {

}
function insertScientist(scientist, response) {
    if (!connect.connected) {
        connect.doConnection();
    }
    var newScientist = new scientists({
        "firstName": scientist.firstName,
        "lastName": scientist.lastName,
        "subject": scientist.subject,
        "subjects": scientist.subjects,
        "comments": scientist.comments
    });

    console.log('inserting', newScientist.lastName);

    newScientist.save(function(err) {
        console.log('saved: ', newScientist.lastName);
        totalScientistsSaved++;
        if (totalScientistsSaved === numberOfScientists) {
            //mongoose.disconnect();
            response.send({result: 'Success'});
        }
    });
}

allMongo.writeData = function(fileName, data) {
    var data = JSON.stringify(data, null, 4);
    fs.writeFile(fileName, data, function(err, data) {
        if (err) throw(err);
        console.log('success writing file');
    });
}

allMongo.readDataAndInsert = function(response) {
    fs.readFile('ValidScientists.json', function(err, scientists) {
        if (err) throw (err);
        numberOfScientists = scientists.length;
        scientists = JSON.parse(scientists);
        for (var i = 0; i < scientists.length; i++) {
            insertScientist(scientists[i], response);
        }
    });
}

module.exports = allMongo;
```

[gypbson]:http://elvenware.com/charlie/development/database/NoSql/MongoDb.html#mongoose-gyp-bson
