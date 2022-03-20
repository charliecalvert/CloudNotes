---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/VirtualBox.md
relativePath: elvenware/os/linux/VirtualBox.md
title: VirtualBox
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: VirtualBox.md
fileNameHTML: VirtualBox.html
---

<!-- toc -->
<!-- tocstop -->

## Overview

Herein some tips on using [Oractle's VirtualBox](https://www.virtualbox.org/),
a tool for running system virtual machines. I use it for running Windows,
Linux and Android virtually. If you have never used VirtualBox before, you
might want to visit the virtualization page in the Cloud section of this site:

-   [General Information on VirtualBox](/cloud-guide/virtualization.html)

Other Elvenware pages about VirtualBox:

-   [Android X86 and VirtualBox](/android-guide/Androidx86.shtml)
-   [Cloud Virtualization](/cloud-guide/virtualization.html)


## Install VirtualBox

Installing VirtualBox is easy.  First go to the VirtualBox web site:

* [VirtualBox Home Page][vbox-home]

Download the most recent version of VirtualBox. Follows the prompts to complete the install. You can accept all the defaults.

Also install the VirtualBox Extension Pack. The download links are also on the VirtualBox home page, just below the links to the main install package.

[vbox-home]:https://www.virtualbox.org/wiki/Downloads

Install Linux in VirtualBox
---------------------------

There are two ways to install Linux on VirtualBox:

- The preferred technique is to download an OVA file and [import it into VirtualBox][impvirt].
- A more difficult, but also more flexible technique is to install Linux from an ISO file. You can download these ISO files from the Ubuntu or the Lubuntu web site. There are other distros, such as Mint, that also create ISO files that can be used with VirtualBox.

In my classes we almost always use Lubuntu because it requires few system resources. I usually supply students with a pre-built OVA file that contains much of the software we use in class.

[impvirt]:/cloud-guide/virtualization.html#importing-an-appliance


## Install from an ISO file

Virtual Box Videos you might find useful:

-   [Install Android](http://www.youtube.com/watch?v=LNgkRhsgzIc&feature=youtu.be)
-   [Install Linux Server](http://www.youtube.com/watch?v=ACj-Y6cZRNg&feature=relmfu)

As mentioned earlier, Linux is less resource instensive than Windows. I
can boot to the logon screen of the latest Ubuntu desktop (11.10) in
about 16 seconds, and can be up and running in a responsive desktop in
about 25 seconds. The install takes up about 2.8 GB of disk space. If I
install a more minimal command line server edition, I'm at the Ubuntu
server command line login prompt in 11 or 12 seconds. The server install
required 631 MB of harddrive space. Unless your machine is very
underspowered, I would still go with the desktop, at least at first. If
you have real performance issues, you can try the server install,
outlined below. But remember, the default command line interface for the
server  is much harder to use than the desktop GUI interface.

[![Linux in VirtualBox][vbeasm08]][vbea08]

**Figure 08: VirtualBox hosting Ubuntu 11.10 desktop on Windows 7.**

I'm going to ask you to do this two times:

[Download](http://www.ubuntu.com/download) Ubuntu desktop from
[their site](http://www.ubuntu.com/). Alternatively,
[download Lubuntu](http://www.lubuntu.net/), which works better on
underpowered machines. Run the install, much as you did with Android
x86. Here is how to proceed:

-   *If you are on a school machine in N252: Rename any existing VMs
    called N252 to something else like N252-Android-01*
-   *School Machines: Call your new VM: N252*
-   Memory -- 2048
-   Create a Virtual Hard Drive Now
    -   Hard Drive Type: VDI
    -   Storage: Dynamically Allocated
    -   File Size: 16.00 GB

-   From the VirtualBox menu, choose **Settings | Storage.**Select
    **Controller: IDE | Add CD/DVD Device**
-   Choose Disk and browse for ubuntu-12.04.1-desktop-i386.iso or any
    newer version that is released. (I see that today, 11/07/2012, there
    is a new version of Ubuntu numbered 12.20. You should download it,
    as it is usually best to have the latest and greatest.
-   You can right click and remove the Empty Controller
-   Click OK
-   _If on the School Machine double click the SetVBoxNIC script found
    on your desktop\School Machine: In **Settings | Network**, check to see if you
    have Bridged Adapter and a MAC address starting with many zeroes._
-   It may take some time, and you might see an error or two that you
    can probably ignore, but eventually you will see the Ubuntu Welcome
    Screen
-   Choose: Install Ubuntu
-   Choose Downloads updates while installed and optionally install the
    MP3 decoder.
-   Choose Erase Disk and install Ubuntu.
-   You should automatically select SCSI1 (0,0,0)(sda)-17.2 GB ATA VBOX
    HARDDISK or similar
-   Use the entire disk
-   Choose Los Angelos as your location (Assuming you are on the West
    Coast)
-   Keyboard Layout: English
-   Enter your name, a computer name, a username and password

The Minimal Server Install for Underpowered Machines {#minimalInstall}
----------------------------------------------------

**NOTE**: I have recently taken a second set of screen shots for the
install of Ubuntu Server 12.10. Look at the next section to see these
screen shots.

Most users should install the Ubuntu desktop, as it is quite fast. But
if you have a very underpowered machine, or if you want a small image
for quick cloning and updating, or if you just prefer the server, then
here is how to install it.

**Note**: _If you are using Ubuntu on EC2, then you are probably already
familiar with the server version. The main distinction to note, of
course, is that the Desktop version has a GUI front end, while the
server version is, at least by default, command line only. This is done
primarily for security reasons: the command line is simply much harder
to hack than the GUI. However, if you are open up a terminal Window in
the Desktop version, then you are, for all practical purposes, at the
server command line. The desktop version is simply the server with a GUI
front end. There are no fundamental differences in the architecture of
the two releases. To put it another way, everything that you can do at
the server command prompt you can also do at the desktop command prompt,
and vice versa._

[Download the Server](http://www.ubuntu.com/download/server/download) cd
from the Ubuntu site. Set everything up as you did with Android, except
choose 512MB for your memory and make the virtual hard drive 2 GB, or 1
GB if you really want to save space.

When you get to the first log in screen press escape to make the prompt
for English go away. Then press F4 and choose **Install a Minimal
System**. (The option to install a minimal virtual system worked for me
with the Server 10.04 LTS, but not with the most recent build. We should
probably use the latest bits, so choose Install a Minimal System.)

![Server Install Small][vbeasm09]

**Figure 9: Choose Install minimal system, and don't select minimal
virtual machine. On my system, minimal virtual machine caused errors
though ymmv.**

You will then be taken through a series of prompts about the keyboard.
Just keep choosing USA. You will be prompted for a server name, which is
pretty much up to you. I named mine **Tiny**. 

You will then be asked about your time zone. If you are on the network,
which you should be by this time in the install, then it should properly
guess your location.

[![Small Time Check][vbeasm10]](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid10.png)

**Figure 10: Confirm the time.**

When you come to the screen about Partitioning disks, choose **Guided -
use entire disk.**

[![Guided install][vbeasm11]](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid11.png)

**Figure 11: Choose Partition disks.**

Make sure you are working with you XX GB ATA VBOX HARDDISK and choose
Guided partitioning. Just keep accepting the default values. When it
asks if you want to write changes to disk, choose yes.

You will reach a screen called **Installing the base system.** That
process will take a few minutes, and then you will be asked to enter
your full name, then a user name, then a password.

I did not choose to encrypt my home directory, and I needed no proxy
information.

The next step is called **Configure apt**, which is a Linux installer
and configuration tool that works from the command line. I choose not to
accept automatic updates. At the software selection page, I choose to
install nothing more, since I want this to be an absolutely minimal
install. You need not make such a spartan selection. If you are an
expert at the Linux install, then you can choose Manualpackage
selection. I just tabbed down to the Continue button.

[![Small Packaged Selection][vbeasm12]](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid12.png)

Because you have apt installed, you will be able to install more
software later, so this is not quite as drastic a step as it might at
first seem. (Also, it is possible that the "Basic Ubuntu Server" option
is a bug, and should not be visible on the screen.)

I choose to install GRUB. Then they asked me to reboot. The ISO file was
removed automatically, and a few seconds later I was at the command
prompt, signing in.

## Ubuntu Server 12.10 Install {#server1210Install}

![Ubuntu Server Install Step 01](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-01.png)

![Ubuntu Server Install Step 02](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-02.png)

![Ubuntu Server Install Step 03](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-03.png)

![Ubuntu Server Install Step 04](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-04.png)

Figure 0X: If the install can't set up your DHCP server, then you have a
serious problem. Stop everything, and go back and think about DHCP.

![Ubuntu Server Install Step 05](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-05.png)

Figure 0X: Pick a name for your server. Since you will possibly be
installing multiple VirtualBox hosted server VMs, it is often a good
idea to pick a name you like, then number each VM instance, 01, 02, etc.
Since this is first server VM installed on this physical machine, I'm
numbering it 01. If I install a second VM with Ubuntu Server, I'll
number it 02, etc.

![Ubuntu Server Install Step 06](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-06.png)

Figure 0X: You should, of course, enter your own name. This is not where
you are picking your user name. This is where you enter your full name,
if you want to do that. In the next step, my first name is used by
default as my user name.

![Ubuntu Server Install Step 07](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-07.png)

Figure 0X: Using LVM can be a mistake when installing to a physical
drive. Perhaps in this case it is not quite so dire, but I am playing it
safe and skipping the LVM. If you are interested, there is a good deal
of documentation of LVMs on the web. It is a nice feature, but not
needed here.

![Ubuntu Server Install Step 08](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-08.png)

Figure 0X: In the screen before this one, you had a chance to pick only
one partition, which is called VBOXxxxx. Really, nothing can go wrong on
this step, but I'm showing you this screen shot just to reassure you.

 

![Ubuntu Server Install Step 09](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-09.png)

![Ubuntu Server Install Step 10](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterServer1210-10.png)

## Ubuntu Mini Install {#minimal}

The Ubuntu Mini distributions just gives you a small, core set of files.
This means your download size is very small, about 1/10 the size of the
regular download. It then allows you to decide what flavor of
installation you want. Do you want server? Do you desktop? How about
Lubuntu? And so on. It is up to you. Of course, the rest of the files
will then be downloaded during the install, but on balance, this ends up
being faster. This is particularly true for corporate or educational
desktops that put you through a rigorous scanning process whenever you
download anything.

Here is the download site:

    shttps://help.ubuntu.com/community/Installation/MinimalCD/

The install is the same as for the server, which is shown above. The
only difference is in the software selection screen, which is shown
below.

![Ubuntu Mini Software Selection Screen View01](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterMini1210-01.png)

**Figure 0X: Ubuntu Mini Software Selection Screen View First Half**

![Ubuntu Mini Software Selection Screen View Continued](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/UbunterMini1210-02.png)

**Figure 0X: Ubuntu Mini Software Selection Screen View Continued**

Notice that you are given a wide range of selection, including Kubuntu,
Edubuntu KDE, Lubuntu minimal, etc.

## Install Guest Additions {#guest}

The [VirtualBox Guest Additions](https://www.virtualbox.org/manual/ch04.html) provide better integration between your host OS (usually Windows) and your Guest VM (usually Linux). For instance, they help support:

- [Shared clipboard](#shareClipboard).
- Better video support, especially for full screen.
- Seamless mouse support
- Shared folders
- Shared properties (for instance VBoxManage.exe guestproperty enumerate "LubuntuMongo")

If you are running Ubuntu or Lubuntu desktop inside VirtualBox, one of the first things you want to do is install or update the Guest Additions. From the menu choose: **Devices | Insert Guest Additions CD Image**. If you get an error, that probably means the virtual CD was already inserted into the virtual machine that is running Lubuntu.

-   Make sure **gcc** and **make** are installed and up to date: **sudo apt-get install make gcc**
-   Choose **Devices | Install Guest Addtions** from the menu, or press
    **Host + D**.
-   Navigate to **/media/$USER/VBOX_GAs_X.X.XX**
  - Here **X.X.XX** differs depending on your version of VirtualBox
-   Type: **sudo ./VBoxLinuxAdditions.run** to update the Guest Additions.

Here are the commands as they appeared on my system:

```code
cd /media/$USER
ll
cd VBox_GAs_5.2.18/
ll
sudo ./VBoxLinuxAdditions.run
```

I keep listing out the directory because you might not be logged in as **bcuser** and because you might have a different version of VBox installed.

This is a perhaps an overly verbose look at the same process on my system, but this time you can see the listings:

```code
bcuser@pl-1903:~$
$ cd /media/$USER
bcuser@pl-1903:/media/bcuser$
$ ll
total 11
drwxr-x---+ 3 root   root   4096 Apr 13 15:52 ./
drwxr-xr-x  3 root   root   4096 Mar 23 16:02 ../
dr-xr-xr-x  6 bcuser bcuser 2226 Aug 14  2018 VBox_GAs_5.2.18/
bcuser@pl-1903:/media/bcuser$
$ cd VBox_GAs_5.2.18/
bcuser@pl-1903:/media/bcuser/VBox_GAs_5.2.18$
$ ll
total 49685
dr-xr-xr-x  6 bcuser bcuser     2226 Aug 14  2018 ./
// FILES FROM THE LISTING OMITTED HERE
-r-xr-xr-x  1 bcuser bcuser  7321038 Aug 14  2018 VBoxLinuxAdditions.run*
// FILES FROM THE LISTING OMITTED HERE
bcuser@pl-1903:/media/bcuser/VBox_GAs_5.2.18$
$ sudo ./VBoxLinuxAdditions.run
```

When you are done, reboot the Lubuntu VM. Now when you can go into full screen mode the Linux desktop should fill your entire screen, as if you had booted directly into Linux. (Switch to full screen mode by pressing Right-Ctrl-F.) If you are not in full screen mode, and you resize your Linux window, now your VM desktop should stretch to fit the window. In general, having the latest Guest Additions can solve a host of problems and ensure that your system runs as smoothly as possible.

## Other methods for Working with the Guest Additions {#other-guest}

These methods are not recommended, but here they are nonetheless. Use the method in the previous section.

As of VirtualBox 4.1.14, the below may not be necessary. It seems as if
we now only need to select Install Guest Editions from the menu and they
should be installed automatically, though a reboot is still necessary
after the installation completes.

There are several ways to install the guest additions. Here is one:

1. Run this command: **apt-get install dkms build-essential linux-headers-generic**
1. Reboot the system: **sudo shutdown -r now**
1. From the VirtualBox menu at the top of your VM, choose **Devices | Insert Guest Additions CD image**.
1. Navigate to your **/media/$USERNAME/VBOXADDITIONS_XXX** folder. This folder should have been created during the previous step.
1. For instance: **/media/bcuser/VBOXADDITIONS_5.0.18_106667**
1. Execute this file: **VBoxLinuxAdditions.run**. Like this **sudo ./VBoxLinuxAdditions.run**.
1. After the program completes, you should reboot: **sudo shutdown -r now**

Here is another solution that works in Lubuntu:

1. Open Software Updater.
2. Click the Additional Drivers tab in Software & Updates.
3. Select "Using x86 virtualization solution - guest addition module source for dkms from virtualbox-guest-dkms (proprietary)".
4. Click Apply Changes.

Nevertheless, I will keep the steps
outlined below in this document in case someone finds them helpful,
perhaps because they are working with an older version of VirtualBox.

- [Install Guest Additions Video](http://youtu.be/QQ_FyMFzk1s)


## The VirtualBox Additions on Ubuntu Server {#guestserver}

I have used these instructions not only on server, but the lubuntu
desktop. So they might work if some of the more manual installs don't
work.

Be sure that gcc is installed:


```bash
apt-get install dkms build-essential linux-headers-generic
```

Then I used the Device menu to insert the VBox additions. Navigate to the virtual box directory. To do this, type the following, then press tab to complete the proper string:

```bash
cd /media/bcuser/VBOXADDITIONS_
```

And finally, I was able to run VBox additions install

```bash
sudo sh VBoxLinuxAdditions-x86.run
```

Or run the amd64 additions if that is appropriate.

You may have to reboot, but at this stage, you should be able to run
[OpenBox](XWinOpenBox.html), press Ctrl-F, and enter Full Screen mode.

## Share Clipboard {#shareClipboard}


If you have Linux installed in a VirtualBox VM you can can share the clipboard
between Windows and Linux. This means you can cut and paste between
Windows and Linux.

In the VirtualBox Manager, choose **Settings** for your Linux VM. Go to
the **General | Advanced** page. See the **Shared Clipboard** to
**Bidirectional**. Press OK. Now you can cut and paste between Windows
and Linux.

(You may need to install the Guest Additions before this will work?)

![Set up shared clipboard](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/SharedClipboard01.png)

## Dual Screen Mode {#dualscreen}


If you have multiple monitors on your system, you will probably want to
take advantage of them both. With Ubuntu Desktop and VirtualBox, this is
easy.

-   Before launching Linux, open Settings in VirtualBox for your VM and
    turn to the Display page.
-   Increase the amount of memory given to the video set up to at least
    20 MB.
-   Set the number of monitors you want to 2 (or more)
-   Start Linux. It will open now in two mirrored windows. You can move
    on of the Windows on to your second monitor.
-   Open the Display tool from the Gear box in the upper right corner of
    the Ubuntu desktop. Pull the pictures of the two monitors apart so
    that they are side by side, as shown in Figure 1. Click apply.

Now you should have a main desktop, and a second desktop in the second
window. You can go into full screen, and choose Host + Home to confiure
the two monitors.

[![Dual
Screen](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VBoxDualScreen01Small.png)](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VBoxDualScreen01.png)

**Figure 00: The displays window with two mirrored displays. You can
tell the Guest Additions are installed because of the label VBox.**

Port Forwarding {#forward}
---------------

By default, VirtualBox sets up a Nat confiruation for your Linux
installation. If you set up Port Forwarding, then your Linux Box appears
as simply an extension of your host machine. Suppose you have a Windows
host machine, and Linux set up in VirtualBox. Then with Port Forwarding,
things like the Linux Web Server or SSH server appear to be part of your
Windows host machine, but running on a different port. For instance, you
would browse to the Web Server on your Linux box by typing something
like:

```code
http://localhost:8000
```

Here is how to set up Port Forwarding. It is not necessary to close your
Linux VirtualBox VM when doing this. Choose **Machine | Settings** from
the VirtualBox menu. Setlect the **Network** page. Click the **Port
Forwading** button. Enter the following:

-   **Name**: WebServer
-   **Protocol**: TCP
-   **HostIP**: Leave it blank
-   **Host Por**t: 8000 (Or whatever you prefer other than 80)
-   **Guest IP**: Leave it blank
-   **Guest Port**: 80

![Port Forwarding](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/PortForward01.png)

Now you are all set. Just launch your browser in your Windows Box and go to localhost port 8000.

In the VirtualBox network settings, it is probably best to use Bridged Adapter when you can.

NAT:

-   VirtualBox acts as your DHCP server.
-   It is easier to set up than bridged adapter, especially if you are
    having DHCP problems.
-   It is trickier to access the machine from outside your virtual
    instance because you need to use port forwarding. Port forwarding
    isn't hard, but it is another step

Bridged Adapter:

-   Your network's DHCP server assigns the IP address for your virtual machine
-   From the network, your virtual machine just looks like another computer.
-   Trickier to set up than NAT.
-   Easier to reach from outside your virtual machine.

Port Forwarding and ADT {#adtCordova}
-----------------------

To connect from ADT Cordova/PhoneGap in situations where network is funky:


- Switch VirtualBox networking to NAT
- Choose Port Forwarding
- Add a new Port Forwarding Rule
- Host Port: 5555
- Guest Port: 5555

Now save and run the VM. Now you can connect via:

	adb connect localhost:5555

This works, as I say, even when Bridged Adaptor will not work for
one reason or another.

Resize a VDI Virtual Disk {#resize}
-------------------------

Sometimes you might find that you did not plan ahead for all
contingencies, and suddenly you find your are out of hard drive space.
Fortunately, this is an easy problem to resolve if you have been
following the usual steps outlined in these pages.

VirtualBox comes with some very handy utilities that perform many
important tasks. One of the most useful tools is VBoxManage. One of its
many useful features is the ability to resize a hard drive.

Here is what it looks like when you issue the command

```bash
J:\>"c:\Program Files\Oracle\VBox\VBoxManage.exe" modifyhd UbuntuSmallest.vdi --resize 10240
0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
```

Here are the options you can pass to **modifyhd:**

VBoxManage modifyhd \<uuid\> | \<filename\>\
     [--type normal | writethrough | immutable | shareable |
readonly|multiattach]\
     [--autoreset on|off]\
     [--compact]\
     [--resize \<megabytes\> | --resizebyte \<bytes\>]

You can specify the new size in either megabytes or bytes. In the
example shown above we are passing 10,240 MB, which is the same as 10
GB. This means the new drive will be 10 GB in size.

After doing this, you will still need to resize the partition. There may
be a simpler way, but I ended up:

1.  Shutting down the server
2.  Using VirtualBox to load the settings for VM,
3.  Turning to the Storage page, and inserting an ISO image for Ubuntu
    Desktop.
4.  I restarted the machine. This time Ubuntu booted up into the Live CD
    image. There was an option to "Try Ubuntu" and I selected that
    option. I was then automatically booted into Ubuntu Live CD image.
5.  In the live image I went to a terminal window and loaded gparted:
    sudo gparted.
6.  I then turned off swap and deleted it.
7.  I unmounted the main drive, and repartitioned the system. In my
    case, I temporarily deleted Swap, then resized my main drive, then
    created swap again on an extended partition.

[![modifyhd: Step one is prepare to launch the Ubuntu Live
CD](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ModifyHd01Small.png)](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ModifyHd01.png)

**Figure01: Prepare to launch the Ubuntu Live CD. Click to enlarge.**

[![gparted](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ModifyHd02Small.png)](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ModifyHd02.png)

**Figure 02: Running the Live CD with GParted in the foreground, the
terminal window in the background.**

[![Modify image](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ModifyHd04Small.png)](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ModifyHd04.png)

**Figure 2.5: Here we have the original partition resized to take up all
the new space, and we have completed deleted the swap partition.**

[![After resizing the disk](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ModifyHd03Small.png)](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ModifyHd03.png)

**Figure 03: After the rain the drive is resized and the swap file
recreated.**

Don't forget to reboot your system and remove the LiveCD from the
**Settings | Storage** window. Actually the DVD should have been removed
automatically, but check just to make sure. Then relaunch your image and
you should find that you now have free drive space.

Here is a link to an alternate solution:

[https://forums.virtualbox.org/viewtopic.php?f=6&t=22422](https://forums.virtualbox.org/viewtopic.php?f=6&t=22422)

Sometimes SwapOn is not turned on. Open this file:

	sudo nano /etc/fstab

Read about blkid and make sure the long numbers match up. After fixing
them up, you will need to reboot.

A System Panel (TaskBar) {#syspanel}
------------------------

I'm currently experimenting with [tint2](https://gitlab.com/o9000/tint2).

```bash
sudo apt-get install tint2
```

After the install, I ran tint2, and the taskbar appeared at the bottom
of my screen.

Sharing Folders Between Windows a Virtual Linux Machine {#share}
-------------------------------------------------------

To share a Windows folder with Linux Virtual Machine, and to copy files
back and forth, do the following:

-   Whether the VM is open or not, choose Settings from the Virtual Box
    menu for your machine.
-   Go to the last option, which is called Shared Folders.
-   Set up a shared folder on your Windows host that you want to be
    visible in your Windows machine, as shown in Figure 04.
-   Start your Linux VM if it is not already running.
-   Go to the /media/xxx folder, which xxx is the name of your share. In
    the image below, xxx would TempMs. So the path would be
    /media/TempMS.

[![Shared Folders Linux VM in Windows Host](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ShareFolders01Small.png)](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/ShareFolders01.png)

**Figure 04: Shared Folders Linux VM in Windows Host. (Click to
enlarge)**

Now make yourself a member of the **vboxsf** group.

	sudo usermod -a -G vboxsf charlie

Before things will work, you will probably have to reboot your VM.

![**Creating a Shared Folder**](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/SharedFiles01.png)

If you are not a member of **voboxsf**, you will have to go to a
terminal window, and to use **sudo cp** commands to move files in
and out of the shared folder. After copying a file from the folder
into your Linux home directory, use **chmod 777 myfile.txt** to get
ownership of the file. Here I copy a file from my shared folder into
the media directory, take control of it, edit it, and copy it back:

```bash
sudo cp sf_TempMS/log.txt .
chmod 777 log.txt
gedit log.txt
sudo cp log.txt sf_TempMS/log01.txt
```

Remember that one way to start Nautilus (the Linux File Explorer) in
super user mode looks like this:

```bash
sudo nautilus
```

Bit rather than worry about sudo permissions and super user mode, just
become a member of **vboxsf**.

Snapshots
---------

Snapshots allow you to mark the state of a VM so that you can return
to that state later. This does not make a copy of you VM, it just
provides a spot to which you can return.

If you make a snapshot while you are logged on, then you will be
returned to that location when you open the snapshot. This means
that you won't be prompted for a user name and password. This can
be either a good thing or a bad thing, depending on your security
concerns.

Clone VM
--------

You can clone VM, thereby creating an exact copy of a new VM. When
cloning, be sure to reset the MAC address by choosing:

- Generate new MAC Addresses for all network adapters.

- [References](http://ryantrotz.com/2011/12/virtualbox-snapshots-and-vmis/)


Copy a VDI
----------

Right click on the VDI, then copy it to a new location, now run the
VBoxmanager internalcommands sethduuid command against your copy
of the VDEI:

	VBoxManage internalcommands sethduuid [MY VDI FILE].vdi

In practice, it might look like this:

```
+>"C:\Program Files\Oracle\VirtualBox\VBoxManage" internalcommands sethduuid Lubuntu.vdi
UUID changed to: 241ffc40-9874-4137-86e2-cbed936ee4fd
```

Now create a new VM. This time, instead of create a new VDI, use
the one you have copied.

## Move a VM

I have done this:

- In the VirtualBoxManger right clicked on a VM and removed it without deleting the moves. (Ctrl-R)
- Used the File manager or other tool to move the entire VM that I just removed from the interface to a new location. (The files are usually in your Home directory in a sub-directory called something like VirtualBox VMs)
- Open up the directory in your new location and double clock on the file with the .vBox extension. (There's an option in the VBox Machine menu called Add. That probably does the same thing, but I haven't tried it.)

That's it. You are done. Assuming you are working with SSDs are better, this should take less than a minute, certainly not more than five.

Optionally, you can now go to the VirtualBox Manger **File | Preferences** menu and in the **Default Machine Folder** input box, specify the location where you want future VMs to be created. That way you won't "accidentally" fill up your drive again, but will instead, by default, create new VMs on your larger drive.

Links {#links}
-----

-   [Back to Linux Main](index.html)
-   [Install VirtualBox Additions on xOrg](https://forums.virtualbox.org/viewtopic.php?t=15679)"


<!--       -->
<!-- links -->
<!--       -->

[vbeasm08]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid08Small.png
[vbea08]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid08.png
[vbeasm09]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid09Small.png
[vbea09]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid09.png
[vbeasm10]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid10Small.png
[vbeasm11]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid11Small.png
[vbeasm12]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/linux-images/VirtualBoxExportAndroid12Small.png
