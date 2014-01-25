Week03
======

- [Unit Tests Deck](http://bit.ly/1dTjs8h)
- [PhoneGap Cordova](http://www.elvenware.com/charlie/development/android/PhoneGap.html)
- [Cordova Setup CheatSheet](http://www.elvenware.com/charlie/development/android/PhoneGap.html#the-phonegapcordova-setup-cheat-sheet)
- [VirtualBox and AndroidX86](http://www.elvenware.com/charlie/development/android/Androidx86.shtml)
- [Working with Files](http://bit.ly/1jzIpHU)
- Add node_modules, coverage and bower_components to .gitignore
- Getting started with PhoneGap

Downloads
---------

- [Details Cordova downloads](http://localhost:33222/charlie/development/android/PhoneGap.html#setupPhoneGap)

This is the URL you put in Eclipse when adding Aptana:

- <http://download.aptana.com/studio3/plugin/install>

Set your PATH and ENVIRONMENT on Linux
----------------------

This is certainly less than complete, but I do have Linux resources on Elvenware:

- [PATH](http://elvenware.com/charlie/os/linux/LinuxDays/LinuxFAQ.html#path)
- [ENVIRONEMNT](http://elvenware.com/charlie/os/linux/LinuxDays/LinuxFAQ.html#BashProfileBashRC)

And more generally:

- [Linux](http://elvenware.com/charlie/os/linux/index.html)
- [Working with Linux Files](http://elvenware.com/charlie/os/linux/LinuxFiles.html)
- [File Permisions](http://elvenware.com/charlie/os/linux/LinuxFiles.html#fileOverview)

Setting your path on the MAC
----------------------------

These references for the MAC should be helpful:

- [Set Environment on OSX Lion](http://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion)

Here are some particularly useful sections of the above link:

- <http://stackoverflow.com/a/8841666/253576>
- <http://stackoverflow.com/a/7502128/253576>

Additional information:

- [Set PATH and Environment](http://www.cyberciti.biz/faq/appleosx-bash-unix-change-set-path-environment-variable/)
- [ENVIRONMENT variables](http://apple.stackexchange.com/questions/106778/how-do-i-set-environment-variables-on-os-x)

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

```
	{
	  "name": "Jasmine02",
	  "version": "0.1.0",
	  "homepage": "https://github.com/charliecalvert/JsObjects",
	  "authors": [
		"Charlie CedarIsle Calvert <charlie@elvenware.com>"
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

-   <http://www.brucelawson.co.uk/2012/best-of-time/>
-   <http://www.webmonkey.com/2012/02/the-html5-time-element-is-back-and-better-than-ever/>
-   <http://git-scm.com/book>
