---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server/IisSecurity.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server
fileName: IisSecurity.md
relativePath: /web/Server/IisSecurity.md
title: IisSecurity
directoryName: Server
category: Server-guide
---

Toggle Menu

Charlie Calvert on Elvenware
============================

Writing Code and Prose on Computers
-----------------------------------

Menu
----

Core Code
---------

-   [Strongly Typed](../../index.html)
-   [Web & Scripts](../index.html)
-   [Cloud](../../cloud/index.shtml)

OS and Tools
------------

-   [OS](../../../os/index.html)
-   [Database](../../database/index.html)
-   [My Writing](../../../books/index.html)

Art
---

-   [Poems & Photos](../../../Art/index.html)
-   [Book Reviews](../../../books/reading/index.html)
-   [Spiritual](../../../spirit/index.html)

Links
-----

-   [My Links](../../../links.html)
-   [Falafel](http://www.falafel.com/)
-   [Sourceforge](http://sourceforge.net/projects/elvenware/)

![Elvenware](../../../images/elvenwarelogo.png)

IIS Security
------------

IIS security is complex and confusing. Since the market share of IIS is
currently around 15%, and Apache has a 64% share, I suggest that you use
Linux and Apache to serve up your web site. If you have a reason to
continue using IIS despite these warnings, I have tried to gather a few
notes here which make the task a bit easier.

-   [ACL](#acl)
-   [Identities and Users](#ident)
-   [Read and Write Rights in C:/InetPub/wwwroot](#rightRoot)
-   [Create a Web Site](#createSite)
-   [Downloads and Permissions](#downloads)

ACL
---

An ACL is an Access Control List. It represents the permissions on
objects in the server such as pages, files and folders. A single
definition is called an access control entry, or ACE.

We can set the ACL with the Windows Explorer by right clicking, choosing
**Properties** | **Security.**The basic properties you can set are to

-   Read or Write files or folders
-   List the contents of a folder
-   Execute a program, which is not necessarily the same thing as
    running a script.
-   Script/Execute: This is for Python, PHP or ASPX.
-   Full Control: All of the above.

Note that the files and folders inside a folder usually inherit the
rights of that folder.

Identities and Users {#ident}
--------------------

There are various different users, or *identities*. You can use ACL to
grant or deny permissions to these users.

-   IIS\_IUSRS: This is a big tent identity, which wraps all the
    individual Worker Process Identities.
-   IUSR/Anonymous: If you are using Anonymous authentication, then you
    run as IUSR.
-   Authenticated User
-   Application Pool Identity
-   Worker Process Identity

It is important to understand that User Accounts, found on the User
Accounts and Family Safety page of the Control, are merely a subset of
all accounts on a Windows machine. In particular, there are set of Group
Accounts. 

Rights in c:/inetpub/wwwroot {#rightRoot}
----------------------------

By default, you have no rights to c:\\inetput\\wwwroot. You can change
this by opening a command prompt with administrator privileges and
issuing the following command, which changes the access control list
permissions for c:\\inetpub and all its folders and subdirectories:

~~~~ {.code}
icacls %systemdrive%\inetpub /grant %userdomain%\%username%:(OI)(CI)(F) /grant %userdomain%\%username%:F 
~~~~

Here is my understanding of F, OI and CI:

-   OI: Object inherit - This folder and files. (no inheritance to
    subfolders)
-   CI: Container inherit - This folder and subfolders.
-   F: Full Control

If you are unclear as to what is the systemdrive or userdomain, you can
view them from the command prompt:

~~~~ {.code}
echo %systemdrive%
C:
~~~~

Is it safe to give the long **icacls** command shown above to change
permission on the wwwroot directory? If you have a laptop or desktop
machine which is running behind a firewall in your home or workplace,
then the answer is probably yes. If you are on a production server, then
the answer is probably no. If you are on a shared machine running behind
a firewall, then the answer is probably yes, but if someone else has
similar permissions then they might change or delete your files. If you
don't understand a word of what you are reading in this section, then
the answer is certainly no.

An alternative to this whole mess is to use the IIS manager to create a
web site on your machine that runs at some particular port. (If you want
to switch to Apache, you will find that there are also some permission
issues to overcome there. However, I find the Apache rules for
permissions much more sensible, much more consistent, and much easier to
understand than the rules in Windows.)

Create a Web Site {#createSite}
-----------------

When you install IIS, there is a default web site created at
c:\\inetpub\\wwwroot, where C:\\ is your System Drive. By default, you
have no easy means of reading and writing files to that location, as
described above. Frequently, however, the biggest problem with wwwroot
is that you must share it with other users of your computer, or else you
want to use it as the default web site for all visitors to your machine.
This is fine in some cases, but frequently we want to create custom
sites in which we can run tests, experiments, and temporary web sites.

To create a site:

-   Open up the Internet Information Services Manager (InetMgr)
-   Right click on the Sites node in the Connections pane.
-   Choose Add Website
-   Give the site a name, ie :MySite
-   Define the path to the site, ie: c:/users/public documents/MySite
-   Give it a port number, ie: 20123
-   Click Ok

Now you have to give yourself permission to run files out of the site.

-   Open up the windows explorer
-   Navigate to your site: c:/users/public documents/MySite
-   Right click on the MySite filder and choose the Security tab
-   Click Edit and then Add
-   Type in IUSR, and click Check Names to make sure you typed it in
    correctly. If a dialog popped up, something is wrong. If IUSR is
    underlined, then you are good.
-   Click Ok until Microsoft lets you out of the jail.

Now create a test file called index.html and put in your MySite folder.

    <html>
    <body>
    <p>Hello</p>
    </body>
    </html>

Click the **Browse \*:20123 (http)** link on the right site of the IIS
Manager to browse to your web site at <http://localhost:20123>.

If it doesn't work, you either missed a step above, or you should
uninstall and then reinstall IIS. To try to trouble shoot problems with
IIS is well beyond the skill of mere mortals. I personally suspect there
are two people at Microsoft who can troubleshoot broken IIS deployments,
and perhaps 5, extremely wealthy, consultants. You can either give one
of the consultants your life savings, or reinstall IIS: your choice.

To [create your first user web site in
Apache](http://www.elvenware.com/charlie/development/web/Server/Apache.html#configureApache)
is probably of equal difficulty to the process shown above. However, I
find trouble shooting problems in Apache much simpler than trouble
shooting most problems in IIS. Also, I find adding additional user
directories is much easier in Apache, or in some cases, no additional
work at all.

If you want to add a CGI directory for serving up Python files, you can
find out how in the [Python
section](http://www.elvenware.com/charlie/development/web/Python/python_iis.html#cgiAndPython). 

Downloads and Permissions {#downloads}
-------------------------

When using INetMgr it is fairly obvious what you need to give users
permissions to read access files. The thing that is confusing is that
the permissions on individual folders or files might also have to be set
at the OS level. You need to right click on the folder or file, choose
properties and turn to the security page. There will you need to add
IUSR, and possibly as IIS\_IUSRS. It is best to add only IUSR, as
IIS\_IUSRS is more permissive.

It is possible, though rare, that a particular file will not be able to
be downloaded because of its encryption or permissions or some such
thing. Try to do something simple, like download a text file from a
directory first. If that works, and you cannot download some other type
of file, such as epub or mobi file, and both files have the same
permissions, then this is a mysterious issue. The best course of action
is to zip up the mobi and epub files and then you will be able to
download them.

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
