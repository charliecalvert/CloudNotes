---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/TinyMapRefactor.md
relativePath: Assignments/TinyMapRefactor.md
title: TinyMapRefactor
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: TinyMapRefactor.md
fileNameHTML: TinyMapRefactor.html
---


<!-- toc -->
<!-- tocstop -->

# Tiny Map Refactor

Goals for this assignment:

- Create a Core class that holds scene, camera, renderer, and grids for Maze and NPCs.
- Implement Singleton pattern for the Core class
- When the player passes an NPC, have the NPC disappear
- Implement  a miniature map that shows:
	- Maze
	- Npcs
	- Position of player
- Update the miniature map
	- When the player moves to a new "square"
	- When an NPC is discovered. That is, make the NPC disappear from the miniature map
- Use the Publish Subscribe pattern to trigger the drawing and redrawing of the miniature map

Other:
- Implement fog of war
- Toggle tiny map on and off

##Drawing the Tiny Map

You need to add a Canvas element to **index.jade**:

```
div
    canvas#myCanvas(width='192', height='192', style='border:1px solid #000000;')
```        

Then you can draw rectangles in the [Canvas][cnv] like this:

```
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var blockSize = utility.tinyMapBlockSize;
context.fillStyle = "#555555";
context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
```

See the MDN [Canvas][cnv] entry for more details. You can do a lot with a canvas, but we are just getting a few basics.

## Game to Grid Coordinates

One of the key steps you must take in order to draw the tiny map is to translate game coordinates to grid coordinates. You get game coordinates like this:

```
$('#cameraX').html(position.x);
$('#cameraY').html(position.y);
$('#cameraZ').html(position.z);
```

To convert game coordinates to grid coordinates, do something like this:

```
npcX = Math.round(position.x / boxSize);
npcZ = Math.round(position.z / boxSize);
```

Show the coordinates to the user in the message area:

```
$('#npcX').html(npcX);
$('#npcZ').html(npcZ);
```

Now you know where the camera is in the grid. That will help you draw the current position of the main character in the tiny map.

## Message Div Setup

The indentation for your Jade code in **index.js** is very important. Some folks are finding that the debug area where they are going to draw the map disappears when they start playing the game. That is an indentation issue. Look at this Jade code:

```
extends layout

block content

  div#blocker(style='display: -webkit-box;')
    div#instructions(style='')
      span(style='font-size:40px') Click to play
      p (W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
      
  div#message
      p
        strong Camera X: 
          span#cameraX Foo

```

The **#blocker div** disappears altogether when the game starts. That is the section with the instructions in it, and that bit of code is hidden when the game starts, when you click in the map. If you message section is indented in such a ways to be "inside" your blocker section, then it will also disappear when the game starts. The fix is shown above:  put the **#message div** on the same indentation level as the blocker, and then it is not hidden when the game starts.

[cnv]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

##Turn it in

When you are finished, check your work into BitBucket in a folder called Week05_TinyMapRefactor

Update your GenMyModel UML model and submit the bitmap showing your work
	

## Create Core.js

Use this file to hold variables such as **scene** that several classes need to access. My copy has the following simple properties and no methods:

- Camera
- Scene
- GridMaze (The 2D array)
- NpcMaze (The 2D array)
- Renderer (Is this really needed?)

You could just have a simple object with only those properties in it. You might consider using Object.defineProperty or this.propertyName to make the properties public. Then you can use the core class to access items you need when you need them:

	shapes.addNumber(core.Scene, core.Camera, false, x, z);
	$.publish('drawMap', { type: 'maze', grid: core.GridMaze});

## Properties

- [Define Property][jsprop]

[jsprop]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#defineproperty

## Removing Objects

Give each particle cloud and start object a unique name using a method like this:

```
var particleBaseName = 'particle';
var starBaseName = 'star';

function getName(baseName, x, z) {
    return baseName + x + z;
}

var starName = getName(starBaseName, x, z);
```

Then when the user passes over a particular location, find the name of the object at that location, ask the scene to retrieve it, call **scene.remove** to remove it from the scene:

```
 var objectName = getName(particleBaseName, x, z);
 var selectedObject = scene.getObjectByName(objectName);
 scene.remove(selectedObject);
```

Don't forget that the location on the screen is not the same as the location in the grid, because we use different coordinate systems. But you can translate a screen location to a grid location just by dividing by **size**.

Useful methods:

- Is there an NPC at position X, Y? 
	- isNpc(x, y)?
- Change the grid when an NPC needs to disappear 
	- vaporizeNpc(x, y, value). 

Vaporize might look something like this: 

``` 
grid[z][x] = value;
var objectName = getName(particleBaseName, x, z);
var selectedObject = scene.getObjectByName(objectName);
scene.remove(selectedObject);
```

## Using Patterns

- [Patterns on Elvenware][patterns]

[patterns]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptPatterns.html#overview 

## Publish and Subscribe

- [Publish and Subscribe on Elvenware][pelf] 
- [TinyPubSub](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/PubSubTopic04/public/javascripts/TinyPubSub.js) On JsObjects

[pelf]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptPatterns.html#publish-and-subscribe

## Singleton

- [Singleton on Elvenware][elfSing]
- [JsObjects/JavaScript/Design/Singleton][sing]

[elfSing]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptPatterns.html#singleton
[sing]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/Singleton

## Uml

Getting closer to having something useful.


## Other Unrelated

- [Web Fundamentals](https://developers.google.com/web/fundamentals/)
- [One](https://developers.google.com/web/fundamentals/layouts/rwd-fundamentals/)
