## Description

Mongoose sign in has two major parts:

- An interface built in express and jade (no angular) that allows the user to enter a username and password
- A Mongooose library for storing and retrieving the user names and passwords

The code also encrypts and validates user names and passwords.

The sign in Screen:

![Sign In](https://s3.amazonaws.com/bucket01.elvenware.com/images/SignIn01.png)

Register a new users:

![Sign In](https://s3.amazonaws.com/bucket01.elvenware.com/images/SignIn02.png)

Logged in:

![Sign In](https://s3.amazonaws.com/bucket01.elvenware.com/images/SignIn03.png)

The users in MongoLab:



## Step One

Create an express app

    express Week10-MongooseSignIn
    cd Week10-MongooseSignIn
    npm install
    npm install bcrypt-nodejs --save
    npm install mongoose --save
    npm install passport --save
    npm install passport-local --save
    npm install express-session --save

Don't forget port 30025, the title and **nodemon**.

- <https://drive.google.com/file/d/0B25UTAlOfPRGVXR3SHFJa05sNjQ/view?usp=sharing>

## Step Two

Setup Mongoose in the root of the project in a file called **db.js**. 
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

Front end

In **views/layout.jade**

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css')
  body
    block content
```

In index.jade:


And then retrieve the jade for the various dialogs needed to complete the sign in process:

```
cp $ELF_TEMPLATES/SignIn/views/*.jade views/.
```

Be careful about the whitespace in these files.

## Step Three

Set up MongoDb database for storing the user name. We will use two libraries 
called Mongoose and Passport.

In **app.js**, about line 8.

```
var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);
```

On about line 13, comment out the existing routes call:

	// var routes = require('./routes/index');

In app.js around line 28:

```
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

##Step Four

Backend

Passport provides authentication. If the user can be authenticated, then they will be allowed to do something, otherwise will they will be redirected to another screen:

- Success: You get to do it
- Failure: Access denied!

Here is the classic **authenticate** middleware in action:

```
router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/'
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


## Step Five

Passport

```bash
cp -r $ELF_TEMPLATES/SignIn/passport/ .
```

## Step Six

Add css. Append this to **public/css/style.css**:

```
.form-signin{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-signin-heading, .form-signin .checkbox{
    margin-bottom: 10px;
}
.form-signin .checkbox{
    font-weight: normal;
}
.form-signin .form-control{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus{
    z-index: 2;
}
.form-signin input[type="text"]{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.form-signin input[type="password"]{
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.form-signin input[type="password"].nomargin{
	margin-bottom: 0px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.account-wall{
    margin-top: 20px;
    padding: 40px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.signup-wall{
	margin-top: 20px;
    padding: 20px 0px 20px 0px;
    background-color: #f7f7f7;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);	
}
.login-title{
    color: #555;
    font-size: 18px;
    font-weight: 400;
    display: block;
}
.profile-img{
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
.new-account{
    display: block;
    margin-top: 10px;
}
h1.error-message{
    color: red;
}
ul.user-details{
    list-style: none;
}
```

## Step Seven View Data on MongoLab

When viewing the data on MongoLab, select **edit table view** in the view of your **users** collection and paste in the following code:

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

##Turn it in

Submit four screen shots as PNG attachments. Each screen shot except the last should contain your first and last names. Model your screen shots after the four images found in this assignment.

Also check in your code in **Week10-MongooseSignIn** or some similar name beginning with **Week10**. If there might be any question at all as to where I would find your code, please include the folder name when you submit the assignment.

