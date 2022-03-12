---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/os/linux/LinuxDays/LinuxFAQ.md
relativePath: elvenware/os/linux/LinuxDays/LinuxFAQ.md
title: LinuxFAQ
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width" initial-scale="1"><title>LinuxFAQ</title><link rel="shortcut icon" href="/charlie/images/favicon.png"><!-- Latest compiled and minified CSS--><link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"><!-- Optional theme--><link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-theme.min.css"><link href="/libs/css/BootstrapIndex.css" rel="stylesheet" type="text/css"><script src="/libs/scripts/jquery.min.js"></script><script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script><script src="/libs/scripts/elvenware.js" type="text/javascript"></script><script src="/libs/scripts/Control.js"></script></head><body><div class="navbar navbar-inverse"><div class="container"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a href="/index.html" class="navbar-brand">Elvenware</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav"><li class="active"><a href="/index.html">Home</a></li><li><a href="/contents.html">About</a></li><li class="dropdown"><a href="#" data-toggle="dropdown" class="dropdown-toggle">Dropdown<b class="caret"></b></a><ul class="dropdown-menu"><li class="dropdown-header">Core Code</li><li><a href="/development/index.html">Strongly Typed</a></li><li><a href="/development/web/index.html">Web & Scripts</a></li><li><a href="/development/cloud/index.shtml">Cloud</a></li><li class="divider"></li><li class="dropdown-header">OS and Tools</li><li><a href="/os/index.html">OS</a></li><li><a href="/development/database/index.html">Database</a></li><li><a href="/books/index.html">My Writing</a></li><li class="divider"></li><li class="dropdown-header">Art</li><li><a href="/charlie/Art/index.html">Poems & Photos</a></li><li><a href="/books/reading/index.html">Book Reviews</a></li><li><a href="/spirit/index.html">Spiritual</a></li><li class="divider"></li><li class="dropdown-header">Links</li><li><a href="/charlie/links.html">My Links</a></li><li><a href="http://www.github.com/charliecalvert">GitHub</a></li><li><a href="http://sourceforge.net/projects/elvenware/">Sourceforge</a></li></ul></li></ul></div><!-- /.nav-collapse--></div></div><div class="container"><figure><img alt="Elvenware" src="/images/elvenwarelogo.png"/></figure><h1>LinuxFAQ</h1><p>The index for LinuxFAQ:</p><ul><!--TOC_Start--><li><a href="#linux-faq">Linux FAQ</a></li>
<li><a href="#apachedir">ApacheDir</a></li>
<li><a href="#bashprofilebashrc">BashProfileBashRC</a></li>
<li><a href="#batterytime">BatteryTime</a></li>
<li><a href="#bootfloppy-on-redhat">bootfloppy on Redhat</a></li>
<li><a href="#bytecompilelisp">byte compile on el file in emacs</a></li>
<li><a href="#cd">Change Directory: cd</a></li>
<li><a href="#copy">Copy: cp</a></li>
<li><a href="#cronstuff">CronStuff</a></li>
<li><a href="#debianpackages">DebianPackages</a></li>
<li><a href="#debugperl">debug a perl program in ddd</a></li>
<li><a href="#DelphiDebug">delphi debug with ddd</a></li>
<li><a href="#delphiinstall">DelphiInstall</a></li>
<li><a href="#delphilibs">DelphiLibs</a></li>
<li><a href="#delphisofiles">DelphiSoFiles</a></li>
<li><a href="#diskfree">DiskFree</a></li>
<li><a href="#how-much-space-does-this-directory-take-up-">How much space does this directory take up?</a></li>
<li><a href="#dnslookup">DNSLookup</a></li>
<li><a href="#find-dns-servers">Find DNS Servers</a></li>
<li><a href="#ftp-server">FTP Server</a></li>
<li><a href="#emacsfont">EmacsFont</a></li>
<li><a href="#fileowner">FileOwner</a></li>
<li><a href="#file-permissions">File Permissions</a></li>
<li><a href="#find-a-directory-or-file">find a directory or file</a></li>
<li><a href="#fdisk">fdisk</a></li>
<li><a href="#gnome">gnome</a></li>
<li><a href="#grep">grep</a></li>
<li><a href="#java">Java</a></li>
<li><a href="#jobs">Jobs</a></li>
<li><a href="#httpdPermissions">You don&#39;t have permission to access / on this server</a></li>
<li><a href="#libbrowse">library browsing</a></li>
<li><a href="#mountcd">MountCD</a></li>
<li><a href="#mountdosfloppy">MountDosFloppy</a></li>
<li><a href="#move">Move</a></li>
<li><a href="#networkping">NetWorkPing</a></li>
<li><a href="#networkstuff">NetworkStuff</a></li>
<li><a href="#nfs-stuff">NFS Stuff</a></li>
<li><a href="#novellogin">NovelLogin</a></li>
<li><a href="#pathsetup">PathSetup</a></li>
<li><a href="#pingyourself">PingYourself</a></li>
<li><a href="#remotelogin">Remote Login Stuff</a></li>
<li><a href="#restartapache">RestartApache</a></li>
<li><a href="#rpmFreshen">rpm and the F for Freshen option</a></li>
<li><a href="#rpm-glibc">rpm-glibc</a></li>
<li><a href="#removeDir">Remove or delete a directory/folder</a></li>
<li><a href="#samba">Working with Samba</a></li>
<li><a href="#sambainfo">SambaInfo</a></li>
<li><a href="#seeprocesses">SeeProcesses</a></li>
<li><a href="#smbmount">SmbMount</a></li>
<li><a href="#ssh">SSH</a></li>
<li><a href="#ssh-agent-and-ssh-add">SSH-AGENT and SSH-ADD</a></li>
<li><a href="#sudo">Sudo</a></li>
<li><a href="#switchdesk">SwitchDesk</a></li>
<li><a href="#symlink">SymLink</a></li>
<li><a href="#tarfiles">TarFiles</a></li>
<li><a href="#versionlinux">VersionLinux</a></li>
<li><a href="#wine">Wine</a></li>
<li><a href="#writefilepermission">WriteFilePermission</a></li>
<li><a href="#xlibconnection">XLibConnection</a></li>
<li><a href="#xroot">X Windows and root</a></li>
<li><a href="#zip">Zip Files or Folder</a></li>
<li><a href="#zipdisks">Mounting Zip Disks</a></li><!--TOC_End--></ul><table>
<thead>
<tr>
<th>Description</th>
<th>Abbreviation</th>
<th>Code</th>
</tr>
</thead>
<tbody>
<tr>
<td>Execute</td>
<td>xer</td>
<td>123</td>
</tr>
</tbody>
</table>
<h1 id="linux-faq">Linux FAQ</h1>
<h2 id="apachedir">ApacheDir</h2>
<pre><code>To create a new directory in Apache go /etc/apache and change srm.conf or
access.conf

