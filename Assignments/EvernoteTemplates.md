---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/EvernoteTemplates.md
relativePath: Assignments/EvernoteTemplates.md
title: EvernoteTemplates
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: EvernoteTemplates.md
fileNameHTML: EvernoteTemplates.html
---


<!-- toc -->
<!-- tocstop -->

## Description 

User your shared Evernote folder to share a document with me that describes how to create an environment variable called **ELF_TEMPLATES**.

## Step One

Sign into Evernote

Create a new note in the Evernote folder you shared with me.

- Title: DosAlias Templates
- Tags: bc, prog219, setup, dosalias
- Content: Document the steps involved in creating the %ELF_TEMPLATES% environment variable.

When you are done, I want to be able to open up Evernote and see that you have:

- Create the note 
- Titled and tagged it correctly
- Enter a reasonably complete description of how to follow the steps for creating %ELF_TEMPLATES%

**NOTE**: *I wish the name ELF_TEMPLATES were shorter. I'm not using **TEMPLATES** because it seems too generic, too likely to be used by some other program. I want to be sure the variable is unique.*
 
## Step Two

Open up %USERPROFILE%\Bin\DosAlias.bat in your editor of choice.

Be sure it contains the following lines near the top:

```
set GITDIR=%USERPROFILE%\Git
set JSOBJECTS=%GITDIR%\JsObjects
set ELF_TEMPLATES=%JSOBJECTS%\Utilities\Templates
```

Save your work. At the command line run **dosalias**.

## Step Three 

Check Your Work

At the command line type the following and confirm that it returns valid output.

```
echo %GITDIR%
echo %JSOBJECTS%
echo %ELF_TEMPLATES%
```

Paste the output from the above commands into Evernote. For instance, on my system, the output from the last of the three commands looks like this:

```
>echo %ELF_TEMPLATES%
C:\Src\Git\JsObjects\Utilities\Templates
```

This will likely look different on your system, but it should be clear what I want.

## Turn it in

Press the submit button for your assignment. Include the name of your Evernote folder and the name of your document.

 


 
