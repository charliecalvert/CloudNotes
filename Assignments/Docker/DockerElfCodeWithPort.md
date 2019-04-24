## Overview

The goal is to take the container we created in [DockerElfCode][dec] and:

- Save it as image
- Start it with port 30025 published
- Run ReactBasics from our new container
- Browse to it from Pristine Lubuntu

## View containers

First, let's look at the available containers. You might see something like this:

    docker ps -a
    CONTAINER ID        IMAGE                         COMMAND             CREATED             STATUS                       PORTS               NAMES
    d6ef78834ab6        charliecalvert/bcode:bcoder   "/bin/bash"         4 days ago          Exited (0) 12 minutes ago                        laughing_kilby

This states that the container we created based on **charliecalvert/bcode:bcoder** was created 4 days ago and has the name **laughing_kilby**. We like this container because it has our repository in it, and it knows how to talk to GitHub because it also contains our private key in the **~/.ssh** directory.

## Start Your Container

If you want to start your container and look around, type something like this, using the name for your container, which is probably not **laughing_kilby**.

    docker start laughing_kilby
    docker exec -it laughing_kilby bash

Take a look around and make sure all is as you expect. For instance, see if you can pull your latest updates to your repository, if there are any.

When you are done, exit the container by typing **exit** once or twice to return to Pristine Lubuntu. Check to confirm your container still has the same name:

    docker ps -a

Stop the container:

    docker stop laughing_kilby

You don't need to stop the container if you have not started it.    

## Save the Container as a Docker Image {#save-it}

Save that container as a new Docker image:

    docker commit laughing_kilby charliecalvert/bcode:ported

You might try using your name rather than mine. For instance, if your Docker username was foobar, you might do this:

    $ docker commit laughing_kilby foobar/bcode:ported
    sha256:61a569e24201db4ee4143db38d77a45081aad467cf6fa187e90cc3e35ed5a79f
    charlie@elf-path:~/Git/CloudNotes/Assignments/Docker$ (master)

Then you can view the image:

    $ docker images
    REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
    foobar/bcode           ported              61a569e24201        3 seconds ago       979MB

## Run on Specific Port

Now run the new image and publish port 30025. This means that port 30025 on Pristine Lubuntu will be mapper to port 30025 in your container:

    docker run -it -p 30025:30025 charliecalvert/bcode:ported

You should now be able to browse to your program like this:

    localhost:30025    

**NOTE**: _Be sure that nothing else is running on port 30025 when you try to start the container on the poort. For instance, if you are running Week03-ExpressBasics, close it with Ctrl-C._

## Turn it in

Take a screen shot of your Docker container command line with **Week03_ExpressBasics** running on port 30025. I want to see what it looks like after you browser to port 30025 in Pristine Lubuntu:

    localhost:30025

Exit the container and take a screenshot of the output from this command:

    docker port relaxed_bartik

But put in the name of your container instead of relaxed_bartok.

[dec]: /teach/assignments/docker/DockerElfCode.html

Be sure your container is running when you try the port command.

Run **docker ps -a**. If the status field shows something like this then port command won't work:

    Exited (0) 36 hours ago

To fix the issue, try starting the container:

    docker start relaxed_bartik

Now try the port command again, and it should work:

    docker port relaxed_bartik
    # Here you should see some text
    # with our 30025 port in it.
