Information Manager Part01
==========================

For the next few weeks, at least, we shall be working on
creating an **Information Manager** (for lack of a better
term) that can be displayed on mobile devices.

Some of the goals

- Place data on a server
- Create a single page PhoneGap app.
- All the user to display various information in the app.

For instance:

- On server a list of Presidents, their dates, and information about their lives.
- Allow the user to pick a president
- Display an overview of the President's life
- All the user to see details about the President such as spouse, date of birth, etc.

Or:

- Store information about some technical area, such jQuery or JavaScript objects
- All the user to find out what subjects you have stored
- Allow them to drill down into that information

Exactly what type of information you store will be up to you. You
can pick any subject that interests you. If you don't have any
subject you want to pursue, then US Presidents can be a default
value.

Server Side
-----------

Information can, and probably will, be stored in various
ways:

- On MongoDb at MongoLab
- On MongoDb in a Linux instance on VirtualBox and/or EC2.
- In S3
- As raw JSON files on S3 or a Linux instance
- At raw JSON on your local machine
- On Freebase
- And so on

Even if we store data on MongoLab, Freebase or S3, we will likely 
have a Node server with Exress to help us manage users and provide
other services. We may also do some work with an Apache Server.

Client Side
-----------

We be using various technologies, including:

- jQuery
- Angular
- RequireJs
- Various templating engines such as mustache, jade, handlebars, etc.
- CSS rendering with **Less** or similar tools.

And of course we will be learning about Ajax and sending database 
requests.

- [Templating Engines](http://engineering.linkedin.com/frontend/client-side-templating-throwdown-mustache-handlebars-dustjs-and-more)

TDD and Unit Tests
----------

We will be testing everything we do on the client and the server .
We will be following a **test first** philosophy, so that we will
write tests first, and then implement our code.

Week04 Assignment
-----------------

Your assignment for this week involves learning how to use jQuery to

- Change the content of a web page
- Make Ajax queries
- Insert HTML retrieved from the server or some other source into an existing page.

Details to follow, but the core deliverable will be a Cordova application
that can do the three things described above. You will submit the code
via GitHub.
