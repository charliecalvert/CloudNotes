## Description

Mongoose Basics is an ORM for MongoDB.

- Mongoose Slides: [http://bit.ly/elf-mongoose](http://bit.ly/elf-mongoose)
- [Prog219 Resources](http://www.ccalvert.net/books/CloudNotes/Prog219/Prog219-Resources.html)

## Step One

	CreateAllExpress Week10-MongooseBasics
	cd Week10-MongooseBasics
	npm install

Open the project in Web Storm.

## Step Two

Set up bower

- bower install bootstrap --save

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
    comments: [{ commentText: String, date: Date }]
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

Here is index.jade:

```
extends layout

block content
  h1= title
  p Welcome to #{title}

	button#insertValidData Insert Valid Data
	button#getAll Get All
	button#emptyCollection Empty Collection

  pre#display

```

and layout.jade

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
    script(src="javascripts/control.js")
  body
    block content
```

## Step Six

Here is **public/javascripts/control.js**:

```javascript
$(document).ready(function() { 'use strict';
    var insertUrl = '/insertValidCollection';

    function insertCollection() {
        var jqxhr = $.post(insertUrl, function(result) {
            alert( "success" );
            console.log(JSON.stringify(result, null, 4));
        })
            .done(function() {
                console.log( "second success" );
            })
            .fail(function() {
                alert( "error" );
            })
            .always(function() {
                console.log( "finished" );
            });
    }

    $('#insertValidData').click(insertCollection);

    $("#getAll").click(function() {
       $.getJSON('/all-data', function(result) {
           $('#display').html(JSON.stringify(result, null, 4));
       })
    });
});
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
	if (!connect.connected) {
			connect.doConnection();
	}
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
var totalScientistsSaved = 0;

function allMongo() {

}

allMongo.numberOfScientists = 0;

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
        totalScientistsSaved++;
        console.log('saved: ', newScientist.lastName, allMongo.numberOfScientists, totalScientistsSaved);

        if (totalScientistsSaved === allMongo.numberOfScientists) {
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
        scientists = JSON.parse(scientists);
        allMongo.numberOfScientists = scientists.length;
        for (var i = 0; i < scientists.length; i++) {
            insertScientist(scientists[i], response);
        }
    });
}

