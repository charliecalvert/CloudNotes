---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/design/MediaWiki.md
relativePath: elvenware/development/design/MediaWiki.md
title: MediaWiki
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: MediaWiki.md
fileNameHTML: MediaWiki.html
image: ./course/course-javascript.jpg
subject: design
queryPath: elvenware/development/design/
---

<!-- toc -->
<!-- tocstop -->

## Overview

Very old text on MediaWiki. Undoubtedly way out of date.

## Install

Some steps to get started:


```bash
$ tar xvzf mediawiki-1.18.1.tar.gz
```

Then move it to your Apache server and set the privileges for mw-config.

```bash
$ sudo mv mediawiki-1.18.1 /var/www/mediawiki
$ cd /var/www/mediawiki/
$ chmod 777 mw-config</pre>
```

## Set up the Database

```sql
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

## Web Setup Portion

Now it is time for the Web portion

![Media Wiki Initial Install Screen](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/MediaWiki.png)
