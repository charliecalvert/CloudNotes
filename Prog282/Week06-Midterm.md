---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week06-Midterm.md
relativePath: Prog282/Week06-Midterm.md
title: Week06-Midterm
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week06-Midterm.md
fileNameHTML: Week06-Midterm.html
---


<!-- toc -->
<!-- tocstop -->

Prog 282 - Midterm
------------------

The midterm is your chance to show me what you've learned. In 
general, the instructions are simple:

* Develop your game to the most advanced point possible. 
* Create a document called **Week06-Midterm** in your shared folder on 
Google Drive. In that document, describe what you have done.

Turning in the Assignment
-------------------------

Check your work into our Prog282-LastName GIT repository in a folder called 
**Week06-Midterm**. 

You don't have to do anything to alert me to the presence of your 
Google doc. I will simply go to the appropriate folder and read your 
document. Make sure I have write access to your folder.

Details
-------

This is your chance to show me what you have learned. Focus on doing something
fancy in the areas that you understand. It may make more sense for you to do
lots of work with some portion of the course that you really understand, rather
than struggling to learn some new concept that does not yet make sense to you.

If you are want more direction, or if you are an advanced student who wants to
demonstrate your complete knowledge of the material we have covered, include 
the following in your program:

* A 2D background grid with 2 or more different tiles displayed.
* A Hero who can be moved around the grid with the arrow keys
* The Hero should not be able to walk off the grid. Define one or more tiles on 
the 2D grid on which the Hero cannot walk.
* Define a set of 3 or more NPC characters with whom the Hero can interact
as it moves around the grid.
* The Hero should be able to interact with the NPCs either in a competition or
in a conversation. Ideally the main canvas should change to show a different scene
when the Hero competes or converses with an NPC. Your character need not both
converse and compete, either one is fine. We have focused so far mostly on
competition, so conversations would be an advanced, extra feature.
* You should be able to read and write sets of traits (JSON files with multiple
properties) and associate these traits with the Hero and NPCs.
* The Hero and the NPCs should have JavaScript objects associated with them. In
these objects, or somewhere else in your code, demonstrate your ability to use
**Object.defineProperty** to add properties to your objects. (You can use 
regular methods called getProp and setProp for most of your properties,
if you so wish, but you should have at least one working call to 
**Object.defineProperty** somewhere in your code.
* Provide unit tests for each of the public methods in your objects.
* Private a button in your game that links to your unit tests.
* Provide an example of inheritance.
* Provide another button that brings up subset of your code, per the **testConflicts**
code from Prog282-Tips/CanvasGrid03.
* Have at least one example of using HTML templates
* Hide and show various sections of your HTML so that you can make good use
of existing real estate.
* Use CSS to change the appearance of your HTML.
* Divide your game up into modules. Each module should have one, and only one, task.
* Provide a link to your game running on AWS via UpStart. 
* Advanced capability 1: Save the entire state of the game and restart from the
saved state
* Advanced capability 2: Have multiple levels. The Hero can move to a special 
square in the Grid, and then be *beamed up* to a new level with a new grid
configuration.
* Advanced capabilities 3 to n: Add new features that you like. Be sure to 
document them in your Google Drive file so that I will know to look for them.

Perhaps no one in the class will be able to complete all the steps outlined 
above. Some of you might complete most of them, but opt to omit others, and
then perhaps add new features that you want in your game but that I have not
listed above.

Others of you might feel that some, or perhaps most of what I have 
shown above is too complicated for you. In particular, you might be 
struggling with JavaScript. If that is the case, then concentrate on 
areas that you do understand. For instance, you might be good at 
manipulating your interface by hiding and showing HTML (jQuery 
skills), and you might have a talent for working with templates. In 
that case, you might bring up a basic grid and show that the user 
can move the character around a bit. But that might be all you do 
with the game. For the rest of your exam, you might want to focus on 
creating buttons or links in your game interface that show you know 
how to serve up lots of HTML with templates. As the various files 
appear, you might show and hide other elements of your game as you 
deem necessary. Perhaps you will use the jQuery load command to load 
HTML files into HTML elements on your main page. Or maybe you want 
to go further and show that you know how to work with json and or 
Express (Ajax).

Git and AWS have also played a big role in the learning process for many 
students. Perhaps you feel that you only understand the basics about the 
game, HTML and jQuery tools. But one thing you have mastered is Git. In that 
case, you might want to clean up your repository. Create folders called 
Week01, Week02, Week03, etc. Put appropriate content in each folder. Add 
**README.md** files. (Learn about Markdown, it is easy!) Bring the code in each 
folder up to date so that you can show me a great implemention of at least some 
of the early assignments.

Whatever you do, be sure you document it carefully in Google Docs. Describe 
what you have done, how I can see it, how long it took, and why you decided to
take some particular approach to completing the midterm. If you think you 
completed all the pieces listed above, be sure to tell me. If you decided to
focus on HTML and jQuery, explain exactly what you did and why.

Three warnings:

* By this time in the quarter I know more than you might 
think about your study habits, experience level, and abilities. I have a pretty
good idea of what most of you can do, and I expect to see an exam that 
demonstrates your strengths. If you work hard and show me that you have a good
understanding of at least a few important subjects that we have covered, then
you will do okay.
* Midterms are stress time. Everyone feels the stress when they are 
working on an assignment worth nearly 1/3 of their grade. Don't 
focus on the stress, focus on the assignment! Figure out what you 
want to do, and go do it. If you are struck by the urge to push for 
change in our classroom or at BC, then make a note of your 
suggestion -- '*we should switch from the computer to the abacus*', 
and then get back to work as quickly as possible. If you notice that 
you have just spent the last half hour stressing out on some 
pressing issue, then perhaps it is time to take a walk. Go for a 
walk, enjoy the rain or sunshine, and then get back to work! When 
you are done with the exam, then you can revisit your list of 
suggestions once you have time to focus on extraneous topics. (*Computers 
and the Fall of the West: Reversing our Moral Decline by using the 
Abacus and Slide Rule.*)
* This is an open book exam. You can use the web, use your books, use the 
discussion area. So long as you don't post code that provides other students 
with answers, you can ask or answer pretty much any question you want in the 
discussion erea -- within reason. If you notice that I have made a mistake, 
or if you want me to clarify some issue, or if you just want me to 
provide additional information, use the discussion area or some other 
technique (carrier pigeons?) and let me know as soon as possible. Anyone who 
discovers some reason why they can't complete the exam the night before it is 
due is unlikely to be happy with the outcome. Look for show stoppers right now,
and let me know about them immediately. 

Do the best you can to sum up what you have learned so far. Over the next
weeks you will find that the focus of the course will shift from JavaScript,
HTML, and CSS to databases, virtual machines, and cloud technologies.
