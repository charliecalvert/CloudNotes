Prog 272 Week 06, 2013
======================

This week we want to focus on:

- [Modular Pattern](http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html)
- Express routes
- Node Modules (require)
- Markdown
- Storing Markdown in MongoDB
- jQuery selectors


Yeoman
-----

[Yeoman](http://yeoman.io/) is a way out of control that will automatically
create a web application for you, and set up grunt and bower.

You need to install [Ruby](https://www.ruby-lang.org/en/installation/). 

Now you are ready to build your app:

	gem install compass
	npm install -g yo
	npm install -g generator-webapp
	mkdir MyApp
	yo webapp
	bower install underscore
	grunt
	
When you are done, CD into the dist directory and open index.html in
a browser.

Programs to look At
-------------------

For parsing HTML

- [DocParse01](https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/DocParse01)
- [DocParse02](https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/DocParse02)

For working with modules:

- [NodeModules](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeModules)
- [NodeRoutes01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes01)
- [NodeRoutes02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes02)

For working with Routes:

- [NodeRoutes01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes01)
- [NodeRoutes02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes02)

Globals
-------

    function foo() {
      var number01 = 0;
      number02 = 0; 
    }


In this example, number01 is not a global variable, but number02 is global. That
is, it is part of window: window.number02.

JSHint is designed to help you catch problems like this, particularly if you
turn on strict mode. In fact, in strict mode, many browsers will through a
ReferenceError if number02 is not defined.

Module Pattern
--------------

The module pattern pattern

-   The book analogy
-   When writing code, structure is even more important than when creating a
    book. Code is harder to understand than text.

More on functions, methods and constructors.

More on passing functions as a parameter.  

Global Abatement
----------------

    var MyApp = {};
    MyApp.InitCordova = (function() { } )();
    MyApp.ShowDirectories = (function() { } )();

There are also tools like AMD modules used with RequireJS or Dojo. We are not
going to cover them in this part of this course.

MongoDb Notes
------------

If you try to start MongoDB, and find that it won't start, or at least won't stay running after it starts, the problem could be that you are out of disk space. MongoDB wants lots of diskspace, something like 3.5 GB. You can, however, request that it use less disk space by putting **smallfiles = true** at the end of **/etc/mongodb.conf**. Now your database will be limited in size in half a gig, but that should be plenty for our needs.

You can access at least a few minimal facts about your running instance of MongoDb in a broswer by going to this address:

- <http://localhost:28017/>

**Mongo** is the command line utility you can use to query your MongoDB collections and to maintain your database. Start **mongo** by typing **mongo** at the command line.

When in mongo, type help to get a list of things you can do:


	db.help()                    help on db methods
	db.mycoll.help()             help on collection methods
	sh.help()                    sharding helpers
	rs.help()                    replica set helpers
	help admin                   administrative help
	help connect                 connecting to a db help
	help keys                    key shortcuts
	help misc                    misc things to know
	help mr                      mapreduce

	show dbs                     show database names
	show collections             show collections in current database
	show users                   show users in current database
	show profile                 show most recent system.profile entries with time >= 1ms
	show logs                    show the accessible logger names
	show log [name]              prints out the last segment of log in memory, 'global' is default
	use <db_name>                set current database
	db.foo.find()                list objects in collection foo
	db.foo.find( { a : 1 } )     list objects in foo where a == 1
	it                           result of the last line evaluated; use to further iterate
	DBQuery.shellBatchSize = x   set default number of items to display on shell
	exit                         quit the mongo shell
	
	
Try, for instance, db.help():

	DB methods:
	db.addUser(userDocument)
	db.adminCommand(nameOrDocument) - switches to 'admin' db, and runs command [ just calls db.runCommand(...) ]
	db.auth(username, password)
	db.cloneDatabase(fromhost)
	db.commandHelp(name) returns the help for the command
	db.copyDatabase(fromdb, todb, fromhost)
	db.createCollection(name, { size : ..., capped : ..., max : ... } )
	db.currentOp() displays currently executing operations in the db
	db.dropDatabase()
	db.eval(func, args) run code server-side
	db.fsyncLock() flush data to disk and lock server for backups
	db.fsyncUnlock() unlocks server following a db.fsyncLock()
	db.getCollection(cname) same as db['cname'] or db.cname
	db.getCollectionNames()
	db.getLastError() - just returns the err msg string
	db.getLastErrorObj() - return full status object
	db.getMongo() get the server connection object
	db.getMongo().setSlaveOk() allow queries on a replication slave server
	db.getName()
	db.getPrevError()
	db.getProfilingLevel() - deprecated
	db.getProfilingStatus() - returns if profiling is on and slow threshold
	db.getReplicationInfo()
	db.getSiblingDB(name) get the db at the same server as this one
	db.hostInfo() get details about the server's host
	db.isMaster() check replica primary status
	db.killOp(opid) kills the current operation in the db
	db.listCommands() lists all the db commands
	db.loadServerScripts() loads all the scripts in db.system.js
	db.logout()
	db.printCollectionStats()
	db.printReplicationInfo()
	db.printShardingStatus()
	db.printSlaveReplicationInfo()
	db.removeUser(username)
	db.repairDatabase()
	db.resetError()
	db.runCommand(cmdObj) run a database command.  if cmdObj is a string, turns it into { cmdObj : 1 }
	db.serverStatus()
	db.setProfilingLevel(level,<slowms>) 0=off 1=slow 2=all
	db.setVerboseShell(flag) display extra information in shell output
	db.shutdownServer()
	db.stats()
	db.version() current version of the server



Notes
-----

Reply in conversations in the appropriate assignment, not just as a general
comment.

It's JavaScript first, jQuery second. jQuery is a library built on top of
JavaScript. No matter how good the library, it is the language that is primary.

Working with Input and Select Controls
--------------------------------------

-   <http://localhost:1835/charlie/development/web/HtmlGuide/GettingStarted.html#input>
-   <http://localhost:1835/charlie/development/web/HtmlGuide/GettingStarted.html#select>

Variable Declarations
---------------------

Regardless of where you declare a var statement, it will be moved by the
compiler to the top of the method (or scope) in which it is declared:

    function run() {    
        var x = 0;    
        x = 2 + 3;    
        var firstName = "Tom";    
        var lastName = "Fielding";
    }

The var statements are hoisted, and this becomes:

    function run() {   
        var x = 0;   
        var firstName;   
        var lastName;
        x = 2 + 3;
    }




Separate HTML, CSS and JavaScript
---------------------------------

Reasons:

-  Separation of concerns
-  Loose coupling

If you have a JavaScript error, you want to know that the problem is in a
JavaScript file. It is simply confusing to have to look through all your code,
HTML, CSS, and JavaScript to find the error. The same rule applies to CSS and
HTML problems.

Keep HTML in HTML files and you will know where to look for solutions. This
means that we like writing code like this:

    \$("#test01").addClass("green");

But we don't really like this:

    \$("#test01).css( { backgroundColor: "blue" } );

If you write code like this, you are putting JavaScript in your HTML:

    \<button id="myButton01" onclick="myObject.runButton01()"\>Click Me
    01\</button\>

Instead, it is better to put code like this in your JavaScript file:

    \$("#myButton01").click(myObject.runButton01);


More on ADB
-----------

We generally use ADB to connect to our AndroidX86 instances:

	adb connect 192.168.XX.XX
	
However, you can use ADB for a lot more than just establishing a 
connection. For instance, ou can install a compiled Android program 
(an APK), you can copy files to your device, and start a shell session
on the device. That is like opening the commannd prompt on the
device, but you can do it from the Windows command prompt. For more
details, see here:

- <http://www.elvenware.com/charlie/development/android/AndroidSdk.html#installAPK>


Install Linux
-------------

Just a reminder that there is some information here on installing Linux. 
This is just an fyi, just information that you might find useful:

-   <http://www.elvenware.com/charlie/os/linux/VirtualBox.html#server1210Install>

Links
-----

Nothing you have to do here, these are just links you might be interested
in seeing:

- [CodeProject Web Mailing](http://www.codeproject.com/script/Mailouts/View.aspx?mlid=10668&_z=1516867)


> Written in part with [StackEdit](https://stackedit.io/).
