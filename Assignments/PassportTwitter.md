---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/PassportTwitter.md
relativePath: Assignments/PassportTwitter.md
title: PassportTwitter
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: PassportTwitter.md
fileNameHTML: PassportTwitter.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Use [Passport](http://passportjs.org/) "sign in with Twitter". This assignment builds on the [Passport Assignment][passport] which explained how to sign in Google.

Your goal is to get your passport app (and eventually your DataMaster app and DataHunter game) supporting sign in with Twitter. In fact, the user should be able to sign in with Twitter, Facebook or Google. But for this exercise, you only need to add support for Twitter to the Passport program.

[passport]: http://www.ccalvert.net/books/CloudNotes/Assignments/Passport.html

## Setup Twitter

Go to https://apps.twitter.com/

- Create a new application
- Name: isit320-lastname
- Description: Learning to sign in with Twitter
- WebSite: A site that you have the rights to or **http://www.example.com**
- Callback: http://localhost:30025/twitter/callback
- Copy your consumer key and consumer secret key and put them someplace private where you can find them.

![Twitter Create App](https://s3.amazonaws.com/bucket01.elvenware.com/images/passport-twitter-create-app.png)


## Twitter Specific Code

Install the Twitter Passport strategy:

<pre>
npm install passport-twitter --save
</pre>

Create a file in the **routes** directory called **login-twitter.js**. If you have not done so already, please standardize on this naming convention:

- login-twitter.js
- login-google.js
- login-facebook.js

 Besides **express**, **router** and **passport**, at the top of your **login-twitter** file you will need to link in the Twitter passport code:

```javascript
var TwitterStrategy = require('passport-twitter').Strategy;
```

The use the strategy:

```javascript
var TWITTER_CONSUMER_KEY = 'YOUR CONSUMER KEY HERE';
var TWITTER_CONSUMER_SECRET = 'YOUR CONSUMER SECRET HERE';

passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:30025/twitter/callback"        
    },
    function(token, tokenSecret, profile, cb) {
        console.log('Twitter strategy callback', profile);
        process.nextTick(function() {
            return cb(null, profile);
        });
    }));

```

**NOTE**: You will want to match either **localhost** or **127.0.0.1** in your app and in your browser URL. Don't use one in one place, and one in the other. In other words, since we are using **localhost** for the **callbackURL**, when we are in the browser to test our app, we should type **localhost** and not **127.0.0.1**.

We also want to handle the **login**, **callback** and **profile** routes:

```javascript
router.get('/login',
    passport.authenticate('twitter'));

router.get('/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/profile', function(req, res) {
        'use strict';
        console.log(req);
        res.render('profile-temp', {
            title: 'Twitter Profile',
            user: req.user
        });
    });
```

## Setting up app.js

We are also going to have to load our **login-twitter.js** module in **app.js**. You already saw how to do this with the Google module, so I will leave this portion of the program as an exercise. If you changed the name of your login files, be sure to make the related changes in **app.js**.

## Run

We are now ready to begin testing our code. This is not the final solution for logging on, of course, but it lets you check that everything is set up correctly before you come up with a more user friendly solution.

To log on, go to this URL:

> http://localhost:30025/twitter/login

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

And the following bootstrap code in index.jade:

```
  .panel.panel-default
      .panel-heading Twitter
      .panel-body
          ul.list-group
              li.list-group-item
                  a(href='/twitter/login') Log In with Twitter
              li.list-group-item
                  a(href='/twitter/profile') Twitter Profile

```


## Permissions

You want to track who has permissions to access your account information:

> https://twitter.com/settings/applications


## Turn It In

We are working in the **Week08-Passport** folder in your repository. Place your work in that folder, if it is not there already. Run **grunt check**. Submit your assignment.

[1]: http://nodejs.org/api/process.html#process_process_nexttick_callback
