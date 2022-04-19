---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ExpressSessionBasics.md
relativePath: Assignments/ExpressSessionBasics.md
title: ExpressSessionBasics
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: ExpressSessionBasics.md
fileNameHTML: ExpressSessionBasics.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Session Basics

Understanding Sessions:

- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Session>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web>
- [Session Timeout](https://www.owasp.org/index.php/Session_Management_Cheat_Sheet#Session_Expiration)

## Step 01

CreateAllExpress Week04-SessionBasics

nodemon.json:

```
{
  "verbose": true,
  "ignore": ["**/components/**", "**/sessions/**"]
}
```

https://github.com/twilson63/express-couchUser

Use NPM to install the libraries we will need:

<pre>
npm install session-file-store express-session parseurl uuid
</pre>

## Step 02

If you have not done so already, at some point we need to install redis. Details are here:

- <http://www.elvenware.com/charlie/development/database/NoSql/redis.html>

## Step 03 {#middleware}

Now lets learn about middleware. We can employ the **app.use** method to add in middleware (code) that we want to be called every time a request comes in, or when certain types of requests come in. In other words, when the user in the browser sends a request our way, then we can set things up so our middleware will be called.

In **app.js**, just before you use **index** and **users** (around line 26) insert the following sample bit of middleware:

```javascript
app.use(function(request, response, next) {
    'use strict';
    console.log('Sample middleware with useful output');
    console.log('request cookies', request.cookies);
    console.log('request secret', request.secret);
    // Uncomment the following line for one run, perhaps.
    // It is too verbose to use everytime
    // console.log(Object.getOwnPropertyNames(request));
    next();
});
```

Order can be important here. To help you understand how this works, recall that this code in **app.js** links in, that is, it **uses**, your **routes/index.js** file:

```javascript
var index = require('./routes/index');
// === Insert Middleware here if you want index.js to use it. ===
app.use('/', index);
```

You want to define your middleware before you **use** a particular route. For instance, define this middleware before you use the **/** route in **app.js** if you want the code in **index.js** to trigger a call to this middleware. If you don't want **index.js** to use this code, then define your middleware after you link in the **/** route. You can insert middleware in multiple places. The only constraint would be performance, and performance is not likely to be an issue for us in this course.

The point is that this middleware is **used** every time a request is made that involves code from **index.js** or from any other module that is linked in after the middleware is defined.

## Step 04

In **routes/index.js** include the following two methods. Note that the second method replaces an existing method in the file:

```javascript
var routeParamMiddleware = function(request, response, next) {
  'use strict';  
  console.log('My middleware called by this route:', request.originalUrl);
  next();
};

router.get('/', routeParamMiddleware, function(req, res, next) { 'use strict';
  'use strict';
  res.render('index', { title: 'Week09-SessionBasics' });
});

```

This middleware is used every time the **/** route is used. The two types of middleware shown here in steps 3 and 4, cover most of our needs for creating custom middleware.

## Step05

Be sure you have installed the following packages:

```
npm install express-session --save
npm install uuid --save
```

Put this code near the top of **app.js**, perhaps right after **body-parser** is linked in:

```javascript
var session = require('express-session');
var uuid = require('uuid');
```

Put this code further down, right before the sample middleware we inserted previously:

```javascript

app.use(session({
    genid: function(req) {
        'use strict';
        return uuid.v4(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

```

- <https://www.npmjs.com/package/uuid>

## Step06

One common trick used to help people understand how sessions work is to keep track of the previous page visited. This can be useful if you want to walk the user back through the pages they have visitied, but it is mostly done as a learning exercise.

Put this code in **routes/index.js** after the '/' route:

```javascript
var pageReport = function(request, response) {
    'use strict';
    var previousPage = '';
    if (request.session.lastPage) {
        previousPage = request.session.lastPage;
    }

    request.session.lastPage = request.url;
    var welcome = 'Welcome to ' + request.url;
    console.log('welcome', welcome);
    response.send({
        currentPage: request.url,
        previousPage: previousPage,
        'session': request.session
    });
};
router.get('/page01', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/page02', function(request, response) {
    'use strict';
    pageReport(request, response);
});

router.get('/page03', function(request, response) {
    'use strict';
    pageReport(request, response);
});
```

To make this work, you are going to want to put some buttons on the main page, then respond to clicks on those buttons. Do you work in **views/index.jade** and in **public/javascript/control.js**.

**NOTE**: _If, by this time, it is not fairly obvious to you how to do this, then you need to do several things:_

1. Review the **Week03-ExpressRoutes** and **Week03-JQuery** programs
1. Internalize the techniques for handling button clicks and retrieving JSON from the server with **$.getJSON**.
1. Consider learning to write these kinds of programs by heart, without referring to instructions or notes.

Because the server side code is nearly identical for each route, you should be able to write the code for calling the server in a single method called **showpage** that needs to only the route to call:

```javascript
function showPage(pageRoute) {
    // YOUR CODE HERE
    // Be sure to handle the .done .fail and .always chained methods for
    // your call to the server. See the jQuery docs for details.
}

$('#page01').click(/* CALL showPage AND PASS THE APPROPRIATE ROUTE */);
$('#page02').click(/* CALL showPage AND PASS THE APPROPRIATE ROUTE */);
$('#page03').click(/* CALL showPage AND PASS THE APPROPRIATE ROUTE */);

