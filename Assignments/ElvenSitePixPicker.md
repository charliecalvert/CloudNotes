---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ElvenSitePixPicker.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: ElvenSitePixPicker.md
relativePath: /ElvenSitePixPicker.md
title: ElvenSitePixPicker
directoryName: Assignments
category : assignments-guide
---

## Overview

Elven Site Pix Picker

## Copy Midterm

```
cp -r Week08-Midterm Week10-ElvenSitePixPicker
```

Don't forget to rename the project when you open it in WebStorm.

Make sure you **~/.content/ElvenConfig.json** contains the usual code plus the following, or something like it:

```json
"elvenImages": {
  "baseDir": "/var/www/html",
  "markdownFileWithImages": "/home/bcuser/Documents/AllTest/california.md",
  "allImagesJsonFile": "all-images.json",
  "imageDir": "/images/california/",
  "notUsedDir": "/home/bcuser/temp/not-used/california"
},
```

## Two Pages

The first step will be to create two pages:

- One for creating a web site, MakeHtml style, as in the midterm
- One for creating a page based on a set of pictures from your camera or some other source

## Page One

Take everything beneath the **block content** in **index.jade** and put it in **make-html.jade**.

Replace the content you removed with the following:

```jade
div
    a.pageLink#pageOne Page One
    a.pageLink#pageTwo Page Two

div#pageLoad
```

Add some CSS to **public/css/style.css** to make the anchors a bit prettier. At minimum, do this:

```css
.pageLink {
    margin: 5px;
    padding: 3px;
    border: black solid thin;
    -webkit-border-radius: 4px;
    -moz-border-radius:4px;
    border-radius: 4px;
}
```

## Load the Pages

You will need code like this to load the pages:

```javascript
function SiteConfig() {
    $('#pageOne').click(pageOne);
    $('#pageTwo').click(pageTwo);
}

function pageOne() {
    $('#pageLoad').load('/makeHtml', function() {
        $('#loadConfig').click(loadConfig);
        elf.walking.configurePageOne();
        loadConfig();
    });
}

function pageTwo() {
    $('#pageLoad').load('/pixPicker', function() {
        // CODE OMITTED HERE
    });
}
```

## Server Side

Here are the methods found in **routes/index.js** for calling into the image code in **elven-stite-tools**.

```javascript
router.get('/makeMarkdown', function(request, response) {
    console.log('makeMarkdown route called');
    var makeMarkdown = new imageHelp.MakeMarkdown();

    makeMarkdown.loadAndRun(function(report) {
        if (report.spacesInFileNames) {
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            console.log('You have spaces in one or more file names.');
            console.log('The problem is probably in your images directory.');
            console.log('FileNames or Directories with spaces in their ');
            console.log('names is not a good idea. Run this command in ');
            console.log('the offending directory and then restart:');
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            console.log('find -name "* *" -type f | rename "s/ /_/g"');
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
            response.send({ error: 'spaces in file name' });
        } else if (report.markdownFileExists) {
            response.send({ error: 'Markdown file exists: ' + report.markdownFileWithImages });
        } else {
            response.send({
                'success': 'makeMarkdown',
                'report': report
            });
        }
        console.log(report);
    });
});

router.get('/deleteMarkdown', function(request, response) {
    var makeMarkdown = new imageHelp.MakeMarkdown();
    makeMarkdown.deleteMarkdownFileWithImages(function(result) {
        console.log(result);
        response.send({ 'result': 'file deleted'});
    })
});
```

On the client side, these are simple button clicks, with no parameters (requestQuery) being passed.

## Nodemon Warning

There is one catch here. Since **all-images.json** gets rewritten, you have to tell nodemon to ignore that file or it will keep restarting your application.

Save the following as **nodemon.json** in the root of your project:

```javascript
{
  "verbose": false,
  "ignore": ["all-images.json"]
}
```

## Turn it in

Tell me the project and branch.
