---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/OwnCloud.md
relativePath: elvenware/development/cloud/OwnCloud.md
title: OwnCloud
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: OwnCloud.md
fileNameHTML: OwnCloud.html
---

<!-- toc -->
<!-- tocstop -->

OwnCloud
========

OwnCloud allows you to build a cloud server similar, but not identical
to, DropBox, Google Drive or SkyDrive. You can run it as your own
private cloud.

- <http://doc.owncloud.org/>
- <http://software.opensuse.org/download/package?project=isv:ownCloud:community&package=owncloud>

**NOTE**: *Typing in commands on a Linux server can be trying. Don't 
try to type these commands in. First open up a SSH window, then just 
cut and paste.*

Install
-------

To install OwnCloud, copy and paste these commands into your SSH
window:

	sudo sh -c "echo 'deb http://download.opensuse.org/repositories/isv:/ownCloud:/community/xUbuntu_13.10/ /' >> /etc/apt/sources.list.d/owncloud.list"
	sudo apt-get update
	sudo apt-get install owncloud

The first command is long, and should be placed all on one line. Copy it
in Windows, then right click on the SSH window to paste it into
the Linux command line. 

When wrapped it looks like this: 

	sudo sh -c "echo 
	'deb http://download.opensuse.org/repositories/isv:/ownCloud:/community/xUbuntu_13.10/ /' 
	>> /etc/apt/sources.list.d/owncloud.list"

But don't enter it that way. It needs to be all on line, as shown above.

Now access your instance: 

	http://[IPADDRESS]/owncloud

For instance: 

	http://127.0.0.1/owncloud

But your IP address may be your AWS elastic IP or a machine on your
local network, or perhaps a random address from the Internet.

Once you are looking at OwnCloud running in your browser, you will 
need to create an account and sign in. As the account name, you can 
use your own name, or admin, or some name that you make up.

![Signing In](images/OwnCloud00.png)

Check Admin
-----------

Once you are in OwnCloud you will want to use the menu to navigate 
to **Admin | Admin** and check the status of your running instance.

Below, I explain how to get rid of warnings about https (SSL) and about
your **data** directory. In some cases, you may also encounter a 
warning about WebDav. For now, just ignore the WebDav error. If you
can connect from the Windows or Mac client, then the error is 
probably an artifact, and not a real problem.

Apache SSL
----------

So we need to use https in our URL when we access OwnCloud. How do we
set that up?

- Modssl let's use https
- https://help.ubuntu.com/10.04/serverguide/httpd.html

Here are the three commands you must give to set things up properly
so you can access your site with https:

- sudo a2enmod ssl
- sudo a2ensite default-ssl
- sudo /etc/init.d/apache2 restart

now access your instance: 

	https://[IPADDRESS]/owncloud

For instance: 

	https://127.0.0.1/owncloud
	
Notice that we have changed http to https.

###Move Data Dir

For some odd reason that I don't understand, the current versions
of OwnCloud put your data dir in your web server directory, and then
complain about the fact. Whether this is really a problem I don't
know. However, we can fix the problem.

First we edit the file called config.php. We will open the file in 
the nano editor. Use Ctrl-O to save your file, and control Ctrl-X to 
exit. Everything else is like a normal editor, but there is no 
mouse. Here is the command top open the file in the nano editor:

	sudo nano /var/www/owncloud/config/config.php

We change the contents so the **datadirectory** points to a directory
in your home directory, or some place else that you may feel is more
secure:

	<?php
	$CONFIG = array (
	  'instanceid' => 'oc8dec0ea37a',
	  'passwordsalt' => '3828ac017c32ea27ffe9d59fa0dc66',
	  'datadirectory' => '/home/ubuntu/owncloud/data',
	  'dbtype' => 'sqlite3',
	  'version' => '6.0.0.14',
	  'installed' => true,
	);
	
It is this line that you need to change:

	'datadirectory' => '/home/ubuntu/owncloud/data',

Now we need to move or copy the current Data folder to our new 
location. Do one of the following, propably the first. The first 
option moves the directory, the second copies it. So this first set of 
commands will move your **data** directory to your home directory. This 
gets rid of the warning from owncloud.

	mkdir /home/ubuntu/owncloud
	sudo mv /var/www/owncloud/data/ /home/ubuntu/owncloud/. 

Or, alternatively:

	mkdir /home/ubuntu/owncloud
	sudo cp -r /var/www/owncloud/data/ /home/ubuntu/owncloud/.

Then do this to ensure the permissions are set correctly:

	cd /home/ubuntu/owncloud
	sudo chown -R www-data:www-data data
	sudo chmod 770 data

You may need to edit the above command to use your user name. Here
I'm assuming your user name is ubuntu, that is, I'm assuming you
are on OS2. However, you may be on a different platform, or have
created your own user. So set the user name accordingly: (/home/ubuntu, 
/home/charlie, etc).

###WebDav

We get error's saying that WebDav is not working. There is a problem,
but we will not try to fix it right now. Here is some information that
will be useful to use later in the course.

Access WebDav:

- <https://XX.XX.XXX.XXX/owncloud/remote.php/webdav>

isWebDAVWorking: 


	NO - Reason: [CURL] Error while making request: 
	SSL: certificate subject name 'domU-12-31-39-06-E4-18.compute-1.internal' 
	does not match target host name 'XX.XX.XXX.XXX' (error code: 51) (Sabre_DAV_Exception)

OwnCloud Client
---------------

There is a client for Linux, Mac and Windows. 

- <http://owncloud.org/sync-clients/>

Install the appropriate client. To connect, type in your IP address 
plus owncloud: **https://XX.XX.XX.XX/owncloud**.

Since you created your own SSL certificate, and since it may not 
be correct, you can probably afford to ignore warnings about your
certificate.

![Certificate Bad](images/OwnCloud01.png)

![Running Own Cloud](images/OwnCloud02.png)


