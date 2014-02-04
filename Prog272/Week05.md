Main Goals
----------

-   There is no class on Thursday
-   Review objects
-   Review module pattern
-   Review File System

Get ReadOnly JsObjects
----------------------

	git clone git://github.com/charliecalvert/JsObjects.git

No HelloCordova Accepted
------------------------

Whether you use create or cordova create, be sure to always pass in 
the name of the project you are creating:

	create C:\Temp\MyApp com.goober.myapp MyApp
	
or:

	cordova create C:\Temp\MyApp MyApp
	cd C:\Temp\KewlApp
	cordova platform add ios android
	cordova build

Assuming you have the right tools and right setup, both work, and 
both give you a project with a custom name, rather than a default 
name of **HellowCordova**. I just won't accept projects named 
**HelloCordova**, it puts the onus on me to do something in multiple 
steps that you should have done in one step.

Bottom line: I understand that we are still in the early phases, and 
it is hard to understand everything we need to do. But please don't 
turn in projects called **HelloCordova**. After this, I just won't 
grade any more projects with that name, and please rename any 
existing projects as per the instructions for the assignment.

SSH
---

	sudo apt-get install ssh
	ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa 
	cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

- [Git and SSH Key](http://www.elvenware.com/charlie/development/cloud/Git.html#the-ssh-key)
- [SSH Connections](http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#sshKeys)

Install MongoDb on Linux
---------------

- [Follow these instructions](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
- [Mongo on Elvenware](http://elvenware.com/charlie/development/database/NoSql/MongoDb.html)


Or just put the following in bash script called InstallMongoDb.sh:

	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
	echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
	sudo apt-get update
	sudo apt-get install mongodb-10gen

Start, restart and stop MongoDb:

	sudo service mongodb start
	sudo service mongodb stop
	sudo service mongodb restart
	
	
Install the NPM driver:

	Use npm to install the Node mongodb driver:
	
	sudo npm install mongodb
	
	
	db.getCollection("test_insert").find()


Mocking Objects
---------------

- [$HttpBackEnd and Jasmine](http://www.elvenware.com/charlie/development/web/JavaScript/Angular.html#mocking-objects-with-httpbackend)


In Class 01
-----------

We have three main HTML files that can be run:

- index.html - for Cordova
- Main.html - For standalone
- Test.html - For unit testing

Then we have 1 HTML file with the code used in index.html and Main.html.
We call jQuery load to load that code into Main.html and index.html. 
Thus both programs have the same HTML, but different headers. Thus we
can debug the code without having to worry about 

Code Academy
------------

Bring both HTML and JavaScript to 25%. Let's add in jQuery. Get it to
25% also....

Links
-----

-   <http://www.elvenware.com/charlie/development/web/Mobile/>

-   <http://jquerymobile.com/blog/2013/01/14/announcing-jquery-mobile-1-3-0-beta/#download>

-   <http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html>

-   <http://www.elvenware.com/charlie/development/web/JavaScript/Basics.html#objects>

-   <http://www.elvenware.com/charlie/development/web/JavaScript/Basics.html#compareObjFunc>



Day 2
-----



Topics
------

-   [LogCat][1]

    [1]: <http://www.elvenware.com/charlie/development/android/AndroidLogging.html>

-   Fake jQuery Mobile

-   [jQuery Mobile][2]

    [2]: <http://www.elvenware.com/charlie/development/web/Mobile/>

-   LocalFileSystem

jQuery Attribute Selectors
--------------------------

-   <http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#attrSelectors>

JSHint
------

-   <http://www.elvenware.com/charlie/development/android/Eclipse.shtml#jsHintExternal>

 JQuery Fake Source
-------------------

-   [JQueryFakeMobile02.zip][3][^4]

    [3]: <https://bc.instructure.com/courses/795060/files/23818793/download?wrap=1>

    [^4]: <https://bc.instructure.com/courses/795060/files/23818793/download?wrap=1>
