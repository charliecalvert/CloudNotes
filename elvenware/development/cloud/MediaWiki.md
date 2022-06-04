---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/MediaWiki.md
relativePath: elvenware/development/cloud/MediaWiki.md
title: MediaWiki
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: MediaWiki.md
fileNameHTML: MediaWiki.html
image: ./course/course-javascript.jpg
subject: cloud
queryPath: elvenware/development/cloud/
---

<!-- toc -->
<!-- tocstop -->

MediaWiki
=========

This page is dedicated to explaining the MediaWiki software package.

## What is MediaWiki

MediaWiki is an open source, free software package that allows you to
create your own, personal, customized wikis. A wiki is a web site that
can be edited by its users. The web site is generally a repository of
information on some topic or set of topics. The users who edit the web
site work to contribute additional information to the site. They also
edit each other's work, and strive to make the entries in the wiki as
factual as possible.

The word wiki is Hawian, and it means "quick." Therefore the idea behind
software like WikiMedia is to create a web site where information can be
posted, edited, and viewed quickly and easily. MediaWiki is the same
software used to power the popular Wikipedia site. It is therefore one
of the most commonly used pieces of software in the entire world.

When you install MediaWiki, you are using the same software that drives
the Wikipedia. You can use it, however, not to create an encyclopedia,
but to create a repository of information on any subject you deem
appropriate.

### What Kinds of Wiki Sites Exist?

