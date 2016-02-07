## Overview

The Node Route Basics assignment gives you practice create NodeJs Express routes and calling them with **$.getJSON** or **$.ajax**.

If you need help with this this assignment, study the NodeRoutes
examples in JsObjects.

- [NodeRoutes01](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes01)
- [NodeRoutes02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes02)

We are sending a message from the client to the server, and then getting a response:

![http](https://s3.amazonaws.com/bucket01.elvenware.com/images/http.png)

The client (web browser) uses HTTP to make a request for HTML, CSS, JavaScript or an image. The request might be triggered when we click on a link, type in the address bar or call an **ajax** function such as **getJSON**.

TCP/IP is used to send the request via the network to the server. The server, which in our case is a NodeJs express web server, reads the HTTP request and we create a custom route in **routes/index.js** that sends a response back. The response is typically an HTML file, some JSON, or some other artifact sent via the HTTP protocol.

On the client, the browser unpacks the request. If it an HTML file the user requested, it parses the HTML, and displays the results to the user. If it is an ajax request, then we typically parse the JSON and display the result to the user in some HTML element.

## Step One: Pull Elven Assignments {#elven-assignments}

I have renamed the **Prog270-Assignments** repository to **elven-assignments**. If you don't have the repo, then do this:

```
git clone http://github.com/charliecalvert/elven-assignments.git
```

If you already have the repo, then:

```
cd ~/Git/Prog270-Assignments
nano .git/config
```

- Change the **Remote Origin | Url** to from **Prog270-Assignments** to **elven-assignments**.
- Save (Ctrl-O) and exit (Ctrl-X) nano
- **git pull**

Now go back to **~/Git**. If necessary, rename the folder from **Prog270-Assignments** to **elven-assignments**.

## Step Two: Copy Project

Copy the node express program called **NodeRouteBasics** from my repo to yours:

```
cp ~/Git/elven-assignments/NodeRouteBasics ~/Git/isit322-lastname-2016/Week04-NodeRouteBasics
```

Instead of running **npm install** and **bower install**, do this:

- Copy a reasonably up to date version of **node_modules** from one of your projects to **~/tmp**.
- Copy a reasonably up to date version of **public/components** from one of your projects to **~/tmp**.

For instance

```
mkdir ~/tmp
cp ~/Git/isit322-lastname-2016/Week04-Middleware/node_modules ~/tmp
cp ~/Git/isit322-lastname-2016/Week04-Middleware/public/components ~/tmp
```

You might want to also copy the **package.json** and **bower.json** files to tmp. As needed, update your files to the latest:

```
cd ~/tmp
npm outdated --depth=0
```

And then get the latest of everything as needed.

Now go back to your project and create symbolic links to these packages. The best way to do this is to use

- the run alias from **~/.bash_aliases**
- or the **nm** and **component** aliases from **~/.bash_aliases**.

Just as an **fyi**, here they are:

```
alias run="nm && components && npm start"
alias nm="ln -s ~/tmp/node_modules/"
alias components="ln -s ~/tmp/components/ public/components"
```

For this project, do the following in **~/tmp**, or, if you have completed the above, in your project:

```
npm install supertest --save-dev
npm install jasmine --save-dev
npm install -g jasmine
```

**NOTE**: *The point of setting up this ~/tmp directory is to put an end to long **npm installs** during class. Talk to Adam, he knows all about this.*

## Step Three: Client Interface {#interface}

It should include the following:

- Various buttons and input controls.
- When the user clicks on one button, return the number of feet in a mile.
- When the user clicks on another button, calculate the number of feet
in X miles, where X is supplied by the user in an HTML **input** element.
- Also provide the circumference of a circle given a radius supplied
by the user.

You interface will probably consist of three buttons:

- Get Feet in Mile
- Calculate Feet from Miles
- Calculate Circumference
- One input control for entering number used by the last two butttons  


## Step Four: Server {#server}

All the calculations should be performed on the server side, in a
module, per the [NodeRoutes02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes02/Library)
example in JsObjects.

The return values should be a simple JavaScript literal (JSON) that contains at minimum, a property called **result** that contains the result of the calculation. For instance, our **getNine** method would set result to the number 9.

For three points extra credit, implement **getFeetInMile** and
**calculateFeetFromMiles** using HTTP GET calls, and use POST for
**calculateCircumference**:

	var express = require('express');
    var router = express.Router();

	router.get(...
	router.post(...

The formula for calculating the circumference of a circle given its
radius looks like this:

	Circumference = 2 * radius * Math.PI;

The parameter for calculateFeetFromMiles: miles

The parameter for calculateCircumference: radius

## Step Five

Put a **calculateCircumference** method in your NpmPackage **utils** object
and use it in the call from your server. The method should take one parameter
called **radius** and it should return the calculated circumference.

## Turn It In

Check your code into your Git repository and submit the URL of your
repository or of the project you submitted.
