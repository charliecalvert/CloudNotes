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

## Jade Routes {#jade-routes}

Read the [Loading Jade][loading-jade] section in the Elvenware Jade page.

See the [JadeRoutes][jade-routes] program from JsObjects.

[loading-jade]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJade.html#loading-jade
[jade-routes]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/JadeRoutes

## Testing

If you are having trouble getting your tests to run, don't forget to review the [testing section from the midterm][test-midterm]. Focus on comparing your karma.conf.js file with the one in the my [JasmineRequireJs][jas-req-js] example program.

You will find the tests for the midterm here:

- [JsObjects/Utilities/Templates/UnitTest/SolarVoyager][solar-tests]

[test-midterm]: http://www.ccalvert.net/books/CloudNotes/Assignments/Prog272Midterm2016.html#testing
[jsm-req-js]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/JasmineRequireJs
[solar-tests]:https://github.com/charliecalvert/JsObjects/tree/master/Utilities/Templates/UnitTest/SolarVoyager

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

module.exports = mongoose.model('prog272_lastname_setting', settingsSchema);
```

## Settings-Database

Create a file in **routes** called **database-settings.js**. Make appropriate changes in **app.js**. Beside the standard code, such as requiring **connect.js**, also include this:

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

## Settings Home Page

Update **home.jade**

<pre>
.container
    .jumbotron
        h1 Home Page

    .panel.panel-default
        .panel-heading Renewable
        .panel-body
            form#target(method='post', action='/bar')
                select#dataType(name='dataType')
                    option Database
                    option JSON
                hr
                select#dataSource(name='dataSource')
                    option Local MongoDb
                    option MLab
                hr
                input#comment(type="text", name='comment' value='foo')
                hr
                input.btn.btn-success(type="submit", value='Submit')

    .panel.panel-default
        .panel-heading Renewable
        .panel-body
            .alert.alert-info
                pre#debug

</pre>

Update **home.js**

```javascript
/**
 * Created by charlie on 5/18/16.
 */

define(function() {
    'use strict';

    function getSettings() {
        $.getJSON('/databaseSettings/getSettings', function(response) {
            $('#debug').html(JSON.stringify(response, null, 4));
            $('#dataType').val(response.settings.dataType);
            $('#dataSource').val(response.settings.dataSource);
            $('#comment').val(response.settings.comment);
        })
            .fail(function(a, b, c) {
                console.log('Error', a, b, c);
                $('#debug').html('Error occured: ', a.status);
            })
            .done(function() {
                console.log('second success');
            })
            .always(function() {
                console.log('complete');
            });
    }

    var home = {
        color: 'red',
        size: 'big',
        init: function() {
            console.log(home.color);
            $('#elf-view').load('/home', function() {
                $('#display').html(home.color);
                $('#display2').html(home.size);
                getSettings();
                $("#target").submit(function(event) {
                    event.preventDefault();
                    var userFormData = $(this).serialize();
                    $('#debug').html(userFormData);
                    var userData = {
                        dataType: $('#dataType').val(),
                        dataSource: $('#dataSource').val(),
                        comment: $('#comment').val()
                    };
                    $.post('/databaseSettings/updateSettings', userData, function(result) {
                        console.log(settings);
                    });
                });

            });
        }
    };
    return home;
});
```


## Database

Make sure you put your preface your collections with prog219 and end them with your last name:

```javascript
module.exports = mongoose.model('prog219_calvert_renewables', renewablesSchema);
```

**NOTE**: _Please do not use hypens (-) in your model (collection) names. They work okay in mongoose, but the mongo shell has a hard time with them. Let's use underscores instead._

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
