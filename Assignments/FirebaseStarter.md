## Overview

To learn a new way to deploy our pages to the web, we will use a Google product called [Firebase](https://firebase.google.com/).

The goal of this assignment is to:

- Get our Firebase accounts and dashboard set up
- To learn how to create a Firebase app with the dashboard
- To set up the Firebase tools on Pristine Lubuntu or your work machine of choice.
- To create a minimal Firebase project and deploy it to the cloud using the Firebase tools

**NOTE**: _The web interface for a product like Firebase changes in small (and sometimes big) ways at various times without notice. As a result, there may be changes to the way things are set up here._

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/O17OWyx08Cg" frameborder="0" allowfullscreen></iframe>

## Create App

Go to the Firebase console: [https://console.firebase.google.com/](https://console.firebase.google.com/).

Select the **Add Project** button.

Call it **prog270-lastname**. Accept **default settings for sharing Google Analytics** and the **controller-controller** terms. Select **Create project**.

Find the Hosting tool and click the **Get Started** button. Click through the simple dialogs in the app wizard.

You are now ready to begin deploying apps to the cloud. The next step is to set up a place on your hard drive where you can create and deploy the files for your application.

## Add Editor

As I start to grade the Firebase homework assignments, it seems that I need to have permissions to run your projects with **firebase serve**.  Here is the page that explains the simple steps to add me as an **Editor:**

[https://support.google.com/firebase/answer/7000272?hl=en](https://support.google.com/firebase/answer/7000272?hl=en)

Please use the same email address that we use when we communicate via hangouts. The one with bc in the address.

If you can get this done ASAP that would be great, and probably to your advantage, as it will enable me to better grade, comment on, and help you fix your projects. We will, of course, also go over it in class. Thank you.

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

Though they may already be installed on your system, install firebase anyway to be sure you have the latest tools:

<pre>
npm install -g firebase-tools
</pre>

## Log in

Don't be frightened of logging into Firebase. It is more than reasonably safe, and if you don't become very comfortable with logging into and using cloud services you should... Well I don't know how to complete that sentence. I'll just say that using cloud services is an essential part of web development these days. We login in to Firebase with this simple command:

<pre>
firebase login
</pre>

After a moment a browser window will open to let you complete the login process.

**NOTE**: _Firefox may open. That browser should work fine. Consider, however, also logging in via Chrome or Chromium as Firebase is a Google product._

If you don't have a local browser because you are on a server, or if you are on Cloud Nine, then try this:

    firebase login --no-localhost

## Create

Working inside your **firebase** directory, create sample code for your project and create some configuration files. You can complete both those steps with this command:

<pre>
firebase init
</pre>

Choose to support hosting and functions, and perhaps the database option as well. Use the arrow keys and the space bar. Take all the default options, including using the **public** directory and don't choose single page app.

Back up the default **index.html** created by firebase:

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

Recreate a second version of your application in your repository in a directory called **Week10-FirebaseStarter**. You don't need to create a new app in the console or log in again. However, you do need to redo the steps shown above in sections called **Create**, **Run**, and **Deploy**.

Take two screenshots. One of what happens in your bash terminal when you deploy your application with the **firebase deploy** command from the **Source/firebase** directory and one of what happens when you do it your repository. Be sure to show the name of the directory in your screenshot, a bit like this:

```nohighlighting
? Would you like to proceed with deletion? Selecting no will continue the rest o
f the deployments. Yes
i  functions: deleting function getUser(us-central1)...
i  functions: deleting function helloWorld(us-central1)...
✔  functions[helloWorld(us-central1)]: Successful delete operation.
✔  functions[getUser(us-central1)]: Successful delete operation.
i  hosting[test-may29-2019]: finalizing version...
✔  hosting[test-may29-2019]: version finalized
i  hosting[test-may29-2019]: releasing new version...
✔  hosting[test-may29-2019]: release complete

✔  Deploy complete!

Please note that it can take up to 30 seconds for your updated functions to propagate.
Project Console: https://console.firebase.google.com/project/test-may29-2019/overview
Hosting URL: https://test-may29-2019.firebaseapp.com
charlie@elf-path:~/Source/firebase/charliebc/may-29-2019$
```

Attach the screenshots directly to your canvas assignment. (No zip files, no Word Documents). Optionally show a third screenshot of your site deployed on the firebase site.

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
    firebase --version (3.14 as of Nov 2017, 6.9.0 as of May 2019)
    firebase --help
