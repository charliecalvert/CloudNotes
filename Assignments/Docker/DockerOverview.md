## Overview

This assignment is designed to be an introduction to Docker.

Docker is tool for distributing applications. Like VirtualBox it allows you to download and deploy pre-built abstractions like ISO or OVA files. Only in Docker we call them images. The big difference is that Docker is smaller, more easily deployed, and better at reusing and sharing resources.

Each VM you create with VirtualBox takes up a set amount of room which is often quite large. Docker instances, called containers, can share resources in a way that a VM can't. As a result, multiple docker containers based on single image can take up little more room than a single container.

Docker images start with a stripped down copy of Linux, or, more recently, something smaller called runc. We can modify that copy of Linux/[runc][runc] to support various tasks such as Apache web servers, MySQL databases, Node applications, etc. Since Linux and runc are very flexible, the number of things that can be hosted inside a Docker image has few limits. Once we have configured the image to support a particular feature such as MySQL, we can then save the whole thing as a new image. Then we can move the image to other machines, and immediately start using the service we created in the image.

Perhaps the architecture might look a little like this:

- Top Level: Our tools such as MySQL or Apache
- Middle Level: Linux or [runc][runc]
- Host Level - Host OS
- Lowest Level: Hardware

Also, see this: https://stackoverflow.com/a/16048358/253576

## Docker Images and Containers

Lets take a moment to discuss Docker **images** and **containers**. These are two of the most fundamental tools used in Docker development.

Most of you are familiar with VirtualBox, so I will start with an analogy based on that tool.

- A Docker Image is like a VirtualBox OVA file. It might also be considered analogous to an ISO file or a DVD install disk. It is not an OS or a program, but rather an abstraction that can be used to create or install an OS or program.
- A Docker Container is like an installed OVA or ISO file. It is an instance of an OS or program. Like a VirtualBox VM, it can be stopped, started and deleted.

Docker **images** have no dynamic state associated with them. They are read only. **Containers** usually do have dynamic state that can be changed. For instance, a Docker image of an OS has a static set of files and programs. It has no state, and hence can't be changed. It is read-only.

If you create a container that we will call **container1** from that image, then you can add a new file to that container. If you create a second container called **container2** from the image, it will not contain the file you created in **container1**. You can however, save **container1** as an image. If you create a container based on that new image, then it will contain the file you added to **container1**.

**NOTE**: _Don't fret too much about understanding images and containers. The concepts can seem a bit abstract at first, but when you start working with them, they quickly take on a life of their own and are relatively easy to comprehend._

## Docker is a Bit like Git

There is a second fundamental concept that is helpful to grasp before you start working with Docker. There are set of tools for Docker that allow you to treat Docker images much as you treat a Git repository. In particular:

- We can install a Docker image from the cloud just as we can clone a Git repository from the cloud.
- Unlike a Git repository, however, you must take a second step and create a container based on the image we download.

You can also create a custom Docker image, upload it to the cloud, and share with others.

## Docker Management Commands

Before we go further, it is necessary to step back and say a few words about using the Docker CLI (command line interface). We use the commands to create Docker images and containers and to perform other tasks. These commands are the bread and butter of Docker development; I use them over and over whenever I work with Docker. You need to know these commands just as you need to know a set of commands to use Git.

The Docker commands have always been easy to use, but at times I have found them hard to remember. From my point of view, at least, them have lacked a carefully thought out internal structure that makes them intuitive to the average user.

To help address this issue, Docker has recently added 13 **Management Commands** to replace the 40 old-style Docker commands. The goal of the **Management Commands** is to simplify the Docker CLI interface. It is easier to work with 13 commands than to work with 40. Furthermore, the 13 commands are relatively well structured, and hence are fairly easy to use and remember.

There is, however, a problem: the web is bulging with Docker documentation that uses the old style commands. This can be quite confusing. If possible, if you find a tutorial or document on the web or on Elvenware that uses commands other those listed above, then try to switch to the new style **Management Commands**.

I have found the new **Management Commands** easier to user than the old style commands. For instance, it was not intuitively obvious to me if commands such as **docker run**, **docker rm**, **docker rmi** and **docker exec** were designed to work with images or containers. The new **Management** commands, however, make explicitly use the word **image** when working with **images** and **container** when working with **containers**. As a result, I have found that I need not spend as much time checking my notes to ensure that I am about to enter the right command. In short I find the new **Management Commands** easier to memorize and more intuitive.

Here are the available **Management Commands** as of version 18.03:

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

These 13 commands are designed to replace the 40 old-style commands. Most of the time we work with only two of them:

- **container**
- **image**

If you type **docker help** at the bash prompt you will see both old and new style commands. To get help on one of the new style commands try something like this:

    docker help container

This will give you information on the [docker container][dc] management command. To get information on a sub-command, use this syntax:

    docker container <COMMAND> --help

For instance:

    docker container exec --help

This will get you help on using the **exec** command when working with containers.    

**HINT**: _I suggest above that you switch from using the old style commands to the new style commands even if you find the old style commands well documented on the web. So how do you tell the old style from the new style? When working with containers and images, the new style commands use the words **container** and **image** while the old style commands do not. Let me just add, however, that it is not wrong to use the old style commands. They still work, and Docker has not officially declared them obsolete. Nevertheless, I prefer the new style commands and assume they will play a bigger role in Docker technology in the future._

## Useful links

- [Docker and Kubernetes](https://containerjournal.com/topics/container-ecosystems/kubernetes-vs-docker-a-primer/)
