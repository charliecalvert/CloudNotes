---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactMicroServicesRefine.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: ReactMicroServicesRefine.md
relativePath: /React/ReactMicroServicesRefine.md
title: ReactMicroServicesRefine
directoryName: React
category : react-guide
---

# React Micro Services Refine

The primary goal will be to learn about [concurrently][cc02]

![Micro Services][msloop]

[msloop]:https://s3.amazonaws.com/bucket01.elvenware.com/images/micro-services-uml.png

## NPM Package

Here is an example package that shows how to launch our existing client and server with concurrently. Place this in the GitExplorer folder. It is expecting both **client** and **server** to be sub-directories.

```javascript
{
  "name": "lookup-server",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "babel-cli": "6.24.0",
    "babel-core": "6.24.0",
    "express": "4.15.3"
  },
  "scripts": {
    "start": "concurrently 'npm run server' 'npm run client'",
    "server": "babel-node server/bin/www",
    "client": "babel-node start-client.js",
    "lint": "eslint ."
  },
  "devDependencies": {
    "babel-eslint": "^7.2.1",
    "concurrently": "3.4.0",
    "eslint": "3.19.0",
    "eslint-config-google": "^0.7.1",
    "eslint-plugin-import": "2.3.0",
    "eslint-plugin-jsx-a11y": "5.0.3",
    "eslint-plugin-react": "6.9.0"
  }
}
```

Add a few more items in the scripts section:

- micro-first: start this server just as we start the existing **server** script. That is, look at the scripts, find the one called server, block copy and paste, and convert it to start the first of your micro services. Use the name that seems appropriate. The micro service does not have to be in the **GitExplorer** directory hierarchy. It can be back on the root of your repository.
- micro-second: Start this server just as the one above.
- And etc. For all five servers, or at least enough to get you started.
- micros: Model this one after the **start** script show above. In other words, use it to start all the micro services with a single command.
- Finally, modify the start script to start not only **server** and **client**, but also **micros**.

Make sure you do not run services on the same port. For instance, my **server** and **micro-second** were both running on port 30026. Therefore I changed the **bin/www** file so that the server ran on port 30040. (Or whatever numbering scheme you prefer.)

## Start Client

Save as **start-client.js** in **GitExplorer** root.

```javascript
const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
const cp = require('child_process');
cp.spawn('npm', args, opts);
```

## Micro Services

- Make sure that micro-first runs the user service. (Or what have you. I don't care what you call these things, but be sensible).
- Make sure micro-second runs the gist services.
- Add a delete to the gist services.
  - You will need to pass the ID of the item to delete to it.

[cc02]: https://www.npmjs.com/package/concurrently
