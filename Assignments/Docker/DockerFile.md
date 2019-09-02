## The Docker File

We can automate the process outlined in the [Docker Starter Assignment][dsp] by creating a [Docker File][df]. In this assignment you will learn the basics of working with **Dockerfiles**.

## Your Docker Hub Name

In the code found in this assignment you are going to need to know your Docker hub name. You created this name when you first logged into the Docker Hub. If you have forgotten the name, you can always find it by logging into the Docker Hub and going to its home page.

![Docker name on Docker hub][dnh]

**IMAGE**: _To get your docker hub name, log into docker and go to the home directory. As you can see, my Docker Hub name is **charliecalvert**._

**NOTE**: _At the beginning of a quarter, some students realize that they have forgotten how to log into an online resource such as Docker Hub that they used in a previous quarter. I keep track of this information in [Lastpass](https://lastpass.com). This utility has saved me untold hours over the years. I consider it an essential resource and a safe way to track usernames and passwords. I believe another highly rated product is called **1password**, but I have never used it and hence can't provide help to students who choose it. You can also save passwords to your Chrome or Firefox account, but I'm sure you can see why that is not as useful as working with a tool that runs in all browsers._

## Simple Example

Here is an example **Dockerfile** that creates an image based on the official [Docker Hub ubuntu image](https://hub.docker.com/_/ubuntu):

    FROM ubuntu
    RUN echo 'File content' > /tmp/TempFile

The first line pulls down the **ubuntu** image from the Docker Hub and creates a local copy. After creating the local image the second line in the file runs a command inside the image which creates a small text file with the words **File content** inside it.

You can save the two lines in a file called **~/temp/Dockerfile**. Run it from the **temp** directory like this:

    docker image build -t &lt;YOUR-DOCKER-HUB-NAME&gt;/docker-test .

In my case, this might look a bit like this:

    docker image build -t charliecalvert/docker-test .

Now give it a name and run it:

    docker container run -name test01 -it charliecalvert/docker-test

At this point you should be able to navigate into the /tmp directory and view the file you created:

```
$ docker container run --name test01 -it charliecalvert/docker-test
root@2b00769cc093:/# cd tmp/
root@2b00769cc093:/tmp# ll
total 12
drwxrwxrwt 1 root root 4096 Sep  1 22:36 ./
drwxr-xr-x 1 root root 4096 Sep  1 22:39 ../
-rw-r--r-- 1 root root   13 Sep  1 22:36 TempFile
root@2b00769cc093:/tmp# cat TempFile
File content
root@2b00769cc093:/tmp#
```

As you can see, by default you are logged in as **root**. This means you are the **admin** and have full rights in the instance. There are no other users. In particular, there is no **bcuser** account. I mention this only because I create a **bcuser** account in the VirtualBox VMs that I give to my students at the beginning of the quarter.

## Where we are headed

Throughout this assignment, we are going to being building several docker files. When we are done, I'm picturing a directory structure something like this:

- DockerCode
  - UbuntuBase
    - Dockerfile
  - Apache
    - Dockerfile
  - MakeHtml
    - Dockerfile

There is a root directory called **DockerCode**. Beneath it a three sub-directories, each containing a **Dockerfile**.

Here are the commands to create one of the directories shown above. Issue the command from the root of your repository:

    mkdir -p ~/DockerCode/MakeHtml
    cd ~/DockerCode/MakeHtml

The **-p** flag allows you to create two directories at once.

## Set up Ubuntu:

In this section of the text we learn how to create an Docker image and Docker container based on the official Ubuntu Server image from the Docker Hub. We make sure it is up to date and contains certain key pieces such as **git** and **nano**.

Place this text in **~/Docker/UbuntuBase/Dockerfile**:

    FROM ubuntu
    RUN apt-get update --yes
    RUN apt-get upgrade --yes

    RUN apt-get install git -y
    RUN apt-get install build-essential -y
    RUN apt-get install nano -y

To create the image run a command of this type:

    docker image build -t <DOCKER-HUB-NAME>/ubuntu-base .

When running the above command, note the period at the end.

Run it like this:

    docker container run -it <DOCKER-HUB-NAME>/ubuntu-base

For instance:

    docker image build -t charliecalvert/ubuntu-base .
    docker container run -it charliecalvert/ubuntu-base

The build command creates a Docker image based on your **Dockerfile**. The run command creates a container based on the image and runs it. To delete an image, see the text further down in this file.

## Disable Apache on Ubuntu Server

Our next goal is to run the [Apache web server][apache] in a Docker container. As a result, we usually do not want to be running Apache on our Server. In our case, we frequently already have Apache installed and running on our server. We want, at minimum to stop it, which means it won't run until either:

- We restart it
- Or the Server is rebooted

Run these commands in the bash shell to be sure your Ubuntu Server is not actively running the Apache web server:

    sudo service apache2 status
    sudo service apache2 stop

If you don't want to have Apache start automatically when your server boots up, then disable it:

    sudo service apache2 stop
    sudo systemctl disable apache2

## Run Apache

Create a directory called **~/Docker/Apache**. Create a file called public-html/index.html:

    mkdir public-html
    echo '<p>foo</p>' > public-html/index.html

Create your **Dockerfile** in the **DockerCode/Apache** directory and copy your HTML file into it:

    FROM httpd:latest
    COPY ./public-html/ /usr/local/apache2/htdocs/

Create a simple bash script called **DockerCode/Apache/build** to create and start your image:

```bash
#! /usr/bin/env bash

docker image build -t calvert-apache2 .
docker container run -dit --name calvert-running-app -p 8080:80 calvert-apache2
```

Of course, you should use your lastname and not mine.

Don't forget to make your script executable:

    chmod +x build

Now run it:

    ./build

Go to **http://localhost:8080** to see your site in action.

**NOTE**: _In [RunApacheOldStyle.html](RunApacheOldStyle.html) you will find a more complex way to do the same thing._

## Get Bash Shell in Background Docker Task

Open a bash shell on the instance running in background:

    docker container exec -it <CONTAINER_ID_OR_NAME> bash

For instance:

    docker container exec -it ubbase bash    

## Create MakeHtml

In a directory called **~/Docker/MakeHtml**, create this **Dockerfile**


    FROM charliecalvert/apache
    RUN apt-get install sudo -y
    RUN useradd -ms /bin/bash bcuser
    RUN usermod -aG sudo bcuser
    RUN echo "bcuser:bcuser" | chpasswd
    RUN su bcuser
    RUN mkdir /home/bcuser/Git
    RUN cd /home/bcuser/Git && git clone http://git@github.com/charliecalvert/JsObjects.git
    RUN su -c "cd /home/bcuser/Git/JsObjects/Utilities/SetupLinuxBox && ./UbuntuSetup b" bcuser
    RUN cd /home/bcuser/Git/JsObjects/Utilities/NodeInstall && echo bcuser | sudo -S ./NodeInstall.sh
    RUN cd /home/bcuser/Git/JsObjects/Utilities/NodeInstall && echo bcuser | sudo -S ./NpmHelper e

This Dockerfile does a number of things, including:

- installing the **sudo** program so the user can use the **sudo** command.
- Create a user called **bcuser** and give the user the expected password of **bcuser**.
- Create a Git directory and clone JsObjects into it.
- Run **UbuntuSetup** in the background so no prompts are presented to the user.
- Install node and the various global NPM packages that we use most often.

Here is useful little script called **go** that I put in the **MakeHtml** directory:

    #!/bin/bash

    docker build -t charliecalvert/make-html2 .
    docker run --name maker -d -p 80:80 charliecalvert/make-html2
    docker exec -it maker /bin/bash

I created a second script called **stop**. Or perhaps you might call it **delete-container-and-image** or just **start-over-from-scratch**. I used it a lot when developing the **Dockerfile** because it allowed me to try a run and check the results. If I wasn't happy or felt the **Dockerfile** was not yet complete, then I could make some adjustments to the **Dockerfile**, delete my image and container, and start over by running an updated copy of the **Dockerfile**. Here is the script:

    #!/bin/bash

    docker stop maker
    docker rm maker
    docker rmi charliecalvert/make-html2

Notice that in these scripts I'm giving the container a **name**. Specifically, I'm calling it **maker**. By giving it a known name I'm able to remove (delete) it with **stop** script if I want to start over.

## Push your results

You can push your finished image to the Docker Hub:

docker push charliecalvert/make-html2, though of course you would want to use your name on the Docker Hub.

## Turn it in

Point me to your image on the Docker Hub. It should look something like this:

    https://hub.docker.com/r/lastname/make-html/

Give me the command to get your image:

    docker pull lastname/make-html

Give me at least one screenshot of you processing a docker file. Put your copies of the three Dockerfiles in a folder of your repository. Just copy your **Docker** folder recursively (cp -r) into your repository. So I will be looking for a folder called Docker in your repository. But go ahead and give me:

- repo url (This is your **isit320-lastname-2017** repo.)
- Directory name
- Branch

[apache]: https://httpd.apache.org/
[df]: https://docs.docker.com/engine/reference/builder
[dnh]: https://s3.amazonaws.com/bucket01.elvenware.com/images/docker-file-hub.png
[dsp]: http://www.ccalvert.net/books/CloudNotes/Assignments/Docker/DockerStarter.html
