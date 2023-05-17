---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/PassportDataMaster.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: PassportDataMaster.md
relativePath: /PassportDataMaster.md
title: PassportDataMaster
directoryName: Assignments
category : assignments-guide
---

## Overview

Refactor **DataMaster** and implement Passport sign in for Facebook and Google.

## Refactor

Create two folders and move the appropriate files into it:

<pre>
- controllers
  - name-controller.js
  - query-controller.js
  - read-controller.js
- route-provider
  - route.js
  - run-query.js

Make the appropriate changes to be sure these files are still being loaded. Check to make sure your application still works.

## Passport

Copy the **google-auth.js** and **passport.js** files to the **DataMaster** routes directory. More the Passport, Google and Facebook specific code from **routes/index.js** from the Passport program to **DataMaster**.

Use _meld_ to help you merge in any changes to **app.js** that you will need to help you initialize passport and load **google-auth.js** and **passport.js**.

If you don't have it already, add in support for _bootstrap_ in **bower.json** and **main.js**. Don't forget to load **bootstrap.min.css** in **layout.jade** and the corresponding JavaScript file in **main.js**.

**NOTE**: _You've probably noticed that I'm becoming increasingly abstract when giving some of these instructions as the quarter roles on. When the class is over, you are going to have to do things like this without explicit directions. The implication, I suppose, is that you should be able to do these things without a reference, or you should be able to easily find the reference in your notes or in my previous assignments. One advantage to taking notes in markdown and saving them to disk is that you can easily grep across them to find keywords..._

You will also need to use NPM to load a few packages. Here are two:

```bash
npm install express-session passport --save
```



What else needs to be installed? Look back at the previous assignment and find out what is missing, or else simply learn by trial and error.

## Set Environment

We could make a really long **start** property in package.json, but it is probably better to actually create a file called **set-env** and put our environment variables in it:

```text
export DEBUG=DataMaster
export CLIENT_ID=<YOUR CLIENT ID>
export CLIENT_SECRET=<YOUR CLIENT SECRET>
```

You should of, course, put your **CLIENT_ID** and your **CLIENT_SECRET** in place of the prompts shown above. Something like this:

  export CLIENT_ID=1234

When you are done, load the file: **source set-env**. Then check your work:

```bash
echo $CLIENT_ID
echo $CLIENT_SECRET
```

You should see your Client ID and your Client Secret. This is safe because the file is on the server and will not be seen by visitors to your site. You might, however, want to lock this file down with draconian permissions (chmod 400) to make sure that no one can edit it and only you can read it.

For now, I would like you to place the **set-env** file in your repository. Be sure, however, that you are using a private repository! If you decide, in the future, to make this a public repository, then be sure to change your Client Secret on the Facebook web site.
