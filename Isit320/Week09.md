Week09
======

Long Builds in Aptana
---------------------

If you are experiencing long Builds in Aptana, try right clicking on
**node-modules** in the Project window and choosing:

	Build | Exclude from Build

The Project we Built in Class
-----------------------------

- [Can be found here](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularModularKarma)

Working with Bitmaps
--------------------

Animate changes to a sprite when it's state changes. In Crafty 06 you
can find examples of how to do this. The key code is in **Food.js**,
particularly the calls this.sprite:

	visit: function() { 'use strict';
		this.count++;
		switch (this.count) {
			case 1:
				this.sprite(1, 0);
				break;
			case 2:
				this.sprite(2, 0);
				break;

			case 3:
				this.sprite(3, 0);
				break;

			default:
				this.destroy();
				break;
		}

See also **scenes.js**:

	Crafty.sprite(32, assets[0], {
		spr_tree:    [0, 3],
		spr_bush:    [1, 3],
		spr_village: [0, 1],
		spr_food: [0, 0]			
	});

In Class
--------

###Project

There is now an add on (a Ruble) for Aptana that will allow you to 
create Elven Angular Projects and other things. See the ReadMe for
details:

- [Elf Ruble README](https://github.com/charliecalvert/ElfRuble/blob/master/README.md)

I've just started working on this Ruble, so it is still in a nascent 
form, but ulimately it will be a much better way to get you the code
that you need. Please hvae patience while it is being developed.

For more information please follow the instructions found here that describe how to install
Project Templates into Aptana:

- [New Project Templates](http://elvenware.com/charlie/development/web/JavaScript/Angular.html#angular-starter-projects)

Also, see this:

- [Basic Karma](https://github.com/charliecalvert/AngularKarma/blob/master/README.md)
- [Mongo](https://github.com/charliecalvert/AngularMongoBootstrapTest/blob/master/README.md)

###More on Karma

If you have karma running in one command window, you can run a test in another 
command window that will return immediately  by typing:

	karma run

Working Examples:

- [CreateCharacters02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/CharacterCreate02)
- [Crafty06](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/Crafty06)
- [Crafty03](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/Crafty03)

Working with Mongo Data
-----------------------

We need to understand updating and deleting records in the database.

A general review of mongo DB.

Look at PeopleManager in CreateCharactor02

- Mongo is in factory
- People Manager is a factory
- Can be consumed by Controller or Jasmine Test

pkozlowski-opensource on github.

It is interesting to note that this a REST API, so you can simply 
paste URLs into the address bar of your browser, or use them as 
links on web pages:

https://api.mongolab.com/api/1/databases/YOUR_DATABASE/collections/YOUR_COLLECTION?apiKey=YOUR_API_KEY

That's not a solution for a shipping app, but it is a good tool to 
use when you are experimenting with a new technology.

I should add that posting your API key as a link on a public web 
page is a very bad idea, but you can use it on private sites.

The best way to experiement with this technology is just to take the 
URL and paste it into a the address field of the browser.

Mocking Objects with $httpBackend
---------------

Read the README.md file for JsonFromServer:

- [JsonFromServer on GitHub](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/JsonFromServer/README.md)

The example demonstrates how to proceed.

Mocking Mongo Data:

- [MongoLab01](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab01)
- [MongoLab02](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab02)
- [MongoLab03](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoLab03)
- [CreateCharacters02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Games/CharacterCreate02)

See TestMongoTower.js.

NPM
---

Make sure all your global copies of NPM packages are at the latest
version:

	npm update -g 

Online
------

The assignments for this week are:

