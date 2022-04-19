---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxOutline.md
relativePath: elvenware/os/linux/LinuxDays/LinuxOutline.md
title: LinuxOutline
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: LinuxOutline.md
fileNameHTML: LinuxOutline.html
image: ./course/course-javascript.jpg
subject: LinuxDays
queryPath: elvenware/os/linux/LinuxDays/
---

<!-- toc -->
<!-- tocstop -->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=iso-8859-1">
	<TITLE>Linux Outline</TITLE>
    <META NAME="AUTHOR" CONTENT="Charlie Calvert">
	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
<BODY>
<H1>Linux and Kylix</H1>
<P>This two day seminar is designed to accomplish two goals:</P>
<OL>
	<LI><P>Present an overview of Linux from the point of view of a
	programmer</P>
	<LI><P>Explore how to use Kylix to create powerful applications that
	run natively on the Linux platform.</P>
</OL>
<H2>Linux Overview</H2>
<P>This first part of the talk is an introduction to Linux for Object
Pascal programmers. It is designed to tell you in a relatively short
space the most important things programmers need to know about Linux.
It starts with the basics, but goes on to&nbsp;explore more advanced
topics.</P>
<H3>What Lies Ahead</H3>
<P>This talk is divided into several section:</P>
<UL>
	<LI><P STYLE="margin-bottom: 0in">I begin with a description of the
	Linux philosophy, or way of life. 
	</P>
	<LI><P STYLE="margin-bottom: 0in">Next you will find a few words on
	Linux and programmers. 
	</P>
	<LI><P STYLE="margin-bottom: 0in">Then we will plunge into various
	technical subjects, starting with the install and choice of
	distribution. 
	</P>
	<LI><P STYLE="margin-bottom: 0in">After that comes a description of
	the Linux file and directory structure. 
	</P>
	<LI><P STYLE="margin-bottom: 0in">Key Utilities and Apps are next. 
	</P>
	<LI><P STYLE="margin-bottom: 0in">Scripting and Programming tools
	will be discussed in depth. 
	</P>
	<LI><P>Finally, there will be section on books and articles that
	might be useful to you. 
	</P>
</UL>
<H3>The Linux Way of Life</H3>
<P>Most people who really like Linux view it as more than just a
piece of software. For them, Linux is a way of life. This section of
the talk explores Linux as a cultural phenomenon. 
</P>
<H3>Camps in the Land of Linux</H3>
<P>There are many camps inside the land that is Linux. There is
Richard Stallman's GNU camp, and there is Eric Raymond's Open
Software camp. There are the entrepreneurs of the software business,
such as Bob Young at RedHat or Tim O'Reilly at O'Reilly books. And
there are also the full time rebels, some of whom are admirable
idealists, and others who are simply social misfits. This section of
the talk explores some of these aspects of the Linux political
landscape.</P>
<H3>Linux and Programmers</H3>
<P>Linux is not the kind of software your recommend to your spinster
aunt who wants to find sites on the web dedicated to crocheting. The
people who are most at home with Linux are developers. In the
programmer's Valhalla that is Linux, one finds more programming
languages than there are trees in one of Tolkein's forests.This is an
OS that was designed to be programmed. Not programmed by wizards, by
programmed by mere mortals. This section of the talk explains how to
use simple programming tools to get Linux to do what you want.</P>
<H3>Linux Strengths and Weaknesses</H3>
<P>Linux has three great strengths:</P>
<OL>
	<LI><P>Powerful multitasking</P>
	<LI><P>Powerful networking</P>
	<LI><P>Powerful scripting</P>
</OL>
<P>Linux has two great weakness:</P>
<OL>
	<LI><P>Newbies find the install difficult</P>
	<LI><P>Lack of good applications!</P>
</OL>
<P>This section talks about the strengths and weakness of Linux.</P>
<H3>Distributions</H3>
<P>Everyone asks about distributions, and which one to get. This
section talks about the various distributions, there relative merits,
and how to choose the one you want.</P>
<H3>Install</H3>
<P>The Linux install can be a bit tricky for newcomers. Linux can be
the only OS on a system, or it can be dual booted with other OSes.
This section talks about the install process, and the options you
might want to consider while wrestling with the demon. Learn about
installing network cards and video cards.</P>
<H2>Part II: Linux Technology</H2>
<H3>The Command Line Vs the X Window System</H3>
<P>Linux is different from Windows in that it runs natively at the
command line, rather than in a GUI. This section of the talk explores
the power of the Linux command line.</P>
<H3>Directories</H3>
<P>Directories on Linux are different than directories on Windows. Or
rather, Windows is only recently coming around to the Linux view of
how directories should be structured. Your disk is divided up into
various directories that serve specific purposes. This section of the
talk describes these directories and explains their import.</P>
<H3>Linux Utilities</H3>
<P>There are many important Linux utilities. In this section of the
talk I describe some of the utilities I think all developers should
know how to use. The basic features of the utilities are described,
and then techniques for mastering them are gone over in some depth.</P>
<H4>Editors</H4>
<P>Learn about EMACS, Joe, Vi, and KEdit 
</P>
<H4>Scripting Languages</H4>
<P>Learn about Bash Scripting, Perl,&nbsp;and Python</P>
<H4>System Utilities</H4>
<P>Learn about key system utilities such as su, cron and shutdown.</P>
<H3>Configuration Files</H3>
<P>The configuration files in the etc directory play the same role in
Linux that the registry does in Windows. Learn about fstab,
ftpaccess, hosts.deny, and many other key configuration files. Learn
to use LinuxConf to configure many of these files.</P>
<P>Logs</P>
<P>To maintain your system properly you need to pay attention to the
log files it generates. In this section you will learn about
messages, lastlog, secure, and other key logging files or logging
mechanisms.</P>
<H3>Linux Networking</H3>
<P>Learn about Samba and NFS.</P>
<H3>Books</H3>
<P>To get started, you need books. In this section of the talk I
recommend some good books.</P>
<H2>Part III: Kylix Architecture</H2>
<P>This part of the talk is designed to give you a relatively
advanced, in depth, view of Kylix.</P>
<H3>CLX Overview</H3>
<P>Learn about the basics of the CLX architecture. Which parts of CLX
give you access to system services, which give you access to
component architectures, which give you access to databases, and
which give you access to internet technologies?</P>
<H3>baseCLX</H3>
<P>Learn how to use Kylix from the command line, how to access system
features, how to create libraries, how to link in code from other
languages, how to share your code with other languages.</P>
<H3>visualCLX</H3>
<P>Learn how to create components, how to create GUI interfaces, how
to build packages, how to work with interfaces, and how to construct
robust architecures.</P>
<H3>dbCLX</H3>
<P>Learn how to create database applications based on the new
dbExpress architecture. Learn how to thrive in a world that has no
Borland Database Engine. A significant portion of this section of the
talk will be dedicated to an exploration of Midas.</P>
<H3>Creating Internet Applications</H3>
<P>Learn about creating CGI applications, working with Apache,
wrestling with TCP/IP, FTP, HTTP, finger and ping.</P>
<H3>Graphics Programming</H3>
<P>This section of the talk focuses on using the graphics services
provided by CLX or made available through calling native Linux APIs.</P>
<H3>Summary</H3>
<P>In this two day seminar you have gotten a good long look at both
the Linux operating system itself, and of Kylix. Linux was explored
from the point of view of a developer, and Kylix was examined as a
tool for developing applications that are suited to the Linux
environment.</P>
<P><BR><BR>
</P>
</BODY>
</HTML>