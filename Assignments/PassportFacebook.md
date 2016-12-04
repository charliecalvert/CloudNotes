## Overview

Passport Facebook exercise.

Use [Passport](http://passportjs.org/) "sign in with Facebook". This assignment builds on the [Passport Assignment][passport] which explained how to sign in Google.

Your goal is to get your passport app (and eventually your DataMaster app and DataHunter game) supporting sign in with Facebook. In fact, the user should be able to sign in with Twitter, and either Facebook or Google. But for this exercise, you only need to add support for Facebook to the Passport program.

[passport]: http://www.ccalvert.net/books/CloudNotes/Assignments/Passport.html

Go to this page to turn on and off which apps have permission to use your information. In other words, to deactivate the app you built so that it can sign on again from the beginning, go to this page:


- <https://www.facebook.com/settings?tab=applications>
- <https://www.facebook.com/help/792552774106866>

## Setup Facebook

Go to the Facebook developers site: [https://developers.facebook.com/](https://developers.facebook.com/). Note at the bottom the link to the Login API.

Visit the Facebook Login for Developers Page: [https://developers.facebook.com/products/login/](https://developers.facebook.com/products/login/). Check out the page you see from the Get Started button.

After getting oriented, look at the top right, and select the option to create a **New App**.

- Display Name: Isit320-Lastname
- Category: Education

A possible alternative page for creating your app is here:

- [https://developers.facebook.com/apps/](https://developers.facebook.com/apps/)

Click okay, fill in the capcha, and choose **Facebook Login** as Product and **www** as login.

- Site URL: http://localhost:30025
- Get your App ID and Secret
- Client token on advanced page
- The Valid OAuth redirect APIs: http://localhost:30025/facebook/login


![OAuth Facebook](https://s3.amazonaws.com/bucket01.elvenware.com/images/passport-facebook-oauth.png)

## Facebook Specific Code

Save the Facebook specific code in **routes/login-facebook.js**:

```javascript
/**
 * Created by charlie on 11/5/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

/**************************************
 *  Facebook
 **************************************/

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        'use strict';
        console.log(req.user);
        res.render('profile-facebook', {
            title: 'Facebook Profile',
            user: req.user
        });
    });

passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:30025/facebook/login/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        'use strict';
        return done(null, profile);
    }));

router.get('/login',
    passport.authenticate('facebook'));

router.get('/login/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        'use strict';
        res.redirect('/');
    });

module.exports = router;

```

Here is a way to use the **profileFields** property to alter the Facebook Strategy so you can get more information about the user:

```javascript
passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:30025/facebook/login/return',
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        'use strict';
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        return done(null, profile);
    }));
```


## Make Public

You need to make your app public if it is going to be used by more than one person. Since both you and I need to access the app, you should make it public.

- Go to https://developers.facebook.com/ (Links to an external site.) and be sure you are signed in.
- At the top right, you can select your app from a drop down.
- You are taken to a page focused on your app. Select the App Review menu item on the far left.
- Set the **Make <app-name> Public** toggle to yes.

![Make Facebook app Public](https://s3.amazonaws.com/bucket01.elvenware.com/images/passport-facebook-public.png)

I think some kinds of apps need to be reviewed, but just using the Login API does not require review. So you can simply toggle Make Public from no to yes. If we wanted to be more cautious, we probably could have added me as co-developer, or some such, which would also be a good exercise. But just toggle the Make Public option for now.

## Turn It In

We are working in the **Week08-Passport** folder in your repository. Place your work in that folder, if it is not there already. Run **grunt check**. Submit your assignment.

[1]: http://nodejs.org/api/process.html#process_process_nexttick_callback
