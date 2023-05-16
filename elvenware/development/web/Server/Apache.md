---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server/Apache.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Server
fileName: Apache.md
relativePath: /web/Server/Apache.md
title: Apache
directoryName: Server
category: Server-guide
---

## Overview

This file contains basic facts about Apache.

### Index

-   [The Key Apache Directories](#directories)
-   [Configure Apache to Serve files from a Users Directory](#configureApache)
-   [Convert Windows To Unix Line Endings](#crlf)
-   [Copy file to an Apache Web Site](#setup)

## Important Directories {#directories}

-   Root folder: /var/www
-   cgi-bin: /usr/lib/cgi-bin
-   Config file: /etc/apache2/apache2.conf
-   Config file: /etc/apache2/envvars
-   user: www-data

## Permissions

Please see this section of PythonScripts document:

[../Python/PythonScripts.html\#filePermissions](../Python/PythonScripts.html#filePermissions)

## Configuring .htaccess

Suppose you want to turn off directory browsing. You have two options:

- Use the **/etc/apache2/apache2.conf** file.
- Use .htaccess files

To turn on **.htaccess** on your server, first open **/etc/apache2/apache2.conf**. Go this section:

```
<Directory /var/www/>
	Options Indexes FollowSymLinks
	AllowOverride None
	Require all granted
</Directory>
```

Change it to this, where **AllOverride None** becomes **AllowOverride All**:

```
<Directory /var/www/>
	Options Indexes FollowSymLinks
	AllowOverride All    
	Require all granted
</Directory>
```

Now put **.htaccess** files in the directories where you don't want users to browse. They should contain the following line:

	Options -Indexes

Another option is to remove **Indexes** from the **apache2.conf** code block quoted above. That will deny directory browsing in all locations on your site.

When working with WordPress, you may need to turn on a particular apache module. For instance, here is how to turn on the rewrite module, which is needed when working with some **permalinks** in WordPress. Specifically, in **wp-admin** go to **Settings | Permalinks** and set **Common Settings** to **Post Name**. That feature won't work unless **.htaccess** files are active, as described above. Make the **AllowOverride All** change above, and then do this:

```bash
sudo a2enmod rewrite
sudo service apache2 restart
```

You will probably want to create **wordpress/.htaccess** and let **www-data** own it.

## Configuring Apache to Serve Files from a User Directory {#configureApache}

It can be very useful to configure Apache to allow you to serve up pages
out of your home directory. In particular, it means that you don't have
to worry about whether or not you have the privileges necessary to
complete most standard operations involved with maintaining a web site.

**NOTE**: *These instructions assume that you are signed in to user
account with minimum privileges. If you want to know how to create an
account, see this Elvenware discussion of the topic:*

[/charlie/os/linux/LinuxBasics.html](/charlie/os/linux/LinuxBasics.html)

Configuring Apache to serve up pages from your home directory is a two
step process:

1.  Turn on an Apache feature called **userdir**. This will allow you to
    serve up pages out of a subdirectory of your home account
    called**public\_html**.
2.  Set up a **cgi-bin** directory in your new home folder. This will
    allow you to serve up Python scripts and other cgi content.

Once you have done these things you can use Filezilla to copy files over
to a directory called **public\_html** and then run them immdediately.
You will also be able to give your Python files executable permission
without leaving Filezilla. You will, of course, place your Python files
in your **cgi-bin** directory.

You have a certain amount of freedom in the regard, of course, but I
suggest you using the following directory structure since it mirrors my
own. The code I give you is likely to be designed to run unchanged in
this kind of directory tree:

    /home/$USER/public_html
    /home/$USER/public_html/cgi-bin

 To give yourself permission to set up a public\_html directory, you
should become **ubuntu**, and then issue the following command:

    sudo a2enmod userdir

To test your work, first restart apache

    sudo service apache2 restart

If you haven't done so already, use Filezilla or your shell to create a
folder called **public\_html **in your new user's home directory:

 **/home/jsmith/public\_html**.

Then copy your **index.html** into that directory. Now try to access the
file over the web: 

-   [http://54.243.128.193/\~charlie/](http://54.243.128.193/~charlie/)

Note the convention: write the IP of your machine, followed by a tilda,
followed by your new user name.

The final step in this process is to give yourself permission to serve
up cgi files from your Linux box. As the user **ubuntu**, edit the
configuration for your available sites:

    nano /etc/apache2/sites-available/default

Insert the following code:

    <Directory /home/public_html/cgi-bin/> Options ExecCGI SetHandler cgi-script</Directory>

Then restart the web server

    sudo service apache2 restart

I know that editing a file like default can be intimidating. To help you
out, I have placed a valid copy of default in the zip file that
accompanies this assignment.

Moving Your Website
-------------------

This stage is by far the easiest. If you have been doing all your work
on your home machine, then you have a complete copy of your web site on
your home machine. Simply set up Filezilla to allow you to copy files
directly from your home machine to the **public\_html** directory in
your new home folder. Please note that your user name in the Filezilla
site manager should no longer be set to **ubuntu**. Instead, it should
be set or your new user name, ie **jsmith**.

Tips
----

-   [http://httpd.apache.org/docs/2.4/howto/public\_html.html](http://httpd.apache.org/docs/2.4/howto/public_html.html)

Convert CRLF to LF (Windows to Unix) {#crlf}
------------------------------------

There is a well known file called
**[crlf.py](http://www.koders.com/python/fid68815951399939A2E330DB6FDFB172ABE455050E.aspx?s=mdef%3Apython)**
that ships with most distributions of Python. You can use it to convert
Windows CRLF line endings to Linux style line endings (LF) and vice
versa. It looks something like this:

~~~~ {.code}
#! /usr/bin/env python
"Replace CRLF with LF in argument files.  Print names of changed files."

import sys, os

def main():
    for filename in sys.argv[1:]:
        if os.path.isdir(filename):
            print filename, "Directory!"
            continue
        data = open(filename, "rb").read()
        if '\0' in data:
            print filename, "Binary!"
            continue
        newdata = data.replace("\r\n", "\n")
        if newdata != data:
            print filename
            f = open(filename, "wb")
            f.write(newdata)
            f.close()

if __name__ == '__main__':
    main()
~~~~

Copy file to an Apache Web Site {#setup}
-------------------------------

The following (unnecessarily complex and half completed) script is
designed to help you copy files from your home directory to the /var/www
and /usr/lib/cgi-bin directories. It could serve as a starting point for
someone interested in this kind of thing.

~~~~ {.code}
#!/bin/bash

# ---------------------------------------------------
# Copy files from a local directory to your web site.
# for instance this script can help you copy files:
#   * from /home/user/temp/site to these directories
#   *   /var/www/site
#   *   /usr/lib/cgi/bin
# You need to set the variables called DIRECTORY and DESTDIR
#   DIRECTORY: A directory relative to your current directory
#   DESTDIR: A directory relative to your /var/www and /usr/lib/cgi-bin
#
# The files in DIRECTORY should be placed in two subdirectories:
#   *  /html
#   *  /cgi-bin
# The first should contain all your HTML files
# The second should contain all your Python scripts
# This script will handle copying subdirectories of html and cgi-bin
#
# This script assumes the standard crlf.py script is on your path.
# ---------------------------------------------------

# DIRECTORY: Name of the folder that holds the site you want to deploy
DIRECTORY="site"

# DESTDIR: The folder where you want to place files relative to
#    * /var/www
#    * /usr/lib/cgi-bin
DESTDIR="chords"
DIRECTORY_CGI=$DIRECTORY/cgi-bin
DIRECTORY_HTML=$DIRECTORY/html

HTMLDIR="/var/www"
CGIDIR="/usr/lib/cgi-bin"
HTMLDEST=$HTMLDIR/$DESTDIR/
CGIDEST=$CGIDIR/$DESTDIR/

echo "HTML Destination = " $HTMLDEST
echo "CGI Destination = " $CGIDEST
# echo "Zip files = " $1

dirCopy()
{
    echo "DirStuff Called"
    if [ -d $2 ]; then
        echo "Copying files to: " $2
        sudo cp -R $1/. $2/.
    else
        echo "No " $2
    fi
}

dirMake()
{
    if [ -d $1 ]; then
        echo $1 "exists. We will remove it"
        sudo rm -R $1
    fi

    echo "Creating " $1
    sudo mkdir $1   
}

unzipFiles()
{
    echo "Directory = " $1

    if [ -d $1 ]; then
        echo "removing existing directory: " $1
        rm -R $DIRECTORY
    fi

    unzip $2
}

# Unzip our zip file
# unzipFiles $DIRECTORY $1

# Now we need to set up our destination directories
dirMake $HTMLDEST
dirMake $CGIDEST

# Now we copy files to our destination directories
dirCopy $DIRECTORY_HTML $HTMLDEST
dirCopy $DIRECTORY_CGI $CGIDEST
# And set up the permissions
find /usr/lib/cgi-bin/chords/ -type f -name *.py | xargs sudo chmod +x
find /usr/lib/cgi-bin/chords/ -type f | xargs sudo ~/bin/crlf.py
find /usr/lib/cgi-bin/chords/ -type f -name *.csv | xargs sudo chmod 666
find /usr/lib/cgi-bin/chords/ -type f -name *.txt | xargs sudo chmod 666
~~~~

Links
-----

-   [Apache FAQ](http://wiki.apache.org/httpd/FAQ)

 
