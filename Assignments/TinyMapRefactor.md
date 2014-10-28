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

##Turn it in

When you are finished, check your work into BitBucket in a folder called Week05_TinyMapRefactor

Update your GenMyModel UML model and submit the bitmap showing your work
	

## Create Core.js

Use this file to hold variables such as scene that everyone needs

## Properties

- [Define Property][jsprop]

[jsprop]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptObjects.html#defineproperty

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
