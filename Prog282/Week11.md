Week 11 - Overview
==================

Major Topics
------------

- CouchDb
- CouchDb and Errors
- CouchDb and Bitmaps

Global Namespace
----------------

Good sleuthing, Rasmas!

I am still not settled on this issue, but your solution looks reasonable and I like the look of the common.js answer in the link you found.

Common={
  util: require('util'),
  fs:   require('fs'),
  path: require('path')};

module.exports =Common;


This is a combination of points b and c that we were discussing above. We were talking about doing this:

	exports.dbName = 'foo';

Or doing this:

~~~~
var myData = {};
myData.dbName = 'barfoo';
~~~~

But their suggestion is to combine them:

~~~~
var myData = {};
myData.dbName = 'barfoo';

exports.data = myData;
~~~~

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

