#Passport

    express Passport
    cd Passport
    npm install passport passport-google

Then:

    var session = require('express-session');
    var passport = require('passport');

And in the use section (around line 50, after cookie parser and static public):

    app.use(session({ secret : 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    
##Passport Code

Set index.js to look like this:

```
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

/* GET home page. */
router.get('/', function(request, response) {
	console.log("Index called");
	response.render('index', { title : 'Passport Google' });
});

router.get('/info', function(request, response) {
	console.log("Info called");
	console.log("Auth: " + request.isAuthenticated('google'));
	response.send({
		result : "Success",
		authenticated : request.isAuthenticated()
	});
});

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:30025/auth/google/return',
    realm: 'http://localhost:30025/'
  },
  function(identifier, profile, done) {
    console.log('Google Strategy');
    process.nextTick(function () {      
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

router.get('/auth/google', passport.authenticate('google', {
	failureRedirect : '/login'
}), function(req, res) {
	response.redirect('/');
});

router.get('/auth/google/return', passport.authenticate('google', {
	failureRedirect : '/login'
}), function(request, response) {
	response.redirect('/');
});

router.get('/auth/logout', function(request, response) {
	console.log("Logout called");
	request.logout();
	response.redirect('/');
});

module.exports = router;
```

For process.nextTick, [see the docs][1]. Instead of making the call immediately, it is more like a callback. We wait until the next time that node is not busy, then make the call. Node runs on an event loop, and in effect this is saying the next time the loop comes around.

##Login and Logout

Let's take a look at these lines in index.js:

```
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

##Run

And to run it:

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

#Control

```
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

In 'routes/SignedIn.js:

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


##Permissions

You want to track who has permissions to access your account information:

> https://security.google.com/settings/security/permissions


  [1]: http://nodejs.org/api/process.html#process_process_nexttick_callback