---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Python/install.md
relativePath: elvenware/development/web/Python/install.md
title: Install
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

Python Install and Quick Start
------------------------------

Installing Python is usually a very simple procedure. There are two ways
to think about this problem:

-   [Installing on Windows](#windows)
-   [Make sure Python is on your Path](#path)
-   [Installing on Linux](#linux)
-   [Getting Started](#gettingstarted)
-   [EasyInstall and pip](#easyinstall)
-   [MySQLdb](#mysqldb)

There are two common versions of Python: Python 2.7 and Python 3.2. I
still find myself using Python 2.7 most frequently, since many older
libraries work with it. However, 3.2 is apparently the future of the
language.

Windows Install {#windows}
---------------

Download Python:

-   [http://wiki.python.org/moin/BeginnersGuide/Download](http://wiki.python.org/moin/BeginnersGuide/Download)
-   [http://www.python.org/getit/](http://www.python.org/getit/)
-   [Set up IIS to handle Python Scripts](python_iis.html)

Make Sure Python is on Your Path {#path}
--------------------------------

Life is much easier for you if Python is on your path. You can set you
path with Windows tool accessed from the Control panel:

-   Control Panel\\System and Security\\System
-   Advanced System Settings (On the left)
-   Environment Variables
-   Select the user variable called **Path** and click the **Edit**
    button, as shown in Figure 00.

![Setting your path](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/SetPath01.png)

**Figure 00: Look in the *User Variables for Charlie* and *Edit* the
*PATH.***

In most cases, you simply prepend or append the value **C:\\Python27**
and **C:\\Python27\\Scripts** to your PATH. Of course, if you installed
Python in a different folder, then you need to enter a different value.

![Append Python folder to a path](https://s3.amazonaws.com/s3bucket01.elvenware.com/python-images/SetPath02.png)

**Figure 01: Here I am in the process of appending the string
J:\\Python27 to my path, since that is where I have installed Python on
my system.**

When you are done, click **OK**. Now open a Command window. You should
now be able to invoke Python from any folder on your system by simply
typing the word python:

~~~~ {.code}
J:\SkyDrive\BellevueCollege\Prog-282\Source>python
Python 2.7.2 (default, Jun 12 2011, 14:24:46) [MSC v.1500 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> print "hello"
>>> hello
~~~~

Linux Install {#linux}
-------------

You rarely need to do anything to install Python on Linux. It comes with
the system. If by some off chance you don't have Python installed, try:

~~~~ {.code}
sudo apt-get install python2.7
~~~~

If you want the latest Python, you can issue the following command:

~~~~ {.code}
sudo apt-get install python3
~~~~

After the install, you should put your scripts in this folder:

~~~~ {.code}
/usr/lib/cgi-bin
~~~~

The folder will be created for you automatically but you need to make
the scripts you create executable:

~~~~ {.code}
chmod +x /usr/lib/cgi-bin/myfile.py
~~~~

After doing this, you can run the file by browsing to a URL such as this
one:

~~~~ {.code}
http://localhost/cgi-bin/myfile.py
~~~~

### Configuration of cgi-bin on Linux with Apache

As mentioned previous, Python and Linux are set up automatically for you
by apt-get. Nevertheless, it can help to understand how the process
works. The file responsible for configuring Apache to run Python scripts
is located here:

~~~~ {.code}
/etc/apache2/sites-available/default
~~~~

The important sections of that file look like this:

~~~~ {.code}
ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
<Directory "/usr/lib/cgi-bin">
AllowOverride None
Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
Order allow,deny
Allow from all
</Directory>
~~~~

What the code shown above tells us, is that there is a cgi-bin directory
created for us, that it is designed for scripts such as those used in
Python web applications, and that it is located here:

~~~~ {.code}
/usr/lib/cgi-bin
~~~~

The **ScriptAlias** directive shown here tells the web server that a URL
containing cgi-bin points to the folder /usr/lib/cgi-bin. In general,
the directive tells the Apache web server that a particular URL maps to
a particular directory on the harddrive, with the URL in the first
argument and the folder in the second argument.

After the ScriptAlias directive there is code to configure how Apache
handles files found in the /usr/libe/cgi-bin directory. The most
important part is the **Options** directive:

~~~~ {.code}
Options +ExecCGI
~~~~

This options directive tells Apache that CGI execution is permitted in
the **/usr/lib/cgi-bin** folder. Executing code is a powerful privilege,
so we want to be sure that it can be accomplished within a clearly
defined context.

Don't forget that you need to put your Python scripts in the cgi-bin
directory, and you need to make sure they are executable:

~~~~ {.code}
chmod +x myscript.py
~~~~

### Set up HTML files in Your Home Folder

Here is a link that can help you get started:

[http://httpd.apache.org/docs/2.4/howto/public\_html.html](http://httpd.apache.org/docs/2.4/howto/public_html.html)

Though it can be a security issue, it is sometimes useful to place HTML
files in your home folder. You will need to have the right permissions
on the folder. Here is a script called publicHtml.sh that will be
helpful. It first sets owner of the folder, and then its permissions:

~~~~ {.code}
#!/bin/bash

sudo chown -R www-data:www-data /home/$USER/public_html
sudo chmod -R 775 /home/$USER/public_html
~~~~

You should make the script executable:

~~~~ {.code}
sudo chmod +x /home/$USER/bin/publicHtml.sh
~~~~

Getting Started {#gettingstarted}
---------------

Before buying a book on Python, spend time searching the web to find the
many great resources available for free. For instance:

-   [http://wiki.python.org/moin/BeginnersGuide](http://wiki.python.org/moin/BeginnersGuide)
-   [http://en.wikibooks.org/wiki/Non-Programmer's\_Tutorial\_for\_Python\_2.6](http://en.wikibooks.org/wiki/Non-Programmer's_Tutorial_for_Python_2.6)
-   [http://www.elvenware.com/charlie/development/web/Python/PythonScripts.html](http://www.elvenware.com/charlie/development/web/Python/PythonScripts.html)

EasyInstall
-----------

As you start working with Python, it won't be long before you start
hearing about **easyinstall**. You can use this tool to automatically
install and configure many of the powerful add-on modules that help to
make Python so useful. In general, you just type **easyinstall
SomeModule** in order to install a tool that you want to use. It is, in
effect, a bit like apt-get and similar tools that you might know from
Linux. The problem with easy\_install is that it does not come built-in
to many Python distributions. The solution, fortunately, is quite
simple.

To install **easyinstall**, just download
[ez\_setup.py](http://peak.telecommunity.com/dist/ez_setup.py). By
download, I mean copy the text for the file into a python script called
**ez\_setup.py.** Once you have the script on your disk, then type
**python ez\_setup.py**, where python is the path your python
executable. On Windows, your version of Python might be in
[c:\\python27](file:///c:/python27), so you would type the following:

    c:\Python27\Python.exe ez_setup.py

After the script runs, **easyinstall** will be automatically installed
into the [c:\\python27\\scripts](file:///c:/python27/scripts) directory,
or to whatever folder you Python install occupies.

Pip is similar to easy install. You should have both tools on your
system. Assuming your Python\\Scripts directory is on your path, to
install Pip, you can write:

~~~~ {.code}
easy_install pip
~~~~

Now you can easily install other modules:

~~~~ {.code}
pip install Flask
~~~~

~~~~ {.code}
pip install Rocket
~~~~

~~~~ {.code}
pip install virtualenv
~~~~

You might also want to get Windows Azure support for Python and Windows
Azure Storage support for Python from
[GitHub](http://git-scm.com/downloads):

-   [https://github.com/smarx/pythonrole](https://github.com/smarx/pythonrole)
-   For use in GIT: **https://github.com/smarx/pythonrole.git**
-   [https://github.com/sriramk/winazurestorage](https://github.com/sriramk/winazurestorage)
-   For use in GIT: **https://github.com/sriramk/winazurestorage.git**

 

MySQLdb for Python {#mysqldb}
------------------

For ***Windows***, go here to get the forehead install:

~~~~ {.code}
http://www.lfd.uci.edu/~gohlke/pythonlibs/#mysql-python
~~~~

If that doesn't work out for some reason, the actual project is here:

~~~~ {.code}
http://mysql-python.sourceforge.net/ 
~~~~

On ***Linux***, do this:

~~~~ {.code}
sudo apt-get install python-mysqldb
~~~~

Another approach is to make sure that all of Lamp is installed on Linux:

    sudo apt-get install tasksel
    sudo tasksel install lamp-server

That should get you all you need. if necessary, try installing
python-mysqldb as above. To check if it is working, start python and
type **import MySQLdb**. If you can press enter and not get an error,
then you should be up and running:

~~~~ {.code}
charlie@MintBox ~ $ python
Python 2.7.2+ (default, Oct  4 2011, 20:03:08)
[GCC 4.6.1] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import MySQLdb
~~~~

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)
