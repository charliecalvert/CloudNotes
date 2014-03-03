Week 09 Days One and Two
========================


Unit Tests
---------

-   [Unit Testing](http://bit.ly/1dTjs8h)
-   grunt Deploy in JasmineSpy
-   PubSub Always
-   [Git Tagging](http://www.elvenware.com/charlie/development/cloud/Git.html#git-tag)

PubSub
------

In the interest of preserving loose coupling and proper separation of
concerns, we are going to begin using PubSub in all our programs.


AWS
---


-   Automate Setup
-   Running Scripts on Linux
-   Cloud 9
-   Markdown and Pandoc
-   AWS


Git
---

-   More on updates, adds, commits

-   Private Repos on BitBucket

-   <http://www.elvenware.com/charlie/development/cloud/Git.html>

Node
----

-   Setup

-   Express

-   Posting Data

Unit Tests
----------

-   Setting up the HTML

-   Setting up the JavaScript

-   QUnit



Day 02
------

Here are some of the things covered on day 2.

Setting up QUnit
----------------

Here is the new code for the QUnit html file:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	<div id="qunit"> </div>
	<div id="qunit-fixture"> </div>

	<div>
		<ul id="debugList"> </ul>
	</div>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here was the old style QUnit code for your HTML file:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	<div id="qunit-fixture">  
		\\ tests depend on markup that goes here   
	</div>

	<h1 id="qunit-header">Using QUnit</h1>  
	<h2 id="qunit-banner"> </h2>  
	<h2 id="qunit-userAgent"> </h2>  
	<ol id="qunit-tests"> </ol>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Git
---

-   <http://www.elvenware.com/charlie/development/cloud/Git.html>

Example Script
==============

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	ECHO ====== Create SSH Dir ======  
	ECHO ============================  
	ECHO This script expects your server's password as a parameter  
	ECHO ----------------------------  
	ECHO Example:  
	ECHO CreateSshDir.bat MyPassword  
	ECHO ----------------------------  
	ECHO Before you run this script, set ELF_USER and ELF_IP  
	ECHO Your ELF_IP might be your elastic ip if you are using  
	ECHO EC2. You can set ELF_USER and ELF_IP by using  
	ECHO the ENVIRONMENT VARIABLES dialog. Alternatively  
	ECHO you can set them at the command prompt like this:  
	ECHO set ELF_USER=MyUserName  
	ECHO set ELF_IP=MyRemoteIp  
	ECHO For instance:  
	ECHO set ELF_USER=charlie  
	ECHO set ELF_IP=192.168.2.3  
	ECHO ----------------------------  
	ECHO You should also create a file called PublicKey.txt  
	ECHO That contains your public key. This script will  
	ECHO use the file to create an authorized keys  
	ECHO file on the server. The key should be all on one  
	ECHO line and the line should end with a UNIX style LF.  
	ECHO ============================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

![](<https://bc.instructure.com/courses/795060/files/24309741/preview>)


