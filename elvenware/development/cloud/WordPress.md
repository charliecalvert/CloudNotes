---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/cloud/WordPress.md
relativePath: elvenware/development/cloud/WordPress.md
title: WordPress
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: WordPress.md
fileNameHTML: WordPress.html
---

<!-- toc -->
<!-- tocstop -->

## Overview

Learn how to install and use WordPress.

## Flavors

There are three different flavors of WordPress:

-   [WordPress.org](http://www.wordpress.org) (Download a free version, run on your server)
-   [WordPress.com](http://www.wordpress.com) (Hosted on the web)
    -   [Charlie's Blog on WordPress.com.](http://elvenware.wordpress.com/)
-   [WordPress MultiSite](http://codex.wordpress.org/Create_A_Network) -
    Like setting up your own version of WordPress.com
-   [Insert a Post with Code](#insertPost)

## Hosting Sites {#host}

You can rent a site that will host your instance of WordPress, as
described here:

``` {.code}
http://wordpress.org/hosting/
```

The sites listed at the above link are not your only options. Many sites
providing web hosting for third parties. If you build a site on one of
those platforms, you may well have the option of installing WordPress.

## Installation on Linux {#linuxInstall}

There are various places on the web where you can find
[instructions](http://codex.wordpress.org/Installing_WordPress) on how
to install Wordpress on Linux. I offer my own version of the primarily
automated install below.

### Install Linux

The simplest way to get started is to install Ubuntu Desktop. Though I
don't recommend it for beginners, you can choose the Ubuntu Server
instead. During the install of the server, you will have a chance to
[install](file:///J:/Web/Elvenware/charlie/development/database/mysql/MySql.html#installOnLinux)
the
[LAMP](https://help.ubuntu.com/11.10/serverguide/C/lamp-overview.html)
stack. This means you will have Apache2, MySQL and PHP/Python/Perl
installed by default. If you already have Ubuntu up and running, or if
you used the desktop version of Ubuntu, then you need to add LAMP
yourself. Here is a description of how to proceed:

[http://elvenware.com/charlie/development/database/mysql/MySql.html\#installOnLinux](http://www.elvenware.com/charlie/development/database/mysql/MySql.html#installOnLinux)

After you have installed the LINUX server, you need to install Wordpress:

     sudo apt-get install wordpress php5-gd

``` {.code}
sudo ln -s /usr/share/wordpress /var/www/wordpress
```

Next type the following to run a script that will install WordPress for
you:

``` {.code}
sudo bash /usr/share/doc/wordpress/examples/setup-mysql -n wordpress localhost
```

**NOTE**: If you are installing on server that has a known public DNS, then
you should put that public DNS in the place of localhost. For instance,
if I were creating this file for Elvenware, the last bit would look like
this .../setup-mysql -n wordpress elvenware.com. If you are working on
EC2, and you don't have domain name of your own, then you might write
something like this .../setup-mysql -n wordpress
ec2-16-67-000-00.compute-1.amazonaws.com, where the DNS is associated
with an elastic IP.

Due to a bug in the WordPress install script, you may get an unfound error on this
command:

``` {.code}
sudo bash /usr/share/doc/wordpress/examples/setup-mysql -n wordpress localhost
```

The problem is that sometimes the WordPress install script does not decompress
the setup-mysql script. To fix the problem, you need to unzip it yourself. In
particular, you can type the following command:

``` {.code}
gunzip /usr/share/doc/wordpress/examples/setup-mysql.gz
```

Altenatively:

``` {.code}
cd /user/shar/doc/wordpress/examples
gunzip setup-mysql.gz
```

Now you should go to <http://localhost/wordpress> and fill in the form
that appears in your browser.

[![Last step of the WordPress
install](images/Wordpress01Small.png)](images/Wordpress01.png)

**Figure 01: The last step of the WordPress install**

Now you can just browse to the following page to view your site:

``` {.code}
http://localhost/wordpress
```

And browse to this page to administer your site, and to begin adding in
new pages:

``` {.code}
http://localhost/wordpress/wp-admin
```

## Installing WordPress on AWS

Much of what is written here is summarized in this script: **JsObjects/Utilities/InstallScripts/WordPress**:

- JsObjects WordPress on GitHub: [http://bit.ly/wordpress-script](http://bit.ly/wordpress-script)

I had some trouble setting up WordPress on AWS when using an Elastic IP. I had to use the long form of the public DNS for the elastic IP. After install LAMP, I did this:

``` {.code}
sudo apt-get install wordpress php5-gd
sudo ln -s /usr/share/wordpress /var/www/wordpress
sudo bash /usr/share/doc/wordpress/examples/setup-mysql -n wordpress ec2-32-23-173-11.compute-1.amazonaws.com
```

Due to a bug in the WordPress install script, you may get an unfound error on this command:

``` {.code}
sudo bash /usr/share/doc/wordpress/examples/setup-mysql -n wordpress ec2-12-34-567-89.compute-1.amazonaws.com
```

The problem is that sometimes the WordPress install script does not decompress
the setup-mysql script. To fix the problem, you need to unzip it yourself. In
particular, you can type the following command:

``` {.code}
gunzip /usr/share/doc/wordpress/examples/setup-mysql.gz
```

Altenatively:

``` {.code}
cd /user/shar/doc/wordpress/examples
gunzip setup-mysql.gz
```

When you are done, try rerunning the command which gave the error. it should
work.

I found **ec2-23-23-170-11.compute-1.amazonaws.com** in the elastic ip
page of the EC2 console. It is also available on the Instances page at
the bottom, after you place a check mark before your running instance.
It may be slightly easier to block copy the address from the Instances
page.

[![WordPress get long form of public DNS for Elastic
IP](images/Wordpress03Small.png)](images/Wordpress03.png)

Figure 0X: When installing WordPress on AWS, get the long form of public
DNS for the Elastic IP. (Click to expand.)

## Setting up the Database Manually

```
cd ~/temp
wget https://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz
mysql -u root -p -e 'create database wordpress;'
mysql -u root -p -e 'GRANT ALL PRIVILEGES ON wordpress.* TO "root"@"localhost" IDENTIFIED BY "foobar";'
mysql -u root -p -e 'FLUSH PRIVILEGES;'
mysql -u root -p -e 'use wordpress; show grants for 'root'@'localhost';'
```


Sometimes it is nice not to run the automatic install shown above, but
instead to get one's hands dirty and handle at least parts of the
install yourself. This gives you more control, and a better
understanding, of how WordPress works.

To get started, ,ake sure you can log into the mysql tool:

``` {.code}
$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 39
Server version: 5.1.58-1ubuntu1 (Ubuntu)
```

Now create a database called **wordpress**:

    mysql> create DATABASE wordpress;
    Query OK, 1 row affected (0.00 sec)

    mysql> show databases;
    +--------------------+
    | Database |
    +--------------------+
    | information_schema |
    | mysql |
    | wordpress |
    +--------------------+
    3 rows in set (0.00 sec)

To check your work with a GUI based interface to MySQL, install
myphpadmin. To install this handy database adminstration tool on Linux
just issue this command:

``` {.code}
sudo apt-get install phpmyadmin
```

For more details, or for the Windows install of phpmyadmin, go to the
PHP page:

[http://www.elvenware.com/charlie/development/web/Php/\#phpmyadmin](http://www.elvenware.com/charlie/development/web/Php/#phpmyadmin)

```
$ mysql -u adminusername -p
CREATE DATABASE wordpress;

GRANT ALL PRIVILEGES ON wordpress.* TO "wordpressusername"@"hostname" IDENTIFIED BY "password";

FLUSH PRIVILEGES;

exit

```

## Understanding wp-config.php {#wpConfig}


Perhaps no part of the WordPress install is more important than properly
configuring wp-config.php. This file is stored in the root of your
WordPress site. This file is set up for you automatically during the
install; nevertheless, it is important that you understand at least the
core portions of this file. In particular, you should open up your copy
of this file and find this section:

``` {.code}
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'userName');

/** MySQL database password */
define('DB_PASSWORD', 'password');

/** MySQL hostname */
define('DB_HOST', 'localhost');
```

Here is where you define your database name, your user name, your
password, and your host site. Where I have typed in **userName,** you
should type in your user name, such as Lisa, Jerry or Miguel. You should
also type in your custom password. It is typical, but by no means
mandatory, to create a database named wordpress and to host your first
site on your localhost.

## Moving WordPress {#moving}

 My web hosts does not give me root access to my site, so I was at first
unclear how to set up this site. I ended up setting it up on Windows,
using the Microsoft Web Platform Installer, which automated the entire
process. I then simply copied the site over to Elvenware using SFTP. I
set up a MySQL database on Elvenware, edited the wp-config.php file,
then browsed to my admin site for the blog. It asked me to set up the
site, which meant in this case that it would create the necessary tables
in the database for me. I had to fill in a few simple fields, and then I
was up and running.

After I moved my WordPress site from a local machine to my web host, I
found I had put it in the wrong folder. The problem is that the folder I
placed WordPress in becomes, by default, part of the URL to my blog:

[http://www.elvenware.com/charlie/elvenblog](http://www.elvenware.com/charlie/elvenblog)

My initial mistake was to put the project in a folder called
**wordpress**, when I wanted to have it in a folder called
**elvenblog**. So how did I make the change? It turned out to be a two
step process:

-   I needed to change a table called wp\_options, where there was a row
    that defined the url for my site
-   In particular, there was a row in which a field called option\_name
    was set to the option\_value of
    [http://www.elvenware.com/charlie/wordpress](http://www.elvenware.com/charlie/wordpress).
    I need to change that URL.

It turns out that this change was fairly easy to make using a tool
called PhpMyAdmin. That tool automated the process for me, but it did
display the actual SQL created to perform the update, which looks like
this:

``` {.code}
UPDATE `MyWordPressDatabase`.`wp_options` SET `option_value` = 'ElvenBlog' WHERE `wp_options`.`option_id` =4 LIMIT 1 ;
```

Having completed this task, however, I found I was not quite done yet. I
could browse my site and use wp-admin, but some of the minor features,
such as comments, were not working correctly, in that they kept trying
to access .../charlie/wordpress rather than .../charlie/elvenblog. To
fix this, signed into to wp-admin, and went to the Settings page. On
that page I changed the **Site Address**, so that both the **WordPress**
address and **Site Address** read:

``` {.code}
http://www.elvenware.com/charlie/elvenblog.
```

After making that change, comments on my blog posts started working
again. (It is posssible that I could also have simply left the Site
Address field blank, but I have not yet tried that experiment.)

Here is a link that can help you understand more about this subject, and
how to handle some special cases I don't cover here.

``` {.code}
http://codex.wordpress.org/Moving_WordPress
```

## No CSS {#no-css}

If you have been accessing a site through **localhost**, and then you try to access it from another machine, you may see the text for your site but not the CSS. To fix this:

- Go to Settings (General Settings)
- Find the **WordPress Address (URL)** and **Site Address (URL)**
- Set them both to the proper address for your site.
  - For instance, change them from localhost to an IP address
  - Or from localhost to a domain name
  - Be sure to include the http part, and don't put a slash at the end.

## Editing with WordPress {#edit}

There are various bits of markup you can use to help you edit the
documents you create.

-   [Writing and
    Editing](http://en.support.wordpress.com/category/writing-editing/)
-   [Using Word as an
    Editor](http://en.support.wordpress.com/microsoft-word/)
-   [Source
    Code](http://en.support.wordpress.com/code/posting-source-code/)
-   [Post over the
    Phone](http://en.support.wordpress.com/post-by-voice/)

## Customization {#customize}

-   [Customize
    Appearance](http://en.support.wordpress.com/category/appearance/)

## Insert a Post with Code {#insertPost}

Use the wp\_insert\_post method:

[http://codex.wordpress.org/Function\_Reference/wp\_insert\_post](http://codex.wordpress.org/Function_Reference/wp_insert_post)
