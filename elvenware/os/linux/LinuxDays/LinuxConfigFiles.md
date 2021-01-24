<HTML>
<HEAD>
  <TITLE>Configuration Files</TITLE>
  <meta NAME="AUTHOR" CONTENT="Charlie Calvert">
  <script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
  <BODY>

  <h1>Linux Configuration Files</h1>


  <H3>Overview</H3>
  <UL>
    <li>The configuration files in the etc directory play the same role in Linux 
    that the registry does in Windows.</LI>
    <LI>The big difference is that you can write comments in a configuration file</LI>
    <LI>Learn about fstab, ftpaccess, hosts.deny, and many other key configuration 
    files. </LI>
    <LI>Learn to use LinuxConf to configure many of these files.</li>
    <LI>Back up your configuration files!</LI>
  </UL>

  <h3>rc.d/rc.local</h3>


  <h3>fstab</h3>


  <H3>exports</H3>

  <H3>resolv.conf</H3>

  <H3>httpd.conf</H3>

  <H3>network</H3>
  <UL>
    <LI>What I'm talking about here is how networking us set up under RedHat and 
    Mandrake and other RedHat derivatives</LI>
    <LI>The network file establishes the basic info about your network environment</LI>
  </UL>

  <PRE>NETWORKING=yes
HOSTNAME=shadowfax
GATEWAYDEV=eth0
GATEWAY=10.254.2.17</PRE>

  <H3>ifcfg-eth0</H3>
  <UL>
    <LI>This is how you set up your ethernet connection</LI>
    <LI>The file is located in /etc/sysconfig/network-scripts/</LI>
  </UL>

  <PRE>DEVICE=eth0
USERCTL=no
ONBOOT=yes
BOOTPROTO=none
BROADCAST=10.254.2.31
NETWORK=10.254.2.0
NETMASK=255.255.255.224
IPADDR=10.254.2.16</PRE>

  <H3>inetd and xinetd</H3>


  <H3>httpd</H3>
  <UL>
    <LI>In some cases, you may want to change, or uncomment: ServerName localhost</LI>
  </UL>

  <PRE>User apache
Group apache</PRE>

  <PRE>User ccalvert
Group nobody</PRE>

  <PRE>#CGI Module
ScriptAlias /scripts/ "/home/ccalvert/scripts/"
<Directory "/home/ccalvert/scripts">
  AllowOverride None
  Options ExecCGI
  Order allow,deny
  Allow from all
</Directory>
  </PRE>


  <H5>At the very end of the file, and this is the most important part:</H5>

  <PRE>
SetEnv LD_LIBRARY_PATH /home/ccalvert/kylix/bin:/home/ccalvert/kylix
SetEnv HOME /home/ccalvert
SetEnv LANG en_us

  </PRE>
  </BODY>
</HTML>
