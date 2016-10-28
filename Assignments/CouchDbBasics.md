## Overview

This is a simple assignment outlined in the [Insert][#insert] section. To help you get up to speed with CouchDb, I first include some demos and a few notes on Databases.

## Demos

There are several useful Demos in **JsObjects/Data**. Look especially at:

- CouchApp06: Look in the \_attachments directory
- CouchDb03: Using the **request** library
- CouchDb04: Using the **nano** library
- CouchDb05: This is a **hello world** of sorts for couchdb
- CouchDb08: ???

## Databases

We are going to be working mostly with NoSQL database. Relational databases are great, of course, but you have seen them in other courses. An important
part of the cloud ecology is built around NoSQL databases.

- <http://nosql-database.org/>
- <https://en.wikipedia.org/wiki/NoSQL>

NoSQL databases are:

* non-relational.
* distributed
* able to handle huge amounts of data (big data)

An example of Big Data is the Large Hadron Collider, which stores 10 PetaBytes of data per year in CouchDb. Twitter uses both MySQL and NoSQL. They brought in a NoSQL solution based on Hadoop because their users generate about 4 PetaBytes of data year. Their solution uses Pig, Hbase and FlockDb, all of which run on top of Hadoop.

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

Each technology shines in particular settings. Both can scale to huge amounts of data. Both can be very fast in certain settings. There are times when you
want to use SQL, and times when you might find a NoSQL database more efficient. It is beyond the scope of this class, and my scope as a teacher, to give you hard and fast rules on these subjects.

For now, our reason for using NoSQL look something like this:

* We need to be aware of all the important solutions used in the cloud.
* NoSQL has broad adoption in the cloud
* In some use cases, NoSQL is a better choice than SQL

## CouchDb

The CouchDb material has moved here:

<http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html>

## Insert Data {#insert}

Copy the **JsObjects/Data/CouchDb04** assignment to your repo as **Week03-CouchDbDemo** and get it to run.

Modify the program so that it inserts multiple lines into a single document:

```javascript
prog.insert({"doc": [
	{ "firstName": "Suzie", "lastName": "Higgins"},
	{ "firstName": "Harry", "lastName": "Potter"},
	{ "firstName": "Lisa", "lastName": "Smith"}
]}, .. ETC ),
```

## Turn it in

Put your work in your repository and push it. Turn in the assignment.

Make sure:

- The database name is **bc_data**
- the document name is **bigNames**
- The folder has the correct name as quoted at the beginning of this section.

Take two screen shots and attach them to your assignment when you turn them in.

- One of the CouchDb04 demo running in your bash shell
- One of Futon after you have inserted data with **CouchDb04**. Click in far enough to show all the data.

## Sub IP

This script will help you change your IP:

```text
sed -i "s/http:\/\/[0-9].*[^:5984]*.[^\);]/http:\/\/192.168.2.19:5984'/g" $1
```

Save it as **~/bin/new-ip**. Make it executable: **chmod +x new-ip**. Call it like this:

<pre>
new-ip <my-program.js>
</pre>

Change the IP in the script to the value you want.

## Check Work

Check that the data was created correctly without Futon

<pre>
curl -X GET http://192.168.2.19:5984/bc_data/bigNames | python -m json.tool
</pre>
