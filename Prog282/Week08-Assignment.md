Week08 - Assignment
===================

Useful links:

- <http://elvenware.com/charlie/books/CloudNotes/Prog282/Week08.html>
- <http://elvenware.com/charlie/books/CloudNotes/CloudNotes.html>

We are going to continue working with our CanvasGrid projects from the 
Midterm. The overall goal this week is to start moving all your data, 
and at least some of your documents, into CouchDb.

You can continue to store some, or even a majority, of your documents 
and data in subdirectories of your node server. Your goal will be to 
start moving at least some pieces of your project into a database.

CouchDb stores JSON natively. So anything that you have been sending
back and forth from the server using JSON is a likely candidate to
move into CouchDb. You can also store HTML, CSS and bitmaps in CouchDb
as attachments.

Demos showing how to read and write JSON to CouchDB:

- JsObjects/Data/CouchDb08
- JsObjects/Data/CouchDb09
- JsObjects/Data/CouchDb10

Demos showing how to read and write attachments, and some advanced
error handling:

- JsObjects/Data/CouchDb11
- JSoBjects/Data/CouchDb12

Specific goals that you want to achieve for Week08:
 
- Read the grid from CouchDb
- Read (and optionally write) statistics associated with your NPCs from CouchDb
- When you encounter an NPC, query CouchDb so you can read and display HTML associated with the NPC
- Work on Error Handling. When errors occur in Node, try to bubble them up to the Client HTML.

If you are creating Document centric projects that are focused mostly
on working with HTML, then you should focus on:

- Storing entire HTML files, and partial HTML files in CouchDb 
- Using Ajax to call into Express, retrieve the HTML, and display it in your files
- See if you can do a little templating with Handlebars
- Create nice effects with CSS and jQuery
- Focus on the CouchDb11 and CouchDb12 examples

We have no class on Tuesday. Take some time off, but also check for 
updates. It is your responsibility to check for updates or 
clarifications to this assignment. I suggest checking every day, but 
if that is not practical, check when you can. Saying: "I never saw 
the update is not enough."

More details coming soon...
