---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Prog219Final2015.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: Prog219Final2015.md
relativePath: /Prog219Final2015.md
title: Prog219Final2015
directoryName: Assignments
category : assignments-guide
---

## Description

This is the final for Prog 219 taken June 2015. Many details are perhaps not filled in yet, but this should be enough to get you started.

The core goal is to create a web application that runs on AWS with **upstart** and links to a MongoDb database running on MongoLab.

## Overview

The final should be built with HTML, CSS, and JavaScript. It should  contain the following elements:

- Express
- Angular
- Bootstrap
- MongoDb and Mongoose
- Upstart ensuring your app stays up and running on AWS.
- Support of logging in users
- A bootstrap menu that folds into the Hamburger menu on a mobile device
- Support for multiple bootstrap themes
- Jasmine Unit Tests

## Pages

This should be a single page app with the following subpages:

- Home
- Edit Topics
- Subjects
- Comments
- About
- Login

Details:

- When the user navigates to the main page they should be able to click on a topic and see a document associated with it.
- On the edit page they should be able to edit an existing topic
- Subjects: Add and view topics
- Comments: Add, delete and edit comments

On all pages you should be able to see the name of the currently selected topic. For instance, here we can see the name of the selected scientist:

![Subjects Name](https://s3.amazonaws.com/bucket01.elvenware.com/images/Prog219-Final-2015-01.png)

On you main page, you might want to show a summary of all the data about a particular topic. Here you can see the bottom portion of the summary information for one scientist:

![Summary info](https://s3.amazonaws.com/bucket01.elvenware.com/images/Prog219-Final-2015-02.png)

All I want to see at this point is a login page. But ideally, in some later course, we would learn how to allow the user to see the home page, the about page and the login page, but to use the pages that provide the ability to edit data, one would have to be signed in. We are most of the way to getting that done, but we are just out of time.

It would be cool, I suppose, to have two levels of logging in: 

- One for adding comments
- One for *admin* privileges such as editing the data about the scientist


## Database

The following database features should be included

- Access to data on a MongoDb database with Mongoose
- SignIn with names stored on MongoDb with Mongoose
- The ability to edit the main fields of your document. There should be at least three main fields.
- The ability to add a list of subjects and store them in the database
- The ability to add comments and store them in the database as a sub-document

## Jasmine Unit Tests

These will be for extra credit only.

## Turn it in

Put the program itsefl in your repository in **Week11-Final**.

Provide a valid link to the place on AWS where you program is running with upstart. By default it will be: **<YOUR-ELASTIC-IP>:30027**. Just to be clear: it is important that you include specific information on how to find your program running on AWS. A valid link with the correct text in the anchor tag would be good.


## Extra Credit

There are several ways to get extra credit.

You can already view a document related to a topic. I want to you to be able to view documents related to each of the subjects associated with a topic. The point is that the user should be able to see an overview document on the home page and then drill into a series of subtopics on the **Subjects** page. 

Suppose your subject was scientists. The user should be able to:

- Navigate to the home page and view a document, defined as a Jade file, that is associated with a selected topic.
- Navigate to the Edit Topic page
    - Add, delete and edit topics
- Navigate to the subjects page
    - View, edit, add and delete a list of subjects
    - Click on subject and view a document related to that subject
- Add in the unit tests from the midterm. No need to have the "live" tests on the main page, but the one's from the **test** folder.

## Hints

Some hints

## REST Calls from Client to Database and Back {#rest-call}

Please see this information:

- Sending a [new comment][restreq] from the browser to the server to a database. 

[restreq]:http://elvenware.com/charlie/development/web/JavaScript/Angular.html#http


## Bootswatch in bower.json {#bootswatch}

One of your duties as a developer is to make sure that your code can be compiled and run by other developers. Don't leave mistakes in your code, or in **package.json**, or **bower.json**, that cause build errors. You should test the code that you check in, and make sure it builds.

In particular, in your bower file, don't write this:

    "bootswatch": "~3.3.4+1"

It causes an error when I type **bower install**. Instead, write this, where the tilde has been removed:

    "bootswatch": "3.3.4+1"

### Define Scientists

In subdocuments I redefined **models/scientists.js**. Some of that was probably not necessary and will only be confusing. For now, at least, let export only one Schema, but keep the updates to the **comment** schema:

```
var mongoose = require('mongoose');

var comment = mongoose.Schema({
    commentText: String,
    date: { type: Date, default: Date.now }
});

var scientistsSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "subject": String,
    "subjects": [String],
    comments: [comment]
});

module.exports = mongoose.model('scientist', scientistsSchema);
```

### upstart

There are a number of ways to solve this. One is:

- Create a **final.conf** in your final folder.
	- final.conf is same as midterm.conf but change the word midterm to final in the text of file itself
	- Look in file and change the line that begins with the word **exec**
- In bin/www set the port to 30027
	- We will also need to go to the AWS console and open up 30027
	- Go to AWS console. 
	- Select your running instance (in green) from Instances Menu
	- Check the name of the security group (launch-wizard-1)
	- Select **Security Groups** from the menu
	- Select your security group
	- Choose **Inbound | Edit | Add**
	- Open port 30027 and set the source to **Anywhere.**
- Copy final.conf to **/etc/init/final.conf**
	- sudo cp final.conf /etc/init/.
- Create a link to your final folder from the bin folder:

```
cd ~/bin
ln -s ~/Git/prog219-lastName/Week11-Final final;
```
 
When everything is set up, test your work:

	sudo start final
	
Then go to the appropriate URL and test your work. For problems, check
**/var/log/final.conf**.

## Jasmine and $httpBackend

I have added at least a little more text to my explanation of **$httpBackend**:

- <http://www.elvenware.com/charlie/development/web/JavaScript/Angular.html#mocking-objects-with-httpbackend>

Press F5 a few times to make sure you have the most recent copy if you are going back to that page after viewing it recently.

## SignIn

This video shows one way to handle the login functionality in your application. This is not the only possible solution. You can do it differently, but if you are not sure what is wanted, this gives you an idea of what to shoot for. 

- [https://youtu.be/xCmgU7iSYO4](https://youtu.be/xCmgU7iSYO4)

A working example of how to handle the SignIn program is in the following directory: 

- [JsObjects/JavaScript/Design/AngularSignIn](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/AngularSignIn "Angular Sign In on JsObjects")
