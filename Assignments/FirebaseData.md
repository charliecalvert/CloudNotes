## Overview

The goal of this lesson is to begin to use the Firebase database.

![Picture showing Firebase database at work](https://s3.amazonaws.com/bucket01.elvenware.com/images/firebase-data-lotus.png)

## Goals

Our basic rhythm when working on this app is as follows. At first we need to get set up:

- Edit files in **AllTest**
  - Confirm that **index-firebase.md** and **start.md** are correct.
- Make sure you have set up the four buttons shown in the image above correctly in **start.md**
  - **Push President** and **Get Presidents** buttons
  - **Post Input** and **Get All Qux Data** buttons
- Make sure the **MakeHtml** config file will copy from AllTest to your **public** firebase directory.
- Run a script with a name like **run-firebase** that:
  - Runs **MakeHtml**
  - And copies or moves **index-firebase.html** to **index.html**
- Confirm it works by loading site in browser

Once you have your computer set up correctly, then you should only need three steps:

1. Edit files in **AllTest**
2. Run script that:
  - Runs **MakeHtml**
  - Copies **index-firebase.html** to **index.html**
3. Confirm it works by refreshing page in browser

## Get Started

Go to the Firebase console:

- <https://console.firebase.google.com/>

Create a new Firebase application called **Prog270-Data-LastName**

Turn on Google Authentication, per the instructions from the previous assignment.


## JavaScript

Put the following code in **elven-help.js**. Delete everything that we put in **elven-help.js** for the previous assignment. That is all the code from document.ready on up. Leave document.ready, but delete all the code above it. This is the code that we put in for the previous assignment. After it is deleted, replace it with the code found here:

- [Elven-Help on JsObjects Raw][elven-help-raw]
- [Elven-Help on JsObjects Syntax Highlight][elven-help-syntax]


[elven-help-raw]: https://raw.githubusercontent.com/charliecalvert/JsObjects/master/Utilities/Templates/Firebase/elven-help.js
[elven-help-syntax]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/Templates/Firebase/elven-help.js

## Interface

What we want to see is that the user comes to the home page, which consists mostly of a description of the site and button to log in. The user presses the login (Google) button, then is taken to the start page which is the one with the database links on it.

On the database (start) page, we are going to create three sections:

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
