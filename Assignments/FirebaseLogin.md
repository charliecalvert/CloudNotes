
Go to this page:

https://firebase.google.com/docs/auth/web/google-signin#before_you_begin

Enable auth in the console:

Go to your app on Firebase site. Click on **Add Firebase to your Web App**
<script src="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.js"></script>
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.css" />

## JavaScript

Add the following to **js/elven-help.js**. Put it above the **document.ready** statement:

```javascript
function elfFireStart() {
    var config = {
        apiKey: "AIzaSyCUWzSTzNtuqg4D2wExHMPNKP04hq7CWJg",
        authDomain: "elf01-31681.firebaseapp.com",
        databaseURL: "https://elf01-31681.firebaseio.com",
        storageBucket: "elf01-31681.appspot.com",
        messagingSenderId: "409236055680"
    };
    firebase.initializeApp(config);
}

function elfFireConfig() {
    // FirebaseUI config.
    var uiConfig = {
        'signInSuccessUrl': 'http://localhost:5000/start.html',
        'signInOptions': [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': '<your-tos-url>',
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

}

function  elfFireInitPage() {
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

## Home Page

Rename your index.md to **start.md**. Create a new **index.md** like this:

```html

## Overview

Welcome to my Prog270 Website.

<div id="firebaseui-auth-container"></div>
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.css" />
<script src="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.5.2/firebase.js"></script>        
<script>
    elfFireStart();
    elfFireConfig();
</script>
```

At the bottom of start.md,

```html
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.css" />
<script src="https://www.gstatic.com/firebasejs/ui/live/1.0/firebase-ui-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.5.2/firebase.js"></script>        

<script>
  elfFireStart();
  elfFireInitPage();
</script>
```

And then create a new section near the top:

```html
## Login

<div class="container">
    <p id="sign-in-status"></p>
    <p id="sign-in"></p>
    <p id="account-details"></p>
</div>
```
