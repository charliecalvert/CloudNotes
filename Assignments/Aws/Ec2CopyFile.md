---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws/Ec2CopyFile.md
relativePath: Assignments/Aws/Ec2CopyFile.md
title: Ec2CopyFile
queryPath: Assignments/Aws/
subject: Aws
fileNameMarkdown: Ec2CopyFile.md
fileNameHTML: Ec2CopyFile.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Learn how to copy a file to remote location from a React application.

**Updates**: _On the school machines, ignore the updates to VirtualBox, but get the update on your laptops and home machines. On the 18th, Lubuntu and Ubuntu Server will release version 18.10. For now, ignore these updates. We'll get to them, but not yet._

## JsObjects Update

Make sure you have pulled the latest from JsObjects:

```
slb
git pull
./CreateSymbolicLinks
```

## Working Directory

From the root of your repository:

    mkdir week05-ec2-copy-file
    cd week05-ec2-copy-file/
    CreateExpressProject server

From the menu, choose **s** for **server**.

Now create the client:

    create-react-app client

Open the week05-ec2-copy-file directory in WebStorm. Add the proxy statement to **client/package.json** just above the **dependencies** object:

```javascript
"proxy": "http://localhost:30026",
```

## Start applications

In one tab of the terminal, in the **server** directory:

    npm start

Create a secon tab. In the **client** directory:

    npm start

## Client Button

In **client/src/App.js** create a method called **copyScript.** Put our standard **fetch** statement in it with the following route:

- /script-pusher/copy-script

In the second **then** statement, include, for now, only a simple console log of the JSON sent from the server.

Create a button in **client/src/App.js**.

- Label: Copy Script
- Method: this.copyScript
- CopyScript fetch URL: /script-pusher/copy-script

The structure of your JSX should be clean, like this:

```html
<div className="App">
    <header>
        <h1>Copy File</h1>
    </header>
    <main>
        // Get the button syntax from your previous code.
    </main>
</div>
```

## Server Side

Create **server/routes/script-pusher.js**. Copy the contents of **routes/index.js** into it. Delete the home page route from **script-pusher.js**. In **server/app.js** link in **script-pusher.js**:

```javascript
const scriptPusher = require('./routes/script-pusher');
```

There is also **app.use** line needed. You have seen it before when we linked in **api.js**.

**HINTS**: _Look in app.js on about line 7 or 8:_

    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');

These are the lines that load the files in our routes directory. The code I show you above load **script-pusher.js** rather than **index.js** or **user.js**. Then we need to tell express to use this route. Here is how we tell it to use **routes/index.js**:

    app.use('/', indexRouter);

How would you tell it to use another file such as **script-pusher**?

## Test Server Method

Test that you can call the route:

```javascript
router.get('/copy-script', function(request, response) { 'use strict';
    response.send({ result: 'success' });
});
```

Confirm that it works by checking the output in the console after you push the button in the client. You should see the following in the console:

```javascript
{ result: 'success' }
```

## Copy file to EC2

Add the following code above our **/copy-file** endpoint in **script-pusher.js**:

```JavaScript
const spawn = require('child_process').spawn;

let allData = "";

const copyFile = () => {

    return new Promise(function (resolve, reject) {

        console.log("Copy to EC2", process.env.SETUP_LINUXBOX);

        const pushScript = spawn('scp', [process.env.SETUP_LINUXBOX + '/CpuInfo', 'ec2-bc:/home/ubuntu']);

        pushScript.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
            allData += 'PUSH-SCRIPT: ' + data;
            //console.log('PUSH', data);
        });

        pushScript.stderr.on('data', (data) => {
            console.log(`child stderr:\n${data}`);
            allData += 'PUSH-SCRIPT: ' + data;
            //console.error('PUSH', data);
        });

        pushScript.on('close', (code) => {
            resolve({
                result: 'success',
                code: code
            });
        });

        pushScript.on('error', (code) => {
            reject({
                result: 'error',
                code: code
            });
        });
    });
};
```

Modify our server side **copyFile** endpoint to look like this:

```javascript
router.get('/copy-script', function(request, response) {
    'use strict';
    copyFile()
        .then((result) => {
            console.log(JSON.stringify(result, null, 4));
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
            response.send(err);
        })

});
```
