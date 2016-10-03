## Overview

Key Demos:

There are mostly in JsObjects\Data. Look especially at:

- CouchApp06: Look in the \_attachments directory
- CouchDb03: Using the **request** library
- CouchDb04: Using the **nano** library
- CouchDb05: This is a **hello world** of sorts for couchdb
- CouchDb08: ???

## Databases

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

## CouchDb

The CouchDb material has moved here:

<http://www.elvenware.com/charlie/development/database/NoSql/CouchDb.html>

## Turn it in

Copy the CouchDb04 assignment to your repo as **Week03-CouchDbDemo** and get it to run. Push you work to the cloud.

Take two screen shots and attach them to your assignment when you turn them in.

- One of the CouchDb04 demo running in your bash shell
- One of Futon after you have inserted data with **CouchDb04**. Click in far enough to show all the data.
