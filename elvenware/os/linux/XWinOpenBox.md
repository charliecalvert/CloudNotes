---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/XWinOpenBox.md
relativePath: elvenware/os/linux/XWinOpenBox.md
title: XWinOpenBox
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: XWinOpenBox.md
fileNameHTML: XWinOpenBox.html
---

<!-- toc -->
<!-- tocstop -->

Install OpenBox GUI
-------------------

When you install Ubuntu Server, you begin at a black and white, text
only, command line. For a production sever, it is probably best to stay
there. You can, in fact, do everything you want from the command line
without ever using the mouse or other tools. There is even a text based
browser called Lynx that you can use in a pinch, though I find it much
more difficult to master than more familiar tools such as FireFox or
Chrome.  However, many users would prefer to be able to use a mouse for
some operations, and to browse with a GUI based browser. If you want to
do that, then you should install a **desktop environment** such as
OpenBox, Gnome or KDE****on top of the Linux command line. The end
result can be a very fast, very light weight GUI interface.

Gnome or KDE are full desktop environments similar to what is installed
with Ubuntu desktop, which in turn is similar to Windows or the Mac.
These are great environments but they relatively heavy weight, at least
compared to Openbox. This may not matter on a powerful machine, but they
can slow you down if you have a slow or resource strapped machine. To
keep things light, use [OpenBox](http://openbox.org/) instead. (I should
add that if you are new to Linux, then you should probably install
Ubuntu desktop if at all possible, as the Linux command line can
frustrate the uninitiated.

Here are the commands to install OpenBox on a server edition of Ubuntu
which has no GUI at all when you start. It is a two step process: first
install X11 ([X Window
environment](http://en.wikipedia.org/wiki/X_Window_System)) and then
install OpenBox.

~~~~ {.code}
sudo apt-get install xorg
sudo apt-get install openbox
~~~~

[![Apt installing openbox](images/AptOpenBoxSmall.png)](images/AptOpenBox.png)

**Figure 01: Installing OpenBox. Notice the first line, where I write
sudo apt-get openbox. The correct syntax is sudo apt-get install
openbox.**

You probably also want to install FireFox:

~~~~ {.code}
sudo apt-get install firefox
~~~~

When you have these tools installed, the next step is start the X-Window
system. To do that, you simply type:

**startx**

When OpenBox first starts, you are greeted by a blank screen. Right
click to get the menu.

Window Manager vs Desktop Environment
-------------------------------------

OpenBox is a window manager. This means it provides the technology to
open and close windows. It does not provide an entire desktop
environment like Windows or Ubuntu Desktop that comes with a taskbar and
system panel.

### X Window

X Window is a graphical environment with a long history dating back to
the mid-eighties. That is the same time frame when both Apple and
Microsoft first released GUI's. Here are some dates of first releases:

-   Xerox PARC first GUI debuts in 1975
-   [Xerox 810 Star Information
    System](http://en.wikipedia.org/wiki/Xerox_Star), the first full
    GUI, shipped in 1981.
-   The Apple Macintosh shipped January 24, 1984 (The Apple Lisa was
    released on Jan 19, 1983.)
-   X1, the first X Window version, was released in June, 1984. The
    first version licensed to third parties was X6, released in January
    of 1985.
-   Microsoft Windows 1.0, running on top of DOS, was released on
    November 20, 1985.

X Window is a bit different from either Windows or the Mac in that it
can be run either directly on top of the command line, or remotely. This
is possible because it has a network protocol built into it. This means
that you can do neat tricks such as install tools on Windows (ming is an
example) that will allow you to run remotely hosted Linux applications
on your Windows desktip.

 If you are at the Linux command prompt, then you can start X Window and
load a kind of minimal GUI that would let you run applications like
FireFox. Or, you can start X Window (ming) on Windows, and load one of
the applications from your Linux server on your Windows desktop. The
application actually runs on the Linux server, but it's display is sent
across the wire to your Windows desktop. Of course, X Window was not
designed primarily for Windows to Linux communications, but rather for
communications from any one machine, be it Linux or Windows, to some
remote server or desktop. Most Linux based graphical environments are
based on X11.

### Installing Gnome or KDE

Here is the commands to install Gnome

~~~~ {.code}
sudo apt-get install ubuntu-desktop
~~~~

Here is how to install KDE

~~~~ {.code}
sudo apt-get install kubuntu-desktop
~~~~

### Links

For more details you can read this:

[https://help.ubuntu.com/community/ServerGUI](https://help.ubuntu.com/community/ServerGUI).

Adjust Resolution
-----------------

I have often had a struggle trying to set the screen resolution on
Linux. There are some tools that automate the provcess, including
Startup-Manager.

~~~~ {.code}
sudo apt-get install startupmanager
~~~~

Then to run the tool just type:

~~~~ {.code}
sudo startupmanager
~~~~

After you set the resolution, you should consider rebooting:

~~~~ {.code}
sudo reboot
~~~~

After restarting you should (if everything worked) come up in the new
resolution that you chose.

Install Video Drives for NVIDIA
-------------------------------

See [this post](http://www.noobslab.com/2011/09/nvidia-drivers-for-ubuntu-1110-oneiric.html),
which says: run the following commands in a terminal window:

~~~~ {.code}
sudo apt-add-repository ppa:ubuntu-x-swat/x-updates
sudo apt-get update
sudo apt-get install nvidia-current
~~~~

A tool that might help is ndr.

Alternative.
------------

It is possible to attach to a Linux server from Windows and run the
applications that live on the Windows box in your windows desktop. You
install a copy of XWindows on Windows, and then use the xWindows tools
to log in remotely to applications running on Linux. If says
[here](http://forums.atomicmpc.com.au/index.php?showtopic=43363) that
you can use XDMCP. It's unlikely that it is not already installed, but
you may need to first install the openssh-server package:

~~~~ {.code}
sudo apt-get install openssh-server
~~~~

On your other system, start a X server window. On Windows, use Xming, or
on MacOS X, Xquartz and Xephyr. Use SSH to connect to the remote host
and forward your X server socket across:

~~~~ {.code}
$ DISPLAY=:1.0 ssh -Y user@otherhost.otherdomain gnome-session --session=ubuntu
~~~~

Install the VirtualBox Additions for Ubuntu Server
--------------------------------------------------

This is covered in the [page on VirtualBox](VirtualBox.html).

Edit the Menu
-------------

You can edit the Menu.xml file. It can be stored in the
\~/.config/openbox directly. Because the .config directory begins with a
period, you will not normally see it when you run the list command:

~~~~ {.code}
ls
~~~~

Instead, run list with the -a option:

~~~~ {.code}
ls -a
~~~~

If you don't see a .config directory, then create one. Inside it create
an openbox directory:

mkdir .config

mkdir .config/openbox

Now copy the existing menu for Openbox into this directory, and edit it
as you feel best:

~~~~ {.code}
cp /etc/xdg/openbox/menu.xml .config/openbox/ .
~~~~

Background Image
----------------

Download some images. Install nitrogen:

sudo apt-get install nitrogen

Add nitrogen to the menu. The simplest way is with a program called
obmenu, which you can download with:

sudo **apt-get install nitrogen**.

Here is the entry you can add to Menu.xml:

~~~~ {.code}
<item label="nitrogen">
  <action name="Execute">
    <execute>
       nitrogen /home/charlie/Downloads
    </execute>
  </action>
</item>
~~~~

In this particular example, /home/charlie/Downloads is the folder where
I have a list of background files. If you execute nitrogen from the
Openbox menu, then you will get a chance to pick which of the files
found in the folder you want to display as your wallpaper.

Link
----

-   [Ubuntu Openbox
    community](https://help.ubuntu.com/community/Openbox)
    -   [Configuration
        Section](https://help.ubuntu.com/community/Openbox#Configuration)

-   [Back to Linux Top](index.html)

