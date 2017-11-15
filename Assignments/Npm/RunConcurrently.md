## Overview

The goal of this assignment is to learn to run two programs concurrently. One program is an Express application called **server**. The second is a **create-react-app** program called **client**.

# NPM Package

Here is an example **package.json** that shows how to launch our existing **client** and **server** programs with [concurrently][cc].

Place this **package.json** file in the root folder that hosts both the **client** and the **server** programs. It is expecting both **client** and **server** to be sub-directories.

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

If you look at the above file, you will also see a **lint option**.

## Start the Client

We need to preform a little dance to start the **create-react-app**. Here is our little waltz, which we will save as **start-client.js**:

```javascript
#!/usr/bin/env node

const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
const cp = require('child_process');
cp.spawn('npm', args, opts);
```

## Use Concurrently

For your next step, please choose one of the following:

- Order out for pizza
- Book a flight to Hawaii
- Run **npm install && npm start**

## Turn it in

I'd like to see this set up for any project that has both a **client** and **server** of the type described above. I'm just expecting to find it.

[cc]: https://www.npmjs.com/package/concurrently