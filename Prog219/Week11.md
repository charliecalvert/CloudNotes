---
creationLocalTime: 3/26/2022, 10:23:54 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog219/Week11.md
relativePath: Prog219/Week11.md
title: Week11
queryPath: Prog219/
subject: Prog219
fileNameMarkdown: Week11.md
fileNameHTML: Week11.html
---


<!-- toc -->
<!-- tocstop -->

## Description

Thoughts and hints during finals week.

Please note that next school year I should be teaching:

- ISIT320 in the fall
- ISIT322 in Winter
- Prog270 in Winter
- Prog272 in Spring
- Prog219 in Spring

Anyone who got through this course is welcome in both 320 and 322. Those are sophmore year courses and are part of the four year program. Having made it through this course should make 270 relatively simple for you, and Prog272 should be interesting but also a comfortable fit. 

In general, a lot of the same subjects we are covering here will be in all or most of those courses:

- Cloud, Git, AWS
- HTML, CSS, JavaScript
- Express, Angular
- NOSQL with either MongoDb or CouchDb
- Maybe a little Python in 320 and 322. We also did a lot of ThreeJS in 320 last year, but I'm not sure we will head that way this time around. 

## Shared Document on Google

Make sure everyone can find our shared document on Google docs. The **FromCharlie** document.

## Angular verison

Don't mix your versions of angular in bower.json

Wrong:

```
 "dependencies": {
    "angular": "~1.3.15",
    "angular-mocks": "~1.3.15",
    "angular-resource": "~1.4.0",
    "angular-route": "~1.4.0"
  }
```

Right:

```
 "dependencies": {
    "angular": "~1.4.0",
    "angular-mocks": "~1.4.0",
    "angular-resource": "~1.4.0",
    "angular-route": "~1.4.0"
  }
```

## Bootswatch Gotcha

For some reason, typing bower install bootswatch --save generates this code in bower.json:

```
  "dependencies": {
    "angular": "~1.4.0",
    "bootstrap": "~3.3.4",
    "angular-route": "~1.4.0",
    "bootswatch": "~3.3.4+1"
  }
```

Having this code in your bower.json file won't necessarily cause on error on your end, but it does cause an error when I type **bower install**.

The problem is that the bootswatch dependency in **bower.json** is not valid bower syntax, or perhaps bower has a bug and cannot process this syntax:

    "bootswatch": "~3.3.4+1"

Regardless of why it occurs, you have to fix it like this:

    "bootswatch": "~3.3.4"

Or perhaps like this:

    "bootswatch": "3.3.4+1"

The first is probably better. Please check all your projects, and especially your final, and make sure you don't turn in code like this. Your code should compile as is when you hand it in. Just think if you opened this project a year from now, when this stuff is no longer fresh in your mind, and you tried to run it and saw some error that made no sense to you. You can fix it now, but later your head won't be in this space, and even a simple error like this could throw you. Fix it so you can use your code later on.

## Test Code

In the previous section we talked about **bootswatch**.  The same things we said there are true for forgetting to add something to bower. For instance, if you type **bower install angular-route**, and forget to add the **--save** then it will work fine on your machine, but not on other machines. When you come back to the program much later you might not see as quickly as you do now just what is wrong. 

The take-away: **test your code!**. Before you submit, try doing a pull on your repository in a temp directory and see if it works for someone who is trying to bootstrap the program from the source you provide. Someday, that someone might well be you. Do you future self a favor: **test your code**.

## Jasmine Version

Make sure you are using the correct version of Jasmine.

Wrong:

```javascript
{
 "name": "testlive",
 "version": "0.0.0",
 "dependencies": {
     "jasmine": "~1.3.1"
 },
 "devDependencies": {}
}
```

It should be a later version, like this:

```javascript
{
 "name": "testlive",
 "version": "0.0.0",
 "dependencies": {
   "jasmine": "~2.3.4"
 },
 "devDependencies": {}
}
```

Make sure you are loading all the jasmine files, including **boot.js**:

```HTML
<script src="bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
<script src="bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
<script src="bower_components/jasmine/lib/jasmine-core/boot.js"></script>
```

For instance, here is a sample **test/index.html** file:

```html
<!doctype html>
<html>
    <head>
        <title>Jasmine Spec Runner</title>
        <link rel="stylesheet" href="bower_components/jasmine/lib/jasmine-core/jasmine.css">
    </head>
    <body>
        <script src="bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
        <script src="bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
        <script src="bower_components/jasmine/lib/jasmine-core/boot.js"></script>

        <!-- include source files here... -->
        <!-- script src="../public/components/jquery/dist/jquery.js"></script -->
        <script src="../public/components/angular/angular.js"></script>
        <script src="../public/components/angular-mocks/angular-mocks.js"></script>
        <script src="../public/components/angular-route/angular-route.js"></script>
        <!-- include spec files here... -->
        <script src="../public/javascripts/ScienceFacade.js"></script>
        <script src="../public/javascripts/SimpleScienceData.js"></script>
        <script src="../public/javascripts/Control.js"></script>
        <script src="spec/test.js"></script>
        <script src="spec/TestScienceFacade.js"></script>
    </body>
</html>
```