You can also just create a symbolic link to a directory from the /var/www
directory. Then you can access the symbolic link from the web. For instance
create a link to /charlie1/wwwroot/links in /var/www/links. 
</code></pre><h2 id="bashprofilebashrc">BashProfileBashRC</h2>
<pre><code>Here is a good reference if you want the PATH and environment 
variables to show up in the GUI:

Persitent enviornment variables on Ubuntu

The suggestion for the best place to put environment variables
would be either ~/.profile or ~/.pam_environment. If you just want
to set things for the command line session, then .bashrc.

The .bash_profile file controls the environment settings, but it uses 
file called .bashrc to set the path.

In .bashrc:

# Set JAVA_HOME:
export JAVA_HOME=/usr/lib/jvm/default-java

To test if it is set use either of the following:

{$JAVA_HOME:?}
echo $JAVA_HOME

Here is something you can put at the end of .bashrc to ensure **ssh-agent**
is loaded every time you open a shell. This means multiple copies can 
get loaded, but that may actually be the most useful approach in some
cases:

if [ -z &quot;$SSH_AUTH_SOCK&quot; ] ; then
    eval `ssh-agent`  
fi
</code></pre><h2 id="batterytime">BatteryTime</h2>
<pre><code>Find out how much time is left on the battery when you are not plugged in:

issue the command: apm
</code></pre><h2 id="bootfloppy-on-redhat">bootfloppy on Redhat</h2>
<pre><code>Creating a boot floopy

mkbootdisk --device /dev/fd0 2.23333

where 2.23333 is the kernal version found in /lib/modules

Sometimes disaster strikes. For instance, if you are dual booting, and
happen to reinstall Windows, then Bill will wipe out your Grub or Lilo
multiboot options. (Nice guy, right?) There is no need to worry, at least 
if you are using RedHat. Stick the first disk of the red hat CD ROM series 
in your CD and reboot. If your system is set up to boot from CDROM, then it 
will do so. Follow the instructions to get into rescue mode, or type linux 
rescue. This will boot you up into command line mode for linux. To set up 
the correct root, type chroot /mnt/sysimage. Now you can follow the 
directions above to create a boot floppy.
</code></pre><h2 id="bytecompilelisp">byte compile on el file in emacs</h2>
<pre><code>byte compile an el file from lisp in emacs

