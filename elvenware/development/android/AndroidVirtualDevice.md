---
layout: page
date: 2023-05-11 08:25:53 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/AndroidVirtualDevice.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android
fileName: AndroidVirtualDevice.md
relativePath: /android/AndroidVirtualDevice.md
title: AndroidVirtualDevice
directoryName: android
category: android-guide
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

![Elvenware](/assets/images/elvenwarelogo.png)

AVD - Android Virtual Device
============================

In Eclipse, choose **Window | [AVD
Manager](http://developer.android.com/guide/developing/devices/managing-avds.html)**.

To launch from command line:

~~~~ {.prettyprint style="color: rgb(0, 112, 0);
    font-family: monospace;
    line-height: normal;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
    border-top-color: rgb(204, 204, 204);
    border-right-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-image: initial;
    background-color: rgb(255, 255, 255);
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 1em;
    margin-left: 1em;
    overflow-x: auto;
    overflow-y: auto;
    font-size: 13px;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    letter-spacing: normal;
    orphans: 2;
    text-align: -webkit-auto;
    text-indent: 0px;
    text-transform: none;
    widows: 2;
    word-spacing: 0px;
    -webkit-text-size-adjust: auto;
    -webkit-text-stroke-width: 0px; "}
    emulator -avd <avd_name>
~~~~

The emulator uses QEMU.

The home page for the [virtual
device/a\>.](http://developer.android.com/guide/developing/devices/index.html)

-   The emulator is notoriously slow, but cool. To speed it up:
    -   Use a real device instead
    -   Use Android X86 and Virtual Box instead

-   Based on QEMU (http://bellard.org/qemu)
    -   Emulation of the CPU itself
    -   ARM based (Advanced RISC Machine)

-   There are limitations:
    -   No USB, Wifi, Bluetooth
    -   Hint: Launch it, then keep it open\

[](http://developer.android.com/guide/developing/devices/index.html)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
