# Gist Markdown Manager

This program is designed to work with GitHub gists. It should allow a user to manage a list of Gists that can be inserted into markdown documents.

The goal is to have you craft your own program that does something useful.

You have between now and the end of the quarter to complete this project.

## Features

- List User Gists
- Insert a new gist based on a file or text in a text area.
- Working from a list of gists the user should be able to
  - Delete a gist
  - Read a file from disk and use it to update a gist
  - Read a gist and write it to disk as a file
  - Read a gist and insert it into a markdown document at a specified location
- At least some features should work on a phone
  - List gists
  - Delete a gist
  - Select a user
  - Read a particular gist and display it.
- Use Micro Services
  - Divide the app up into about five separate serivices
  - Start the main app and the services with a single call
- Use Redux to handle data
  - Use **connect**
  - Implement **mapStateToProps** and **mapDispatchToProps** for X number of controls (Exact number to be decided)
  - Use **Provider** and create store in **index.js**
- Use DataMaven to launch our various components
- Heroku support

## Heroku Support

This will be covered Tuesday. It is not hard. If you want, create an account on Heroku ahead of time so you can skip that step on Tuesday.

- Run **npm run build** from the client folder to create a directory called **build**
  - Copy the contents of the newly created **build** folder into the public folder of the server
  - Point the default route in **routes/index.js** at the **index.html** file now found in the **public** directory.
  - Deploy this project to Heroku

## Minor Issues

- On the **Get User** page, be sure that the button to query the server is at the top of the page, not the bottom.
- Make some of the links you get back from GitHub into live hyper-links that when clicked take you to a page on GitHub or published by GitHub.
  - The goal is to try to make the application useful
- Create your own favicon. (You could, for instance, just take my favicon.png and put your own images or data in it.)
- If you are not using them, remove unused items from the menu, such as the DropDown, or the bits on the far right.
  - Or maybe use the dropdown. Your call.

## Extra Credit

- Pick from a hard-coded list of users
  - Suppose you have a set of favorite repositories that you like to visit.
  - Allow the user to pick from these repositories and see information about them
  - This would not, obviously, include the ability to create Gists, but perhaps to view them

**NOTE**: _This was part of what I would like to see this app do, but it is not something that I think is practical for most of us in the short time we have left._

## EsLint

Get EsLint working. Not all your files have to pass it, but at least get it installed. That is, at least inset the **eslintrc** into your project.

- The [EsLint Assignment][eslint]

[eslint]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactEsLint.html

## Possible Features

- Pull and push gists
- Deploy to EC2
- Save meta information about the gists to a database
- Create a React Native Version

## Turn it in