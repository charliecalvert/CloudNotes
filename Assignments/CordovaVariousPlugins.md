---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CordovaVariousPlugins.md
relativePath: Assignments/CordovaVariousPlugins.md
title: CordovaVariousPlugins
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: CordovaVariousPlugins.md
fileNameHTML: CordovaVariousPlugins.html
---


<!-- toc -->
<!-- tocstop -->

# Various Cordova Plugins

The goal of this assignment is to learn about Cordova Plugins. There are also
some advanced sections that discuss integrating these plugins into a single
applications based on our final.

## Step One: ElvenGeo

Create the ElvenGeo project described here:

- [ElvenGeo](http://www.ccalvert.net/development/android/CordovaPlugin.html#geo)

Modify the name of the project so that the title at the top of the home screen
says **Lastname-Geo** instead of **Elven-Geo**. Submit a screen shot of your 
application running on your phone or on AndroidX86 in VirtualBox.

<img class="small" src="https://drive.google.com/uc?id=0B25UTAlOfPRGWkJVMXJvQWhjSDA" alt="ElvenGeo">

## Step Two: CordovaPhoneCall

Install the **CordovaPhoneCall** application. Change the name shown at the top
of the main screen from **Elven Phone** to **LastName Phone**, where LastName 
is your last name. Submit screenshots of it running
on your Phone or on AndroidX86 in VirtualBox.

![ElvenPhone](https://drive.google.com/uc?id=0B25UTAlOfPRGSTNzbHgzRDRBbHc)

## Step Three: Cordova Various Plugins

Install the **CordovaVariousPlugins** application. Change the name shown at the top
of the main screen from **Elven Various** to **LastName Various**, where LastName 
is your last name. Submit screenshots of it running on your Phone or on AndroidX86 
in VirtualBox.

![ElvenVarious](https://drive.google.com/uc?id=0B25UTAlOfPRGdXZjN3dBdDRoRHc)

## Step Four: Extra Credit

As advanced work and for extra credit, integrate as many of the standalone Cordova 
applications reviewed above as you can into your Midterm/Final project. Each one 
should have its own Page and own menu item, preferrably in their own dropdown
menu called **Plugins**:

- Plugins
    - ElvenGeo
    - ElvenVarious
    - ElvenPhone

Use the scripts from **JsObjects/Utilities/CordovaTools**

Put **plugins** in your **.gitignore**. Save the code to set up plugins in **SetupPlugins**:

```
#! /bin/bash

cordova plugin add org.apache.cordova.camera
cordova plugin add org.apache.cordova.vibration
```

Code in non-angular app{

```
elf.Control=(function() {

    function Control() {
        elf.utilities.showMessage('Control loaded');
        $('#buttonHome').load('ButtonHome.html', function() {
            $('#vibrate').click(vibrate);
            $('#photo').click(photo);
        });
    }

    function vibrate() {
        elf.utilities.showMessage('Vibrate');
        navigator.vibrate(1000);
    }


    function photo() {
        elf.utilities.showMessage('Photo');
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('elfImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }

    return Control;

})();

$(document).ready(function() {
    new elf.Control();
});
```

So how do we move it over? Try it first with scope methods, and then
with controllerAs.

Buttons in non-angular app:

```
<div>
    <button id="vibrate">Vibrate</button>
</div>
<div>
    <button id="photo">Photo</button>
</div>

```

Buttons in Angular App:

```
<div>
    <button ng-click="vibrate()">Vibrate</button>
</div>
<div>
    <button ng-click="photo()">Photo</button>
</div>
```


No **ng-app** because we using **angular.bootstrap()** to create the app.

Don't forget near bottom of index.html:

```
<script src="scripts/controllers/Plugins/PluginVarious.js"></script>
<script type="text/javascript" src="cordova.js"></script>

<!-- endbuild -->

    <script type="text/javascript">
        document.addEventListener('deviceready', function onDeviceReady() {
            angular.bootstrap(document, ['statesApp']);
        }, false);
    </script>

```

## Turn it in

To complete this assignment, create three screenshots, one for each application.
Attach these screen shots to your Final submission. 

The screen shots should look similar to the ones shown above, but I should see 
your name in the title instead of the word Elven. For instance, **LastName Geo**, 
**LastName Various**, **LastName Phone**,  where **LastName** is your last name.

The programs may not work correctly in VirtualBox, depending a little on
the machine that hosts the VirtualBox VM. This does not matter. I just want
to see the programs running, and your name in them. 

Check in your version of the code.

## Tips

Don't forget to use:

- chrome://inspect
- python3 -m http.server 30025

Both ways to debug application. See the slides.

If you want to change the name of the APK file you create, read this tip:

- <http://stackoverflow.com/a/13157188/253576>