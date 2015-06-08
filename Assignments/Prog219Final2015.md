## Description

This is the final for Prog 219 taken June 2015. Many details are perhaps not filled in yet, but this should be enough to get you started.

The core goal is to create a web application that runs on AWS with **upstart** and links to a MongoDb database running on MongoLab.

## Overview

The final should be built with HTML, CSS, and JavaScript. It should  contain the following elements:

- Expressel
- Angular
- Bootstrap
- MongoDb and Mongoose
- Upstart ensuring your app stays up and running on AWS.
- Support of logging in users
- A bootstrap menu that folds into the Hamburger menu on a mobile device
- Support for multiple bootstrap themes

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


## Database

The following database features should be included

- Access to data on a MongoDb database with Mongoose
- SignIn with names stored on MongoDb with Mongoose
- The ability to edit the main fields of your document. There should be at least three main fields.
- The ability to add a list of subjects and store them in the database
- The ability to add comments and store them in the database as a sub-document

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




 