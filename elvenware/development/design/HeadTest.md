---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design/HeadTest.md
relativePath: elvenware/development/design/HeadTest.md
title: HeadTest
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: HeadTest.md
fileNameHTML: HeadTest.html
image: ./course/course-javascript.jpg
subject: design
queryPath: elvenware/development/design/
---

<!-- toc -->
<!-- tocstop -->

<link href="../libs/css/charlie01.css" rel="STYLESHEET" type="TEXT/CSS">

## Overview

Some thoughts on TDD.

## A Riff on the Craft of Test Driven Development

It is best to writ tests first, before you write code.

I find it helpful to write code not for use in my application, but so they can be easily tested. When I can run my classes through their tests, then I think of them as being done. The act of actually using them in an application can begin to seem almost secondary.

The process, then, looks like this:

1.  I build the class one step at a time.
2.  As I take each step, I test the class to prove that it works.
3.  When I'm done, I take a few moments to integrate the tested class into my app, almost as if that were an after thought.

It seems, even to me, like a kind of topsy-turvy way of looking at development. The focus is on writing tests, not on writing the application.

I suppose the problem with this view is that it sounds so abstract. One could easily criticize such a technique by saying: "You've lost your focus. You're off building tests, when you should be writing apps." And perhaps that is a fair criticism. On the other hand, maybe test driven development encourages good design in a way that application development does not and cannot. So maybe it is better to have the focus on the tests rather than on the application.

There is something unquestionably intriguing about those times when the test becomes the focus of development. Energy flows freely when designing classes and writing tests becomes more challenging and intriguing than the application itself. Maybe that is what lies at the core of the hoary old test driven development cliche: "Developers like to write tests." We like to write them because they are frequently more interesting than our applications.

There is something satisfying about the craft of writing a suite of tests. Or, more precisely, programmers enjoy designing classes that they can be easily tested. That is where the craftsmanship resides.
