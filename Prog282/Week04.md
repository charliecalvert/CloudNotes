---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week04.md
relativePath: Prog282/Week04.md
title: Week04
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week04.md
fileNameHTML: Week04.html
---


<!-- toc -->
<!-- tocstop -->

Week04
======

This week our Main Topics, in no particular order, will be:

- [Patterns Deck](http://bit.ly/1frmrZV)
- [JavaScript Deck](http://bit.ly/OPDg3s)
- [Homework: BridgePattern][BridgePattern]
- Ajax and reading JSON
- Karma and Karam-Jasmine
    - [KarmaJasmine on Elvenware][Karma]
- AmDefine - use same require syntax in Node and a Browser
    - [AmDefine GitHub Home](https://github.com/jrburke/amdefine)
    - [RequireJs on AmDefine][AmDefine]
    - Factories
- More on Queues and Callbacks
- JavaScript Syntax: properties
- Unit tests: handling exceptions
- Agile Manifesto

[AmDefine]: http://requirejs.org/docs/node.html#2
[BridgePattern]: http://www.elvenware.com/charlie/books/CloudNotes/Assignments/BridgePattern.html
[FactoryInterface]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactoryInterface
[Karma]: http://www.elvenware.com/charlie/development/web/UnitTests/Jasmine.html

We use AmDefine so that we can use the same syntax for RequireJs in the browser and in **node-jasmine**.

##Fix Karma

Thanks to work by Chelsa and Michael, we found the problem with our Karma install. In class, I asked you to type:

    sudo npm install -g karma
    
That was wrong. It should have been:

    sudo npm install -g karma-cli
    
Unfortunately, I then asked you to issue this command:

    sudo ln -s /usr/lib/node_modules/karma/bin/karma /usr/bin/karma

That worked, but it attached us to the wrong version of karma. If you issued that command, it is now blocking the proper install of karma-cli. So we need to delete it:

    sudo rm /usr/bin/karma
    
That will remove the link to the bad version of karam. After doing that, you should be able to type:

    sudo npm install -g karma-cli
    
Then you should have karma properly installed, and should be able to type the following from our BridgeSailor directory to start karma:

    ./RunKarma.sh 
    
[That file][RunKarma] first sets up an environment variable that points at chromium-browser:

    export CHROME_BIN=/usr/bin/chromium-browser
    
Then it starts Karma:

    karma start
    
On Windows, and on some Linux machines, you will just be able to type **karma start**, but on most of our machines we have to explicitly tell Karam where the chromium-browser is located.

[RunKarma]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/BridgeSailor/RunKarma.sh

##Key Programs

Some of these programs are still evolving, but they should all have something for you.

- [Bridge Sailor][BridgeSailor]
- [Decorate Sailor][DecorateSailor]
- [FactorySimple][FactorySimple]
- [FactoryInterface][FactoryInterface]
- [Singleton][Singleton]

## Reading and Writing Json and Text

The key reference is multiple sections on Elvenware, starting here:

- [Ajax on Elvenware][Ajax]
- [Ajax on jQuery site](https://api.jquery.com/category/ajax/)
- [Json Basics](http://www.elvenware.com/charlie/development/web/JavaScript/JsonBasics.html)


Here are some programs to peruse. There are other programs in the NodeCode folder with obvious relevance.

- [JsonRead][JsonRead]
- [SimpleReadWrite][SimpleReadWrite]
- [SimpleReadWriteJson][SimpleReadWriteJson]

[Ajax]: http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#jqueryLoad
[BridgeSailor]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/BridgeSailor
[DecorateSailor]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/DecorateSailor
[FactorySimple]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactorySimple01
[FactoryInterface]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactoryInterface
[JsonRead]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/jsonRead
[SimpleReadWrite]: (https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/SimpleReadWriteJson)
[SimpleReadWriteJson]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/SimpleReadWriteJson02
[Singleton]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/Singleton



## Error Loading Eclipse/Aptana

If you get this error: ** unable to load the Chromium browser. Please check the documentation for details on possible workarounds/fixes**. Try this:

    sudo apt-get install libwebkitgtk-1.0-0

The GitIgnore File and NodeModules
----------------------------------

Please try to ensure that you do not check in your node_modules 
directory to git. You can do this by placing a .gitignore file
at the root of your repository with the following single line of code
in it:

	node_modules
	
Any files or directories listed in your .gitignore file will be ignored
by git. 

If you have already checked the node_modules directory for one or
more of your projects into git you can remove them from the repository
without deleting them from your hard drive with the following line
of code:

	git rm --cached -r node_modules
	
If you then do a push, the files will be removed from the remote 
copy of your repository. For instance, they will be removed from the 
copy of your repository that is hosted in BitBucket or GitHub.



References
----------

- [Amazon Web Servers - AWS](http://www.elvenware.com/charlie/development/cloud/WebServices.html)
- [Node and Express](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html)
- [jQuery and HandleBars](http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#jqHandlebars)

Also see the eight demos found in this directory:

- JsObjects/JavaScript/HandlebarDemos

