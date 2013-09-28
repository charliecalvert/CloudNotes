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

