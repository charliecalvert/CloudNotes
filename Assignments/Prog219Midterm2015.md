## Description

Please check back later, as this document is likely to be updated.

There are three main features I want to see in your midterm:

- A relatively polished version of MangoExpress.
- Running on EC2
- Including at least three working unit tests
- And incorporating Angular Routing

## Mango Express

I'm not yet looking for a polished final version of your application. What I'm looking for here might be thought of as Version 0.5. It is a relatively stable proof of concept that shows where you would like to take the app by the end of the quarter. 

The app should include:

- NodeJs **Express** including **jade** and **express routes**
- Angular controllers and factories, using **ControllerAs** rather than **$scope** for most of your work.
- A MongoLab database
- Bootstrap menus, buttons and any other features you find attractive

## Running on EC2

This is the most problematic part. There is a tool called **upstart** that we will examine later that can keep your program running even after you exit your EC2 SSH session. However, we have not covered it yet. For now, I will settle for:

- screen shots of your MangoExpress program running on EC2
- And access to anything running on Port 80 of your EC2 instance

By Port 80, I mean the Apache server that you set up by [installing LAMP](http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux "LAMP on Linux (sudo tasksel install lamp-server)").  For now, you can just have the default page created when you installed the server. My goal here is just to have proof that your EC2 instance is up and running.

I will, of course, test your Mango Express on my home machine. In other words, it is important that the version of the program that you check in works, and that it looks more or less like the program in your screen shots. It need not be identical. If you make improvements after you take the screen shots, that is fine. Just don't change the program beyond all recognition, and make sure it still works.

## Unit Tests

We still have much work to do before we really understand unit tests. However, I would like to see that at least a few of tests run on your system. I'm looking for tests installed in your **test** folder, the one that is created when you type **yo jasmine**. I expect to be able to run the tests by loading your source in WebStorm, and right clicking on **test/index.html** and choosing run.

I want you to get all the tests from FacadeUi and MangoExpress working. Fr instance:

- "Prove that Jasmine loaded": that is, show that true equals true.
- Show that you can your access a **hint** property in your controller.
- And so on.

Unless you are absolutely sure you know what you are doing, don't try to write "integration tests" against your MongoDb database factories beyond what we did in FacadeUi and MangoExpress. More specifically, don't try to run tests that confirm that you can get hold of real database data. You should write integration tests that confirm you can use mock data from mock objects, just as you did in FacadeUI and MangoExpress. 

Most of the code is written for you and you completed it in FacadeUI and MangoExpress. You do, however, need to change the data in ScienceFacade and ScienceSimpleData to match the data in your main program. For instance, if you are writing an application with the theme of music, then the data in SimpleScienceData must match the data in your main program. It must be about music. That is, if you have chosen music as a theme. You should probably also change the name of the those files. For instance, to MusicSimpleData and MusicFacade. Most of you have done this already.
 
## Angular Routing

The key is that you have code in your program that looks somewhat like the code in [this slide][angRoutes].

Start by adding Angular Route to your project:

    bower install angular-route --save

Then you will need to create the main and about jade files

    views/about.jade
    views/main.jade

At this stage, it does not much matter what you put in about.jade. This will do:

    p About 

In **main.jade**, you will want to put most of what you currently have in **index.jade**. I would leave only the jumbotron and its contents in index.jade. But of course you will want to add a menu:

```
extends layout
block content
	.container
		.header
			nav.navbar-default.navbar-fixed-top
				ul.nav.nav-pills
					li(ng-class="{ active: isActive('/')}")
						a(ng-href='#/') Home
					li(ng-class="{ active: isActive('/about')}")
						a(ng-href='#/about') About

		div.jumbotron
			h1= title
			p Welcome to #{title}

		#monogoData(data-ng-view="")
```

There are several ways to solve the next problem, but I created an **app.js** file in my **public/javascripts** directory. It can look more or less identical to the one in the [Angular Routing][angRouting] assignment. You don't need a **main.js** file on the client side, as you already have **Control.js**. You will, however, need an **about.js** file in the client. It can look very much like the corresponding file in the Angular Routing assignment.

One tricky thing can be setting up the routing on the server side. You are now going to load **about.jade** and **main.jade** from **routes/index.js**. That means you want to change the code in that file to look in the **views** directory for paramters. In particular, it should not look for them in the **views/ScienceInfo** directory, or its equivalent in your application. 

So how are we going to load ScienceInfo files like **physics**, **astronomy** and **radioactivety**? One solution is to do this. Create a **routes\science.js** file with this content:

