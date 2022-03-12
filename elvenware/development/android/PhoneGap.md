---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/PhoneGap.md
relativePath: elvenware/development/android/PhoneGap.md
title: PhoneGap
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

# Cordova/PhoneGap

This document is under constructions as Cordova/PhoneGap have changed quite a bit.

PhoneGap is a tool that allows you to target various phones, including
Android, IPhone, Windows Phone 7, Blackberry, Symbion and WebOS.

## Keys to the Guide

Click these links to find discussions of key parts of the PhoneGap development process:

-   [Setup PhoneGap](PhoneGap-Setup.html)
-   [Customize the Cordova Create Script](PhoneGap-Storage.html)
-   [Create PhoneGap Project](PhoneGap-Storage.html)
-   [Run PhoneGap Project](PhoneGap-End.html)

## Additional Details
 
To effectively use PhoneGap, you will need Eclipse, the Android SDK and
the ADT plugin for Eclipse. If you don't have these tools installed
already, descriptions and links for these tools are described later in
this paragraph. Your first, step, then, will be to go to the

- [PhoneGap](http://www.phonegap.com) page.
- [Download](http://phonegap.com/download-thankyou) PhoneGap.

*Cordova is the name for the open source version of PhoneGap. Because PhoneGap is a widely known name, we will probably hear that name the most often. But from a developers point of view, there are few significant differences between PhoneGap and Cordova, and it is the Cordova source and documents that will often be the most important to us. PhoneGap was bought by Adobe in 2011. Since Cordova is open source, this is really a non-issue for most developers. Hopefully Adobe's deep pockets will help increase the popularity of Cordova, and help finance its development, but otherwise, there should be no significant impact. I'm not, of course, clairvoyant or able to predict the future, but that is my guess as to how things will pan out.*

Navigate to the [Get Started Guide](http://phonegap.com/start) and
choose the platform you want to target. In our case, it will likely be
[Android](http://phonegap.com/start#android). The description of how to
get started is included on the page you selected. There is even a
[video](http://www.youtube.com/v/MzcIcyBYJMA?autoplay=1) to help step
you through the process. I include my own take on the subject below, and
show how a script that can make the process much simpler for you.

Don't forget to copy create a res/xml directory, and move the
**plugins.xml**and **phonegap.xml** into it. Without this step, I got
the following error:

```{.code}
android.content.res.Resources$NotFoundException: Resource ID #0x0
```

-   The PhoneGap [tutorials](http://wiki.phonegap.com/w/page/35502422/Documentation-Directory)
    directory.
-   The PhoneGap [wiki](http://wiki.phonegap.com/w/page/16494772/FrontPage).
-   The [JavaScript Documentation](http://docs.phonegap.com/en/1.3.0/index.html)
-   Get ADB [connected to your device](http://www.elvenware.com/charlie/development/android/Androidx86.shtml#network40).

## Plugins with Angular {#angular-plugin}

You may have a problem with the **deviceReady** event never being firing because the plugin(s) are not installed properly. In other words, these lines at the bottom of **index.html** may not working right:


```
document.addEventListener('deviceready', function onDeviceReady() {
    angular.bootstrap(document, ['statesApp']);
}, false);
```


**NOTE**: *The **deviceReady** code won't work in a browser. This means you can have difficulties if you want to preview your app before installing it on AndroidX86 or a phone. The problem, of course, is that the deviceReady event will never fire in a browser since we are not installed in a device. Given the code above, this means that angular will never load, and hence main.html and about.html, etc. will never load. One fix would be to comment out those lines and restore the ng-app statement on the body tag near the top of the HTML file.*

I fixed the plugins problem by doing this:

- Completely delete platforms
- Completely delete plugins
- Running a script that installed the platform and the plugins. The script might look something like this:

```
	#! /bin/bash

	rm -r platforms
	rm -r plugins

	cordova platform add android
	cordova plugin add org.apache.cordova.network-information
```

It follows that we don't want to check in the plugins folder at all. Probably the best solution is to add plugins to your repository wide .gitignore file. Don't worry about having checked in plugins on one or two projects, but we do want to fix this issue going forward.
