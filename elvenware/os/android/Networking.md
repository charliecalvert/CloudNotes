---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/android/Networking.md
relativePath: elvenware/os/android/Networking.md
title: Networking
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: Networking.md
fileNameHTML: Networking.html
---

<!-- toc -->
<!-- tocstop -->

Networking
----------

Mobile devices rely on networks. Knowing a bit about networking can help
you understand how they work.

Cellular Data
-------------

Information about mobile 3G, 4G and LTE networks is found 
[here](/charlie/os/Android/MobileTechnology.html#cellularAndWiFi).


DLNA
----

- [Digital Living Network Alliance](http://www.dlna.org/)
- 

Mobile Clouds {#mobileClouds}
-------------

When shopping for digital devices, consumers often look for SD card slots, 
USB ports, VGA ports, or other means of storing or transferring digital 
content. These ports can be useful, but I don’t like to become dependent on 
them. We don't need a device with lots of ports. Our data belongs in the 
cloud, not on a device. We access it primarily over HTTP, SSH or SFTP. You 
might want high quality SSH or SFTP tools. You might want a cloud 
application like DropBox, SkyDrive or Google Drive. Some tools, such as the 
web based AirDroid, can help you transfer data to a PC without cables or PC 
side installs. All these tools help you access your data with increasing 
ease on a variety of platforms.

Your hard drive has been virtualized! You don’t need direct access to
the hard drive on your PC from your mobile device. You don’t need direct
access to a USB memory stick or to portable hard drive. Your data lives
in the cloud. From your PC, you might back data up onto a USB drive or
onto a CD, but that is just a wise precaution, it is not a means of
creating or maintaining a primary data store.

Types of Cloud Data
-------------------

There are three primary ways to store, access and manipulate data in the
cloud:

-   SaaS: Software as a Service. This means applications that run in the
    cloud. Think Google Docs, WordPress or EverNote.
-   PaaS: Platform as a Service. These are APIs, databases, compilers,
    or other development tools running in the cloud.
-   IaaS: Infrastructure as a Service: A virtual machine hosted in the
    cloud that runs an OS. (Amazon, Rackspace, HPCS, OpenStack,
    CloudStack, Dell vCloud, IBM SmartCloud, Eucalyptus and Azure.)

No matter what kind of data you have, you can store it on one or all of
these cloud based tools. Whatever is on your hard drive, you can migrate
it to the cloud and store it there.

If you can place all your data in applications like Word and Excel, then
you are done. You strategy for moving to the cloud is simple: just take
your documents, spreadsheets, presentations, MP3s, pictures and videos
and store them in applications such as Google Docs or SkyDrive.

If you have somewhat more complex needs, then you need to use PaaS or
IaaS. In that case, you should explore Amazon Web Services or similar
tools.

Cloud Apps {#cloudApps}
----------

### Google Docs {#googleDocs}

On Mobile devices, Google provides good services for reading documents,
but rudimentary services for editing documents. The feature set is
always changing, but right now tables aren't supported in text
documents, and creating documents is not supported. You can edit text
once the document is created.

### Google+ {#google+}

Multiple accounts only supported in version 2.0. It is not always easy
to tell that an application has been updated, yet you usually do want to
update. Get the most recent features.

### DropBox {#dropBox}

### Microsoft Live {#microsoftLive}

I can see only one of the folders shared with me. This is a real feature
loss.

IPod and IPhone {#iPodAndIPhone}
---------------

Use Skype

Network Protocols {#networkProtocols}
-----------------

If you want to play in the cloud, it helps to understand networks. This
means coming to terms with the following protocols or services:

-   TCP/IP
-   HTTP
-   SSH

These tools are important because they are platform neutral. We no
longer run on just Windows, or just a Mac, or just on Linux. Our data is
in the cloud, and we want to access it from Windows PCs, from Macs, from
Android (Linux) devices, and from Apple laptops. These protocols work on
all these devices. We also need a single, open source set of tools that
work on all these platforms. There are several choices to pick from, but
my favorites are:

-   HTML5, CSS and JavaScript on the client
-   Apache or IIS, Python and MySQL or MongoDB on the server.

To sum up: If you want to be good at using mobile devices, you really
have two choices:

-   Master a set of cloud applications that will allow you to store and
    edit your data in the cloud, and access it from a wide range of
    devices running various operating systems on various different types
    of hardware.

Store more complex data in the cloud by mastering a set of related tools
and protocols that include HTTP, HTML, and Python. Finally, you must
learn everything you can about creating and managing virtual machines.

Summary
-------

In this section you learned about networking. The focus was on basic
protocols.

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../../development/index.html) |
[Delphi](../../development/delphi/index.html) |
[CSharp](../../development/csharp/index.html) | [My
Books](../../books/index.html)
