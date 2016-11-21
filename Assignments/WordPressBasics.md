## Overview

Learn WordPress basics.

## Get Started

Get WordPress as a gzipped tar file and decompress it.

```
cd ~/temp
wget https://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz
```

## Set up WordPress Directory

Make your own copy of the WordPress config file and set the permissions for the WordPress content directory. Later you may want to tighten these permissions, but it is simplest to make it possible to write to these directories during development.

```
cd wordpress
cp wp-config-sample.php wp-config.php
sudo chown -R www-data:www-data wp-content/
cd ..
```

## Set Up WordPress Database

There are a number of ways to create the **wordpress** datbase in MySQL. The simplest might be to run a few lines that lines that let you manipulate the database without ever having to launch the **mysql** front end. Note however, that you might need to specify a particular user other than **root** and a particular password orther than **foobar**:

```bash
mysql -u root -p -e 'create database wordpress;'
mysql -u root -p -e 'GRANT ALL PRIVILEGES ON wordpress.* TO "root"@"localhost" IDENTIFIED BY "foobar";'
mysql -u root -p -e 'FLUSH PRIVILEGES;'
mysql -u root -p -e 'use wordpress; show grants for 'root'@'localhost';'
```

## WP Configuration

You will need to edit this section of **wp-config.php**:

```
/** The name of the database for WordPress */
define('DB_NAME', 'database_name_here');

/** MySQL database username */
define('DB_USER', 'username_here');

/** MySQL database password */
define('DB_PASSWORD', 'password_here');

/** MySQL hostname */
define('DB_HOST', 'localhost');
```

You will need to fill in the first three fields. We can leave DB_HOST at **localhost**, at least for now.

The following simple script can help you automate the process, though you may need to change the DATA_OWNER and DATA_PASSWORD. Run the script from the WordPress directory. That is, run it from the same directory where **wp-config.php** is located.

```
#! /bin/bash

WORDPRESS_DIR=wordpress
WORDPRESS_DATA_OWNER=root
WORDPRESS_DATA_PASSWORD=foobar

sed -i -- 's/database_name_here/'$WORDPRESS_DIR'/' wp-config.php
sed -i -- 's/username_here/'$WORDPRESS_DATA_OWNER'/' wp-config.php
sed -i -- 's/password_here/'$WORDPRESS_DATA_PASSWORD'/' wp-config.php
```

## Run WordPress

Move the WordPress folder to **/var/www/html**:

  mv $WORDPRESS_DIR /var/www/html/.

Browse to **http://localhost/wordpress/wp-admin**

Or if you did the setup on a remote machine then do something like this:

<pre>
http://192.168.2.17/wordpress/wp-admin
</pre>

I think it is fairly obvious how to step through the single configuration page you see when you first load the admin page. After you fill out the simple form, then begin editing your WordPress posts.

## EC2

Now that you have it running locally, let's move the whole thing to EC2

## Turn it in

Send me the URL that points to your instance of WordPress running on EC2.

## Hints

Very out of date information is here:

- [WordPress on Elvenware][elf-wordpress]

[elf-wordpress]: http://www.elvenware.com/charlie/development/cloud/Wordpress.html
