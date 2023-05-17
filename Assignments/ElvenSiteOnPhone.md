---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ElvenSiteOnPhone.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: ElvenSiteOnPhone.md
relativePath: /ElvenSiteOnPhone.md
title: ElvenSiteOnPhone
directoryName: Assignments
category : assignments-guide
---

## Overview

To help you get setup:

- <http://www.ccalvert.net/books/CloudNotes/Assignments/AndroidX86Install.html>
- <http://www.ccalvert.net/books/CloudNotes/Assignments/AndroidX86Cordova.html>
```

Elven Site on Phone

```
npm install -g cordova
cordova create Week10-CordovaFinalPrep
cordova platform add android
cordova build android
```

## Step Two

Start Pristine Android. Use the **Input | Mouse Integration** menu to capture the mouse. Just click **Right-Ctrl** once to free the mouse.

Open the terminal application. Type **netcfg** and get your IP address.

## Connect and Install

```
adb connect 168.156.46.231
```

Now find and install your apk file:

  find . -iname *.apk
  adb install /platforms/android/build/outputs/apk/android-debug.apk


Now install it:

```
$ adb uninstall io.cordova.hellocordova
$ adb install platforms/android/build/outputs/apk/android-debug.apk
```

If you want, copy an install script like this:

```
cp ~/Git/JsObjects/Cordova/ElvenGeo/install .
```

If you can't install **lwip** then install **build-essential**:

```
sudo apt-get install build-essential
```

## Copy Working Code

In your working code, go to the views directory and get index.html:

```
jade index.jade
```

Copy that to your cordova project, into the www directory.

```
cp ~/Git/JsObjects/Cordova/ElvenGeo/.bowerrc .
$ cp ~/Git/JsObjects/Cordova/ElvenGeo/bower.json .
```

Your **.bowerrc** should look like this:

```
{
  "directory": "www/components"
}
```

And this is bower.json:

```
{
  "name": "Foo",
  "version": "0.0.0",
  "authors": [
    "Charlie Ubuntu Calvert <charlie@elvenware.com>"
  ],
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {    
    "bootstrap": "^3.3.6"
  }
}
```

And install your tools, where **lastname** is your last name:

```
bower install lastname-tools --save
```

Then run **bower install** to install jquery.

## Debug Your Project

Now run the install script to install your project and bring up the debugger by pasting the following in the chrome address bar:

```
chrome://inspect/#devices
```

Make sure you don't have slashes in front of the word components:

```
<link rel="stylesheet" href="components/bootstrap/dist/css/bootstrap.css">
<script src="components/jquery/dist/jquery.js"></script>
<script src="components/bootstrap/dist/js/bootstrap.js"></script>
<script src="components/elven-tools/elf-log.js"></script>
```

And create a **www/javascripts** folder and copy over the files from your **public/javascripts** folder. You will need to edit the copy from directory:

```
cp ../Week10-ElvenImagePicker/public/javascripts/*.js www/javascripts/.
```

Make sure you get the stylesheets, where you will need to edit the second line:

```
mkdir www/stylesheets
cp ../Week10-ElvenImagePicker/public/stylesheets/style.css www/stylesheets/.
```

## Load Html

Make your pages:

```
jade index.jade
jade make-html.jade
```

Then copy the html to your www folder. Load it:

```
$('#pageLoad').load('./pix-picker.html', function(response, status, xhr) {
    if ( status == "error" ) {
        var msg = "Sorry but there was an error: ";
        $( "#debug" ).html( msg + xhr.status + " " + xhr.statusText );
    } else {
      DO WHAT YOU NEED TO DO HERE
    }
});
```   

I don't think it matters whether you write **./pix-picker.html** or **pix-picker.html**.

## Get Server Url

Here is the updated **elf** object:

```
var elf = {
    init: function() {
        'use strict';
        elf.siteConfig = new elf.SiteConfig();
        elf.walking = new elf.Walking();
        elf.imagePicker = new elf.ImagePicker();
    },
    server: 'http://52.38.4.3',
    port: '30025',
    getServerUrl: function() {
        return elf.server + ':' + elf.port;
    }
};
```

Here is how to use the **getServerUrl** method:

```
function loadConfig() {       
       $.getJSON(elf.getServerUrl() + '/config', function(result) {
           // ETC   
```

And here is what the first parameter looks like after elf.getSeverUrl() executes:

```
$.getJSON('http://52.38.4.3:30025/config'
```
