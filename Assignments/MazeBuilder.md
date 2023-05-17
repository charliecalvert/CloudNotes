---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MazeBuilder.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: MazeBuilder.md
relativePath: /MazeBuilder.md
title: MazeBuilder
directoryName: Assignments
category : assignments-guide
---

## Overview

The goal of this program is to have your main character wander around in a maze, or dungeon, rather than just out in the open.

## Get Started

Copy your **PointerLock** program into a new folder called **Week03-MazeBuilder**. Instead of drawing two rows of boxes, use **$.getJSON** to load the two dimensional array of JSON shown below.

Save the following as **Grid000.json** in the **public** directory or some subdirectory beneath it. In your program, load it with **$.getJSON**.

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

Iterate over this JSON with a nested for loop. Draw a box wherever there is a one. Leave the zeros blank. In general, we want the maze to go deeper into the scene, so that the **z** coordinate is increasingly negative as we move into the maze. Think for a moment about the grid shown above on this page. Forget the ThreeJs game for a moment. We move "deeper" into the maze by advancing from left to right through the columns. That is, in the grid above the user should start on row two facing to the right. Don't try to move the camera or rotate it to get him in the right starting position. Instead, move the grid. Usually this just means that x is positive and **z** is negative when you call **addCube**. **x** become higher as move from top to bottom in the 2D grid shown above, and **z** is negative, and gets lower, gets farther from zero, as we move from left to right.

- On the grid above, moving down is plus **x**.
- On the grid above, moving right is minus **z**.

Here is another way to think about it. There is a nested for loop that we use to paint the "boxes" after we load the **grid000.json** file. Suppose that you use **i** as the counter variable for the outer loop, and **j** for the counter variable for the inner, nested loop. When calling **addCube** we pass in two coordinates as parameters: **x** and **z**. In the nested loop, use **j** to set up **x**, and **i** to set up **z**. Make **x** be positive and **z** negative.

Then you should be facing the doorway when you start the game. As you head into the maze, **z** goes increasingly negative. It gets increasingly small (more negative) as you move deeper into the maze. As you move to the right, **x** gets larger.

If you feel like you are facing in the wrong direction, the problem is most likely not the way you are facing, but the way you are drawing the grid. In particular, at the start you are facing into the scene, at point 0,0, or near that point, and looking deep into the scene. This means that in front of Z gets increasing negative and smaller, and behind you it gets increasing positive larger. Everything in front of you is negative Z. In other words, you drew the grid behind you. Don't do that. Draw it in front of you. You are looking toward Z = Z -1, then Z = Z - 2, and so on. If you feel like you are facing the wrong way, you probably drew the grid growing in a positive direction, Z = Z + 1, Z = Z + 2. Just draw the grid growing not toward the camera, but away from it, and then you will be facing in the right direction. Don't move the camera, move the grid. At least that should be the solution in most cases. Of course, you also have to be sure you are drawing X in the right direction, but most people seem to do that automatically.

Otherwise, this assignment is just like the last assignment. But now instead of three columns and two rows, we are building a whole maze which is both much larger and more complex than what we saw before.

Have the camera set up so you can walk around in the maze. In other words, the camera starts just inside, or perhaps just outside the door into the maze.

Your code for detecting collisions should make it difficult for the user to break out of the maze. At this stage, the goal is not to find the way out of the maze, though that might be an interesting exercise if you want to turn this program, as is, into a game. The goal of that game would be to get to the start to a place where you can escape the maze. The maze shown above has no exit, so you would have to modify it very slightly if you wanted to play that game.

## To many loads of crate.jpg {#many-crates}

Your program might be loading crate.jpg hundreds of times. To stop this behavior, load the crate mesh once, save it in a variable, and use it when necessary.

## Facing wrong Way

If you are not facing in the right direction, this is probably because you are not drawing the grid correctly. Play with the loop where you draw the grid, and particularly this line:

```javascript
addCube(scene, camera, wireFrame, HERE, HERE);
```

This line, or the code that affects this line, is likely the problem.

## Turn it in

Check in and commit the code in your repository when you are done. Submit the assignment and leave a comment if you think it will be useful.

## Hints

You can probably do much of the work for this assignment in the addCubes method.  Right now that method has a simple for loop in it. You will need to change that loop so that it iterates over the JSON you load.

The JSON is a two dimensional array of integers. So we have one or more arrays nested inside another array To iterate over the two dimensional array, you need, then, to have nested for loops. [Here][fornest] is an example of the syntax I want you to use in the **addCubes** method, but of course you want to iterate over the arrays in the Grid000.json. In other words, I show you an example of a nested for loop, but not an example of the exact nested for loop that I want you to create.

Before you try to display the maze in 3 dimensions, consider using console.log to write the array to the console. That might be one way of confirming that you are properly iterating over the array. Just try to make the display on the console look like the array as it appears above, but perhaps with out the square brackets and commas. That is optional, but you might find it useful if you are having trouble with the iteration over the grid.

[fornest]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Syntax/ForLoopNested/index.js

Here is a view inside the maze:

![Figure02: Innside](https://drive.google.com/uc?export&id=0B25UTAlOfPRGWnZMTzdHT1hXOWM)

Our PointerLock code allows us to jump up in the air. We might not want that as a feature of the final game, but here is a picture of how part of the maze looks when one is jumping:

![Figure01: Flying](https://drive.google.com/uc?export&id=0B25UTAlOfPRGVmJaNDJHNlAwM00)

You do not have to duplicate what I have done exactly. Choose textures that interest you, and modify the maze if you wish. The boxes are obviously half underground in these screen shots, that is not important. In fact, I should probably change my code so it doesn't do that. But whether you do that or not is not important at this stage.

## Color

Somewhere in your code you might be generating this error:

<pre>
THREE.MeshNormalMaterial: 'color' is not a property of this material.
</pre>

Here is the kind of code that generally generates this error:

```javascript
var material = new THREE.MeshNormalMaterial({
    color: 0x00ffff,   <==== PROBLEM IS HERE. DELETE IT.
    wireframe: wireFrame
});
```
