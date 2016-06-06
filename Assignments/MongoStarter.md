# In Class Mongo

## Step 1: Mongo Account

Create an account on [MongoLab](https://mongolab.com/).

## Step 2: Install Mongo on Linux

Follow the steps outlined in the Elvenware [Install Mongo][mongoInstall] section to install MongoDb on your system. When you are done with the install, come back to this assignment.

[mongoInstall]: http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#install


## Step 3: MongoTalk.json

Many of the MongoSamples use a JSON file called MongoTalk.json. To learn how to set it up, read the section of the [JsObjects/Data README file][1] that covers **MongoTalk.json**.

## Step 04: Insert Data

Create a copy of [JsObjects/Data/MongoCreateData][2]. For instance, to create a copy in the Source directory:

<pre>
cd ~/Source
cp -r ~/Git/JsObjects/Data/MongoCreateData/ .
</pre>

Run **npm install**.

To learn how to use the program, see the [README][3].

## Step 05: View the data in the database

MongoDb ships with a client. Elvenware has [a description][4] of how to use it.

## Step06: MongoLab URLs and Users

Learn about them on [Elvenware][5].

## Step07: An Express Mongo Program

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

[1]: https://github.com/charliecalvert/JsObjects/blob/master/Data/README.md
[2]: https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoCreateData
[3]: https://github.com/charliecalvert/JsObjects/blob/master/Data/MongoCreateData/README.md
[4]: http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#sample-session
[5]: http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#set-up-a-mongolab-url
