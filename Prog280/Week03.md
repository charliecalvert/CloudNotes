Installing Lamp and MediaWiki
-----------------------------

### Virtual Machines

See the virtual box decks linked near the top of this document.

- [Elvenware Linux and VBox](http://www.elvenware.com/charlie/os/linux/VirtualBox.html)
- [Elvenware Virtualization](http://www.elvenware.com/charlie/development/cloud/virtualization.html)
- [Elvenware AndroidX86 and VBox](http://www.elvenware.com/charlie/development/android/Androidx86.shtml)
- [Install Latest NodeJS](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node)
- [VBox HowTos](https://www.virtualbox.org/wiki/User_HOWTOS)

The simplest way to get Lubuntu on VirtualBox is to download a prebuilt
machine.

- [Download Lubuntu Image](http://virtualboximages.com/Lubuntu+VirtualBox+Virtual+Appliances)

I prefer the site listed above, but this one is also interesting:

- [Lubuntu Alternate](http://virtualboxes.org/images/lubuntu/)

The references for using VirtualBox are in the individual assignments.

-   VirtualBox
-   Windows on VirtualBox
-   Linux on VirtualBox
-   SSH


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

Lamp
----

Lamp is the primary platform of the web. It is an acronym for: Linux - Apache -
MySQL - Python/Php/Perl. Both WordPress and MediaWiki depend on LAMP.

To install, from the Linux prompt, follow these instructions:

-   <http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux>

WordPress

-   <http://www.elvenware.com/charlie/development/cloud/Wordpress.html>

-   <https://help.ubuntu.com/community/WordPress>

MediaWiki
---------

-   <http://www.elvenware.com/charlie/development/cloud/MediaWiki.html>

-   <https://help.ubuntu.com/community/MediaWiki>

-   <http://www.mediawiki.org/wiki/Manual:Running_MediaWiki_on_Ubuntu>

Understanding Linux
-------------------

please open the assignment and respond to the discussion for that assignment
from inside that assignment. It makes it easier for me to see which comments
belong to which assignment.

Links
-----

-   Linux Deck: <http://bit.ly/PDuWUB>

-   VirtualBox Notes: <http://bit.ly/Rs4YQ6>
