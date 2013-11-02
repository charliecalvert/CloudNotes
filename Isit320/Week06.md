Week06
======

InClass
-------

###Ignore Proprietary Attributes

 Preferences > Aptana Studio > Validation 
 
 

Online
------

###Assignment 01

- Your own graphics
- Create somekind of Player model with health, name
- Create some kind of Village model with health, name
- Modify the encounter so that the player can lose health
- If you need more details than you can possible handle:
	- BasicFantasy.org


###Assignment 02

Use this function to extend the range of the string class:

```
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
```
