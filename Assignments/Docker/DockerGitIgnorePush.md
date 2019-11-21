## Overview

Our goal is to create a bash script that will:

- [Tag][tag] our images and push them to Docker Hub
- Download the images on a remote machine, create a network for them, and launch them in active containers.

In short, we want to fully deploy our code with a single command.

To do this, we will create two bash scripts:

1.  One that tags and pushes
1.  A second that pulls our images and instantiates them in containers.

We can call both scripts from a third script if we want to do it all at once. On the other hand, if we have already pushed our images, we can use the second script to deploy them with a single command.

## Push to Docker Hub {#push}

There are two steps involved with pushing an image:

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

    docker tag &lt;IMAGE-NAME&gt;&lowbar;main:latest &lt;DOCKER HUB USERNAME&gt;gitignore_main:version1.0

Perhaps a bit like this:

    docker tag week04-docker-composer_main:latest jane_doe/gitignore_main:version1.0

Then we can push it like this:

    docker push jane_doe/gitignore_main:version1.0

The most important step is to give me a script that works, but I would also like you to use **gitignore_main**, **gitignore_router-tester** and **gitignore_system-environment** in your tags. In other words, the user name will vary throughout the class, but the rest of the tag should follow a standard.

**NOTE**: _There is a **docker-compose push** but I was having trouble getting it to work or getting help with it. If one of us finds time to figure out if or how it works, then that is all to the good. In the meantime, I, and perhaps some of you, need more practice learning how to push docker images. It is a skill all Docker developers need, so I think it is very useful to have this opportunity to increase our familiarity with it._

## Create the Push Script {#create-push}    

As you know, a bash script begins like this:

```bash
#! /usr/bin/env bash
```

Let's make ours a little bit fancier, and be sure that we include a check that a version number is passed in as a parameter:

```bash
#! /usr/bin/env bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

NORMAL_PORT=true

if [[ -z $1  ]]; then
    echo "======================================================"
    echo -e ${LIGHT_RED}"Aborting." \${YELLOW}"You must pass in a version number."\$NC       
    echo "Example:"
    echo -e $LIGHT_GREEN  "push_images_to_docker_hub '01'"$NC
    echo "======================================================"
    exit
fi
```

Inside your script, you can access the parameter passed in with **$1** symbol. Here is 01 hardcoded in:

    docker tag midterm_main:latest jane_doe/gitignore_main:version01

Here is what it looks like to provide a way to make the version number vary depending on the parameter passed to the script:    

    docker tag midterm_main:latest jane_doe/gitignore_main:version$1

you'll never guess the next part: I want you to fill in the rest of the script with code that tags and pushes your three docker images! Be sure to make all the relevant replacements of **01** with **$1**.

Organization, including casing:

- The branch should be **week10**.
- Put your code in a directory called **scripts**
- Call it **push-images-to-docker-hub**

Don't forget to make your script executable:

    chmod +x push_images_to_docker_hub

When you push, the first image takes some time, but the second two go quickly because they are so similar to the first. Perhaps this because all three Node JS Express programs share a lot of code. Maybe.

## Create Symbolic Link

Suppose you are working in the **week01-docker-compose** or **midterm-lastname** folder and you wanted to create a symbolic link to the script you created in the **scripts** folder. You would do this so you could call the script from either folder. Here is how to create the link:

    ln -s ../scripts/push-images-to-docker-hub .

I too will want to run your script from either folder, so don't skip this step.    

## View Tags

To see the tags you created locally, run this command and look for the tags field:

    docker image ls

To view tags on pushed images, start with a command like this:

curl 'https://registry.hub.docker.com/v2/repositories/library/debian/tags/'

## Deploy: Pull GitIgnore {#deploy}

After we have pushed our code to Docker Hub, the next step is to **pull** it to a second machine. We want this deploy stage to be simple, and as automated as possible. As a result, we should:

- Create a bash script that pulls down our images, sets up a network for them, and then launches them in containers on the network.
- Create a second script that will copy the first script to a remote machine and then execute it.

The end result is that we can fully deploy our images with a single command.

Call the pull script **pull-images-from-docker-hub** and save it in the scripts directory. Create a symbolic link to it from your project directory.

Start your script as we started the push script, making only a few changes to the message sent out if the user does not pass in the version parameter.

The first line of custom code in the script should create a network. Here is a how to create a new bridge network called **elfnet**

    docker network create -d bridge elfnet

Now write code to pull your image and create a container that uses the **elfnet** network:

    docker pull &lt;YOUR GIT HUB IMAGE NAME&gt;:version$1
    docker container run --name main -d -p 30025:30025 --network elfnet &lt;YOUR GIT HUB IMAGE NAME&gt;:version$1

Remember that the Docker Hub image name includes your Docker Hub username.

Take one moment more to remember exactly why you are creating the script: if you are on a machine that has Docker installed but does not have your images on it, then running this script should start the program running. In particular, after running the script, you should be able to go to the browser, type http://localhost:30025 in the address bar, and access all the features of your program.

## Copy the script {#copy-script}

Look [in the ConfigureLinux document][ssh-copy] to refresh your memory about how to copy files from one machine to another.

Copy the script to a remote machine and run it. Then access your program in a browser and make sure it works.

Call the script **copy-pull-script-to-server**. It should contain two lines:

- a **scp** statement explained in the above link to ConfigureLinux.
- A command to run the script remotely.

Suppose we want to run the **ls** command on a remote machine. Assuming we used the **~/.ssh/config** to define a Host called **aws**, then we can run the command like this:

    ssh aws ls

To get a listing of a specific directory, try something like this:

    ssh aws ls /home/ubuntu/Git

Like this:

    $ ssh aws ls /home/ubuntu/Git
    isit322-calvert-2018
    isit320-calvert-2019

The point being that by default a remote command is run in the home directory of the selected user. But we can hard code in specific paths either as parameters passed to a command or as the path to the script itself.

In our case, we want to run not **ls** but our pull script. Suppose we a script called **foo** in the remote home directory that printed out the word foo. We could invoke it two ways:

    ssh aws ./foo
    ssh aws /home/ubuntu/foo

In either case, it would print out the word **foo**.    

## Turn it in

Write your scripts. Push them. Specify folder, branch and optionally a tag. In the text page of the Canvas submission page, paste in a URL I can click on to see your code in action.

[ssh-copy]: https://www.elvenware.com/os-guide/linux/ConfigureLinux.html#more-on-ssh-keys
[tag]: https://docs.docker.com/engine/reference/commandline/tag/
