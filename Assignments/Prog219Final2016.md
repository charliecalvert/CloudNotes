## Overview

The Prog 219 Final for 2016.

**NOTE**: _Please do not use hypens (-) in your model (collection) names. They work okay in mongoose, but the mongo shell has a hard time with them. Let's use underscores instead._

Good: **module.exports = mongoose.model('prog219_lastname_setting', settingsSchema);**
Bad: **module.exports = mongoose.model('prog219-lastname-setting', settingsSchema);**
Bad: **module.exports = mongoose.model('prog219LastnameSetting', settingsSchema);**

## Database Notes

If you get **Unclean shutdown detected.**, run this to fix it:

<pre>
cd
./mongod --repair
</pre>

On Cloud 9, To shutdown we should be able to do **CTRL-C** in the window where mongo is running. Or, try this from inside the mongo shell:

<pre>
db.shutdownServer()
</pre>

For more details on shuting down, go here:

- <https://docs.mongodb.com/manual/tutorial/recover-data-following-unexpected-shutdown/>

In mongo shell, to empty a collection: **db.myCollection.remove({})**.

Make sure you put your preface your collections with prog219 and end them with your last name:

```javascript
module.exports = mongoose.model('prog219_calvert_renewables', renewablesSchema);
```
In **routes/connect.js**, set your simple url to use a dbs called renew:

```javascript
var url= 'mongodb://127.0.0.1:27017/renew';
```

**NOTE**: _Recall that I will be grading many assignments. I don't want the data in my Mongo Lab (MLab) database as there will be too much of it. So I'm going to put it in my local database. There will be a lot of data in there, and I need to know who created which collections. As a result, this naming scheme is essential._

If you are in both prog219 and prog272, and your last name is ng, then I'm expecting to see something like this in the mongo shell:

<pre>
> show collections
prog219_calvert_renewables
prog272_calvert_renewables
prog219_ng_renewables
prog272_ng_renewables
</pre>

## Settings

To help you get started using database in your app, let's add the ability to track some settings in MongoDB.

## Settings-Model

We want to save settings:

The model looks like this, only use your last name:

```javascript
var mongoose = require('mongoose');

var settingsSchema = mongoose.Schema({
    "keyNote": String,
    "dataSource": String,
    "dataType": String,
    "comment": String
});

module.exports = mongoose.model('prog219_lastname_setting', settingsSchema);
```

## Settings-Database

Create a file in **routes** called **database**. Beside the standard code that can be found in **routes/users.js**, include this code:

```javascript
// CODE OMITTED HERE

var settings = require('../models/settings');

// CODE OMITTED HERE

function saveSettings(request, response) {
    console.log('request body', request.body);

    var newSettings = new settings({
        "keyNote": 'settings',
        "dataSource": request.body.dataSource,
        "dataType": request.body.dataType,
        "comment": request.body.comment
    });

    console.log('inserting', newSettings.comment);

    newSettings.save(function(err) {
        console.log('saved: ', newSettings.dataSource, newSettings.dataType, newSettings.comment);
        response.send({ result: 'success', query: request.body});

    });
}

router.post('/updateSettings', function(request, response) {
    console.log('request body', request.body);
    if (!connect.connected) {
        connect.doConnection();
    }

    settings.findOne({keyNote: 'settings'}, function(err, doc) {
        console.log('findone', err, doc);
        if (err) {
            response.send({result: 'error'});
        } else {
            if(doc === null) {
                saveSettings(request, response);
            } else {
                doc.dataType = request.body.dataType;
                doc.dataSource = request.body.dataSource;
                doc.comment = request.body.comment;
                doc.save();
            }
        }
    });
});

router.get('/getSettings', function(request, response) {
    console.log('request body', request.body);
    if (!connect.connected) {
        connect.doConnection();
    }

    settings.findOne({keyNote: 'settings'}, function(err, doc) {
        console.log('findone', err, doc);
        if (err) {
            response.send({result: 'error'});
        } else {
            if(doc === null) {
                response.send({settings: {dataType: 'Database', dataSource: 'Local MongoDb', comment: 'Default Comment'}})
            } else {
                response.send({settings: doc});
            }
        }
    });
});
```

You will also need to set up the route in app.js:

```javascript
// CODE OMITTED HERE
var database = require('./routes/database'); <= About line 8

// CODE OMITTED HERE
app.use('/database', database); <= About line 28
```

Remember that you are also going to need **connect.js** from our earlier assignment. Make sure the database is et  to **renew**.

## Settings Home Page

Update **home.jade**

<pre>
//
   Created by charlie on 5/20/16.

.container
    h1 Home

    #qux
        p MainData: {{mainData}}

    .panel.panel-default
        .panel-heading Settings
        .panel-body
            form(ng-submit='submit()')
                select(ng-model='formData.dataType')
                    option Database
                    option JSON
                hr
                select(ng-model='formData.dataSource')
                    option Local MongoDb
                    option MLab
                hr
                input(type="text", ng-model='formData.comment')

                hr
                button.btn.btn-primary(type="submit") Submit
    .panel.panel-default
        .panel-heading Results
        .panel-body
            pre Mirror: {{resultMirror}}
            hr
            pre Full: {{resultFull}}

</pre>

Update **home.js**

```javascript
var elfApp = angular.module('elfApp');

elfApp.controller('HomeController', function ($scope, $http) {
    'use strict';

    $scope.mainData = 'HomeController MainData';
    $scope.resultFull = '/database/saveSettings';
    $scope.resultMirror = '/database/saveSettings';
    $scope.list = ['foo'];
    $scope.formData = {
        'dataType': 'a',
        'dataSource': 'b',
        'comment': 'c'
    };
    $scope.text = 'hello';

    $scope.submit = function () {
        $http.post('/database/updateSettings', $scope.formData).then(function (result) {
            $scope.resultFull = JSON.stringify(result, null, 4);
            $scope.resultMirror = JSON.stringify(result.data.query, null, 4);
        }, function(err) {
            console.log(err);
        });
        console.log($scope.formData);
    };

    function readSettings() {
        $http.get('/database/getSettings').then(function (result) {
            $scope.resultFull = JSON.stringify(result, null, 4);
            $scope.resultMirror = JSON.stringify(result.data.settings, null, 4);
            $scope.formData = {
                'dataType': result.data.settings.dataType,
                'dataSource': result.data.settings.dataSource,
                'comment': result.data.settings.comment
            };
        }, function(err) {
            console.log(err);
        });
        console.log($scope.formData);
    }
    readSettings();
});
```

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
