---
creationLocalTime: 3/26/2022, 10:23:54 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Isit320/Isit320-Week03.md
relativePath: Isit320/Isit320-Week03.md
title: Isit320-Week03
queryPath: Isit320/
subject: Isit320
fileNameMarkdown: Isit320-Week03.md
fileNameHTML: Isit320-Week03.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Here are various bits and pieces about CouchDb that I have pulled together from various assignments or discussions used in previous classes. This information is presented piecemeal, and has not been reviewed or edited for some time.

- [CouchDb on Elvenware][couchdbcc]

## Databases

We are going to be working mostly with NoSQL database. Relational databases
are great, of course, but you have seen them in other courses. An important
part of the cloud ecology is built around NoSQL databases.

- <http://nosql-database.org/>
- <https://en.wikipedia.org/wiki/NoSQL>

NoSQL databases are:

* non-relational.
* distributed
* able to handle huge amounts of data (big data)

An example of Big Data is the Large Hadron Collider, which stores 10 PetaBytes
of data per year in CouchDb. Twitter uses both MySQL and NoSQL. They brought in
a NoSQL solution based on Hadoop because their users generate about 4 PetaBytes
of data year. Their solution uses Pig, Hbase and FlockDb, all of which run on
top of Hadoop.

NoSql databases are designed to let you:

* Write huge amounts of data to them very quickly
* Provide fast key-value pair lookups
* Have no single point of failure
* Support for distrubted parallel computing
* Good support for analytical queries that do something like the SQL commands
to SELECT data, then GROUP BY some term. In the SQL world, this is called Map
Reduce.
* Support for rapid development with a flexible structure. If you have highly
structured data, then SQL is probably a better choice. But if you want some
flexibility, then NoSQL can be helpful.

There are many good NoSQL databases, including MongoDb, Cassandra, Hadoop/Hbase,
and CouchDb. We will focus mostly on CouchDb, though I would like to do at least
some work with either MongoDb or Hadoop/Hbase.

Some big or important folks who use NoSQL:

