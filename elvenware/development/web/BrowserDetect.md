---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/BrowserDetect.md
relativePath: elvenware/development/web/BrowserDetect.md
title: BrowserDetect
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: BrowserDetect.md
fileNameHTML: BrowserDetect.html
image: ./course/course-javascript.jpg
subject: web
queryPath: elvenware/development/web/
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

-   [Strongly Typed](../index.html)
-   [Web & Scripts](index.html)
-   [Cloud](../cloud/index.shtml)

OS and Tools
------------

-   [OS](../../os/index.html)
-   [Database](../database/index.html)
-   [My Writing](../../books/index.html)

Art
---

-   [Poems & Photos](../../Art/index.html)
-   [Book Reviews](../../books/reading/index.html)
-   [Spiritual](../../spirit/index.html)

Links
-----

-   [My Links](../../links.html)
-   [Falafel](http://www.falafel.com/)
-   [Sourceforge](http://sourceforge.net/projects/elvenware/)

![Elvenware](../../images/elvenwarelogo.png)

Media Queries
=============

We often want html to display one way on one device and another way on a
second device. One way to do this by linking in different CSS files
depending on the size of the screen. The following HTML file will use
one CSS file if the screen is less than 1024px, another if it is less
than 2048, and otherwise use no CSS file.

Features
--------

  Name                  Supports Min Max
  --------------------- ------------------
  width                 Yes
  height                Yes
  device-width          Yes
  device-height         Yes
  orientation            
  aspect-ratio          Yes
  device-aspect-ratio   Yes
  color                 Yes
  color-index           Yes
  monochrome            Yes
  resolution            Yes
  scan                   
  grid                   

More details on Media Queries from W3.org: [media
queries](http://www.w3.org/TR/css3-mediaqueries/#media1).

Types of Queries
----------------

-   Screen
-   tty
-   tv
-   proector
-   handheld
-   print
-   braille
-   speech
-   all

Example
-------

Simple example showing a media query in a CSS file:

``` {.code}
@media all and (min-width: 640px) 
{ 
    #media-queries-1 { background-color: #0f0; } 
}    
@media screen and (max-width: 2000px) 
{ 
    #media-queries-2 { background-color: #0f0; } 
}
```

More complex media query in the **head** element of an HTML file,
loading specific CSS files under particular circumstances:

``` {.code}
<!DOCTYPE html>
<html>

<head>
 <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
 <title>Test for small screen</title>

 <link
   media="only screen and (max-device-width: 2048px)"
   rel="stylesheet"
   type="text/css"
   href="redStyle01.css">

 <link
   media="only screen and (max-device-width: 1024px)"
   rel="stylesheet"
   type="text/css" 
   href="greenStyle02.css">

</head>

<body onload="Sam">

 <p>
   If the resolution is less than 1024px the screen
   should be green, else it should be red.
 </p>

</body>
</html>
```

Here are the two css files. The first one is the green file for smaller
screens:

``` {.code}
body { background-color: #00FF00; }
p    { width: 200px; }
```

And here is the red file for larger screens:

``` {.code}
body { background-color: #FF0000; }
p    { width: 1024px; }
```

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
