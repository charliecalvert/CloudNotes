---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ThreeDataGame.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: ThreeDataGame.md
relativePath: /ThreeDataGame.md
title: ThreeDataGame
directoryName: Assignments
category : assignments-guide
---

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

## NPC Tests

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
