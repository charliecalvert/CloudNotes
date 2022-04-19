---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Express/SimpleFetch.md
relativePath: Assignments/Express/SimpleFetch.md
title: SimpleFetch
queryPath: Assignments/Express/
subject: Express
fileNameMarkdown: SimpleFetch.md
fileNameHTML: SimpleFetch.html
---


<!-- toc -->
<!-- tocstop -->

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
