---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Npm/RunConcurrently.md
relativePath: Assignments/Npm/RunConcurrently.md
title: RunConcurrently
queryPath: Assignments/Npm/
subject: Npm
fileNameMarkdown: RunConcurrently.md
fileNameHTML: RunConcurrently.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The goal of this assignment is to learn to run two programs concurrently. One program is an Express application called **server**. The second is a **create-react-app** program called **client**.

**NOTE**: _I believe that most of this assignment can be automated by running the **get-gist** script and picking the Concurrently option from the menu. Run that command in the directory that contains both your **client** and **server** projects. For instance, in the case below in the Getting Started section, run it in the **weekXX-concurrently** directory._

## Getting Started

In most cases, you will already have a directory that contains a **server** and **client** project. In case you do not, here is how to set one up starting from the root of your repository:

    mkdir weekXX-concurrently
    cd weekXX-concurrently/
    CreateExpressProject server
    create-react-app client

Install concurrently in the root of your project:

    npm install --save concurrently

## Setting the Port

We don't want both programs to try to run on the same port. To solve this potential conflict, set the **port** in **server/bin/www** to 30026. One way to do that is like this:

```javascript
var port = normalizePort('30026');
```

A second, more flexible way, looks like this:

```javascript
var port = normalizePort(process.env.SERVER_PORT || '30026');    
```

Then in .bashrc, or some other script, set **SERVER_PORT**:

```bash
export SERVER_PORT=30026
```

In the **Week10-Concurrently** directory set up **package.json** and the starter script as described in the next few sections of the project.

Also, in **server/bin/www** you may need to modify the call to **server.listen** like this:

```
server.listen(port, () => console.log("Listening on", port));
```

This, or something similar, may have already been done for you when you created the project.

##  NPM Package

Here is an example **package.json** that shows how to launch our existing **client** and **server** programs with [concurrently][cc].

Place this **package.json** file in the root folder that hosts both the **client** and the **server** programs. It is expecting both **client** and **server** to be sub-directories.

```javascript
{
    "name": "lookup-server",
    "version": "0.0.1",
    "private": true,
    "dependencies": {
        "express": "4.16.4"
    },
    "scripts": {
        "start": "concurrently 'npm run server' 'npm run client'",
        "server": "babel-node server/bin/www",
        "client": "babel-node start-client.js",
        "lint": "eslint ."
    },
    "devDependencies": {
        "@babel/cli": "^7.4.3",
        "@babel/core": "^7.4.3",
        "@babel/node": "^7.2.2",
        "babel-eslint": "^9.0.0",
        "concurrently": "4.1.0",
        "elven-code": "^4.6.3",
        "eslint": "5.12.0",
        "eslint-config-google": "^0.12.0",
        "eslint-plugin-import": "2.17.1",
        "eslint-plugin-jsx-a11y": "6.2.1",
        "eslint-plugin-react": "7.12.4"
    }
}
```

If you look at the above file, you will also see a **lint option**.

## Start the Client

We need to preform a little dance to start the **create-react-app** program found in the client directory. Here is our little waltz, which we will save as **start-client.js** in the root of your project. (Don't put it in **client** in **server**; put it in the root of the project.):

```javascript
#!/usr/bin/env node

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
const cp = require('child_process');
cp.spawn('npm', args, opts);
```

## Use Concurrently

Now run **npm install && npm start**

## Turn it in

Provide the following:

- branch
- folder

For instance:

- Branch: Week02
- Folder: Week02-Concurrently

[cc]: https://www.npmjs.com/package/concurrently

## Dependency Error {#errors}

You might get an error like this: **There might be a problem with the project dependency tree.** If this happens, open up the copy of package.json in the root of your directory and set the versions of **babel-eslint** and **eslint** as follows:

```javascript
"babel-eslint": "^9.0.0",
"eslint": "5.12.0",
```

Perhaps the versions that **create-react-app** wants will differ from this, but they are probably looking for something along these lines.
