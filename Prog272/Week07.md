# Week 07

Today we are going to look at loading data using several different techniques.
We will look at Handlebars.js and templating. We will look at jQuery load, and
at jQuery.getJSON.

-   HandleBarsDemo01
-   JQueryLoad01
-   JQuerySelect01 (Cordova)

# Debug Node in Eclipse

- [Debug on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#debug-node-in-eclipse)

# MongoTalk04 Example

- [Code](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoTalk04)
- [Server](https://github.com/charliecalvert/JsObjects/blob/master/Data/MongoTalk04/Server.js)
- [index js](https://github.com/charliecalvert/JsObjects/blob/master/Data/MongoTalk04/Public/index.js)
- [QueryMongo](https://github.com/charliecalvert/JsObjects/blob/master/Data/MongoTalk04/Library/QueryMongo.js)

# require QueryMongo

This code shows how to get an instance of the express object:

	var express = require('express');
	var app = express();

Here is how to get an instance of QueryMongo:

	var qm = require('./Library/QueryMongo');
	var queryMongo = qm.QueryMongo; 


# Calling QueryMongo

Once you have an instance of QueryMongo, you can call it like this:

	app.get('/readAll', function(request, response) {'use strict';
		queryMongo.getCollection(response);
	});



# Other Programs of Interest

- CordovaListDirectories
- CordovaListDirs02
- CordovaFileReader
- WebFileTests
- HandleBarDemo01

Source from class: [ObjectVariables01.zip](<ON CANVAS>)

# Handlebars


Notes on Elvenware: 

- [Handlebars](http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#jqHandlebars)


#  Working with JSON


Notes on Elvenware:

- [getJSON](http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#getJSON)
- [Working with JSON](http://www.elvenware.com/charlie/development/web/JavaScript/JsonBasics.html#working)
