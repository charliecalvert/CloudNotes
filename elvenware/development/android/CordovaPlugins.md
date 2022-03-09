---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/CordovaPlugins.md
relativePath: elvenware/development/android/CordovaPlugins.md
title: CordovaPlugins
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

## Overview

Many of the scripts discussed in this document are found here:

- <https://github.com/charliecalvert/JsObjects/tree/master/Utilities/CordovaTools>

## Names

There are many applications installed on my phone. If I install your application,
I want to be able to find it easily. Therefore, I may ask that your projects begin 
with the the class name such as **prog272_final_lastName** or **prog272_final_lastName**. For instance:

    cordova create Week12Final com.lastname.final_lastname Prog272FinalLastName
    cordova create Week12Final com.lastname.final_lastname Isit322FinalLastName
    
If, by chance, you need to rename your project, do it like this:

- Open config.xml. 
- Change the url and name for your project. 

Suppose your **config.xml** begins like this:

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.elvenware.elven-foo" 
    version="0.0.1" 
    xmlns="http://www.w3.org/ns/widgets" 
    xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Foo</name>
```

Change it to bar:

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.elvenware.elven-bar" 
    version="0.0.1" 
    xmlns="http://www.w3.org/ns/widgets" 
    xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Bar</name>
```

Notice that changes were made both on the second and last lines quoted in this code excerpt.

Then run the script shown below:

```
    #! /bin/bash
    
    # If we have renamed our project in config.xml, then this script
    # makes sure the change is propogated throughout the project.
    
    LINK_DIR=platforms/android
    
    if [ -d "$LINK_DIR" ]; then 
      if [ -L "$LINK_DIR" ]; then
        # Symbolic link specific commands
        rm "$LINK_DIR"
      else
        # Directory commands    
        cordova platform remove android
      fi
    fi
    
    cordova platform add android
    
```

The above is probably overkill, in that it is unlikely our android directory
will be a symbolic link. But I include the check just in case....

## Geo

This is the [ElvenGeo][elfGeo] project found on **JsObjects** in the **Cordova** folder.

<img class="small" src="https://drive.google.com/uc?id=0B25UTAlOfPRGWkJVMXJvQWhjSDA" alt="ElvenGeo">

Here is the repository for the plugin used in the **ElvenGeo** project:

    https://github.com/apache/cordova-plugin-geolocation

Here is the command to install from the repository:

    cordova plugin add http://github.com/apache/cordova-plugin-geolocation.git

Note that the following lines are added to **platforms/AndroidManifest.xml** when you
install the plugin:


```
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

These lines are not optional. If the permissions are not present in the manifest, then
the app won't run properly.

When you install something on a phone from the
Play Store, you are told what permissions an app has, and given the choice of
whether or not you want to install it. These lines define the permmissions
for our app. We are never, however, asked to grant the permissions because
we are installing with **adb**, not with the Play Store. If, however, we 
put our app on the Play Store, then users would automatically be asked about
these permissions. 

[elfGeo]:https://github.com/charliecalvert/JsObjects/tree/master/Cordova/ElvenGeo

Assuming you are already to connected to your device with **adb**, then you
can install the **ElvenGeo** project on your phone by running the **install**
script found in the root of the project. The key commands are these:

```
cordova build android
adb install platforms/android/ant-build/CordovaApp-debug.apk
```

## Is My Phone Attached {#phone-connect}

Use the command **adb devices** to see if your phone is attached:

```
$ adb devices
List of devices attached 
e8e5bc06	   device
```


## Install Script

It should look something like this:

```
    #! /bin/bash
    
    cordova build android
    adb uninstall com.elvenware.foo
    adb install platforms/android/ant-build/CordovaApp-debug.apk
```

Remember to check in config.xml, found in the root of your project folder,
for the exact URL to pass in when calling **adb uninstall**. Here is the
relevant part of config.xml:

```
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.elvenware.foo" 
    version="0.0.1" 
    xmlns="http://www.w3.org/ns/widgets" 
    xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Foo</name>
    etc....
```

When run from the root directory of your project, the following 
python script should build **install** automatically. It will use
regular expressions to parse the contents of of **config.xml**, 
find the proper URL, and use it in the script you generate:

```
#! /usr/bin/python3
# author: Charlie Calvert

import re

hand = open('config.xml')
for line in hand:
    line = line.rstrip()
    x = re.findall('<widget id="([^"]*)', line)
    if len(x) > 0:
        print('#! /bin/bash\n')        
        print('cordova build android')
        print('adb uninstall ' + x[0])
        print('adb install platforms/android/ant-build/CordovaApp-debug.apk\n')

```

You might save this file as **~/bin/GetCordovaUrl**. Then make it executable:

    chmod +x ~/bin/GetCordovaUrl
    
Then navigate to the root folder for your project and use it like this:

    GetCordovaUrl > install    

Now you can run **install**

    chmod +x install
    ./install

## Bower

There is no set rule for how to configure bower. Remember, however,
that you probably want to either place your bower.json file in the
**www** folder, or else place it in your root, and set up a **.bowerrc**
file that looks like this:

```
{
  "directory": "www/bower_components"
}
```

The point is that you want your bower components in **www**, not in your
project root. This is because the HTML files in your project are run from
**www** and not from your project root.

## Set up Custom Icons {#custom-icons}

You can set up custom icons for your application by copying the necessary
files from **JsObjects/Cordova/CordovaResourceIcons**:

```
cp -r ~/Git/JsObjects/Cordova/CordovaResourceIcons/config .
cp -r ~/Git/JsObjects/Cordova/CordovaResourceIcons/hooks/after_platform_add/ hooks/.
cp -r ~/Git/JsObjects/Cordova/CordovaResourceIcons/hooks/after_platform_ls/ hooks/.
```
   
Here is a shell script that issues the above commands:

```
#! /bin/bash

# Copy Charlie's default Cordova icons into the current project.
# Run this script from the root of your project.
# After running the script, replace my icons with your own.
# NOTE: JSOBJECTS is set in .bash_aliases and should 
# resolve to ~/Git/JsObjects

RES_ICONS=$JSOBJECTS/Cordova/CordovaResourceIcons

cp -r $RES_ICONS/config .
cp -r $RES_ICONS/hooks/after_platform_add/ hooks/.
cp -r $RES_ICONS/hooks/after_platform_ls/ hooks/.
```    

After copying the icons into place, you can install them by typing

    cordova platform ls
    
If you install them before you running **cordova platform add android** then
they will be installed automatically at that point. You could also modify
the scripts in the hooks directory to copy the icons from another location.