* Twitter and Hadoop)(http://readwrite.com/2011/01/02/how-twitter-uses-nosql)
* [Netflix and Cassandra](http://readwrite.com/2011/01/28/how-netflix-adopted-nosql)
* [Large Hadron Collider and CouchDb](http://readwrite.com/2010/08/26/lhc-couchdb)

Please don't read this as either:

* NoSQL is better than relational databases
* Relational databases are better than NoSQL

Each technology shines in particular settings. Both can scale to huge amounts
of data. Both can be very fast in certain settings. There are times when you
want to use SQL, and times when you might find a NoSQL database more efficient.
It is beyond the scope of this class, and my scope as a teacher, to give you
hard and fast rules on these subjects.

For now, our reason for using NoSQL look something like this:

* We need to be aware of all the important solutions used in the cloud.
* NoSQL has broad adoption in the cloud
* In some use cases, NoSQL is a better choice than SQL


## Samples

I have created three samples:

	JsObjects/Data/CouchUtils/CouchAttach01
	JsObjects/Data/CouchUtils/CouchDoc01
	JsObjects/Data/CouchUtils/CouchRead02

- CouchAttach01 shows how to place 10 HTML into a CouchDb Database by
running a single batch file. If the database used by the program
does not exist it will be created automatically.
- CouchDoc01 shows how to put a number of JSON files of varying shapes
and sizes into CouchDb by running a single batch file. If the database
used by the program does not exist, it will be created automatically.
- CouchRead02 shows how to read back the JSON and HTML files inserted
by the above the documents.

At minimum, everyone should create their own version of the above and:

- Place five JSON documents into CouchDb Attach Example
- Place five HTML files in CouchDb
- Integrate CouchRead02 into their existing projects. The user
should be able to select a single link inside your main program that
will launch a separate (or embedded) page that allow them to view
the content of all the files you insert into CouchDb.

Demos showing how to read and write attachments, and some advanced
error handling:

- JsObjects/Data/CouchDb11
- JSoBjects/Data/CouchDb12


One of the most important samples is JsObjects/HtmlCssJavaScript/UnitTestCouchDb01.

- <https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/UnitTestCouchDb01>

Here is a core topic you are likely to wrestle with:

- [Insert JSON into CouchDb](http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html#error-document-update-conflict)

## Images

I've added examples for at least writing and reading PNG files from CouchDb.
It seems like there is no difference between the call to put an HTML
attachment and the call to put a bitmap, so I just used exactly the same
routines and techniques for each datatype. The demo of writing the PNG is
here:

	JsObjects/Data/CouchUtils/CouchImage01

I have also modified CouchUtils/CouchRead02 to read in the bitmap. The
algorithm is as follows:

- Send ajax request from client to server asking to read the PNG.
- The server gets the request, reads the PNG, writes it to disk, and sends back
an acknowledgement of the successful operation.
- The client gets the response, reads the bitmap, and displays it in the same
area where we were displaying HTML files.

## The Same Origin Policy

Let's talk a bit more about jsonp, since this is not a subject we have discussed
in depth so far.

After you install CouchDb, you can open up their ﻿**Futon** ﻿web app:

<http://localhost:5984/_utils/>

On the upper right hand side of **﻿Futon**﻿ is a link to the configuration page:

<http://localhost:5984/_utils/config.html>

About 40 items down in the **﻿options**﻿ column of the configuration page is a
setting that allows you to turn on **jsonp**. You should double click the word
**﻿false**﻿ and set it to **﻿true**﻿.

- <http://en.wikipedia.org/wiki/Same_origin_policy>
- <http://en.wikipedia.org/wiki/JSONP>

Our browsers are set up to refuse to make requests that are not sent to the
web server that served up a particular page. If you are using
http://localhost:30025 as your web server, then you can only send requests
to http://localhost:30025. If you try, for instance, to post data by making
an ajax call to http://www.google.com, then that request will be refused.
This is an important security feature. If, for instance, you are connected
to your bank, and some hackers intercepts one of your calls (perhaps the one
where you submit your password) and tries to direct it to another site, then
that request will be refused by the browser because of the Same Origin Policy.

**jsonp** is a way around this restriction. As a rule, I think jsonp is a
very bad idea. But for now, I want to turn it on.

The last example I showed in class on Wednesday used CouchApp to serve up an
application. This is important because it allows us to send couchdb rest
commands directly back to the server that served up our pages, without
having to use **jsonp**. The technique I showed where we used our server side
code in express to make the couchdb calls, also works around the cross
domain/same origin policy in a reasonable way. In particular, applications
running on a server are not subject to the cross domain policy. So our
client can ask the node express server to call couchdb, which is a
completely appropriate thing to do. If we don't trust the code running on
the server, then we should not be using the service at all!

One way to get around the same origin policy (cross site restriction),
is to build a CouchDb hosted application with CouchApp.

- Get CouchAppAuto from JsObjects/Data.
- Change the first editable line (the AppName) in the go batch file.
- Run the batch file
- Go into the directory it created, which is the same as your AppName
- Put your HTML and CSS in the **_attachments** directory. For instance, put
a file called index.html there. Then run this command: **couchapp push couchapps**.
This command tells CouchApp to push your newly constructed app to the couchdb
called couchapp. The go.bat file set up couchapp for you.
- Go something like here: http://127.0.0.1:5984/couchapp/_design/CouchApp06/index.html.
The key point here is that CouchApp06 should be your AppName, and index.html
should be the name of the file you put in the **_attachments** directory.

## Errors

Properly Reporting Errors with DbCouch
--------------------------------------

One of the key moments when working with a CouchDb database is the moment
you try to create the database. Let's use that as an example of how to
properly report errors. Consider this method:

~~~~
app.get('/create', function(request, response) {
	'use strict';
	console.log('create called.');
	nano.db.create(dbName, function(err, body) {
		if (!err) {
			console.log(body);
		} else {
			console.log(err.reason);
			reportErrorPrivate(err);
			response.send({ 'Result' : err.reason });
		}
	});
~~~~

Notice the error handler block:

~~~~
	} else {
		console.log(err.reason);
		reportErrorPrivate(err);
		response.send({ 'Result' : err.reason });
	}
~~~~

It first prints out the error **reason** property:

~~~~
reason: 'Name: \'prog28208_Calvert\'. Only lowercase characters (a-z),
digits (0-9), and any of the characters _, $, (, ), +, -, and / are allowed.
Must begin with a letter.',
~~~~

This explanation is fairly easy to understand. In other words, the err.reason
property is one way to get at the heart of what is wrong without having
visually parse a lot of complex text.

I then call the reportErrorPrivate method, that looks like this:

~~~~
	var reportErrorPrivate = function(error) {
	    console.log('==========================')
        console.log('Error: ' + error.error);
        console.log('Status Code: ' + error['status_code']);
        console.log('Reason: ' + error.reason);
        console.log('Description: ' + error.description);
	}
~~~~

This method prints ouf the error, status_code, reason and description properties
of the CouchDb error message. This is most of the important information in the
error message, with the exception of the stack trace. The problem with printing
out the stack trace, of course, is that it long and relatively had to read, at
least in the sense that it takes up a lot screen space.

If, after all this, you are still having trouble understanding the error message,
you could edit the code and log the entire error structure:

	console.log(error);

Finally the code in our original method sends the error.reason property back
to the client so that the user can see what has happened. You might not want to
do this if you releasing code to end users, but it is very helpful while you
are developing your code.

More on Errors
--------------

I'm getting the following error:

~~~~
readJson called: [object Object]
Exiting Get readJson
{ [Error: missing]
  name: 'Error',
  scope: 'couch',
  status_code: 404,
  'status-code': 404,
~~~~

This doesn't tell me quite as much as I need to find your error. Here is your method:

~~~~
app.get('/readJson', function(request, response) {
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
});
~~~~

Let's focus on this line (which in your code is missing the semicolon):

	console.log('readJson called: ' + request.query);

It produces this output:

	readJson called: [object Object]

This doesn't really tell us much. To improve the output, use JSON.stringify:

	console.log('readJson called: ' + JSON.stringify(request.query))

Now we get this output:

~~~~
readJson called: {"docName":"Hero"}
~~~~

This is much more informative. It is also helpful to report which method
is printing an error when you are in a callback:

	console.log('readJson error: '  + JSON.stringify(error, null, 4));

Even better would be to incorporate the **reportError** method we
discussed on Saturday:

~~~~
var reportErrorPrivate = function(error) {
	    console.log('==========================')
        console.log('Error: ' + error.error);
        console.log('Status Code: ' + error['status_code']);
        console.log('Reason: ' + error.reason);
        console.log('Description: ' + error.description);
	}
~~~~

So the refactored version of your code might look like this:

~~~~
app.get('/readJson', function(request, response) {
    console.log('readJson called: ' + JSON.stringify(request.query))
    var prog = nano.db.use(dbName);

    prog.get(request.query.docName, function(error, existing) {
        if(!error) {
            console.log(existing);
            response.send(existing);
        }  else {
            console.log('readJson error');
            reportError(error);
            response.send(500, { "Result": error.reason });
        }
    });
    console.log('Exiting Get readJson');
});
~~~~


[couchdb]:http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html
[couchdbcc]:http://www.ccalvert.net/database/CouchDb.html
