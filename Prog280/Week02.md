Week02
======

We will focus on two different subjects:

-   Review cloud applications
-   Explore Virtual Machines
3.  [Privacy](http://bit.ly/1ak3jVM)

In Class
--------

###OpenStack

- <http://uksysadmin.wordpress.com/2011/02/17/running-openstack-under-virtualbox-a-complete-guide/>


 To run, check, connect and terminate an instance
      euca-run-instances $emi -k openstack -t m1.tiny
      euca-describe-instances
      ssh -i cloud/creds/openstack.pem root@ipaddress
      euca-terminate-instances instanceid

###Juju Install

- <https://juju.ubuntu.com/install/>

sudo add-apt-repository ppa:juju/stable
sudo apt-get update && sudo apt-get install juju-core
juju generate-config

###OwnCloud

- <http://doc.owncloud.org/>
- <http://software.opensuse.org/download/package?project=isv:ownCloud:community&package=owncloud>

Typing in commands on a Linux server can be tryuing. Don't try to 
type these commands in. First open up a SSH window, then just cut 
and paste.

To install OwnCloud:

sudo sh -c "echo 'deb http://download.opensuse.org/repositories/isv:/ownCloud:/community/xUbuntu_13.10/ /' >> /etc/apt/sources.list.d/owncloud.list"
sudo apt-get update
sudo apt-get install owncloud

now access your instance: http://[IPADDRESS]/owncloud

For instance: http://127.0.0.1/owncloud

But your IP address is probably your AWS elastic IP.

###Apache SSL

- Modssl let's use https
- https://help.ubuntu.com/10.04/serverguide/httpd.html

Here are the three commands you must give to set things up properly
so you can access your site with https:

- sudo a2enmod ssl
- sudo a2ensite default-ssl
- sudo /etc/init.d/apache2 restart

now access your instance: http://[IPADDRESS]/owncloud

For instance: https://127.0.0.1/owncloud

###Move Data Dir

sudo nano /var/www/owncloud/config/config.php

<?php
$CONFIG = array (
  'instanceid' => 'oc8dec0ea37a',
  'passwordsalt' => '3828ac017c32ea27ffe9d59fa0dc66',
  'datadirectory' => '/home/ubuntu/owncloud/data',
  'dbtype' => 'sqlite3',
  'version' => '6.0.0.14',
  'installed' => true,
);

Do one of these, propably the first. It will move your data 
directory to your home directory. This gets rid of warning from
owncloud.

sudo mv /var/www/owncloud/data/ /home/ubuntu/owncloud/. 

Or, alternatively:

sudo cp -r /var/www/owncloud/data/ /home/ubuntu/owncloud/.

Then do this:

sudo chown -R www-data:www-data data
sudo chmod 770 data


This is probably best, but use your user name (ubuntu, charlie, etc):

###WebDav

Access WebDav

- <https://XX.XX.XXX.XXX/owncloud/remote.php/webdav>

isWebDAVWorking: NO - Reason: [CURL] Error while making request: 
SSL: certificate subject name 'domU-12-31-39-06-E4-18.compute-1.internal' 
does not match target host name 'XX.XX.XXX.XXX' (error code: 51) (Sabre_DAV_Exception)

### Cloud Applications

-   [Google Drive](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#googleDocs)
-   [SkyDrive](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#microsoftSkyDrive)
-   [Evernote](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#evernote)
-   [Google Sites](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#googleSites)
-   DropBox
-   Github

### Virtual Machines

The references for using VirtualBox are in the individual assignments.

-   VirtualBox
-   Windows on VirtualBox
-   Linux on VirtualBox
-   SSH

### WebServers

Installing IIS is usually very simple. If you want to run CGI applications
(Python) then also see the third link listed here. Otherwise, the first two
should tell you all you need to know.

-   <http://www.elvenware.com/charlie/development/web/Server/SetupAWebSite.html#install>
-   WebServers: <http://bit.ly/Q9A4Ne>
-   <http://www.elvenware.com/charlie/development/web/Python/python_iis.html>

Online
------

