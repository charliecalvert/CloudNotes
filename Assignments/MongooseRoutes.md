## Description

In this assignment we will integrate our comments into our main application.

Key points:

- Establish a stand-alone **connect** object for connecting to Mongoose.
- Set up a separate route for **comments**. We don't route these requests throught **routes/index.js**. Instead, we set up **routes/comment.js**.


Whether you want to do this in your midterm or in your **MongooseSubDocuments** assignment is up to you. If you are uncertain, I would make a copy of **MongooseSubDocuments** and work from there. It should not matter too much if you have not yet completed **MongooseSubDocuments**.


## Menus


The menu starts like this:

```
nav.navbar-default.navbar-fixed-top
	.container-fluid
```

Inside the div with the class **container-fluid** we want to put two more divs. The first is the hamburger menu:


```
div.navbar-header
	button(type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myTarget")
		span.sr-only Toggle navigation
			span.icon-bar
			span.icon-bar
			span.icon-bar
		a.navbar-brand(href="#/") Final
```

Then we put in our menu, giving it the same id as the data-target from **navbar-header**. The
point is that this is the menu that will collapse into the hamburger menu:

```
#myTarget.collapse.navbar-collapse
	ul.nav.navbar-nav
		li(ng-class="{ active: isActive('/')}")
			a(ng-href='#/') Home
		li(ng-class="{ active: isActive('/edit')}")
			a(ng-href='#/edit') Edit
		li(ng-class="{ active: isActive('/subjects')}")
			a(ng-href='#/subjects') Subjects
		li(ng-class="{ active: isActive('/comments')}")
			a(ng-href='#/comments') Comments
		li(ng-class="{ active: isActive('/about')}")
			a(ng-href='#/about') About

```

In Chrome, choose the **Toggle Device Mode** option and select your mobile device, or several mobile devices.

Don't forget to add in the meta data in **layout.jade**:

```
html
	head
		meta(charset='utf-8')
		meta(name='description', content='Final by Charlie Calvert for Prog 219 Spring 2015')
		meta(name='viewport', content='width=device-width, initial-scale=1')
		title= title
		etc...
```

The viewport is essential to make it work on a mobile device. See HTML5 Boilerplate web site for latest and details.

This is the example that I use when I get confused about how to build menus:

- <http://getbootstrap.com/examples/theme/#>

## Sorting

Arrays have a sort function. For simple arrays, you can just call sort
and JavaScript will figure out what to do. If you have an array of
object, however, it is often necessary to create a custom callback. The
callback allows you to compare two items from the array, returning:

- one if the first is larger
- Minus 1 if the second is larger
- 0 if they are equal

Lets assume we have a simple object with an id and name. We place these
objects in an array:

```
	var allNames = [{id: scientist._id, name: scientist.firstName + ' ' + scientist.lastName}];
```

Here we have only one item in the array, but if we had more items we would
want to sort the array by name. We could approach that task like this:

```
allDataNames.sort(function(scientistA, scientistB) {
	if (scientistA.name > scientistB.name) {
		return 1;
	}
	if (scientistA.name < scientistB.name) {
		return -1;
	}
	// a must be equal to b
	return 0;
});
```

## Routing Comments

We need to set up a separate route for comments. This means making edits to the server side **app.js** and adding a new file called **routes/comment.js**.

We should also have a separate http factory. It contains everything from our subdocs code that is not already in mongoFactory. In particular, get the code for updating, inserting and deleting comments. Here is the beginning of **public/javascripts/comment-factory.js**.

```
(function() {

	var app = angular.module('elvenApp');

	app.factory('commentFactory', function($http) {

		var commentFactory = {

			newComment: function(scientist, text) {
				etc...
```

The methods are **newComment**, **updateComment** and **deleteComment**. You will also need a **routes/comments.js** file that contains the three corresponding routes from the subdocs **routes/index.js** assignment. The top of **routes/comments.js** looks like this:

```
var express = require('express');
var router = express.Router();
var connect = require('./connect');
var scientists = require('../models/scientists');
var fs = require('fs');


router.post('/newComment', function(request, response) {

	if (!connect.connected) {
		connect.doConnection();
	}

console.log('newComments called. Body is next: ');

etc...
```

Because you now have two files that need to connect to the MongoDb database, you will probably want to create a file called **routes/connect.js** that you use in both **routes/index.js** and in **routes/comments.js**. It might look like this:

```
var mongoose = require('mongoose');

var connect = {

	connected: false,

	doConnection: function() {
		connect.connected = true;
		var userName = 'csc';
		var password = 'Re*lD*t*22#';
		var siteAndPort = 'ds049848.mongolab.com:49848';
		var databaseName = 'elvenlab01';
		var url = 'mongodb://' + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;
		console.log(url);
		mongoose.connect(url);

		// This part is optional
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function(callback) {
			connected = true;
			console.log('Opened connection to mongo');
		});
	}
};

module.exports = connect;
```

Take a close look at the beginning of **newComments** above. Notice how it ensures you are connected before trying to access the database:

```
if (!connect.connected) {
	connect.doConnection();
}
```

The code in **app.js** that links in **routes/comments** should be familiar by now:

```
var routes = require('./routes/index');
var science = require('./routes/science');
var comments = require('./routes/comments');
var app = express();
```

Some of the details will differ in your program, but the general approach is similar.

And then a bit further on in the server side **app.js** file we add more famiilar code:

```
app.use('/', routes);
app.use('/ScienceInfo', science);
app.use('/comments/', comments);
```

## Routing Login