m-x byte-compile-file

Or choose it from the menu
</code></pre><h2 id="cd">Change Directory: cd</h2>
<pre><code>The cd and chdir commands do the same thing. For the man entry, use chdir.

This command changes the user&#39;s current directory. For example, to move from the current directory to
a directory called temp, you might type something like this:

cd /home/ubuntu/temp/

Remember that you can always find your current directory by typing pwd.
</code></pre><h2 id="copy">Copy: cp</h2>
<pre><code>The Linux command to copy a file is cp.

Usage:

    cp myfile.txt /home/charlie/.

This command copies myfile.txt from the current directory to the /home/charlie directory.

Copy with checking for date:
  cp -rpuvf
</code></pre><h2 id="cronstuff">CronStuff</h2>
<pre><code>Keep a crontab file called crontab in your home directory.

Here is a sample line for running the script foo every minute:

* * * * * /root/bin/foo

Here is a sample line for running the script foo every hour on the hour

0 * * * * /root/bin/foo

Run it between 9 and 5 pm:

0 9-17 * * * /root/bin/foo

Run it at 10 after 20 after 40 after:

10,20,40 * * * * /root/bin/foo

Run it first day of month and every sunday at 2 am:

0 2 1 * 0 /root/bin/foo

Run it on Jan 1 at 2 am:

0 2 1 1 * /root/bin/foo

So its the

minute, hour, day of month, month, day of week, program name
</code></pre><h2 id="debianpackages">DebianPackages</h2>
<pre><code>/usr/src/linux

  make xconfig

dpkg -i MyFile.deb
</code></pre><h2 id="debugperl">debug a perl program in ddd</h2>
<pre><code>debug a perl program in ddd

ddd --perl program
</code></pre><h2 id="DelphiDebug">delphi debug with ddd</h2>
<pre><code>compile Delphi with dcc -b -v filename.dpr

then

xxgdb filename
</code></pre><h2 id="delphiinstall">DelphiInstall</h2>
<pre><code>gnu:/exports/latest
</code></pre><h2 id="delphilibs">DelphiLibs</h2>
<pre><code>      You need to have qtintf.so in your LD_PATH. I created a symbolic
      link from /usr/lib to &quot;the kylix install&quot;/lib/qtintf.so.2.2.0. On
      my system &quot;ln -s /kylix/qt/qtintf.so.2.0.2 /usr/lib/qtintf.so&quot;
      You need to specify the unit directory. On my install &quot;dcc
      -U/kylix/lib &quot;  
</code></pre><h2 id="delphisofiles">DelphiSoFiles</h2>
<pre><code>Building so files

dcc -y -m -z -p System.pas

Copy the result dpu file to lib directory.

Create a library file.

library simple;

function GetNine: Integer;
begin
  result := 9;
end;

exports 
  GetNine;

begin
end.

Build the so file the same way you build System.pas. Copy the file to some
place on your LDPATH, such as /usr/lib.

Then create the file to use it:

program test;

function GetNine: Integer; external &#39;simple.so&#39; name &#39;GetNine&#39;;

begin
  WriteLn(GetNine);
end.
</code></pre><h2 id="diskfree">DiskFree</h2>
<pre><code>df gives you are reading of the space left on your drives. df -h makes 
it human readable

du gives you all the directories benearth the current one.
</code></pre><h2 id="how-much-space-does-this-directory-take-up-">How much space does this directory take up?</h2>
<pre><code>du is the command to get a list of the current directory and all
directories under it

Here is the command for the record of all the files in the home
directory. This command sends all errors to dev null, and only
reports the total, not the suptotal for each directory:

du --summarize --one-file-sytem /home 2 &gt; /dev/null

Here is the result of running du in my /home/ccalvert/.gimp
directory:

4   ./brushes
4   ./gradients
168 ./palettes
4   ./patterns
4   ./plug-ins
4   ./gfig
4   ./tmp
4   ./scripts
4   ./gflares
408 .

Here is the result of running the summarize command in the 
same directory:

du --summarize /home/ccalvert.gimp 2 &gt; /dev/null
408    /home/ccalvert/.gimp

