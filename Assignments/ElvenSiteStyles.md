---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ElvenSiteStyles.md
relativePath: Assignments/ElvenSiteStyles.md
title: ElvenSiteStyles
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: ElvenSiteStyles.md
fileNameHTML: ElvenSiteStyles.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

When using your _Elven Site_ web site creator the user should be able to select the [bootswatch][btsw] theme for the created site. In short, I want you to add Bootswatch to your latest Elven Sites code. That is the goal of the **Elven Site Styles** assignment.

![picker](https://s3.amazonaws.com/bucket01.elvenware.com/images/elven-site-styles01.png)

Do your work in **Week10-ElvenImagePicker** in a branch called FinalPrep which should be based on your midterm branch or some branch you created after midterm.

## Client Side

Allow the user to select from a drop down list (HTML SELECT control) of these styles:

```javascript
var themes = ['cerulean', 'cosmo', 'cyborg',
            'darkly', 'flatly', 'journal', 'lumen', 'sandstone', 'slate',
            'spacelab', 'superhero', 'united', 'yeti'];
```

When we press the walk button, pass the selected style back to the server:

```javascript
var requestQuery = {
    directoryToWalk: directory,
    destinationDir: destinationDir,
    highlight: highlight,
    bootswatch: selectedBootswatchTheme          
};

$.getJSON('/walk', requestQuery, function (result) { etc
});
```

To make this work, you will need:

- A new HTML SELECT element in your jade code
- Code to insert the themes array content into the SELECT element
  - You've done several many times before. Hint it involves **append**
- Code to get the selected theme from the SELECT control.
  - You've done this several times before as well.

## Server Side

On the server side, make sure you are using **elven-site-tools@4.0.0** or newer. The settings should now contain your new field:

```javascript
var settings = {
    report: report,
    directoryToWalk: directoryToWalk,
    destinationDir: destinationDir,
    directories: directories,
    highlight: highlight === 'true' ? true : false,
    testRun: false,
    bootswatch: bootswatchTheme
};
try {
    walker.makePage(settings, function(masterListOfNames, htmlFilesWritten) {
    etc...
```

## Turn it in

When you turn in the assignment, include the branch and folder name where I should look for yur work.

## Hints

By now, you should definitely be using your own utilities from your **isit322-lastname** package. But just in case you are stil, at your own peril, using my package, loading the utilities now looks like this:

```
var utils = require('isit322-calvert').elfUtils;
```

[btsw]: https://bootswatch.com/
