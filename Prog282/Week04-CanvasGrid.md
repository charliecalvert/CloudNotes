

Main Character Score
--------------------

Create a JSON file called Character.json that contains a single object that 
tracks three traits of your main character:

* Moves
* Experience
* Skill

Each trait should be a property of the object stored in your JSON file.

Load the JSON file into memory from your "server" when your program 
starts. Hold the object in a property called character:

	var character = null;
	
Whenever the user moves the main character, increment the Moves 
property. Use the Modulus operator (%) to increment the Exprience 
trait each time the user moves 25 spaces. After every 10th move the 
character makes there should be a 15% chance that the user's Skill 
is incremented by 1. When the user presses the Ctrl-S key 
combination, save the score back to the server in a folder set aside 
for that user. 

You should read and write the JSON using the jQuery ajax method.

After Loggin In
---------------

So we should start creating directories for each user? Be able
to log in as one user, see your current score, then log in as another user,
and track the score of that user?
