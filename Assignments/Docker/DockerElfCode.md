## Overview

Install Docker BCode. This is a copy of Charlie's development environment in a Docker container. It is based on the official [Docker image for Ubuntu][diu]. It is a bit like having Pristine Lubuntu in a Docker container.

## Install Docker

The details are in the [Install Section][dsin] of the [Docker Starter][ds] assignment.

## Install BCode

For now, it should be:

    docker pull charliecalvert/bcode:bcoder

Confirm that it downloaded:

      docker images

## Create Container and Run It {#run-it}

Create a container and run it:

      docker run -it charliecalvert/bcode:bcoder

You are placed at the root of the container logged in a the super user:

    root@d6ef78834ab6:/#

That is the way we create a new container and use it. Below I will explain how to start an existing container.

## Use the Container

We don't want to be super user. So become bcuser and navigate to the git dirctory:

    su bcuser
    gd
    ll

As you can see, the aliases used by JsObjects are loaded, and JsObjects itself is installed.

For the next step, you need to know the IP address of your copy of Pristine Lubuntu. Open up a new bash tab and type the following:

    ip addr | grep inet

You will see several lines of output. One of them contains your IP. The line you want might start a bit like this:

    inet 192.168.2.26/24 ETC

In this case 192.168.2.26 is your IP address.    

No go to the **.ssh** directory in the container and copy your private key from Pristine Lubuntu. You will need to modify the following line of code to use your IP address:

    scp bcuser@00.00.00.00:/home/bcuser/.ssh/prog272-key .    

Create a symbolic link to it:

    ln -s prog272-key main-key

Load it: **sshadd**

While we are at it, get your .gitconfig as well:

    scp bcuser@000.000.00.00:/home/bcuser/.gitconfig .

## Clone Repo

Go back to the Git directory and clone your repo:

    gd
    git clone git@github.com:username/prog272-lastname-2019.git

You will, of course, have to modify the Git URL.    

<!--       -->
<!-- links -->
<!--       -->

[diu]: https://hub.docker.com/_/ubuntu
[ds]: /teach/assignments/docker/DockerStarter
[dsin]: /teach/assignments/docker/DockerStarter#docker-install
