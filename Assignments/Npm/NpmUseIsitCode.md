---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Npm/NpmUseIsitCode.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Npm
fileName: NpmUseIsitCode.md
relativePath: /Npm/NpmUseIsitCode.md
title: NpmUseIsitCode
directoryName: Npm
category : npm-guide
---

## Overview

This assignment demonstrates how to use your fork of my [isit-code][ic] package. We will also create an Express and React based project that calls some methods in your fork of **isit-code**.

Be sure [lamp is installed][li].

## Note on Names

To save keystrokes when typing, and cut down on noise when reading, I'll use some simple shortcuts. Unless I explicitly state otherwise, when I write **isit-code**, I'm referencing your **isit-code-lastname** project.

- isit-code => isit-code-lastname

## Create Projects

Use **CreateExpressProject** to populate a folder in your repository called **Week04-UseIsitCode**:

- CreateExpressProject Week04-UseIsitCode

Use NPM to install your **isit-code** project and save a reference to it in your **package.json** file.

## Methods to call

In **index.js** use **require** to load your NPM package. The call might look something like this:

```javascript
const isitCode = require('isit-code-lastname');
```

Most of the time, however, you want to load a particule module from the library. Suppose you want the **elf-utils** module. Load it like this:

```javascript
const elfUtils = require('isit-code-lastname').elfUtils;
```

Now call two methods from your **isit-code** package.

- elfUtils.getHomeDir
- elfUtils.getFirstWord


Create two routes in **index.js**, one for calling each method. The routes should have these names:

- /home-directory
- /first-word

For instance:

```
router.get('/home-directory', function(req, res, next) { 'use strict';
```

I'll leave it up to you to implement the method. the call to **elfUtils.homeDir** is very simple. Also, you can see an example of how to call it in **isit-code/spec/test-elf-utils-files.js**.

**NOTE**: _This is one of the times when a set of unit tests can be used not just for running tests, but for documenting a library. In particular, the primary documentation for **isit-code** is in the spec directory of the **isit-code** package. Though it would be good to have better document, it is often the case the unit tests included with a package can help you understand a package._

## Client

Create a file called **CallIsitCode** in a directory in the root of your project called **source**. The file should contain ES6 and React code.

**THREE NOTES ON STYLE**:

- _The most widely used convention for React components, as far as I can see, is to put only one component in a file and to name the file with PascalCase. See the [airbnb][abg] guidelines._
- _The component and the file it is in should have the same name._
- _Be sure to name the method button click methods appropriately. No more on **onClick** methods named **bar**. I'll let you choose the appropriate name, but it should be descriptive._

Create two buttons in your React component:

- Get Home Dir
- Get First Word

A click on the first button should call the appropriate method on the server. Click the second button -- and well -- you know what it should do. Use **fetch** from **whatwg-fetch** to make the calls from the client to the server.

## Webpack

You are going to need to create a **webpack.config.js** file. I would suggest you copy the one from the webpack section of the [ReactBasics][rb] assignment.

You will want to put the **entry** to **CallIsitCode**. The output might look something like this:

```javascript
output: {path: __dirname, filename: './public/javascripts/bundle.js'},
```

## Load ES6

You should know the steps to load the ES6 code by now. But if you need a hint, consider this:

- In **index.pug**, you are going to need a div with a unique ID as in [ReactBasics][rbh] and [WebCraftsReact][wbc].
- At the end of the same file, you are going to need to load the bundle.
  - **script(src="javascripts/bundle.js")**

The key pieces you need at the end of **index.pug** are:

- A DIV named **home** or something similar.
  - This is where your React code will be inserted.
- A **script** statement to load **bundle.js**

We put the script statement at the end of **index.html** because it uses the **home** DIV. That DIV must already be loaded or the React code won't find a place to insert itself.

## Getting User Input

Suppose you define an **input** control with JSX:

```html
<input type="text" onChange={this.firstWordChange} placeholder='Enter multi-word sentence.' />
```

