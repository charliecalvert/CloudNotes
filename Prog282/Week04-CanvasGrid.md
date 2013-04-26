

Main Character Score
--------------------

Create two JSON files called **Hero.json** and **Orc.json**. Each should contain
a single object that tracks at least five character traits:

* Type        
* Moves
* Experience
* Health
* Strength

Each trait should be a property of the object stored in your JSON file.
All the properties should be numeric values except
for Type, which can be a player type, such as hero, orc, shopKeeper, 
etc. Set the **Health** of the **Orc** to 5.

Load the **Hero** JSON file into memory from your "server" when your program 
starts. Hold the object in a property called character:

	var character = null;
	
Load the **Orc** JSON file into memory from your server. Hold the object 
in property called **orc**:

	var orc = null;
	
Whenever the user moves the main character, increment the Moves 
property. Use the Modulus operator (%) to increment the Exprience 
trait each time the user moves 25 spaces. After every 10th move the 
character makes there should be a 15% chance that the user's Strength 
is incremented by 1. When the user presses a button, save the score back 
to the server in a folder set aside for that user. 

You should read and write the JSON using the jQuery ajax method.

References:

* See JsObjects/JavaScript/NodeCode/SimpleReadWriteJson
* See JsObjects/JavaScript/NodeCode/PresidentJson
* See JsObjects/JavaScript/NodeCode/jsonRead

Main Character Test Page
------------------------

As we start adding functionality to our program, we need to be sure
our program remains modular, and is easy to test. In particular, if you
have several big pieces inside one huge program, it can quickly become
very hard to get an overview of the whole program. 

One way to simplify complexity is called the "divide and conquer 
strategy." To implement this strategy we break the program out into 
modules that can be tested separately. In our case, we want three 
separate views of our program:

* A view that tests the drawing of the grid and moving the main 
character. This is the week 3 assignment.
* A view that tests the scoring
* A view that combines both the drawing of the grid and the scoring.

The latter, view, of course, is the full program. Our goal, however, is
to create smaller test programs that can focus on each of the parts 
of the program. The point is that it is relatively easy to understand
each of the small programs, even if it is hard to understand the whole
program. Furthermore, we are ensuring that we create a modular program
that does not have too many cross dependencies. Every time one part of
a program depends on another part of the program you have two problems:

* It is hard to see how any one part works, because understanding it 
requires understanding two separate pieces.
* A change to one part of the program can break some other part of the 
program. If Part A does not work, but the problem is in Part B, it can be
hard to trace the error from Part A back to Part B.

Your goal, then, is to create three HTML files:

* TestGrid.html
* TestScoring.html
* GridGame.html

The first tests the grid and only the grid. The second tests the scoring
and only the scoring. The third shows the whole game working together.


References:

* See JsObjects/HandlebarDemos/Example09

The Test Scoring File
---------------------

Below you can see a screen shot showing one possible way to set up 
your TestScoring.html file. On the left you see the Hero's stats,
on the right you see the Orc's stats.

![Test Scoring Screen](../Images/TestScore01.png)

When the user presses the **Strike** button the Hero enters into 
conflict with the Orc. The following calculation is performed:

* A random number between 1 and 100 is chosen.
* A **bonus** value is calculated. The bonus is equal to the hero's 
**Exprience** plus the hero's **Strength**.
* If the random number plus the **bonus** are greater than 50, then
Orc's Health is decremented by 1 point, and the Hero should have a 25%
chance of gaining an **Experience** point.

After the calculation is made, you should redisplay the values for
both the Orc and the Hero. The Orc should start with some
positive Health score, such as 5.

You should also display at least some data about the outcome of the 
conflict. In the screenshot above, I display the output from the
random roll. You should provide additional information such as:

* The bonus score
* Did the Orc lose health? 
* Did the Hero gain experience?

You should also add a button allowing the user to save the scores 
back to the server. The saved file should not overwrite the original 
files Hero and Orc character files that you loaded. In particular, 
the saved file should be saved into a directory called **SavedGames**.

Random Numbers
--------------

Here is JavaScript code that simulates the rolling of one 6 sided die:

	var randomNumber = Math.floor(Math.random() * 6) + 1;
	
If this returns a number between 1 and 6, it should not be hard to convert
it to return a number between 1 and 100.

After Loggin In
---------------

So we should start creating directories for each user? Be able
to log in as one user, see your current score, then log in as another user,
and track the score of that user?
