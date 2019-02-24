## Overview

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
- Twitter
  - [Twitter Aps](https://apps.twitter.com/)
  - [Twitter Developers](https://dev.twitter.com/)
  - [Twitter Build Apps](https://dev.twitter.com/solutions/best-apps)
- Facebook
  - [https://developers.facebook.com/](https://developers.facebook.com/)
  - <https://developers.facebook.com/quickstarts/>
  - <https://developers.facebook.com/products/>
  - [Facebook Developer Community](https://www.facebook.com/groups/fbdevelopers/)
  - [Facebook Developer Documentation](https://developers.facebook.com/docs/)
- [Multiple Strategies](http://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb/#Step5)

## Install Passport

To get started, first create a new express project called **week08-passport**. At this stage, the best option for creating the app is probably still **CreateExpressProject**:

```bash
CreateExpressProject week08-passport
```

However my fork of the Express Generator is showing signs of improvement:

```bash
npm install -g elf-express-generator  
elf-express week08-passport
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
npm install passport passport-facebook --save
npm install passport-google-oauth20 --save
npm install connect-ensure-login --save
npm install express-session --save
npm install connect-ensure-login --save
```

Passport is the tool we will use to allow the user to log on with
Google.

## Setup Google

You are going to need a Google Developer's account. You won't need a new log in, as you can use your standard Google Account.

Start at [https://developers.google.com/](https://developers.google.com/). Click around. Get familiar with it. Note the **Developer Console** link near the bottom of the page on the right.

Now go to [https://console.developers.google.com](https://console.developers.google.com). We are going to be using the Google Plus API, which is visiable near the bottom of the **Dashboard**. This is a free service, but there are some limitations. In particular, go to the quotas page. Note that you can only have 20 million users sign in per day, and no more than 25 thousand every 100 seconds. If you actually hit these limits, you can take solace in the fact that your web traffic is large enough so that your grand children will probably never know economic want.

Choose **Credintials** and create an **OAuth Client ID**. Set the Authorized JavaScript origins to:

- http://localhost:30025

These choices:

- Credentials | Create Credentials | Oauth Client ID | Web Application
- **Name**: ElfLastName2019. For instance: ElfCalvert2019
- **Authorized JavaScript Origins**: http://localhost:30025
- **Authorized redirect APIs** http://localhost:30025/oauth2callback


Set the **Authorized redirect URIs** to:

- http://localhost:30025/oauth2callback

We are actually using this, so I don't understand why the above works, but it does:

- http://localhost:30025/auth/google/callback

**NOTE**: _Further testing suggests that it is best to add two separate entries to the **Authorized Redirect Apis**, one for each of the URLs shown above._

In the Google Strategy, we need to set up a valid URL. Here some things to keep in mind:

- Don't use a private IP like 192.168.1.1 that is not accessible from the WAN.
- Instead Use the Google Console to set up **localhost:30025** as described above

## Basics

Once you have passport installed, open up **app.js** and add the following
lines near the top:

```javascript
var session = require('express-session');
var passport = require('passport');
```

Now we add code to set up the session object:

```javascript
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
```

Put the session code shown above just after the place where we use the **cookieParser** and **express.static** middleware, but before the place where we define the routes and user middleware that looks a bit like this: **app.use('/', routes)**.

While you are at it, set up your **favicon** and update the development error handler:

```javascript
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message); <==== ADD THIS LINE ==<
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
```

In older versions of express, it might look more like this:

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

Either way, this code will ensure that 500 errors dump a stack trace to the console. Without that information, debugging can be very difficult.

## Generic Code

There is quite a bit of set up code needed to get Passport up and running. Some of that code can be used by both the Google and Facebook strategies. This is generic code that you can use if you are logging the user into either Facebook or Google. It can likely be used with other Passport strategies as well. I put code the code that can be used by multiple strategies in **routes/index.js**. I then create separate modules for the Google and Facebook specific code.

Here is the code we put in **routes/index.js** that can be used by both the Google and Facebook Passport strategies.:

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

router.get('/status', function(request, response) {
    'use strict';
    console.log('Status called');
    console.log('Auth: ' + request.isAuthenticated('google'));
    response.send({
        result: 'Success',
        authenticated: request.isAuthenticated()
    });
});

module.exports = router;
```

The **serialize** and **deserialize** methods simply preserve state between HTTP requests. We might have multiple sessions going on at the same time. These **serialize** methods helps us track which user is associated with which session. In particular, we store the user information or some subset of that information in the serialize method when the session is first created. Then each time the session for that user resumes, that is, each that user makes another request, the **deserialize** method is called and we get the user information restored to us. (At least this is my understanding of how it works.)

Note the Google Strategy code shown below returns the whole profile. Later, we can use the Profile to look up a user entry in our database.

You probably want to spend some time examining the user information that you get in the serialize or Google Strategy method. It shows you what data was sent from Facebook/Google back to your location.

## Google Specific Code

Save the Google specific code in **routes/login-google.js**:

```javascript
/**
 * Created by charlie on 11/5/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

/**************************************
 *  Google
 **************************************/

function ensureAuthenticated(req, res, next) {
    'use strict';
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/account', ensureAuthenticated, function(request, response) {
    'use strict';
    response.render('profile-google', {
        title: 'Google Account',
        user: request.user
    });
});

passport.use(new GoogleStrategy({
        clientID: 'YOUR CODE HERE',
        clientSecret: 'YOUR SECRET CODE HERE',
        callbackURL: 'http://localhost:30025/auth/google/callback',
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        'use strict';
        // asynchronous verification, for effect...
        process.nextTick(function() {

            // Return Google profile for now. We will add Database data here later.
            return done(null, profile);
        });
    }
));

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

//router.get('/auth/google/callback',
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        'use strict';
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;
```

Be sure to fill in your **clientID** and **clientSecret**. Also, link the code into **app.js** just as **routes/index.js** is linked in. I did it with these two lines of code:

```javascript
// Near the place where **routes/index.js** is linked in. Around line 11:
var indexRouter = require('./routes/index'); <== For context
var googleRouter = require('./routes/login-google'); <== Add this line

// Around line 35 where the indexRouter is used:
app.use('/', indexRouter);  <== For context
app.use('/auth', googleRouter);  <== Add this line
```

For **process.nextTick**, [see the docs][1]. Instead of making the call immediately, it is more like a callback. We wait until the next time that node is not busy, then make the call. Node runs on an event loop, and in effect this is saying the next time the loop comes around.

## Login and Logout

Let's take a look at these lines in **login-google.js**:

```javascript
app.get('/google', passport.authenticate('google', {
	failureRedirect : '/login'
}), function(request, response) {
	response.redirect('/');
});

app.get('/google/callback', passport.authenticate('google', {
	failureRedirect : '/login'
}), function(request, response) {
	response.redirect('/');
});
```

These are lines that get called when the user is being authenticated. You might want to add some **console.log** lines to this code if you want to better understand how the process works.

## Run

We are now ready to begin testing our code. This is not the final
solution for logging on, of course, but it lets you check that everything
is set up correctly before you come up with a more user friendly solution.

To log on, go to this URL:

> http://localhost:30025/auth/google

And then make it more usable by setting up **index.jade**:

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
    a(href='/auth/google') Log In Google
  div
    a(href='/auth/account') Google Account

  div
    a(href='/logout') Logout

  div
    a(href='/status') Status Link
    // This button was info, check in control.js
    button#status Status  

  div
    pre#report
  div
    pre#debug
```

## Is the User Logged On?

It is often helpful for the client to know whether or not the user
is signed on. Let's add a simple Ajax call to Control.js. The call can
return information about the status of the user.

## Control

```javascript
/**
 * Control.js
 */

var Control = (function() {

	function Control() {
		console.log("Control constructor called");
		$("#status").click(status);
	}

	var status = function() {
		// WRITE AN AJAX OR GET JSON METHOD THAT CALLS THE /info ROUTE AND DISPLAYS THE RESULT
    // THIS SHOULD INCLUDE THE USER INFORMATION SHOWN BELOW IN MY GOOGLE ACCOUNT SCREENSHOT
	};

	return Control;

}());

$(document).ready(function() {
	var control = new Control();
});
```

## Account and Logon

Now we are back on the server side. Here is code we might use to check if the user is signed in.

Notice in particular the **isAuthenticated** method.

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

Create the **profile-google.jade** file that displays information about the logged in user. Here is what my version of that page looks like. I got all this information from my Google account. It was the data that I got when I logged into my account. This is the data that we are agreeing to share when we, as users, agree to use this strategy to validated ourselves.

![Google Account Display](https://s3.amazonaws.com/bucket01.elvenware.com/images/passport-google-account.png)

Also create **profile-facebook.jade** page.

Here is a simple sample facebook profile page:

<pre>
extends layout

block content
    h1= title

    p Welcome to #{title}

    p UserName:
        span#Username #{user.username}
    p Name:
        span#name #{user.displayName}
    p ID:
        span#ID #{user.id}
</pre>

## Permissions

You want to track who has permissions to access your account information:

> https://security.google.com/settings/security/permissions


## Turn It In

Your application must support Google and either Twitter or Facebook.

- For Twitter specific directions, go [here][twitter-login].
- For Facebook specific directions, go [here][facebook-login].

Place your work in the appropriate folder in your repository, if it is not there already. Run **eslint** and **prettier** one last time. Submit your assignment.

[1]: http://nodejs.org/api/process.html#process_process_nexttick_callback
[twitter-login]: http://www.ccalvert.net/books/CloudNotes/Assignments/PassportTwitter.html
[facebook-login]: http://www.ccalvert.net/books/CloudNotes/Assignments/PassportFacebook.html

## Hints

Error message like this one are odd because they have **facebook** in the path:

<pre>
GET http://localhost:30025/facebook/login/components/requirejs/require.js 404 (Not Found)
</pre>

To fix them, check in **layout.jade** and **main.js** to be sure you are putting a slash in front of the words **components** and **javascripts**:

```javascript
'jquery': '/components/jquery/dist/jquery',
```

## Passport Middleware

If you get this error then the problem might well be the order in which you are inserting code into app.js, as explained above:

```javascript
if (!this._passport) { throw new Error('passport.initialize() middleware not in use'); }
```

## Jade/Pug Rendering and Templating {#pug-render}

Make sure you understand Pug and/or Jade Templating:

- [Elvenware Jade Render Templates](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJade.html#render-basics)
- [Official Docs](https://pugjs.org/api/getting-started.html)
