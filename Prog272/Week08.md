Week  08 Day 01
===============



We will focus on

-   Node

-   Cloud 9

-   Markdown and Pandoc

-   AWS

Node
----

Many of you may have node installed already. A simple test to see if it is
installed:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
node --help
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you don't get an error message, then it is installed. If it is not installed,
then go here and install install it:

<http://nodejs.org/>

If you are on a school computer, and need help with the install, raise your hand
and get my attention.

Here is hello world node program:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('It works!\n');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here is another:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end('<p>It works</p>');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

And here is one more:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    var html = fs.readFileSync('index.html');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(html);
    response.end();
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Notice that this last program depends on the presence of a file called
index.html, where index.html can be any valid HTML file.

Here is how to get the server to specify the port:

var port = process.env.PORT || 3000;

So here is NODE example that uses express:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var express = require('express');
var app = express();
var fs = require('fs');

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    console.log("root request sent");
    var html = fs.readFileSync('public/index.html');
    res.writeHeader(200, {"Content-Type": "text/html"});   
    res.write(html);
    res.end();
});

app.get('/dirname', function(req, result) {
    result.send({'result': __dirname});
});

app.get('/port', function(request, result) {
    result.send({'result': port});
});

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log('Express server started on port %s', process.env.PORT);
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Cloud 9
-------

Cloud 9 is an online IDE. You can find it here:

[https://c9.io][1]

[1]: <https://c9.io/>

On your account page, you can link to your GitHub account.

Installing NPM modules:

<https://docs.c9.io/installing_npm_modules.html>

Markdown
--------

Markdown allows you to write a simple syntax defining a file. The markdown file
can be read on its own, or converted to:

-   HTML

-   WikiMedia

-   PDF

-   Word

-   etc

The point is to have one source file that can be used in multiple places.
Perhaps more importantly, it ensures that we don't get locked into any one
technology.

We use a slightly expanded syntax for markdown that can be compiled with Pandoc.
You can install it from here:

<http://johnmacfarlane.net/pandoc/installing.html>

The drawback is that it has only a limited number of things it can handle:

-   Headings

-   Plain text (Paragraphs)

-   Lists

-   Figures (images)

-   Tables

-   A few other simple items.

Read the documentation here:

<http://johnmacfarlane.net/pandoc/README.html#pandocs-markdown>

You will also want to read this, of which the above is subset:

<http://johnmacfarlane.net/pandoc/README.html>

Pandoc
------

If Pandoc is hard for you to install, instead use Dillinger:

<http://dillinger.io/>

Use this with NPPExec in NotePad++. it will convert the markdown file currently
in the editor to standalone HTML file with the same root name. For instance, it
will convert *foo.md* to*foo.html*.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"C:\Program Files (x86)\Pandoc\bin\pandoc.exe" -s -t html5 -o $(CURRENT_DIRECTORY)\$(NAME_PART).html "$(FULL_CURRENT_PATH)" 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It means:

-   Run Pandoc: "C:Files (x86).exe"

-   Create an standalone HTML5 file: -s -t html5

-   Put the output here: \$(CURRENT_DIRECTORY)\$(NAME_PART).html

-   Convert contents of file in the NPP editor: "\$(FULL_CURRENT_PATH)"

AWS
---

You can find out about AWS here:

<http://www.elvenware.com/charlie/development/cloud/WebServices.html>

We will be focusing on EC2, the the following is the most important part for
most of us:

<http://www.elvenware.com/charlie/development/cloud/WebServices.html#ec2Install>



Day 02
======

Live Headers
------------

-   Open FireFox

-   Open Add on Manager

-   Search for Live HTTP Headers

-   Click install button

-   Restart browser

-   Then either:

    -   Ctrl-Shift-L

-   or

    -   Options | Menubar

    -   View | Sidebar | Live Http Headers

"C:Files (x86).exe" -t html5 -o \$(CURRENT_DIRECTORY)\\\$(NAME_PART).html
"\$(FULL_CURRENT_PATH)"

Understanding package.json
--------------------------

Many projects have dependencies on libraries such as Express or Jade. When you
place it in GitHub, or share with others, it is usually convienent to store your
project with the libraries it uses because the libraries tend to be big and
bulky. The ideal situation would be to ship your source code, and then leave a
reference to the libraries it needs. The user can then install the libraries as
needed, rather than downloading them with the source. Fortunately, there is an
automated way to separate your source from their libraries. In particular you
can include a file called **package.json** with your project. In that file you
can define the dependencies for your project. The Node Package Manager (npm) can
read this file and automatically download the needed libraries.

You can use the JSON shown in this file to define the dependencies for your
project. Here is a typical example:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
    "name": "expressSend",
    "description": "Work with express and sending information",
    "version": "0.0.1",
    "private": true,
    "dependencies": {
        "express": "3.1"
    }
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A file like this should usually be called **package.json**. To use the file,
just type the following:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm install
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the case of the file shown above, this command will install express version
3.1.

**Note**: *You can learn the version of number of the most recent release of
express by typing the following*:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
npm info express version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Setting up the Port
-------------------

Let's allways use the following:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var port = process.env.PORT || 30025;

// Code omitted here...

app.listen(port);
console.log('Listening on port :' + port);  
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We want to pick a particular port because in some situations, such as running on
EC2, we need to open the port ahead of time. By choosing one port, and always
using it, you won't have to edit my code before you can run it, and vice versa.

Node Express Basics
-------------------

Express offers support for HTTP verbs such as Get, Post, Put, etc.

The verbs provide a response to specific routes, such as '/':

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/', function(req, res) {
    console.log("root request sent");
});
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Or here is request that uses a wildcards or regular expressions:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/a*', function(req, res) {
    console.log("A request sent that begins with an a");
});
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Working with numbers:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/book/:id((d+)', function(req, res) {
    console.log("Only requests that are numbers");
});
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Node Express Serving up Static Pages
------------------------------------

Put your static files in a particular directory and tell express about the
directory:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use("/public", express.static(__dirname + '/public'));
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Server them up like this:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get('/', function(req, res) {
    var html = fs.readFileSync('public/index.html');
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.end(html);
});
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

<http://www.senchalabs.org/connect/static.html>


