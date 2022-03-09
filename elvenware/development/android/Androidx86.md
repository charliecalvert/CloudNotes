---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/android/Androidx86.md
relativePath: elvenware/development/android/Androidx86.md
title: Androidx86
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

![Elvenware](../../images/elvenwarelogo.png)

Android X86
-----------

-   [Installation Part I](#installPart01)
-   [Installation Part II](#installPart02)
-   [Networking in Android 2.3](#network23)
-   [Networking in Android 4.0 (Ice Cream Sandwich)](#network40)
-   [Connect to Debug](#debugConnect)
-   [Resize or Modify a VDI Virtual Hard Drive](#resize)
-   [Install Applications using the Android Virtual Debugger
    (AVD)](#avd)
-   [Links](#links)

Other Elvenware pages about Virtual Box:

-   [Linux
    Page](http://www.elvenware.com/charlie/os/linux/VirtualBox.html)
-   [Cloud
    Virtualization](http://www.elvenware.com/charlie/development/cloud/virtualization.html)

 

Installation Part I {#installPart01}
-------------------

You don't need a phone to run Android. You can install it on your PC or
on a NetBook. You can even run Android inside a [virtual
machine](../design/virtualization.html). In this article I describe how
to load Android inside a VirtualBox VM. Running Android in VirtualBox is
a great way to debug your projects as you develop them.

**NOTE**: If you are a developer, you know that you can also run Android
emulation from the Android SDK, usually in conjunction with Eclipse.
That is a useful option, but it tends to be much slower than what you
get with Android running in VirtualBox.

To get started, install
[VirtualBox](https://www.virtualbox.org/wiki/Downloads) and the
VirtualBox extension pack. Once that piece is completed, you will need
to download a copy of [Android X86](http://www.android-x86.org/).

There are nearly as many releases of Android X86 as there are versions
of Android. I used to recommend getting Android 2.3 (Gingerbread) for
the eeepc from ASUS (android-x86-2.3-RC1-eeepc.iso). However, I find
that with PhoneGap/Cordova 2.3.0 or later, you will have trouble with
Android x86 2.3, so I suggest going to Android x86 2.2 r2
(android-x86-2.2-r2-eeepc.iso), or Android x86 4.0
(android-x86-4.0-RC2-eeepc.iso) or 3.2 for the eee PC. When you go to
the Android X86 site, you will find a link to download various ISO
files. Look for **android-x86-4.0-RC2-eeepc.iso**; that's Android 4.0
for the eee PC. Later versions are of course appealing, but I have not
had time to work with them yet.

NOTE: It was usually fairly easy to set up networking for Android x86
2.3, which was why I liked it, 3.2 is a bit trickier, but still
relatively straight forward. I have found Android x86, 4.0 R2 to be
quite simple, particularly if all you want to do is connect with the
Android debugger. It is a bit trickier to get 4.0 connected to the
Internet, but still not particularly challenging. These network issues
are discussed later in this page.

-   Download Android for PC (x86) from
    [http://www.android-x86.org/](http://www.android-x86.org/)
-   Watch [Charlie's install video](http://youtu.be/LNgkRhsgzIc).
-   See the [install
    how-to](http://www.android-x86.org/documents/installhowto) that can
    be used to supplement what I have written here.

Here also is my summary the items to choose while going through the
install.

Start by creating a new virtual machine in VirtualBox.

**Important note**: *If you are in one of Charlie's classes in room
N252, and you are currently using a machine hosted in room N252, you
should name your virtual machine N252. Don't call it Android23sd, as
shown below, instead call it N252. This only applies if you are in N252,
and using one of the school's computers. If you are using your own
laptop, then you can choose any name you want.*

Here is what it looks like if you are not using N252 as a name:

![VirtualBox Android Step 01](images/Androidx8601.png)

For base memory, I'm choosing 1024 MB (1 GB), though at home I usually
select 2048 MB (2 GB) since I have lots of RAM on those machines.

![Virtual Box Android Install 1024 MB](images/Androidx8602.png)

Create a minimum 8GB VDI hard drive, but go to 16 GB if you have the
room on your hard drive. It is possible to [resize a virtual hard
drive](http://www.elvenware.com/charlie/os/linux/VirtualBox.html#resize),
but you probably don't want to go through that process.

![VirtualBox 8GB VDI Hard drive](images/Androidx8603.png)

The summary screen is worth a glance so you can check if everything
worked out as planned:

![VirtualBox Image Summary Screen](images/Androidx8604.png)

When you first run the image, you will be prompted to browse for the ISO
file that you want to use. Browse across your hard drive and pick your
ISO file. It will have a name similar to
**android-x86-4.0-RC2-eeepc.iso**:

![Virtual Box prompt for ISO](images/Androidx8604a.png)

### Installing Android Part II {#installPart02}

Now you will need to start the process of formatting your vritual drive
and of installing Android. You should boot up (double click) your
virtual machine and select the ISO file that you downloaded from the
Internet. Here are some of the choices you make during the partitioning
and formatting stage: 

-   Create Modify Partiftions
-   **New | Primary | Bootable | Write | Yes**
-   Format with ext3.

ext3 is a Linux file format, just as FAT or NTFS are typical Windows
file formats. Here is what the screen looks like when you are installing
Android to your newly created drive:

![Formatting partititions](images/Androidx8605.png)

And here are some final steps in the install of Android to your virtual
hard drive:

-   Install Boot Loader Grub - Yes (It is fine to choose yes if you are
    using VirtualBox. For Linux, choose no and see the Links below. For
    windows, you are on your own since choosing yes ruined my Windows
    partition.)
-   Read-Write - Yes. The screen may go blank to blue for several
    minutes. Patience!
-   After a time you will get a prompt like: **Create Fake SD Card**,
    answer yes. The screen looks like the Formatting screen. Just take
    the default values such as a size of 2047.

When you are done, shut down the VM. Go to the VirtualBox **Settings |
Storage**option, right click on the item listed as an IDE controller and
remove the ISO or DVD drive, if it has not already been removed. The
item you want to remove is highlighted in the screen shot shown below.
You need to do this because you want to stop booting from the ISO file,
and start booting from the virtual hard drive that you have created.

![Remove the ISO file](images/VBoxRemoveIso.png)

Networking in Android {#network23}
---------------------

Please read this section regardless of which version of Android x86 you
downloaded. Note, however, that if you are using Android x86 2.3, it is
quite possible that you will not have to do anything to get networking
set up in your Android Virtual Machine. You might also be able to
connect Android 4.0 with ADB with no other work than setting up the
**Bridged Adapter**. Nevertheless, you should make some quick checks to
be sure you are good to go.

To get networking up and running, select your Virtual Machine in the
VirtualBox selection pane. Then choose **Settings | Network** from the
VirtualBox menu and choose NAT. Under **Advanced**, choose **PCnet-FAST
III**. At this stage, you may be good to go.

NOTE: NAT and Bridged Adapters are confusing terms for many developers.
Your VM is, for all intents and purposes, just another computer on the
network. It may be running in a VM, but it thinks it is a regular OS
running on real hardware. If you set up NAT networking, then the host,
which is VirtualBox in our case, will translate the network addresses of
messages sent to and from your VM. If you choose Bridged Adaptor, then
no translation takes place, instead, your VM looks and acts just like
another machine on the network. Since Bridged Adapters skip the step of
network address translation, they are naturally more efficient, and they
will automatically act like any other computer on the network. It is,
however, a bit more complicated to set up Bridged Adaptors. Also, there
are times when you don't really want a VM to be registered on the
network as a real machine. So, at times, NAT is your best choice because
it is simple, and because it keeps the machine out of the network mix.
Developers, however, often want a virtual machine to act just like a
regular computer, and hence they choose Bridged Adaptor. I should add,
however, that if you really want to understand what you can do with NAT
connections, you should look into [Port
Forwarding](http://www.elvenware.com/charlie/os/linux/VirtualBox.html#forward),
which seems complicated at first, but which ends up being fairly simple
to understand and set up.

For developers using NAT is not ideal, since you need to set up Port
Forwarding and assign a port number in the VirtualBox setting if you
want to access it for debugging Android applications from Eclipse.
Therefore, you will probably find it simpler to set up a **Bridged
Adaptor**, if you are a developer. But NAT will work fine if you are
just an "end user." Furthermore, you might want to test first with NAT,
as that requires less setup, and hence less room for error. If you are
developer, and NAT is working, then consider switching to Bridged
Adaptor. (On Android x86, Bridged Networking seems to just work, while I
have not been able to setup NAT properly. So it is an exception to the
rule listed in this paragraph.)

To use the **Bridged Adaptor**, you will probably need a DHCP server on
your network. If that is available, then in VirtualBox, choose
**Settings | Network | Bridged Adaptor.**Again my type was **PCnet-FAST
III**. The **name** was automatically set to the name of my network card
on my machine. The name of the adaptor should be filled in for you
automatically, but if you need to find it, choose **Control Panel |
System and Security | System | Device Manager** and Open up the
**Network Adaptors** node.

**NOTE**: Right beneath **Attached to: Bridged Adapter/Nat** there is a
field called **Name**. This is where you choose the physical network
adapter (NIC) on your computer that you want to use. If you are on a
laptop, there are usually two choices, one for your wireless connection,
and one for your wired connection. If you are at work, school or a
coffee shop, and using the wireless connection, then all might be fine.
Then perhaps you go home, and you are not on the wireless network, but
you are on the wired network. In that case you may to switch to the
other adapter. We are not usually conscious of which network adapter we
are using, but it is helpful to understand the choices available to us,
and when which adapter is in play. For better or worse, VirtualBox and
Android can help us become more aware of this aspect of our system!

![Android Network setup with VirtualBox](images/Androidx8607.png)

Here are some troubleshooting tips for folks with Android x86 2.3. Make
sure you have:

-   Selected your virtual machine in the VirtualBox selection pane on
    the left
-   Go into the Settings for your Virtual Machine and choose the Network
    tab
-   Set **Attached to** as Nat
-   Under **Advanced**, set the **Adapter type** to **PCNet-Fast III**
-   Start your virtual machine
-   Choose **Settings | Ethernet Connection** and make sure the
    **Ethernet** checkbox is checked
-   Under **Ethernet Configuration**, make sure that Ethernet Devices is
    set to **eth0**

If all of the above checks out, then you should be on the network,
either right away, after rebooting the virtual machine. If you are still
having trouble, make sure that networking is setup correctly on your
machine. In particular, make sure you have a working DHCP server on your
network.

Ice Cream Sandwich and Honeycomb Networking {#network40}
-------------------------------------------

My experiences with Ice Cream Sandwich (Android x86 4.0 eeepc RC2) have
been quite good. After setting up the Bridged Adaptor using PCnet-FAST
III (Am79C973), I was able to start up the Android VirtualBox VM and
connect to it immediately using ADB connect XXX, where XXX is the ip
address of my device, and I found the IP address by pressin Alt + F1 in
Android, and typing netcfg. With this configuration, my copy of Android
is not on the network in the sense that I can browse the Internet, but
it does enable me to connect with ADB, which is my real need. To get on
the Internet with Android 4.0, I had only to add the following to the
bottom of /etc/init.sh and then reboot:

~~~~ {.code}
setprop net.dns1 8.8.8.8
~~~~

In Honeycomb (3.2), I did the following. First I selected Alt-F1 to get
to the command prompt. I typed netcfg to confirm that I was not
connected to the network. When I issued the netcfg command, I saw that
eth0 was DOWN, which meant I was not connected to the network. Then I
called **setprop** and passed in the IP address of my DSN server:

~~~~ {.code}
setprop net.dns1 [DNS IP]
~~~~

To get the IP address for your DNS server, go to the Windows command
prompt and type **ipconfig -all**. Then scroll down and look for the
**DNS servers** entry. On my system, the DNS server is 192.168.2.1, so I
wrote:

~~~~ {.code}
setprop net.dns1 192.168.2.1
~~~~

Then I typed **dhcpcd eth0**and I was done. To confirm that I was on the
network, I called **netcfg**, and this time I found that **eth0** was
**UP**.

Here is the whole session Android 3.2, from the time I first opened up
the shell on AndroidX86:

![Connecting to the network from Android x86](images/Androidx8608.png)

For more info, look at these stackoverflow threads:
[here](http://stackoverflow.com/questions/8227825/android-x86-porting-unable-to-make-it-work)
and
[here](http://stackoverflow.com/questions/10069121/no-network-in-android-x86-on-virtualbox-4-1-2).

### Keyboard Shortcuts

-   Right Ctrl-I is how to capture the mouse. Sometimes you need to do
    this:
    -   Click on window that holds that instance of Android
    -   Press Right Ctrl-I
    -   Press Escape
    -   Wiggle the mouse

-   Right Ctrl-Q sends the Quit signal.
-   You can see a command prompt with Alt-F1. Switch back to graphics
    mode with Alt-F7.
-   Escape for the back button,
-   The menu key to unlock the machine (Usually found next to the right
    Ctrl button.)

At the command prompt, get you IP address by typing: **netcfg**

**Connect to Debug** {#debugConnect}
--------------------

If you are developer, you will want to know how to set up debug sessions
for the code you write in Eclipse. Start by going to command line, in
the Android SDK **platform-tools** folder, and typing the following,
where 192.168.0.115 is the IP address that your virtual device is using.
You can get this IP address by selection Alt-F1 inside Android. That
will take you to the command line. Now get the IP address by running
ifconfig of netcfg. Once you have the address, write something like
this, where the IP address you use will likely differ from what is shown
here:

    adb connect 192.168.0.115

    connected to 192.168.0.115:5555

After you have connected to the device, go back to Eclipse. Run you run
your program, don't accidentally choose the emulator. Instead, choose
your copy of Android running in VirtualBox. See Figure 01 to see what
the moment of decision looks like. Obviously you don't want to choose
emulator-5554. Instead, choose another option, such as the instance of
VirtualBox run at a specific IP address on a specific port. The actual
IP address will, of course, likely differ in your case.

![ADB Connect](images/AdbConnect.png)

**Figure 01: Here both the emulator and an instance of Andoird in
VirtualBox are running. The VirtualBox instance is highlighted.**

Modify a Hard Drive created with Virtual Box {#resize}
--------------------------------------------

VirtualBox comes with a number of applications, or command line
utilities, that you can use to query or modify the behavior of
VirtualBox.

You might first want to explore the size of a VirtualBox VDI image using
the showhtinfo command of the VBoxManage.exe application:

~~~~ {.code}
J:\VirtualBox\AndroidIceCream>"c:\Program Files\Oracle\VirtualBox\VBoxManage.exe" showhdinfo AndriodIceCream.vdi
UUID: e9603964-8a41-4bb5-848b-167b3d293f49
Accessible: yes
Logical size: 8192 MBytes
Current size on disk: 1067 MBytes
Type: normal (base)
Storage format: VDI
Format variant: dynamic default
In use by VMs: AndriodIceCream (UUID: e818838b-30f5-4799-9c97-15736d24cb3b)
Location: J:\VirtualBox\AndroidIceCream\AndriodIceCream.vdi
~~~~

The next step will be to modify the VDI file. You can use the command
line help to see some of your options:

~~~~ {.code}
J:\VirtualBox\AndriodIceCream>"c:\Program Files\Oracle\VirtualBox\VBoxManage.exe" modifyhd
Usage:

VBoxManage modifyhd <uuid>|<filename>
[--type normal|writethrough|immutable|shareable|
readonly|multiattach]
[--autoreset on|off]
[--compact]
[--resize <megabytes>|--resizebyte <bytes>]

J:\VirtualBox\AndriodIceCream>
~~~~

~~~~ {.code}
J:\VirtualBox\AndroidIceCream>"c:\Program Files\Oracle\VirtualBox\VBoxManage.exe" modifyhd --resize 45000 AndroidIceCream.vdi
0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%

C:\Users\Charlie\VirtualBox VMs\AndroidVista>
~~~~

This grows the harddrive to 45 GB. It happens very quickly.

Don't forget that after you grow a virtual hard drive, you will probably
need to tell the operating system that you have made the change. For
instance, in Windows, you will want to go into the **Control Panel |
System Maintenance** and choose **Create and format hard disk
partitions** from the **Adminstrative Tools** section. You should then
right click on your main partition, and extend it so that it takes up
the entire disk.

**Working with the AVD or Android x86 from the Command Line** {#avd}
-------------------------------------------------------------

Here is and example of how to use the Android Virtual Debugger (AVD) to
connect to Android x86 and install an application. You can do all this
from the command line of your Windows, Linux or Mac. The example shown
here uses Windows conventions, but it should be obvious how to modify
the commands for use on a MAC or Linux Box:

~~~~ {.code}
C:\Users\Charlie\Documents\android-sdk>cd platform-tools

cd C:\Users\Charlie\Documents\android-sdk\platform-tools>
adb connect 192.168.0.114
connected to 192.168.0.114:5555

adb install c:\Users\Charlie\workspace\AndEngineTest01\bin\AndEngineTest01.apk
4260 KB/s (397066 bytes in 0.091s)
        pkg: /data/local/tmp/AndEngineTest01.apk
Success
~~~~

-   [Adb
    terminal](http://www.gadgetsdna.com/android-terminal-adb-shell-command-list/1168/)
-   [More adb
    terminal](http://www.londatiga.net/it/how-to-use-android-adb-command-line-tool/)

Links
-----

-   Android-x86 [discussion
    group](http://groups.google.com/group/android-x86)
-   I run Linux, and want to [dual boot Linux and
    Android](http://www.ceh-photo.de/blog/?p=357)
-   More on [double or triple bootting
    Linux](http://groups.google.com/group/android-x86/browse_thread/thread/ad727f345a15d5ba/dcbc0ff116de334a?lnk=gst&q=grub+linux#dcbc0ff116de334a)
-   [AndroidX86 VirtualBox
    Howto](http://www.android-x86.org/documents/virtualboxhowto)

