---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Mongo/ReactMongooseBasics.md
relativePath: Assignments/Mongo/ReactMongooseBasics.md
title: ReactMongooseBasics
queryPath: Assignments/Mongo/
subject: Mongo
fileNameMarkdown: ReactMongooseBasics.md
fileNameHTML: ReactMongooseBasics.html
---


<!-- toc -->
<!-- tocstop -->

## Description

Mongoose Basics is an ORM for MongoDB.

- MongoDb Slides: [http://bit.ly/elf-mongo](http://bit.ly/elf-mongo)
- Mongoose Slides: [http://bit.ly/elf-mongoose](http://bit.ly/elf-mongoose)

**NOTE**: _There is an **Angular**, **React** and **jquery** version of this assignment. Make sure you are looking at the right one. This is the **React** assignment, the others are called [AngularMongooseBasics][angular-mongoose] and
[MongooseBasics][jq-mongoose]._

Before proceeding, be sure you have an account on  [https://mlab.com/](https://mlab.com/).

Put your **address-list.json** in the public directory.

[angular-mongoose]: http://www.ccalvert.net/books/CloudNotes/Assignments/AngularMongooseBasics.html
[jq-mongoose]: http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseBasics.html


## Step Three

Download empty lubuntu:

- [http://bit.ly/empty-lubuntu-17](http://bit.ly/empty-lubuntu-17)

## Step Four

Set up and learn a little about [Mongoose](http://mongoosejs.com/). Mongoose is probably the most popular way to access MongoDb from Node Js applications. Other popular options include **Monk** and the native drivers, which are called **MongoDb**. Mongoose relies on **MongoDb**.

First install **mongoose**:

	npm install mongoose --save

In the past, you might have seen messages about mongoose, C++ and bson. They should no longer occur, but if you are encountering them, see the Elvenware notes on [this subject][gypbson].

**NOTE**: *On Linux, you may need to install libkrb5-dev before you can install the Mongoose NPM package. This should not be an issue on Cloud 9.*

```
sudo apt-get install libkrb5-dev
```

### The Mongoose Schema

Once Mongoose is installed, you should set up a schema:

- Create a folder called models at the root of your project
- Put this code in a file called **models/politicians.js**:

```javascript
var mongoose = require('mongoose');

var politicianSchema = mongoose.Schema({
    'firstName': String,
    'lastName': String,
});

module.exports = mongoose.model('politician', politicianSchema);
```

Go ahead and fill in the rest of the fields according to the structure for your data. The fields will probably all be of type **String**.

In **routes/index.js** add these two things to the existing code:

```javascript
var allMongo = require('./all-mongo');
var connect = require('./connect');

router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {title: 'CongressServer'});
});

router.get('/bar', function(request, response) {
    response.status(200).send({result: 'bar'});
});

router.get('/:id', function(request, response) {
    'use strict';
    response.status(200).send({ result: request.params.id });
});
```

Later we will add methods methods to open your collection.

In **index.js**, make sure that this is the last line in the file:

	module.exports = router;

## Connecting

Here is a tool for connecting to the database. It belongs in its own file called **routes/connect.js**:

```javascript
/**
 * Created by charlie on 6/6/16.
 */

const mongoose = require('mongoose');

const connect = {

    connected: false,

    simpleConnect: function() {
        'use strict';
        console.log('Connecting with simple.');
        const url = 'mongodb://127.0.0.1:27017/test';
        console.log(url);
        connect.connected = true;
        mongoose.connect(url);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    custom: function() {
        'use strict';
        console.log('Connecting with simple.');
        //const url = 'mongodb://127.0.0.1:27017/test';
        const userName = 'charlie';
        const password = 'foobar';
        const siteAndPort = '192.168.2.18:27017';
        const databaseName = 'test';
        const url = 'mongodb://' + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;
        console.log(url);
        connect.connected = true;
        mongoose.connect(url);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    // mongodb://<dbuser>:<dbpassword>@ds049848.mlab.com:49848/elvenlab01
    mlabConnect: function() {
        'use strict';
        console.log('Connecting with mlab.');
        connect.connected = true;
        var userName = 'pol';
        var password = 'polFooBarQux';
        var siteAndPort = 'ds049848.mlab.com:49848';
        var databaseName = 'elvenlab01';
        var url = 'mongodb://' + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;

        mongoose.connect(url);

        // This part is optional
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    doConnection: function(option) {
        'use strict';
        if (typeof option === 'undefined') {
            option = 'simple';
        }

        switch (option) {
            case 'simple':
                connect.simpleConnect();
                break;
            case 'custom':
                connect.custom();
                break;
            case 'mlab':
                connect.mlabConnect();
                break;
            default:
                connect.simpleConnect();
        }
    }
};

module.exports = connect;
```

## Step 5

Here is index.pug:

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

and layout.pug

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
    const insertUrl = '/insertValidCollection';
		let collection;

    function insertCollection() {
        var jqxhr = $.get(insertUrl, function(result) {
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

		function getAll() {
        $.getJSON('/all-data', function(result) {
            collection = result.allData;
            $('#display').html(JSON.stringify(result, null, 4));
        })
            .done(function() {
                console.log('second success');
            })
            .fail(function(error) {
                alert(JSON.stringify(error.responseJSON, null, 4));
            })
            .always(function() {
                console.log('finished');
            });
    }

		function emptyCollection() {
        $.getJSON('/emptyCollection', function(result) {
            $('#display').html(JSON.stringify(result, null, 4));
        })
            .done(function() {
                console.log('second success');
            })
            .fail(function() {
                alert(JSON.stringify(a.responseJSON, null, 4));
            })
            .always(function() {
                console.log('finished');
            });
    }

    function update() {
			collection[0].firstName = 'foo';
			const newData = {
					id: collection[0]._id,
					firstName: collection[0].firstName
			};
			$.getJSON('/update', newData, function(result) {
            $('#display').html(JSON.stringify(result, null, 4));
        })
            .done(function() {
                console.log('second success');
            })
            .fail(function() {
                alert(JSON.stringify(a.responseJSON, null, 4));
            })
            .always(function() {
                console.log('finished');
            });
    }

		$('#insertValidData').click(insertCollection);
		$('#getAll').click(getAll);
		$('#emptyCollection').click(emptyCollection);
		$('#update').click(update);
});


```

## Step Seven

In **routes/index.js** append all of the following before the module statement:

```javascript
var express = require('express');
var router = express.Router();
var connect = require('./connect');
//var politicians = require('../models/politicians');
var allMongo = require('./all-mongo');

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {title: 'CongressServer'});
});

// here
router.get('/bar', function(request, response) {
    response.status(200).send({result: 'bar'});
});

router.get('/bar/:id', function(request, response) {
    'use strict';
    response.status(200).send({param: request.params.id});
});

module.exports = router;
```

## All Mongo

In **routes\/all-mongo.js**:

```javascript
/**
 * Created by charlie on 6/5/16.
 */

const connect = require('./connect');
const Politicians = require('../models/politicians');
const fs = require('fs');
let totalPoliticiansSaved = 0;

function allMongo() {
	use strict;
}

allMongo.numberOfPoliticians = 0;

function insertPolitician(politician, response) {
    'use strict';
    if (!connect.connected) {
        connect.doConnection();
    }
    const newPolitician = new Politicians({
        'firstName': politician.firstName,
        'lastName': politician.lastName,
        'city': politician.city,
        'state': politician.state,
        'zip': politician.zip,
        'phone': politician.phone,
        'website': politician.website,
        'email': politician.email,
        'contact': politician.contact
    });

    console.log('inserting', newPolitician.lastName);

    newPolitician.save(function(err) {
        if (err) {
            throw new Error(err);
        }
        totalPoliticiansSaved++;
        console.log('saved: ', newPolitician.lastName, allMongo.numberOfPoliticians, totalPoliticiansSaved);

        if (totalPoliticiansSaved === allMongo.numberOfPoliticians) {
            response.status(200).send({
                result: 'Success Saving Politicians',
                totalSaved: totalPoliticiansSaved
            });
        }
    });
}

allMongo.getAllData = function(response) {
    console.log('About to find politicians.');
    Politicians.find({}, function(err, allData) {
        if (err) {
            throw new Error(err);
        }
        console.log(allData.length);
        console.log(allData[0]);

        allMongo.writeData('politicians.json', allData);

        response.status(200).send({
            result: 'Success',
            allData: allData
        });
    });
};

allMongo.writeData = function(fileName, data) {
    'use strict';
    const dataAsString = JSON.stringify(data, null, 4);
    fs.writeFile(fileName, dataAsString, function(err, result) {
        if (err) {
            throw (err);
        }
        console.log('success writing file');
    });
};

allMongo.readDataAndInsert = function(response) {
    'use strict';
    fs.readFile('public/address-list.json', function(err, politiciansText) {
        if (err) {
            //throw (err);
            response.status(404).send({'result': err});
            return;
        }
        politiciansText = JSON.parse(politiciansText);
        totalPoliticiansSaved = 0;
        allMongo.numberOfPoliticians = politiciansText.length;
        for (let i = 0; i < politiciansText.length; i++) {
            insertPolitician(politiciansText[i], response);
        }
    });
};

allMongo.empty = function(response) {
    Politicians.remove({}, function(err) {
        if (err) {
            response.status(500).send({
                result: 'err',
                err: err
            });
        } else {
            response.status(200).send({
                result: 'collection removed'
            });
        }
    });
};

allMongo.update = function(requestQuery, response) {
    console.log('All Mongo', requestQuery._id);
    Politicians.findOne({
        _id: requestQuery.id
    }, function(err, doc) {
        console.log('findone', err, doc);
        if (err) {
            response.status(404).send({
                result: err
            });
        } else {
            if (doc === null) {
                insertPolitician(requestQuery, response);
            } else {
                doc.firstName = requestQuery.firstName;
                doc.save();
                response.status(200).send({
                    result: 'success',
                    query: requestQuery.body
                });
            }
        }
    });
};

module.exports = allMongo;
```

## Another query

This section is optional. Don't do it unless you are comfortable with it.

There is a utility called mongo. You can use it to connect to your database, even the database on **mlab**. At least I think you can.

Install the mongo client only. Then use the string found near the top of mlab database page to connect:

```
mongo ds049848.mlab.com:49848/elvenlab01 -u <dbuser> -p <dbpassword>
```

Don't forget to open a terminal and type **mongo** to start the mongo shell. Then do something like this:

<pre>
show dbs
use test
show collections
db.politicians.find()
db.politicians.find({} , {_id: 0, firstName: 1, lastName: 1})
</pre>


## Turn it in

Push you code to your repository, and when you turn it in tell me the tag, branch and folder where it resides. For instance:

- Folder: XXX
- Branch: YYY
- TAG: ZZZ

Please try to keep it simple. I shouldn't have to wade through several pages of text just to find where you pushed your code.

[gypbson]:http://elvenware.com/charlie/development/database/NoSql/MongoDb.html#mongoose-gyp-bson

## Additional Notes

Things to remember. Ignore comments about grunt check for now.

### Mongoose Basics Connect

After you run *grunt check*, run your tests and your program again to make sure everything still works!

### Mongoose Basics Empty Collection

Notice that **emptyCollection** has now changed and contains a check to make sure you are connected. The assignment now has the [right code](#step-seven).

### Match get and post

Here we do a **get** on the client:

```javascript
var jqxhr = $.get(insertUrl, function(result) { ... })
```

Here is the server side, which is also a **get**:

```javascript
router.get('/insertValidCollection', function(request, response) { ... })
```

If you do a **get** on the client, do a **get** on the server. Don't do a get in one place and post in the other. (I had this mixed up in one version of the assignment. You need to get this cleaned up if you followed my example and made a mistake.)

## Some More Code

In index.js:

```javascript
var express = require('express');
var router = express.Router();
var allMongo = require('./all-mongo');
var connect = require('./connect');

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {title: 'CongressServer'});
});

