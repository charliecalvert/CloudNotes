---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AngularOnePage.md
relativePath: Assignments/AngularOnePage.md
title: AngularOnePage
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: AngularOnePage.md
fileNameHTML: AngularOnePage.html
---


<!-- toc -->
<!-- tocstop -->

## Description

Incorporate the Moongoose editor material into your midterm project. Start by copying your existing midterm into a folder called **Week10-AngularOnePage**.

We will break this assignment into parts. To complete this assignment, complete only Part I. We will do Part II after class on Monday:

1. Add a menu and multiple pages that allow the user to switch between the following views:
  - Home
  - Edit
  - Subjects
  - Comments
  - About
1. In a later assignment we will incorporate the Mongoose database into our program.

For this assignment, I expect you to complete part 1, and to make a start on part 2. In a later assignment we will complete part 2.

## Single Page

This is the part due first. The key features needed to turn our midterm into a true single page app are:

- An expanded menu similar to the one found in the **MongooseEditor** assignment.
- Multiple pages that can be swapped in while maintaining an unchanged header. Again, this is similar to the functionality found in the **MongooseEditor** project.

In most cases, this should be a fairly straightforward operation. There are, however, one or two midterm projects created by students where incorporating these new pages might be a bit tricky. I think, however, that everyone should be able to create the following pages with little trouble:

- Home
- Edit
- Comments
- About

It's the subjects page that is likely to cause problems in a few cases. For now, I'll ask only that you do the best you can.

These pages don't really have to do much at this point. I just want you to be able to load them. It is okay if they say nothing more than the following, where each word stored in a jade file using the H1 tag:

- Main
- Edit
- Subjects
- Comments
- About

In other words, I want you to create the following files and to be able to display or use them when I click on the menu items:

| Menu           | Jade           | JavaScript   |
| --------------:| --------------:| ------------:|
| Home           | main.jade      | control.js   |
| Edit           | edit.jade      | edit.js      |
| Subjects       | subjects.jade  | subjects.js  |
| Comments       | comments.jade  | comments.js  |
| About          | about.jade     | about.js     | 

You should also include an **app.js** file similar to the one in the **MongooseEditor** project.

## Mongoose

This part of the assignment is not due yet. It is just a peak at where we are headed.


## Turn it in

Submit you work in a folder called **Week10-AngularOnePage**.

## Hints

Here are various comments that I have made on student's programs. These are some of the most common mistakes I found when grading this assignment.

### Angular Route

Be sure to include the **angular-route** package in your **bower.json** file. You may have installed **angular-route** on your machine, but that does little good unless this package is included in **bower.json**.  The fix:

    bower install angular-route --save

The **--save** switch saves the request to load this package into **bower.json**.

Some students needed to remember to save **bootswatch** to **bower.json** if they choose to use it:

    bower install bootswatch --save

Then edit bower.json to remember the +1 if it is present. If you see:

     "bootswatch": "~3.3.4+1" 

Then change it to this:

    "bootswatch": "~3.3.4"

### Define Routes

This is the glue code that matches up the templates to the controllers. 


```
angular
    .module("progApp", [ 'ngRoute', 'School'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when("/", {
            templateUrl : "main",
            controller : "MyController",
            controllerAs: "myController"
        }).when('/edit', {
            templateUrl : "edit",
            controller : "EditController",
            controllerAs: 'editController'
        }).when('/districts', {
            templateUrl : "districts",
            controller : "DistrictsController",
            controllerAs: 'districtsController'
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

With the exception of **main**, each route should have matching pairs of client side controllers and server side jade files. Consider this client side route:

```
when('/comments', {
    templateUrl : "comments",
    controller : "CommentsController",
    controllerAs: 'commentsController'
})
```

When you see something like that, you can more or less assume that the following files exist:

- public/javascripts/comments.js
- views/comments.jade

The first file defines the **controller** and the **controllerAs**. The second file, the jade file, defines the template designated by the **templateUrl**.

## Loading Views

Make sure you have code to load the jade pages when they are requested by the client side routes. The code for loading these views usually goes in **routes/index.js:**:


```javascript
router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  res.render( req.params.id, { title: req.params.id });
});
```

### Include Files

I noticed that not everyone was linking in *subjects* in **layout.jade**.

    script(src="javascripts/subjects.js")
    script(src="javascripts/comments.js")

That will cause an undefined error:

Argument 'SubjectsController' is not a function, got undefined

As mentioned above, each of the two client side JavaScript files has matching jade files:

- **views/subjects.jade**
- **views/comments.jade**

### Controllers

To make this program work, you need to declare at least minimal controllers in your client side JavaScript. For instance, if you had a page called public/javascript/login.js, and it was declared in **app.js** to have a controller, then you need to write, at absolute minimum, something like this:

```
angular.module('elvenApp').controller('LoginController', function() {
    var loginController = this;
});
```

### Use One Name for Topic

Suppose your topic was **scientists**. In that case, then the property on your controllers that holds the current instance of your topic should be called scientists both in the controller and in **mongo-factory.js**.

For instance, this would cause an error:

- subjectsController.data.subjects  // In subjects.js
- controller.scientist.subjects         // In mongo-factory


### Indent menu properly

Here is an example of a working menu for this project:

```
extends layout
block content
	.container
		.header
			nav.navbar-default.navbar-fixed-top
				ul.nav.nav-pills
					li(ng-class="{ active: isActive('/')}")
						a(ng-href='#/') Home

					li(ng-class="{ active: isActive('/')}")
						a(ng-href='#/edit') Edit

					li(ng-class="{ active: isActive('/')}")
						a(ng-href='#/comments') Comments

					li(ng-class="{ active: isActive('/')}")
						a(ng-href='#/Subjects') Subjects

					li(ng-class="{ active: isActive('/about')}")
						a(ng-href='#/about') About
		div.jumbotron
			h1= title
			p Welcome to #{title}
		#monogoData(data-ng-view="")
```