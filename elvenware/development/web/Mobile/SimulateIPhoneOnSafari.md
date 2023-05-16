---
layout: page
date: 2023-05-13 01:51:14 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Mobile/SimulateIPhoneOnSafari.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Mobile
fileName: SimulateIPhoneOnSafari.md
relativePath: /web/Mobile/SimulateIPhoneOnSafari.md
title: SimulateIPhoneOnSafari
directoryName: Mobile
category: Mobile-guide
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

Simulate iPhone on Safari
-------------------------

-   Launch Safari
-   Choose Gear | Preferences where Gear is Setup
-   Turn to the Advanced Page
-   Turn on **Show Develop Menu in Menubar**
-   Press Alt to access menu
-   From menu: **Develop | User Agent** and choose iOs

Some JavaScript to resize the browser when working in Safari:

    // On Safari, this will resize the Browser to IPhone dimensions
    function resizeToIPhone()
    {
        window.scrollTo(0,0);
        window.resizeTo(320,480);
    }
            
            

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
