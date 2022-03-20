---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/NoSql/CouchDb.md
relativePath: elvenware/development/database/NoSql/CouchDb.md
title: CouchDb
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: CouchDb.md
fileNameHTML: CouchDb.html
---

<!-- toc -->
<!-- tocstop -->

CouchDb
=======

[CouchDb](http://couchdb.apache.org/ "CouchDb home page") is a NoSQL database based on JSON documents rather than records. We do not use SQL to query it. It uses key/value pairs rather than structured relational data. It is a web focused database that we query using HTTP.

This is nothing fundamentally different about the internal structure of a SQL database and a NoSQL database. Underneath, they both consist of B-Trees or similar data structures and a series of indexes. The difference is not in the internals, but in the way that you access the data. In many cases, the data itself is structured differently.

CouchDb is based on JSON. Instead of using structured data with clearly defined sizes for each bit of data that you store, CouchDb simply accepts JSON.

You can, and probably will, define indexes on your JSON data. You can also set up filters so that it is impossible to insert records that do not support a particular structure. For instance, you can set up filters that ensure that you cannot insert a record that does not contain a first name field, etc. You can define a wide variety of filters covering most of your needs.

You can use CouchDb to define [one to many and many to many](http://wiki.apache.org/couchdb/EntityRelationship)
relationships. You use a different syntax than you would use in a relational database, but the it is easy to learn. Creating a unique constraint is more difficult in CouchDb.

A key difference between NoSQL and SQL database can be summed up with the word "relaxed." When working in CouchDb, you don't have to obey the strict rules that are built into SQL databases. Sometimes, however, the rules in a relational database are useful. The trick is to choose the right tool for the right job.

CouchDb is a distributed database. This means you can scale up to work with big datasets or heavy demands by simply adding more machines or more processing power. CouchDb can transparently handle scaling across multiple machines, or you can define specifically how it should distribute your data. In most cases, the choice is up to you.

In general, use relational databases if you:

* Have many complex relationships between entities
* Are very focused on creating unique data
* Or have tightly structured data

On the other hand, use NoSQL if you:

* Have a relatively simple data structure not focused on creating unique records
* Have flexible data that might not follow a particular structure in all cases
* Or have the need to work with huge amounts of data that needs to be inserted quickly

This does not mean that you can't use NoSQL data to work with highly structured data, and vice versa. These are simply general guidelines.

## Install


There is a Windows and Linux install process. Each has its own quirks,
but neither is difficult. Below I have one section for each install:

- [CouchDb install on Windows](#couchdb-windows-install)
- [CouchDb install on Linux](#couchdb-linux-install)

## CouchDb for Windows {#couchdb-windows-install}

<http://apache.mirrors.pair.com/couchdb/binary/win/1.3.0/setup-couchdb-1.3.0_R15B03-1.exe>

CouchDb will probably be installed here:

C:\Program Files (x86)\Apache\CouchDB
C:\Program Files (x86)\Apache Software Foundation\CouchDB

CouchDb runs as a service, so use the Services panel to stop and start
it. You can control Windows services via the control panel:

	Control Panel\System and Security\Administrative Tools

The configuration file is likely stored here:

	C:\Program Files (x86)\Apache\CouchDB\etc\couchdb\default.ini
	C:\Program Files (x86)\Apache\CouchDB\etc\couchdb\local.ini

Apparently **default.ini** can be overwritten during an upgrade or install,
so you might want to edit **local.ini**.

For details, see this, which describes a hierarchy of configuration files:

	<http://docs.couchdb.org/en/latest/configuring.html>

Ultimately, you will probably have to know how to edit these files, as
your IP address will change as you log into various wireless networks.
Be sure to see up an Admin Account!

## CouchDb for Linux {#couchdb-linux-install}

For the Linux install this might work, but it will probably get you an reasonably up to date version:

```
sudo apt-get install couchdb
```

In Oct, 2016, this got me version 1.60 of CouchDb. The following got me 1.61 of CouchDb:

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:couchdb/stable
sudo apt-get update
```

Set the permissions:

```
sudo chown -R couchdb:couchdb /usr/bin/couchdb /etc/couchdb /usr/share/couchdb
sudo chmod -R 0770 /usr/bin/couchdb /etc/couchdb /usr/share/couchdb
sudo systemctl restart couchdb
```

Regardless of which method you used to install it, check if it worked:

```
curl localhost:5984
```


After the install you will probably want to start working off your server's IP, rather than off local host. This is especially true if you are running Linux on AWS, or running a "headless" (non-GUI) based installation of Linux.

For help configuring CouchDb on Linux, try running couch-config. The
linux config file is here:

	/etc/couchdb/default.ini
	/etc/couchdb/local.ini

Edit local.ini and restart couchdb to process the changes:

```
sudo nano /etc/couchdb/local.ini
```

Make this change:

```
bind_address=0.0.0.0
```

Then restart couchDb:

```
sudo systemctl restart couchdb
```

You can confirm the above by typing:

	couch-config --config-dir

Remember that local.ini will not be effected if you upgrade.

You want to find the **bind_address** and change it from **localhost** (127.0.0.1) to the IP address of your server.

On AWS, and possibly on your local Linux server, set the IP to 0.0.0.0 in local.ini:

```
[httpd]
port = 5984
bind_address = 0.0.0.0
```

The bind address by default is set to localhost (127.0.0.1). That is fine if you only access the database from your current server or using the tunnel technique described below. But if you want to access it from another machine with no tunnel, you can change it to 0.0.0.0. I have a feeling this might not be very secure, but you should not be using the document as a guide to setting up your release server. I'm just getting you up and running so you can do development in a relatively trusted environment.

Near the bottom of **local.ini** you can set the password for the administrator. The process is much the same as that described above. Look for the section called **[admins]** and set the **admin** password to something appropriate for you. I believe that it looks like this by default:

    [admins]
    ;admin = mysecretpassword

Since the semicolon is a comment in these kinds of files, change it to look like this:

    [admins]
    admin = unbreakable

You can use **nano** or **vim** or the editor of your choice to edit the
**ini** file. If you are trying to run curl on your AWS server to talk to CouchDb
after changing the IP address to 0.0.0.0 then you can just use localhost:

	curl http://localhost:5984

In your browser, you can use your AWS elastic ip. Don't forget to go to the EC2 console and open up port 5984
in the security group for your server.

You should probably also turn off the Admin Party in Futon for your AWS server. You are having an "Admin Party" because if you have not yet set up admin password, and thus enable anyone to get at your server. To set up the administrator account, just click on the link in the bottom right hand corner of Futon. Remember, you can reach Futon by appending **_utils** to the URL of your server. That might look something like this:

    http://54.XX.XX.XX:5984/_utils

Then assign a user name and password. In your server.js files, you will now
have to use an address like this:

    http://username:password@elasticip:5984

This is probably not very secure, as I believe your password will be sent
across the internet as clear text, so I would consider not picking a top
level password that you use for really important accounts. I think there is
way to turn on https for couchdb, and I will try to figure that out, as it
provides more security and should hide your password when it is sent.

After you edit the **local.ini** file, you should restart couchdb:

	sudo service couchdb stop
	sudo service couchdb start

Old Method:

	sudo /etc/init.d/couchdb stop
	sudo /etc/init.d/couchdb start



Test your work from the linux command line:

	curl http://192.168.2.19:5984/

If curl is not available or not your tool of choice, you can try it from a browser. That would probably be the preferred route to take on your Windows machine.

Logging in with HTTP Authentication
-----------------------------------

You can access CouchDb with a library called **[nano][nano]**. Do not confuse this library with the **nano** editor we use at he Linux command prompt. Here's how we normally log in with **nano**:

    var nano = require('nano')('http://192.168.2.21:5984');

Now let's log in as an adminstrator named **ccalvert** with an
unbreakable password of **foobar**:

    var nano = require('nano')('http://ccalvert:foobar@192.168.2.21:5984');

[nano]: https://github.com/dscape/nano

Error: Document Update Conflict
-------------------------------

When you first start with CouchDb, you are likely to get "Document
Update Conflict" errors when you try to insert data. This error
occurs when you try to do an insert and the document you are trying to
insert already exists. To update the document, you have to add a revision
number to your insert.

Revision numbers (\_rev) are clearly visible in Futon when you look at
existing database documents:

\_rev: "6-9a046bdac69072ed5075c3addfe015c8"

One way to perform an update is to do this:

* First perform a Get to see if the document already exists.
* If it does exist, get the \_rev and then do the insert with the rev
* If the document does not exist, do the insert without the rev

Here is the code for doing the above. The parameters here are the
Express response object, the JSON data you want to insert, and the name
you want to give your to document.

```
var sendToCouch = function(response, data, docName) {
    var prog = nano.db.use(dbName);
    prog.get(docName, function(error, existing) {
        if(!error) {
            console.log("Document exists. Doing Update.");
            data._rev = existing._rev;
            doInsert(response, data, docName);
        }  else {
            console.log("Document does not exist. Doing insert.");
            doInsert(response, data, docName);
        }
    });
}
```

The key line in the above code is this one, where we add the rev to
the document we are inserting if it is an update scenario:

	data.\_rev = existing.\_rev;

Here is the doInsert method:

```
var doInsert = function(response, data, docName) {'use strict';
    var prog = nano.db.use(dbName);
    prog.insert(data, docName, function(err, body) {
        console.log('In sendToCouch callback');
        if (!err) {
            response.send({
                "Result" : "Success"
            });
            return;
        } else {
            response.send(500, err);
            return;
        }
    });
};
```

For a working example, see [UnitTestCouchDb01](https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/UnitTestCouchDb01) in JsObjects.

Design Documents
----------------

Use [design documents][designDoc] to keep a list of your views. These are JSON documents tbat begin with an ID of **_design/**:

    "id": "\_design/myApp"

They contain a series of sections with names like **views**, **shows**, "\_attachments", "lib." An example is shown here:

- <http://guide.couchdb.org/draft/design.html#figure/1>

You can use **nano** to insert design documents.

[designDoc]: http://guide.couchdb.org/draft/design.html

CouchDb Online Resources
------------------------

More information:

- <http://couchdb.apache.org/>
- <http://wiki.apache.org/couchdb/>
- <http://wiki.apache.org/couchdb/Installing_on_Ubuntu>
- <http://guide.couchdb.org/editions/1/en/index.html>
- <http://guide.couchdb.org/>
- <http://kkovacs.eu/cassandra-vs-mongodb-vs-couchdb-vs-redis>

We will access the database via HTTP and use request:

<https://github.com/mikeal/request>

Getting started:

<http://guide.couchdb.org/draft/tour.html>

Once you have it installed on Windows, use the browser:

- <http://127.0.0.1:5984/>
- [futon](http://localhost:5984/_utils/)

We want to go to config.html, which is reachable from futon, and set
allow_jsonp to true. It is in the http section, about half way down the
page:

<http://localhost:5984/_utils/config.html>

## CouchDb Attachments

We often want to add attachments such as an HTML document or image file
to our CouchDb database.

- <https://github.com/dscape/nano#attachments-functions>
- <http://wiki.apache.org/couchdb/HTTP_Document_API#Attachments>

```javascript
app.get("/attachHtml", function(request, response) {'use strict';
   console.log('/attachHtml called');

   var fs = require('fs');

    fs.readFile(__dirname + '/Templates/Basic.html', function(err, data) {
        if (!err) {
            var prog = nano.db.use(dbName);
            prog.attachment.insert('basic', 'basic.html', data, 'text/html',
                function(err1, body) {
                if (!err1) {
                    console.log(body);
                } else {
                    console.log(err1);
                    response.send(500, err1);
                }
            });
        } else {
            console.log(err);
            response.send(500, err);
        }
    });
});
```

## Sending Back Express and Nano Errors

Send a 500 (Internal Server Error) HTTP Error code:

```
	function(err, body) {
        if (!err) {
            console.log(body);
            response.send(body);
        } else {
            var cscMessage = "No such record as: " + request.query.docName +
                ". Use a the Get Doc Names button to find " +
                "the name of an existing document."
            err.p282special = cscMessage;
        	response.send(500, err);
        }
    }
```

All that needs to be done is send the error code as the first parameter
to response.send:

	response.send(500, err);

Here is more information on HTTP code. As you can see, some are error
codes, some -- such as 200 -- signify success. Your code (and many other
tools) can decide what to do with an HTTP message depending on the
code that is send with it:



Note also that I am adding a special field onto the error message. This
allows me to send back custom error messages along with any details
generated by the Nano error message system.

One the client side we do this:

```javascript
	var create = function() {
        $.ajax({
            type : 'GET',
            url : '/create',
            dataType : 'json',
            success : function(data) {
                showDebug(data.Result);
            },
            error : showNanoError
        });
    };

    var showNanoError = function(request, ajaxOptions, thrownError) {
        var responseText = JSON.parse(request.responseText);
        if (typeof responseText.p282special !== 'undefined') {
            showDebug(responseText.p282special);
        }
        showDebug(responseText.message);
        showError(request, ajaxOptions, thrownError);
    };
```

Notice that I have create a special error handler for this kind of
message. By sending back a 500 HTTP Error Code we ensure that our
error handler will be called. The **showNanoError** has special
processing for Nano messages, then we pass the whole error onto our
regular Prog282 error handler. As you recall, it looks like this:

```javascript
var showError = function(request, ajaxOptions, thrownError) {
    showDebug("Error occurred: = " + ajaxOptions + " " + thrownError);
    showDebug(request.status);
    showDebug(request.statusText);
    showDebug(request.getAllResponseHeaders());
    showDebug(request.responseText);
};
```

Clear there are ways to streamline this process, but even if it is
overkill, it is nonetheless likely to give you good error support during
the development process.


Erica
-----

	<https://github.com/benoitc/erica>

Install erica:

	git clone git://github.com/benoitc/erica.git
	sudo apt-get install erlang

Or, if you want to get into erlang, do this:

	sudo apt-get install erlang erlang-doc

Then create something

	erica create-webapp
	cd myapp
	erica push http://192.168.2.18:5984/myapp

Create an app called bar:

	erica create-webapp appid=bar
	cd bar
	erica push http://192.168.2.18:5984/bar

A script to install Erica on Linux.

```bash
#!/bin/sh

sudo apt-get install erlang

GIT_DIR=~/git
ERICA_DIR=$GIT_DIR/erica

if [ ! -d "$GIT_DIR" ]; then
	/bin/mkdir $GIT_DIR
fi

if [ ! -d "$ERICA_DIR" ]; then
	cd $GIT_DIR
	git clone git://github.com/benoitc/erica.git
	cd erica
	make
	sudo make install
fi

# build an app
WORK_DIR=~/dev
APP_DIR=$WORK_DIR/goober1

if [ ! -d "$WORK_DIR" ]; then
	/bin/mkdir $WORK_DIR
fi

cd $WORK_DIR
if [ ! -d "$APP_DIR" ]; then
	mkdir $APP_DIR
	pwd
	cd $APP_DIR
	pwd
	erica create-webapp
	cd myapp
	erica push http://127.0.0.1:5984/myapp
fi
```

## CouchApp

To install on Linux:

	sudo apt-get install couchdb -y

Or, if you want to try the node version:

	npm install -g couchapp


- <http://couchapp.org/page/index>
- <http://couchapp.org/page/getting-started>
- <http://garden20.com/>

### Install CouchApp

Here is how to install CouchApp for use with **Node:**

    npm install -g couchapp

To install couchapp without Node:

- <http://sourceforge.net/projects/pywin32/>
- <https://github.com/couchapp/couchapp/downloads>

When you are done, make sure couchapp.bat or couchapp.exe is on your path. If you installed
via Python (rather than the totally stand alone option), this might mean
you do add something like this to your path

	c:\Python27\Scripts

It will be the scripts directory that holds you couchapp.bat file.

CouchApp Pages
--------------

http://couchapp.org/page/pages-install
https://github.com/couchapp/couchapp

ez_setup.py
distribute_setup.py
set VS90COMNTOOLS=%VS110COMNTOOLS%
python-2.7.5.msi
pywin32-218.win32-py2.7.exe
py2exe-0.6.9.win32-py2.7.exe

couchapp init  
couchapp push . http://localhost:5984/pages

## Tunnel

After the install, set up a tunnel like this. On your remote machine, type this but with your name and address at end:

	echo 'ssh -L5984:127.0.0.1:5984 charlie@192.168.2.27'

Now on the remote browser, put this in your browser address bar:

	localhost:5984

## Notes of Interest {#notes}

CouchDB is not as well documented or as popular as MongoDB or MySql. I like CouchDB for several reasons:

- It is such a pure JavaScript solution. We are writing JavaScript on the client, on the server, and in the views we define to run inside CouchDB.
- It uses HTTP and REST as its transport layer.
- It fully supports JSON
- I just plain like the feel of it. If I were talented enough to write a database, I feel like I would have at least seriously considered building something like CouchDB. I like the way it works. It feels both efficient and "cool" to me. I get an "Oh wow" feeling when using it.

I don't think either CouchDB or MongoDB are built in JavaScript. However, CouchDB views **are** written in JavaScript. We are using JavaScript to create the equivalent of SQL queries.

Here is an example of writing JavaScript with MongoDB that is certainly similar to what I like about writing JavaScript queries (views) in CouchDB:

- <https://docs.mongodb.com/manual/core/map-reduce/>

My understanding is that MongoDB uses a wire protocol usually built on TCP/IP as its default transport, while CouchDB uses REST and HTTP as its default transport layer:

- <https://docs.mongodb.com/manual/reference/mongodb-wire-protocol/>
- <https://wiki.apache.org/couchdb/HTTP_Document_API#Working_With_Documents_Over_HTTP>

## Links

- <http://wern-ancheta.com/blog/2015/04/26/getting-started-with-couchdb-in-node-dot-js/>
