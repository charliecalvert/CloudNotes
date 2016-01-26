## Overview

Install Lubuntu on VirtualBox from a custom OVA appliance. This is a copy of Lubuntu that I installed on my machine, and then configured so that it was (relatively) easy for students in my course to use.

Most people will be working in Windows and trying to install Pristine Lubuntu into a Virtual Machine. This means that:

- Your host machines is running Windows
- The guest machine you will be installing is running Linux

You may, of course, be on a Mac, or even on Linux. None of that should matter so long as you know the difference between the host machine and the guest machine.

## Get Started

Before doing anything else, confirm that you have VirtualBox installed and updated. If it is not installed, go here and install it:

- [Download VirtualBox](https://www.virtualbox.org/wiki/Downloads)

**NOTE**: *In some cases, you may not be able to update VirtualBox. This happens frequently, for instance, in N252. In that case, you may be stuck or you can ask me for help, which I may or may not able to supply.*

Once you are reasonable certain you have the **most recent** obtainable copy of VirtualBox installed, then you should download the big Pristine Lubuntu OVA (virtual appliance):

- [Download the 3 GB Pristine Lubuntu 2016 v03][pristine-2016-03]

[pristine-2016-03]: https://drive.google.com/file/d/0B25UTAlOfPRGOGV1dFN4SnBscW8/view?usp=sharing

The file you download should have an OVA extension.

Double click on the download once it is is completed. Alternatively choose the following, browse for the downloaded file, and import it into VirtualBox:

- **File | Import Appliance** (Ctrl - i)

After the file has been imported via the simple wizard, select the new item in VirtualBox and choose **Start** from the menu or icon bar.

![Staring Lubuntu][slub]

[slub]: https://s3.amazonaws.com/bucket01.elvenware.com/images/PristineBasics00.png

## Trouble Shoot

Make sure you have installed the [VirtualBox Extension Pack][extpack]. To check, go to **File | Preferences | Extensions**.

[extpack]: https://www.virtualbox.org/wiki/Downloads

Make sure [virtualization][virton] is turned on in the bios for your machine.

Make sure you have the [guest additions][gadd] set up properly.

[gadd]: http://www.elvenware.com/charlie/os/linux/VirtualBox.html#guest
[virton]: http://google.com/search?q=intel+virtualization+bios

## Resources

Given a valid OVA file, it is usually very simple to install a Lubuntu image on VirtualBox. However, there is a lot you can do with these tools. Though you should not need this information, you still might want to see some of the things I have written about VirtualBox on Elvenware:

- [VirtualBox Linux][vbox]
- [Virtualization][virt]
- [AndroidX86 and VirtualBox][android-vbox]

[vbox]: http://www.elvenware.com/charlie/os/linux/VirtualBox.html
[virt]: http://www.elvenware.com/charlie/development/cloud/virtualization.html
[android-vbox]: http://www.elvenware.com/charlie/development/android/Androidx86.shtml

## Turn it in

Create a screen shot of VirtualBox running Lubuntu as a guest OS on your system. Attach the image to your assignment when you turn it in. Normally, I expect to see the Windows desktop, then VirtualBox, and inside VirtualBox, a copy of Lubuntu.

**Note**: *If VirtualBox has the focus on your desktop, then any keystrokes you make will go to VirtualBox, not to your Windows desktop. As a result, you can't press **Ctrl-PrtScrn** with VirtualBox focused and expect it to work the way it does when other applications have the focus. One solution is to use the Windows Snipping tool or follow one of [these suggestions][scrshot]. You can also usually create screen shots in Lubuntu and submit them. But the screen shot will be in the Lubuntu file system, not your Windows file system.*

[scrshot]: http://www.google.com/search?q=windows+screen+capture

## Sanity Check

Is it working right? Try to open the bash shell, that is, try to open a terminal. There are several ways to this. Here's one:

- Start by clicking the **Start** button at the bottom left of Lubuntu Desktop.
- Select **Start | System Tools | LXTerminal**.

The two steps listed above should, in practice, look a bit like this:

![SanityCheck01][sc01]

Once you have selected the **LXTerminal** menu item, your VM should look something like the image shown below. We can see the Lubuntu desktop. We can see some icons. And most importantly, we can see the bash shell (the terminal) open on the right hand side of the desktop. The shell is open on the home folder. The user is **bcuser** and the machine name is **pristine2016**. What you see is probably not exactly like this, but you should at least be looking at something vaguely resembling this screen shot of the bash shell.

![SanityCheck02][sc02]

[sc01]: https://s3.amazonaws.com/bucket01.elvenware.com/images/PristineBasics01.png
[sc02]: https://s3.amazonaws.com/bucket01.elvenware.com/images/PristineBasics02.png

## Hints

Choose **Settings | System | Acceleration** and confirm that **VT-x | AMD-V** is selected. You can confirm this at run time by selecting **Machine | System Info**. If you don't have virtualization help from the processor then your VM will either be very slow, or not work at all. In the screen shot shown below, I'm not running Pristine Lubuntu. In this screenshot, I just want to show you the Session Information dialog, not the Lubuntu desktop. In your assignment, however, I want to see your instance of Pristine Lubuntu running. In other words, don't use the picture below as a guide. Your picture should look quite different from this.

![vtx](https://s3.amazonaws.com/bucket01.elvenware.com/images/VirtualBoxVtxInfoAndroid.png)
