## Overview

The Prog 272 Final for 2016.

## Install

Some key files and commands:

- models/renewables.js
- routes/connect.js
- routes/all-mongo.js
- public/javascript/database.js

Some files that need to change:

- public/javascript/app.js
- app.js

npm install mongoose --save

## Database

Make sure you put your preface your collections with prog219 and end them with your last name:

```javascript
module.exports = mongoose.model('prog219-calvert-renewables', renewablesSchema);
```

In **routes/connect.js**, set your simple url to use a dbs called renew:

```javascript
var url= 'mongodb://127.0.0.1:27017/renew';
```

**NOTE**: _Recall that I will be grading many assignments. I don't want the data in my Mongo Lab (MLab) database as there will be too much of it. So I'm going to put it in my local database. There will be a lot of data in there, and I need to know who created which collections. As a result, this naming scheme is essential._

If you are in both prog219 and prog272, and your last name is ng, then I'm expecting to see something like this in the mongo shell:

<pre>
> show collections
prog219-calvert-renewables
prog272-calvert-renewables
prog219-ng-renewables
prog272-ng-renewables
renewables
</pre>

## Data Choice

The database has already translated the unusable keys from our raw data into usable keys. But if we read directly from the JSON, then we have not done so. This means we have to have a special case for when we use JSON data and when we use Database data.

Create a variable called **useDatabase**.

```javascript
var useDatabase = false;

function getRenewable() {
    //console.log('getRenewable called');
    var routeType = useDatabase ? 0 : 1;

    var renewableRoutes = ['/allRenewables', '/renewables'];
    $.getJSON(renewableRoutes[routeType], function(response) {
            renewables.renewablesList = response.renewables;
            showRenewable(renewables.renewablesList[index]);
            etc....
    })
```

Then in **showRenewable**:

```javascript
function showRenewable(renewable) {
    if (!useDatabase) {
        renewable = getSimpleKeys(renewable);
    }
```
