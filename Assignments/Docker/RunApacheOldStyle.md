---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker/RunApacheOldStyle.md
relativePath: Assignments/Docker/RunApacheOldStyle.md
title: RunApacheOldStyle
queryPath: Assignments/Docker/
subject: Docker
fileNameMarkdown: RunApacheOldStyle.md
fileNameHTML: RunApacheOldStyle.html
---


<!-- toc -->
<!-- tocstop -->

## Run Apache Old

This section is now outdated and will be deleted.

Now add Apache to our Docker base ubuntu image.

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

    docker container run -d -p 80:80 charliecalvert/apache

The above command maps the Docker container's Port 80 to the hosts Port 80. The following command, which is given only as an fyi, maps the Docker containers Port 80 to the hosts port 10025:

    docker container run --name charlie -d -p 10025:80 charliecalvert/apache

## Other Old Code

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
