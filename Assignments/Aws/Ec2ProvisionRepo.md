## Overview

Learn More about the [AWS JavaScript SDK][jsdk]

Learn about the [AWS Developer Tools][adt]

## Clone

In your ~/Git directory clone the AWS Provision repo

    git clone git@github.com:charliecalvert/aws-provision.git


## Copy Repo and Remove .git Folder

Copy the repo to your repo:

    cp -rv ~/Git/aws-provision/ ~/Git/isit320-calvert-2018/.

Navigate to your repo:

    cd ~/Git/isit320-calvert-2018/aws-provision

Remove the .git file from aws-provision so you do not have nested repositories:

    rm -rf .git

## Create Web Application

This is very similar to the [Rest Basics][rb] assignment. In your repository, inside your new **aws-provision** folder:

- Run **CreateExpressProject** to create a server running on port (SERVER_PORT) 30026
- Use **create-react-app** to create a client runnning on 30025 with a proxy to 30026 in **package.json**.

## Move Files to server

Create a new directory called **server/routes/aws**.

Move the JavaScript files from ~aws-provision into your new **aws** directory.

When you are done, here is the contents of **aws**:

```bash
ls -1 server/routes/aws/
AssociateElasticIp.js
AwsPromise.js
GetAwsInstanceParams.js
Menu.js
```

## Start Server and Client

Start both the client and the server.

For now, skip the **routes/api.js** endpoints and put your test endpoint in **routes/index.js** below the place where the home page endpoint is defined, but before **module.exports**:

```javascript
/* Set up a route called foo. */
router.get('/foo', function(request, response) {
    var message = { 'result': 'success', 'status': 'bar', 'file': 'api.js' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});
```

[Rewrite the client][rwc] as described in React Basics, but adjust the path, the route, to the **/api/foo** endpoint to fit our modified code. **Hint**: I'm talking about the modified code in the **routes** folder.

Test your work and ensure that clicks on the button retrieve data from the server.

## Add Buttons

Here are the buttons we need to create with React:

![AWS Provision Repo Buttons][aprb]

Here are the methods called by each button, the text for the button and the route to the server endpoint. Please cut and paste so that you match them exactly. We will use these values in our tests and in grading:

| Method | Button Content (Text)     | Route to Endpoint |
| :------------- | :------------- |  :------------- |
| this.queryServer | Bar | /foo |
| this.createEducate | Create with AWS Educate Account | /create-educate |
| this.createWithAwsStandardAccount| Create with AWS Standard Account | /create-standard |
| this.associateElasticIp| Associate Elastic Ip | /associate-elastic-ip
| this.copyGetStarted| Copy the GetStarted Script | /script-pusher/copy-get-started |
| this.runGetStarted| Run the GetStarted Script | /script-pusher/run-get-started |
| this.removeKnownHost| Remove from KnownHost | /script-pusher/remove-known-host |

## Create Endpoints

In **routes/index.js** create endpoints for **createEducate**, **createAwsStandardAccount** and **associateElasticIp**.

In **routes/script-pusher.js** create endpoints for **copyGetStarted**, **runGetStarted**, and**removeKnownHost**.

At minimum, each endpoint ought to return a JavaScript object with a **result** property set to the string **success**:

```javascript
response.send({result: 'success'});
```

The point is that not all the methods have to actually do anything at this point. We are just fleshing out the structure of the App. However, at least some of these methods are not hard to define, and you might be able to get them to work.

## One App

Combine Client and Server into one app and start that app running on Pristine Lubuntu. When you turn in the assignment, provide a screenshot of the app.

- In the client folder run **npm run build**. This assumes the client was built with **create-react-app**.
- Copy the contents of the **build** directory created by in the previous step to **../server/public/.**

Now if you go to **http://localhost:30026** you should see your app running.

We don't want to check in the files we put in **server/public** nor the files in **client/build**. So put this .gitignore file in **server/public**:

```bash
asset-manifest.json
static
manifest.json
index.html
precache-manifest.*.js
service-worker.js
```

Also make sure **client/build** is blocked. You are responsible. I think I've covered all the bases, but check with **git status** before you commit.

## Turn it in

Push your work providing:

- git tag: message="ProvisionRepo v0.1.0". I don't care about the tag version number, that can be whatever works for you. What I want is a system that will allow you to turn the assignment in more than once with each submission tagged: v0.1.1, v0.1.2, etc.
- branch: What branch you are working in. But also merge your working code back in master.
- folder: What folder you are working in.
- GitHub: The URL of your github repository.

Also:

- [Turn it in][tin]

[tin]: https://www.elvenware.com/teach/tips/TurnItIn.html#basics
[adt]: https://aws.amazon.com/tools/
[jsdk]: https://aws.amazon.com/sdk-for-node-js/
[rb]: https://www.elvenware.com/teach/assignments/React/RestBasics.html#link-client-and-server
[rwc]: https://www.elvenware.com/teach/assignments/React/RestBasics.html#rewrite-the-client
[aprb]: https://s3.amazonaws.com/bucket01.elvenware.com/images/aws-provision-repo-buttons.png
