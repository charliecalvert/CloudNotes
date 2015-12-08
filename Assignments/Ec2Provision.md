## Description

Create and provision an EC2 instance suitable for node development in one of Charlie's classes.

## Provision EC2

This assignment is perhaps not entirely complete, but here is enough to get you started. Perform the following tasks:

 - Update your server
 - Install Git
 - Download JsObjects from GitHub into your Git folder.
 - Install Node
 - Create and Configure an Elastic IP (See Lamp Section)

Optional, at least for now:

 - Install MongoDb
 - Install [Lamp][lamp]

Use the notes found here:

- <http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html>

**NOTE**: *There is no need to install SSH and Java on EC2. Those just happen to be found on the reference page I'm using for this assignment.*

We can go over this in class, but you will also need to understand how to open up ports, such as 30025, on AWS. For this assignment, you must at least get as far as opening up Port 80:

- <http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2SecurityGroups>

## Videos

- [Amazon Web Services EC2 Setup](https://youtu.be/TjVWpNZfTPE)
- [LinuxWebUser Part II](https://youtu.be/mSKxHKTQAc4)
- [LinuxWebUser Part III](https://youtu.be/RTICenN5n8Q)
- [Import Files into Git with SSH](https://youtu.be/p1obmWF6Nks)
- [Billing on AWS](https://youtu.be/4w0hKs35cdg)
- [PlayList](https://www.youtube.com/playlist?list=PLe8CjTxuUQ3_RmFD4ROFth7nX_UoUP6pV)

## SSH

Type **cd** and press enter to get to your home directory. Type **pwd** to be sure you are in the right place:

```
ubuntu@ip-172-31-33-240:~$ pwd
/home/ubuntu
```

In your home directory, paste in the following by right clicking on the ssh window:

```
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa 
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

Navigate to the .ssh directory and cat your public file:

```
cd .ssh
cat id_rsa.pub
```

Select the entire key with the mouse and press **Ctrl-C** to copy it. Then go to bitbucket, choose manage account, and add you new public ssh key, calling it something like Prog219AwsKey.

Type **cd** to go to the home directory. Then type: **nano .bashrc**

Scroll to the bottom, and paste in the following:

```
if [ -z "$SSH_AUTH_SOCK" ] ; then
    eval `ssh-agent`
fi

export PATH="$PATH:$HOME/npm/bin"

export NODE_PATH=:$HOME/npm/lib/node_modules
```

Type **Ctrl-O + enter** to save, and **Ctrl-X** to exit nano. 

Now process your updated **.bashrc** file from the command line: **source ~/.bashrc**

Make the key only readable by you, the owner:

    chmod 400 ~/.ssh/id_rsa

Then type the following to load the private key. (Like loading a key into Pageant): 

    ssh-add ~/.ssh/id_rsa

It might look like this:

```
ubuntu@ip-172-31-33-240:~/.ssh$ ssh-add id_rsa
Identity added: id_rsa (id_rsa)
```

Go to your Git Folder and clone your repo:

```
cd Git
git clone git@bitbucket.com:lastname/reponame.git
```

See also this section on using SSH config files:

- <http://www.elvenware.com/charlie/development/cloud/SshFtpsPutty.html#ssh-config>

## bash_aliases

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

	cd Git/JsObjects/Utilities/NodeInstall/
	./NodeInstall.sh

Then install the node packages that you need:

	./InstallNodePackages.sh

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

## Turn it In

To turn in the assignment, you should provide a screen shot showing:

- A listing of your Git folder (ls -la ~/Git). A sample screen shot is shown below, but it has more directories in it than your's will have.
- A listing of the JsObjects directory (ls -la ~/Git/JsObjects)
- A listing of your .ssh folder: (ls -la ~/.ssh
- A link to your site and/or a screen shot of it running. It should show the Apache welcome screen, as shown below. This part of the assignment will not work unless you have first opened up Port 80.

Here is a sample listing screen shot:

![Git Listing](http://www.elvenware.com/charlie/books/CloudNotes/Images/Ec2Listing01.png)

Here is a sample of what the Apache welcome screen should look like:

![Lamp](http://www.elvenware.com/charlie/books/CloudNotes/Images/LampApache2.png)

## More Information

The following document used in another of my classes also contains information that you might find useful:

 - [AwsEc2Expert](http://www.elvenware.com/charlie/books/CloudNotes/Assignments/AwsEc2Expert.html)

## History

What I did in class

```
 1  exit
    2  sudo apt-get update
    3  sudo apt-get upgrade
    4  exit
    5  ls
    6  sudo apt-get install git
    7  git --version
    8  git
    9  mkdir Git
   10  cd Git/
   11  git clone http://git@github.com/charliecalvert/JsObjects.git git clone http://git@github.com/charliecalvert/JsObjects.git
   12  git clone http://git@github.com/charliecalvert/JsObjects.git
   13  cd ,,
   14  cd
   15  cd .ssh/
   16  ls
   17  cd
   18  ckear'
   19  clear
   20  pwd
   21  cd Git/
   22  cd
   23  ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
   24  cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   25  pwd
   26  ubuntu@ip-172-31-33-240:~$ pwd
   27  /home/ubuntu
   28  cd .ssh/
   29  ls
   30  clear
   31  ls
   32  ls -l
   33  nano id_rsa.pub
   34  cat id_rsa.pub
   35  cat id_rsa.pub
   36  cd
   37  nano .bashrc
   38  cd .ssh
   39  ls
   40  chmod 400 id_rsa
   41  ssh-add id_rsa
   42  source ~/.bashrc
   43  ssh-add id_rsa
   44  ubuntu@ip-172-31-33-240:~/.ssh$ ssh-add id_rsa
   45  Identity added: id_rsa (id_rsa)
   46  cd ..
   47  cd Git/
   48  dir
   49  git clone git@bitbucket.org:ccalvert/prog219-calvert.git
   50  cd prog219-calvert/
   51  ls
   52  cd Week05-AngularMongoCrud/
   53  npm install
```
