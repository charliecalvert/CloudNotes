---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/NodeModulesAssignment.md
relativePath: Assignments/NodeModulesAssignment.md
title: NodeModulesAssignment
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: NodeModulesAssignment.md
fileNameHTML: NodeModulesAssignment.html
---


<!-- toc -->
<!-- tocstop -->

Node Modules Assignment
===========

Examine the [NodeModules](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeModules) program in JsObjects.

Create a program of your own with three modules and one file that uses
them. These might not be the exact names that you use for your modules,
but here is the file structor I want you to follow:

- Module01
- Library/Module02
- Public/Module03
- Server.js

The file called **Server.js** uses the other three modules. Place your
project in a folder called **Week06-NodeModules**.

If your code for this course were in a folder called **/Source/Prog272**, then
the file structure would look like this:

	/Source/Prog272/Week06-NodeModules/Server.js
	/Source/Prog272/Week06-NodeModules/Library
	/Source/Prog272/Week06-NodeModules/Public
	etc...

- In **Module01** export methods that add, multiply and subtract two whole numbers. 
- In **Module02** export a method that will convert feetToMiles.
- In **Module03** use the Modular pattern and expoert a method that takes a single whole number and returns its square.

Don't call your files **Module01**, instead, invent an appropriate 
name for your module. The output from all the exported function 
should be visible after they are called from **Server.js**.

One of the goals of this exercise is to help you understand how to access
files placed in various different locations in an express application.
To understand more about this subject, read here, or reseach the subject
on the web:

- [app use](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#using-a-directory-with-app.use)

You can display all your output using **console.log**. There is no need
for client side code.

In this exercise, unit tests are optional.

Be sure to:

- Give reasonable neames to the modules, methods and variables you create
- Pay attention to indentation
- Pay attention to the parameters you pass and the names you give them
- Feel free to add **console.log()** calls in your modules to help with
debugging, but be sure to show the output from the calls in **Server.js**.

When you are done, check in your code to Git and provide the URL of your
repository when you submit the assignment.

