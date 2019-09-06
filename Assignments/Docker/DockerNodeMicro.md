## Overview

Create a main application and a micro service, each in their own Docker container. Write a docker-compose file that allows you to call the micro service from the main app and display the result.

See **isit320-calvert-2019/DockerMicro** example program.

## Get started

Create a directory called DockerMicro in the root of your repository. From the **DockerMicro** director run **elf-express** twice to create two express applications called **main** and **micro**

    elf-express main
    elf-express micro

In **main** run:

    npm i request

In **micro/routes/index.js**:

```JavaScript
router.get('/you-rang', function(req, res) {
    res.send({'result': 'success', method: 'you-rang', server: 'docker-micro-server'})
});
```

In **main/routes/index.js**:

```JavaScript
const requester = require('request');

router.get('/you-rang', function(req, res) {
    requester('http://192.168.86.26:30026/you-rang').pipe(res);
});
```

In **main/views/index.pug**:

    pre#serverData

In **main/public/javascripts/control.js**:

```javascript
window.onload = function() {
    fetch('/you-rang')
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            const serverData = document.getElementById('serverData');
            serverData.textContent = JSON.stringify(result, null, 4);
        })
        .catch((ex) => {
            alert(ex);
        })
};
```

If there are references to **bootstrap** or **jquery** in either **views/layout.pug**, delete them.

## Main App

The **Dockerfile** for main:

```
FROM node:latest
RUN mkdir -p /usr/src/elf-main
WORKDIR /usr/src/elf-main
COPY package.json /usr/src/elf-main/
RUN npm install
COPY . /usr/src/elf-main
EXPOSE 30025
RUN node_modules/.bin/webpack
CMD [ "npm", "start" ]
```

The **Dockerfile** for the **micro** directory:

```
FROM node:latest
RUN mkdir -p /usr/src/elf-server
WORKDIR /usr/src/elf-server
COPY package.json /usr/src/elf-server/
RUN npm install
COPY . /usr/src/elf-server
EXPOSE 30026
RUN node_modules/.bin/webpack
CMD [ "npm", "start" ]
```

## Docker Compose

Put a file called **docker-compose.yml** in the **DockerMicro** directory:

```
version: '3'
services:
  main:
    build: main
    ports:
      - "30025:30025"
    restart: always
    command: npm start
    links:
      - micro
  micro:
    build: micro
    ports:
      - "30026:30026"
    restart: always
    environment:
      - NODE_ENV=production
    command: npm start
```

To run the project, issue this command in the **DockerMicro** directory:

    docker-container-up

## Turn it in

Push your work. Include a screenshot of what it looks like after you run **docker-container-up**
