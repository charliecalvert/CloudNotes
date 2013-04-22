Week03-DrawGrid
===============

This is the revised version of the asignment. The sections involving using
loading and saving JSON data have been removed, and will be covered next
week. 

There will be four new features in our game this week:

* Create a two dimensional array of numbers to describe the pattern to be used
when display your background grid. The pattern should be drawn using at
least two bitmaps.
* Support logging in before the user can play
* Increment a counter each time the player moves, and display the total number of 
moves.
* Prevent the player from moving off the grid. When she hits the edge of the 
grid, the main character should be stopped. She can move anywhere on the 
grid, but cannot move past the edges of the grid on the far left, right, top 
or bottom.

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

For more hints, see the following example from JsObjects:

- JsObjects/JavaScript/Syntax/ArrayTwoDimensions

Sign In
-------

The user must sign in using OpenId before they can play. After the log in,
you should load your game HTML file that will host your new grid and allow the
user to move around on it.

The best strategy is probably to host the HTML, JavaScript and CSS for
the LogIn screen and the Game files in a directory called public. Then use
fs.read

There are several examples of how to do load files from a **public** directory
in JsObjects, including these two:

* JsObjects/JavaScript/NodeCode/DataInput01
* JsObjects/JavaScript/NodeCode/JsonRead 

Loading Two HTML Files
----------------------

I have, in a moment of weakness, provided you with an example to show you 
how to load two HTML files from a single Node server. Look in 
**JsObjects/JavaScript/NodeCode** for a new example called **TwoHtmlFiles**. The 
part you care about is in **server.js**. You don't need to implement the link in 
the **index.html** file that you will find in this example. You just need something
like the method from **server.js** with this signature:

	app.get('/launchSecondHtmlFile' ... etc

Only in your OpenId example, it will be the URI route called **/go** that 
you care about:

	app.get('/go' ... etc

The **go** route is called automatically by OpenId, so all you have to do is 
respond properly when the method is called. The point of this demo is to 
give you some clues (too many, in fact) as to how to respond.

References
----------

Besides the obvious references on Elvenware, and the examples mentioned above,
be sure you look at the following examples in JsObjects. For instance:

- JsObjects/JavaScript/Authenticate/*
- JsObjects/JavaScript/Graphics/*
- JsObjects/JavaScript/Syntax/ForLoopNested
- JsObjects/JavaScript/Syntax/KeyDown