One quick way to begin to get a feeling for MediaWiki is to go to the
[WikiMedia.org](http://www.wikimedia.org/) web site. The
[MediaWiki](http://www.mediawiki.org/wiki/MediaWiki) site is just one of
the projects you will find on that page. Others include:

-   [Wiktionary](http://www.wiktionary.org/) - A dictionary
-   [Wikiquote](http://en.wikiquote.org/wiki/Main_Page) - A collection
    of quotes
-   [WikiBooks](http://en.wikibooks.org/wiki/Main_Page) - A collection
    of editable books
-   WikiSource
-   [WikiNews](http://en.wikinews.org/wiki/Main_Page) - You write the
    news
-   Wikiversity
-   WikiSpecides
-   WikiMedia MetaWiki, WikiMedia Commons nd WikiMedia Incubator

As you can see, the same piece of software can be put to many different
uses. But this is only a very tiny fraction of the sites that use
MediaWiki. Below is a link to a page with a more comprehensive list of
sites. It shows that there are hundreds, if not thousands of sites that
use MediaWiki, though I find that many, though by no means all, the
sites are no longer active:

[http://www.mediawiki.org/wiki/Sites\_using\_MediaWiki/en](http://www.mediawiki.org/wiki/Sites_using_MediaWiki/en)

Frequently a privately owned compay will download the WikiMedia software
and create a wiki on one or more of the their products.

## Easy MediaWiki Install

-   sudo apt-get install mediawiki

Optionally, and if you have a large amount of disk space (4 GB free?)
install the following:

-   sudo apt-get install imagemagick mediawiki-math php5-gd

We then need to edit apache.conf, removing the \# from the line that
reads **Alias /mediawiki /var/lib/mediawiki**. After we edit the file,
restart apache:

-   sudo nano /etc/mediawiki/apache.conf
-   sudo /etc/init.d/apache2 restart

Here is what the restart might look like on your system:

[![Apache restart
image](images/ApacheRestart-Small.png)](images/ApacheRestart.png)

**Figure 0X: Restarting apache. Since we have not [set the server
name](http://stackoverflow.com/questions/9541460/httpd-could-not-reliably-determine-the-servers-fully-qualified-domain-name-us),
the warning is what you should expect, and is not harmful. (Click image
to expand.)**

Now start MediaWiki:
[http://localhost/mediawiki](http://localhost/mediawiki)

At this stage, MediaWiki will not be fully installed, but you should be
able to something in the browser like that shown in this screen-shot:

![Media Wiki Initial Install Screen](images/MediaWiki03.png)

If everything is working, skip from here to the [Web Setup
Portion](#installWeb) of this document. Otherwise, try again, or read
the Manul Install section.

Manual MediaWiki Install
------------------------

If the easy-install shown above does not work for you, then you can try
this more detailed install process. Download MediaWiki from this site:

``` {.code}
http://www.mediawiki.org/wiki/MediaWiki
```

The official installation guide can be found here:

``` {.code}
http://www.mediawiki.org/wiki/Installation
```

Configuration tips and tricks can be found here:

``` {.code}
http://www.mediawiki.org/wiki/Manual:Configuration
```

### Key Links:

-   [https://help.ubuntu.com/community/ApacheMySQLPHP](https://help.ubuntu.com/community/ApacheMySQLPHP)
-   [https://help.ubuntu.com/11.10/serverguide/C/lamp-overview.html](https://help.ubuntu.com/11.10/serverguide/C/lamp-overview.html)
-   [https://help.ubuntu.com/11.04/serverguide/C/mediawiki.html](https://help.ubuntu.com/11.04/serverguide/C/mediawiki.html)

### Overview of Install

``` {.code}
$ tar xvzf mediawiki-1.18.1.tar.gz
```

``` {.code}
$ sudo mv mediawiki-1.18.1 /var/www/mediawiki
$ cd /var/www/mediawiki/
$ chmod 777 mw-config
```

### Set up the Database

This step is optional, as the scripts run in the Web Setup Portion
should do this for you automatically. Nevertheless, it is perhaps useful
to undersand how to create a database of the type that MediaWiki uses to
store data. In this example, we create the database itself, but not the
tables that populate it.

``` {.code}
charlie@WesternSea:/var/www/mediawiki$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 74
Server version: 5.1.58-1ubuntu1 (Ubuntu)

Copyright (c) 2000, 2010, Oracle and/or its affiliates. All rights reserved.
This software comes with ABSOLUTELY NO WARRANTY. This is free software,
and you are welcome to modify and redistribute it under the GPL v2 license

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| charlie_test       |
| mysql              |
| phpmyadmin         |
| script_child       |
| wordpress          |
+--------------------+
6 rows in set (0.08 sec)

mysql> create database mediawiki;
Query OK, 1 row affected (0.05 sec)

mysql> grant index, create, select, insert, update, delete, alter, lock tables on wikidb.* to 'wikiuser'@'localhost' identified by 'bar';
Query OK, 0 rows affected (0.00 sec)

mysql>
```

MediaWiki-Web-Setup
-------------------

Now it is time for the Web portion of the install. It is during this
stage that you configure MediaWiki to support the database, and
features, that you want it to use. To begin this process, you typically
browse to **[http://localhost/mediawiki](http://localhost/mediawiki)**.
You might, however, type in the name of another server besides
localhost, depending on where you performed the portion of the install
outlined in the previous section. When you browse to that page, you will
see something like what is shown in Figure 01.

![Media Wiki Initial Install Screen](images/MediaWiki03.png)

**Figure 01: Click the "set up the wiki" link to begin the core steps in
configuring your Wiki.**

When performing the install, one of the most important steps is the
last, when you copy a file called **LocalSettings.php** from you local
machine to your MediaWiki installation. This file is created during the
install process, and is handed to you as the last step in the install. I
typically save it into **/home/$USER/Downloads**. It contains all the
settings you specified when you ran the installatation. Here is the
command I gave to copy to the LocalSettings file to its proper location.
There is a built-in symlink that goes from
**/etc/mediawiki/LocalSettings.php** to
**/var/lib/mediawiki/LocalSettings.php**.

``` {.code}
sudo cp /home/charlie/Downloads/LocalSettings.php /etc/mediawiki/.
```

It is also possible that LocalSettings.php was saved automatically to
some location on your system, probably /etc/mediawiki/config. If this
happens, you will see a note at the end of the install to this effect.
Please note the exact location where LocalSettings is stored as reported
by the install application. You can then copy the from there, instead of
from your downloads directory. Depending on where the file is placed on
your system, it might look something like this:

``` {.code}
sudo cp /etc/mediawiki/config/LocalSettings.php /etc/mediawiki/.
```

Or on some systems, it might be this:

``` {.code}
sudo mv /var/lib/mediawiki/config/LocalSettings.php /etc/mediawiki/.
```

If you are in on the Mac or a Linux box, and you need to copy your
LocalSettings.php to EC2 or some other remote location, you can do
something like this. From your local machine, copy the file to the
remote machine using SSH secure copy (scp):

``` {.code}
scp LocalSettings.php ubuntu@XX.XX.XX.XX:/home/ubuntu/.
```

You should change XX.XX.XX.XX to the IP address or URL of your remote
server. Then sign back on to EC2 and copy:

``` {.code}
sudo cp /home/ubuntu/LocalSettings.php /etc/mediawiki/.
```

When the software is fully installed, it might looking something like
the image shown in Figure 02.

[![Screenshot of the fully install MediaWiki
software](images/MediaWiki01Small.png)](images/MediaWiki01.png)

**Figure 02: Screenshot of the fully install MediaWiki software. Click
to enlarge.**

MediaWiki Extensions
--------------------

If you want the extensions, then install them with this command:

``` {.code}
sudo apt-get install mediawiki-extensions
```

Then edit **/etc/mediawiki/LocalSettings.php** and add the following
line at the very end of the document:

``` {.code}
    require_once("extensions/Poem/Poem.php");
```

You may also need to restart apache:

``` {.code}
    sudo /etc/init.d/apache2 restart
```

Now you should be able to format poems with the poem tag:

``` {.code}
<poem>
Here is my poem.
</poem>
```

You will find other extensions you might want to use in:

``` {.code}
    /var/lib/mediawiki/extensions
```

**Note**: The extensions are all symbolic links. There are some notes
I've found on the web that imply that the extensions folders must be
symbolic links?

``` {.code}
Poem -\> /usr/share/mediawiki-extensions/base/Poem
```

If the links did not already exist, and they do exist after you install
the mediawiki-extensions, you could create them like this:

``` {.code}
sudo ln -s /usr/share/mediawiki-extensions/base/Poem /var/lib/mediawiki/extensions/Poem
```

There are hundreds of extensions to MediaWiki:

-   [http://www.mediawiki.org/wiki/Category:Stable\_extensions](http://www.mediawiki.org/wiki/Category:Stable_extensions)

Set up the Logo
---------------

You might want to change the logo seen in the upper left hand corner of
your screen. You should not try to edit the image found in:

``` {.code}
/var/lib/mediawiki/skins/common/images.
```

This file will be replaced when you update your system. Instead, place
the file that you want to use as a logo in the **images** directory, by
issuing a command that looks something like this:

``` {.code}
sudo cp /home/$USER/MyLogo.png /var/lib/mediawiki/images/.
```

Then use an editor like**nano** or **vi** to edit **LocalSettings.php**
and set the **$wgLogo** variable found on about line 38:

``` {.code}
sudo nano /etc/mediawiki/LocalSettings.php
```

The line you want to edit should end up looking something like this:

**$wgLogo="/mediawiki/images/MyLogo.png"**

Then go back to your copy of MediaWiki and press F5. You should see the
new logo as shown here:

![Mediawiki with logo](images/MediaWiki02.png)

Page Creation and Editing
-------------------------

You typically do not use HTML to format the pages in a Wiki. Instead,
you begin editing your page, and then use the simple wiki markup syntax
to format the text you place on your pages.

-   If you put two single quote marks are text it appears in ''italic'':
    *italic*
-   If you put two equal marks on each side of a word, it appears as a
    heading, level 2. Which is the equivalent of an H2 in HTML. For
    example: ==My Heading==.

The wiki markup syntax is designed for non-technical people. The easiest
way to learn the basics, is to study the
[reference](http://www.mediawiki.org/wiki/Help:Editing) on the mediawiki
site. Some of the more advanced issues are a bit tricky to use. For a
mix of simple and more advanced syntax, see these links:

-   [http://www.mediawiki.org/wiki/Help:Editing](http://www.mediawiki.org/wiki/Help:Editing)
-   [http://www.mediawiki.org/wiki/Help:Starting\_a\_new\_page](http://www.mediawiki.org/wiki/Help:Starting_a_new_page)
-   [http://www.mediawiki.org/wiki/Help:Formatting](http://www.mediawiki.org/wiki/Help:Formatting)
-   [http://www.mediawiki.org/wiki/Help:Links](http://www.mediawiki.org/wiki/Help:Links)
-   [http://www.mediawiki.org/wiki/Help:Images](http://www.mediawiki.org/wiki/Help:Images)
-   [http://www.mediawiki.org/wiki/Help:Tables](http://www.mediawiki.org/wiki/Help:Tables)
-   [http://www.mediawiki.org/wiki/Help:Templates](http://www.mediawiki.org/wiki/Help:Templates)
-   [http://www.mediawiki.org/wiki/Help:Variables](http://www.mediawiki.org/wiki/Help:Variables)
-   [http://www.mediawiki.org/wiki/Help:Managing\_files](http://www.mediawiki.org/wiki/Help:Managing_files)
-   [http://www.mediawiki.org/wiki/Help:Deleting\_a\_page](http://www.mediawiki.org/wiki/Help:Deleting_a_page)
-   [http://www.mediawiki.org/wiki/Help:Categories](http://www.mediawiki.org/wiki/Help:Categories)

Links
-----

-   [MediaWiki FAQ](http://www.mediawiki.org/wiki/Manual:FAQ)
-   [Learning European Languages -
    Spanish](http://en.wikibooks.org/wiki/Subject:Languages_of_Europe)
