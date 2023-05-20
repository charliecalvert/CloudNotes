---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker/OldDockerMakeHtml.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker
fileName: OldDockerMakeHtml.md
relativePath: /Docker/OldDockerMakeHtml.md
title: OldDockerMakeHtml
directoryName: Docker
category : docker-guide
---

## Install Software

Run these commands from inside a Docker container:

```nohighlighting
apt-get update
apt-get upgrade
apt-get install git
apt-get install build-essential
apt-get install nano
apt-get install curl
apt-get install apache2
service apache2 start
```

We are not installing LAMP because we don't need MySQL or the various scripting languages such as Python or PHP. All we need is Apache, so we are only install it.

## Install Node on Docker Instance {#install-node}

This code will allow you to install NodeJs on Docker:

```nohighlighting
# The new setup script for Node.js v12.X
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

We have just switched from Node 8.x to Node 9.0. However, at the time of this writing (Nov 2017), I advise sticking with Node 8.x. By December 2017 or January 2018, it would probably be safe to move to Node 9.0.

## Create User

```nohighlighting
useradd -ms /bin/bash bcuser
usermod -aG sudo bcuser
su bcuser
```

To confirm that all is as expected:

```nohighlighting
whoami
pwd
```

When we installed Apache, we created an **/var/www/html** directory. Use **chown** to give **bcuser** the right permissions to access it.

## Save New Image from Container {#save-new-image}

The changes you make to an image cause the images identifier to change. The identifier is a number like this:

    a9272b30f0b1

This number appears in your command prompt.

When inside Ubuntu, note the image you are using:

```nohighlighting
docker commit -m "Added node 8.1 and updated os" -a "charlie" a9272b30f0b1 charliecalvert/makehtml00
docker images
docker run -it charliecalvert/makehtml00
```

And then later, if you make more changes:

    docker commit -m "Added user and JsObjects" -a "charlie" 21a7589a83ee charliecalvert/makehtml01

## Learn More about Apache on Docker

Get the IP address:

  docker inspect -f '&#123;&#123;range .NetworkSettings.Networks&#125;&#125;&#123;&#123;.IPAddress&#125;&#125;&#123;&#123;end&#125;&#125;' 9a8cd9005efe

We are going to be running apache from our container, so we don't want it running on the VirtualBox copy of our Ubuntu server. Therefore, if apache2 is running on your VirtualBox copy of the Ubuntu Server, then do this:

    sudo service apache2 stop

Now start your container and ask the VirtualBox copy of your Ubuntu server to host the container's instance of apache on port 80:

    docker run -it -p 80:80 charliecalvert/makehtml02

Note that inside the container, you may have to start apache2.

Map a drive on server to your container so you don't have save the container if you make changes:

    docker run -p 80:80 -d -v /Users/dan/site:/var/www/site mysite

## Create Ubuntu Image

Take a snapshot of Pristine Lubuntu before installing Docker.

You can install the JsObjects development environment with this command:

    docker pull charliecalvert/bcode:bcoder

Create the Ubuntu container:

    docker pull ubuntu
    # launch container
    docker run -it ubuntu

Then prepare the container:

    # Add sudo command to your container
    apt-get update && apt-get install -y sudo && rm -rf /var/lib/apt/lists/*
    apt-get install git
    apt-get install ssh
    adduser bcuser
    usermod -aG sudo bcuser
    su bcuser
    sudo apt-get update

For the user set the full name to bcuser and the password to bcuser.

Now sign in as that user and navigate to the home directory:

    su bcuser
    cd

Create the SSH key pair as described in [elvenware](https://www.elvenware.com/cloud-guide/SshFtpsPutty.html#sshKeys)
