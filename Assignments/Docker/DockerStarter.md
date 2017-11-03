## Overview

This assignment introduces Docker.

## Docker Install

There are two scripts in **JsObjects/InstallScripts**:

- InstallDockerPart01
- InstallDockerPart02

Run the first. If it goes without error, then run the second. Type **exit** when it ends.

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
    apt-get install apache2
    service apache2 start

We are not installing LAMP because we don't need MySQL or the various scripting languages such as Python or PHP. All we need is Apache, so we are only install it. This will create a **/var/www/html** directory. Use **chown** to give **bcuser** the right permissions to access it.

## Create User

    useradd -ms /bin/bash bcuser
    usermod -aG sudo bcuser
    su bcuser

To confirm that all is as expected:

    whoami
    pwd


## Save New Image

The changes you make to an image cause the images identifier to change. The identifier is a number like this:

    a9272b30f0b1

This number appears in your command prompt.    

When inside Ubuntu, note the image you are using:

```nohighlighting
docker commit -m "Added node 8.1 and updated os" -a "charlie" a9272b30f0b1 charliecalvert/makehtml00
docker images
docker run -it charliecalvert/ubuntu-node
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

## Install Node on Docker Instance {#install-node}

```nohighlighting
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
```

## The Docker File

We can automate the above process by creating a [Docker File][df].

    mkdir -p ~/DockerCode/MakeHtml
    cd ~/DockerCode/MakeHtml

Simple example:

    FROM ubuntu
    RUN echo 'Dockerfile' > /tmp/Dockerfile

## Set up Ubuntu:

In this section of the text we learn how to create an UbuntuServer image that is up to date and contains certain key pieces.

Place this text in **~/Docker/UbuntuBase/Dockerfile**:

    FROM ubuntu
    ENV DEBIAN_FRONTEND noninteractive
    RUN apt-get update --yes
    RUN apt-get upgrade --yes

    RUN apt-get install git -y
    RUN apt-get install build-essential -y
    RUN apt-get install nano -y

Create the image:

    docker built -t <DOCKER-HUB-NAME>/ubuntu-base

Run it like this:

    docker run -it <DOCKER-HUB-NAME>/ubuntu-base

For instance:

    docker build -t charliecalvert/ubuntu-base
    docker run -it charliecalvert/ubuntu-base

The build command creates a Docker image based on your **Dockerfile**. The run command creates a container based on the image and runs it. To delete an image, see the text further down in this file.

## Run Apache

The next step would be to add Apache to our base ubuntu image.

Create a directory called **~/Docker/Apache**. Create a file called:

    ~/Docker/Apache/000-default.conf

Place this text in it:

```nohighlighting
ServerName www.example.com

<VirtualHost *:80>
	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	# ServerName www.example.com

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html

	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf
</VirtualHost>
```

Put this **Dockerfile** in the same directory:

    FROM charliecalvert/ubuntu-base

    RUN apt-get install apache2 -y
    env APACHE_RUN_USER    www-data
    env APACHE_RUN_GROUP   www-data
    ENV APACHE_LOG_DIR     /var/log/apache2
    env APACHE_PID_FILE    /var/run/apache2.pid
    env APACHE_RUN_DIR     /var/run/apache2
    env APACHE_LOCK_DIR    /var/lock/apache2

    ADD 000-default.conf   /etc/apache2/sites-enabled/

    RUN mkdir -p $APACHE_RUN_DIR $APACHE_LOCK_DIR $APACHE_LOG_DIR

    EXPOSE 80

    CMD ["apache2", "-D", "FOREGROUND"]

Then build it:

    docker built -t <DOCKER-HUB-NAME>/apache

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

## References

These are useful:

- [Docker Glossary](https://docs.docker.com/glossary/)

This is for later:

- <https://writing.pupius.co.uk/apache-and-php-on-docker-44faef716150>
- <https://www.linode.com/docs/websites/hosting-a-website>


[df]: https://docs.docker.com/engine/reference/builder