Note that if you put the -one-file-system flag in you would get no result 
at all on the .gimp directory. 
</code></pre><h2 id="dnslookup">DNSLookup</h2>
<pre><code>To see what the DNS server things is the name of a particular IP address

NSLOOKUP 10.143.13.126

to pump in a domain name: ./pump -i eth0 -h theshire

To restart the network, go into init.d and type network restart

pump
</code></pre><h2 id="find-dns-servers">Find DNS Servers</h2>
<pre><code>What are the DNS servers for a particular machine?

Look in /etc/resolv.conf
</code></pre><h2 id="ftp-server">FTP Server</h2>
<pre><code>Setting up the FTP Server on RedHat 7.2

Use the PackageManager (kpackage) to make sure both anonftp and wu-ftpd are installed

rpm -Uvh wu-ftpd* anonftp*

Now go to your /etc/xinitd directory and open up wu-ftp and make sure that
disable is set to no. By default, it is set to yes.
</code></pre><h2 id="emacsfont">EmacsFont</h2>
<pre><code>add this to your bashrc to start emacs with a bigger font:

alias emacs=&#39;emacs -font -adobe-courier-medium-r-normal--14-100-100-100-m-90-iso8859-1&#39;
</code></pre><h2 id="fileowner">FileOwner</h2>
<pre><code>Give ccalvert permissions to own a file:
  chmod -o=rw FileName.txt
</code></pre><h2 id="file-permissions">File Permissions</h2>
<pre><code>This command gives the group the same rights as the owner:
  chmod g=u

u   User  Owner of the file
g   Group Group to which the owner belongs
o   Other All other users
a   All   Same as ugo

This command gives the owner rights:
  chmod u+r

This command gives the group rights:
  chmod g+r

This comand gives others rights:
  chmod o+r

To see the octal numbers associated with a file (755 or 777, etc) use stat,
passing in requests to see the File Permissions in human readable form (%A),
in octal form (%a), and to see the file name (%n):

  stat -c &#39;%A %a %n&#39; * 

The stat command above yields output like this:

  -r-xr--r-- 544 file.txt

Here is a short session with chmod and stat. First we use stat see the octal number,
then we use chmod to change the file permissions, then we use stat view the changes:

  $ stat -c &#39;%A %a %n&#39; bar.txt
  -rw-rw-r-- 664 bar.txt
  $ chmod 600 bar.txt
  $ stat -c &#39;%A %a %n&#39; bar.txt
  -rw------- 600 bar.txt
</code></pre><table>
<thead>
<tr>
<th>Description</th>
<th>Abbreviation</th>
<th>Code</th>
</tr>
</thead>
<tbody>
<tr>
<td>Execute</td>
<td>x</td>
<td>1</td>
</tr>
<tr>
<td>Write</td>
<td>w</td>
<td>2</td>
</tr>
<tr>
<td>Read</td>
<td>r</td>
<td>4</td>
</tr>
<tr>
<td>Read and Execute</td>
<td>rx</td>
<td>5</td>
</tr>
<tr>
<td>Read and Write</td>
<td>rw</td>
<td>6</td>
</tr>
<tr>
<td>Read, Write &amp; Execute</td>
<td>rwx</td>
<td>7</td>
</tr>
</tbody>
</table>
<p>Other:</p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Location</th>
</tr>
</thead>
<tbody>
<tr>
<td>owner</td>
<td>-rwx------</td>
</tr>
<tr>
<td>group</td>
<td>----rwx---</td>
</tr>
<tr>
<td>other</td>
<td>-------rwx</td>
</tr>
</tbody>
</table>
<p><a href="http://www.tuxfiles.org/linuxhelp/filepermissions.html">Link to TuxFiles Linux Permissions</a></p>
<h2 id="find-a-directory-or-file">find a directory or file</h2>
<pre><code>if you have lost a file, you can search across the entire system for it. The command you use is called find.

To look for files in the current directory and all sub-directories:

find -name my-file.txt

If you want to look across the entire system:

find / -name my-file.txt 

That command says: starting at the root (/) look across the whole system for simple-python.py.

If you start looking across the entire system, and you are not root (sudo), you will get error messages about directories that you don&#39;t have permissions to search through. To get rid of the errors and see only the found files:

find / -name my-file.txt 2&gt;/dev/null

That&#39;s not a typo, you should write 2&gt;/dev/null.


To find directory name type:

 find . -type d -iname dirname
