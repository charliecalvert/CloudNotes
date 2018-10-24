## Overview

Create a program that will allow us to check various system services by running scripts.

This program should be setup as a service running on port 30032

## Get Started

		mkdir week06-system-check
		cd week06-system-check/
		get-gist

Run the **Create Concurrently** option and then exit **get-gist**.

Run **./elf-concur** to create the server and client. When prompted, choose **s** for server.

After **elf-concur** completes, immediately, before doing anything else, go on to the _Commit and Tag Part I_ step. Complete that step before doing anything else.

## Commit and Tag Part I {#ct01}

Immediately after **elf-concur** completes, commit and tag your work.

Use exactly this commit message: "Finished elf-concur for SystemCheck."

Then tag your work, following this template as closely as possible:

		git tag -a vXXX -m "Finished elf-concur for SystemCheck on branch <BRANCH_NAME>."

I don't care what the version number for your tag is, but specify the name of the branch where you are working in the appropriate place.

**NOTE**: _It's probably clear that I want to be able to confirm that you are starting your project from scratch. This is an important part of this process, so be sure to commit and tag your work as described above._

## Set up systemd

Before doing anything else, let's set up systemd.

Run **get-gist** and select "Elven Node systemd Tools" or similar from the menu.

Edit the setup-environment file:

		export SYSTEMD_PROJECT_NAME=systemcheck
		export SYSTEMD_DESCRIPTION="System Check Service"
		export SYSTEMD_PORT="SERVER_PORT=30033

Run the code:

		source setup-environment-service
		./run-setup-service

Check to make sure your service is running by browsing to **localhost:30033**.

After completing this step, immediately, before doing anything else, go on to the _Commit and Tag Part II_ step. Complete that step before doing anything else.

## Commit and Tag Part II {#ct02}

Immediately after setting up systemd commit and tag your work.

Use exactly this commit message: "Finished systemd for SystemCheck."

Then tag your work, following this template as closely as possible:

		git tag -a vXXX -m "Finished systemd for SystemCheck on branch <BRANCH_NAME>."

I don't care what the version number for your tag is, but specify the name of the branch where you are working in the appropriate place.

**NOTE**: _This is an important part of this process, so be sure to commit and tag your work as described above._

## Install EsLint

Close WebStorm temporarily. Run the following

		npm install -g eslint babel-eslint eslint-plugin-react prettier

Now run **get-gist** and select the first item, that sets up **eslint** and **prettier**.

Run prettier in both client and server:

		chmod +x prettier # Needs to be done only once
		./prettier

This will properly format your documents. You should do this now and just before turning in an assignment.

Restart WebStorm. It may complain that it can't find the eslint package. If necessary, click the settings link WebStorm provides and point Webstorm to the version of eslint that you installed into **~/npm/bin**.

Eslint will help catch errors, including formatting errors, in your JavaScript code.

## Setup Script Running

Last week we created an assignment called EC2 Copy File. Get the
script-pusher.js file from that assignment and put it in the **server/routes** folder.

Now link it into your server application. You've done this before, so use the Copy File code as a guide.

As a review, here are the steps involved in making **script-pusher** a part of your server side code. Open up **server/app.js** and **require** your **routes/script-pusher.js** file:

```javascript
const scriptPusher = require("WHAT GOES HERE?");
```

A little further down, tell Express to use the file:

```javascript
app.use('/script-pusher', scriptPusher);
```

This code tells the node js package called **Express** that if it sees an HTTP request from the client that begins with the path **/script-pusher** then it should route the request to **server/script-pusher.js**.

Note that **app** is part of Express. Look further up in **app.js** and study this code and see if you can make sense of it:

```javascript
var express = require('express');
var app = express();
```

**NOTE**: _If the people who first taught and auto-generated this code had called the variable **express** rather than app, then I think a lot of confusion could have been avoided._

## Call the Server from the Client

Get the Copy File button and **copyFile** method from the Copy File program and paste them into **client/App.js**.
