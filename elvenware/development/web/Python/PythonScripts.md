---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/PythonScripts.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python
fileName: PythonScripts.md
relativePath: /web/Python/PythonScripts.md
title: PythonScripts
directoryName: Python
category : cssguide-guide
---

Python CGI Basics
=================

CGI Basics {#basics}
----------

CGI is a technology that allows web based applications to execute code
on the server side. On the client side, most browsers allow developers
to execute JavaScript code. The complementary technology on the server
side is called CGI. JavaScript executes code in the browser, CGI
executes code on the server.

A web server such as Apache or IIS can execute a script or a program.
Frequently the entity that is executed is a script written in Python,
Ruby, PHP or Perl. Many CGI programs are also written in Java, .NET or
even C++. CGI is a generic term for all these different scripts and
programs that execute on the server.

If a client program needs static HTML or XML, then it can simply asks
the web server for a particular page. However, sometimes the content
that is to be displayed cannot be easily stored in a static HTML or XML
file. A classic example would be a request for a page that contains some
static HTML combined with some data that is stored in a database, XML
file, or CSV file. For instance, there might be a page with some static
HTML that reads "Here are the Presidents of the United States:". The
actual list of Presidents, however, is stored not in the HTML file, but
in a database, an XML file, or a CSV file. In those cases, a program
needs to be run that can query the XML file, CSV file or database and
insert data from those sources into the HTML file, and then return that
file to the web server, which will in turn pass it on to the client. In
other words, the web server is requestings that a CGI program execute
code that produces HTML that the web server will in turn pass back to
the browser.

CGI is a generic term for all the differernt scripts or executables that
a web server can call to execute code that produces HTML or XML to be
served up to the client. This concept can be hard for new comers to
grasp because it consists of multiple steps that occur in to very
different locations. One set of code executes in a browser on the
client, another set of code executes on a server. Here are the key steps
involved:

1.  On the client side a web browser such as IE, Chrome, Firefox, etc
    makes a request by sending a URL across the Internet to machine that
    can serve up the requested data
2.  When the request reaches the machine it is passed onto a piece of
    software called a web server. The machine is typically listening on
    port 80 and the web server software is typically Apache or IIS.
3.  If the request is for an HTML (MyFile.html) or XML (MyFile.xml)
    file, then the web server simply GETs the file and returns it across
    the Internet to the web browser. Both the request and the returned
    file are transported across the Internet using the HTTP protocol
    running on top of a TCP/IP stack.
4.  If the request from the browser is for a CGI file (MyFile.py,
    MyFile.php), then the web server turns the request over to a script
    engine such as Python or PHP.
5.  The script engine then executes the code it received from the web
    server. This step may involve a request to read data from the file
    system or a database, or to perform any of a wide variety of tasks
    which the scripting language can handle.
6.  If all goes well, the script returns valid HTML or XML to the web
    server, which serves it up using the HTTP protocol, and thus passes
    it back to the web browser. It may return only an HTML or XML file.
    In some cases, the HTML file it returns will reference CSS and
    JavaScript files, in which case they will also be sent back to the
    browser.
7.  The browser processes any HTML, XML, HTML, CSS and JavaScript
    returned by the server and displays the data to the user.

![Data flows from the browser to the server and
back](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/Cgi01.png){.leaveAlone}

**Figure 01:** On the client the browser sends requests and  processes
the HTML, CSS and JavaScript that is returned from the server.

This cycle is going constantly all over the web. We go from:

1.  browser
2.  to a machine at an ip address (requires trek across Internet)
3.  to web server
4.  to script engine
5.  to database or file system
6.  back to the web server
7.  back to the browser (requires trek across Internet)

We tend to think of HTML as a series of pages sitting on a hard drive on
some server. But in fact, this is frequently not the case. Instead, a
CGI script or program is executed on the server that generates the HTML
which is passed back to the server. CGI is a blanket term for all the
different technologies that execute on the server side and perform some
task which generally also involves sending HTML or XML back to the
client.

Most CGI programs are (by convention) served up from a folder called
cgi-bin or one of its sub-directories. However, some scripting
languages, most notably PHP, typically do not use a cgi-bin folder, and
are instead spread across the same file hierarchy where HTML files are
stored.    

Python Syntax {#syntax}
-------------

When reading the code found in this section, remember that indentation
matters in Python.

Remember that each script should begin with a link to the compiler. On
Windows, this is not always necessary, but on Linux, you should always
start with:

``` {.code}
#!/usr/bin/python
```

On Linux, also remember:

-   Include Unix line endings not Windows or Mac
-   Make the script executable: **chmod +x MyFile.py**
-   Look at the log files to check for errors.
    (/var/log/apache2/error.log)

File Permissions on Linux {#filePermissions}
-------------------------

To set the file permissions I use **chmod** and **chown**:

``` {.code}
sudo chmod +x fileName
sudo chown root:root fileName
```

My files in /var/www typically have root as the owner and myself or a
group to which I belong as the group:

``` {.code}
sudo chown -R root:charlie /var/www/*
```

The files in those filders ought to have read and write for the owner
and group and read for the others.

``` {.code}
find /var/www/ -type f -print0 | xargs -0 sudo chmod 664
```

If your Python script is called bar.py, then the following command will
give read and write to root and charlie, and read and execute to the
others. I'll show first how to do it for one file, and then how to do it
for all files in /usr/lib/cgi-bin:

``` {.code}
sudo chmod 665 bar.py
find /usr/lib/cgi-bin/*.py -type f -print0 | xargs -0 sudo chmod 665
```

If you have files that need to be written to by the user, make sure they
are not executable:

``` {.code}
find /usr/lib/cgi-bin/*.csv -type f -print0 | xargs -0 sudo chmod 666 
```

Here is a description of what the numbers in the chmod command mean:

Description
Abbreviation
Code
Execute
x
1
Write
w
2
Read
r
4
Read and Execute
rx
5
Read and Write
rw
6
Read, Write & Execute
rwx
7
In viewing the above table, you can see that you really only need to
memorize Execute, Write and Read, and the other three are derived from
those.

If you then type **ls -la** and hit **Enter** you should see something
like this for the permissions:

``` {.code}
-rwxr-xr-x 1 root root 18 2012-04-26 16:37 bar.py
```

And here is where they are located:

Name
Location
owner
-rwx------
group
----rwx---
other
-------rwx
If root is not the owner of the file you can change the ownership with
chown:

``` {.code}
sudo chown charlie:charlie bar.py
```

The above command makes the user charlie (who must already exist, so use
your user name instead) the owner of the file:

``` {.code}
-rwxr-xr-x 1 charlie charlie 18 2012-04-26 16:37 bar.py
```

To make root the owner:

``` {.code}
sudo chown root:root bar.py
```

And then ls -la yields:

``` {.code}
-rwxr-xr-x 1 root root 18 2012-04-26 16:37 bar.pyr.py
```

When you are done, you can also use stat to see file permissions:

``` {.code}
charlie@MintBox /usr/lib/cgi-bin $ stat -c "%A %a %n" *.txt
-rw------- 600 debug01.txt
-rw------- 600 debug.txt
-rw------- 600 states.txt
```

If you run the GUI application called Nautilus, which is the File
Manager, then you should be able to right click on files and choose
permissions to see this. To run it in Admin mode, start it from the
command line with sudo:

``` {.code}
sudo nautilus
```

[![Nautilus on
Linux](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/Nautilus01Small.png)(https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/Nautilus01.png)

**Figure 02: Using the Nautilus File Manager on Linux. Click to
expand.**

[![Nautilus properties view](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/Nautilus02Small.png){.auto-style1
width="500" height="393"}](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/Nautilus02.png)

Figure 02: Click to expand.

Here is a good system for file permissions on Linux:

-   <http://serverfault.com/questions/6895/whats-the-best-way-of-handling-permissions-for-apache2s-user-www-data-in-var>

You might also be interested in this very nice option for creating per
user web directories:

-   <http://httpd.apache.org/docs/2.0/howto/public_html.html>

Line Endings: Unix vs Windows vs Mac {#lineEndings}
------------------------------------

If you are writing a Python script to run on Linux, you should think
about line endings? On Linux, you want Unix line endings (LF) and not
Windows Line Endings (CRLF), or at least it is best to have the Unix
style line endings.

In NotePad++:

-   View | Show Symbol | Show Line Ending
-   Edit | EOL Conversion | Unix

If you don't have NotePad++ handy, then Python usually comes with
scripts for handling these issues. Look in
[C:\\Python27\\Tools\\Scripts\\](file:///C:/Python27/Tools/Scripts/) or
some similar folder on your installation for **crlf.py** and
**lfcr.py**.

On Linux, the **fromdos** utility can convert DOS line endings to Unix
style endings:

``` {.code}
sudo apt-get install tofrodos
```

Then you can convert from Windows to Linux like this:

``` {.code}
fromdos -d MyFile.html
```

If you want to iterate through a folder called **website** and convert
all the files in it from Windows to Unix style, issue a command like
this:

``` {.code}
find website -type f -print0 | xargs -0 fromdos -d
```

The command **finds** all the files in the website directory and passes
their names to the **fromdos** utility so the contents of the files will
be converted from dos to unix style line endings. Here is a more details
examination of the command. The code calls the Linux **find** command,
and passes in:

-   The name of the folder that contains the files you want to convert
    (website)
-   The type of files you want to convert: **-type f** means you want to
    convert regular files.
-   Asks that find command print the files that it **find** in a
    standard format that can be passed to another program: -**print0**
-   The bar symbol (|) tells the system that the results of the **find**
    command should be passed to another program
-   **xargs** takes the arguments passed by the find command passes
    them, one at a time, to the fromdos utility. The -0 argument tells
    **xargs** to resolve issues like spaces and other anomalies in the
    file names.

Here is an editor you can use on Linux to view and change line endings:

-   <http://www.geany.org/>
-   Choose **View | Editor | Show Line Endings**
-   Easy to download from the Ubuntu download center.

Here is a link to a script that you could use to copy a site from your
home directory to your web site:

-   [Copy files to /var/www and
    /usr/lib/cgi-bin](../Server/Apache.html#setup)

Example Script on Windows {#examples}
-------------------------

Here is a complete Python Script:

    #!/usr/bin/python
    print "My first Python script"

If you saved this script as a text file called **MyScript.py** and
installed Python in your C:\\Python27 folder, then you could run this
script by opening a command window in the folder where you saved the
script and typing:

``` {.code}
c:\Python27\Python.exe MyScript.py
```

If you added Python to your path, you could just type **python
MyScript.py.** 

A Simple Example on Linux {#exampleLinux}
-------------------------

On Linux, a file must have special permissions before the OS will allow
it to be executed. This is a security precaution to keep people from
writing script in a text file, and executing it in order to wreak havoc
with the system. In other words, there has to be a way to let users
write text files, and yet still ensure that they cannot execute
arbitrary commands that would compromise the system. The solution is to
let them create files that can be written and read, but not executed.

To give a file executable permissions, Issue the following command,
where myfile.py is the name of your script:

    sudo chmod +x myfile.py

When you have done this, you will see X's in the listing for a file.
Suppose you have a very simple Python file that looks like this:

    #!/usr/bin/python
    print "hello from Python"

Here are the commands you would use to first check the original
permissions, then change the permissions, the see the change, then run
the file.

First, check the original permissions:

    charlie@NorthSea:~$ ls -la myfile.py
    -rw-rw-r-- 1 charlie charlie 45 Nov 4 22:34 myfile.py

As you can see by looking at the beginning of the listing, this file
does not have executable permissions: **-rw-rw-r--**

Now let's make the script executable:

    charlie@NorthSea:~$ chmod +x myfile.py

Because this is Linux, the command succeeds silently, with no comment.
So let's check our work:

    charlie@NorthSea:~$ ls -la myfile.py
    -rwxrwxr-x 1 charlie charlie 45 Nov 4 22:34 myfile.py

Now we can see by looking at the permissions at the start of the file
that it is
executable:[ ]{.Apple-converted-space}**-rwxrwxr-x.[ ]{.Apple-converted-space}**All
you need to note are the x's. The r's mean it can be read, and the w's
mean it can be written. The letters are repeated three times, once for
the owner (**rwx)**, once for the group to which the file belongs
(**rwx)**, and once for everyone else (**r-x)**. As you can see, the
owner and the group can read, write and execute the file, while everyone
else can read and execute it, but not change it.

Finally, let's run the file:

    charlie@NorthSea:~$ ./myfile.py
    hello from Python
    charlie@NorthSea:~$

As you can see, the file prints out the words "hello from Python" and
then terminates.  

Python and HTML {#pythonHtml}
---------------

Here is a script for generating HTML from

``` {.code}
#!/usr/bin/python

print "Content-type: text/html\n"

print """
<html>

<head>
  <title>Prog 282 Basics</title>
  <meta name='viewport' content='width=device-width,minimum-scale=1.0,maximum-scale=1.0' />
</head>

<body>

  <h3>Python Script</h3>
  <p>This file generated by a simple Python script.

</body>
</html>
"""
```

Click this link to run the script:

[/cgi-bin/Test00.py](/cgi-bin/Test00.py)

You may find it useful to right click and choose "View source" to see
the HTML code generated by the script.

Here is another simple HTML script:

``` {.code}
#!/usr/bin/python

import time
import cgitb
cgitb.enable()

print "Content-type: text/html"
print
print "<html>"
print "<head>"
print "<title>Elvenware.com: What is the Time? Example</title>"
print "</head>"
print "<body>"
print "<h2>Elvenware.net What is the Time? Example:</h2>"
print "<p>Elvenware thinks that it is: %s</p>" % time.ctime()
print "</body>"
print "</html>"
```

Python and XML {#pythonXml}
--------------

Here is an example script called **SimpleXml.py** for creating XML with
Python:

``` {.code}
#!/usr/bin/python

import cgi
import cgitb
cgitb.enable()

print "Content-type: text/xml"
print
print "<?xml version='1.0'?>"
print "<names>"
print "\t<name>"
print "\t\t<first>Alpha</first>"
print "\t\t<last>Delta</last>"
print "\t</name>"
print "\t<name>"
print "\t\t<first>Bravo</first>"
print "\t\t<last>Omega</last>"
print "\t</name>"
print "</names>"
```

Here is an example script for creating XML with Python and MySQL.

``` {.code}
#!/usr/bin/python
import MySQLdb;
import cgi

print "Content-type: text/xml"
print
print ""
print ""
db = MySQLdb.connect(host="localhost", user="charlie", passwd="bar", db="charlie")
cursor = db.cursor()
cursor.execute("select first, last from presidents")
rows = cursor.fetchall()
for row in rows:
   print "\t<president>"
   print "\t\t<first>%s</first>" % (row[0])
   print "\t\t<last>%s</last>" % (row[1])
   print "\t</president>"
print "</presidents>"
```

We write this line to import a the CGI library into a Python module:

``` {.code}
import cgi
```

If you want to see the code for this library on a typical windows
machine, you can open this module in a text editor like notepad++

-   X:\\Python27\\Lib\\cgi.py

You can also find it here:

-   <http://svn.python.org/projects/python/branches/release27-maint/Lib/cgi.py>
-   <http://svn.python.org/projects/python/branches/py3k/Lib/cgi.py>

If you are interested, go ahead and open one of these copies up, so you
can see how it looks.\
\
In practice, this module is a library -- a library of routines and
classes for performing CGI operations in Python. If you look through the
file to about line 353, you will find the beginning of the
**FieldStorage** class, including some helpful documentation.\
\
It is important to remember that this is open source software, so we can
see the actual source code. This code, and the comments in the source,
can be very useful. It is also a great way to learn the proper way to
write Python code. Here is lots of Python code written by experts, ready
for us to examine.\

Python and CGI Posts {#pythonCgi}
--------------------

There are two primary types of HTTP actions:

-   GET
-   POST

A GET merely retrieves an HTML or other file from a server. A POST
provides a means of passing data to the script.

When you POST data to a CGI file, then you are passing parameters to the
script running on your server. The server parses the parameters and
performs actions based on those parameters. This is much like passing a
arguments to a method, or passing arguments to an application.

There are many ways to POST data from the client side. One of the
simplest conceptually is to write the path to the script, then a
question mark, then one or more parameter key/value pairs separated by
ampersands. It looks like this:

``` {.code}
http://www.elvenware.com/cgi-bin/some_script.py?param1=25&param2=12
```

Let's take a moment to break down the URL shown above. If first calls
the script named **some\_script.py:**

``` {.code}
http://www.elvenware.com/cgi-bin/some_script.py
```

Then it adds a question mark to signal that it wants to pass in
arguments:

``` {.code}
http://www.elvenware.com/cgi-bin/some_script.py?
```

The first argument is called param1 and it is set equal to the value 25:

``` {.code}
http://www.elvenware.com/cgi-bin/some_script.py?param1=25
```

The second argument is announced by the presence of an ampersand (&) and
is set equal to 12:

``` {.code}
http://www.elvenware.com/cgi-bin/some_script.py?param1=25&param2=12 
```

To parse and use the parameters on the server side script write Python
code like this:

``` {.code}
import cgi;
import cgitb
cgitb.enable()

def main():
    form = cgi.FieldStorage()
    if (form.has_key("param1") and form.has_key("param2")):
        display_data(form["param1"].value, form["param2"].value)
    else:
        generate_error_form()
```

Take a moment to understand what is happening here. First we add three
imports:

-   import cgi - Tools to handle a parameters passed in during CGI Post.
    See the URL discussed above.
-   import cgitb - Tools post debug data to the browser if there is
    error
-   cgitb.enable - Turn on the debug tools found in cgitb

Next we declare a method called **main:**

``` {.code}
def main():
```

The main method begins by retrieving an object that will capture that
paramters passed to this script:

``` {.code}
form = cgi.FieldStorage()
```

This code captures the parameters passed to the script by the URL
described above. It then turns them into fields, as in the **fields** of
an object. After this call, you have access to param1 and param2, which
were the parameters passed to this script by this URL:

``` {.code}
http://www.elvenware.com/cgi-bin/some_script.py?param1=25&param2=12 
```

The next line in the main method is error checking code that confirms
that we have actually received parameters 1 and 2:

``` {.code}
if (form.has_key("param1") and form.has_key("param2"):
```

If we actually have the parameters, then we use them:

``` {.code}
display_data(form["param1"].value, form["param2"].value)
```

It is crucial that you understand that code like that shown here can be
used to capture the parameters passed to Python script by a CGI Post.
Take a moment to make sure it all makes sense:

-   import cgi - Get the library used to retrieve the parameters passed
    to our script
-   form = cgi.FieldStorage - Use the library to capture the parameters
-   if (form.has\_key("param1")): - Test to see if the parameters
    actually reached the script

The complete script:

``` {.code}
#!/usr/bin/python

import cgi;
import cgitb
cgitb.enable()

def print_header():
    print """Content-type: text/html\n
    <!DOCTYPE html>
    <html>
    <body>"""

def print_close():
    print """</body>
    </html>"""

def display_data(param1, param2):
    print_header()
    print "<p>Param1 = " + param1 + "</p>"
    print "<p>Param2 = " + param2 + "</p>"
    print_close()

def display_error():
    print_header()
    print "<p>An Error occurred parsing the parameters passed to this script.</p>"
    print "<p>Try something like:</p>"
    print "<p><strong>http://localhost/SimpleCgi.py?param1=1&param2=2</strong></p>"
    print_close()

def main():
    form = cgi.FieldStorage()
    if (form.has_key("param1") and form.has_key("param2")):
        display_data(form["param1"].value, form["param2"].value)
    else:
        display_error()

main()
```

[![Simple
CGI](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/SimpleCgi01Small.png)](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/SimpleCgi01.png)

**Figure0X: A successful call to the Python script.**

![A failed call to Simple CGI](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/SimpleCgi02.png)

**Figure0X: Passing in the wrong parameters or no parameters results in
an error message**

Try it yourself:

-   <http://www.elvenware.com/cgi-bin/SimpleCgi.py?param1=25&param2=12>

Basic Trouble Shooting {#troubleShoot}
----------------------

 Whenever your get an Internal Server or error or any other error that
does not clearly specify a problem, check the logs. In some cases you
will have to sudo this command or be an admin to view the error logs:

``` {.code}
cat /var/log/apache2/error.log
```

Check permissions on your files. In some cases you may need to be an
admin (or sign in as ubuntu on EC2) to **chown** or use **chmod**. In
particular, if you want to chown to www-data as shown below, you will
probably need to be an admin. (On EC2, ubuntu is an admin by default.)

If you are using /usr/lib/cgi-bin then do this:

``` {.code}
sudo chown root:www-data /usr/lib/cgi-bin/*.py
sudo chown root:www-data /usr/lib/cgi-bin/*.txt
sudo chmod 650 /usr/lib/cgi-bin/*.py
sudo chmod 664 /usr/lib/cgi-bin/*.txt
```

If you are in a user dir, then do this:

``` {.code}
sudo chown YourUserName:www-data /home/YourUserName/public_html/cgi-bin/*.py
sudo chown YourUserName:www-data /home/YourUserName/public_html/cgi-bin/*.txt
chmod 650 /home/$USER/public_html/cgi-bin/*.py
chmod 664 /home/$USER/public_html/cgi-bin/*.txt
```

 Check your user name, database name, host and password in all instances
where they are used in Python or PHP files

-   You can sometimes get an overview like this: grep passwd
    /home/\$USER/public\_html/cgi-bin/\*.py

3\) Make sure that your JavaScript files contain the right path to your
cgi-bin directory.

-   If your Python files are in /usr/lib/cgi-bin then always use
    /cgi-bin/MyFile.py
-   If your JavaScript and HTML are in public\_html and your Python file
    is in public\_html/cgi-bin then always use cgi-bin/MyFile.py
-   If you JavaScript and HTML are in public\_html/SomeFolder and your
    Python file is in public\_html/cgi-bin, then always use
    ../cgi-bin/MyFile.py

CGI Traceback with cgitbg {#cgitb}
-------------------------

The [CGI Traceback manager](http://docs.python.org/library/cgitb.html)
can help you debug Python scripts. You can get nice debug output in your
browser if you place this code near the top of your files:

``` {.code}
import cgitb
cgitb.enable()
```

Here for instance, is the kind of error you get with cgitb if you try to
open a file that does not exist:

![cgitb error for a file that does not
exist](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/cgitb01Small.png){.leaveAlone}

**Figure 0x: cgitb error for a file that does not exist**

Note that we see:

-   The kind of error: IOError
-   The version and location of the Python executable that was invoked:
    2.7.2
-   And the specific line of code that caused the problem is highlighted

There is, however, a problem you can have when using cgitb. Sometimes
you will create your own header for the XML or HTML that you want to
return:

``` {.code}
print "Content-Type: text/xml\n"
```

If you write code like this (and unfortunately I have done this quite a
bit) then cgitb is unable to report an error properly, because it is
sending a header and you are sending a header, and the browser gets
confused, and gives you an unreadable error:

![Bad cgitb error](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/cgitb02Small.png){.leaveAlone}

In this situation, cgitb is worse than useless, because we are seeing
not only an error message, but also the massive chunk of now defunct
html generated by cgitb. To fix this kind of problem, compose a string,
and then output it at the very end of your method:

``` {.code}
def readStatesData2():
  output = "Content-type: text/xml\n\n"
  output += "<?xml version='1.0'?>\n"
  output += "<states>\n"
  f = open("jason/bara.txt", "r")
  for line in f:
    // code omitted here
    output += "</states>\n"
  f.close()
  print output
```

An alternative solution is to write the output to a log file:

``` {.code}
import cgitb
cgitb.enable(logdir=os.path.join(
            os.path.dirname(__file__), 'LOGS'),
            display=False, format='html',)
```

The output in your browser may or may not be easy to read if you use
this option, but the error messages saved as an html file to your LOG
directory should be easy to read if loaded into a browser with a double
click or some similar option. Not the that directory LOGS should already
exist, which means you will probably need to manually create it by hand.
In the code shown here, LOGS should be a subdirectory of the directory
where the Python script is published.

-   [Useful information on
    cgitb](http://www.doughellmann.com/PyMOTW/cgitb/)

More on Posting CGI Data {#moreCgi}
------------------------

As mentioned above, there are many ways to post data to a script. Above,
we described how to write a URL that POSTS the data. As you recall, the
URL looked like this:

http://www.elvenware.com/cgi-bin/some\_script.py?**param1**=25&**param2**=12

This URL call some\_script.py and passes to parameters called param1 and
param2 to it. But that is not the only way to call the script and pass
it parameters. For instance, we frequently use HTML forms to POST data
to a script:

``` {.code}
<!DOCTYPE html>
<html>
<head>
    <title>Call SimpleCgi.py</title>
    <link href="index.css" rel="stylesheet" type="text/css" />
</head>
<body>
<form action="/cgi-bin/SimpleCgi.py" method="POST">

    <div>
        <span class="rowName">Number One: </span><input name="param1" type="text">
    </div>
    <div>
        <span class="rowName">Number Two: </span><input name="param2" type="text">
    </div>

    <div><input type="submit" value="Submit Query"></div>
</form>
</body>
</html>
```

A key line in this code is the declaration for the form:

``` {.code}
<form action="/cgi-bin/SimpleCgi.py" method="POST">
```

This code says that we are going to POST data to the script called
SimpleCgi.py. And here is the code that ensures that the POST passes the
first of the two parameters:

``` {.code}
<input name="param1" type="text">
```

This code creates an input control of type text, and gives it the name
**param1.** This name maps to the name of the first of the two
parameters passed to the Python script. Choose the following linke to
try running this form yourself:

[CallSimpleCgi.html](CallSimpleCgi.html) 

The code shown above is simple and easy to use, but it is not really
very flexible. In particular, it returns the result in a separate HTML.
A better strategy is to integrate the values returned into the current
file using ajax. Look at the screen shot shown below. Notice that the
result is displayed in a list at the bottom of the HTML file:

![Results of CGI calls that use ajax](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/SimpleCgi03.png)

**Figure 0X: Here are the results of a CGI calls that use ajax. Notice
that values of Param1 and Param2 are shown in a list at the bottom of
this short HTML file.**

If we want to use ajax, then we need to use JavaScript, and our
JavaScript can be simplified if we bring in library like jQuery. Here is
a rewrite of CallSimpleCgi.html designed to use JavaScript and jQuery:

``` {.code}
<!DOCTYPE html>
<html>
<head>
    <title>Call SimpleCgi.py</title>
    <script src="../Scripts//jquery.js" type="text/javascript"></script>
    <script src="../Scripts/SimpleReadWrite.js" type="text/javascript"></script>
    <link href="../styles/index.css" rel="stylesheet" type="text/css" />
</head>
<body>

    <div>
        <span class="rowName">Number One: </span><input id="param1" type="text">
    </div>
    <div>
        <span class="rowName">Number Two: </span><input id="param2" type="text">
    </div>

    <div><input type="button" value="Submit Query" onclick="ProcessSimpleCgi()"></div>

    <ul id="paramsList"></ul>
</body>
</html>
```

We have removed the form elements altogether. The text input control
have a **id** attribute instead of a **name** attribute. We have changed
the button to call a JavaScript method called **ProcessSimpleCgi**().
Note also the addition of an empty HTML **List** element at the bottom
of the body element.

Here is the code for the ProcessSimpleCgi method:

``` {.code}
function ProcessSimpleCgi()
{
    param1Data = $("#param1").val();
    param2Data = $("#param2").val();
    params = "param1=" + param1Data + "&param2=" + param2Data;
    $.ajax(
    {
        type: "POST",
        url: "/cgi-bin/SimpleCgi.py",
        data: params,
        dataType: "html",
        success: function (html)
        {
            var params = $(html).filter(function(){ return $(this).is('p') });
            params.each(
                function()
                {
                    var value = "<li>" + $(this).html() + "</li>";
                    $("#paramsList").append( value );
                }
            );
        },
        error: function(request, ajaxOptions, thrownError)
        {
            $("#debug").html(request.responseText);
        }

    });
}
```

When the success setting is called, it is passed the HTML that was
returned by the call to SimpleCgi.py. By far the trickiest part of this
call is parsing the HTML to pull out the two paragraph elements that
contain param1 and param2. The code shown above performs that function,
but I will only briefly discuss how these jQuery calls work at this
point, as it is not germane to our main topic, which is Python and CGI.
As you can see, two jQuery methods are called, one named
**[filter](http://api.jquery.com/filter/)** and the other an iteration
tool called **[each](http://api.jquery.com/each/).** The **filter** call
removes all the elments in the returned HTML file that are not a
paragraph (&lt;p&gt;). The **each** call iterates over the two
paragraphs that were returned, allowing us to extract the HTML that they
contain.

Go ahead and try it for yourself:

[CallSimpleCgiJquery.html](CallSimpleCgiJquery.html)

Here is another example:

``` {.code}
<form>
<div class="addForm">
  Number One: <input id="operanda" name="operanda" type="text">
</div>
<div class="addForm">
  Number Two: <input id="operandb" name="operandb" type="text">
</div>
<div>
  <hr>
  <div>
    <span class="addForm">Result</span>: <span id="result"></span>
    <ul id="items"></ul>
  </div>
  <hr>
  <div>
    <input onclick="addNumbersXml()" type="button" value="Add Numbers">
    <input onclick="getAllAddingData()" type="button" value="Show All Addtions">
  </div>
</div>
</form>
```

Notice that if you click the button labelled Add Numbers you end up
called a JavaScript method named **addNumbersXml**:

``` {.code}
function addNumbersXml()
{
    var operanda = $("#operanda").val();
    var operandb = $("#operandb").val();
    var answer = parseInt(operanda) + parseInt(operandb);
    $("#result").html(answer);
    $("#answer").val(answer);
    readFromAddingXml(operanda, operandb, answer)
}

function sendToAddingXml(operanda, operandb, answer)
{
    $("#items").empty();
    // dataRequest = "operanda=2&operandb=3&answer=5";
    dataRequest = "operanda=" + operanda + "&operandb=" + operandb + "&answer=" + answer;
    request = $.ajax(
    {
        type: "POST",
        data: dataRequest,
        url: "/cgi-bin/AddingDataXml.py",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('addition').each(function () {
                var first = $(this).find('operanda').text();
                var last = $(this).find('operandb').text();
                var answer = $(this).find('answer').text();
                var additions = first + "+" + last + "=" + answer;
                $("#items").append("<li class='tulsa'>" + additions + "</li>");
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#debug").append('<li>' + jqXHR.responseText + '</li>');
        }
    });
}

function getAllAddingData()
{
    $("#items").empty();
    request = $.ajax(
    {
        type: "GET",
        url: "/cgi-bin/AddingMachineDataReaderXml.py",
        cache: false,
        dataType: "xml",
        success: function (xml) {
            $(xml).find('addition').each(function () {
                var operanda = $(this).find('operanda').text();
                var operandb = $(this).find('operandb').text();
                var answer = $(this).find('answer').text();
                var additions = operanda + "+" + operandb + "=" + answer;
                $("#items").append("<li>" + additions + "</li>");
            });
        }
    });

    request.fail(function(jqXHR, textStatus, bar) {
      alert( "Request failed: " + textStatus + bar );
    });
}
```

The **addNumbersXml** uses jQuery to retrieve the values typed in by the
user, and it addes them together and finds a result. It then calls the
**sendToAddingXml** method which is used to POST the data to a specific
Python file, and to retrieve the result sent back by that file. The
Python file looks like this:

``` {.code}
#!/usr/bin/python

# Import the CGI module
import MySQLdb
import cgi
import cgitb

cgitb.enable()

# Test with: http://192.168.0.100:8000/cgi-bin/AddingDataXml.py?operanda=2&operandb=3&answer=5
# Required header that tells the browser how to render the HTML.
print "Content-Type: text/xml\n"

# Define function to generate HTML form.
def generate_form(operanda, operandb, answer):
    print """


    """
    sql = "insert into additions (operanda, operandb, answer) values ({0}, {1}, {2});".format(operanda, operandb, answer)
    insertData(sql)

    print "" + operanda + ""
    print "" + operandb + ""
    print "" + answer + ""
    print ""
    print ""


def insertData(sql):
    db = MySQLdb.connect(host="localhost", user="charlie", passwd="bar", db="charlie")
    cursor = db.cursor()
    cursor.execute(sql)
    db.commit()
    cursor.close()
    db.close()

def runAction():
    form = cgi.FieldStorage()
    if (form.has_key("answer") and form.has_key("operanda") and form.has_key("operandb")):
        generate_form(form["operanda"].value, form["operandb"].value, form["answer"].value)
    else:
        generate_form("Error");

def main():
    generate_form()

runAction()
```

Here is an alternative example that has more code but better error
handling:

``` {.code}
#!/usr/bin/python

# Import the CGI module
import MySQLdb
import cgi
import cgitb

cgitb.enable()

# Test with: http://192.168.0.100:8000/cgi-bin/AddingDataXml.py?operanda=2&operandb=3&answer=5

def formatXml(operanda, operandb, answer):
    xml = """Content-Type: text/xml\n
<?xml version='1.0'?>
<additions>
    <addition>
        <operanda>{0}</operanda>
        <operandb>{1}</operandb>
        <answer>{2}</answer>
    </addition>
</additions>""".format(operanda, operandb, answer)
    return xml

# Define function to generate HTML form.
def generate_form(operanda, operandb, answer):
    formatXml(operanda, operandb, answer)
    sqlString = "insert into additions (operanda, operandb, answer) values ({0}, {1}, {2});"
    sql = sqlString.format(operanda, operandb, answer)
    insertData(sql)
    print formatXml(operanda, operandb, answer)

def insertData(sql):
    db = MySQLdb.connect(host="localhost", user="charlie", passwd="bar", db="charlie")
    cursor = db.cursor()
    cursor.execute(sql)
    db.commit()
    cursor.close()
    db.close()

def runAction():
    form = cgi.FieldStorage()
    if (form.has_key("answer") and form.has_key("operanda") and form.has_key("operandb")):
        generate_form(form["operanda"].value, form["operandb"].value, form["answer"].value)
    else:
        print formatXml("Error", "params we got: " + str(form.list).strip('[]'),
            "List Length: " + str(form.__len__()));

def main():
    generate_form()

runAction()
```

The complete, working example is available in the Elvenware [Mercurial
repository under the name AddingDataXml.py](../../cloud/Mercurial.html).

CGI Files that Print Useful Debug Information {#usefulDebug}
---------------------------------------------

Note the generateError method in this code:

``` {.code}
#!/usr/bin/python

# Import the CGI module
import MySQLdb
import cgi
import cgitb

cgitb.enable()

# Test with: http://192.168.0.100:8000/cgi-bin/AddingDataXml.py?operanda=2&operandb=3&answer=5
# Required header that tells the browser how to render the HTML.


def getHeader():
    return """Content-Type: text/xml\n

"""

def getClose():
    return ""

# Define function to generate HTML form.
def generate_form(operanda, operandb, answer):

    sql = "insert into additions (operanda, operandb, answer) values ({0}, {1}, {2});".format(operanda, operandb, answer)
    insertData(sql)

    print "" + operanda + ""
    print "" + operandb + ""
    print "" + answer + ""
    print ""
    print ""


def insertData(sql):
    db = MySQLdb.connect(host="localhost", user="charlie", passwd="bar", db="charlie")
    cursor = db.cursor()
    cursor.execute(sql)
    db.commit()
    cursor.close()
    db.close()

def generateError(error):
    xml = getHeader()
    xml += "" + str(error) + ""
    xml += getClose()
    print xml;

def runAction():
    form = cgi.FieldStorage()
    if (form.has_key("answer") and
        form.has_key("operanda") and
        form.has_key("operandb")):
        generate_form(form["operanda"].value, form["operandb"].value, form["answer"].value)
    else:
        generateError(form.list);



runAction()
```

Read and Write to Text File {#textFiles}
---------------------------

Writing to a text file with Python is very simple. There is no need to
add an import to your code, you can simply call **open**, pass in a file
name, and specify whether you want to create a new file, append to an
existing file, or read from a file:

-   open("file.txt", "w") -- create a new file. The "w" option will
    erase any existing files before creating your new file.
-   open("file.txt", "a") -- append text to a file. If the file does not
    exist, it will be created.
-   open("file.txt", "r") -- read from a file.
-   open("file.txt", "r+") -- read and write mode
-   open("file.bin", "rb") -- read in binary mode. Also wb and r+b. This
    is only necessary in Windows, but it does not hurt to do it in Unix.

Here is code for writing to a text file with append writes. This means
text will be appended on to the end of an existing file.

``` {.code}
def writeFile(self, info):
    text_file = open("LatLongReport.txt", "a")
    text_file.write(info + "\n")
```

Here is text for reading from a text files and producing XML output in
the process:

``` {.code}
 def readFile(self):
    print "Content-type: text/xml"
    print
    print "<?xml version='1.0'?>"
    print "<places>"
    text_file = open("LatLongReport.txt", "r")
    for line in text_file:
        data = line.strip()
        datas = data.split(',');
        print "\t<address>"
        print "\t\t<name>" + datas[0] + "</name>"
        print "\t\t<latitude>" + datas[1] + "</latitude>"
        print "\t\t<longitude>" + datas[2] + "</longitude>"
        print "\t</address>"
    print "</places>"
```

Remember that you need to give the user rights to access a file. In
Linux, it is best to create the file ahead of time, and then to let the
Apache user called www-data have the ability to write to the file. Make
sure it is not executable:

-   chown charlie:www-data myfile.txt
-   chmod 664 myfile.txt

If you are testing, you can give a file all permissions (chmod 777
myfile.txt), but that is a very bad practice. If you leave a file like
on your server then you are creating a huge security risk for yourself
and everyone on the web. But it can be helpful if you are experimenting
with a file, and just want to get it working immediately before
tightening up your security.

Here is a slightly different approach you can use if you want to users
to edit a text file in your cgi-bin directory with a script that will be
run by Apache. First set www-data as the owner of the file:

``` {.auto-style1}
sudo chown www-data:root *.txt
```

Then give only www-data the permissions to edit the file:

``` {.auto-style1}
sudo chmod 600 *.txt
```

When you are done, the Apache user **www-data** owns the files:

``` {.auto-style1}
charlie@MintBox /usr/lib/cgi-bin $ stat -c "%A %a %n" *.txt
-rw------- 600 debug01.txt
-rw------- 600 debug.txt
-rw------- 600 states.txt
```

Now the scripts you invoke with a browser can edit the files, but no one
else can. This is a very draconian approach, but if you want to be sure
that you don't open a file in a text editor and start editing it, then
this can be what you want. For instance, if your script is opening the
file in binary mode, as you will in the section on CSV, then when you
are signed in to your Linux box you don't want to use a text editor to
modify a binary file. The above commands only let Apache user's edit the
file, which will discourage you from editing it yourself during a Linux
session with a text editor.

In IIS, you are also going to need to give IUSR or someone similar write
capibilities for your file. Don't give permissions for a whole folder,
as we don't want a folder that contains scripts to be writeable.

An Example of Writing Debug Text {#debugTextExample}
--------------------------------

We have never really explored what you can do with that file. I've set
the code that writes to it up (perhaps not optimally) to be included in
each file where it is used, and to have it open the file to which it
writes in a mode that means that the entire file is overwritten each
time it is used:

def doDebug(self, text):\
  f = open('debug.txt', 'w')\
  f.write(text)\
  f.close()

I open this file in write only mode, and designed so that it creates a
new file each time it writes. That is what the 'w' does. If you change
the 'w' to an 'a', then it opens the file in append mode, and the file
is extended each time you write to it. The problem with append mode is
that debug.txt will, over time, get very long, as messages are written
to it over and over with each run. 

However, if you change it to append mode, and you find each place where
I implement the method, then you can easily start sending your self
debug messages as the program runs. Notice in the code below that I open
the file in append mode, and that I add a line feed ('\\n") to each
piece of text that is written:

def doDebug(self, text):\
  f = open('debug.txt', **'a')**\
  f.write(text +**"\\n")**\
  f.close()

Now you can start adding text debug messages whereever you want in your
file. For instance, this code fragment writes out the text **NoteWork.py
was started **to the debug.txt file:

noteWork = NoteWork()\
**noteWork.doDebug("NoteWork.py was started")**\
try:

If you look at the bottom of NoteWork.py you can see where I put the
line. Here is how to tell yourself that the **run** method was called:

def run(self):\
  self.doDebug("NoteWork.Debug was called")\
  form = cgi.FieldStorage()\
  if (form.has\_key("action")):  etc....

Please use this tip carefully, as it can cause you to break your code if
you do not use it carefully. On the other hand, and it can leave a nice
debug trace in debug.txt that can help you troubleshoot problems.

 

Write CSV Data {#csv}
--------------

It is a simple matter to manually create a CSV file in a rather
inflexible manner:

``` {.code}
 def write_csv(self, param1, param2, param3):
  f = open(self.fileName, 'a')
  data = param1 + "," + param2 + "," + param3 + "\n";
  f.write(data)
  f.close()
```

Here is an alternative using the csv class:

``` {.code}
import csv

def write_csv_row(self, row):
   f = csv.writer(open(self.fileName, 'ab'))
   f.writerow(row)
```

To call this method , just write something like this:

``` {.code}
simple_file.write_csv_row(["one","two","three"])
simple_file.write_csv_row(["four","five","six"])
```

To read the file, you can do something like this:

def read\_csv\_row(self):\
  f = csv.reader(open(self.fileName, 'rb'))\
  for row in f:\
     print row\[0\]

``` {.code}
To pull out a specific item, you could write something like this:
```

``` {.code}
def read_csv_get_item(self, row_num, item_num):
  f = csv.reader(open(self.fileName, 'rb'))
  count = 0
  for row in f:
    if count == row_num:
      return row[item_num]
    count += 1
```

This code is great if you want to always add exactly three, comma
delimited items to a file. For more flexibility, use csv:

``` {.code}
import csv
def write_csv_row(self, row):
f = csv.writer(open(self.fileName, 'ab'))
f.writerow(row)
```

Calling Python Scripts with JQuery {#pythonJquery}
----------------------------------

Once you have Python scripts running on the server, you will want to
call them.

Now let's write JavaScript using JQuery to read this file, extract some
of its content, and display it in a list:

``` {.code}
function ReadFromPythonXml()
{
    $.ajax(
    {
        type: "GET",
        url: "/cgi-bin/SimpleXml.py",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('name').each(function () {
                var first = $(this).find('first').text();
                var last = $(this).find('last').text();
                var fullName = first + " " + last;
                $("#items").append("<li class='tulsa'>" +
                    fullName + "</li>");
            });
        }
    });
}
```

We specify that we want to make a call that GETs rather than POSTs data.
We state the name of the script we want to run, and the type that we
want to return.

Calls like this are made asynchronously unless we explicitly specify
otherwise. This ensures that the UI does not freeze up during a call
back to the server. If the call succeeds, then the anonymous method in
the **success** field is called. It looks for the name nodes in the XML
and extracts there 'first' and 'last' names.

<!-- -->

Here is one way to write to a Python script using JQuery:

``` {.code}
function writeLatLong(lat, lng)
{
    var textData = $("#latLongData").val();
    if (textData != "") {
        var datLatLng = "name=" + textData +
          "&lat=" + lat + "&long=" + lng;
        $.ajax(
        {
            type: "POST",
            url: "/cgi-bin/LatLongData.py",
            data: datLatLng
        });
    }
    else
    {
        alert('Please enter a name for your point');
    }
}
```

Here is another way to read a Python script using JQuery:

``` {.code}
function getLatLongFromFile()
{
    $.ajax(
    {
        type: "GET",
        url: "/cgi-bin/LatLongReadData.py",
        dataType: "xml",
        success: function (xml) {
            var i = 0;
            $(xml).find('address').each(function () {
                var title = $(this).find('name').text();
                var latitude = $(this).find('latitude').text();
                var longitude = $(this).find('longitude').text();
                makeMarker(title, latitude, longitude);
            });
        }
    });
} 
```

Debug Strategies and Errors {#error}
---------------------------

<div>

There are three ways to troubleshoot.

</div>

-   Try running the script from a browser (If it is CGI, make sure your
    code includes: import cgitb, and a line that reads cgitb.enable().)
-   Run the script from the command line with python.
-   Check the log files
-   Debug the program in some tool, probably Eclipse.

Here is an example of running the script from the command line. As you
can see, I have navigated to the cgi-bin folder, then typed **python**
plus the file name. I show the first few lines of output:

``` {.code}
charlie@NorthSea:/usr/lib/cgi-bin$
python data_python.py
Content-Type: text/html
<html>
<head>
  <meta content='text/html; charset=utf-8' http-equiv='Content-Type'>
    <title>Info Form</title>
```

In this case, there are no errors, but if there were errors, you would
see them at the command prompt.

The Apache error log is usually in /var/log/apache2. For instance:

-   /var/log/apache2/error.log

To view it, type: cat /var/log/apache2/error.log

By default, the IIS error log is located here:

-   c:\\inetpub\\logs

See also the pages on:

-    [HTTP Status Codes](../Server/HttpStatusCodes.html).
-   [Debugging HTML and JavaScript](/javascript-guide/JavaScript.html#debug)

Debug Python CGI {#debugCgi}
----------------

It can be diifficult to debug a Python script that takes parameters
usually passed to it by HTTP POST operation. For instance, we often type
a URL like this, hoping that it will work, only to find that it does
nothing or creates an error of some kind:

**http://localhost/cgi-bin/MainCgi.py?bar="foo"**

If our call does not work, what can we do to debug MainCgi.py? One
solution is to set up a Unit Test that uses Mock Objects. This subject
sounds intimidating, but it is actually quite simple in practice.

The first step is download and install the mock library. You will
probably want to choose the zip file:

-   <http://pypi.python.org/pypi/mock>
-   To Install mock, do the familiar install dance by typing these two
    commands in the unzipped folder that you downloaded:
    -    python.exe setup.py build
    -    python.exe setup.py install

Once you have it installed, the next step is to test your new mock
library. Here is a simple Pythong CGI program kept in file called
**MainCgi**.**py**.  Our goal is debug this simple script from the
command line and without a browser:

``` {.code}
#!/usr/bin/python

import cgi

def simpleCgi():
    form = cgi.FieldStorage()
    if form.has_key("bar"):
        return True
    else:
        return False
```

And here is the unit test code that debugs it:

``` {.code}
import unittest
from mock import patch
import MainCgi

@patch('cgi.FieldStorage')

class TestCgiCode(unittest.TestCase):
    class TestField(object):
        def __init__(self, value):
            self.value = value

    fields = { "bar": TestField("foo") }

    def testBar(self, MockClass):
        instance = MockClass.return_value
        instance.__getitem__ = lambda s, key: self.fields[key]
        instance.__contains__ = lambda s, key: key in self.fields
        result = MainCgi.simpleCgi()
        self.assertTrue(result)

suite01 = unittest.TestLoader().loadTestsFromTestCase(TestCgiCode)
unittest.TextTestRunner(verbosity=3).run(suite01)
```

Notice the code that says:

``` {.code}
 @patch('cgi.FieldStorage').
```

This code says that we want to create a "mock" object, a "fake" class
that will be substituted for the **cgi.FieldStorage** class. In other
words, we will substitute our own class in place of
**cgi.FieldStorage**. The key point being that our **mock** class will
be sure to behave as we want, that is, it will have a parameter called
**bar** that is set to the value **"foo"**.  

We then create a simple hash table called "fields" which we use to
define the parameter that we want to pass into our **MainCgi.py**
program:

``` {.code}
fields = { "bar": TestField("foo") }
```

Here is the code that creates our "mock" class that will be passed in
instead of cgi.FieldStorage:

``` {.code}
instance = MockClass.return_value
instance.__getitem__ = lambda s, key: self.fields[key]
instance.__contains__ = lambda s, key: key in self.fields
```

Then in the test case called testBar we write code that creates a mock
class with two methods called **\_\_getitem\_\_** and
**\_\_contains\_\_**. These methods are part of cgi.FieldStorage, but
now we are defining how they will behave. These methods will be called
in our MainCgi program, and since we defined what they do by creating
two simple lambda methods, we know exactly how the class should behave. 
In short, we are assuring that this CGI program is passed a parameter
called bar that is set to the value foo. It is as if we wrote:
**http://localhost/cgi-bin/MainCgi.py?bar="foo"**. But we don't actually
have to make that call from the browser, instead we can just run our
program.

Even if you don't understand lambdas and mock objects, you can still
follow this pattern whenever you need to debug a CGI program.

Here is a review of some information you need to help you download and
install the mock class used in the code shown above:

``` {.code}
 For this to work download mock:
   http://pypi.python.org/pypi/mock
Install mock:
   python.exe setup.py build
   python.exe setup.py install
See also
   http://docs.python.org/library/unittest.html
```

CGI File Errors {#cgiFileErrors}
---------------

A number of people in one of my classes had trouble setting up the
Python files for an assignment on Maps and Marking. There were a number
of different reasons this might have happened. Rather than writing the
same comments over and over on each persons assignment, I wrote the
following, which might be useful to people who visit this page:

The Path to the Python Files is Wrong
-------------------------------------

When I try to pull up the saved places, I get this error:

    Not Found

    The requested URL /cgi-bin/LatLongReadData.py was not found on this server.

When I try to save data, that is, when I try to make a mark, I get this
error:

    Not Found

    The requested URL /cgi-bin/LatLongData.py was not found on this server.

This error might have occurred because your URL's include a slash before
the word cgi-bin. In most cases, they should look like this:

    cgi-bin/LatLongData.py

You have them like this:

    /cgi-bin/LatLongData.py

I actually addressed this particular issue in the assignment near the
bottom of the page, in the **Tips** section, under the heading **The
cgi-bin Path Issue**. Of course, the actual path on your system may
differ than the one's I set up for my students. You could try both of
these variations, or consider other options. 

Trying to Access the Python File by Entering a URL
--------------------------------------------------

In some cases, I could not reach **LatLongData**.**py** by entering this
URL in the address bar:

    http://54.243.XX.XX/~UserName/cgi-bin/LatLongData.py

When I do that, I got the following error:

    Not Found

    The requested URL /~UserName/cgi-bin/LatLongData.py was not found on this server.

    Apache/2.2.22 (Ubuntu) Server at 54.243.XX.Xx Port 80

This means you have not copied the files out to your cgi-bin directory.
It is also possible that you did not even create a cgi-bin directory.
The path to your file should look like this, where \$USER is your user
name:

    /home/$USER/public_html/cgi-bin/LatLongData.py

### A Second Problem Trying to Access the Python File by URL

There were other cases where I could enter the URL and reach your file.
In other words, a URL like this worked - at least up to a point:

    http://54.243.145.90/~UserName/cgi-bin/LatLongReadData.py

But when I entered that URL, the source for your Python file appears
instead of the output for the file. This means you have not properly
configured CGI on your server, as described in the assignment on
Creating a Linux User in the section called **Configuring Apache**.

 

More Python Scripts {#more}
-------------------

-   [Test01.py on Elvenware](/cgi-bin/Test01.py) (Simple form)
-   [Test01a.py on Elvenware](/cgi-bin/Test01a.py) (Powers of Two)
-   [Test01b.py on Elvenware](/cgi-bin/Test01b.py) (Another form)
-   [Test02.py](/cgi-bin/Test02.py) (Very simple script)
-   [Test03.py](/cgi-bin/Test03.py) (Get the time on the server)
-   [Test05.py](/cgi-bin/Test05.py)
-   [ReadAction.py](/cgi-bin/ReadAction.py)
-   [ReadAction01.py](/cgi-bin/ReadAction01.py)
-   [LatLongReadData.py](/cgi-bin/LatLongReadData.py)
-   [Presidents](/cgi-bin/Presidents01.py)

Download these [files](/charlie/downloads/ElvenwareCgi.zip).
