## Overview

Install AndroidX86 into VirtualBox. Most students will perform this task in Windows, then use VirtualBox to run AndroidX86 on your Windows desktop.

## Download
Download Pristine Android from the link below. This is an OVA file. I also provide a link to an ISO if you want to play with that for a bit, but I recommend the OVA.

- [Pristine Android 4.4 OVA File][pa]
- [Android ISO 4.4][ai]

[pa]:https://drive.google.com/file/d/0B25UTAlOfPRGVC1BSGpIc25LT3c/view?usp=sharing
[ai]:https://drive.google.com/file/d/0B25UTAlOfPRGRjRtUlVOczVWNHc/view?usp=sharing

The download is fairly large, so Google might want you to click on various buttons or links for a bit. Just forge ahead and click away until something finally downloads.

## Install

After downloading the OVA, you can double click it to launch it in VirtualBox. Or, if you prefer, choose **File | Import Appliance** and browse for your OVA file. It is probably best if you ask the system to reinitialize the MAC address, but this doesn't seem to be a necessity.

Start the Android X86 VM by pressing the green run button in VirtualBox.

## Log in

After Android X86 boots, get started by making sure that **Input | Mouse Integration** is turned off. Click on the screen and turn off the option that keeps showing the same warning over and over. Your mouse will now be trapped inside AndroidX86, which is what you want. To release it, press the Right Control key.

Skip the Wi-Fi setup. Select any options necessary to convince Google that you really want to skip it.

Sign in to your Google Account, and again clicking anything necessary to convince Google you really want to sign in.

After you are signed in, click as many blue buttons as you can find until Google finally lets you get some work done.

Click the grid at the bottom of the Android X86 screen to view the Apps. Select terminal emulator. On the top right is a menu. Use it to set the font to something much bigger than 10 PX.

Type **netcfg** and note your IP address.

## Black Screen

At some point, the screen might time out and go completely black. To fix that, choose the **Context Menu Button** on your keyboard. It is usually to the left of your Right CTRL button.

## Turn it in

Provide screen shots of:

- Android home screen running on your desktop.
- Android App View
- The Google Drive App

Let's skip the Google Docs shared document part of this assignment. It is no longer necessary.

## Hints

As always, choose **Settings | System | Acceleration** and confirm that **VT-x | AMD-V** is selected. You can confirm this at run time by selecting **Machine | System Info**. If you don't have virtualization help from the processor then your VM will either be very slow, or not work at all.

![vtx](https://s3.amazonaws.com/bucket01.elvenware.com/images/VirtualBoxVtxInfoAndroid.png)
