---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog272/Week03.md
relativePath: Prog272/Week03.md
title: Week03
queryPath: Prog272/
subject: Prog272
fileNameMarkdown: Week03.md
fileNameHTML: Week03.html
---


<!-- toc -->
<!-- tocstop -->

## Prog 272 Week 03, 2019

Overview
---------

- [Unit Tests Deck](http://bit.ly/1dTjs8h)
- [PhoneGap Cordova](/android-guide/PhoneGap.html)
- [Cordova Setup CheatSheet](/android-guide/PhoneGap.html#the-phonegapcordova-setup-cheat-sheet)
- [VirtualBox and AndroidX86](/android-guide/Androidx86.shtml)
- [Working with Files](http://bit.ly/1jzIpHU)
- Add node_modules, coverage and bower_components to .gitignore
- Getting started with PhoneGap
- [Resources](/teach/prog272/Resources.html)

Downloads
---------

- [Details Cordova downloads](http://localhost:33222/charlie/development/android/PhoneGap.html#setupPhoneGap)

This is the URL you put in Eclipse when adding Aptana:

- <http://download.aptana.com/studio3/plugin/install>

Set your PATH and ENVIRONMENT on Linux
----------------------

This is certainly less than complete, but I do have Linux resources on Elvenware:

- [PATH](/os-guide/linux/LinuxDays/LinuxFAQ.html#path)
- [ENVIRONEMNT](/os-guide/linux/LinuxDays/LinuxFAQ.html#BashProfileBashRC)

And more generally:

- [Linux](/os-guide/linux/index.html)
- [Working with Linux Files](/os-guide/linux/LinuxFiles.html)
- [File Permisions](/os-guide/linux/LinuxFiles.html#fileOverview)

Set up PATH and Environment on Windows
--------------------------------------

- [Cordova Cheat Sheet](/android-guide/PhoneGap.html#the-phonegapcordova-setup-cheat-sheet)
- [Cordova Setup Details](/android-guide/PhoneGap.html#details)
- [Run Cordova Project](/android-guide/PhoneGap.html#runProject)
- [Use SetX](/android-guide/PhoneGap.html#use-setx-to-set-the-environment)

I recognize that these steps are difficult. On the other hand, it
simply is not right for students interested in computers to graduate
from Bellevue College without a good understanding of the
Windows/Linux/Mac Environment variables and PATH statements. Once
the penny finally drops, and you feel as though you understand these
concepts, you should find that you will use them over and over.

Some history is perhaps helpful. For quite some time, it appeared
that Microsoft was simply going to have complete control of our
operating systems. This allowed them to assume that all programs
would be set up by a Windows install, which would configure the PATH
and ENVIRONMENT for you. Over the last three to five years, however,
that plan unraveled, and now most web development, at least, is done
with open source tools. These tools are not designed to be installed
with Windows Install programs. Instead, they are usually put on your
system by Git, NPM or downloaded as a zip file. To get them working
properly, you have to set up the ENVIRONMENT and PATH yourself. Or
at least you have to understand the PATH and ENVIRONMENT so you can
trouble shoot problems. The PATH and ENVIRONMENT variables are
available on all systems, Linux, Windows and Mac.

We need to understand the PATH, and the ENVIRONMENT, to set up the
many tools that we use when creating Web applications based on Open
Source code. And at this point, most web applications are based on
Open Source code. As we start working with tools like Karma, Grunt
and RequireJs, a good understanding of the path will become doubly
important as we struggle to ensure that all our JavaScript source
files can be found by these tools. This usually involves GLOB
patterns, which can only be understood properly if you understand
how your PATH works.

I like the current exercise (setting up your system to run Cordova
create), in part because it really makes you wrestle with your PATH
and ENVIRONMENT variables. Frankly, I want you in there struggling
with these things a bit until you start to really understand how the
system works. I don't want to automate the process for you. I want
you to understand enough so you can master the subject. This mastery
is necessary because the subject keeps coming up, over and over, in
various contexts, as we work with Open Source code that is designed
to run on multiple platforms, each of which require you to set up
your PATH and ENVIRONMENT. Also, these skills make you more
employable. Whether you do open source web development or not,
understanding the PATH and ENVIRONMENT are crucial skills for anyone
charged with setting up software, either as a developer, or an IT
worker.

Setting your path on the MAC
----------------------------

These references for the MAC should be helpful:

- [Set Environment on OSX Lion](http://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion)

Here are some particularly useful sections of the above link:

- <http://stackoverflow.com/a/8841666/253576>
- <http://stackoverflow.com/a/7502128/253576>

## Additional information:

- [Setting up Cordova on the Mac](http://iphonedevlog.wordpress.com/2013/08/16/using-phonegap-3-0-cli-on-mac-osx-10-to-build-ios-and-android-projects/)
- [Set PATH and Environment](http://www.cyberciti.biz/faq/appleosx-bash-unix-change-set-path-environment-variable/)
- [ENVIRONMENT variables](http://apple.stackexchange.com/questions/106778/how-do-i-set-environment-variables-on-os-x)

Working with Buttons, Input Controls and jQuery
-------------------------------

- [Links are in Resources](/teach/prog272/Resources.html#working-with-buttons-input-controls-and-jquery)

RequireJs and Bower
-------------------

- [RequireJs Getting Started](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/RequireJs01)
- [RequireJs and Karma JsObjects](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/Jasmine02)
- [BowerCopy JsObjects Example](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/Jasmine05)

Bower
------

First you need to install [Bower](http://bower.io/):

	npm install -g bower

Now use it to install something:

1. Create bower.json files
2. Run bower install

Here is a bower.json file for installing Jasmine 1.3.1.

```json
	{
	  "name": "Jasmine02",
	  "version": "0.1.0",
	  "homepage": "https://github.com/charliecalvert/JsObjects",
	  "authors": [
			"Charlie CedarIsle Calvert <charlie@example.com>"
	  ],
	  "description": "Jasmine example",
	  "main": "SpecRunner.html",
	  "keywords": [
			"jasmine"
	  ],
	  "license": "MIT",
	  "private": true,
	  "ignore": [
			"**/.*",
			"node_modules",
			"bower_components",
			"test",
			"tests"    
	  ],
	  "dependencies": {
			"jasmine": "~1.3.1"
	  }
	}
```

Links
-----

- <http://www.brucelawson.co.uk/2012/best-of-time/>
- <http://www.webmonkey.com/2012/02/the-html5-time-element-is-back-and-better-than-ever/>
- <http://git-scm.com/book>
