## Overview

**STATUS**: _This assignment needs polishing but should be complete enough to allow students to complete the assignment._

The Node Route Basics assignment gives you practice creating NodeJs Express routes (EndPoints) and calling them with [fetch][fapi]. There is still at least one reference to [$.getJSON][jqg], but by and large, I have tried to strip [jQuery](https://jquery.com/) code out of the assignment.

If you need help with this this assignment, study the NodeRoutes examples in JsObjects.

- [NodeRoutes01][nr1]
- [NodeRoutes02][nr2]

## The HTTP Protocol

Our goal is to send a message from the client to the server, and then get a response:

![http](https://s3.amazonaws.com/bucket01.elvenware.com/images/http.png)

The client (web browser) uses HTTP to make a request for HTML, CSS, JavaScript or an image. The request might be triggered when we click on a button or link, type in the address bar, or call an **ajax** function such as [fetch][fapi] or jQuery's **getJSON**.

[TCP/IP][tcpip] is used as the underlying protocol that sends the HTTP request via the network to the server. The server, which in our case is a [Node Js][nodejs] [express][exp] web server, reads the HTTP request and we create a custom route in **routes/index.js** that sends a response back. The response is typically an HTML file, some JSON, or some other artifact sent via the HTTP protocol.

**NOTE**: _You don't need to know how to create HTTP requests or messages. **Express** and **fetch** will do that for you. But you do need to know that messages and/or data are being sent across the Internet using the HTTP protocol._

On the client, the browser unpacks the request. If it was an HTML file the user requested, it parses the HTML, and displays the results to the user. If it is an ajax request, then we typically parse the JSON and display the result to the user in some HTML element.

## Step One: Pull Elven Assignments {#elven-assignments}

I have renamed the **Prog270-Assignments** repository to **elven-assignments**. If you don't have the repo, then do this:

```
git clone http://github.com/charliecalvert/elven-assignments.git
```

## Step Two: Copy Project

Copy the node express program called **NodeRouteBasics** from my repo to yours:

    cp -rv ~/Git/elven-assignments/NodeRouteBasics ~/Git/prog272-lastname-2019/Week03-NodeRouteBasics

Remember that you have to change **prog272-lastname-2019** to use your lastname.

Check your work with [meld](https://meldmerge.org/):

    meld ~/Git/elven-assignments/NodeRouteBasics ~/Git/prog272-lastname-2019/Week03-NodeRouteBasics

If the force is with you, then meld will show the two directories as having "no differences"

![No Differences][nrm]

**Figure**: _Meld showing that two directories have the same content. (Right click and open and in tab to see expanded version)_

If WebStorm gives errors about ESlint, consider reading the [ReactEslint][resla] or watching the [TLDR eslint video][tldrev].

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

![Node Route Basics UI][nrbui]

[nrbui]: https://s3.amazonaws.com/bucket01.elvenware.com/images/node-route-basics-ui.png

## Step ThreeA: Buttons, Pug and Clicks {#step-threea}

Let's use Pug to define an HTML button element. To do so, put this in **views/index.pug**:

```
button#searchAction Search
```

**NOTE**: _Jade has been renamed to [Pug](https://pugjs.org/api/getting-started.html). At this stage, we should all be using pug. It doesn't matter whether we are using Jade or Pug. In most case the only different is the extension. We call it (**index.jade**) if we are using Jade, or with Pug we write (**index.pug**). Both files behave the same way in nearly all cases. However, this name change happened long enough ago that we should all be on Pug now. I should add that there now are some differences between Pug and Jade, but the differences are due simply to bug fixes and the addition of a few new features. Pug and Jade are the same product with different names._

To detect a click on this button, write something like this in **public/javascripts/control.js**:

```javascript
function search() {
  console.log('Search called');
    // YOUR CODE HERE
};

document.getElementById('searchAction').onclick = search;
```

This overly long (10 minutes) video shows me making lots of mistakes. But perhaps that is good, as you might hit the problems as well and you can see how I fix them.

<iframe width="560" height="315" src="https://www.youtube.com/embed/K5-eBgEePK0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Step Four: Server {#server}

All the calculations should be performed on the server side, in a module found in the **routes** directory, per the [NodeRoutes02][nr2] example in JsObjects.

The return values should be a simple JavaScript literal that either is JSON or can easily be converted into JSON. In our case, this object should contain at minimum, a single property called **result** that contains the result of the calculation. For instance, this very simple **getNine** express route (endpoint) would set **result** to the number 9:

```JavaScript
router.get('/getNine', function(request, response) {
    'use strict';  
    response.send({"result": 9});
});
```

You can put this method in the **routes/index.js** file, just above the **exports** statement.

Notice that his method uses the express **response** object to send a tiny JSON object that looks like this: **{result: 9}**.

In its entirety, the route says:

- If we get an HTTP get request for the **/getNine** endpoint
- Then we will send back a small JSON object with a single property with the key set to **result** and the value to **9**.

**NOTE**: _I'm not going to spend much time on JSON. For now, just think of JSON as a JavaScript object literal with the keys in double quotes and no methods. You can, however, set the value of the key value pair to a **string**, **number**, **object**, **boolean** or **null**. Find out more:_

- [The JSON Spec][json]
- [Convert JSON to an Object Literal][jsonparse]
- [Convert an object literal to JSON][jsonstr]

We aren't yet using the **JSON** object with its **parse** and **stringify** methods that are discussed in the latter two links shown above. However, we will use both **JSON.parse** and **JSON.stringify** a lot over time. At this stage, just try to understand that it is important and see if you can get a sense of what the two methods do. There will come a time when you will need them!

See the [getNine video](https://youtu.be/-joWToKwiN0).

## Call Server without Parameters {#no-params}

In **views/index.pug** add an HTML PRE tag with an ID of **displayArea** that we can use to display information. Also add a getNine button:

    extends layout

    block content
        h1= title
        p Welcome to #{title}

        button#searchAction.btn.btn-success Search
        button#getNineAction.btn.btn-success Get Nine

        pre#displayArea

**NOTE**: _Recall that in CSS the # sign means that you want to declare an HTML ID attribute. The hash tag means the same thing in Pug. Thus the PRE tag looks like this at run time &lt;pre id="displayArea"&gt;&lt;/pre&gt;._


In **control.js** add code to call a route (endpoint) without parameters:

```javascript
function getNine() {

  fetch('/getNine')
    .then((response) => response.json())
    .then((response) => {
        const displayArea = document.getElementById('displayArea');
        displayArea.innerHTML = JSON.stringify(response, null, 4);
     })
    .catch((ex) => {
       console.log(ex);
     });
}
```

The **fetch** call is a [promise][jspr]. There are two calls to the **then** method. Generally speaking:

- If you hit an error, it will be caught in the first **then** call
- If your call to the server succeeds, then the result returned from the server will show up in the second **then** call.

This is an over-simplification, but the key point is to look for your data from the server in the parameter of the second **then** method.

We will also want to add code to react to clicks on the **getNine** button:

```javascript
const getNineAction = document.getElementById('getNineAction');

if (getNineAction) {
    getNineAction.onclick = getNine;
}
```

Here is [a video](https://youtu.be/LcnkNwsLDsY) that should help you with this section.

## Call Route (endpoint) with Parameters {#pass-data}

Sometimes we need to not just call a route on the server, but call the route and also pass in parameters. Suppose we want to calculate the number of feet in X miles, which X is supplied by the user in a [text INPUT][ic] or [numeric INPUT][icn] control.

First, define the input control in our Jade/Pug file:

    extends layout

    block content
      h1= title
      p Welcome to #{title}

      input#userInput(type="number")  <=== HERE

      div    
        button#calculateFeetFromMiles Calculate Feet from Miles    

      div
        pre#displayArea

Here is the client side code that calls that module:

```javascript
const userMiles = document.getElementById('userInput').value;
fetch('/calculateFeetFromMiles' + '?miles=' + userMiles)
    .then((response) => response.json())
    .then((response) => {
        const displayArea = document.getElementById('displayArea');
        displayArea.innerHTML = JSON.stringify(response, null, 4);
    })
    .catch(ex => {
        console.log(ex);
    });
```

## Server Side HTTP GET Parameters {#server-side-get}

Define server side code that accepts a parameter:

```javascript
router.get('/calculateFeetFromMiles', function(request, response) {
    response.send({result: request.query.miles * 5280});
});
```

The **request** (**req**) parameter has a property called **query**. Use it to access the parameters you passed to the server: **request.query.miles**.

## Server Side HTTP POST Parameters {#post-call}

When you **POST** data to the server you need to pass in a [JavaScript object literal][jol] as a second parameter to **fetch**. This second parameter is used to specify [the options][fo] for your call. For instance, you can specify whether you want to make a **GET** or a **POST** call. By default, **fetch** uses **GET**. There are a number of possible options, but in many cases you will use only these three:

- **method**: Set this to 'POST'
- **headers**: Create the header defining the content type, which in our case will almost always be JSON.
- **body**: The parameters you want to pass in. In our case, we can just use a JavaScript object literal.

I find it a bit of a struggle to define the exact format of these options, so I have wrapped them in a little function called get **getPostOptions**:

```javascript
function getPostOptions(body) {
    return {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    };
}
```

We call this function, passing in the parameters we want to pass to the server endpoint. If we wanted to pass in to parameters of type of string called **param01** and **param02**, then we might call **getPostOptions** like this:

getPostOptions({
  param01: 'foo',
  param02: 'bar'
})
```

When we call **fetch** usually just pass in one parameter:

```javascript
fetch('/some-url')
  .then etc...
```

When POSTing data, however, we should pass in two parameters. The first is our URL, and the second the options returned from our utility function:

```
fetch('/some-url', getPostOptions({...}));
```

Here is a more complete example of the type of call you can use to complete **calculateCircumference** portion of this assignment:

```
function callServer() {
    const userInput = document.getElementById('userInput').value;
    const query = {propForServer: userInput};

    fetch('/some-url', getPostOptions(query))
        .then((response) => response.json())
        .then((response) => {
            const displayArea = document.getElementById('displayArea');
            displayArea.innerHTML = JSON.stringify(response, null, 4);
        })
        .catch((ex) => {
            console.log(ex);
        });
}
```

On the server side, everything looks the same except that we use **router.post** rather than **router.get** and we use **request.body** rather than **request.query**:

```javascript
router.post('/calculateCircumference', function(request, response) {
    console.log(request.body);
    // YOU WRITE THE CODE TO SEND BACK THE RESPONSE
});
```

## Extra Credit

For three points extra credit, implement **getFeetInMile** and **calculateFeetFromMiles** using HTTP GET calls, and use POST for **calculateCircumference**:

```javascript
var express = require('express');
var router = express.Router();

router.get(...)
router.post(...)
```

If you are going for extra-credit, please add a note to that effect when you submit the assignment.

The formula for calculating the circumference of a circle given its radius looks like this:

```javascript
const	circumference = 2 * radius * Math.PI;
```

The parameter for **calculateFeetFromMiles**: **miles**

The parameter for **calculateCircumference**: **radius**

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

Now **require** your **utils.js** file in **routes/index.js** and use it in the appropriate route on your server. The method should take one parameter called **radius** and it should return the calculated circumference.

**NOTE**: _If we are building our own NPM packages, then put this object and method in the package instead. Otherwise just use the technique outlined above. In either case, our goal is to learn how to create reusable code that we can plug into an project on the server side._

## Turn It In

Check your code into your Git repository and submit the URL of your
repository or of the project you submitted.

## LastPass

I use LastPass. It puts an icon in many input controls. To turn that off, add an attribute to your input controls called **data_lpignore**:

For instance, in your Pug file do this:

```
input#userInput(type="number", data_lpignore="true")
```

To turn it off for all INPUT controls on your page, add this near the top of **control.js**:

```javascript
const elements = document.getElementsByTagName("INPUT");
for (let element of elements) {
    element.setAttribute("data_lpignore", "true");
}
```

To turn it off in a specific control, one could write something like this:

```javascript
document.getElementById('userInput').setAttribute("data_lpignore", "true");****
```

Or, you can do it by class name:

```javascript
const elements = document.getElementsByClassName('no-last-pass');
for (let element of elements) {
    element.setAttribute("data_lpignore", "true");
}
```

## More Complex Example

This does not directly relate to the current assignment, but I'm leaving it here for now. It still has jQuery code in it.

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

## Setting up the Port

Let's allways use the following:

```
var port = process.env.PORT || 30025;

// Code omitted here...

app.listen(port);
console.log('Listening on port :' + port);  
```

We want to pick a particular port because in some situations, such as running on
EC2, we need to open the port ahead of time. By choosing one port, and always
using it, you won't have to edit my code before you can run it, and vice versa.

## Node Express Routing Basics {#routing}

Express offers support for HTTP verbs such as Get, Post, Put, etc.

The verbs provide a response to specific routes, such as '/':

```
app.get('/', function(req, res) {
    console.log("root request sent");
});
```

Or here is request that uses a wildcards or regular expressions:

```
app.get('/a*', function(req, res) {
    console.log("A request sent that begins with an a");
});
```

Working with numbers:

```
app.get('/book/:id((d+)', function(req, res) {
    console.log("Only requests that are numbers");
});
```

## Node Express Serving up Static Pages

Put your static files in a particular directory and tell express about the
directory:

```
app.use("/public", express.static(__dirname + '/public'));
```

Server them up like this:

```
app.get('/', function(req, res) {
    var html = fs.readFileSync('public/index.html');
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.end(html);
});
```

- <http://www.senchalabs.org/connect/static.html>

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

<!--       -->
<!-- links -->
<!--       -->

[exp]: https://expressjs.com/en/guide/routing.html
[fapi]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[fo]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Making_fetch_requests
[ic]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text
[icn]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
[jol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals
[jqg]: http://api.jquery.com/jquery.getjson/
[jspr]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[json]: https://www.json.org/
[jsonparse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[jsonstr]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify   
[nodejs]: https://nodejs.org/en/about/
[nr1]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes01
[nr2]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes02
[nrm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/node-routes-meld.png
[tcpip]: https://en.wikipedia.org/wiki/Internet_protocol_suite

[resla]: https://www.elvenware.com/teach/assignments/react/ReactEsLint.html
[tldrev]: https://www.elvenware.com/teach/assignments/react/ReactEsLint.html#video
