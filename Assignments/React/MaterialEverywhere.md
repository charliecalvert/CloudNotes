## Overview

This is a fairly simple assignment, but it is an important one.

A primary goal in this course is to ensure that we can create applications that work on a phone. That sounds simple enough, but it turns out to be fairly hard to create a web application that looks good and works everywhere:

- On a phone
- On a laptop
- On a desktop
- On an ipad or android tablet

It turns out that there are several recipes you can use in when working **material-ui** that will help you create programs that work everywhere. In this assignment we will explore one of them.

**NOTE**: _It may feel like this is a bit restrictive, but leaving you to try to discover a formula that works on your own would be much too hard. Furthermore, you have the freedom to create content inside this structure that looks anyway you want. You can choose which components to use, which colors to use, which fonts to use. But you have to do that inside the framework I provide here. Again, this is not the only way to solve the problem with Material UI, but it is one standard solution. Perhaps we will have to explore some other solutions later._

## Get Started

There is a project in JsObjects called [MaterialComponents][mc]. Pull the latest for JsObjects, locate the project in the **/JavaScript/Design/MaterialComponents** directory. Now copy the project into your repository as **week09-material-components**. Make sure you can run it and run the tests.

Be sure you to look at the **TheTheme.js**. We often put code like this in **source/control.js** (elf-express) or **src/index.js** (create-react-app). We have moved it into its own file so that we can test it, or swap in similar code. The code in **index.js** or **control.js** simply imports the **TheTheme** and uses it like this:

```javascript
ReactDOM.render(
    <TheTheme/>,
    document.getElementById('root')
);
```

## Show You Understand it.

Now make it look like this, but use your last name:

<img class="sizer" alt="React Material Everywhere" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/material-everywhere.png" />

Make sure all the tests still pass. Feel free to change the colors in the theme or the colors in elf-styles.

## Turn it in

Push your work, tag it and tell me:

- Directory
- Tag
- Branch if relevant

## The Default Theme

The material-ui Default Theme is described [here](https://material-ui.com/customization/default-theme/)

[mc]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/MaterialComponents
