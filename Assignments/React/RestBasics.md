# Rest Basics

Use Rest with React. There are two applications joined by a proxy:

- server (Express based)
- client (Built with create-react-app)

Both of these slide decks contain relevant information that might be useful when working through this assignment:

- [http://bit.ly/noderoutes](http://bit.ly/noderoutes)
- [http://bit.ly/JavaScriptNode](http://bit.ly/JavaScriptNode)

## Motivation

Your assignment is to understand how and why a request from a client is processed and routed by your server. This is one of the key subjects that we must understand. _Eventually, we must perform a complete meld with HTTP requests and how they are routed on a server._

## Get Started

Merge your current work from weeks 1 and 2 into **master**. Fix any conflicts that might arise.

Create a branch called **week03** based on your work in **master**.

## Create the Project Directory

We are going to have two projects in this assignment, so lets set up a directory for them.

Create a directory called **week03-rest-basics** in your **week03** branch by navigating to the root of your repository and entering the following commands:

```
mkdir week03-rest-basics
cd week03-rest-basics
```

## Create Server

Make sure you have the latest copy of **JsObjects** and that your global npm packages are up to date:

    jo
    git pull
    ncu -g

In the **RestBasics** directory, run the following command:

```
elf-express server
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

- <http://localhost:30025/test-routes/foo>

We use a URL like this to send requests from a client to a server. If we want to tell our server to do something, we send it a request in the form a URL.

## Routing Middleware

Let's write code that will handle a request such as the one defined above. We will put our custom server code in its own file.

In the **routes** folder create a file called **test-routes.js**:

```javascript
var express = require('express');
var router = express.Router();

/* Set up a route called foo. */
router.get('/foo', function(request, response) {
    var message = { 'result': 'success', 'status': 'bar', 'file': 'test-routes.js' };
    console.log('Foo called:\n' + JSON.stringify(message, null, 4));
    response.send(message);
});

module.exports = router;
```

As explained above, this method is designed to be called whenever the user enters, or sends via HTTP, the following URL:

- <http://localhost:30026/test-routes/foo>

## Application Middleware

To get started, we can describe how to link this new file to our express project. This involves using two commands:

- **require**: Use this command to link a file into your project. It is a bit like a **script** tag in an HTML file or an **import** tag in many other programming languages.
- **app.use**: This is an express method that adds [middleware][exp-mid] to your program.

Let's talk some more about middleware. Our server uses a library called express that is designed in part to handle requests sent to our server from a client. When a request is sent to our server:

  - Express parses the request. For instance, if the client asks to insert a record into a database, the express parses the request and makes it easy for us, as JavaScript programmers, to understand. It translates the request from HTTP style code to JavaScript code.
  - It then attemps to pass the request to us. In particular, it looks to see if we have set up any middleware for handling requests of this type.
  - If it finds the middleware, it passes the request to it.
  - There can be multiple pieces of middleware, so that a request is passed to several method before reaching its final destination.

Remember, if we don't ever set up any middleware for handling a request, then we never see the request and it will probably be, for all intents and purposes, ignored by our server.

To set up our middleware for handling requests from the server we take two simple steps. In **app.js** around lines 10 and 28, we write the following:

```javascript
var testRoutes = require('./routes/test-routes');  // on line 10
app.use('/test-routes', testRoutes);               // on line 28
```

The first line just allows us to gain access to our new file: it links it into our project. The second line states what we want to do: _we want to **use** the code in our file as middleware._ We are telling Express that if there is a request from the server that ends with **/test-routes**, then it should be passed to our code in **./routes/test-routes.js**.

## Set the Port

Now set the port, in **bin/www**, to **30026**. Two ways to do that are explained in our [Concurrently assignment][cca].

Be sure to modify listen like this:

```
server.listen(port, () => console.log("Listening on", port));
```

We are going to run the client on port 30025, so we are setting the port for the server to some other number. I've chosen 30026 in the hopes that it will be easy to remember.

Take a moment to understand what we have done.

- We have asked our program to run on port 30026
- We have set up middleware to handle requests that contain the string /test-routes

For instance, the following HTTP request would call the **foo** method in our new file:

- <http://localhost:30026/test-routes/foo>

Here is how to break it down:

- **http://localhost:30026**: The address and port of our server
- **/test-routes**: Use the middleware defined in **/routes/test-routes**
- **/foo**: call the **foo** route in our **test-routes.js** file

## Application vs Router Middleware

Notice that we have made two similar calls:

- **app.use('/test-routes', testRoutes);**
- **router.get('/foo', function(request, response, next) { ... });**

The first use Express application middleware. The second uses Express **router** middleware.

The **router** object is designed to help you set up a dedicated portion of your server for handling a particular kind of URI. For instance, all URI's that begin begin **/test-routes** are handled in the file called **routes/test-routes.js**.

## Test your Work

If you want, go ahead and start your new server:

```
npm start
```

**NOTE**: Most of the time, just typing **npm start** is sufficient to start your project. However, if you get an error, the first thing to check is that all the packages your app needs are properly installed. To do this, type **npm install** (npm i) and then try **npm start** again.

Once your app has started without errors, enter the following URL in the address bar of your browser:

- <http://localhost:30026/test-routes/foo>

You should see very plain output that looks a bit like this:

```
{"result":"success","status":"bar","file":"test-routes.js"}
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
    "file": "test-routes.js"
}
GET /test-routes/foo 304 7.572 ms - -
```

Because we can't use this terminal, we need to create a new one. In particular, you'll need to create a new terminal tab, by entering this command: **CTRL-SHIFT-T**. You can also create tabs from the terminal menu. In either case, you should end up with two bash shells available.

![One terminal, two tabls](https://s3.amazonaws.com/bucket01.elvenware.com/images/one-termina-two-tabs.png)

**NODE**: _For those who know about such things, I'll add that an express server is probably not a candidate to be run in the background with the & symbol. Later on we will see other ways to solve this problem, but for now, let's just start two bash terminal tabs, one for the server, and one for the client._

## Create Client

Navigate to the second terminal tab, the one you are not using. From the root of the **week03-rest-basics** directory, create your client:

```
create-react-app client
cd client
```

This uses a global NPM package found in **~/npm/bin** to create a new react based client application for use in the browser. It uses ES6 syntax, and has many fancy features that we will explore over time. **create-react-app** is built by Facebook, the same people who create React.

**NOTE**: _At the time of this writing, April 2019, **create-react-app** uses an older version of Jest that has a lot of vulnerabilities. This is scheduled to be fixed in version 3.0 of **create-react-app**. Type **create-react-app -- version** to check the version number, and type **ncu -g** to see if an update is available._

It can be easier to use **create-rect-app** than to build a program by hand as we did in our **ReactBasics** assignment.  The output from **create-react-app** is, however, much more feature rich and much more complex. Also, it commits you to a react based style of development quite different from traditional ES5 development that uses jQuery, Angular or some other library. In this course, we are going to spend considerable time working with older applications that have subsystems built with React and ES6.

Because our application uses ES6 (ES2015), you want to tell WebStorm to expect modern JavaScript syntax. In particular, set the **File | Settings | Languages and Frameworks | JavaScript** to **React JSX**.

![JSX and React][wrj]

Also set up ESLint support at **File | Settings | Languages and Frameworks | JavaScript | Code Quality Tools | ESLint**. Set the **ESLint package** to **~/npm/lib/node_modules/eslint**. If that doesn't work, try "Detect package from configuration". You should be able to pick either option from drop down.

![Webstorm and eslint][eslint]

If you get an error about eslint: In the client, we used **create-react-app** and it installed eslint 9.0.0. Now back in the root of our project, we have concurrently itself set up, and it also installs eslint. Only it is perhaps using eslint 10.0.1. We have to change the version of eslint that is in the **package.json** that is in the root of our project so it is sync with the one in the client. To do this. You can open **package.json** and manually set eslint to 9.0.0. Remember, do this not in the client, but in the root of the project. Then, just to be safe, while still in the root of the project, delete **node_modules** and **package-lock.json**:

    rm -r node_modules
    rm package-lock.json.

Then reinstall: **npm i**

## Fix the Logo

Open up **App.css** and change the logo height to 10vmin or smaller:

```css
.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 10vmin;
  pointer-events: none;
}
```

Set the **min-height** for the **App-header** to some small value like **15vh**. Or build your own header. Be creative and do something unique. All I ask is that we can actually see your button when we open the app.

To learn about viewport units (vmin and vh), run this search:

- [Viewport Unit Search](https://www.google.com/search?q=vh+vmin+css)

## Link Client and Server

In your client application, in **package.json**, just before the dependencies section, add this:

```javascript
"proxy": "http://localhost:30026",
```

This tells our react app to forward requests for REST calls to our Express Server that is running on port 30026. See code in **scripts/start.js** for more details.

**NOTE**: _Experiences has taught me that this is one of the most frequently neglected steps. Don't omit it! It is very important._

## Make HTTP Request

We will use the native JavaScript call **fetch** in lieu of the jQuery calls named **$.ajax** or **$.getJSON**. The **fetch** call is part of the ES6 standard, and is now finalized.

## Rewrite the Client

Here is the heart of our application, which we construct in **client/src/App.js**:

```javascript
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {            
            file: 'unknown',
            result: 'unknown',
            status: 'unknown'
        };
    }

    queryServer = () => {
        const that = this;
        fetch('/test-routes/foo')
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

The key call here is to **fetch**, found in the method named **queryServer**. **featch** uses JavaScript **promises**. The promise uses two **.then** methods. If the call could not be made because of a problem on the client side, then the first **.then** method throws an exception. This first call to the **.then** method is there to check if the HTTP call was able to send a request to the server;

It will succeed even if the server reported an error such as 404 Not found or 500 Internal Server error. In other words, the first **.then** can succeed even if the server throws a 404 or 500 error. However, **response.ok** will be set to set false, and **status** and **statusText** will contain the error number and string describing the error. Thus one could write in the first **then** method:

```JavaScript
if(response.ok) {
    return response.json();
}
const errorString = response.status + ' ' + response.statusText;
throw new Error(errorString);
```

If you did this, the second **then** would never be called.

The second **.then** method gives us the result if the method is able to make a call to the server. If the server sent us back some JSON, then the JSON will be found here in the second **.then** clause. Unless we explicitly throw an exception the second then will be called even on a 404 or 500 error. Sometimes the server correctly sends back JSON or some other entity, but we fumble our handling of it, thereby throwing an exception in the second **.then** call.

All errors should end up in the **.catch** block.

Let me try to summarize that:

- If we botch the syntax of our call to **fetch**, then the first **.then** method throws an exception.
- If our syntax is correct, but the server throws an exception then the second **.then** calls throws an exception.
- We can also get in trouble if we botch the job of parsing the JSON sent back from the server.

**NOTE**: _**fetch** can be used for retrieving a multitude of objects, not just JSON. But in our course, we usually use it retrieve JSON, so I'm emphasizing that functionality._

```javascript
fetch('/test-routes/foo')
    .then(function(response) {
        // DID HTTP TALK TO THE SERVER? BLOWS UP IF SYNTAX BAD, NETWORK DOWN, URL BAD, ETC.
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

Assuming you have already run (npm install) the call to start the client could not be simpler:

```
npm start
```

Your application will magically open in the browser. Updates should also appear as you make them in your code.

**NOTE**: _Remember, we typically need to run **npm install** only once per project on a particular machine. We run **npm start** every time we want to start or restart the application. We can use **Ctrl-C** to shut down either the client or the server._

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

## Run Concurrently

Make sure you set up the project the same way we did in the [Concurrently assignment][ccn]. We should be able to issue a single command and start both projects.

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

Don't do this in this application because everything is handled for us by the code auto-generated by **create-react-app**. But in a manual **ReactBasics** type of project, I believe you also need to add code to **webpack.config.js** in the **entry** property:

```javascript
entry: [
     './public/javascripts/control.js'
]
```

## Cloud 9

This is optional, but if you want to run on Cloud9 you might find [these notes helpful](./ReactOnCloudNine.html).

<!--       -->
<!-- links -->
<!--       -->

[cca]:http://www.elvenware.com/teach/assignments/npm/RunConcurrently.html#setting-the-port

[ccn]: http://www.elvenware.com/teach/assignments/npm/RunConcurrently.html#npm-package

[wrj]: https://s3.amazonaws.com/bucket01.elvenware.com/images/webstorm-react-jsx.png

[eslint]: https://s3.amazonaws.com/bucket01.elvenware.com/images/webstorm-eslint-config.png
