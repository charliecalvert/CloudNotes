## Overview

The goal of this lesson is to begin to use the Firebase database.

## Get Started

Go to the Firebase console:

- <https://console.firebase.google.com/>

Create a new Firebase application called **Prog270-Data-LastName**

Turn on Google Authentication, per the instructions from the previous assignment.


## JavaScript

Put the following code in **elven-help.js**. Delete everything that we put in **elven-help.js** for the previous assignment. That is all the code from document.ready on up. Leave document.ready, but delete all the code above it. This is the code that we put in for the previous assignment. After it is deleted, replace it with the following code:

```javascript
/************************************
 * Setup
************************************/

function elfFireConfig01() {
    var config = {
      apiKey: "YOUR KEY",
      authDomain: "YOUR DOMAIN",
      databaseURL: "YOUR URL",
      storageBucket: "YOUR BUCKET",
      messagingSenderId: "YOUR ID"
    };
    firebase.initializeApp(config);
}

// We are not using elfFireConfig02 at this time.
function elfFireConfig02() {
    var config = {
      apiKey: "YOUR KEY",
      authDomain: "YOUR DOMAIN",
      databaseURL: "YOUR URL",
      storageBucket: "YOUR BUCKET",
      messagingSenderId: "YOUR ID"
    };
    firebase.initializeApp(config);
}

function elfFireStart() {
    elfFireConfig01();
    $('#elfDatabasePush').click(elfFireDataPush);
    $('#elfDatabaseGet').click(elfFireDataGet);
    $('#elfDatabaseGetAllQux').click(elfFireDatabaseGetAllQux);
    $('#elfGetCurrentUser').click(elfFireGetCurrentUser);
    $('#sign-in').click(elfFireSignOut);
    $('#elfInput').click(elfFireDynamicPush);

    elfFireDynamicData();
}

/************************************
 * Users
 ************************************/

function elfFireGetCurrentUser() {
    var user = firebase.auth().currentUser;
    var userName;
    var userEmail;
    var userPhotoUrl;
    var userId;

    if (user != null) {
        userName = user.displayName;
        userEmail = user.email;
        userPhotoUrl = user.photoURL;
        userId = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }

    $('#userName').html(userName);
    $('#userEmail').html(userEmail);
    $('#userPhotoUrl').html(userPhotoUrl);
    $('#userId').html(userId);
    $('#userImg').attr('src', userPhotoUrl);
}

/************************************
 * Database
 ************************************/

var elfOldInput = [];

function elfFireDataGet() {
    return firebase.database().ref('/bar/foo').once('value').then(function(snapshot) {
        var userName = snapshot.val();
        console.log(userName);
    });
}

function elfFireDatabaseGetAllQux() {
    return firebase.database().ref('/bar/qux').once('value').then(function(snapshot) {
        var userName = snapshot.val();
        console.log(userName);
    });
}

function elfFireDynamicData() {
    var list = $('#userInputList');
    var starCountRef = firebase.database().ref('bar/qux');
    starCountRef.on('value', function(snapshot) {
      var userVal = snapshot.val()
      console.log(userVal);
      if (userVal) {
        list.append('<li>' + userVal.userInput + '</li>');
        elfOldInput = userVal.oldInput;
      }
    });
}

function elfFireDynamicPush() {

    function writeUserData() {
        var userInput = $('#userInput').val();
        if (userInput === '') {
            userInput = 'No input from user.';
        }

        if (!Array.isArray(elfOldInput)) {
            elfOldInput = [];
        }
        elfOldInput.push(userInput);
        firebase.database().ref('bar/qux').set({
            userInput: userInput,
            oldInput: elfOldInput
        });
    }

    writeUserData();    
}

function elfFireDataPush() {

    function writeUserData(userId, name, email, imageUrl) {
        firebase.database().ref('bar/foo').set({
            foo: 'foobar',
        });
    }

    writeUserData();
}

/************************************
 * Authentication (Sign-In)
 ************************************/

function elfFireSignOut() {
    firebase.auth().signOut();
    window.location.href = '/';
}

function elfFireConfig() {
    // FirebaseUI config.
    var uiConfig = {
        'signInSuccessUrl': 'start.html',
        'signInOptions': [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': '<your-tos-url>',
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

}

function elfFireInitPage() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function(accessToken) {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });
        } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, function(error) {
        console.log(error);
    });
};
```

## Interface

We are going to create three sections:

- Foo Data: Basic database test
- Shared Data: The user inputs data and that data is shared between multiple users in real time.
- User Data: Examine the data associated with the current user.

## Foo Data

Create a level two header with the title **Foo Data**.

Add two buttons inside a DIV in this section of your app:

- Button 1
  - id: elfDatabasePush
  - class: "btn btn-default btn-lg"
  - Caption: Foo Data Insert
- Button 2
  - id: elfDatabaseGet
  - class: "btn btn-default btn-lg"
  - Caption: Foo Data Get

If everything is set up correctly, you should be able to:

- Press the first button to insert a simple record in the database
- Press the second button to display the data in the console.
  - To view this data, press F12 to bring up the Developer Tools, turn to the console page.

The data should look like this: **Object {foo: "foobar"}**

Here is an example button:

```html
<button id="elfDatabasePush" class="btn btn-default btn-lg">Data Insert</button>
```
## Shared Data

Create a level 2 header called **Shared Data**.

Here you will learn how to allow the user to input data and to write the user's data to the database. If multiple users are signed in to the app at the same time, they will all see the new input in real time. Test this by signing into two google accounts, or signing into another student's app and then signing into your account while your buddy is signed into their account. This is something of a poor man's chat program.


Here is the tool used to get input from the user:

```html
<div>
  <input type="text" id="userInput" name="userInput">
</div>
```

Create two buttons inside a DIV in this section of the app:

- Button 1
  - id: elfInput
  - class: btn btn-default btn-lg
  - caption: Post Input
- Button 2
  - id: elfDatabaseGetAllQux
  - class: btn btn-default btn-lg
  - Caption: Get All Qux Data

Finally, you will want to add an unordered list in which the input will be displayed. Give it an ID of **userInputList**. An unordered list is made with the UL HTML element.

## User Details

Create a level two header called **User Details**.

Put this in it:

```html
<button id="elfGetCurrentUser" class="btn btn-default btn-lg">Get User Data</button>

<div class="container">
  <p id="userName"></p>
  <p id="userEmail"></p>
  <p id="userPhotoUrl"></p>
  <p id="userId"></p>
  <img src="" id="userImg" alt="Wait">
</div>
```

## User Status

Include this information to track the user's status, and also a few lines of code to set up the page:

```html
<div class="container">
    <p>Status: <span id="sign-in-status">Unknown</span></p>
    <button class="btn btn-primary btn-lg" id="sign-in"></button>
    <pre id="account-details"></pre>
</div>

<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.css" />
<script src="https://www.gstatic.com/firebasejs/3.5.2/firebase.js"></script>
<script src="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.js"></script>

<script>
  elfFireStart();
  elfFireInitPage();
</script>
```

## Turn it in

Put or update your copy of **index.md** and **start.md** and other markdown in your repository. Provide a link to your running application. Add any comments you feel are necessary.

## Links

- <https://firebase.google.com/docs/database/web/read-and-write>
- <https://firebase.googleblog.com/2014/06/geofire-20.html>
- <https://firebase.googleblog.com/2016/11/bringing-firebase-to-your-server.html>