</code></pre><h2 id="fdisk">fdisk</h2>
<p>And (sudo fdisk -l)</p>
<ul>
<li><a href="https://help.ubuntu.com/community/SwapFaq#Why_is_my_swap_not_being_used.3F">https://help.ubuntu.com/community/SwapFaq#Why_is_my_swap_not_being_used.3F</a></li>
</ul>
<h2 id="gnome">gnome</h2>
<pre><code>You can run gnome and unity on the same Ubuntu machine. Install either unity or gnome:

sudo apt-get install gnome-shell
sudo apt-get install unity

Now reboot either through the GUI, or like this:

sudo shutdown -r now

At the login prompt there is a little Ubuntu icon. Click it, and you will be able to choose
whether you want to use gnome or unity.
</code></pre><h2 id="grep">grep</h2>
<pre><code>You want grep to search through multiple directories. Use backticks to run find in place:

grep &quot;Find this string&quot; `find . -iname &quot;*&quot;` 

This will find the string &quot;Find this string&quot; if it appears in any file (&quot;*&quot;) in the current
directory or one of the current directory&#39;s subdirectories.
</code></pre><h2 id="java">Java</h2>
<p>Open JDK on Ubuntu:</p>
<pre><code>sudo apt-get install openjdk-7-jdk 
</code></pre><p>I got that from here: <a href="http://openjdk.java.net/install">http://openjdk.java.net/install</a></p>
<p>Oracle Sun JDK on Ubuntu:</p>
<pre><code>sudo add-apt-repository ppa:webupd8team/java 
sudo apt-get update 
sudo apt-get install oracle-java7-installer
</code></pre><p>Set up the environment variables JAVA_HOME and PATH:
    sudo apt-get install oracle-java7-set-default</p>
<p>I got that from here:</p>
<ul>
<li><a href="http://stackoverflow.com/a/16263651/253576">http://stackoverflow.com/a/16263651/253576</a></li>
</ul>
<h2 id="jobs">Jobs</h2>
<pre><code>Type jobs to see the list of running jobs
Use fg to switch back to a job.
If you are in nano, and want to get to the prompt to do some task, press Ctrl+Z. Then fg to get back.
</code></pre><h2 id="httpdPermissions">You don&#39;t have permission to access / on this server</h2>
<pre><code>You try to browse to your server on your machine and get an error about permisisons. The
problem might be that linuxconf has screwed up your httpd.conf file. Look for &lt;files ~&gt; and
replace with:

&lt;Files ~ &quot;^\.ht&quot;&gt;
</code></pre><h2 id="libbrowse">library browsing</h2>
<pre><code>run nm on it to see the symbols in a library
  nm libc.
</code></pre><h2 id="mountcd">MountCD</h2>
<pre><code>Mount the CDROM drive
  mount /mnt/cdrom
</code></pre><h2 id="mountdosfloppy">MountDosFloppy</h2>
<pre><code>command line for mounting a flopping on red hat
mount -t vfat /dev/fd0 /mnt/floppy 
</code></pre><h2 id="move">Move</h2>
<pre><code>Use the mv to move a file from one location to another, or to rename a file. This is like copy,
but the original file is deleted after it is copied.

Usage:
    mv [OPTIONS] source directory
    mv [OPTIONS] source dest

Example:
    mv myFile.txt /home/ubuntu/
    mv myFile.txt myBigFile.txt
    mv --update myFile.txt /home/ubuntu/.

The second example renames a file. The third uses an option that specifies that the file
should only be moved if the destination file does not exist or if the source is newer than
the destination. There many other options, of course. Type man mv to see all the options.   
</code></pre><h2 id="networkping">NetWorkPing</h2>
<pre><code>Getting the network to ping other machines in your LAN:
 etc/sysconfig/network-scripts/ifcfg-eth0

 BOOT_PROTO=&quot;dhcp&quot;
 DHCP_HOSTNAME=&quot;Merlin&quot;
 PUMP=&quot;yes&quot;

 dns,hosts
</code></pre><h2 id="networkstuff">NetworkStuff</h2>
<pre><code>Network stuff:
  ifconfig
  netcfg
  route
  cardctl ident
  cardctl status

  Check /var/log/messages for reports on errors

Here are some important files
  /etc/sysconfig/network-scripts/ifcfg-eth0
  /etc/sysconfig/network-scripts/ifup
  /etc/sysconfig/network                  // Not as sure about this one


/etc/rc.d/int.d/network restart
</code></pre><h2 id="nfs-stuff">NFS Stuff</h2>
<pre><code>Here is the command ot start nfs:

/etc/rc.d/init.d/nfs start

You can also stop it, or check its status

