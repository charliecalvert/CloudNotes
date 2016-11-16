## Overview

```bash
cp -r Week09-SessionBasics/ Week09-SessionCouch
cd Week09-SessionCouch/
npm install connect-couchdb --save
```


Run set up like this:

```
cd node_modules/couch-connect/tools
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
node setup.js couch_session 1000
```
