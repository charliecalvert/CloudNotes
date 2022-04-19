---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactClickRoute.md
relativePath: Assignments/React/ReactClickRoute.md
title: ReactClickRoute
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactClickRoute.md
fileNameHTML: ReactClickRoute.html
---


<!-- toc -->
<!-- tocstop -->

# Click Route React

Convert an Express app into one that supports React.

## Convert to Pug

Rename all the files in the views directory from **&#42;.jade** to **&#42;.pug**. For instance:

- layout.jade => layout.pug
- index.jade => index.pug
- error.jade => error.pug

Now ask NPM to switch from jade to pug:

```
npm uninstall jade
npm install --save pug
```

Take a look at your **package.json** file and ensure that the **dependencies** no longer include **jade** and do include **pug**. You might expect to see something like this, where the details may differ on your system:

```javascript
"dependencies": {
    "body-parser": "~1.18.1",
    "cookie-parser": "~1.4.3",
    "debug": "~3.0.1",
    "express": "~4.15.4",
    "morgan": "~1.8.2",
    "pug": "^2.0.0-rc.4",
    "serve-favicon": "~2.4.4"
},
```

Finally, in **app.js**, tell express to switch the view engine from jade to pug:

```javascript
app.set('view engine', 'pug');
```

Before we made the change the code referenced jade rather than pug.

## Modify _index.pug_

Currently, index.pug looks like this:

```
extends layout

block content
    h1= title
    p Welcome to #{title}

    p Hello from the server

    p#intro Test

    ul
        li.listItem Item01
        li.listItem Item02
        li.listItem Item03

    h2 Hint

    p.short.
        The link below calls the /Item01 route. It shows the result in
        a separate page. Obviously this is not the solution I'm looking for
        in this assignment, but I want to remind you that you can call
        routes by just appending the route to your URL:

    a(href='/Item01') http://localhost:30025/Item01

    p.short.
        To see the object sent back by the Item01 route, you can click
        the link above, or you can type in the URL manually. This trick
        can help when you want to test your <strong>Item02</strong> and
        <strong>Item03</strong> routes.
```

As a test of our ability to start integrating React into our application, let's remove the Hint and replace it with a single DIV that has an ID of **hint**:

```
extends layout

block content
    h1= title
    p Welcome to #{title}

    p Hello from the server

    p#intro Test

    ul
        li.listItem Item01
        li.listItem Item02
        li.listItem Item03

    #hint
```

When creating DIVs, we don't have to tell Pug that we want to create a DIV. Instead, we can just write the symbol for an ID, and the DIV will be assumed. For instance, the following is redundant:

```
div#hint
```

This short code produces identical output:

```
#hint
```

In particular, both produce HTML that looks like this:

```html
<div id="hint"></div>;
```

To be sure you understand this, open the Chrome debugger, turn the **Elements** page, and locate the DIV created by your "#hint" code.

## Set up React

To install the libraries that our project needs, run these commands:

```bash
npm install --save react react-dom webpack
npm install --save-dev babel-loader babel-core webpack-dev-server
npm install --save-dev babel-preset-react babel-preset-env
```

## Create React Files

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

export default class Hint extends React.Component {

    render() {
        return <h1>React Hint</h1>
    }
}

ReactDOM.render(
    <Hint/>,
    document.getElementById('hint')
);
```

## Webpack Configuration

Save the following code in: **webpack.config.js**. Note that entry is **server.js** and output is **bundle.js**.

```javascript
var path = require('path');
var webpack = require('webpack');

module.exports = {
   entry: './source/main.js',
   output: {path: __dirname, filename: 'public/javascripts/bundle.js'},
   module: {
       loaders: [
           {
               test: /.js?$/,
               loader: 'babel-loader',
               exclude: /node_modules/,
               query: {presets: ['env', 'react']}
           }
       ]
   },
};
```

## Integrate with Require JS

```javascript
require.config({
    baseUrl: '.',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'ClickEvents': 'javascripts/click-events',
        'reactBundle': 'javascripts/bundle',
    }
});

require(['jquery', 'reactBundle', 'ClickEvents'], function($, ReactBundle, ClickEvents) {
    'use strict';

    console.log('main called');
    $(document).ready(function() {
        var clickEvents = new ClickEvents();
    });
});
```

## Package.json

In the start section, add the following code:

```javascript
"build": "node_modules/.bin/webpack --colors --watch"
```

To use it, type: **npm run build**. This will start webpack, compile your code, and leave webpack running. If you make changes to your code, then webpack will recompile your source automatically. The one drawback is that it keeps your command window busy. Hitting CTRL-C will end the process, but then you will no longer have your code recompiled automatically. There are at least two solutions:

- Open a second tab in the terminal window and run your program from there: **npm start**
- Run webpack with an ampersand: **node_modules/.bin/webpack --colors --watch &**

If you choose the later option, then a simple return will get you back to bash shell prompt. Webpack will continue running in the background, and will recompile (transpile) your code as needed. To end the session, type **jobs**:

```
$ jobs
[1]-  Running                 node_modules/.bin/webpack --colors --watch &
[2]+  Running                 meld README.md ~/Git/CloudNotes/Assignments/React/
```

Here the **jobs** command tells me that I am running two processes in the background. To bring one to the fore, I can do type **fg 1**, where 1 is the number of the job I want to bring forward:

```
$ fg 1
node_modules/.bin/webpack --colors --watch
```

Now I can press CTRL-C to shutdown webpack.

**NOTE** _Webpack in **watch** mode will automatically compile your code, but you still need to press **F5** in the browser to refresh your view and see the updates._

## Update _hints.js_

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

export default class Hint extends React.Component {

    render() {
        return <h1>Hinterland</h1>
    }
}

ReactDOM.render(
    <Hint/>,
    document.getElementById('hint')
);
```
