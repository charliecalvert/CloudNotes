---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxInstall.md
relativePath: elvenware/os/linux/LinuxDays/LinuxInstall.md
title: LinuxInstall
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: LinuxInstall.md
fileNameHTML: LinuxInstall.html
image: ./course/course-javascript.jpg
subject: LinuxDays
queryPath: elvenware/os/linux/LinuxDays/
---

<!-- toc -->
<!-- tocstop -->


<HTML>
<HEAD>
  <TITLE>Linux Install</TITLE>
  	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
  <BODY>

  <H1>Linux Install</H1>

  <UL>
    <li><a HREF="#distributions">Distributions</a></li>
    <li><a HREF="#install">Install</a></li>
    <li><a HREF="#commandln">The Command Line vs the X Window System</a></li>
  </UL>

  <p>It is time to turn away from philosophical matters and begin focusing on 
  Linux as a technology. This is fertile ground. Linux is an extraordinary piece 
  of engineering. Here is a rich land with a beautiful and varied landscape. It is 
  also a rugged land, with many unique and unusual vistas that are not always 
  easily approachable. You have to go by foot at times if you want to see the best 
  parts of this land, and even the opening stages of the journey can be fraught 
  with pitfalls.</p>

  <p>To understand Linux as a technology, we need to start at the beginning. In 
  this case, the beginning is the distributions. With Microsoft there is only one 
  distributer, and if you want to buy an OS, you know where to go. The same is not 
  true of Linux. There are many different versions of Linux, and the first thing 
  one needs to do is sort them all out and find which one is best for your needs.</p>

  <h3><a NAME="distributions"></a>Distributions</h3>


  <H4>Overview</H4>
  <UL>
    <LI>There is no best distribution, there is only the one you like best.</LI>
    <LI>I use RedHat 7.0, and my talk will reflect that fact</LI>
    <LI>The various distributions cause confusions that do not exist in Windows</LI>
    <LI>The big three are RedHat, Suse and Debian</LI>
    <LI>vmWare: A good thing?</LI>
  </UL>


  <H4>A Modular OS</H4>
  <UL>
    <LI>Linux is very modular</LI>
    <LI>As a result, you can start with any distribution, and add the features you 
    need</LI>
    <LI>Adding features in RedHat and related tools is simple because of the RPM 
    tool</LI>
    <LI>Debian has a similar tool, but it is not nearly as widely supported</LI>
    <LI>Newcomers, of course, are not going to be able to do this as easily</LI>
  </UL>


  <H4>Completeness of Distribution</H4>
  <UL>
    <LI>Not all distributions are up to date</LI>
    <LI>Corel is a classic case of distribution that uses some very old modules</LI>
    <LI>The Kylix IDE is designed to work with RedHat and Suse, with updates coming 
    later</LI>
    <LI>RedHat is as close to a standard as you get in the Linux world</LI>
    <LI>Most of the documentation that you find is about RedHat's distribution</LI>
    <LI>Suse is very popular in Europe, but almost unknown in the US.</LI>
    <LI>Mandrake is the current hip distribution</LI>
  </UL>


  <H4>Debian</H4>
  <UL>
    <LI>Debian is the GNU entry in the field</LI>
    <LI>Last year, but not this year, it won the Linux Journal readers poll</LI>
    <LI>It is harder to install than RedHat, but is getting easier all the time</LI>
    <LI>Debian is a good choice for intermediate to advanced users, but not for 
    beginners</LI>
  </UL>

  <p>Everyone asks about distributions, and which one to get. In the most 
  technical sense of the word, it doesn't matter which distribution you have. 
  Linux is a free OS, and it is very modularized. You can always download updates 
  to any particular distrubution, and make it into whatever you want it to be. The 
  problem with this theory is simply that experienced Linux users can rather 
  easily update the OS, while newcomers don't even know where to begin such an 
  operation. As a result, the question to ask is not which distribution is best, 
  but which is best for newcomers.</p>

  <p>Here is a list of three commercial distributions:</p>
  <ul>
    <li>The Big Three for Beginners: RedHat, SUSE, and Mandrake</li>
  </ul>

  <p>Any of these three popular distributions will meet your needs. In choosing 
  them, I am not necessarily asking that you choose the distributipm that is 
  simplest to install, but rather the ones that are most complete and best 
  supported. Some distributions are easy to install, but you soon find that you 
  need to update them to get them to work with your favorite software. As stated 
  earily, updating the OS can be tricky for newcomers. As a result, the question 
  to ask is not necessarily which distribution is easy to install, but which is 
  easiest to maintain.</p>

  <p>Of course, it goes without saying that there are other fine distributions out 
  there. Furthermore, I have not tried all the distributions, and I do not claim 
  to be making a definitive rating. My goal is simply to help you get started.</p>

  <p>In that spirit, it is only fair to point out that RedHat is the most popular 
  distribution, and it is the one about which most technical documents are written. 
  It is common in Linux to be reading a description of some technical task, only 
  to find that it applies to a distribution other than the one you use. This is 
  going to happen no matter which distribution you choose, but if you choose one 
  of the popular ones, such as RedHat or SUSE, then you are less likely to be left 
  high and dry when searching for technical help.</p>

  <p>The big alternative to the distributions mentioned above is Debian. This is a 
  distribution made by the GNU software organization. As a result, it is perhaps 
  closest in spirit to the true ideals of the Open Software movement.</p>

  <h2><a NAME="install"><b>Install</b></a></h2>


  <H3>Preperation</H3>
  <UL>

    <LI>Know what video card you have </LI>
    <LI>Know what network card you have</LI>
  </UL>


  <H3>Partitions</H3>
  <UL>
    <LI>Ironically, you can't set these up correctly till you know quite a bit about 
    Linux</LI>
    <LI>The best choices for separate partitions are usr, home, var and opt. Others?</LI>
    <LI>Mounting partitions and fstab.</LI>
    <LI>You can easily move partitions and directories around. For instance, you can 
    later choose to make home its own partition</LI>
  </UL>


  <H3>Dual Boot</H3>
  <UL>
    <LI>Most people boot Windows and Linux from the same machine</LI>
    <LI>Install Windows first, then linux</LI>
    <LI>The boot floppy option</LI>
    <LI>Lilo -- More in section boot process</LI>
  </UL>


  <H3>Graphics Cards</H3>
  <UL>
    <LI>XF86Config, look in the following directories </LI>
    <LI>/etc/X11</LI>
    <LI>/usr/X11R6/lib/X11/</LI>
    <LI>XF86Config has a number of sections in it.</LI>
    <LI>The highest level is the serverlayout</LI>
    <LI>Below that you have inputdevice and output device, with the latter usually called screen</LI>
    <LI>A screen section binds together a graphics board and a monitor</LI>
    <LI>The module section can be used to load modules needed by x. Not all modules are loaded when x is launched</LI>
    <LI>There is also a path to the fonts, where "unix" is unix sockets and tcp for a tcp/ip connection</LI>
    <LI>The actual fonts are usually in /usr/X11R6/lib/X11/fonts</LI>
  </UL>

                                                                
