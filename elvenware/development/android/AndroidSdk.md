---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidSdk.md
relativePath: elvenware/development/android/AndroidSdk.md
title: AndroidSdk
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

The Android SDK
===============

##Installation with JetBrains

A slide deck on the install: [http://bit.ly/elven-android-studio](http://bit.ly/elven-android-studio)

Download Android Studio. 

On Lubuntu, you can create a link to it on the desktop by saving the following in your 

```
[Desktop Entry]
Encoding=UTF-8
Version=1.0
Name[en_US]=Android Studio
GenericName=Android SDK and IDE
Exec=/home/bcuser/bin/android-studio/bin/studio.sh
Terminal=false
Icon=/home/bcuser/bin/android-studio/bin/androidstudio.svg
Type=Application
Categories=Application;Development;
Comment[en_US]=Jetbrains Android Mobile
```

### Downloading the SDK

The following screen shots show various stages in the process of installing the SDK. You don't have to do anything during this part of the install. You should however, try to download as little as possible, as the SDK is a huge disk hog. It takes a while to complete the install, and I show you the pictures so you can see the steps on the way, and what it looks like when it has completed successfully.

![Step01][step01]
![Step02][step02]
![Step03][step03]
![Step04][step04]

## Install Specific SDK Version

This is how to configure version 19, aka known as Android SDK 4.4.2 of the SDK.

When using Cordova, by default, I was asked to target the v 19, Android 4.4.2. To get started, i typed **Android** at the command prompt (in the shell). This brought up the Android SDK Manager.

![Step05][step05]
![Step06][step06]

[step01]: https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGUUl5RnB1cThqNXc
[step02]: https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTDhYVEd6LUtWb3M
[step03]: https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGR205TE1zUi1CUU0
[step04]: https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGTVFUQVlieF9USm8
[step05]: https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGeVdEWVlPMXh5Tkk
[step06]: https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGY3BUWmE2Q0lzcFk

Installation with Eclipse
------------

For native Android development you should install Eclipse and the native
Android SDK.

On Linux, it is probably best that you run on a 32 bit version of Ubuntu
rather than, say, the Ubuntu 64 Server. I have tried to install Eclipse
and the Android SDK on 64 bit Ubuntu Server, but it ended up with a
series of gridlocked installs and error messages. The same process went
smoothly on a 32 bit system.

-   Be sure that [Java is
    installed.](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
    The
    [JRE](http://www.oracle.com/technetwork/java/javase/downloads/jre-7u2-download-1377135.html)
    will not work in all cases, so you should [get the
    JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk-7u2-download-1377129.html),
    which includes source code for the Java classes. I currently have
    the 1.7.0\_01 64 bit version.
-   You will need to [download Eclipse Classic or Eclipse for Java
    Developers](http://www.eclipse.org/downloads/). The current version
    is called Indigo, which is version 3.7.1. Older versions are called
    Helios, Galileo and Ganymede. After installation, you should see the
    Java Development Tools (JDT) when you choose**Help | About |
    Installation Details** from the Eclipse IDE.****
-   [Download the Android
    SDK.](http://developer.android.com/sdk/index.html)
-   Install the ADT.

When you launch Eclipse, you can choose **Help | Install New Software**
and click the **Add** button. Add the following URL to your repository
list:

~~~~ {.code}
https://dl-ssl.google.com/android/eclipse/
~~~~

[![ADT install, Android Development
Tools](images/EclipseAdt.png)](https://dl-ssl.google.com/android/eclipse/)

**Figure 01: Add a repository.**

On Linux, you may need an additional step. If you get an error like
"requires 'org.eclipse.wst.sse.core 0.0.0'", then add this repository:

~~~~ {.code}
http://download.eclipse.org/releases/indigo
~~~~

Where indigo might be replaced with a different word, depending on your
version of Eclipse. You don't have to install anything, just add that
item to the list of available repositories using the same dialog shown
in Figure 01. Now go back and try the install for the SDK again, it
should run smoothly this time.

On 64 bit systems, make sure the 32 bit libraries are installed:

~~~~ {.code}
sudo adp-get install ia32-libs
~~~~

After you have closed the Add Repository dialog, you ready for the
install:

[![Android ADT Developer Tools Plugin for
Eclipse](images/EclipseAdtInstallSmall.png)](images/EclipseAdtInstall.png)

**Figure 03: ADT install. Click on this image to expand it.**

If you get a warning during the install about unsigned packages, you can
ignore it.

Getting the Source for the SDK
------------------------------

Notice that the source for the SDK is available for the Android SDK 4.\*
You can set the SDK for your project to version 14 or 15 (4.00 or 4.03)
and then set the MinSDK to the version of the Android OS that is running
in the emulator or in VirtualBox. That way you can target the platform
you want yet still use the soure that you want.

More on this later.

Overview
--------

A bunch of loosely constructed components bound together by the Android
Manifest file.

-   Your First App
-   Activity
-   Service
-   Content Provider
-   Broadcast Receiver
-   Intents
-   Manifest

Your First App {#Activities}
--------------

Choose the Java Perspective in the Eclipse IDE

**File | New | Android Project**

Name your project

![Getting Started with Android](images/GetStarted01.png)

Pick a target SDK

![Pick a target SDK](images/GetStarted02.png)

Come up with a package name and minimum SDK:
**com.elvenware.firstproject**

![Package and Starting SDK](images/GetStarted03.png)

Click Finish

Activity
--------

A single screen with a user interface. You can string a series these
together to create an application. You can call other applications from
an Activity.

Service
-------

No user interface, but it does the work in the background.

Content Provider {#contentProvider}
----------------

Provides an consistent interface to retrieve/store data. It uses a
RESTful model. You can have SQL database, the file system, on the web,
etc. You can expose data to other applications or the system this way.
This means that all applications on the system knows how to query data
created by other applications or the system.

Broadcast Receiver {#broadCastReceiver}
------------------

You can listen for and respond to system wide messages. There are normal
async message, or an ordered message. The receiveer just listens for
messages, and then hands things over to services to handle the messages.

Intents
-------

These are the messages that bind applications together. So we can
explicitly call a particular screen from your own or another app. You
can standardize on a set of common **Actions.**So you could share photos
by saying "hey, I have an intent to share photos, if anyone wants one,
just ask, and I will know how to handle your request if it is in the
standard format."

You typically have a callback method that gets called after you asked
someone to subscribe to an intent.

Manifest
--------

Here you can tell what features you need, what permissions you need, and
what SDK you want to use or can use. If you specify a particular feature
in your manifest, then the market will not show your app to devices that
do not support that feature.

You are running in a multitasking environment. The system will invike
callbacks in your application, and uour app can even be killed by the
system if it runs out memory.

First the system calls either **onCreate** or **onResume**. If you get
an **onPause** call, then you should save all your data and state. When
the system comes back to you, it will call **onResume**.

Widgets
-------

It's a little window on the phone desktop that gives a peek at some data
available from an application.

A push message can be sent from the cloud that will wake up your app and
get new content, and then notify the user that someone new has come in.

Interface UI Construction {#InterfaceUiConstruction}
-------------------------

You can create everything in code, but it is usually easier to construct
the "layout" using XML. You typically have a file called main.xml. You
can have multiple layouts, for instance, you can have one for portrait
mode and another for landscape mode.

It is best to use RelativeLayout, and size with wrap\_content, and
match\_parent, and weight. This helps make things scale from small to
big machines. Use dp to get relative size pixels. Use drawable-hdpi to
put images specific to a particular resolution.

Sensors {#sersors}
-------

You can use Light, magnetic field, accelerometer and tap into them with
your code.

Publishing in the Android Market {#publishing}
--------------------------------

You want to have a developer profile and you need to pay a one time \$25
fee. You can then publish as many apploications as you want. For selling
applications, you will want a Checkout Merchant Account.

 

[http://market.android.com/publish](http://market.android.com/publish)

 

Command Line Installation of an APK {#installAPK}
-----------------------------------

To install an application from the command line:

~~~~ {.code}
adb install c:\Users\Charlie\workspace\MyTester\bin\MyTester.apk
~~~~

Though running from the IDE should update existing applications, you
may, in some circumstances, have to **uninstall** before you install.
You can go to settings on your device, choose **Applications | Manage
Applications**, scroll to your application, and remove it.

If you are attached to more than one device, you have to specify which
device you want to use. The -s argument will help in this case:

~~~~ {.code}
adb -s emulator-5554 install c:\Users\Charlie\MyTester.apk
~~~~

You can see the names of the attached devices by typing **adb devices**.

Note that you can also copy files:

~~~~ {.code}
adb push c:\temp\myfile.txt /mnt/sdcard/.
~~~~

And you can start a shell session:

~~~~ {.code}
adb shell
~~~~

Sometimes you have more than one device loaded. You can pick a
particular device like this:

    adb -s 192.168.2.12:5555 shell

Where 192.168.2.12:5555 is the name of the device that you got by typing
**adb devices**. And here I am using the **shell** command, but you can
put in some other command there such as **push**.

Strategy
--------

You should target the most recent release, but it can degrade gracefully
to go back to older versions.

SDK Manager {#sdkManager}
-----------

A lot of issues involving updating the SDK can be resolved through
running the SDK Manager:

-   On Windows: **Start | All Programs | Android SDK Tools | SDK
    Manager**
-   See Figure 1 to find the icons for starting the SDK manager inside
    Eclipse
-   You might also need to choose **Help | Update** in Eclipse

![Start SDK](images/StartSdk.png)

**Figure 1: In Eclipse, the two green icons start the SDK manager and
emulater**

The SDK can be found in a number of locations such as:

-   User\\Documents\\android-sdk
-   C:\\Program Files\\Android
-   C:\\Program Files (x86)\\Android

To start the emulator something like the following:

    C:\Program Files (x86)\Android\android-sdk\tools>emulator.exe @myadb

To run adb, you have to first start an emulator, even if you only want
to talk to your actual device and don't want to use the emulator.

As the result of a recent change, **adb** is now kept in the following
directory:

     c:\Users\Charlie\Documents\android-sdk\platform-tools directory

Links
-----

-   Go here for key information:
    [http://developer.android.com](http://developer.android.com)

 

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
