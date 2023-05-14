---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server/HttpBasics.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server
fileName: HttpBasics.md
relativePath: /web/Server/HttpBasics.md
title: HttpBasics
directoryName: Server
category : cssguide-guide
---

Toggle Menu

Charlie Calvert on Elvenware
============================

Writing Code and Prose on Computers
-----------------------------------

Menu
----

Core Code
---------

-   [Strongly Typed](../../index.html)
-   [Web & Scripts](../index.html)
-   [Cloud](../../cloud/index.shtml)

OS and Tools
------------

-   [OS](../../../os/index.html)
-   [Database](../../database/index.html)
-   [My Writing](../../../books/index.html)

Art
---

-   [Poems & Photos](../../../Art/index.html)
-   [Book Reviews](../../../books/reading/index.html)
-   [Spiritual](../../../spirit/index.html)

Links
-----

-   [My Links](../../../links.html)
-   [Falafel](http://www.falafel.com/)
-   [Sourceforge](http://sourceforge.net/projects/elvenware/)

![Elvenware](../../../images/elvenwarelogo.png)

HTTP Basics
===========

The Original Slide deck on which this half formed page is based can be
found
[here](https://docs.google.com/present/edit?id=0AW5UTAlOfPRGZDRqenFqc18yOGY5NDNwcmd0&hl=en_US).

Background
----------

There are many devices in our lives that host or serve content:

-   PCs, NoteBooks
-   NetBooks, Tablets Phones, MP3 Players

The TCP/IP protocol is used to bind these diverse tools togother:: In a
sense, TCP/IP is the Internet!

History
-------

The Internet was created at the instigation of a government organization
called [DARPA](http://www.darpa.mil/) Defense Advanced Research Projects
Agency. It is a relatively small branch of the Department of Defense
(DoD) with 240 employees, half technical. It's job is to create new
technologies for the military.

The first important network they created was called the
[ARPANET](http://en.wikipedia.org/wiki/ARPANET): the  Advanced Research
Projects Agency Network. It was a packet switching network, but was
originally based on NCP rather than TCP/IP. It was not until 1983 that
the ARPANET adopted TCP/IP, but Vinton Cerf, the creator of NCP, began
work on TCP/IP in 1973.

Funded by DARPA Created the Internet in late 1969

TCP/IP Created in early 70's, circa 1973. Primary Authors: Vinton Cerf
and Bob Kahn where were looking for a way to connect ARPANET computers

TCP/IP
------

TCP/IP is The protocol of the Internet.

The name is created by combining to acronyms:

-   TCP: Transmission Control Protocol
-   IP: Internet Protocol

TCP describes how to make packets, while IP describes how to route them.

To find where a particular router is located, based on an IP address, go
to:

-    [MaxMind](http://www.maxmind.com/en/home)
-   [http://iplocation.pythonclub.org/](http://iplocation.pythonclub.org/)

Data Packets
------------

Rather than transmitting an entire file at once, TCP/IP sends
information across the web in packets. A file is broken up into packets
and sent one packet at a time. As result, the intelligence is at the
endpoints: first the place where the data is broken up into packets, and
then on the other end where the data is reassembled from packets.

Of course, there is significan't technology involved in the transport
layer, which handles the routing and ferries the packets from the origin
to the source. One of the interesting things about TCP/IP is that
packets can be routed differently. They are then assembled at the
destination, regardless of what route they took, or in what order they
arrived.

Each packet has a destination address stored in a header. Each machine
that is sent a pack reads the destination address found in the hearder,
and then passes it down the line.

LANs and WANs

A WAN typically encompasses a large area such as a city, county, state
or country. A LAN, on the other hand, typically encompasses only a
single home, or even a single room in a home. Sometimes a LAN will
stretch over several buildings. A LAN is usually comprised of a single
subnet.

### Switches, Router and Gateways

Switches, routers and gateways are very similar tools. A switch or a hub
can be thought of as a primitive router. A router is a small computer
located between two networks. It forwards packets between the two
networks by reading the address in a packet and looking up its
destination in a table. A typical example would be a router that stands
between one or more home networks and a Wide Area Network. If there is a
need to link two networks that use different protocols, then the machine
or tool used to bridge the networks is called a gateway. One can think
of a router as being a simple gateway.

Most routers sold for the home market also contain tools like DHCP
servers and firewalls.

### HTTP Transactions

The transactions are stateless. Use GET, POST, PUT, DELETE, HEAD, TRACE
and OPTIONS.

Every transaction has a header, which can be examined, and a body which
need not be examined until it used by the client or server.

### UDP

TCP guarantees delivery of information, but UDP just sends a packet and
hopes for the best. This may sound rather polyannish, but sometimes UDP
is a good thing. For instance, if you are streaming TV or music then it
would be better to drop a little bit of data than to cancel the
transmission altogether. When you are listening to music or watching
videos, you will sometimes notice these flaws in the transmission.

URLS
----

A URL is a scheme for making an IP address human readable.

Here is hostname: **www.bellevuecollege.edu**

You can register a host name with company designated to guarentee that
the names are unique.

It is important to understand the different parts of a URL.

-   In [www.bellevuecollege.edu](http://www.bellevuecollege.edu) that
    .edu: part is the top level domain
-   In [www.elvenware.com/charlie](http://www.elvenware.com/charlie) the
    charlie part is the path
-   In [www.live.com/maps](http://www.live.com/maps) we see that maps is
    the path

### URL Scams

-   Thieves like to create misleading URLs
-   How to make bar.com look like mybank.com:
    -   [http://www.mybank.com](http://www.mybank.com/) is safe
    -   [http://mybank.bar.com](http://mybank.bar.com/) is part
        of [bar.com](http://bar.com/)
    -   [http://www.bar.com/mybank](http://www.bar.com/mybank) is part
        of [bar.com](http://bar.com/)

-   HTTP Secure 
    -   HTTPS instead of HTTP
    -   Uses HTTP plus SSL/TLS
    -   [https://www.mybank.com](https://www.mybank.com/) is a secure
        site
    -   Send a password to https, but not to http

IP Addresses
------------

-   192.168.1.1
-   Use DNS (Domain Name System) to look up IP address from a URL
-   IPv6 - Show with Spreadsheet
    -   Internet Protocol Version 6
    -   IPv4: 2 to the 32 (32 bit)
    -   IPv6: 2 to the 128 (128 bit)

-   Extended validation certificates:
    -   [http://www.bankofamerica.com](http://www.bankofamerica.com/)
    -   [http://addons.mozilla.org](http://addons.mozilla.org/)
    -   Works in all the major browsers

### Subnets

The various sections of an IP addresses are broken up by periods, and
these periods are used to define subnets. For instance, the subnet
beginning with 192.168.1.X can consist of up to 256 nodes designated by
the digits found in X. Consider the first set of numbers: 192. This
number consists of 8 bits, which means if can have a value between 0 and
255. All four sets of numbers added together are 8 \* 4 or 32 bits. If
we write 192.168.1.0/24, then that means we consider the first 24 bits
(192.168.1) to be the network prefix, and the last 8 bits are used to
address a particular host. The values 255.255.255.0 is the network mask
for routing prefix 192.168.1.0/24. We use a router to move data between
different subnets.

### HTTP SSH

-   These are forms of secure communication across the Internet
-   SSH provides a handshake ensuring you have the right client and
    server
    -   SFTP is FTP over SSH

-   SSL and TSL
    -   Secure sockets layer
    -   TSL is a type of SSL

-   When looking at URLs, you sometimes see this:
    -   https://www.foo.com
    -   This is HTTP over SSL 

-   More on this in a later class

### Windows Tools

-   NETSTAT: Ports in use
-   Let Something Through Firewall
    -   Control Panel\\System and Security\\Windows Firewall
    -    Advanced Settings
    -   In Windows Firewall with Advanced Security Dialog
    -   Inbound Rules, set up connections

SMB
---

Server Message Block allows a machine to share services such as
printers, files, named pipes and serial ports. In general, a client asks
a server for these services using the SMB protocol, which frequently
runs over TCP/IP. This is primarily a Microsoft Windows protocol, and to
some degree has been replaced by Active Directory, though Windows
machines still tend to run this protocol.

NETBIOS
-------

NETBIOS is an old network protocol for sending messages between
computers. Microsoft uses it heavily when setting up Local Area
Networks. It now runs on top of TCP/IP port 139 so that it can be routed
across a WAN. Originally, it did not run on TCP/IP and therefore could
only be used on a LAN. NETBEUI extends NETBIOS by more rigorously
defining the protocol for sending messages. There is a NETBIOS naming
service that can be used to explicitly name a server. This is not
technically the same thing as a Host Name, though the Host Name and the
NETBIOS name can be the same, even though they are two separate
entities. An example use for NETBIOS might be to request a file share.

-   [http://compnetworking.about.com/od/windowsnetworking/g/netbios.htm](http://compnetworking.about.com/od/windowsnetworking/g/netbios.htm)
-   [http://searchnetworking.techtarget.com/definition/NetBIOS](http://searchnetworking.techtarget.com/definition/NetBIOS)

NETSTAT
-------

This is a utility that ships with Windows. It can tell you about the
status of your network. Here, for instance, you can see what services
are using your network:

netstat -ano

The ports are listed on the left. One of the columns you get back is
PID. Use the Task Manager, on the Processes page, to translate a PID
number to an application. You may need to use **View | Select Columns**
to make the PID visible.

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
