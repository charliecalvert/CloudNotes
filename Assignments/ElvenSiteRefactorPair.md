---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ElvenSiteRefactorPair.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: ElvenSiteRefactorPair.md
relativePath: /ElvenSiteRefactorPair.md
title: ElvenSiteRefactorPair
directoryName: Assignments
category : assignments-guide
---

## Overview

The ElvenSiteRefactorPair assignment gives you a chance to refactor your code into logical classes. This should be a step toward providing your code with an architecture that is easy to understand, and easy to test.

Do your work in the midterm branch. Please specify which one you use.

The following diagram is for use with the command line version of our program, which is called **MakeHtml**. However, the **MakeHtml** program does the same thing as **ElvenSite**. Just substitute the word **ElvenSite** (your midterm) every place you see **MakeHtml**

![MakeHtmlWorkFlow](https://s3.amazonaws.com/bucket01.elvenware.com/images/make-html-work-flow.png)

## Refactoring Overview

My code ended up refactored into the following classes:

- elf
- elf.SiteConfig
- elf.ImagePicker // To be added later
- elf.Walking
- elf.utilities
- elf.display

Set up is done in **SiteConfig**. For instance, I call **loadConfig** in this file, and I set up the button click handlers for the buttons in **views/index.jade**:

```javascript
function SiteConfig() {
    $('#pageOne').click(pageOne);
    $('#pageTwo').click(pageTwo);
}
```

Don't set up button handlers here for buttons on HTML pages that have not been loaded yet.

The **Walking** class handles calling the server side route that calls the **elven-site-tools** code for iterating through the markdown that is kept in directories like **AllTest**. Th **getJSON** call that calls the **/walking** route is found in this class:

```javascript
function callServer(requestQuery, requestIndex, callback) {
    $.getJSON('/walk', requestQuery, function (result) {
    // Code omitted here
    });
}
```

**ImagePicker** is for calling the **elven-site-tools** code for iterating over a batch of images and creating a markdown file. The **elven-site-tools** code also creates a smaller version of the main image. This code will be discussed in another assignment.

The **display** class contains all the code that displays information on an HTML page.

## The elf Class

This object can create the constructor objects such as **SiteConfig**, **Walking** and **ImagePicker**:

```javascript
var elf = {
    init: function() {
        'use strict';
        elf.siteConfig = new elf.SiteConfig();
        elf.walking = new elf.Walking();
        elf.imagePicker = new elf.ImagePicker();
    }
};
```

The class is also used for global abatement. That is, it is used to limit the number of variables put in the global name space. Our program, should, in fact, put only the **elf** class in the global name space.

## Create Display Class

The display class is created to be sure there is a separation of concerns. All code that has to do with displaying objects and their data goes in this class. We could refactor into multiple display classes, one for each object, if our program became more complicated.

```javascript
elf.display = {

    clear:function() {
        $('#displayArea').empty();
        $('#displayList').empty();
    },

    clearConfig: function() {
        $('#dirsToWalk').empty();
        $('#destinationDirs').empty();
    },

    fillDisplayArea: function(stringToDisplay) {
        $('#displayArea').html(stringToDisplay);
    },

    showApacheFiles: function(files, destinationDir) {
        files.forEach(function(file) {
            var base = "/var/www/html/";
            var extra = destinationDir.slice(base.length, destinationDir.length);
            var url = 'http://localhost/' + extra + file.slice(destinationDir.length, file.length);
            $('#displayList').append('<li><a href=\"' + url + '\" target=\"_blank\">' + url + '</a></li>');
        });
    },

    showHtmlFiles: function(files, destinationDir) {
        files.forEach(function(file) {
            // var index = file.lastIndexOf('/');
            var url = 'http://localhost/' + file.slice(destinationDir.length, file.length);
            $('#displayList').append('<li><a href=\"' + url + '\" target=\"_blank\">' + url + '</a></li>');
        });
    },

    showDebug: function(value) {
        $('#debug').append('<li>' + value + '</li>');
    }

};
```

## Create Walking Class

```javascript
elf.Walking = (function() {

    function Walking() {

    }

    // CODE OMITTED HERE

    return Walking
})();
```

## Set up Jasmine

To unit test the code on the server side, we want to set up jasmine. The first step is to create a **jasmine.json** file in a folder called **spec/support**. We are meeting a requirement developed by the authors of Jasmine. In particular, Jasmine expects to find this file in this location.

The **/spec/support/jasmine.json** file looks like this:

```json
{
  "spec_dir": "spec",
  "spec_files": [
    "**/test*.js"
  ]
}
```

The file says two things:

- Our tests are in a directory called **spec**.
- Each of our test suites is stored in a file that begins with the word **test**. For instance: **test-basics.js**.

## Details

You should modify **layout.jade**. Be sure to include:

```
meta(charset='UTF-8')
meta(name='viewport', content='width=device-width')
title= title
```

My **control.js** file now mostly contains **elf.SiteContig** with a constructor and **loadConfig**. Should we refactor into another class?

## Turn it in

Push your branch.
