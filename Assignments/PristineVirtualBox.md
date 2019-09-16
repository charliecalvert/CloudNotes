## Overview

Our goal is to install [Lubuntu](https://lubuntu.me/) on VirtualBox from a custom OVA appliance. Inside the [OVA file][ova] is a compressed instance of the Linux Lubuntu distribution that I created on my home machine.

To help you understand the OVA file, consider the following sequence of events

- On my home machine I installed a Linux distribution called Lubuntu in a VirtualBox virtual machine.
- I configured this copy of Lubuntu so that it was (relatively) easy for students to use in my course.
- Then I bundled it up in an OVA file and put the OVA file on Google Drive.

You can:

- Download the OVA file
- Double click on it
- Tick the box asking to update the MAC address
  - This is a dropdown in newer versions of VBox.
  - Choose: **Generate new MAC Addresses for all network adapters**
- Watch it quickly install itself inside VirtualBox.
- For more details, see the [install](#install-pristine-lubuntu) section below, particularly the note about network error on first opening the appliance.

Once this Virtual Machine is installed, it will contain a copy of my customized version of Lubuntu Linux. You can run this OS and use it as the primary place where you do your work throughout the quarter.

## Terminology

Most people will be working in Windows and trying to install Pristine Lubuntu as a Virtual Machine Guest running inside VirtualBox. This means that:

- Your host machines is running Windows
- The guest machine you will be installing is running Linux

You may, of course, be on a Mac, or even on Linux. None of that should matter so long as you know the difference between the host machine and the guest machine. In other words, the host will usually be Windows, but could be a Mac or a Linux machine. But in this case, the Guest will always be Pristine Lubuntu.

Lubuntu is a Linux distribution. It can be the primary operating system on a computer. In other words, you could, but almost certainly should not, delete Windows and install Lubuntu in its place. But in our case, will keep the host OS the same, and use VirtualBox to run Lubuntu as a Virtual Machine (VM). The host is a "real" machine running an OS like Windows, the Guest is a Virtual Machine which in our case is running Linux.

## VirtualBox

VirtualBox should be installed on all the machines in N252. Nevertheless, before doing anything else, confirm that you have VirtualBox installed.

**NOTE**: *On the N252 school machines you may not be able to install or update VirtualBox. In that case, you can ask me for help and we can ask IT to install it. If you have Admin privileges, you may be able to install VirtualBox, but this is not always guaranteed to be a permanent solution.*

If you are working on a laptop, go here and install it:

- [Download VirtualBox (Already on N252 Computers)](https://www.virtualbox.org/wiki/Downloads)

**NOTE**: _I greatly prefer that you use the school machines rather than your laptop. I simply cannot see the text in most student laptops as it is too small. Also, you will get much, much more out of this class if you learn to use Git to move code between your laptop and school machine, rather than doing all your work on your laptop. In terms of getting a job, learning Express, React and ES6 are the most important aspects of this course. But close behind them is gaining a solid understanding of Git. In some classes, I may insist that you work on the school machine._

## Install Pristine Lubuntu {#install-pristine-lubuntu}

Once you are reasonable certain you have VirtualBox installed, then you should download the big Pristine Lubuntu OVA (virtual appliance). The link below requires a bit of patience. Select it, and determinedly click through the options until the download begins. Once this big 3 or 4 GB OVA file is downloaded, consider moving it to some save location such as your **Documents/Data** directory.

- Pristine Lubuntu 2019-09: [http://bit.ly/pristine-lubuntu-2019-09][plu1909]

The file you download should have an OVA extension.

Double click on the download once it is is completed. Alternatively, use the **File | Import Appliance** menu in VirtualBox to browse for the OVA file, and import it into VirtualBox:

- **File | Import Appliance** (Ctrl - i)


**NOTE**: _You should select the option to reinitialize the MAC address. Every machine on the Internet needs a unique Mac address or conflicts may occur when using the network. If you forgot to click this option during install, you can do it later by choosing **Settings | Network | Advanced** from the VirtualBox menu before you launch your Lubuntu VM. (If necessary, close the VM, then select this menu option.) There is a blue doo-hickey that you can click to reinitialize the address. MAC addresses are meant to be unique. The DNS servers set up by the college allocate IP addresses based on the presence of a MAC address. If two VMs have the same MAC address, then the machine that logs on first will get on the Internet, but the second machine will usually get errors when it tries to access the Internet._

After the file has been imported via the simple wizard and the MAC address is updated, select the new item in VirtualBox and choose **Start** from the menu or icon bar.

**NOTE**: _If you get an error about the network, this is usually because the network card on the system where I built the VM is different than the one on your current machine. You should be able to select all the default options to solve the problem. Just keep hitting enter, or clicking OK, or something similar, until the problem is resolved._

**NOTE**: _You may get an error about the audio system when installing the OVA. You can ignore that message._

**NOTE**: _If you get a warning about USB drivers, this usually means that the Virtual Box Extension Pack is not installed. This could be due to a mistake by the Bellevue College IS department. If you have the rights, install them from [here](https://www.virtualbox.org/wiki/Downloads). To install, just double click on the download. If all else fails, go to **Settings | USB** for your VM and turn USB off for now._

Our Pristine Lubuntu image is set up to have about 6GB of RAM. This is fine at school since we have 32 GB of memory on these machines. When using this image at home or on a laptop, however, you may need to change this setting. To do so, select **Settings | System | Motherboard | Base Memory.** Many machines have 4 GB of memory, so setting the memory to 2048 is acceptable, if a bit painful slow at times.

If you are short on memory, try not to open too many big applications at once. The big memory hogs are things like:

- Chrome or Chromium
- Firefox
- Atom
- WebStorm

You probably need at least a browser and WebStorm, so open them, and keep everything else closed. If WebStorm is proving too demanding, then choose Geany instead. It is a very good, very light weight editor. I believe, but am not sure, that Visual Studio Code is also more light-weight than WebStorm.

![Starting Lubuntu][slub]

[slub]: https://s3.amazonaws.com/bucket01.elvenware.com/images/PristineBasics00.png

- [Third Party Description of install process][tpova]

## Shutdown

Two important warnings:

- **Don't close Lubuntu by clicking the X icon at the top left or right of the VM window.** Instead, use the On/Off switch at the bottom right hand corner of the window, or choose **Logout** from the Start menu located in the bottom left of the VM window.
- Don't try to put your computer to sleep while the Lubuntu VM is running. Instead, shutdown the VM and then close your laptop or perform some other action that puts your machine into a sleep state.

It may appear at times as if you are getting away with violations of the above two rules, but eventually these bad habits will catch up with you. In particular, these actions can cause your local copy of your GitHub repository to be corrupted. Believe me, you don't want that to happen, particularly if you are new to Git.

You don't want to close your VM with cancel (X) icon any more than you want to turn off your computer by pulling its plug. Putting the machine to sleep while the VM is open should in theory work, but in practice it simply does not work very well.

**NOTE**: _Some very fast, well configured laptops with lots of memory are perhaps more forgiving when you put your machine to sleep with a VM running. That may or may not be the case for you, but please don't turn to the student next to you, who is perhaps running a much less powerful and stable machine, and tell them that there is no harm in simply closing the laptop lid without first shutting down your VM. In general, just follow my advice and shutdown your VM before putting your laptop to sleep._

## Update

It is important that you regularly update your instance of Lubuntu. Don't just ignore messages to update the OS. There is a first time for everything, but I have literally never had an update of Lubuntu put my machine in an unstable state. Or at least I cannot recall such an incident.

if JsObjects is properly installed, I have a command line script called **update-all** that will ensure that everything on your machine is up to date. Just go to a Bash window (the command line) and type **update-all** and press enter. You may get a prompt during the update, but you should be able to choose the defaults on those occasions.

On more infrequent occasions, you may also want to update your global NPM packages. Start with this command and follow the clear instructions:

```bash
ncu -g
```

The files that are being updated are stored in **~/npm**. In particular, see **~/npm/bin**.

**Note**: _The syntax **~/npm** is shorthand for **/home/bcuser/npm**._

Here are some additional commends on the techniques for updating a machine and their relative importance:

- Update your repository with git pull
  - If you don't automatically load your private key, then load it with sshadd before pulling
- Run my **update-all** script. This is my wrapper around **sudo apt-get update**, etc. To see my script do this: **cat ~/bin/update-all**. It's a short, simple script.
- Less important, but every once in a while, or whenever I suggest doing it, update JsObjects with **git pull**
- Even less important, but maybe once every week or two, check that the global npm packages are up to date with **ncu -g**

Of that list, the first two are the most important. Pulling and pushing your repo is something you should do at least once a day. I frequently do it 5 to 10 times a day.

Updating the system should probably be done once a week, but since it is easy to forget to do something like that, you might want to make it a habit, which means doing it daily. The thing to rigorously avoid is going a month or more without updating the system.

In theory, I don't update JsObjects that often, but sometimes I just seem to generate some churn so it is not a bad idea to update it from time to time. But that is only because you are in my course right now, afterward, it is not so important.

Even once a month is probably normally often enough for checking the global packages with **ncu**, but again, I have been distorting the importance of this by making frequent changes to elf-express.

## VirtualBox at Home

If you install VirtualBox at home, be sure to install both VirtualBox and the VirtualBox Extensions. Be sure that the version of VirtualBox and the version of the Virtual Box Extensions are the same.

Check VirtualBox version: **Help | About VirtualBox**

Check VirtualBox extensions:  **File | Preferences | Extensions**

They should be the same. If they are not the same, consider downloading the latest VirtualBox, which is now 6.0.6 but which could be incremented at any time. Notice that there are two links. one to the Windows (or Mac/Linux) version of VirtualBox, and one to the Extensions (which, confusingly, are different from the VirtualBox Additions.) After installing VirtualBox, be sure to also install the extensions.

If you update VirtualBox, you should be prompted to upgrade the extensions. If you are not, then download them, and install them. If you are already using the latest VirtualBox, but don't have the extensions installed, then install them. When they are both installed everything should work. If things don't work, then completely uninstall VirtualBox and try again to install both VBox and the extensions.

- [VirtualBox Downloads](https://www.virtualbox.org/wiki/Downloads)

## Out of Space

Sometimes late in the quarter we run out of disk space on our copies of Pristine Lubuntu. I keep building bigger and bigger versions of Pristine Lubuntu, but apparently, we keep finding ways to run out of space. There are ways to fix the problem.

Choose the Start (Bird) icon at the bottom left of Pristine Lubuntu. Type in Discover, which loads an application called [**Discover**](https://userbase.kde.org/Discover). Search on **Disk Usage Analyzer**. Install it. Run it. Use it to look for big files that you might have installed accidentally or that you don't need anymore.

If that does not solve the problem, then read on.

As a rule, the thing that takes up the most space on our hard drives is our **node_modules** folders. I have a script in JsObjects called delete_node_modules. it looks like this:

```nohighlighting
$ cat ~/bin/delete_node_modules   
#! /bin/bash  

find . -iname 'node_modules' ! -type l | xargs rm -rv  
find . -iname 'build' ! -type l | xargs rm -rv  
find . -iname 'bower_components' ! -type l | xargs rm -rv  
find . -iname 'bundle.js' ! -type l | xargs rm -rv  
find . -iname '*.js.map' ! -type l | xargs rm -rv
```

Run the entire command from the root of your repository or from any one folder that seems unusually big to you. It will delete node_modules and other files that are not needed except at runtime.

If you run it from the root of your repository it should free up a lot of space. But of course you will now need to run **npm install** again in any project that you want to run. You may also need to run **bower install**, depending on whether or not bower plays a role in that project.

## Trouble Shoot

Make sure you have installed the [VirtualBox Extension Pack][extpack]. To check, go to **File | Preferences | Extensions**.

Make sure [virtualization][virton] is turned on in the bios for your machine. Most machines come with the virtualization turned on, but when it is not, you usually have to go into the Bios and muck about in unsettling ways to get the matter sorted. See the link in the first sentence of this paragraph to learn how to proceed. As I say, you will likely feel a bit uncomfortable, but in the long run it is no big deal to turn it on in those infrequent cases where it is not already enabled.

I install the VirtualBox Guest Additions on the Pristine Lubuntu VM, but after updating VirtualBox itself, you may need to make sure you have the [guest additions][gadd] set up properly. If in doubt, follow the link in the previous sentence and get on top of this subject. It's important and not very complex.

A couple thoughts:

- Be sure Lubuntu is always up to date
- Be sure Windows is up to date
- Be sure VirtualBox is up to date (If not on a school machine)

Be sure everything is fresh:

- Shutdown or reboot Lubuntu regularly and before putting your machine to sleep.
- If things are whacky, shutdown Lubuntu and reboot Windows.

Check disk space and memory on both Windows and Lubuntu. On Lubuntu:

    df -h
    free -h

Again, be sure you are running the latest version of the [Guest Additions][gadd].

## Resources

Given a valid OVA file, it is usually very simple to install a Lubuntu image on VirtualBox. However, there is a lot you can do with these tools. Though you should not need this information, you still might want to see some of the things I have written about VirtualBox on Elvenware:

- [VirtualBox Linux][vbox]
- [Virtualization][virt]
- [AndroidX86 and VirtualBox][android-vbox]

## Turn it in

Create a screen shot of VirtualBox running Lubuntu as a guest OS on your system. Attach the image to your assignment when you turn it in. Normally, I expect to see the Windows desktop, then VirtualBox, and inside VirtualBox, a copy of Lubuntu.

**Note**: _Please do not embed the image in a Microsoft Word DOCX file or any other document. Simply attach the raw JPG or PNG file directly to the assignment. Sometimes I need to see details in your images, and embedding the image in a document can compress it and make it hard to see._

**Note**: _If VirtualBox has the focus on your desktop, then any keystrokes you make will go to VirtualBox, not to your Windows desktop. As a result, you can't press **Ctrl-PrtScrn** with VirtualBox focused and expect it to work the way it does when other applications have the focus. One solution is to use the Windows Snipping tool or follow one of [these suggestions][scrshot]. You can also usually create screen shots in Lubuntu and submit them. But the screen shot will be in the Lubuntu file system, not your Windows file system and won't include your Windows desktop, which I want to see in this particular assignment. Normally I don't want to see the Windows desktop when I ask for a screenshot, but this time I do._

With the possible exception of screenshots, and configuring VirtualBox itself, it is usually best to do all your work inside the VM. This includes browsing, email, downloading, etc. Just go ahead and maximize Lubuntu so that it takes up your whole screen (Right Control - F). I find it confusing to keep switching back and forth between Linux and Windows. Lubuntu is more than powerful enough to allow you to do the work for this class. It can be a little unstable at times, but if you treat it gently, it should meet your needs.

## Sanity Check

Is it working right? Try to open the bash shell, that is, try to open a terminal. There are several ways to this. Here's one:

- Start by clicking the **Start** button at the bottom left of Lubuntu Desktop.
- Select **Start | System Tools | LXTerminal**.

The two steps listed above should, in practice, look a bit like this:

![SanityCheck01][sc01]

Once you have selected the **QTerminal** menu item, your VM should look something like the image shown below. (On older versions of Lubuntu, the terminal program is called LXTerminal.)

![SanityCheck02][sc02]

We can see the Lubuntu desktop. We can see some icons. And most importantly, we can see the bash shell (the terminal) open on the right hand side of the desktop. The shell is open on the home folder. The user is **bcuser** and the machine name is **pristine2016**. What you see is probably not exactly like this, but you should at least be looking at something vaguely resembling this screen shot of the bash shell.

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

## Older Versions

Some of these older versions may still be available, but they are probably well out of date:

- Pristine Lubuntu 2019-03: [http://bit.ly/plu-2019-03][plu1903]
  - Our default, preferred version. If in doubt, select this version.
  - Based on Lubuntu 18.10
- Pristine Lubuntu 2018-09: [http://bit.ly/pristine-lubuntu-2018-09][plu1809]
  - Based on Lubuntu 18.04
- Pristine Lubuntu 2018-04: [http://bit.ly/plubuntu-2018-04-03][plu1804]


<!--       -->
<!-- links -->
<!--       -->

[android-vbox]: /android-guide/Androidx86.shtml
[extpack]: https://www.virtualbox.org/wiki/Downloads
[gadd]: /os-guide/linux/VirtualBox.html/VirtualBox.html#guest

[ova]: https://www.google.com/search?q=ova+files

[plu1804]: http://bit.ly/plubuntu-2018-04-03
[plu1809]: http://bit.ly/pristine-lubuntu-2018-09
[plu1903]: http://bit.ly/plu-2019-03
[plu1909]: http://bit.ly/pristine-lubuntu-2019-09

[sc01]: https://s3.amazonaws.com/bucket01.elvenware.com/images/PristineBasics01.png
[sc02]: https://s3.amazonaws.com/bucket01.elvenware.com/images/PristineBasics02.png

[tpova]: https://www.maketecheasier.com/import-export-ova-files-in-virtualbox/
[virton]: http://google.com/search?q=intel+virtualization+bios

[vbox]: /os-guide/linux/VirtualBox.html
[virt]: /cloud-guide/Virtualization.html

[scrshot]: http://www.google.com/search?q=windows+screen+capture
