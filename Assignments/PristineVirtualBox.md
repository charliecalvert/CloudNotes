## Overview

The goal of this assignment is to install Lubuntu on VirtualBox from a custom OVA appliance. Inside the OVA file is a compressed instance of the Linux Lubuntu distribution that I created on my home machine.

To help you understand the OVA file, consider the following sequence of events

- On my home machine I installed a Linux distribution called Lubuntu in a VirtualBox virtual machine.
- I configured this copy of Lubuntu so that it was (relatively) easy for students to use in my course.
- Then I bundled it up in an OVA file and put the OVA file on Google Drive.

You can:

- Download the OVA file
- Double click on it
- Tick the box asking to update the MAC address
- And then watch it quickly install itself inside VirtualBox.
- For more details, see the [install](#install-pristine-lubuntu) section below, particularly the note about network error on first opening the appliance.

Once this Virtual Machine is installed, it will contain a copy of my customized version of Lubuntu Linux. You can run this OS and use it as the primary place where you do work throughout the quarter.

## Terminology

Most people will be working in Windows and trying to install Pristine Lubuntu into a Virtual Machine. This means that:

- Your host machines is running Windows
- The guest machine you will be installing is running Linux

You may, of course, be on a Mac, or even on Linux. None of that should matter so long as you know the difference between the host machine and the guest machine.

## VirtualBox

VirtualBox should be installed on all the machines in N252. Nevertheless, before doing anything else, confirm that you have VirtualBox installed and updated. If you are working on a laptop, go here and install it:

- [Download VirtualBox (Already on N252 Computers)](https://www.virtualbox.org/wiki/Downloads)

**NOTE**: _I greatly prefer that you use the school machines rather than your laptop. I simply cannot see the text in most student laptops as it is too small. Also, you will get much, much more out of this class if you learn to use Git to move code between your laptop and school machine, rather than doing all your work on your laptop. In terms of getting a job, learning React and ES6 are the most important aspects of this course. But close behind them is gaining a solid understanding of Git._

**NOTE**: *On the N252 school machines you may not be able to install or update VirtualBox. In that case, you can ask me for help and we can ask IT to install it. If you have Admin privileges, you may be able to install VirtualBox, but this is not always guaranteed to be a permanent solution.*

## Install Pristine Lubuntu {#install-pristine-lubuntu}

Once you are reasonable certain you have the **most recent** obtainable copy of VirtualBox installed, then you should download the big Pristine Lubuntu OVA (virtual appliance). The link below requires a bit of patience. Select it, and determinedly click through the options until the download begins. Once this big 3 GB OVA file is downloaded, consider moving it to some save location such as your **Documents/Data** directory.

- Pristine Lubuntu 2019-03: [http://bit.ly/plu-2019-03][plu1903]
  - Our default, preferred version
  - Based on Lubuntu 18.10
- Pristine Lubuntu 2018-09: [http://bit.ly/pristine-lubuntu-2018-09][plu1809]
  - Based on Lubuntu 18.04
- Pristine Lubuntu 2018-04: [http://bit.ly/plubuntu-2018-04-03][plu1804]

The file you download should have an OVA extension.

Double click on the download once it is is completed. Alternatively, use the **File | Import Appliance** menu in VirtualBox to browse for the OVA file, and import it into VirtualBox:

- **File | Import Appliance** (Ctrl - i)


**NOTE**: _You should select the option to reinitialize the MAC address. Every machine on the Internet needs a unique Mac address or conflicts may occur when using the network. If you forgot to click this option during install, you can do it later by choosing **Settings | Network | Advanced** from the VirtualBox menu before you launch your Lubuntu VM. (If necessary, close the VM, then select this menu option.) There is a blue doo-hickey that you can click to reinitialize the address. MAC addresses are meant to be unique. The DNS servers set up by the college allocate IP addresses based on the presence of a MAC address. If two VMs have the same MAC address, then the machine that logs on first will get on the Internet, but the second machine will usually get errors when it tries to access the Internet._

After the file has been imported via the simple wizard, select the new item in VirtualBox and choose **Start** from the menu or icon bar.

**NOTE**: _If you get an error about the network, this is usually because the network card on the system where I built the VM is different than the one on your current machine. You should be able to select all the default options to solve the problem. Just keep hitting enter, or clicking OK, or something similar, until the problem is resolved._

**NOTE**: _You may get an error about the audio system when installing the OVA. You can ignore that message. If you get an error about the network card, just click the supplied link and accept the defaults._

**NOTE**: _If you get a warning about USB drivers, this usually means that the Virtual Box Extension Pack is not installed. This could be due to a mistake by the Bellevue College IS department. If you have the rights, install them from [here](https://www.virtualbox.org/wiki/Downloads). To install, just double click on the download. If all else fails, go to **Settings | USB** for your VM and turn USB off for now._

Our Pristine Lubuntu image is set up to have about 6GB of RAM. This is fine at school since we have 32 GB of memory on these machines. When using this image at home or on a laptop, however, you may need to change this setting. To do so, select **Settings | System | Motherboard | Base Memory.** Many machines have 4 GB of memory, so setting the memory to 2048 is acceptable, if a bit painful slow at times.

![Starting Lubuntu][slub]

[slub]: https://s3.amazonaws.com/bucket01.elvenware.com/images/PristineBasics00.png

## Shutdown

Two important warnings:

- Don't close Lubuntu by clicking the **X** icon at the top left or right of the VM window. Instead, use the On/Off switch at the bottom right hand corner of the window, or choose **Logout** from the Start menu located in the bottom left of the VM window.
- Don't try to put your computer to sleep while the Lubuntu VM is running. Instead, shutdown the VM and then close your laptop or perform some other action that puts your machine into a sleep state.

It may appear at times as if you are getting away with violations of the above two rules, but eventually these bad habits will catch up with you. In particular, these actions can cause your local copy of your GitHub repository to be corrupted. Believe me, you don't want that to happen, particularly if you are new to Git.

You don't want to close your VM with cancel (X) icon any more than you want to turn off your computer by pulling its plug. Putting the machine to sleep while the VM is open should in theory work, but in practice it simply does not work very well.

**NOTE**: _Some very fast, well configured laptops with lots of memory are perhaps more forgiving when you put your machine to sleep with a VM running. That may or may not be the case for you, but please don't turn to the student next to you, who is perhaps running a much less powerful and stable machine, and tell them that there is no harm in simply closing the laptop lid without first shutting down your VM. In general, just follow my advice and shutdown your VM before putting your laptop to sleep._

## Update

It is important that you regularly update your instance of Lubuntu. Don't just ignore messages to update the OS. There is a first time for everything, but I have literally never had an update of Lubuntu put my machine in an unstable state. Or at least I cannot recall such an incident.

if JsObjects is probably installed, I have a command line script called **update-all** that will ensure that everything on your machine is up to date.

On more infrequent occasions, you may also want to update your global NPM packages. Start with this command and follow the clear instructions:

```bash
ncu -g
```

The files that are being updated are stored in **~/npm**. In particular, see **~/npm/bin**.

## Trouble Shoot

Make sure you have installed the [VirtualBox Extension Pack][extpack]. To check, go to **File | Preferences | Extensions**.

[extpack]: https://www.virtualbox.org/wiki/Downloads

Make sure [virtualization][virton] is turned on in the bios for your machine.

I install the VirtualBox Guest Additions on the Pristine Lubuntu VM, but after updating VirtualBox itself, you may need to make sure you have the [guest additions][gadd] set up properly.

A couple thoughts:

- Be sure Lubuntu is always up to date
- Be sure Windows is up to date
- Be sure VirtualBox is up to date (If not on school machine)

Be sure everything is fresh:

- Shutdown or reboot Lubuntu regularly and before putting machine to sleep.
- If things are whacky, reboot Windows.

Check disk space and memory on both Windows and Lubuntu. On Lubuntu:

    df -h
    free -h

Make sure you are running the latest version of the [Guest Additions][gadd].

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

**Note**: _If VirtualBox has the focus on your desktop, then any keystrokes you make will go to VirtualBox, not to your Windows desktop. As a result, you can't press **Ctrl-PrtScrn** with VirtualBox focused and expect it to work the way it does when other applications have the focus. One solution is to use the Windows Snipping tool or follow one of [these suggestions][scrshot]. You can also usually create screen shots in Lubuntu and submit them. But the screen shot will be in the Lubuntu file system, not your Windows file system._

[scrshot]: http://www.google.com/search?q=windows+screen+capture

With the possible exception of screenshots, and configuring VirtualBox itself, it is usually best to do all your work inside the VM. This includes browsing, email, downloading, etc. Just go ahead and maximize Lubuntu so that it takes up your whole screen (Right Control - F). I find it confusing to keep switching back and forth between Linux and Windows. Lubuntu is more than powerful enough to allow you to perform the operations you need to perform in this class. It can be a little unstable at times, but if you treat it gently, it should meet your needs.

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

## Memory

I have been setting the base memory for our VM's too low. Instead of setting to 2048 MB, let's try setting it to 4096 MB (4 GB) or even 6144 (6 GB).

**NOTE**: *I'm talking about the settings for our school machine, which has 32 GB total memory. Using up 4 GB for our VM is not excessive on such a machine. On your laptop and home machine, however, 2 GB might be the right number, depending on how much memory is available on your machine.*

To see the memory:

- Close your VM
- In VirtualBox, select **Settings | System | Motherboard | Base Memory**. Set it to 4096.
- Restart your VM, open the bash shell, type **free -h**. You should see about 3.9 GB available.

Throughout the day, you may want to monitor your memory usage with any of the following commands:

- free -h

<!--       -->
<!-- links -->
<!--       -->

[plu1804]: http://bit.ly/plubuntu-2018-04-03
[plu1809]: http://bit.ly/pristine-lubuntu-2018-09
[plu1903]: http://bit.ly/plu-2019-03
