---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts/WebCraftsReactStarter.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts
fileName: WebCraftsReactStarter.md
relativePath: /WebCrafts/WebCraftsReactStarter.md
title: WebCraftsReactStarter
directoryName: WebCrafts
category : webcrafts-guide
---

## Overview

The goal of this assignment is to begin the process of integrating React into our [WebCrafts][wcs] application. Your key reference will be the [ReactBasics][rb] assignment. More specifically, I'm expecting you to be working in this repository:

- **isit-web-crafts-lastname**

## Branch

We will do our work in a branch called **Week05-React**. Once we have things in good shape, we can merge that code back into **master**. For the assignment, I will look at **master** unless you specify otherwise, but I expect **Week05-React** to exist.

But before we do this, let's tag our work so we can get back to the way it was before we integrated React:

```
git tag -a 1.0.1 -m "before React";
git tag push 1.0.1
```

Here are the steps to create and switch to our working branch. Enter the following from anywhere in the WebCrafts repository:

```
git branch Week05-React
git checkout Week05-React
```

## WebPack

The first step will be to integrate webpack into the WebCrafts project. From the root of the WebCrafts repository:

```
cp <PATH TO YOUR REACT BASICS PROJECT>//webpack.config.js .
```

For example:

```
cp ~/Git/isit320-calvert-2017/Week01-ReactBasics/webpack.config.js .
```

For now, we will leave it unchanged. We will, however, need to install:

- babel-loader
- babel-core
- babel-preset-react
- babel-preset-env
- webpack-dev-server

The details are [here][nw].

## npm ERR!

If you get this error:

```
npm ERR! Cannot read property '0' of undefined
```

Upgrade to latest npm:

```
npm -g install npm
```

After the install, my version looked like this:

```
$ npm --version
5.5.1
```

Delete **node_modules** and **package-lock.json**.

Make sure npm is the one in your **~/npm** directory:

```
$ which npm
/home/charlie/npm/bin/npm
```

If you are using the one in /usr/bin/npm delete it create a symbolic link to the one in your **npm** directory. It might be something like this:

```
sudo rm /usr/bin/npm
sudo ln -s ~/npm/bin/npm .
```

And:

```nohighlighting
rm -r node_modules
rm package-lock.json
npm install
```

## Get Sample Components

Let's now copy over our sample component and give it the name **ReactHome.js**:

```
mkdir source
cp ~/Git/isit320-calvert-2017/Week01-ReactBasics/react-simple.js source/ReactHome.js
```

Change the name of the component to match our new naming scheme:

```javascript
export default class ReactHome extends React.Component {...}
```

## Create our Main React file {#react-main}

This code belongs in a file called **source/react-main**:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactHome from './ReactHome';

$(document).ready(function() {
    const home = document.getElementById('home');
    ReactDOM.render(<ReactHome/>, home);
});
```

**NOTE**: _We the file called **ReactHome** gets its name and casing from the fact that it contains a component called **ReactHome**. The **react-main** file does not export a component, so we do not put its name in Pascal case._

## Link it Together

Now we need perform the standard dance we have done several times already. In **webpack.config.js** point our **entry-point** at **react-main.js** file:

```javascript
entry: './source/react-main.js',
```

Put a script in **package.json** for building the webpack bundle:

```javascript
"scripts": {
    "test": "karma start",
    "start": "nodemon ./bin/www",
    "bundle": "node_modules/.bin/webpack"
},
```

Add a **home** **DIV** to **index.pug**:

```
extends layout

block content

    .jumbotron
        h1 Elven Site Builder

        button#makeHtml.btn.btn-warning Make HTML
        button#makeImage.btn.btn-success Create Images

    div#pageLoad
        p To see options, select a button above.

    div#home
```

And finally, load our **bundle.js** file using RequireJs. Most of you are probably not familiar with **RequireJs**, so for now I'll just show you the new code for **public/javascripts/main.js**:

```javascript
requirejs.config({
    baseUrl: '.',
    paths: {
        jquery: 'components/jquery/dist/jquery',
        bootstrap: 'components/bootstrap/dist/js/bootstrap',
        control: 'javascripts/control',
        elfLog: 'components/elven-tools/elf-log',
        makeHtml: 'javascripts/make-html/make-html',
        walking: 'javascripts/make-html/walking',
        makeImage: 'javascripts/make-image/make-image',
        imagePicker: 'javascripts/make-image/image-picker',
        display: 'javascripts/tools/display',
        settings: 'javascripts/tools/settings',
        utilities: 'javascripts/tools/utilities',
        reactBundle: 'javascripts/bundle',
    }
});

requirejs(['jquery'], function($) {
    'use strict';
    requirejs(['bootstrap', 'control', 'reactBundle'], function(bootstrap, control) {
        control();
        $('.navbar-nav li.trigger-collapse a').click(function(event) {
            $('.navbar-collapse').collapse('hide');
        });
    });
});
```

The two new bits of code both include the words **reactBundle**. Here is the part added to **requireJs.config**:

```javascript
reactBundle: 'javascripts/bundle',
```

Here is the bit added to the call to **requirejs**:

```javascript
requirejs(['bootstrap', 'control', 'reactBundle'], function(bootstrap, control) {...})
```

![React in our Express][rie]

## Load Material

In **views/layout.pug**:

```
link(rel="stylesheet", href="https://fonts.googleapis.com/css?family=Roboto:300,400,500")
link(rel="stylesheet", href="https://fonts.googleapis.com/icon?family=Material+Icons")
```

I don't really know much about fonts, but if you curious you could learn more about [Google Fonts][gf].

And install [Material-ui][mu].

```
npm install --save material-ui
```

## Buttons

Here is a components that defines our buttons:

```javascript
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// import {black, red} from 'material-ui/styles/colors';

