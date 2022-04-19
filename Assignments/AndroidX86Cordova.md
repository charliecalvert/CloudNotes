---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/AndroidX86Cordova.md
relativePath: Assignments/AndroidX86Cordova.md
title: AndroidX86Cordova
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: AndroidX86Cordova.md
fileNameHTML: AndroidX86Cordova.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The goal of this assignment is to get a simple, default, Android Cordova application running on your phone or on an AndroidX86 build.
Preliminaries. Be sure the following installed:

```bash
sudo apt-get install lib32stdc++6
sudo apt-get install lib32z1
```

In general, when doing development, it can also be useful to install the C++ compiler, though it is probably not essential to this process. In particular, if you get an error saying that **make** is missing, then install **build-essential**:

```
sudo apt-get install build-essential
```

## Keyboard Shortcuts

- Screen goes black. Use the **Context Menu Key**. The key to the left of the **Right-Control** key on most machines.
- Capture the mouse: The little widget in the VirtualBox menu. It works the opposite of the way you would suspect.
- Release the mouse: **Right-Control** once.
- Quit: **Right Control - Q**

More info is [here](http://www.coolcomputing.com/article.php?sid=4636)

## Setup


This should already have been done for you. But if you ever need to do it:

- In the old days, we could download the Android SDK. Not Android Studio, just the SDK. These aren't the old days. So download Android Studio instead.

	- [https://developer.android.com/studio/index.html#downloads][wgasdk]

- Download the zip file
- Unzip so that android-studio is in your home directory.
- cd android-studio/bin/
- Then start it: **./studio.sh &**

When install the Android SDK, install the smallest amount possible. They are in league with various hard drive manufacturers and are trying to find ways to force you to buy a third 5 TB of storage.

This might work:

```
wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip
```

Now you can start the Android Manager:

```
android
```

[wgasdk]: https://developer.android.com/studio/index.html#downloads
[sdk-direct]: https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip

## Android SDK

The following is done inside the Android Manager, launched in the previous section. The goal is install the Android API verison 23.

**Note**: _The version of the Android API that you need can change over time, but if you need to get version 24 or 22 instead of 23, it should not be too difficult to adapt these instructions to help you achieve that goal. Also note that the big danger here is installing way more than you need. Gigabyte upon gigabyte more than you need. Install as little as possible._

Install Android API 23 by doing the following:

- First un-check all Android 6.0 (API 23)

Then be sure the following is already installed:

- Android SDK Tools (Already installed)

Now prepare to add the following items by placing a check in front of them:

- Android SDK Platform-Tools
- Android SDK Build Tools
- Check Android 6.0 (API 23)
	- SDK Platform
- Extras: Android Support Library

Now select the **Install Five Packages** button. You may get an error about failing to stop the ADB server. Since ADB is probably not yet installed, this error is expected, and you can ignore.

## Create a project

Go to your repository and do the following

```bash
cordova create Week01-CordovaStarter
cd Week01-CordovaStarter
cordova platform add android
cordova build android
```

If Cordova is unknown, then do this:

```
npm install -g cordova
```

## Build Failed

If your build fails like this:

```bash
:CordovaLib:processDebugResources FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':CordovaLib:processDebugResources'.
> java.io.IOException: Cannot run program "/home/bcuser/Android/Sdk/build-tools/22.0.1/aapt": error=2, No such file or directory
```

You might be able to fix it with these commands, which were mentioned earlier:

```bash
sudo apt-get install lib32stdc++6
sudo apt-get install lib32z1
```

## Connect ADB

To connect to your Android X86, do the following:

- **adb connect [YOUR IP from netcfg]**

**NOTE**: _We use the **netcfg** command on AndroidX86 in order to see the IP address of the device. In particular, go to the application page and run the **Terminal Emulator**. All this is described in more depth in the [AndroidX86Install][axinstall] assignment._

Suppose the IP address you found in the terminal on AndroidX86 was 192.168.1.2. Then you would type this on your Linux box to establish the connection:

```
adb connect 192.168.1.2
```

To confirm that it worked, you can can ask **adb** to display your connections:

<pre>
adb devices
</pre>

For instance, here is a sample run of both **adb connect** and **adb devices**:

```
charlie@forestpath:~/temp/Week01-Foo
$ adb connect 192.168.2.33
connected to 192.168.2.33:5555
charlie@forestpath:~/temp/Week01-Foo
$ adb devices
List of devices attached
192.168.2.33:5555	device
```

[axinstall]:http://www.ccalvert.net/books/CloudNotes/Assignments/AndroidX86Install.html#log-in

## Install

To install:

```
adb install [YOUR APK file]
```

A bit like this, perhaps:

```
$ adb install platforms/android/build/outputs/apk/android-debug.apk
10208 KB/s (1822587 bytes in 0.174s)
	pkg: /data/local/tmp/android-debug.apk
Success
```

**NOTE**: _An APK file contains your project. You can think of an APK file as an executable, as a program. It is really just a compressed file with your project inside it. If you install "Google Drive" on your phone, or if you install a computer game on your phone, then you are installing an APK file. The game comes in an APK file and your app comes in an APK file._

To uninstall your project:

- **adb uninstall [URL of your APP from config.xml in project root]**

Perhaps something like this:

```
$ adb uninstall io.cordova.hellocordova
Success
```

You must uninstall an existing APK before you try to update it. In other words, you can't copy your APK file over an existing APK file on a phone or on AndroidX86. Instead, you first uninstall it, then install your updated copy.

## Edit

Edit the H1 element in **www/index.html** to include your last name. Rebuild the application and reinstall it.

## Push to Your Repository

This part of the assignment is optional for now. If you have not done so already, create a private repository on BitBucket or Github.

Use this naming scheme:

- isit322-lastname-2016

Push your work to the repository.

Information on SSH is here:

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#sshKeys>

Be sure to share the repository with me. I'm ccalvert on BitBucket and charliecalvert on GitHub.


## Turn it in

Submit a screen shot of your Cordova project running in Androidx86 inside VirtualBox.

Be sure that:

- Your name is visible in the application in the H1 tag of your **www/index.html** file.
- The **DEVICE IS READY** bar is green.
- The VirtualBox chrome is visible. For instance, the words **Oracle VM VirtualBox** should appear at the top, and the icons near the words **Right Ctrl** (or the MAC/Linux equivalent host key) are visible on the bottom.

Here is the body of index.html, with the place where I want to see your name called out in square brackets:
```html
    <body>
        <div class="app">
            <h1>[YOUR NAME GOES HERE]</h1>
            <div id="deviceready" class="blink">
                <p class="event listening">Connecting to Device</p>
                <p class="event received">Device is Ready</p>
            </div>
        </div>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
    </body>
```

![AndroidX86Cordrova](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGb3BKVmdtMG5XZVU)

You need not write APACHE YOURNAME. It can be YOURNAME CORDOVA or whatever (within reason) strikes your fancy, so long as it is in the H1 tag and it contains your name.



## Hint

Commands to remember:

- cordova create Week01-Test com.lastname.test_lastname IsitTestCalvert
- cordova platform add android
- cordova build android
- adb uninstall io.cordova.hellocordova
- adb install platforms/android/build/outputs/apk/android-debug.apk

For instance:

- cordova create Week01Test com.elvenware.test_calvert IsitTestCalvert
- cordova create [Directory] [URL] [Name]

## Install Script

If you save the following in the root of your project folder as **install**, then you should be able to automate this process:

<pre>#! /bin/bash

cordova build android
adb uninstall io.cordova.hellocordova
adb install platforms/android/build/outputs/apk/android-debug.apk
</pre>

Then make it executable:

<pre>chmod +x install</pre>

To run it, type this:

<pre>./install</pre>

We'll discuss in class on Monday.

## Use Phone

To try using your phone instead of AndroidX86, see this

- <http://www.elvenware.com/charlie/development/android/UsbDebugging.html>

## Older Notes

This is outdated. Ignore it:
- Decompress the archive with a command similar to this:
	- **tar xvfz android-sdk_r24.4.1-linux.tgz**
- Move the archive to the ~/Android directory
	- **mkdir ~/Android**
	-  **mv android-sdk-linux/ ~/Android/Sdk**
