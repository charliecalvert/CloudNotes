## Docker Compose

Learn how to use [Docker Compose](https://docs.docker.com/compose/). We will create a main app which can query two micro services. In this case we will use Docker Compose to start all three apps with a single command. They will each have their own image and own container.

Click on the link I provide above as it is a good overview of docker compose. We have no book, so links like that are an important part of our course. You don't have to read everything, but at least read enough to get a feel for the technology and an understanding of what documentation is available.

## Create Apps

Create a dirctory in the root of your repository called **week04-docker-composer**

inside it, create three express apps:

- main: Port 30025
- system-environment: Port 30028
- route-tester: Port 30029

Make the standard changes to **bin/www** and **routes/index.js**. Be sure all three Home page contains your last name in its title. Implement **you-rang** for **route-tester** and **system-environment**.

Here is what **you-rang** should return:

```JavaScript
function splitStringOnAnyInstanceOfCharacter(path, character, countFromEnd) {
    const pathParts = path.split(character);
    return pathParts.slice(Math.max(pathParts.length - countFromEnd, 1)).join(character);
}

const rangData = {
    "program": "qux",
    "file": "routes/index.js",
  	"result": "qux you rang",
  	"server": "qux",
  	"directory": splitStringOnAnyInstanceOfCharacter(__dirname, '/', 2),
  	"hostname": process.env.HOSTNAME,
  	"home": process.env.HOME
}
```

You should, of course, use common sense to change the hard coded strings to text that makes sense for any particular project.

In all three **package.json** files change **nodemon** to **node**.

**splitStringOnAnyInstanceOfCharacter**: _Given the string **path**, it looks for slashes (/) and returns the string that is **countFromEnd** slashes from the end of the string. I've tried to make it flexible so that you can vary the string, the character (slash in our case) and offset. I passed in different offsets such as 1, 3, 4, 25 and it still seems to work._

Here is the output before splitString:

![Before split string Docker Composer Server Data][dcsd]

Here is the output after:

![After splitString][dcsds]

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
    requester('http://system-environment:30028/you-rang').pipe(res);
});
```

As you can see, we can refer to Docker containers by name.

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

One thing I have found. If we use expose instead of ports in the system-environment section of our docker-compose YML file, then we can access our service from the other containers in our project but it can't be accessed from the external network:

    expose:
      - "30028"

This provides us with additional security. The trade off is that we can't use the browser to explore our service.

## Build and Reset

We should have build and reset scripts. I believe they can be quite simple:

Build: docker compose up %1

Reset: docker compose down

If this doesn't work, then do them one step at a time.

## Push your results

You can push your finished image to the Docker Hub:

```
docker tag week04-docker-composer_main:latest charliecalvert/docker-compose-main
docker push charliecalvert/docker-compose-main
```

Though of course you would want to use your name on the Docker Hub.

## Turn it in

The running Docker container should be accessible through localhost:30025. When it is launched, it will display the results of querying the two micro services in the console. Attach a screenshot of that to the assignment.

Also:

- DockerHub URL of your three images.
  - Use **docker push** to create them.
- From Github I need branch and folder. It is usually also a good idea to create a tag in case there is any doubt as to exactly what I should look at.

## Hot Updates

Add volumes to **docker-compose.yml**

```
version: '3'
services:
  main:
    build: main
    ports:
      - "30025:30025"
    restart: always
    command: npm start
    volumes:
      - ./main/:/usr/src/elf-main
      - /usr/src/elf-main/node_modules/
  route-tester:
    build: route-tester
    ports:
      - "30028:30028"
    restart: always
    environment:
      - NODE_ENV=production
    command: npm start
    volumes:
      - ./route-tester/:/usr/src/route-tester
      - /usr/src/route-tester/node_modules/
```

**NOTE**: _By way of explanation, I'll add one short not on the volumes code in our YML file. After we copy the files over, this second volumes line says delete everything in node_modules in the container:_

    - /usr/src/route-tester/node_modules/

In  all three **package.json** files change the start script:

```json
"scripts": {
  "start": "npx webpack --watch & nodemon ./bin/www",
  "build": "npx webpack",
  "test": "jest"
},
```

Install **nodemon** in all three apps:

    npm i -D nodemon

If it does not already exist, create this file In **system-environment/.gitignore** and put this in it:

    midterm-key
    fall2019
    git-ignore-tests
    isit320-lastname-2019

Don't forget to modify **lastname** in your repo name found in the **.gitignore** file! Use your common sense. What don't you want to check in to GitHub? Whatever it is, put it in the **.gitignore** file.    

In **system-environment/nodemon.json**:

```json
{
  "verbose": true,
  "ignore": ["**/bower_components/**", "**/git-ignore-tests/**"]
}
```

## Repo Missing

If you can't get your repo into system-environment try this:

    docker exec -it <SYSTEM-ENVIRONMENT-CONTAINER-NAME> bash
    eval `ssh-agent`
    ssh-add midterm-key     
    git clone git@github.com:charliecalvert/git-ignore-tests.git

Or do this in your **build**:

    cd system-environment && git clone git@github.com:charliecalvert/git-ignore-tests.git

<!--       -->
<!-- links -->
<!--       -->

[dcsd]: https://s3.amazonaws.com/bucket01.elvenware.com/images/docker-compose-server-data.png
[dcsds]: https://s3.amazonaws.com/bucket01.elvenware.com/images/docker-composer-server-data-split.png
