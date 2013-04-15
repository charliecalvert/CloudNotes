Week03-DrawGrid
===============

There will be two new features in our game this week:

* Begin scoring the accomplishments of your main character
* Support multiple users and logging in

Main Character Score
--------------------

Create a JSON file called Character.json that contains a single object that 
tracks two traits of your main character:

* Moves
* Experience

Each trait should be a property of the object stored in your JSON file.

Load the JSON file into memory from your "server" when your program starts. Hold
the object in a property called character:

	var character = null;
	
Whenever the user moves the main character, increment the Moves property. Use 
the Modulus operator (%) to increment the Exprience trait when the 
user moves 25 spaces. When the user presses the Ctrl-S key combination, save
the grid back to the server.

You should read and write the JSON using the jQuery ajax method.

Sign In
-------

I'm still thinking this through. We will certainly have the user sign in before
they can play. So we should start creating directories for each user? Be able
to log in as one user, see your current score, then log in as another user,
and track the score of that user?
