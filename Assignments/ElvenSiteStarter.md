---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ElvenSiteStarter.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: ElvenSiteStarter.md
relativePath: /ElvenSiteStarter.md
title: ElvenSiteStarter
directoryName: Assignments
category : assignments-guide
---

## Overview

The goal of the Elven Site Starter is to create a simple, first iteration, front end for the MakeHtml project.

## Step One

Create a new project.

```
CreateAllExpress Week03-ElvenSiteStarter
cd Week03-ElvenSiteStarter
npm install elven-site-tools --save
npm install marked --save
```

The version of **elven-site-tools** should (automatically) be at least **0.0.6**.

## Step Two

Put this code in **routes/index.js** above the exports statement:

```javascript
router.get('/walk', function(request, response) {
  var directoryToWalk = process.env.HOME + '/Documents/AllTest';
  console.log('start', directoryToWalk);
  walker.buildFileReport(directoryToWalk, '.md', function(report) {
    console.log('build');
    var directories = walker.getDirectories(report);
    walker.makePage(directoryToWalk, directories, report, function(masterListOfNames, htmlFilesWritten) {
        response.send( { result: 'success',
          directories: directories,
          masterListOfNames: masterListOfNames,
          htmlFilesWritten: htmlFilesWritten
        });
    });
  });
});
```

And at the top:

```javascript
var walker = require('elven-site-tools').walker;
```

## Step Three

Create an interface for the program with an **input**, **button** and **pre**, each in their own **DIV**. Write a little CSS so that each has a little room to breath. For me, this involved the attributes called padding and margin-top on the DIVs, and width on the INPUT. The IDs for the HTML elements are as follows:

- input: dirToWalk
- button: walk
- pre: display

In your **document ready** handle button clicks so that they call the **walk** route on the server and display the results. I used **getJSON** to do this.  You should also be able to define the directory that is to be *walked*.

On the server side, this directory should be assigned to **directoryToWalk**. That means you should make some changes to the code I gave you in the previous step.

Back on the client, remember that jQuery has a **val** method (not **html**) for working with **INPUT** elements. Recall also that **getJSON** can take three parameters:

- The route
- The data you want to pass to the server, which in this case is the path to the directory to walk.
- The call back that returns the results.

Be sure you can pass in a string specifying the **directoryToWalk** and that you routine uses it rather than the default string I provide in the code above.

Help on **input** controls for Jade:

- <http://naltatis.github.io/jade-syntax-docs/#attributes>
- [Elvenware Input Controls][elfinput]

![Walking](https://s3.amazonaws.com/bucket01.elvenware.com/images/elven-site-starter-01.png)

[elfinput]: http://www.elvenware.com/charlie/development/web/JavaScript/NodeJade.html#input-controls

## Step Four

Take the code one step beyond what I show in the image above. Iterate over the **htmlFilesWritten** and dynamically create and display valid links to the files. I would display the links in a UL element located between the BUTTON and PRE elements. Have the links open in a separate tab when they are selected. For instance:

```HTML
<a href="http://localhost/Bar.html" target="_blank">Bar.html</a>
```

I think you would use **slice** to help convert a string like **/var/www/html/Bar.html** into **http://localhost/Bar.html**. You can use [jQuery's foreach](http://api.jquery.com/jquery.each/) to iterate over the **htmlFilesWritten** array.

For extra credit, put the method that uses **slice** to create the new string in your NPM library and include and use your library in the project. Call the method your create something like **htmlPathToUrl**. You should be able to pass in **/var/www/html/garply/Summary.html** and get back **http://localhost/garply/Summary.html**.

Recall that you can use jQuery to append items to a list:

```javascript
$('#myList').append(myAnchor);
```

## Turn it in

Put your work your repository in the folder referenced in Step One. Push your repository and submit the assignment.
