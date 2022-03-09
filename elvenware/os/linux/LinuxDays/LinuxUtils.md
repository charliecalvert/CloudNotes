---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxUtils.md
relativePath: elvenware/os/linux/LinuxDays/LinuxUtils.md
title: LinuxUtils
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
<HTML>
<HEAD>
  <META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=iso-8859-1">
  <TITLE>Linux Utilities</TITLE>
  <META NAME="AUTHOR" CONTENT="Charlie Calvert">
  	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
  <BODY>
  <H1>Linux Utilities</H1>
  <UL>
    <LI><A HREF="#editors&quot;">Editors</A></li>
    <UL>
      <LI><A HREF="#emacs">emacs</A></LI>
      <LI><A HREF="#vi">vi</A></LI>
    </UL>
    <LI><A HREF="#systemutils">System Utilities</A></LI>
    <LI><A HREF="#find">find</A></LI>
    <LI><A HREF="#grep">grep</A></LI>
    <LI><A HREF="#egrep">egrep</A></LI>
    <LI><A HREF="#ls">ls</A></LI>
    <LI><A HREF="#RPM">RPM</A></LI>
    <LI><A HREF="#links">ln for links</A></LI>
    <LI><A HREF="#graphicsutils&quot;">Graphics Utilities</A></LI>
    <LI><A HREF="#multimedia">Multimedia Utilities</A></LI>
  </UL>

  <P>This section contains a few words about some utilities I think all developers 
  should know how to use.</P>
  <H4><A NAME="editors"></A>Editors</H4>

  <P>Choosing the right editor is a matter of great importance. I find I need 
  three different kinds of editors:</P>
  <OL>
    <LI>A programming editor for creating source code.</LI>
    <LI>A word processor for creating documents that look nice when printed.</LI>
    <LI>An HTML editor.</LI>
  </OL>
  <H4><A NAME="emacs"></A>emacs</H4>

  <P>Linux comes with a great free programming editor called <B>emacs</B>. Emacs 
  is very stable; its core functionality is almost entirely bug free. It is 
  programmable, so you can get it do anything you want. It has many extensions for 
  handling tasks such as browsing the web, handling email, debugging code, working 
  at the shell prompt, and editing C++, Pascal, Perl and HTML.</P>

  <P><B>emacs</B> is an old editor and when it first came out it must have been 
  one of the wonders of the programming world. However, I believe it has failed to 
  some degree to keep up with the times. The default key binding you find in the 
  editor is very well designed, intuitive, and powerful. However, it will not be 
  at all familiar to most Windows programmers. I believe that the default emacs 
  hotkeys are better than the ubiquitous CUA key bindings found in programs like 
  Word. However, it has not really wise to fight city hall, and in the long run, 
  it is better to stick with the default keystrokes found in most applications 
  rather than learning a new set, even if they are better. I should add, however, 
  that the emacs keystrokes are supported in many paces in Linux, including the 
  command prompt. If you know these key bindings, you can fly through tasks at the 
  bash prompt.</P>

  <P>If you know how to program, you can use the <B>emacs</B> scripting language 
  to make this editor do just about anything you want. Unfortunately, the 
  scripting language built into emacs is Lisp -- not everyone's first choice for a 
  programming language in this day and age.</P>

  <P>Though emacs is not widely using in the programming community, two or three 
  of the best programmers I've ever met use emacs. Nevertheless, I would not 
  suggest using this editor unless you have a very strong yen to get absolutely 
  complete control over every aspect of your editor. If you want that, then emacs 
  gives it to you. However, this is an old tool which will seem outdated to most 
  programmers.</P>

  <P><B>emacs</B> is a GNU tool, and it is available on Windows, Linux and various 
  other platforms. There is a special version of emacs called xemacs, which has a 
  graphical interface that is a bit more intuitive than regular <B>emacs</B>. You 
  can find out about emacs www.gnu.org.</P>
  <H4><A NAME="vi"></A>vi</H4>

  <P>Another venerable editor in the land of Linux is called vi. I don't use this 
  editor very often, and I find it even more old fashioned than emacs. To be 
  utterly frank, it feels a bit to me like the old line editors that were on 
  ancient main frames. It also feels a bit like a suped up edlin. For instance, to 
  begin editing, you press the letter i, which puts you in edit more. To exit this 
  mode, you press escape. To save your work, press :w. This stuff of stuff feels 
  very old fashioned and a bit clunky by todays standards.</P>

  <P>Despite these drawbacks, vi is a rock solid editor, which can handle very 
  large documents with ease. If you know your way around it, you will discover 
  many powerful features that can help you create documents quickly and easily.</P>

  <P>One other great trait of vi is that it works almost perfectly over a telnet 
  connection. When I telnet into another machine, I find I can get some fairly 
  serious editing done in vi. As far as I can see, none of its functionality is 
  hampered at all by the fact that a telnet environment is severaly restricted.</P>
  <H4><A NAME="Joe"></A>Joe</H4>

  <P>There is one other famous Linux editor worth mentioning. This one is called 
  Joe, and I have to confess that I have never used it. I have read, however, that 
  it supports the same keystrokes as found in old Borland IDEs, so if you are used 
  to those key bindings you might find this to be a good editor. Certainly many 
  experienced programming swear by it.</P>
  <H4><A NAME="OtherEditors"></A>Other Editors</H4>

  <P>Finally, I'm going to talk about four modern editors that you can use on 
  Linux. Unlike the editors talked about so far (except for xemacs), all these 
  editors run in graphical mode. Two of them, called kedit and kwrite, come with 
  the KDE desktop. kedit is equivalent to the Windows notepad. It is small and 
  loads quickly. KWrite is a modest programmers editor which supports syntax 
  highlighting for many common programming languages.</P>

  <P>As you can see, there are lots of good free editors to use in Linux. 
  Unfortunately, and this is very much to the point, none of them would be 
  considered great modern editors by most programmers. In a fit of peak (???), I 
  finally broke down one day and bought a copy of Visual SlickEdit for Linux. It 
  seemed odd to go out and spend a couple hundred dollars on an editor when there 
  are so many good ones available for free. Nevertheless, none of them, were quite 
  perfect. emacs is a great editor, but it is old fashioned, and Lisp is just a 
  really weird language.</P>

  <P>The question, then is do I have buyer's remorse? Do I regret spending money 
  to get an editor? Absolutely not! SlickEdit is very stable. It has a modern 
  interface and a modern help system. It fully supports emacs, brief, CUA, vi, and 
  other key bindings. It is almost completely configurable. It supports both 
  syntax highlighting, and a very powerful form of code insight. Furthermore, it 
  comes with a powerful modern scripting language based on the familiar C 
  programming language.</P>
  <H4><A NAME="StarOffice"></A>StarOffice</H4>

  <P>The final editor I'm going to discuss is called StarOffice. it is a free 
  download from the sun web site. StarOffice runs on Windows, Linux and other 
  platforms. Like Microsoft Office, it comes with a powerful word processor, a 
  powerful spread sheet, a powerful html editor, and a powerful database.</P>

  <P>StarOffice 5.2 is a serious tool. It's HTML editor, for instance, is about 75 
  percent of the way to being as good as the superb Windows HTML editors HomeSite 
  and FrontPage. It creates nice clean HTML, and features tools that make it easy 
  to perform basic tasks such as inserting hyperlinks, lists, and other basic HTML 
  tags.</P>

  <P>The StarOffice Word processor has its own native format, but it can read 
  Microsoft Office files. It comes with a powerful scripting language which is 
  comparable to Word Basic. It has complete support for Styles. Unlike Word, 
  StarOffice supports configurable key bindings.</P>

  <P>In general, StarOffice is a powerful editor. Its not quite as good as 
  Microsoft Office, but most users should find that it will meet their needs. My 
  biggest complaint is simply that it never looks quite as good as MS Office. But 
  that failing is the result of the poor font support in Linux, and is not a 
  problem with the editor itself. If we lived in a more sensible world, a lot of 
  companies would standardize on StarOffice, and give old Bill the go by on this 
  one.</P>

  <H3><A NAME="systemutils"></A>System Utilities</H3> 
  
  
