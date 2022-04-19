---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week08.md
relativePath: Prog282/Week08.md
title: Week08
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week08.md
fileNameHTML: Week08.html
---


<!-- toc -->
<!-- tocstop -->

Week 08
=======

We should start placing app.get calls (the routes) in routes/index.js as router.get

We should start putting document.ready INSIDE our calls require in Main.js. 

See attached, including my solution so you can see it all working together.

- Put your routes in /routes/index.js
- Be sure you include documentready or DomReady in require

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

##Github Pages

Set up your github pages as described here:

- [GitHub Pages](https://pages.github.com/)
- create a repository called: **username**.github.io
- Example [http://**charliecalvert**.github.io/](http://charliecalvert.github.io/)
- Clone the repository: git clone git@github.com:**username**/**username**.github.io.git
- Create an index.html page and push it:

```
<!DOCTYPE html>

<html>
    <head>
        <title>Charlie on Github</title>
    </head>
    <body>
        <h1>Charlie on Github</h1>
        <p>Let's get started</p>
    </body>
</html>
```

You will have to wait a few minutes until your site comes up.




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

```
apt-get install sqlite3
apt-get install libsqlite3-dev
npm install sqlite3
```

How to create a table:

```
CREATE TABLE people(
   varchar(30) primary key,
   firstName text,
   lastName text,
   age integer
);
```

Collisions
----------

Here is one way to detect a collision with an NPC. It assumes that
npcs is a two dimensional array containing 0 for no NPC and any other
number is an NPC.

```
	var detectCollision = function(playerX, playerY) {
		var npcNumber = npcs[playerY][playerX];
		if (npcNumber !== 0) {
			$("#npc").html("Found an npc with number: " + npcNumber);
		}
	}
```

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


Constants
---------

JsObjects/JavaScript/Properties/Constants01


Git Merge
---------

- <http://elvenware.com/charlie/development/cloud/Git.html#merging-code>

Web Performance
---------------

Here's a nice link:

<http://calendar.perfplanet.com/2012/>
