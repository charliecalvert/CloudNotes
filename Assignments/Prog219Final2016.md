## Overview

The Prog 219 Final for 2016.

The Prog 272 Final for 2016 should contain, at minimum, the following elements:

- Home and About pages
- Renewables by index
- Renewables by Year
- Simple Format Page
- Use a Bootswatch theme

These features of your final demonstrate that you understand the basics taught in the course, that you came to class regularly, and made a good faith effort to complete the course.

Your next priority should be to:

- Thoroughly refactor your code into
  - Renewable folders on the client and server
  - Files in the routes directory for handling various tasks such as responding to requests for  **renewables** data, **high-tech-energy** data and **settings** data.
- At least one of the following:
  - High Tech Energy Overview Page
  - High Tech Energy Types Page

This demonstrates your ability to take some of the concepts taught in the core portion of the course and implement them on your own with a minimum of hand holding.

Finally, you should work to add database elements:

- Database page to import JSON data into MongoDB and display it.
- Settings page pulling and setting data in MongoDB
- Ability to use either JSON or MongoDB as your datasource
- Ability to use the settings page to dynamically switch back and forth between displaying JSON data and MongoDB data.

Extra credit

- Dynamically switch back and forth between using mLab and local data.

## Images

![HomePage](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog210-final-2016-01.png)

**Figure 01**: _The home page of the final._

![Database Page](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog210-final-2016-02.png)

**Figure 01**: _The database page is import JSON data into the MongoDb database. In this screenshot you can see many of the menu items._

## Bootswatch

[Bootswatch](https://bootswatch.com/) provides themes for bootstrap.

Install it:

<pre>
bower install bootswatch --save
</pre>

Use it in **layout.jade**. Modify the line that loads **bootstrap.css** so that it looks something like this:

<pre>
link(rel='stylesheet', href='/components/bootswatch/cyborg/bootstrap.css')
</pre>

Cyborg is just one of the many themes available from bootswatch.

- [Cerulean](https://bootswatch.com/cerulean/)
- [Cosmo](https://bootswatch.com/cosmo/)
- [Darkly](https://bootswatch.com/darkly/)
- [Superhero](https://bootswatch.com/superhero/)
- And so on. They are all linked from the main menu at the bootswatch site.

![Bootswatch Cyborg Theme](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog219-final-2016-03.png)

**Figure03**: _Bootswatch Darkly Theme._

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

**NOTE**: _Please do not use hypens (-) in your model (collection) names. They work okay in mongoose, but the mongo shell has a hard time with them. Let's use underscores instead._

Good: **module.exports = mongoose.model('prog219_lastname_setting', settingsSchema);**
Bad: **module.exports = mongoose.model('prog219-lastname-setting', settingsSchema);**
Bad: **module.exports = mongoose.model('prog219LastnameSetting', settingsSchema);**

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

## Settings Options

You know how to load and save the settings for your application. The next step is to change the behavior of the application based on those settings.

The user can choose to read data from either the database or a JSON file:

- Database
- JSON

Let's capture that choice in a simple object to be stored in its own file called **public/javascripts/settings.js**:

```javascript
var myModule = angular.module('elfApp');

myModule.factory('settings', function () {

    function settings() {
    }

    settings.useDatabase = true;
    settings.useLocalMongoDb = true;

    var report = function () {
        console.log('useDatabase', settings.useDatabase);
        console.log('useLocalMongoDb', settings.useLocalMongoDb)
    };

    settings.setSettings = function (settings) {
        this.useDatabase = settings.dataType.toLowerCase() === 'database';
        this.useLocalMongoDb = settings.dataSource.toLowerCase() === 'local mongodb';
        report()
    };

    return settings;
});
```

```javascript
$scope.getRenewable = function() {
    var dataType = settings.useDatabase ? 0 : 1;
    var urls = ['/database/allRenewables', 'data/Renewable.json'];
    $http.get(urls[dataType])
        .then(function(res) {
            if (settings.useDatabase) {
                $scope.renewable = renewableUtils.getComplexFormat(res.data.renewables);
            } else {
                $scope.renewable = res.data;
            }
            renewableUtils.init($scope.renewable);
            renewableUtils.init($scope.renewable);
            $scope.renewableUtils = renewableUtils;
        });
};
```

```javascript
this.getComplexFormat = function(simpleRenewables) {
    return simpleRenewables.map(function(renewable) {
        return {
            Year: renewable.year,
            'Solar (quadrillion Btu)': renewable.solar,
            'Geothermal (quadrillion Btu)': renewable.geothermal,
            'Wind power (quadrillion Btu)': renewable.wind,
            'Other biomass (quadrillion Btu)': renewable.biomass,
            'Liquid biofuels (quadrillion Btu)': renewable.biofuels,
            'Wood biomass (quadrillion Btu)': renewable.wood,
            'Hydropower (quadrillion Btu)': renewable.hydropower
        };
    });
};
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

## Jade Routes {#jade-routes}

Read the [Loading Jade][loading-jade] section in the Elvenware Jade page.

See the [JadeRoutes][jade-routes] program from JsObjects.

[loading-jade]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJade.html#loading-jade
[jade-routes]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/JadeRoutes

## Can't Start Mongod

If you can't get Mongod to start on Cloud 9, try one of these two options:

**Option 1**: On Cloud 9, delete the **~/data** folder. This means you will loose your databases and collections, but that should not be a big issue in this class. Now go through the set up process again:

<pre>
    cd
    mkdir data
    echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
    chmod a+x mongod
    ./mongod
</pre>

Alternatively, try this:

<pre>
mongod --dbpath /data/db --smallfiles"
</pre>

Thanks to Jonas Olesen and Norman Jenks for these suggestions.

## Grunt Check

Stop whatever you are doing and run **grunt check** immediately. Get everything to pass. It is not a hard task. Just get it done.

Then do it at least one more time just before you turn in the assignment. But don't leave it to last. At the end, you will feel too much pressure and will forget to do it or feel too discouraged to do it. Do it now! Immediately! You might introduce a few more problems between now and when you turn in the final, but better two or three problems than twenty, thirty or even fifty!

This is a simple way to get points!

## Containers

I've noticed a lot of student's applications don't look quite right on a large screen. The problem is that the various "pages" we are loading are not restricted to the middle of the screen, but instead "bleed" off to the right and left. To fix this, put them inside a container. Consider the jade for our standard **about.jade** page. This is not right because there is no container:

<pre>
h1 About
p version 2.0

p#display

p#display2
</pre>

This is right because the content is inside a container:

<pre>
.container
    h1 About
    p version 2.0

    p#display

    p#display2
</pre>

Try adding a container to all your pages. Not to the jade for a directive, but the jade used to define the appearance of a page. For instance, **renewables-page.jade**.

**NOTE**: _On a low resolution screen, or on a mobile device, you can't tell the difference between the two sets of jade shown above. But on a big screen, when the app is maximized, it becomes obvious. The screens at school are certainly big enough to show this._
