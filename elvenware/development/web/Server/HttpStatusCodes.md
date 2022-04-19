---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server/HttpStatusCodes.md
relativePath: elvenware/development/web/Server/HttpStatusCodes.md
title: HttpStatusCodes
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: HttpStatusCodes.md
fileNameHTML: HttpStatusCodes.html
image: ./course/course-javascript.jpg
subject: Server
queryPath: elvenware/development/web/Server/
---

<!-- toc -->
<!-- tocstop -->

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

Http Status Codes
=================

  ----- -----------------------
  200   OK
  201   Created
  202   Accepted
  204   No Content
  301   Moved Permanently
  302   Moved Temporarily
  304   Not Modified
  400   Bad Request
  401   Unauthorized
  403   Forbidden
  404   Not Found
  500   Internal Server Error
  501   Not Implemented
  502   Bad Gateway
  503   Service Unavailable
  ----- -----------------------

### Index

-   [Errno 13](#errno13)
-   [401.3](#4013)
-   [404.2](#4042)
-   [500.19](#50019)
-   [502.2](#5022)

Errors
------

Other errors occur frequently. As you try the various solutions listed
here, consider restarting your server after making a change. To be extra
sure, click on the top node in the Connections panel, the one that lists
your server, not one that lists a site. Choose Restart.

### The 401.3 Error {#4013}

-   make sure you have IUSR as one of the users for your directory.
-   Edit Permissions | Security | Edit. Then add IUSR

### The Dreaded File Permissions Error: Errno 13 {#errno13}

The directory where you put your scripts needs to support the
"authenticated user" identity. This means you need to write click on the
directory, select properties, turn the Security page, and add
"Authenticated Users" as one of the "Group or user names." This user
should have modify and write permissions." This should be given to the
directory automatically, but if it is not, then you should add it. I did
this, and my Errno 13, message about not having write permissions went
away.

It is perhaps worth adding that I got this error on folders that I
downloaded from a third party (one of my students), and pasted into an
existing web site. This meant I was not the one who created the
directory. It was created on a student's machine; he zipped up the
folders, sent his archive to me, and I unzipped it into an existing
site.

A key point to grasp here is that if you give users anonymous access to
your web site, then they run as one of the "Authenticated Users."

~~~~ {.code}
  Traceback (most recent call last): // CODE OMITTED HERE
 IOError: [Errno 13] Permission denied: 'SomeFile.data'
~~~~

Note that Errno 2 can also be related to this problem. Sometimes the
reason a file does not exist is because the script that should have
created it did not have the right permissions.

What else can go Wrong: 404.2? {#4042}
------------------------------

One dark and rainy night, I got a 404.2 error on my Windows Server. The
error message I got in the browser was actually very informative, but I
had trouble decipering it: "The page you are requesting cannot be served
because of the ISAPI and CGI Restriction list settings on the Web
server."

The fix was quite simple:

1.  Bring up the IIS Manager
2.  Switch to Features View, and go to the server node. The is often the
    one that has the same name as your server. Other than the Start
    Page, it is the top node in the tree.
3.  Find the ISAPI and CGI Restrictions App. This only appears on this
    top node. You won't find it on the other nodes.
4.  Make sure that the application you want to run is listed and that
    the restriction is set to Allowed.

In my case, the problem was simply that I was pointing to the wrong copy
of Python. I had installed it twice on my system. In my Handler Mapping
I pointed at one copy of Python.exe, and in this setting I was pointing
at the other copy. The moment I brought them into sync, things started
working for me.

[![CGI
Restricitons](/charlie/images/development/CgiRestrictionsSmall.png)](/charlie/images/development/CgiRestrictions.png)

### Internal Server Error: 500.19 {#50019}

This error frequently points at a Web.Config that does not have the
appropriate permissions. I fix it by right clicking on the web.config
file in the Windows Explorer. Select properties. If the file is blocked,
choose unblock. Turn to the security page. Select Edit and Add
iis\_iusrs. Make sure to check the name. Sometimes you might also have a
section in the web.config file that is not valid without adding more
permissions. Try removing sections from the file.

 

![Five Zero Zero Nineteen](../../../images/development/FiveNineteen.png)

See also [this page](http://support.microsoft.com/kb/942055) on causes
of 500.19 errors and [this
one](http://learn.iis.net/page.aspx/145/how-to-use-locking-in-iis-configuration/)
on locking sections. Sometimes maybe [this
page](http://www.bloggingdeveloper.com/post/HTTP-Error-50019-Internal-Server-Error-While-creating-IIS-70-web-site-on-Windows-Vista.aspx).

502.2 Errors {#5022}
------------

These can result from creating malformed HTML or XML. Try running simple
scripts that you know are right and see if they work. Try running your
Python script from the command line, and then taking the output and
running it through the XML validator:

[http://validator.w3.org/\#validate\_by\_input](http://validator.w3.org/#validate_by_input)

If you get a 502.2 error with 0x0000000 error id, then you may have left
off the %s %s bit when setting up the Script Handler for Python. See
this page for details:

[http://www.elvenware.com/charlie/development/web/Python/python\_iis.html](/charlie/development/web/Python/python_iis.html)

 

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
