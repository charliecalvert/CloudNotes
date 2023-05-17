---
layout: post
date: 2023-05-10 04:39:14 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/NoSql/MongoDb.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/NoSql
fileName: MongoDb.md
relativePath: /database/NoSql/MongoDb.md
title: MongoDb
directoryName: NoSql
category: nosql-guide
---

# MongoDb

MongoDb is no-sql database.

- [MongoDb home page](http://www.mongodb.org/)
- [Free (for small deployments) online MongoDatabase](https://mongolab.com/welcome/).


## Install

The simplest course is to run this script:

- A bash script for MongoDb from [/JsObjects/Utilities][jsutils] called [InstallMongoDb][installMongo]:

Before getting started, there are two facts you should know:

- Ubuntu and MongoDb only work together to update MongoDb for LTS versions of Ubuntu and Lubuntu.
- Ubuntu and Lubuntu have built in versions of MongoDb, but they are not necessarily the latest, and they "conflict with" the latest vertion.
- Below I explain how to install the latest.

At this time, the latest LTS version of Ubuntu that is targeted by MongoDb is 16.04.

This means the official Ubuntu release of MongoDb is 2.6, which is from April 2014. Why is the Ubuntu version of MongoDb so old? Because Ubuntu releases LTS versions every two years, and at the time of this writing it has been about two years since the last LTS release for which there is a MongoDb release. (More specifically, the last LTS version was 14.04. The new 16.04 release is out, but the MongoDb apt install script has still not been updated.)

To get a new version of MongoDb on Ubuntu, there needs to be:

- A new version of Ubuntu
- A new or recent version of MongoDb
- An apt install script for both that is in good working order.

Right now those three things have not come into alignment. Hopefully they will soon. But for now, we have to live with our current situation.

Despite the annoyance, if all you are trying to do is learn MongoDb, it really doesn't matter that you have an older release. The commands are identical or very similar to those on the new release. Furthermore, you don't really need the latest unless you are trying to serve data to a huge number of users on a busy site. That is unlikely to be the case if you are just learning MongoDb. As a result, I don't advise wasting time trying to install the latest. Just live with the older version until the APT script is updated. In the meantime you can simply install MongoDb with this command:

<pre>
sudo apt-get install mongodb
</pre>

Some additional information:

- [Linux: Follow these instructions](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
- [Windows: Follow these instructions][mongo-install]
- [Mongo on Elvenware](http://elvenware.com/charlie/development/database/NoSql/MongoDb.html)

[mongo-install]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/?_ga=1.145962999.279933697.1429292287

On Ubuntu 16.04 use these techniques

	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
	echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
	sudo apt-get update
	sudo apt-get install -y mongodb-org

The above is soured here:

- [MongoDb Docs](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/")
- [Digital Ocean article][do-mongo-16-04]:

Then create a file called **/etc/systemd/system/mongodb.service**. This file will likely need to be replaced when official 16.04 MongoDb binaries are released. One way to create the file is with your favorite text editor, such as geany or nano. To create the file, you will need to be in sudo mode. You should therefore issue a command like this:

<pre>
sudo nano /etc/systemd/system/mongodb.service
</pre>

And here is the text that should be pasted into the file:

<pre>
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target
Documentation=https://docs.mongodb.org/manual

[Service]
User=mongodb
Group=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
</pre>

Now start the service and ensure that is restarted each time you boot up:

<pre>
sudo systemctl start mongodb
sudo systemctl enable mongodb
</pre>

Again, the simplest way to do all this is with the script mentioned at the start of this section. See also this script, to eliminate warnings:

- [Huge Page Fix][huge-page-fix]

[huge-page-fix]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/InstallScripts/HugePageFix

## Authenticate

When you start the **mongo** cli, you might get a warning about security. If you want better security, there are three steps you must take.

In the database, create two users. Type **mongo** to start the shell. Then do something like this:

```sql
use admin
db.createUser(
  {
    user: "administrator",
    pwd: "foobar",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
db.createUser(
  {
    user: "charlie",
    pwd: "foobar",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

Type **exit** to quit the shell.

Edit **/etc/mongod.conf**. To do this, you probably want to use one of these commands, where the first is simplest:

	sudo nano /etc/mongod.conf
	sudo vim /etc/mongod.conf

Add **authorization: enabled**, by first uncommenting the security section (remove the # symbol). It looks like this:

	security:
  	authorization: enabled

Now restart and check the status:

	sudo service mongod restart
  sudo service mongod status

Example connection strings, where the second involves connecting remotely as explained further down:

```
mongo -u "charlie" -p "foobar" --authenticationDatabase "admin"
mongo 192.168.2.18:27017 -u "charlie" -p "foobar" --authenticationDatabase "admin"
```

You probably need to explicitly allow connections from machines other than local host. The syntax to add to **/etc/mongod.conf** for letting in one other machine:

```
# network interfaces
net:
  port: 27017
  bindIp: [127.0.0.1, 192.168.2.5]
```

Some preliminary testing shows that wildcards might work: **192.168.2.\***

For letting in them all use this IP: **0.0.0.0**. Don't ever do that on a public server. It's a form of **financial suicide**.

## Trouble Shoot

If you are working in Pristine Lubuntu, you may get an error starting MongoDb due to a lack of space. One possible solution would be to use the cloud 9 commands with a variation on the --bind_ip in the third line:

```
cd
mkdir data
echo 'mongod --bind_ip=127.0.0.1 --dbpath=data --nojournal --rest "$@"' > ~/mongod
chmod a+x ~/mongod
./mongod
```

On Cloud 9, we set the bind_ip to $IP, but here we set it to local host.


## Uninstall

The following commands should remove mongodb from your system:

<pre>
sudo apt-get purge mongodb-org  <= TRY THIS
sudo apt-get purge mongodb      <= OR TRY THIS
sudo apt-get autoremove
</pre>

You should also remove mongodb.list if it exists:

<pre>
sudo rm /etc/apt/sources.list.d/mongodb.list
</pre>

## Older Versions of Ubuntu

Older install script for previous versions of ubuntu such as 15.04:

	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
	echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
	sudo apt-get update
	sudo apt-get install mongodb-org

The second line above should be typed as one line, so just run JsObjects script or block copy the above and paste it into the command line. Note, however, that the second line has two parts:

    PART01: 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen'
    PART02: sudo tee /etc/apt/sources.list.d/mongodb.list

When you paste in the whole line, you are, in effect, running two commands separated by the [pipe symbol][pipe]. In pseudo code, it looks like this:

    echo PART01 | PART02  // Don't actually run this

But don't try to paste that in, paste in the line from the script. The above pseudo command is just an attempt to explain what the second line in the script does. It is not a valid method of running the second line.

There is an alternative method, but it is not recommended, as it probably won't install the latest MongoDb. Nevertheless, it could work. So if the above fails, you could try:

	sudo apt-get install mongodb  // Only do this if the above fails

## Install on Cloud 9

MongoDb is preinstalled on Cloud 9. To set it up do this:

<pre>
cd
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > ~/mongod
chmod a+x ~/mongod
mongod
</pre>

I got the above here:

- <https://community.c9.io/t/setting-up-mongodb/1717>

Then to view the database:

	mongo

Here is a typical URL for accessing a database:

```javascript
"mongodb://0.0.0.0:27017/test",
```

And here is what a **MongoTalk.json** configuration file might look like:

```javascript
{
    "urls": [
        "mongodb://0.0.0.0:27017/test",
        "mongodb://127.0.0.1:27017/test",
        "mongodb://USERNAME:PASSWORD@dsXXX.mongolab.som:XXXX/DATABASE"
    ],
    "selectedUrl": 0
}
```


## Install the NPM Package

If the **package.json** file for your project does not already include [mongodb][1], use **npm** to install the Node **mongodb** driver into your local project:

	sudo npm install mongodb

[pipe]: http://stackoverflow.com/questions/12400371/what-does-means-in-terminal
[jsutils]:https://github.com/charliecalvert/JsObjects/tree/master/Utilities

## Start and Stop MongoDb {#stopStart}

I believe these are the commands for the recent versions of Ubuntu:

<pre>
	sudo systemctl start mongodb
	sudo systemctl stop mongodb
	sudo systemctl enable mongodb
</pre>

Use these commands to stop, to start and restart MongoDb on older versions of Ubuntu:

<pre>
	sudo service mongodb start
	sudo service mongodb stop
	sudo service mongodb restart
</pre>

To see if MongoDb is running, or to learn a bit about your instance, go
to this address:

- <http://localhost:28017/>

The key is that it is a port 1000 above the port you use to query
the database. The page you find will reveal at least a few minimal
facts about your running instance of MongoDb.

On recent versions of MongoDb **http://localhost:28017/** won't work unless you add this to **/etc/mongod.conf** and then restart mongodb:

```
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1
  http.enabled: true
  http.RESTInterfaceEnabled: true
```

## Sample Session

You can view the content on your MongoDb server without writing any code. First you need to start the mongo client:

    $ mongo
    MongoDB shell version: 2.6.1
    connecting to: test

To quit the shell, you type **exit** and press return. But let's not do that quite yet. Instead you might want to see the databases on your instance of MongoDb:

    > show dbs
    admin  (empty)
    bar    (empty)
    local  0.078GB
    test   0.078GB

Select or create one of the databases:

    > use test
    switched to db test

**NOTE**: _The command **use foo** will switch the user to the **foo** database. If **foo** does not exist, it will create it and then switch to it._

Instead of tables, MongoDb has collections. Show the collections in the database.

    > show collections
    finalWalk
    system.indexes
    testData
    test_insert

Insert data into a collection called **test01**. The collection will be created if it does not exist:

<pre>
db.test01.insert({firstName: "Susan"})
WriteResult({ "nInserted" : 1 })
</pre>

A somewhat more complex example is shown here:

<pre>
db.test02.insert({  
   "firstName": "Abe10001",
   "lastName": "Lincoln10001",
   "address": "10001 Green Street",
   "city": "Bellevue",
   "state": "WA",
   "zip": 98002
})
</pre>

Note that we are inserting into a collection called test02. When you paste in the above, the output should look like this:

<pre>
    >  db.test02.insert({  
    ...   "firstName": "Abe10001",
    ...   "lastName": "Lincoln10001",
    ...   "address": "10001 Green Street",
    ...   "city": "Bellevue",
    ...   "state": "WA",
    ...   "zip": 98002
    ... })
</pre>

Use **find** to see the contents of **test02**:


```
    > db.test02.find()    
    {
        "_id": ObjectId("537a6ba7ceccfa98291d56dd"),
        "firstName": "Abe10001",
        "lastName": "Lincoln10001",
        "address": "10001 Green Street",
        "city": "Bellevue",
        "state": "WA",
        "zip": 98002
    }
    etc...
    >
```

By default, you can can insert nearly any valid JSON into your tables. This means we could insert the data we inserted into **test01** into **test02** or vice versa. Though the JSON has a different structure, it will not cause problems. For instance:

<pre>
db.test02.insert({longshot: "RubyFind"})

> db.test02.find()
{ "\_id" : ObjectId("5754550586f9d37ae11eb9cd"), "firstName" : "Abe10001", "lastName" : "Lincoln10001", "address" : "10001 Green Street", "city" : "Bellevue", "state" : "WA", "zip" : 98002 }
{ "\_id" : ObjectId("5754568286f9d37ae11eb9ce"), "longshot" : "RubyFind" }
</pre>

As you can see, the first and second objects have very different structures, yet they both co-exist in the collection. This behavior is, of course, very different from what we see in a SQL database.

You can ask to **project** only certain fields. The following projection asks not to see the \_id field, which is displayed by default, and to see the firstName and lastName fields. (What you see here assumes that additional rows have been inserted):


    > db.test02.find({}, {"\_id": 0, firstName: 1, "lastName": 1});
    { "firstName" : "Abe10000", "lastName" : "Lincoln10000" }
    { "firstName" : "Abe10001", "lastName" : "Lincoln10001" }
    { "firstName" : "Abe10002", "lastName" : "Lincoln10002" }
    { "firstName" : "Abe10003", "lastName" : "Lincoln10003" }
    { "firstName" : "Abe10004", "lastName" : "Lincoln10004" }



This query asks to only the rows where firstName is equal to Abe0001.

    > db.test02.find({firstName: "Abe10001"}, {"\_id": 0, firstName: 1, "lastName": 1});
    { "firstName" : "Abe10001", "lastName" : "Lincoln10001" }
    >

Now let's delete all the records:

    > db.test02.remove({})
    WriteResult({ "nRemoved" : 5 })
    >

You can use the similar rules to those you used for **find** if you want to remove only specific records.

    > db.test_insert.remove({firstName: "Abe10003"})
    WriteResult({ "nRemoved" : 1 })
    >

## Mongo: Getting Help {#mongoHelp}

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

## Set up a MLab URL {#set-up-a-mongolab-url}

When you want to connect to MLab from your program, you need to compose the URL that let's you in.

- Sign in to MLab.
- Go to the MLab home page
- Click on your database to open it

Near the top of the page, on the left, you will see something like this:

    To connect using the shell:
        mongo dsXXXXXX.mongolab.com:XXXXX/Databasename -u <dbuser> -p <dbpassword>
    To connect using a driver via the standard URI (what's this?):
        mongodb://<dbuser>:<dbpassword>@dsXXXXXX.mongolab.com:XXXXX/DatabaseName

It is the second URL that you need.

**NOTE**: _The dbuser and dbpassword are not the user name and password that you use when you sign on to MongoLab. Instead, these are the database users and passwords for your database. It is an entirely separate user name and password that has nothing to do with your MongoLab account. It is the user for your MongoDb database, not for the site._

To create a database user, click on the USER tab and press **Add database user**.

![Database User](http://elvenware.com/charlie/books/CloudNotes/Images/MongoLabUser01.png)

## How to Connect to mLab or a Local Database {#how-to-connect}

Here is the **connect.js** file that handles the connection from mongoose to a MongoDb database. It supports both a local and remote mLab instance of MongoDb:

```javascript
/**
 * Created by charlie on 6/6/16.
 */

var mongoose = require('mongoose');

var connect = {

    connected: false,

    simpleConnect: function() {
        'use strict';
        console.log('Connecting with simple.');
        var url = 'mongodb://127.0.0.1:27017/renew';
        connect.connected = true;
        mongoose.connect(url);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    // mongodb://<dbuser>:<dbpassword>@ds049848.mlab.com:49848/elvenlab01
    mlabConnect: function() {
        'use strict';
        console.log('Connecting with mlab.');
        connect.connected = true;
        var userName = 'foobar';
        var password = 'foo';
        var siteAndPort = 'ds049848.mongolab.com:49848';
        var databaseName = 'elvenlab01';
        var url = 'mongodb://' + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;
        console.log(url);
        mongoose.connect(url);

        // This part is optional
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function(callback) {
            connect.connected = true;
            console.log('Opened connection to mongo');
        });
    },

    doConnection: function(useSimple) {
        'use strict';
        var connectType = useSimple || false;
        if (connectType) {
            connect.simpleConnect();
        } else {
            connect.mlabConnect();
        }
    }
};

module.exports = connect;

```

This code defaults to using mLab (MongoLab) unless you specify otherwise:

```javascript
var connectType = useSimple || false;
```

It also breaks out the various pieces of the mLab connection string into discreet variables so that you can more easily see how to create a valid URL:

```javascript
var userName = 'foobar';
var password = 'foo';
var siteAndPort = 'ds049848.mongolab.com:49848';
var databaseName = 'elvenlab01';
```

Note that the goal is to create a URL of this type:

<pre>
mongodb://<dbuser>:<dbpassword>@ds049848.mlab.com:49848/<dbname>
</pre>

Ultimately, you want to change nearly the entire URL, including the number in the **siteAndPort** portion. The following is not a valid URL, but it should help you see what you are trying to create:

<pre>
mongodb://myusername:mypassword@ds1111.mlab.com:11111/mydatabase
</pre>

Remember, you can use the example on the main page for your mLab database to see what the URL you want to create should look like. [Earlier in this text](#set-up-a-mongolab-url) I provide a [sample screen shot][mlab-user-image] of that page.

[mlab-user-image]:http://elvenware.com/charlie/books/CloudNotes/Images/MongoLabUser01.png

## Working with Mongo Data

We need to understand updating and deleting records in the database.

A general review of mongo DB.

Look at PeopleManager in CreateCharactor02

- Mongo is in factory
- People Manager is a factory
- Can be consumed by Controller or Jasmine Test

pkozlowski-opensource on github.

It is interesting to note that this a REST API, so you can simply
paste URLs into the address bar of your browser, or use them as
links on web pages:

- <https://api.mongolab.com/api/1/databases/YOUR_DATABASE/collections/YOUR_COLLECTION?apiKey=YOUR_API_KEY>

More info in the MongoDriver docs:

- <http://mongodb.github.io/node-mongodb-native/api-generated/db.html>

That's not a solution for a shipping app, but it is a good tool to
use when you are experimenting with a new technology.

I should add that posting your API key as a link on a public web
page is a very bad idea, but you can use it on private sites.

The best way to experiement with this technology is just to take the
URL and paste it into a the address field of the browser.

## Getting Started

Here is a simple node program that uses the modular pattern. It will
open up a MongoDb database and inserting a row of data into it:

```
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var QueryMongo = (function() {

	var url01 = 'mongodb://127.0.0.1:27017/test';
	var url02 = 'mongodb://192.168.2.19:27017/test';

	function QueryMongo() {

		// Open the test database that comes with MongoDb
		MongoClient.connect(url02, function(err, database) {
			if (err) {
				throw err;
			}

			insertCollection(database, 'test_insert', { f : 7 });

		});
	}

	var getCollection = function(database) {

		var collection = database.collection('test_insert');

		// Count documents in the collection
		collection.count(function(err, count) {
			console.log(format("count = %s", count));
		});

		// View the collection
		collection.find().toArray(function(err, results) {
			console.dir(results);
			database.close();
		});

	};

	// Will create collection if it does not exist
	var insertIntoCollection = function(db, collectionName, objectToInsert) {

		var collection = db.collection(collectionName);
		collection.insert(objectToInsert, function(err, docs) {
			getCollection(db);
		});
	};

	return QueryMongo;

})();

var q = new QueryMongo();
```

## Sort Order

This is common in NoSQL databases. I believe that by definition, they do not guarantee order. Not all NoSQL databases, but many of them.

Sarcasm alert: Here is MongoDbs careful, detailed, newbie friendly explanation:

- <https://docs.mongodb.com/manual/reference/method/cursor.sort/#return-natural-order>

This StackOverflow answer attempts to shed some light on the subject:

- <https://stackoverflow.com/a/33018164/253576>

This search is useful:

- <https://www.google.com/search?q=Mongodb+sort+order>

Here is a specific method:

- <https://docs.mongodb.com/manual/reference/method/cursor.sort/>

For this assignment, I will not be focused on sort order. I just want to see records, and to introduce you to NoSQL databases.

To put this in context, NoSQL databases, in their pursuit of the best possible performance, frequently strip out everything except the raw act of inserting and querying. Sorting takes time, so by default, it is not implemented. There are solutions, it is just that they are not the default. As stated earlier, it is not that NoSQL is better than SQL, or vice versa, it is that each has its own special virtues.

If you have to decide: Should I sort in the database, on the server, or on the client, you should:

- Prefer sorting in the database. Let MongoDB handle it. It has the most powerful machine and the most highly optimized routines.

- Second would be to sort in the CongressServer, which can also be quite fast since NodeJs is highly optimized code.

- Third would be to sort on the client since the browser is probably running on the least powerful machine.

I can think of exceptions, but these would be good general guidelines.

## Backup and Restore

Some useful commands.

Backup, first with and then without a password:

<pre>
mongodump --collection scientists --db test --username mongodevdb --password YourSecretPwd --out /dbbackup

mongodump --collection scientists --db test --out $HOME/Documents/Mongo
</pre>

Restore a specific collection:

<pre>
mongorestore --db elven --collection scientists /home/charlie/Documents/Mongo/test/scientists.bson
</pre>

Rename a collection. First switch to the **admin** database:

<pre>
use admin
db.runCommand( { renameCollection: "elven.scientiests", to: "elven.scientists" } )
</pre>

## MongoDb Won't Start {#noStart}

If you try to start MongoDB, and find that it won't start, or at
least won't stay running after it starts, the problem could be that
you are out of disk space. MongoDB wants lots of diskspace,
something like 3.5 GB. You can, however, request that it use less
disk space by putting **smallfiles = true** at the end of
**/etc/mongodb.conf**. Now your database will be limited in size in
half a gig, but that should be plenty for our needs.

- Remove lockfile: sudo rm /var/lib/mongodb/mongod.lock
- Repair: sudo -u mongodb mongod -f /etc/mongod.conf --repair
- sudo service mongod start

## Mongoose Subdocuments

One of the most powerful features of Mongoose is the ability to work with sub-documents.  

## Mongoose Gyp and Bson {#mongoose-gyp-bson}

You may get a message about C++ BSON not being installed and so the system is falling back on the "pure javascript version". Please note this is not an error. There is nothing wrong with the pure javascript version other than it being perhaps a bit slower. That will not matter on a development machine in most cases. So I suggest simply living with the messages on your development machine, and fix them only on your production machine.

If you want to fix them, there are two issues here:

- Installation on Windows
- Installation on Ubuntu Linux

In this discussion, we will assume that our production environment is an EC2 Ubuntu server. In this scenario, on Windows, we will are only doing development and testing.

By default, our Ubuntu server does not have a C++ compiler installed. You can test if it does by typing:

    gcc -v

To install the gcc C++ compiler, first connect to your EC2 instance and ensure your it is up to date:

    sudo apt-get update
    sudo apt-get upgrade

Then install gcc:

    sudo apt-get install build-essential

More details and a reference are [here](https://help.ubuntu.com/community/InstallingCompilers)

Now when you type **npm install** or **npm install mongoose --save** at the linux command prompt all will go smoothly.

On Windows, there is nothing I can see that is wrong with using the "Pure JavaScript version" of bson. It's going to be slower, but this is only our development environment.  

So I would just live with the Bson messages, unless you have VS installed already. I don't really like to install Visual Studio except on a dedicated development machine or in a VM. If, however, you have it installed already, then you should only need to worry about your Python version. I have two versions installed, set up like this:

    C:\Python\Python27
    C:\Python\Python33

I can just change my path to point to the one I want to use at any particular time. One way to do this would be to:

- Create an environment variable called **PYTHON_HOME**. Set it to point to your currently preferred version of Python:
- **setx PYTHON_HOME C:\Python\Python27**
- Append PYTHON_HOME to your path: **C:\Foo;C:\Bar;%PYTHON_HOME%;**

Now you can just use setx to change the environment variable and then restart your windows command line session:

    setx PYTHON_HOME C:\Python\Python33

You can read about setx here:

- <http://www.elvenware.com/charlie/os/windows/faq.html#environment>
- <http://ss64.com/nt/setx.html>
- <https://technet.microsoft.com/en-us/library/cc755104.aspx>


[1]: https://www.npmjs.org/package/mongodb
[do-mongo-16-04]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04
[installMongo]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/InstallScripts/InstallMongoDb
[huge-page-fix]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/InstallScripts/HugePageFix
