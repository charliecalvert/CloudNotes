Week 08
=======

The Week 08 Assignment:

- <http://elvenware.com/charlie/books/CloudNotes/Prog282/Week08-Assignment.html>

Major Topics 
------------
	
- CouchDb, JSON and Attachments
- Nano: The API for talking from Node to CouchDb
- Design Document, Views and CouchDb
- HandleBars
- Ajax

One of the most important samples is JsObjects/HtmlCssJavaScript/UnitTestCouchDb01.

- <https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/UnitTestCouchDb01>

It shows how to read and write complex data from CouchDb. Right now,
despite what I said on Wednesday, I'm not using QueryString in most 
cases.
	
Important Links
---------------

- [Elvenware CouchDb](http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html)
- [Elvenware Node](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html)
- [Elvenware jQuery](http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html)
- [Elvenware JavaScript](http://www.elvenware.com/charlie/development/web/JavaScript/Basics.html)
- [The Nano API](https://github.com/dscape/nano)
- [CouchDb](http://couchdb.apache.org/)
- [HandleBars](http://handlebarsjs.com/)

Here is a core topic you are likely to wrestle with:

- [Insert JSON into CouchDb](http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html#error-document-update-conflict)

The assignment for Week 7 is [here](http://www.elvenware.com/charlie/books/CloudNotes/Prog282/Week07-Assignment.html)

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


CouchDb Attachments
-------------------

We often want to add attachments such as an HTML document or image file
to our CouchDb database.

<http://wiki.apache.org/couchdb/HTTP_Document_API#Attachments>

~~~~
app.get("/attachHtml", function(request, response) {'use strict';
   console.log('/attachHtml called');
   
   var fs = require('fs');

    fs.readFile(__dirname + '/Templates/Basic.html', function(err, data) {
        if (!err) {
            var prog = nano.db.use(dbName);
            prog.attachment.insert('basic', 'basic.html', data, 'text/html',
                function(err1, body) {
                if (!err1) {
                    console.log(body);
                } else {
                    console.log(err1);
                    response.send(500, err1);
                }
            });
        } else {
            console.log(err);
            response.send(500, err);
        }
    }); 
});
~~~~

Sending Back Express and Nano Errors
-----------------------------------

Send a 500 (Internal Server Error) HTTP Error code:

~~~~
	function(err, body) {
        if (!err) {
            console.log(body);
            response.send(body);
        } else {
            var cscMessage = "No such record as: " + request.query.docName +
                ". Use a the Get Doc Names button to find " +
                "the name of an existing document."
            err.p282special = cscMessage;
        	response.send(500, err);
        }
    }
~~~~

All that needs to be done is send the error code as the first parameter
to response.send:

	response.send(500, err);
	
Here is more information on HTTP code. As you can see, some are error
codes, some -- such as 200 -- signify success. Your code (and many other
tools) can decide what to do with an HTTP message depending on the 
code that is send with it:



Note also that I am adding a special field onto the error message. This
allows me to send back custom error messages along with any details
generated by the Nano error message system.

One the client side we do this:

~~~~
	var create = function() {
        $.ajax({
            type : 'GET',
            url : '/create',
            dataType : 'json',
            success : function(data) {
                showDebug(data.Result);
            },
            error : showNanoError
        });
    };

    var showNanoError = function(request, ajaxOptions, thrownError) {
        var responseText = JSON.parse(request.responseText);
        if (typeof responseText.p282special !== 'undefined') {
            showDebug(responseText.p282special);
        }
        showDebug(responseText.message);
        showError(request, ajaxOptions, thrownError);
    };
~~~~

Notice that I have create a special error handler for this kind of
message. By sending back a 500 HTTP Error Code we ensure that our
error handler will be called. The **showNanoError** has special 
processing for Nano messages, then we pass the whole error onto our
regular Prog282 error handler. As you recall, it looks like this:

~~~~
    var showError = function(request, ajaxOptions, thrownError) {
        showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
        showDebug(request.status);
        showDebug(request.statusText);
        showDebug(request.getAllResponseHeaders());
        showDebug(request.responseText);
    };
~~~~

Clear there are ways to streamline this process, but even if it is 
overkill, it is nonetheless likely to give you good error support during
the development process.

Constants
---------

JsObjects/JavaScript/Properties/Constants01

CouchApp Pages
--------------

http://couchapp.org/page/pages-install
https://github.com/couchapp/couchapp

ez_setup.py
distribute_setup.py
set VS90COMNTOOLS=%VS110COMNTOOLS%
python-2.7.5.msi
pywin32-218.win32-py2.7.exe
py2exe-0.6.9.win32-py2.7.exe

couchapp init  
couchapp push . http://localhost:5984/pages

Erica
----

Here:

	<http://elvenware.com/charlie/development/database/NoSql/CouchDb.html#erica>

Git Merge
---------

- <http://elvenware.com/charlie/development/cloud/Git.html#merging-code>

Web Performance
---------------

Here's a nice link:

<http://calendar.perfplanet.com/2012/>
