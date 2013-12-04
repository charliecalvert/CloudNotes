Week 11
=======

The major topics this week:

- Using S3
- Understand the final
- [CloudNotes TOC](../CloudNotes.html)
- [Cyber Monday at O'Reilly](http://post.oreilly.com/rd/9z1z5fm7aqv91e77us75f9jb0soou06g2lo88ibj99g)
- [SeaSpin Meeting Tuesday](http://seaspin.org/)

Notes on Karma
--------------
 
- [Week02](Week02.html)
- [Week09](Week09.html)

###Coverage

Code coverage let's you know what code in your program is not covered
by unit tests.

First install Istanbul:

	npm install -g istanbul
	
For Crafty06, I've already added it to package.json, so just rerun
npm install. However, of other projects:

	npm install karma-coverage --save-dev

Then you need to modify three parts of **karma.conf.js**:

- preprocessors
- reporters
- plugins

In the preprocessors section of **karma.conf.js**:

```
 preprocessors: {
      'Source/**/*.js': ['commonjs', 'coverage'],
      'test/client/*.js': ['commonjs']
    },
```

Add or your reports:

	reporters: ['progress', 'coverage'],

And in your plugins at the bottom of karam.conf.js:

```
plugins: [      
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-junit-reporter',
      'karma-commonjs'
    ]
```

The results end up in a folder called **coverage** in a series of 
HTML files. Open the files in your browser.

![Coverage of Simpler Controller](../Images/Coverage01.png)

Final
-----


Things you must have in the final:

- At least three levels
- Predefined sprite positions for each level
- At least 75 separate unit tests 
- Testing coverage at 90 percent for at least three files of 100 lines or more.
- Testing at 65 percent or better for all JavaScript files
- Module refactoring for Characters.js or your equivelent
- Each level has a difference predefined set of sprites:

	- Village/Tower Sprites (Encounter Sprites)
	- FoodBonus Sprites (Bonus Sprites)
	- HealthBonus Sprites (Bonus Sprites)
	- StrengthBonus Sprites (Bonus Sprites)
	- Wall/Bush Sprites (Blocking Sprites)

- You must load the predefined sprites from a JSON file
or database. Typically, you would at least need to include
the X, Y coordinates of the sprite in the file or database
document/record.

###Sprites

You should have three different types of sprites on your board.

A sprite is a visual element on the Crafty board. For 
instance a Village/Tower is a sprite, as are the Food
icons. 

The main character interacts with sprites in one of three
ways:

- A bush or tree sprite acts like a wall. It is solid and can't
be passed.
- A Village/Tower sprite is "encountered" and some kind of 
competition occurs
- A Food Sprite is a Bonus it causes the main character to
gain or lose health, or some other property.

I realize, of course, that in some people's games sprites are not
called Villages or Towers, and they are not called Food. This
is not important. What matters is that you have sprites that perform
each of these tasks:

- Blocking
- Encounters
- Bonus points

Exactly what the sprites are called is unimportant, so long as they
play one of the roles outlined above.

###Unit Tests

You code should have:

- At least 75 individual tests in at least 5 different files
- Karma support for running the tests
- Grunt support for confirming that all your files pass JsHint tests
	- Turn on strict

Here is code from the Crafty06 **karma.conf.js** showing how to link in
the files in your project that you want to test and exclude from 
testing:

```
files: [   
	'Library/angular.js',
	'Library/angular-mocks.js',
	'Library/Crafty.js',
	'Source/**/*.js',
	'Tests/*.js'
],

// list of files to exclude
exclude: [
	'Source/JasmineStart.js'
],
```

The following line, for instance, links in all the JavaScript files
in your **Source** directory and its subdirectories:

	Source/**/*.js

This line links in all the JavaScript files in your Tests directory:

	Tests/*.js

Note the difference:

- The first includes the **Source** directory and its subdirectories
- The second include only the files in the **Tests** directory.

The following line excludes the JasmineStart.js file, even though it
is in the Source directory, which we included above:

	exclude: [
      'Source/JasmineStart.js'
    ],

We don't want to link in JasmineStart, as Karma has similar code built 
into it.

###Grunt Support

You should be able to run JsHint from Grunt across all the JavaScript
files in your project. 

- JsHint should come back with a clean report.
- Strict should be turned on

- [Grunt on Elvenware](http://elvenware.com/charlie/development/web/UnitTests/Grunt.html)

###Modules and Refactoring

I would like to do one last refactoring exercise that will include
the creation of multiple modules. Although I like Angular, the main
point is not to learn the Angular syntax, but to understand that 
it is possible to divide your code up into modules.

Take the Character.js file from Crafty06, or some similar file from
your game, and divide it up into multiple modules. Write tests for
each module. Here, for instance, are the modules that I created in
my own version of the game:

![Character Modules](../Images/CraftyDirs01.png)

- [Full size](../Images/CraftyDirs01.png)

Notice that currently the **Characters.js** file has multiple
sections in it called **Races**, **Classes**, **Hero** and **Tower**.
I want you to refactor this code so that it is divided out into
at least four separate files in a folder called Characters:

- Races.js
- Classes.js
- Hero.js
- Tower.js

Each file should have one Angular module and one Factory. There 
should be at least four corresponding Test files: 

- TestRaces.js
- TestClasses.js
- TestHero.js
- TestTower.js

One of the tests you write might look like this:

```
beforeEach(function() {
	module('raceMod');
});

beforeEach(inject(function($injector) {
	raceList = $injector.get('races');
}));

it("can find halflings", function() {
	var singleRace = raceList[1];
	expect(singleRace.name).toEqual('Halflings');
	expect(singleRace.description.length).toEqual(88);
	expect(singleRace.hitDie).toEqual(6);
	expect(singleRace.languages[0]).toEqual('Common');
	expect(singleRace.classes[0]).toEqual('Cleric');
});
```

You should, of course, write similar tests for each **race**. In a 
separate file, you should write tests for each **class**.

###Predefined Levels

One relatively simple way to create predefined levels is to create
a set of 2 dimensional arrays, one for each level. Here for example
is an array defining the sprites for level 1, and part of level 2:

```
Crafty.scene('Game', function() { 'use strict';

	this.boards = [

		// Level 1
		[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 4, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
		
		// Level 2
		[[1, etc...
```

Note that you should put this code in **Scenes.js**, in the **Game** 
scene:

```
Crafty.scene('Game', function() { 'use strict';

	this.boards = [
	
		// Level 1
		[[1, 1,
```

The numbers in the array represent the various Sprites in your scene.
For instance:

- 1 = Tree
- 2 = Bush
- 3 = Food
- 4 = Village

Then you need a nested **for loop** to iterate over the array and
create the Crafty entities for each sprite:

```
var createEntity = function(col, row, name) {
	Crafty.e(name).at(col, row);
};

var createEntities = function(board) {
	for (var x = 0; x < Crafty.game.map_grid.width; x++) {
		for (var y = 0; y < Crafty.game.map_grid.height; y++) {
			var gridValue = board[y][x];
			if (gridValue === 1) {
				createEntity(x, y, 'Tree');
			} else if (gridValue === 2) {
				createEntity(x, y, 'Bush');
			} else if (gridValue === 3) {
				createEntity(x, y, 'Food');
			} else if (gridValue === 4) {
				createVillage(x, y);
			}
		}
	}
};
```

The end result is something like this:

![Crafty Predefined Places](../Images/CraftyDirs02.png)

- [Full size](../Images/CraftyDirs02.png)

###S3 Support

You should be able to deploy your project to S3. See the **SendToS3.js**
file in Crafty06 for an example of how to proceed.


###Turn It In

- Check your code into Git
- Include screen shots of 
	- Karma running
	- Grunt returning a clean run
- The URL of your game on S3

