---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MongoLabBasics.md
relativePath: Assignments/MongoLabBasics.md
title: MongoLabBasics
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: MongoLabBasics.md
fileNameHTML: MongoLabBasics.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

MongoLab Basics

## Step One

Create an account on [MongoLab](https://mongolab.com/).

**NOTE**: *When you create your MongoLab account, you may give them a user name and password. These are not the username and password that your programs will use to access your database. The credentials for accessing your database need to be set up separately in another step.*

## Step Two

If you don't have one already, or if one is not created for you automatically, create a database. Go to the page associated with that database. Near the top, notice information like this:

```
To connect using the mongo shell:
  mongo ds049848.mongolab.com:49848/elvenlab01 -u <dbuser> -p <dbpassword>
To connect using a driver via the standard MongoDB URI (what's this?):
  mongodb://<dbuser>:<dbpassword>@ds049848.mongolab.com:49848/elvenlab01
```

You care about the second of these two statements. In particular, you care about the URL that looks like this:

```
mongodb://<dbuser>:<dbpassword>@ds049848.mongolab.com:49848/elvenlab01
```

## Step Three

Click on **Users**. Click on **Add Database User**. Add a database user. These are the credentials you will use to access your database.

Suppose your user name was **foo** and your password was **bar**. Here is how to compose a URL to use in your code to access your database:

```
mongodb://foo:bar@ds049848.mongolab.com:49848/elvenlab01
```

Of course the database name and the numbers will be different in your case, but the basic rhythm of the URL is the same.

## Turn it in.

Two screen shots:

- One showing your database, displaying the page the shows your URL and mongo shell access command. Like the one I show above.
- The second screen shot should show that you have created a user.
