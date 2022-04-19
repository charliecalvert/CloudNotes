---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Isit320Final2014.md
relativePath: Assignments/Isit320Final2014.md
title: Isit320Final2014
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: Isit320Final2014.md
fileNameHTML: Isit320Final2014.html
---


<!-- toc -->
<!-- tocstop -->

#Isit320 Final 2014

**NOTE**: *This document is not quite final. Begin work on it as soon as possible, but check the announcement area for updates.*

The goal of this assignment is two fold:

- Use Angular and CouchDb to store some data on the NPCs in the database.
- Enhance the game so that the player knows something about the NPCs the main character encounters.

## Create the Data

We will have to wait until Isit322 to bring this portion of the game completely to fruition. For now you may make two compromises:

- You don't have to actually insert or update the data you store in CouchDb. You may create it by hand, building a JSON file in a text editor. Then insert the file into the database, and view it in your app. Use Angular to handle the insert and view. This is very similar to what we were doing in class on Monday, Dec 1.
- You need not integrate the code with your **GameListener** at this time. In other words, you can use the applications we have built in class as the basis for this part of the assignment. In particular, I would build on top of the application we created on Monday, Dec 1. We will leave integrating the code into the Listener for next quarter.

The compromises above are done for the sake of expediency. It is the end of the quarter, and you need to focus on all your courses, so I have to be sure not to keep you too busy. There will be plenty of time to work on these issues next quarter. 

## Data

Insert your data into a CouchDb database called **game_data_lastname**, where lastname is your lastname in lowercase letters. The structure of the data you insert into CouchDb should have the following features:

- An **npc_id**, which will corresponding to the numbers for designating NPCs in your NPC grid. 
- A name for the character
- A description of the character
- A points value for the character
- A boolean (true/false) question
- An answer: true or false.

For instance, here are the first two **NpcObjects** in an array of NPCs: 

```
{
    "_id": "npcObjects",
    "docs": [
        {
            "id": "XXXXX",
            "npc_id": 1,
            "npc_name": "Suzie",
            "description": "A big, sly, girl",
            "color": "#00FFFF",
            "value": 15,
            "question": "Is 2 + 2 equal to 4?",
            "answer": true
        },
        {
            "id": "YYYYY",
            "npc_id": 2,
            "npc_name": "Tom",
            "description": "A big, sly, boy",
            "color": "#0000FF",
            "value": 15,
            "question": "Is 2 + 2 equal to 5?",
            "answer": true
        }
    ]
};
```

You can then either insert this data in bulk, or insert it as a single document: 

```
	nanoDb.insert(npcs, docName, function(err, body) {
		if (!err) {
			console.log(body);
		} else {
			console.log(err);
		}
	});
```

I have created a program in **JsObjects** called CouchView02. It demonstrates all your options:

- Insert a single document
	- Retrieve the JSON for whole document
	- Retrieve the JSON for a view of the document
- Insert a bulk document
	- Use a view to retreive the JSON for an array of the all the bulk documents 
	- Use handlebars to get a templated HTML file that formats the array of bulk documents

You can also retrieve an HTML view of the single document, or retrieve an array of all the fields of the bulk documents. 

