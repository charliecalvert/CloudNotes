---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MongoStarter.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: MongoStarter.md
relativePath: /MongoStarter.md
title: MongoStarter
directoryName: Assignments
category : assignments-guide
---

# In Class Mongo

In many cases, you will be asked to only do the first five or six steps in this assignment.

## Step 1: Mongo Account

Create an account on [MongoLab](https://mongolab.com/).

## Step 2: Install Mongo on Linux

To install on Cloud 9:

```
cd
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > ~/mongod
chmod a+x ~/mongod
./mongod
```

Otherwise, follow the steps outlined in the Elvenware [Install Mongo][mongoInstall] section to install MongoDb on your system. When you are done with the install, come back to this assignment.

[mongoInstall]: http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#install


## Step 3: MongoTalk.json

Many of the MongoSamples use a JSON file called MongoTalk.json. To learn how to set it up, read the section of the [JsObjects/Data README file][1] that covers **MongoTalk.json**.

## Step 04: Insert Data

Create a copy of [JsObjects/Data/MongoCreateData][2]. For instance, to create a copy in the Source directory:

<pre>
cd ~/Source
cp -r ~/Git/JsObjects/Data/MongoCreateData/ .
</pre>

**NOTE**: _If **~/Source** does not exist, then create it like this **mkdir ~/Source**._

Run **npm install**.

To learn how to use the program, see the [README][3].

## Step 05: View the data in the database

MongoDb ships with a client. Elvenware has [a description][4] of how to use it.

## Step06: MongoLab URLs and Users

Unless you are using Mlab/MongoLab, you can skip this step.

Learn about them on [Elvenware][5].

## Step07: An Express Mongo Program

In some cases, we will move to another assignment and not complete this or the other steps in this assignment.

- Create a new express program called **Week09-InClassMongoView**
  - CreateAllExpress Week09-InClassMongoView
- Add in **mongodb** support: **npm install mongodb --save**
- Add in require to layout.jade: **script(src="javascripts/require.js" data-main="javascripts/Main")**
- Add in **public/javascripts/Main.js** and jquery

Main might start by looking like this:

```
    require.config({
      paths: {
        "jquery": "jquery-2.1.0",
      }
    });

    require(["jquery"], function(jq) {
    	'use strict';
    	console.log("Main called.");
    });
```

Add in the Elvenware **QueryMongo** library to routes:

<pre>
cd routes
wget http://www.elvenware.com/charlie/development/web/JavaScript/Scripts/QueryMongo.js
wget http://www.elvenware.com/charlie/development/web/JavaScript/Scripts/LoadConfig.js
</pre>

Open **QueryMongo.js** and set the **collectionName** to **lincoln**.

Load the library into the index route:

    var queryMongo = require('./QueryMongo').QueryMongo;

**NOTE**: _The following assumes that you used the instructions above to create the **lincoln** collection in the **test** database._

And call **readAll**:

```javascript
    //Read the collection
    router.get('/readAll', function(request, response) {'use strict';
    	console.log("ReadAll route is called");
    	queryMongo.getAllDocuments(response);
    });
```

## Step 08: Build the client

On the client side, create MongoClient.js:

    define(function() {

        var MongoClient = (function() {

            function MongoClient() {

            }

            return MongoClient;

        }());

        return MongoClient;

    })

Add it in to **Main.js**.

Create a button click handler and use getJSON to pull your **/readAll**
route.

- The button has an id of readAll and a caption of Read All.
- Define a click handler in MongoClient. Set up the click handler in the
constructor. Have it call a private method named **readAll**.

Handle the data and display it to the user.

- In the getJSON callback, define a parameter called serverData.
- Start by popping up an alert
- Inside the alert: JSON.stringify(serverData[0], null, 4);

## Turn it in

If you are in **Prog 272**, take a picture of MongoLab, showing any collection that you were able to insert into your database.

**NOTE**: _Do not put your screen shot in a zip file or embed it in a word document. Simply attach the screen shot to your assignment when you turn it in._

If you are in **Prog 219**, attach a screenshot of the mongo client running in the bash shell and using **find** to show the contents of a collection you created. To start the mongo client, aka [mongo shell](https://docs.mongodb.com/getting-started/shell/client/), just type **mongo** at the bash shell. Then run a few commands such as **show dbs**, **use test**, **show collections** and then show the contents of a collection. For instance, take a screenshot showing the output of these or similar commands:

<pre>
db.lincoln.find()
db.prog219_lastname.settings()
</pre>

Sample output when starting the mongo shell:

<pre>
$ mongo
MongoDB shell version: 3.2.7
connecting to: test
// A FEW WARNINGS OMITTED HERE
> show dbs
local          0.000GB
prog219-renew  0.000GB
renew          0.000GB
test           0.000GB
>
</pre>

Reference:

- <https://docs.mongodb.com/getting-started/shell/client/>

If you completed the whole assignment, you should also push your work to your repository.

[1]: https://github.com/charliecalvert/JsObjects/blob/master/Data/README.md
[2]: https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoCreateData
[3]: https://github.com/charliecalvert/JsObjects/blob/master/Data/MongoCreateData/README.md
[4]: http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#sample-session
[5]: http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#set-up-a-mongolab-url
