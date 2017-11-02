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

## References

This is for later:

- <https://writing.pupius.co.uk/apache-and-php-on-docker-44faef716150>
- <https://www.linode.com/docs/websites/hosting-a-website>
