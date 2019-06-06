## Overview

Learn to use Firebase Cloud Firestore.

Somewhere over the last year or two Firebase created a new NoSQL database called [Firestore][cfs]. The older database, the Realtime Databse, is still available, but Google is moving developers toward Cloud Firestore. The two databases are very similar, and I think the primary reasons for creating Firestore involved technical issues such as performance and scaling rather than architectual issues. Nevertheless, the two databases are different, and use a similar, but distinct syntax.

**NOTE**: _Here is a [Firebase video introducing Firestore][fsv] that you might find useful._

## Get Started

If you have not done so already, you should begin by going to your project and ensuring that Firestore is installed:

    firebase init firestore

    

## Database



```javascript

var express = require('express');
var router = express.Router();
const firebase = require("firebase");
const admin = require('firebase-admin');
require("firebase/firestore");

let loggedIn = false;

//'firebase-adminsdk-2p1h1@prog270-calvert.iam.gserviceaccount.com';
function init() {
    // var serviceAccount = require(process.env.HOME + "/Source/prog270-calvert-firebase-adminsdk-2p1h1-0a73c9115c.json");
    loggedIn = true;
    console.log(
        'INITIALIZE FIREBASE ADMIN',
        admin.initializeApp({
            //credential: admin.credential.applicationDefault(),
            //databaseURL: 'https://isit322-calvert.firebaseio.com',
            apiKey: 'AIzaSyDJzLPQCzPCBzpzuDEoZndURhPsImJ9uws',
            authDomain: 'isit322-calvert.firebaseapp.com',
            projectId: 'isit322-calvert'
        })
    );
}

init();

const db = admin.firestore();

function verifyToken(token) {
    return new Promise(function (resolve, reject) {

        if (!loggedIn) {
            init();
        }

        admin
            .auth()
            .verifyIdToken(token)
            .then(function (decodedToken) {
                console.log('UID', JSON.stringify(decodedToken, null, 4));
                console.log('MAIN SERVER QUX YOU RANG CALLED');
                resolve(decodedToken);
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });
    });
}

//module.exports = verifyToken;

const writeData = (user, response) => {
    const message = {
        result: 'success',
        status: 'bar',
        file: 'test-routes.js',
        server: 'main-server'
    };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));

    db.collection("user").doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
    })
        .then(function (dbData) {
            response.send({'result': 'success', dbData: dbData, ...message});
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
};


/* Set up a route called foo. */
router.get('/foo', function (request, response) {
    console.log("FOO CALLED", request.query.token);
    verifyToken(request.query.token)
        .then((decodedToken) => {

            const user = admin.auth().getUser(decodedToken.user_id)
                .then(user => {
                    console.log("USERDATA", JSON.stringify(user, null, 4));
                    writeData(user, response);
                    //response.send({user: user});
                })
                .catch(ex => {
                    response.send(ex);
                })

            //writeData();

        })
        .catch(ex => {
            console.log(ex);
            response.send(ex);
        })
});

module.exports = router;

```


[cfs]: https://firebase.google.com/docs/firestore
[vsv]: https://twitter.com/charliecalvert/status/1136640253639323653?s=20
