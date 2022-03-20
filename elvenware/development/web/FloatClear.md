---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/FloatClear.md
relativePath: elvenware/development/web/FloatClear.md
title: FloatClear
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: FloatClear.md
fileNameHTML: FloatClear.html
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

Float and Clear
===============

Float and clear have been around for some time, and are quite standard
on most browsers. We will, however, use them in an HTML 5 file in this
example.

Suppose the body of your HTML file looks like this:

\<div id="container"\>\
\<header\>Header\</header\>\
 \<nav\>Navigation\</nav\>\
\<article\>\<p\>Article\</p\>\</article\>\
 \<footer\>Footer\</footer\>\
\</div\>\

Your goal is to make the nav line up on the left, and the article to be
in the center, much the way they are in this page.

Here is some fairly minimum CSS that accomplishes the goal. Note that I
have given each section a bright color, so you can easily see its size
and shape. The most important parts of this file are the two float
commands, that cause the nav and article to line up on the same row.
Note that there is a call to clear:both to remove the floats on both the
left and right side of the footer. It says: don't try to float this
element, regardless of what I did with the previous element.

    #container
    {
        margin:auto;    
        width:500px;
    }

    header 
    {
        background-color: red;  
        font-size:xx-large;
    }

    nav 
    {
        background-color: green;
        float:left; 
        width:25%;
    }

    article
    {
        background-color: blue;
        float: left;
        width:75%;
    }

    footer
    {
        background-color:darkorchid;
        clear:both;
    }

 

 

Copyright © [Charlie Calvert](../../index.html) | [Elvenware
Home](../../index.html) | [Writing Code](../index.html) |
[Delphi](../delphi/index.html) | [CSharp](../csharp/index.html) | [My
Books](../../books/index.html)
