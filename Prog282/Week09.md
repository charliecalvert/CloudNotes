---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week09.md
relativePath: Prog282/Week09.md
title: Week09
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week09.md
fileNameHTML: Week09.html
---


<!-- toc -->
<!-- tocstop -->

Week09 Overview
===============

Our major topic:

- AWS and EC2
    - [AWS Deck: http://bit.ly/Rzi2Da](http://bit.ly/Rzi2Da)
    - [On Elvenware](http://www.elvenware.com/charlie/development/cloud/WebServices.html#aws)
- Singleton
    - [On JsObjects][singleton]
- Sessions
- NoDemon
- [WebServers Review: http://bit.ly/Q9A4Ne](http://bit.ly/Q9A4Ne)


The assignments:

- [Week09-InClass](http://www.elvenware.com/charlie/books/CloudNotes/Prog282/Week09-InClass.html)
- [Week09-Assignment](http://www.elvenware.com/charlie/books/CloudNotes/Prog282/Week09-Assignment.html)

[singleton]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/Singleton


## Nodemon Watches for Changes

Install nodemon:

	npm install -g nodemon
	
Now use it to start your application:

	nodemon server.js
	
Now you won't have to restart your application each time you change
the source.

PhantomJs and QUnit
-------------------

- [PhantomJs site. Also see below.](http://phantomjs.org/)

You can use PhantomJs to run tests on your program from the command line. This
means that we can run QUnit tests from the command line:

```
G:\Src>phantomjs Tests\run-qunit.js http://localhost:30025/TestCanvasCode.html
'waitFor()' finished in 233ms.
Tests completed in 141 milliseconds.
44 assertions of 58 passed, 14 failed.
```

Here is the home page for PhantomJs and a related tool called CasperJs:

- <http://phantomjs.org/>
- <http://casperjs.org/>

References:

- <https://gist.github.com/gmarik/1305062>


Create Database
---------------

Check if a database exists, if it does not, create it:

```
	var makeDatabase = function(response, dbName) {
		nano.db.create(dbName, function(err, body) {
			if (!err) {
				console.log(body);
				// return { "Result" : "Success" };
			} else {
				console.log('Could not create database');
				console.log(err);
				response.send(500, err);
			}
		});
	};

	var dbExists = function(response, dbName) {
		nano.db.list(function(err, body) {
			var dbFound = false;
			// body is an array
			body.forEach(function(db) {
				console.log(db);
				if (db === dbName) {
					console.log('database exists');
					dbFound = true;
				}
			});
			
			// If dbName not found, create database			
			if (!dbFound) {
				makeDatabase(response, dbName);
			} else {
				response.send({'Result':'Database Exists'})
			}
		});
	};
```

Call it like this:

	dbExists(response, dbName);

Express Complete Build
----------------------

Build an Express application:

	express --sessions --css stylus myapp

Some links for express and a note or two.

- [Express Generated Apps on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#express-generated-applications)
- [Multi-user Chat](http://blog.jtmoon.com/real-time-application-multi-user-chat-application-using-node-js-socket-io-and-ember-js/)
- [Simple Chat](http://tech.pro/tutorial/1097/simple-chat-nodejs-plus-websockets)


Express application is here:

```
C:\Users\Charlie\AppData\Roaming\npm\node_modules\.bin
```

Of sometimes just in your ../node_modules/express/.bin directory




Initializing Buttons on Dynamically Inserted HTML
-------------------------------------------------

If you load a HTML page in your game, then you sometimes need
to initialize the buttons that you will use on that page. One
way to do that is to link in a JavaScript page from the loaded
HTML page, and load the buttons there. However, sometimes that
is not practical. In that case, do something like this:

```
	var htapp.get('/readJson', function(request, response) {
    console.log('readJson called: ' + request.query)
    var prog = nano.db.use(dbName);
    
    prog.get(request.query.docName, function(error, existing) {
        if(!error) { 
            console.log(existing);
            response.send(existing);
        }  else {
            console.log(error);
            response.send(500, error);
        }
    });
    console.log('Exiting Get readJson');
});mlView = function() {
		$('#main').empty();
		$('#main').load("/Data/newSections.html #barFoo",
			function() {
				// Init the button here
				$("#buttonCreateArray").click(allGridFilesToArray);
				// Alternatively, call some method where you init the buttons
				that.elvenData.setUpCouchDbUtils();
			}
		);
	}
```
