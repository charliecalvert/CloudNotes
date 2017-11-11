## Overview

This assignment is designed to be an introduction to Docker.

Docker is like VirtualBox plus a VM such as Pristine Lubuntu or Ubuntu server, but Docker is smaller and more easily deployed. It can also share resources in a way that a VM can't, so that multiple docker containers take up little more room than a single container.

Docker images start with a stripped down copy of Linux, or, more recently, something smaller called runc. We can modify that copy of Linux/[runc][runc] to support various tasks such as Apache web servers, MySQL databases, etc. Since Linux and runc are very flexible, the number of things that can be hosted inside a Docker image has few limits. Once we have configured the image to support a particular feature such as MySQL, we can then save the whole thing as a new image. Then we can move the image to other machines, and immediately start using the service we created in the image.

Perhaps the architecture might look a little like this:

- Top Level: Our tools such as MySQL or Apache
- Middle Level: Linux or [runc][runc]
- Host Level - Host OS
- Lowest Level: Hardware

Also, see this: https://stackoverflow.com/a/16048358/253576

## Docker Install

There are two scripts in **JsObjects/Utilities/InstallScripts**:

- InstallDocker

Run the script.

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/N9jWhYaOrPs?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Docker Hub

Create an account and sign into the Docker Hub at [https://hub.docker.com/](https://hub.docker.com/).

From your local machine where you created your Docker image, login:

```nohighlighting
$ docker login -u charliecalvert
Password:
Login Succeeded
```

https://hub.docker.com/billing-plans/

## Test

```nohighlighting
docker run -i hello-world
docker images
docker run -it ubuntu
```

## Docker Push

To push an image created by user **charliecalvert** called **makehtml04** to the cloud, do this:

    docker push charliecalvert/makehtml04

## Install Software

    apt-get update
    apt-get upgrade
    apt-get install git
    apt-get install build-essential
    apt-get install nano
    apt-get install curl
    apt-get install apache2
    service apache2 start

We are not installing LAMP because we don't need MySQL or the various scripting languages such as Python or PHP. All we need is Apache, so we are only install it.

## Install Node on Docker Instance {#install-node}

This code will allow you to install NodeJs on Docker:

```nohighlighting
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
```

We have just switched from Node 8.x to Node 9.0. However, at the time of this writing (Nov 2017), I advise sticking with Node 8.x. By December 2017 or January 2018, it would probably be safe to move to Node 9.0.

## Create User

    useradd -ms /bin/bash bcuser
    usermod -aG sudo bcuser
    su bcuser

To confirm that all is as expected:

    whoami
    pwd

When we installed Apache, we created an **/var/www/html** directory. Use **chown** to give **bcuser** the right permissions to access it.

## Save New Image

The changes you make to an image cause the images identifier to change. The identifier is a number like this:

    a9272b30f0b1

This number appears in your command prompt.    

When inside Ubuntu, note the image you are using:

```nohighlighting
docker commit -m "Added node 8.1 and updated os" -a "charlie" a9272b30f0b1 charliecalvert/makehtml00
docker images
docker run -it charliecalvert/makehtml00
```

And then later, if you make more changes:

    docker commit -m "Added user and JsObjects" -a "charlie" 21a7589a83ee charliecalvert/makehtml01

## Learn More about Apache on Docker

Get the IP address:

  docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 9a8cd9005efe

We are going to be running apache from our container, so we don't want it running on the VirtualBox copy of our Ubuntu server. Therefore, if apache2 is running on your VirtualBox copy of the Ubuntu Server, then do this:

    sudo service apache2 stop

Now start your container and ask the VirtualBox copy of your Ubuntu server to host the container's instance of apache on port 80:  

    docker run -it -p 80:80 charliecalvert/makehtml02

Note that inside the container, you may have to start apache2.

Map a drive on server to your container so you don't have save the container if you make changes:

    docker run -p 80:80 -d -v /Users/dan/site:/var/www/site mysite

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

## Start a container

If you have a container (not an image) called **epic_jang**, start it, and then hop into it:

    docker start epic_jang
    docker exec -it epic_jang bash

To leave the container and return to the server, type **exit**.

Stop it like this:

    docker stop epic_jang

Alternately, you can **commit** the container to an image and then run the image:


    docker commit epic_jang foo
    docker run -it foo

## Turn it in

Take a screen shot of the ssh bash shell on your local Ubuntu server after running the **docker images** command. It should show a list of the containers installed on your system. Also include the URL for your Docker Hub page that displays your docker images.

## References

These are useful:

- [Docker Glossary](https://docs.docker.com/glossary/)

This is for later:

- <https://writing.pupius.co.uk/apache-and-php-on-docker-44faef716150>
- <https://www.linode.com/docs/websites/hosting-a-website>

[runc][https://github.com/opencontainers/runc]
