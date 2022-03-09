---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/pydev.md
relativePath: elvenware/development/web/Python/pydev.md
title: Pydev
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
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

PyDev
=====

[PyDev](http://pydev.org/index.html) is an Eclipse add on for Python
Developers. You can install it "side by side" with Java and Android in
the same workspace. This means you can switch back and forth between
Android development and Python development without closing the IDE.

Choose **Help | Install New Software** from the Eclipse IDE. Click the
**Add** button. Enter a name, such as Python, and then paste in the
appropriate URL. The URL to use to add the PyDev extensions to Eclipse
is:

~~~~ {.code}
http://pydev.org/updates
~~~~

After entering the URL in the Eclipse dialog, click the OK button, and
then the rest of the install should be relatively intuitive. To read
more about the install, go the [PyDev install
site](http://pydev.org/manual_101_install.html) and scroll down a screen
or two.

During or after the PyDev install, you will be asked to configure the
system, as shown in Figure 01. The wizard should walk you through the
process automatically, but if you need to get back to the dialog later,
choose **Window | Prefernces | PyDev | Interpreter - Python** from the
Eclipse menu.

[![Python Configuration in
PyDev](../../../images/development/Python01Small.png)](../../../images/development/Python01.png)

**Figure 01: Python Configuration in PyDev, click to enlarge.**

Create a New Python Project in Eclipse
--------------------------------------

Assuming you have PyDev installed, the first thing you want to do is
create a new Python Project.

-   Start Eclipse
-   Switch to the Python Perspective (**Windows | Open Perspective |
    Other | PyDev**)
-   **File | New | Python Project (Alt-Shift-N)**
-   Enter a Project Name and take all the Defaults.
-   Select Finish
-   Open your Project in the **PyDev Package Explorer**oon the left of
    the IDE
-   Right click and choose **New | PyDev Module**
-   Set the **name** to **main**and click **Finish**
-   Enter some code such as **print "hello from Python"**
-   Select your file in the **PyDev Package Explorer** and press the
    green Run button at the top of the IDE. (Python Run)
-   View your output in the Console

It might help to watch the 3 minute video of how do create a new Python
project in Eclipse:

-   [http://youtu.be/y7heIEHSNBY](http://youtu.be/y7heIEHSNBY)

A good way to get started with PyDev is to watch the video on the main
screen of the [PyDev site](http://pydev.org/index.html).

 

 

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
