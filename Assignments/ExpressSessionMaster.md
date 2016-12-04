## Overview

The goal of this assignment is to combine Sessions and Sign-In. It allows you to track who is signed into which session and something of what they did while they werer in the session.

## Background

There are several ways to track what the user is doing while using a program. On the client side, the following three options are available:

- Cookies
- LocalStorage
- sessionStorage

On the server, the following are commonly available:

- Database
- Text file containing XML, JSON, CSV or the like

There are several advantages to saving on the server side:

- The data is saver there. A hacker can get a cookie or LocalStorage, but they will have a hard time reaching the server.
- The data is more resiliant. Data stored in a database will not disappear if a session is disrupted.

## Getting Started

Begin by copying your SessionCouch program to SessionMaster.

```bash
cp -r Week09-SessionCouch/ Week10-SessionMaster
cd Week10-SessionMaster/
```

There are several packages which need to be installed:

```bash
npm install passport --save
npm install passport-facebook --save
npm install passport-google-oauth20 --save
npm install passport-twitter --save
```

You will also want to copy in the code for handling passport sign-in:

```bash
cd routes/
cp ../../Week08-Passport/routes/twitter-login.js .
cp ../../Week08-Passport/routes/google-auth.js .
cp ../../Week08-Passport/routes/facebook.js .
cd ..
```

```bash
cd views/
2129  cp ../../Week08-Passport/views/profile-facebook.jade .
2130  cp ../../Week08-Passport/views/profile-twitter.jade .
2131  cp ../../Week08-Passport/views/account.jade profile-google.jade
cd ..
```

## Facebook ClientId {#facebook-client-id}

Create a script called **setClientId** which you can source in order to load FACEBOOK_CLIENT_ID. The contents of **setClientID** should look a bit like this:

```bash
export FACEBOOK_CLIENT_ID=<YOUR_CLIENT_ID>
export FACEBOOK_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
```

To use it: **source setClientId**.

Check that it worked:

```bash
echo $FACEBOOK_CLIENT_ID
echo $FACEBOOK_CLIENT_SECRET
```

## Passport Generic Code

Copy the code from Week08-Passport **index.js** that is Passport specific:

- <http://www.ccalvert.net/books/CloudNotes/Assignments/Passport.html#generic-code>

## SessionStore

We will use an object called session store to copy the session data into the database.

Use sessionStore to presist your session state. In **Middleware.js** write this code to iniitialize **sessionStore**:

```javascript
var sessionStore = sessionstore.createSessionStore({
    type: 'couchdb',
    host: 'http://192.168.2.27', // optional
    port: 5984, // optional
    dbName: 'sessionstore-calvert', // optional
    collectionName: 'sessions', // optional
    timeout: 10000 // optional
}, function(data) {
    console.log('sessionStore callback', data);
});
```

Now modify our session middleware to use the **sessionStore** package as a **store**:

```javascript
router.use(session({
    genid: function(req) {
        'use strict';
        console.log('id generated');
        return uuid.v4(); // use UUIDs for session IDs
    },
    key: 'app.sess',
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));
```

## Read Session Data

Using our CouchXXX.js files from the **DataMaster**, write code that will allow the user to read from the **sessionStore** database.

This means you will have to add the following views to **couchDesignDocs.js**:

```javascript
var elfSessionStore = function(doc) {
  // if the doc **collectionName** property equals **'sessions'** then emit the **doc._id** and the **doc** itself.
};

var elfSessionExpires = function (doc) {
  // if the doc **collectionName** property equals **'sessions'** and **doc.expires exists** then emit the **doc.expires**.
};
```

Now be sure you can get the views by calling a route in **CouchView.js**.

## SessionStore Fix/Hack

In the source for it, open up lib/databases/couchdb and do this:

```javascript
set: function (hash, sess, callback) {
  sess.collectionName = this.collectionName;
  if (sess && sess.cookie && sess.cookie.expires) {
    sess.expires = new Date(sess.cookie.expires);
  } else {
    sess.expires = new Date(Date.now() + this.options.ttl * 1000);
  }
  console.log('couchStore', sess);        <===== HERE
  if (sess.elfStoreData === false) {      <===== HERE
      callback(null)                      <===== HERE
      return;                             <===== HERE
  }                                       <===== HERE
  this.db.save(hash, sess._rev, sess, function(err) {
    console.log('actually saved');    
    if (err && err.error === 'conflict' && err.reason.indexOf('update conflict') >= 0) {
      return callback(new Error('ConcurrencyError: Session was updated by someone else!'));
    }
    callback(err);
  });
},

```

## UI Issues

We have too many buttons and controls on the main page. Use jQuery to hide and expose DIVs so that you can focus on one area at a time. I created the following IDs:

- .panel.panel-default#basics-page
- .panel.panel-default#database-page
- .panel.panel-default#authentication-page

The user should be able to toggle these properties at will.

Here we are showing only the basics options:

![basics](https://s3.amazonaws.com/bucket01.elvenware.com/images/express-session-master-basics.png)

![database](https://s3.amazonaws.com/bucket01.elvenware.com/images/express-session-master-database.png)

![authentication](https://s3.amazonaws.com/bucket01.elvenware.com/images/express-session-master-authentication.png)

## UI Menus

First learn about mixins by completing the mixins assignment. Then, using mixins, add menus to your app.

Also, change the behavior of the pages so that if you select one menu item, the UI for that feature is visible but the UI for the other features is hidden. For instance, if you select Basics, then the Databases and Authentication pages disappear.

![menu](https://s3.amazonaws.com/bucket01.elvenware.com/images/express-session-master-menu.png)

![mobile](https://s3.amazonaws.com/bucket01.elvenware.com/images/express-session-master-mobile.png)

The following mixin can be used:

```jade
mixin littleMenu
    nav.navbar.navbar-default.navbar-fixed-top
        .container-fluid
            // Brand
            .navbar-header
                button.navbar-toggle.collapsed(type='button',
                        data-toggle='collapse',
                        data-target='#bs-example-navbar-collapse-1',
                        aria-expanded='false')
                    span.sr-only Toggle navigation
                    span.icon-bar
                    span.icon-bar
                    span.icon-bar

                a.navbar-brand(href='/')
                    img(alt='Elvenware', src='favicon.png')
            // Nav Links
            #bs-example-navbar-collapse-1.collapse.navbar-collapse
                ul.nav.navbar-nav
                    li#basics-menu
                        a.togglePageClick(href='/basics-page')
                            | Basics
                            span.sr-only (current)
                    li#database-menu
                        a.togglePageClick(href="/database-page") Database
                    li#authentication-menu
                        a.togglePageClick(href="/authentication-page") Authentication
```

## Turn it in

Push your work and submit your assignment.

## Moving to PUG?

If you want to move from Jade to Pug, here are the steps:

```
npm install pug --save
npm uninstall jade --save
```

In **app.js** change the single instance of the word **jade** to **pug**.

In the **views** directory, change all files with the extensions **jade** to have the extension **pug**. This script should do the work for you:

```bash
#! /bin/bash

for file in *.jade
do
  git mv "$file" "${file%.jade}.pug"
done
```

Or this:

```
ln -s ~/Git/JsObjects/Utilities/NodeInstall/JadeToPug ~/bin/JadeToPug
```

Then run **JadeToPub** in your **views directory**.
