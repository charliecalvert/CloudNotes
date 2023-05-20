---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker/DockerStarter.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker
fileName: DockerStarter.md
relativePath: /Docker/DockerStarter.md
title: DockerStarter
directoryName: Docker
category : docker-guide
---

## Overview

This assignment will help you install and start using Docker.

**NOTE**: _If you have not done so already, please first read the [Docker Overview](DockerOverview.html)._

The opening sections of this assignment are very important, but if you have done them already, and just want to skip to the core part of the assignement, go [here](#core-assignment).

## Docker is very Popular

Docker is a giant in the developer world. It is the third most important Developer Platform, ahead of both Android and iOS, according to the 90,000 developers who responded to the [StackOverflow developer survey](https://insights.stackoverflow.com/survey/2019#technology-_-platforms):

![StackOverflow Survey Results](https://s3.amazonaws.com/bucket01.elvenware.com/images/stack-overflow-survey-platforms.png)

As you can see, Docker is the third most important platform for developers, ahead of MacOS and AWS. In short, the only thing developers are less likely to give up are their primary operating systems: Linux and Windows. It is difficult to overestimate the importance of this technology in our world.

## Docker Install

Install the [Docker Community Edition](https://docs.docker.com/install/linux/docker-ce/ubuntu/) on Ubuntu.

If you are going to be using Pristine Lubuntu, take a snapshot of it before installing Docker.

To perform the actual install, run the script called **DockerInstall** found on your hard drive in the **JsObjects/Utilities/InstallScripts** directory:

- [DockerInstall][dkin]

**NOTE**: _It is always a good idea to pull the **JsObjects** repository before using any portion of it. GitHub tells me that as of October, 2019, I have publised 2,518 commits to that repo. The point being that it gets updated fairly often._

So the commands to install Docker might be like this:

    jou
    cd InstallScripts
    ./DockerInstall

This is the correct way to install as of Oct 1, 2019. Recall that **jou** takes you to the **JsObjects/Utilities** directory. From there navigate into **InstallScripts**. Then run **./DockerInstall**.

After running this script, be sure to _**logout and then log in again**_. On Lubuntu, that should be **Start | Leave | Logout**. Then log in again. If you are installing on the cloud, you can usually just type exit to end your SSH session. You can then immediately reconnect. That is also a way to log in.

Once installed, you should not have to run Docker as the superuser, that is, you should not need to use **sudo** to start Docker. If you get a permission denied error, don't run **sudo**. Instead, then try logging out and logging in again. That should fix the problem. (The Docker Install video linked below might not adequately cover this step.)

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/N9jWhYaOrPs?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Listing Docker images

To see the images you have created or downloaded, do this:

    docker image ls

If you have not downloaded or created any images yet, you will see only the titles for the columns. If you get an error, however, please see the section below on the [Docker Dance](#docker-dance).

**NOTE**: _The old style command was **docker images** but the new Management Command is **docker image ls**. At first blush, this might make the old style command appear best because it is shorter. The advantage of the new commands is that all commands having to do with images begin with **docker image ...**._

## The Docker Dance {#docker-dance}

Following the steps in the previous sections should set up Docker correctly. However, if you get messages about not having the proper permissions when you run **docker image ls**, then don't resort to using **Sudo**. Instead, try this:

    sudo groupadd docker
    sudo usermod -aG docker $USER
    sudo systemctl enable docker

**NOTE**: _When running the above three commands, you may see yet more error messages. At least for now, ignore them._

Log out and log in again. One simple way to do this is to reboot your Ubuntu VM. When you are back up and running, try **docker image ls** again. If it returns without errors, then all is good. If you get errors, then repeat the steps in this section one more time. If that does not fix it, then head over to the discussion area and let us know what errors you are seeing.

If you have to use sudo to run Docker commands you will end up with files and/or directories owned by **root**. If you do end up with Docker files in your home directory that are owned by **root**, then fix it like this:

    sudo chown -R bcuser:bcuser <Directory>

**Directory** is folder that contains files owned by root.

## Docker Hub

Create an account and sign into the Docker Hub at [https://hub.docker.com/](https://hub.docker.com/).\

**NOTE**: _Remember, it is almost impossible to survive in a cloud based technology such as ours without having:

* Mastered SSH and SSH ssh Keys
* Installing a password manager such as LastPass or devising some other strategy for managing usernames and passwords. (I've been using LastPass, usually multiple times a day, since 2012. So far it has worked well for me, and has done a great job of protecting my privacy and keeping my actions on the Internet secure.)

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


## The Core Assignment {#core-assignment}

Start by installing the official Docker **ubuntu** image and running it as a container:

    docker container run -it ubuntu

Then add a small text file in the tmp directory of your new **ubuntu** container:

    cd tmp
    echo foo > foo.txt

Here is an example of what it all might look like:

```
docker container run -it ubuntu
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
5667fdb72017: Pull complete
d83811f270d5: Pull complete
ee671aafb583: Pull complete
7fc152dfb3a6: Pull complete
Digest: sha256:b88f8848e9a1a4e4558ba7cfc4acc5879e1d0e7ac06401409062ad2627e6fb58
Status: Downloaded newer image for ubuntu:latest
root@842dd1905a8a:/# cd tmp/
root@842dd1905a8a:/tmp# echo foo > foo.txt
root@842dd1905a8a:/tmp# cat foo.txt
foo
root@842dd1905a8a:/tmp#
```

When you type exit at the container prompt, then you are sent back to bash shell:

```
root@842dd1905a8a:/tmp# exit
exit
ubuntu@ip-172-31-16-120:~/Git/isit320-calvert-2019$
```

At this point your container has been "exited" and is stopped:

```
docker container ls -a
CONTAINER ID   IMAGE    COMMAND     CREATED        STATUS                     NAMES
842dd1905a8a   ubuntu   "/bin/bash" 3 minutes ago  Exited (0) 8 seconds ago   naughty_lovelace
```

The name **naughty_lovelace** is generated automatically by Docker and will very likely be different on your system.

To renter the container, you use the **start** and **exec** commands:

```
docker container start naughty_lovelace
docker container exec -it naughty_lovelace bash
```

After again exiting the container, you can stop it and push it to the Docker Hub, but use your Docker Hub username, not mine:

```
docker container stop naughty_lovelace
docker commit -m "Added foo.txt" -a "charlie" naughty_lovelace charliecalvert/ubuntufootxt
```

Then you can delete the image locally and pull it again from the docker hub:

```
docker image rm charliecalvert/ubuntufootxt:latest
docker pull charliecalvert/ubuntufootxt
docker container run -it charliecalvert/ubuntufootxt:latest
```

The next few sections, until the **Turn it in** section, are references and FYI. The above is the whole assignment except what you see in **Turn it in**.

## Run an Image

If you have not done so already, you can pull the ubuntu image:

```
docker container run -it ubuntu
docker image ls
```

In general, we run an image like this.

```xml
docker container run -it <image-name>;
```

After it has been run, a container is created, and then we tend to just **start** and **exec** the container, as explained below. But if you want to create a second, fresh instance of the image, we use the **run** command shown above.

- **docker container run**: Create a container from an image and start it
- **docker container start**: Start an existing container

Note that we pass in the **ID** or **name** of a container to the above commands, as shown at the beginning of this section.

## Docker Push

You first need to create a tag that includes your Docker Hub user name:

    docker tag my-image:latest charliecalvert/my-image:try

To push an image created by user **charliecalvert** called **makehtml04** to the cloud, do this:

    docker push charliecalvert/my-image:try

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

    docker container ls -a --format "&#123;&#123;.ID&#125;&#125;"

Here is an example:

    docker container ls -a --format "&#123;&#123;.ID&#125;&#125;: &#123;&#123;.Image&#125;&#125;"
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

## Get Bash Shell in Background Docker Task

If you run **docker container ls -a** and see that you have a running container you can use the **exec** command to get inside it or to run a command inside it.

To "get inside the container", open a bash shell on the instance running in background:

    docker container exec -it <CONTAINER_ID_OR_NAME> bash

For instance:

    docker container exec -it my-container bash

The **exec** command cannot be run on a stopped (exited) container. If you see a container and it is stopped, you can start it like this:

    docker container start my-container

After issuing that command, you can run the **exec** command.

## Turn it in

Make sure you have done the [core assignment](#core-assignment).

Take a screen shot of the ssh bash shell on your local Ubuntu server after running the **docker images** command. It should show a list of the containers installed on your system. Also include the URL for your Docker Hub page that displays your docker images.

If you were also able to save the **ubuntufootxt** image to DockerHub and can give me a link then that is all to the good. When getting the link, select the **Public View** option and send me both the URL (hub.docker.com not cloud.docker.com) and the **docker pull** statement.

    https://hub.docker.com/r/your-user-name
    docker pull your-user-name/ubuntufootxt

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
