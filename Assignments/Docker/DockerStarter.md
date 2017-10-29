## Overview


```nohighlighting
docker run -i hello-world
docker images
docker run -it ubuntu
```

## Docker Hub

Create an account and sign into the Docker Hub at [https://hub.docker.com/](https://hub.docker.com/).

From your local machine where you created your Docker image, login:

```nohighlighting
$ docker login -u charliecalvert
Password:
Login Succeeded
```

https://hub.docker.com/billing-plans/

## Run

When inside Ubuntu, note the image you are using.

```nohighlighting
docker commit -m "Added node 8.1 and updated os" -a "charlie" a9272b30f0b1 charliecalvert/ubuntu-node
docker images
docker run -it charliecalvert/ubuntu-node
```

## Install Node

```nohighlighting
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
```
