Week04
======

This week our Main Topics, in no particular order, will be:

- AmDefine - use same require syntax in Node and a Browser
    - [AmDefine GitHub Home](https://github.com/jrburke/amdefine)
    - [RequireJs on AmDefine][AmDefine]
    - Factories
- Run the [FactoryInterface program][FactoryInterface]
- More on Queues and Callbacks
- JavaScript Syntax: properties
- Unit tests: handling exceptions
- Agile Manifesto

[AmDefine]: http://requirejs.org/docs/node.html#2
[FactoryInterface]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactoryInterface

We use AmDefine so that we can use the same syntax for RequireJs in the browser and in Node.


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

