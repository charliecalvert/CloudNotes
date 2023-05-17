---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CopyToS3Part01.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: CopyToS3Part01.md
relativePath: /CopyToS3Part01.md
title: CopyToS3Part01
directoryName: Assignments
category : assignments-guide
---

#Copy to S3 Part 01

This assignment helps you get up to speed with AwsBasicS3. This program aids content creators who produce a lot of HTML files. 

To get started is to watch the now outdated intro video:

- [AwsBasic Intro](http://youtu.be/EF0kHY8mYXg)

<iframe width="640" height="360" src="//www.youtube.com/embed/EF0kHY8mYXg?list=UUPcZjdLfAkdauW2fJzz1Mcw" frameborder="0" allowfullscreen></iframe>

Since the video, I've integrated **BuildAll.py** into the project. It is now called **MarkdownTransform.py**, and you should never have to open it. Instead, you edit the contents of the **MarkdownTransformConfig.json** file. The process is the same as that described in the video, but you are now transforming markdown files into HTML, and in the process copying them from one folder to another. This is the same thing that **BuildAll.py** did, only now the file hopefully has a better name and is easier to use.

## Set up config file

    { "accessKeyId": "YOUR KEY HERE", "secretAccessKey": "YOUR KEY HERE", "region": "us-east-1" }
    
if you are using us-east-1 then your bucket should be created in US STANDARD. I know that works. If you want to try creating a bucket in Oregon then set it to us-west-2.

## Set Up

You need to be sure you have the environmonent variables JSOBJECTS and PYTHON path set up correctly. I have the following at the bottom of my .bashrc file:

    export JSOBJECTS=$HOME/Git/JsObjects
    export PYTHONPATH=${PYTHONPATH}:$JSOBJECTS/Python/:$JSOBJECTS/Python/Utils/:$JSOBJECTS/Python/RegEx/:

You may need to tweak the first of these two lines slightly to fit the set up on your system. 

- [See the video](http://youtu.be/v4DFrhBHuCU)

After making the video I removed the final slash from JSOBJECTS environment variable.

On Windows I set up my enviornment variables with this batch file that I call **SetEnvionmentVariables.bat:**

    @ECHO OFF
    
    ECHO =========================
    SetX GITHUB %USERPROFILE%\Documents\GitHub
    REM Setx GITHUB C:\Src\Git
    SetX JSOBJECTS %GITHUB%\JsObjects
    
    set BASE=%JSOBJECTS%\Python
    SetX PYTHONPATH %BASE%;%BASE%\Utils;%BASE%\RegEx;%BASE%
    ECHO =========================
    ECHO GITHUB = %GITHUB%
    ECHO JSOBJECTS = %JSOBJECTS%
    ECHO PYTHONPATH = %PYTHONPATH%
    ECHO =========================
    ECHO You will need to restart this command window 
    ECHO before these variables take effect.
    ECHO =========================
    
I maintain **SetEnvironmentVariables** in [JsObjects](https://github.com/charliecalvert/JsObjects/blob/master/Utilities/InstallScripts/SetEnvironmentVariables.bat).

## Set Up Lamp

LAMP = Linux, Apache, MySql and Python/Php/Perl

- [Go here](http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux)

    sudo apt-get install tasksel
    sudo tasksel install lamp-server

## Config.json

You need to get the access keys from the [AWS security page](https://console.aws.amazon.com/iam/home?#security_credential) and put them in **config.json**:

    { "accessKeyId": "ACCESS KEY HERE", "secretAccessKey": "SECRET KEY HERE", "region": "us-east-1" }

You need to replace the strings **ACCESS KEY HERE** and **SECRET KEY HERE** with your access and secret keys from AWS.

Your access key will look like this: **AKIAIOSFODNN7EXAMPLE**

Your secret key will look like this: **wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY**

More information is available in the [AWS security credential docs](http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html): 

## Set up the Static Site

The files you need are here:

-  JsObjects JavaScript NodeCode StaticSite

## Templates

- The html pieces (start, nav, etc)
- The bootstrap files and elvenware log

- JsObjects Utilities Templates
- You need the Images, Styles and Scripts folders.

## Copying Files on Linux

This programs works with two sites:

- A staging site.
- The release site on S3

On Linux, I typically use **/var/www/bc** as my staging site. Then I access it by typing the following in the address bar of my browser:

    http://localhost/bc
    
For security reasons, by default, you do not have rights to write to **/var/www/bc**. Since we talking about a staging site, and not a release site, there is usually little reason to be overly concerned about security. As a result, I simply give myself full rights to copy files to the site:

    sudo chown charlie:charlie /var/www/bc
    
This is a more flexible way to say the same thing:

    sudo chown $USER:$USER /var/www/bc

Before running **chown** we can use the list (ls) command to see that **/var/www/bc** is owned by root:

    charlie@mongovbox:~$ ls -l /var/www/
    total 12
    drwxr-xr-x  5 root    root    4096 Mar 10 14:39 bc
    -rw-r--r--  1 root    root     177 Feb 14 23:10 index.html
    
Next we run **chown** and check the results with the list command:

    charlie@mongovbox:~$ sudo chown $USER:$USER /var/www/bc
    charlie@mongovbox:~$ ls -l /var/www/
    total 12
    drwxr-xr-x 5 charlie charlie 4096 Mar 10 14:39 bc
    -rw-r--r-- 1 root    root     177 Feb 14 23:10 index.html
    
## Caveats and Limitations

This program can only copy folders one level deep. This means you can create a structure like this on S3:

    /foo.mybuckter.com/Folder01/SubFolder01
    .........................../SubFolder02
    .........................../SubFolder03
    ..etc

You cannot, however, create a structure like this:

    /foo.mybuckter.com/Folder01/Folder02/Folder03

It is, of course, possible, to create a bucket that looks like this, but you will have to run the program multiple times to do it:

    /foo.mybuckter.com/Folder01/SubFolder02
    .........................../SubFolder02
    /foo.mybuckter.com/Folder02/SubFolder01
    .........................../SubFolder02
    /foo.mybuckter.com/Folder03/SubFolder01
    etc

Since there is a command line version of this program, it will (at least eventually) be possible to automate as single command the act of copying multiple sets of folders to S3, as in the case above.

The folder that you are copying from your local drive to S3 should have this structure:

    Folder01/SubFolder02
    ......../SubFolder02
    etc
    
It cannot have this structure:

    Folder01/SubFolder02/SubFolder03
    
Yes, this is a limitation. It is one that can be fixed, but I'm not going to fix it today. And frankly, web sites that go over three folders deep are hard to maintain, and hard to navigate, so there is a bright side to this limitation.
    
## Turn it In

In this assignment, all you need to do is get the program up and running. This means:

- Edit five documents (Shekespeare Sonnets 1-5 would do) in StackEdit and link them to DropBox and/or Google Drive
- Send a screen shot of the StackEdit folder on the navigation bar showing that you five documents are linked to Google Drive and/or DropBox

In this screen shot, you can see that **CopyToS3Part01.md** is saved to Google Drive and **Week05.md** is saved to Google Drive. Another file is saved to both GoogleDrive and DropBox, and has a link back to GitHub:

![Drive](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/AwsBasicS301.png)

Also include:

- A screen shot of your files on S3.
- A link to your files on S3
- A screen shot of **AwsBasicS3** running in your browser
- A screen shot of the command line output **AwsBasicS3** creates when you send files to S3.
- Your copies of **MarkdownTransformConfig.json** and **Options.json**

## The Deploy Feature

This program is developed in **JsObjects**, and that repository gets updated fairly frequently. This means that your copies of **MarkdownTransformConfig.json** and **Options.json** can get overwritten when you perform a **git pull** on **JsObjects**. It is also possible that I will break the code when updating it.

As a result, I have created a way that you can *deploy* the application to another place on your drive. To get started, be sure you have installed **grunt-cli** with this command:

    sudo npm install -g grunt-cli
    
On Windows you should not include **sudo**.

Now go to the root folder of the **AwsBasicS3 project** and type:

    grunt deploy
    
This should create a filder called **Deploy** in the root of the project. It should contain all the files you need to run the program. Copy it to well known location and run **npm install**. Now you can run **AwsBasicS3** without concerns about updating **JsObjects**. When upgrades to **AwsBasicS3** occur, I would suggest running **grunt deploy** again and copying the new **Deploy** folder to a second location, so that you don't overwrite your working copy. When you are convinced that the new copy works, then you can save your config files if necessary and delete your older copy of the program.

## Additional Notes

The AwsBasicS3 program uses node. You typically start it like this:

    node app.js
    
Then open this address in your browser:

- [http://localhost:30025/](http://localhost:30025/)
    
Of course, this won't work unless node is properly installed. If node is properly installed you should be able to type the following:

    node --version

And see a response similar to this.

    v0.10.26

If you have not yet installed node on Linux, follow these instructions:

- [Install Node on Linux](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node)

You will find this code, which you must right click and copy, line by line, into the Linux command prompt:

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

Now pull the latest content from JsObjects:

    git pull

And finally, navigate to the AwsBasicS3 directory, type npm install, and then type **node app.js**. Now open your browser and navigate to: [http://localhost:30025](http://localhost:30025). 

The adventuresome could also play with the command line version:

    charlie@bcuservb:~/Git/JsObjects/JavaScript/NodeCode/AwsBasicS3$ node Server.js 
    -l listBuckets
    -u walkDirs

> Written with [StackEdit](https://stackedit.io/).