module.exports = allMongo;
```

## Valid Scientists

Save in the root of your project as ValidScientists.json

```javascript
[
    {
        "_id": "5577c95032fa23f82013611e",
        "firstName": "Albert",
        "lastName": "Einstein",
        "subject": "Physics",
        "__v": 0,
        "comments": [
            {
                "commentText": "Albert One",
                "_id": "5575a4be8ee728bc0da40c49",
                "date": "2015-06-08T00:00:00.000Z"
            }
        ],
        "subjects": [
            "Foobar",
            "Able",
            "Tuna"
        ]
    },
    {
        "_id": "5577c95032fa23f82013611f",
        "firstName": "Rene",
        "lastName": "Descartes",
        "subject": "Radioactivity",
        "__v": 0,
        "comments": [
            {
                "commentText": "Fred",
                "_id": "5574be8c7c93a1180729f3b5",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Suzy",
                "_id": "5574bf42d525507c0ca48e21",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Lunches",
                "_id": "5574bfaed525507c0ca48e22",
                "date": "2015-06-07T00:00:00.000Z"
            }
        ],
        "subjects": [
            "Rene"
        ]
    },
    {
        "_id": "5577c95032fa23f820136121",
        "firstName": "Niels",
        "lastName": "Bohr",
        "subject": "Physics",
        "__v": 0,
        "comments": [
            {
                "commentText": "Niels One",
                "_id": "5575a4af8ee728bc0da40c48",
                "date": "2015-06-08T00:00:00.000Z"
            }
        ],
        "subjects": [
            "Math"
        ]
    },
    {
        "_id": "5577c95032fa23f820136124",
        "firstName": "Thomas",
        "lastName": "Edison",
        "subject": "Radioactivity",
        "__v": 0,
        "comments": [
            {
                "commentText": "Sam",
                "_id": "5574b6dee5c7ed30124b0dca",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Fred",
                "_id": "5574b6f3e5c7ed30124b0dcb",
                "date": "2015-06-07T00:00:00.000Z"
            }
        ],
        "subjects": [
            "asf"
        ]
    },
    {
        "_id": "5577c95032fa23f820136126",
        "firstName": "Johanes",
        "lastName": "Kepler",
        "subject": "Astronomy",
        "__v": 2,
        "comments": [
            {
                "commentText": "Hello Johannes",
                "_id": "55746faa82492e4815d893c4",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Foobar",
                "_id": "557490926f35aa301a50422a",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "_id": "55749e924c3a43000acf589d",
                "commentText": "Fable",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Qux",
                "_id": "55749ebd4c3a43000acf589f",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "_id": "55749f804c3a43000acf58a0",
                "commentText": "Fingers",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Sam",
                "_id": "5574b5597d70f4e813d01ec4",
                "date": "2015-06-07T00:00:00.000Z"
            }
        ],
        "subjects": [
            "Johan",
            "Able"
        ]
    },
    {
        "_id": "5577c95032fa23f820136125",
        "firstName": "Isaac",
        "lastName": "Newton",
        "subject": "Astronomy",
        "__v": 0,
        "comments": [
            {
                "commentText": "Fig",
                "_id": "5574bdf631bd81a416bd855f",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Qux",
                "_id": "5574be373956c08c12f1731c",
                "date": "2015-06-07T00:00:00.000Z"
            }
        ],
        "subjects": [
            "Bar"
        ]
    },
    {
        "_id": "5577c95032fa23f820136122",
        "firstName": "Marie",
        "lastName": "Curie",
        "subject": "Radioactivity",
        "__v": 0,
        "comments": [
            {
                "commentText": "MarieOne",
                "_id": "5574e4ff748448b40c26a324",
                "date": "2015-06-08T00:00:00.000Z"
            }
        ],
        "subjects": [
            "Foo",
            "Bar",
            "Qux",
            "Goober"
        ]
    },
    {
        "_id": "5577c95032fa23f820136123",
        "firstName": "Maxi",
        "lastName": "Planck",
        "subject": "Radioactivity",
        "__v": 0,
        "comments": [
            {
                "commentText": "Foo",
                "_id": "5574bd333a9db45405200d7b",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Bar",
                "_id": "5574bd3a3a9db45405200d7c",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Tom",
                "_id": "5574bd4f3a9db45405200d7d",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Sue",
                "_id": "5574bd861cc805b81ab0427c",
                "date": "2015-06-07T00:00:00.000Z"
            }
        ],
        "subjects": [
            "asdf",
            "Bar"
        ]
    },
    {
        "_id": "5577c95032fa23f82013611d",
        "firstName": "Carl",
        "lastName": "Sagan",
        "subject": "Radioactivity",
        "__v": 1,
        "comments": [
            {
                "_id": "5574a552583c8a0005366cd9",
                "commentText": "Carlbar",
                "date": "2015-06-07T00:00:00.000Z"
            },
            {
                "commentText": "Foo",
                "_id": "5577cd7698d1b48420a76be0",
                "date": "2015-06-10T00:00:00.000Z"
            }
        ],
        "subjects": [
            "Astronomy"
        ]
    },
    {
        "_id": "5577c95032fa23f820136120",
        "firstName": "Nikola",
        "lastName": "Tesla",
        "subject": "Radioactivity",
        "__v": 0,
        "comments": [
            {
                "commentText": "One",
                "_id": "5574e4eb748448b40c26a323",
                "date": "2015-06-08T00:00:00.000Z"
            }
        ],
        "subjects": [
            "Serbia",
            "Electricity",
            "Physics",
            "Blink"
        ]
    },
    {
        "_id": "55786da8c446f6fc4a5d423a",
        "firstName": "Gregor",
        "lastName": "Mendel",
        "subject": "Physics",
        "__v": 0,
        "comments": [],
        "subjects": [
            "Genetics",
            "Plants"
        ]
    }
]
```

## Turn it in

Push you code to your repository, and when you turn it in tell me the branch and folder where it resides.

[gypbson]:http://elvenware.com/charlie/development/database/NoSql/MongoDb.html#mongoose-gyp-bson
