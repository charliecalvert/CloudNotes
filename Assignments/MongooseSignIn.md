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

Setup Mongoose

In /db.js:

```
module.exports = {
    'url' : 'mongodb://csc:Re*lD*t*22#@ds049848.mongolab.com:49848/elvenlab01'
}
```

If working with a local database, then do this:

    'url' : 'mongodb://localhost/test'

In **models/user.js**:

```
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	id: String,
	firstName: String,
	lastName: String,
	username: String,
	password: String,
	email: String
});

module.exports = mongoose.model('User', userSchema);
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

In **views/index.jade**

```
extends layout
block content
	h1= title
	p Welcome to #{title}
	div.container
		div.row
			div.col-sm-6.col-md-4.col-md-offset-4
				h1.text-center.login-title Sign in to our Passport app
					div.account-wall
						img(class='profile-img', src='images/SpaceNeedle.png')
						form(class='form-signin', action='/login', method='POST')
							input(type='text', name='username' class='form-control', placeholder='UserName',required, autofocus)
							input(type='password', name='password' class='form-control', placeholder='Password', required)
							button(class='btn btn-lg btn-primary btn-block', type='submit') Sign in
							span.clearfix
					a(href='/signup', class='text-center new-account') Create an account
					#message
					if message
						h1.text-center.error-message #{message}
```

in **views/register.jade**

```
extends layout

block content
	div.container
		div.row
			div.col-sm-6.col-md-4.col-md-offset-4
				h1.text-center.login-title Registration Details
					div.signup-wall
						form(class='form-signin', action='/signup', method='POST')
							input(type='text', name='username', class='form-control', placeholder='Username',required, autofocus)
							input(type='password', name='password', class='form-control nomargin', placeholder='Password', required)
							input(type='email', name='email', class='form-control', placeholder='Email',required)
							input(type='text', name='firstName', class='form-control', placeholder='First Name',required)
							input(type='text', name='lastName', class='form-control', placeholder='Last Name',required)
							button(class='btn btn-lg btn-primary btn-block', type='submit') Register
							span.clearfix
					#message
						if message
							h1.text-center.error-message #{message}
```

In **views/home.jade**

```
extends layout
block content
	div.container
		div.row
			div.col-sm-6.col-md-4.col-md-offset-4
				#user
					h1.text-center.login-title Welcome #{user.firstName}. Check your details below:
					div.signup-wall
						ul.user-details
							li Username ---> #{user.username}
							li Email    ---> #{user.email}
							li First Name ---> #{user.firstName}
							li Last Name ---> #{user.lastName}
					a(href='/signout', class='text-center new-account') Sign Out

```

Be careful about the whitespace in these files.

## Step Three

Database Mongoose

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

```
var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
};

module.exports = function(passport) {

	router.get('/', function(req, res) {
		res.render('index', {title: "sign in"});
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/'
	}));

	router.get('/signup', function(req, res) {
		res.render('register', {});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup'
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res) {
		res.render('home', {user: req.user});
	});

	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
};
```

## Step Five

Passport

In **/passport/init.js**

```
var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports = function(passport) {

    // Passport needs to be able to serialize and deserialize
    // users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:', user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

};
```

In **/passport/login.js**

```
/**
 * Created by charlie on 6/8/2015.
 */

var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	passport.use('login', new LocalStrategy({
				passReqToCallback : true
			},
			function(req, username, password, done) {
				// check in mongo if a user with username exists or not
				User.findOne({ 'username' :  username },
					function(err, user) {
						// In case of any error, return using the done method
						if (err)
							return done(err);
						// Username does not exist, log the error and redirect back
						if (!user){
							console.log('User Not Found with username '+username);
							return done(null, false);
						}
						// User exists but wrong password, log the error
						if (!isValidPassword(user, password)){
							console.log('Invalid Password');
							return done(null, false); // redirect back to login page
						}
						// User and password both match, return user from done method
						// which will be treated like success
						return done(null, user);
					}
				);

			})
	);


	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	}

};
```

In **/passport/signup.js**

```
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

};
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

