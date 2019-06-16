## Overview

The main goal is to create properly working versions of:

- **GitExplorer**
- **FirebaseGitExplorer**
  - Your Firebase code should be deployed to Firebase Hosting

**NOTE**: _If your final programs are still called something like **week03-rest-basics** or **week09-FirebaseStarter**, be sure to copy or rename them to the names shown above._

I'll also be looking at:

- ESLint
- Prettier
- Tests and coverage

**NOTE**: _The **firebase-tools** were recently updated to v7.0.0. Be sure to run **ncu -g** and follow directions to install them and any other needed updates._

## Permissions

I need to have permissions to run your projects with **firebase serve**.  Here is the page that explains the simple steps to add me as an **Editor:**

- [https://support.google.com/firebase/answer/7000272?hl=en](https://support.google.com/firebase/answer/7000272?hl=en)

Please add the same address you use to contact me on hangouts and make me an **Editor** on your project.

## Deploying Credentials

When you deploy your app to Firebase  hosting and when you give it to me for grading, we need to make a change to **verify-db.js**.

The key step is to put your Service Account credentials file, the one we load with GOOGLE_APPLICATION_CREDENTIALS, in the functions directory. I believe this file always begins like this:

```json
{
  "type": "service_account",
  "...": "etc"
}
```

Modify the start of **verify-db.js** to look like this:

```javascript
var admin = require('firebase-admin');
const credentialLoad=require('./credentials');

let loggedIn = false;

function init() {
    loggedIn = true;
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.cert(credentialLoad)            
        });
    }
    return admin.firestore();
}
```

Here I'm assuming your Service credentials file is called **credentials.json**, but I don't suppose it matters what you call it, so long as your code works.

Recall that **initializeApp** used to look like this:

```javascript
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
```

This code assumed that **GOOGLE_APPLICATION_CREDENTIALS** pointed to your credentials file. But that is problematic for me when grading, as I don't want to set up that variable for each of your assignments, and I'm not sure how to make it work when we deploy to Firebase hosting. This should work fine so long as your code is in a private repository. If you want to make your repo public at some point, do two things:

- remove the credentials file from the repository
- regenerate the credentials file, as there is no good way to delete old copies from your repository.

## Port 30025

It's easier for me for various reasons if your Firebase app starts on Port 30025 when we use **firebase serve**. The command to do that is:

    firebase serve --port 30025

Create a file called **go** in the root of your Firebase project. Put the following content in it:

    #! /usr/bin/env bash

    firebase serve --port=30025

Make sure that **go** is executable:

    chmod +x go

Be sure to push your work.

## Database

Implement the following:

- Calling user **/you-rang** writes the current user to the database:
  - collection name: user
  - document name: uid
  - fields:
    - email, name, picture

I want you to write the Firebase user to the database. The idea is to keep track of the users who have logged into your application. Probably most of you will have only two users log into your system: yourself and me. But in a popular app, thousands of users might be logging in, and we need to keep track of them so we can remember their preferences and privileges. By at least recording the user's name, email and id, we take a step in that direction.

You get information about the user by taking the Firebase token sent from the server, running it through **verifyToken**, and taking the **decodedToken** returned from **verifyToken** and writing some of its fields to the database. We should be able to see at least two users in the database, yourself and me. If you have multiple Google accounts, or share your app with a friend or relative, we could see more.

- Add a button to your get-gists page labelled **Write Gists**. Selecting it writes your gists to the database:
  - **collection name**: gists
  - **document name**: gist.id
  - **content**: write the whole record that you get back from GitHub
  - **User Data**: add the logged in **user_id** and logged in user **name**
    - Get these from the server side **decodedToken** and call them **logged_in_user_id**, and **logged_in_user_name**.

![Gist Data](https://s3.amazonaws.com/bucket01.elvenware.com/images/isit322-final-2019-gist-data.png)

**IMAGE**: _Note that we can see the **logged_in_user_id** and **logged_in_user_name** fields that we added to the data we pushed to the database. The rest of the fields are part of the record sent to us from GitHub. There are many more fields than I have room to show in this image._

The point here is that we are writing a mixture of data to the database. Most of the data comes from GitHub, but we added two fields that reference not the GitHub data, but the logged in user.

Remember that it is easy to add data to an existing object:

```javascript
const foo = { foo: 'foo' };
foo.logged_in_user_id = '...'
```

Because you have made me an **Editor** on your project, I can see whether or not data got written to the database. In other words, I can see the Firebase console for your project. (Not all your projects, just the one that you shared with me.)

## Batched Writes

I ended up using something called **batched writes** to push multiple gists to the database in one operation. I don't insist that you do it this way, and docs don't claim it is faster than doing them individually. However, the code seemed more intuitive to me than looping through a series of write operations.

The details are [here][bw]. My code is similar to the example they provide, but of course I had no need to do updates or deletes.

When calling **batch.set** I used **forEach** to iterate through the array of data sent by GitHub. I wasn't sure that **for..of** would be available on the Firebase servers because they have an older version of Node.

Base your code for reading and writing to the database on the code in the **ElfExpressFirestore** example. Note that I have added code for reading and writing batch data and snapshots. See **batch.js** in the example.

Create a new page in your app. Allow the user to click a button to retrieve a few fields from each Gist that you added to your **gists** collection. Add two buttons to allow the user to iterate through the data.

You can show as many fields as you want, but be sure to include:

- logged_in_user_id
- logged_in_user_name
- url (make it clickable. Or do we want **html_url**?)
- description
- filename for the first of the files (You will probably have only one file in your gist)

## Extra Credit

Do the same thing for the repos page that you do for the gists. That is, take the JSON that you get from GitHub and write it to the database in a collection called repository. Create a page in your app to show a few of the fields from your repository collection, picking at least one that is not on your **GetRepos** page.

## Change Path in build-copy {#change-path}

In the Build step of [**FirebaseDeployGitHubApi**][fbdgh] I asked you to write a path to copy your build from **GitExplorer** to **FirebaseGitExplorer**. Foolishly, I included information specific to your repo in it. Can you please change the **SERVER_DIR** line (about line 10) to look something like this:

    SERVER_DIR="../../FirebaseGitExplorer/public"

The point is that it should not have information specific to your machine in it since my system is not set up exactly like yours. Instead, use relative paths like above. Thank you and sorry for asking you to do this fussy thing so late in the process.

## Example Programs

See the [ElfExpressFirestore][eef] demo in JsObjects for more information on basic database operations.

To add **verify** to your calls, see the [ElfExpressFirestoreVerify][eefv] demo in JsObjects.

I have put both examples in the **JsObjects/JavaScript/Firebase** directory. Don't forget to call **git pull** to get the latest.

## Turn it in

Be sure to include the Firebase Hosting address to which you have deployed your Firebase app.

State the names of directories where you deployed your code. I'm expecting to see:

- AddressMaven
- FirebaseAddressMaven
- The branch if relevant. Even if you use branches, your final code should also be merged into **master**

Before your final push run **./prettier** and **eslint .** and make sure they come back clean.

After your final push tag your work and give me the tag.

[bw]: https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes

## Test Check

Here is a small script that can help you check that at your major tests are running correctly without error:

```bash
#! /usr/bin/env bash

cd project-sanity-tests
pwd
npm test
cd ../client
pwd
npm test
cd ../micros/git-gist
pwd
npm test
```

The **pwd** commands are just there for debugging. If things don't look right, comment out the calls to **npm test** and confirm that the script runs smoothly without them.

If you have, and like me you should, the **--watch** flag passed to your **jest test** command in your various **package.json** files, then you will have to press the letter **q** to quit after each set of tests is run. This has good and bad features. If we wnated to completely automate these test runs then we would run to remove the flag or modify or script. But for now, I find it nice to have each test pause so I can look it over before moving on to the next one.

## Duplicate App Error

You may get this error when you try to verify the Firebase user token:

    app/duplicate-app: The default Firebase app already exists. This means you called initializeApp() more than once without providing an app name as the second argument. In most cases you only need to call initializeApp() once. But if you do want to initialize multiple apps, pass a second argument to initializeApp() to give each app a unique name."

Put this fix in **verify-db** on the server side:

```javascript
function init() {
    loggedIn = true;
    if (admin.apps.length === 0) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
    }
    return admin.firestore();
}
```

The idea here is that **admin.apps.length** checks to see if **initializeApp** has already been called.

[fbdgh]: https://www.elvenware.com/teach/assignments/firebase/FirebaseDeployGitHubApi.html#build
[eef]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Firebase/ElfExpressFirestore
[eefv]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Firebase/ElfExpressFirestoreVerify
