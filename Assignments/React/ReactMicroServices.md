## Overview

We have a principle that we talk about quite a bit:

- [Single Responsibility Principle][srp]

There is another of the [SOLID principles][solid] that we don't talk about as much:

- [Interface Segragation Principle][isp]

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

Before going any further, let's understand what our application will look like when it is deployed.

Right now, we are using a trick that allows us to proxy request from the browser to our server. Specifically, we are adding this line to our client side **package.json** file:

```javascript
"proxy": "http://localhost:30026",
```

This is meant for us only during development. When we ship, we do two things.

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

I want to see at the following:

- At least two micro-services
  - Run one on 30027
  - The other 30028
- Use or create a **create-react-app** project called **client** that calls into a server
  - Run it on Port 30025
- An **elf-express** project called **server** that runs on Port 30026 and calls the microservices.

Much of this we have already from the [RestBasics]() assignment.

## Micro Services

We have:

- A **client** running on port 30025
- A **server** running on port 30026

The **server** part of our **GitExplorer** is the conduit between the **client** and the micro services.

This means that we want to give the **server** some base functions, and then ask it to delegate responsibility for major tasks to our little micro services. In particular, I would like our **client** to depend on five micro servers. The client contacts these micro services via our **server**:

- The **Qux** micro service: **/qux**
  - If the **client** queries a route on the **Qux** micro service the results are mirrored back to the **client** by the **server**.
  - For instance our **Qux** micro service would respond to the following queries and the JSON produced by **Qux** would be returned to the **client** by the **server** with **res.send** or **pipe** or similar:    
    - /qux/you-rang
- The Git User micro service is accessed via: **/git-user**
- The Git Gist micro service: **/git-gist/**:
  - Create Gist
  - List Gists
  - Delete Gist


## The Ports {#ports}

Here are the ports

| Service  | Port  | Near the bottom of .bashrc |
|:---------|:------|:---------------------------|
| qux      | 30027 | export QUX_PORT=30027  |
| git-user | 30028 | export GIT_USER_PORT=30028 |
| git-gist | 30029 | export GIT_GIST_PORT=30029 |

I assume you already understand that I want you to put the export statements with the related calls near the bottom of your **.bashrc** file.

## Optional Services

Though it is unlikely we will do so, here are some additional services would could create at some point.

- The Markdown micro service: **/markdown**
  - Insert the contents of a gist in a markdown document and return it
- The Git Explorer socket server: **/git-socket**
  - Send socket IO messages to any registered client whenever your app creates, lists or deletes gists.

Just to be clear, you don't have to do this unless I explicitly tell you to do so, or if you get a hankering to do so.

## Implement fetch Once {#one-fetch}

We need only implement **fetch** one time. When we declare our buttons, we can pass in some data on the event to specify the url for that button:

```html
<button data-url="/test-routes/foo" onClick={this.queryServer}>Test Foo Route</button>
```

**NOTE**: _Recall that attributes beginning with **data** have special meaning in modern HTML and will appear as target.dataset in the event._

Then in the implement of fetch we snag the URL we declared in the **data-url** attribute of the button:

```javascript
queryServer = (event) => {
        const that = this;

        fetch(event.target.dataset.url)
        // AND SO ON UNCHANGED
});
```

The **dataset** object is now standard in modern HTML/JavaScript, and the **url** comes from our **data-url** attribute declared on the button.

## Create Qux Microservice

From the root of your **week03-rest-basics** project:

    elf-express qux

Set the port and echo it out using the name of the name of the QUX server in your message:


```javascript
var port = normalizePort(process.env.QUX_PORT || '30027');
// CODE OMITTED HERE
server.listen(port, () => { console.log("QUX Server running on port", port); });
```

While we are at it, why don't ensure that **server/bin/www** has something similar:

```javscript
server.listen(port, () => console.log("Main server running on port", port));
```

Implement **you-rang** as shown in the next sections. Call it from the client with fetch. Display the output.

## You Rang?

All the micro services should respond to a **/you-rang** query by responding with:

  - result: success
  - message: i am up and running
  - You can include any additional information about the server you think might be of interest

For instance, if sent from the client, you should get responses to these messages from the appropriate server:

- /**qux**/you-rang
- /**git-user**/you-rang
- /**git-gist**/you-rang

This feature should be available for all three microservices when you turn in this assignment.

**NOTE**: _I will call the words highlighted above, such as **qux**, **git-user**, and **git-gist** our base routes. All calls to those services should include those base routes. For instance, when calling any **git-gist** api, the first part of the URL should include the word **git-gist**._

The method itself can be very a simple call in **routes/index.js**:

```javascript
router.get('/you-rang', (request, response) => {
    response.send({'result': 'you rang', server: 'qux'});
});
```

