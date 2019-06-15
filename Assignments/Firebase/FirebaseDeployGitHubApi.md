## Overview

The goal is to move our GitExplorer application into the cloud using Firebase.

There are two catches:

- We make requests outside the Google network, this means we need not the free spark plan, but the pay-per-use blaze plan. I don't have much experience yet, but I'm expecting the cost to you to be $.12. I have applied for a grant to help cover those sky-rocketing expenses, but I probably won't hear back from them for a few days.
- We will need to use Cors because I don't use how to use Google functions without it. You would think there would be a way, but I don't see it yet. But I am still very new to all this. I'm open to suggestions...

## Get Started

I'm assuming that in a previous assignment or exercise, you have already run:

    firebase login
    mkdir Week09-FirebaseStarter
    cd Week09-FirebaseStarter
    firebase init

See the Firebase Starter assignment for details.

Add your **public** directory to the **.gitignore** file in the root of your **FirebaseStarter** project.

Somehow get signed up for the Blaze plan. I'm sure you will need a credit card. I've been using it for several years, I believe, and have not yet been charged anything.

## Deployment

I have been using Firebase for several years, but I have been using it from apps hosted either locally, or from EC2. This time we don't want to use EC2, instead, we want Google to host our application. This should be much cheaper. In fact, it should be free for us but we are, as mentioned above, querying outside their network. Specifically, we are making requests to GitHub.

I will cover this later, but deployment involves running this command from the bash shell:

    firebase deploy

## Build

- Go to the client part of GitExplorer.
- Issue this command: **npm run build**. This creates a directory called **build**
- Delete the _contents_ of the FirebaseStarter **public** directory
- Copy the contents of the **client/build** directory into the **Week09-FirebaseStarter/public** directory.

Create a script called **build-copy** that looks quite a bit like this one:

```bash
#! /usr/bin/env bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

SERVER_DIR="../../Week06-FirebaseStarter/public"

function message {
    echo
    echo =============================
    echo "$1"
    echo =============================
    echo
}

function copyNew() {
	npm run build
	cp -r build/* ${SERVER_DIR}/.
}

function deleteOld() {
	rm -v ${SERVER_DIR}/index.html
	rm -v ${SERVER_DIR}/asset-manifest.json
	rm -v ${SERVER_DIR}/manifest.json
	rm -v ${SERVER_DIR}/precache-manifest*.js
	rm -v ${SERVER_DIR}/service-worker.js
	rm -v -r ${SERVER_DIR}'/static'
}

function runAll() {
	deleteOld
	copyNew
}

message 'Build Copy Client to Server'

echo 'Create an optimized build of our react client.'
echo 'Copy these build files to the server.'

while true; do
    message "Menu"    
    echo -e "$LIGHT_GREEN  a) Delete Old Files and Run Build"
    echo -e "$LIGHT_GREEN  b) Only Build"
    echo -e "$LIGHT_GREEN  c) Only Delete"
    echo -e "$LIGHT_RED  x) Exit"
    echo -e "\n$NC"
    read -p "Please make a selection: " eotuyx
    case $eotuyx in
        [Aa]* ) runAll false; continue;;
        [Bb]* ) copyNew; continue;;
        [Cc]* ) deleteOld; continue;;
        [XxQq]* ) break;;
        * )  -e "\n$NC" + "Please answer with c, r or x.";;
    esac
done
```

Notice that you will, at minimum, need to change the **SERVER_DIR**.

Put this file in your **GitExplorer/client** directory, at least for now. It must be there!

Now **firebase serve** and see what we've got which should be the interface to our GitExplorer. Now all we have to do is create the backend.

## Firebase Functions

If you have a directory in your **FireBaseStarter** called **functions** then you probably don't need to do this first step. If you don't have the directory, and you probably have, run this command:

    firebase init functions

While we are at it, navigate into the **functions** directory and install CORS:

    npm i cors

Open **functions/index.js**. This is set up to support Express and to act just like much like the files we find in our **server/routes/** directory.

Delete whatever is in there and add this:

```javascript
const functions = require('firebase-functions');

const cors = require('cors')({
    origin: true,
});

exports.helloWorld = functions.https.onRequest((request, response) => {

    return cors(request, response, () => {
        response.send({response: "Hello from Firebase!"});
    });
});
```

Then move over the functions **micros/git-user/routes/index.js**. It's just like being in an express app, only we don't write this:

```javascript
router.get('/you-rang', (request, response) => {...});
```

Instead we write:

```javascript
exports.youRang = functions.https.onRequest((request, response) => {});
```

**OctoKit** and **request** just work. I didn't need to make any substantial changes to the code from my micros.

To deploy only your functions:

    firebase deploy --only functions

To see output from deployed functions:

    firebase functions:log

In general:

    firebase help

## Client Buttons

Something like this, but with the deployed URL they give you:

```xml
<Button
    variant="contained"
    color="primary"
    data-url="https://us-central1-isit322-lastname.cloudfunctions.net/getUser"
    onClick={queryServer}
>
    Get User
</Button>
```

## Turn it in

Get the following  working:

- User You Rang
- Get User
- Get Repos

Provide a link to your running program.
