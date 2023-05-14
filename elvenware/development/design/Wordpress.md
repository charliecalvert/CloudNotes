---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design/Wordpress.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design
fileName: Wordpress.md
relativePath: /design/Wordpress.md
title: Wordpress
directoryName: design
category : cssguide-guide
---

## Overview

Learn about WordPress.

## Installation on Linux

There are good [instructions](http://codex.wordpress.org/Installing_WordPress) on how to install Wordpress on Linux.

The simplest way to get started is to install Ubuntu Server. During the install, you will have a chance to install the LAMP stack. This means you will have Apache2, MySQL and PHP/Python installed by default.

After you have installed the LINUX server, log into MySQL:


```bash
charlie@Whitecap:/etc/ssh$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 39
Server version: 5.1.58-1ubuntu1 (Ubuntu)
```

Then you should create a database called **wordpress**:

```sql
mysql> create DATABASE wordpress;
Query OK, 1 row affected (0.00 sec)
```

Now show the database:

```code
mysql> show databases;
+--------------------+
| Database |
+--------------------+
| information_schema |
| mysql |
| wordpress |
+--------------------+
3 rows in set (0.00 sec)
```

To check your work, install myphpadmin:

```bash
sudo apt-get install phpmyadmin
```

Now you need to install Wordpress:

```bash
sudo apt-get install wordpress php5-gd
```

```bash
sudo ln -s /usr/share/wordpress /var/www/wordpress
```