Here is how to mount a drive on remote machine:

mount 192.168.1.1:/home/ccalvert /mnt/foo

You can specify what to export from your machine in the file:

/etc/exports

For instance:

/home 

here is how to export your home directory as read only from
/etc/exports:

/home (ro)

Here is how to export as read write from /etc/exports. 

/home/ccalvert (rw)

To make the above statement work properly, you may need to be signed
on as ccalvert on the client machine.

Here is a line you can add to your fstab file to make it so you an
mount more easily:

192.168.1.30:/home/ccalvert /mnt/foo                nfs     noauto,user,rw     0 0

After adding this line, you can mount with this command:

mount /mnt/foo

To see what&#39;s going on on another machine:

rpcinfo -p 192.168.1.1
</code></pre><h2 id="novellogin">NovelLogin</h2>
<pre><code>LOGIN TO NOVEL SERVER

modprobe ncpfs
ipx_interface add -p eth0 802.3
ncpmount -s SV5 -U ccalvert.Mkt.HQ.Inprise /mnt/foo

ncpmount -S SV5 -U ccalvert.mkt.hq.inprise /mnt/foobar
</code></pre><h2 id="pathsetup">PathSetup</h2>
<pre><code>In your ~/.profile file:

# set PATH so it includes user&#39;s private bin if it exists
if [ -d &quot;$HOME/bin&quot; ] ; then
    PATH=&quot;$HOME/bin:$PATH&quot;
fi

You can also use ~/.pam_environment:

JAVA_HOME=/some/folder
PATH DEFAULT=${PATH}:${HOME}/bin

See this:

Persitent enviornment variables on Ubuntu
</code></pre><h2 id="pingyourself">PingYourself</h2>
<pre><code>Clean up the problem with ping yourself 

in this file
/etc/sysconfig/network 

DHCP_HOSTNAME=theshire

/etc/hosts

delete the reference to theshire or whatever host name you have
</code></pre><h2 id="remotelogin">Remote Login Stuff</h2>
<pre><code>rlogin -l ccalvert hostname
</code></pre><h2 id="restartapache">RestartApache</h2>
<pre><code>Restart Apache

etc/rc.d/init.d/httpd restart
</code></pre><h2 id="rpmFreshen">rpm and the F for Freshen option</h2>
<pre><code>Freshening is different than updating in that you will only Freshen packages that 
are already installed, while update will update or install an uninstalled package.
I have found that freshen works well when you get in to conflicts between different
versions of packages that are already installed. Freshen just seems to get around
that issue.

RedHat Notes on RPM       
</code></pre><h2 id="rpm-glibc">rpm-glibc</h2>
<pre><code>rpm -Fvh glibc*.rpm

RedHat Notes on RPM                    
</code></pre><h2 id="removeDir">Remove or delete a directory/folder</h2>
<pre><code>To remove a directory use the rm command. To remove a directory that contains files or other directories, use rm -rf. 

Here is an example. First confirm a folder called bar exists and that it contains some content:

hadooper@WesternSeas:~/bin$ ls bar/
foo.txt

Now try to remove the directory without passing parameters to rm:

