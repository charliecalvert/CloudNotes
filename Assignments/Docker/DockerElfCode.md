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

Create a container and [run it][dri]:

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

```html
scp bcuser@<YOUR IP HERE>:/home/bcuser/.ssh/prog272-key .    
```

Create a symbolic link to it:

    ln -s prog272-key main-key

Load it: **sshadd**

While we are at it, type **cd** to get to your home directory and copy your .gitconfig into the home directory of your container. Again, you will have to put in your IP address:

    scp bcuser@000.000.00.00:/home/bcuser/.gitconfig .

Remember to type in your IP address. Use **nano** to edit your **.gitconfig** and change your name to reflect that you are in a Docker container.

    [user]
    	email = charlie@elvenware.com
    	name = Charlie on Docker BCode

**NOTE**: _You may need to install **nano**:_

    sudo apt-get install nano

## Clone Repo

Go back to the Git directory and clone your repo:

    gd
    git clone git@github.com:username/prog272-lastname-2019.git

You will, of course, have to modify the Git URL.

Make several changes to your README.md file from your repo both in the container and in Pristine Lubuntu. I want to be able to see changes in your Git log showing you made changes in both places.

## Start an existing Container

Once again, lets use the Docker Starter assignment to walk us through these steps.

Get the [container name][dcn] from the Docker Starter.

[Start and exec][sec] the container.

## Turn it in

Mostly I will be looking at your at the log for your repo with this command: **git log**. However, also include one screen shot showing that you are logged into the container and inside your repo. I'm hoping to see a screenshot with something like this in it:

    bcuser@d6ef78834ab6:~/Git/prog272-calvert-2019$ nano README.md
    bcuser@d6ef78834ab6:~/Git/prog272-calvert-2019$ git add .
    bcuser@d6ef78834ab6:~/Git/prog272-calvert-2019$ git commit -m "Pushing readme from docker"
    [master 79d8ac4] Pushing readme from docker
     1 file changed, 2 insertions(+)
    bcuser@d6ef78834ab6:~/Git/prog272-calvert-2019$ git push
    Counting objects: 3, done.
    Delta compression using up to 8 threads.
    Compressing objects: 100% (3/3), done.
    Writing objects: 100% (3/3), 327 bytes | 327.00 KiB/s, done.
    Total 3 (delta 1), reused 0 (delta 0)
    remote: Resolving deltas: 100% (1/1), completed with 1 local object.
    To github.com:charliecalvert/prog272-calvert-2019.git
       e668258..79d8ac4  master -> master

<!--       -->
<!-- links -->
<!--       -->

[dcn]: /teach/assignments/docker/DockerStarter.html#list-containers
[diu]: https://hub.docker.com/_/ubuntu
[ds]: /teach/assignments/docker/DockerStarter.html
[dri]: /teach/assignments/docker/DockerStarter.html#run-an-image
[dsin]: /teach/assignments/docker/DockerStarter.html#docker-install
[sec]: /teach/assignments/docker/DockerStarter.html#start-a-container
