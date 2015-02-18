# Isit320 Midterm

The midterm is a chance for you to show what you have learned so far this quarter. There is no absolute right answer for the midterm. Below I list a set of features. Try to complete as many as you can, but do not be concerned if you do not complete everything. If you need to make choices as to which features to complete, aim to complete the ones on the Priority One list.

## Basics

These are things that everyone has done already:

- Create a game with a 3D maze using ThreeJs
- Create two 2D arrays to define the Maze and the NPCs in the maze
- Create NPCs represented by a rotating point cloud and a rotating predefined mesh (star object)

As a general rule, if you have taken one course from me, focus on Priority One goals. If you have taken two courses from me, include at least a few Priority Two items. If you are an experienced developer who has taken lots of courses for me, see if you can complete everything. Those rules are so shaky that I can think of exceptions to all of them, and there aren't many folks in the class. I guess another metric might look like this:

- Do the best you can.
- Work hard but don't pull an all nighter. If its getting late, just go to bed.
- Have fun. This is small class, and we are learning a lot. Focus on learning, not on a getting a good grade.
- Trust me. I want you to succeed.

##Priority One

- Use sockets to set up communication between the game and a Debug Game Listener (DGL).
- Display the games debug output in the GameListener. This includes <X, Y, Z> info for the camera.
- Display a TinyMap overview of the maze, NPCs, and camera location.
- Send game grids to GameListener and display the TinyMap there.
- Have at least two levels. Access the second level when all NPCs on level one are gone.

Strategy for second level. Consider creating an object called LevelManager. Include in it the ability to load the Maze and NPCs. You can call from this object to Buildings.js, Particles.js, and Shapes.js. But control their actions from the LevelManager. At the beginning of the game, have the LevelManager load the Maze, NPCs and meshes. When a new level happens, have them do the same thing, but load the level two maze, NPCs and meshes.

## Priority Two

- Include at least one mesh that you created in Blender
- Show fog of war on game, but not on listener
- Display number of "living" NPCs in Game Display
- Display a score based on number of spaces "explored", that is how many spaced revealed in fog of war, and on number of NPCs found
- Chat from GameListener to Game
- From game send "Chat" messages about big events.
- Anything else you think is fun or imagine I must have meant to put on these lists but just forgot to add or perhaps felt was too obvious too mention.

##Extra Credit

- Extra Credit: Show what direction the camera is facing on the minimap.

##Turn it in

Put your work in a Git folder called Week07-Midterm. Submit the URL of your repository. Be sure to specify the folder in which you have placed your game and listener. I assume it is in Week07-Midterm, but if you think there is any reason why their might be some confusion, please clarify exactly where you put the two key projects.