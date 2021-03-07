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

Setup a WebSite
===============

This document describes how to setup a website on Windows 7 using IIS 7.
We begin with a description of installing IIS, and then describe how to
proceed from there.

Index
-----

-   [Install IIS](#install)
-   [The Internet Information Server Manager](#iismgr)
-   [Setting up a Site](#setup)
-   [Strategy: Proceed Step by Step](#step)
-   I cover setting up the cgi-bin folder for Python scripts on the
    [python\_iis.html](../Python/python_iis.html) page.

Install IIS {#install}
===========

Microsoft provides [a good
explanation](http://learn.iis.net/page.aspx/28/installing-iis-on-windows-vista-and-windows-7/)
of how to set up IIS. However, you can also just follow this simple
steps:

-   **Ctrl Panel | Programs | Turn Windows Features on or Off**
-   Make Sure IIS is installed and Turned On
-   Expand Internet Information Services. Additional categories of IIS
    features are displayed. Select Internet Information Services to
    choose the default features for installation.
-   Expand the additional categories displayed, and select any
    additional features you want to install, such as Web Management
    Tools and particularly the IIS Management Console.

The Internet Information Server Manager {#iismgr}
---------------------------------------

You turn on (install) the **Internet Information Server Manager (IIS
Management Console)** as described in the previous section. Here are two
ways to start the IIS manager once you have it installed:

1.  Type **inetmgr** in the Search Box
2.  Use the Control Panel
    1.  System and Security\\Administrative Tools

Use the IIS Manager to Set up the Site {#setup}
--------------------------------------

Use the Internet Information Server Manager to create a web site. You do
this by right clicking on the **Sites** node in the **Connections** pane
and choosing Add Web Site.

When creating your own site, it is nice to use standard defaults. For
learning purposes (put not for production sites!), you can use the
following defaults:

-   Physcial Path: **c:\\users\\public\\documents\\web\\MySite01**
-   Any one of these Ports**: 8000 or 8888 or 15555**
-   Leave the Host Name blank

![Adding a Web Site in
IIS](../../../images/development/AddWebSite01.png)

Now put a simple HTML file named **index.html** in the directory you
chose, which in this case is **J:\\Web\\MyTestSite01.**

After creating the site and your default document, choose **Browse
\*:XXXX (http)** from the **Actions** pane to view your site. In this
case, it is **http://localhost:8350/**. You might well get an error at
this point. Open Windows Explorer, right click on your directory and
choose **properties.**Make sure that IUSR is listed in the security
page.

![Checking for IUSR in the security
page](../../../images/development/AddWebSiteSecurityIusr.png)

Another potential source of trouble involves setting up a hole in your
Firewall as explained
[here](https://docs.google.com/present/view?id=d4jzqjs_34gfgc24df)
somewhere around slide ten. The relevant slide shows how to let
something through a Windows firewall by taking the following steps:

-   Control Panel | System and Security | Windows Firewall
-   Advanced Settings
-   In Windows Firewall with Advanced Security Dialog
-   Inbound Rules, set up connections
    -   New Rule | Port
    -   Choose Next
    -   You can specify multiple port numbers, separated by commas: ie
        8000, 8300
    -   Next, and choose Allow the connection
    -   Next, you probably want only private for testing, but consider
        turning them all on.
    -   Give name and description, choose finish

If everything is working, copy the url, which will be something like
**http://localhost:8350** and paste it into Expression web by selectiong
the following from the Expression Web Menu: **Site | Settings |
Preview.**Paste it into the edit control labeled "Preview using custom
URL for this website:"

![Setting up the preview capability in Expression
Web](../../../images/development/AddWebSiteSettingsInEw.png)

Now when you press F12 you should be able to get to your site, and view
it correctly.

Step By Step {#step}
------------

Sometimes it is best to go through a step by step setup process. I'm
assuming that you are using IIS, but the process is similar for Apache.

1.  First Make sure you can browse to <http://localhost> and see the
    classic IIS Welcome screen or a document that you have replaced it
    with
2.  Then, if you have created another local site, make sure you can
    browse to a simple document on your local web site using LocalHost
    plus a port number in your URL: <http://localhost:8000>, where the
    port number can differ
3.  Then make sure you can browse to the same document using your IP
    address: [http://192.168.0.101:8000](http://192.168.0.101:8000),
    where the IP address and port number may vary. Or, if you are not
    using a port number, then just browse to
    [http://192.168.0.101](http://192.168.0.101), where the IP number
    may vary, but where you should see the classic IIS welcome screen or
    some document you have put in its place
4.  Then make sure you can browse to this location from your Android
    phone, from Android X86 running in a VM, from Linux or some other
    box running in a VM, or from some other source other than your
    current OS. If this fails, but the other things work, then you
    probably have a firewall issue.
5.  Next, try to set up a cgi-bin folder, and put one of the simple
    scripts from the Python/SampleScripts folder of our [Mercurial
    Repository](../../cloud/Mercurial.html) in it, and make sure you can
    run that script. There are [many notes](../Python/index.html) on
    debugging problems with that process on Elvenware.
6.  Now trying setting up and running PythonAddingMachine from the
    HtmlCssJavaScript folder in the repository. It should be working in
    your web site.
7.  Finally, try to run PythonAddingDatabase, which involves setting up
    MySQL.

If you have all of the above running smoothly, then it should be
relatively easy to move on to creating your own PhoneGap and HTML 5
programs that run against the database.

My key point here is to start with the simplest case, and move to
increasingly complex cases. One (among many) of the advantages of this
strategy is that you can tell me exactly where things went wrong for
you. I got through Step 5, but then when I tried to... Etc.

### Web Platform Installer

-   A [free](http://www.microsoft.com/web/downloads/platform.aspx) way
    to keep IIS up to date
    -   Installs latest IIS
    -   Logging Tools

-   Other
    -   Install Visual Web Developer Express
    -   Install WordPress, Umbraco, DotNetNuke
    -   Install SQL Server Express and Tools
    -   PHP for Windows

 

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
