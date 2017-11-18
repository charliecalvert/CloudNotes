## Overview

The goal of this assignment is to learn how Firebase provides authentication via sign in with Google, Twitter and other common sites.

You can give individual uses access to all or portions of your site once you allow them to sign in.

<iframe width="560" height="315" src="https://www.youtube.com/embed/8sGY55yxicA" frameborder="0" allowfullscreen></iframe>

Firebase Quickstarts: <https://github.com/firebase/quickstart-js>

## Get Started

Go to the console:

- <https://console.firebase.google.com/>

Choose "Get Started" with authentication.

Go the **Choose Sign in Method** and enable **Google** as a Sign in Provider.

Go to the main page for your app, and choose "Add Firebase to your Web App". A dialog will pop up. Copy the code you see and save it to a text file.

It will look a bit like this:

```javascript
<script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
<script>
  // Initialize Firebase
    var config = {
        apiKey: "YOUR KEY",
        authDomain: "YOUR DOMAIN",
        databaseURL: "YOUR URL",
        storageBucket: "YOUR BUCKET",
        messagingSenderId: "YOUR ID"
    };
  firebase.initializeApp(config);
</script>
```

If you get stuck, or want to know more, go to this page:
- <https://firebase.google.com/docs/auth/web/google-signin#before_you_begin>

Enable auth in the console.

## Test

If you are on your local machine or VM like Pristine Lubuntu, you can preview before you deploy by issuing this command:

<pre>
firebase serve
</pre>

Then go to this URL: [http://localhost:5000/](http://localhost:5000/)

After confirming that you app works, press Ctrl-C and return to the command line. You are now ready to deploy your app on the world wide web with **firebase deploy**. After it has been deployed, anyone with a connection to the world wide web will b able to access it with their browser.

## JavaScript

Add the following to the **public** directory:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-login.js
    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-data.js

    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-login.js
    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-data.js

## Home Page

Get your home page here:

    cp ~/Git/JsObjects/JavaScript/Syntax//JsonTable/public/favicon.png .
    wget https://s3.amazonaws.com/bucket01.elvenware.com/html/index.html    
    wget https://s3.amazonaws.com/bucket01.elvenware.com/stylesheets/firebase-express/main.css

Rename style.css to main.css.

## Start Page


## Turn it in

Run **firebase deploy** to push your site to the cloud. Submit a link to your firebase site.

**NOTE**: _If you turn in a screen shot for an assignment like this, it is nice if I can read the URL in the browser address control. But I don't need a screenshot in this case, unless you want to submit one._

## For Later

Don't do the sections from here down at this time.

## Content

Put the code you want in your public directory. In other words, configure MakeHtml to put your HTML in the ~/Source/public/firebase directory. Do this by changing the **config/ElvenConfig.json** file:

```javascript
{
  "calvert": {
    "base-dir": "/home/bcuser/",
    "bootswatch": "cosmo",
    "site-dirs": [
      "Documents/AllTest",
      "Documents/AllSite"
    ],
    "destination-dirs": [
      "/home/bcuser/Source/firebase/public/",  <==== HERE
      "/var/www/html/",
      "/home/bcuser/temp/test-site/"
    ]
  }
}
```

Note that we have added our firebase directory to the **destination-dirs** section of the JSON file. It should be the first item.

If you do not already have an **index.html** file set up, copy **public/master-list.html** to **public/index.html**:

<pre>
cd ~/Source/firebase/public
cp master-list.html index.html
cd ..
</pre>

## Copy JS, CSS and Images

Use the tools available, or modify them as necessary, to copy your CSS, JS and Images folders from the ApacheHelpers directory to your **firebase/public** directory.

You should follow a few bsaics steps to make sure all the proper files are being loaded. In Chrome, press F12 to open the Developer Tools. Switch to the Network page. Refresh you page. If everything is set up correctly, there should be no red 404 errors for your GET statements. Instead, you should see 200 or 304 in the Status column.
