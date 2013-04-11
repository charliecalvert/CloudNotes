Canvas Grids
============

Create a 12 X 12 grid of 25 X 25 bitmap images displayed
in an HTML 5 canvas element. The user should be
able to use the up, left, right and down keys to
move a main character, represented by a second
bit map, around on the grid.

The canvas element should be 12 X 25 pixels
high, and 12 X 25 pixles wide.

Your program should include these files: 

* index.html
* index.js
* images.gif
* jquery-1.9.1.js

You should have a document ready handler at
the bottom of the javascript file. All the
rest of your code should be inside one 
object that follows the modular pattern
and is called Game.

Here is how to capture keydown events:

~~~~
	window.addEventListener('keydown', doKeyDown, true);
		
	var doKeyDown = function(evt) {
		switch (evt.keyCode) {
			case 38:
				/* Up arrow was pressed */
				break;
			case 40:
				/* Down arrow was pressed */
				break;
			case 37:
				/* Left arrow was pressed */
				break;
			case 39:
				/* Right arrow was pressed */
				break;
		}
	};
~~~~
	
When you are done, check your project into
your Prog282-LastName folder, and make
sure the folder is shared with me. When
you turn in the assignment, include a 
link to your BitBucket home page or
directly to your Prog282-LastName project.