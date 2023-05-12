---
layout: page
date: 2023-05-11 08:25:53 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/Introduction.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android
fileName: Introduction.md
relativePath: /android/Introduction.md
title: Introduction
directoryName: android
category : css-guide
---

Toggle Menu

Charlie Calvert on Elvenware
============================

Writing Code and Prose on Computers
-----------------------------------

Menu
----

Core Code
---------

-   [Strongly Typed](../index.html)
-   [Web & Scripts](../web/index.html)
-   [Cloud](../cloud/index.shtml)

OS and Tools
------------

-   [OS](../../os/index.html)
-   [Database](../database/index.html)
-   [My Writing](../../books/index.html)

Art
---

-   [Poems & Photos](../../Art/index.html)
-   [Book Reviews](../../books/reading/index.html)
-   [Spiritual](../../spirit/index.html)

Links
-----

-   [My Links](../../links.html)
-   [Falafel](http://www.falafel.com/)
-   [Sourceforge](http://sourceforge.net/projects/elvenware/)

![Elvenware](../../images/elvenwarelogo.png)

Introduction to Android Development
===================================

This is the introduction to the Elvenware pages covering
[Android](http://www.android.com/)
[development](http://developer.android.com/index.html). You have landed
on a site for computer science students and developers; if you have an
interest in just learning to use your Android phone, you should probably
look elsewhere. These pages were designed for the students of Bellevue
College, but if you are developer you might also find them interesting
or helpful.

### The Android Ecosystem

There are 170+ Android devices available in over 100 countries. They
ship over 350,000 devices a day, so that's about 2 million a week. A
year ago it was 60,000 a day, so it is growing very quickly.

Android development is typically done in Java, using the Eclipse IDE in
conjunction with the Android SDK. In the next pages of this site we will
discuss how to install these tools.

Android is developed by a team at Google. Get to know that team. Read
their blogs, watch their videos. 

### Understanding the Terrain

If you are interested in targeting multiple platforms such as Android,
IPhone and Windows Phone 7, then you should see the section below on
PhoneGap. If you don't have an Android phone, but want to develop for
the Android, you should see the section below on Android-x86. 

There are wide variety of tools and platforms.

-   Android: Java on Dalvik
-   iOS: Objective C
-   Windows Mobile 7: Silverlight (with some XNA)
-   Blackberry: Java
-   WebOS: HTML5

The increasingly powerful HTML 5 platform runs on all of them.

### The rate of Change on Mobile Devices

One of the reasons to use the Android SDK rather than HTML 5 involves
the rapid evolution of technology on phones and other small devices.
HTML 5 evolves very slowly, and cannot track the rapid emergence of new
hardware features. For that, you need to use the Android SDK and similar
tools.

Here is a chronology of the emergence of new technologies on mobile
devices over the last few years:

-   2007: Multitouch, accelerometers, microsphone
-   2008: video, compass, background apps
-   2009: Bluetooth, multiple screen sizes
-   2010: Gyroscopes, front facing cameras
-   2011: Barometer, NFC, tables, USB accessories.

NOTE: A development platform called PhoneGap helps to bridge the gap
between HTML 5 and the Android hardware platform.

To learn more about the Android platform from a user's perspective, see
this page:

[/charlie/os/android/index.html](/charlie/os/android/index.html)

What is Android?
----------------

Android is an open source operating system that runs on small devices.
It is built on top of Linux and runs a VM called Dalvik, similar to the
Java VM, but optimized for speed. There are also a series of libraries
usually built in C++.

-   From top to bottom, the stack looks like this:
    -   Applications written in Java
    -   A framework called the [Android
        SDK](http://developer.android.com/reference/android/widget/package-summary.html)
    -   C++ Libraries and the Dalvik Virtual Machine
    -   Linux

[![System Architecture from Wikimedia
Commons](images/systemArchitectureSmall.png)](images/SystemArchitecture.jpg)

**Figure 01: Applications and the SDK on top, then C++ libraries and
then Dalvik Runtime, and finally the Linux kernel.**

### The Android SDK

-   A framework for developing applications
    -   Like the .NET Framework
    -   Patterns you can use
    -   APIs you can call to access key features of Android

-   Some Key Features (Explained Later)
    -   Activities, Views, Resources, Intents
    -   Content Providers
    -   Animation, Telephone, Camera, Graphics

### Linux

-   File IO
-   Process Management
-   Drivers for
    -   Display
    -   Camera, Audio, Video
    -   Keypad
    -   WiFi and other networking resources
    -   Interprocess Communication

What is Dalvik?
---------------

The applications we build for Android are run on top of something called
the Dalvik Virtual Machine. This is a [Process Virtual
Machine](http://en.wikipedia.org/wiki/Virtual_machine#Process_virtual_machines),
like the Java Virtual Machine or the .NET Runtime. These tools needs to
be understood in contrast to the System Virtual Machines, which run an
entire OS, like the Windows XP Mode in Windows 7, like Virtual PC, and
like a hypervisor.

What Next?
----------

Now that you understand something about the Android landscape, the next
subjects to tackle are Eclipse and the Android SDK. Eclipse is the IDE
we use for Android development, the Android SDK provides programmatic
access to the Android platform.

To learn how to install these tools, use the Android SDK link found in
the [index](index.html). Once you have Eclipse and the SDK installed,
then come back to this page and read about creating a new project or
importing or existing project. Links to other important subjects are
included on this page.

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
