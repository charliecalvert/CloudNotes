## Description

This is the followup to the [MongooseBasics assignment][mb].

The main goal will be to create multiple pages:

- Main Page: View the data
- Edit: Edit scientist name and main subject
- Subjects: Edit a list of subjects associated with a scientist
- Comments: Comment on a scientist
- About: Standard about page

We are breaking the app up into multiple pages for several reasons:

- It creates a number of small pages that will fit on a mobile device
- It helps the user understand each discreet task by isolating it on a simple page
- It teaches you how to create and maintain a multi-page angular application

References:

- The Mongoose Slides: [http://bit.ly/elf-mongoose](http://bit.ly/elf-mongoose)
- [Week09 Overview](http://www.ccalvert.net/books/CloudNotes/Prog219/Prog219-Week09-2015.html)
- [Prog219 Resources](http://www.ccalvert.net/books/CloudNotes/Prog219/Prog219-Resources.html)

## Mongoose Updates

There are several updates to the code we wrote on Monday.

### Update Schema

In **modules/scientists**, the **subjects** array should look like this: 

    subjects: [String].

Here is the entire schema so you can see the change in context:

```
var scientistsSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "subject": String,
    "subjects": [String],
    comments: [{ body: String, date: Date }]
});
```

You should be able to make this change without modifying the rest of your code.

[mb]: http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseBasics.html 

### Remove Numeric Input

Remove the numeric input from **index.jade** and from **control.js**. This means we no longer need:

- **currentItem** in either **control.js** or in **mongo-factory**.
- The **indexChanged** method in **control.js**.
- The numeric input in **layout.jade**

## Clickable Items

With the numeric input gone, we need another way to select items. We will do that by making each item in our list a hyperlink:

```
	li(data-ng-repeat='scientist in mongoController.allData')
		<a ng-click="selectScientist(scientist)"> {{scientist.id}} {{scientist.name}} </a>
```

The selectScientist method looks like this:

```
		mongoController.selectScientist = function(scientist) {
			mongoFactory.getScientistById(scientist.id, mongoController);
		};
```

## MongoFactory Search

Right now the structure of our **mongoFactory** looks like this:

```
	var app = angular.module('elvenApp');

	app.factory('mongoFactory', function($http) {

		return {
                        // code omitted here
		};		
	});
```

Let's make a slight change to that code so that we can reference the factory itself from within the factory:

```
	var app = angular.module('elvenApp');

	app.factory('mongoFactory', function($http) {

		var mongoFactory =  {
                        // code omitted here
                        // With this new structure, we can reference the mongoFactory in here.
		};		

               return mongoFactory;
	});
```

We don't have a **getScientistById** method, so let's make some changes to **mongo-factory.js** that make it possible. We are going to add two properties:

- **currentId**: This is the MongoDb **id** of the currently selected scientist. It is long and looks a bit like GUID or UUID.
- **allData**: When we retrieve the list of scientists, we can store it in this property

We will have to make some changes to **mongoFactory.getScientists** to support these new properties. Notice that we initialize both properties after retrieving the list of scientists from the server:


```
currentId: null,

allData: null,

getScientists: function(controller) {
	$http.get('/all-data').success(function(data) {
		controller.scientistsLength = data.allData.length;
		mongoFactory.allData = data.allData;
		mongoFactory.currentId = data.allData[0]._id;
		allDataNames = data.allData.map(function(scientist) {
			return {id: scientist._id, name: scientist.firstName + ' ' + scientist.lastName};
		});
		controller.allData = allDataNames;
		mongoFactory.getScientistById(mongoFactory.currentId, controller);
	}).error(function() {
		console.log("error");
	});
},
```

If you look at the mongoFactory.getScientists method, you can see that it frequently references itself:

```
    mongoFactory.allData = data.allData
```

Being able to write that kind of code was why we made the change to the structure of the factory. Our goal is to avoid using **this** whenever possible. In particular, we don't want to accidentally reference this thinking that it points to **mongoFactory** when it actually points to the global object. 

Now that we can track the list of scientists and a currently selected scientist, it becomes easy to retrieve a scientist by MongoDb **id**:

```
getScientistById: function(id, controller) {
	mongoFactory.currentId = id;
	var items = mongoFactory.allData.filter(function(scientist) {
		return scientist._id === id;
	});
	return controller.data = items[0];
}
```

This method uses the javascript [**filter**][filter] method. The **filter** method is an of javascript's support for [functional programming][high].




## The Menu

We need a menu in **index.jade** so the user can access each page.

```
extends layout
block content
	.container
		.header
			nav.navbar-default.navbar-fixed-top
				ul.nav.nav-pills
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
		div.jumbotron
			h1= title
			p Welcome to #{title}

		#monogoData(data-ng-view="")
```

We will need to modify this menu next week. When run on a phone, for instance, we need it to morph into a hamburger menu. But for now, let's keep it as simple as possible.

## Program Structure

We need jade and javascript files to support each of the menu items:

| Menu | Jade | JavaScript |
| ------------- |:-------------:| -----:|
| Home| main.jade| control.js |
| Edit| edit.jade | edit.js |
| Subjects| subjects.jade | subjects.js |
| Comments | comments.jade| comments.js|
| About| about.jade|about.js| 

You can sketch out these files by putting code like this in each jade file:

    h1: About

And in the javascript files, you can put code like this:

```
(function() {

	var app = angular.module('elvenApp');

	app.controller('CommentsController', function($http, mongoFactory) {
		var commentsController = this;

		commentsController.hint = "Edit Document";
	});

})();
``` 

It should be obvious the small changes that need to be made to this sample code in order to make it unique to a particular file. For instance, in **subjects.jade** one would write: **h1: Subjects**. You can use the **app.js** file shown below to help you fill in the details, if they are not already obvious to you.

We also need to create a file where we can specifyg our client side routes. The file, will be called **app.js** and it belongs in the **public/javascripts** folder. It structure should be second nature to you by this time:

```
var myModule = angular.module("elvenApp", [ 'ngRoute' ]);

myModule.config(function($routeProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl : "main",
		controller : "MongoController",
		controllerAs: "mongoController"
	}).when('/edit', {
		templateUrl : "edit",
		controller : "EditController",
		controllerAs: 'editController'
	}).when('/subjects', {
		templateUrl : "subjects",
		controller : "SubjectsController",
		controllerAs: 'subjectsController'
	}).when('/comments', {
		templateUrl : "comments",
		controller : "CommentsController",
		controllerAs: 'commentsController'
	}).when('/about', {
		templateUrl : "about",
		controller : "AboutController",
		controllerAs: 'aboutController'
	}).otherwise({
		redirectTo : '/'
	});
});
```

## Posting Data

We want to update the database, we have to post data from the client to the server and from the server to the database. Information about the transaction is that routed back to the client.

On the client side, we use **$http.post** to send data to the server. These calls take two parameters:

- The route we want to call on the server. For instance: **'/data'**.
- The new data that we want to send to the database. This is the update itself.

First, let's create a helper function that can handle our success and error messages:

```
    report: function(data, status, headers, config) {
		console.log(data);
		console.log(status);
		console.log(headers);
		console.log(config);
	},
```

Now lets compose the **$http** requests that will send data to the server. There are three of them:

- Update the **firstName**, **lastName** and main **subject**.
- Update the detailed list of **subjects**.
- Update the the list of **comments**.

Here is what the code in **mongoFactory** looks like. Remember that each method is  requests to update the database. It will be sent to the server using REST calls:

```
			postDocument: function(route, controller) {
				var scientist = {
					id: controller.data._id,
					firstName: controller.data.firstName,
					lastName: controller.data.lastName,
					subject: controller.data.subject
				};
				$http.post(route, scientist)
				.success(function(data, status, headers, config) {
					mongoFactory.report(data, status, headers, config);
				}).error(function(data, status, headers, config) {
					mongoFactory.report(data, status, headers, config);
				});
			},

			postSubjects: function(initId, subjects) {
				var subjectsUpdate = {
					id: initId,
					subjects: subjects
				};
				$http.post('/updateSubjects', subjectsUpdate)
				.success(function(data, status, headers, config) {
					mongoFactory.report(data, status, headers, config);
				}).error(function(data, status, headers, config) {
					mongoFactory.report(data, status, headers, config);
				});
			},

			postComments: function(initId, comments) {
				var subjectsUpdate = {
					id: initId,
					comments: comments
				};
				$http.post('/updateComments', subjectsUpdate)
				.success(function(data, status, headers, config) {
					mongoFactory.report(data, status, headers, config);
				}).error(function(data, status, headers, config) {
					mongoFactory.report(data, status, headers, config);
				});
			},

```

In **routes/index.js** we respond to the requests that originate in **mongoFactory**:


```
router.post('/insert', function(request, response) {
	console.log('Save called. Body is next: ');
	//var newData = getNewData(request.body);
	var newData = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		subject:  request.body.subject,
		comments: [],
		subjects: []
	};
	console.log("New Data", newData);

	if (!connected) {
		doConnection();
	}

	console.log("about to call update");
	var f = new scientists(newData);
	f.save(function(e, a) {
		response.send({result: e + a});
	});
});

router.post('/updateSubjects', function(request, response) {
	console.log('updateSubjects called. Body is next: ');
	console.log(request.body);
	scientists.update({ _id: request.body.id }, {
			$set: {
				subjects: request.body.subjects
			}
		}, function(err, numUpdated) {
			console.log(err, {numUpdated: numUpdated});
			if (err) {
				console.log(err);
			}
			response.send({result: 'Success', data: numUpdated});
		}
	);
});

router.post('/updateComments', function(request, response) {
	console.log('updateComments called. Body is next: ');
	console.log(request.body);
	scientists.update({ _id: request.body.id }, {
			$set: {
				comments: request.body.comments
			}
		}, function(err, numUpdated) {
			console.log(err, {numUpdated: numUpdated});
			if (err) {
				console.log(err);
			}
			response.send({result: 'Success', data: numUpdated});
		}
	);
});
```

## Subjects

Here is the code for inserting and updating the detailed list of subjects. It belongs, of course, in **public/javascripts/subjects.js**:

```
(function() {

	var app = angular.module('elvenApp');

	app.controller('SubjectsController', function($http, mongoFactory) {
		var subjectsController = this;

		subjectsController.hint = "Edit Document";

		subjectsController.addItem = function() {
			subjectsController.data.subjects.push(subjectsController.newSubject);
		};

		subjectsController.saveItems = function() {
			mongoFactory.postSubjects(subjectsController.data._id,
				subjectsController.data.subjects);
		};

		subjectsController.deleteSelected = function() {

		};

		function getScientist() {
			mongoFactory.getScientistById(mongoFactory.currentId, subjectsController);
		}

		getScientist();
	});

})();
```

The code starts in **getScientist** by retrieving the current record from the **mongoFactory**:

		mongoFactory.getScientistById(mongoFactory.currentId, subjectsController);

This code works because the factory is always tracking the currently selected record back on the main page.




[filter]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[high]:http://eloquentjavascript.net/05_higher_order.html

[mb]: http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseBasics.html