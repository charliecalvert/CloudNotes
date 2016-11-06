#Passport

[Passport](http://passportjs.org/) is a tool that allows you to "sign in with Google", "sign in with Facebook" or "sign with Twitter". There are other options as well, including creating a basic sign in where the user enters their own user name and email. But Google, Facebook and Twitter are the options that most poeple want.

The goal of this assignment is to allow you to add a **Log On** with Goggle and Facebook page to your web application. It will allow users to sign on to your site with their Google or Facebook accounts. It will then be possible to decide whether a user can perform a particular action depending on whether or not she is signed on.

By having Google, Facebook or Twitter manage the sign on process you free yourself of:

- Having to authenticate users. Google has already done it for you.
- Having to write code that authenticates users in a secure manner. This is a very error prone process.

When the user signs on, Google will pass some of their profile information to you. We can request that they send more or less information if they want to access our site. But for this exercise, we want to see only their public profile information. That is, we want to see only the information that they have already decided to show publicly.

Normally we would store that information and the user's ID, in a database. We could store it in _MongoDb_, or _CouchDb_, but typically developers use a small fast database called _redis_ for this purpose. There is a discussion of _redis_ on Elvenware. In this exercise, however, we will skip the process of storing the user's name
in a database. We'll get to that later.

## Key Places

- [Passport home page](http://passportjs.org/)
- [https://developers.facebook.com/](https://developers.facebook.com/)
- <https://developers.facebook.com/quickstarts/>
- <https://developers.facebook.com/products/>
- [Facebook Developer Community](https://www.facebook.com/groups/fbdevelopers/)
- [Facebook Developer Documentation](https://developers.facebook.com/docs/)
- [Multiple Strategies](http://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb/#Step5)

##Install Passport

To get started, first create a new express project called **Week08-Passport**. At this stage, the best option for creating the app is probably still **CreateAllExpress**. However my fork of the Express Generator is showing signs of improvement:

```bash
npm install -g elf-express-generator  
elf-express Week08-Passport
```

You need install elf-express-generator only once. However, if you want to check for updates:

```bash
npm outdated -g
```

If it is outdated, then just reinstall.

Navigate to your project directory and then download the Passport package and other related materials:

```bash    
cd Week08-Passport
npm install passport --save
npm install passport passport-facebook--save
npm install passport-google-oauth20 --save
npm install express-session --save
npm install connect-ensure-login --save
```

Passport is the tool we will use to allow the user to log on with
Google.

## Setup Facebook

Go to the Facebook developers site: [https://developers.facebook.com/](https://developers.facebook.com/). Note at the bottom the link to the Login API.

Visit the Facebook Login for Developers Page: [https://developers.facebook.com/products/login/](https://developers.facebook.com/products/login/). Check out the page you see from the Get Started button.

After getting oriented, look at the top right, and select the option to create a **New App**.

- Displan Name: Isit320-Lastname
- Category: Education

Click okay, fill in the capcha, and choose **Facebook Login** as Product and **www** as login.

- Site URL: http://localhost:30025
- Get your App ID and Secret
- Client token on advanced page
- The Valid OAuth redirect APIs: http://localhost:30025/facebook/login


## Basics

Once you have passport installed, open up **app.js** and add the following
lines near the top:

```javascript
var session = require('express-session');
var passport = require('passport');
```

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

While you are at it, set up your **favicon** and update the development error handler:

```javascript
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        'use strict';
        res.status(err.status || 500);
        console.log(err.message);  <==== ADD THIS LINE ==<
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
```

## Generic Code

There is quite a bit of set up code needed to get Passport up and running. I put code that can be used by multiple strategies in **index.js**. I then create separate modules for the Google and Facebook specific code.

So, in the intest of expediency, set index.js to look like this:

```javascript
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(request, response, next) {
    'use strict';
    console.log('Index called');
    response.render('index', {
        title: 'Passport Google'
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

router.get('/login', function(req, res) {
    'use strict';
    res.render('login', {
        user: req.user
    });
});

router.get('/logout', function(request, response) {
    'use strict';
    request.logout();
    response.redirect('/');
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

module.exports = router;
```

The **serialize** and **deserialize** methods simply preserve state between HTTP requests. We might have multiple sessions going on at the same time. These **serialize** methods helps us track which user is associated with which session. In particular, we store the user information or some subset of that information in the serialize method when the session is first created. Then each time the session for that user resumes, that is, each that user makes another request, the **deserialize** method is called and we get the user information restored to us. (At least this is my understanding of how it works.)

Note the Google Strategy code shown below returns the whole profile. Later, we can use the Profile info to look up a user entry in our database.

You probably want to spend some time examining the user information that you get in the serialize or Google Strategy method. It shows you what data was sent from Facebook/Google back to your location.

## Passport Specific Code

Save the Facebook specific code in **routes/facebook.js**:

```javascript
/**
 * Created by charlie on 11/5/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

/**************************************
 *  Facebook
 **************************************/

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        'use strict';
        console.log(req.user);
        res.render('profile-temp', {
            title: 'Facebook Profile',
            user: req.user
        });
    });

passport.use(new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:30025/facebook/login/return'
    },
    function(accessToken, refreshToken, profile, done) {
        'use strict';
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return done(null, profile);
    }));

router.get('/login',
    passport.authenticate('facebook'));

//router.get('/login/facebook/return',
router.get('/login/return',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        'use strict';
        res.redirect('/');
    });

module.exports = router;

```

##Login and Logout

Let's take a look at these lines in **google-auth.js**:

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

## Run

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
    a(href='/facebook/login') Log In with Facebook
  div
    a(href="/facebook/profile") Facebook Profile

  div
    a(href='/logout') Logout

  button#info Information

  div
    pre#report
  div
    pre#debug
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