## Description

Working with Mongoose subdocuments. 

Reference: [http://mongoosejs.com/docs/subdocs.html](http://mongoosejs.com/docs/subdocs.html)

## Step One

Create the project

    express Week10-MongooseSubdocs
    cd Week10-MongooseSubdocs
    npm install mongoose --save
    copy %ELF_TEMPLATES%\.bowerrc
    bower init
    bower install angular --save
    bower install angular-route --save
    bower install bootstrap --save

Set the port to 30025 and in **routes/index.js** set the title to **Mongoose SubDocs LastName**. Add **nodemon** to the **start** script in **package.json**.

Save JSON data as **ValidScientists.json**:

- [Scientists JSON data][scidata]

## Step Two

Define the Mongoose documents.

The key thing to notice is that we have a main document and an array of sub-documents. In particular, each scientist document has zero or more comments associated with it. The comments take the form of sub-documents. Notice how the **comments** field of the **scientistSchema** is declared.   

```
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

module.exports = {
	comment: mongoose.model('comment', commentSchema),
	scientist: mongoose.model('scientist', scientistsSchema)
};
```

[scidata]: https://gist.github.com/charliecalvert/059f2f74d5bf2d98c6f8

## Step Three

Define the views

Here is layout.jade:

```
doctype html
html
	head
		title= title
		link(rel='stylesheet', href='/stylesheets/style.css')
		link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
		script(src="components/jquery/dist/jquery.js")
		script(src="components/bootstrap/dist/js/bootstrap.js")
		script(src="components/angular/angular.js")
		script(src="javascripts/control.js")
		script(src="javascripts/mongo-factory.js")
	body(ng-app='elvenApp')
		block content
```

Here is index.jade:

```
extends layout

block content
	h1= title
	p Welcome to #{title}

	div(ng-controller='MainController as mainController')

		div.names
			div.btn-group
				button.btn.btn-default(ng-click='mainController.emptyCollection()') Empty Collection
				button.btn.btn-default(ng-click='mainController.insertValidCollection()') Insert Valid Collection

		div.names
			ul
				li(ng-repeat='scientist in mainController.scientists')
					a(ng-click="mainController.selectScientist(scientist)") {{scientist.name}}

		div.names
			div
				label(class='col-sm-2, control-label') First:
				span {{mainController.scientist.firstName}}
			div
				label(class='col-sm-2, control-label') Last:
				span {{mainController.scientist.lastName}}
			div
				label(class='col-sm-2, control-label') Subject:
				span {{mainController.scientist.subject}}

		div.names
			ul
				li(ng-repeat='comment in mainController.scientist.comments')
					a(ng-click="mainController.selectComment(comment)") {{comment.commentText}}

		div.names(ng-form="newCommentForm")
			button.btn.btn-default(ng-click='mainController.newComment()') New Comment
			hr
			label(class='col-sm-2, control-label') Text
			input.form-control(type='text', ng-model='mainController.newCommentText')

		div.names(ng-form="myform")
			button.btn.btn-default(ng-click='mainController.updateComment()') Update Comment
			button.btn.btn-default(ng-click='mainController.deleteComment()') Delete Comment
			hr
			label(class='col-sm-2, control-label') Text
			input.form-control(type='text', ng-model='mainController.comment.commentText')
			br
			label(class='col-sm-2, control-label') Date
			input.form-control(type='text', ng-model='mainController.comment.date')
			br
			label(class='col-sm-2, control-label') Id
			input.form-control(type='text', ng-model='mainController.comment._id')

```

## Step Four

Define the back end

Here is **index.js**

```
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var scientistSchema = require('../models/scientists');
var scientists = scientistSchema.scientist;
var comments = scientistSchema.comment;
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {title: 'Express'});
});

var allData;
var connected = false;
var numberOfScientists = 0;
var totalScientistsSaved = 0;

function doConnection() {
	connected = true;
	var userName = 'csc';
	var password = 'Re*lD*t*22#';
	var siteAndPort = 'ds049848.mongolab.com:49848';
	var databaseName = 'elvenlab01';
	var url = 'mongodb://' + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;
	console.log(url);
	mongoose.connect(url);
}

function insertScientist(scientist, response) {
	if (!connected) {
		doConnection();
	}
	var newScientist = new scientists({
		"firstName": scientist.firstName,
		"lastName": scientist.lastName,
		"subject": scientist.subject,
		"subjects": scientist.subjects,
		"comments": scientist.comments
	});

	console.log('inserting', newScientist.lastName);

	newScientist.save(function(err) {
		console.log('saved: ', newScientist.lastName);
		totalScientistsSaved++;
		if (totalScientistsSaved === numberOfScientists) {
			//mongoose.disconnect();
			response.send({result: 'Success'});
		}
	});
}

function writeData(fileName, data) {
	var data = JSON.stringify(data, null, 4);
	fs.writeFile(fileName, data, function(err, data) {
		if (err) throw(err);
		console.log('success writing file');
	});
}

function readDataAndInsert(response) {
	fs.readFile('ValidScientists.json', function(err, scientists) {
		if (err) throw (err);
		numberOfScientists = scientists.length;
		scientists = JSON.parse(scientists);
		for (var i = 0; i < scientists.length; i++) {
			insertScientist(scientists[i], response);
		}
	});
}

router.get('/all-data', function(request, response) {
	if (!connected) {
		doConnection();
	}

	scientists.find({}, function(err, data) {
		console.log(data.length);
		console.log(data[0]);
		allData = data;

		writeData('scientists.json', allData);

		response.send({
			result: 'Success',
			allData: data
		});
	});
});

router.post('/emptyCollection', function(request, response) {
	scientists.remove({}, function(err) {
		response.send({result: 'collection removed'});
	});
});

router.post('/insertValidCollection', function(request, response) {
	readDataAndInsert(response);
});

router.post('/newComment', function(request, response) {
	if (!connected) {
		doConnection();
	}

	console.log('newComments called. Body is next: ');
	console.log(request.body);
	var scientist = request.body.scientist;
	var comment = request.body.comment;

	scientists.findOne({"_id": scientist._id }, function(err, scientist) {
		console.log('After Find.');
		console.log(scientist);
		if (scientist.comments) {
			scientist.comments.push(comment);
			scientist.markModified('comments');
			scientist.save(function(err, data) {
				console.log('After save.');
				console.log("Error:", err);
				console.log("Data: ", data);
				response.send({result: 'Success', data: data});
			});
		} else {
			response.send({result: 'Error'});
		}
	});
});

function remove(arr, item) {		
	for(var i = arr.length; i--;) {		
		if(arr[i]._id == item._id) {			
			arr.splice(i, 1);
		}
	}
}

router.post('/deleteComment', function(request, response) {
//	throw("not implemented");
	if (!connected) {
		doConnection();
	}

	var scientist = request.body.scientist;
	var comment = request.body.comment;
	console.log(comment);
	scientists.findOne({"_id": scientist._id }, function(err, scientist) {
		if (scientist.comments) {
			remove(scientist.comments, comment);
			scientist.markModified('comments');
			scientist.save(function(err, updatedScientist) {
				console.log(updatedScientist);
				console.log('After save.');
				response.send({result: 'Success', update: updatedScientist});
			});
		} else {
			response.send({result: 'Error'});
		}
	});
});

router.post('/updateComments', function(request, response) {
	if (!connected) {
		doConnection();
	}

	console.log('updateComments called. Body is next: ');
	console.log(request.body);
	scientists.update({_id: request.body.id}, {
			$set: {
				comments: request.body.comments
			}
		},
		function(err, electionObject) {
			console.log(err, electionObject);
			if (err) {
				console.log(err);
			}
			response.send({result: 'Success', electionObject: electionObject});
		}
	);
});

module.exports = router;
```


## Step Five

Define the front end

Here is **public/javascripts/control.js**:

```
(function() {

	var app = angular.module('elvenApp', []);

	app.controller('MainController', function(commentFactory) {
		
		var mainController = this;

		mainController.newComment = function() {
			commentFactory.newComment(mainController.scientist, mainController.newCommentText);
		};

		mainController.updateComment = function() {
			commentFactory.updateComment(mainController.scientist);
		};

		mainController.selectScientist = function(scientist) {
			commentFactory.getScientistById(scientist.id, mainController)
		};

		mainController.selectComment = function(comment) {
			mainController.comment = comment;
		};

		mainController.insertValidCollection = function() {
			commentFactory.insertValidCollection();
		};

		mainController.emptyCollection = function() {
			commentFactory.emptyCollection();
		};

		mainController.deleteComment = function() {
			commentFactory.deleteComment(mainController.scientist, mainController.comment);
		};


		commentFactory.getScientists(mainController);
		console.log(mainController.scientists);
	});

})();
```

Here is **public/javascripts/comment-factory.js**:

```
(function() {

	var app = angular.module('elvenApp', []);

	app.controller('MainController', function(commentFactory) {
		
		var mainController = this;

		mainController.newComment = function() {
			commentFactory.newComment(mainController.scientist, mainController.newCommentText);
		};

		mainController.updateComment = function() {
			commentFactory.updateComment(mainController.scientist);
		};

		mainController.selectScientist = function(scientist) {
			commentFactory.getScientistById(scientist.id, mainController)
		};

		mainController.selectComment = function(comment) {
			mainController.comment = comment;
		};

		mainController.insertValidCollection = function() {
			commentFactory.insertValidCollection();
		};

		mainController.emptyCollection = function() {
			commentFactory.emptyCollection();
		};

		mainController.deleteComment = function() {
			commentFactory.deleteComment(mainController.scientist, mainController.comment);
		};


		commentFactory.getScientists(mainController);
		console.log(mainController.scientists);
	});

})();
```

## Turn it in

Submit the project in your repository in a folder called **Week10-MongooseSubdocs**