```
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/:id', function(req, res, next) {
  console.log('ScienceInfo', req.params.id);
  res.render('ScienceInfo/' + req.params.id, { title: 'Astronomy' });
});

module.exports = router;

```

In the root of your entire project, open up **app.js**. (This is not the **app.js** you may have added on the client side.) Around line 9 of **app.js** add this line:

    var science = require('./routes/science');

Around line 26, add this line:

    app.use('/ScienceInfo', science);

Okay, now you have a way to handle **ScienceInfo routes**. But there is one more step you need to take to complete the process. You also have to add **ScienceInfo** to the route you call when you load your equivalents of the **astronomy**, **physics**, etc files. This is the URL you will send back to your server from the client when **loadDocument** is called.

The fix is simple. In **Control.js** update **loadDocument**. You will need to include **/ScienceInfo/** in the route you pass to **$http.get**:

```
myController.loadDocument = function() {
            $http.get('/ScienceInfo/' + myController.subject.toLowerCase())
            // etc. The rest is the same
```

Now your routes should be working, and you should be able to load your jade files. Here is break down of what we have done:

- **main.jade** and **about.jade** are loaded from the routes in **routes/index.js**. These are triggered when you select items from the menu. These routes pass through the client side **public/javascripts/app.js.** file.
- The loading of your equivalent of the **astronomy** etc files are triggered in **Control.js** when **loadDocuments** is called. On the server side, these requests pass through the routes in **routes/science.js**.

To test the route for the custom files such as **astronomy**, enter a URL like this in the address field of your browser:

- <http://localhost:30025/ScienceInfo/astronomy>

To test main, enter something like either of these:

- <http://localhost:30025/#/main>
- <http://localhost:30025/main>

The former will probably resolve your angular routes, while the latter will not. The second URL, can, however, prove that your route to **views/main.jade** is set up correctly.  

After doing all this, you may find that your unit tests are no longer running. To get the unit tests back on their feet you will need to add, at minimum, **angular-route.js** to **index.html**. I think you will also need to load the client side version **app.js**, but I'm not sure of that. 

You may find that the unit tests on the client side (Test.js) won't pass the test that asks for the length of the hint in the input control. To fix that, place this code at the top of your client side tests:

```
 // Wait half a second to allow main (myController) to load
 beforeAll(function(done) {
     console.log('outer');
     setTimeout(function() {
         var value = 0;
         done();
     }, 500);
 });
``` 

The goal is to **main.js** time to load. In some cases, you may need to wait longer than 500 milleseconds, depending on performance on your machine.

**NOTE**: *When I talk about the client side, I'm talking about the files in the **public** directory. In particular, I'm usually talking the files in the **public/javascripts** directory.*

[angRoutes]:https://docs.google.com/presentation/d/1V2Hu53TXH7COUT50MCskIHn1N3H4nEvHCOpxykgTaeY/edit#slide=id.g9f89ca564_0_72

[angRouting]:http://www.ccalvert.net/books/CloudNotes/Assignments/AngularRouting.html

## Extra Credit

Set up Grunt and jshint to process all your java script files when the command **grunt jshint** is issued at the command line. Your **result.xml** file should come back clean. If it does not, which might be understandable at this stage, add a comment to your submission explaining why you did not fix some of the errors mentioned in jshint report.

Including your screen shots of your EC2 instance on your EC2 Apache web server. For instance, create a custom **index.html** file and in that file use image tags to include your screen shots of your Mango Express server running on your EC2 instance.  


## Notes

For the midterm, we should rename methods in **Control.js** like **loadScientists**. Unless you are still working with Scientists, then **loadScientists** doesn't make sense any more. (I would of course, greatly prefer that you are not working with Scientists on the midterm. Have some fun and come up with something new. 

And the field names should change to fit in with your new data. For instance, **firstName** and **lastName** no longer make sense. This means that the names in your **collection/table** should change also.

Because they are executed in callbacks, I believe it is better to write myController.loadDocument rather than this.loadDocument. 

### Load Marie

The Load Marie button, or some variant of it, should still be available. It should use a directive, the way the Load Marie button does. Perhaps it would be something like "Load Current Record".

## Turn it in

Include at least two screen shots of the app running on EC2. Attach the screen shots directly to the assignment submission. Use PNG or JPG format for the images. Do not embed the screen shots in Word, and do not place them in a zip file. Simply attached the raw PNG or JPG files directly to your assignment submission.

Put your source for the project in a folder called Week08-Midterm and check it into your repository. Be sure to include up to date **package.json**, **bower.json** and **bowerrc** files. 

