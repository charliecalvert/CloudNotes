## Overview

The goal of this assignment is to learn how to create an Express application that can access the Firebase database on the server.

## Create Express Project

Work in your main repository: **isit320-lastname-2017**.

Create an Express project in a folder called **Week09-FireBaseExpress** and install **firebase-admin**:

    CreateExpressProject Week09-FireBaseExpress
    cd Week09-FireBaseExpress
    npm install --save firebase-admin

## Create Firebase Project

On the Firebase website, create a Firebase project called **FirebaseExpress**

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/vd6tNtC-J7Q?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Load Firebase and Google Material

In **layout.pug**, set up your **metadata** after the **title**:

    meta(charset='utf-8')
    meta(name='viewport', content='width=device-width, initial-scale=1')

Get rid of **bootstrap** and replace with Google **material**:

    link(rel='stylesheet', href='https://code.getmdl.io/1.1.3/material.orange-indigo.min.css')
    link(rel='stylesheet', href='https://fonts.googleapis.com/icon?family=Material+Icons')
    script(defer='', src='https://code.getmdl.io/1.1.3/material.min.js')

Bring in the pieces of firebase that we need:

    script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-app.js')
    script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-auth.js')
    script(defer='', src='https://www.gstatic.com/firebasejs/4.6.2/firebase-database.js')

Workikng in the **public/javascripts** folder, download a couple custom bits of code:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-login.js
    wget https://s3.amazonaws.com/bucket01.elvenware.com/javascript/elven-fire-data.js

And load them in **layout.pub**:

    script(src="javascripts/elven-fire-login.js")
    script(src="javascripts/elven-fire-data.js")

## stylesheets

Working in your **public/stylesheets** folder execute these commands:

    rm style.css
    wget https://s3.amazonaws.com/bucket01.elvenware.com/stylesheets/firebase-express/style.css

## Mixins

Working in your **views** folder, use the commands below to get two Pug Mixins.

    wget https://s3.amazonaws.com/bucket01.elvenware.com/mixins/elf-fire-view-mixins.pug
    wget https://s3.amazonaws.com/bucket01.elvenware.com/mixins/material-mixins.pug

In **index.pug**, use the Mixins like this:

<pre>
extends layout
include material-mixins
include elf-fire-view-mixins

block content

    +top(title)
        +signInBanner("Redirect Sign In")
            +mainContent
            div
                +baseButtons
                +serverButtons
                +userInput
                +userData
</pre>    


## Login

In **elven-fire-login**, in the **elfConfigure** method, put in your configuration object that pasted into **control.js** when you created the app:

```javascript
function elfConfigure() {
    var config = {
        apiKey: "YOUR DATA HERE",
        authDomain: "YOUR DATA HERE",
        databaseURL: "YOUR DATA HERE",
        projectId: "YOUR DATA HERE",
        storageBucket: "",
        messagingSenderId: "YOUR DATA HERE"
    };
    firebase.initializeApp(config);
    document.getElementById('elf-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('elf-sign-in').disabled = false;
}
```

In the **authentication** section enable Google and optionally fill in the project name:

![Enable Google](https://s3.amazonaws.com/bucket01.elvenware.com/images/firebase-google.png)

Run the app and log in.    

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/QwPeLHajmbE?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Turn it in

Push your repository. Give me:

- Repo URL
- Branch
- Directory

Also provide a link to your application running on Firebase.

## Links

- [Firebase Admin][fa]
- [Firebase Admin Docs][fad]
- [Service Account][sa]
- [Firebase NPM][fb]

## Stuff and Nonsense

    $ npm install -g firebase-tools

[fa]: https://github.com/firebase/firebase-admin-node
[fad]: https://firebase.google.com/docs/admin/setup
[sa]: https://console.developers.google.com/iam-admin/serviceaccounts/
[fb]: https://www.npmjs.com/package/firebase
