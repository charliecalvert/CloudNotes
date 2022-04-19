---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CordovaEventsPlugins.md
relativePath: Assignments/CordovaEventsPlugins.md
title: CordovaEventsPlugins
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: CordovaEventsPlugins.md
fileNameHTML: CordovaEventsPlugins.html
---


<!-- toc -->
<!-- tocstop -->

#Cordova Events and Plugins in Class

Main goal: Create a Cordova application that hosts our Yeoman Census application. In particular:

- Detect when you are on a mobile device
- Detect the current network status
- Ensure that the menu works on a phone. This turns out to be a no op, but won't be when working with the midterm. The second half of the jade-mixins deck has information on this subject. (It really belongs in another deck, so that information may move. It is hard to find, ask me about this issue.)


Here are some slides that contain essential information you need to complete this assignment:

Reference:  http://bit.ly/cordova-plugin
Reference: http://bit.ly/jade-mixins
Reference: http://bit.ly/elven-android-studio

## Create the Project
 
Create the angular project like this:

	mkdir Week08-InClassAngular
	cd Week08-InClassAngular
	yo angular
	 
Create the Cordova project with a command like this:
	
	cordova create Week08Cordova com.elvenware.week08cordova Week08Cordova

Be sure, however, that you use your own URL, and not one that begins com.elevenware.... Calling the project Week08Cordova is fine, I suppose, though adding your last name might be helpful. (I should have thought of that while we were in class. Don't worry about it now. More trouble than it is worth.)
 
## Use Your Custom Icons

Here is how to get the icons from the example I provided, assuming that you have JsObjects installed in the usual location. Move to the root of your project and issue the following command to copy of my custom icons:

	cp -r ~/Git/JsObjects/Cordova/CordovaResourceIcons/config .

Navigate to the **hooks** directory in you project and issue this command to copy the code that will copy the custom icons into the appropriate folder of your project:

	cp -r ~/Git/JsObjects/Cordova/CordovaResourceIcons/hooks/* .



## Test Your Angular Project

We want to make sure we can run the Angular project inside a default web browser, or even directly from disk. The issue we are concerned with here are the paths. When we start the angular project with grunt, is there some magic going on behind the scenes? Perhaps. Let's check by starting a simple, default web server and see what happens.

Type the following in the root of the Angular project:

	python3 -m http.server 30025

When we do this, we find that everything is getting loaded except the bower components. So let's fix that. In the angular directory move or copy **bower_components** int the **app** directory and then your code should work.

## Copy the Angular Project into the Cordova Project

Now that you have it working without grunt, take the contents of the **app** directory from your angular project and put it inside of the cordova **www** folder.

## Set up the Install Script

Copy the **install** script into the root of the Cordova project and edit it to match the URL found in **config.xml**.
 
	cp ~/Git/JsObjects/Cordova/CordovaResourceIcons/install .

For instance, here is my install script:

```
#! /bin/bash

cordova build android
adb uninstall com.elvenware.week08cordova
adb install platforms/android/ant-build/CordovaApp-debug.apk
```
 
## Set up your Phone
 
To enable developer mode on the phone, press Build Number about seven times. Its in the About Device/Phone section of the settings.
 
Then go to developer options on your phone and turn on USB debugging.

## Turn it in

Check into Git both the Angular and the Cordova projects. The names should be something along these lines:

- Week08Cordova
- Week08-InClassAngular 

If the names for your folders differ in any significant way from those names, please spell out those differences when you turn in the assignment. In general, taking those steps would be helpful whenever you turn in an assignment. 

> Written by [Charlie Calvert](https://www.elvenware.com/charlie/).