## Overview

Create a program that will allow us to check various system services by running scripts. For instance, it should run **CpuInfo** on the local machine.

This program should be setup as a systemd service running on port 30033.

## Get Started

Create a directory where we can do our work and set up [concurrently][ccly]:

		mkdir week06-system-check
		cd week06-system-check/
		get-gist

Run the **Create Concurrently** option and then exit **get-gist**.

Run **./elf-concur** to create the **server** and **client**. When prompted, choose **s** for **SERVER_PORT** 30026.

		=======================
		Menu
		=======================

		n) Create Normal Project on Port 30025
		s) Create Server Project on Port 30026 with SERVER_PORT

After **elf-concur** completes, immediately, before doing anything else, go on to the _Commit and Tag Part I_ step.

## Commit and Tag Part I {#ct01}

Immediately after **elf-concur** completes, commit and tag your work.

Use exactly this commit message: "Finished elf-concur for SystemCheck."

Then tag your work, following this template as closely as possible:

		git tag -a vXXX -m "Finished elf-concur for SystemCheck on branch <BRANCH_NAME>."

I don't care what the version number for your tag is, but specify the name of the branch where you are working in the appropriate place.

**NOTE**: _It's probably clear that I want to be able to confirm that you are starting your project from scratch. This is an important part of this process, so be sure to commit and tag your work as described above._

## Set up systemd

Before doing anything else, let's set up **systemd** in the **server** directory.

Go into **JsObjects** and run **git pull**. In the **server** directory run **get-gist** and select "Elven Node systemd Tools" or similar from the menu.

Edit the **setup-environment-service** file:

		export SYSTEMD_PROJECT_NAME="systemcheck"
		export SYSTEMD_DESCRIPTION="System Check Service"
		export SYSTEMD_PORT="SERVER_PORT=30033"

Run the code:

		source setup-environment-service
		./run-setup-service

Check to make sure your service is running by browsing to **localhost:30033**. If it is, press q at the command line to end the systemd check.

After completing this step, immediately, before doing anything else, go on to the _Commit and Tag Part II_ step. Complete that step before doing anything else.

## Commit and Tag Part II {#ct02}

Immediately after setting up systemd commit and tag your work.

Use exactly this commit message: "Finished systemd for SystemCheck."

Then tag your work, following this template as closely as possible:

		git tag -a vXXX -m "Finished systemd for SystemCheck on branch <BRANCH_NAME>."

I don't care what the version number for your tag is, but specify the name of the branch where you are working in the appropriate place.

**NOTE**: _This is an important part of this process, so be sure to commit and tag your work as described above._

## Install EsLint

Close WebStorm temporarily. Run the following from any place on your system because it will install things globall into **~/npm/bin**.

		npm install -g eslint babel-eslint eslint-plugin-react prettier

Now run **get-gist** in both the client and server directories. Select the first item, that sets up **eslint** and **prettier**.

Run prettier in both client and server:

		chmod +x prettier # Needs to be done only once
		./prettier

This will properly format your documents. You should do this now and just before turning in an assignment.

Restart WebStorm. It may complain that it can't find the eslint package. If necessary, click the settings link WebStorm provides and point Webstorm to the version of eslint that you installed into **~/npm/bin**.

Eslint will help catch errors, including formatting errors, in your JavaScript code.

## Setup Script Running

Last week we created an assignment called EC2 Copy File. Get the **script-pusher.js** file from the **CopyFile** assignment and put it in the **server/routes** folder.

Now link it into your server application. You've done this before, so use the Copy File code as a guide. As a review, here are the steps involved in making **script-pusher** a part of your server side code. Open up **server/app.js** and **require** your **routes/script-pusher.js** file:

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

## Call CpuInfo

Inside **script-pusher**, call **CpuInfo** on the local machine. This is simpler than in **CopyFile**, because you don't have to pass any parameters to the script. You just need to know the path to the script, and then name of the script:


```javascript
const pushScript = spawn(<PATH GOES HERE> + '/' + <SCRIPT GOES HERE>);
```

The path we can get from the environment, just as we did in **CopyFile**. The name of the script should be obvious.

## Call the Server from the Client

Get the Copy File button and **copyFile** method from the Copy File program and paste them into **client/App.js**. Change the names of the methods as necessary, using your common sense. The button, for instance, should say **Run CpuInfo**

## Setting up the Service

We need to tell the service the value **SETUP_LINUXBOX** environment variable. In **server/systemcheck.service** add this line or something like it just after the place we set the **SERVER_PORT**:

		Environment=SETUP_LINUXBOX=/home/bcuser/Git/JsObjects/Utilities/SetupLinuxBox

If the server is running as a service, navigate to the **server** directory stop it with our script:

		./stop-service

Navigate to the root of the **client** directory. Deploy the client to run on top of the server:

		npm run build
		cp -r build/* ../server/public/.

Go back to the server directory and restart the server:

		./start-service

Now the whole program, both server and client, should be running on port 30033.

## Move to EC2 or Elsewhere

At this stage, our **systemcheck.service** file is geared to run on our local machine. For most students, that means the user information in **systemcheck.service** is set to bcuser:

		User=bcuser
		Group=bcuser

There are in fact multiple places in **systemcheck.service** where the word **bcuser** occurs. If we have moved to EC2, we want to change all these instances to **ubuntu** because the default user on EC2 is **ubuntu**. This seems like a search and replace task, but **mode-service** will fix it up for us automatically. That means that when you move to a new platform, such as EC2, you can just run **run-setup-service** and the service will automatically be deployed with the right user.

Whether you want to check in the change or not is up to you. When you move back to Pristine Lubuntu, you are going to want to have the user set to **bcuser**. If you did check in the service file with ubuntu as the user, then on Pristine Lubuntu, you can just stop the service and redeploy with **run-setup-service**.

**NOTE**: _Check the security-group for your EC2 instance. I believe we set the range Port Range to 30025-30030. We should change that to 30025-30035._

## Turn it in		

Tell me

- branch
- folder
- tags.

Give me a link to your service running on EC2.

[ccly]: https://www.npmjs.com/package/concurrently
