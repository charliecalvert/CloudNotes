## Overview

The main goal is to create properly working versions of:

- **GitExplorer**
- **FirebaseGitExplorer**
  - Your Firebase code should be deployed to Firebase Hosting

**NOTE**: _If your final programs are still called something like **week03-rest-basics** or **week09-FirebaseStarter**, be sure to copy or rename them to the names shown above._

I'll also be looking at:

- ESLint
- Prettier
- Tests and coverage


## Permissions

I need to have permissions to run your projects with **firebase serve**.  Here is the page that explains the simple steps to add me as an **Editor:**

- [https://support.google.com/firebase/answer/7000272?hl=en](https://support.google.com/firebase/answer/7000272?hl=en)

Please add the same address you use to contact me on hangouts and make me an **Editor** on your project.

## Port 30025

It's easier for me for various reasons if your Firebase app starts on Port 30025 when we use **firebase serve**. The command to do that is:

    firebase serve --port 30025

Create a file called **go** in the root of your Firebase project. Put the following content in it:

    #! /usr/bin/env bash

    firebase serve --port=30025

Make sure that **go** is executable:

    chmod +x go

Be sure to push your work.

## Turn it in

Be sure to include the Firebase Hosting address to which you have deployed your Firebase app.

State the names of directories where you deployed your code. I'm expecting to see:

- AddressMaven
- FirebaseAddressMaven
- The branch if relevant. Even if you use branches, your final code should also be merged into **master**

Before your final push run **./prettier** and **eslint .** and make sure they come back clean.

After your final push tag your work and give me the tag.
