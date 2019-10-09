## Docker Compose

## Create Apps

Create a dirctory in the root of your repository called **week04-docker-composer**

inside it, create three express apps:

- main: Port 30025
- route-tester: Port 30028
- system-environment: Port 30029

Make the standard changes to **bin/www** and **routes/index.js**. Be sure the Home page contains your last name in its title. Implement **you-rang** for **route-tester** and **system-environment**.

Here is what **you-rang** should return:

```JavaScript
const rangData = {
    "program": "qux",
    "file": "routes/index.js",
  	"result": "qux you rang",
  	"server": "qux",
  	"directory": __dirname,
  	"hostname": process.env.HOSTNAME,
  	"home": process.env.HOME
}

## Compose

Now we want to use DockerCompose to use three projects at once.

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
