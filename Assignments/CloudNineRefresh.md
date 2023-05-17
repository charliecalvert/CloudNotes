---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CloudNineRefresh.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: CloudNineRefresh.md
relativePath: /CloudNineRefresh.md
title: CloudNineRefresh
directoryName: Assignments
category : assignments-guide
---

## Overview

Create a fresh version of your Cloud 9 workspace. This may be necessary to ensure that mongo will run correctly on it. I was having trouble starting MongoDb in my original Cloud Nine workspace, perhaps because it was so full, perhaps because of some other reason. This exercise should ensure three things:

- That you are using the last possible amount of space on Cloud 9. For instance, I went from about 95% used to about 25% when performing this exercise.
- To ensure that the your Cloud 9 workspace is clean. The great advantage of virtual environments is that we can "start fresh", cleaning up any mistakes that may have crept into a previous workspace instance.
- Show you that you can create a new instance quickly and easily. After practicing it a few times, I found I could run through this exercise in well under 5 minutes.


**NOTE**: _Simple creating a new Node JS based workspace in Cloud Nine is enough to provide you with a workspace in which you can create node applications. I provide extra steps in this exercise because I like my environment configured in a particular manner. In particular, I want to ensure:_

- **JsObjects** has been cloned and is available to us
- We have set up customized **.bashrc** and **.bash_aliases** files.
  - This includes setting up our path and other environment variables
- We have a pre-configured **bin** directory with useful scripts in it.
- Have certain Npm global packages installed.

## Setup

Read the cloud nine setup steps from here:

- [Cloud Nine Setup Description (AutoSetup)][c9-auto]
- [Cloud Nine Setup Script][c9-setup]

[c9-auto]: http://www.ccalvert.net/books/CloudNotes/Assignments/Cloud9Intro.html#auto-setup
[c9-setup]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/CloudNineSetup

## Turn it in

Attach two screen shots to your assignment. To create Screen Shot I:

- Click the gear (settings) in the workspace window on the left of Cloud Nine. Make sure "Show home in favorites" is selected.
- Expand the **~/bin** directory
- Open the README.md from Solar Explorer. If it is not there already, type your name near the top of this file.
- Take a screen shot
- Attach your screen shot to the assignment. Do not embed it in a Word document, do not put it in a zip file.

Screen Shot Two

- Click the gear (settings) in the workspace window on the left of Cloud Nine. Make sure "Show home in favorites" is NOT selected.
- Expand the **~/workspace** directory, which is probably labeled **prog219-lastname-2016**. This is the folder that contains your projects, that contains the contents of your repository.
- In the terminal, checkout your latest branch, such as week09. We should see a list of the projects you have created this quarter, from Week01 through Week09.
- Take a screen shot
- Attach your screen shot to the assignment. Do not embed it in a Word document, do not put it in a zip file.