<H3>Running the Setup Program</H3>
 <UL>
 <LI>Often, after you boot up, you might want to run setup</LI>
 <LI>Alternatively, you can run linuxconf</LI>
 <LI>Be careful with linuxconf - it is very powerful</LI>
</UL>


  <p>Linux can be the only OS on a system, or it can be dual booted with other 
  OSes. I use it both ways, but I assume that most people will want to dual boot 
  their machines. (Very few of us are willing to completely give up Windows. For 
  instance, I still use Windows about 5 percent of the time -- mostly for playing 
  games.)</p>

  <h3><a NAME="commandln"></a>The Command Line vs the X Window System</h3>


  <H4>Overview</H4>
  <UL>
    <LI>The GUI is not part of the OS, as it is in Windows</LI>
    <LI>Instead, the GUI runs as a separate program, or programs.</LI>
  </UL>

  <H4>The Power of the Command Line</H4>
  <UL>
    <LI>Multitasking, virtual memory, even networking features, are fully available 
    at the command line.</LI>
    <LI>Unlike DOS, the first things done in Linux were to add multitasking and 
    virtual memory support.</LI>
    <LI>There are built into the OS at the lowest levels. </LI>
    <LI>They are not layered on top of the core OS.</LI>
  </UL>

  <H4>Ease of Use Issues</H4>
  <UL>
    <LI>At first, the command line is harder to use than the GUI.</LI>
    <LI>However, if you learn how to write scripts, you will find it more powerful.</LI>
    <LI>In fact, if your goals are ambitious, the command line is more powerful than 
    the GUI.</LI>
    <LI>Finally, even if the GUI crashes, the core of the OS, at the command line, 
    is still intact.</LI>
  </UL>


  <p>Linux is different from Windows in that it runs natively at the command line, 
  rather than in a GUI.  In other words, the GUI is not, as it is in Windows, part 
  of the OS.  The GUI is something layered on top of the command line, and you can 
  use the GUI or not, depending on your taste.</p>

  <p>Those of us who come from the DOS world may have a tendency to think of 
  command line as not very powerful. The truly powerful features of computer 
  programming, such as multi-tasking and networking, happen to be introduced on a 
  large scale to the DOS world at about the same time as Windows the GUI 
  environment emerged. However, that was really just a coincidence, and there is 
  no reason why a command line cannot support very advanced features.</p>

  <p>What we mean to say, when we think thoughts about the command line, is only 
  that the DOS command line was not very powerful. The Linux command line is very 
  powerful. It has great support for multitasking, and great support for 
  networking.</p>

  <p>One of the key things to grasp about Linux is that it was built to multitask, 
  and it was built to run on top of a network. In Linux, there was powerful 
  networking, and powerful multitasking,almost before there was anything else. 
  When Linus Benedict Torvalds (http://www.tuxedo.org/~esr/faqs/linus/) sat down 
  to write the Linux kernel he thought about these kinds of issues almost before 
  he thought about anything else.</p>

  <p>If you hark back to what I said earlier about the scripting and Linux, then 
  you are likely to begin to see the power of the Linux command line. Linux is 
  driven by scripts, and scripts run fine on the command line. Conversely, it is 
  hard to write a script with even a versatile three button mouse, and as a result, 
  the GUI is not really as close to the heart of the OS as the command line is. (If 
  you are someone who really loves the GUI and the mouse, then you can perhaps 
  already begin to see which way to run if you want to get back home.)</p>

  </BODY>
</HTML>
