## Description

This assignment is not complete yet. I give it to you only because it contains enough information to show some of you how to use sign in with angular.

tldr: replace this method from the routes folder:

```
router.post('/login', passport.authenticate('login', {
	successRedirect: '/#/home',
	failureRedirect: '/'
})); 
```

With this one:

```
router.post('/login', passport.authenticate('login'),
	function(req, res) {
		res.send(req.user);
});
```

The point is that passport will authenticate our user for us, and then it will put the user's information (username, email, etc) in **request.user**. At that point we simply send the information back to the front end with **response.send(request.user)**. If the user can't log in, an error is sent back, per these lines from **passport/login**:

```
if (!user){
    console.log('User Not Found with username '+username);
    return done(null, false);
}
 
if (!isValidPassword(user, password)){
    console.log('Invalid Password');
    return done(null, false); // redirect back to login page
}
```

SignIn and Comments in one program with a menu.

Found a [good article][goodart] on passport and angular. The [code][artcode] is available and that is how I knew to replace the method shown above.

[goodart]:https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
[artcode]:https://github.com/Anomen/AuthenticationAngularJS

## Step One

Copy the MongooseComments program into a new folder:

    robocopy Week11-MongooseComments Week11-SignInComment /mir

Open the project in WebStorm and rename it the project to **SignInComment**.

Install the tools we will need:

```
npm install bcrypt-nodejs --save
npm install passport --save
npm install passport-local --save
npm install express-session --save
bower install angular-route --save 
```

## Step Two

Add a menu

In **layout.jade**, copy in meta tags to prepare for use in a mobile device:

```
doctype html
html
	head
		meta(charset='utf-8')
		meta(name='description', content='Final by Charlie Calvert for Prog 219 Spring 2015')
		meta(name='viewport', content='width=device-width, initial-scale=1')
		title= title
```

Then also load **angular-route** and **app.js**

```
	script(src="components/angular-route/angular-route.js")
	script(src="javascripts/app.js")
```

Then in **index.jade**, paste in the menu we have used in other programs, where I have include a few extra lines to provide context:

```
extends layout
block content
	nav.navbar-default.navbar-fixed-top
		.container-fluid
			.navbar-header
				button(type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myTarget")
					span.sr-only Toggle navigation
					span.icon-bar
					span.icon-bar
					span.icon-bar
				a.navbar-brand(href="#/") Final
			#myTarget.collapse.navbar-collapse
				ul.nav.navbar-nav
					li(ng-class="{ active: isActive('/')}")
						a(ng-href='#/') Home
					li(ng-class="{ active: isActive('/comments')}")
						a(ng-href='#/comments') Comments
					li(ng-class="{ active: isActive('/login')}")
						a(ng-href='#/login') Login


			h1= title
			p Welcome to #{title}
                        div(data-ng-view="")
```

## Step Three

Link in the passport sign in code.

- Copy the passport folder from the [sign in project][sign]. It includes three files:
    - init.js
    - login.js
    - signup.js

From the sign in project, copy **models/user.js** and place it in the **models** folder of this project.

```javascript
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

Copy **SpaceNeedle.png** or some similar file into **public/images**.

Copy in the CSS from the [SignIn][sign] assignment.

## Step Four

Most things on the backend for passport are the same. Just make sure you get rid of all references to **flash**. 
 
We are going to create a file called **routes/login.js**. It provides new middleware routes for logging in. This is like the example code from the previous example that was found in **routes/index.js**, but now we don't invoke it off the main route ('/'), instead we have **login** route ('/login'). 

Here are the changes to make in **app.js**. You can keep the loading of routes middleware the same: 

```
var routes = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comments');
```

And then further down we have code that is quite similar to the original example:

```
// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({
      secret: 'mySecretKey',
      resave: true,
      saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
// var flash = require('connect-flash');
// app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var login = require('./routes/login')(passport);
app.use('/', routes);
app.use('/users', users);
app.use('/comments', comments);
app.use('/login', login);

```

The key line is the last one, where we load the new middleware for handling our new **login** route.

And below you see **routes/login.js**. Notice that this is pretty much the same as in our login example, but the **post('/login'** method has been replaced (I commented out the old version):

```
/**
 * Created by charlie on 6/11/2015.
 */

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

	/*
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/#/home',
		failureRedirect: '/'
	})); */

	router.post('/login', passport.authenticate('login'),
		function(req, res) {
			res.send(req.user);
	});

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

We need a login route in app.js:

```
var myModule = angular.module("elvenApp", [ 'ngRoute' ]);

myModule.config(function($routeProvider, $locationProvider) {
	$routeProvider.when("/", {
		templateUrl : "main",
		controller : "MainController",
		controllerAs: "mainController"
	}).when('/comments', {
		templateUrl : "comments",
		controller : "CommentsController",
		controllerAs: 'commentsController'
	}).when('/login', {
		templateUrl : "login",
		controller : "LoginController",
		controllerAs: 'loginController'
	}).otherwise({
		redirectTo : '/'
	});
});
```

This is your updated login jade, which has been adapted to work with angular:

```
extends layout
block content
   div.container
      #main.row
         div.col-sm-6.col-md-4.col-md-offset-4
            h1.text-center.login-title {{loginController.hint}}
               div.account-wall
                  img(class='profile-img', src='images/SpaceNeedle.png')
                  form.form-signin(novalidate='')
                     input.form-control(type='text', ng-model='loginController.userName' placeholder='UserName',required, autofocus)
                     input.form-control(type='password', ng-model='loginController.password' placeholder='Password', required)
                     button.btn.btn-lg.btn-primary.btn-block(type='submit', ng-click='loginController.update()') Sign in
                     span.clearfix
               a(href='/login/signup', class='text-center new-account') Create an account
               #message
               if message
                  h1.text-center.error-message #{message}
```

This is your login controller:

```
/**
 * Created by charlie on 6/11/2015.
 */

var app = angular.module('elvenApp');

app.controller('LoginController', function($http, $location) {
	var loginController = this;
	loginController.hint = "Sign in";

	loginController.update = function() {
            var user = {
                "username": loginController.userName, 
                "password": loginController.password
            };

            $http.post('/login/login/', user).success(function(user) {
                console.log(user);
            	$location.path('/');
            }).error(function(err) {
            	loginController.hint = 'Bad Password/User. Try again';
            })
	}
});
```

Notice how it works. We have two paths:

- success
- error

If the user is logged in successfully the success path is invoked and the user is redirected back to the home page. We are also passed information about the user from our database. That is, we are passed the user name, email, etc. If the error path is invoked, then a hint is displayed telling the user to try again.

We don't have signup working at this time. If you need to create a user, for now use the signup [assignment][sign] example to create the user, then switch back to this code.

[sign]:http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseSignIn.html