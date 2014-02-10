

Install Guest Additions in Linux
--------------------------------

If you set up the VirtualBox Guest Additions in Linux, you will find
that you have better control over your virtual machine. In particular,
you will find it easier to resize your desktop or make it full screen.
You should also have better control over the mouse.

- [Details](http://elvenware.com/charlie/os/linux/VirtualBox.html#guest)

Share Clipboard Between Windows and Linux
-----------------------------------------

- [Details](http://elvenware.com/charlie/os/linux/VirtualBox.html#shareClipboard)


DropBox
-------

DHCP
----

-   IP Addresses
-   Routers

Networking and VirtualBox
-------------------------

-   MAC Addresses
-   Copy from One Machine to Another

Virtual Appliances
------------------

There are three pages on Elvenware that focus on VirtualBox. To learn about
virtual appliances, read the first page listed here. It is a good idea, however,
to become familiar with all three pages:

-   <http://www.elvenware.com/charlie/development/cloud/virtualization.html>
-   <http://www.elvenware.com/charlie/os/linux/VirtualBox.html>
-   <http://www.elvenware.com/charlie/development/android/Androidx86.shtml>

Networks
--------

See also this page:

-   <http://www.elvenware.com/charlie/development/cloud/Networks.html>

You can run the PING command to find out if you are connected to the Internet.
Also, run **ifconfig** on Linux, and **ipconfig /all** on Windows.

![NetRouter](http://elvenware.com/charlie/development/cloud/images/NetRouter01.png)
![NetRouter](http://elvenware.com/charlie/development/cloud/images/NetRouter02.png)
![NetRouter](http://elvenware.com/charlie/development/cloud/images/NetRouter03.png)


Figure 03: There are two active network adapters on my system. One is for my
ethernet cable, the other for wifi. If I connect to a VM, and choose Realtek
Family Controler, but there is no Ethernet cable plugged in to my laptop, then I
am going to have a trouble. As a result, I usually use WiFiLink because it works
even if the cable is not plugged in. However, on my machine, it often seems like
it is either/or, not both. In other words, when I plug in my ethernet cable, I
loose my WiFi. Therefore, I need to be sure I am choosing the right option.
Fortunately, VirtualBox lets you switch adapters while a VM is loaded. Notice in
this screen show that some options are grayed out. That is because the VM called
Ubuntu 32 Minimal is currently running. But even though some options are grayed
out, the option to choose a new adapter is still available, and I can switch
back and forth at run time. However, it often takes about 15 to 30 seconds
before the change registers with the VM. So you need patience.

![NetRouter](http://elvenware.com/charlie/development/cloud/images/NetRouter04.png)
