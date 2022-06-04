---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog272/Week04.md
relativePath: Prog272/Week04.md
title: Week04
queryPath: Prog272/
subject: Prog272
fileNameMarkdown: Week04.md
fileNameHTML: Week04.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Prog 272 Week 04, 2019

## Core Subjects

Our main goals this week is to:

- Learn more about JavaScript Objects and Functions.
- Introduce jQuery
- Finish the setup issues

-   [Homework Review](/javascript-guide/JavaScriptBasics.html)
-   [JSHint and Grunt](http://jshint.com/)
-   [Grunt on Elvenware](/unit-tests-guide/Grunt.html)
-   [Karma](/javascript-guide/Angular.html#using-karma)
-   [Coverage](/javascript-guide/Angular.html#coverage)
-   Cordova File System
-   [JavaScript Modules](/javascript-guide/JavaScriptModules.html)
-   [Ajax and jQuery Load](/javascript-guide/JQueryBasic.html#jqueryLoad)
-   [jQuery getJSON](/javascript-guide/JQueryBasic.html#getJSON)
-   [JSON](/javascript-guide/JsonBasics.html)

jQuery
------

-   [jQuery](/javascript-guide/JQueryBasic.html)
-   [jQuery Attribute Selectors](/javascript-guide/JQueryBasic.html#attrSelectors)
-   [jQuery Button](/javascript-guide/JQueryBasic.html#jquery-button-and-paragraph-demo)


There are several assignments, including:

- A quiz on Git
- A Code Academy exercise
- [A programming exercise using jQuery](../Assignments/InfoManager01.html)

Look in the modules section of Canvas to find links to these
assignments.


Get the right ViewPort statement
--------------------------------

You might want to replace the ViewPort statement created by default by
Cordova with this statement:

	<meta name="viewport" content="width=device-width, initial-scale=1.0">

See this Elvenware entry:

- [ViewPort Basics](/css-guide/MediaQueries.html#viewportBasics)

Always Include Last Name in Project Names
-----------------------------------------

I often fail to make this clear, but can you always call any project
your turn in XXX-LastName. For instance: MilesObject-Calvert. Thank
you.

In fact, it usually helps if you include the Week in the project name
as well:

	Week03-MilesObject-Calvert

This name ends up in the Eclipse/Aptana file called **.project**. Cordova
projects use some Java code, so in them, you must use an underbar
rather than a dash.

Using Putty and Git
-------------------

If you are using SSH with Git, you want to make sure that Git can
find the Putty program called **plink**. To do that, be sure that
the environment variables GIT_SSH is set to

```code
C:\Program Files (x86)\PuTTY\plink.exe
```

[More details are here](/git-guide)

From the windows command line, that would look like:

```code
SetX GIT_SSH C:\Program Files (x86)\PuTTY\plink.exe
```

There is an updated **SanityCheck.bat** file that includes a check
for **GIT_SSH**.

## VirtualBox Kernal Driver Error

If you get an error trying to start your VM, try this solution:

Navigate to:

```code
C:\Program Files\Oracle\VirtualBox\drivers\USB\filter
```

Find the **VBoxUSBMon.inf** and right click on it. Select **Install**.

Navigate to:

```code
C:\Program Files\Oracle\VirtualBox\drivers\vboxdrv
```

Find VBoxDrv.inf and right click on it. Select install.

This fixed the problem for me.

## Format Code

Don't forget to format your code in Eclipse/Aptana. Right click on  
a JavaScript file and choose Source | Format. The shortcut is
**Ctrl-Shift-F**.

Other
-----


-   please open the assignment and respond to the discussion for that assignment
    from inside that assignment. It makes it easier for me to see which comments
    belong to which assignment.
-   How to expose white space and line endings in NotePad++
-   Understanding "trailing white space"
-   How to automate the formatting of a document in Eclipse and NotePad++. (Use
    Tidy plugin in NotePad)
-   The HTML Header and Foot tags, etc.
-   W3C Validator

HTML Suggestions
----------------

If JsHint complains that you are mixing up places where you put tabs
and places where you put spaces. Open up your HTML in notepad++.
Turn on View | Show Symbol | Show Write Space. Look at your \<LI\>
elements, you will see that you use different characters for your
indentation. It probably looks fine on your system, but on mine,
where tabs have a different value than on your system, it is not
pretty.

### Karma

Configure:

- karma.conf.js

Start Karma:

	karma start

If you have karma running in one command window, you can run a test in another
command window that will return immediately  by typing:

	karma run

Working Examples:

- [CreateCharacters02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/CharacterCreate02)
- [Crafty06](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/Crafty06)
- [Crafty03](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/Crafty03)

In HTML Files
-------------

Be sure to specify the charset:

```
<meta content="en-us" http-equiv="Content-Language">
```

Instead of writing the above in the head element, Write this:

```
<body lang="en-us">
```

We have not focused on this, but you should specify the content type and char
set in the header:

```
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
```

Even better is the following:

```
<meta charset="utf-8" />
```

Homework

-   Use strict
-   Semicolons after statements
-   Semicolons after constructors
-   Indenting and formatting
-   The Equals Operator
-   JavaScript Modules

Links
-----

-   </javascript-guide/JavaScriptBasics.html>
-   </android-guide/Androidx86.shtml>

Tips
----

_"Go into Hyper V. Go into the Virtual Switch Manager. Create a virtual switch
called 'Windows Phone Emulator Internal Switch'. Make it's connection type
Internal. Now launch the emulator. It should work."_

* Test if HAXM is installed :

```
sc query intelhaxm
```
