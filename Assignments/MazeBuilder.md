#MazeBuilder

The goal of this program is to have your main character wander around in a maze, or dungeon, rather than just out in the open.

##Get Started

Copy your Pointer program into a new folder called Week03_MazeBuilder. Instead of drawing two rows of boxes, use **$.getJSON** to load the two dimensional array of JSON shown below.

Save the following Grid000.json in the public directory or some subdirectory beneath it. In your program, load it with **$.getJSON**.

```
[
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
	[1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
	[1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1],
	[1,0,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1],
	[1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
	[1,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1],
	[1,0,0,0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1],
	[1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,0,1,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,0,1,1,1,0,0,1,0,0,0,1,0,1,1,1,0,1,1,0,1],
	[1,0,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1],
	[1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1],
	[1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1],
	[1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
	[1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]
```

Iterate over this JSON with a nested for loop. Draw a box wherever there is a one. Leave the zeros blank.

It is just like the last assignment, but now instead of three columns and two rows, we are building a whole maze which is both much larger and more complex than what we saw before. 

Have the camera set up so you can walk around in the maze. In other words, the camera starts inside the maze. Your code for detecting collisions should make it difficult for the user to break out of the maze. At this stage, the goal is not to find the way out of the maze, though that might be an interesting exercise if you want to turn this program, as is, into a game. The goal of that game would be to get to the start to a place where you can escape the maze. The maze shown above has no exit, so you would have to modify it very slightly if you wanted to play that game.

Check in and submit repository when you are done. 

##Hints

You can probably do much of the work for this assignment in the addCubes method.  Right now that method has a simple for loop in it. You will need to change that loop so that it iterates over the JSON you load.
The JSON is a two dimensional array of integers. So we have one or more arrays nested inside another array
To iterate over the two dimensional array, you need, then, to have nested for loops. [Here][fornest] is an example of the syntax I want you to use in the **addCubes** method, but of course you want to iterate over the arrays in the Grid000.json. In other words, I show you an example of a nested for loop, but not an example of the exact nested for loop that I want you to create.

Before you try to display the maze in 3 dimensions, consider using console.log to write the array to the console. That might be one way of confirming that you are properly iterating over the array. Just try to make the display on the console look like the array as it appears above, but perhaps with out the square brackets and commas. That is optional, but you might find it useful if you are having trouble with the iteration over the grid.

[fornest]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Syntax/ForLoopNested/index.js

Here is a view inside the maze:

![inside](https://drive.google.com/uc?export&id=0B25UTAlOfPRGWnZMTzdHT1hXOWM)

Our PointerLock code allows us to jump up in the air. We might not want that as a feature of the final game, but here is a picture of how part of the maze looks when one is jumping:

![flying](https://drive.google.com/uc?export&id=0B25UTAlOfPRGVmJaNDJHNlAwM00)

You do not have to duplicate what I have done exactly. Choose textures that interest you, and modify the maze if you wish. The boxes are obviously half underground in these screen shots, that is not important. In fact, I should probably change my code so it doesn't do that. But whether you do that or not is not important at this stage.

