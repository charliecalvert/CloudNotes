---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws/OldEc2Provision.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws
fileName: OldEc2Provision.md
relativePath: /Aws/OldEc2Provision.md
title: OldEc2Provision
directoryName: Aws
category : aws-guide
---

## Begin Old Provision EC2 Assignment

**NOTE**: _Don't do this part of the assignment, or any parts after this. This is here as a reference, but it is outdated due to the new Provision script._

This assignment is perhaps not entirely complete, but here is enough to get you started. Perform the following tasks:

- Update your server (sudo apt-get update etc...)
- Install Git (sudo apt-get install git)
- Download JsObjects from GitHub into your Git folder. (git clone etc...)
- Install Node (In ~/Git/JsObjects/Utilities/NodeInstall)
- Create and Configure an Elastic IP (See Lamp Section)
- Install Lamp (sudo apt-get install tasksel, sudo tasksel install lamp-server)

Optional, at least for now:

 - Install MongoDb

Additional, highly useful, notes are found here:

- <http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html>

**NOTE**: *There is no need to install SSH and Java on EC2. Those just happen to be found on the reference page I'm using for this assignment.*

We can go over this in class, but you will also need to understand how to open up ports, such as 30025, on AWS. For this assignment, you must at least get as far as opening up Port 80:

- <http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2SecurityGroups>

## bash_aliases

We autotically create a .bash_alias file but you can create a .my_bash_aliases in the root of of your home directory.

You can copy a bash_alias file from JsObjects to your home directory. Type **cd** to get to your home directory:

	cd

then copy the file:

	cp ~/Git/JsObjects/Utilities/SetupLinuxBox/.bash_aliases .

Then you can edit it with nano:

	nano .bash_aliases

Change this line to reflect what is on your system:

	alias sshadd="ssh-add ~/.ssh/rsa-key-git.pem"

It should probably read like this:

	alias sshadd="ssh-add ~/.ssh/id_rsa"

Save your work with Ctrl-O and the Ctrl-X to exit. Then process your .bash_alias file with
the **source** command:

	source ~/.bash_aliases

## Install Node

See [this section][node-elf] on Elvenware.

[node-elf]:

## Notes on Node Install

If we try to install npm or any other global npm packages, by default they go into places owned globally by the entire system. This means you need to use sudo to install or change them. I don't like that. So instead, I tell the system to put npm and all global packages in my home directory where I can have the rights to do what I want with them. In particular, I put them in $HOME/npm. This is why we modify our path in the **.bashrc** file:

export PATH="$PATH:$HOME/npm/bin"

This is the line from InstallNodePackages.sh that tells the system to put npm and npm packages in our $HOME/npm directory:

	npm config set prefix ~/npm

We can check that setting with this command:

	npm get prefix

## Git

Please read this section of the Elvenware Git docs:

- [Configuring Git][config-git]

[config-git]:http://www.elvenware.com/charlie/development/cloud/Git.html#configuring-git

## Lamp

LAMP stands for Linux Apache MySql and Python/Perl/Php.

We are interested in Apache, which is a web server running on Port 80. Details on setting up LAMP are [here][lamp].

The **Public IP** addresses assigned to you by default on EC2 are not permanent. Since I want a link to your Apache2 running on EC2, I need a permanent link that will not go away. To do this, you need to create an **Elastic IP** and assogiciate it with your running instance. Details are [here][elasticip].

**NOTE**: *Once you create an Elastic IP address, your Elastic IP and Public IP address are usually the same. At that point, your Public IP address should be permanent, but only because you have created an Elastic IP address and associated it with your instance.*

[lamp]:http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux
[elasticip]:http://www.elvenware.com/charlie/development/cloud/WebServices.html#elastic

## Old Turn it In

Ignore this.

To turn in the assignment, you should provide a screen shot showing:

- A listing of your Git folder (ls -la ~/Git). A sample screen shot is shown below, but it has more directories in it than your's will have. I want to see both JsObjects and your repository.
- A listing of the JsObjects directory (ls -la ~/Git/JsObjects)
- A listing of your repository (ls -la ~/Git/isit322-lastname-2016)
- A listing of your .ssh folder: (ls -la ~/.ssh
- A link to your site and/or a screen shot of it running. It should show the Apache welcome screen, and your IP address, as shown below. This part of the assignment will not work unless you have first opened up Port 80.

Here is a sample listing screen shot:

![Git Listing](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Ec2Listing01.png)

Here is a sample of what the Apache welcome screen should look like:

![Lamp](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/LampApache2.png)
