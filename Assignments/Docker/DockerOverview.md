---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker/DockerOverview.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker
fileName: DockerOverview.md
relativePath: /Docker/DockerOverview.md
title: DockerOverview
directoryName: Docker
category : docker-guide
---

## Overview

This assignment is designed to be an introduction to Docker. Please also see the official [Docker Overview][dover].

- Elven Slides: [http://bit.ly/docker-overview](http://bit.ly/docker-overview)

Docker is a tool for distributing applications. Like VirtualBox it allows you to download and install pre-built abstractions similar to ISO or OVA files. Only in Docker, we call them images. The big difference is that Docker is smaller, more easily deployed, and better at reusing and sharing resources.

- Both Docker and VBox can be used to deploy a server OS such as Ubuntu.
- Docker, however, is used primarily to deploy applications.

Each VM you create with VirtualBox takes up a set amount of room which is often quite large. Docker instances, called containers, can share resources in a way that a VM can't. As a result, multiple docker containers based on a single image can take up little more room than a single container.

## Linux runC

Understanding the full Docker stack or architecture is a very complex subject that one does not need to master in order to use Docker. However, it might be useful to a say a few words about how it is put together. The key point to grasp is that it is very flexible and allows us to put a wide variety of software in a container.

Docker is written in the [Go language](https://golang.org/).

The Docker daemon ([Dockerd][dkrd]) responds to requests from the Docker CLI and manages images, containers, networks and volumes.

Docker images start with a stripped-down copy of Linux, or, more recently, something smaller called [runc][runc]. Various other bits and pieces are also involved, such as [containerd][conterd].

Tools such [runc][runc] and [containerd][conterd] are flexible enough to allow us to run various tasks in our containers. Examples of these tasks include Apache web servers, MySQL databases, Node applications and Ubuntu server. Since this architecture is very flexible, there are few limits on what we can host inside a Docker image. Once we have configured the image to support a particular feature such as MySQL, we can then save the whole thing as a new image. Then we can move the image to other machines, and immediately start using the service we created in the image.

Perhaps the [Docker architecture][darch] might look a little like this:

- Top Level: Our tools such as MySQL or Apache
- Middle Level: Linux, dockerd, and/or [runc][runc] etc.
- Host Level - Host OS
- Lowest Level: Hardware

For those of you who are visual, here is a series of [useful docker diagrams][dpic]. If you look for the credits, it is easy to see which are the official docker images.

Also, see this StackOverflow [discussion of runc][sodr].

## Docker Images and Containers

Lets take a moment to discuss Docker **images** and **containers**. These are two of the most fundamental tools used in Docker development. See the offical Docker docs on [imnages and containers][dic]

Most of you are familiar with VirtualBox, so I will start with an analogy based on that tool.

- A Docker Image is like a VirtualBox OVA file. It might also be considered analogous to an ISO file or a DVD install disk. It is not an OS or a program, but rather an abstraction that can be used to create or install an OS or program.
- A Docker Container is like an installed OVA or ISO file. It is an instance of an OS or program. Like a VirtualBox VM, it can be stopped, started and deleted.

Docker **images** serve as the basis for a container. They are read-only and have no dynamic state.

**Containers** are based on images. They usually have dynamic state. For instance, a Docker image of an OS such **ubuntu** has a static set of files and programs. It has no state, and hence can't be changed. It is read-only.

If you create a container that we will call **container1** from that image, then you can add a new file to that container. The image goes from a static set of read-only files to a dynamic OS that you can interact with.

If you create a second container called **container2** from the image, it will not contain the file you created in **container1**. You can however, save **container1** as an image. If you create a container based on that new image, then it will contain the file you added to **container1**.

**NOTE**: _Don't fret too much about understanding images and containers. The concepts can seem a bit abstract at first, but when you start working with them, they quickly take on a life of their own and are relatively easy to comprehend._

## Docker is a Bit like Git

There is a second fundamental concept that is helpful to grasp before you start working with Docker. There are set of tools for Docker that allow you to treat Docker images much as you treat a Git repository. In particular:

- We can install a Docker image from the cloud just as we can clone a Git repository from the cloud.
- Unlike a Git repository, however, you must take a second step and create a container based on the image we download.

You can also create a custom Docker image, upload it to the cloud, and share it with others.

## Docker Management Commands

We use the Docker CLI (command line interface) to create Docker images and containers and to perform other tasks. These commands are the bread and butter of Docker development; we use them over and over when we work with Docker. You need to know these commands just as you need to know a set of commands to use Git.

The Docker commands have always been easy to use, but at times I have found them hard to remember. From my point of view, at least, they have lacked a carefully thought out internal structure that makes them intuitive to the average user.

To help address this issue, Docker has recently added 13 **Management Commands** to replace the 40 old-style Docker commands. The goal of the **Management Commands** is to simplify the Docker CLI interface. It is easier to work with 13 commands than to work with 40. Furthermore, they are relatively well structured, and hence are reasonably easy to use and remember.

There is, however, a problem: the web is bulging with Docker documentation that uses the old-style commands. This can be quite confusing. If possible, if you find a tutorial or document on the web or on Elvenware that uses commands other those listed above, then try to switch to the new style **Management Commands**.

I have found the new **Management Commands** easier to use than the old-style commands. For instance, it was not intuitively obvious to me if commands such as **docker run**, **docker rm**, **docker rmi** and **docker exec** were designed to work with images or containers. The new **Management** commands, however, explicitly use the word **image** when working with **images** and **container** when working with **containers**. As a result, I have found that I need not spend as much time checking my notes to ensure that I am about to enter the right command. In short I find the new **Management Commands** easier to memorize and more intuitive.

If you type **docker help** at the shell prompt, you will see both the Management and old-style commands. Here are the  **Management Commands** as of Docker version 18.03:

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

## Docker Resources

Most students in my classes are doing their work in an instance Lubuntu running inside a VirtualBox VM hosted on Windows. Assuming you are indeed running a Lubuntu VM, then we have an architecture that looks like this:

- Windows and VirtualBox
  - Lubuntu
    - Docker
      - Ubuntu server in a Docker container

This no doubt seems like a very expensive architecture in terms of system resources. However, the Ubuntu container can use many of the resources already installed as part of Lubuntu. Furthermore, adding a second such container creates an even smaller hit, since even more resources can be shared.

For instance, if you run **docker system df -v** you can see how space your image is using:

| Name                      | Size    | Shared Size | Unique Size |
|:---------------------------|:--------|-------------|-------------|
| charliecalvert/docker-test | 64.19MB | 64.19MB     | 13B         |
| ubuntu                     | 64.19MB | 64.19MB     | 0B          |

As you can see, the original ubuntu image takes up 64.19MB. Our **docker-test** image shares all 64.19MB of the original ubuntu image plus 13B for the small text file we created.


Suppose we create two instances of our custom image and then use **docker system df -v** to check our disk usage:


| CONTAINER ID | IMAGE                      | SIZE | CREATED        | NAMES  |
|:-------------|:---------------------------|------|----------------|--------|
| 8d238a8421d2 | charliecalvert/docker-test | 0B   | 17 seconds ago | test02 |
| 9b39280413fa | charliecalvert/docker-test | 0B   | 38 seconds ago | test01 |

As you can see, they take up 0B disk space since they simply use the existing image.

Docker performs this magic by sharing the host OS kernel and libraries. Note that these shared resources resources are used for both the image and for the container based on the image. In other words, if you create an ubuntu image on an instance of an Ubuntu host, then the image can share much of the code already installed on the host.

A VM, by contrast, creates its own copy of the OS kernel and libraries. Even if you create an instance of an Ubuntu VM on top of an instance of an Ubuntu host, there is a great deal of duplication. Thus creating a VM is a much more expensive operation both in terms of disk spaced used, and in terms of the time it takes to launch the container vs the time it takes to launch the VM. More specifically, a container is often launched in a very few seconds while a VM can take a minute or longer to launch.

**NOTE**: _The actual time to launch a VM or container vary hugely depending on the hardware involved, but in each case the container takes up much less space and launches much more quickly. It can, however, take a significant period of time to download an image from the Docker HUB. But once the image is downloaded, it can share resources with the host OS, and creating a custom image or container based on it can be very fast._

Suppose we create a second text file in one of the containers:

```
root@8d238a8421d2:/# cd tmp/
root@8d238a8421d2:/tmp# ll
total 12
drwxrwxrwt 1 root root 4096 Sep  5 21:55 ./
drwxr-xr-x 1 root root 4096 Sep  5 21:57 ../
-rw-r--r-- 1 root root   13 Sep  5 21:55 TempFile
root@8d238a8421d2:/tmp# echo foo > bar.txt
```

This takes up an additional 4 bytes of disk space:

| CONTAINER ID | IMAGE                      | SIZE | CREATED        | NAMES  |
|:-------------|:---------------------------|------|----------------|--------|
| 8d238a8421d2 | charliecalvert/docker-test | 4B   | 17 seconds ago | test02 |
| 9b39280413fa | charliecalvert/docker-test | 0B   | 38 seconds ago | test01 |

## Useful links

- [Docker and Kubernetes](https://containerjournal.com/topics/container-ecosystems/kubernetes-vs-docker-a-primer/)

[conterd]: https://blog.docker.com/2017/08/what-is-containerd-runtime/
[darch]: https://docs.docker.com/engine/docker-overview/#docker-architecture
[dic]: https://docs.docker.com/engine/docker-overview/#docker-objects
[dkrd]: https://docs.docker.com/engine/reference/commandline/dockerd/
[dover]: https://docs.docker.com/engine/docker-overview/
[dpic]: https://images.app.goo.gl/HizYhP9FZA6xza74A
[sodr]: https://stackoverflow.com/a/16048358/253576
[runc]: https://blog.docker.com/2015/06/runc/
