Week 02 ISIT 320
================


Ways to Create Objects
----------------------

Look at Object Demo 03. 
Extend a function with a prtotype:

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

