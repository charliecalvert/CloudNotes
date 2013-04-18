Week03-DrawGrid
===============

There will be two new features in our game this week:

* Begin scoring the accomplishments of your main character
* Support multiple users and logging in

Main Character Score
--------------------

Create a JSON file called Character.json that contains a single object that 
tracks three traits of your main character:

* Moves
* Experience
* Skill

Each trait should be a property of the object stored in your JSON file.

Load the JSON file into memory from your "server" when your program 
starts. Hold the object in a property called character:

	var character = null;
	
Whenever the user moves the main character, increment the Moves 
property. Use the Modulus operator (%) to increment the Exprience 
trait each time the user moves 25 spaces. After every 10th move the 
character makes there should be a 15% chance that the user's Skill 
is incremented by 1. When the user presses the Ctrl-S key 
combination, save the score back to the server in a folder set aside 
for that user. 

You should read and write the JSON using the jQuery ajax method.

Sign In
-------

I'm still thinking this through. We will certainly have the user sign in before
they can play. So we should start creating directories for each user? Be able
to log in as one user, see your current score, then log in as another user,
and track the score of that user?

Define a Grid with Two Bitmaps
------------------------------

In last weeks assignment, we used two bitmaps:

* One for the background grid
* One for the main character

Now I want you to use two bitmaps for the grid:

* One bitmap for a background material such as grass
* A second bitmap to define a path through the grass

You will use a two dimensional array of integers to designate where 
grass should be drawn, and where the path should be down. Here for 
instance is a 5 X 5 grid:

	0 1 0 0 0
	0 1 0 0 0
	0 1 1 0 0
	0 0 1 1 0
	0 0 0 1 0

You should use your nested for loop from last week to draw the 
background grid. This time, however, you should check the 12 X 12 
array and make sure that you draw grass for items that are a 0, and 
path for items that are a 1.

Here is how to define a simple 3 X 3 array in JavaScript:

~~~~
	var list = [
		[0, 1, 0],
		[1, 0, 0],
		[0, 1, 0]
	];

	for (var i = 0; i < 3; i++) {
		if (list[i] == 0) {
			// Draw Grass
		}
	}
~~~~

The code shown above differs from what you will create. It is meant 
simply to give you a few hints as to how to proceed.

Besides the obvious references on Elvenware, be sure you look at the 
relevant examples in JsObjects. For instance:

- JsObjects/JavaScript/Authenticate/*
- JsObjects/JavaScript/Graphics/*
- JsObjects/JavaScript/Syntax/ForLoopNested
- JsObjects/JavaScript/Syntax/ArrayTwoD
- JsObjects/JavaScript/Syntax/KeyDown

