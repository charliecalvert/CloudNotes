---
layout: post
date: 2023-05-08 03:38:38 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/Virtualization.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud
fileName: Virtualization.md
relativePath: /cloud/Virtualization.md
title: Virtualization
directoryName: cloud
category : cloud-guide
---

- [Hardware Virtualization](http://en.wikipedia.org/wiki/X86_virtualization)
-	[Android Emulation](http://ubuntuguide.org/wiki/Android_emulation)


Other Elvenware pages about VirtualBox:
---------------------------------------

- [Linux Page](http://www.elvenware.com/charlie/os/linux/VirtualBox.html)
- [Android X86 Page](http://www.elvenware.com/charlie/development/android/Androidx86.shtml)

There are two different types of Virtualization software:

- Type 1: Loads before OS, runs on bare metal
- Type 2: Runs after OS loads

VirtualBox is a Type 2 virtual machine, while Xen is a type one machine.
When using VirtualBox, we first boot Windows, Linux or the Mac, and then run
VirtualBox on top of them. We end up running our core OS, and then
displaying a Window on the desktop that hosts our Virtual OS. This virtual
machine could be a copy of either Linux or Windows. As a rule, we don't see
the Mac OS running in a virtual machine.

Working with Virtual Appliances {#vAppliance}
-------------------------------

To understand the role of virtual machines in the cloud, it helps to
learn how easy they are to reuse. This exercise is designed to give you
hands on training in reusing a virtual machine.

There will be three steps:

* Export an existing Virtual Machine
* Import a Virtual Machine
* Test Your Setup

### Export Virtual Appliance {#export}

Open up VirtualBox, select, but do not open, your Linux image. Choose
**File | Export Appliance** from the VirtualBox menu. You will be taken
to a screen from which you can confirm that you have chosen the correct
virtual machine to export, as shown in Figure 1.

[![Export from VirtualBox no-size][vbe01sm]][vbe01]

**Figure 01: Appliance Export Wizard, Screen 1. Click to see larger
image.**

In the next screen, you choose the name of the file that will store your
exported appliance. Be sure to pick a drive with plenty of free space.
Linux typically takes 2-3 GB when stored, but other OS's need much more
space:

[![Export from VirtualBox no-size][vbe02sm]][vbe02]

**Figure 02: Choose a big drive with plenty of room. Click to see larger
image.**

Finally, you get a chance to fill in some fields that you can use to
identify and describe the export. Double click to edit the fields:

[![VirtualBox Export final screen no-size][vbe03sm]][vbe03]

**Figure 03: Filling in fields to identify your export.**

After you click on the **Export** button your appliance is stored inside
a file with an OVA extension. This file can be stored on a DVD, USB hard
drive or thumb drive, and can be used to quickly create a VM on your
current system, or on another system. The files in the VM are nearly
identical to those used by VirtualBox, but they are compressed, and
certain identifying information has been stripped out. The lack of
identification ensures the VirtualBox can give an imported instance of
the Appliance unique identifiers that do not conflict with those on your
current system.

### Importing an Appliance

You now want to import an appliance. This might be an appliance (OVA file) that you yourself created, or one that you was given to you by a third party.

**NOTE**: *It does not matter whether you created the OVA file yourself, or if someone else gave it to you. In either case, these instructions should work.*

Begin by selecting **File | Import Appliance** from the VirtualBox menu.
Use the **Choose** button (or dropdown arrow on newer versions of VirtualBox). Browse for the OVA  After you have selected the file, the window might look like the one in Figure 04:

[![vbox-import no-size][vbe04sm]][vbe04]

**Figure 04: Selecting the file that contains the appliance you want to import.**

You can use these appliance both at home and at school. Or you can use them at work. Anyplace where VirtualBox runs properly is potential host for your Linux virtual appliance. For instance:

* If you created the image on your machine at Bellevue College, then you can import it to a machine in your home.
* If you created the image at home, you can import it on your machine at BC.
* If you received the image from a third party, then you should be able to import the image both at school and at home. In any event, you should end up with a copy of VirtualBox hosting your Linux image both at home and at school.

In the final screen you get a chance to make a few choices. One of the
most important is whether or not you want to select a unique Mac address
(reinitialize) for your VM. If you want to run this VM and the one you
cloned at the same time, then you should check this box, seen at the
very bottom of the dialog. You can also choose whether or not to
initialize the **USB Controller**, **Sound Card** and **Network
Adapter** to their default values. In many cases, the answer should
probably be yes, but you might not do this on some machines that don't
support the same features found on the machine where the device was
created.

 [![VirtualBox Import appliance no-size][vbe01sm]][vbe01]

**Figure 05: Importing an Appliance into VirtualBox. Click to see larger
image.**

### Test Your Setup {#test-setup}

Assuming that you first export the image and then imported, you can now perform a series of test to help you understand what you have done. If all you did was import an appliance that someone else made, then you can skip this section.

When you are done, you will have a new image based on your original
virtual machine. Try running one image, making some modification to a
file in your home directory, then close your image and run the other
cloned virtual machine. Notice that it does not contain the change you
made. These are two different virtual machines.

On Linux, you can use a text editor such as GEdit or Nano to create and
edit text files. Your home directory is located in **/home/LastName**,
where **UserName** is your user name. For instance a home directory
might be called something like **/home/susan**. If you open the Linux
file manager (Nautilus) then by default you will end up in your home
directory. At the Linux command prompt, if you type **cd** followed by a
space, and press enter, you will be taken to your directory. You can see
the full path of your current directory by typing**pwd + Enter.)

What have you accomplished in this exercise? Several different things,
at least three of which stand out:

-   You have made a back up of your virtual machine so you can restore
    it when necessary.
-   You have made a portable copy of your virtual machine that you can
    take to another machine or give to a friend. (These images are
    portable across operating systems, so an image made on Windows can
    be opened on the MAC or a Linux box.)
-   You have created a "disposable" machine that can be used for testing
    by developers or students, or anyone else who wants a machine that
    can be used heavily for a few hours, and then deleted and restored
    back to its original state by simply re-importing the OVA file.

Finally, you have also taken a step toward understanding how multiple
virtual machines can be easily deployed on the cloud. If you want to
"rent out" these machines to a third party over the Internet, you could
simply import your OVA file, find out its IP address, then give that IP
address to a third party who could begin using the file over the
Internet. You could do this multiple times to begin simulating a real
cloud environment, in which one physical machine hosts multiple virtual
machines. But we are not quite ready for that scenario yet, though we
are getting close.

NOTE: There is a second way to clone a virtual machine that involves
having VirtualBox simply note the differences between your original
machine and its clone. This saves on hard drive space. We may or may not
explore this option later in the course. 

Networking Errors after Migrating an Appliance
-----------------------------------------------

If you move an appliance from one machine to another, you can sometimes find
that networking will not work when you import the virtual machine on a new
computer. If found that if you delete the following file, then reboot the
system, it will work again:

	/etc/udev/rules.d/70-persistent-net.rules

Frankly, I don't understand why this works, but only that it will work. Some
notes I found online suggested it might have something to do with the new
virtual MAC address for the imported appliance.

In particular, I tried ifconfig etho up, which should bring the ethernet
connection up. Instead, I got this error:

	error while getting interface flags

So I Googled around a bit and found that deleting the file mentioned above
and rebooting fixed the problem.

### Notes on Creating Virtual Appliances with VirtualBox

OVA files conform to a standard put together by the Distributed
Management Task Force (DMTF) and is a variation of the more commonly
cited Open Virtualization Format (OVF). OVF consists of multiple files,
while an OVA file wraps them all in a single package, in particular,
they use the TAR format, which is a bit like a zip file.

The format is designed to specify a single format that can be used by
multiple virtual machines. Apparently it does use the VMWare VMDK
format, but that is in fact an open format with a public specification.
In an ideal world, OVA files could be used by VirtualBox, VMware, XEN,
the Microsoft HyperVisor, etc. If you look at section 1.13 of the help
for VirtualBox, you will find that they back off making such claims, at
least for now. That is, however, the goal.

Evidently either the VMDK format or the OVA format or both, end up
compressing files, as the resulting OVA file is smaller than the VDI
file we start with.

Note that VirtualBox supports VDKM, VDI, and VHD files. VHD files are
part of the Microsoft system virtual machines and can be mounted as a
stand alone drive in Windows.

Taking Screen Shots of Linux Running in VirtualBox on a Windows Host {#screenshot}
--------------------------------------------------------------------

Here is how I get screenshots. When I’m running VirtualBox, I find that
my usually **Alt-PrntScrn** key doesn’t work right because VirtualBox
swallows the keystroke. I’m therefore forced to put the focus on
something else, such as a DOS box or a copy of NotePad, and then press
**PrntScrn**. I end up with a huge bitmap that captures the output seen
on both my monitors. I open Paint.Net, and press Ctrl-V, which opens up
the bitmap of both monitors more or less automatically. (If I’m on a
machine that is not dual screen, then my bitmap shows only one monitor.)
Paint.NET has excellent tools for letting users make a selection, zoom
in on the edges of the selection, use the mouse to adjust the selection
to the pixel level, then press Ctrl-C to capture the selected area,
Ctrl-N to create a new bitmap of exactly the right size, and Ctrl-V to
paste in the bitmap of the user’s selection. I guess it sounds
complicated, but it only takes a few seconds after you have done it once
or twice.

VirtualBox DHCP {#dhcp}
---------------

The way it is at the start:

~~~~ {.code}
C:\Program Files\Oracle\VirtualBox>VBoxManage.exe list dhcpservers
NetworkName: HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adaptert Adapter
IP: 192.168.56.100
NetworkMask: 255.255.255.0
lowerIPAddress: 192.168.56.101
upperIPAddress: 192.168.56.254
Enabled: Yes
~~~~

Now we add in our own DHCP server with the command "all on one line":

~~~~ {.code}
c:\program files\oracle\virtualbox\VBoxManage.exe" dhcpserver add --netname intnet --ip 192.168.57.100
--netmask 255.255.255.0 --lowerip 192.168.57.101 --upperip 192.168.57.254 --enable
~~~~

We issue the command as above, but here it is broken out so it is easier
to read:

~~~~ {.code}
vboxmanger dhcpserver add --netname intnet
--ip 192.168.57.100
--netmask 255.255.255.0
--lowerip 192.168.57.101
--upperip 192.168.57.254
--enable
~~~~

When we are done, it looks like this:

~~~~ {.code}
"c:\program files\oracle\virtualbox\VBoxManage.exe" list dhcpservers
NetworkName: HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adapter
IP: 192.168.56.100
NetworkMask: 255.255.255.0
lowerIPAddress: 192.168.56.101
upperIPAddress: 192.168.56.254
Enabled: Yes

NetworkName: intnet
IP: 192.168.57.100
NetworkMask: 255.255.255.0
lowerIPAddress: 192.168.57.101
upperIPAddress: 192.168.57.254
Enabled: Yes
~~~~

In the VirtualBox settings, we turn to the Network page, and choose:

1.  **Attached to**:  Internal Network
2.  **Name:**:intnet
3.  **Promiscuous Mode**: Allow VMs

[![Setting up the internal network no-size][insm01]][in01]

**Figure 02: Setting up the internal network**

From a Red Hat Video (It Process Institute)
-------------------------------------------

Kurt Milne and Erich Morisse (Red Hat)
[emorisse@redhat.com](mailto:emorisse@redhat.com),
[Kurt.milne@itpi.org](mailto:Kurt.milne@itpi.org) Twitter: @KurtMilne

-   [http://www.redhat.com/cloud/build](http://www.redhat.com/cloud/build)
-   [http://www.redhat.com/cloudtour](http://www.redhat.com/cloudtour)
-   [https://engage.redhat.com/forms/idc-cloud](https://engage.redhat.com/forms/idc-cloud)

We want to build cloud services, not just systems. Our goal is automate
and improve IT solutions.

-   Bottom Up (IT View)
    -   Virtualize
    -   Resource Pools
    -   Automated Provision
    -   Self-Service

-   Top Down (Business View)
    -   Business objects
    -   Desired Benefits
    -   Constraints
    -   Cloud Goals

He recommends starting with business objectives and working down to the
IT area, but the other guy likes the idea of working from both ends at
once.

Physical virtual private cloud plublic cloud

-   Obvious Factors to Care About;
    -   Service Quality
    -   Scalability
    -   Cost
    -   Security and Compliances

-   Not so Obvjous
    -   Avoid lock in
    -   Life cycle phase
    -   Dependencies
    -   Ecosystem - what are the cloud services that are plugged into
        their solution without having to worry about integration

You do some planning first, but then you have to start doing some
exploration.

Make sure you don't over do it. Plan to succeed. Don't take on too much,
and don't lock yourself in.

#### Proof of Concept (POC)

Build a Lighthouse application, is the proof of concept to prove that
things actually work. Is the cloud real?

Put together a test and dev environment. Build a lamp stack, or what
have you.

Hardware is often not utilized. We use 20 Percent from a machine, but if
you virtualize, then people are really using the full 100% of a server.

-   Business sees great agility, scalability and availability
-   IT sees greater efficiency, utilization, automation and
    standardization

Evaluate and then move to Proof of Concept

Build on existing solutions.

Sharing the ClipBoard
---------------------

In the settings for your VM. Go to:

-  General | Advanced | Shared Clipboard: Bidirectional

VirtualBox Manager
------------------

You might get an error about floppy disk or CD/DVD's not being available
when you start VirtualBox. Click the check button. You will be taken
to this dialog:

![OpticalDisks no-size][vbm]

As you can see, this is the optical disk page. Often, on this page, you will see an item with an next to it. That means that VirtualBox can't find the file in question. Right click on it and choose remove, and that should resolve the problem. You won't see the error message the next time you start VirtualBox.

<!--       -->
<!-- links -->
<!--       -->

[vbe01sm]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid01Small.png
[vbe01]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid01.png

[vbe02sm]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid02Small.png
[vbe02]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid02.png

[vbe03sm]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid03Small.png
[vbe03]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid03.png

[vbe04sm]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid04Small.png
[vbe04]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid04.png

[vbe05sm]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid05Small.png
[vbe05]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxExportAndroid05.png

[insm01]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/InternalNet01Small.png
[in01]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/InternalNet01.png

[vbm]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud-images/VirtualBoxManager.png
