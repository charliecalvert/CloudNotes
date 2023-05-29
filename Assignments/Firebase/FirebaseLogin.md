---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/FirebaseLogin.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: FirebaseLogin.md
relativePath: /FirebaseLogin.md
title: FirebaseLogin
directoryName: Assignments
category : assignments-guide
---

## Overview

NOT YET READY BROWSE LIGHTLY AND COME BACK LATER FOR UPDATES.

The goal of this assignment is to learn how Firebase provides authentication via sign in with Google, Twitter and other common sites. It also provides access to the database. You can give individual users access to all or portions of your site once you allow them to sign in. Users stay logged in once they are logged in, so long as you don't clear the local store. You are also provide with minimal information about the user who is logged in.

There are two parts to the assignment:

- Learn to log in
- Learn to run certain functions only when the user is logged in.

## Permissions

I need to have permissions to run your projects with **firebase serve**.  Here is the page that explains the simple steps to add me as an **Editor:**

- [https://support.google.com/firebase/answer/7000272?hl=en](https://support.google.com/firebase/answer/7000272?hl=en)

Please add the same address you use to contact me on hangouts and make me an **Editor** on your project.

## Resources

Use the **ElfExpressSignIn** sample program as a guide when working through this assignment:

    cd $JSOBJECTS/JavaScript/Firebase/ElfExpressSignIn

It strips out everything from an Express app except the features needed to sign-in with Firebase     

This video is by Firebase, and provides an high level overview of the authentication technology:

<iframe width="560" height="315" src="https://www.youtube.com/embed/8sGY55yxicA" frameborder="0" allowfullscreen></iframe>

Firebase Quickstarts: <https://github.com/firebase/quickstart-js>. For instance, here is there quickstart for [Google popup signin][gps]

## Create Server Side Files for Each Component

We have been writing long complicated URLs in **server/routes/index.js**. Let's clean that up. Create a file for each project:

- server/routes/get-user
- server/routes/get-gists
- server/routes/qux

Each file should begin by importing express and creating a router. It should end by exporting the router. See our **test-routes** file for an example.

Modify **server/app.js** to load and use these files.

## Get Login Files

Run get-gist for the root of your project (prog272) or the root of your **client** project (Isit322). Chose **Elf Firebase** from the menu. This should copy

- **elf-firebase.js** and **elf-sign-in.html** to your public directory.
- **FirebaseLogout.js** to your **src/components** directory

**NOTE**: _I recently renamed the file that was called **FirebaseLogin.js** to **FirebaseLogout.js**. It was originally badly misnamed, and hopefully this name is at least a bit better._

## Set Configuration

Go to the console and select the application you created in the [Firebase Starter][fbs] assignment:

- <https://console.firebase.google.com/>

Choose **Authentication | Sign-in Method** and enable **Google** as a Sign in Provider.

Go to the main page for your app in the console, and choose the **Settings Gear | Project Settings**. If you have already done this step, you will see the configuration code. Otherwise, select the web icon near the bottom on the right. A dialog will pop up and prompt you for a nickname. Copy the code you see and save it over the default **firebaseConfig** code found near the top **public/elf-firebase.js** and in the midst of **elf-sign-in.html**.

It will look a bit like this:

```javascript
<script src="https://www.gstatic.com/firebasejs/6.0.1/firebase-app.js"></script>
<script>
  // Initialize Firebase
    var config = {
        apiKey: "YOUR KEY",
        authDomain: "YOUR DOMAIN",
        databaseURL: "YOUR URL",
        projectId: "YOUR ID",
        storageBucket: "YOUR BUCKET",
        messagingSenderId: "YOUR ID",
        appId: "YOUR ID"
    };
  firebase.initializeApp(config);
</script>
```

Just replace config with the code you found in the Firebase Console.

**NOTE**: _This config information will be public. In order to provide security for your application, you need to [lock down your application][lock] with rules you configure in the Firebase Console. This involves both white-listing your domain, and setting up database rules. We will not be too strict, as I want to be able to test your code by running it on my system. This means we should include localhost in our white-list._

If you get stuck, or want to know more, go to this page:

- <https://firebase.google.com/docs/auth/web/google-signin#before_you_begin>

The Database code does not work very well and can mostly be ignored. We will approach the whole subject in more detail in [FirebaseData.html][fbd] or some similar assignment. However, you can get a few things to work if you enable **Database** in the console. Just click through the wizard. At the top of the Database page, for now, switch to the **Realtime Database**. The code we are using in this example does not work with **Cloud Firestore.**

## Expect HTML Elements

At the bottom of **client/public/index.html** I put this, as it is wanted by **elf-firebase.js**

```html
<div id="firebaseui-auth-container"></div>
<div style="display: none" id="sign-in-status"></div>
<div id="sign-in"></div>
<!-- button id="sign-out" onclick="signOut()">Sign Out</button -->
<pre id="account-details"></pre>
<!-- End Firebase Sign-in and Sign-out  for BODY tag -->
```

Here is the section in **elf-firebase.js** that uses this code:

```javascript
document.getElementById('sign-in-status').textContent = 'Signed in';
document.getElementById('sign-in').textContent = '';
// CODE OMITTED HERE
document.getElementById('sign-in-status').textContent = 'Signed out';
document.getElementById('sign-in').textContent = '';
document.getElementById('account-details').textContent = '';
```

This last bit is just an FYI, you don't need to do anything with it.

## Load Firebase

Put this in **public/index.html**:

```html
<script src="https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js"></script>
<!-- To learn more: https://firebase.google.com/docs/web/setup#config-web-app -->
<script src="https://www.gstatic.com/firebasejs/6.1.0/firebase-auth.js"></script>
<script src="elf-firebase.js"></script>    
```


## Service Account

Go to the project overview for your project and select the Settings (gear) icon. Select **Project Settings | Service Accounts | X Service Accounts from Google Cloud Platform**. Click the actions (hamburger) icon for the third item, the firebase-admsdk and create a key. It will be downloaded to your system as a JSON file.

**NOTE**: _Our repositories should be private. It would be an error to publish this key to a public repository and Google will probably find the problem and write you an email about it._

Create an environment variable that points at it:

    export GOOGLE_APPLICATION_CREDENTIALS="/home/charlie/Source/isit322-calvert-20495df644c3.json"

I've put the above line of code near the bottom of my **.bashrc** so that it always gets loaded when I open a new shell. The first time you do it, if you already have one or more bash shells open, then you need to either past the code into each open bash shall and press enter, or else run this command in each open bash shell:

```nohighlighting
source ~/.bashrc
```

I would need it to **serve** your app locally, but I don't need to see your code running remotely.

Here is how I check that all is set up correctly:

    cat $GOOGLE_APPLICATION_CREDENTIALS

If that prints out the contents of our credentials file that we downloaded, then all is good. If it tells us that it can't find our file (No such file or directory) then that means we are not specifying the right path to our file. The mistake is usually in **~/.bashrc**. If it returns nothing or appears to hang, then we probably don't have the statement in a **~/.bashrc** and need to put it there or else we need to run **source ~/.bashrc**. (If the command seems to hang, then break out of it **Ctrl-C**.)

This command can also help you troubleshoot:

    echo $GOOGLE_APPLICATION_CREDENTIALS

## Working with Tokens

We are now going to learn how to pass information about the user from the client to the server. We have two reasons for doing this:

- So we can track the users who sign in to our app in our database
- So we can confirm that the users who are signed in are valid and have particular privileges. For instance, if we have granted a user admin privileges we want to know that, and we don't want someone falsely claiming to have admin privileges.

We won't accomplish all these goals in this assignment, but we will set the stage so that they can be accomplished later.

I'll show you the code in the next two sections of this document, but let's first think through the steps in this process. We'll take the client first, then the server.

Client:

- Add a method shown below called **getFirebaseToken** to your project. Probably in **App.js**
- Pick a method that calls fetch. Let's choose **queryServer**
- Wrap your **fetch** call in a call to **getFirebaseToken**.
  - In the **then** function for your call to **getFirebaseToken** call **fetch**.
  - When calling **fetch** pass in the Firebase token passed to you when you called **getFirebaseToken**
  - We should pass the token as a parameter called **token**. See the **makeParams** method outlined below.

I should add that the token we get is encrypted and is not human readable. On the server side we can decrypt the token. This step has two purposes:

- The decodedToken allows us to read information about the user
- It confirms that the encrypted token is valid and has not been tampered with.

On the server side we want to verify that the token sent from the client is valid before we perform any further tasks:

- The first step on the server is to ensure that we got the token from client. Do whatever you need to do to confirm that **request.query.token** contains your token.
- Next we pass the token to a method I give you called **verifyToken**. This method tests the validity of the token and returns a human readable decrypted token.
- Assuming that **verifyToken** returns successfully, we are then free to execute the code that we would normally run in that endpoint.

For instance, we normally implement a simple **you-rang** call by returning some JSON.

```javascript
var message = { result: 'success',  status: 'bar' };
response.send(message);
```

Now are going to wrap this code in a call to **verifyToken**:

```javascript
verifyToken(token)
    .then((decodedToken) => {
        var message = { result: 'success',  status: 'bar' };
        response.send(message);
    })
    .catch(error => {
        response.send({
            result: 'not logged in to Firebase',
            suggestion: 'export GOOGLE_APPLICATION_CREDENTIALS="ServiceRecord',
            error: error
        });
    });
```

Now that you understand the basics, let's dig into the details.

## Code to Verify

Use this code in **App.js** (isit322) or **loadAddress.js** (prog272). Note that you may need to write **const getFirebaseToken** or simply **getFirebaseToken** depending on whether or not it is method of a React class:

```javascript
getFirebaseToken = () => {
    return new Promise((resolve, reject) => {
        if (!window.firebase.auth().currentUser) {
            this.setData({ result: 'You need to log in.' });
            reject({ result: 'You need to log in (env export?).' });
        }
        window.firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(idToken => {
                resolve({ token: idToken });
            })
            .catch(err => {
                reject(err);
            });
    });
};

makeParams = (params) => {
    var esc = encodeURIComponent;
    return '?' + Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
};

queryServerLogin = event => {
    let url = event.currentTarget.dataset.url;
    this.getFirebaseToken()
        .then(response => {
            console.log('TOKEN', response.token);
            url = url + this.makeParams({token: response.token, test: 'testParam'});
            fetch(url)
                .then(function(response) {
                    return response.json();
                })
                .then(json => {
                    this.setData(json);
                })
                .catch(function(ex) {
                    console.log('parsing failed, URL bad, network down, or similar', ex);
                });
        })
        .catch(err => {
            console.log(err);
        });
};
```

In the above example, we don't actually use the **test** key/value pair passed to **makeParams**. It is included just as an illustration of how to use **makeParams** to create parameters for **fetch of this form**:

    '/foo?a=1&b=2'

**makeParams** takes an object and returns a string like that shown above.

Here is a link to [**verify-db.js**][vdbt].

## Server Side

Install firebase-admin: **npm i firebase-admin**.

Save this on the server side in the **routes** directory as **verify-db.js**:

```javascript
var admin = require('firebase-admin');

let loggedIn = false;

//'firebase-adminsdk-2p1h1@prog270-calvert.iam.gserviceaccount.com';
function init() {
    loggedIn = true;
    const firebaseApp = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
    console.log('INITIALIZE FIREBASE ADMIN', firebaseApp);
    return admin.firestore();
}

function verifyToken(token, url) {
    return new Promise(function(resolve, reject) {
        if (!loggedIn) {
            init(url);
        }
        admin
            .auth()
            .verifyIdToken(token)
            .then(function(decodedToken) {
                console.log('UID', JSON.stringify(decodedToken, null, 4));                
                resolve(decodedToken);
            })
            .catch(function(error) {
                console.log(error);
                reject(error);
            });
    });
}

module.exports.verifyToken=verifyToken;
module.exports.init=init;
```

You would use **verifyToken** a bit like this inside of an endpoint (Route) in **server/routes**:

```javascript
verifyToken(token)
    .then(() => {
        // YOUR CODE HERE. USUALLY response.send(...)
    })
    .catch(err => {
        console.log('COULD NOT VERIFY TOKEN');
        response.send({ result: 'not logged in to Firebase', error: err });
    });
```        

## Test

If you are on your local machine or VM like Pristine Lubuntu, you can preview before you deploy by issuing this command:

<pre>
firebase serve
</pre>

Then go to this URL: [http://localhost:5000/](http://localhost:5000/)

After confirming that you app works, press Ctrl-C and return to the command line. You are now ready to deploy your app on the world wide web with **firebase deploy**. After it has been deployed, anyone with a connection to the world wide web will b able to access it with their browser.

## Turn it in

Run **firebase deploy** to push your site to the cloud. Submit a link to your Firebase site so I can see your running code.

**NOTE**: _If you turn in a screen shot for an assignment like this, it is nice if I can read the URL in the browser address control. But I don't need a screenshot in this case, unless you want to submit one._

[gps]: https://github.com/firebase/quickstart-js/blob/master/auth/google-popup.html
[fbs]: /teach/assignments/FirebaseStarter.html
[fbd]: /teach/assignments/FirebaseData.html
[lock]: https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
[vdbt]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Firebase/ElfExpressFirestore/routes/verify-db.js
