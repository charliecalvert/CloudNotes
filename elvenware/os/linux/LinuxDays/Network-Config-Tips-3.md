<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<HTML>
<HEAD>
 <META NAME="GENERATOR" CONTENT="SGML-Tools 1.0.7">
 <TITLE>Red Hat Network Device Configuration Tips: General Networking</TITLE>
 	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
<BODY>
<HR>
<H2><A NAME="general-networking"></A> <A NAME="s3">3. General Networking</A></H2>

<P><CODE>/etc/sysconfig/network</CODE>
<P>Most of the networking configuration under Red Hat Linux uses the same
files as any other distribution, i.e., <CODE>/etc/hosts</CODE>,
<CODE>/etc/resolv.conf</CODE>, and so forth.  However, a few of the more
important values are kept in this file for easy access from the rest of
the scripts.
<P>
<DL>
<P>
<DT><B>NETWORKING (y/n)</B><DD><P>Should network services be brought up or
not.
<P>
<DT><B>HOSTNAME</B><DD><P>The fully qualified hostname, as passed to
<CODE>hostname</CODE>
<P>
<DT><B>DOMAINNAME</B><DD><P>The domain name for the machine.
<P>
<DT><B>GATEWAY</B><DD><P>IP address of the default gateway, if any.
<P>
<DT><B>GATEWAYDEV</B><DD><P>Device used to reach the default gateway.
<P>
</DL>
<P>
<P>
<HR>
<A HREF="../Network-Config-Tips-4.html">Next</A>
<A HREF="../Network-Config-Tips-2.html">Previous</A>
<A HREF="../Network-Config-Tips.html#toc3">Contents</A>
</BODY>
</HTML>
