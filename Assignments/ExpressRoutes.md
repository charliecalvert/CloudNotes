---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/ExpressRoutes.md
relativePath: Assignments/ExpressRoutes.md
title: ExpressRoutes
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: ExpressRoutes.md
fileNameHTML: ExpressRoutes.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Slide Deck: [http://bit.ly/noderoutes](http://bit.ly/noderoutes)

- The IP address gets you to the right machine (localhost)
- The port gets you to the right program/service on that machine. Which in this case our express webserver running on port 30025
- The route gets you to the right method in the service

Suppose you write this URL:

  http://localhost:30025/read

- The machine is localhost
- The port is 30025
- And the route is read (in index.js)

## Create

```bash
express week04-express-routes
cd week04-express-routes
npm install
```

The the usual list of items:

- Change the port in bin/www to 30025
- Use nodemon in package.json
- Change the title in routes/index.js to include your last name

Put our DEBUG statement in the OS environment and start the app:

```bash
export DEBUG=week04-express-routes:server
npm start
bash

## Bower

```bash
bower init
cp $ELF_TEMPLATES/.bowerrc .
bower install jquery --save
```

Then add jquery to **layout.jade**:

```JavaScript
script(src='components/jquery/dist/jquery.js')
script(src="javascripts/control.js")
```

Add some buttons and a paragraph to **index.jade**:

    button#read Read
    button#readJson ReadJson

    pre#display


## Server

In **routes/index.js:**

```javascript
router.get('/read', function(request, response) {
  response.send([
    {name: 'SarahLee'},
    {name: 'Bob'}
  ]);
});
```

In **public/names.json**:

```json
[{
  "name": "FileLee"
}, {
  "name": "FileBob"
}]
```

## Client

Make a call to the server in methods named **read** and **readJson**. Let's start with some code that shows how to set up an **onclick** handler that calls a method named **read**. When the user clicks on an HTML button with the ID identified by the text **#read**, then out JavaScript **read** method is called:

```javascript
$(document).ready(function() {
   console.log('Document loaded in prog272');

   $('#read').click(read);

   function read() {
      console.log('callRead called');
   }
});
```

Now lets evolved the method further with code that shows how to:

- Call a route on the server.
- Load a JavaScript file stored on the server.

```javascript
$(document).ready(function() {
   console.log('Document loaded in prog272');

   $('#read').click(read);
   $('#readJson').click(readJson);

   function read() {
      console.log('callRead called');
      foo();
      $.getJSON('/read', function(result) {
         console.log(result);
         $('#display').html(JSON.stringify(result));
      })
   }

   function readJson() {
      console.log('readJson called');
      $.getJSON('names.json', function(result) {
         console.log(result);
         $('#display').html(JSON.stringify(result));
      })
   }
});
```

In particular, our JavaScript **read** method makes a REST call to the **/read** route on the server. Our **read** method invokes the **getJSON** method which initiates an HTTP call to the server. The anonymous function in the call is invoked when the response from the server is sent back to our browser hosted application. In short, the message is sent from our JavaScript code in the browser, to an Express method on the server, and then back to our anonymous function. On the Express server, [a **router.get** call you added](#server) to **routes/index.js** receives the call from the browser and sends a result back to the browser.

The method called **readJson** sends an HTTP request to the server for the file called **names.json**. The result of the request is handle by the anonymous function passed to **getJSON**. This method never calls a JavaScript method on the server. Instead, it simply retrieves a file from the server.

## Add method

Let's append an **add** method to our project. It will involve a call from the client to the server. Here are the steps:

- The user enters data on the client.
- The data is sent to the server.
- The server performs an addition operation on that data and sends back a result.

The implementation is relatively straight forward. First on the server:

```javascript
router.get('/add' etc....)
```

And a button with an id of **add** to your jade. And set up a button response method in **control.js**.

```javascript
var operatorA = $('#operatorA').val();
      var operatorB = $('#operatorB').val();
      console.log('operators:', operatorA, operatorB);
      var requestQuery = { operatorA: operatorA, operatorB: operatorB };
```

Add two numeric **INPUT** controls and an **add** BUTTON to your page. When the user enters two numbers, then selects the button, a request should be sent to the server to add the two numbers. To do this, pass **requestQuery** as the second parameter to [**getJSON**](http://api.jquery.com/jquery.getjson/):

```javascript
getJSON('/add', requestQuery, etc...);
```

In the server side, use **request.query** to retrieve the parameters:

```javascript
router.get('/add', function(request, response) {
  console.log('add method called');
  console.log('The parameters are:', request.query);

  ETC... YOUR CODE HERE....
});
```

Using **parseInt** as an aid, add the two numbers and then use the **response** object to send back the result. Display the output to the user. For instance, if the user enters 2 and 3, the server should add these numbers together and send back an object containing the value 5.

## Turn it in

Make sure your runs smoothly and the **read** and **add** routes work. push your work. If you did not use the folder specified above, please let me know.

**NOTE**: _No nested project folders!_
