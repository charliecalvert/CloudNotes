## Overview

The Prog 272 Final for 2016 is broken out into their tiers, three sets of priorities. I'll list the basic priorities first, intermediate level priorities second, and advanced priorities third. The more experience you have as a developer, the deeper into this list you should go. Those with little experience may complete only features from the basic tier and perhaps one or two items from the intermediate level. Those with lots of experience should get deeper into the list of advanced priorities.

**NOTE**: _To some degree, you are being graded based on your relationship with others in the class who have a similar level of experience. Exactly what grade people with little experience will get depends in part on how other students with little experience did. Likewise, experienced students will be graded in relationship to other experienced students._


1. Home and About pages
- Renewables, Renewables by Index and Renewables by Year Pages
- A Bootswatch theme
- Karma tests run smoothly
- **grunt check** comes back clean
- Running your program on Heroku

These features of your final demonstrate that you understand the basics taught in the course, that you came to class regularly, and made a good faith effort to complete the course.

Your next set of priorities include:

- Ensuring your code is thoroughly refactored into
  - Renewable and Energy Types folders on the client and server (public/javascripts, views)
  - Files in the routes directory for handling various tasks such as responding to requests for  **renewables** data, **high-tech-energy** data and **settings** data.
- At least one of the following:
  - High Tech Energy Overview Page
  - High Tech Energy Types Page
- Menu works on both desktop and mobile device

This demonstrates your ability to take some of the concepts taught in the core portion of the course and implement them on your own with a minimum of hand holding.

Finally, if you have completed the features outlined above, you can attempt to produce a complete, well structured application:

- An Energy Types page with clickable **msnTypes** that filter your data
- Database page to import JSON data into MongoDB and display it.
- Settings page pulling and setting data in MongoDB
- Ability to use either JSON or MongoDB as your datasource for the renewables page.
- Ability to use the settings page to dynamically switch back and forth between displaying JSON data and MongoDB data for the renewables page.

I'm expecting that most students won't be able to complete all the features of the final. Consider adopting the following strategies:

- Put only your best work Heroku. This is your **release** and should contain only working features.
  - Suppose you could only get one page working properly. Then put only that one page on Heroku.
- The code in your main repository can optionally contain broken features if you want to show that you nearly completed X or Y. In general, it will help to show that you at least tried to complete a page rather than never tried at all. For instance, if you got parts of the Energy Types page working, but not all of it, then include that page even if it is buggy. In your repository, but not on Heroku, I want to see what you tried to do as well as what you completed successfully. Again, put only your best work on Heroku.
- Don't work too hard. A sane approach to a course like this is to work steadily throughout the quarter. It is very hard to solve an entire quarters worth of problems in two days.
  - I understand that not everyone came into this course with the same level of experience. Don't compare your work to the work of other students. I divided the features of the final into priorities in part to give students who are new to this kind of development some guidance. In some cases, just completing the first set of priorities will be enough to get you a respectable grade in this course. In other cases, I will expect to see nearly all the features in the third set of priorities completed. I think most of you know what I expect, but if you are unsure you can ask me for additional guidance. Consider, however, surprising me. Sometimes students do better than I expect. That's always nice.
- Go to this page (the one you are reading right now) on the web frequently. Refresh the page at least once every time you visit it. At this stage, it will be difficult for me to add or remove features of the final, but it is likely that I will add hints or clarifications. You don't won't miss seeing a hint that could help you create a better program.

Extra credit

- Dynamically switch back and forth between using mLab and local data.
- Have the ability to switch back and forth between MongoDB and JSON as the datasource on all your pages.
  - This would include, on the database page, the ability to import Energy Types data.

## Images

![Main Page](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-final-2016-01.png)

**Figure 01**: _The home page of the final._

![Database Page](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-final-2016-02.png)

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

Note that some of the controls, such as selects, won't render correctly with some bootswatch themes unless you decorate them with the proper class. Here the **form-control** class provides support needed to allow bootswatch themes such as darkly to render correctly. This particular examples is from the **settings** page:

<pre>
select.form-control#dataType(name='dataType')
</pre>

