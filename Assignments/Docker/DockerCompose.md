## Docker Compose

Learn how to use Docker Compose. We will create a main app which can query two micro services. In this case we will use Docker Compose to start all three apps with a single command. They will each have their own image and own container.

## Create Apps

Create a dirctory in the root of your repository called **week04-docker-composer**

inside it, create three express apps:

- main: Port 30025
- system-environment: Port 30028
- route-tester: Port 30029

Make the standard changes to **bin/www** and **routes/index.js**. Be sure all three Home page contains your last name in its title. Implement **you-rang** for **route-tester** and **system-environment**.

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
```

You should, of course, use common sense to change the hard coded strings to text that makes sense for any particular project.

In all three **package.json** files change **nodemon** to **node**.

## Query Micros

In **/main/source/control.js**, write two fetch statements to query our micro services:

```javascript
window.onload = function() {
    fetch('/system-environment/you-rang')
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            const serverData = document.getElementById('system-environment');
            serverData.textContent = JSON.stringify(result, null, 4);
        })
        .catch((ex) => {
            alert(ex);
        });
};
```

For this to work you might want this in **views/index.pug**:

```
h2 System Environment
pre#system-environment
```

In main, use npm to install **request**.

In **main/routes/index.js** implement the cross process request:

```javascript
const requester = require('request');

router.get('/system-environment/you-rang', function(req, res) {
    requester('http://192.168.86.26:30028/you-rang').pipe(res);
});
```

I think **localhost** might work instead of the IP, but I can see why it might not. We can run some tests.

![Docker Composer Server Data][dcsd]

## Docker Files

We need to create three Dockerfiles:

- main/Dockerfile
- route-tester/Dockerfile
- system-environment/Dockerfile

Here is the one for main:

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

The other two are the same, except the ports (listed above) and the name.

For instance, this line is changed:

    RUN mkdir -p /usr/src/elf-main

It should become:

    RUN mkdir -p /usr/src/system-environment

Since there are multiple instances of the phrase **elf-main** to be changed, the simplest way to proceed is with a search and replace.

## Docker Compose Install

If you have not done so already install docker compose:

    jou
    git pull
    cd InstallScripts/
    ./DockerComposeInstall

## Compose

Now we want to use DockerCompose to use three projects at once.

Create a docker compose file called **docker-compose.yml**:

```code
version: '3'
services:
  main:
    build: main
    ports:
      - "30025:30025"
    restart: always
    command: npm start
    links:
      - route-tester
  route-tester:
    build: route-tester
    ports:
      - "30028:30028"
    restart: always
    environment:
      - NODE_ENV=production
    command: npm start
```

You add the third element for **system-environment**.

Run this to start it: **docker-compose up**. It takes awhile, but when done, go to **localhost:30025** and look at the console output.

If you edit your code and want to see the fix, try just running **docker-compose up** again. If that doesn't work, then do this, which takes a bit longer: **docker-compose up --build**

## Push your results

You can push your finished image to the Docker Hub:

docker push charliecalvert/sys-env-base, though of course you would want to use your name on the Docker Hub.

## Turn it in

The running Docker container should be accessible through localhost:30025. When it is launched, it will display the results of querying the two micro services in the console. Attach a screenshot of that to the assignment.

Also:

- DockerHub URL of your three images.
  - Use **docker push** to create them.
- From Github I need branch and folder. It is usually also a good idea to create a tag in case there is any doubt as to exactly what I should look at.

[dcsd]: https://s3.amazonaws.com/bucket01.elvenware.com/images/docker-compose-server-data.png
