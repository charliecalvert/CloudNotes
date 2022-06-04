---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/Xampp.md
relativePath: elvenware/development/web/Python/Xampp.md
title: Xampp
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: Xampp.md
fileNameHTML: Xampp.html
image: ./course/course-javascript.jpg
subject: Python
queryPath: elvenware/development/web/Python/
---

<!-- toc -->
<!-- tocstop -->

![Elvenware](../../../images/elvenwarelogo.png)

 
-

Running Python Scripts on Windows with Apache and Xampp {#xampp}
-------------------------------------------------------

You can run Apache on Windows via an easy to use tool called Xampp. If
you are having trouble with IIS, or if you just prefer running Apache,
even on Windows, then you should try Xampp. It installs quickly, and has
little apparent impact on your Windows installation.

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
-   At the top of each Python script you create, set the path to your
    version of Python**.**For instance, ours is in
    [C:\\Python27](file:///C:/Python27) so we write**:
    \#!/Python27/python**

If you want a complete example, you can create a script like the
following, and put it in [c:\\xampp\\cgi-bin](file:///c:/xampp/cgi-bin):

``` {.code}
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
```

**Notes**: I'm not at all sure it is mandatory, but I put Python on my
path. You do not need or want to install mod\_python, but wsgi might be
useful. We will address that issue later. 

Here is some [useful
information](http://httpd.apache.org/docs/2.2/howto/cgi.html) from the
Apache site.

### IIS Issues

-   IUSR account replaces the IUSR\_MachineName account 
-   IIS Logging
    -   C:\\inetpub\\logs\\LogFiles
    -   Advanced
        Logging [Install](http://www.microsoft.com/download/en/details.aspx?displaylang=en&id=7211)
    -   Learn to use [advanced
        Logging](http://learn.iis.net/page.aspx/581/advanced-logging-for-iis-70---real-time-logging/)

-   IE - Internet Options | Advanced
    -   Turn of Show Friendly HTTP Error Messages

Links
-----

-   [Xampp](http://www.apachefriends.org/en/xampp.html)

