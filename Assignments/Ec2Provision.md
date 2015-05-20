## Description

Create and provision an EC2 instance suitable for node development in one of Charlie's classes.

## Provision EC2

This assignment is perhaps not entirely complete, but here is enough to get you started. Perform the following tasks:

 - Update your server  
 - Install Git 
 - Download JsObjects from GitHub into your Git folder.
 - Install Node 
 - Install MongoDb 
 - Install Lamp
 
Use the notes found here:
 
- <http://www.elvenware.com/charlie/os/linux/ConfigureLinux.html>
 
**NOTE**: *There is no need to install SSH and Java on EC2. Those just happen to be found on the reference page I'm using for this assignment.*

We can go over this in class, but you will also need to understand how to open up ports, such as 30025, on AWS. For this assignment, you must at least get as far as opening up Port 80:

- <http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2SecurityGroups>

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

export NODE_PATH=:/home/ubuntu/npm/lib/node_modules
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

## Git

Please read this section of the Elvenware Git docs:

- [Configuring Git][config-git]

[config-git]:http://www.elvenware.com/charlie/development/cloud/Git.html#configuring-git


## Turn it In

To turn in the assignment, you should provide a screen shot showing:

- A listing of your Git (ls -la ~/Git). A sample screen shot is shown below, but it has more directories in it than your's will have.
- A listing of the JsObjects directory (ls -la ~/Git/JsObjects)
- A listing of your .ssh folder: (ls -la ~/.ssh
- A link to your site and/or a screen shot of it running. It should show the Apache welcome screen, as shown below. This part of the assignment will not work unless you have first opened up Port 80.

Here is a sample listing screen shot:

![Git Listing](http://www.elvenware.com/charlie/books/CloudNotes/Images/Ec2Listing01.png)

Here is a sample of what the Apache welcome screen should look like:

![Lamp](http://www.elvenware.com/charlie/books/CloudNotes/Images/LampApache2.png)

## More Information

The following document used in another class also contains information that you might find useful:

 - [AwsEc2Expert](http://www.elvenware.com/charlie/books/CloudNotes/Assignments/AwsEc2Expert.html)

> by [Charlie Calvert](http://elvenware.com/charlie).