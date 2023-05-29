---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Ec2Checklist.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: Ec2Checklist.md
relativePath: /Ec2Checklist.md
title: Ec2Checklist
directoryName: Assignments
category : assignments-guide
---

## Overview

The EC2 In Class Checklist is designed to help ensure that you have EC2 set up correctly. Don't be too obsessive, but try to get the tests I describe here to pass.

**NOTE**: *Throughout this assignment, I will use the PNG extension in examples of bitmap file names. This is just for convenience when typing the assignment. The file type you use can be either PNG or JPG.*

Our goals include checking to see if we:

- Use SSH keys rather than passwords (Show connection)
  - Access git with a public/private key pair
- Regularly update our machine
- Know how to copy files to EC2 from Pristine Lubuntu
- Have **~./bashrc** and **~.bash_aliases** set up correctly
- Have Node Setup correctly
- Have Lamp installed

**NOTE**: _I assume you already have JsObjects [installed][jso-install03]. If not, please [install it][jso-install01] now. If you already have it installed, be sure to run **git pull** in JsObjects before beginning this assignment._

Related Assignments or Documents include:

- [EC2 Get Started][ec2gs]
- [EC2 Provision][ec2p]
- [Configure Linux][configure-linux]
- [Linux Files][linux-files]
- [Git New Repo][gnrepo]

**NOTE**: *At several points in this assignment I talk about a utility called **SystemCheck**. When using that utility, don't run the sections of it that check Common things such as Java and Chrome, or the part that checks PhoneGap.*

[ec2gs]: http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2GetStarted.html
[ec2p]: http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html
[gnrepo]: http://www.ccalvert.net/books/CloudNotes/Assignments/GitNewRepo.html
[linux-files]: http://www.elvenware.com/charlie/os/linux/LinuxFiles.html
[configure-linux]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html

## SSH

For those of you in a class that uses AWS, or a local instance of Ubuntu Server, do the following. Otherwise just skip down to the text on running **SystemCheck**.

What I'm looking for here is evidence that your using SSH, not a password, to access your server. If you are using a local Ubuntu Server, I want to make sure you have run **ssh-copy-id** or the equivalent to put your public key in the server's **authorized_keys** file. I want you to proceed as you normally would, using SSH with a public private key pair to connect to EC2. This time, however, pass in the -v key to get debug information:

```
ssh -v ubuntu@XX.XX.XX.XX
```

If you scroll up a bit, you will see a lot of text. Find the line that begins and ends like this:

```
debug1: Authentications that can continue
// LOTS OF TEXT HERE. ABOUT 9 OR 10 LINES.
debug1: Entering interactive session.
```

Take a screen shot of all the lines between the first and last inclusive. That is take a screen shot that includes the first and last lines shown above, as well as all the lines between them. Call it **ssh-authentication.png**.

## System Check

Run this command from your home directory:

```
./Git/JsObjects/Utilities/SetupLinuxBox/SystemCheck
```

**NOTE**: *If the above command fails, then you probably have not installed JsObjects yet. Details on that process are found [here][jso-install01] and [here][jso-install02], and also [here][jso-install03].*

Select **S** or **s** for SSH. You should see the words **SSH Setup** followed by four lines that begin **OK:**. Take a screen shot of the results and call it **ssh-systemcheck.png**.

**NOTE**: *Remember, don't run the sections of SystemCheck that check **Common** things such as Java and Chrome, or the part that checks **PhoneGap**. It's not an error to run those options, it just is not helpful in terms of completing this assignment.*

If you are having problems, go to the Git New Repo assignment, and read the section on setting up SSH.

Take a screenshot showing that the SystemCheck | SSH command works on your system.

All of the tests should run smoothly out of the box, with the possible exception of the check for your ssh **main-key**.

## Update

Update your machine as explained in the [EC2 Provision Update Section][ec2p-update]

[ec2p-update]: http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html#update-server

