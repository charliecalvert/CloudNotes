## Overview

THIS DOCUMENT STILL NEEDS WORK, BUT HOPEFULLY IS USABLE.

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

## Get Login Files

For now, don't do this. Copy the files from ElfExpressSignIn instead.

Run our JsObjects based **get-gist** from the root of your project. Chose **Elf Firebase** from the menu. This should copy

- **elf-firebase.js** and **elf-sign-in.html** to your public directory.
- **FirebaseLogout.js** to your **source** directory.

**NOTE**: _I recently renamed the file that was called **FirebaseLogin.js** to **FirebaseLogout.js**. It was originally badly misnamed, and hopefully this name is at least a bit better._

## Sign-in with Google Configuration

Go to the console and select the **AddressMaven-lastname** application. If it does not exist, follow the steps you used to create a project found in the [Firebase Starter][fbs] assignment. Call your new project **AddressMaven-lastname**, where lastname is you lastname:

- <https://console.firebase.google.com/>

Choose **Authentication | Sign-in Method** and enable **Google** as a Sign in Provider. If you get a restricted client error when you try to login be sure to set the Support email address. On the error page there is a  button that might help you fix the problem.

Go to the main page for your app in the console, and choose the **Settings Gear | Project Settings**. If you have already done this step, you will see the configuration code and the place to set the Support email address. Otherwise, select the web icon near the bottom on the right. A dialog will pop up and prompt you for a nickname. Copy the code you see and save it over the default **firebaseConfig** code found near the top **public/elf-firebase.js** and in the midst of **elf-sign-in.html**.

**NOTE**: _On the **Settings Gear | Project Settings** page, make sure that **Public Settings | Support email** is set._

It will look a bit like this:

```javascript
<script src="https://www.gstatic.com/firebasejs/6.0.1/firebase-app.js"></script>
<script>
  // Initialize Firebase
    const config = {
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

Just replace the **config** object literal shown above with the code you found in the Firebase Console.

**NOTE**: _This **config** information will be public. In order to provide security for your application, you need to [lock down your application][lock] with rules you configure in the Firebase Console. This involves both white-listing your domain, and setting up database rules. We will not be too strict, as I want to be able to test your code by running it on my system. This means we should include localhost in our white-list._

If you get stuck, or want to know more, go to this page:

- <https://firebase.google.com/docs/auth/web/google-signin#before_you_begin>

The subject of signing in and databases are frequently linked, as often you want to authenticate a user before giving them access to a database. We will approach the whole subject of databases in [FirebaseData.html][fbd] or some similar assignment.

## Integrate elf-firebase

Near the top of **control.js**:

    import {FirebaseLogout} from './FirebaseLogout';
    import { initApp } from "./elf-firebase";    

In the **window.load** part of **control.js** paste in this code from ElfExpressSignIn:

```JavaScript
const doRender = () => {
    const selectors = document.querySelectorAll('.__react-root');
    selectors.forEach(renderAppInElement);
};

