## Overview

This assignment is designed to be an introduction to Docker.

Docker is like VirtualBox plus a VM such as Pristine Lubuntu or Ubuntu server, but Docker is smaller and more easily deployed. It can also share resources in a way that a VM can't, so that multiple docker containers take up little more room than a single container.

Docker images start with a stripped down copy of Linux, or, more recently, something smaller called runc. We can modify that copy of Linux/[runc][runc] to support various tasks such as Apache web servers, MySQL databases, etc. Since Linux and runc are very flexible, the number of things that can be hosted inside a Docker image has few limits. Once we have configured the image to support a particular feature such as MySQL, we can then save the whole thing as a new image. Then we can move the image to other machines, and immediately start using the service we created in the image.

Perhaps the architecture might look a little like this:

- Top Level: Our tools such as MySQL or Apache
- Middle Level: Linux or [runc][runc]
- Host Level - Host OS
- Lowest Level: Hardware

Also, see this: https://stackoverflow.com/a/16048358/253576

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

After running this script, be sure to logout and then log in again. On Lubuntu, that should be **Start | Leave | Logout**. You should not have to run Docker as the superuser, that is, you should not need to use **sudo** to start it. If you get a permission denied error, then try logging out and logging in again. That should fix the problem. (The Docker Install video linked below might not adequately cover this step.)

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/N9jWhYaOrPs?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Listing Docker images

To see the images you have created or downloaded, do this:

    docker image ls

If you have not downloaded or created any images yet, you will see only the titles for the columns. If you get an error, however, please see the section below on the [Docker Dance](#docker-dance).

**NOTE**: _The syntax for listing docker images has changed. It was **docker images** but now it is **docker image ls**._

## Docker Management Commands

Confusingly, Docker has recently added a series of **Management Commands** to replace the old-style Docker commands. Here are the available **Management Commands** as of version 18.03:

```
Management Commands:
  config      Manage Docker configs
  container   Manage containers
  image       Manage images
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes
```

These 13 commands are designed to replace the 40 old-style commands. The goal of the **Management Commands** is to simplify the interface. It is easier to work with 13 commands than to work with 40. However, the web is bulging with Docker documentation that uses the old style commands. This can be quite confusing. If possible, if you find a tutorial or document on the web or on Elvenware that uses commands other those listed above, then try to switch to the new style **Management Commands**.

If you type **docker help** at the bash prompt you will see both old and new style commands. To get help one one of the new style commands try something like this:

    docker help container

This will give you information on the [docker container][dc] management command.

## The Docker Dance {#docker-dance}

Following the steps in the previous section should set up Docker correctly. However, if you get messages about not having the proper permissions when you run **docker image ls**, then try this:

    sudo groupadd docker
    sudo usermod -aG docker $USER    
    sudo systemctl enable docker

**NOTE**: _When running the above three commands, you may see yet more error messages. At least for now, ignore them._

Log out and log in again. One simple way to do this is to reboot your Ubuntu VM. When you are back up and running, try **docker image ls** again. If it returns without errors, then all is good. If you get errors, then repeat the steps in this section one more time. If that does not fix it, then head over to the discussion area and let us know what errors you are seeing.

## Docker Hub

Create an account and sign into the Docker Hub at [https://hub.docker.com/](https://hub.docker.com/).

From your local machine where you created your install Docker, login:

```nohighlighting
$ docker login -u charliecalvert
Password:
Login Succeeded
```

https://hub.docker.com/billing-plans/

## Testing Docker {#test}

Try some of these commands to see if you instance is installed. The last command should both download and run the Ubuntu Docker image.

```nohighlighting
docker container run -i hello-world
docker image ls
docker container run -it ubuntu
docker image ls
```

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
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
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

    docker start epic_jang
    docker exec -it epic_jang bash

To leave the container and return to the server, type **exit**.

Stop it like this:

    docker container stop epic_jang

Or like this:

    docker stop epic_jang

Remove (delete) it like this:

    docker container rm epic_jang

Alternately, you can **commit** the container to an image and then run the image:

    docker commit epic_jang foo
    docker run -it foo

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
