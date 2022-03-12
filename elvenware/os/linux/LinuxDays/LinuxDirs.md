---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxDirs.md
relativePath: elvenware/os/linux/LinuxDays/LinuxDirs.md
title: LinuxDirs
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:55 PM
---

<!-- toc -->
<!-- tocstop -->

<html>
<head>
	<title>Linux Directories</title>
	<meta NAME="AUTHOR" CONTENT="Charlie Calvert">
	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</head>
  <body>

  <h3><a NAME="directories"></a>Directories</h3>

  <p>Directories on Linux are different than directories on Windows. Or rather, 
  Windows has only recently begun to come around to the Linux view of how 
  directories should be structured. In particular, there is clear evidence of the 
  Linux way of thinking in the recent effort on Microsoft's part to put an 
  emphasis on directories with names like &quot;My Programs,&quot; &quot;My 
  Documents&quot; and &quot;Documents and Settings.&quot; I will not try to decide 
  whether or not the attempt on the part of the stalwarts in Redmond is successful -- 
  or perhaps not so successful. I will only say that it is an attempt to treat 
  directories in manner reminiscent of the directory structure on Linux.</p>

  <p>On Linux, your disk is divided up into various directories that provide 
  specific services. You will never understand Linux unless you begin to associate 
  at least the majority of these directories with specific types of files. This is 
  not a trivial task, but it is one that must be mastered if you want to feel at 
  home in the Linux OS.</p>

  <p>Let's start by dividing the OS into those that you, as a user own, and those 
  that are owned by the OS. The home directory contains directories that can hold 
  users text, source and office files.</p>

  <p><b>/bin</b>: Essential binaries for booting the system</p>

  <p><b>/sbin</b>: Essential binaries for maintaining the system</p>

  <p><b>/etc</b>: Configuration files used in system administration. As close as 
  you can find to a &quot;Windows Registry&quot; in Linux.</p>

  <p><b>/proc</b>: Dynamic information about the file system and other key 
  components are kept here. These are not ordinary files.</p>
  
<H3>Exploring the proc directory</H3>
<UL>
<LI></LI>
</UL>

  <p><b>/dev</b>: Devices. Though different from the proc files, these are again 
  not ordinary files.</p>

  <p><b>/var</b>: Files that change a lot at runtime, such as logs and mail boxes.</p>

  <p><b>/usr</b>: A major directory containing many subdirectories. Here you will 
  find key programs used not just by administrators, but by users. Documentation 
  for many Linux tools is also found here. Be sure to visit /usr/doc, /usr/man, /usr/lib, 
  /usr/bin and /usr/include. Also, check out /usr/bin/X11. The man directory 
  contains manual pages.</p>

  <p><b>/usr/local:</b> The same general structure as /usr, but contains files of 
  a more temporary nature. Don't miss /usr/local/man.</p>

  <p><b>Directories and Partitions</b>: As you get more experienced with Linux, 
  you may begin partitioning your harddrive in such a ways as to meld with the 
  directory scheme outlined above. For instance, create a partition called /home, 
  and Linux will use that partition for your user directories. You can reformat 
  the drive that holds the core of the US without changing the structure of your 
  home directories. /usr is another good candidate for this treatment.</p>
  
  
<H2>Example Program</H2>

<H3>Overview</H3>
<UL>
<LI>PathConts</LI>
<LI>This program shows constants declared in Libc.pas, and how you can use them in your own program</LI>
</UL>

<PRE>const
  BUFSIZE = 1024;
var
  Buf: PChar;
begin
  // Non Portable
  GetMem(Buf, BUFSIZE);
  ListBox1.Items.Add(getcwd(Buf, BUFSIZE));
  FreeMem(Buf, BUFSIZE);
  // Portable
  ListBox1.Items.Add(GetCurrentDir());
  // Explore path constants
  ListBox1.Items.Add('_PATH_DEFPATH = ' + _PATH_DEFPATH);
  ListBox1.Items.Add('_PATH_STDPATH = ' + _PATH_STDPATH);
  ListBox1.Items.Add('_PATH_BSHELL = ' + _PATH_BSHELL);
  ListBox1.Items.Add('_PATH_CONSOLE = ' + _PATH_CONSOLE);
  ListBox1.Items.Add('_PATH_CSHELL = ' + _PATH_CSHELL);
  ListBox1.Items.Add('_PATH_DEVDB = ' + _PATH_DEVDB);
  ListBox1.Items.Add('_PATH_DEVNULL = ' + _PATH_DEVNULL);
  ListBox1.Items.Add('_PATH_DRUM = ' + _PATH_DRUM);
  ListBox1.Items.Add('_PATH_KLOG = ' + _PATH_KLOG);
  ListBox1.Items.Add('_PATH_KMEM = ' + _PATH_KMEM);
  ListBox1.Items.Add('_PATH_LASTLOG = ' + _PATH_LASTLOG);
  ListBox1.Items.Add('_PATH_MAILDIR = ' + _PATH_MAILDIR);
  ListBox1.Items.Add('_PATH_MAN = ' + _PATH_MAN);
  ListBox1.Items.Add('_PATH_MEM = ' + _PATH_MEM);
  ListBox1.Items.Add('_PATH_MNTTAB = ' + _PATH_MNTTAB);
  ListBox1.Items.Add('_PATH_MOUNTED = ' + _PATH_MOUNTED);
  ListBox1.Items.Add('_PATH_NOLOGIN = ' + _PATH_NOLOGIN);
  ListBox1.Items.Add('_PATH_PRESERVE = ' + _PATH_PRESERVE);
  ListBox1.Items.Add('_PATH_RWHODIR = ' + _PATH_RWHODIR);
  ListBox1.Items.Add('_PATH_SENDMAIL = ' + _PATH_SENDMAIL);
  ListBox1.Items.Add('_PATH_SHADOW = ' + _PATH_SHADOW);
  ListBox1.Items.Add('_PATH_SHELLS = ' + _PATH_SHELLS);
  ListBox1.Items.Add('_PATH_TTY = ' + _PATH_TTY);
  ListBox1.Items.Add('_PATH_UNIX = ' + _PATH_UNIX);
  ListBox1.Items.Add('_PATH_UTMP = ' + _PATH_UTMP);
  ListBox1.Items.Add('_PATH_VI  = ' + _PATH_VI);
  ListBox1.Items.Add('_PATH_WTMP = ' + _PATH_WTMP);

{ Provide trailing slash, since mostly used for building pathnames. }
  ListBox1.Items.Add('_PATH_DEV = ' + _PATH_DEV);
  ListBox1.Items.Add('_PATH_TMP = ' + _PATH_TMP);
  ListBox1.Items.Add('_PATH_VARDB = ' + _PATH_VARDB);
  ListBox1.Items.Add('_PATH_VARRUN = ' + _PATH_VARRUN);
  ListBox1.Items.Add('_PATH_VARTMP = ' + _PATH_VARTMP);
</PRE>
  </body>
  
</html>
