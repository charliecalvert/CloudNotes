## Overview

Our goal is to create a bash script that will:

- Tag our images and push them to Docker Hub
- Download the images on a remote machine, create a network for them, and launch them in active containers.

In short, we want to fully deploy our code with a single command.

To do this, we will create two bash scripts:

1.  One that tags and pushes
1.  A second that pulls our images and instantiates them in containers.

We can call both scripts from a third script if we want to do it all at once. On the other hand, if we have already pushed our images, we can use the second script to deploy them with a single command.

## Push to Docker Hub {#push}

There are two steps involved with push an image:

- Tag it
- Push it.

Before we can tag an image, we have to know what it is called. In our case, many of you will have images with names that begin like this:

- week04-docker-composer_

The last part of the name will be one of the following:

- main
- route-tester
- system-environment

Like this:

- week04-docker-composer_main
- week04-docker-composer_route-tester
- week04-docker-composer_system-environment

However, the name on your system could very easily differ from this, as the directory in which our program is stored becomes part of the name by default. To see the name on your system: use our **dsee** alias, or the docker command to view all our containers.

Once we know the image name, we generally create a tag for the image with a command that uses your Docker Hub user name:

    docker tag <IMAGE-NAME>\_main:latest <DOCKER HUB USERNAME>gitignore_main:firsttry

Perhaps a bit like this:

    docker tag midterm_main:latest jane_doe/gitignore_main:try01

Then we can push it like this:

    docker push jane_doe/gitignore_main:try

## Create the Push Script {#create-push}    

As you know, a bash script begins like this:

```bash
#! /usr/bin/env bash
```

And you'll never guess the next part: I want you to fill in the rest of the script with code that tags and pushes your three docker images!

Organization, including casing:

- I think the branch should be **week09**.
- Put you code in a directory called **scripts**
- Call it **push_images_to_docker_hub**

## Deploy: Pull GitIgnore {#deploy}

After we have pushed our code to Docker Hub, the next step is to **pull** it to a second machine. We want this deploy stage to be simple, and as automated as possible. As a result, we should:

- Create a bash script that pulls down our images, sets up a network for them, and then launches them in containers on the network.
- Create a second script that will copy the first script to a remote machine and then execute it.

The end result is that we can fully deploy our images with a single command.

Of course,

docker network create -d bridge elfnet

docker pull charliecalvert/gitignore_main:try
docker container run --name main -d -p 30025:30025 --network elfnet charliecalvert/gitignore_main:try

docker pull charliecalvertgitignore_router:try
docker container run --name router -d -p 30029:30029 --network elfnet charliecalvert/gitignore_router:try

docker pull charliecalvertgitignore_system:try
docker container run --name system-environment -d -p 30028:30028 --network elfnet charliecalvert/gitignore_system:try
