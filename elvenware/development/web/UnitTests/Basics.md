---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests/Basics.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests
fileName: Basics.md
relativePath: /web/UnitTests/Basics.md
title: Basics
directoryName: UnitTests
category: UnitTests-guide
---

## Overview

Here is another way to think about this issue that may make some lights go on. Or perhaps not.

As developers, we always want to narrow the scope of our problem domain. In simple terms, if we can go from "there is something wrong with my computer" to "there is something wrong this USB port", then we have a better chance of solving a problem or finding a workaround. Then we build up our program one class at a time out of our well-tested components.

With Unit testing, the word Unit means that we want to narrow the scope of our test to a single Unit, rather than to an entire program. So what is a Unit? I believe that Unit testing first emerged on Java or perhaps some other language, and there Unit might have had a specific meaning. For us, it usually means a single class or module, where a module is usually a synonym for a file.

The goal is to narrow our focus. We want to build our program up out of classes and modules that are thoroughly tested. We want to stamp our class with the word "Tested" or "Confirmed" or "Passed Inspection". Trying to do that for the whole program is difficult, but we can create small, well-tested Components/Classes that we believe are at least reasonable reliable.

This is why Enzyme has the shallow method. It says: "I'll set things up so that you can test just the output from this one class. If that class depends on another class, then I'll send you the output only for the one class you want to test and will suppress or ignore the output for other classes that your class may depend on.

In our case, Address has a Child class called AddressShow. Therefore, if we use shallow on Address, we will see the output produced by the render method in Address, but not the output from its AddressShow child class.

AddressShow has no Children, and produces lots of good output for us to test. But it cannot, by itself, handle button clicks. Our button clicks only work when we combine Address and AddressShow. Therefore, when we want to test button clicks in these classes, we have to use both classes, and that means that shallow won't work for us. So we switch to mount so that we can test the output from Address and its child AddressShow when a button is clicked.

In short, we are asking Enzyme to loosen the strict unit testing policy that forces us to be good testers and test only one class at a time. We do this because it is the only way to test button clicks in our case.

We could also write a shallow test for Address alone, but it would be a pretty boring test suite since Address's render method does nothing but ask AddressShow to render itself.

## Links

- <https://martinfowler.com/bliki/UnitTest.html>
- <https://martinfowler.com/bliki/TestDrivenDevelopment.html>
- <http://softwaretestingfundamentals.com/unit-testing/>
- <http://www.jamesshore.com/Agile-Book/test_driven_development.html>

Using QUnit {#qunit-header}
===========

 {#qunit-banner}

 {#qunit-userAgent}
