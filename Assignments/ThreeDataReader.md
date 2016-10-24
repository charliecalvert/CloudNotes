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

When the main characters reaches one of those places, display in the debug area some data about the NPC. For instance, pick the description and value fields, and show those in the debug area. When the main character (the camera) moves past one of these locations, then the NPC data should disappear, but the main characters stats should still be on display.

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

## NPCs

There should be a hierarchy of NPC **values**, as follows:

- yellow: 15
- green: 45
- blue: 135

The list above references the **value** field of an **NPC object**. This is the same **NPC Object** discussed in the previous section. These values are stored in the database.

Give the scores shown above, it follows that the **mainCharacter** cannot remove a green character until two yellow characters have been discovered. Likewise, the **mainCharacter** cannot remove a blue character until two green characters have been removed. In other words, the **mainCharacter** must have *earned* 45 points before it can remove a green character.

**NOTE**: At some point, we might want to develop a more complex scoring mechanism, where we can find multiple ways to earn points. In that case, we might develop a different mechanism for determing when a green character can be removed. But for now, let's just keep it simple.

The NPCs on the tiny map should be painted different colors, according to the colors specified in your database. The particle cloud and the item inside it should also correspond to the colors.

When the main character encounters an NPC,  the name of the character should be shown in the game and sent to and displayed in the **GameListener**.  

When 6 characters (2 yellow, 2 green, and 2 blue) have been removed from the board, then the **mainCharacter** can move on to level 2. You only need to set up the NPC scoring for Level 1. Once the **mainCharacter** has moved to level 2, you don't have to "score" the NPCs. In other words, there need be no data associated with the characters on Level 2 at this time. That's something we can leave next quarter.

## Turn it in

Commit your code in your repository under the name specified above. Submit the assignment on Canvas, leaving any notes about your code think I should see.