<H4><A NAME="find"></a>find</H4>



<H5>Basic Info on find</H5>

<UL>
<LI>It will help you find files on your system</LI>
<LI>The most common search looks like this:</LI>
<LI>find . -iname myfile</LI>
<LI>More complex:</LI>
<LI>find /home/ccalvert/src/srcpas -iname "*.~dpr"</LI>
</UL>


<H5>Using Find to Execute a Command</H5>
<UL>
<LI>You can ask Find to execute a command on each file it finds</LI>
<LI>find . -iname core -exec ls -l {} \;</LI>
<LI>even better</LI>
<LI>find . -iname core -exec rm {} \;</LI>
<LI>Or, a bit more subtly, we have:</LI>
<LI>find . -iname core -exec chmod a+w {} \;</LI>
<LI>Combine this with what I showed you at the end of the last section to help clean up files in your Delphi directories</LI>
<LI>find2perl</LI>
</UL>

<H3>Locate</H3>
<UL>
<LI>Like find, locate can help you find files on your system</LI>
<LI>Locate maintains a database that tracks every file on the system</LI>
<LI>To update the database, type locate -u</LI>
<LI>To learn some other features, type man locate</LI>
<LI>Locate HOWTO is a good trick</LI>
</UL>


<H4>Narrowing the search with locate</H4>
<UL>
<LI>type locate zip </LI>
<LI>narrow the search with locate /zip</LI>
<LI>Scroll through the results with locate /zip | less</LI>
</UL>


  <H4><A NAME="grep"></A>grep</H4>

  <P>Grep will allow you to search for text in documents.</P>

  <P>Example for searching through multiple directories for documents that contain 
  the world &quot;LongWord&quot;:</P>

  <P CLASS="code" STYLE="margin-bottom: 0.2in">grep -r LongWord *</P>

  <P>If you want to search for a more complex string, you can use quotes:</P>

  <P CLASS="code" STYLE="margin-bottom: 0.2in">grep -r &quot;link rel&quot; *</P>

  <P>You can also use regular expressions when searching for text.</P>

  <P><A NAME="ls"></A>ls</P>

  <P CLASS="code" STYLE="margin-bottom: 0.2in">Run ls -l</P>

  <P>The first letter can be:</P>
  <TABLE WIDTH="369" BORDER="1" CELLPADDING="4" CELLSPACING="3">
    <COL WIDTH="24">
    <COL WIDTH="118">
    <TR VALIGN="TOP">
      <TD WIDTH="124">-</TD>
      <TD WIDTH="118">ordinary</TD>
    </TR>
    <TBODY>
    <TR VALIGN="TOP">
      <TD WIDTH="124">b</TD>
      <TD WIDTH="118">block device</TD>
    </TR>
    <TR VALIGN="TOP">
      <TD WIDTH="124">c</TD>
      <TD WIDTH="118">character device</TD>
    </TR>
    <TR VALIGN="TOP">
      <TD WIDTH="124">d</TD>
      <TD WIDTH="118">directory</TD>
    </TR>
    <TR VALIGN="TOP">
      <TD WIDTH="124">p</TD>
      <TD WIDTH="118">named pipe</TD>
    </TR>
    <TR VALIGN="TOP">
      <TD WIDTH="124">l</TD>
      <TD WIDTH="118">symbolic link</TD>
    </TR>
    </TBODY>
  </TABLE>
  