Make sure concurrently starts qux like this in the **scripts** object of **package.json**:

```javascript
"qux": "nodemon qux/bin/www",
```

**HINT**: _You will also have to modify the start property._

## Router IDs

You've seen this before, but as a reminder. Respond to ping of a route by echoing back a portion of the url with request.params.id:

```javascript
router.get('/:id', function(request, response) {
    response.send({
        'result': 'success from 30026',
        'path': request.params.id
    });
});
```

Assuming this is in **index.js** for the **qux** server then it would return **path: foo** if you ran this query: **/qux/foo**.

## Forwarding Request

Our client knows how to talk to the server because we put the **proxy** property in **client/package.json**. However, we do not yet have a way to talk to our microservices.

It turns out that we can do it like this:

```javascript
const requester = require('request');

router.get('/qux-you-rang', function(request, response, next) {
    requester('http://localhost:30027/qux-you-rang').pipe(response);
});
```

This assumes that our git-user microservice is correctly running on port 30027.

We put this in **server/routes/index.js**. We import (require) a package called request:

    npm i request

Then we use the request package to forward our request to from the server to the appropriate microservice and return the result by **piping** it back to the client. These seems a bit like magic, but **request** is a well established package and it is designed, in part, to do precisely this sort of thing.

## The Main Server URLs {#main-urls}

All requests except for **test-routes/foo** should be handled by the microservices. The rest should be forwarded from **server/routes/index.js** to the appropriate microservice. Therefore, in **server/routes/index.js**, you should have the **/qux-you-rang** route shown above, for a total of four methods:

Call Microservice | Url
------------------|-------------------
qux               | /qux-you-rang
git-user          | /git-user-you-rang
git-user          | /git-user-get-user
git-gist          | /git-gist-you-rang

All those URLs are in **server/index.js**.


## The MicroServices EndPoints {#micro-endpoints}

Right now we only need to implement four endpoints in our microservices. In **get-user/routes/index.js** you should have routes called **/you-rang** and **/get-user**:

Microservice | Route/EndPoint |
-------------|----------------|
qux          | /you-rang      |
git-user     | /you-rang      |
git-user     | /get-user      |
git-gist     | /you-rang      |

## Get User Info

Here is how to get started with the MicroService for handling Git User requests. From the root of your project.

    elf-express git-gist

Implement **you-rang** as shown above. Also, get the user:

```javascript
router.get('/get-user', function(req, res) {
  const options = {
      url: 'https://api.github.com/users/charliecalvert',
      headers: {
          'User-Agent': 'request'
      }
  };

  request(options, function(error, response, body) {
      // Print the error if one occurred
      console.log('error:', error);
      // Print the response status code if a response was received
      console.log('statusCode:', response && response.statusCode);
      // Print the HTML for the Google homepage.
      console.log('body:', body);
      res.send({ error: error, response: response, body: body });
  });
});
```

For now you can just get the info for your repo. We will make this more flexible later.

Be sure to call it from the client with fetch, and display the output for at least two fields from the data returned about the user. We'll work on good ways to display the data later, for now, just show enough to prove you made the call.

## Gists

Create it:

    elf-express git-gists

For now, only implement **you-rang**.

## Turn it in

Specify:

- Branch
- Folder of both client and server (Week03-React-Jest? Other?)
- Folders for your microservices.

All your servers should build cleanly and up and running and callable. Use the npm module **concurrently** to start them all at once.

I am expecting the **qux**, **git-user** and **gist** servers to be responding to **you-rang**. The rest of the code can just be shells for now.

Make sure you include the [base route](#you-rang) in your calls from the client:

- /qux/you-rang

Put all your micro services in a directory called **Micros** or something similar. This means there should be five programs in that directory. The directory should at the top level of your repository, directly under the root:

- isit322-lastname-2019
  - Your client and server, with a name like **week03-rest-basics** or similar.
  - **Micros**

Don't forget you rename a directory: **git move microtest Micros**.

Don't forget to explore **concurrently**.

## Build Help

It can be a pain to build all the microservices. But there is help! If you pull the latest JsObjects, you will find two updates to **~/.bash_aliases**:

    alias runcln='cd client && npm i && cd ../server && npm i && bower install && cd .. && npm i'
    alias runmicros='cd git-gist && npm i && cd ../qux && pwd && npm i && bower install && cd ../git-user && pwd && npm i && bower install && cd ..'

The **runcln** alias is meant for a standard concurrently app. It runs **npm i** in the root, in **client**, and in **server**.

The second alias does more or less the same thing, but for **git-gist**, **git-user** and **qux**.

This is one of the cases where naming conventions are very important. Of one student, for instance, calls the gist microservice git-gists instead of git-gist then that slows me down. 

- [npm concurrently](https://www.npmjs.com/package/concurrently)
