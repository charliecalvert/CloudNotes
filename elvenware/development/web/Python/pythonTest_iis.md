---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/pythonTest_iis.md
relativePath: elvenware/development/web/Python/pythonTest_iis.md
title: PythonTest_iis
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: pythonTest_iis.md
fileNameHTML: pythonTest_iis.html
image: ./course/course-javascript.jpg
subject: Python
queryPath: elvenware/development/web/Python/
---

<!-- toc -->
<!-- tocstop -->

Menu

Charlie Calvert on Elvenware
============================

Writing Code and Prose on Computers
-----------------------------------

Core Code
---------

-   [Strongly Typed](../../index.html)
-   [Web & Scripts](../index.html)
-   [Cloud](../../cloud/index.shtml)

OS and Tools
------------

-   [OS](../../../os/index.html)
-   [Database](../../database/index.html)
-   [My Writing](../../../books/index.html)

Art
---

-   [Poems & Photos](../../../Art/index.html)
-   [Book Reviews](../../../books/reading/index.html)
-   [Spiritual](../../../spirit/index.html)

Links
-----

-   [My Links](../../../links.html)
-   [Falafel](http://www.falafel.com/)
-   [Sourceforge](http://sourceforge.net/projects/elvenware/)

![Elvenware](../../../images/elvenwarelogo.png)

Index
-----

-   [CGI and Python in IIS](#cgiAndPython)
-   [Where is the CGI Handler Information Written](#cgiHandler)
-   [Error 404.2](#4042)
-   [Apache and Xampp](#xampp)
-   [Calling Python Scripts with jQuery](#pythonJquery)
-   [The Dreaded Errno 13](#errno13)

CGI and Python in IIS {#cgiAndPython}
---------------------

This text accompanies a video stored [on the YouTube
site.](http://youtu.be/7whncKjSXK0). To install or get started with
Python, see the [Python Install section](install.html).

Open  the control panel:**Control Panel | Programs | Turn Windows
features on or off**

Download Python [here](http://www.python.org/getit/). More on Python
[here](http://en.wikibooks.org/wiki/Non-Programmer's_Tutorial_for_Python_2.6).
Examples of calling a [Python Script here](PythonScripts.html).

Select and turn on  **Internet Information Services | World Wide Web
Services | Application Development Features | CGI**.

![Adding CGI](../../../images/development/AddingCgi.png)

Now you want to "add an application" to IIS, which really means you want
to configure a directory on your web site. The first step is to launch
the IIS manager. There are several ways to do this:

-   Click the Start button and type **Internet Information Services
    Manager**. Long before you reach the end of that string the option
    to launch the tool should be available.
-   Go to**Control Panel | System and Security | Administrative Tools**
    and select the IIS Manager link
-   Click the Start button and type **inetmgr**

In IIS manager, select your web site. On the right, choose **View
Applications**. Choose **Add Application.**Provide an Alias such as
**cgi-bin** or **PythonApps.**When choosing the path, you may need to do
a bit of thinking, depending on whether or not your development site has
the same structure as your published site. For instance, the cgi-bin
directory on my web server is not in the same folder level as the rest
of my site.

![Add an application](../../../images/development/iis_add_app.png)

**Figure 02: Configuring an Application in the IIS Manager**

If you have configured everything correctly, then your new "application"
will appear with a shiny blue globe icon in the **Connections** panel,
as shown in Figure 3. Note that on the right there is an option to
**View Applications**, click this link to see how the application is
configured.

[![cgi\_bin and PythonApp are both configured for
cgi](images/PythonCgi01pngSmall.png)](images/PythonCgi01png.png)

**Figure 03: The folders cgi\_bin and PythonApp are both configured for
cgi. Click to zoom.**

The next step is to set up the **Script Map** for Python. In the IIS
Manager, choose the "Application (that is the directory, which in this
case is called **cgi\_bin**) that you set up and select **Handler
Mappings**and then on the right choose **Add Script Map.**Set the
**Request Path** to **\*.py** and the **Executable** to the location of
your Python installation:
**[C:\\Python27\\python.exe](file:///C:/Python27/python.exe) %s %s**. I
wrote **Python** in the **Name** field.

![Script Mapping](../../../images/development/iss_script_mapping.png)

For more information, go
[here](https://docs.google.com/present/view?id=d4jzqjs_34gfgc24df) and
[here](../MapWeb/index.html).

Where is CGI Handler Information Written? {#cgiHandler}
-----------------------------------------

Usually, when you create Handler Mappings for your files, they end up in
a **Web.config** file in the directory that you set up for your cgi
scripts. Typically the relevant entry in your **Web.config** file looks
something like this:

~~~~ {.code}
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <handlers>
       <add name="cgi-bin" 
         path="*.py" 
         verb="*" 
         modules="CgiModule" 
         scriptProcessor="J:\Python27\python.exe %s %s" 
         resourceType="Unspecified" />
    </handlers>
  </system.webServer>
</configuration>
~~~~

I believe that this file alone would be enough to configure a directory
to handle Python scripts. In other words, you don't need to use the GUI
to create the file, it is simply a tool for creating the file.

I have, however, found a case on my system where there is no
**web.config** file, and yet everything is working. It happens that this
directory is not in the same folder as the rest of my web site. So if
there is no Web.config file in the expected place, where is the
information being stored?

After some mucking about, I went to this folder:

**C:\\Windows\\System32\\inetsrv\\config**

And in that directory there was a file called
**applicationhost.config**. And in that file, there was the section
where first my virtual directory was defined:

~~~~ {.code}
<application path="/cgi-bin" applicationPool="Elvenware">
<virtualDirectory path="/" physicalPath="J:\cgi-bin" /></application>
~~~~

And then at the very end of the that lengthy file there was this section
sets up Python scripts:

~~~~ {.code}
<location path="Elvenware/cgi-bin">
  <system.webServer>
    <handlers>
      <add 
        name="cgi-bin" 
        path="*.py" 
        verb="*" 
        modules="CgiModule" 
        scriptProcessor="J:\Python27\python.exe %s %s" 
        resourceType="Unspecified" />
    </handlers>
  </system.webServer>
</location>
~~~~

Clearly the data in this last section mirrors what was in the web.config
file on my other systems. It was just a question of whether it was
stored in a global configuration file or in a local **web.config** file.

You read in the official Microsoft document about
[applicationhost.config](http://learn.iis.net/page.aspx/124/introduction-to-applicationhostconfig/).

What else can go Wrong: 404.2?
------------------------------

One dark and rainy night, I got a 404.2 error on my Windows Server. The
error message I got in the browser was actually very informative, but I
had trouble decipering it: "The page you are requesting cannot be served
because of the ISAPI and CGI Restriction list settings on the Web
server."

The fix was quite simple:

1.  Bring up the IIS Manager
2.  Switch to Features View, and go to the server node. The is often the
    one that has the same name as your server. Other than the Start
    Page, it is the top node in the tree.
3.  Find the ISAPI and CGI Restrictions App. This only appears on this
    top node. You won't find it on the other nodes.
4.  Make sure that the application you want to run is listed and that
    the restriction is set to Allowed.

In my case, the problem was simply that I was pointing to the wrong copy
of Python. I had installed it twice on my system. In my Handler Mapping
I pointed at one copy of Python.exe, and in this setting I was pointing
at the other copy. The moment I brought them into sync, things started
working for me.

[![CGI
Restricitons](../../../images/development/CgiRestrictionsSmall.png)](../../../images/development/CgiRestrictions.png)

Running Python Scripts on Windows with Apache and Xampp {#xampp}
-------------------------------------------------------

[xampp](http://www.apachefriends.org/en/xampp.html) is a forehead
install, so I will not talk you through that. For our purposes, of
course you want the Windows version. Next  you want to install
[Python](http://www.python.org/getit/), which is another forehead
install. I assume you have installed both xampp and python on the C
Drive:

-   c:/xampp
-   c:/python27

You should not have to do anything to get CGI working on your server,
but you do need to set up Python itself:

-   The configuration file **http.conf** is in
    [c:\\xampp\\apache\\conf\\httpd.conf](file:///c:/xampp/apache/conf/httpd.conf).
-   In **http.conf** look for this line: **AddHandler cgi-script .cgi
    .pl .asp.**Modify it so it looks like this: **AddHandler cgi-script
    .cgi .pl .asp .py**
-   You probably won't need to do this, but just to be sure, look for
    this line: **Options Indexes FollowSymLinks**. Ensure that it looks
    like this:**Options Indexes FollowSymLinks ExecCGI**
-   At the top of the Python scripts you create, set the path to your
    version of Python**.**For instance, ours is in
    [C:\\Python27](file:///C:/Python27) so we write**:
    \#!/Python27/python**

If you want a complete example, you can create a script like the
following, and put it in [c:\\xampp\\cgi-bin](file:///c:/xampp/cgi-bin):

~~~~ {.code}
#!/Python27/python

print "Content-type: text/html"
print 
print "<html>"
print "<head>"
print "<title>Elvenware CGI</title>"
print "</head>"
print "<body>"
print "<h1>Basho!</h1>"
print "<p>By a Peaceful dark pond</p>"
print "<p>A frog plops</p>"
print "<p>Into the still water</p>"
print "</body>"
print "</html>"
~~~~

**Notes**: I'm not at all sure it is mandatory, but I put Python on my
path. You do not need or want to install mod\_python, but wsgi might be
useful. We will address that issue later. 

Here is some [useful
information](http://httpd.apache.org/docs/2.2/howto/cgi.html) from the
Apache site.

Calling Python Scripts with JQuery {#pythonJquery}
----------------------------------

Once you have Python scripts running on the server, you will want to
call them.

Consider the following simple Python script called **SimpleXml.py**which
creates an XML file:

~~~~ {.code}
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
~~~~

When creating Python files that are going to write out XML, you often
want to have them start by printing out the content type, which in this
case is **text/xml.**

 

~~~~ {#xmlSpace .code}
<names>
  <name>
    <first>Alpha</first>
    <last>Delta</last>
  </name>
  <name>
    <first>Bravo</first>
    <last>Omega</last>
  </name>
</names>
~~~~

Now let's write JavaScript using JQuery to read this file, extract some
of its content, and display it in a list:

~~~~ {.code}
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
~~~~

We specify that we want to make a call that GETs rather than POSTs data.
We state the name of the script we want to run, and the type that we
want to return.

Calls like this are made asynchronously unless we explicitly specify
otherwise. This ensures that the UI does not freeze up during a call
back to the server. If the call succeeds, then the anonymous method in
the **success**field is called. It looks for the name nodes in the XML
and extracts there 'first' and 'last' names.

Here is one way to write to a Python script using JQuery:

~~~~ {.code}
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
~~~~

Here is another way to read a Python script using JQuery:

~~~~ {.code}
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
~~~~

### The Dreaded File Permissions Error: Errno 13 {#errno13}

The directory where you put your scripts needs to support the
"authenticated user" identity. This means you need to write click on the
directory, sekect properties, turn the Security page, and add
"Authenticated Users" as one of the "Group or user names." This user
should have modify and write permissions." This should be given to the
directory automatically, but if it is not, then you should add it. I did
this, and my Errno 13, message about not having write permissions went
away.

It is perhaps worth adding that I got this error on folders that I
downloaded from a third party (one of my students), and pasted into an
existing web site. This meant I was not the one who created the
directory. It was created on a student's machine; he zipped up the
folders, sent his archive to me, and I unzipped it into an existing
site.

A key point to grasp here is that if you give users anonymous access to
your web site, then they run as one of the "Authenticated Users."

~~~~ {.code}
  Traceback (most recent call last): // CODE OMITTED HERE
 IOError: [Errno 13] Permission denied: 'SomeFile.data'
~~~~

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
