---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxOverview.md
relativePath: elvenware/os/linux/LinuxDays/LinuxOverview.md
title: LinuxOverview
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

<!doctype HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
<html>
<head>
  <meta HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=iso-8859-1">
  <title>Linux Overview</title>
  <meta NAME="AUTHOR" CONTENT="Charlie Calvert">
 	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</head>
  <body>
  <h2>Linux Overview</h2>

  <p>Index</p>
  <ul>
    <LI><A HREF="#LookAhead">Looking Ahead</A></LI>
    <LI><A HREF="#WayOfLife">The Linux Way of Life</A></LI>
    <LI><A HREF="#LinuxCamps">Camps in the Land of Linux</A></LI>
    <LI><A HREF="#Valhalla">Valhalla</A></LI>
    <LI><A HREF="#StrongWeak">Linux Strengths and Weaknesses</A></LI>
    <LI><A HREF="#FinalThoughts">Final Thoughts on Linux</A></LI>
  </ul>


  <H2>Overview</H2>
  <UL>
    <LI>This is an overview of Linux for Pascal programmers</LI>
    <LI>However, we need to have some understanding of Linux culture before trying 
    to understand Linux from an engineers perspective</LI>
    <LI>As it stands today, Linux is a great tool for programmers, but a bit tough 
    on end users</LI>
    <LI>How Linux has energized me: a best case scenario</LI>
  </UL>

  <p>This article is an introduction to Linux for Object Pascal programmers. It is 
  designed to tell you in a relatively short space the most important things 
  programmers need to know about Linux.</p>

  <p>Linux is complex OS. It is a better OS than Windows, in some ways, but in 
  other ways it is worse. Linux is very easy to program, but hard to use. It makes 
  setting up a powerful server fairly easy, but it does not have the powerful 
  desktop capabilities available in Windows. It offers more services to 
  programmers than Windows does, but viewer services to end users. Beyond any 
  question, it is harder than Windows to learn how to use.</p>

  <p>For me, there have been certain key pieces of software or hardware that took 
  on special import to me. Back in the eighties, WordPerfect did that for me, as 
  did the first BBS programs that allowed me to talk over a modem. Turbo Pascal 
  changed the way I thought about programming, Windows 3.0 changed the way we all 
  thought about computers more than most of us would now care to admit. Borland C++ 
  3.1 helped define the standard for programming Windows, Delphi changed that 
  standard a second time, and Netscape changed things again. In late 1999, I 
  started using Linux regularly, and I feel as though I am again working with one 
  of those seminal pieces of software that significantly changes my approach to 
  computing.</p>

  <A NAME="LookAhead">

  <h2>What Lies Ahead</h2></A>

  <h3>This Day is divided into several sections:</h3>
  <ul>
    <li>It begins with a description of the Linux philosophy, or way of life.</li>
    <li>The focus changes to describe the relationship between Linux and programmers.</li>
    <li>Then we will plunge into various technical subjects, starting with the 
    install and choice of distribution.</li>
    <li>After that comes a description of the Linux file and directory structure.</li>
    <li>Key Utilities and Apps are next.</li>
    <li>Scripting and Programming tools will be discussed in depth.</li>
    <li>Finally, there will be section on books and articles that might be useful to 
    you.</li>
  </ul>

  <A NAME="WayOfLife">

  <h2>The Linux Way of Life</h2></A>


  <H3>Overview</H3>
  <UL>
    <LI>Those of us who have been in the business for awhile perhaps remember what 
    it was like before the rise of Windows and the Internet</LI>
    <LI>The atmosphere used to be a bit friendlier, a bit more academic, and not 
    entirely devoid of altruism</LI>
    <LI>The feeling was that computing was very valuable to everyone, and that there 
    was something honorable in practicing the profession</LI>
    <LI>By and large, that feeling has been replaced with the feeling of a goldrush, 
    and with the gold rush has come cynicism</LI>
    <LI>Linux is something of a throw back to the old way of life. The Linux world 
    feels the way the main stream computing world felt ten or 15 years ago.</LI>
    <LI>There is a sense that one is exploring something new, that the individual 
    counts, and that computing is something of an adventure.</LI>
  </UL>


  <H3>Open Source Software</H3>
  <UL>
    <LI>GNU Software</LI>
    <LI>The Open Source Movement</LI>
    <LI>Copyleft</LI>
    <LI>Success stories like Linux, Apache, CVS, gcc and many more</LI>
    <LI>In fact, most of the kinds of software you might want to use are available 
    in open source. </LI>
  </UL>

  <p>Linux is one of the few places left in the computer world where the original 
  spirit that animated the early days of computing still thrives. Linux users, and 
  particularly Linux developers, are passionate about their technology. For them, 
  it is more than just a means of making a dollar.</p>

  <p>Linux is more than just a technology. Linux is a philosophy that defines an 
  attitude toward computers and how they should be
  <span STYLE="text-decoration: none">
  used
  </span>
  . But it is also a philosophy about how to behave in the business world, and -- 
  to some extant -- a philosophy about how to live in our society.</p>

  <p>The Linux philosophy is built on three cornerstones:</p>
  <ol>
    <li>Free Software</li>
    <li>Open Source Software</li>
    <li>A dislike of proprietary software in general, and of Microsoft software in 
    particular.</li>
  </ol>

  <p>The free software group at www.gnu.org believes that software ought to be 
  given away. They believe that software is knowledge, and that there should not 
  be a price on knowledge. It should be free.</p>

  <p>The Open Software group believes that software ought to be an open book. When 
  you have a piece of Open Source software, you have the code to the entire 
  product. Nothing is hidden from you. If you want to change the software, you 
  have the code, and can change it and then recompile it. If there is a bug, you 
  can fix it, or at least step through the code and confirm that the problem is 
  with the product, and not with your use of it.</p>

  <p>The Free Software group and the Open Software group are often at odds, but 
  they are united in their dislike of proprietary software houses. The idea that 
  ninety percent of the PCs in the world are run be a piece of software that is 
  controlled by a handful of people in Redmond is enough to drive the whole lot of 
  them up the wall.</p>

  <p>The Linux world is not anti-business, but it does hope that business can be 
  more than just a means of making money. This does not mean that Linux developers 
  are necessarily charitable, but they are inclined to believe in knowledge for 
  knowledge's sake, and technology for technology's sake. Linux developers are non-conformists, 
  they are people who want to find a better way to do things. They think it is 
  wrong that computers, which lie at the heart of intellectual and economic life 
  in our time, should be controlled by a single company in Washington state, or by 
  any company or companies that will not share their intellectual property with 
  others.</p>

  <p>Having said all this, it is only fair to add that there are many followers in 
  the Linux world who are in it only for the money. And some are motivated by 
  jealousy of the success Microsoft has achieved. Linux is not the land of milk 
  and honey. On the other hand, it does represent a genuine commitment on the part 
  of many sincere people to treating the intellectual legacy of computers as the 
  provence of the whole world, rather than the personal property of a closed 
  software house.</p>

  <A NAME="LinuxCamps">

  <h2>Camps in the Land of Linux</h2></A>


  <H3>Overview</H3>
  <UL>
    <LI>There are rifts in the land of Linux</LI>
    <LI>There Open Software folks don't always agree with the Free Software folks</LI>
    <LI>An entrepeneur like Bob Young or Tim O'Reilly is very different from someone 
    like Richard Stallman</LI>
  </UL>


  <H3>Reading about the Philosphy</H3>
  <UL>
    <LI>To find out more, go to these sites</LI>
    <LI>www.gnu.org</LI>
    <LI>http://www.tuxedo.org/~esr/</LI>
    <LI>www.opensource.org</LI>
  </UL>

  <p>I do not mean to imply that Linux users present a united front to the world. 
  There are many camps inside the land that is Linux. There is Richard Stalman's 
  GNU camp, and there is Eric Raymond's Open Software camp. There are the 
  entrepeneurs of the software business, such as Bob Young at RedHat or Tim O'Reilly 
  at O'Reilly books. And there are also the full time rebels, some of whom are 
  admirable idealists. Then there are others who are simply social misfits. All 
  these varied types of people from varied walks of life most certainly do not 
  have the same philosophy, or the same world view. And yet -- somehow there are 
  common threads that tie them together. Certainly, they are all much more like 
  one another than they are like Bill Gates or Larry Ellison.</p>

  <p>I am not really the one to define the Linux philosophy, but if you are 
  intrigued by these ideas. you should go to www.gnu.org, http://www.opensource.org/, 
  or to Eric Raymond's home page at http://www.tuxedo.org/~esr/. You might even 
  try reading some of the statements from Tim O'Reilly at http://www.oreilly.com/oreilly/tim.html. 
  All of these places speak of a world very different from the one that the folks 
  in Redmond inhabit. Many people are not inspired by Linux, but for those of us 
  who are attracted to it, there is a compelling story here that is worth serious 
  attention.</p>

  <A NAME="Valhalla">

  <h2>Linux: The Programmers Valhalla</h2></A>

  <H3>Overview</H3>
  <UL>
    <LI>Linux is too technical for most users</LI>
    <LI>Linux has its greatest appeal to highly technical people, particularly 
    programmers</LI>
    <LI>Windows is designed to be run with a mouse, Linux to be run with a script</LI>
    <LI>You click your way to fame and fortune on windows</LI>
    <LI>On Linux your program your way to the land of OZ</LI>
    <LI>It's a playground for programmers that just happens to be useful to 
    businessmen</LI>
  </UL>


  <H3>Land of Choices</H3>
  <UL>
    <LI>Linux gives programmers many choices</LI>
    <LI>There are many shells</LI>
    <LI>There are many scripting languages</LI>
    <LI>You even have your choices of GUIs</LI>
    <LI>Everyine knows how end users hate even small changes to the interface for 
    their program</LI>
    <LI>They aren't ready to try five or six different ways to use a US, hoping to 
    find one that really suits them!</LI>
  </UL>


  <p>Linux is not the kind of software you recommend to your spinster aunt who 
  wants to find sites on the web dedicated to crocheting. It is a technical piece 
  of software designed to be used by technical people. (Actually, crocheting is a 
  also a technology, and a good one, but this is probably not the time to explore 
  the epistomological issues surrounding the word technology.)</p>

  <p>The people who are most at home with Linux are developers. Linux is really 
  just a particular kind of UNIX, and UNIX was created by programmers like Dennis 
  Ritchie, who were fundamentally interested, either consciously or unconsciously, 
  in creating toys for programmers.</p>

  <p>Of course, what programmers call toys businessmen think of as tools, but that's 
  another matter altogether. Rarely has their been such a happy coexistence of 
  craftsmen and businessmen as one finds in the computer world!</p>

  <p>In the programmer's Valhalla that is Linux, one finds more programming 
  languages than there are trees in one of Tolkein's forests. There are bash 
  scripts and Perl scripts, there are tcsh scripts and Python scripts. Linux (and 
  Unix) was built in C, and the OS has the flavor of the C programming language. 
  Or perhaps it is more that C has the flavor of Unix/Linux. In fact, the two 
  products were made by the same people, and they have many of the same strengths 
  and weaknesses.</p>

  <p>This is an OS that was designed to be programmed. Not programmed by wizards, 
  by programmed by mere mortals.</p>

  <p>Windows is designed to be run with a mouse. You click your way to fame and 
  fortune on Windows. Linux is designed to be run by scripts. You program your way 
  to happiness on Linux.</p>

  <p>A programmer who understands the OS can do anything with Linux. It is a 
  playground for a programmer with a little bit of knowledge and head full of 
  ideas.</p>

  <A NAME="StrongWeak"><h2>Linux Strengths and Weaknesses</h2></A>

  <h3>Linux has three great strengths:</h3>
  <ol>
    <li>Powerful multitasking
    <li>Powerful networking</li>
    <li>Uptime</li>
  </ol>

  <h3>Linux has two great weakness:</h3>
  <ol>
    <li>Newbies find the install difficult</li>
    <li>There is a serious lack of good applications!</li>
  </ol>


  <H3>Other Strengths</H3>
  <UL>
    <LI>Scripting capabilities are very powerful and easy to use</LI>
    <LI>You have a choice of GUIs and other tools</LI>
    <LI>It's free</LI>
    <LI>In a very subjective sense, I find that it feels good to use Linux. It suits 
    me, personally.</LI>
    <LI>You might be surprised what you can do: for instance, play MP3s</LI>
    <LI>No registry</LI>
    <LI>Configuration files can be carefully commented</LI>
  </UL>


  <H3>Other Weaknesses</H3>
  <UL>
    <LI>Choice of GUIs leads to problems with standards and dissipations of efforts</LI>
    <LI>Not all parts of the OS work the same way.</LI>
    <LI>Not all configuration files have the same format</LI>
    <LI>Configuration files differ from distribution to distribution. (On the other 
    hand, Windows 95 is different from 98, is different from NT, is different 2000</LI>
  </UL>


  <H3>Summary of Strengths and Weaknesses</H3>
  <UL>
    <LI>Windows has a great interface</LI>
    <LI>Linux has great multitasking and great networks and great stability</LI>
    <LI>The race: Will Windows get uptime and networking before Linux gets a great 
    interface?</LI>
  </UL>

  <p>I don't find the whole issue of the install to be that serious. Other than 
  some trouble that I had for a time with my SoundBlaster Live card, I have always 
  found ways to get around my troubles with Linux install issues. I have 
  admittedly had some frustrations in this regard, but they have not been 
  overwhelming.</p>

  <p>Applications, however, pose a more serious problem. I miss the great apps I 
  had on Windows. In particular, I cannot find anything on Linux that is the 
  equivalent of the great Windows HTML editors such as HomeSite and FrontPage. I 
  have never found a great Linux based FTP program, which is a bit ironic, when 
  one considers the power of most Linux networking tools.</p>

  <p>There are, of course, some good Linux apps out there. Great text editors, 
  such as Visual SlickEdit and Emacs, run on both Windows and Linux. Delphi now 
  runs on both Windows and Linux. StarOffice is very good, though certainly not 
  quite as good as Microsoft Office. (There are some things, however, such as 
  personalization, where StarOffice is way ahead of Microsoft Office.)</p>

  <p>If you cheat, and use VMWARE, then you can access Windows apps at the same 
  time as you use Linux. But that seems more like a hack for people who want to 
  fulfill a contractual obligation, then any kind of real solution. If you want to 
  really use Linux, then you have to use Linux apps, and sometimes that means 
  frustration.</p>

  <p>Sadly, I would have to add that this is a problem that is getting worse, 
  rather than better. Great Windows applications are being produced at an 
  extraordinary rate. Some of these applications are expensive, but many of them 
  are low cost, or free. While Linux continues to struggle to get the basics of 
  GUI application development down straight, Windows continues to roll forward on 
  this front.</p>

  <p>Windows is an OS with a beautiful surface. The further you are from the core 
  of Windows, the better the OS looks. When you are way out on the edges of the OS, 
  looking only at the Windowing system and that applications that it supports, 
  then Windows looks great. If you dig down toward the core of the apple, however, 
  you find an unstable OS that is still struggling to find its center.</p>

  <p>Linux, has the opposite problem. The core of Linux is rock solid. The basic 
  features of the OS, multitasking, networking and memory management, are rock 
  solid. The problems are all on the edges. The GUI environment is still trying to 
  define itself, and there is a shocking lack of strong applications.</p>

  <p>My experience as a programmer tells me that it is easier to fix superficial 
  problems than it is to fix fundamental design flaws. However, Windows has 
  momentum, and it has time on its side. Linux has a great architecture, but it 
  also has a formidable competitor.</p>

  <A NAME="FinalThoughts">

  <h2>Final Thoughts on Linux</h2></A>


  <H3>Overview</H3>
  <UL>
    <LI>Operating systems are a great target for open source software</LI>
    <LI>An OS is the basis for all programming projects, and hence its workings 
    should not be secret</LI>
    <LI>An OS ought to be reliable, and Windows is rarely reliable</LI>
  </UL>


  <H3>Economic Might</H3>
  <UL>
    <LI>Most of the powerhouses in computing are also economic powerhouses: IBM, 
    Microsoft, Sun</LI>
    <LI>Linux is at a disadvantage, since it lacks the economic muscle of its 
    competitors</LI>
  </UL>


  <H3>The Moral Highgroud</H3>
  <UL>
    <LI>Linux has a moral advantage, in that open source software is a good cause</LI>
    <LI>Unfortunately, there are few people in Silicon Valley who are prepared to 
    draw any finely honed philosophical distinctions</LI>
    <LI>Silicon Valley is a moral desert, and many of the people on the Linux 
    bandwagon are really more interested in money and fame than in doing the right 
    thing.</LI>
    <LI>There are, however, some who are serious about the cause</LI>
  </UL>


  <H3>Summary</H3>
  <UL>
    <LI>Linux is not just a piece of code</LI>
    <LI>It is also a culture, and many take the culture very seriously</LI>
    <LI>Hopefully this section of the talk has given you a feel for the Linux 
    culture</LI>
  </UL>


  <p>Open Source software is a great idea, and it is particularly compelling when 
  one is thinking about operating systems. Operating systems lie at the core of 
  all serious computing projects, and as such, their code should not be secret.</p>

  <p>Operating systems ought to be reliable. Windows is rarely reliable, and its 
  inner workings are shrouded in mystery. Only the folks at Microsoft are able to 
  fix its flaws, and it is a shame that its source is held so tightly that other 
  great minds cannot lend much needed expertise.</p>

  <p>There is much to be said for Linux, and much to be said for Open Source 
  software. Linux is not, however, a powerful economic force in the marketplace. 
  In economic terms, it is a child compared to Windows. Linux lacks the financial 
  weight necessary to launch a frontal assault on Microsoft.</p>

  <p>If Linux is weak on economics, it is not without strength in other areas. In 
  particular, Linux has the moral high ground in its debate with Windows. 
  Unfortunately, it lacks the wisdom to take advantage of its position.</p>

  <p>In the philosophical realm, Open Source software and Free Software are what 
  one might call shallow philosophies. They are good ideas, but they lack a 
  serious philosophical underpinning on which they can stand. The proponents of 
  these cause are passionate, but they are not always honest. They fight hard, but 
  they don't always fight clean. To take the moral high ground all the way to 
  victory, you have to be more than simply right. You also have to be virtuous. 
  Virtue is in short supply in Silicon Valley these days. It is not, however, 
  entirely absent.</p>

  <p>Some no doubt feel that I have talked too long about Linux as a philosophy. 
  Nonetheless, I don't think one can fully understand what Linux is about without 
  having some appreciation for the culture&nbsp;from which it emerged. In fact, 
  one of the more interesting aspects of Linux is the fact that it is built on a 
  philosophy and that it is the basis for a culture. Linux is more than just an 
  interesting exercise in computer logic. Without some understanding of Linux as a 
  culture, it is very difficult to understand its true import in the world of 
  computers.</p>

  </body>
</html>