## Jasmine and $httpBackend

I have added at least a little more text to my explanation of **$httpBackend**:

- <http://www.elvenware.com/charlie/development/web/JavaScript/Angular.html#mocking-objects-with-httpbackend>

Press F5 a few times to make sure you have the most recent copy if you are going back to that page after viewing it recently.

## Scope

A few students are still placing code outside the scope of the modules, factories and controllers that we are creating. For instance, in the code shown below the **remove** method is outside the scope the **scientists** factory. I'm showing the module, the constant and the factory, with all their interanal code elided. I then show the error, which is trying to add a method to the factory called **remove**. The problem is that the remove method is being placed outside the scope of the factory:

```javascript
angular.module('pres', ['ngResource'])
    .constant('CONFIG', {
        // Code Omitted here
    })
    .factory('scientists', function ($resource, CONFIG) {
    
        var scientists = $resource( ...

        // Code ommitted here

        return scientists;
    });

    scientists.prototype.remove = function (successCallback, errorCallback) {
        // Code omitted here
    };
```

It should be like this:

```javascript
angular.module('pres', ['ngResource'])
    .constant('CONFIG', {
        // Code Omitted here
    })
    .factory('scientists', function ($resource, CONFIG) {
    
        var scientists = $resource( ...

        // Code ommitted here

		scientists.prototype.remove = function (successCallback, errorCallback) {
			// Code omitted here
		};

        return scientists;
    });

```


Can you see that this will never work? The remove method is outside the factory itself. 


## Routes

You will need at least two middleware routing files on the server side to get the basic functionality up and running. You will need three if you want to properly handle **comments**.

Here are the files:

- **routes/index**: Use this file to handle requests for **main.jade**, **about.jade** and similar files.
- **routes/documents**: Use this or file with a similar name to handle requests for your topics documents. In the sample program, these documents have names like **physics.jade**, **astronomy.jade**, etc.
- **routes/comments**: Use this file for requests related to comments.

In **index.js** the code that handles requests for comments looks like this in my version of the final:

```javascript
router.get('/:id', function(request, response) {
	console.log(request.params.id);
	response.render(request.params.id, {});
});
```

In **documents.js**, the entire file looks like this in my version of final:

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/:id', function(req, res, next) {
  console.log('ScienceInfo', req.params.id);
  res.render('ScienceInfo/' + req.params.id, { title: 'Astronomy' });
});

module.exports = router;
```

The contents of my **routes/comments.js** file is discussed [elsewhere][comroute].

[comroute]:http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseComments.html#step-three

## Upstart

Make sure upstart is running on EC2

- [Upstart on Elvenware][upelf]
- [Sample Upstart script][upscript]

[upelf]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#upstart
[upscript]:https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/NodeCode/ExpressSend/ExpressSend.conf 

## Menus

## SignIn

This video shows one way to handle the login functionality in your application. This is not the only possible solution. You can do it differently, but if you are not sure what is wanted, this gives you an idea of what to shoot for. 

- [https://youtu.be/xCmgU7iSYO4](https://youtu.be/xCmgU7iSYO4)

## Comments 

Please see this explanation of sending requests from the browser, to the server, to the databases, and back. It is very important that you understand this operation.

- Sending a [new comment][restreq] from the browser to a server to a database. 

## Handling Missing Documents

We should have a default document that is loaded if the document requested is not found. If not that, then at least load in a message rather than popping up an alert.

## The GetMarie Button

Make sure you are searching for a string and a field that exists in your database. For instance, I have someone with a firstName of **Marie** in my database, hence the following code works for me:

```javascript

myController.getMarie = function() {
    var maries = myController.scientists[0].getTopic("Marie", function(maries) {
        myController.marie = maries[0];
    });
};
```

But if you have no one with a first name of Marie, then that won't work. 

Also, in your equivalent of **public/javascripts/ScienceResource**, make sure you search on a field that exists in your database. For instance, I have a field called **firstName** so this code works:

```javascript
scientists.prototype.getTopic = function(firstNameToFind, callback) {
    bar = $resource(
        'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
        '/collections/' + CONFIG.COLLECTION, {
            apiKey: CONFIG.API_KEY,
            q: {"firstName": firstNameToFind }
        });
    return bar.query({}, callback);
};
``` 

However, if you have a **gadgetName** property but no **firstName** property, then you should write this:

```javascript
scientists.prototype.getTopic = function(gadgetNameToFind, callback) {
    bar = $resource(
        'https://api.mongolab.com/api/1/databases/' + CONFIG.DB_NAME +
        '/collections/' + CONFIG.COLLECTION, {
            apiKey: CONFIG.API_KEY,
            q: {"gadgetName": gadgetNameToFind }
        });
    return bar.query({}, callback);
};
``` 

 
[restreq]:http://elvenware.com/charlie/development/web/JavaScript/Angular.html#http