window.onload = function () {
    initApp(() => {
        if (window.firebase.auth().currentUser) {
            loadAddress()
                .then(result => {
                    console.log('LOAD STATUS', result.status);
                    doRender();
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            doRender();
        }
    });
};
```

## Load Firebase

In layout.pug:

    script(src="https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js")
    script(src="https://www.gstatic.com/firebasejs/6.1.0/firebase-auth.js")

## Pug Files

At least for now, add the following to **worker.pug** and **index.pug**. They should be placed just before the code that loads the bundle and indented to the same level.

    p#sign-in-status

    p#sign-in

    p#account-details

## Service Account

Go to the project overview for your project and select the Settings (gear) icon. Select **Project Settings | Service Accounts |  Service Accounts from Google Cloud Platform**. Click the actions (hamburger) icon for the third item, the firebase-admsdk and create a key. It will be downloaded to your system as a JSON file. Put it in the root of your repository.

**NOTE**: _Our repositories should be private. It would be an error to publish this key to a public repository and Google will probably find the problem and write you an email about it._

Create an environment variable that points at it. The exact code will differ on your system, but it might look a bit like this:

    export GOOGLE_APPLICATION_CREDENTIALS="/home/bcuser/Git/prog272-lastname-2019/prog272-lastname-2043dasdfae323.json"

I've put the above line of code near the bottom of my **.bashrc** so that it always gets loaded when I open a new shell. The first time you do it, if you already have one or more bash shells open, then you need to either past the code into each open bash shall and press enter, or else run this command in each open bash shell:

```nohighlighting
source ~/.bashrc
```

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

- Add a method called **getFirebaseToken** method to your project. Probably in **load-address.js**
- Pick a method that calls **fetch**. In our case, there is really only one and we have been calling it **elfQuery**
- Wrap your **fetch** call in a call to **getFirebaseToken**.
  - In the **then** function for your call to **getFirebaseToken** call **fetch**.
  - When calling **fetch** pass in the Firebase token passed to you when you called **getFirebaseToken**
  - We should pass the token as a parameter called **token**. See the **makeParams** method outlined below.

I should add that the token we get is encrypted and is not human readable. On the server side we can decrypt the token. This step has two purposes:

- The **decodedToken** allows us to read information about the user
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

## Server Side

Install firebase-admin: **npm i firebase-admin**.

Save this on the server side in the **routes** directory as **verify.js**:

```javascript
const admin = require('firebase-admin');

let loggedIn = false;

//'firebase-adminsdk-2p1h1@prog270-calvert.iam.gserviceaccount.com';
function init() {    
    var serviceAccount = require("path/to/serviceAccountKey.json");
    loggedIn = true;
    console.log(
        'INITIALIZE FIREBASE ADMIN',
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // credential: admin.credential.applicationDefault(),
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

Here is the code that uses VerifyToken that would go, for instance in the **/address-list** route from **functions/index.js**:

```javascript
verifyToken(req.query.token)
    .then(() => {
        readFile(__dirname + '/address-list.json')
            .then(json => {
                console.log('THE JSON IN /address-list', json);
                res.send(JSON.parse(json.result));
            })
            .catch(ex => {
                res.send({ result: 'error', error: ex });
            });
    })
    .catch(err => {
        console.log('COULD NOT VERIFY TOKEN');
        res.send({ result: 'not logged in to Firebase', error: err });
    });
```        
We use **verify.js** on the server side. We call **verifyToken** to confirm that a particular token sent from the client is associated with a valid user. Note that **verifyToken** is a promise that returns a **decodedToken** with information about the user.

**NOTE**: _There is a very similar file, called **verify-db.js** that uses the init method return an instance of the firestore database. Use this module if you are not using fireStore, use **verify-db.js** if you do use a database. Since this assignment does not use the database we don't need verify-db.js._

It is possible, and sometimes useful, to use this code in **initializeApp**. This way you don't need to wrestle with the Service File:

```javascript
admin.initializeApp({
    apiKey: 'YOUR API KEY HERE',
    authDomain: 'YOUR AUTH DOMAIN',
    projectId: 'YOUR PROJECT ID'
})
```

## Client Side Code to Verify {#code-to-verify}

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

elfQuery = event => {
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

## Test

If you are on your local machine or VM like Pristine Lubuntu, you can preview before you deploy by issuing this command:

<pre>
firebase serve
</pre>

Then go to this URL: [http://localhost:5000/](http://localhost:5000/)

After confirming that you app works, press Ctrl-C and return to the command line. You are now ready to deploy your app on the world wide web with **firebase deploy**. After it has been deployed, anyone with a connection to the world wide web will b able to access it with their browser.

## Turn it in

Run **firebase deploy** to push your site to the cloud. Submit a link to your firebase site.

**NOTE**: _If you turn in a screen shot for an assignment like this, it is nice if I can read the URL in the browser address control. But I don't need a screenshot in this case, unless you want to submit one._\

For AddressMaven, I'm looking for:

- **elf-sign-in.html** in public
- **elf-firebase.js** and **FirebaseLogout.js** in Source
- **Login** and **Logout** in menu
- **FirebaseLogout** and **initApp** imported into **control.js**


[gps]: https://github.com/firebase/quickstart-js/blob/master/auth/google-popup.html
[fbs]: /teach/assignments/FirebaseStarter.html
[fbd]: /teach/assignments/FirebaseData.html
[lock]: https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
