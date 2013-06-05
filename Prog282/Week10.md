Week 10
=======

We have three classes left, 6/3, 6/5, 6/10.

Main Topics discussed this week include:

* More on CouchDb and maybe CouchApp/Erica
* Sessions
* Redis

Key Demos:

- [JsObjects/Data/CouchSession01](https://github.com/charliecalvert/JsObjects/tree/master/Data/CouchSession01)
- [JsObjects/Data/CouchSession02](https://github.com/charliecalvert/JsObjects/tree/master/Data/CouchSession02)

Note that NodeJs is now up to v0.10.9.

CouchDb Attach Example
----------------------

You can find it here: 

	JsObjects/Data/CouchUtils/CouchAttach01
	
Pass in the document name you want to use in couchDb and the name of the 
document you want send to couchDb. For example:

	node CouchAttach.js index index.html

Redis
-----

[Redis](http://redis.io/) is a NoSql database that stores sets, lists 
and numbers. It includes a nice [tutorial](http://try.redis.io/) and 
[documentation](http://redis.io/documentation).

On Windows, we can [download](https://github.com/MSOpenTech/redis) the
unofficial Windows build of Redis like this:

-  git clone git://github.com/MSOpenTech/redis.git

After the download, look in the **bin** directory and unzip the 64 bit
binaries.

On Linux, first make sure you have gcc and make installed:

~~~~
	gcc -v
	make -v 
~~~~

The above should produce lengthy, but reasonable output. If you see
errors, then you need to install [these tools](https://help.ubuntu.com/community/InstallingCompilers):

~~~~
	sudo apt-get install build-essential
~~~~

You can then use the following script to install redis:

~~~~
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
~~~~

I have placed this script in JsObjects/Utilities/InstallScripts.


After installing redis, you probably have a copy of the redis tar 
file and a directory containing the stable version of redis right
in the middle of your JsObjects repository. If that is the case, move
the stable directory to some other location:

mv redis-stable ~/.

Then cd into redis-stable and run the test:

~~~~
cd ~/redis-stable
./runtest
~~~~

If necessary, also install tcl:

~~~~
sudo apt-get install tcl
~~~~

To run the server, type: 

~~~~
src/redis-server
~~~~

If you are working on AWS, you might want to open two Putty windows,
one for running redis, and another for running your application.

There is also a redis client:

~~~~
src/redis-cli 
~~~~

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

~~~~
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
~~~~

The addUser method responds to a click on a button. It retrieves the 
**userName** that the user typed in to our client side HTML.

~~~~
app.post('/addUser', function(req, res) {
    console.log('/addUser called.')
    console.log(req.body);
    req.session.userName = req.body.userName;
    res.send({'Result': JSON.stringify(req.session)});
});
~~~~

When you call up a particular page, the program first tracks the page
you selected in the session object, and then uses handlebars to display
an HTML file designed to mirror back information about your session.
The handlebars code is encapsulated in an object called SessionHelper:

	sessionHelp = require('./Library/SessionHelper')

We pass in the request object to the SessionHelper, and it uses that
object to retrieve the data that we need to help us track an individual
session, or an individual user:

~~~~
    var mainFile = readHtml('./Templates/SessionInfo.html');

    var template = handlebars.compile(mainFile);

    var result = template({
        pageName: '2',
        userName: request.session.userName,
        previousPage: request.session.lastPage,
        cookieId : request.id,
        sessionId: request.sessionID      
    });
~~~~        

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

Get Command Line Arguments in Node
----------------------------------

Command line arguments are kept in an array called argv:

	process.argv
	
Suppose you run the following:

	node server.js bar
	
Bar will be process.argv[2]



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
 
