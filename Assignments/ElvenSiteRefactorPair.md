## Overview

ElvenSiteRefactorPair.

Do your work in a branch called ....

The following diagram is for use with the command line version of our program, which is called **MakeHtml**. However, the **MakeHtml** program does the same thing as **ElvenSite**. Just substitute the word **ElvenSite** (your midterm) every place you see **MakeHtml**

![MakeHtmlWorkFlow](https://s3.amazonaws.com/bucket01.elvenware.com/images/make-html-work-flow.png)

## Create Display Class

```javascript
var elf = {
    init: function() {
        'use strict';
        elf.siteConfig = new elf.SiteConfig();
        elf.walking = new elf.Walking();
    }
};

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

The **/spec/support/jasmine.json** file:

```json
{
  "spec_dir": "spec",
  "spec_files": [
    "**/test*.js"
  ]
}
```

## Details

You will, of course, have to modify **layout.jade**. Be sure to include:

```
meta(charset='UTF-8')
meta(name='viewport', content='width=device-width')
title= title
```

My **control.js** file now mostly contains **elf.SiteContig** with a constructor and **loadConfig**. Should we refactor into another class?

## Turn it in

Push your branch.
