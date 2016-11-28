## Overview

To get started deploying our pages to the web, we will use a Google product called [Firebase](https://firebase.google.com/).

## Create App

Go to the firebase console: [https://console.firebase.google.com/](https://console.firebase.google.com/).

Select the **Create New Project** button.

Call it **prog270-lastname**

Find the Hosting tool and click the **Get Started** button. Click through the simple dialogs in the app wizard.

You are now ready to begin deploying apps to the cloud. The next step is to set up a place on your hard drive where you can create and deploy the files for your application.

## Create Workspace

If you have not done so already, create a **Source** directory:

<pre>
cd
mkdir Source
</pre>

Inside that directory, create a subdirectory called **firebase**:

<pre>
cd ~/Source
mkdir firebase
</pre>

Install firebase:

<pre>
npm install -g firebase-tools
</pre>

Login in to Firebase:

<pre>
firebase login
</pre>

Create sample code for your project and create some configuration files:

<pre>
firebase init
</pre>

Choose to support hosting, but toggle the database option off with your space bar. Use the public directory and don't choose single page app. Back up the default **index.html** created by firebase:

<pre>
cp public/index.html public/firebase.html
</pre>

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

## Test

To preview before you deploy issue this command:

<pre>
firebase serve
</pre>

Then go to this URL: [http://localhost:5000/](http://localhost:5000/)

After confirming that you app works, press Ctrl-C and return to the command line. You are now ready to deploy your app on the world wide web and browse to it.

## Deploy

To deploy your app, issue this command:

<pre>
firebase deploy
</pre>

They will show you what URL to visit.

Now go up to the console, find your app, and view the **Deployment History**

## Copy JS, CSS and Images

Use the tools available, or modify them as necessary, to copy your CSS, JS and Images folders from the ApacheHelpers directory to your **firebase/public** directory.

You should follow a few bsaics steps to make sure all the proper files are being loaded. In Chrome, press F12 to open the Developer Tools. Switch to the Network page. Refresh you page. If everything is set up correctly, there should be no red 404 errors for your GET statements. Instead, you should see 200 or 304 in the Status column.

## Turn it in

Take a screenshot of what happens in your bash terminal when you deploy your application with the **firebase deploy** command. Attach the screenshot to your canvas assignment. Optionally show a screenshot of your site deployed on the firebase site.

In the comments section, include the URL of your project running on the world wide web. The URL should look something like this, but not exactly like it:

- [https://elf01-31681.firebaseapp.com/](https://elf01-31681.firebaseapp.com/)
