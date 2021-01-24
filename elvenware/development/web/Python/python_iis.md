<div id="container">

Python on Windows
=================

Index
-----

-   [CGI and Python in IIS](#cgiAndPython)
-   [Where is the CGI Handler Information Written](#cgiHandler)
-   [Various Error Codes](#errorCodes)
-   [Links](#links)

CGI and Python in IIS {#cgiAndPython}
---------------------

This text accompanies a video stored [on the YouTube
site.](http://youtu.be/7whncKjSXK0). To install or get started with
Python, see the [Python Install section](install.html).

Open  the control panel: **Control Panel | Programs | Turn Windows
features on or off**

Download Python [here](http://www.python.org/getit/). More on Python
[here](http://en.wikibooks.org/wiki/Non-Programmer's_Tutorial_for_Python_2.6).
Examples of calling a [Python Script here](PythonScripts.html).

Select and turn on  **Internet Information Services | World Wide Web
Services | Application Development Features | CGI**.

![Adding CGI](../../../images/development/AddingCgi.png){height="489"}

It is fine, or perhaps even recommended that, you also select ISAPI
Extensions and ISAPI Filters.

Now you want to "add an application" to IIS, which really means you want
to configure a directory on your web site. The first step is to launch
the IIS manager. There are several ways to do this:

-   Click the Start button and type **Internet Information Services
    Manager**. Long before you reach the end of that string the option
    to launch the tool should be available.
-   Go to **Control Panel | System and Security | Administrative Tools**
    and select the IIS Manager link
-   Click the Start button and type **inetmgr**

In IIS manager, select your web site. On the right, choose **View
Applications**. Choose **Add Application.** Provide an Alias such as
**cgi-bin** or **PythonApps.** When choosing the path, you may need to
do a bit of thinking, depending on whether or not your development site
has the same structure as your published site. For instance, the cgi-bin
directory on my web server is not in the same folder level as the rest
of my site.

![Add an application](../../../images/development/iis_add_app.png)

**Figure 02: Configuring an Application in the IIS Manager**

If you have configured everything correctly, then your new "application"
will appear with a shiny blue globe icon in the **Connections** panel,
as shown in Figure 3. Note that on the right there is an option to
**View Applications**, click this link to see how the application is
configured.

[![cgi\_bin and PythonApp are both configured for cgi](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/PythonCgi01pngSmall.png)](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/PythonCgi01png.png)

**Figure 03: The folders cgi\_bin and PythonApp are both configured for
cgi. Click to zoom.**

The next step is to set up the **Script Map** for Python. In the IIS
Manager, choose the "Application (that is the directory, which in this
case is called **cgi\_bin**) that you set up and select **Handler
Mappings** and then on the right choose **Add Script Map.** Set the
**Request Path** to **\*.py** and the **Executable** to the location of
your Python installation:
**[C:\\Python27\\python.exe](file:///C:/Python27/python.exe) %s %s**. I
wrote **Python** in the **Name** field.

![Script
Mapping](../../../images/development/iss_script_mapping.png){.leaveAlone}

Please note that if you accidentally leave off the %s %s part, then you
will get a 502.2 error. See the [HTTP status code
page](../Server/HttpStatusCodes.html).

For more information, go
[here](https://docs.google.com/present/view?id=d4jzqjs_34gfgc24df) and
[here](../MapWeb/index.html).

Where is CGI Handler Information Written? {#cgiHandler}
-----------------------------------------

Usually, when you create Handler Mappings for your files, they end up in
a **Web.config** file in the directory that you set up for your cgi
scripts. Typically the relevant entry in your **Web.config** file looks
something like this:

``` {.code}
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
```

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

``` {.code}
<application path="/cgi-bin" applicationPool="Elvenware">
<virtualDirectory path="/" physicalPath="J:\cgi-bin" /></application>
```

And then at the very end of the that lengthy file there was this section
sets up Python scripts:

``` {.code}
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
```

Clearly the data in this last section mirrors what was in the web.config
file on my other systems. It was just a question of whether it was
stored in a global configuration file or in a local **web.config** file.

You read in the official Microsoft document about
[applicationhost.config](http://learn.iis.net/page.aspx/124/introduction-to-applicationhostconfig/).

Various Error Codes {#errorCodes}
-------------------

When you are working with HTML on IIS, or if you are working with Python
Scripts on IIS, you are likely to encounter a number of hard to
understand errors such as 404.2, 502.2, Errno 13, etc. I try to document
some of them here:

-   [/charlie/development/web/Server/HttpStatusCodes.html](/charlie/development/web/Server/HttpStatusCodes.html)

Links {#links}
-----

-   [Python with Apache and Xampp](Xampp.html)
-   Xampp home page

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)

</div>
