---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker/DockerHtmlMaker.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker
fileName: DockerHtmlMaker.md
relativePath: /Docker/DockerHtmlMaker.md
title: DockerHtmlMaker
directoryName: Docker
category : docker-guide
---

## Overview

There are two different ways to get files from a host OS into a Docker container:

- Copy the files from the host to the container
- Link a directory from the host to the container.

This assignment has enough in it to get you going. I'll try to clarify it over the next little bit.

## Copy files

The advantage of this solution is that it provides a container that will act in a defined and reliable manner wherever it is installed.

The Docker **COPY** command, when placed in a **Dockerfile**, is simple to use:

    FROM charliecalvert/apache
    COPY html /var/www/html

This will copy the files from the **html** directory on the host to the **/var/www/html** directory in the container. Note that I am building directly on top of our **apache** container.

To be clear, I have removed from the **Dockerfile** all the code that recreated the **bcuser** user, JsObjects and a node environment. The plan is now to build the html files on the host and then copying them to the container.

The one catch here is that the **html** directory must be in the **context** directory. We can't copy the files directly from a location like **/var/www/html**. First copy them from **/var/www/html** to the directory that contains your **Dockerfile**. For instance:

    cp -rv /var/www/html ~/DockerCode/MakeHtml/.

Docker says this is necessary so that we can create a reproducable environment. I feel this going to far. But there it is.

## Link Directory

It is also possible to link a directory on the host to a directory in the container. The catch is that you have to do this when you start the container. You can hardcode the link into the container. Again, Docker says it won't let you hardcode the link because it is not guaranteed to be reproducable in all environments.

    docker run --name maker-elf -v /var/www/html:/var/www/html -d -p 80:80 charliecalvert/apache

Note that in this case we don't create a third image at all. We just use our existing **apache** image.

## More flexibility

Though you don't have to do it at this time, it seems to me that we could:

- Build MakeHtml as we did in the original MakeHtml assignment. That is, get JsObjects, set up node and npm, the whole deal.
- Run the container  with -v option mapping our **~/ssh** directory to the same location in container.
- Then use the mapped ~/ssh directory to load our key and set up our repository.
- Run MakeHtml in the container.
- Exit the container and **commit** the container to an image.

That way we would have an automatically set up container that we could work in and develop as outlined throughout much of the first half of this course.

For now I think the first of the options, the Copy option, is the simplest way to get us up and running and let me grade the midterm. Doing the steps outlined above in this section of this text is probably going to be part of another assignment.

## Save a Container as an Image

    docker commit maker-elf maker-go  

That is:

    docker commit <EXISTING_CONTAINER> <NEW_IMAGE_NAME>

## Turn it in

For now, do the Copy and Link steps and take screenshots showing that it works. Turn in the screenshots, and turn in a link to your EC2 instance that works. Given the information above, you should be able to give me an EC2 instance that contains your midterm and all your homework related to running EC2 instances.

If that is impossible, stop any running containers and start apache. Set things up so I can grade your midterm and any other assignments that depend on EC2 and apache.

In short, get that EC2 image working one way or another. To pass this assignment, you need the container, but if you can't get it running, the set things up with Apache running in the host.

Start Apache:

```bash
#!/bin/bash

sudo systemctl enable apache2
sudo service apache2 start
```

Stop Apache script:

```bash
#!/bin/bash

sudo service apache2 stop
sudo systemctl disable apache2
```
