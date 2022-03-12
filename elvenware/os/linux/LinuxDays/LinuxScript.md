---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxScript.md
relativePath: elvenware/os/linux/LinuxDays/LinuxScript.md
title: LinuxScript
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=iso-8859-1">
	<TITLE></TITLE>
    <META NAME="AUTHOR" CONTENT="Charlie Calvert">
	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
<BODY>
<H1>Scripting</H1>
<P>In this section you will learn a little
about three important scripting languages.</P>
<UL>
	<LI><A HREF=><#Bash>Bash</A></li>
    <LI><A HREF=><#Perl>Perl</A></li>
    <LI><A HREF=><#Python>Python</A></li>
</UL>

<H3><A NAME="Bash"></a>Bash Scripting</H3>

<H3>chmod and bash file for changing directories</H3>
<UL>
<LI>#!/bin/bash</LI>
<LI>cd /home/ccalvert/src</LI>
<LI>Now give yourself rights to execute it:</LI>
<LI>chmod a+x gosrc</LI>
<LI>Now run the file</LI>
<LI>It doesn't work because you are not using either source or .</LI>
</UL>

<P>Often you want to make changes to the current environment. You can
use export to do this, but often it is simpler to use the source or .
command. Suppose you have a bash script called gosource that looks
like this: 

<pre>
#!/bin/bash 

pushd /home/ccalvert/kylix/source 
</pre>

<p>This simple file changes you current directory to the directory 
home/ccalvert/kylix/source.  Instead of using cd to make the change, you 
use pushd.  If you use pushd, then you will be able to get back to the 
directory from which you started by entering the command popd.  Here is an 
example:</p>

<pre>
/home/ccalvert/$ pushd /usr/local 
/usr/local/$
/usr/local/$ popd 
/home/ccalvert/$ 
</pre>

<p>The user started out in /home/ccalvert, used pushd to change to the 
/usr/local directory, then used popd to move back to the /home/ccalvert 
directory.  Given this knowledge, our bash script would appear to move us 
into the /home/ccalvert/kylix/source directory.  But if you simply enter 
the gosource command at the bash prompt, it will appear that you script 
does not work.In fact, it does work, but the problem is that it starts a 
new bash shell, changes you to the directory you requested, then ends the 
shell, thereby switching back to where you started.  For all intents and 
purposes, the script does not work, even though it does do the job it asks 
you to do.  Consider the following command: </p>
 
<pre> . gosource </pre>
 
<P>Notice that there is a period and a space before the
command. If you press enter after issuing this command, it will have
the effect you wanted. You can, of course, embed the ., or source, 
command, inside a bash script file.</P>

<h3><A NAME="Perl">Perl</a></h3>


<H4>Overview</H4>
<ul>
<li>Simple file io</li>
<li>packages</li>
<li>Debugging</li>
</ul>   


<H4>Quality</H4>
<UL>
<LI>For some reason, many people think Perl is only about parsing text </LI>
<LI>It does, in fact, do that well.</LI>
<LI>However, you can also use Perl to write cgi scripts, to write ftp programs, even to write telnet programs</LI>
<LI>It is a write once, read never, langauge, but you can get a lot done in a short period of time.</LI>
</UL>

<h4>A Simple First Program</h4>

<P>Here is a very simple Perl script.</P>                              
<pre>
#!/usr/bin/perl

print("The Blue Begonia Express!\n");
</pre>

<P>To run it, first make sure it has the proper access permissions.</P>

<P>You can start it one of two ways:</P>

<PRE>
perl simple.pl
./simple.pl
</PRE>

<h4>File IO</h4>

<h5>ReadEmAndWeep.pl</h5>                 
<pre>
#!/usr/bin/perl

#Sam();

print("Summer time blues!");
Sam();

sub Sam
{
    print("\n");
    open(WORDS, "stuff");
    while ($name = <WORDS>)
    {
      print("$name");
    }
    print("\n");
}
</pre>

<h5>SimpParse</h5>               
<pre>
#!/usr/bin/perl

DoIt();

sub DoIt()
{
    $i = 0;
    open (MESS, "messages");
    while ($name = <MESS>)
    {
    	$name =~ s/\W.*//;
      print ("$name", $i);
      $i++;
    }
}
</pre>                        
<h4>Parsing HTML Example</h4>

<p>Here is a simple Perl script for finding all the NAME tags in a file 
and creating a unordered list from them.</p>.
<pre>
#!/usr/bin/perl -w
#
# $Revision: 1.4 $
#
# $Date: 2002/09/02 15:36:45 $

my $file = shift;

die "Can't find file \"$file\""
  unless -f $file;
    
my $count = 0;
my $isAName = 0;
my $jumpName = "";
my $fileName = "Jumps.html";

open(OUT, ">$fileName") or die "can't open $fileName: $!";
print("$file\n");
open(IN, "$file") or die "can't open $file: $!";
print(OUT "<ul>\n");

while(<IN>)
{
 
  if(/&lt;a\sname/i)
  {
    $count++;
    
    $jumpName = getJumpName($_);
    $myLabel = getLabel($_);

    print(OUT "&lt;li&gt;&lt;a href=\"#$jumpName$myLabel&lt;/li&gt;\n");
  }
}

close(IN);

print("Found $count names.\n");

print(OUT "</ul>");
close(OUT);

################
## End of main
################

sub getJumpName
{
  my ($position, $myStr, $value);

  $value = shift;

  $position = index($value, "a name=");
  $myStr = substr($_, $position + 8);
  $myStr = reverse($myStr);
  $position = index($myStr, ">\"");
  $myStr = substr($myStr, $position + 1);
  $myStr = reverse($myStr);

  return $myStr;
}


sub getLabel
{
  my ($pos, $myStr, $value);
  $value = shift;

  $position = index($value, "\">");
  $myStr = substr($value, $position + 1);
  $myStr = reverse($myStr);
  $position = index($myStr, ">a/<");
  $myStr = substr($myStr, $position);
  $myStr = reverse($myStr);

  return $myStr;
}
</pre>

<h3><A NAME="Python">Python</A></h3>

</BODY>
</HTML>