hadooper@WesternSeas:~/bin$ rm bar
rm: cannot remove `bar&#39;: Is a directory

The second line shows a failure. No try again with -rf. It will return without 
giving feedback, which means success. I then try to list the folder, which fails, 
proving that the folder has been deleted:

hadooper@WesternSeas:~/bin$ rm -rf bar
hadooper@WesternSeas:~/bin$ ls bar
ls: cannot access bar: No such file or directory
</code></pre><h2 id="samba">Working with Samba</h2>
<pre><code>SAMBA:

run this, or the result of cat /car/run/inetd.pid, which is a na a number:

kill -HUP `cat /var/run/inetd.pid`

Go to /etc/rc.d/init.d and run:
./smb start

You should then run:

./smb status 

to be sure it is running (two files)

To check smb.conf run testparm

Set security to either user or share

To create a public share called myshare:

[myshare]
   path = /home/ccalvert
   public = yes
   only guest = yes
   writable = yes
   printable = no

You probably want to set the security level to share, unless you have
domain controller.

Set the directory and the files in it to the group users
</code></pre><h2 id="sambainfo">SambaInfo</h2>
<pre><code>Samba info

go to /etc/samba/smb.conf

and set the following:

   encrypt passwords = yes
   smb passwd file=/etc/samba/smbpasswd

also, you probably have to manually start nmbd
</code></pre><h2 id="seeprocesses">SeeProcesses</h2>
<pre><code>See all the current processes:
  ps aux
  ps aux | grep smb

Shutdown Ubuntu

From the command line. You have three options, of which the second shown is usually best:

    sudo shutdown now        // Go to single user mode for admin work
    sudo shutdown -h now     // Turn off the machine right now
    sudo shutdown -r now     // Reboot the machine now

There are other options, such as halt, poweroff and reboot, but shutdown is usally the
preferred option. Users are notified of what is about to happen.

If you to shut down in five minutes do this:

    sudo shutdown -h +5
</code></pre><h2 id="smbmount">SmbMount</h2>
<pre><code>smbmount //eastfarthing/cdrive -c &quot;mount /Charlie&quot; user%password

One corel:

  mkdir a directory in mnt. 

  smbmount //eastfarthing/cdrive /mnt/foo -U ccalvert
</code></pre><h2 id="ssh">SSH</h2>
<pre><code>You can install it all in one go:

  sudo apt-get install ssh

Or you can install either half:

  sudo apt-get install openssh-client
  sudo apt-get install openssh-server


Assuming you have SSH installed on your Linux box, you should be able to use SSH to open
a shell on remote machine like this:

ssh charlie@ftp.somewhere.com

Or like this, if you want to use an ip address:

ssh charlie@192.168.0.22

Or like this if you want to specify a private key:

ssh -i MyPrivateKey charlie@192.168.0.22

See below on how to load a private key into memory with SSH-AGENT and SSH-ADD.


SSH comes in two parts. The server part is called sshd. 

To see if you have the server installed, type:

  which sshd

It should return the name of the ssh server executable, which might be something like:

  /usr/sbin/sshd

To see if sshd is running try any of the following:

  ps -A
  ps -C sshd
  pgrep sshd

After running these commands the word sshd should appear in the output if it is running.

You can start and stop the service this way:

  sudo service ssh stop  
  sudo service ssh start

Use a tool like PuttyGen to create a private/public key pair. The private key stays on your
current machine is a secret. Your public key goes on the remote server in the root of your 
home directory in this location: .ssh/authorized_keys file. 
The public key you put in authorized_keys need not stay a secret. If you don&#39;t associate a password
with your key pair then you will never be prompted for a password. If you do associate a 
password, you can only need to enter it once a day or so by using the Putty program called 
Pagaent, which keeps your password for your private key in memory. When you connect to the 
remote server, it finds your public key, matches it to your private
key, and let&#39;s you in without you having to type a password.
</code></pre><h2 id="ssh-agent-and-ssh-add">SSH-AGENT and SSH-ADD</h2>
<pre><code>These tools enable Linux users to load a private key into memory, much the way Pagaent allows you to load
private SSH keys into memory on Windows.

The simplest, but probably not best technique, is to do this:

eval `ssh-agent`
chmod 400 MyKey.pem
ssh-add MyKey.pem

Notice the back ticks on the call eval. In this example, MyKey.pem is your private key. It might have a name like id-rsa. 
I&#39;m not crazy about this, because it appears I need to do it each time I log into my shell. Isn&#39;t there a better way?
Yes, there is, see SSH Keys below.

I like to put code to load ssh-agent in my .bashrc file:

if [ -z &quot;$SSH_AUTH_SOCK&quot; ] ; then
    eval `ssh-agent`  
fi

Assuming that I have already run **chmod 400 MyKey.pem**, then I can run this command alone to load my key:

ssh-add MyKey.pem

Frequently my private key is in the **.ssh** folder, so in practive I might type something like this instead:

ssh-add ~/.ssh/MyKey.pem

That path in that code goes points to a private key in my **.ssh** folder. As a result, I can use the command from anywhere on my system.     

Finally, you can add a command like that to your .bashrc folder.

Another technique, which is perhaps even more powerful, is to set up a config file in your **.ssh** folder:

Host myEc2Instance
    HostName 52.11.190.176
    Port 22
    User ubuntu
    IdentityFile ~/.ssh/MyKey.pem

Host bitbucket.org
    IdentityFile ~/.ssh/MyKey.pem

Host github.com
    IdentityFile ~/.ssh/MyKey.key

Now, when you want to connect to your EC2Instance, you just type:

ssh myEc2Instance

See also Git page and SSH.
</code></pre><h2 id="sudo">Sudo</h2>
<pre><code>Temporarily become the superuser, or adminstrator. Technically, you can become
any user with this command, but by default, you become superuser.

Example:

    sudo apt-get update

In the example shown here, the command apt-get is run, and passed the argument update. 
To run apt-get you must be superuser, so we run two commands: the sudo command followed
by the command we wish to run. If you are not the superuser, and you try to run apt-get without first running
sudo, you will get an error. Often the error will be about files that you want to access being locked.

In ubuntu and other flavors of Linux, users typically do not become superuser. Instead, they invoke sudo
whenever they want to do something that a superuser would do. This is similar to the UAC (User Account
Control) works in Windows. When you want to install software, or invoke other privilaged commands, 
a dialog pops up to confirm that you want to do this. In some cases, you have to enter a password. The
sudo command in Linux is just a variation on this general theme. Or rather, since sudo was first created
in 1980, before Windows even existed, UAC is a variation on the sudo command.

The sudo command is configured by script found here: /etc/sudoers

Frequently, the users who are allowed to invoke sudo are the members of the adm (administrators)
group.
</code></pre><h2 id="switchdesk">SwitchDesk</h2>
<pre><code>/opt/kde/bin/usekde ccalvert

Use this command to switch the desktop:
  switchdesk  
</code></pre><h2 id="symlink">SymLink</h2>
<pre><code>To createa symbolic link between two directories you can do the following:

  ln /charlie1/docs /home/ccalvert/docs

After you give this command, there will be a &quot;file&quot; in the home/ccalvert 
directory called docs that acts just like the directory /charlie1/docs.
If you are in /home/ccalvert and issue the command cd docs, then you
end up in the /charlie1/docs directory.
</code></pre><h2 id="tarfiles">TarFiles</h2>
<pre><code>Create a tar file:
  tar -cvf FileName.tar FileName.txt

Create a tar zip (tgz) file
  tar -cvfz FileName.tar FileName.txt

Zip up a tar file:
  gzip FileName.tar

Unzip a tar file:
  gzip -d FileName.tar.gz

Untar a file and create directories:
  tar -xvf FileName.tar

Untar and unzip and create directories:
  tar -xvfz FileName.tar
</code></pre><h2 id="versionlinux">VersionLinux</h2>
<pre><code>lsb_release -a

or

uname -a

or

file /sbin/init      
</code></pre><h2 id="wine">Wine</h2>
<pre><code>Use rpm packages to install wine, then get the winesetuptk from:
</code></pre><ul>
<li><a href="http://sourceforge.net/project/showfiles.php?group_id=6241">http://sourceforge.net/project/showfiles.php?group_id=6241</a></li>
<li><a href="http://www.openlinksw.com/mono/index.html">http://www.openlinksw.com/mono/index.html</a></li>
</ul>
<!-- -->
<h2 id="writefilepermission">WriteFilePermission</h2>
<pre><code>Change writes on file so all (other) can write to it:
  chmod o+w MyFile.txt  
</code></pre><h2 id="xlibconnection">XLibConnection</h2>
<pre><code>Get XLib: connection refusted by server
XLib: client is not authorized to connect to server

Do this, when logged in as you:

xhost +strider.inprise.com
</code></pre><h2 id="xroot">X Windows and root</h2>
<pre><code>can&#39;t use X from root

just copy your .Xauthority file from ccalvert to the root directory

The issue is that you started X as ccalvert, so root has no permissions
By copying the file over .Xauthority, you get permissions. You could
also use xauth to set up .Xauthority, but that is a bit tricky.
</code></pre><h2 id="zip">Zip Files or Folder</h2>
<pre><code>Create zip file called myZipFile and put all of contents of MyFolder
into it, including any sub-directories.

zip -r myZipFile MyFolder/*
</code></pre><h2 id="zipdisks">Mounting Zip Disks</h2>
<pre><code>Most distributions, including Red Hat, set everything up for you ahead of 
time. All you need to do is the following: 

modprope ppa

You might also be able to use insmod ppa, but that might not work, and the 
above command is more reliable, as it sets up everything that ppa needs.

Put a disk in the drive. I think you have to have the disk in there or 
this won&#39;t work.

Assuming the directory /mnt/zip already exists, then 
enter:

mount -t vfat /dev/sda4 /mnt/zip 

If this doesn&#39;t work, then you need to rebuild the kernal. This isn&#39;t as 
bad as it seems. The zip drive mini HOWTO will talk you through it.

To make life easier, add this line to fstab:

/dev/sda4  /mnt/zip vfat noauto,owner 0 0

Now you can mount with:

mount /mnt/zip
</code></pre></div></body></html>