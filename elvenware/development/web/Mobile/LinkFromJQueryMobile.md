---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Mobile/LinkFromJQueryMobile.md
relativePath: elvenware/development/web/Mobile/LinkFromJQueryMobile.md
title: LinkFromJQueryMobile
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
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

Linking from JQuery Mobile
--------------------------

I like JQuery Mobile, but I have had problems with losing control over
my CSS when I link from a JQuery Mobile page to a regular page. When I
reach the regular page, my CSS does not render correctly and JavaScript
is sometimes disabled.

Here is how I fixed the problem. This is not an official solution, but
it worked for me. I created a custom JavaScript method that gets called
on an onclick rather than using a regular href:

~~~~ {.code}
function clean(url){  location.href = url;}
~~~~

So we call this method from our anchor:

~~~~ {.code}
<p>Back to <a onclick="clean('index.html')">Main Site</a></p>
~~~~

On site clean() takes us to index.html.

 

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
