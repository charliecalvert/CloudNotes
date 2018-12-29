## Creating

Run this command to download the **couchdb** image from the docker hub and start an instance on port 5984:

    docker run -p 5984:5984 -d couchdb

Now open up a browser and browse to your instance. This means you put in the IP of the VM where you are running Docker, and also the standard Docker port. In my case, the IP of the VirtualBox Ubuntu VM running Docker is 192.168.86.117:

- [http://192.168.86.117:5984/_utils/](http://192.168.86.117:5984/_utils/)

Now do the first time setup for CouchDb. You only need to do this once:

- [http://192.168.86.117:5984/_utils/#setup](http://192.168.86.117:5984/_utils/#setup)

Choose to set up a single instance.

## Connect to CouchDb

Open JsObjects/Data/CouchDb03 in WebStorm or your favorite editor.

Edit JsObjects/Data/set-server-js and setup the IP for your VM:

```javascript
var servers = ['127.0.0.1:5984',
    '192.168.86.117:5984',
    '192.168.2.20:5984',
    '168.156.41.96:5984'
];

const serverIndex = 1;
```

I use the **serverIndex** to index into the proper IP in the array.

Inside the main program, which in this case is in **CouchDb03/server.js** find this code and specify your userName and password:

```javascript
var setServer = require('../set-server');
const server = setServer.userPassUrl('admin', 'foo') + '/';
```

## Stopping

To get the ID of your running image:

    docker ps -as

You'll see something like this:

```
$ docker ps -as
CONTAINER ID        IMAGE        COMMAND
75c5a34b5c79        couchdb      "tini -- /docker-ent…"   39 minutes ago  
```

Use the CONTAINER ID to stop and then rm the instance:

    docker stop 75c5a34b5c79
    docker rm 75c5a34b5c79

If you remove the instance, then it is gone and you must recreate it with the **run** command shown above.

Or alternately you can just stop the image, and then later restart it:

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

If you want to
