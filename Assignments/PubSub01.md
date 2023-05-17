---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/PubSub01.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: PubSub01.md
relativePath: /PubSub01.md
title: PubSub01
directoryName: Assignments
category : assignments-guide
---

# PubSub

Create a project with two modules, one called **Calculate.js** and
one called **CalculateUi.js**. In **CalculateUi** define at least three 
methods:

- add
- multiply
- subtract

Place three buttons on your HTML file, Add two input controls and a 
paragraph element. The first input control should have a default 
value of 3, or some other integer. The second should have a default 
value of 2, or some other integer. When the user clicks the first 
button, **add** is called, etc.

The add method first gathers the user input. It should then publish 
a request for an object that can add the two numbers. It should pass 
both numbers in the request. It should also provide a means for any 
subscriber to send back an answer.

Create a second module that subscribes to the published messages from
the **add**, **multiple** and **subtract** methods. The second module
should include at least three methods that can **add** etc. They should
return an appropriate value to the publisher in response to clicks on
the buttons.

The only link between the two modules will be the publish subscribe
methods. Create the two modules in the document ready method:

$(document).ready(function() {
	// Create publisher
	// Create subscriber
}

When you are done, use Git to submit your work in a folder called
**Week09PubSub**.
