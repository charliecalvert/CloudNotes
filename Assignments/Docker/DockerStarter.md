## Overview

This assignment will help you install and start using Docker.

**NOTE**: _If you have not done so already, please first read the [Docker Overview](DockerOverview.html)._

## Docker Install

Install the [Docker Community Edition](https://docs.docker.com/install/linux/docker-ce/ubuntu/) on Ubuntu.

Take a snapshot of Pristine Lubuntu before installing Docker.

Run the script found on your hard drive in **JsObjects/Utilities/InstallScripts**:

- [DockerInstall][dkin]

So the commands to install Docker might be like this:

    jou
    cd InstallScripts
    ./DockerInstall

This is the correct way to install as of May 3, 2019. Recall that **jou** takes you to the **JsObjects/Utilities** directory. From there navigate into **InstallScripts**. Then run **./DockerInstall**.

After running this script, be sure to logout and then log in again. On Lubuntu, that should be **Start | Leave | Logout**.

Once installed, you should not have to run Docker as the superuser, that is, you should not need to use **sudo** to start Docker. If you get a permission denied error, then try logging out and logging in again. That should fix the problem. (The Docker Install video linked below might not adequately cover this step.)

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/N9jWhYaOrPs?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Listing Docker images

To see the images you have created or downloaded, do this:

    docker image ls

If you have not downloaded or created any images yet, you will see only the titles for the columns. If you get an error, however, please see the section below on the [Docker Dance](#docker-dance).

**NOTE**: _The old style command was **docker images** but the new Management Command is **docker image ls**. At first blush, this might make the old style command appear best because it is shorter. The advantage of the new commands is that all commands having to do with images begin with **docker image ...**._

## The Docker Dance {#docker-dance}

Following the steps in the previous sections should set up Docker correctly. However, if you get messages about not having the proper permissions when you run **docker image ls**, then try this:

    sudo groupadd docker
    sudo usermod -aG docker $USER    
    sudo systemctl enable docker

**NOTE**: _When running the above three commands, you may see yet more error messages. At least for now, ignore them._

Log out and log in again. One simple way to do this is to reboot your Ubuntu VM. When you are back up and running, try **docker image ls** again. If it returns without errors, then all is good. If you get errors, then repeat the steps in this section one more time. If that does not fix it, then head over to the discussion area and let us know what errors you are seeing.

## Docker Hub

Create an account and sign into the Docker Hub at [https://hub.docker.com/](https://hub.docker.com/).\

**NOTE**: _Remember, it is almost impossible to survive in a cloud based technology such as ours without having:

* Mastered SSH and SSH ssh Keys
* Installing a password manager such as LastPass or devising some other strategy for managing usernames and passwords.

Using the same username and password everywhere, or relying on your memory are not sustainable strategies. Regardless of what you read, in most cases LastPass or similar tools provide the safest and most reliable solution._

From your local machine where you created your install Docker, login to the Docker Hub:

```nohighlighting
$ docker login -u charliecalvert
Password:
Login Succeeded
```

https://hub.docker.com/billing-plans/

## Testing Docker {#test}

Try some of these commands to see if you instance is installed. The first command is a basic system check, if it works, you are up and running. The last command should both download and run the Ubuntu Docker image.

```nohighlighting
docker container run -i hello-world
docker image ls
docker container run -it ubuntu
docker image ls
```

Here is the output from the running the first, Hello World, command:

_Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID: [https://hub.docker.com/](https://hub.docker.com/)

For more examples and ideas, visit:
 [https://docs.docker.com/get-started/](https://docs.docker.com/get-started/)_

## Run an Image

In general, we run an image like this.

```xml
docker container run -it <image-name>;
```

After it has been run, a container is created, and then we tend to just **start** and **exec** the container, as explained below. But if you want to create a second, fresh instance of the image, we use the **run** command shown above.

- **docker container run**: Create a container from an image and start it
- **docker container start**: Start an existing container

Note that we pass in the **ID** or **name** of a container to the above commands, as shown at the beginning of this section.

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

## Docker Push

To push an image created by user **charliecalvert** called **makehtml04** to the cloud, do this:

    docker push charliecalvert/makehtml04

## Learn More about Apache on Docker

Get the IP address:

  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 9a8cd9005efe

We are going to be running apache from our container, so we don't want it running on the VirtualBox copy of our Ubuntu server. Therefore, if apache2 is running on your VirtualBox copy of the Ubuntu Server, then do this:

    sudo service apache2 stop

Now start your container and ask the VirtualBox copy of your Ubuntu server to host the container's instance of apache on port 80:  

    docker run -it -p 80:80 charliecalvert/makehtml02

Note that inside the container, you may have to start apache2.

Map a drive on server to your container so you don't have save the container if you make changes:

    docker run -p 80:80 -d -v /Users/dan/site:/var/www/site mysite

## Delete an image

The basic command looks like this:

    docker rmi <ImageName>

Like this:

    docker rmi charliecalvert/foobar

Sometimes, when you try that, you get this:

    $ docker rmi charliecalvert/foobar
    Error response from daemon: conflict: unable to remove repository reference "charliecalvert/foobar" (must force) - container a37009760711 is using its referenced image 982c61b58757

In that case, delete the referenced container with the **rm** command:

    $ docker rm a37009760711
    a37009760711

Now you should be able to delete the image:

    ubuntu@ip-172-31-26-184:~/DockerCode/MakeHtml
    $ docker rmi charliecalvert/foobar
    Untagged: charliecalvert/foobar:latest
    Deleted: sha256:982c61b5875720bbe5d3a8fa02c0e932734add5c366e2bb6c3d691b4798c128d

## List Containers

To list all containers new style:

    docker container ls

To see both running and stopped, do this:

    docker container ls -a

Old Style to show both running and stopped containers:

    docker ps -a

To list all containers with just ID new style:

    docker container ls -a --format "{{.ID}}"

Here is an example:

    docker container ls -a --format "{{.ID}}: {{.Image}}"
    672dbb9755d2: react-simple
    7a3c78cb6a03: mongo-test_elf-app
    c0afe21f7996: mongo

To list all containers with just ID old style:

    docker ps -aq

Also try (docker ps -as)

To delete all containers

    docker rm $(docker ps -aq)

To remove all images:

    docker rmi $(docker images -q)

## Start a container

If you have a container (not an image) called **epic_jang**, start it, and then hop into it:

    docker container start epic_jang
    docker container exec -it epic_jang bash

To leave the container and return to the server, type **exit**.

Stop it like this:

    docker container stop epic_jang

Or like this for the old style:

    docker stop epic_jang

Remove (delete) it like this:

    docker container rm epic_jang

Alternately, you can **commit** the container to an image and then run the image:

    docker commit epic_jang foo
    docker container run -it foo

## Turn it in

Take a screen shot of the ssh bash shell on your local Ubuntu server after running the **docker images** command. It should show a list of the containers installed on your system. Also include the URL for your Docker Hub page that displays your docker images.

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

## Permission Denied

If you get an error like this:

    Got permission denied while trying to connect to the Docker daemon socket at unix:///var etc...

Add a docker group, join it, log out and log back in. Disable and re-enable docker. Now you should be good. Like this:


    sudo addgroup --system docker
    sudo usermod -a -G docker $USER
    exit # AND LOG BACK IN
    sudo snap disable docker
    sudo snap enable docker
    docker images

## References

These are useful:

- [Docker Glossary](https://docs.docker.com/glossary/)

This is for later:

- <https://writing.pupius.co.uk/apache-and-php-on-docker-44faef716150>
- <https://www.linode.com/docs/websites/hosting-a-website>

<!--       -->
<!-- links -->
<!--       -->

[dc]: https://docs.docker.com/engine/reference/commandline/container/

[runc][https://github.com/opencontainers/runc]

[dkin]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/InstallScripts/DockerInstall
