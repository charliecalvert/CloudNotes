---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ThreeDataReader.md
relativePath: Assignments/ThreeDataReader.md
title: ThreeDataReader
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: ThreeDataReader.md
fileNameHTML: ThreeDataReader.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Consume our CouchDb data from the DataMaster program.

## Get Started

Copy the **Week0X-MazeBuilder** program to a program called **Week0X-MazeDataReader**. It might look something like this:

```bash
cp -r Week05-MazeBuilder/ Week06-MazeDataReader
```

Copy in the **routes/Couch*.js** files from DataMaster to the appropriate directory of your **MazeDataReader.**

Open **MazeDataReader** in your editor.

## Enhance the game

We are switching our attention now from the **DataMaster** utility application to the game itself. We will, perhaps, continue switching back and forth between the two throughout the quarter.

Our goals are as follows:

- Connect to CouchDb
- Read from CouchDb the NPC data created by the DataMaster program
- Store the data in memory. It should be held in a property of an object called **Score** and it should be called **npcData**. This means you should create a file called **Score.js** and place a **Score** object inside it.

In **Score**, also place an object called **mainCharacter**. It should have at least the following two properties:

```
{
  name: "Robin",
  value: 15
}
```

We don't need to implement this yet, but in the long term, as the main character moves through your game, it will encounter an NPC. If the character has a value at least equivalent to the value of the NPC, then he can remove the NPC from the game. Otherwise, the NPC remains. If the NPC is removed, then the NPC's value is added to the **mainCharacter's** value. Or something along those lines. I'm just trying to help you see where we might be going with all this.

## Data Display

For now, we might want to pick 5 places in the maze where we can put an NPC. Place a sphere in each of those five places.

When the main characters reaches one of those places, display in the Game Display area some data about the NPC. For instance, pick the description and value fields, and show those in the green Game Display area. When the main character (the camera) moves past one of these locations, then the NPC data should disappear, but the main characters stats should still be on display.

Here is a grid that provides us one means of defining where the NPC's are in our grid. Here we have an NPC with an ID of 1 of [1, 4] and one with an id of 2 at [3, 8]. Save this is a **NPC000.json** next to your JSON for the main grid.

```javascript
[
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
```

Add additional NPCs to the array as needed. We need to check, of course, that we pick places that are in the aisles of the maze, rather than inside a block.

To load the NPCs, load and iterate through this 2D array and insert a sphere whenever you find a non-zero value.

For now, we will detect the collision with an NPC simply by checking if we are in the same square as the NPC. We can use the raycaster to detect the spheres. I have code for doing that, but let's simplify for now. Just calculate the square the main character is one, and see if it corresponds to one of the squares where you placed an NPC. To get started in this process, begin displaying the current X, Y grid coordinates of the main character next to the display of his game coordinates.

To calculate the position of the main character in the maze:

- Take his x position, divide it by his size, use **Math.round()** to get a whole number, and then use **Math.abs()** to be sure you have a positive number in case you are actually moving in a negative direction in terms of the screen coordinates.
- Do the same for his z position.

You have two main methods from which you can call your code that calculates the position of the object. One is called **init**, and one is called **animate**. I'll leave it up to your to choose from which of these two method you should call your code that performs these calculations.

**Hint**: _Display the position of your NPCs in the green display area, at least while your are developming the app. Create a UL element with an ID of **npcs** in index.jade, and then append the positions to it like this:_

```javascript
$('#npcs').append('<li>' + npcs[i] + '</li>');
```

## Collision with NPC

- Read in the data from the database.
- When you create the NPC associate a document from the database with it.
- Keep a list of your NPCs.
- Create a method that takes the current position of the camera in grid coordinates and the npcList
  - Name this method **npcDetection** and call it from your animate loop.
- In the method iterate over the list and see if an NPC is at the same coordinates as the camera/mainCharacter.
- If there is a collision, tell the user about it and quote from the database doc

## Getting Database

When you try to connect to the database from the client, when you try to connect from the browser, you might get an error from our Couch code. Most frequently, the error occurs because the database is not running or we don't have the right IP for it. Here is one way to handle the error:

```
$.getJSON(query, function (json) {
    // DO SOMETHING WITH THE DATA FROM THE SERVER
}).fail(function (jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log({"Request Failed": err});
    var response = JSON.parse(jqxhr.responseText);
    var responseValue = JSON.stringify(response, null, 4);
    console.log(responseValue);
    alert('Database not connected' + responseValue);
});
```

The key point is that the **jqxh.responseText** property, which is a string, contains a lot of useful information that you might want to show to yourself while your application is under development. This is not a very good way to show it, but it should help you understand what is involved in finding and parsing the data.

## Turn it in

Commit your code in your repository under the name specified above. Submit the assignment on Canvas, leaving any notes about your code think I should see.
