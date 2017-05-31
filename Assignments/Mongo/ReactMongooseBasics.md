## Description

Mongoose Basics is an ORM for MongoDB.

- MongoDb Slides: [http://bit.ly/elf-mongo](http://bit.ly/elf-mongo)
- Mongoose Slides: [http://bit.ly/elf-mongoose](http://bit.ly/elf-mongoose)

**NOTE**: _There is an **Angular**, **React** and **jquery** version of this assignment. Make sure you are looking at the right one. This is the **React** assignment, the others are called [AngularMongooseBasics][angular-mongoose] and
[MongooseBasics][jq-mongoose]._

[angular-mongoose]: http://www.ccalvert.net/books/CloudNotes/Assignments/AngularMongooseBasics.html
[jq-mongoose]: http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseBasics.html

## Step One

Go to JsObjects:

	jo

Pull the latest from the repository: **git pull**.

Navigate back to your repository. From the root of your repository:

	CreateAllExpress CongressServer
	cd CongressServer
	npm install

Open the project in WebStorm.

## Step Two

Set up bower. Your **bower.json** probably already contains Bootstrap, and hence jQuery. But just in case:

- bower install bootstrap --save

Just to be save. Though the above call install bootstrap, lets just be certain all is well:

	bower install

Now might be a good time to start the project: **npm start**

## Ignore Politicians

Add a file called **nodemon.json** in the root of your project. Place the following content in it:

```javascript
{
  "verbose": true,
  "ignore": ["politicians.json", "**/bower-components/**"]
}
```

This project may create a file called **politicians.json** each time you insert data into the database. By default, this will cause **nodemon** to restart the project each time we write data to **politicians.json**. This can cause miscellaneous errors on the on the client side, such as a false report for failure for the **insertValidCollection**. The fix is to ask nodemon to ignore **politicians.json**. We should also ask it to ignore our components folder.

For more on nodemon configuration, see here:

- <https://github.com/remy/nodemon>
- <https://github.com/remy/nodemon/blob/master/doc/sample-nodemon.md>

You should also create a **.gitignore** file for this project and put the single line **politicians.json** in it. While you are at it, check your .bowerrc and make sure it has **bower-components** rather than **components** in it:

```javascript
$ cat .bowerrc
{
  "directory": "public/bower-components"
}
```

## Step Three

Let's practice setting up the **favicon**. Because you used **CreateAllExpress**, you should already have a **favicon.png** file in **public.** But in case you have some reason to do it manually, here is how to get a default favicon on Linux (first example) or on Windows:

	cp $JSOBJECTS/Data/MongoBootstrap/favicon.png public/.
	copy %USERPROFILE%\Git\JsObjects\Data\MongoBootstrap\favicon.png public\.

The next step is not done for you automatically by **CreateAllExpress**, so do this by hand:

- In an editor, open up **app.js** from the root of your project. (Server side)
- On line 18 uncomment: **app.use(favicon(__dirname + '/public/favicon.ico'));**
- Change **favicon.ico** to **favicon.png**.

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

router.get('/:id', function(request, response) {
    'use strict';
    response.render(request.params.id, {});
});
```

Later we will add methods methods to open your collection.


In **index.js**, make sure that this is the last line in the file:

	module.exports = router;

## Connecting

Here is a tool for connecting to the database. It belongs in its own file called **routes/connect.js**:

```javascript
var mongoose = require('mongoose');

var connect = {

    connected: false,

    simpleConnect: function() {
        'use strict';
        var url = 'mongodb://127.0.0.1:27017/test';
        connect.connected = true;
        mongoose.connect(url);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    mlabConnect: function() {
        'use strict';
        connect.connected = true;
        var userName = 'foo';
        var password = 'foobar';
        var siteAndPort = 'ds049848.mongolab.com:49848';
        var databaseName = 'elvenlab01';
        var url = 'mongodb://' + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;
        console.log(url);
        mongoose.connect(url);

        // This part is optional
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    doConnection: function(useSimple) {
        'use strict';
				if (typeof useSimple === 'undefined') {
					useSimple = true;
				}			

        if (useSimple) {
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

    $('#insertValidData').click(insertCollection);

    $("#getAll").click(function() {
       $.getJSON('/all-data', function(result) {
           $('#display').html(JSON.stringify(result, null, 4));
       })
    });
});
```

## Step Seven

In **routes/index.js** append all of the following before the module statement:

```javascript
var express = require('express');
var router = express.Router();
//var politicians = require('../models/politicians');
var allMongo = require('./all-mongo');
var connect = require('./connect');

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {title: 'CongressServer'});
});

router.get('/:id', function(request, response) {
    'use strict';
    response.render(request.params.id, {});
});

module.exports = router;
```

## All Mongo

In **routes/all-mongo.js**:

```javascript
/**
 * Created by charlie on 6/5/16.
 */

//var express = require('express');
var connect = require('./connect');
var Politicians = require('../models/politicians');
var fs = require('fs');
var totalPoliticiansSaved = 0;

function allMongo() {
    'use strict';
}

allMongo.numberOfPoliticians = 0;

function insertPolitician(politician, response) {
    'use strict';
    if (!connect.connected) {
        connect.doConnection();
    }
    var newPolitician = new Politicians({
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
            response.send({
                result: 'Success Saving Politicians',
                totalSaved: totalPoliticiansSaved
            });
        }
    });
}

allMongo.getAllData = function(response) {
    console.log('About to find politicians.');
    Politicians.find({}, function(err, allData) {
        console.log(allData.length);
        console.log(allData[0]);

        allMongo.writeData('politicians.json', allData);

        response.send({
            result: 'Success',
            allData: allData
        });
    });
};

allMongo.writeData = function(fileName, data) {
    'use strict';
    var dataAsString = JSON.stringify(data, null, 4);
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
        for (var i = 0; i < politiciansText.length; i++) {
            insertPolitician(politiciansText[i], response);
        }
    });
};

