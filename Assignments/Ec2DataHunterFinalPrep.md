---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Ec2DataHunterFinalPrep.md
relativePath: Assignments/Ec2DataHunterFinalPrep.md
title: Ec2DataHunterFinalPrep
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: Ec2DataHunterFinalPrep.md
fileNameHTML: Ec2DataHunterFinalPrep.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Get **DataHunter** and **DataMaster** working on EC2. Run:

- DataHunter on 30025
- DataMaster on 30026

## Install Couch

We will run CouchDb on the same EC2 instance where we run our applications.

We may need to open up port 5984

## Test Your Work

Pick a version of the game that does not use the database. For instance, three-floor. Get it up and running.

Once you have that working, then stop it, and if you used **systemd** disable it, and try to get **DataHunter** and **DataMaster** working on EC2.

## Turn it in

The main goal of this assignment is to give you a practice session for the final. Therefore I'm most concerned that you simply have working code in your repository. However, getting a chance to start working on the **systemd** part of the final is not necessarily beyond the scope of this assignment. Therefore you:

- Must check in your working and tested code in your repository
- Might also want to give me URLs to your programs running under **systemd** on EC2 so that we can check that out before the final is due.
