## Overview

```bash
cp -r Week09-SessionBasics/ Week09-SessionCouch
cd Week09-SessionCouch/
npm install connect-couchdb --save
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

## Add Couch Support

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
