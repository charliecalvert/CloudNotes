## The Docker File

In this assignment you will learn the basics of working with [**Dockerfiles**][df]. We can use these files to automate the process outlined in the [Docker Starter Assignment][dsp].

This assignment is not complete at this time. At this point work only on the [Create Micros](#create-micros) section.

Do your work for this assignment in a branch called **week02**. (Or, at the least, be sure you have a **week02** branch and that it contains the code I ask you to create in this assignment.)

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

    week02-docker-simple/Dockerfile

The first line in the file pulls down the **ubuntu** image from the Docker Hub and creates a local copy. After creating the local image the second line in the file runs a command inside the image which creates a small text file in the **tmp** directory with the words **File content** inside it. (This is the same thing we did in class, but now we are automating the process.)

After creating the Dockerfile, you can use it to create an image. For instance, you can run it from the **week02-docker-simple** directory like this:

    docker image build -t &lt;YOUR-DOCKER-HUB-NAME&gt;/simple-text .

In my case, this might look a bit like this:

    docker image build -t charliecalvert/simple-text .

After creating the image, we can build a container based on it. This container will hold an instance of Ubuntu.

## Create Container

The following command creates a container based on our image. Note that the command gives our container a name and runs it:

    docker container run -name simple-text -it charliecalvert/simple-text

At this point you should be able to navigate into the Docker container's **/tmp** directory and view the file you created:

```
$ docker container run --name simple-text -it charliecalvert/simple-text
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

## Push your results

You can push your finished image to the Docker Hub with a command like this, but use your Docker username rather than mine:

    docker push charliecalvert/simple-text

Turn in this URL as part of your assignment.

## Create Micros {#create-micros}

Create a **week02-micros** directory. \

    mkdir week02-micros
    cd week02-micros

In **week02-micros** create an elf-express app called **qux**:

    elf-express qux
    cd qux
    npm i

Open **qux** in WebStorm.

In **package.json** replace **nodemon** with **node**.

In **bin/www** change the port to 30027.

In **week02/micros/qux/routes/index.js** edit the home route and create a new endpoint called **/you-rang**:

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

Create this Dockerfile in the **micros** directory. It uses the [official Node image][oni] from DockerHub:

    FROM node:latest
    RUN mkdir -p /usr/src/app
    WORKDIR /usr/src/app
    COPY qux/package.json .
    RUN npm install
    COPY qux .
    EXPOSE 30027
    RUN node_modules/.bin/webpack
    CMD [ "npm", "start" ]

Here is useful little script called **build** that I put in the **micros** directory:

```bash
#!/usr/bin/env bash

docker image build -t charliecalvert/micro-qux .
docker container run --name micro-qux -d -p 30027:30027 charliecalvert/micro-qux
docker exec -it micro-qux /bin/bash
```

Ignore the warnings **fsevents** and the notice to commit **package-lock.json**.

After running this go to **localhost:30027**. It should look like this:

![Docker and Qux Micro][dqm]

If it doesn't work, do this:

    docker logs <containter-name>

For instance:

    docker logs micro-qux

This error can mean there is no **Dockerfile** (note case) in the current directory:

    unable to prepare context: unable to evaluate symlinks in Dockerfile path

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
docker image rm charliecalvert/micro-qux:latest
```

Notice that in these scripts I'm giving the container a **name**. Specifically, I'm calling it **maker**. By giving it a known name I'm able to remove (delete) it with **stop** script if I want to start over.

## Push your results

You can push your finished image to the Docker Hub with a command like this, but use your Docker username rather than mine:

    docker push charliecalvert/micros-qux

Turn in this URL as part of your assignment.

## Turn it in

Point me to your image on the Docker Hub. It should look something like this:

    https://hub.docker.com/r/lastname/make-html/

Give me the command to get your image:

    docker pull lastname/make-html

Give me at least one screenshot of you processing a docker file. Put your copies of the three Dockerfiles in a folder of your repository. Just copy your **Docker** folder recursively (cp -r) into your repository. So I will be looking for a folder called Docker in your repository. But go ahead and give me:

- repo url (This is your **isit320-lastname-2017** repo.)
- Directory name
- Branch

## Docker Daemon Logs

Not very useful so far, but:

    sudo journalctl -fu docker.service

Remember, this is useful:

    docker logs <containter-name>

For instance:

    docker logs micro-qux

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
[oni]: https://hub.docker.com/_/node/