Add the **.form-confol** CSS class to all your HTML **SELECT** and **INPUT** controls. I just opened each jade file, looked for **SELECT** and **INPUT** controls, and added the class. Without it, I was having trouble reading the text in some of my controls when using certain bootswatch themes. In particular, I was sometimes finding that the text was rendering as black on a black background or white on a white background, making the text difficult or impossible to read. Just use the appropriate [bootstrap CSS](http://getbootstrap.com/css/) to fix these kinds of problems.

![Bootswatch Darkly Theme](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog272-final-2016-03.png)

**Figure03**: _Bootswatch Darkly Theme._

## Settings

To help you get started using database in your app, let's add the ability to track some settings in MongoDB.

Some key files and commands involved in implementing the settings page and its link to MongoDB:

- models/settings.js
- routes/connect.js
- routes/all-mongo.js
- public/javascript/database.js

Some files that need to change:

- public/javascript/app.js
- app.js

npm install mongoose --save

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

**NOTE**: _Please do not use hypens (-) in your model (collection) names. They work okay in mongoose, but the mongo shell has a hard time with them. Use underscores instead._

Good: **module.exports = mongoose.model('prog272_lastname_setting', settingsSchema);**
Bad: **module.exports = mongoose.model('prog272-lastname-setting', settingsSchema);**
Bad: **module.exports = mongoose.model('prog272LastnameSetting', settingsSchema);**

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
                response.send( {result: 'success', query: request.body });
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

In **connect.js** you need to change this line:

```javascripts
db.once('open', function(callback) {
    connect.connected = true;   <== THIS IS CORRECT
    console.log('Opened connection to mongo');
});
```

If you see **connected = true;** then you need to change it as shown above. Change in both simple and mLab. This is around lines 20 and 42 of **routes/connect.js**.

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
                        $('#debug').html(JSON.stringify(result, null, 4));
                        console.log(settings);
                    });
                });

            });
        }
    };
    return home;
});
```

## Settings Options

You know how to load and save the settings for your application. The next step is to change the behavior of the application based on those settings.

The user can choose to read data from either the database or a JSON file:

- Database
- JSON

Let's capture that choice in a simple object to be stored in its own file called **public/javascripts/settings.js**:

```javascript
define(function() {
   return {
        useDatabase: true,
        useLocalMongoDb: true,
        report: function() {
            console.log('useDatabase', this.useDatabase);
            console.log('useLocalMongoDb', this.useLocalMongoDb)
        },
        setSettings: function(settings) {
            this.useDatabase = settings.dataType.toLowerCase() === 'database';
            this.useLocalMongoDb = settings.dataSource.toLowerCase() === 'local mongodb';
            this.report()
        }
    };
});
```

Given this object, we can now decide whether to get our data from the database or from a JSON file depending on the options the user choose. For instance, in **public/javascripts/renewables/renewables.js**, we can use the require js dependency injection to access the settings object and decide whether or not to use the mongodb database:

```javascript
define(['jquery', 'settings'], function($, settings) {
    'use strict';

    var index = 0;
    //var useDatabase = true;

    function getRenewable() {
        //console.log('getRenewable called');
        var routeType = settings.useDatabase ? 0 : 1;

        var renewableRoutes = ['/allRenewables', '/renewables'];
        $.getJSON(renewableRoutes[routeType], function(response) {
            // CODE OMITTED HERE
        });
    }
});
```

Your job is to make sure the settings are set correctly when the user either loads or saves the settings from the database. This typically takes place in **home.js** Again, you will use dependency injection to access the settings object:

```javascript
define(['settings'], function (settings) {
  // MAKE SURE THE SETTINGS ARE SAVED TO THE settings OBJECT
  // CODE OMITTED HERE
});
```

The exact details of what happens in **home.js** are left as an exercise. You will have to add only a small amount of code that saves the settings to the **settings** object. This will involve a call to **settings.setSettings()**.

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

## Testing

If you are having trouble getting your tests to run, don't forget to review the [testing section from the midterm][test-midterm]. Focus on comparing your karma.conf.js file with the one in the my [JasmineRequireJs][jas-req-js] example program.

You will find the tests for the midterm here:

- [JsObjects/Utilities/Templates/UnitTest/SolarVoyager][solar-tests]

[test-midterm]: http://www.ccalvert.net/books/CloudNotes/Assignments/Prog272Midterm2016.html#testing
[jsm-req-js]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/JasmineRequireJs
[solar-tests]:https://github.com/charliecalvert/JsObjects/tree/master/Utilities/Templates/UnitTest/SolarVoyager

## Jade Routes {#jade-routes}

A number of students have been confused about how to load jade. In particular, they have had trouble:

- Building the URLs for their routes on the client side.
- Setting up the routes for loading jade on the server side.

To get a better understanding of these issues:

- Read the [Loading Jade][loading-jade] section in the Elvenware Jade page.
- See the [JadeRoutes][jade-routes] demo program from JsObjects.

[loading-jade]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJade.html#loading-jade
[jade-routes]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/JadeRoutes

## Menu

You should have menu that works both on a mobile device and on desktop. Be sure the hamburger manu closes automatically after you make a selection. In **main.js**, near the bottom, add code to hide the main when an anchor is selected:

```javascript
requirejs(['jquery'], function($) {
    'use strict';
    requirejs(['bootstrap', 'control'], function(bootstrap, control) {
        control.init();
        $('.navbar-nav li.trigger-collapse a').click(function(event) {
            $('.navbar-collapse').collapse('hide');
        });
    });
});
```

The three new lines which we use to close the menu after a selection are listed directly after the call to **control.init()**:

```javascript
$('.navbar-nav li.trigger-collapse a').click(function(event) {
    $('.navbar-collapse').collapse('hide');
});
```

Remember that if you have a link from the menu, and a link from a button, don't try to use IDs to form the link between the button/menu and the code that you want to execute. When setting up the event handler, use a class instead. Here is the menu with a class called **.renewablesMenu**:

<pre>
li.trigger-collapse(ng-class="{ active: isActive('/renewables')}")
    a.renewablesMenu Renewables
</pre>

And here is your button:

<pre>
button.renewablesMenu.btn.btn-info Renewables
</pre>

And here is the code that sets up the event handler:

```javascript
$('.renewablesMenu').click(renewables.init);
```

## Trouble Shoot Errors {#errors}

Always approach errors one at a time. If something is not working:

- Run **grunt check** and your unit tests. Get them to pass. (If you can't run your tests, move on and come back to them later.)
- Load your program in Chrome with the developer tools open
- Go to the network page and make sure it is free of any errors
- Go to the console page and fix errors you see there
- Also look in the bash shell to see if errors are showing up there.
- Finally, go to the source page and step through any code that is still broken.

## Turn it in

Put your work in a branch called **Final** in a folder called **SolarVoyager**. If you do anything else other than this, please spell it out carefully when you turn in the Final. I will **take off points** and will likely ask you to re-submit if I don't immediately know where to look for final.

Submit the URL of your program running on Heroku.

**NOTE:** _It might also be helpful to submit the Heroku git URL. You can find it with this command issued in the root of your heroku project: **git remote -v**._
