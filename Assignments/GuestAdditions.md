---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/GuestAdditions.md
relativePath: Assignments/GuestAdditions.md
title: GuestAdditions
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: GuestAdditions.md
fileNameHTML: GuestAdditions.html
---


<!-- toc -->
<!-- tocstop -->

VirtualBox Guest Additions
===========================

Install Guest Additions in Linux
--------------------------------

This is not a difficult assignment, but it can make your experience with
Linux and VirtualBox significantly simpler.

If you set up the VirtualBox Guest Additions in Linux, you will find
that you have better control over your virtual machine. In
particular, you will find it easier to resize your desktop or view it
in full screen. You should also have better control over the mouse.

- [Details](http://elvenware.com/charlie/os/linux/VirtualBox.html#guest)

Share Clipboard Between Windows and Linux
-----------------------------------------

Again, this is not a difficult assignment, but I suggest that you do set up
the clipboard so that you can copy text back and forth between
Windows and Linux.

- [Details](http://elvenware.com/charlie/os/linux/VirtualBox.html#shareClipboard)


Turn it In
==========

When you are done, open the command box in Linux. You are probably already
in your home directory, but just in case, issue the following command:

	cd

Just type **cd** and then press enter. That will take you to your
home directory.

Now run the following command:

	sudo VBoxControl guestproperty enumerate

You should see a lot of text. One of the first lines probably looks
something like this:

	Name: /VirtualBox/GuestInfo/OS/Product, value: Linux, timestamp: 1391973938040846300, flags: <NULL>

Now run the command again, only this time pipe the output into a file
called **Guest.txt**:

	sudo VBoxControl guestproperty enumerate > Guest.txt

Use Geany or some other text editor to open **Guest.txt**. Block
copy its entire contents. Now open the browser and sign into
Evernote. Create a new note in your Evernote shared folder from the
**Online Presence assignment**. Call your note
**GuestAdditions-LastName**, where LastName is your last name.

To submit the assignment, provide a link to your Evernote folder.

Your note will be fairly long, but the top bit should look something
like this:

![VBoxControl on Linux](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/VBoxManage01.png)

Once you have the document in Evernote, you can view it everywhere. Here,
for instance, is how it looks on Windows:

![VBoxControl on Linux](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/VBoxManage02.png)
