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

You want to be sure that your copy of Linux has SSH installed. Here is the command to install SSH:

	sudo apt-get install ssh

Here are two commands that create a pulic and private key for your Linux box, and save them in your .ssh folder:

	ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
	cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

- [Git and SSH Key](/git-guide#the-ssh-key)
- [SSH Connections](/cloud-guide/SshFtpsPutty.html#sshKeys)

Install MongoDb on Linux
---------------

- [Details](/database-guide/NoSql/MongoDb.html#install)

Passing Parameters
------------------

One tip I should share with everyone: You can pass in parameters to click functions.

- [Details](/javascript-guide/JQueryBasic.html#clickParam)

Mocking Objects
---------------

- [HttpBackEnd and Jasmine](/javascript-guide/Angular.html#mocking-objects-with-httpbackend)


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

-   [Mobile Guide](/mobile-guide/)
-   </javascript-guide/JavaScriptModules.html>
-   </javascript-guide/JavaScriptBasics.html#objects>
-   </javascript-guide/JavaScriptBasics.html#compareObjFunc>

Day 2
-----

Topics
------

-   [LogCat](/android-guide/AndroidLogging.html)
-   Fake jQuery Mobile
-   [jQuery Mobile](/mobile-guide/)
-   LocalFileSystem

jQuery Attribute Selectors
--------------------------

-   </javascript-guide/JQueryBasic.html#attrSelectors>

JSHint
------

-   </android-guide/Eclipse.shtml#jsHintExternal>

JQuery Fake Source
-------------------

-   [JQueryFakeMobile02.zip](https://bc.instructure.com/courses/795060/files/23818793/download?wrap=1)
-   [More](https://bc.instructure.com/courses/795060/files/23818793/download?wrap=1)
