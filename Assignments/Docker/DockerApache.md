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

Create a directory called **~/Docker/Apache**. Inside it, create a directory called **public-html/** and one called **public-html/css**:

    mkdir -p public-html/css

Run **get-gist** inside **public-html** and get the Elf Basic HTML file. Rename it to **index.html**. Also get **normalize.css** and put it in the CSS directory:

    wget https://necolas.github.io/normalize.css/8.0.1/normalize.css

Create a link to the file from **index.html**:

    &lt;link rel="stylesheet" href="css/normalize.css"&gt;

Create your **Dockerfile** in the **DockerCode/Apache** directory and copy your HTML file into it:

    FROM httpd:latest
    COPY ./public-html/ /usr/local/apache2/htdocs/

Create a simple bash script called **DockerCode/Apache/build** to create and start your image:

```bash
#! /usr/bin/env bash

docker image build -t calvert-apache .
docker container run -dit --name apache-app -p 8080:80 calvert-apache
```

Of course, you should use your lastname and not mine.

Don't forget to make your script executable:

    chmod +x build

Now run it:

    ./build

Go to **http://localhost:8080** to see your site in action.

**NOTE**: _In [RunApacheOldStyle.html](RunApacheOldStyle.html) you will find a more complex way to do the same thing._

## Reset

```bash
#! /usr/bin/env bash

docker image build -t calvert-apache .
docker container run -dit --name apache-app -p 8080:80 calvert-apache
```
