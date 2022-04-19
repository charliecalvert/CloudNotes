---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Firebase/FirestoreData.md
relativePath: Assignments/Firebase/FirestoreData.md
title: FirestoreData
queryPath: Assignments/Firebase/
subject: Firebase
fileNameMarkdown: FirestoreData.md
fileNameHTML: FirestoreData.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Learn to use Firebase Cloud Firestore.

Firebase has a new NoSQL database called [Firestore][cfs]. The older database, the [Realtime Database][rtdb], is still available, but Google is moving developers toward Cloud Firestore. The two databases are very similar, and I think the primary reasons for creating Firestore involved technical issues such as performance and scaling rather than architectural issues. Nevertheless, the [two databases are different][dbcomp], and use a similar, but distinct syntax.

**NOTE**: _Here is a [Firebase video introducing Firestore][fsv] that you might find useful._

## Permissions

I need to have permissions to run your projects with **firebase serve**.  Here is the page that explains the simple steps to add me as an **Editor:**

- [https://support.google.com/firebase/answer/7000272?hl=en](https://support.google.com/firebase/answer/7000272?hl=en)

Please add the same address you use to contact me on hangouts and make me an **Editor** on your projects.

It shows how to get the Firebase token, pass it to the server, verify the token, and return a value to the client.

## Get Started

If you have not done so already, you should begin by going to your project and ensuring that Firestore is installed:

    firebase init firestore

Here are my rules for firestore:

    allow read, write: if request.auth.uid == request.resource.data.author_uid    

## Verify

A key step in securing your app is to verify the user token passed to you from client. The **verify-db.js** module does this. Note that the **init** method also returns an instance of the **firestore** database (db). Save this file as **verify-db.js**

Rather than quote **verify-db.js** here. I will maintain it in JsObjects. You can find it [here][vdb].

This module returns two functions.

- **init**: _Initialize your application and return an instance of the Firestore database._
- **verifyToken**: _Confirm that a particular token sent from the client represents a valid user. This is a promise that returns a decodedToken with information about the user._

This module is very similar to the **verify.js** module we saw earlier, only the **init** method can be used to retrieve an instance of the **Firestore** database.

It is possible, and sometimes useful, to use this code in **initializeApp**. This way you don't need to wrestle with the Service File:

```javascript
admin.initializeApp({
    apiKey: 'YOUR API KEY HERE',
    authDomain: 'YOUR AUTH DOMAIN',
    projectId: 'YOUR PROJECT ID'
})
```

## Database

Here is simple code for reading and writing some of the data we get back when decode a Firebase user token sent from the client. Recall that **verifyToken** supplies us with this **decodedToken**.

```javascript
const writeData = (user, db) => {
    return new Promise(function (resolve, reject) {
        db.collection("user").doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
        })
            .then(function (dbData) {
                resolve({'result': 'success'});
            })
            .catch(function (error) {
                reject({"error: ": error, text: 'error writing document'});
            });
    });
};

const readData = (docName) => {
    return new Promise(function (resolve, reject) {
        var docRef = db.collection("user").doc(docName);

        docRef.get()
            .then(function (doc) {
                if (doc.exists) {
                    resolve({"documentData": doc.data()});
                } else {
                    resolve({documentData: "No such document!"});
                }
            })
            .catch(function (error) {
                reject({error: error});
            });
    });
};
```

Here is some test data that you can use when working with this function:

```javascript
const userData = {
    uid: 'TempRecord',
    displayName: 'Temp DisplayName',
    email: 'qux@bar.com',
    photoURL: 'https://qux.net/photo.png'
};
```

## Example Programs

See the [ElfExpressFirestore][eef] demo in JsObjects for more information on basic database operations.

To add **verify** to your calls, see the [ElfExpressFirestoreVerify][eefv] demo in JsObjects.

I have put both examples in the **JsObjects/JavaScript/Firebase** directory. Don't forget to call **git pull** to get the latest.

## Turn it in

If you are in Prog272:

- Update **AddressMaven** and **FirebaseAddressMaven** to write user data to the database.
- We are also going to need to write and read **AddressList** to the database.

If you are in Isit322:

- Update **GitExplorer** and **week09-FirebaseStarter** to read and write user data to the database.
- Write a list of your user's Gists and Repos to the database. Include at least the URL for the Gist or Repo.

I'm thinking that you will add two buttons to your app, one for calling the gists micro to ask it to write the entire the gist as you get it from GitHub to the Firestore database. Then create a second button and have it right the repos, the complete record that you get from GitHub, and send it to the Firestore database.

In the final, I will, in part as extra credit, ask you to add two new pages, call the GetReposDb and GetGistDb and display the data from the database, rather than from GitHub itself.


[cfs]: https://firebase.google.com/docs/firestore
[vsv]: https://twitter.com/charliecalvert/status/1136640253639323653?s=20
[rtdb]: https://firebase.google.com/docs/database
[dbcomp]: https://firebase.google.com/docs/database/rtdb-vs-firestore
[vdb]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Firebase/ElfExpressFirestore/routes/verify-db.js
[eef]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Firebase/ElfExpressFirestore
[eefv]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Firebase/ElfExpressFirestoreVerify
