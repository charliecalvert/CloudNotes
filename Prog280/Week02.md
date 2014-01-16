Week02
======

We will focus on two different subjects:

- AWS and OwnCloud
- [Today's Deck](http://bit.ly/Rzi2Da)
- [Virtual Box Part 01](http://bit.ly/1at2JZ2)
- [Virtual Box Part 02](http://bit.ly/1at3L77)
- [Privacy](http://bit.ly/1ak3jVM)
- [CloudNotes TOC](../CloudNotes.html)

In Class
--------

###AWS

- [AWS on Elvenware](http://www.elvenware.com/charlie/development/cloud/WebServices.html#aws)
- [AWS](http://aws.amazon.com/)

###OwnCloud

- [OwnCloud on Elvenware](http://www.elvenware.com/charlie/development/cloud/OwnCloud.html)

### Cloud Applications

-   [Google Drive](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#googleDocs)
-   [SkyDrive](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#microsoftSkyDrive)
-   [Evernote](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#evernote)
-   [Google Sites](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#googleSites)
-   DropBox
-   Github

###OpenStack

- <http://uksysadmin.wordpress.com/2011/02/17/running-openstack-under-virtualbox-a-complete-guide/>


 To run, check, connect and terminate an instance
      euca-run-instances $emi -k openstack -t m1.tiny
      euca-describe-instances
      ssh -i cloud/creds/openstack.pem root@ipaddress
      euca-terminate-instances instanceid

### WebServers

Installing IIS is usually very simple. If you want to run CGI applications
(Python) then also see the third link listed here. Otherwise, the first two
should tell you all you need to know.

-   <http://www.elvenware.com/charlie/development/web/Server/SetupAWebSite.html#install>
-   WebServers: <http://bit.ly/Q9A4Ne>
-   <http://www.elvenware.com/charlie/development/web/Python/python_iis.html>

Online
------

