Week07
======

- [Routes and Query Strings: http://bit.ly/noderoutes](http://bit.ly/noderoutes)
- ACA Bridge Analogy
- Working with baseURL in require.config (See BridgeReader in writing...)
- [Midterm][midterm]

I'll pass out the midterm this week. It will be due Sunday night. It will be open book, but will probably
be fairly time consuming, so you might begin planning for that contingency. One thing is certain, if you start it on Sunday evening, you probably won't do very well.

[midterm]: http://www.elvenware.com/charlie/books/CloudNotes/Assignments/Prog282Midterm2014.html

##Routes

    router.get('/read', function(request, response) {
        var queryObject = request.query;
        var queryAsString = JSON.stringify(request.query);
        console.log("Read called: " + queryAsString);
        response.send({ "firstName": queryObject.firstName });
    });

Merging Git Files:
------------------

- <http://elvenware.com/charlie/development/cloud/Git.html#merging-code>


The Same Origin Policy
----------------------

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




Free Graphics
-------------

- <http://opengameart.org/>
- <http://www.lostgarden.com/2006/07/more-free-game-graphics.html>
- <http://gamedev.stackexchange.com/questions/20/where-can-i-find-free-sprites-and-images>
- <http://www.cgtextures.com/>


Folder Manipulation
-------------------

A library with a routine for ensuring a directory exists and for
recursively removing directories.

~~~~
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require("path");

var SimpleDir = (function() {

	function SimpleDir() {
	}
	
	var makeDir = function(folder) {
		mkdirp(folder);
	}
	
	// Test if a directory exists, if it does not exist create it
	SimpleDir.prototype.ensureDir = function(folder) {
		fs.exists(folder, existsFunc);
	}
	
	// Synchronous version of directory exists
	SimpleDir.prototype.ensureDirSync = function(folder) {
		currentFolder = folder;
		if (fs.existsSync(folder)) {
			return fs.statSync(folder);
		} else {
			makeDir(folder);
			return 'successfully created directory';
		}		
	};

	// Remove directories recursively
	// Credit to tkihira: https://gist.github.com/tkihira/2367067
	SimpleDir.prototype.rmdirSync = function(dir) {
		var list = fs.readdirSync(dir);
		for(var i = 0; i < list.length; i++) {
			var filename = path.join(dir, list[i]);
			var stat = fs.statSync(filename);
			
			if(filename == "." || filename == "..") {
				// pass these files
			} else if(stat.isDirectory()) {
				// rmdir recursively
				this.rmdirSync(filename);
			} else {
				// rm filename
				fs.unlinkSync(filename);
			}
		}
		fs.rmdirSync(dir);
	};
		
	return SimpleDir;
})();

exports.dirs = new SimpleDir();
~~~~

Angular JS
----------

<http://stephanebegaudeau.tumblr.com/post/48776908163/everything-you-need-to-understand-to-start-with>
<http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/all-you-need-to-know-about-the-html5-data-attribute/>



