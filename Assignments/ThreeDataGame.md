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
