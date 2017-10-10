## Overview

This assignment demonstrates how to use your fork of my [isit-code][ic] package. We will also create an Express and React based project that calls some methods in your fork of **isit-code**.


## Note on Names

To save keystrokes when typing, and cut down on noise when reading, I'll use some simple shortcuts. Unless I explicitly state otherwise, when I write **isit-code**, I'm referencing your **isit-code-lastname** project.

- isit-code => isit-code-lastname

## Create Projects

For this project we need one folder in your repository called **Week04-UseIsitCode**. Create it like this:

- **CreateExpressProject** server

Use NPM to install your **isit-code** project and save a reference to it in your **package.json** file.

## Methods to call

In **index.js** use **require** to load your project. The call might look something like this:

```javascript
const isit-code-calvert = require('isit-code-calvert');
```

Most of the time, however, you want to load a particule module from the library. Suppose you want the elf-utils project. Then load it like this:

```javascript
const elfUtils = require('isit-code-calvert').elf-utils;
```

Now call two methods from your **isit-code** package.

- elfUtils.getHomeDir
- elfUtils.getFirstWord


Create two routes in **index.js**, one for calling each method. The routes should have these names:

- get-home-dir
- get-first-word

Create two buttons in a React component on the client:

- Get Home Dir
- Get First Word

Click the button, call the appropriate method. To get full credit, the second button must retrieve a string from the user via a TextBox. The call should retrieve the first word the user enters.

[ic]:https://github.com/charliecalvert/isit-code
