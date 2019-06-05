## Overview

The goal of this assignment is to learn how Firebase provides authentication via sign in with Google, Twitter and other common sites. It also provides access to the database.

You can give individual users access to all or portions of your site once you allow them to sign in.

<iframe width="560" height="315" src="https://www.youtube.com/embed/8sGY55yxicA" frameborder="0" allowfullscreen></iframe>

Firebase Quickstarts: <https://github.com/firebase/quickstart-js>. For instance, here is there quickstart for [Google popup signin][gps]

## Create Server Side Files for Each Component

We have been writing long complicated URLs in **server/roures/index.js**. Let's clean that up. Create a file for each project:

- server/routes/get-user
- server/routes/get-gists
- server/rouites/qux

Each file should begin by importing express and creating a router. It should end by exporting the router. See our **test-routes** file for an example.

Modify **server/app.js** to load and use these files.

## Get Started

Go to the console and select the application you created in the [Firebase Starter][fbs] assignment:

- <https://console.firebase.google.com/>

Choose **Authentication | Sign-in Method** and enable **Google** as a Sign in Provider.

Go to the main page for your app in the console, and choose the **Settings Gear | Project Settings**. If you have already done this step, you will see the configuration code. Otherwise, select the web icon near the bottom on the right. A dialog will pop up and prompt you for a nickname. Copy the code you see and save it to a text file.

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

If you get stuck, or want to know more, go to this page:

- <https://firebase.google.com/docs/auth/web/google-signin#before_you_begin>

The Database code does not work very well and can mostly be ignored. We will approach the whole subject in more detail in [FirebaseData.html][fbd] or some similar assignment. However, you can get a few things to work if you enable **Database** in the console. Just click through the wizard. At the top of the Database page, for now, switch to the **Realtime Database**. The code we are using in this example does not work with **Cloud Firestore.**

## Service Account

Go to the project overview for your project and select the Settings (gear) icon. Select **Project Settings | Service Accounts | X Service Accounts from Google Cloud Platform**. Click the actions (hamburger) icon for the third item, the firebase-admsdk and create a key. It will be downloaded to your system as a JSON file. Create an environment variable that points at it:

    export GOOGLE_APPLICATION_CREDENTIALS="/home/charlie/Source/isit322-calvert-20495df644c3.json"

I've put the export in my **.bashrc** so that it always gets loaded. I would need it to **serve** your app locally, but I don't need to see your code running remotely.

## Code to Verify

Use this code in **App.js**:

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

queryServerLogin = event => {
    const url = event.currentTarget.dataset.url;
    this.getFirebaseToken()
        .then(response => {
            console.log('TOKEN', response.token);
            // Send token to your backend via HTTPS
            fetch(url + '?token=' + response.token)
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

Save this on the server side in the **routes** directory as **verify.js**:

```javascript
var admin = require('firebase-admin');

let loggedIn = false;

//'firebase-adminsdk-2p1h1@prog270-calvert.iam.gserviceaccount.com';
function init() {
    // var serviceAccount = require(process.env.HOME + "/Source/prog270-calvert-firebase-adminsdk-2p1h1-0a73c9115c.json");
    loggedIn = true;
    console.log(
        'INITIALIZE FIREBASE ADMIN',
        admin.initializeApp({
            // credential: admin.credential.cert(serviceAccount),
            credential: admin.credential.applicationDefault(),
            databaseURL: 'https://YOUR_INFO_HERE.firebaseio.com'
        })
    );
}

function verifyToken(token) {
    return new Promise(function(resolve, reject) {
        if (!loggedIn) {
            init();
        }
        admin
            .auth()
            .verifyIdToken(token)
            .then(function(decodedToken) {
                console.log('UID', JSON.stringify(decodedToken, null, 4));
                console.log('MAIN SERVER QUX YOU RANG CALLED');
                resolve(decodedToken);
            })
            .catch(function(error) {
                console.log(error);
                reject(error);
            });
    });
}

module.exports=verifyToken;
```

## Test

If you are on your local machine or VM like Pristine Lubuntu, you can preview before you deploy by issuing this command:

<pre>
firebase serve
</pre>

Then go to this URL: [http://localhost:5000/](http://localhost:5000/)

After confirming that you app works, press Ctrl-C and return to the command line. You are now ready to deploy your app on the world wide web with **firebase deploy**. After it has been deployed, anyone with a connection to the world wide web will b able to access it with their browser.

## Get Login Files

Run get-gist for the root of your project (prog272) or the root of your **client** project (Isit322). Chose **Elf Firebase** from the menu. This should copy

- **elf-firebase.js** and **elf-sign-in.html** to your public directory.
- **FirebaseLogin.js** to your **source** directory (prog272) or **src/components** (isit322)

## Home Page

Get your home page here:

    cp ~/Git/JsObjects/JavaScript/Syntax//JsonTable/public/favicon.png .
    wget https://s3.amazonaws.com/bucket01.elvenware.com/html/index.html    
    wget https://s3.amazonaws.com/bucket01.elvenware.com/stylesheets/firebase-express/main.css

Make sure the file we copied down is called is called **index.html** and not **index.html.1**. If necessary, delete **index.html** and rename **index.html.1** to **index.html**. Rename **style.css** to **main.css**.

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

## Obsolete

Don't read this. Skip this section, it is out of date.

The following files are no longer being used. Please ignore

Paste in the following at the bash prompt of the **public** directory for your project:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-login.js
    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-data.js

The **wget** command pulls files from the cloud using HTTP.

Open up **elven-fire-login.js** and paste in your configuration code in the **elfConfigure** method.

[gps]: https://github.com/firebase/quickstart-js/blob/master/auth/google-popup.html
[fbs]: /teach/assignments/FirebaseStarter.html
[fbd]: /teach/assignments/FirebaseData.html
