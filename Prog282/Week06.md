---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week06.md
relativePath: Prog282/Week06.md
title: Week06
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week06.md
fileNameHTML: Week06.html
---


<!-- toc -->
<!-- tocstop -->

Week06-Overview
---------------

- Talk about the Obama Bridge Analogy
- Working with baseURL in require.config (See BridgeReader in writing...)

I'll pass out the midterm this week. You will get it on Wednesday, and
it will be due Sunday night. It will be open book, but will probably
be fairly time consuming, so you might begin planning for that contingency.
One thing is certain, if you start it on Sunday evening, you probably
won't do very well.

Major Topics
------------

* Interactions between HTML, CSS, and JavaScript
* Sharing Data between Objects
* Working with Properties
* Unit test and Agile Programming
* Object Inheritance and Agile principle of Object Design.
* Working with XML

Properties
----------

- enumerable: Can it be enumerated?
- writable: Can its value be changed
- configurable: Can it be deleted, can its type be changed?
 
Important Sample Code
---------------------

- JsObjects/HtmlCssJavaScript/SwitchCanvas
- JsObjects/HtmlCssJavaScript/SwitchHtml
- JsObjects/JavaScript/Objects/Ineritance01
- JsObjects/JavaScript/Objects/Ineritance03
- JsObjects/JavaScript/Objects/Ineritance04
- JsObjects/JavaScript/Objects/ObjectThis
- JsObjects/JavaScript/Objects/StaticPrivateData
- JsObjects/JavaScript/Objects/ShareVariable01
- JsObjects/JavaScript/Objects/ShareVariable02
- JsObjects/JavaScript/NodeCode/PresidentsJson
- Prog282-Hints/CanvasGrid0?

SSH
---

- <http://www.elvenware.com/charlie/os/linux/LinuxDays/LinuxFAQ.html#sshAgent>
- <http://www.elvenware.com/charlie/development/cloud/Git.html#the-ssh-key>

HTML5
-----

- <http://www.unrealengine.com/html5/>

Unit Tests
----------

- <http://www.elvenware.com/charlie/development/web/UnitTests/index.html>

This is entirely optional, but some of you may want to run tests from the
command line, and in particular, may want to test your node code. 

You can use a tool called [Mocha](http://visionmedia.github.io/mocha/) to 
run tests with node. This enables us to run tests from the command line 
without using qunit and a browser. It is not that Mocha is better or worse 
than qUnit, it is simply an alternative to qUnit.

	npm install -g mocha
	
The above command installs mocha in a globally available folder. Now you don't
have to worry about running npm install mocha each time you use it. When using
some libraries global npm installs are not a good idea, and in some cases it
is optional. But with Mocha, you should use the -g (global) install option.

Now create a directory called test:

	mkdir test
	
Inside that directory, create a file called **test.js** with the following,
hello world style, code:

```
var assert = require("assert");
 
describe("Test01", function() {
	it ("Is 3 equal to 3",  function() {
		assert.equal(3, 3);
	});
});
```

To run the test, just type **mocha** from inside the test folder.
	
- <http://visionmedia.github.io/mocha/>

Check File Endings in Linux
---------------------------

In JsObjects/Python/PythonUtils there is a file called:

	crlf.py
	
Put it in your home/ubuntu/bin directory. If that directory does not exist,
create it:

	mkdir ~/bin

Copy crlf.py into it. The command might look something like this:

	cp ~/Git/JsObjects/Python/PythonUtils/crlf.py ~/bin/.
	
Give it executable permissions:

	chmod +x ~/bin/crlf.py

Then check your .project file and make sure it ends with this text:

	# set PATH so it includes user's private bin if it exists
	if [ -d "$HOME/bin" ] ; then
		PATH="$HOME/bin:$PATH"
	fi

If it does not have that text in it, then use nano to put it there:

	nano ~/.profile
	
Save your work. Reboot your system. Now the bin directory will be on your path.

Find one of the files you suspect might not have the right line endings. Run
crlf.py against it:

	crlf.py MyFile.js