<A NAME="egrep"><H3>egrep</H3></A>c
<UL>
<LI>egrep uses regular expressions</LI>
<LI>Here is a line from rc.local that uses egrep and backticks</LI>
<LI>The -c option gives you a count of matching lines per file</LI>
<LI>The ^operator says only match strings found at the beginning of a file</LI>
<LI>NUMPROC=`egrep -c "^cpu[0-9]+" /proc/stat`</LI>
</UL>

  <H4><A NAME="who"></A>who</H4>

  <P>Who gives you list of all the users currently logged in.</P>
  <H4><A NAME="finger"></A>finger</H4>

  <P>Finger gives you more detailed information about the people who are logged in. 
  Type finger ccalvert.</P>
  <H4><A NAME="su"></A>su</H4> <H4><A NAME="cron"></A>cron</H4> <H4><A NAME="shutdown"></A>shutdown</H4>
  <H5>Which and WhereIs</H5>

  <P>Which tells you the path to executables.</P>

  <P>Run which on Java. Now run whereis on java. Notice that you get more 
  information from where is.</P>

  <P>Run which on ls. Now run whereis on ls. Notice that this time you get more 
  information from which.</P>
  <H5>apropos and man -k</H5>

  <P>apropos and man -k perform the same task. They look through all the man files, 
  and check for the keywords listed in them. If the keyword you entered is found 
  in the lists of keywords at the beginning of the man files, then information on 
  that file will be spit out. This can help you figure out how to do something you 
  don't know how to do.</P>
  

  <P>Enter appropos difference. You will find several different ways to compare 
  files.</P>

  <H3><A NAME="graphicsutils">Graphics Utilities</A></H3>

  <UL>
    <LI>gimp: Graphics program comparable to Paint Shop Pro, plus more.</LI>
    <LI>snapshot: Serviceable application for doing screen captures</LI>
  </UL>

  <P>Linux is not without some powerful graphics tools. Windows has more flashy 
  options in this regard, but Linux has some surprisingly powerful tools. I'm 
  going to talk about the ones that come with a standard install of RedHat.</P>

  <P>There is one great graphics tool in Linux and it is called the Gimp. If you 
  are using KDE, you might not be aware that the Gimp is installed on your system. 
  However, if you open up a terminal window and type gimp, it should pop right up. 
  If it doesn't, don't worry, as this is another free tool you can download from 
  the web. Just hop over to www.gimp.org.</P>

  <P>The interface for the Gimp takes a bit of getting used to, but once you get 
  the hang of it, you quickly become aware that this is very powerful graphical 
  editor with a number of great capabilities.</P>

  <H3><A NAME="RPM">RPM</A></H3>

  <UL>
    <LI>Basic install command: rpm -i mypackage.rpm</LI>
    <LI>Basic uninstall (erase) command: rpm -e mypackage.rpm</LI>
    <LI>Query if package is installed: rpm -q mypackage.rpm</LI>
    <LI>Use --force to make the uninstall (or install) happen even if RPM is 
    complaining</LI>
    <LI>Use --nodeps to force an install when RPM thinks there are dependency's 
    involved.</LI>
  </UL>

  <UL>
    <LI>RPM exists in a database. It is now stored in db3 format</LI>
    <LI>Sometimes, if you upgrade RPM, you may be asked to rebuild the database</LI>
    <LI>The command to rebuild: rpm --rebuilddb</LI>
    <LI>This can take several minutes</LI>
  </UL>

                                  
<H3>Links</H3><a name="links"></a>
<UL>
<LI>Use ls -l to see the links in a file</LI>
<LI>Create a link to a dirctory</LI>
<LI>ln -s /usr/local /home/ccalvert/usrlocal/</LI>
<LI>Create a link to a lib file</LI>



  <H4>Multimedia Utilities</H4><a name="multimedia"></a>
  </ul></BODY>
</HTML>
