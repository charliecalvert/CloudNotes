---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxDocs.md
relativePath: elvenware/os/linux/LinuxDays/LinuxDocs.md
title: LinuxDocs
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:55 PM
---

<!-- toc -->
<!-- tocstop -->


<HTML>
<HEAD>
	<TITLE>Linux Docs</TITLE>
	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
<BODY>

<H1>Finding the Online Docs</H1>

<H2>Man Pages</H2>
<UL>
<LI>Man stands for manual</LI>
<LI>Type man and the name of a program, and you can read about it</LI>
<LI>man ls</LI>
<LI>Try man XF86Config</LI>
</UL>


<H2>But man can get a bit complicated</H2>
<UL>
<LI>type man chmod</LI>
<LI>Now type man 2 chmod</LI>
<LI>There are two different references to chmod</LI>
<LI>Type man -k chmod to see the list of the different entries based on keywords</LI>
<LI>Now type man -k printf, and you see many options</LI>
</UL>

<h2>Texinfo: Also known as Info</h2>
<UL>
<LI>Texinfo is superior to man in that it supports  the idea of hyperlinks</LI>
<LI>info, however, is not as complete as man</LI>
<LI>There is a movement afoot to move from man to texinfo</LI>
<LI>Some man pages just refer you to the texinfo documents</LI>
</UL>


<H2>Navigating in info</H2>
<UL>
<LI>Take the tutorial by type info at the command prompt and then typing h</LI>
<LI>The key commands are N for next, P for previous, and U for up.</LI>
<LI>In many places you can access the M command for using the menu</LI>
<LI>Type M and then gcc or CVS</LI>
<LI>Go to a line that begins with an asterisk, and then push enter</LI>
</UL>

<H2>Putting info to the Test</H2>
<UL>
<LI>Let's look for chmod in info</LI>
<LI>Okay, let's try printf</LI>
<LI>Finally, let's try emacs</LI>
</UL>

<H2>HOWTO</H2>
<UL>
<LI>Go to /usr/share/doc and type ls</LI>
<LI>Let's try the zip directory</LI>
<LI>cat MANUAL | less</LI>
<LI>Now run man zip</LI>
</UL>







</BODY>
</HTML>
