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

## Step Two: Copy Project

Copy the node express program called **NodeRouteBasics** from my repo to yours:

```
cp -r ~/Git/elven-assignments/NodeRouteBasics ~/Git/prog272-lastname-2016/Week04-NodeRouteBasics
```

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


## Step ThreeA

In index.jade:

```
button#search Search
```


## Step Four: Server {#server}

All the calculations should be performed on the server side, in a
module, per the [NodeRoutes02](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes02/Library)
example in JsObjects.

The return values should be a simple JavaScript literal (JSON) that contains at minimum, a property called **result** that contains the result of the calculation. For instance, our **getNine** method would set result to the number 9.

For three points extra credit, implement **getFeetInMile** and **calculateFeetFromMiles** using HTTP GET calls, and use POST for **calculateCircumference**:

```javascript
var express = require('express');
var router = express.Router();

router.get(...)
router.post(...)
```

If you are going for extra-credit, please add a note to that effect when you submit the assignment.

The formula for calculating the circumference of a circle given its radius looks like this:

	Circumference = 2 * radius * Math.PI;

The parameter for calculateFeetFromMiles: miles

The parameter for calculateCircumference: radius

Recall that with **GET** methods we use frequently use **request.query** to find parameters, but with **POST** methods we use **request.body**.

- [Elvenware on POST and GET in Express](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#working-with-post)
- [Docs on req.body](http://expressjs.com/en/4x/api.html#req.body)
- [Docs on req.query](http://expressjs.com/en/4x/api.html#req.query)
- [Interesting Discussion](http://stackoverflow.com/a/12008719)

## Step Five

Put a **calculateCircumference** method in a file called **routes/utils.js**. In that file create a simple object literal:

```javascript
module.exports = {
	// YOUR METHOD HERE
}
```

Now **require** your **utils.js** file in **routes/index.js** and use it in the appropriate route on your server. The method should take one parameter
called **radius** and it should return the calculated circumference.

**NOTE**: _If we are building our own NPM packages, then put this object and method in the package instead. Otherwise just use the technique outlined above. In either case, our goal is to learn how to create reusable code that we can plug into an project on the server side._

## Turn It In

Check your code into your Git repository and submit the URL of your
repository or of the project you submitted.

## Hint: Passing Data {#pass-data}

First, an example showing how to call a route without parameters:

```javascript
function callServerWithoutParms() {

	fetch('/search')
	        .then((response) => response.json())
	        .then((response) => {
	            console.log(response);
	        })
	        .catch((ex) => {
	            console.log(ex);
	        })

}
```
Now an example showing how to call a route with parameters:

```javascript
function callServerWithParms() {

	// Get Data We Want to Pass to the Server
	var dirsToWalk = document.getElementById('dirsToWalk');
	var directory = dirsToWalk.options[sourceIndex].value;
	var destinationDirs = document.getElementById('destinationDirs');
	var destinationDir = destinationDirs.options[destinationIndex].value;

	var highlight = $('#highlight').prop('checked');

	// Put that data in JavaScript Object
	var requestQuery = {
		directoryToWalk: directory,
		destinationDir: destinationDir,
		highlight: highlight,
	};

	// Call the server and pass the data as a parameter.
	$.getJSON('/walk', requestQuery, function (result) {
		elf.display.showApacheFiles(result.htmlFilesWritten, result.destinationDir);
		elf.display.fillDisplayArea(JSON.stringify(result, null, 4));
	}).done(function () {
			elf.display.showDebug('Walk loaded second success');
		})
		.fail(function (jqxhr, textStatus, error) {
			elf.display.showDebug('Walk loaded error: ' + jqxhr.status + ' ' + textStatus + ' ' + error);
		})
		.always(function () {
			elf.display.showDebug('Walk loaded complete');
		});

}
```

Below, in the next section, we look more closely at passing parameters.


### Client Server Interactions {#interact}


Look at these code excerpts from the code shown above. We look specifically at the call to the server:

```javascript

	// Put that data in JavaScript Object
	var requestQuery = {
		directoryToWalk: directory,
		destinationDir: destinationDir,
		highlight: highlight,
	};

	// Call the server and pass the data as a parameter.
	$.getJSON('/walk', requestQuery, function (result) { ... });

```

And here is what it looks like on the server. Notice how we
use the request object to discover the parameters passed
by the client:

```javascript

router.get('/walk', function(request, response) {
    'use strict';
    console.log('In walk', request.query);
    var directoryToWalk = request.query.directoryToWalk;
    var destinationDir = request.query.destinationDir;
    var highlight = request.query.highlight;
    etc
});
```

## Update Out of Date Packages

```
$ npm install -g npm-check-updates
$ npm-check-updates -u
$ npm install
```

If it is still not up to date, do: **ncu -a**

Also, be sure to remove **phantomjs** from **packages.json**.

See here:

- <http://stackoverflow.com/a/22849716>

## Temp directory

This is optional. Skip if you are not interested.

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
