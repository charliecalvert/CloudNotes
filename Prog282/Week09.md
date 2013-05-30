Week09 Overview
===============

Our major topic:

- [Express Generated Apps on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#express-generated-applications)
- [Jade](http://jade-lang.com/)
- [Stylus](http://learnboost.github.io/stylus/)
- [CouchDb on Elvenware](http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html)
- [PhantomJs site. Also see below.](http://phantomjs.org/)

The assignments:

- [Week09-InClass](http://www.elvenware.com/charlie/books/CloudNotes/Prog282/Week09-InClass.html)
- [Week09-Assignment](http://www.elvenware.com/charlie/books/CloudNotes/Prog282/Week09-Assignment.html)


PhantomJs and QUnit
-------------------

You can use PhantomJs to run tests on your program from the command line. This
means that we can run QUnit tests from the command line:

~~~~
G:\Src>phantomjs Tests\run-qunit.js http://localhost:30025/TestCanvasCode.html
'waitFor()' finished in 233ms.
Tests completed in 141 milliseconds.
44 assertions of 58 passed, 14 failed.
~~~~

Here is the home page for PhantomJs and a related tool called CasperJs:

- <http://phantomjs.org/>
- <http://casperjs.org/>

References:

- <https://gist.github.com/gmarik/1305062>


Create Database
---------------

Check if a database exists, if it does not, create it:

~~~~
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
~~~~

Call it like this:

	dbExists(response, dbName);

Express Complete Build
----------------------

Some links for express and a note or two.

- [Express Generated Apps on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#express-generated-applications)
- [Multi-user Chat](http://blog.jtmoon.com/real-time-application-multi-user-chat-application-using-node-js-socket-io-and-ember-js/)
- [Simple Chat](http://tech.pro/tutorial/1097/simple-chat-nodejs-plus-websockets)


Express application is here:

~~~~
C:\Users\Charlie\AppData\Roaming\npm\node_modules\.bin
~~~~

Of sometimes just in your ../node_modules/express/.bin directory

Nodemon Watches for Changes
---------------------------

Install nodemon:

	npm install -g nodemon
	
Now use it to start your application:

	nodemon server.js
	
Now you won't have to restart your application each time you change
the source.
