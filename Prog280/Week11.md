---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog280/Week11.md
relativePath: Prog280/Week11.md
title: Week11
queryPath: Prog280/
subject: Prog280
fileNameMarkdown: Week11.md
fileNameHTML: Week11.html
---


<!-- toc -->
<!-- tocstop -->

# Week 11 Prog 280

The focus for this week will be:
- Plex
- Review of cloud basics

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

## Look at the Final

Coming soon:

- [Final]()

## Plex Details

- [Download Page](https://plex.tv/downloads)
- [64 Bit Ubuntu](http://downloads.plexapp.com/plex-media-server/0.9.9.7.429-f80a8d6/plexmediaserver_0.9.9.7.429-f80a8d6_amd64.deb)
- [32 Bit Ubuntu](http://downloads.plexapp.com/plex-media-server/0.9.9.7.429-f80a8d6/plexmediaserver_0.9.9.7.429-f80a8d6_i386.deb)

    dpkg -i [PACKAGE NAME HERE]
    sudo apt-get -f install
    
Now go to the web interface by typing something like one of the following:

    http://localhost:32400/manage/index.html
    http://192.168.2.20:32400/manage/index.html
    
If you want to uninstall the package, use -r:

    dpkg -r [PACKAGE NAME HERE]
    
## What Platform am I on?

Use these tools to determine if you are on 64 bit or 32 bit Linux:

- [Script from JsObjects](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/SetupLinuxBox/SystemCheck.sh)

Most of you are using the 32 bit version of Lubuntu.

## The Final

I have not written the final yet, but it will likely contain the following elements. It will test if you can use:

- Google Drive?
- One Drive (SkyDrive)
- EverNote
- AwsBasicS3
- StackEdit

> Written with [StackEdit](https://stackedit.io/).