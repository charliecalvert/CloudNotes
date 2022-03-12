---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/index.md
relativePath: elvenware/os/linux/index.md
title: Index
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

# Linux

The main index for the Linux knowledge on Elvenware.

What is the difference between Windows and Linux? They are both great operating systems, but Windows is optimized for end users, and Linux is optimized for developers.

## Key Links

The first two links below are the most important:

-   [Linux Files](LinuxFiles.html): Working with Files in Linux
-   [Configure Linux](ConfigureLinux.html)
-   [Linux and VirtualBox](VirtualBox.html)
-   [Linux FAQ](LinuxDays/LinuxFAQ.html) (Mix of 1990s and new code)
-   [CreateMasterTag (elf-tagger)][emt]
-   [Linux Basics](LinuxBasics.html)
-   [Open Box](XWinOpenBox.html)
-   [Linux Days](LinuxDays/LinuxDaysBorland.html) (Borland Kylix, 1990s)

## Basics

Initially, there was an OS called Unix which was created back in the late sixties and early seventies by the same folks who created the C programming language. It tended to be very expensive. So in the nineties, a guy named Linux Torvalds created Linux, which was a free, open-source version Unix.

Many people created different versions of Linux, always building on the work by Linux Torvalds. Each different version is called a distribution.

As a rule, these distributions were free, but sometimes you had to pay for them or pay for support. About ten years ago a very successful developer from South Africa called Mark Shuttleworth created a distribution called Ubuntu which was free and very successful. There are several flavors of Ubuntu. There is the core Ubuntu distribution which is very good but a bit heavyweight because of its fancy UI. Lubuntu appeal to those who wanted the advantages of the Ubuntu command line without such a fancy UI. Lubuntu is an official Ubuntu distribution.

Virtual Box can host both Ubuntu and Lubuntu, but we use Lubuntu because it is lightweight. It takes up less disk space and less memory and runs faster. But it is not as fancy as Ubuntu.

There is a huge amount of detailed information about Linux on the web. To get started, just pick some interesting looking links from a simple Google search:

- [Simple Linux Search](https://www.google.com/search?q=linux)

We will talk more about Linux in the coming days and weeks.

## Overview

If you are using Ubuntu, it is definitely worthwhile for you to get to
know the MediaWiki based Ubuntu Guide site:

- [http://ubuntuguide.org](http://ubuntuguide.org)
- [Shell Explained](http://explainshell.com/)

Note that the also have ebooks available:

- [Rute](http://rute.2038bug.com/index.html.gz)
- [Linux Fundamentals](http://linux-training.be/files/books/LinuxFun.pdf)
- [Linux Tutorials](http://ryanstutorials.net/linuxtutorial/)
- [Garrels](http://tldp.org/LDP/intro-linux/html/index.html)
- [http://ubuntuguide.org/wiki/EBooks](http://ubuntuguide.org/wiki/EBooks) 
- [William Shotts](http://linuxcommand.org/tlcl.php)

William Shotts advocates for free information. His is a good book on the Linux command line.

Command Line Cheat Sheets:

- [Admin Reference](http://overapi.com/static/cs/linux_quickref.pdf)
- [Command Line ShortCuts](http://www.cheatography.com/davechild/cheat-sheets/linux-command-line/)
- [Bash Shell](http://cli.learncodethehardway.org/bash_cheat_sheet.pdf)
- [OverApi](http://overapi.com/linux/)
- [OverApiReference](http://overapi.com/static/cs/fwunixref.pdf)
- [Polski](http://www.pixelbeat.org/cmdline.html)


## Update Server

One chore you should perform regularly is updating the code on your
server. It is possible to have this done automatically, but I usually do
it by hand. All you need do is issue the following two commands.

~~~~ {.code}
sudo apt-get update
sudo apt-get upgrade
~~~~

If you want to update from one version of the distro to the next
version, then use this command:

~~~~ {.code}
do-release-upgrade
~~~~

Install Oracle/Sun Java
-----------------------

Java gets installed in the **/usr/lib/jvm** directory.

~~~~ {.code}
sudo apt-add-repository ppa:flexiondotorg/java
sudo apt-get update
sudo apt-get install sun-java6-jdk sun-java6-plugin
sudo update-alternatives --config java
~~~~

Install SSH
-----------

On Ubuntu:

~~~~ {.code}
apt-get install ssh
~~~~

On the client machine:

~~~~ {.code}
ssh-keygen
ssh-copy-id <userName>@<theServerYouWantToConnectTo>
ssh <userName>@<theServerYouWantToConnectTo>
~~~~

On the server edit /etc/ssh/sshd\_config and set Password Authentication
to no.

<!--       -->
<!-- links -->
<!--       -->

[emt]: /teach/assignments/linux/ScriptMasterTags.html
