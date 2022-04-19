---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog270/Prog270Midterm2014.md
relativePath: Prog270/Prog270Midterm2014.md
title: Prog270Midterm2014
queryPath: Prog270/
subject: Prog270
fileNameMarkdown: Prog270Midterm2014.md
fileNameHTML: Prog270Midterm2014.html
---


<!-- toc -->
<!-- tocstop -->

# Prog 270 Midterm 2014

There are two main sections to the midterm:

- Websites (EC2, S3, Google Sites)
- Documents (Google Drive, OneDrive, Evernote)

Make sure you complete both sections.

##Overview

Your goal is to create three websites that can be viewed in:

- Desktop Browser
- Mobile browser

The websites will be hosted on:

- EC2
- S3
- Google Sites

 You will also create three sets of documents that can be viewed on

- Google Drive
- OneDrive
- Evernote

This requires no extra work on your part, but your documents should also be visible on:

- Android or other device applications for Google Drive, OneDrive and Evernote.

In general. The theme of this exercise is the creation of content that can be viewed on mobile devices. As a result, you should test your web pages to make sure they look good on a mobile device. At the very least, you should use Chrome and FireFox device emulation to test your pages. If possible, also view your pages on your mobile phone or tablet. They presentation on mobile devices need not be perfect, but at least keep this goal in mind. In later classes we can learn more about how to create HTML that looks great on mobile devices.

## Create Web Documents

You will use stackedit to create at least 5 documents. Three of the documents can contain any content that interests you. I don't much care what documents you create, but if you want suggestions, here are a few:

- Tech Skills
- Interests or Hobbies
- Favorite Books
- Favorite Movies
- Favorite Music 
- Map page

All three of the pages must have pictures in them, and at least two of the pictures you display must be one's that you created yourself.

You should also create a home page or TOC called **index.html**. The TOC should consist of live hyperlinks to the pages you created. There is a two part video in the announcements area that helps clarify how to create these pages. The Home Page Videos:

- [Part I Video](http://youtu.be/t77iK4Aprw4)
- [Part II Video](http://youtu.be/SvCjd95o9sI)
 
You can create the home page anyway you like. The video is just to provide guidance for those who may not have any ideas on how to proceed.

Also create an **About** page which tells us something about the author. If you wish, you can make up the author, or include real information about yourself.


NOTE: *You could simply call the Pages your create **Page01.html**, **Page02.html** and **Page03.html**. You might also call them after their subjects:

- Music.html
- Books.html
- Hobbies.html

Or what have you. Use the LinuxWebUser assignment as a guide. Watch these videos:

- [Part I](http://youtu.be/Vx4oM1AYPjQ)
- [Part II](http://youtu.be/mSKxHKTQAc4)
- [Part III](http://youtu.be/RTICenN5n8Q)

## Funny squiggles

If you create a document in StackEdit and view it as HTML without including a header, you may see some funny characters in place of your quotes and apostrophes: €™  This is because the following tag is not included at the top of the HTML file:

	<meta charset="utf-8" />

You would usually put that in the header for your document. You need not worry about this problem as the correct code is included in the bootstrap code that we include in our HTML. So just ignore the problem if you see it, as it will go away if you correctly insert the bootstrap code into your document.

If you can't stand having to do things this way, I believe that there is an extension for StackEdit that you can turn off in order to prevent StackEdit from converting your apostrophes and quotes into funny character. Choose: 

	# (Hash Menu on left) | Settings | Extensions | Markdown Extra | Smarty Pants

Turn off smarty pants, go to the bottom and click okay, and then when you save as HTML this "feature" should go away. 	

## Display Your Documents on the Web

Your website should be placed on:

- Your EC2 instance.
- S3. Here is an older, but still hopefully helpful, [video about S3](http://youtu.be/DBX0UZmCnnw).
- Your Google Site

Use Git to load your pages on to EC2. This means that you will need to place your pages on CodeAnywhere so that you can put them in Git.

**NOTE**: There are many other tools for accessing Git, but we are not allowed to install these tools on the machines in N252. So we do our work in CodeAnywhere.

On EC2, you will copy your files into the /var/www/html directory so they can be accessed over the web.

## Markdown, HTML and CSS

Place your markdown, HTML and CSS files in our shared folders on Google Drive and OneDrive. In both cases place them in a folder called **MidtermDocuments**.

## Images

Store at least two images from your web pages in our shared folders on Google Drive and OneDrive. In both cases, place them in a folder called **MidtermImages**.

## Standard Documents

This is the part of the midterm where the focus switches from the web to Google Drive, OneDrive and Evernote. To complete this section:

- Recreate the three main pages you created in StackEdit in:
	-  Google Docs
	- OneDrive Word documents
- Also do your best to create the documents in our shared Evernote folder. 
- You do not need to create the Front Page or the About page for this part of the exercise.

The simplest way to create the three pages is simply to cut and paste from your web pages into Google Drive, OneDrive and Evernote. Because your images are stored on Google Drive, your cut and paste operation should bring the images along for the ride.

The main point of this part of the test is to remind you how to share documents using Google Docs, One Drive and Evernote. Remember to take **extreme** care to share the documents in the proper folders. You did this same kind of exercise the first week of class, in the **Online Presence** assignment. Some of you will perhaps recall that not everyone got it right the first time around. It was okay to share documents with the wrong email address the first time, but this is the midterm, and you don't want to lose points just because you shared a document in the wrong folder. Be careful and double, then triple check, to make sure you are sharing the documents properly by placing them in the same folders you created during the **Online Presence** assignment. The root folder you need to use for sharing documents should already be created. In Google Drive and OneDrive create a subdirectory of that folder called **Midterm** and share the documents in there. On Evernote just put your documents in the folder you already shared with me. Use the **Online Presence** assignment to check your work. All that matters is that you share things in the same folders that you shared with me during the **Online Presence** assignment.

[This older video](http://youtu.be/uHCpLgpk4T0) is not completely on topic, but I think it still covers quite a bit of useful information regarding Google Drive and Google Docs.

## All Relevant Videos

LinuxWebUser videos:

- [Part I](http://youtu.be/Vx4oM1AYPjQ)
- [Part II](http://youtu.be/mSKxHKTQAc4)
- [Part III](http://youtu.be/RTICenN5n8Q)

Suggestions on how to creat the Index.html file:

- [Index Part I Video](http://youtu.be/t77iK4Aprw4)
- [Index Part II Video](http://youtu.be/SvCjd95o9sI)

Cloud Computing:

- [CodeAnywhere Navigation Video](http://youtu.be/lGYvGiUFM0Q) 
- [EC2 Cloud Only](http://youtu.be/fZE_fLw7Qrg)
- [Linux File Basics](http://youtu.be/pHIRpHDn7WQ) 

The older, and not necessarily completely on topic, S3 and Google Drive videos:

- [S3](http://youtu.be/DBX0UZmCnnw)
- [Google Drive](http://youtu.be/uHCpLgpk4T0) 

All Charlie Videos:

- [You Tube Index](https://www.youtube.com/user/charliecalvert/videos)
- [Elvenware partial index](http://elvenware.com/charlie/Videos.html) 

##Turn it in

Submit as text or comments, the links to your EC2, S3 and Google Site sites. I can find your Google Drive, OneDrive and Evernote folders and documents on my own, so long as you shared those documents correctly. If you want, you could create a page in Google Drive called Midterm TOC. Inside it you can write a summary of your midterm, and provide links to the your documents.

You can, up until the due date for the midterm, turn in the assignment as often as you want. The final version is the version that you submit when the midterm is due.