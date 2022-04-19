---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week10.md
relativePath: Prog282/Week10.md
title: Week10
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week10.md
fileNameHTML: Week10.html
---


<!-- toc -->
<!-- tocstop -->

Week 10
=======

I believe We have four classes left, 6/4, 6/9, 6/12, 6/16.

Main Topics discussed this week include:

- Sessions: npm install express-session
- Nodemon: npm install -g nodemon
- Refactoring
- Integrate Markdown
- Observer: PubSub

#Class Overview

Things you've learned these last two quarters in 280 and 282:

Technolgies:

    MongoDb
    MongoLab
    Aws EC2 and S3
    SSH
    JSON
    Web Servers
    Ports and IP Addresses
    Linux command line
    Eclipse
    Geany
    Node
    Express
    Jade
    Require
    jQuery
    Karma
    Grunt
    
JavaScript:

    Callbacks
    JavaScript Objects and Arrays
    Constructor Functions
    Prototypal Inheritance
    Unit testing and Jasmine
    Async Programming and Testing
    Express Routes
    Rest and Ajax
    JsHint

Patterns:

    Singleton
    Factory
    Bridge
    Observer (PubSub)
    Modular
    Queue
    Stack

Tools:

    Git and GitGui
    Debugging with the Chrome Developer Tools
    Cloud9
    Google Drive
    Evernote
    Microsoft OneDrive
    
##Comments

Why don't I comment my code more? 

Comments have a way of getting out of sync. We are constantly refactoring our code. We expect things to change. As a result, our comments can easily get out of date, and end up causing more trouble than they save.

Each object should do one thing, and do it well. As a result, it should be easy to come up with a name for it that completely describes what it does: **JsonReader**, **ReaderFactory**, **PictureDisplay**, etc. Adding a comment is just redundant. We already described what the object does. What else is there to say?

It is an error to add comments that do nothing more than repeat what was already made clear by a good naming convention. Consider this comment: "**JsonReader: This object reads Json files**." Comments like this one should be deleted. They just clutter the page, making it harder to understand and harder to maintain.

As to how it works and how to use it, that should be covered by your unit tests. If the user does not understand how to use an object, they should be able to open up the unit tests and see what to do. But our objects should be so simple, and so well designed, that it is easy to intuit how to use the object.

In general, comments should be reserved for that moment when something needs clarification. If all is going well, all you have to do is name something properly, and your documentation is complete. But when you are forced to write a hack, then you need to comment it to explain what you are doing. In that sense, comments are an admission that something has gone awry.

There are exceptions, of course. There are times when comments are needed. And of course, if you are publishing an API for public consumption, then it is helpful, or at least expected. But comment code that it is in heavy development and subject to constant refactoring can be problematic. 

Final Note: Everyone always tells you to comment your code. Okay, maybe they have a point. But the funny thing is that you can make almost as good a case for not commenting your code as for commenting code. ***If you feel you really need to comment your code to make it comprehensible, that usually means you need to refactor the code.*** If the proper refactorings are found, then most of your comments should become redundant. 


Sessions
--------

Sessions have the following traits:

When we create session, a cookie is built in, it is part of the session. Each
cookie is maintained by the browser and has an id. Each request from the browser
contains the cookie and its ID. The server can use this ID to associate data
that it (the server) maintains with the cookie, that is with the session
associated with a particular browser.

The best way to learn more about sessions is to run and study the following
two demos:

- [JsObjects/JavaScript/NodeCode/Session01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/Session01)
- [JsObjects/JavaScript/NodeCode/Session02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/Session02)
- [JsObjects/JavaScript/NodeCode/Session03](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/Session03)
- [JsObjects/JavaScript/NodeCode/Session04](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/Session04)

Users
-----

When you sign in as a user, you can use the session object to track 
each individual user. You can use a database like redis or dbcouch
to store user's progress.

See NodeCode/Session03 or NodeCode/Session04 to see working examples of
the code discussed in this section.

Be sure to include the session code from Express:

```
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
```

The addUser method responds to a click on a button. It retrieves the 
**userName** that the user typed in to our client side HTML.

```
app.post('/addUser', function(req, res) {
    console.log('/addUser called.')
    console.log(req.body);
    req.session.userName = req.body.userName;
    res.send({'Result': JSON.stringify(req.session)});
});
```

When you call up a particular page, the program first tracks the page
you selected in the session object, and then uses handlebars to display
an HTML file designed to mirror back information about your session.
The handlebars code is encapsulated in an object called SessionHelper:

	sessionHelp = require('./Library/SessionHelper')

We pass in the request object to the SessionHelper, and it uses that
object to retrieve the data that we need to help us track an individual
session, or an individual user:

```
    var mainFile = readHtml('./Templates/SessionInfo.html');

    var template = handlebars.compile(mainFile);

    var result = template({
        pageName: '2',
        userName: request.session.userName,
        previousPage: request.session.lastPage,
        cookieId : request.id,
        sessionId: request.sessionID      
    });
```        

Cookies
-------

A cookie is small file stored on the client side by the browser containing
information sent from the server. The usual purpose of a cookie is to enable
a site to store information about a user. This information can:

- Help authenticate a user
- Track information throughout a session that is associated with a user. 
- Help personalize a web site
- Track the sites visited by a user

Cookies contain a maximum of:

- 255 characters 
- 4K of disk space

All cookies must have:

- A name
- And a value

They can also have:

- A path 
- An expiration date
- A domain name
- A connection type

If you are at a site, and want to know what cookies it is tracking, paste the
following into address bar:

JavaScript:alert(document.cookie); 

Get Command Line Arguments in Node
----------------------------------

Command line arguments are kept in an array called argv:

	process.argv
	
Suppose you run the following:

	node server.js bar
	
Bar will be process.argv[2]

Express from Scratch
--------------------

Here is the command to create an express application from scratch:

	express --sessions --css stylus myapp
	
Express and Jade
----------------

Take a look at new demo:

JsObjects/JavaScript/NodeCode/ExpressLink

One of the things you need to watch out for is that you don't name two HTML files with the same name. If you Jade template is called index.jade, then don't put a static file called index.html in public. Instead, call it something else like Main.html or Game.html.

Remeber to put your route in app.js and routes/index.js. Here is app.js:

```
app.get('/page02', routes.page02);
```

And here is routes/index.js:

```
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.page02 = function(req, res){
  res.render('page02', { title: 'Page02' });
};
```

And here is layout.jade:

```
doctype 5
html
	head
	title= title
	link(rel='stylesheet', href='/stylesheets/style.css')

	nav
		ul
			li
				a(href='/') Home
			li
				a(href='/page02') Page02
			li
				a(href='/main.html') Main

body
	block content
```


Turn off the Bell in Linux
--------------------------

Linux terminals can sometimes emit an annoying beep which can lead to
familial discord. To fix it, edit or a create a file .inputrc in your
home directory. Add the following line to the file:

	set bell-style visible

Now your terminal will blink, rather than beep. One imagines that there
must be a **set bell-style none** command as well, but I have not tried
it.

- <http://superuser.com/questions/15770/what-is-the-best-way-to-turn-off-the-ubuntu-beep-permanently/15779#15779>
- <http://www.tldp.org/HOWTO/Visual-Bell-8.html>
 
