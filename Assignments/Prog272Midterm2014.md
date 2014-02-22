# Prog 272 Midterm 2014

This document describes the Winter 2014 midterm for Prog 272.

## Overview

Insert the entire contents of **Shakespeare.json** (Shakespeare's 
154 Sonnets) into a MongoDb collection called **Poems**. 

Your program must be able to do several things:

- Display a list of all poems to the user
- Let the user pick a poem and display it
- Let the user search on keywords associated with the poems and display
the results in the form of titles. When a title is selected display
the poem.
- Store a new poem in the database. The poem can be stored as JSON on
the drive
- Delete a poem from the database.

Extra credit: 

- Read in a config listed in JSON

When the program comes up you should just display HTML with a series
of buttons on it. Pick one of the buttons to read in a list of poems,
select a poem, etc. 

## The Documents

The documents you store in the database should have at least four fields:

- A title of type string (ie "Sonnet 1")
- An authoor type string (ie "Shakespeare")
- A list of keywords of type array (ie ["poem", "sonnet", "spring" ].
The keywords for most poems can just be **poem** and **sonnet**, but
you should prepare a few special keywords that can be searched on 
such as **spring**, **winter**, or **time**.
- The content of the poem.

The Shakespeare.json file has two fields, so you will have to use 
search and replace to add the new fields. I suggest doing the work
of adding new fields in Notepad++.

You should run **grunt jshint** across your files and confirm that
all the JS files come back clean. Have it set up so that I can
just run grunt jshint and get back a **result.xml** file that
is clean.

## Formats

The program should run as web app and inside a Cordova app.

The data should be stored both in your local linux database and in
MongoLab.

It is **essential** that the copies of your Cordova and Web project 
should have unique names when loaded in Eclipse. I will not accept a 
project with a name like **HelloWorld**. The web project should be 
called **MidtermWeb-LastName**, and the mobile app should be called 
**MidtermCordova_LastName**, where LastName is your last name. 

## Turn it In

Put your code for both projects in a folder and commit the code to a 
folder in your repository called **Week07-Midterm**. Submit a URL that
points at your folder on GitHub.

When you turn it in, it should connect automatically to MongoLab.

In the root of the **Week07-Midterm** folder include screen shots of 
the web app working on your linux box. Also include a screenshot of 
the Cordova program running on your phone or on an Androidx86 or 
similar virtual device.

I have not yet decided about unit tests. Please check back later.

## Notes

RegEx: Sonnet\s(\d+)
