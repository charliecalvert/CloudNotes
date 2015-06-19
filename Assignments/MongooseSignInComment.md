## Description

SignIn and Comments in one program with a menu.

Found a [good article][goodart] on passport and angular. The [code][artcode] is available and that is how I knew to replace the method shown above.

[goodart]:https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
[artcode]:https://github.com/Anomen/AuthenticationAngularJS

A working example of how to handle the SignIn program is in the following directory: 

- [JsObjects/JavaScript/Design/AngularSignIn](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularSignIn "Angular Sign In on JsObjects")

To get the program, go to your JsObjects directory and get the latest with a:

    git pull

Or get the whole repository, **being very careful not to issue this command inside your own repository**:

    git clone http://github.org/charliecalvert/JsObjects.git

The **AngularSignIn** example program contains the SignIn code, but not the Comments code. 

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
html(data-ng-app="elvenApp" ng-controller="ThemeController as themeController")
	head
		meta(charset='utf-8')
		meta(name='description', content='Final by Charlie Calvert for Prog 219 Spring 2015')
		meta(name='viewport', content='width=device-width, initial-scale=1')
		title= title
```

Notice that we are adding an ng-app directive here in the first line
above. That means we should remove it from the body tag near the bottom
of the file:

```
		script(src="javascripts/logout.js")
	body
		block content
```

And then optionally, for theme switching:

```
link(rel="stylesheet", ng-href="components/bootswatch/{{themeController.bootStrapCss}}/bootstrap.css")
```

Then also load **angular-route** and **app.js**

```
	script(src="components/angular-route/angular-route.js")
	script(src="javascripts/app.js")
```

Then in **index.jade**, paste in the menu we have used in other programs, where I have include a few extra lines to provide context:

```jade
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
					li(ng-class="{ active: isActive('/about')}")
						a(ng-href='#/about') About
					li(ng-class="{ active: isActive('/signin')}")
						a(ng-href='#/{{themeController.signinMenuItem}}') {{themeController.signinMenuText}}
					li(ng-switch="themeController.loggedIn" ng-class="{ active: isActive('/login')}")
						a(ng-switch-when="true" ng-href='#/logout') Logout
						a(ng-switch-default ng-href='#/login') Login

	h1= title
	p Welcome to #{title}
	div(data-ng-view="")
```

Here is a reference for ng-switch:

- [ng-switch angular docs](https://docs.angularjs.org/api/ng/directive/ngSwitch)
- [ng-switch stackOverflow](http://stackoverflow.com/a/14297556)

## Step Three

Link in the passport sign in code.

- Copy the passport folder from the [sign in project][sign]. It includes three files:
    - init.js
    - login.js
    - signup.js

Here is init:

```javascript
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

Here is login:

```javascript
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

Here is signup:

```javascript
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

```javascript
var routes = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comments');
```

And then further down we have code that is quite similar to the original example:

```javascript
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

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var login = require('./routes/login')(passport);
app.use('/', routes);
app.use('/users', users);
app.use('/comments', comments);
app.use('/login', login);

```

Notice the last line, where we load the new middleware for handling our new **login** route.

