# Prog 272 Week 07, 2014

toc

# Overview

Today we are going to look at loading data using several different techniques.
We will look at Handlebars.js and templating. We will look at jQuery load, and
at jQuery.getJSON.

-   HandleBarsDemo01
-   JQueryLoad01
-   JQuerySelect01 (Cordova)
-   [Web GL Water](http://madebyevan.com/webgl-water/)
-   [Average Progammers Talk](https://www.quora.com/Computer-Programmers/What-does-it-feel-like-to-be-an-average-programmer-among-very-talented-ones)

# Install Jasmine-Node

	sudo npm install -g jasmine-node
	
You will also want to install request locally:

	npm install request
	
Or

	npm install request --save-dev

# Create Route

Create a simple route you want to test:

	app.get('/hello', function(request, response) { 'use strict';
		response.send('Hi there.');
	});
	
	
# Basic Jasmine-Node

Save the following as **Tests/SimpleSpec.js**:

	var request = require('request');

	describe("A suite", function() {
		it("should respond with hello world", function(done) {
			request("http://localhost:30025/hello", function(error, response, body) {
				expect(body).toEqual("Hi there.");
				done();
			});
		});
	}); 

# Run the test:

Now run start your server running in one shell:

	node Server.js
	
Then open a second shell and run your tests:

	jasmine-node Tests/

# Permanently Delete from Git Repository

A tool called BFG can make permanently deleting files from a repository
fairly easy. 

- [Elvenware Git](http://www.elvenware.com/charlie/development/cloud/Git.html#permanent-delete)

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
