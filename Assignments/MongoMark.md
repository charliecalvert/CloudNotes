---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MongoMark.md
relativePath: Assignments/MongoMark.md
title: MongoMark
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: MongoMark.md
fileNameHTML: MongoMark.html
---


<!-- toc -->
<!-- tocstop -->


MongoMark
=========

Your MongoMark application should be able to do the following:

- Read in a **markdown** file
- Store the file and its file name in a database
- Read the file back from the database
- Convert the file to HTML
- Display portions of the converted HTML in a browser
- One the client you should be able to choose the different sections of 
your HTML file. See the DocParse01 and 02 examples from JsObjects.

The application contains:

- [Node](http://nodejs.org/)
- [Express](http://expressjs.com/guide.html)
- [MongoDb](http://www.mongodb.org/)

There are two main files in the project.

- CreateJson.js
- Server.js

CreateJson.js
-------------

It can read in a markdown file:

    var fs = require('fs');
    fs.readFileSync('Sample.md', 'utf8');

After reading in the file it inserts places it insert a JSON object and stores it in a MongoDb database. The JSON object is able to do at least two things:

- Remember the name of the markdown file
- Store the markdown text.

**CreateJson.js** can also read the data back from the database. It converts the markdown into html, and sends it to the client browser. An external program called Pandoc handles conversion from markdown to HTML.

- [Pandoc](http://johnmacfarlane.net/pandoc/)

    var exec = require('child_process').exec;
    
    exec('pandoc -t html5 -o output.html output.md', function callback(error, stdout, stderr) { 
       // Read in the HTML send the HTML to the client
    });
    
This file can be a stand alone program, but it would be best if you could
trigger this event from a button click on the client. The user clicks 
the button and the program reads in a **markdown** file. For now, we
can hardcode in the name of the **markdown** file to be read. In 
a later version of this program, however, we will want to specify one or
more of the following:

- The name of a file to read
- A chunk of markdown and a file name to be passed in from the client
- The name of a directory where multiple markdown files reside, each
of which is to be read in, and inserted into the database, each in a
separate record.

But all of that is for later on. For now, just a button click and read
in a hard coded file will be fine.
    
Server.js
---------

This program uses a small subset of [Express](http://expressjs.com/guide.html). It serves up HTML pages to a browser. There are actually three served up to the client:

- index.html
- index.css
- index.js

All three pages are stored in a directory called **Public**. They are loaded with code that looks like this:

    // Served up as the default page when a request comes from the client.
    app.get('/', function(request, result){
      	var html = fs.readFileSync(__dirname + '/Public/index.html');
    	result.writeHeader(200, {"Content-Type": "text/html"});   
    	result.write(html);
    	result.end();
    });
    
    // Give express access to the Public directory
    app.use("/", express.static(__dirname + '/Public'));

We use code like this often.  If you have place where you store default code, you should paste it in so you can access it again later. The following link provides an overview of the code that follows this pattern:

- [Elvenware Express](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#using-express)
- [app.use](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#using-a-directory-with-app.use)

The Client
----------

The important code on the client is found **index.js**:

    var Run = (function() {
    
        // Constructor for module pattern
	    function Run() {
	
    	    // Call the server's app.get('/read', function() {}); function
    		$.get('/read', function(data) {
    		    // do something with HTML sent from the server
    		}).error(function(err) {
    			console.log(err.responseText);
    		});
		}

		// return the constructor.
		return Run;
	})();

	$(document).ready(function() {
		new Run();	
	});

Here we use the modular pattern.

Turn it In
----------

Place your code in your repository in a directory called Week06-MongoMark.
Enter the URL of your repository when you submit the assignment.



> Written with [StackEdit](https://stackedit.io/).