How do we get text from the input? Declare state for the input:

```javascript
constructor() {
    super();
    this.state = {
        homeDirectory: 'Unknown',
        firstWord: 'Unknown',
        userInput: 'Unknown'   << TRACK USER INPUT
    };
    this.homeDirectory = this.homeDirectory.bind(this);
    this.firstWordChange = this.firstWordChange.bind(this);
    this.firstWord = this.firstWord.bind(this);
}
```

Define the firstWordChange method. It gets called over and over as the user types in the input. It also continually updates the **this.state.userInput**:

```javascript
firstWordChange(event) {
    console.log('firstWord:', event.target.value);
    this.setState({userInput: event.target.value})
}
```

## Passing Parameters with **fetch**

Now that we have the user input in **this.state.userInput**, how do we pass it to the server. Like this:

Our goal is to pass a URL to the server describing the sentence from which we want the first word:

```
/first-word?
```

First we need to define a method to [URL encode][ue] the [parameters][sor]:

```javascript
getQuery() {
        const params = {sentence: this.state.userInput};
        const encodeUri = encodeURIComponent;
        let query = Object.keys(params)
            .map(key => encodeUri(key) + '=' + encodeUri(params[key]))
            .join('&');
        return query;
    }
}
```

The [join][join] statement turns the array produced by [map][map] into a string joined on ampersands.

Then we need to use it when we call fetch:

```javascript
firstWord() {
    const that = this;
    const query = '/first-word?' + this.getQuery();
    console.log(query);
    fetch(query)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log('parsed json', json);
            that.setState({ firstWord: json.firstWord });
        })
        .catch(function(ex) {
            console.log('parsing failed', ex);
        });
}
```

## Handle code on Server

And here is the code for getting the query when it is passed to the server:

```javascript
router.get('/first-word', function(request, response, next) { 'use strict';
    console.log(req.query);
    try {
      // Now call elfUtils with the sentence passed in the query.
      // Use Response.send to return the result.
      // Here is one way to handle an error if it occurs:
    } catch(e) {
        console.log(e);
        res.status(500).send(e)
    }
});
```

## Turn it in

Place your work in a branch called Week04. When turning in the assignment, include the following information:

- Branch: <NAME OF BRANCH>
- Directory: <NAME OF DIRECTORY>

To get full credit, the second button must retrieve a string from the user via a TextBox. The call should retrieve the first word the user enters.

Also, consider adding the URL of your repos:

- MainRepo: git@github.com:my-name/my-repo.git
- IsitSite Repo: git@github.com:my-name/my-repo.git
- IsitCode Repo: git@github.com:my-name/my-repo.git

## Cannot read property of undefined

We often get errors like this:

- parsing failed TypeError: **Cannot read property 'setState' of undefined**

We know that we are calling **setState** of **this** or **that**. So why is **this** undefined? There could be many reasons, by a likely culprit is that you forgot to bind a method:

```javascript
this.someMethod = this.someMethod.bind(this);
```

## Finding Code

Read the [References][re] section in [ElvenLinks][el]

[rb]:http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBasics.html#transpiling-with-webpack
[rbh]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactBasics.html#html-file
[ic]:https://github.com/charliecalvert/isit-code
[abg]:https://github.com/airbnb/javascript/tree/master/react
[re]: http://www.ccalvert.net/books/CloudNotes/tips/ElvenLinks.html#references
[el]: http://www.ccalvert.net/books/CloudNotes/tips/ElvenLinks.html
[li]: http://www.ccalvert.net/books/CloudNotes/Assignments/WebCrafts/WebCraftsReactStarter.html#lamp
[ue]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
[sor]: https://stackoverflow.com/a/34209399/253576
[map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[join]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
[wbc]: http://www.ccalvert.net/books/CloudNotes/Assignments/WebCrafts/WebCraftsReactStarter.html#link-it-together
