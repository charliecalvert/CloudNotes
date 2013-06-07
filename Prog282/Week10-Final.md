Week10-Final
============

- Track Individual Users, and store a record of them to file or to couchDb.
- Have the grid
- CouchDb
- Handlebars, Jade, Stylus
- You must provide a means for me to get your data into my copy of CouchDb.
- Unit Tests
- Switching from your game to another page for your unit tests, and then figuring out
how ot initialize the variables for you game so that you can test it.
- Storing images and HTML attachments in CouchDb.
- UpStart and AWS should have that.

Creating a Database
-------------------

You need to automate the process of creating a database and inserting 
data into it. Your database should have the following name:

	Prog282LastName

When you check in your code, please put this nano connection string in
your program so I don't have to edit it before connecting to your
database:

var nano = require('nano')('http://127.0.0.1:5984');

I should be able to go to the command prompt and run a single batch
file that will create the database and populate it with data. See the
section of this document entitled **Creating Data** to learn how to
do this. 

You ability to put data in CouchDb and use it in your main program is
perhaps the most important part of the test. To get a good 
grade on the final, you must demonstrate an ability to work with 
CouchDb. One of the most important parts of that process involves
inserting data into CouchDb, and reading it back out.

Creating Data
-------------

I have created three samples:

	JsObjects/Data/CouchUtils/CouchAttach01
	JsObjects/Data/CouchUtils/CouchDoc01
	JsObjects/Data/CouchUtils/CouchRead02
	
- CouchAttach01 shows how to place 10 HTML into a CouchDb Database by
running a single batch file. If the database used by the program 
does not exist it will be created automatically.
- CouchDoc01 shows how to put a number of JSON files of varying shapes
and sizes into CouchDb by running a single batch file. If the database
used by the program does not exist, it will be created automatically.
- CouchRead02 shows how to read back the JSON and HTML files inserted
by the above the documents.

At minimum, everyone should create their own version of the above and:

- Place five JSON documents into CouchDb Attach Example 
- Place five HTML files in CouchDb 
- Integrate CouchRead02 into their existing projects. The user 
should be able to select a single link inside your main program that 
will launch a separate (or embedded) page that allow them to view 
the content of all the files you insert into CouchDb.

Couchdb Guidelines
------------------

The most important part of the final involves inserting data into
CouchDb and reading it back out. The batch files described above
will be enough to satisfy the minimum requirements in terms of 
inserting data. However, those of you who need to demonstrate 
some proficiency in JavaScript, should also be able to update
CouchDb from the client side, as part of your program.

- Minimal: Insert with batch files, read from your main program. If you
go this route, you need to create a fair amount of relatively interesting
HTML in order to get a good grade. 
- Expert: Insert and read from your main program. You can use the
batch files to initialize your program, but you should also be
able to update or insert some data from your main program.

Creating HTML
-------------

Those of you with strong programming skills are expected to create
an interesting game that reads and writes to CouchDb and displays
HTML, producing at least one page that uses Jade.

Those of you are focusing on other skills besides JavaScript should
demonstrate two things:

* That you can read HTML files from CouchDb and display them to the 
user.

* That you can use either HandleBars or Jade to create relatively 
complex pages. For instance, you should use templating to create 
multiple pages that have the same look and feel. Your pages might 
share the same CSS page, and that might have the same header and footer. 
Use the templating engines to make this happen. You can focus on one 
templating engine, or demonstrate skills using both of them. Your 
pages should have some significant content on them. For instance, if 
your site is focused on Sailing, then you might show me pictures of 
sailboats and describe the boats you are showing. If you are focused on
outer space then tell me something about out space. Planets, or stars,
or galaxies. If you are focused on Zombies, tell me about Zombies.

Users and Sessions
------------------

The ability to uniquely identify a session is one of the most powerful
features of Express. The ideal implementation would do the following:

- The user signs in with openid
- You associate the user specified by the openid session with the
current session
- You place some kind of a token in a cookie so that you can validate
the user from the cookie without asking them to sign in again. In this
scenario, the program first checks for cookies, if it finds a cookie identifying
a known user who was already validated by openid, then they should be 
able to start playing the game immediately without having to fill in
the log in screen.

Admittedly, the above scenario will be high bar for many users. If that
is the case, you can simply create a cookie, and give me some way of 
showing that you are using it. 

If you are focusing primarily on creating some HTML pages, then
working with Cookies and Sessions is probably not something that you
want to focus on. Spend your time create a nice site built at least
in part of pages that you pull from CouchDb.


Cookies
-------

Your program should be able to create cookies, and save data to the
cookies. For instance, you could save the user name to your cookie.

Your program should provide some means of letting me see the content
of your cookies.

