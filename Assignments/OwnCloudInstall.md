---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/OwnCloudInstall.md
relativePath: Assignments/OwnCloudInstall.md
title: OwnCloudInstall
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: OwnCloudInstall.md
fileNameHTML: OwnCloudInstall.html
---


<!-- toc -->
<!-- tocstop -->

Install OwnCloud
================



Use the Text entry part of the submission tool for Canvas.

- Use the menu section in OwnCloud to create a user called **charlie**
and in the submission, include the password you have assigned to me.
- Submit a link to your copy of OwnCloud running on AWS. 
Like this: **https://XX.XX.XX.XXX/owncloud/**, but of course I want
your elastic IP instead of XX.XX etc.
- Give me permissions to at least view the one image you stored in your 
copy of OwnCloud. This should be an image of you using the Windows/Mac
client. Just in case, also include a direct link to that image.

Additional Information:

- [OwnCloud on Elvenware](http://www.elvenware.com/charlie/development/cloud/OwnCloud.html)

The first thing you should do after gaining access to your AWS EC2 image
is make sure it is up to date. Enter these two commands to update your
system:

- sudo apt-get update
- sudo apt-get upgrade

Note that you can copy and paste commands from this document into your
SSH window that connects to your copy of your AWS instance.
