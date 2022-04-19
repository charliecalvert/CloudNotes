---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Firebase/FirebaseDeployExpress.md
relativePath: Assignments/Firebase/FirebaseDeployExpress.md
title: FirebaseDeployExpress
queryPath: Assignments/Firebase/
subject: Firebase
fileNameMarkdown: FirebaseDeployExpress.md
fileNameHTML: FirebaseDeployExpress.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The goal of this assignment will be to integrate express into our Firebase app so that we can more easily port our GitHub calls into a Firebase application.

## Get Started

We can directly import the rich Node JS express architecture directly into a Firebase hosting application.

Start by installing express:

    npm i express

Next you will need to open **functions/index.js** and require Express and create an express object:

```javascript
const functions = require('firebase-functions');
const express = require('express');
const app = express();
```

## Add EndPoints

The next step would be to add in a couple simple endpoints and export the **app** object:

```javascript
const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    console.log("HOME CALLED");
    res.send({data: "Default home page route called"});
});


app.get('/bar', function (req, res) {
    console.log("bar CALLED");
    res.send({data: "bar route called"});
});

exports.app = functions.https.onRequest(app);
```

## Rewrites

Finally, we need to open up the **firebase.json** found in the root of our project and add a **rewrites** sub-property to the hosting property:

```javascript
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [{
      "source": "**",
      "function": "app"
    }]
  }
}
```

The relevant section here is the last one. I include the other parts simply to provide context. The code in the **rewrites** section states that any route that reaches our server should be routed to the **app** function that we exported in the last line of our **functions/index.js** file. In other words, if the user uses HTTP to send a URL to the server, then ask our Express code defined in **functions/index.js** to resolve it. Note that we use two asterisks (\*\*) to specify that we want to send all routes to the endpoints we defined in our Express **app** object.

**NOTE**: _You have probably already noticed that we are not using CORS. With the code we are creating now, it is not, thankfully, necessary. The simplest way to understand CORS is to think of it as a giant security risk with useful side effects. The only time it is worth the risk is when we are creating an API for consumption by third parties. Whenever we can avoid it, we should avoid it._

## Run it

To test your code execute the standard code to serve or deploy your Firebase app:

    firebase serve

Go to the URL provided when you serve your app and try both the home (default) and **/bar** endpoints.

## The User

There are at least three parts to our app:

- Qux
- git-user
- git-gist

I'll get you started creating the code for **git-user** and then leave it up to your finish the process.

In this first example, let's put the code for user **/you-rang** in **functions/index.js**. We will, however, put it in its own Express **router** so that we can, on the client, write **/user/you-rang** rather than the potentially confusing **/user-you-rang**.

First create a **router** at the top of **/function/index.js**:

```
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const userRouter = express.Router();
```

Please this code after the **/bar** route but before the **export** statement:

```javascript
userRouter.get('/you-rang', (request, response) => {
    response.send({ result: 'You rang?', server: 'git-user' });
});

app.use('/users', userRouter);
```

This code teaches our application to send code that begins with **/users** to the **userRouter** endpoints such as **you-rang**.

## The Client

Back in Firebase version **GitExplorer**, modify code in **GetUser** so that button calls our slightly modified route:

```javascript
<Button
    variant="contained"
    color="primary"
    data-url="/users/you-rang"
    onClick={queryServer}
>
    Ring Git User
</Button>
```

You will, of course, have to run **build-copy** in the root of the **GitExplorer/client** project.

Run **firebase serve** or **firebase deploy** and test your code.

**NOTE**: _Looking at the new URL for **you-rang** it seems to me that we can convert our original non-Firebase version of GitExplorer to use these same URLs. Then we will need only one version of the front end. This seems like an exercise we should complete before or during the final._

## User File

Though we may eventually move at least one of our micros into its own firebase app, for now, we can just separate files for each micro and integrate them into our current Firebase application. In particular, let's move the **userRouter** into its own file.

**NOTE**: _I'm tempted to leave the instructions and let you handle this part of the project. However, I don't want anyone to get stuck on this step, so I will provide a few deliberately vague hints._

Study **GitExplorer/server/routes/test-server.js** and use it as the template for this step.

- Create a file called **functions/git-user.js**
- Move the user **you-rang** route into it.
- Import **git-user.js** into **functions/index.js**

For instance, I'm expecting this code in **functions/index.js**:

```javascript
const userRouter = require('./git-user');
// Probably some code omitted here
app.use('/users', userRouter);
```

If you complete these steps correctly, you should be able to serve or deploy your code and find that it runs smoothly.

## Turn it in

Move the rest of GitExplorer over to work on Firebase.

Tag and push your work, providing folder, tag and branch. I'm expecting the folder to be either:

- week09-FirebaseStarter
- FirebaseGitExplorer

Also provide the URL for your running service on Firebase hosting.

## Notes

If you want to use node 8 or 10 you should first remove the existing node:

    sudo apt-get purge --auto-remove nodejs

Then go to **~/Git/JsObjects/Utilities/NodeInstall** and edit **NodeInstall.sh** to install version 10 or 8 rather than twelve. I could explain, but it is so obvious what needs to be done that it is just not worth it. It's just a question of which line is commented out. Then run the script **./InstallNode.sh**.