class HomeButtons extends React.Component {

    constructor() {
        super();

        this.state = {
            makeImage: 'Make Image',
            makeHtml: 'Make HTML'
        };
    }

    render() {
        return <MuiThemeProvider>
            <div>
                <h1>Home Page</h1>
                <RaisedButton
                    id="makeHtml"
                    style={buttonStyle}
                    primary={true}
                    onClick={this.makeHtml}>{this.state.makeHtml}</RaisedButton>
                <RaisedButton
                    style={buttonStyle}
                    primary={true}
                    onClick={this.makeImage}>{this.state.makeImage}</RaisedButton>
                <p>Select a button.</p>
                <p>This is a react component.</p>
            </div>
        </MuiThemeProvider>;
    };
}

var buttonStyle = {
    margin: '15px'
};

export default HomeButtons;
```

The MuiThemeProvider is built into **material-ui**.

## Integrate

Now use the **HomeButtons** component by making it part of the **ReactHome** component.


```javascript
import React from 'react';
import HomeButtons from './HomeButtons';

export default class ReactHome extends React.Component {
 render() {
     return (
         <div>
             <h1>An H1 element in a React Component</h1>
             <HomeButtons/>
         </div>
     )

 }
}
```

This technique of nesting one component inside another is done a lot in React. The idea is that you can modularize even seemingly closely related parts of a UI. By dividing the UI into small modules you can greatly reduce complexity.

**NOTE**: _We'll work on getting the buttons to do something in another assignment. It's a more difficult problem than it might seem because we are trying to integrate two worlds: React and jQuery._

## The CSS issue

Finally, there is one little gotcha that we need to fix. In **public/stylesheets/styles.css** I define a simple CSS rule that affects all our DIVs:

```
div {
    border: #d4e6ff solid thin;
    padding: 3px;
    margin-top: 3px;
}
```

I did this during development of the origial app because it helped me see where the various parts of my UI began and ended. I should have removed it, but never did. This kind of thing could happen in a real-world application, so it is not necessarily bad that I have left it in.

The fix, of course, would be to delete the rule, or to qualify it like this with CSS class, which would allow us to reuse it later if needed:

```
div.borderMan {
    border: #d4e6ff solid thin;
    padding: 3px;
    margin-top: 3px;
}
```

## Turn it in

I'm looking for:

- WebPack integration
- ES6 files in the **source** directory called:
  - react-main
  - ReactHome
- a **home** div in **index.pug**
- **bundle.js** linked into **public/javascripts/main.js**
- [Material-UI](http://www.material-ui.com/#/)
- A minor change to your CSS file.

Push your new branch. You may get an error when you try to push since you are in a new branch. However, Git tells you exactly how to fix the problem.

Then merge your fix into master.

```
git checkout master
git merge Week05-React
```

Something like this:

```
$ git merge Week05-React
Updating 2660c6d..7a19845
Fast-forward
 bin/www                      |     2 +-
 install-webpack-packages     |    12 +
 package-lock.json            | 12103 +++++++++-------
 package.json                 |    90 +-
 public/javascripts/bundle.js | 31893 +++++++++++++++++++++++++++++++++++++++++
 public/javascripts/main.js   |     5 +-
 public/stylesheets/style.css |     2 +-
 source/HomeButtons.js        |    45 +
 source/ReactHome.js          |    14 +
 source/react-main.js         |     8 +
 views/index.jade             |     4 +-
 views/layout.jade            |     2 +
 webpack.config.js            |    20 +
 13 files changed, 39083 insertions(+), 5117 deletions(-)
 create mode 100755 install-webpack-packages
 create mode 100644 public/javascripts/bundle.js
 create mode 100644 source/HomeButtons.js
 create mode 100644 source/ReactHome.js
 create mode 100644 source/react-main.js
 create mode 100644 webpack.config.js
```

Then push your master branch.

When you turn in the assignment, be sure to tell me the:

- Git URL for all three repositories (isit-code, isit-site-tools, isit-webcrafts).
- The branch in **isit-webcrafts** you want me to look at.

## Revisit the Past

This part of the assignment is purely informative. You don't need to do any of this.

Suppose you want to get back to the version you had before you added your react code. First run **git log**:

```
$ git log
commit 7a198455e4fbe12650a530edf2dd301a8849cbd2
Author: Charlie on RohanElf <charlie@elvenware.com>
Date:   Tue Oct 17 14:57:47 2017 -0700

    First react commit

commit 2660c6dd695012b80604e3913a5bea89a88f93c8
Author: Charlie on RohanElf <charlie@elvenware.com>
Date:   Sat Oct 14 16:23:22 2017 -0700

    All web crafts on new server
```

As you can see, my latest commit was on Oct 17. The previous commit was on the 14th. To get back to the 14th, I can start a branch based on that commit:

```
git branch BeforeReact 2660c6d
```

Now when we run **git log** we can see that in this branch, there never was an Oct 17 commit that included React code:

```
$ git log
commit 2660c6dd695012b80604e3913a5bea89a88f93c8
Author: Charlie on RohanElf <charlie@elvenware.com>
Date:   Sat Oct 14 16:23:22 2017 -0700

    All web crafts on new server
```

We are back at the state we were in before we added react.

[gf]: https://fonts.google.com/?query=Roboto
[rb]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBasics.html
[nw]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBasics.html#create
[rie]: https://s3.amazonaws.com/bucket01.elvenware.com/images/elven-web-crafts-react-01.png
[mu]: http://www.material-ui.com
[wcs]: http://www.ccalvert.net/books/CloudNotes/Assignments/WebCrafts/ElvenWebCraftsStarter.html
