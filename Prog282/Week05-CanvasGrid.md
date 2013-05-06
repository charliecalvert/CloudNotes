Week05-CanvasGrid

We continue to work on the CanvasGrid program. You may either use the
code in Prog282-Hints as the basis for your work, or you can pillage
that code to your heart's content. In general, if you have been 
able to (more or less) successfully complete each assignment so far,
then you probably want to keep the code you have created. If JavaScript
is new to you, then perhaps you would appreciate having a  
foundation on which to build the next stages of this project. In that
case, you might want to rely on CanvasGrid03 from the Prog282-Hints
repository.

Major Goals for Week05
----------------------

* Refactor CanvasGrid03 from Prog282-Hints repository per our discussion
on Monday, and check it in to your repository in a directory called
Week05-CanvasRefactor. Pull apart Draw.js so that you end up with two
files: Draw.js and Keyboard.js. The draw code is in Draw.js, and the
keyboard code is in Keyboard.js. We did this in class, and serves as
a model to demonstrate how we modularize our code.
* Modularize - Make sure you are discovering the major objects in your
program. These might include Draw, KeyboardInput, Main (or Core), 
Characters, etc.
* Unit Test - You should have at least one unit test for each of your
objects. Use the QUnit module("") syntax so I can easily discover
which tests apply to which object. Include internal tests for testing
private methods.
* A new array where you store the NPCs (Non-Playing-Characters) for your
game. We have a 12 X 12 array where we store the values the for our 
Grid. We should now add a second 12 X 12 array where we store the
NPCs. Each NPC should be marked with a value 1 through 3. Spaces where
no NPCs are found should just have the value 0. You should
draw different bitmaps to the screen for different characters. For 
instance, an NPC marked by a 1 would have blue colored bitmap, those
marked with 2 a red color, etc. Optionally, you should be able to detect 
the collision.
* Run your game from AWS with UpStart. 


The addition of a second 12 X 12 array means that you will have to have
two nested for loops, or check for the state of your second array 
inside the first nested for loop.

We are building up our grid in layers. There is the base layer, which
is the background. Then on top of that we blit the NPCs, then we blit
the main character (Hero) on top of that. Some games built like this
end up having three or four layers. 

This might be a good time to look at some of the bitmaps I'm giving
you and notice that there are "transparent" sections in them. When
you see a mushroom blitted on the road, it is not that the mushroom
has a background shaded like a road, it is that background color behind
the mushroom is treated as transparent. To tell you the truth, I haven't
looked up the algorithm being used here, but the standard procedure in
these cases is to have the pixel in the upper left hand corner of GIF
bitmaps designate the transparent color. The drawImage routine from
the Canvas object looks for that pixel, and never blits any pixels
of that shade to the screen.

![Blit grass and path, then the tree, which is an NPC of sorts, on top](../Images/Grid02.png)

(And yes, a tree is a not a very good NPC, but hopefully this shows
what I want. And frankly, I don't care what kind of images you use
for your NPCs. If you have a nice Orc, great, but anything will do.)

<http://gamedev.stackexchange.com/questions/19257/how-do-i-make-magenta-in-my-png-transparent-in-html5-canvas-js>

Upstart References
------------------

- JsObjects/JavaScript/NodeCode/ExpressSend
- Prog282-Hints/CanvasGrid03 - see the CanvasGrid03.conf file

And this file:

<http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#upstart>

What to Turn In
---------------

When you turn in the assignment, check your latest code into your 
repository. Submit the URL for your UpStart powered game.

Should I Test Private Methods?
------------------------------

One traditional answer is that we test only public functions 
(Name.prototype.whatever).

However, qunit is very flexible, and it is possible to test private 
functions without too much fuss. One solution is shown in 
Prog282-Hints/CanvasGrid03. Look in Public/Scores.js, you see this:

~~~~
Scores.prototype.unitTests = function() {
   test("ScoresUnitTests", function() {
     var actual = getRoll();
     ok(actual < 101 && actual > 0, "Get Roll in range");
   });
}
~~~~ 

Then in the unit test code (Tests/UnitTest01):

~~~~
var privateTest = function() {
   var testScore = new ELF.own.Scores();
   testScore.unitTests();
};
~~~~ 

This would be a way to run one or more tests of private methods inside an 
object. Clearly we are inserting code into the object that would not be used 
in a shipping product. Using Templates we could have a version of our code 
that had such methods, and other versions which did not. 

In general, the subject of unit testing private methods is an area of 
controversy. For instance, the whole point of private methods is that they 
can change when you need to change them. If you start testing them, aren't 
you just locking something in place that should be fluid? The controversy 
can be found nearly everywhere unit testing is discussed. For instance, read 
BigKahuna's answer to this question and Dima's answer to his answer:

<http://stackoverflow.com/questions/250692/how-do-you-unit-test-private-methods>

It is this kind of controversy that makes unit testing, which seems at first 
so dry and mundane, actually a very interesting subject.

For us, at this stage, there is no need to take a stance on this subject. We 
can just learn how to test private methods, and start experimenting. As we 
gain more experience, we can start to draw conclusions. My opinion? Sure, I 
think it is nice to test at least some key private methods. But many experts 
who look at my tests think that I write too many of them. If you are pressed 
for time, test the public one's first. For the assignment: show me that you 
know how to test at least a few private methods.

Share Data Between Objects
--------------------------

Suppose you have two variables called playerX and playerY that you
want two objects to share. One way to handle the situation is to declare
a single object with two properties called **playerX** and **playerY**. You
can then share the object between the two objects. Changes made to the
shared object will be seen by both objects that share the data.

Consider this object:

~~~~
ELF.own.Player = (function() {
	'use strict';
	var that = {};
	that.playerX = 1;
	that.playerY = 2;

	// Constructor
	function Player() {
		new ELF.own.ShowPlayer(that);
		$('#buttonChangePlayer').click(changePlayer);
	}

	var changePlayer = function() {
		that.playerX += 1;
		that.playerY += 2;
	};

	return Player;
})();
~~~~

And here is the object that wants to consume playerX and playerY:

~~~~
var ELF = {};
ELF.own = {};

ELF.own.ShowPlayer = (function() { 'use strict';

	var sharedData = null;

	function ShowPlayer(initData) {
		sharedData = initData;
		$('#buttonShowPlayer').click(showPlayerXY);
	}

	var showPlayerXY = function() {
		$('#test01').html('X = ' + sharedData.playerX + ' Y = ' + sharedData.playerY);
	};

	return ShowPlayer;
})();
~~~~

In the first object I declare the data to be shared:

~~~~
	var that = {};
	that.playerX = 1;
	that.playerY = 2;
~~~~

Then I share the data with the second object when the second object is created:

~~~~
	new ELF.own.ShowPlayer(that);
~~~~

You can make the variable passed to the second object global within that second 
object:

~~~~
	var sharedData = null;

	// Constructor
	function ShowPlayer(initData) {
		sharedData = initData;
	}
~~~~

Now any changes made to that.playerX by either object will be seen by both 
objects. In other words, it is passed by reference, not by value. The method
that changes the data is called **changePlayer**, and the method that detects
the change is called **showPlayerXY**.

To see this in practice, look at:

	/JsObjects/JavaScripts/Objects/ShareVariables01
	
Public reference to this topic on Elvenware:

<http://elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#share-data-between-objects>

