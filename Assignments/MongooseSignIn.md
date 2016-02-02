## Description

Mongoose sign in has three major parts:

- A collection for your users in [MongoLab](https://mongolab.com/). If you don't have an account create one.
- An interface built in express and jade (no angular) that allows the user to enter a username and password
- A Mongooose library for storing and retrieving the user names and passwords

The code also encrypts and validates user names and passwords.

The sign in Screen:

![Sign In](https://s3.amazonaws.com/bucket01.elvenware.com/images/SignIn01.png)

Register a new users:

![Sign In](https://s3.amazonaws.com/bucket01.elvenware.com/images/SignIn02.png)

Logged in:

![Sign In](https://s3.amazonaws.com/bucket01.elvenware.com/images/SignIn03.png)


## Step One

Create an express app

    CreateAllExpress Week05-MongooseSignIn
    cd Week05-MongooseSignIn

- <https://drive.google.com/file/d/0B25UTAlOfPRGVXR3SHFJa05sNjQ/view?usp=sharing>

Some npm packages we are using. You need do nothing as **AllInclusive** should handle this. So this is a no-op, it is just an fyi:

```
npm install bcrypt-nodejs --save
npm install mongoose --save
npm install passport --save
npm install passport-local --save
npm install express-session --save
```

## Step Two

Setup Mongoose in a file called **routes/db.js**.
The **getUrl** method is designed to work with [MongoLab](https://mongolab.com/). Fill
in your own **userName**, **password**, **siteAndPort** and database name:

```
module.exports = {
	getUrl: function() {
    var baseUrl = 'mongodb://';
		var userName = 'USER-NAME';
		var password = 'PASSWORD';
		var siteAndPort = 'ds?????.mongolab.com:?????';
		var databaseName = 'DB-NAME';
		var url = baseUrl + userName + ':' + password + '@' + siteAndPort + '/' + databaseName;
		console.log(url);
		return url;
	}
}
```

If working with a local database, then do something like this:

    'url' : 'mongodb://localhost/test'

Define the schema for your database in **models/user.js**. To get a working copy of the file:

```bash
cp -r $ELF_TEMPLATES/SignIn/models/ .
```

## Step Two

Let's work on the front end. Retrieve the jade for the various dialogs needed to complete the sign in process:

```
cp $ELF_TEMPLATES/SignIn/views/*.jade views/.
```

We just copied in three files:

```
login.jade
logout.jade
register.jade
```

## Step Three

Set up Passport. Also setup the MongoDb database for storing the user name. To accomplish these tasks We will use three libraries
called **express-session**, **Mongoose** and **Passport**, all of which should already be in **AllInclusive**.

In **app.js**, about line 8.

```javascript
var dbConfig = require('./routes/db');
var mongoose = require('mongoose');
// Connect to DB
console.log('Mongoose URL:', dbConfig.getUrl());
mongoose.connect(dbConfig.getUrl());
```

And remove the line that reads, as we will include it later:

```javascript
var routes = require('./routes/index')
```

On about line 13, comment out the existing routes call:

	// var routes = require('./routes/index');

In app.js around line 28:

```javascript
// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
```

## Step Four

Copy in passport specific JavaScript files:

```bash
cp -r $ELF_TEMPLATES/SignIn/passport/ .
```

You just copied the following files into a folder called **passport** :

- init.js
- login.js
- signup.js

## Step Five

Set up the routes for logging in and signing up.

Passport provides authentication. If the user can be authenticated, then they will be allowed to do something, otherwise will they will be redirected to another screen:

- Success: You get to do it
- Failure: Access denied!

Here is the classic **authenticate** middleware in action:

```
router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
```

In **routes/index.js**

```javascript
var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    // Passport added the this method to the request object.
    console.log('isAuthenticated called');
    if (req.isAuthenticated()) {
        console.log('successfully authenticated');
        return next();
    }

    console.log('in isAuthenticated, user not authenticate, send to login');
    res.redirect('/login');
};

module.exports = function (passport) {
    /* GET home page. */
    router.get('/', isAuthenticated, function (req, res, next) {
        'use strict';
        console.log('about to send root page');
        res.render('index', {title: 'BarFoo'});
    });

    function foo(req, res, next) {
        console.log('calling login');
        next();
    }

    router.get('/login', function (req, res, next) {
        console.log('in get login');
        res.render('login', {user: req.user});
    });

    router.post('/loginUser', passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login'
    }));

    router.get('/loggedin', function(request, response) {
        response.send(request.isAuthenticated() ? true : false);
    });

    router.get('/signup', function(req, res) {
        console.log('Get signup');
        res.render('register', {});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/#/login',
        failureRedirect: '/signup'
    }));

    return router;
};
```

##Turn it in

Submit four screen shots as PNG attachments. Model your screen shots after the four images found in this assignment. Instead of the logged in image, take one of the bash shell showing serializing and deserializing of the user. (Just convince me you got it to work....)

Also check in your code in **Week10-MongooseSignIn** or some similar name beginning with **Week10**. If there might be any question at all as to where I would find your code, please include the folder name when you submit the assignment.

## MongoLab

In MongoLab you should be able to see the **Users** table where your users are stored.

When viewing the data on MongoLab, you can optionally select **edit table view** in the view of your **users** collection and paste in the following code:

```
{
    "_id": "id",
    "username": "username",
    "email": "email",
    "firstName": "firstName",
    "lastName": "lastName",
    "password": "password"
}
```

When you are done, you are view of the data could look something like this:

![MongoLab](https://s3.amazonaws.com/bucket01.elvenware.com/images/SignIn04.png)
