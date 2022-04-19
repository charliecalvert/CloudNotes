---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxNFSSambaCVS.md
relativePath: elvenware/os/linux/LinuxDays/LinuxNFSSambaCVS.md
title: LinuxNFSSambaCVS
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: LinuxNFSSambaCVS.md
fileNameHTML: LinuxNFSSambaCVS.html
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
	<TITLE>Files</TITLE>
    <META NAME="AUTHOR" CONTENT="Charlie Calvert">
	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
    <!-- $Id: LinuxNFSSambaCVS.html,v 1.4 2002/09/02 15:36:45 ccalvert Exp $ -->
</HEAD>
<BODY>
<H1>NFS, SAMBA and CVS</H1>
<UL>
	<LI><P STYLE="margin-bottom: 0in"><A HREF="#NFS">NFS</A></P>
	<LI><P STYLE="margin-bottom: 0in"><A HREF="#Samba">SAMBA</A></P>
	<LI><P><A HREF="#cvs">CVS</A></P>
</UL>
<P>In this part of the talk you will learn how to hook various
machines together in a heterogeneous network. 
</P>
<P>If you want to share drives over a linux network you can use the
Network File System, which is called NFS. If you want to connect
Linux machines to windows machines, you can use SAMBA. 
</P>
<P>There are various reasons to share drives between machines, but
one convenient tool which really comes into its own in such an
environment is CVS. The Concurrent Versions System is a version
control system. 
</P>
<H4><A NAME="NFS"></A>NFS</H4>
<P>NFS is a technology that allows two UNIX boxes to share drives. 
</P>
<P>Here is the command ot start nfs:</P>
<PRE>/etc/rc.d/init.d/nfs start</PRE><P>
You can also stop it, or check its status</P>
<PRE>/etc/rc.d/init.d/nfs stop
/etc/rc.d/init.d/nfs status</PRE><P>
Here is how to mount a drive on remote machine:</P>
<PRE>mount 192.168.1.1:/home/ccalvert /mnt/foo</PRE><P>
You can specify what to export from your machine in the file:</P>
<PRE>/etc/exports</PRE><P>
For instance:</P>
<PRE>/home </PRE><P>
Here is how to export your home directory as read only from</P>
<PRE>/etc/exports:

/home (ro)</PRE><P>
Here is how to export as read write from /etc/exports. 
</P>
<PRE>/home/ccalvert (rw)</PRE><P>
To make the above statement work properly, you may need to be signed
on as ccalvert on the client machine.</P>
<P>Here is a line you can add to your fstab file to make it so you an
mount more easily:</P>
<PRE>192.168.1.30:/home/ccalvert /mnt/foo  nfs     noauto,user,rw     0 0</PRE><P>
After adding this line, you can mount with this command:</P>
<PRE>mount /mnt/foo</PRE><P>
To see what's going on on another machine:</P>
<PRE>rpcinfo -p 192.168.1.1</PRE><H4>


<A NAME="Samba"></A>SAMBA</H4>
<H4>run this, or the result of cat /var/run/inetd.pid, which is a na
a number:</H4>
<PRE>kill -HUP `cat /var/run/inetd.pid`</PRE>

<P>Go to /etc/rc.d/init.d and run:</P>
<PRE>./smb start</PRE>
<P>You should then run:</P>
<PRE>./smb status </PRE>
<P>to be sure it is running (two files)</P>
<P>To check smb.conf run testparm</P>
<P>Set security to either user or share</P>
<P>To create a public share called myshare:</P>
<PRE>[myshare]
   path = /home/ccalvert
   public = yes
   only guest = yes
   writable = yes
   printable = no</PRE><P>
<BR><BR>
</P>
<P>You probably want to set the security level to share, unless you
have domain controller.</P>
<P>Set the directory and the files in it to the group users</P>
<P>go to /etc/samba/smb.conf</P>
<P>and set the following:</P>
<PRE>   encrypt passwords = yes
   smb passwd file=/etc/samba/smbpasswd</PRE>
