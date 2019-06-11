## Overview

Learn to use Firebase Cloud Firestore.

Firebase has a new NoSQL database called [Firestore][cfs]. The older database, the [Realtime Database][rtdb], is still available, but Google is moving developers toward Cloud Firestore. The two databases are very similar, and I think the primary reasons for creating Firestore involved technical issues such as performance and scaling rather than architectural issues. Nevertheless, the [two databases are different][dbcomp], and use a similar, but distinct syntax.

**NOTE**: _Here is a [Firebase video introducing Firestore][fsv] that you might find useful._

## Get Started

If you have not done so already, you should begin by going to your project and ensuring that Firestore is installed:

    firebase init firestore

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

See the [ElfExpressFirestore][eef] in JsObjects for more information.

## Turn it in

If you are in Prog272:

- Update **AddressMaven** and **FirebaseAddressMaven** to write user data to the database.
- We are also going to need to write and read **AddressList** to the database.

If you are in Isit322:

- Update **GitExplorer** and **week09-FirebaseStarter** to read and write user data to the database.
- Write a list of your user's Gists and Repos to the database. Include at least the URL for the Gist or Repo.

[cfs]: https://firebase.google.com/docs/firestore
[vsv]: https://twitter.com/charliecalvert/status/1136640253639323653?s=20
[rtdb]: https://firebase.google.com/docs/database
[dbcomp]: https://firebase.google.com/docs/database/rtdb-vs-firestore
[vdb]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Firebase/ElfExpressFirestore/routes/verify-db.js
[eef]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Firebase/ElfExpressFirestore
