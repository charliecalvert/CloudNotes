#Passport

This software allows you to "sign in with Google". The goal of the
assignment is to allow you to add a **Log On** page to your web
application. You can then sign on to your site with your Google
account. It will be possible to decide whether a user can perform
a particular action depending on whether or not she is signed on.

By having Google manage the sign on process you free yourself of:

- Having to authenticate users. Google has already done it for you.
- Having to write code that authenticates users in a secure manner.
This is a very error prone process. When the user signs on, Google
will pass their email address to you. Normally we would store that
address, and the user's ID, in a database. We would store it in MongoDb,
but typically developers use a small fast database called redis for
this purpose. There is a discussion of redis on Elvenware. In this
class, however, we will skip the process of storing the user's name
in a database due to time constraints.

## Key Places

- [https://developers.facebook.com/](https://developers.facebook.com/)

##Install Passport

To get started, first create a new project and then download the
Passport package:

    express Passport
    cd Passport
    npm install passport --save
    npm install passport passport-facebook--save
    npm install express-session --save
    npm install connect-ensure-login --save
    npm install passport-google-oauth20 --save

Passport is the tool we will use to allow the user to log on with
Google.

Once you have passport installed, open up **app.js** and add the following
lines near the top:

    var session = require('express-session');
    var passport = require('passport');

And in the use section (around line 26 or wherever, after cookie parser and static public):

```javascript
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
```

##Passport Code

There is quite a bit of set up code needed to get Passport up and running.
I finally decided to put all this code in **index.js**. From an architectual
point of view, that is probably not a very good decision. It is, however,
much easier for you to simply paste the code into **index.js** than to
worry about a more optimal solution.

So, in the intest of expediency, set index.js to look like this:

```javascript
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

/* GET home page. */
router.get('/', function(request, response) {
    'use strict';
    console.log('Index called');
    response.render('index', {
        title: 'Passport Google'
    });
});

router.get('/info', function(request, response) {
    'use strict';
    console.log('Info called');
    console.log('Auth: ' + request.isAuthenticated('google'));
    response.send({
        result: 'Success',
        authenticated: request.isAuthenticated()
    });
});

passport.serializeUser(function(user, done) {
    'use strict';
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    'use strict';
    done(null, obj);
});

passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:30025/auth/google/return',
        realm: 'http://localhost:30025/'
    },
    function(identifier, profile, done) {
        'use strict';
        console.log('Google Strategy');
        process.nextTick(function() {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));

router.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/login'
}), function(req, res) {
    'use strict';
    response.redirect('/');
});

router.get('/auth/google/return', passport.authenticate('google', {
    failureRedirect: '/login'
}), function(request, response) {
    'use strict';
    response.redirect('/');
});

router.get('/auth/logout', function(request, response) {
    'use strict';
    console.log('Logout called');
    request.logout();
    response.redirect('/');
});

module.exports = router;
```

Since we are working on a blank new project, you can just replace the
entirety of **index.js** with the code shown above. When working on
the final, however, you will have to do a bit of cutting and pasting.

For process.nextTick, [see the docs][1]. Instead of making the call immediately, it is more like a callback. We wait until the next time that node is not busy, then make the call. Node runs on an event loop, and in effect this is saying the next time the loop comes around.

##Login and Logout

Let's take a look at these lines in index.js:

```javascript
app.get('/auth/google', passport.authenticate('google', {
	failureRedirect : '/login'
}), function(request, response) {
	response.redirect('/');
});

app.get('/auth/google/return', passport.authenticate('google', {
	failureRedirect : '/login'
}), function(request, response) {
	response.redirect('/');
});
```

These are lines that get called when the user is being authenticated. You
might want to add some console.log lines to this code if you want to
better understand how the process works.

##Run

We are now ready to begin testing our code. This is not the final
solution for logging on, of course, but it lets you check that everything
is set up correctly before you come up with a more user friendly solution.

To log on, go to this URL:

> http://localhost:30025/auth/google

Or better, set up the page to handle all this with clicks. So layout.jade:

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="//code.jquery.com/jquery-1.11.0.min.js")
    script(src="javascripts/Control.js")
  body
    block content
```

And then index.jade:

```
extends layout

block content
  h1= title
  p Welcome to #{title}

  div
    a(href='/auth/google') Log In
  div
    a(href='/auth/logout') Log out
  div
    a(href='/account') Account
  div
    a(href='/login') Login

  button#info Information

  div
    p#report
  div
    p#debug
```

#Is the User Logged On?

It is often helpful for the client to know whether or not the user
is signed on. Let's add a simple Ajax call to Control.js. The call can
return information about the status of the user.

#Control

```javascript
/**
 * Control.js
 */

var Control = (function() {

	function Control() {
		console.log("Control constructor called");
		$("#info").click(info);
	}

	var info = function() {
		$.ajax({
			url: '/info'
		}).success(function(serverInfo) {
			$("#report").html(JSON.stringify(serverInfo));
		}).error(function(err) {
			$("#debug").html(err);
		});
	};

	return Control;

}());

$(document).ready(function() {
	var control = new Control();
});
```

##Account and Logon

Now we are back on the server side. Here is a simple module with one
method it in. We can use this code to check if the user is signed in.
Notice in particular the **isAuthenticated** method.

Create a file called 'routes/SignedIn.js:

```
/**
 * SignedIn.js
 */

function signedIn(request, response, next) {
	if (request.isAuthenticated()) {
		console.log("authenticated and valid");
		return next();
	}
	console.log("not authenticated.");
	response.redirect('/login');
}

exports.signedIn = signedIn;
```

And in Account.js:

```
var express = require('express');
var router = express.Router();
var signedIn = require('./SignedIn').signedIn;

/* GET home page. */
router.get('/', signedIn, function(request, response) {
	console.log("Index called");
	response.render('account', { title: 'Passport Account' });

	// response.render('account', { user : request.user });
});

module.exports = router;
```



##Permissions

You want to track who has permissions to access your account information:

> https://security.google.com/settings/security/permissions


##Turn It In

In your repository create a folder called Week11Passport. Place your work in that folder, if it is not there already. Submit your assignment.

  [1]: http://nodejs.org/api/process.html#process_process_nexttick_callback
