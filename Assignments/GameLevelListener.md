---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/GameLevelListener.md
relativePath: Assignments/GameLevelListener.md
title: GameLevelListener
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: GameLevelListener.md
fileNameHTML: GameLevelListener.html
---


<!-- toc -->
<!-- tocstop -->

#Game Level Listener

- Show debug information only in listener
- Send game grids to listener
- Two levels

## Debug Info

Right now we are displaying debug information such as the X, Y, Z coordinates of the camera in the main game. We should send all this information to the game listener and display it there. The game should have information only needed by the player, such as Score, Level, and minimap. etc.

## Game Grids

Create a socket message called "GridChanged", or something similar. When the grid changes, send the following:

- The Maze
- The NPC grid 

We could simply send the NPC grid in its current state, that is, which zeros in the places where NPCs have been found.

Alternatively, it would be useful, at least in theory, to send the original grid and then include information on which NPCs have been found and which need to be found. In fact, we could simply send that information, and have the GameListener construct the grid based on the coordinates of the NPCs. The advantage of this kind of system is that the GameListener could show, in a different color, the location of NPCs that have been found.

## Two Levels

In theory, this is simple: when all the NPCs have been found, just load a new grid. However, this can be a bit confusing at times, because we also have to reset what state we were tracking, and remember the current level.

Things to do:

- Open a door out of the current level when all the NPCs have been found. Even display a message such as "A door has opened' so the player will know to go look for it. The player then has to find the door, and when passing through it, go to the next level.

##Turn it in

In a Git folder called **Week06-GameLevelListener**.