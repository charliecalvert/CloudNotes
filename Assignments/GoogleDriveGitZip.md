---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/GoogleDriveGitZip.md
relativePath: Assignments/GoogleDriveGitZip.md
title: GoogleDriveGitZip
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: GoogleDriveGitZip.md
fileNameHTML: GoogleDriveGitZip.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The purpose of the **Google Drive, Git and Zip** assignment is to give everyone practice using:

- Zip files
- Google Drive
- Git

## Step One

Open the bash shell in Pristine Lubuntu. Navigate to your **Home** folder. Issue the following command:

```
zip Documents/GoogleDriveGitZip .bashrc .bash_aliases
```

This command creates a file called **~/Documents/GoogleDriveGitZip.zip**. It contains compressed versions of your **.bashrc** and **.bash_aliases** files.

After creating the compressed file, take a screen shot called **deflating.png** showing the results of issuing the above command.

**HINT**: *Your screen shot should contain, among other things, two instances of the word **adding** and two instances of the word **deflated**.*

## Step Two

Complete the following steps:

- Navigate to your repository.
- Create a folder called **Week07-GoogleDriveGitZip**.
- Navigate into that folder.

Unzip (inflate) the contents of your new zip file into this folder:

```
unzip ~/Documents/GoogleDriveGitZip.zip
```

After creating the folder, and decompressing your zip file, take a screen shot called **inflating.png** showing the results of issuing the above command.

**HINT**: *Your screen shot should contain, among other things, the word **Archive** and two instances of the word **inflating**.*

Inside this folder, create a file called **README.md** that contains the following text: "This folder contains two hidden files called **.bashrc** and **.bash_aliases**". I would prefer that the files names are set off with markdown syntax for bold text.

Add, commit and push your work.

## Step Three

Put your zip file and both screen shots on your Google Drive in a folder called **GoogleDriveGitZip**.

## Turn it in

Make sure your git repository contains your new folder and three files:

- .bashrc
- .bash_aliases
- README.md

Make sure your Google Drive contains a folder called **GoogleDriveGitZip** that contains:

- Your zip file
- Two screen shots

Then submit your assignment and attach (upload) both bitmaps to it.