To help you understand better, I created a video: [http://youtu.be/Hy8XkmoEReU](http://youtu.be/Hy8XkmoEReU_)


Store the data in a database, and include at least two views: one to retrieve the **npc_id**, **npc_name** and **value**. Another should retrieve the **npc_id**, **npc_name**, **question** and **answer**.

You program should include the ability to, and add menu items of links that allow you to:

- Create the database
- Delete the database
- Insert data into the database
- View:
	- All the NPC data
	- View each of the two views described above

Use **handlebars** to create HTML *templates* that show the various views of your data. This is all in the GameListener or in Helper App.

## Enhance the game

We are switching our attention now from the help application to the game itself.

Read in the NPC data from the database and store it in memory. It should be held in a property of an object called **Score** and it should be called **npcData**. This means you should create a file called **Score.js** and place a **Score** object inside it. 

In **Score**, also place an object called **mainCharacter**. It should have the following properties:

```
{ 
  name: "Robin",
  value: 15
}
```

As the main character moves through your game, it will encounter an NPC. If the character has a value at least equivalent to the value of the NPC, then he can remove the NPC from the game. Otherwise, the NPC remains. If the NPC is removed, then the NPC's value is added to the **mainCharacter's** value. 

## NPCs

There should be a hierarchy of NPC **values**, as follows:

- yellow: 15
- green: 45
- blue: 135

The list above references the **value** field of an **NPC object**. This is the same **NPC Object** discussed in the previous section.

Give the scores shown above, it follows that the **mainCharacter** cannot remove a green character until two yellow characters have been discovered. Likewise, the **mainCharacter** cannot remove a blue character until two green characters have been removed. In other words, the **mainCharacter** must have *earned* 45 points before it can remove a green character. 

**NOTE**: At some point, we might want to develop a more complex scoring mechanism, where we can find multiple ways to earn points. In that case, we might develop a different mechanism for determing when a green character can be removed. But for now, let's just keep it simple. 

The NPCs on the tiny map should be painted different colors, according to the colors specified in your database. The particle cloud and the item inside it should also correspond to the colors.

When the main character encounters an NPC,  the name of the character should be shown in the game and sent to and displayed in the **GameListener**.  

When 6 characters (2 yellow, 2 green, and 2 blue) have been removed from the board, then the **mainCharacter** can move on to level 2. You only need to set up the NPC scoring for Level 1. Once the **mainCharacter** has moved to level 2, you don't have to "score" the NPCs. In other words, there need be no data associated with the characters on Level 2 at this time. That's something we can leave next quarter.

##NPC Tests

As explained above, when you encounter an NPC, you should remove the NPC if you have enough points. If the **mainCharacter** does not have enough points, enough **value**, then the **mainCharacter** should be blocked by the NPC. 

You may find a different solution, but I use the "bounceAway" code to prevent the **mainCharacter** from walking through a strong NPC. By a strong NPC, I mean an NPC with more **value** than our main character.   we are not going to be strong enough to overcome it. Otherwise, remove it:

```
    if (rayHits.length > 0) {
        if (mainCharacterStrongerThanNpc()) {
            var cords = utilities.gameToGrid(core, selectedObject.position);
            removeNpc(cords.xPos, cords.zPos);
            return true;
        } else {
            bounceAway(position, rays, rayHits);
            return false;
        }
    }	
```

The **mainCharacterStrongEnough** method is a predicate: it returns a **boolean** value. In that method you should compare the **value** of the **mainCharacter** with the **value** of the NPC. If the **mainCharacter** is **strong enough**, then it should overcome the NPC, that is, it should return **true**. Otherwise it should  **false**.

**NOTE**: *At this point our collision detection for NPCs and walls is starting to look very similar, it may be possible to combine them into one method, passing in parameters or callbacks to account for minor differences. In any case, be sure both of the use the Rays array of directions.*

Remember also that you test for collisions needs to include two conditions:

```
if (intersections.length > 0 && intersections[0].distance < 15) {
```
In context, it looks like this:

```
for (var i = 0; i < rays.length; i += 1) {
	raycasterNpc.set(position, rays[i]);

	var intersections = raycasterNpc.intersectObjects(core.Npcs.particles);
            
	if (intersections.length > 0 && intersections[0].distance < 15) {
		selectedObject = intersections[0].object;
		controls.isOnObject(true);               
		rayHits.push(i);              
	}
}
```

## Hide Map

Hide the map and the debug data displayed in HTML at the top left of the screen.

Do something like this, where the first technique is JavaScript, and the second jQuery:

```
	document.addEventListener('keydown', onkeydown, false);
	$(document).keydown(onkeydown);
```

Look jQuery **toggle** method to toggle the visibility of an object on and off. Just use the selector for your object ("#myHtmlElementId) and call the **toggle** method on it.

## Extra Credit

When the mainCharacter encounters an NPC, show the question associated with the NPC and let the user press T for for true or F for false. If the correct answer is selected, the NPC should disappear, otherwise, the character should be moved back X number of units and the NPC kept in place. 

**HINT**: *Given the way our game works, you probably don't want to pop up an HTML dialog. Instead, use a DIV section on your page, or perhaps **threejs** to display the question. Remember: the mouse is "captured" so you don't want the user to click on anything. Just handle key strokes. 

## Tests

Make sure CheckProjects and Grunt are clean when you turn in the final.

##Turn it in

Put your work in a folder of your repository called **Week12-Final** or **Week12_Final**. There should be two or three folders inside this Week12-Final folder:

- Game
- GameListener
- DataMaster

The DataMaster program is the one described above in this document. The one that allows you to insert and view the NPC data.