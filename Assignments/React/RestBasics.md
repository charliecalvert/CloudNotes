# Rest Basics

Use Rest with React. There are two applications joined by a proxy:

- server (Express based)
- client (Built with create-react-app)

Both of these slide decks contain relevant information that might be useful when working through this assignment:

- [http://bit.ly/noderoutes][http://bit.ly/noderoutes]
- [http://bit.ly/JavaScriptNode](http://bit.ly/JavaScriptNode)

## Get Started

Create a branch called **Week02**.
Create a directory called **Week02-RestBasics** in your **Week02** branch.

## Motivation

Your assignment is to understand how and why a request from a client is processed and routed by your server. This is one of the key subjects important subjects that we must understand. _Eventually, we must perform a complete meld with HTTP requests and how they are routed on a server._

**NOTE**: _To not understand HTTP requests and routing should be alien to you. "What do you mean you don't understand how to route an HTTP request? How can that be?" You should even feel a noticeable cooling of your affection for members of your immediate family if they don't understand HTTP requests and routing. "I know you're my child, and I know you are only 4 years old, but you have to understand that I just don't feel the same way about you since I realized you don't understand HTTP requests."_

## Create the Project Directory

We are going to have two projects in this assignment, so lets set up a directory for them. Navigate to the root of your repository and enter the following commands:

```
mkdir Week02-RestBasics
cd Week02-RestBasics
```

## Create Server

Before going further, make sure you have the latest copy of JsObjects:

    jo
    git pull

In the **RestBasics** directory, run the following command:

```
CreateExpressProject server
cd server
```

You have now created a fully functional, node based, express server that can handle HTTP requests.

**NOTE**: _You can usually return to the directory you were in previously by typing **cd -**._
## URLS

The following diagram provides us with some nomenclature.

<pre>
           hierarchical part
         ┌─────────┴─────────┐
           authority       path
         ┌─────┴───────┐ ┌──┴──┐
  http://localhost:30025/api/foo?key=value&amp#qux
  └┬─┘   └───┬────┘└─┬─┘         └─────┬─┘    └─┬─┘
scheme     host    port              query   fragment
</pre>


Some of the terms shown in this diagram are esoteric, obscure, and infrequently used. The key things you need to be able to recognize are the:

- host
- port
- path
- query

URLs and URNs are both URIs. Very loosely speaking, the technical difference looks something like this:

- URI: Any syntax similar to the one shown above
- URL: Syntax used to define a request sent over HTTP on a network. It designates a location on the web.
  - http://www.google.com
- URN: A URI that does not specify an HTTP location.
  - tel:+1-816-555-1212

An analogy might be:

- A URI is like the word book. It is very generic
- A URL specifies a particular type of URI that points at a specific location, just as **The Great Gatsby at Borders books** is the title of a specific book at a specific location.
- A URN specifics another type of URI, that provides a unique name, but it does not point to its location. You would need both a URL and a URN to find something on the Internet. Here is a URN that points at a book but not at its location: **urn:isbn:0-486-27557-4**.

Another common analogy:

- URL: A street address (103 4th St, Podunk, AL)
- URN: A name (Roger Moore)

Don't confuse a **path** with a URN. For instance, the **path** **the-great-gatsby** in the following URL is not a URN:

- <http://foo.com/the-great-gatsby

## HTTP Requests

An HTTP requests consists of URL like the one shown above:

- <http://localhost:30025/api/foo>

We use a URL like this to send requests from a client to a server. If we want to tell our server to do something, we send it a request in the form a URL.

## Routing Middleware

Let's write code that will handle a request such as the one defined above. We will put our custom server code in its own file.

In the **routes** folder create a file called **api.js**:

```javascript
var express = require('express');
var router = express.Router();

/* Set up a route called foo. */
router.get('/foo', function(request, response) {
    var message = { 'result': 'success', 'status': 'bar', 'file': 'api.js' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});

module.exports = router;
```

As explained above, this method is designed to be called whenever the user enters, or sends via HTTP, the following URL:

- <http://localhost:30026/api/foo>

## Application Middleware

To get started, we can describe how to link this new file to our express project. This involves using two commands:

- **require**: Use this command to link a file into your project. It is a bit like a **script** tag in an HTML file or an **import** tag in many other programming languages.
- **app.use**: This is an express method that adds [middleware][exp-mid] to your program.

Let's talk some more about middleware. Our server uses a library called express that is designed in part to handle requests sent to our server from a client. When a request is sent to our server:

  - Express parses the request. For instance, if the client asks to insert a record into a database, the express parses the request and makes it easy for us, as JavaScript programmers, to understand. It translates the request from HTTP style code to JavaScript code.
  - It then attemps to pass the request to us. In particular, it looks to see if we have set up any middleware for handling requests of this type.
  - If it finds the middleware, it passes the request to it.
  - There can be multiple pieces of middleware, so that a request is passed to several method before reaching its final destination.

Remeber, if we don't ever set up any middleware for handling a request, then we never see the request and it will probably be, for all intents and purposes, ignored by our server.

To set up our middleware for handling requests from the server we take two simple steps. In **app.js** around lines 10 and 28, we write the following:

```javascript
var api = require('./routes/api');  // on line 10
app.use('/api', api);               // on line 28
```

The first line just allows us to gain access to our new file: it links it into our project. The second line states what we want to do: _we want to **use** the code in our file as middleware._ We are telling Express that if there is a request from the server that ends with **/api**, then it should be passed to our code in **./routes.api.js**.

Now set the port, in **bin/www**, to **30026**. We are going to run the client on port 30025, so we are setting the port for the server to some other number. I've chosen 30026 in the hopes that it will be easy to remember.

Take a moment to understand what we have done.

- We have asked our program to run on port 30026
- We have set up middleware to handle requests that contain the string /api

For instance, the following HTTP request would call the **foo** method in our new file:

- <http://localhost:30026/api/foo>

Here is how to break it down:

- **http://localhost:30026**: The address and port of our server
- **/api**: Use the middleware defined in **/routes/api**
- **/foo**: call the **foo** route in our **api.js** file

## Application vs Router Middleware

Notice that we have made two similar calls:

- **app.use('/api', api);**
- **router.get('/foo', function(request, response, next) { ... });**

The first use Express application middleware. The second uses Express **router** middleware.

The **router** object is designed to help you set up a dedicated portion of your server for handling a particular kind of URI. For instance, all URI's that begin begin /api are handled in the file called **routes/api.js**.

## Test your Work

If you want, go ahead and start your new server:

```
npm start
```

Now type the following URL:

- <http://localhost:30026/api/foo>

You should see very plain output that looks a bit like this:

```
{"result":"success","foo":"bar","file":"api.js"}
```

## Second Terminal Tab

Our server is running in your bash shell. Because of the way we started it, it completely takes up the shell making it unusable for any other purpose:

```
$ npm start

> server@0.0.0 start /home/charlie/Git/isit320-calvert-2017/RestBasics/server
> nodemon ./bin/www

[nodemon] 1.11.0
// NODEMON OUTPUT OMITTED HERE
Foo called:
{
    "result": "success",
    "foo": "bar",
    "file": "api.js"
}
GET /api/foo 304 7.572 ms - -
```

Because we can't use this terminal, we need to create a new one. In particular, you'll need to create a new terminal tab, by entering this command: **CTRL-SHIFT-T**. You can also create tabs from the terminal menu. In either case, you should end up with two bash shells available.

![One terminal, two tabls](https://s3.amazonaws.com/bucket01.elvenware.com/images/one-termina-two-tabs.png)

## Create Client

Navigate to the second terminal tab, the one you are not using. From the root of the **week02-rest-basics** directory, create your client:

```
create-react-app client
cd client
```

This creates a new react based client application for use in the browser. It uses ES6 syntax, and has many fancy features that we will explore over time.

It is much easier to use **create-rect-app** than to build a program by hand as we did in the our **ReactBasics** assignment. The output from **create-react-app** is, however, much more complex. Also, it commits you to a react based style of development quite different from traditional ES5 development that uses jQuery, Angular or some other library. In this course, we are going to spend considerable time working with older applications that have subsystems built in with React and ES6. As a result,

**NOTE**: _Because our application uses ES6 (ES2016), you want to tell WebStorm to expect modern JavaScript syntax. In particular, set the **File | Settings | Languages and Frameworks | JavaScript** to **React JSX**_

## Link Client and Server

In your client application, in **package.json**, just before the dependencies section, add this:

```javascript
"proxy": "http://localhost:30026",
```

This tells our react app to forward requests for REST calls to our Express Server that is running on port 30026. See code in **scripts/start.js** for more details.

## Make HTTP Request

In the client, we no longer need to install **fetch**. It is now present in all major browsers.

We will use this native JavaScript call in lieu of **$.ajax** or **$.getJSON**. The **fetch** call is part of the ES6 standard, and is now finalized.

## Rewrite the Client

And here is  **src/App.js**:

```javascript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';

class App extends Component {
    constructor() {
        super();
        this.state = {
            file: 'File name will be placed here.',
            status: 'waiting for server'
        };
    }

    queryServer = () => {
        const that = this;
        fetch('/api/foo')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log('parsed json', json);
                that.setState(foo => (json));
            })
            .catch(function(ex) {
                console.log('parsing failed, URL bad, network down, or similar', ex);
            });
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>

                <p className="App-intro">
                    state: {this.state.status} file: {this.state.file}
                </p>
                <button onClick={this.queryServer}>Bar</button>
            </div>
        );
    }
}

export default App;
```

The key call here is to **fetch**, found in the method named **queryServer**. The promise uses two **.then** statements. The first is to check if the HTTP call worked, even if the server reported an error such as 404 Not found or 500 Internal Server error. The second **.then** statement gives us the result if the call succeeds. In other words, if the server sent us back some JSON, then the JSON will be found here.

```javascript
fetch('/api/foo')
    .then(function(response) {
        // DID HTTP TALK TO THE SERVER? BLOWS UP IF NETWORK DOWN, URL BAD, ETC.
        // CHECK response.ok TO SEE IF THE CALL SUCCEEDED ON THE SERVER SIDE.
        // response.ok will be false if we return a 404 or 500 error.
    })
    .then(function(json) {
        // IF WE SUCCEED, WE GET RESULT HERE. TYPICALLY SOME JSON.
    })
    .catch(function(ex) {
        console.log('parsing failed, URL bad, network down, or similar', ex);
    });
```

## Run the Application.

Could not be simpler:

```
npm start
```

Your application will magically open in the browser. Updates should also appear as you make them.

## Run the server on Cloud 9

First be sure **bower** is installed:

```
npm -g install bower
```

Then make sure you have processed both **package.json** and **bower.json**:

```
npm install && bower install
```

Then run the application:

```
npm start
```

Then **Preview | Preview running application** from the menu items near the top right of the Cloud 9 IDE.

## Run the client on Cloud 9

Right now, I can't get it to work on Cloud 9. Edit your code there. Test everything but the button click. If all is clean:

- Push your code from Cloud 9 or Pristine Lubuntu to GitHub.
- Log into AWS.
- Pull your repository on AWS (Clone first if necessary, but your repository should already be on AWS, so you shouldn't need to clone. Don't clone unless your repository is not already on your AWS server. If it is there, just pull. Don't clone.)
- Edit your security group in the EC2 console to open ports 30025 and 30026
- Run your server. It runs on 30026.
- Log into AWS in a second console
- It runs by default on some weird port, so set the port: **export port=30025**
- Run the client.

It works for me.

We'll do this later, but skip it for now.:

- Remove the line proxy line from client/package.json:
  - "proxy": "http://localhost:30026",
- Then create a final build for the client with this command from the root of the **client** project:
  - **npm run build**
- Now create links to your build from the server's **public** directory:
  - Use your common sense to navigate to your server/public directory
  - do this: **ln -s ../../client/build/* .**

## Turn it in

Push, submit.

## Eject Option

Though I don't recommend it, and in fact recommend that you don't do it, if you are terminally curious, you can run this command in the root of your client application:

```
npm run eject
```

The command exposes the inner workings of **create_react_app**. In particular, it creates a **scripts** directory and modifies **package.json**. Look at **package.json** to see the relationship between the two. Rather than do this with a project that you might want to keep, I would do create a temporary project, and try this command there. It's interesting to learn more about **create-react-app**.

[exp-mid]: http://expressjs.com/en/guide/using-middleware.html

## Manual Step

We don't need to do this in this application because everything is handled for us by the code auto-generated by **create-react-app**. But in a manual **ReactBasics** type of project, I believe you also need to add code to **webpack.config.js** in the **entry** property:

```javascript
entry: [
    'whatwg-fetch',
    ... and so on
]
```
