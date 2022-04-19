---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MongooseSignIn.md
relativePath: Assignments/MongooseSignIn.md
title: MongooseSignIn
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: MongooseSignIn.md
fileNameHTML: MongooseSignIn.html
---


<!-- toc -->
<!-- tocstop -->

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

To connect to the MongoDb database, I've been using the **connect.js** file from the **$ELF_TEMPLATES/Database** directory. Copy **connect.js** into the **routes** directory

```bash
cp $ELF_TEMPLATES/Database/connect.js routes/.
```

### Define Schema

Define the schema for your database in **models/user.js**. You can do something like the following to copy the file into the models directory:

```bash
cp -r $ELF_TEMPLATES/SignIn/models .
```

The above command creates a local project folder called **models** and copies the **user.js** file into it. Issue this command only once, otherwise you will end up with nested folders.

**NOTE**: _If something goes wrong, you can always delete the local **models** directory and try again. (Don't delete the **$ELF_TEMPLATES/SignIn/models** directory!)_

## Step Two

Let's work on the front end. Retrieve the jade for the various dialogs needed to complete the sign in process:

```
cp -v $ELF_TEMPLATES/SignIn/views/*.jade views/.
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

New way:

```javascript
// Connect to DB
var connect = require('./routes/connect');
connect.doConnection(true);
```

And remove the line that reads, as we will include it later:

```javascript
var routes = require('./routes/index')
```

More specifically, on about line 13, comment out the existing routes call:

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

Copy **SpaceNeedle.png** to the **public/images** directory:

<pre>
cp $ELF_TEMPLATES/SignIn/public/SpaceNeedle.png public/images/.
</pre>

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

Be careful with the next command, as it will overwrite your existing **index.js** file. Since this is a new project, the command should not cause any harm. However, if you are working with an existing project, and have already modified **routes/index.js**, then open **$ELF_TEMPLATES/SignIn/routes/index.js** in an editor, and selectively copy in the contents of the file, or use the method described below in the [alternative login](#alternative-login).

If you starting fresh, and can safely replace your **routes/index.js** file, then start by copying in the default SignIn **index.js** file, overwriting the existing index.js:

<pre>
cp $ELF_TEMPLATES/SignIn/routes/index.js routes/.
</pre>

The most important line is this one:

```javascript
  router.get('/', isAuthenticated, function (req, res, next) {...})
```

Here we use the **isauthenticated** middleware to test if we are logged in. If we are logged in, go to the designated page, otherwise go to the login page. Use this same middleware for all the calls you make from the client. That way you can be sure the user is logged in before allowing them to view a page.

## Turn it in

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

## Summary


<pre>
npm install bcrypt-nodejs --save
npm install mongoose --save
npm install passport --save
npm install passport-local --save
npm install express-session --save
cp $ELF_TEMPLATES/Database/connect.js routes/.
cp -r $ELF_TEMPLATES/SignIn/models .
cp -v $ELF_TEMPLATES/SignIn/views/\*.jade views/.
cp -r $ELF_TEMPLATES/SignIn/passport/ .
if [ ! -d "public/images" ]; then
  mkdir public/images
else
  echo "public/images already exists"
fi
cp $ELF_TEMPLATES/SignIn/public/SpaceNeedle.png public/images/.
</pre>

Before running the following command, be sure to check that your copy of **routes/index.js** does not contain important code. If it does, then copy all the routes from that file into another file and replace your old index.js with the one from $ELF_TEMPLATES. More in the section on the [alternative login](#alternative-login).

<pre>
cp $ELF_TEMPLATES/SignIn/routes/index.js routes/.
</pre>

You will need to do StepThree above manually.

## Alternative login {#alternative-login}

Suppose your index.js looked like this:

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
    'use strict';
    response.render('index', {
        title: 'Elven Site Options',
        author: 'Charlie Calvert'
    });
});

router.get('/foo', function(req, res, next) {
    console.log('foo');
    res.send({
        title: 'Elf Foo',
        foo: 'foo'
    });
});
```

Move foo and any similar methods into in **routes/foo.js**

```javascript
var express = require('express');
var router = express.Router();

router.get('/foo', function(req, res, next) {
    console.log('foo');
    res.send({
        title: 'Elf Foo',
        foo: 'foo'
    });
});
```

Now add the following to app.js about line 8 or 10:

```javascript
var foo = require('./routes/foo');
```

And further down:

```javascript
app.use('/foo', foo);
```

Now call the foo route like this:

```javascript
$.getJSON('/foo/foo', function(result) {...});
```
