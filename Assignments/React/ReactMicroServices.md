---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactMicroServices.md
relativePath: Assignments/React/ReactMicroServices.md
title: ReactMicroServices
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactMicroServices.md
fileNameHTML: ReactMicroServices.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

We have a principle that we talk about quite a bit:

- [Single Responsibility Principle][srp]

There is another of the [SOLID principles][solid] that we don't talk about as much:

- [Interface Segregation Principle][isp]

This principle states that we prefer small interfaces over fat interfaces. "Instead of one fat interface, many small interfaces are preferred".

To help us abide by the spirit of this principle, we will divide our server code into multiple "micro-services". Instead of one fat server, we will create several small servers. They will talk to one another over HTTP.

![Micro Services][msloop]

[msloop]:https://s3.amazonaws.com/bucket01.elvenware.com/images/micro-services-uml.png

[solid]: https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)
[srp]: https://en.wikipedia.org/wiki/Single_responsibility_principle
[isp]: https://en.wikipedia.org/wiki/Interface_segregation_principle

## Thumbsucker

For now, you can just think of a [microservice](https://en.wikipedia.org/wiki/Microservices) as a Node Js Express app that is dedicated to some single purpose such as logging in a user, or querying a specific database. It helps us modularize the server side of our code. The technique is not so important in small applications, but as applications get huge, being able to divide the server side into distinct services can be helpful. It can also help with maintenance. You don't necessarily have to update everything, we can update just one service.

**NOTE**: _Not all is rainbows and puppy dogs in the microservice world. However, even with the complexity they can sometimes add there are advantages if you build and deploy them correctly._

## Build and Deploy

Before going any further, let's understand what our application will look like when it is deployed. You will see that you are able to integrate the React interface in the **client** project into the **server** project so that the two projects become one.

Right now, we are using a trick that allows us to proxy request from the browser to our server. Specifically, we are adding this line to our client side **package.json** file:

```javascript
"proxy": "http://localhost:30026",
```

This is meant for use only during development. When we ship, we do two things.

1. At the command line we run this command to build our production code:
  a. npm run build
  b. This produces a folder called **build** in the root of our project
1. We then copy the contents of this folder into the public directory of our server, or into another express server that we created for this purposes.
  a. Finally, we point our home page route in **routes/index.js** to the **index.html** file created by the npm **build** step.

Now we can just run our server, browse to the page it creates, and begin playing with our app.

```javscript
res.sendFile('index.html');
```

## Basics

I want to see at least the following:

- Two micro-services
  - Run one on 30027
  - The other 30028
- A **create-react-app** project called **client** that runs on port 30025 and that calls into a server  
- An **elf-express** project called **server** that runs on Port 30026 and calls the microservices.

Much of this we have already from the [RestBasics][rb] assignment.

## Micro Services

We have:

- A **client** running on port 30025
- A **server** running on port 30026

The **server** part of our project is the conduit between the **client** and the micro services.

This means that we want to give the **server** some base functions, and then ask it to delegate responsibility for major tasks to our little micro services. In particular, I would like our **client** to depend on two micro servers. The client contacts these micro services via our **server**:

- The **Qux** micro service: **/qux**
  - If the **client** queries a route on the **Qux** micro service the results are mirrored back to the **client** by the **server**.
  - For instance our **Qux** micro service would respond to the following queries and the JSON produced by **Qux** would be returned to the **client** by the **server** with **res.send** or **pipe** or similar:    
    - /qux/you-rang
- A second micro-service called **system-environment**
  - For now, it only responds to **/system-environment/you-rang**.

## System Environment

Create it:

    elf-express system-environment

For now, only implement **you-rang**.


## The Ports {#ports}

Here are the ports

| Service            | Port  | Near the bottom of .bashrc           |
|:-------------------|:------|:-------------------------------------|
| qux                | 30027 | export QUX_PORT=30027                |
| system-environment | 30028 | export SYSTEM_ENVIRONMENT_PORT=30028 |

I assume you already understand that I want you to put the export statements with the related calls near the bottom of your **.bashrc** file.

## Implement fetch Once {#one-fetch}

We need only implement **fetch** one time. When we declare our buttons, we can pass in some data on the event to specify the url for that button:

```html
<button data-url="/qux/you-rang" onClick={this.queryServer}>Ring Qux</button>
```

**NOTE**: _Recall that attributes beginning with **data** have special meaning in modern HTML and will appear as target.dataset in the event generated by the button._

Then in the implementation of fetch we snag the URL we declared in the **data-url** attribute of the button:

```javascript
queryServer = (event) => {
        const that = this;
        fetch(event.target.dataset.url)
        // AND SO ON UNCHANGED
});
```

**NOTE:** _I think in some cases **event.currentTarget.dataset.url** might be the right choice rather than **event.target.dataset.url**. Sorry for the uncertainty. If things aren't working, try both and see which works. See [this StackOverflow reply](https://stackoverflow.com/a/5921528/253576)._

The **dataset** object is now standard in modern HTML/JavaScript, and the **url** comes from our **data-url** attribute declared on the button.

## Create Qux Microservice

If you have not done so already, from the root of your **week03-rest-basics** project:

    elf-express qux

Set the port and echo it out using the name of the name of the QUX server in your message:


```javascript
var port = normalizePort(process.env.QUX_PORT || '30027');
// CODE OMITTED HERE
server.listen(port, () => { console.log("QUX Server running on port", port); });
```

While we are at it, why don't we ensure that **server/bin/www** has something similar:

```javscript
server.listen(port, () => console.log("Main server running on port", port));
```

Implement **qux/you-rang** as shown in the next sections. Call it from the client with fetch. Display the output.

## You Rang?

All the micro services should respond to a **/you-rang** query by responding with:

  - result: **success**
  - route: **you-rang**
  - server name: In this case **qux**
  - You can include any additional information about the server you think might be of interest

For instance, if sent from the client, you should get responses to these messages from the appropriate server:

- /**qux**/you-rang
- /**system-environment**/you-rang

**NOTE**: _I will call the words highlighted above, such as **qux** and **system-environment** our base routes. All calls to those services should include those base routes. For instance, when calling any **qux** api, the first part of the URL should include the word **qux**._

The method itself can be very a simple call in **routes/index.js**:

```javascript
router.get('/you-rang', (request, response) => {
    response.send({'result': 'success', route: 'you-rang', server: 'qux'});
});
```

Make sure concurrently starts qux like this in the **scripts** object of **package.json**:

```javascript
"qux": "nodemon qux/bin/www",
```

**HINT**: _You will also have to modify the **start** property in the **package.json** from the root of your project. Use code very similar to the code that you used to load the server with concurrently. Only this time you are loading not only the **client** and **server**, but also **qux** and the other micros. I'll leave the exact implementation as an exercise, but the solution is simple. Don't make it overly complicated._

**NOTE**: _It is best to use **nodemon** during development, but then we will switch to node when we deploy to a Docker container later in the course._

## Forwarding Request

Our **client** knows how to talk to the server because we put the **proxy** property in **client/package.json**. However, we do not yet have a way four our **server** to talk to our microservices and relay the information back to the client.

Begin by importing (require) a package called request:

    npm i request

Then put code to forward the request from the server to microservice in **server/routes/index.js**.:

```javascript
const requester = require('request');

router.get('/qux/you-rang', function(request, response, next) {
    requester('http://localhost:30027/you-rang').pipe(response);
});
```

This assumes that our Qux microservice is correctly running on port 30027.

Then we use the request package to forward our request to from the server to the appropriate microservice and return the result by **piping** it back to the client. These seems a bit like magic, but **request** is a well established package and it is designed, in part, to do precisely this sort of thing.

## The Main Server URLs {#main-urls}

All requests except for **test-routes/foo** should be handled by the microservices. The rest should be forwarded from **server/routes/index.js** to the appropriate microservice. Therefore, in **server/routes/index.js**, you should have the **/qux-you-rang** route shown above, for a total of four methods:

Call Microservice  | Url
-------------------|-----------------------------
qux                | /qux/you-rang
system-environment | /system-environment/you-rang

For now, all those URLs are in **server/index.js**. We will, however, more them laster into separate files and change the URL we use to call them to this: **qux/you-rang**.

## The MicroServices EndPoints {#micro-endpoints}

Right now we only need to implement two endpoints in our microservices. In both **qux** and **system-environment/routes/index.js** you should have a route called **/you-rang** that returns JSON identifying the service that was called:

| Microservice       | Route/EndPoint |
|--------------------|----------------|
| qux                | /you-rang      |
| system-environment | /you-rang      |


## Turn it in

Specify:

- Branch
- Folder of both client and server (week03-rest-basics? Other?)
- Folders for your microservices.

All your servers should build cleanly and up and running and callable. Use the npm module **concurrently** to start them all at once.

I am expecting the **qux** and **system-environment** servers to be responding to **you-rang**. The rest of the code can just be shells for now.

Make sure you include the [base route](#you-rang) in your calls from the client:

- /qux/you-rang

Put both your micro services in the **week02-micros** directory or something similar. This means there should be two programs in that directory. The directory should at the top level of your repository, directly under the root:

- isit322-lastname-2019
  - Your client and server, with a name like **week03-rest-basics** or similar.
  - **week02-micros**

Don't forget how to rename a directory: **git mv microtest Micros**.

Don't forget to explore **concurrently**.

## Build Help

It can be a pain to build all the microservices. But there is help! If you pull the latest JsObjects, you will find two updates to **~/.bash_aliases**:

    alias runcln='cd client && npm i && cd ../server && npm i && bower install && cd .. && npm i'
    alias runmicros='cd git-gist && npm i && cd ../qux && pwd && npm i && bower install && cd ../git-user && pwd && npm i && bower install && cd ..'

The **runcln** alias is meant for a standard concurrently app. It runs **npm i** in the root, in **client**, and in **server**.

The second alias does more or less the same thing, but for **git-gist**, **git-user** and **qux**.

This is one of the cases where naming conventions are very important. Of one student, for instance, calls the gist microservice git-gists instead of git-gist then that slows me down.

- [npm concurrently](https://www.npmjs.com/package/concurrently)

## Router IDs

If you want, you can add this endpoint/route as the _**last**_ item in a file such as **routes/index.js**.

```javascript
router.get('/:id', function(request, response) {
    response.send({
        'result': 'success from 30026',
        'path': request.params.id
    });
});
```

You've seen this before, but as a reminder. Respond to ping of a route by echoing back a portion of the url with **request.params.id**. Doing this serves no practical purpose other than helping you to debug your app and helping you to understand express routing.

<!--       -->
<!-- links -->
<!--       -->

[rb]: https://www.elvenware.com/teach/assignments/react/RestBasics.html