<P>You probably have to manually start nmbd</P>
<H3><A NAME="cvs"></A>CVS</H3>
<P>CVS is a version control system. There are two big differences
between this system and the system used by other people:</P>
<OL>
	<LI><P>It is an open source project, and thus free.</P>
	<LI><P>It allows concurrent checkouts. Two people can checkout the
	same file at the same time. CVS then merges the code automatically.
	Unless you tell it not to, it will merge in every line of code so
	long as no two developers were working on the same line of code. If
	two people were working on the same line, then you have to perform
	the merge on those lines manually.</P>
</OL>


<P>There are several ways to run CVS. It can be used by a single
developer. It can be used by a group of developers who are tied
together over a lan. CVS can also be used by developers who are
working over a network.</P>
<P>A single developer might use CVS to back up a project. Why would a
lone developer want such a tool? There are serveral reasons:</P>
<OL>
	<LI><P>It provides a history of a project. This will allow you to go
	back to a previous version if you decided you started down the wrong
	road. It can also let you recreate pervious versions of a product,
	such as Version 1.0, Version 2.0, etc.</P>
	<LI><P>It helps developers perform reliable backups of a project.</P>
	<LI><P>It makes it trivial to keep a project in sync across multiple
	machines, such as a desktop machine and your laptop machine.</P>
</OL>
<P>In this example we will assume that multiple people are working on
the project, but that everyone is on the same network. 
</P>
<P>Use NFS or SAMBA to connect to a machine that can share a drive
with everyone on your network. The server should be a linux machine,
but the clients can be either Windows or Linux. Each client should
have a copy of CVS on it. Linux usually comes with CVS, while the
Windows version of CVS consists of a single executable.</P>
<P>If you want to keep two machines in sync, the way to do it is a
have a third machine that acts as the intermediary between the first
two. That third machine is the real back up machine, but it keeps the
back up in the form of a cvs repository. You can put a repository on
a CD if you wish.</P>


<H4>Using CVS</H4>
<UL>
<LI>The first thing you need to do is set up the environment to tell cvs where to store files:</LI>
<LI>To do this, add this line to .bash_profile: export CVSROOT=/home/ccalvert/cvsroot</LI>
<LI>Go to the directory you want to import into cvs and type</LI>
<LI>cvs import myproject ORIGINAL START</LI>
<LI>Finally, to check out the project and work on it, type cvs checkout myproject</LI>
</UL>


<H4>Updating cvs</H4>
<UL>
<LI>You can check in your work by typing the following:</LI>
<LI>cvs commit</LI>
<LI>You can also add and remove files</LI>
<LI>cvs add myfile.txt</LI>
<LI>To remove the file, first delete it, then give the remove command:</LI>
<LI>cvs remove myfile.txt</LI>
<LI>Use $Id: LinuxNFSSambaCVS.html,v 1.4 2002/09/02 15:36:45 ccalvert Exp $ to add comments</LI>
</UL>

<H4>tkcvs</H4>
<P>tkcvs is a graphical front end to cvs. It requires recent versions
of tcl to run, but a standard install of RedHat 7.0 contains
everything you need. 
</P>
<P>tkcvs definitely makes CVS easier to use. While not a fancy app by
Windows standards, it is nonetheless sophisticated enough to be
useful to most developers. In particular, it can help you learn all
the options CVS has available. Furthermore, it makes it easy for you
to experiment with these options, so see what the can do for you.</P>
<P>On those occasions when tkcvs lets you down, you still have the
option of dropping back to the command prompt and running your old
commands. In fact, you can combine the GUI interface with a command
line approach in any way you want. That way you can get the best from
both worlds: The chance to write scripts at the command prompt, and
the chance to browse your project and run reports inside the tkcvs
GUI.</P>
<P>On tkcvs, in the Options menu, there is a <B>Checkout with Options</B>
item that will allow you to checkout directories. You need to
specifically check the checkout with options item, or this will not
work.</P>
<H4>tkdiff</H4>
<P>tkDiff is an excellent diff engine that can be used to compare two
files. It is really meant to be part of the tkcvs suite, but you can
use it as a stand alone tool.</P>
<P><BR><BR>
</P>
<H3><BR><BR>
</H3>
</BODY>
</HTML>