---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/windows/VirtualMachines.md
relativePath: elvenware/os/windows/VirtualMachines.md
title: VirtualMachines
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:55 PM
---

<!-- toc -->
<!-- tocstop -->

Virtual Box on Elvenware
------------------------

I talk about VirtualBox and virtual machines in a number of places. Here is
reasonably complete place. (I probably ought to bring all these together
into a single Booklet called Virtual Machines.)

-   [General](../../development/cloud/virtualization.html)
-   [Linux](../linux/VirtualBox.html)
-   [Windows](#vboxWin)

Windows 8 Hyper-v and VirtualBox
--------------------------------

Windows 8 Hyper-V and VirtualBox do not get along. Issue two commands to
be able to dual boot so that you have one version of Windows with
Hyper-V and one without.

    bcdedit /copy {current} /d "Windows 8 (No Hyper-V)" 

You will see a GUID. It will look something like this:
{f3344558-9414-11e0-8d94-999f16891df9}. Copy that guid, (the one on your
you system, not the one I show here) then issues a second command:

    bcdedit /set {YOUR GUID} hypervisorlaunchtype OFF 

See this link:

-   [http://community.zevenseas.com/Blogs/Akhilesh/Lists/Posts/Post.aspx?ID=9](http://community.zevenseas.com/Blogs/Akhilesh/Lists/Posts/Post.aspx?ID=9)
-   [http://derekgusoff.wordpress.com/2012/09/05/run-hyper-v-and-virtualbox-on-the-same-machine/](http://derekgusoff.wordpress.com/2012/09/05/run-hyper-v-and-virtualbox-on-the-same-machine/)

Installing Windows On VirtualBox {#vboxWin}
--------------------------------

In this section I describe how to install Windows in VirtualBox, and
then Export and restore the appliance.

In this process, I have three goals I want you to achieve:

-   Enhance your understanding of virtual computing
-   Learn to install virtual systems that you can experiment with
    throughout this course without compromising the set up of your home
    system. In particular, there are various cloud tools that you can
    install into a virtual OS, and hence get the chance to learn how
    they work.
-   At least potentially, you can have a copy of an OS that you can take
    to school and use in class, and then carry it home with you for use
    on your home setup. This gives you a portable OS even if you don't
    have a laptop.

When learning about virtual systems, Android is an excellent operating
system to start with since it is small, and has very limited resource
requirements. With practice, one can install, export, and restore an
Android system in just a few minutes. On my system, I could easily
complete the whole cycle in 15 minutes, probably much less. This means
you can practice performing various exercises with a virtual machine in
a relatively short time span.

Though Android is stable and is built on top of Linux, it is still
difficult to perform some routine operating system tasks on it without a
deep knowledge of the Linux command line and architecture. As a result,
once you have had a chance to learn the basics of Virtual computing
using this small system, it is time to move on to more flexible tools.
(I don't mean to imply that Android is a toy. You can do a lot of with
it. But there are some tasks that are simpler to perform in more
conventional operating systems.)

Android is not the only small, low resource version of Linux. If you
[search the
web](http://www.techradar.com/news/software/operating-systems/10-best-linux-distros-for-2011-704584),
you will find [various versions of Linux](http://distrowatch.com/)
designed to run on limited hardware. However, the popular, robust and
VirtualBox-friendly Ubuntu distribution does have a very attractive set
of minimum requirements that look [like
this](https://help.ubuntu.com/11.10/installation-guide/i386/minimum-hardware-reqts.html):

  Install Type   RAM (minimal)   RAM (recommended)   Hard Drive
  -------------- --------------- ------------------- --------------
  No desktop     64 megabytes    256 megabytes       1 gigabyte
  With Desktop   64 megabytes    512 megabytes       55 gigabytes

Most students should have machines powerful enough to run Ubuntu Linux
in VirtualBox with relatively little pain. They can then use this OS to
explore a wide range of cloud based tools and scenarios. So our goal is
this: do the best you can with resource hungry, but powerful and easy to
use Windows. Then, if you find it is to slow or clumsy on your system,
also learn to use Linux for some of the tasks wel will perform in this
course.

### Installing Windows

If you have a fairly powerful machine, Windows runs well in VirtualBox.
I recognize, however, that not everyone in class has a machine of
sufficient power to make this a practical option. Nevertheless, I want
you to try, and simply report back to me what you experienced. Remember
that if you are running on an underpowered system, you may have
considerably more luck with the Linux install.

[![Vista in VirtualBox](images/VirtualBoxExportAndroid07Smaller.png)](images/VirtualBoxExportAndroid07.png)

**Figure 07: Vista in VirtualBox Running on Windows 7. Click to
enlarge.**

On a warmed up custom \$1000 desktop, I can boot to a VirtualBox Windows
Vista Ultimate sign-in screen in about 50 seconds, and be working in a
responsive desktop in about 70 seconds. That compares favorably with the
time it would take my machine to boot into the operating system when it
is installed on the bare metal. I know not everyone has similar
hardware, but we must always look to the future, and if this capability
is on (relatively cheap) high end machines today, it will be on many
more machines within 2-5 years.

Before installing Windows in VirtualBox, here are some issues you might
want to keep in mind right from the start:

-   Windows is proprietary product, and there are licensing issues. As
    students at BC you have access to copies of Windows that you can use
    as a Test OS. In particular, you might consider downloading the
    relatively low resource hungry Windows XP, though you will have more
    features if you use Vista or Windows 7. With Linux, you can create
    as many instances of the OS as you want, with Windows, you have to
    think carefully about licensing issues. One thing to keep in mind:
    it might be possible to use a 30-90 day trial copy of Windows. I
    don't know all the ins and outs of that process, but I've seen
    people use them for this purpose, and it can be just right for a
    virtual machine, as you often want them only for a short time.
-   Secondly, and no less importantly, Windows goes through a huge, even
    massive, time consuming, process of updating itself. If you install
    from disk, it can easily take a day before your copy of -- for
    instance -- Vista is up to date. This means you should install
    Vista, update it, and then save your work to a thumb drive or CD and
    also export a virtual appliance, as described in Part I of this
    assignment. Back it up, so you only have to do the process once!
    ***Please note:*** *you can significantly reduce the time reqired to
    update a Microsoft OS by [downloading service
    packs](http://windows.microsoft.com/en-US/windows/downloads/service-packs)
    and burning them to CD. You can then attach the drive to your
    virtual machine? (This works in hyper-v, but I haven't tried it yet
    in VirtualBox. You may have to burn an ISO and then attach the
    ISO?)*

Once you have Windows installed, you should export you appliance, as
described above in Part I of this assignment. On my system, it took
about 15 - 25 minutes to complete the export. I could then restore the
system in about 3-5 minutes. Think about that for a minute. You can have
a pristine, fresh install of Windows to play with in only 5 minutes. Use
it, abuse it, when you are done, delete it. Then restore a new version
in 5 minutes.

It is worth emphasizing that this is the same technology that makes
modern cloud computing possible. Big companies like Microsoft, Amazon
and others can deploy entire operating systems to virtual machines in
their clouds with the click of a button or the execution of a line of
code. The whole process need only take a few minutes to complete. This
makes it possible for them to cheaply and easily run a lucrative
business selling access to virtual machines to people who need such
resources.
