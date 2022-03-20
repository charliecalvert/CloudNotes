---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/mysql/linux-user-password.md
relativePath: elvenware/development/database/mysql/linux-user-password.md
title: Linux-user-password
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: linux-user-password.md
fileNameHTML: linux-user-password.html
---

<!-- toc -->
<!-- tocstop -->

﻿## Overview

Some tips on using passwords with MySQL on Linux and Windows.

## Changing Passwords

To change the root password, I usually use the mysqladmin program. This program should be generally available from any command prompt in Linux. In windows, you can usually find it someplace near here:

```code
[C:\Program Files\MySQL\MySQL Server 5.1\bin](file:///C:/Program%20Files/MySQL/MySQL%20Server%205.1/bin)>
```

To change the password, enter the following command to change the current password to the string 'bar':

```bash
mysqladmin.exe -u root -p password bar
```

After issuing the command you will be prompted for the current password.

To change the user password, try something like this:

```bash
mysql> use mydatabase;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> SET PASSWORD for 'charlie'@'%'=PASSWORD('bar');
Query OK, 0 rows affected (0.00 sec)

mysql> SET PASSWORD for 'charlie'@'localhost'=PASSWORD('bar');
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;</pre>
```

## MySQL User Names and Passwords on Linux

Here is how to set the password for root:

mysqladmin -u root password new_password

Then sign on to the mysql monitor by typing the following:

```bash
mysql mysql --user=root --password=mypassword
```

Add at least one user, granting them super user privilege:

mysql> GRANT ALL PRIVILEGES ON *.* TO ccalvert@localhost

To see if things are working, type the following at the command prompt:

        mysqlshow -p

The -p at the end of the command asks the system to prompt you for a password. What you will get back is a list of available databases on the system. A virgin system would show test and mysql as existing databases. More details about this process are explained in the help for MySQL in section <a name="Default_privileges"><span style="color:#003366">4.3.4 Setting Up the Initial MySQL Privileges</span></a>.
