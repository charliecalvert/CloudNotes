---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/UsbDebugging.md
relativePath: elvenware/development/android/UsbDebugging.md
title: UsbDebugging
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: UsbDebugging.md
fileNameHTML: UsbDebugging.html
---

<!-- toc -->
<!-- tocstop -->

Debugging
---------

Various subjects related to debugging are covered here.

-   [Enable USB Debugging on your Phone](#usb)
-   [Logging and LogCat](AndroidLogging.html)
-   [Traceview](#traceview)
-   [Breakpoint](#breakpoint)
-   [Links](#links)

## Setup your Phone for ADB {#setup-phone}

The goal is to be able to plug your phone into your computer using a USB cable, then type **adb devices** and see your phone. In this section we will discuss how to do this.

To get started, enable developer mode on your phone. To do this, go to the About Device/Phone section of the settings for your phone. Press **Build Number** about seven times. Now you can see the developer options and turn on USB Debugging. At this point, you may need to disconnect and reconnect your phone. You should see a dialog on your phone allowing you to confirm that you trust the computer.

When you are done for the day, go to developer options on your phone and turn off USB debugging. It is not a good idea to leave this on when you are wandering around public areas, as it is a security risk.

Okay. The Developer Options are turned on, and you know to turn them off at the end of a session. The next step is to get your computer to recognize the phone. This involves one or two steps, depending on your circumstances:

- Get the right drivers installed.
- If you are using VirtualBox, ensure that you can see USB devices in the host operating system.

If you are running Ubuntu as your primary operating system, then you should be able to simply plug in your phone to your computer and it should work. In other words, the correct drivers are already installed, or were installed by one of the steps you took when installing and setting up the Android SDK. However, many of us do not run Ubuntu directly on the metal, and instead are working in Windows, or in VirtualBox inside Windows.

Enable USB debugging on Your Phone or Tablet {#usb}
--------------------------------------------

On Windows, you should be able to plug in your phone, then go through a fairly long, but automate, device setup. Once this is completed, then you should be able to reach your phone using ADB from Windows. Sometimes installing Samsung software called Kies has helped me get the correct drivers installed.

When you use a USB cable to plug your phone into your PC for the first
time, Windows will attempt to load Drivers. Here is the screen I got
when I first plugged in my driver: 

![The error I got when I first plugged in the
Galaxy](images/InstallGalaxy.png)

My device is a Galaxy Tab 10.1, a tablet. It's model number is GT-P7510,
so that is what I see at the top of the window. As you can see, the
first two drivers installed correctly, but the second two did not. In my
case, I went to the Samsung site and [downloaded something called
Kies](http://www.samsung.com/us/support/downloads/GT-P7510MAVXAB), which
fixed the problem. During the Kies install, I believe my GT-P7510
drivers were also updated, so I'm not sure exactly which part fixed
what.

Once I had everything set up correctly, this is what I see on Windows
when I plugged in my phone:

![Plug in Galaxy Tab](images/PlugInGalaxy.png)

 OVI is software that I had installed to use with my old phone; it's
presence here is not significant. The point, however, is that I can open
the device and view files. In other words, I can see the drive of my
phone from the Windows Explorer in Windows 7:

![Windows Explorer viewing Galaxy Tab Hard
Drive](images/PlugInGalaxyWinExplorer.png)

**Figure 02: In this screen shot of the Windows Explorer, you can see
the drives on my Windows 7 machine on the left, and the folders on my
Galaxy tab on the right.**

Here is my Device Manager, showing the ADB (Android Debugging) tools for
the Galaxy, so I can debug from Eclipse:

![Device Manager Debug ADB](images/PlugInGalaxyDebug.png)

You can launch the Device manager from this page: **Control Panel |
System and Security | System**

## VirtualBox

Now that things are setup in Windows, the next step is to be able to see the device from inside VirtualBox.

Perhaps it is not necessary, but I would begin by closing your Lubuntu or Ubuntu VM. Go to the interface for VirtualBox, select your VM, and choose **Settings | USB**. On the right are a number of doo-hickeys. Choose the icon with the green + on it. The text associated with the icon says something like "Adds a new USB filter with all fields" filled in correctly. You should be able to see your phone. Select it.

Plug in your phone, or disconnect and replug in your phone. Open your VM. Open the bash shell. Type **adb devices** and hope for the best. If this fails, try unplugging your phone and plugging it in a second time. If this fails, try messing around with the options discussed above. Try rebooting everything, even the host OS.

### On Your Device, Turn on Debugging

You have to turn on USB Debugging:

**Settings | Applications | Development | USB Debugging**

Emulator
--------

There is trouble with the renderer in the emulator. There is a way to
save state (snapshot) with the emulator so that it starts faster. Don't
close the emulator after you open it. The problem in part is in the GL
library, the graphics library, which is slow because we are emulating an
ARM machine on a PC architecture.

You just have to get used to have the Emulator running at all times. It
just sits there on your desktop, part of your world.

Debugging directly on a real device is much faster, as is working with
Android X86 in VirtualBox.

Traceview
---------

Where you can see complete stack traces when things go wrong.

TraceView is integrated into Eclipse, and it does profiling of
applications. There are Memory Management tools for Android Apps. 

Breakpoints {#breakpoint}
-----------

You can set a breakpoint by right clicking in the gutter at the left of
the IDE and choosing **Toggle Breakpoint.**The shortcut is
**Ctrl-Shift-B**. At this stage, you might also choose to switch to the
Debug Perspective, either by clicking the button in the upper right
corner of the IDE, or by choosing **Window | Open Perspective.**

When you run, choose the little bug icon rather than the green arrow
icon on the toolbar at the top center of the IDE. The option is also on
the Run menu and the shortcut is F11. When you get to your breakpoint,
your application will freeze, and you can turn to the idea and start
stepping through your code with F6 (step over) and F5 (step into).

Links {#links}
-----

[How to Enable USB Debugging on your Android
Phone](http://www.groovypost.com/howto/mobile/how-to-enable-usb-debugging-android-phone/)

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