function checkConnection() {
    if (!connect.connected) {
        connect.doConnection('mlab');
    }
}

router.get('/all-data', function(request, response) {
    'use strict';
    console.log('AllData route invoked.');
    checkConnection();
    allMongo.getAllData(response);
});

router.get('/emptyCollection', function(request, response) {
    'use strict';
    checkConnection();
    allMongo.empty(response);
});

router.get('/insertValidCollection', function(request, response) {
    'use strict';
    console.log('Insert Valid Collection Called.');
    response.status(200).send({result: 'Insert valid Collection'});
    //checkConnection();
    //allMongo.readDataAndInsert(response);
});

router.get('/update', function(request, response) {
    'use strict';
    checkConnection();
    console.log('request query', request.query);
    allMongo.update(request.query, response);
});

// Additional Code here.
```

## Query Data

You can also query the data from the **mongo** app:

> db.politicians.find({}, {"\_id": 0, firstName: 1, "lastName": 1});
{ "firstName" : "Rogers", "lastName" : "Wickers" }
{ "firstName" : "Timothy", "lastName" : "Kaine" }
{ "firstName" : "Angus", "lastName" : "King" }
{ "firstName" : "Bob", "lastName" : "Corker" }
{ "firstName" : "Amy", "lastName" : "Klobuchar" }
{ "firstName" : "Christopher", "lastName" : "Murphy" }
{ "firstName" : "Thomas", "lastName" : "Carper" }
{ "firstName" : "Benjamin", "lastName" : "Cardin" }

For more details, see [Elvenware on MongoDb][elven-mongo].

[elven-mongo]: http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#sample-session
