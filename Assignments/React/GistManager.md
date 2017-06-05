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

## Extra Credit

- Pick from a hard-coded list of users

## Possible Features

- Pull and push gists
- Deploy to EC2
- Save meta information about the gists to a database
- Create a React Native Version

## Turn it in
