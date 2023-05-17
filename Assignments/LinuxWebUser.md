---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/LinuxWebUser.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: LinuxWebUser.md
relativePath: /LinuxWebUser.md
title: LinuxWebUser
directoryName: Assignments
category : assignments-guide
---

# EC2 Web User

The goal of this assignment is to help you learn how to use an EC2 instance to host a web site.

Here are the basics you need to know manage a web site from the command prompt in Linux. This information can guide you through working with an EC2 instance.

 - [Video Part I](http://youtu.be/Vx4oM1AYPjQ)
 - [Video Part II](http://youtu.be/mSKxHKTQAc4)
 - [Video Part III](http://youtu.be/RTICenN5n8Q)
 - The Deck: [http://bit.ly/LinuxWebUser](http://bit.ly/LinuxWebUser)

# Create a Web Page

On [this page][booty] we talked about how to assemble a bootstrap aware web page. Let's learn how to assemble that page automatically.

Method01:

In your respository on **CodeAnywhere** or **Ec2**, do the following:

- Create a directory called CreatePage. You will do you work in this folder. So use the **cd** command to navigate into that folder.
-  Take the top part of the [bootstrap html][booty] and save it to file called  **Start.html**.
-  Take the bottom part and save it to **End.html**.
-  Save the HTML you create in StackEdit to **Middle.html**.

Now run the following command at the command prompt to concatenate them:

	cat Start.html Middle.html End.html >> Page01.html

Don't forget that the page won't look right unless you also include **index.css** and **bootstrap.css** in the same folder as **Page01.html**.

If you navigate into the CreatePage folder, you should see a listing like this:

```
cabox@box-codeanywhere CreatePage]$ ls -la
total 168
drwxrwxr-x 2 cabox cabox   4096 Oct 29 02:20 .
drwxrwxr-x 4 cabox cabox   4096 Oct 29 02:20 ..
-rw-rw-r-- 1 cabox cabox    177 Oct 29 02:19 End.html
-rw-rw-r-- 1 cabox cabox   3627 Oct 29 02:19 Middle.html
-rw-rw-r-- 1 cabox cabox   5063 Oct 29 02:19 Page01.html
-rw-rw-r-- 1 cabox cabox   1259 Oct 29 02:19 Start.html
-rw-rw-r-- 1 cabox cabox 132546 Oct 29 02:19 bootstrap.css
-rw-rw-r-- 1 cabox cabox     95 Oct 29 02:19 index.css
```

##Hyperlinks

Suppose you have two pages on your site. You will probably want to be able to navigate from one page to the other. As you know, navigation on the web is made possible with hyperlinks. In our case the navigation is simple because we want to navigate between two pages in the same directory.

Suppose the pages are called:

- Page01.html
- Page02.html

If StackEdit here is how to create a hyperlink between these two pages:

```
[Page01](Page01.html)
[Page02](Page02.html)
```

Make sure you text begins flush left.

This is the HTML create by the markdown syntax shown above:

```
<a href="Page01.html">Page01</a>
<a href="Page02.html">Page02</a>
```

If you want you can create a bulleted list of hyperlinks with this markdown syntax:

```
- [Page01](Page01.html)
- [Page02](Page02.html)
```

To test this, you should create two pages and try hyperlinking back and forth between them.


# Provision your Instance

At least once a week, update your EC2 instance:

	sudo apt-get update
	sudo apt-get upgrade

Install Git:

	sudo apt-get install git

Install Lamp:

	sudo apt-get install tasksel
	sudo tasksel install lamp-server

More information is available on the Elvenware [Configure Linux ][config]page.

## Set up your SSH Key

To set up SSH, you should perform the following steps. I outline them here, and then describe them later. (Thanks to Alika Kaiwi):

- In EC2, generate you SSH private and public keys using **ssh-keygen** command shown below.
- In EC2, use nano, as described below, to set up a file called **config** in you **.ssh**. In particular, the location of the file is **.ssh/config**.
- In EC2, copy the contents of your public key (**id_rsa.pub**) generated in step 1. Type **cat id_rsa.pub** to print out the key. Then block copy it. In secure shell, it should be automatically copied to the clipboard.
- In Bitbucket, go to **Manage Account** settings on the far right, (where your picture is). Navigate to the **SSH** section. **Add** the SSH key, by pasting the contents of your public key (Ctrl-V).
- In EC2, clone your Bitbucket repository

The first step in preparing your EC2 instance is to generate your SSH key.  Perform the following commands:

```
cd
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cd .ssh
nano config
```

These commands do the following:

- **cd**: Go to your home directory
- **ssh-keygen**: Create your public and private keys and put them in the **.ssh** directory.
- **cd .ssh**: Navigate to the **.ssh** directory
- **nano config**: Start the **nano** text editor.

Nano is a text editor. Please paste (Ctrl-Insert) the following text into the editor:

```
Host bitbucket.org
    IdentityFile ~/.ssh/id_rsa
```

Now save your work by pressing Ctrl-O. Exit the editor by pressing Ctrl-X.

Some of my **.ssh/config** file looks like this:

```
Host mongo-server
    HostName 192.168.2.27
    Port 22
    User bcuser
    IdentityFile ~/.ssh/id_rsa

Host fp
    HostName 192.168.2.15
    Port 22
    User charlie
    IdentityFile ~/.ssh/common-key
```

## Clone a repository on EC2

Put your repo's public key in BitBucket. This is like a previous exercise or two that we have done. But this time you have to put the public key you create into BitBucket.

Create a directory called Git:

	cd
	mkdir Git
	cd Git

Now clone your repository using this syntax:

	git clone <RepoUrl>

For instance:

	git clone git@github.com:charliecalvert/JsObjects.git

More information is available on these Elvenware pages:

- [Configure Linux][config]
- [Git][git]

[config]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html
[git]: http://www.elvenware.com/charlie/development/cloud/Git.html

# Editors

On EC2 and at the Linux command line in general, you need to use a text editor. There is no GUI mode supported at the command line, so you need to run an editor that is based on command line development. There are two popular Linux command line editors:

- [vim (vi)][vimEdit]
- [nano][nanoEdit]

Nano is an editor available at the Linux command prompt. It is fairly easy to use, though it has a few quirks for those coming from standard Windows editors. Please visit the [Elvenware nano pages][nanoEdit] to learn how to get started.

Vim is more difficult to use than nano, but also more powerful.  Please visit [Elvenware vim page][vimEdit] to learn how to get started.

[vimEdit]: http://www.elvenware.com/charlie/os/linux/LinuxFiles.html#vim-editor
[nanoEdit]: http://www.elvenware.com/charlie/os/linux/LinuxFiles.html#nano-editor

# Use Apache

We installed Apache earlier when we [installed LAMP](http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux). As you recall, we installed LAMP with this command:

	sudo tasksel install lamp-server

You may be prompted to enter a password for MySql. We are not using MySql, but enter a password anyway so your instance will be secure. Once you are done, Apache will be installed.

You can make sure it is installed by checking for the existence of the **/var/www** folder. If this folder does not exist, then Apache is probably not installed.

You put the pages you want to display on your web site in this directory:

	/var/www/html

You want to be the owner of this page. As a result, do the following:

```
cd /var/www
sudo chown -R ubuntu:ubuntu html
```

First we navigate to the var www folder. Then we claim ownership of the **/var/www/html** folder so that we can copy files into it. The owner switches from **root** to **ubunutu**. We are the user **ubuntu** when we are logged into our EC2 instance.

The main page of your site will be:

 	/var/www/html/index.html

When Apache is installed, a file called **index.html** is created automatically. You might not want to delete this file, yet you don't want it to be the main page of your site. As a result you might rename it:

	mv index.html oldIndex.html

To test that things are working, create a simple HTML page like this one:

	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>My Page</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>

	<body>
		<h1>My Page</h1>

		<p>This is my page</p>
		<p><a href="Final.html">Final.html</a></p>
	</body>
	</html>

# Copy Folders

You will need to copy the folder containing your web pages from your Git folder to the /var/www/html directory.

- Understand permissions per the Linux quizzes.
- **chown** -R ubuntu:ubuntu /var/www/html

To learn more, visit the Elvenware pages on [Linux Files][linuxFiles].

[linuxFiles]: http://www.elvenware.com/charlie/os/linux/LinuxFiles.html#copy


##Turn it in

To complete this exercise, take four screen shots:

- Show the contents of your Git folder on EC2.
- Show the contents of your /var/www/html folder
- Show the contents of your CreatePages directory in CodeAnywhere.
- Show your EC2 index.html file running in a browser. To get this screen shot typically you just enter the elastic ip address of your EC2 instance in the address bar of your browser.

Also turn in the two hyperlinked pages you created.

As a comment for your submission, send the URL (elastic ip) of your EC2 web site. Something like this: http://11.11.11.11. But of course your IP address will be different.

In sum, when you submit the assignment:  

- Attach your screen shots and the two HTML pages you created.
- As a comment add the URL of your EC2 site.

If you navigate into the CreatePage folder, you should see a listing like this:

```
cabox@box-codeanywhere CreatePage]$ ls -la                                                                                                                                                                                                   
total 168                                                                                                                                                                                                                                     
drwxrwxr-x 2 cabox cabox   4096 Oct 29 02:20 .                                                                                                                                                                                                
drwxrwxr-x 4 cabox cabox   4096 Oct 29 02:20 ..                                                                                                                                                                                               
-rw-rw-r-- 1 cabox cabox    177 Oct 29 02:19 **End.html**                                                                                                                                                                                         
-rw-rw-r-- 1 cabox cabox   3627 Oct 29 02:19 **Middle.html**                                                                                                                                                                                      
-rw-rw-r-- 1 cabox cabox   5063 Oct 29 02:19 **Page01.html**                                                                                                                                                                                      
-rw-rw-r-- 1 cabox cabox   1259 Oct 29 02:19 **Start.html**                                                                                                                                                                                       
-rw-rw-r-- 1 cabox cabox 132546 Oct 29 02:19 **bootstrap.css**                                                                                                                                                                                    
-rw-rw-r-- 1 cabox cabox     95 Oct 29 02:19 **index.css**                                                                                                                                                                                            
```

NOTE: *You will probably want to call the Pages your create Page01.html, Page02.html and Page03.html. You might also call them after their subjects:

- Music.html
- Books.html
- Hobbies.html

Or what have you.

[booty]: http://elvenware.com/charlie/development/web/CssGuide/Bootstrap.html

- Understand permissions per the Linux quizzes.
- **chown** -R ubuntu:ubuntu /var/www/html

To learn more, visit the Elvenware pages on [Linux Files][linuxFiles].

[linuxFiles]: http://www.elvenware.com/charlie/os/linux/LinuxFiles.html#copy
