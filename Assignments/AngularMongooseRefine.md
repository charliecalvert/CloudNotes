---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularMongooseRefine.md
relativePath: Assignments/AngularMongooseRefine.md
title: AngularMongooseRefine
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: AngularMongooseRefine.md
fileNameHTML: AngularMongooseRefine.html
---


<!-- toc -->
<!-- tocstop -->

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

Here is a tool for connecting to the database. It belongs in its own file called **routes/connect.js**:

```
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
        var userName = 'MyUserName';
        var password = 'MyPassWord';
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

```
extends layout

block content
  h1= title
  p Welcome to #{title}

  div(ng-controller="MongoController as mongoController")
    div {{mongoController.allData}}

```

and layout.jade

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="components/angular/angular.js")
    script(src="javascripts/control.js")
  body(ng-app="elfApp")
    block content
```

## Step Six

Iterate

Include this in index.jade:

```
    input(type='number',
      ng-change='mongoController.indexChange()',
      ng-model='mongoController.currentItem',
      min='0', max='{{mongoController.scientistsLength-1}}')
```

Add all these methods to **control.js**. Note currentItem and the calls to **getScientist and save, insert and indexchanged**. Also add mongoFactory as dependency injection:

```javascript
app.controller('MongoController', function($http, mongoFactory) {

        var mongoController = this;

        mongoController.currentItem = 0;

        $http.get('/all-data').success(function(data) {
            mongoController.allData = data;
            mongoController.scientistsLength = data.allData.length;
        }).error(function(err) {
            console.log(err);
        });

	    mongoController.getScientist = function(index) {
			mongoFactory.getScientist(index, mongoController);
		};

		mongoController.saveCurrentDocument = function() {
			mongoFactory.postDocument("/save", mongoController);
		};

		mongoController.insertDocument = function() {
			mongoFactory.postDocument("/insert", mongoController);
		};

		mongoController.indexChange = function() {
			if(typeof mongoController.currentItem !== 'undefined') {
				mongoFactory.getScientist(mongoController.currentItem, mongoController);
			}
		};
```

After the above code, you should also add the **elfMarie** directive used in our previous projects. You will need to tweak it a bit. For instance, the name of our controller has changed, and the template should look like this:

```
    template:
            'First: {{mongoController.data.firstName}} ' +
            '<br>Last: {{mongoController.data.lastName}}' +
            '<br>Subject: {{mongoController.data.subject}}'
```    

And here is our factory, saved in **mongo-factory.js**. When adding this file to **layout.jade**, put it after **control.js**.

```
(function() {

	var app = angular.module('elfApp');

	app.factory('mongoFactory', function($http) {

		return {

			currentItem: 0,

			getScientists: function(mongoController) {
				$http.get('/all-data').success(function(data) {
					mongoController.scientistsLength = data.allData.length;
					allDataNames = data.allData.map(function(scientist) {
						return {id: scientist._id, name: scientist.firstName + ' ' + scientist.lastName};
					});
					mongoController.allData = allDataNames;
				}).error(function() {
					console.log("error");
				});
			},

			postDocument: function(route, mongoController) {
				var scientist = {
					id: mongoController.data.id,
					firstName: mongoController.data.firstName,
					lastName: mongoController.data.lastName,
					subject: mongoController.data.subject
				};
				$http.post(route, scientist).success(function(data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
				}).error(function(data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
				});
			},

			getScientist: function(index, mongoController) {
				this.currentItem = index;
				$http.get('/data/' + index).success(function(data) {
					mongoController.data = data;
				}).error(function() {
					console.log("error");
				});
			}
		};
	});

})();
```

Don't forget to load **mongo-factory** in **layout.jade**:

```
script(src="javascripts/mongo-factory.js")
```

## Step Seven

In **routes/index.js** append all of the following before the module statement:

```

router.get('/data/:id', function(request, response) {
	console.log('Request id: ' + request.params.id);
	console.log('type of request:' + typeof request.params.id);
	var idInvalid = (request.params.id === 'undefined');
	console.log('IdInvalid: ' + idInvalid);
	if (!idInvalid) {
		if (!connected) {
			doConnection();
		}
		scientists.find({}, function(err, data) {
			console.log(data.length);
			console.log(data[0]);
			response.send({
				result: 'Success',
				numberOfDocuments: data.length,
				id: data[request.params.id]._id,
				firstName: data[request.params.id].firstName,
				lastName: data[request.params.id].lastName,
				subject: data[request.params.id].subject,
				subjects: data[request.params.id].subjects,
				comments: data[request.params.id].comments
			});
		});
	} else {
		response.send({result: 'Invalid id'});
	}

});

function getNewData(body) {
	console.log(body);
	var newData = {
		firstName: body.firstName,
		lastName: body.lastName,
		subject:  body.subject
	};
	console.log(newData);
	return newData;
}

router.post('/save', function(request, response) {
	console.log('Save called. Body is next: ')

	var newData = getNewData(request.body);

	if (!connected) {
		doConnection();
	}

	console.log("about to call update");
	scientists.update({ _id: request.body.id }, { $set: newData},
		function(err, data) {
			console.log(err, data);
			if (err) {
				console.log(err);
			}
			response.send({result: 'Success', data: data});
		}
	);

});

router.post('/insert', function(request, response) {
	console.log('Save called. Body is next: ')
	//var newData = getNewData(request.body);
	var newData = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		subject:  request.body.subject,
		comments: [],
		subjects: []
	};
	console.log("New Data", newData);

	if (!connected) {
		doConnection();
	}

	console.log("about to call update");
	var f = new scientists(newData);
	f.save(function(e, a) {
		response.send({result: e + a});
	});
});

router.get('/:id', function(request, response) {
	console.log(request.params.id);
	response.render(request.params.id, {});
});
```

[gypbson]:http://elvenware.com/charlie/development/database/NoSql/MongoDb.html#mongoose-gyp-bson
