# GameListener

We want to create a game listener, which will show the current state of the game. It shows the current location of the main character and the mini-map. It is controlled and updated entirely through sockets, and it works on a different port than the game.

![GameListener](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGSGpKRmRSRENHdms)

In small print, on the left, notice that the game is also connected. You can tell because you see the string "You are connected." In fact, the game is hosting the socket connection on the server side, and listening to the connection on the client side:

![GameListener](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGc2ktTUk5bThBM2s)

Notice the address bar. As you can see, I'm listening on a specific IP address, rather than on Localhost. This can be important if you are trying to:

- Run the game on Linux and play it on Windows.
- Run the game on one machine, and run the listener on a totally different machine, such as your phone.

## Server Side

On the server side, you should move your main socket code out of **bin/www**. In fact, you should make two changes:

- No longer launch **/bin/www** as the primary way to start your application. Instead, create a file called **bin/Sockets.js** as the main file.
- Then create another file called **/public/javascripts/SocketsCore.js**.

The key changes you need to make on the server side of the game are explained [here][socketsAlt].

[socketsAlt]: http://www.elvenware.com/charlie/development/web/JavaScript/Sockets.html#alternate-start

You need to do something similar on the server side for **GameListener**, but your **routes/SocketCore.js** file can be greatly simplified:

```
module.exports = {

    init : function(server) {
        console.log("init called");

        var io = require('socket.io').listen(server);
    },

};
```

It would not be hard, obviously, to merge this code back into **bin/Sockets.js**.


## Client Side

On the client side, you need to listen for events, just as we have done previously when working with other examples.

```
var socket = io.connect('http://192.168.2.11:30025');

socket.on('socket_is_connected', function(message) {
       $('#debug').html(message);
});
```

Think for a moment about what is happening here. We are connecting to a specific IP address on which the server is running. That is, our game is running on that IP address. Our app, the **GameListener** is running on port 30026, because 30025 is already taken by the game. But we don't connect to 30026, because our server is not running running on port 30026. It is running on 30025, so we connect to that port. Here is the key line again, just to be sure you understand:

```
var socket = io.connect('http://192.168.2.11:30025');
```

Don't forget that you will need to load **socket.io.js** into memory. If you are not using require, that would look a bit like this:

```
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    script(src="javascripts/jquery-2.1.1.js")
    script(src="/socket.io/socket.io.js")
    script(src="javascripts/Control.js")

  body
    block content
```

Since we are using **require** in this class, then you will probably need to add something like this to **Main.js**:

```
require.config({
    baseUrl : '.',
    paths : {
        "jquery" : 'javascripts/jquery-2.1.1',
        'Sockets' : '/socket.io/socket.io',
```

And shim it:

```
shim: {
   'Sockets': {
       exports: 'io'
  }
```

If you don't add these lines, then this line on the client fails:

```
var socket = io.connect('http://127.0.0.1:30025');
```

And then, at the top of Control.js (or wherever), write something like, where you are probably loading more than just sockets:

```
define([ "Sockets" ], function(io) {
```

Do you see that I'm linking Sockets and io in with the requirejs call define?

## GameListener Server Special

We might go ahead and keep the architecture shown above in the section on the Server side for the **GameListener**. If, however, we ever do want to set up the **GameListener** as a broadcaster of message we want to begin by doing something like this:

```
module.exports = {

    init : function(server) {
        console.log("init called");

        var io = require('socket.io').listen(server);

        io.sockets.on('connection', function(socket) {
            socket.emit('socket_listener_connect',
                'Listener connected!');            
        });

    },
};
```

But if you do something like this on the server side of the **GameListener**, then you need to connect to two sockets in **GamerListener.Control.js** if we want to keep hearing on our own messages.

```
var socket = io.connect('http://192.168.2.11:30025');
socket.on('socket_is_connected', function(message) {
    $('#debug').html(message);
});

var socketLocal = io.connect('http://192.168.2.11:30026');
socketLocal.on('socket_listener_connect', function(message) {
    $('#debugListener').html(message);
});
```

Why don't you go ahead and do that so that you can see how it works.

![listen](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGVWRWTzF3eVBKYjQ)

In the above screenshot you can see that we are connected to both game server (DEBUG) and the our own server (Listen).

##Turn it in

Turn in your **GameListener** in a folder called **Week06_GameListener**. Turn in your upgraded game in a folder called **Week06_SocketGame**. It should, of course, now function as a socket server. Send me the URL of your repository when you submit your assignment.
