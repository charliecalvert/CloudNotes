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
