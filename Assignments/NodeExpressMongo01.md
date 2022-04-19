---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/NodeExpressMongo01.md
relativePath: Assignments/NodeExpressMongo01.md
title: NodeExpressMongo01
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: NodeExpressMongo01.md
fileNameHTML: NodeExpressMongo01.html
---


<!-- toc -->
<!-- tocstop -->

Node, Express and MongoDb
================

We are going to continue work on our Information Manager. This
assignment will be mostly a skill building exercise. I hope to tie
this assignment and the previous assignment together next week.

There will be three primary steps in this assignment:

- Create a server side method that will automatically insert 250
auto-generated records into MongoDb
- Create a server side method that will retrieve the records, place
them in an array  from the
database and send them to the client.
- Create an HTML interface that will display any one record from the
array of records to the user. This is not a Cordova assignment. You can
do your work with HTML, CSS and JavaScript.


Passing a parameter from the client (the web broswer) to the server
is a bit tricky. As a result, in this assignment, I just want you to
return an array of all 250 records. Later, we can learn how to ask
for one of the records.

You should, however, provide an interface that lets the user ask for
any one record from the array of 250 that were returned. In particular,
you should display the first record from the array when it is returned,
then allow the user to enter a number between 1 and 250, and retrieve
one of the associated records. You need not do any range checking at
this point. I won't care if the app creates an error if the user enters
a number like -15 or 266.

I expect your interface to include:

- a place to show the selected record retrieved from the server. This
would probably be a series of paragraph tags, but other options will
be accepted.
- An input element where the user can enter the number of the item they
want to retreive.
- A button to press to activate the retrieval of the next item.

You will need to retrieve the array only once. This should occur
immediately after your application loads. Once the array is on the
client side, the user will be able to select any one item from the
array.

On the server side, you will have a default method that will return
HTML containing the interface for your application. It will be much
like the method we created in class, except this time, you will not
hardcode the HTML into Server.js. Instead, you will retrieve it from
a file kept on the server side:


	var fs = require('fs');

	var html = fs.readFileSync(\_\_dirname + '/Public/index.html');
	res.writeHeader(200, {"Content-Type": "text/html"});   
	res.write(html);
	res.end();

The complete example is in JsObjects:

- [Hello Express](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/HelloExpress)

I also provide an example called MongoTalk02 which gives you at least
a few hints as to how to get started with this application. Here is a
screenshot from the application:

![MongoTalk02](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/NodeExpressMongo01.png)

If you have not already done so, you need to run **MongoTalk**
before you run **MongoTalk02** so that at least some data will be in
MongoDb. In the screenshot shown above, you can see that MongoTalk02
retrieves the data that I created with **MongoTalk** during our class on
Tuesday, Feb 04. The data you created will likely be different.  For
this assignment, you will want to create a new collection and new
data, as explained below.

Screenshots
-----------

The screenshot shown below is probably not exactly the interface for
the program you want to turn in. However, it might be helpful to look
at it for a second.

![MongoTalk02](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/NodeExpressMongo02.png)

Notice the following from the above screen shot:

- The display of one record, including: firstName, lastName, address, etc.
- The input box (type="number") for entering the number of the record you want to view.
- The button to click to show the record.

Here is what the screen looks like after the user as requested to see the
second record:

![MongoTalk02](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/NodeExpressMongo03.png)

Finally, notice the array of five records displayed at the bottom of
the screen. This is not part of the assignment. In this case, I just
deleted all existing records from the **collection** and added only
five new ones. I had my program display these five records using a
technique illustrated in **MongoTalk02**. My goal was to provide a
screen shot for you that illustrats key elements of the interface I
want to see in your assignment. It also provides a few tips as to
what is happening behind the scenes. In particular, it shows the
loaded data looks like as it sits in memory.

Code to Delete Records
----------------------

The heart of your delete function might look something like this, though
your implementation may differ in various small details:

	var collection = database.collection('test_insert');
	collection.remove(function(err) {
		if (err) {
			throw err;
		}
		database.close();
	});


Example Code
------------

And here is the MongoTalk02 example that is shown in a previous screenshot:

- [MongoTalk02 in JsObjects](https://github.com/charliecalvert/JsObjects/tree/master/Data/MongoTalk02)

You might also find this example helpful:

- [SimpleReadWriteJson](https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/NodeCode/SimpleReadWriteJson/server.js)

**SimpleReadWriteJson** shows how to read and write a Json file. You will be
reading from a database, not a file. Also, you will not need to write
anything to the database at this stage. Still, the example is interesting,
particularly as it shows how to send back HTML, CSS and JavaScript to
the client.

Creating the Data
-----------------

It might make sense to create two scripts:

- One for populating and maintaing the database
- One that serves up data to the client

Or you could check to see if the database is populated, and if not,
to populate it. Or we could add a button to our client to populate
the database. For now, though, the two script idea is probably
simplest.

The method you write to insert data into the database should have
at least these two features:

- Write to a collection called **test_data**. Do not write to the **test_insert**
collection used in MongoTalk and MongoTalk02.
- Your data should look like sample address book data, with firstName,
lastName, address, city, state and zip fields.

Here is what the first record should look like:

	Rita10001 Hill10001
	10001 Ruby Street
	Bellevue, WA 98002

Here is what the second record should look like:

	Rita10002 Hill10002
	10002 Ruby Street
	Bellevue, WA 98002

And so on up to Rita10250. Remember, you should auto-generate these
records in some kind of loop.

This should be enough to get you started. More information coming
soon.

Turn it In
----------

You should submit your work by checking it into Git in a directory
called Week05-NodeExpressMongo.
