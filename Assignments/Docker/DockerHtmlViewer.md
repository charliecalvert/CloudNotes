## Overview

There are two different ways to get files from a host OS into a Docker container:

- Copy the files from the host to the container
- Link a directory from the host to the container.

This assignment has enough in it to get you going. I'll try to clarify it over the next little bit.

## Video Simple Docker

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/bYy19vDMRRs?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Video Apache Control

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/mDY0dZ_78jE?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Copy files

The advantage of this solution is that it provides a container that will act in a defined and reliable manner wherever it is installed.

This is simple to do, but place the **Dockerfile** for this part of the assignment it in its own directory:

    DockerCode/HtmlViewer

For instance:

    mkdir ~/DockerCode/HtmlViewer    

You will need to put at least one file in that directory. In particular, you will need a **Dockerfile**.

The one catch here is that the **html** directory must be in the **context** directory. We can't copy the files directly from a location like **/var/www/html**. First copy them from **/var/www/html** to the directory that contains your **Dockerfile**. This is the context directory. For instance:

    cp -rv /var/www/html ~/DockerCode/HtmlViewer/.

Or this should also work:

    cp -ruvp /var/www/html ~/DockerCode/HtmlViewer/.

Docker says this is necessary so that we can create a reproducable environment. I feel this going to far. But there it is.

The Docker **COPY** command, when placed in a **Dockerfile**, is simple to use:

    FROM charliecalvert/apache
    COPY html /var/www/html

This will copy the files from the **html** directory on the host to the **/var/www/html** directory in the container. Note that I am building directly on top of our **apache** container.

You should probably also write a little script called **build** containing the code to build this Image:

    #!/bin/bash

    docker build -t charliecalvert/html-viewer .
    docker run --name html-viewer-container -d -p 80:80 charliecalvert/html-viewer

And to **stop** all and delete what we created:

    #!/bin/bash

    docker stop html-viewer-container
    docker rm html-viewer-container
    docker rmi charliecalvert/html-viewer

To be clear, we still have our **MakeHtml** directory. We will work on it more later. But in this directory we have a much simple Docker file. We have removed from the MakeHtml **Dockerfile** all the code that recreated the **bcuser** user, JsObjects and a node environment. The plan is now to build the html files on the host and then copy them to the container.

## Stop and Start Container

Suppose you have a running container and want to stop it:

    docker stop html-viewer-container

Then you can start it again like this:

    docker start html-viewer-container

## Link Directory

It is also possible to link a directory on the host to a directory in the container. The catch is that you have to do this when you start the container. You can hardcode the link into the container. Again, Docker says it won't let you hardcode the link because it is not guaranteed to be reproducable in all environments.

    docker run --name maker-elf -v /var/www/html:/var/www/html -d -p 80:80 charliecalvert/apache

Note that in this case we don't create a third image at all. We just use our existing **apache** image.

## More flexibility

Though you don't have to do it at this time, it seems to me that we could:

- Build MakeHtml as we did in the original MakeHtml assignment. That is, get JsObjects, set up node and npm, the whole deal.
- Run the container  with -v option mapping our **~/ssh** directory to the same location in container.
- Then use the mapped ~/ssh directory to load our key and set up our repository.
- Run MakeHtml in the container.
- Exit the container and **commit** the container to an image.

That way we would have an automatically set up container that we could work in and develop as outlined throughout much of the first half of this course.

For now I think the first of the options, the Copy option, is the simplest way to get us up and running and let me grade the midterm. Doing the steps outlined above in this section of this text is probably going to be part of another assignment.

## Save a Container as an Image

    docker commit maker-elf maker-go  

That is:

    docker commit <EXISTING_CONTAINER> <NEW_IMAGE_NAME>

## Turn it in

For now, do the Copy and Link steps and take screenshots showing that it works. Turn in the screenshots, and turn in a link to your EC2 instance that works. Given the information above, you should be able to give me an EC2 instance that contains your midterm and all your homework related to running EC2 instances.

If that is impossible, stop any running containers and start apache. Set things up so I can grade your midterm and any other assignments that depend on EC2 and apache.

In short, get that EC2 image working one way or another. To pass this assignment, you need the container, but if you can't get it running, the set things up with Apache running in the host.

## Apache Control

Start Apache:

```bash
#!/bin/bash

sudo systemctl enable apache2
sudo service apache2 start
```

Stop Apache script:

```bash
#!/bin/bash

sudo service apache2 stop
sudo systemctl disable apache2
```

Apache status:

```bash
#!/bin/bash

sudo service apache2 status
```

Or, perhaps you would prefer the **ApacheControl** program from JsObjects:

    cp $SETUP_LINUXBOX/ApacheControl .

Then just run the script and use the menu. The program looks like this:

```bash
#!/bin/bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

function start() {
    sudo systemctl enable apache2
    sudo service apache2 start
}

function stop() {
    sudo service apache2 stop
    sudo systemctl disable apache2
}

function status() {
    sudo service apache2 status
}

while true; do
    message "Menu"
    echo -e "$LIGHT_GREEN  a) Start and Enable Apache"
    echo -e "$LIGHT_GREEN  b) Stop and Disable Apache"
    echo -e "$LIGHT_GREEN  c) Apache Status"
    echo -e "$LIGHT_RED  x) Exit"
    echo -e "\n$NC"
    read -p "Please make a selection: " eotuyx
    case $eotuyx in
        [Aa]* ) start false; continue;;
        [Bb]* ) stop false; continue;;
        [Cc]* ) status true; continue;;
        [XxQq]* ) break;;
        * )  -e "\n$NC" + "Please answer with c, r or x.";;
    esac
done
```
