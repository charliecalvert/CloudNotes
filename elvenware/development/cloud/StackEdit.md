---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/StackEdit.md
relativePath: elvenware/development/cloud/StackEdit.md
title: StackEdit
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

#StackEdit

You can edit markdown in the cloud with StackEdit.

You can place a markdown file such as this one in your public directory. Call it MarkdownSample.md:

	# Markdown Sample Header

	This is a sample markdown file. You can make lists like this:

	- One
	- Two
	- Three

	## Details

	Try pasting the contents of this file into this editor:

	- [StackEditIO](https://stackedit.io/)

That's the editor found at **https://Stackedit.io**

## Run StackEdit Locally

First we need to download the StackEdit repository from GitHub:

    git clone git://github.com/benweet/stackedit.git

It turns out that things will work best if we run on Port 80. The problem is not with connecting to StackEdit, but in getting StackEdit to connect to Google Drive and Dropbox. When we try to get authentication to use those services, they don't understand that we are running on particular port, so the verification fails.

**NOTE**: *What I'm about to say in this note does not appear to be true, but I'm going to say it anyway, just to be safe. It would seem logical that our server will "forget" the files we have open when we stop and start our local copy of StackEdit by hitting Control C at the command line. Hence we could lose our work unless it is backed up to Google Drive or Dropbox. In fact, it appears that StackEdit does remember, but I don't understand how, so play it safe and back up to Google Drive or StackEdit before exiting. That should occur automatically so long as your document is linked to those services.*

Stop apache so that we have access to port 80:

    sudo /etc/init.d/apache2 stop

Create a script called **StartStackEdit.sh** with this content and place it in or near your stackedit folder:

    export PORT=80
    sudo node server.js

On Linux, to listen on ports below 80, you must run as root.

## Two Google Accounts In StackEdit

You can use two Google accounts in StackEdit. I linked to a second account when creating a new markdown document. I created the document like this:

 - First I opened up Google Drive using the account I wanted to use in my program.
 - Then I created a new document in Google Drive, choosing the **More** option.
 - From the **more** option, I choose "StackEdit." If you don't see StackEdit as a choice, then choose "Connect more apps"  and connect StackEdit.
 - Then StackEdit opened and asked me to share link a second account to this instance of StackEdit. I did that.

> by [Charlie Calvert](http://elvenware.com/charlie).