allMongo.empty = function(response) {
    Politicians.remove({}, function(err) {
        if (err) {
            response.send({
                result: 'err',
                err: err
            });
        } else {
            response.send({
                result: 'collection removed'
            });
        }
    });
};

allMongo.update = function(requestQuery, response) {
    console.log('All Mongo', requestQuery._id);
    Politicians.findOne({
        _id: requestQuery._id
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

Don't forget to open a terminal and type **mongo** to start the mongo shell. Then do something like this:

<pre>
show dbs
use test
show collections
db.politicians.find()
db.politicians.find({} , {_id: 0, firstName: 1, lastName: 1})
</pre>


## Turn it in

Push you code to your repository, and when you turn it in tell me the branch and folder where it resides.


[gypbson]:http://elvenware.com/charlie/development/database/NoSql/MongoDb.html#mongoose-gyp-bson


## Additional Notes

Things to remember.

### Mongoose Basics Connect

After you run *grunt check*, run your tests and your program again to make sure everything still works!

This was my bug not yours, so you will not lose points for this. Nevertheless, for the final, be sure that you write the following in **routes/connect.js**:

```javascript
connect.connected = true;
```

This is about lines 14 and 35.

The assignment now has the [right code](#connecting).

### Mongoose Basics Empty Collection

Notice that emptyCollection has now changed and contains a check to make sure you are connected. The assignment now has the [right code](#step-seven).

### Match get and post

Here we do a **get** on the client:

```javascript
var jqxhr = $.get(insertUrl, function(result) { ... })
```

Here is the server side, which is also a **get**:

```javascript
router.get('/insertValidCollection', function(request, response) { ... })
```

If you do a get on the client, do a get on the server. Don't do a get in one place and post in the other. (I had this mixed up in one version of the assignment. You need to get this cleaned up if you followed my example and made a mistake.)

### Politicians File

Be sure to [add the code to ignore politicians](#ignore-politicians).
