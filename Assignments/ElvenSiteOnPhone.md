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

```
find . -iname *.apk
adb install /platforms/android/build/outputs/apk/android-debug.apk
```

Now install it:

```
$ adb uninstall io.cordova.hellocordova
$ adb install platforms/android/build/outputs/apk/android-debug.apk
```

If you want, copy an install script like this:

```
cp ~/Git/JsObjects/Cordova/ElvenGeo/install .
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
