
## Overview

The Isit320 2016 Midterm is a chance for you to show what you have learned so far this quarter. There is no absolute right answer for the midterm. Below I list a set of features. Try to complete as many as you can, but do not be concerned if you do not complete everything. If you need to make choices as to which features to complete, aim to complete the ones on the Priority One list.

## Basics

These are things that everyone has done already:

- Create a game with a 3D maze using ThreeJs
- Create two 2D arrays to define the Maze and the NPCs in the maze
- Create NPCs represented by a sphere and place them in the maze
- Access a Couch db Database that stores data on your characters.

As a general rule, if you are relatively new to programming, focus on Priority One goals. If you are an experienced programmer, include at least a few Priority Two items. If you are an experienced developer who has taken lots of courses for me, see if you can complete everything. Those rules are so shaky that I can think of exceptions to all of them, and there aren't many folks in the class. I guess another metric might look like this:

- Do the best you can.
- Work hard but don't pull an all nighter. If its getting late, just go to bed.
- Have fun. This is small class, and we are learning a lot. Focus on learning, not on a getting a good grade.
- Trust me. I want you to succeed.

## Priority One

Copy your code from the last assignment into a folder called Week07-Midterm.

- Make characters disappear when we move past one of them.
- Display number of "living" and "Dead" NPCs in Game Display (the green area on the left.
- Display a score based on number of spaces "explored", that is how many grid squares your have found.
- End the game when all the spaces are explored.

## Priority Two

- Copy the DataMaster program to **Week07-DataMaster**
- In the data master, allow the user to view records in edit controls with arrows to iterate through the game records

Look at the **Week03-ExpressRoutes** program. There we have two edit controls. Here is the Jade for them:

```text
div
  input#operatorA(type="text", value=2)
div  
  input#operatorB(type="text", value=3)
```

In the DataMaster part of the midterm, place at least three edit controls on your main window. When the user selects the hyperlink to read in records from the database, display at least three fields from the first record in the edit controls. We used code like this to read from an edit control:

```javascript
$('#operatorA').val();
```

To insert the number 1 into the the control, do something like this:

```javascript
$('#operatorA').val(1);
```

Here is one of my game records, though yours may look different than mine:

```javascript
{
    "id": "AA",
    "npc_id": 1,
    "npc_name": "Suzie One",
    "description": "NPC AA",
    "color": "#00FFFF",
    "value": 15,
    "question": "Is 2 + 2 equal to 4?",
    "answer": true
},
```

Display at least three of the value part of the these key/value pairs. For instance, display the **npc_name**, **description** and **question**.

Now place two buttons on the page. If the user clicks one of the buttons you can see the next record, if she presses the other, you can see the previous record. Check to be sure you aren't iterating past the beginning and end of the records.

!['Minimal iterator picture'](https://s3.amazonaws.com/bucket01.elvenware.com/images/data-master-iterate.png)

**Figure01**: _The minimal implementation of edit controls and buttons to allow iteration through couch game data._

## Extra Credit

- Extra credit: Allow the user to insert or delete a record.
- Extra Credit: Show what direction the camera is facing on the minimap. (Forward, Left, Right, Back)

## Refactor Collisions

We have avoided refactoring, but it is time to at least start down this road. Take your **collisionDetection** method out of **control.js** and put it in a file called **collisions.js**:

- Block copy and cut **collisionDetection**
- Create **collisions.js** on the client side and paste in your code
- Use [define](http://requirejs.org/docs/api.html#define) to provide support for **RequireJs**
- Define a **Collisions** with a constructor object. An example to follow is provided **floor.js**. Remember to use caps to remind the user to construct the object with new. Remember to export your public method using **prototype**.
- Construct the object in the init method for **control.js**. Call your instance **collisions**. Give it object scope inside **control.js**
- You will also have to make changes to **main.js**

Though I don't describe every detail, I've outlined here in broad strokes the steps you have to do to create a new module. Make sure you understand the steps, and know how to find this description, as we will do this a lot in the coming weeks.

See also:

- <http://requirejs.org/docs/why.html#9>
- <https://gist.github.com/jonnyreeves/2474026>

## NPC Creation

Do the same thing with the **addSphere** method that you did with **collisionDetection.**

- FileName: **npcs.js**
- ObjectName: **Npcs**
- Make **addSphere** public and rename it to **createNpc**
- Declare size as private variable inside of **Npcs**

Inside of **control.js** you probably have a array called **npcs** which is used to keep track of the spheres you have been creating. _Carefully_ rename this variable to **npcList** and declare it is a public property of **Npcs**. You will still reference this property from inside **control.js**. Check each place where you reference and make sure it is being handled correctly.

In **Npcs** delcare a private function called **getName** and a couple public properties.

```javascript
// When you insert an NPC, put it here.
// When you delete an NPC remove it from this list.
Npcs.prototype.npcList = [];

// Track the coordinates of the NPCs here. Possibly redundant?
Npcs.prototype.npcCoordinates = [];

var baseName = 'npc';

function getName(baseName, x, z) {
    return baseName + '_' + x + '_' + z;
}
```

Note that you can use the JavaScript **split** function to retrieve the X and Z coordinates from this name. That is, you can use **split** to reverse engineer the **getName** method. The result of this effort should be X and Z coordinates you passed in when creating the name.

When you create a new NPC, assign it a name property. Your code might look something like this:

```javascript
sphere.name = getName(baseName, x, z);
```

We will use this name to help us find a particular sphere.

## NPC Detection

Now add a public method to **Collisions** called **npcDetection**. Call it from the animate method. When you are done your program should now how to detect a collision with an NPC. Remember, we are not using ray tracing at this point. Instead, just detect if you are on the same grid coordinates as the NPC. For instance, iterate through the **npcList**, use the name to get the coordinates of the NPC, and compare them to the current position of the **mainCharacter**. Of they match, then you have a hit.

If you find that you have stumbled on an NPC, then remove it from the **npcList** and from the **scene**. To help you do so, add a method to **Npcs** called **removeNpc**. It might look a little like this, but it should be a public method of **Npcs**:

```javascript
var removeNpc = function(x, z, scene, gridNpc) {
      gridNpc[x][z] = 0;      
      var objectName = getName(baseName, x, z);
      var selectedObject = scene.getObjectByName(objectName);
      var index = this.npcList.indexOf(selectedObject);
      this.npcList.splice(index, 1);
      scene.remove(selectedObject);
  };
}
```

The **GridNpc** property should point at the NPC 2D 24X24 array that we load to track the location of the NPCs. The idea is that once we have discovered and removed an NPC from the scene,  we should also remove it from the grid array.

Call **removeNpc** from **control.js** when **collisions.npcDetection** finds an NPC. Except for the method not being public, the code shown above works for me. It removes the NPC both from the **npcList** and from the **Scene**. Remove the NPC from the **Scene** results in the character disappearing. The character is removed from the board.

At some point you will probably want to create a variable with object scope in **control.js** called **mainCharacter**. At minimum **mainCharacter** should be an object literal with two properties, **x** and **z** which track the cameras current position in grid coordinates.

Recall that Grid coordinates are the coordinates of the grid we define in our JSON files. Grid coordinates are different from, but not unrelated to, the game coordinates.)

## Turn it in

Put your work in two Git folders located in the root of your repository. Call them **Week07-Midterm** and **Week07-DataMaster**. Submit the URL of your repository. Please follow these naming conventions. If, for some reason, you want to use other names, be sure to specify the folders in which you have placed your game and your database code.

Make sure the CouchDb database has your name appended to it: **game-data-lastname**.

Set the zeroth item in your **Couch.js** array of addresses to **192.168.2.19:5984**. You don't have to set the index to that number, but do make it the first item in your array. Thank you. (That's the IP address of my CouchDb server here at home.) Example

```javascript
var servers = ['http://192.168.2.19:5984', 'http://192.168.0.6:5984'];
```

## Hint

Take full advantage of $.getJSON:

```javascript
function showDebug(value) {
    console.log(value);
}

$.getJSON('grid000.json', function (grid) {
  // YOUR CODE HERE
}).done(function () {
    showDebug('Grid loaded second success');
}).fail(function (jqxhr, textStatus, error) {
    showDebug('Grid loaded error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
}).always(function () {
    showDebug('Grid loaded complete');
});
```


## Extra Credit

Add sky.
