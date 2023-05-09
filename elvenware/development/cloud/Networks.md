---
layout: post
date: 2023-05-08 03:38:38 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/Networks.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud
fileName: Networks.md
relativePath: /cloud/Networks.md
title: Networks
directoryName: cloud
category : cloud-guide
---

Network and Router Basics
-------------------------

You can run the PING command to find out if you are connected to the
Internet. Also, run **ifconfig** on Linux, and **ipconfig /all** on
Windows.

 ![Configuring a router, view the DHCP page](images/NetRouter01.png)

Figure 0X: Configuring a router, view the DHCP page

![Configuring a router, view the page](images/NetRouter02.png)

![You can have more than one router on a
computer.](images/NetRouter03.png)

Figure 03: There are two active network adapters on my system. One is
for my ethernet cable, the other for wifi. If I connect to a VM, and
choose Realtek Family Controler, but there is no Ethernet cable plugged
in to my laptop, then I am going to have a trouble. As a result, I
usually use WiFiLink because it works even if the cable is not plugged
in. However, on my machine, it often seems like it is either/or, not
both. In other words, when I plug in my ethernet cable, I loose my WiFi.
Therefore, I need to be sure I am choosing the right option.
Fortunately, VirtualBox lets you switch adapters while a VM is loaded.
Notice in this screen show that some options are grayed out. That is
because the VM called Ubuntu 32 Minimal is currently running. But even
though some options are grayed out, the option to choose a new adapter
is still available, and I can switch back and forth at run time.
However, it often takes about 15 to 30 seconds before the change
registers with the VM. So you need patience.

![The Windows Device Manager with multiple NICs](images/NetRouter04.png)

**Figure 0X: The network settings page**

Notes on Virtualization Networking Deep Dive
--------------------------------------------

Layer-3 networking, HSRP (Hot Swap Routing Protocol) or\
VRRP (Virtual Routing Redundancy Protocol), link aggregation,\
VLANs and VLAN

 

a\
pile of gigabit copper ports or a smaller number of 10G\
copper or fiber Ethernet ports.

 

If you have the\
budget to deliver multiple 10G links to each virtualization\
host, then by all means, go that route

 

The use of VLANs in a virtualized infrastructure is a must.You can also
use the enhanced control afforded by VLANs\
to constrain certain VMs to their own specific network, and\
in some cases, create airlocked VLANs that can be used in\
development environments. There’s

 

There are three main methods\
of delivering shared storage to a virtualization host: iSCSI,\
NFS, or Fibre Channel.

 

If NFS is the choice, then there isn’t much to do on the\
host side, as the storage array will be busy handling the\
NFS serving, with the virtualization host acting as the client.\
There are definitely benefits to using NFS as a VM store,\
such as ease of backup and restore. But there are detriments\
as well -- notably, the inability for some virtualization solutions\
to create raw disk mappings on NFS-based storage.

If it’s 10G, then in most cases it’s as simple\
as connecting two 10G links to the core switches with\
VLAN trunking and link aggregation.

To sum up the basic host configuration: six 1G interfaces\
in bonded pairs for front-end, back-end, and storage\
links. For a 10G-equipped host, we’ll have just the\
pair of 10G links configured in a failover or bonded pair.
