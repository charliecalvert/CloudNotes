Overview
--------

This week we are going to learn a little about the Linux shell and possibly some
other topics. There will be two quizzes. You should first read or review the
text found in documents linked on this page, and then take the quizzes.

Linux

-   The Deck: <http://bit.ly/PDuWUB>

-   The Linux File Basics video: <http://youtu.be/pHIRpHDn7WQ>[^1]

    [^1]: <http://youtu.be/pHIRpHDn7WQ>

Linux Pages
-----------

-   <http://www.elvenware.com/charlie/os/linux/LinuxFiles.html>

-   <http://www.elvenware.com/charlie/os/linux/LinuxDays/LinuxFAQ.html>  
    

The Quizzes
-----------

-   [Linux Shell File Basics][2]

    [2]: <https://bc.instructure.com/courses/793364/quizzes/776149>

-   [Linux File Permissions][3]

    [3]: <https://bc.instructure.com/courses/793364/quizzes/776271>


Other
-----

###Juju Install

- <https://juju.ubuntu.com/install/>

	sudo add-apt-repository ppa:juju/stable
	sudo apt-get update && sudo apt-get install juju-core
	juju generate-config
	
On AWS:

- Go to Security Credentials.
- export AWS_ACCESS_KEY_ID=[YOUR ACCESS KEY]
- export AWS_SECRET_ACCESS_KEY=[YOUR SECRET ACCESS KEY]

Then run **juju bootstrap** at the command line. If it works, it
just returns with no error messages and no success message. 

Now you can deploy something to your instance:

- juju deploy wordpress
- juju deploy mysql
- juju add-relation wordpress mysql
- juju expose wordpress
- juju status

Juju instances are very expensive. When you are done: 

- juju destroy-environment

### Secondary Goals

-   Learn more about Linux
-   Learn more about MediaWiki and Wordpress

### Reminder

-   There will be no class Wednesday, Jan 30.
-   Instead, there will be an online video and a regular weekly assignment


WordPress

-   <http://www.elvenware.com/charlie/development/cloud/Wordpress.html>
-   <https://help.ubuntu.com/community/WordPress>

MediaWiki
---------

-   <http://www.elvenware.com/charlie/development/cloud/MediaWiki.html>
-   <https://help.ubuntu.com/community/MediaWiki>
-   <http://www.mediawiki.org/wiki/Manual:Running_MediaWiki_on_Ubuntu>

More Links
----------

-   MediaWiki Edit: <http://www.elvenware.com/charlie/development/cloud/MediaWiki.html#basicEditing>
-   WordPress Edit: <http://www.elvenware.com/charlie/development/cloud/Wordpress.html#edit>