And below you see **routes/login.js**. Notice that this is pretty much the same as in our login example, but the **post('/login'** method has been replaced (I commented out the old version):

```javascript
var express = require('express');
var router = express.Router();

module.exports = function(passport) {

	router.post('/login', passport.authenticate('login'),
		function(req, res) {
			res.send(req.user);
		}
	);

	router.get('/logout', function(request, response){
		request.logOut();
		response.sendStatus(200);
	});

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

Notice that we have replaced this method from the routes folder:

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
        }
);
```


## Step Five

We need a login route in app.js:

Put this code in **public/javascripts/app.js**:

```
var myModule = angular.module("elvenApp", [ 'ngRoute' ]);

myModule.config(function($routeProvider, $httpProvider, $locationProvider) {

	//================================================
	// Check if the user is connected
	//================================================
	var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
		// Initialize a new promise
		var deferred = $q.defer();

		// Make an AJAX call to check if the user is logged in
		$http.get('/login/loggedin').success(function(result){
			// Authenticated
			if (result !== false)
			/*$timeout(deferred.resolve, 0);*/
				deferred.resolve();

			// Not Authenticated
			else {
				$rootScope.message = 'You need to log in.';
				//$timeout(function(){deferred.reject();}, 0);
				deferred.reject();
				$location.url('/login');
			}
		});

		return deferred.promise;
	};

	//================================================
	// Add an interceptor for AJAX errors
	//================================================
	$httpProvider.interceptors.push(function($q, $location) {
		return {
			response: function(response) {
				// do something on success
				return response;
			},
			responseError: function(response) {
				if (response.status === 401) {
					console.log('status 401');
					$location.url('/login');
				}
				return $q.reject(response);
			}
		};
	});	

	//================================================
	// Define all the routes
	//================================================
	$routeProvider.when("/", {
		templateUrl : "main",
		controller : "MainController",
		controllerAs: "mainController"
	}).when('/comments', {
		templateUrl : "comments",
		controller : "CommentsController",
		controllerAs: 'commentsController',
		resolve: {
			loggedin: checkLoggedin
		}
	}).when('/about', {
		templateUrl : "about",
		controller : "AboutController",
		controllerAs: 'aboutController'
	}).when('/login', {
		templateUrl : "login",
		controller : "LoginController",
		controllerAs: 'loginController'
	}).when('/logout', {
		templateUrl : "logout",
		controller : "LogoutController",
		controllerAs: 'logoutController'
	}).when('/register', {
		templateUrl : "register"
	}).otherwise({
		redirectTo : '/'
	});
});

```

Near the top of the file, you will have to inject the **$httpProvider** in the signature for the config provider:

```
myModule.config(function($routeProvider, $httpProvider, $locationProvider) {
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

```javascript
var app = angular.module('elvenApp');

app.controller('LoginController', function($http, $location, themeFactory) {
	var loginController = this;
	loginController.hint = "Sign in";

	loginController.update = function() {
		console.log('update');
		var user = {
			"username": loginController.userName,
			"password": loginController.password
		};

		$http.post('/login/login/', user).success(function(user) {
			themeFactory.setLogin(true);
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

Here is the register (signup) jade file:

```
extends layout

block content
	div.container
		div.row
			div.col-sm-6.col-md-4.col-md-offset-4
				h1.text-center.login-title Registration Details
					div.signup-wall
						form(class='form-signin', action='/login/signup', method='POST')
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

We now have signup working. If you need be, however, you can create a user using the signup [assignment][sign] example. Then switch back to this code.

## Step Six

Logging out.

Here is the logout controller:

```javascript
var app = angular.module('elvenApp');

app.controller('LogoutController', function($http, $sce, $location, themeFactory) {
	var logoutController = this;
	logoutController.hint = "Sign in";
	logoutController.loggedInStatus = "unknown";

	logoutController.logout = function() {
		console.log('logout');

		$http.get('/login/logout/').success(function(user) {
			themeFactory.setLogin(false);
			console.log(user);
		}).error(function(err) {
			logoutController.hint = 'Could not call logout';
			logoutController.error = $sce.trustAsHtml(err);
		})
	};

	logoutController.isLoggedIn = function() {

		$http.get('/login/loggedin/').success(function(user) {
			logoutController.loggedInStatus = user;
		}).error(function(err) {
			logoutController.hint = 'Bad Password/User. Try again';
		});
	};

	logoutController.logout();
});
```

Here is **logout.jade**:

```
h1 Logout

p hint: {{logoutController.hint}}

p logged in: {{logoutController.loggedInStatus}}

div.names
   div.btn-group
      button.btn.btn-default(ng-click='logoutController.isLoggedIn()') Is user logged in?

#document(ng-bind-html="logoutController.error")
```

We have already added the following at the bottom of **routes/login.js**. 

```
router.get('/logout', function(request, response){
	request.logOut();
	response.sendStatus(200);
});

router.get('/loggedin', function(request, response) {
	response.send(request.isAuthenticated() ? true : false);
});
```

Tie together the login and log out code and provide support for switching themes:

```javascript
(function () {

	var app = angular.module('elvenApp');

	app.factory('themeFactory', function() {
		var themeFactory = {
			themeController: null,
			setLogin: function(init) {
				themeFactory.themeController.loggedIn = init;
			}
		}

		return themeFactory;
	});

	app.controller('ThemeController', function (themeFactory) {
		var themeController = this;
		themeController.loggedIn = false;
		themeFactory.themeController = themeController;
		themeController.bootStrapCss = "cosmo";
		themeController.bootStrapThemes = [
			{name: "Cerulean", url: "cerulean"},
			{name: "Cosmo", url: "cosmo"},
			{name: "Cyborg", url: "cyborg"},
                        etc...
		];
	});

})();
```



Notice that the themeFactory is used in the **login** and **logout** controllers.

## Step Seven

Here is **public/javascripts/comments.js**

```
(function() {

    var app = angular.module('elvenApp');
    
    app.controller('CommentsController', function(mongoFactory, commentFactory) {
    	var commentsController = this;
    
    	commentsController.updateComment = function() {
    		commentFactory.updateComment(commentsController.scientist);
    	};

        // Code omitted here....

    	function getScientist() {
    		mongoFactory.getScientistById(mongoFactory.currentId, commentsController);
    	}
    
    	getScientist();
    });

})();
```

Here is the code from **mongo-factory** that provides you with a **name** property you can display at the top of the **edit**, **comments**, and **subjects** pages of your final:

```javascript
    setControllerName: function(controller) {
    	controller.name = controller.scientist.firstName + ' ' + controller.scientist.lastName;
    },
```

Call it from **getScientistById**:

```javascript
getScientistById: function(id, controller) {
	mongoFactory.currentId = id;
	var items = mongoFactory.allData.filter(function(scientist) {
		return scientist._id === id;
	});
	controller.scientist = items[0];
	mongoFactory.setControllerName(controller);
	return controller.scientist;
},
```

This means that a file like **views/comments.jade** would begin like this:

```
h1 Comments: {{commentsController.name}}
div.names
    ul
        li(ng-repeat='comment in commentsController.scientist.comments')
            a(ng-click="commentsController.selectComment(comment)") {{comment.commentText}}
```

The fist line shows how to use the new **name** property.

## Hints

You may get a warning 'Synchronous XMLHttpRequest on the main thread is deprecated'. I believe this has something to do with the dialog we are loading to login and the related code. I don't think it has to do with the way we are rerouting events. In other words, it happens when we go directly to the login page, not just when we get there from the comments link. For now we are ignorning this warning.

[sign]:http://www.ccalvert.net/books/CloudNotes/Assignments/MongooseSignIn.html
