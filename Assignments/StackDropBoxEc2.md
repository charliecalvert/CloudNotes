---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/StackDropBoxEc2.md
relativePath: Assignments/StackDropBoxEc2.md
title: StackDropBoxEc2
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: StackDropBoxEc2.md
fileNameHTML: StackDropBoxEc2.html
---


<!-- toc -->
<!-- tocstop -->

## StackEdit and DropBox

The goal of this assignment is to teach you about DropBox and how to store files you edit in StackEdit into the cloud. In particular, you will learn how to automatically sync the files you edit in StackEdit to DropBox. 

Because you save files to your DropBox folder, you can access them from multiple machines. In other words, you can create a file in N252, then have the latest version automatically saved to DropBox. When you get home, you can load it off DropBox back into StackEdit. Once you have things set up on both ends, you can simply open DropBox in either location and the latest version of your file will be loaded and saved automatically without even the need to press Ctrl-S to save.

## Details

In your Dropbox folder on Linux, create a sub-folder called StackEdit. This is where you will place documents that you create in StackEdit.

In StackEdit, choose the pound sign icon on the far left. In the **Synchronize** section, choose **Synchronize |  Save on Dropbox**. A dialog like the one shown below appears. I want you to include a screenshot of this dialog when you turn in this assignment:

![DropBox Folder](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/DropBoxLinux03.png)

Choose to save you file in your **StackEdit** folder as **Week08-StackBox-LastName.md**, where LastName is your last name. 

Take one or more screen shots of your work in DropBox. Remember to show the file you have created being edited in StackEdit with the "Export to DropBox" dialog open above it. Use screen shots to document your work so you can show me that you understand how to save files that you edit in StackEdit to Dropbox.

Take a screenshot of a listing from your DropBox folder on Ec2. The listing might be obtained with a command similar to this:

	ls -la ~/Dropbox/StackEdit/

The contents of the file you save to DropBox is not important. Just put a few line of text in there, whatever seems interesting or important to you at the time. It can be anything, a song, a poem, an essay: anything.

##Turn it in

Put the screen shots in a folder of your Git repository called **Week08_StackDropBoxEc2**. Also save the the **Week08-StackBox-LastName.md** markdown file to that folder. Put all the files in folder of the same name in the **OneDrive** folder that you have shared me with during the **Online Presence** assignment.

In the text area of Canvas, show the URL for your repository and for your **OneDrive** folder. Notice I'm changing things up on you. I'm asking for the **OneDrive** shared folder, not the **Google Drive** shared folder.
