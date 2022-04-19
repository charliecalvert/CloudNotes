---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MongooseComments.md
relativePath: Assignments/MongooseComments.md
title: MongooseComments
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: MongooseComments.md
fileNameHTML: MongooseComments.html
---


<!-- toc -->
<!-- tocstop -->

## Description

Learn how to refactor **MongooseSubDocs** in to a program with easily reusable components. In particular, learn how to break out the code for handling comments into two separate modules called:

- **routes/comments.js**
- **public/javascripts/comment-factory.js**

You will also create a new file for handling connections to a MongoDb database. That file is called:

-- **routes/connect.js** 

Some changes will also be made to the **routes/index.js** file in **MongooseSubDocs**

**NOTE**: *If you have already completed this assignment as part of **MongooseRoutes**, then you can simply point me toward that assignment when you turn in this assignment. I have created this assignment so as to make it as easy as possible for you to add a comments to your Final project. It steps you through the process of creating the files that will handle comments in your Final project.*

## Step One

Copy MongooseSubDocs into **Week11-MongooseComments**:

    robocopy Week10-MongooseSubdocs Week11-MongooseComments /mir

Open **Week11-MongooseComments** in WebStorm and change the name from MongooseSubDocs to MongooseComments.

## Step Two

Create a connection to the MongoDb database.

Below you will reusable code that can be used when we need to connect to our database. This is needed because our new application is going to have two pieces of middleware both of which need to connect to the Mongoose database:

- **routes/index.js**  will be able to retrieve all the data from the database. In our final, this file might be also used for other tasks such as inserting and deleting scientists and updating the subjects. In short, it handles everything except the comments.
- **routes/comments.js** will only handle comments. The point is that the CRUD operations for comments are complex enough that they belongs in their own module. We are following the rule that says each object should do one thing and have only one reason for change. The **comments.js** module follows that rule reasonable well, in that it only will change if our technique for handling **comments** changes.

**NOTE**: *It is arguable that we could break more code out of **index.js** and into its own middleware file. I would, in fact, do that, but we have simply run out of time this quarter.*

See the [details of how to connect][connect-details] on Elvenware:

[connect-details]:http://www.elvenware.com/charlie/development/database/NoSql/MongoDb.html#how-to-connect

## Step Three

Create **routes/comments.js**. 

- Right click on the **routes** folder and create a new file called **comments.js**.

At the top of **routes/comments.js** paste in this code:

```
var express = require('express');
var router = express.Router();
var connect = require('./connect');
var scientists = require('../models/scientists');
```

First we load express and the router, just as we do at the top of all the **middleware** files in the **routes** folder. Then we link in our new connection code and our existing **scientists** model.

