---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week11.md
relativePath: Prog282/Week11.md
title: Week11
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week11.md
fileNameHTML: Week11.html
---


<!-- toc -->
<!-- tocstop -->

Week 11 - Overview
==================

Major Topics
------------

- Position Page and Maps
- MongoDb 

Using the Public Directory
--------------------------

It is easy to link in standard HTML files to an Express program that uses 
Jade. Just create a standard HTML file with a name like **game.html**:

```
<!DOCTYPE html>
<html>
<body>
<h1>MyFile</h1>
</body>
</html>
```

This file can be placed in the **public** directory.

In an express application, if you want to link in *ordinary* HTML files like
**Game.html**, you should place them in the **public** directory:

	public/Game.html
	
Don't put them in the views directory. Don't link to them with use statements
like this:

	app.get('/Game.html', routes.Game);	
	
Instead, just link to them like any other ordinary HTML file:

```
<a href='Game.html'>Game.html</a>
```

Or if you are in a Jade template, write something like this, where I include the
li just to provide context:

```
  li
    a(href='/Game.html') Game
```

Global Namespace
----------------

I am still not settled on this issue, but your solution looks reasonable and 
I like the look of the common.js answer in the link you found.

Common={
  util: require('util'),
  fs:   require('fs'),
  path: require('path')};

module.exports =Common;


This is a combination of points b and c that we were discussing above. We 
were talking about doing this:

	exports.dbName = 'foo';

Or doing this:

```
var myData = {};
myData.dbName = 'barfoo';
```

But their suggestion is to combine them:

```
var myData = {};
myData.dbName = 'barfoo';

exports.data = myData;
```

This makes sense to me. I'll try to work with these ideas some and come in 
with some kind of reasonable solution for class this evening.

It is always best to limit the scope of variables as much as possible. When 
we can, we should completely encapuslate each object so that it shares no 
data with other objects. Next best is to have one object share data only 
with other objects that have to see it. Say, data is declared in object A, 
and shared only with Object B or Objects B and C. Objects D, E, F, G, etc 
cannot see the variable at all.

But I concede that there are times when we want to share some few variables 
or routines with the entire rest of our program. Then we can use a solution 
like the one we are discussing. That should be rare though.

Always we should put at most one, and only one, variable in the Global 
namespace maintained by the JavaScript runtime. 

Properly Reporting Errors with DbCouch
--------------------------------------

One of the key moments when working with a CouchDb database is the moment
you try to create the database. Let's use that as an example of how to
properly report errors. Consider this method:

```
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
```

Notice the error handler block:

```
	} else {
		console.log(err.reason);
		reportErrorPrivate(err);
		response.send({ 'Result' : err.reason });
	}
```

It first prints out the error **reason** property:

```
reason: 'Name: \'prog28208_Calvert\'. Only lowercase characters (a-z),
digits (0-9), and any of the characters _, $, (, ), +, -, and / are allowed. 
Must begin with a letter.',
```

This explanation is fairly easy to understand. In other words, the err.reason
property is one way to get at the heart of what is wrong without having 
visually parse a lot of complex text.

I then call the reportErrorPrivate method, that looks like this:

```
	var reportErrorPrivate = function(error) {
	    console.log('==========================')
        console.log('Error: ' + error.error);
        console.log('Status Code: ' + error['status_code']);
        console.log('Reason: ' + error.reason);
        console.log('Description: ' + error.description); 
	}
```

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

```
readJson called: [object Object]
Exiting Get readJson
{ [Error: missing]
  name: 'Error',
  scope: 'couch',
  status_code: 404,
  'status-code': 404,
```

This doesn't tell me quite as much as I need to find your error. Here is your method:

```
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
```

Let's focus on this line (which in your code is missing the semicolon):

	console.log('readJson called: ' + request.query);

It produces this output:

	readJson called: [object Object]

This doesn't really tell us much. To improve the output, use JSON.stringify:

	console.log('readJson called: ' + JSON.stringify(request.query))

Now we get this output:

```
readJson called: {"docName":"Hero"}
```

This is much more informative. It is also helpful to report which method 
is printing an error when you are in a callback:

	console.log('readJson error: '  + JSON.stringify(error, null, 4));

Even better would be to incorporate the **reportError** method we 
discussed on Saturday:

```
var reportErrorPrivate = function(error) {
	    console.log('==========================')
        console.log('Error: ' + error.error);
        console.log('Status Code: ' + error['status_code']);
        console.log('Reason: ' + error.reason);
        console.log('Description: ' + error.description); 
	}
```

So the refactored version of your code might look like this:

```
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
```

Ajax Error Handling
-------------------

```
	function( jqXHR, ajaxOptions, thrownError) {
		ok(false,  jqXHR.responseText + ' ' +  jqXHR.statusText);
		start();
	}
});
```

More information:

- <http://api.jquery.com/jQuery.ajax/#jqXHR>

CouchDb and Reading and Writing Bitmaps
---------------------------------------

You can place a bitmap in the database exactly as you place any
other attachment. You can read data out as you would other attachments,
but you probably just want to save the results to discuss rather than
send it on to clients via base64. 

Examples:

	JsObjects\Data\CouchUtils\CouchImage01
	JsObjects\Data\CouchUtils\CouchRead02

You can also read an image directly from your CouchDb data store. For
instance, you might use a URL that looks like this:

```
http://localhost:5984/couchdocs01/cscGarden.png/cscGarden.png
```

I've modified the original example so that so all the images now go 
into a CouchDb document called **images**. In other words, **images**
now has multiple attachments.

Reading and Writing from CouchDb Attach Example
-----------------------------------------------

See:

	JsObjects/Data/CouchUtils
	HtmlCssJavaScript/UnitTestCouchDb02
	
Express Tips
------------

Create an Express Server:

	express --sessions --css stylus myapp02
	
Copy in a .project file. Open the .project file in notepad++ and edit
the name element. Then import the project into Eclipse.

npm link express
npm link jade
npm link stylus

Set up your Two Pages in Stylus: home page, page02. You will need to
edit layout.jade file, index.jade file, and create a page02.jade file.
Then add in the following code to app.js and index.js:

	app.get('/page02', routes.page02);
	
And also in index.js:

```
exports.page02 = function(req, res){
  res.render('page02', { title: 'Page02' });
};
```



Set up a link to your Game.html file, or whatever you call the 
main page of your game. Copy your game into the public directory.
And then run it. You will probably have to mess with the Images
directory and get that set up.

Next try to tackle the handlebars importing.

