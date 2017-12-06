## The Docker File

We can automate the process outlined in the [Docker Starter Assignment][dsp] by creating a [Docker File][df].

    mkdir -p ~/DockerCode/MakeHtml
    cd ~/DockerCode/MakeHtml

Simple example:

    FROM ubuntu
    RUN echo 'Dockerfile' > /tmp/Dockerfile

## Where we are headed

Throughout this assignment, we are going to being building several docker files. When we are done, I'm picturing a directory structure something like this:

- DockerCode
  - UbuntuBase
    - Dockerfile
  - Apache
    - Dockerfile
  - MakeHtml
    - Dockerfile

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

    docker build -t <DOCKER-HUB-NAME>/ubuntu-base .

When running the above command, note the period at the end.

Run it like this:

    docker run -it <DOCKER-HUB-NAME>/ubuntu-base

For instance:

    docker build -t charliecalvert/ubuntu-base .
    docker run -it charliecalvert/ubuntu-base

The build command creates a Docker image based on your **Dockerfile**. The run command creates a container based on the image and runs it. To delete an image, see the text further down in this file.

## Disable Apache on Ubuntu Server

We are going to be running the Apache in a Docker container. As a result, we usually do not want to be running Apache on our Server. In our case, we frequently already have Apache installed and running on our server. We want, at minimum to stop it, which means it won't run until either:

- We restart it
- Or the Server is rebooted

Make sure your Ubuntu Server is not running Apache:

    sudo service apache2 status
    sudo service apache2 stop

If you don't want to have Apache start automatically when your server boots up, then disable it:

    sudo service apache2 stop
    sudo systemctl disable apache2


## Run Apache

The next step would be to add Apache to our Docker base ubuntu image.

Create a directory called **~/Docker/Apache**. Create a file called:

    ~/Docker/Apache/000-default.conf

Place this text in it:

```XML
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

    docker build -t <DOCKER-HUB-NAME>/apache .

And run it in the background:

    docker run -d -p 80:80 charliecalvert/apache

The above command maps the Docker container's Port 80 to the hosts Port 80. The following command, which is given only as an fyi, maps the Docker containers Port 80 to the hosts port 10025:

    docker run --name charlie -d -p 10025:80 charliecalvert/apache

## Get Bash Shell in Background Docker Task

Open a bash shell on the instance running in background:

    docker exec -it <CONTAINER_ID_OR_NAME> bash

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

[dsp]: http://www.ccalvert.net/books/CloudNotes/Assignments/Docker/DockerStarter.html
[df]: https://docs.docker.com/engine/reference/builder
