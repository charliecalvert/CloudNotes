Week07
======

The assignment for Week 7 is [here](http://www.elvenware.com/charlie/books/CloudNotes/Prog282/Week07-Assignment.html)

Main Topics 
===========

- Databases - CouchDb
- VirtualBox
- Two Grids (Background and NPCs - GridCanvas04
- Finding an NPC

Key Demos:

There are mostly in JsObjects\Data. Look especially at:

- CouchDb08: This one is crucial.
- CouchApp06: Look in the _attachments directory
- CouchDb03: Using the **request** library
- CouchDb04: Using the **nano** library
- CouchDb05: This is a **hello world** of sorts for couchdb

Databases
---------

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

CouchDb
-------

The CouchDb material has moved here:

<http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html>

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


CouchApps
---------

- <http://couchapp.org/page/index>
- <http://couchapp.org/page/getting-started>
- <http://garden20.com/>

To Install CouchApp for use With Node

npm install -g couchapp

To install couchapp without Node: 

- <http://sourceforge.net/projects/pywin32/>
- <https://github.com/couchapp/couchapp/downloads>

When you are done, make sure couchapp.bat or couchapp.exe is on your path. If you installed
via Python (rather than the totally stand alone option), this might mean
you do add something like this to your path

	c:\Python27\Scripts

It will be the scripts directory that holds you couchapp.bat file.

SqlLite
-------

We probably won't be using SqlLite. If we use relational database this quarter,
it will probably be MySQL. But I did some research on SqlLite, and include it
here in case you are interested.

When downloading for Windows, look for the **Precompiled Binaries** and
look for the command line shell.

- <http://www.sqlite.org/>
- <http://www.sqlite.org/download.html>
- <http://www.sqlite.org/datatype3.html>

~~~~
apt-get install sqlite3
apt-get install libsqlite3-dev
npm install sqlite3
~~~~

How to create a table:

~~~~
CREATE TABLE people(
   varchar(30) primary key,
   firstName text,
   lastName text,
   age integer
);
~~~~


Free Graphics
-------------

- <http://opengameart.org/>
- <http://www.lostgarden.com/2006/07/more-free-game-graphics.html>
- <http://gamedev.stackexchange.com/questions/20/where-can-i-find-free-sprites-and-images>
- <http://www.cgtextures.com/>

Collisions
----------

Here is one way to detect a collision with an NPC. It assumes that
npcs is a two dimensional array containing 0 for no NPC and any other
number is an NPC.

~~~~
	var detectCollision = function(playerX, playerY) {
		var npcNumber = npcs[playerY][playerX];
		if (npcNumber !== 0) {
			$("#npc").html("Found an npc with number: " + npcNumber);
		}
	}
~~~~

VirtualBox
----------

The minimal cd, let's use the 32 bit 13.04 ringtail option.

<https://help.ubuntu.com/community/Installation/MinimalCD>
<http://archive.ubuntu.com/ubuntu/dists/raring/main/installer-i386/current/images/netboot/mini.iso>
<http://elvenware.com/charlie/os/linux/VirtualBox.html>
<http://elvenware.com/charlie/os/linux/VirtualBox.html#minimal>

When doing the install, you can follow the steps for minimal install, linked
above. Some quick reminders if you just need a few hints:

- At 1048 MB of Memory (2048 preferred)
- Create virtual hard drive now
- VDI, Dynamically allocated, 8 GB if you are short on disk space, else 16 GB.
- Settings | Storage | Add CD
- Network Bridged Adapter PCNet Fast III (If you are at school, see notes)

During the install:

- Guided, use entire disk.
- Just install Ubuntu Server and SSH Server.
- If you create other installs, then create an Ubuntu Desktop or Lubuntu desktop.

As soon as you have the puppy properly installed, then immediately make a 
VirtualBox appliance as a back up. Make more applianaces as needed, and name
them carefully.

I have generally found that it is not worth the effort to try to get two copies
of the same virtual appliance running at the same time. (Let me know if you find
a clean way to do this.) 

My suggestion is that you do a VBox Ubuntu install, make an appliance as a back
up, and get to work. Then some Saturday afternoon when nothing much is happening,
create a few more VBox Ubuntu installs. It might be nice to have four or five
of them around, assuming you have the hard drive space. Name them carefully.
<http://www.elvenware.com/charlie/development/cloud/virtualization.html>





Angular JS
----------

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



