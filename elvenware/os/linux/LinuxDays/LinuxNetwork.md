<HTML>
<HEAD><TITLE>Linux Network Card</TITLE>
  <meta NAME="AUTHOR" CONTENT="Charlie Calvert">
  	<script language="JavaScript" src="/charlie/libs/scripts/MeyerStyleSwitch.js" type="text/javascript"></script>  
	<!--#include virtual="../../scripts/HeaderInfo.html" -->
</HEAD>
<BODY>

<h1>Network and Network Card Configuration</h1>


  <h2>Installing the Network Card</h2>

  <p>Run LinuxConf</p>
  <ol>
    <li>Go to Client Tasks, Basic Host Information</li>
    <li>Choose Adaptor</li>
    <li>Choose Kernel Module and pick your module.</li>
    <li>If necessary, choose the IO Port and IRQ.</li>
    <li>Check hwconf</li>
  </ol>

  <p>Use ETHERNET HOWTO to find the lists of cards and their corresponding modules.</p>

  <p>Basic resources:</p>
  <ol>
    <li>hwconf</li>
    <li>conf.modules</li>
  </ol>

  <p>Also, see the Ethernet HOWTO.</p>

  <p>Details:</p>

  <p>See some of the files I've downloaded.</p>

  <ul>
    <li><a HREF="Network-Config-Tips-3.html"><u>Network-Config-Tips-3.html</u></a></li>
    <li><a HREF="../Network-Config-Tips-5.html"><u>Network-Config-Tips-5.html</u></a></li>
  </ul>

  <p>Once you have the card installed, then you need to play with</p>

  <p>/etc/sysconfig/network</p>

  <p>and also</p>

  <p>/etc/sysconfig/network-scripts/ifcfg-eth0</p>

  <p>At least that's how its done in RedHat. As root, you can manipulate these 
  files with netcfg, the program.</p>

  <p>To start the card, from the command line type:</p>

  <p>ifup eth0</p>
</BODY>
</HTML>
