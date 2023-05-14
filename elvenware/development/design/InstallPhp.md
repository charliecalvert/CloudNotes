---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design/InstallPhp.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design
fileName: InstallPhp.md
relativePath: /design/InstallPhp.md
title: InstallPhp
directoryName: design
category : cssguide-guide
---

## Installing PHP on Windows

Download [PHP](http://windows.php.net/download/). On the [FAQ](http://www.php.net/FAQ.php) page click [Installation](http://www.php.net/manual/en/faq.installation.php) and go to the [Installation and Configuration](http://www.php.net/manual/en/install.php) page and from there to the [Manual Installation](http://www.php.net/manual/en/install.windows.manual.php) page. They explain that you should unzip your download file into a directory, typically off your root: [j:\php](file:///j:/php). Copy **php.ini-production** to **php.ini** and open it in an editor. There are a set of required directives that you need to configure. Just go through them patiently, one at a time. It is not so bad.

Next, go through the [steps to get PHP working in IIS](http://www.php.net/manual/en/install.windows.iis7.php).
