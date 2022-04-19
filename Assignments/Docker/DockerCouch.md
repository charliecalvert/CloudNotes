---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Docker/DockerCouch.md
relativePath: Assignments/Docker/DockerCouch.md
title: DockerCouch
queryPath: Assignments/Docker/
subject: Docker
fileNameMarkdown: DockerCouch.md
fileNameHTML: DockerCouch.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Set up an instance of the NoSQL database CouchDb and access it from a NodeJs application.

## Creating

Run this command to download the **couchdb** image from the docker hub and start an instance on port 5984:

    docker run -p 5984:5984 -d couchdb

Now open up a browser and browse to your instance. This means you put in the IP of the VM where you are running Docker, and also the standard Docker port. In my case, the IP of the VirtualBox Ubuntu VM running Docker is 192.168.86.117:

- [http://192.168.86.117:5984/_utils/](http://192.168.86.117:5984/_utils/)

Now do the first time setup for CouchDb. You only need to do this once:

- [http://192.168.86.117:5984/_utils/#/setup](http://192.168.86.117:5984/_utils/#/setup)

The details:

- Choose to set up a single node.
- Set up the admin credentials.
- Leave the bind address at 0.0.0.0
  - Leave the port at 5984

## Connect to CouchDb

Open **JsObjects/Data/CouchDb03** in WebStorm or your favorite editor.

Use Geany or your favorite text editor to edit **JsObjects/Data/set-server-js** and setup the IP for your VM:

```javascript
var servers = ['127.0.0.1:5984',
    '192.168.86.117:5984',
    '192.168.2.20:5984',
    '168.156.41.96:5984'
];

const serverIndex = 1;
```

I use the **serverIndex** to index into the proper IP in the array. If you want the first item in the array ('127.0.0.1:5984'), set **serverIndex** to 0, if you want the second item ('192.168.86.117:5984'), set it to 1.

Go back to WebStorm. Open **CouchDb03/server.js**. Find the call to **userPassUrl** and specify your **userName** and **password**:

```javascript
var setServer = require('../set-server');
const server = setServer.userPassUrl('admin', 'foo') + '/';
```

## Run CouchDb03

CouchDb03 is very easy to use. It runs only at the command line. The menu looks something like this:

    ? What do you want to do?
      =======================
      (Use arrow keys)
      ──────────────
    ❯ Say hello
      create
      ──────────────
      show
      put
      putData

Use the arrow keys to navigate the menu. Choose **Say hello** to test you connection. It should return, in part, something like this:


```json
{
    "statusCode": 200,
    "body": {
      "couchdb":"Welcome",
      "version":"2.3.1",
      "git_sha":"c298091a4",
      "uuid":"2eec8d05c21330b7048eac6cffe210d2",
      "features":["pluggable-storage-engines","scheduler"],
      "vendor":{"name":"The Apache Software Foundation"}
    }
}  
```

Select **create** to create a database named **bcdata**. Choose **put** to insert some data. Go to the browser and explore your instance of CouchDb. It should have a new database called **bcdata** with two records in it.

## Implemetation Menu

We use a tool called [Inquirer](https://github.com/SBoudrias/Inquirer.js/) to create our command line menu. It has over 10,000 stars on GitHub and is being actively maintained as of Aug 22, 2019.

## Database Access

We are using the [request] HTTP package to talk to the database. It has over 23,000 stars on GitHub and was last updated 3 months ago as of Aug 22, 2019.

**NOTE**: _If you prefer a more formal approach, there are many examples of using the **nano** library on JsObjects. For instance, CouchDb04._

## Stopping

Though this is not part of the assignment proper, it might help to review how to stop our instance of CouchDb and even remove it.

Let's start by getting the ID of our running image:

    docker ps -as

You'll see something like this:

```
$ docker ps -as
CONTAINER ID        IMAGE        COMMAND
75c5a34b5c79        couchdb      "tini -- /docker-ent…"   39 minutes ago  
```

Use the CONTAINER ID to stop the instance.

    docker stop 75c5a34b5c79

Optionally, you can then use **rm** to remove the instance:

    docker rm 75c5a34b5c79

Note that you are removing the container, not the image. The container tracks state such as your new bcdata database, while the image has no state. If you remove the container instance, then it is gone and so is your database. You must recreate it with container with the **run** command as shown above. And then step through the other steps.

**NOTE**: _We learn through repetition. Very few people really internalize a procedure like this by doing it only once. It may seem like a lot of work to delete the container and start again, but if you do it a few times, you can probably complete the procedure in much less that five minutes. Perhaps even less than a minute. Having that kind of command of a technology is very useful._

If you don't want to remove the image, and often you won't, you can just stop the image, and then later restart it:

    docker stop 75c5a34b5c79
    docker start 75c5a34b5c79

At this point you still have the docker image:

    $ docker images
    REPOSITORY                     TAG                 IMAGE ID            CREATED             SIZE
    bcuser/elf-express-server      latest              ce52529a2941        38 hours ago        1.01GB
    noderoutesparams_node-routes   latest              6bd3c9d516c8        42 hours ago        919MB
    node                           11.5.0              2824ef9be5b3        8 days ago          894MB
    couchdb                        latest              be0738482d9f        3 weeks ago         205MB
    hello-world                    latest              4ab4c602aa5e        3 months ago        1.84kB

The point is that stopping and starting the image is the right thing to do once you have the basics down and want to start adding real data to the database. But if you are still in learning mode, you should delete and restart the database.

Perhaps I should ask students to submit a screenshot of what the system looks like after you remove and recreate the container?

## Turn it in

Take a screenshot of your instance of CouchDb with the bcdata database and two records. Attach the image to your assignment and turn it in.

**REMEMBER**: _No Word Documents and no Zip files. Just attached your PNG image files directly to the assignment (JPGs are also fine)._
