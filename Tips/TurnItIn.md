---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Tips/TurnItIn.md
relativePath: Tips/TurnItIn.md
title: TurnItIn
queryPath: Tips/
subject: Tips
fileNameMarkdown: TurnItIn.md
fileNameHTML: TurnItIn.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Some tips on turning in Assignments.

## Basics

I will usually want to see the following:

- **The URL of your GitHub repository**. For instance: **https://github.com/charliecalvert/JsObjects**
- **Branch**. In the **Turn it in** section of an assignment I will usually specify a branch. If I don't, just tell me what branch you did work on. If you don't understand branches yet, and don't know what to supply, put in **master**.
- **Folder**: The directory your work is in. Usually something like **week02-name-of-assignment**
- **Tag**: As described below

Even if I don't mention these things in the **Turn it in** section of an assignment, you must do them.

## Git Tag

After you commit and push, tag your commit like this:

    git tag -a vX.X.X -m "<SOME_STRING_CHARLIE_GIVES_YOU>"
    git push origin vX.X.X

Where **vX.X.X** is some version number of your choosing. For instance, **v1.0.1**. Each tag should have a unique version number. Your tag can have more in the string **SOME_STRING_CHARLIE_GIVES_YOU**, but it must have at least that much. If I don't give you a string, include the name of the assignment exactly as it appears on the Canvas home page.

View tags:

    git tag -l -n1

If you have hot yet pushed your tags, you can delete them fairly easily:

    git tag -d vX.X.X

To learn more about tags see the [git tag documentation](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