- Cut the entirety of the following methods from **index.js** and paste them into **comments.js**
    - **router.post('/newComment', etc...**
    - **function remove(arr, item) {  etc...**
    - **router.post('/deleteComment', function(request, response) { etc...**
    - **router.post('/updateComments', function(request, response) { etc...**
- Also copy this line to the very end of **comments.js**:
    - **module.exports = router;**

The final step is to modify the way we handle connecting to the database. Take a close look at the beginning of **connect.js** above. Notice that we have declared a **boolean** property of the **connect** object that records whether or not we are already connected.

Inside **routes/comments.js** we use that **connected** property, and the **doConnection** method itself, like this:

```javascript
if (!connect.connected) {
	connect.doConnection();
}
```

You should work your way through comments.js and make sure all the calls that check for the connection to the database now look like the code shown above. In other words, you want to transform code like the following into the code shown above:

```javascript
if (!connected) {
	doConnection();
}
```

Your should have to make three such substitutions, one at the top of each methods in **comments.js**.

```javascript
var express = require('express');
var router = express.Router();
var connect = require('./connect');
var scientists = require('../models/scientists');

router.post('/newComment', function(request, response) {
    if (!connect.connected) {
    	connect.doConnection();
    }
    
    console.log('newComments called. Body is next: ');
    console.log(request.body);
    var scientist = request.body.scientist;
    var comment = request.body.comment;
    console.log(comment);

    // Code omitted here
});

function remove(arr, item) {
	for(var i = arr.length; i--;) {
		if(arr[i]._id == item._id) {
			arr.splice(i, 1);
		}
	}
}

router.post('/deleteComment', function(request, response) {
    if (!connect.connected) {
    	connect.doConnection();
    }

    // Code omitted here
});

router.post('/updateComments', function(request, response) {
    if (!connect.connected) {
    	connect.doConnection();
    }

    // Code omitted here
});

module.exports = router;

```

Your copy of **models/scientists.js** may already look like this, but just to avoid confusion, the version of that file I'm using in this project looks like this:

```
/**
 * Created by charlie on 6/6/2015.
 */

var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	commentText: String,
	date: { type: Date, default: Date.now }
});

var scientistsSchema = mongoose.Schema({
	"firstName": String,
	"lastName": String,
	"subject": String,
	"subjects": [String],
	comments: [commentSchema]
});

module.exports = mongoose.model('scientist', scientistsSchema);
```

Notice the **exports** statement as it may vary slightly from the version on your system. It is important to get it right as other code in this document depends on it.

## Step Four

Link in your new **routes/comments.js** middleware. 

We want this new **comments** module to be included in our program, so we have to tell **express** to call it whenever a request for an operation on our comments comes in. All our comment operations will have have the routes **/coment** prepended to them.

You can begin by loading the **comments** module. In the following code, the first two lines, and last line, are included only for context. It is the third line that you want to add to the server side **/app.js** file:

```javascript
var routes = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comments');

var app = express();
```

Now tell express to include your **comments** middleware in the chain of code it calls when requests to handle comments are passed to the server from the client. Again, the first two lines are included here only for context, only to help you find the place in **app.js** to add our new line of code:

```javascript
app.use('/', routes);
app.use('/users', users);
app.use('/comments', comments);
```
 
## Step Five 

Modify **index.js** to work with our new connection model.

Here is the way the top of **index.js** should now look:

```
var express = require('express');
var router = express.Router();
var connect = require('./connect');
var scientists = require('../models/scientists');
var fs = require('fs');

```

The key point is that we are now linking in the new **routes/connect.js** module.

Since the **doConnection** method is now in **connect.js**, you should delete **doConnection** from **routes/index.js**. You should also delete the variable called **connected**. You should also change all the calls to **doConnection** as described in an earlier step.

## Step Six

Let's now switch over to the client side and create a **javascripts/comments.js** file that mirrors the **routes/comments.js** file on the server side. 

Create a file called **javascripts/comment-factory.js**. Start it out with boilerplate code:

```javascript

(function() {

	var app = angular.module('elvenApp');

	app.factory('commentFactory', function($http) {

            var commentFactory = {

                // Insert comment methods here

            };

            return commentFactory;	
        });
})();
``` 

Cut the following methods from **mongo-factory.js** and paste them into **comment-factory** in the designated location:

- **newComment**
- **updateComment**
- **deleteComment**

Make sure that the factory in **mongo-factory** is called **mongoFactory** and the factory in **comment-factory** is called **commentFactory**. Double check to make sure you got it right.

Now change all the **HTTP** REST calls to make sure they are using the route to our new middleware. In particular, change calls that look like this:

    $http.post('/newComment'

Now they should use our new route to the middleware found in **routes/comments.js**:

    $http.post('/comments/newComment'

Recall that we set that middleware up in **/app.js** with this line of code:

    app.use('/comments', comments);

And we will need a **/views/commentds.jade** file to go with **public/javascripts/comments.js**

```jade
h1 Comments: {{commentsController.name}}
div.names
    ul
        li(ng-repeat='comment in commentsController.scientist.comments')
            a(ng-click="commentsController.selectComment(comment)") {{comment.commentText}}
    div.names(ng-form="newCommentForm")
        hr
        button.btn.btn-default(ng-click='commentsController.newComment()') New Comment
        br
        br
        label(class='col-sm-2, control-label') Text
        input.form-control(type='text', ng-model='commentsController.newCommentText')
    div.names(ng-form="myform")
        hr
        button.btn.btn-default(ng-click='commentsController.updateComment()') Update Comment
        button.btn.btn-default(ng-click='commentsController.deleteComment()') Delete Comment
        br
        br
        label(class='col-sm-2, control-label') Text
        input.form-control(type='text', ng-model='commentsController.comment.commentText')
        br
        label(class='col-sm-2, control-label') Date
        input.form-control(type='text', ng-model='commentsController.comment.date')
        br
        label(class='col-sm-2, control-label') Id
        input.form-control(type='text', ng-model='commentsController.comment._id')
```

You should probably add support for an about page as well.

## Step Seven

Include a menu in **index.jade**

```jade
extends layout
block content
	nav.navbar-default.navbar-fixed-top
		.container-fluid
			.navbar-header
				button(type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myTarget")
					span.sr-only Toggle navigation
					span.icon-bar
					span.icon-bar
					span.icon-bar
				a.navbar-brand(href="#/") Final
			#myTarget.collapse.navbar-collapse
				ul.nav.navbar-nav
					li(ng-class="{ active: isActive('/')}")
						a(ng-href='#/') Home
					li(ng-class="{ active: isActive('/comments')}")
						a(ng-href='#/comments') Comments
					li(ng-class="{ active: isActive('/about')}")
						a(ng-href='#/about') About
	h1= title
	p Welcome to #{title}
	div(data-ng-view="")
```

And add in support for routes:

    bower install angular-route --save

Make sure that **bower.json** is using a single version of angular throughout.

Then provide support for your routes on the client:

```
var myModule = angular.module("elvenApp", [ 'ngRoute' ]);

myModule.config(function($routeProvider, $httpProvider, $locationProvider) {

	$routeProvider.when("/", {
		templateUrl : "main",
		controller : "MainController",
		controllerAs: "mainController"
	}).when('/comments', {
		templateUrl : "comments",
		controller : "CommentsController",
		controllerAs: 'commentsController',
		resolve: {
			loggedin: checkLoggedin
		}
	}).when('/about', {
		templateUrl : "about",
		controller : "AboutController",
		controllerAs: 'aboutController'
	}).otherwise({
		redirectTo : '/'
	});
});
```
## Step Eight

Some finishing touches.

In layout.jade, link in comments:

    script(src="javascripts/comment-factory.js")
    script(src="javascripts/mongo-factory.js")

At the top of **control.js**, link in both **mongoFactory** and **commentFactory**:

    app.controller('MainController', function(mongoFactory, commentFactory) {

Go through each method in **control.js** and make sure it is calling into the proper factory. Some call into **commentFactory** and others into **mongoFactory**.

Congrats. You now have everything set up correctly. In addition, it should be relatively trivial for you to move this code into your **Final** project.

## Turn it in

Put his project in a folder of your repository called **Week11-MongooseComments**. If you already completed this project  as part of the **MongooseRoutes** assignment, then simply point me to the folder that contains your version of the assignment. For instance, when you submit this assignment, add a comment saying that this project can be found in the **XXX** folder.

## Hints

Please see this information:

- Sending a [new comment][restreq] from the browser to the server to a database. 

[restreq]:http://elvenware.com/charlie/development/web/JavaScript/Angular.html#http

### References

As of version 3 of Mongoose, there are two ways to declare sub-documents. Method 1 and method 2 are functionally equivalent.

Method 1:

```
var commentSchema = new Schema({ commentText: 'string' });

var scientistSchema = new Schema({
  comments: [commentSchema]
})
``` 

Method 2:

```
var scientistSchema = new Schema({
  comments: [{ commentText: 'string' }]
})
```

The reference is here:

- <http://mongoosejs.com/docs/subdocs.html#altsyntax>

There are sometimes also called embedded documents:

- <http://mongoosejs.com/docs/subdocs.html>

The docs state: "Sub-documents enjoy all the same features as normal documents. The only difference is that they are not saved individually, they are saved whenever their top-level parent document is saved."

