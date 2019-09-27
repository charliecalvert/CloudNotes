## The Docker File

In this assignment you will learn the basics of working with [**Dockerfiles**][df]. We can use these files to automate the process outlined in the [Docker Starter Assignment][dsp].

This assignment is not complete at this time. At this point work only on the [Create MakeHtml](#create-makehtml) section.

## Your Docker Hub Name

In the code found in this assignment you are going to need to know your name on the [Docker Hub](https://hub.docker.com/). You created this name when you first logged into the Docker Hub. If you have forgotten the name, you can always find it by logging into the Docker Hub and going to its home page.

![Docker name on Docker hub][dnh]

**IMAGE**: _To get your docker hub name, log into docker and go to the home directory. As you can see, my Docker Hub name is **charliecalvert**._

**NOTE**: _At the beginning of a quarter, some students realize that they have forgotten how to log into an online resource such as Docker Hub that they used in a previous quarter. To avoid these problems, I keep track of usernames and passwords in [Lastpass](https://lastpass.com). This utility has saved me untold hours over the years. I consider it an essential resource and a safe way to track usernames and passwords. I believe another highly rated product is called **1password**, but I have never used it and hence can't provide help to students who choose it. You can also save passwords to your Chrome or Firefox account, but I'm sure you can see why that is not as useful as working with a tool that runs in all browsers._

## Simple Example

We use Dockerfiles to save in a single place the multiple steps we might use to create a Docker image. Here is a very simple example **Dockerfile** that creates an image based on the official [Docker Hub ubuntu image](https://hub.docker.com/_/ubuntu):

    FROM ubuntu
    RUN echo 'File content' > /tmp/TempFile

Save this file into your repo under this name:

    week02-docker-simple/DockerFile

The first line in the file pulls down the **ubuntu** image from the Docker Hub and creates a local copy. After creating the local image the second line in the file runs a command inside the image which creates a small text file in the **tmp** directory with the words **File content** inside it. (This is the same thing we did in class, but now we are automating the process.)

After creating the Dockerfile, you can use it to create an image. For instance, you can run it from the **week02-docker-simple** directory like this:

    docker image build -t &lt;YOUR-DOCKER-HUB-NAME&gt;/docker-test .

In my case, this might look a bit like this:

    docker image build -t charliecalvert/docker-test .

After creating the image, we can build a container based on it. This container will hold an instance of Ubuntu.

## Create Container

The following command creates a container based on our image. Note that the command gives our container a name and runs it:

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

As you can see, by default you are logged in as **root** in our new ubuntu container. This means you are the **admin** and have full rights in the instance. There are no other users. In particular, there is no **bcuser** account. I mention this only because I create a **bcuser** account in the VirtualBox VMs that I give to my students at the beginning of the quarter.


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

## Get Bash Shell in Background Docker Task

Open a bash shell on the instance running in background:

    docker container exec -it <CONTAINER_ID_OR_NAME> bash

For instance:

    docker container exec -it ubbase bash    

## Create MakeHtml {#create-makehtml}

In your **DockerCode** directory create a **MakeHtml** directory if you have not done so already:

    mkdir MakeHtml/micros

In **micros** create an elf-express app called **qux**:

    elf-express qux

In **routes/index.js** edit the home route and create a new endpoint called **/you-rang**:

```JavaScript
router.get('/', function(req, res) {
    'use strict';
    res.render('index', {
        title: 'Qux'
    });
});

router.get('/you-rang', (request, response) => {
    response.send({
        result: 'qux you rang',
        server: 'qux',
        directory: __dirname,
        hostname: process.env.HOSTNAME,
        home: process.env.HOME
    });
});
```

Create this DockerFile:

    FROM node:latest
    RUN mkdir -p /usr/src/app
    WORKDIR /usr/src/app
    COPY micros/qux/package.json .
    RUN npm install
    COPY micros/qux .
    EXPOSE 30027
    RUN node_modules/.bin/webpack
    CMD [ "npm", "start" ]

Here is useful little script called **build** that I put in the **MakeHtml** directory:

```bash
#!/usr/bin/env bash

docker build -t charliecalvert/make-html2 .
docker run --name maker -d -p 30027:30027 charliecalvert/make-html2
docker exec -it maker /bin/bash
```

After running this go to **localhost:30027**.

![Docker and Qux Micro][dqm]

To see **/you-rang** go to [http://localhost:30027/you-rang](http://localhost:30027/you-rang)

The output should look something like this:

```json
{
  "result":"qux you rang",
  "server":"qux",
  "directory":"/usr/src/app/routes",
  "hostname":"29d539f34da5",
  "home":"/root"
}

Note that this information is from inside the container. To see it while in the container, run **env**.

I created a second script called **reset**. Or perhaps you might call it **delete-container-and-image** or just **start-over-from-scratch**. I used it a lot when developing the **Dockerfile** because it allowed me to try a run and check the results. If I wasn't happy or felt the **Dockerfile** was not yet complete, then I could make some adjustments to the **Dockerfile**, delete my image and container, and start over by running an updated copy of the **Dockerfile**. Here is the script:

```bash
#! /usr/bin/env bash

docker container stop maker
docker container rm maker
docker image rm charliecalvert/make-html2:latest
```

Notice that in these scripts I'm giving the container a **name**. Specifically, I'm calling it **maker**. By giving it a known name I'm able to remove (delete) it with **stop** script if I want to start over.

## Docker Compose

Now we want to use DockerCompose to use two projects at once.

    docker compose up

The docker file:

```code
FROM node:latest
RUN mkdir -p /home/bcuser/Source/elf-app
WORKDIR /home/bcuser/Source/elf-app
COPY package.json /home/bcuser/Source/elf-app/
RUN npm install
COPY . /home/bcuser/Source/elf-app
EXPOSE 30025
CMD [ "npm", "start" ]
```

The docker compose file:

```code
version: "2"
services:
  elf-app:
    container_name: elf-app
    restart: always
    build: .
    ports:
      - "30025:30025"
    links:
      - mongo
  mongo:
    container_name: mongo
    image: mongo
    volumes:
      - ./data:/data/db
    ports:
      - "27017:27017"
```

In **app.js** don't use **localhost**. For me, it worked best to spell out the IP:

```JavaScript
var monk = require('monk');
var db = monk('192.168.86.26:27017/nodetest1');
```

<!-- See repository called mongo-test -->

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

## Useful Links

- [Node Example](https://nodejs.org/de/docs/guides/nodejs-docker-webapp/)
- [Docker Compose MongoDb Example](https://medium.com/statuscode/dockerising-a-node-js-and-mongodb-app-d22047e2806f)

<!--       -->
<!-- links -->
<!--       -->

[apache]: https://httpd.apache.org/
[df]: https://docs.docker.com/engine/reference/builder
[dnh]: https://s3.amazonaws.com/bucket01.elvenware.com/images/docker-file-hub.png
[dsp]: http://www.ccalvert.net/books/CloudNotes/Assignments/Docker/DockerStarter.html
[dqm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/docker-micro-qux.png
