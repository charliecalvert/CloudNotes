---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxBoot.md
relativePath: elvenware/os/linux/LinuxDays/LinuxBoot.md
title: LinuxBoot
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: LinuxBoot.md
fileNameHTML: LinuxBoot.html
image: ./course/course-javascript.jpg
subject: LinuxDays
queryPath: elvenware/os/linux/LinuxDays/
---

<!-- toc -->
<!-- tocstop -->


<HTML>
<HEAD><TITLE>Linux Boot</TITLE>
<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>

<BODY>

<H1>Boot Process</H1>


<H2>Overview</H2>
<UL>
<LI>Lilo</LI>
<LI>The etc rc.d and init business</LI>
</UL>

  <H3>The Init Process</H3>
  <UL>
    <LI>The Init Process and run levels</LI>
    <LI>Init is the first process started, so it has an ID number of 1: run ps -aux 
    at command line</LI>
    <UL>
      <LI>0: Halt the system</LI>
      <LI>1: Enter single user mode</LI>
      <LI>2: Multiuser mode, no NFS</LI>
      <LI>3: Normal, or full multiuser mode</LI>
      <LI>4: Unused</LI>
      <LI>5: Same as 3, but start in GUI mode</LI>
      <LI>6: Reboot the system</LI>
    </UL>
  </UL>

  <H3>The rc.d Directory</H3>
  <UL>
    <LI>There is a subdirectory for each run level</LI>
    <LI>The etc/rc.d directory contains directories called rc0.d, rc1.d, rc2.d, rc3.d, 
    rc4.d and rc5.d</LI>
    <LI>The /etc/rc script decides which directory to call</LI>
    <LI>Directories have files with names in them like K01ppoe or S10network</LI>
    <LI>Each of these files are soft links. Use ln -s to create a softlink.</LI>
    <LI>The K stands for kill, the S for start</LI>
  </UL>


  <H3>Customization</H3>
  <UL>
    <LI>You can customize the boot process by editing rc.local</LI>
    <LI>rc.local is always executed last</LI>
    <LI>For more advanced customization, you can change the boot process by creating 
    your links</LI>
  </UL>

</BODY>
</HTML>