```

The .fail chained method might look a bit like this:

```javascript
.fail(function(jq, status, error) {
    $('#displayArea').html('error: ' + jq.responseText);
    console.log('error: ', status);
    console.log('error: ', error);
})
```

Consider putting this code in **style.css**. For this to work properly, you will have to load **style.css** after you load **bootstrap.css**.

```css
div {
  margin: 5px;
}

button {
  margin: 5px;
}

pre {
  font-size: large;
}
```

## Page Views

Now let's track how many views each page gets.

Create a file called **routes/middleware.js**. Load it from **app.js** the same way you load **index.js** and **user.js**, but load the middleware page first, before the other pages. Interestingly, we don't need to specify which route is associated with this file. For instance:

```javascript
app.use(middleware);        <=== NO ROUTE
app.use('/users', users);   <=== INCLUDES ROUTE
```

Here is the code to put in **middleware.js**:

```javascript

// LOAD PARSEURL:
var parseurl = require('parseurl');
// WHAT OTHER PACKAGES NEED TO BE LOADED BEFORE THIS CODE WILL WORK?

router.use(function(request, response, next) {
    'use strict';
    var views = request.session.views;

    if (!views) {
        views = request.session.views = {};
    }

    // get the url pathname
    var pathname = parseurl(request).pathname;
    console.log('pathname', pathname);
    console.log('views', views);

    // count the views
    views[pathname] = (views[pathname] || 0) + 1;

    next();
});

// WHAT DO YOU NEED TO DO HERE TO EXPORT THIS CODE FROM THIS MODULE?

```

Create another file called **routes/views.js**. Load it from **app.js**. This time, however, you can **use** it last, after **middleware, routes** and **users**.

```javascript
var express = require('express');
var router = express.Router();

// WRITE IT THIS WAY SO WE ONLY NEED TO INCLUDE ONE 'use strict'; STATEMENT
module.exports = (function() {
    'use strict';

    router.get('/page01', function(request, response, next) {
        response.send({ result: 'you viewed this page ' + request.session.views['/views/page01'] + ' times' });
    });

    router.get('/page02', function(request, response, next) {        
        response.send({ result: 'you viewed this page ' + request.session.views['/views/page02'] + ' times' });
    });
    return router;
})();
```

## Views Hint

Remember that if we put code in our **routes/views.js** file, then in **app.js** we probably wrote code like this:

```javascript
var views = require('./routes/views');
// CODE OMITTED HERE
app.use('/views', views);
```

This means that when we call the route, we should include views in the URL:

```javascript
getJSON('/views/foo', etc...)
```

But in **views.js** we do not include the **/views** part of the path, and instead write the code that looks like this:

```javascript
router.get('/foo', function...
```

## File Store

Later, we will start saving session and user data to a database. For now, however, let's simplify things by saving some information to a file. At the top of app.js:

```javascript
var FileStore = require('session-file-store')(session);
```

Then modify the way we use the session object so that it references the file store:

```javascript
app.use(session({
    genid: function(req) {
        'use strict';
        return uuid.v4(); // use UUIDs for session IDs
    },    
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: new FileStore()  <==== HERE IT IS
}));
```

By default, the code will be saved into a folder off the root of your project called **sessions**, under your cookie name.

As a final step for this part of the project, move the **app.use(session)** middleware to the **routes/middleware.js** file. While you are at it, also move the first piece of middleware that we created at the start of this assignment to **middleware.js**. That is the code that begins like this:

```javascript
app.use(function(request, response, next) {
    'use strict';
    console.log('Sample middleware with useful output');
    ETC...
});
```

## Additional Server Side Feedback {#server-feedback}

Let's define a few more routes on the server that will help us track exactly what is happening on the server side. Put this code in **routes/views.js**:

```javascript
router.get('/file-store', function(request, response, next) {
    if (request.session.viewCount) {
        request.session.viewCount++;
        response.send({
            viewCount: request.session.viewCount
        });
    } else {
        request.session.viewCount = 1;
        response.send({
            'hello': 'Click another button and return here!'
        });
    }
});

router.get('/request', function(request, response, next) {

    var requester = {
        cookies: request.cookies,
        signedCookies: request.signedCookies,
        originalUrl: request.originalUrl,
        baseUrl: request.baseUrl,
        url: request.url,
        method: request.method,
        secret: request.secret || 'undefined',
        sessionID: request.sessionID,
        route: request.route
    };
    console.log('==========================');
    for (var foo in request.connection) {
        if (request.hasOwnProperty(foo)) {
            console.log(foo);
        }
    }
    console.log('==========================');
    console.log(requester);
    response.send({
        request: requester
    });
});
```

Be sure to create buttons and handlers in **control.js** that call these routes and display the data returned from them. This should be very simple, as we can continue to use our unaltered **showPage** method to display this information.

Finally, let's add a route to **routes/views.js** that returns the **request.session** object. The route should be called **'/session-status'**. All it need do is return an object literal with one property called **session** that has a value of **request.session**. Be sure to call this method from **control.js** and display the output to the user using the **showPage** method.

## Turn it in

Push the repository and submit the assignment.
