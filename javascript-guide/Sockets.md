---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/Sockets.md
relativePath: javascript-guide/Sockets.md
title: Sockets
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: Sockets.md
fileNameHTML: Sockets.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

# Overview

This page is primarily about socket.io. There are however, several different options available:

- [WebSocket](http://www.websocket.org/aboutwebsocket.html) is part of HTML5. It keeps a channel open between the server and client. Traditional, connections are open only when we make an ajax call, and are closed after the call. WebSockets are always open, hence real-time updates can be sent along them.
- socket.io. That is what we use here.

## Polling

WebSockets keep the connection open constantly. It is not polling to see if there are more messages, it stays open. Libraries such as **socket.io** will automatically fall back on polling if the socket is not kept open.

## Ports

Web Sockets use ports 80 and 443, where 443 is https.

## A socket io example

We can start with a standard express application. We will need to modify:

- package.json
- bin/www
- index.jade and layout.jade
- And create **Control.js** for handling the socket messages on the client side.

This application we create receives a message from the server every 1.5 seconds.  Also, if you type something in the input box, it goes to the server, is transformed and sent back. In particular, the word apple is transformed to orange on the server side in the www file.

## Install socket.io

In the root folder for your new express application, run this command:

 npm install socket.io --save

This will install the socket.io library and place an entry for installing it in your **package.json** file. When you are done **package.json** might look something like this:

```json
{
  "name": "SocketBasics",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.8.1",
    "cookie-parser": "~1.3.3",
    "debug": "~2.0.0",
    "express": "~4.9.0",
    "jade": "~1.6.0",
    "morgan": "~1.3.0",
    "serve-favicon": "~2.1.3",
    "socket.io": "^1.1.0"
  }
}
```

It's the last line that is most important in the current context.

**Note**: *If the version numbers of the libraries in your code differ from what you see above that should not matter. However, if you simply cannot get the program running following the steps outlined here, then consider deleting your **node_modules** directory, replacing your **package.json** with the one shown above. You will, of course, need to run **npm install** to replace your deleted **node_modules** directory.*

## The www File

We radically transform the www file, like this:

```javascript
#!/usr/bin/env node

var debug = require('debug')('SocketBasics');
var http = require('http');
var app = require('../app');

app.set('port', process.env.PORT || 30025);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    
    socket.on('messageChange', function(data) {
        console.log(data);
        var regex = new RegExp("apple", "gi");
        socket.emit('receive', data.message.replace(regex, "orange"));
    });
    
    var x = 0;
    setInterval(function () {
        console.log("interval");
        socket.emit('display', x++);
    }, 1500);
});


server.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
```

## Alternate Start

Instead of starting your app with **/bin/www**, it is probably best to create a new file called **/bin/Sockets.js**. Use that file to start the application. This way you can have version of your program that uses sockets (Sockets.js) and one that doesn't (www).

Here is **Sockets.js**:

```javascript
#!/usr/bin/env node

var debug = require('debug')('SocketBasics');
var http = require('http');
var app = require('../app');
var socketCore = require('../routes/SocketCore');

app.set('port', process.env.PORT || 30025);

var server = http.createServer(app);

socketCore.init(server);

server.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
```

This code can serve as the starter code for any application that you want to use with sockets. Use it in place of **/bin/www**. You would node start this application like this:

- node bin/Sockets.js
- nodemon bin/Sockets.js

You should also make that change in **package.json**.

Notice this line of code:

```javascript
var socketCore = require('../routes/SocketCore');
```

This line of code loads the file that contains the majority of your socket code. The details will differ depending on your needs, but you might start it like this:

```javascript
module.exports = {

    init : function(server) {
        console.log("init called");
        
        var io = require('socket.io').listen(server);
        
        io.sockets.on('connection', function(socket) {
            socket.emit('socket_is_connected', 'You are connected!');
            
            socket.on('disconnect', function() {
                console.log('disconnected event');
            });
        });
        
    },

};
```

## PUG

Pug used to be called Jade.

```pug
extends layout

block content
  h1= title
  
  p This application receives a message from the server every 1.5 seconds. 
  p. 
    If you type something in the input box, 
    it goes to the server, is transformed and sent back. In
    particular, the word apple is transformed to orange on the
    server side.

  h2 Socket Output
  input(type='text', class='message', placeholder='If you want an apple just say so.', onkeyup='send(this)')
  script(src="/socket.io/socket.io.js")
  p.receive Bar
  p.display Foo
```

## Control

```javascript
var send;

window.onload = function() {

    var socket = io.connect('http://localhost');

    socket.on('receive', function(message) {
        console.log('received %s', message);
        document.querySelector('.receive').innerText = message;
    });
    
    socket.on('display', function(message) {
        console.log('received %s', message);
        document.querySelector('.display').innerText = message;
    });

    send = function(input) {
        console.log(input.value);
        var value = input.value;
        console.log('sending %s to server', value);
        socket.emit('messageChange', {
            message : value
        });
    };

};
```

Note that your socket connection needs to reference the server on which the client is running.

```javascript
var socket = io.connect('http://192.168.2.11:30025');

socket.on('socket_is_connected', function(message) {
       $('#debug').html(message);
});
```

Here we don't connect to localhost, but to a specific IP address. Of course, this could be a URL:

```javascript
var socket = io.connect('http://example.com:30025');
```

In layout.jade you will need to add a **script** tag that loads **Control.js**.
