Week 07
=======

In Class
--------

- [The Deck](http://bit.ly/172VnGB)

###Grunt

- [Grunt on Elvenware](http://elvenware.com/charlie/development/web/UnitTests/Grunt.html)

###Unit Test Examples

You might also be interested in the tests for Crafty03. 

- [Mock Example](/charlie/development/web/JavaScript/Angular.html#basicMock)

###JSON from Server

Retrieve JSON from a server:

- [JSON Example](/charlie/development/web/JavaScript/Angular.html#jsonFromServer)

- [Example](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/JsonFromServer)
- [Key File](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/JsonFromServer/index.js)

###Characters

- Hitpoints: How much damage can a character take before losing consciousness
- Damage: How much damage does a character weild

Online
------

###Assignment 03

Use this function to extend the range of the string class:

```
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
```

###Assignment Midterm

Your assignment must:

- Get some data from MongoDb
- Some data from JSON file
- You should have at least some of your own graphics
- And the encounter should allow:
	- The character to rest (briefly, till he feels better!)
	- The village to sleep (just for awhile)
	- Grunt

I've updated [JsObjects/JavaScript/Games/CharacterCreate01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/CharacterCreate01). It now contains
a button, and when you click it, there is a mock encounter between 
a Hero and a Tower. The point of the demo is to show how you can 
create similar simulations outside the context of the game. 


