Week01
======

- [Go Back to the CloudNotes index](../CloudNotes.html)

Our main goal this week:

- Welcome and Introductions
- [Syllabus](http://bit.ly/1b3qsB7)
- JavaScript Basics
- [Canvas: Announcements, Modules, Discussions](http://bit.ly/V6JECq)
- Google Drive: Everyone needs an account
- [Git](http://bit.ly/1b3r61o)
- Node

Decks
-----

- [Week01 Day 01 Deck](http://bit.ly/1gNIiFm)
- [Week01 Day 02 Deck](http://bit.ly/1b3qfOf)

JavaScript
----------

- [JavaScript Basics](http://bit.ly/OPDg3s)
- [JavaScript Basics on Elvenware](http://bit.ly/1gNAweH)

Programs
--------

We should take a look at a few of the programs found here:

- [Syntax](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax)
- [Objects](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Objects)


Node
----
- [Download Node](http://nodejs.org/)
- [Node on Elvenware](http://elvenware.com/charlie/development/web/JavaScript/NodeJs.html)
- [JumpStart on 24X7](http://library.books24x7.com.ezproxy.bellevuecollege.edu/toc.aspx?bkid=50176)
- [Smashing Node](http://library.books24x7.com.ezproxy.bellevuecollege.edu/toc.aspx?bookid=45126)
- [Pro Node](http://library.books24x7.com.ezproxy.bellevuecollege.edu/toc.aspx?bookid=46610)

CloudApps
---------

Everyone should have an account on:

- GitHub and or BitBucket
- [Google Drive](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#googleDocs)
- [Evernote](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#evernote)
- DropBox
- [SkyDrive](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html#microsoftSkyDrive)
- Codecademy
- AWS (But not yet)

- [Android Applications](http://www.elvenware.com/charlie/os/Android/AndroidApplications.html)
- [Git](http://www.elvenware.com/charlie/development/cloud/Git.html)
- [DropBox Half Formed Notes](http://www.elvenware.com/charlie/development/cloud/DropBox.html)
- [Git Video](http://youtu.be/p1obmWF6Nks)
- [Google Docs Video](http://youtu.be/NMkTz3Rvgfo)
- [Skydrive Video](http://youtu.be/gMACtVIEV0A)

Assignment
----------

###Basic Types

- Read in an arbitrary JSON file containing a JavaScript object
- Use a loop to iterate over the property and report the types
- Basic: Just use node and console.log to report results
- Advanced: Use HTML, jQuery and Ajax to report results  on web page

Code to read in a JSON file can be found here:

- <http://elvenware.com/charlie/development/web/JavaScript/JsonBasics.html>

Your next step will be able to iterate over the members of that 
object with a for loop.  

Given a JSON object that looks like this:

~~~~
{
    "a": 25,
    "b": 12,
	"bar": "Fine",
	"Foo": false
}
~~~~

The program should be able to use a **for in** loop to iterate over 
the object that you read created when you read in your JSON file. 
With a single line in your **for** loop you should be able to 
dynamically create output that looks like this:

~~~~
a : number
b : number
bar : string
Foo : boolean
~~~~

A key point to grasp is that we use **for in** loops to iterate over
objects, and we use a classic **for** loop to iterate over arrays. By
a "classic for loop" I mean something that looks like this:

~~~~
for (var i = 0; i < 2; i++) {
}
~~~~

A **for in** loop looks like this:

~~~~
for (aProperty in someObject) {
}
~~~~

Remember that there are two ways to access the properties of a JavaScript
object:

~~~~
myObject.myProperty
myObject["myProperty"]
~~~~

In this assignment, one of these two methods will prove invaluable.

This secondary source of information might also be of interest:

- <http://elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#getJSON>

###Code Academy

- [Go to Web Fundamentals](http://www.codecademy.com/tracks/web)
- Complete *HTML Basics* and *Build Your own Web Page*
- [Go to JavaScript](http://www.codecademy.com/tracks/javascript)
- Complete *Getting Started with Programming*

###Video

- Let's watch some Google IO. 
- [Instant Mobile WebSites](https://developers.google.com/events/io/sessions/325128936)
- The video is about 37 minutes.
- Ultimately there will be a quiz of some kind to confirm that you watched it.

