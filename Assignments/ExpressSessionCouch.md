---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ExpressSessionCouch.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: ExpressSessionCouch.md
relativePath: /ExpressSessionCouch.md
title: ExpressSessionCouch
directoryName: Assignments
category : assignments-guide
---

## Overview

Do you work in a branch called **Week09**.

```bash
cp -r Week09-SessionBasics/ Week09-SessionCouch
cd Week09-SessionCouch/
npm install express-session --save
npm install elf-sessionstore --save
npm install cradle --save
```


## Add SessionStore

Here is an alternative session store. The nice things about this one is that it will work with a number of different databases.

- <https://github.com/adrai/sessionstore>

Here are some things that need to be installed:

```
npm install express-session --save
npm install sessionstore --save
npm install cradle --save
```

The code:

```javascript
var sessionStore = sessionstore.createSessionStore({
    type: 'couchdb',
    host: 'http://192.168.2.19',  // optional
    port: 5984,                // optional
    dbName: 'sessionstore-calvert',// optional
    collectionName: 'sessions',// optional
    timeout: 10000             // optional
});

router.use(session({
    genid: function(req) {
        'use strict';
        return uuid.v4(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: sessionStore       <==== HERE
}));
```

## Read Sessions

Install Nano:

	npm install nano --save

Copy in the **routes/Couch*.js** files from your DataMaster program or other source. You will, of course, put them in the **routes** folder.

- Modify the top of index.js to load the Couch files that you just added to your project.
- Modify the database name at the top of **routes/Couch.js**
- You will also have to modify **CouchDesignDocs** and **CouchViews**.

In **CouchDesignDocs** your new couch view will look like this:

```javascript
var elfSessions = function(doc) {
		if (doc.type === 'connect-session') {
				emit(doc._id, doc);
		}
};
```

This will get all the documents in your database that describe the sessions used by your app. That is, it will retrieve:

- All the couch documents with **type** property that is set to **'connect-session'**
- All of those documents will have names of this shape: **connect-session_LOTS_OF_NUMBERS_AND_LETTERS**
	- for instance: **connect-session_27014d18-d80d-4224-aa1d-c117ee35fffc**

You will want to delete the other design docs, each of which should have names with the words NPC or STATE in them. You will also need to modify the route called '/design/doc':

```javascript
router.get('/designDoc', function(request, response) {
		console.log('Design Doc Called');

		var designName = '_design/elf-session';
		var designDocument = {
				'views': {
						'elf-session': {
								'map': WHAT_SHOULD_IT_MAP_TO
						}
				}
		};

    createDesignDocument(designDocument, designName, response);
});
```

You will also want to modify **CouchViews** to contain a route called **/viewSessions**. This view should, at least for now, return the entire **body**.

When learning about design documents, you might get errors that look like this:

```javascript
{
    "message": "missing",
    "stack": "Error: missing\n    at Request._callback REST OF STACK DUMP HERE",    
    "name": "Error",
    "error": "not_found",
    "reason": "missing",
    "scope": "couch",
    "statusCode": 404
    ... ETC CODE OMITTED HERE
}
```
 This kind of error may mean that couchDb can't find the view you are asking for. It can't find the view because you have not created it in **routes/CouchDesignDocs.js** and you don't have a method for calling it in **routes/CouchViews.js**.

## Client Side

Add some buttons:

<pre>
div
		button.btn.btn-info#designDoc Insert Design Doc
		button.btn.btn-info#sessionView View Sessions
</pre>

Add some more click handlers in **control.js**. Hint, here is how to call the view:

```javascript
 showPage('/viewSessions?designDoc=elf-session&view=elf-sessions')
```

For now we simply showing all the results for the sessions you have created.

## Turn it in

Run **grunt check** and make sure it passes. Push your work to the cloud.

In the comments or text page, specify the branch and folder name for your project.

## Images

Here are some screenshots that will help you get some idea of what I'm expecting to see.

![Viewing the session documents from the couch-session-lastname database](https://s3.amazonaws.com/bucket01.elvenware.com/images/session-couch-view.png)

**Image**: _Viewing the session documents from the couch-session-lastname database._

When looking at futon, you ought to see two design docs:

- connect-sessions
- elf-session

And also one or more session documents. These documents have names that begin something like this **connect-session_XXX**, where XXX is the beginning of a long set of numbers and letters. I have two because I ran the app both in Chrome and Firefox.

![Viewing Futon](https://s3.amazonaws.com/bucket01.elvenware.com/images/session-couch-futon.png)

**Image**: _What futon looks like with the two design docs and two sessions added. I have two sessions because I ran the application once from chrome and once in FireFox._


## Alternative: Setup Connect-CouchDb {#session-design}

Though I'm not terribly excited about either of them, here is an alternative to sessionStore. Right now, I prefer **sessionStore**, but this one also worked.

```bash
cp -r Week09-SessionBasics/ Week09-SessionCouch
cd Week09-SessionCouch/
npm install express-session --save
npm install connect-couchdb --save
npm install nano --save
```

Run set up like this:

```
cd node_modules/connect-couchdb/tools
```

Now edit **setup.js** like this, but use your ip address:

```javascript
var opts = {
	"host": "192.168.2.19",
	"name": process.argv[2],
  "revs_limit": process.argv[3]};
```

Run it like this:

```
node setup.js couch-session-lastname 1000
```

These two commands sum up the process:

```
geany node_modules/connect-couchdb/tools/setup.js
node node_modules/connect-couchdb/tools/setup.js couch-session-lastname 1000
```

## Add Couch Connect Support {#add-couch-connect}

Put this near the top of **middleware.js**:

```javascript
var ConnectCouchDB = require('connect-couchdb')(session);
```

And here is the mothod we use to initialize our couch session object:

```javascript
var couchStore = new ConnectCouchDB({
    // Name of the database you would like to use for sessions.
    name: 'myapp-sessions',

    // Optional. Database connection details. See yacw documentation
    // for more informations
    username: 'username',
    password: 'password',
    host: 'localhost',

    // Optional. How often expired sessions should be cleaned up.
    // Defaults to 600000 (10 minutes).
    reapInterval: 600000,

    // Optional. How often to run DB compaction against the session
    // database. Defaults to 300000 (5 minutes).
    // To disable compaction, set compactInterval to -1
    compactInterval: 300000,

    // Optional. How many time between two identical session store
    // Defaults to 60000 (1 minute)
    setThrottle: 60000
});
```

You probably won't use either the userName or password so you can comment those lines out. You will also have to change the name of the database to match the database you created with their **setup** tool.

And now we change the way we handle the store when we initialize the session:

```javascript
router.use(session({
    genid: function(req) {
        'use strict';
        return uuid.v4(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: couchStore   <==== HERE
}));
```
