# AndroidX86 Cordova


## Setup

This should already have been done for you. But if you ever need to do it:

- Download the Android SDK. Not Android Studio, just the SDK.
- Decompress the archive with a command similar to this:
	- **tar xvfz android-sdk_r24.4.1-linux.tgz**
- Move the archive to the ~/Android directory
	- **mkdir ~/Android**
	-  **mv android-sdk-linux/ ~/Android/Sdk**

Now you can start the Android Manager:

```
android
```

Install Android API 22 by doing the following:

- First un-check all Android 6.0 (API 23)

Then be sure the following is already installed:

- Android SDK Tools (Already installed)

Now prepare to add the following items by placing a check in front of them:

- Android SDK Platform-Tools
- Android SDK Build Tools
- Check Android 5.1.1 (API 22) 
	- SDK Platform
	- Google APIs (Optional?)
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

## Build Failed

If your build fails like this:

```bash
:CordovaLib:processDebugResources FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':CordovaLib:processDebugResources'.
> java.io.IOException: Cannot run program "/home/bcuser/Android/Sdk/build-tools/22.0.1/aapt": error=2, No such file or directory
```

You might be able to fix it with these commands: 

```bash
sudo apt-get install lib32stdc++6
sudo apt-get install lib32z1
```

## Connect ADB

To connect to your Android X86, do the following:

- **adb connect [YOUR IP from netcfg]**

To see your connections:

- **adb devices**

For instance:

```
charlie@forestpath:~/temp/Week01-Foo
$ adb connect 192.168.2.33
connected to 192.168.2.33:5555
charlie@forestpath:~/temp/Week01-Foo
$ adb devices
List of devices attached
192.168.2.33:5555	device
```

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

To uninstall:

- **adb uninstall [URL of your APP from config.xml in project root]**

Perhaps something like this:

```
$ adb uninstall io.cordova.hellocordova
Success
```

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