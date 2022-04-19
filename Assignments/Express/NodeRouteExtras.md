---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Express/NodeRouteExtras.md
relativePath: Assignments/Express/NodeRouteExtras.md
title: NodeRouteExtras
queryPath: Assignments/Express/
subject: Express
fileNameMarkdown: NodeRouteExtras.md
fileNameHTML: NodeRouteExtras.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

This used to be part of the NodeRoutesBasics assignment but now can be safely ignore.

## More Complex Example

This does not directly relate to the current assignment, but I'm leaving it here for now. It still has jQuery code in it, so it is old fashioned, bordering on obsolete. You can ignore this entire section.

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
$ ncu
$ ncu -u
$ npm install
```

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

```javascript
app.get('/', function(req, res) {
    console.log("root request sent");
});
```

Or here is request that uses a wildcards or regular expressions:

```javascript
app.get('/a*', function(req, res) {
    console.log("A request sent that begins with an a");
});
```

Working with numbers:

```JavaScript
app.get('/book/:id((d+)', function(req, res) {
    console.log("Only requests that are numbers");
});
```

## Node Express Serving up Static Pages

Put your static files in a particular directory and tell express about the
directory:

```javascript
app.use("/public", express.static(__dirname + '/public'));
```

Server them up like this:

```javascript
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

    mkdir ~/tmp
    cp ~/Git/isit322-lastname-2016/Week04-Middleware/node_modules ~/tmp
    cp ~/Git/isit322-lastname-2016/Week04-Middleware/public/components ~/tmp

You might want to also copy the **package.json** and **bower.json** files to tmp. As needed, update your files to the latest:

    cd ~/tmp
    npm outdated --depth=0

And then get the latest of everything as needed.

Now go back to your project and create symbolic links to these packages. The best way to do this is to use

- the run alias from **~/.bash_aliases**
- or the **nm** and **component** aliases from **~/.bash_aliases**.

Just as an **fyi**, here they are:

    alias run="nm && components && npm start"
    alias nm="ln -s ~/tmp/node_modules/"
    alias components="ln -s ~/tmp/components/ public/components"


For this project, do the following in **~/tmp**, or, if you have completed the above, in your project:

  npm install supertest --save-dev
  npm install jasmine --save-dev
  npm install -g jasmine

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
