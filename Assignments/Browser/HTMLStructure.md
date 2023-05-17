---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser/HTMLStructure.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Browser
fileName: HTMLStructure.md
relativePath: /Browser/HTMLStructure.md
title: HTMLStructure
directoryName: Browser
category : browser-guide
---

HTML 5: Structure
by Charlie Calvert
Bellevue College

HTML5
New elements (tags)
article, header, footer, section
command, detail, summary, nav
They define the structure of an HTML document.
HTML5 has new features including the ability to:
Work offline
Display video
Draw on an HTML Canvas: Animation
Drag and drop


body
Nav
section
article
aside
h1, h2, h3, h4, h5, h6
header
footer
address
hgroup
Structure

Put your content in the <body> tag.
There is only one <body> tag in each HTML document.
It is the second element in an <html> element.

Body

<html>
<body>
</body>
<html>

Put your navigation links in a <nav> element.
Usually a
Table of Content (TOC), 
index 
menu
Nav
<nav>
  <ul>
    <li>qux</li>
    <li>baz</li>
    <li>xyzzy</li>
  </ul>
</nav>

If it doesn't fit elsewhere, consider using a <section>
Often has a heading.

Section
<section>
  <h1>Bar</h1>
  <p>Ack.</p>
</section>
In HTML5 is it okay to put one h1 per section rather than per page?
Yes
No
Just because they say it that doesn't mean it's true.
Unless its MDN! 



Time

The tag has three parts:
The name <time
A machine readable part
Examples
<time datetime="2013"> A year
<time datetime="2013-02"> Year, month
<time datetime="2013-02-01"> Year, month, day.
<time datetime="2013-02-01 9:00"> Year, month, day, time.

Time

Don't use <i> tag, use <cite> instead.
An <i> tag just means italic
A <cite> tag will usually be rendered in italic, but it means citation
Use HTML markup to give content meaning
	

What Goes in an HTML File