After updating the server, type **sudo apt-get upgrade** a second time. Create a screen shot and call it **server-update.png**. I'm looking for evidence that there was nothing left to upgrade. The output should look something like this, though I want a screen shot, not just block copied text:

```
charlie@elf-rover:~$ sudo apt-get upgrade
Reading package lists... Done
Building dependency tree       
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
```

## Basic System Check

Run this command:

```
./Git/JsObjects/Utilities/SetupLinuxBox/SystemCheck
```

Select **B** or **b** for **Basic System Check**. You should see at least to Directory entries and at least one file entry. Each of these lines should begin with **OK:**. Take a screen shot and call it **basic-system-check.png**.

Especially if you are in one of my programming courses, compare the code at the end of your **~/.bashrc** file with the output from this command:

```bash
cat ~/Git/JsObjects/Utilities/SetupLinuxBox/BashrcExtras
```

On EC2, there is no Chrome browser. So you don't want to select **c** for Common. See below for notes on how to set this section up on Pristine Lubuntu, and how to install Java on either Pristine or EC2.

## Lamp

Make sure LAMP is installed:

- [LAMP](http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html#lamp)

Run this command:

```
./Git/JsObjects/Utilities/SetupLinuxBox/SystemCheck
```

Select **L** or **l** for **LAMP**. You should see the words **Lamp Setup** followed by at least 6 entries. Each of these lines should begin with **OK:**. Take a screen shot and call it **lamp-setup.png**.

## Node

Make sure [NodeJs](https://nodejs.org/) is installed:

- [NodeJs](http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html#install-node)
- [Configure Linux](http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#install-node)
- [Node on Elvenware](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node)

Run this command:

```
./Git/JsObjects/Utilities/SetupLinuxBox/SystemCheck
```

Select **Node**. Take a screen shot. Call it **node-check.png**.

Type the following commands:

```bash
node --version
npm --version
jade --version
```

Take a screen shot of the output generated by the commands. Call the bitmap **node-check-versions.png**.

Each command should create a single line of text showing the program version number. I'm somewhat interested in the version number, but mostly just checking to make sure each is installed. In other words, I'll accept a range of versions, but not all versions, but I definitely want to see a version number for each program. I fear I'll just create confusion if I start talking about specific version numbers, so just submit whatever you have. The only wrong answer is an error rather than a version number.

If **jade --version** does not work, try this:

```
which jade
```

If it does not come back with an answer similar to this, try un-installing jade and then reinstalling with **npm install -g jade**:

```
/home/bcuser/npm/bin/jade
```

The following may or may not work. If Jade complained when you tried to get the version, you may have the wrong verison of Jade installed. To uninstall:

```
sudo apt-get remove jade && sudo apt-get autoremove
```

If that works, then you can try **npm install -g jade**.

## Turn it in

Turn in your assignment and attach (upload) your images directly to the assignment or place them all in a folder on Google Drive called **Ec2Checklist**. and include a note about and link to the folder.

1. ssh-authentication.png
- ssh-systemcheck.png
- server-update.png
- basic-system-check.png
- lamp-setup.png
- node-check.png
- node-check-versions.png

## Hint

Developers will want to set up the programmer utilities in the ~/bin directory. It should have been run automatically. If your **~/bin** directory contains these files, then you are all set:

```
charlie@elf-rover:~$ ls ~/bin
check-karma-grunt-config
CreateAllExpress
CreateExpressProject
elfgrepcomps
FixtureReady
InsertJadeExecGrunt.py
ShowPath
StartPythonWebServer
strip-triple-spaces
TestCheck
TestReady
```

 The file that creates these links is here:

```
~/Git/JsObjects/Utilities/SetupLinuxBox/CreateSymbolicLinks
```

[jso-install01]: http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html#jsobjects
[jso-install02]: http://www.ccalvert.net/books/CloudNotes/Assignments/Ec2Provision.html#jsobjects
[jso-install03]: https://github.com/charliecalvert/JsObjects/blob/master/README.md
