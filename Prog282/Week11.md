Week 11 - Overview
==================

Major Topics
------------

- CouchDb
- CouchDb and Errors
- CouchDb and Bitmaps

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

Ajax Error Handling
-------------------

~~~~
	function( jqXHR, ajaxOptions, thrownError) {
		ok(false,  jqXHR.responseText + ' ' +  jqXHR.statusText);
		start();
	}
});
~~~~

More information:

- <http://api.jquery.com/jQuery.ajax/#jqXHR>

CouchDb and Reading and Writing Bitmaps
---------------------------------------

