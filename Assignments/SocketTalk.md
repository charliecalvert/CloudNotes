---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/SocketTalk.md
relativePath: Assignments/SocketTalk.md
title: SocketTalk
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: SocketTalk.md
fileNameHTML: SocketTalk.html
---


<!-- toc -->
<!-- tocstop -->

# Socket Talk

Let's create a simple chat application.

## Create App.js

This is the most stripped down Express server I could create and still support the tools we need to create a socket application with a reasonable architecture:

```
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('connection called');    
    socket.on('chatMessage', function(msg){
        console.log('Chat socket message: ', msg);        
        if (msg === "") {
            msg="Empty message sent.";
        }
        io.sockets.emit('chatMessage', msg);
    });
});

http.listen(30025, function(){
  console.log('listening on *:30025');
});
```

Notice this line:

	app.use(express.static(path.join(__dirname, 'public')));

It gives us the ability to serve pages out of a directory called **public**. This folder is a subdirectory of the project root. If the project is in **/src** then public is in **/src/public**.

## Control.js

We need code to accept 
```
socket = io('localhost');
socket.on('chatMessage', function(msg){
     $('#info').prepend($('<li>').text(msg));
});
```

And here is how we send messages:

	socket.emit('chatMessage', $('#myInput').val());

## The HTML

I'm placing both the HTML and app.js in the root. Here is the HTML:

```
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <link href="css/Style.css" rel="stylesheet" type="text/css">
    <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>
    <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
    <script src="Control.js"></script>
  </head>
  <body>
    
    <div class="data">
        <input id="myInput" autocomplete="off" />
        <button id="chatButton">Chat</button>
    </div>

    <div id='messageDiv'>
        <ul id="info">
            <li>Start</li>
        </ul>
    </div>   

  </body>
</html>
```

## The CSS

I put the CSS in a file called Styles.css and placed it in the **public/css** folder. It looks like this:

```

* { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
}

body { 
    font: 21px sans; 
}

.data { 
    background: #ABA; 
    padding: 3px; 
    width: 100%; 
    border-radius: 12px;
}

.data input { 
    border: 0;    
    padding: 10px; 
    padding-top: 12px; 
    width: 90%; 
    margin-right: .5%; 
    margin-left: .5%; 
}

#chatButton { 
    width: 8.1%; 
    background: #787; 
    border: none; 
    padding: 5px; 
    color: white;
    font: 21px sans; 
}

#messageDiv {
    background-color: #bdb;
    border-radius: 12px;
}

#info { 
    list-style-type: none; 
    margin: 0; 
    padding: 1;
}
    
#info li { 
    border-radius: 12px;
    padding: 5px 10px; 
}
    
#info li:nth-child(odd) { 
    background: #bcb; 
} 
```

## Turn it In

Create a Control.js file that works.

It should look something like this:

![look](https://drive.google.com/uc?export=view&id=0B25UTAlOfPRGMDM3T3lCUkg0Z00) 

We will also integrate chat into the final. At this stage, enter text can be only done in the GameListener.