---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/InfoManager01.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: InfoManager01.md
relativePath: /InfoManager01.md
title: InfoManager01
directoryName: Assignments
category : assignments-guide
---

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

- Change the content of a Cordova web page
- Make Ajax queries (load, getJSON)
- Insert HTML and JSON retrieved from the file system into your web page.

The core deliverable will be a Cordova application and accompanying 
unit tests that can do the three things described above. The unit 
tests run in your browser, not in the Cordova app. You will submit 
the code via GitHub.

###Part01

- Use jQuery [load](http://api.jquery.com/load/) to load an HTML page called **Sources.html**
- Include at least three paragraphs in **Sources.html**
- Give the paragraphs ids: **paragraph01**, **paragraph02**, **paragraph03**
- In your Cordova HTML file (**index.html**) create a **div** with an id of **div01**.
- Place three buttons on **index.html** with the ids **buttonHtml01**, etc
- When the user clicks **button01** insert the contents of **paragraph01** from **Sources.html** into **div01**. 
- When button02 is selected, put **paragraph02** into **div01**, etc.
- Remember, **paragraph0X** will be in **Sources.html** and **div01** is in **index.html**
- Include mock unit tests proving that your **load** requests work

###Part02

In the same Cordova app, we do the same sort of thing with the jQuery 
[getJson](http://api.jquery.com/jquery.getjson/) command.

- Use jQuery **getJSON** to load a list of at least three Presidents
- Include id, firstName, lastName in your JSON.
- Add three more buttons with the id's: **buttonJson01**, etc.
- When the user clicks the first JSON button, show the first president
- When the user clicks the second button, show the second president, etc.
- Display the data about the presidents in the three paragraphs 
defined in the previous section of this assignment. 
- Include mock unit tests proving that your **getJSON** requests work.

Sample Json:

```
[
    {
        "id": 1,
        "firstName": "George",
        "lastName": "Washington"
    }, {
        "id": 2,
        "firstName": "John",
        "lastName": "Adams"
    }, {
        "id": 3,
        "firstName": "Thomas",      
        "lastName": "Jefferson"
    }
]
```


- [Validate your Json](http://jsonlint.com/)
