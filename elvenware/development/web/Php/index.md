---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Php/index.md
relativePath: elvenware/development/web/Php/index.md
title: Index
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

<div id="container">

## Overview

- [Getting Started](GettingStarted.html)
- [Basic Database](BasicDatabase.html)

## In this Document

- [Windows Install](#winInstall)
- [Linux: Set Up PHP for User Directories](#linuxSetup)
- [PhpMyAdmin](#phpmyadmin)
- [PHP Database Work](BasicDatabase.html)

PHP is a scripting language used primarily on the web. Unlike
JavaScript, PHP always runs on the server. The browser never sees your
PHP script. Instead, the web server passes PHP files to the PHP
compiler, and it produces HTML or XML that the web server passes over
the Internet to your browser. The web server knows to pass a file to the
PHP compiler when that file has the extension PHP. Therefore all PHP
files have names like **MyFile.php**. These files are usually a
combination of normal HTML, with PHP script embedded inside them. Here
is a simple example:

``` {.code style="background-color: rgb(255, 255, 255); border-top-style: double; border-right-style: double; border-bottom-style: double; border-left-style: double; font-size: 1em; overflow-x: auto; overflow-y: auto; color: rgb(0, 0, 0); font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: 2; text-align: -webkit-auto; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; "}
<html>
<head>
<title>Sample PHP File</title>
</head>
<body>

<?php
Print "This is PHP script";
?>

</body>
</html>
```

 Click here to run this script: [Simplest.php](simplest.php) 

Installing PHP on Windows {#winInstall}
-------------------------

Download [PHP](http://windows.php.net/download/). There is an automated
install.

If you want to do it by hand, then download the zip file rather than the
automated msi. On the [FAQ](http://www.php.net/FAQ.php) page click
[Installation](http://www.php.net/manual/en/faq.installation.php) and go
to the[Installation and
Configuration](http://www.php.net/manual/en/install.php) page and from
there to the [Manual
Installation](http://www.php.net/manual/en/install.windows.manual.php)
page. They explain that you should unzip your download file into a
directory, typically off your root: [j:\\php](file:///j:/php). Copy
**php.ini-production** to **php.ini** and open it in an editor. There
are a set of required directives that you need to configure. Just go
through them patiently, one at a time. It is not so bad. Next, go
through the [steps to get PHP working in
IIS](http://www.php.net/manual/en/install.windows.iis7.php).

Linux: Setting up PHP for User Directories {#linuxSetup}
------------------------------------------

Unlike Python files, you do not need to put PHP files in a specific
directory, such as[ ]{.Apple-converted-space}**cgi-bin**. If you want to
run a PHP file out of **/var/www**, you need only copy the file to that
location, and supply a link to it. Unfortunately, things are not quite
so simple when working out of user directories such as a
**/home/\$USER/public\_html** directory.

[ To get started setting up user directories, place your PHP file in
the[ ]{.Apple-converted-space}**public\_html**[ ]{.Apple-converted-space}directory
or one of its subdirectories. Create a link to it so the user can find
the page. So much for the preliminaries.]{}

[ In addition, we have to turn on support for PHP in user directories.
This is necessary because PHP is a programming language, and can be
dangerous in the wrong hands. In other words, you don't want just any
user on a machine to run PHP files. In some cases, however, we are the
only user on the system, so we can safely turn on PHP support for
everyone who logs on to the system. ]{}

To turn on PHP support for user directories, go
into[ ]{.Apple-converted-space}**/etc/apache2/mods-enabled**[ ]{.Apple-converted-space}and
find[ ]{.Apple-converted-space}**php5.conf**. Comment out the lines that
turn off the PHP engine by putting a \# sign in front of them. In
particular, you will need to comment out five lines of code, as shown
here in bold:

``` {.code}
# To re-enable php in user directories comment the following lines
# (from <IfModule ...> to </IfModule>.) Do NOT set it to On as it
# prevents .htaccess files from disabling it.
# <IfModule mod_userdir.c>
# <Directory /home/*/public_html>
#   php_admin_value engine Off
#   </Directory>
# </IfModule>
```

If you want to turn off support for a particular user, you can supply
their name rather than the wild card (\*). After you comment out these
lines, then you will be able to run PHP scripts from
your[ ]{.Apple-converted-space}**public\_html**[ ]{.Apple-converted-space}directory. 

First Moves {#firstMoves}
-----------

After installing PHP, you can go to the [Getting Started
page](GettingStarted.html) to learn a few simple facts about how to work
with a PHP script. Also look at the [PHP Database
page](BasicDatabase.html).

-   <http://www.elvenware.com/charlie/development/web/Php/GettingStarted.html>
-   <http://www.elvenware.com/charlie/development/web/Php/BasicDatabase.html>

PHP In Action
-------------

Click here to run a [PHP Script](sample.php)

The following script should also run correctly on the Elvenware site:
[Presidents01.php](Presidents01.php).

PhpMyAdmin
----------

You will probably find it helpful to install PhpMyAdmin, as it can help
you create databases, create tables, create users, grant permissions,
query tables, and even edit tables.

The simplest way to install the product is on Linux with apt-get:

``` {.code}
sudo apt-get install phpmyadmin
```

The manual install for this product is perhaps a bit convoluted, but
most of it will go okay if you have a bit of luck or gain some
experience. You need to download the files [from their
site](http://www.phpmyadmin.net/home_page/downloads.php) at
<http://phpmyadmin.net>, then unzip the file and copy its contents to
your web server. You can then follow the Quick Install instructions from
their wikie site:

``` {.code}
http://wiki.phpmyadmin.net/pma/Quick_Install
```

The essence of it is to create a folder called **config** in the
phpMyAdmin directory. (On Linux, chmod o+rw config) Then copy the sample
**config.inc.php** file from the phpMyAmdin folder into that directory.
(On Linux, chmod o+w config.inc.php.) Now use your browser to browse to
that location, which might look something like this:

``` {.code}
http://localhost/myphpadmin/config
```

Spend some time setting up a few features in the nice tools you find on
this page in your browser. When you are done, save your work, download
the new config.inc.php file using the supplied tools and save it in the
phpMyAdmin folder. Finally, delete your config folder. Then browse to
your myphpadmin folder:

``` {.code}
http://localhost/myphpadmin
```

You might have two problems. One looks like this:

``` {.code}
The mcrypt extension is missing. Please check your PHP configuration.
```

You may see a red error about mcrypt. If you are on Windows and have PHP
5.2 or later, you will find a file called **php\_mcrypt.dll** in the
**ext** folder where php is installed. Go up one folder closer to the
root, where is the base PHP folder, and you will find php.ini. Near the
very bottom of the file, you will find the ExtensionList. Add this line
to the extensions already listed:

``` {.code}
extension=php_mcrypt.dll
```

You may also get an error about various extensions not working. To fix
that, open the config.inc.php file and make sure these lines are
included:

``` {.code}
$cfg['Servers'][$i]['pmadb'] = 'phpmyadmin';
$cfg['Servers'][$i]['bookmarktable'] = 'pma_bookmark';
$cfg['Servers'][$i]['relation'] = 'pma_relation';
$cfg['Servers'][$i]['userconfig'] = 'pma_userconfig';
$cfg['Servers'][$i]['table_info'] = 'pma_table_info';
$cfg['Servers'][$i]['column_info'] = 'pma_column_info';
$cfg['Servers'][$i]['history'] = 'pma_history';
$cfg['Servers'][$i]['tracking'] = 'pma_tracking';
$cfg['Servers'][$i]['table_coords'] = 'pma_table_coords';
$cfg['Servers'][$i]['pdf_pages'] = 'pma_pdf_pages';
$cfg['Servers'][$i]['designer_coords'] = 'pma_designer_coords';
$cfg['Servers'][$i]['controluser'] = 'pma';
$cfg['Servers'][$i]['controlpass'] = 'password';
```

You also have a user called pma who has full permissions on a database
called phpmyadmin that has the tables listed above in it. Go to the
scripts directory in phpmyadmin to find a SQL script that will create
all these tables for you. Use the scripts on this page to create the
user and grant them permissions:

<http://wiki.phpmyadmin.net/pma/control_user>

For instance:

``` {.code}
GRANT USAGE ON mysql.* TO 'pma'@'localhost' IDENTIFIED BY 'pmapass';
GRANT SELECT (
    Host, User, Select_priv, Insert_priv, Update_priv, Delete_priv,
    Create_priv, Drop_priv, Reload_priv, Shutdown_priv, Process_priv,
    File_priv, Grant_priv, References_priv, Index_priv, Alter_priv,
    Show_db_priv, Super_priv, Create_tmp_table_priv, Lock_tables_priv,
    Execute_priv, Repl_slave_priv, Repl_client_priv
    ) ON mysql.user TO 'pma'@'localhost';
GRANT SELECT ON mysql.db TO 'pma'@'localhost';
GRANT SELECT ON mysql.host TO 'pma'@'localhost';
GRANT SELECT (Host, Db, User, Table_name, Table_priv, Column_priv)
    ON mysql.tables_priv TO 'pma'@'localhost';
```

Also do this:

``` {.code}
GRANT SELECT, INSERT, UPDATE, DELETE ON phpmyadmin.* TO 'pma'@'localhost';
```

Be sure to edit the config.inc.php page and set up the controluser name
and password. Once you have done everthing, exit your browser and then
reload it and go back to the phpmyadmin page.

Links
-----

-   [Control User](http://wiki.phpmyadmin.net/pma/control_user)
-   [Cannot Load
    MCrypt](http://hermawanpurwanto.wordpress.com/2007/08/12/cannot-load-mcrypt-extension-please-check-your-php-configuration-solved/)

</div>
