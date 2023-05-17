---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Express/SimpleFetch.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Express
fileName: SimpleFetch.md
relativePath: /Express/SimpleFetch.md
title: SimpleFetch
directoryName: Express
category : express-guide
---

## Overview

Everyone must understand routes to do well in this class.

## Project

Here is an assignment to show me that you are up to speed:

- At the root of your repository, run:
  - **CreateExpressProject fetch1-routes**
  - **cd fetch-routes**
- In **routes/index.js** implement three routes:
  - One that returns { "result" : "route01"}
  - One that returns { "result" : "route02"}
  - One that returns { "result" : "route03"}
- In **index.pug** define three buttons that have the labels:
  - Route01, Route02, Route03
- In **control.js** write code so that the button called
  - **Route01** uses **fetch** to call **/route01**
  - **Route02** uses **fetch** to call **/route02**
  - **Route03** uses **fetch** to call **/route03**
 - Each button should display the result in a **PRE** tag.

 By this time, fetch should just be built into the JavaScript implementation for all major browsers, so you probably don't need to run: **npm install whatwg-fetch**.

## Turn it in

Push your work and specify:

- repository
- branch
- directory

## Note

You don't have to use Redux or React or anything specific, just make it work!
