Week 02 ISIT 320
================

Here is a list of some of the key resources you can use this week. We
start off with a link to the CloudNotes Resources page, then links
to our decks for this week, and finally a set of links that I think
are of general interest in light of the material we are covering.

- [CloudNotes Resources](Resources.html)
- [Day 03 Deck](http://bit.ly/16QLx9F)
- [Day 04 Deck](http://bit.ly/173isZx)
- [JavaScript on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/index.html#javascript-and-jquery)
- [Objects on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html)
- [Functions on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptFunctions.html)
- [The Module Pattern](http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html)
- [JSON Basics](http://www.elvenware.com/charlie/development/web/JavaScript/JsonBasics.html)

GIT Notes
---------

Learning or reviewing GIT is one of the big topics this week. Your 
primary resources is the Elvenware GIT page, but Kurt has also put 
together some nice tips.

- [Elvenware Git](/charlie/development/cloud/Git.html)
- [Git Tips from Kurt](GitTipsFromKurt.html)

If you are trying to use GIT, and get an error like "The server's 
host key is not cached in the registry", then see this page:

- <http://www.elvenware.com/charlie/development/cloud/Git.html#host-key-is-not-cached>

Ways to Create Objects
----------------------

Look at Object Demo 03. 
Extend a function with a prototype:

~~~~
var MyFunction03 = function() {
    'use strict';       
};

MyFunction03.prototype.field01 = 2;
MyFunction03.prototype.field02 = 4;
MyFunction03.prototype.nestedFunction = function() {
    'use strict';    
    return this.field01 + this.field02;    
};
~~~~

Node and NPM
------------

- [Node on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html)

Perhaps some of you noticed that I could not run **jshint** from the 
command line in class on Wednesday, Sept 28. It turned out that the 
problem was that my copy of JsHint from NPM was out of date. Here is 
what I did to fix it:

	npm update -g
	
That command updates all the globally installed copies of your NPM
libraries. If you don't yet have JsHint installed for use on the 
command line, then issue the following command:

	npm install -g jshint
	
Jasmine
-------

This is the unit testing framework we will use with AngularJs

- Home page: http://pivotal.github.io/jasmine/
- Install: npm install -g jasmine-node
- git clone https://github.com/pivotal/jasmine.git

Karma
-----

Karma is a wrapper around unit testing frameworks. It helps automate
the way we run our tests. It is commonly used with AngularJs. It 
once had a name so absurd that I refuse to repeat it here. The name 
change is fairly recent, so you may find references to the old name 
here and there.

To install Karma:

	npm install -g karma

Test from command line to see if it is installed:

~~~~
>karma --version
Karma version: 0.10.2
~~~~
