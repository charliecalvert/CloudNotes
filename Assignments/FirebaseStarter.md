## Overview

To learn a new way to deploy our pages to the web, we will use a Google product called [Firebase](https://firebase.google.com/).

The goal of this assignment is to:

- Get our Firebase accounts and dashboard set up
- To learn how to create a Firebase app with the dashboard
- To set up the Firebase tools on Pristine Lubuntu or your work machine of choice.
- To create a minimal Firebase project and deploy it to the cloud using the Firebase tools

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/O17OWyx08Cg" frameborder="0" allowfullscreen></iframe>

## Create App

Go to the Firebase console: [https://console.firebase.google.com/](https://console.firebase.google.com/).

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
cd firebase
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

## Run

To run your application:

<pre>
firebase serve
</pre>

Then browse to the correct page.

## Deploy

To deploy your app, issue this command:

<pre>
firebase deploy
</pre>

They will show you what URL to visit.

Now go up to the console, find your app, and view the **Deployment History**

## Turn it in

Take a screenshot of what happens in your bash terminal when you deploy your application with the **firebase deploy** command. Attach the screenshot to your canvas assignment. Optionally show a screenshot of your site deployed on the firebase site.

In the comments section, include the URL of your project running on the world wide web. The URL should look something like this, but not exactly like it:

- [https://elf01-31681.firebaseapp.com/](https://elf01-31681.firebaseapp.com/)

## Key Commands

Get Started:

    npm install -g firebase-tools
    firebase logon    
    firebase init
    firebase deploy

also

    firebase logout
    firebase list
    firebase --version (3.14 as of Nov 2017)
    firebase --help
