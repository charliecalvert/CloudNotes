---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design/Networks.md
relativePath: elvenware/development/design/Networks.md
title: Networks
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

From: virtualization networking deep dive.pdf

I (Charlie Calvert) did not write this. I don't know where it comes from.

Layer-3 networking, HSRP (Hot Swap Routing Protocol) or  
VRRP (Virtual Routing Redundancy Protocol), link aggregation,  
VLANs and VLAN

a  
pile of gigabit copper ports or a smaller number of 10G  
copper or fiber Ethernet ports.

If you have the  
budget to deliver multiple 10G links to each virtualization  
host, then by all means, go that route

The use of VLANs in a virtualized infrastructure is a must.You can also use the enhanced control afforded by VLANs  
to constrain certain VMs to their own specific network, and  
in some cases, create airlocked VLANs that can be used in  
development environments. There’s

There are three main methods  
of delivering shared storage to a virtualization host: iSCSI,  
NFS, or Fibre Channel.

If NFS is the choice, then there isn’t much to do on the  
host side, as the storage array will be busy handling the  
NFS serving, with the virtualization host acting as the client.  
There are definitely benefits to using NFS as a VM store,  
such as ease of backup and restore. But there are detriments  
as well -- notably, the inability for some virtualization solutions  
to create raw disk mappings on NFS-based storage.

If it’s 10G, then in most cases it’s as simple  
as connecting two 10G links to the core switches with  
VLAN trunking and link aggregation.

To sum up the basic host configuration: six 1G interfaces  
in bonded pairs for front-end, back-end, and storage  
links. For a 10G-equipped host, we’ll have just the  
pair of 10G links configured in a failover or bonded pair.
