## Overview
-----

Learn about installing LAMP: Linux, Apache, MySQL, Python.

## Install on Windows

The MySQL site makes it look, at first, as if you have to pay to
download the product. This is not true. MySQL is an open source project.
For the download, try this
[page](http://www.mysql.com/downloads/installer/). Be sure you turn to
the Download tab, if you are not there already. You can also download it
using the Web Platform Installer from Microsoft.

- [http://www.mysql.com/downloads/installer/](http://www.mysql.com/downloads/installer/)

[![MySql Install Screen][mysql01sm]][mysql01]

[![My SQL Main Screen of Install][mysql02sm]][mysql02]

[mysql01]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/MySql01.png
[mysql01sm]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/MySql01Small.png
[mysql02]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/MySql02.png
[mysql02sm]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/charlie-images/development/MySql02Small.png

**Figure 02: My SQL Main Screen of Install (Click to enlarge.)**

When prompted, I choose to install the development server.

![Configuration screen for developer server](http://www.elvenware.com/charlie/images/development/MySql03Small.png)

**Figure 03: The configuration screen for the developer server.**

This may have been a glitch on my system, but during the install, a
blank command prompt type screen appeared labeled Python. This screen
appeared to hang for well over 5 minutes, perhaps closer to 10 minutes.
I put my cursor in the screen and pressed enter and it ran a script, and
the rest of the install went very quickly.

Is MySQL Running?
-----------------

[http://dev.mysql.com/doc/refman/5.1/en/windows-start-service.html](http://dev.mysql.com/doc/refman/5.1/en/windows-start-service.html)

MySQL WorkBench
---------------

MySQL Workbench is avilable on both Windows and on
[Linux](http://dev.mysql.com/downloads/workbench/#downloads). It has
replaced the now outdated My SQL Browser and its related tools.

[![Using MySql Workbench to query the default city
table](http://www.elvenware.com/charlie/images/development/MySql04Small.png)](http://www.elvenware.com/charlie/images/development/MySql04.png)

**Figure 04: Using MySql Workbench to query the default city table.
(Click to englarge)**

Here is how to set up MySQLWorkbench on Linux. Begin by ensurng the
prereqs are installed:

```
sudo apt-get install libctemplate0 libzip1 python-pysqlite2 mysql-client python-crypto python-paramiko
sudo apt-get install libgtkmm-2.4-1c2a
```

Then download the workbench:

-   [http://www.mysql.com/downloads/workbench/\#downloads](http://www.mysql.com/downloads/workbench/#downloads)
-   [https://help.ubuntu.com/community/MySqlWorkBench](https://help.ubuntu.com/community/MySqlWorkBench)

Finally, you are ready to install the file you downloaded:

```
sudo dpkg -i mysql-workbench-gpl-5.2.38-1ubu1104-i386.deb
```

After this it should be available as an item in your GUI menu for the
OS. 

Install LAMP on Linux {#installOnLinux}
---------------------

LAMP means: Linux, Apache, MySQL and Php/Python. So if you install this one "feature," you have everything you need to get to work.

```
sudo apt-get install tasksel
sudo tasksel install lamp-server
```

You might get an error saying: **tasksel: aptitude failed (100).** That might mean that your system is not up to date. To fix the problem, try the following:

```
sudo apt-get update
sudo apt-get upgrade
sudo tasksel install lamp-server
```

Probably only 1 and 3 are necessary, but there really is no reason you would not normally want to have a fully updated system, so issueing all three commands is best in most cases. The first command assures that you are pulling from the most recent sources, the second actually updates the programs and files on your system, and the third will, of course, install LAMP.

If you just want to install MySql and not the rest of LAMP:

```
sudo apt-get install mysql-server
```

These images might be helpful:

![One](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Lamp01.png)
![One](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Lamp02.png)
![One](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Lamp03.png)
![One](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Lamp04.png)


More details:

[https://help.ubuntu.com/8.04/serverguide/C/mysql.html](https://help.ubuntu.com/8.04/serverguide/C/mysql.html)

Use MySqlAdmin.
---------------

I explain a little about how to use MySqlAdmin on [the passwords
page](linux-user-password.html).

Logging in
----------

The text shown shown here and in many of the following listings are from the Linux command prompt. However, an install of MySQL on Windows also provides you with a command line tool called **mysql.exe**. The install should provide a link to it in the start menu, or try looking in a folder similar to this one:

```dos
C:\Program Files\MySQL\MySQL Server 5.1\bin>
```

Among the first things you will want to do is start **mysql**:

```bash
charlie@WesternSea:~$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 118
Server version: 5.1.58-1ubuntu1 (Ubuntu)

Copyright (c) 2000, 2010, Oracle and/or its affiliates. All rights reserved.
This software comes with ABSOLUTELY NO WARRANTY. This is free software,
and you are welcome to modify and redistribute it under the GPL v2 license

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

Just for the sake a clarity, the following shows that everything (except
the command line prompt) looks pretty much the same in Windows:

```dos
C:\Program Files\MySQL\MySQL Server 5.1\bin>mysql -u root -p
Enter password: ********
Welcome to the MySQL monitor. Commands end with ; or \g.
Your MySQL connection id is 7
Server version: 5.1.57-community MySQL Community Server (GPL)

Copyright (c) 2000, 2010, Oracle and/or its affiliates. All rights reserved.
This software comes with ABSOLUTELY NO WARRANTY. This is free software,
and you are welcome to modify and redistribute it under the GPL v2 license

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

Create a database {#createdatabase}
-----------------

Whether you are in Linux or Windows, you now want to create a database:

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| phpmyadmin         |
| wordpress          |
+--------------------+
4 rows in set (0.00 sec)

mysql> create database script_child

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| script_child       |
| mysql              |
| phpmyadmin         |
| wordpress          |
+--------------------+
5 rows in set (0.00 sec)
```

Create, Delete and Explore Users {#users}
--------------------------------

You can create a user with this command:

```sql
 CREATE USER 'charlie'@'localhost' IDENTIFIED BY 'xxx';
```

The IDENTIFIED BY bit is how you specify the password. So the password
in this case is 'xxx'.

To see the users you have created, enter the following command:

```sql
select host, user from mysql.user;
```

For instance, here is brief session showing how to see two of the many
fields in the **mysql.user**table. 

```sql
mysql> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> select host, user from user;
+------------+------------------+
| host       | user             |
+------------+------------------+
| 127.0.0.1  | root             |
| WesternSea | root             |
| localhost  | charlie          |
| localhost  | debian-sys-maint |
| localhost  | phpmyadmin       |
| localhost  | root             |
+------------+------------------+
6 rows in set (0.00 sec)

mysql>
```

For more details on the mysql.user table type **describe mysql.user**.

If you need to delete a user, the command looks like this:

```sql
drop user 'charlie'@'localhost';
```

Grant
-----

```sql
grant all privileges on script_child.* to 'charlie'@'localhost' with grant option;
Query OK, 0 rows affected (0.00 sec)
```

If the above does not work, try putting the database name in quotes:
'script\_child'.\* to etc.

What privileges does he have?

```sql
 show grants for 'charlie'@'localhost';
```

Change Password {#password}
---------------

To change the root or user password, see this page:

[linux-user-password.html](/charlie/development/database/mysql/linux-user-password.html)

Sign in as a User {#userSignIn}
-----------------

Use the following technique to check the password for your user on your
database. We normally sign in to MySQL like this:

```bash
mysql -u root -p
```

This signs you in as the MySQL administrator. But you can also sign in
as your user. You will have less rights, but sometimes it is a good way
to check the permissions for your user. Also, this is the experience
that others will have if you give them rights to act as a user, but not
as an administrator. For instance, my user in MySQL is charlie, so I can
sign into the database like this:

```bash
mysql -u charlie -p
```

I will then be prompted for my user password. If I don't have the user
set up right, then I won't be able to get into the database.

Here, for instance, is what failure looks like:

```bash
charlie@ip-10-195-152-218:~$ mysql -u charlie -pEnter password:ERROR 1045 (28000): Access denied for user 'charlie'@'localhost' (using password: YES)charlie@ip-10-195-122-228:~$
```

And here is success:

```bash
charlie@ip-10-195-152-218:~$ mysql -u charlie -pEnter password:Welcome to the MySQL monitor. Commands end with ; or \g.Your MySQL connection id is 850Server version: 5.5.28-0ubuntu0.12.04.2 (Ubuntu)
Copyright (c) 2000, 2012, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or itsaffiliates. Other names may be trademarks of their respectiveowners.
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql>
```

 

Create Table {#createtable}
------------

I will show two ways to create a table. Read the section below on
comparing the two techniques in order to understand which technique is
best for you. Here is the first technique:

```code
mysql> create table presidents (id int NOT NULL AUTO_INCREMENT, first varchar(128), last varchar(128), PRIMARY KEY (id));

mysql> describe presidents;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| first | varchar(128) | YES  |     | NULL    |                |
| last  | varchar(128) | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
3 rows in set (0.01 sec)
```

And here is a second technique:

```sql
mysql> create table presidents (id int, first varchar(128), last varchar(128));
Query OK, 0 rows affected (0.01 sec)

mysql> show tables;
+------------------------+
| Tables_in_script_child |
+------------------------+
| presidents             |
+------------------------+
1 row in set (0.00 sec)

mysql> alter table presidents add primary key (id);
Query OK, 0 rows affected (0.02 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

Here is another example of the first technique:

```sql
create table elvenpages (id int NOT NULL AUTO_INCREMENT, path varchar(128), folder varchar(128), PRIMARY KEY (id));
```

Show table structure:

```sql
mysql> describe presidents;
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| id    | int(11)      | NO   | PRI | 0       |       |
| first | varchar(128) | YES  |     | NULL    |       |
| last  | varchar(128) | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+
3 rows in set (0.00 sec)
```

Insert Data into Tables {#insert}
-----------------------

If you used the first technique from the previous section, write this:

```sql
mysql> insert into presidents (first, last) values ('George', 'Washington');
```

If you used the second technique, write this:

```sql
mysql> insert into presidents (id, first, last) values (1, 'George', 'Washington');
Query OK, 1 row affected (0.00 sec)

mysql> select * from presidents;
+----+--------+------------+
| id | first  | last       |
+----+--------+------------+
|  1 | George | Washington |
+----+--------+------------+
1 row in set (0.00 sec) o

mysql> insert into presidents (id, first, last) values (2, 'John', 'Adams');
Query OK, 1 row affected (0.00 sec)

mysql> select * from presidents;
+----+--------+------------+
| id | first  | last       |
+----+--------+------------+
|  1 | George | Washington |
|  2 | John   | Adams      |
+----+--------+------------+
2 rows in set (0.00 sec)

mysql>
```

Comparing Techniques for Creating Tables {#compare}
----------------------------------------

There are two ways to create a table, here is the first, and least
powerful way:

```sql
mysql> create table presidents (id int, first varchar(128), last varchar(128));      
mysql> alter table presidents add primary key (id);  
```

If you use this technique, then you need to explicitly define the ID
when you do the insert:

```sql
mysql> insert into presidents (id, first, last) values (1, 'George', 'Washington');
mysql> insert into presidents (id, first, last) values (2, 'John', 'Adams');
```

Notice that I include unique ID's of 1 and 2 in the insert statement.
This works, but becomes unwieldy when writing code on the client side,
since it is hard to guess what the next unique number in the sequence
will be in all circumstances.

 To get around this problem, first drop your old table and then use this
technique to recreate the table:

```sql
drop mytable;
create table mytable (id int NOT NULL AUTO_INCREMENT, path varchar(128), folder varchar(128), PRIMARY KEY (id));  
```

By using **auto\_increment** you ensure that the ID is incremented
automatically by the database itself, and hence each ID will be unique:
the database guarantees it. Now you no longer have to include the ID
when you do the insert:

```sql
insert into presidents (first, last) values ('George', 'Washington');
```

Because the ID is set to auto\_increment, the database will insert the
auto-incremented ID automatically.

Here is a description of a table that uses auto\_increment:

```sql
mysql> describe additions;
+----------+---------+------+-----+---------+----------------+
| Field    | Type    | Null | Key | Default | Extra          |
+----------+---------+------+-----+---------+----------------+
| id       | int(11) | NO   | PRI | NULL    | auto_increment |
| operanda | int(11) | YES  |     | NULL    |                |
| operandb | int(11) | YES  |     | NULL    |                |
| answer   | int(11) | YES  |     | NULL    |                |
+----------+---------+------+-----+---------+----------------+
4 rows in set (0.02 sec)

mysql>
```

Let's convert a table without autoincrement ID to one that uses
autoincrement. The code below first:

-   Describes what the table looked like before the conversion
-   Performs the conversion
-   Shows the table with the new ID's
-   Then describes the table with the new auto\_increment field:

```sql
mysql> describe presidents;
+-------+--------------+------+-----+---------+-------+
| Field | Type         | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| id    | int(11)      | NO   | PRI | 0       |       |
| first | varchar(128) | YES  |     | NULL    |       |
| last  | varchar(128) | YES  |     | NULL    |       |
+-------+--------------+------+-----+---------+-------+
3 rows in set (0.01 sec)    

mysql> alter table presidents drop column id;
mysql> alter table presidents add column (id int NOT NULL AUTO_INCREMENT, primary key (id));

mysql> select * from presidents;
+--------+------------+----+
| first  | last       | id |
+--------+------------+----+
| George | Washington |  1 |
| John   | Adams      |  2 |
+--------+------------+----+
2 rows in set (0.00 sec)

mysql> describe presidents;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| first | varchar(128) | YES  |     | NULL    |                |
| last  | varchar(128) | YES  |     | NULL    |                |
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
+-------+--------------+------+-----+---------+----------------+
3 rows in set (0.01 sec)

mysql>
```

The code shown above leaves the ID field as the last in the table, which
I find confusing. It might be simpler in at least some cases to simply
delete the table and recreat it. Consider using the [MySqlDump
utility](#dump)to aid in this process.

Simple PHP Script {#php}
-----------------

Here is your script for selecting from the Presidents table, which you
can place anywhere on your server:

```html
<html>
<body>
<?php
  print "<h1>Presidents</h1>";

  $con = mysql_connect("localhost","charlie","xxx");
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
  }

  $db_selected = mysql_select_db("script_child", $con);
  if (!$db_selected)
  {
    die ('Can\'t use database : ' . mysql_error());
  }

  $result = mysql_query("SELECT * FROM presidents");

  // Check result
  // This shows the actual query sent to MySQL, and the error. Useful for debugging.
  if (!$result) {
    $message = 'Invalid query: ' . mysql_error() . "\n";
    die($message);
  }

  while($row = mysql_fetch_array($result))
  {
    echo $row['first'] . " " . $row['last'];
    echo "<br />";
  }

  mysql_close($con);
?>
</body>
</html>
```

Python
------

First [make sure that MySQLdb is
installed](http://www.elvenware.com/charlie/development/web/Python/install.html#mysqldb).
Then write your script, which we shall call data\_python.py

```python
#!/usr/bin/python
import MySQLdb;
import cgi

print "Content-Type: text/html\n\n"
print
print "<html>\n"
print "<head>\n"
print "<meta content='text/html; charset=utf-8' http-equiv='Content-Type'>\n"
print "\t<title>Info Form</title>\n"
print "</head>\n"
print "<body BGCOLOR = white>\n"
db = MySQLdb.connect(host="localhost", port=80, user="charlie", passwd="xxx", db="script_child")
cursor = db.cursor()
cursor.execute("select first, last from presidents")
rows = cursor.fetchall()
for row in rows:
    print "<p>%s, %s</p>" % (row[0], row[1])
print "</body>\n"
print "</html>\n"
```

If you want, read /etc/apache2/sites-available/default. In there you
will find:

```apache
ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
<Directory "/usr/lib/cgi-bin">
    AllowOverride None
    Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
    Order allow,deny
    Allow from all
</Directory>
```

Now you know where to put your script: /usr/lib/cgi-bin. Be sure to make
it executable:

```bash
sudo chmod +x data_python.py
```

People frequently make errors by entering the wrong user name, password
or database. Be sure to  examine your connect line carefully, and ensure
that you passing in the right information:

```sql
db = MySQLdb.connect(host="localhost", port=80, user="charlie", passwd="xxx", db="script_child")
```

Another frequent mistake involves the fields in your database as
specified in your query. Be sure to examine the query carefully:

```sql
cursor.execute("select first, last from presidents")
```

One to Many {#onetomany}
-----------

```sql
CREATE TABLE artist
(
  id int(11) NOT NULL auto_increment,
  first varchar(255),
  last varchar(255),
  description text,
  sex enum('male','female'),
  date timestamp(14),
  PRIMARY KEY (id)
);
```

Now the child table:

```sql
CREATE TABLE art
(
  id int(11) NOT NULL auto_increment,
  title varchar(255),
  description text,
  genre enum('written word','painting', 'music', 'sculpture'),
  artist_id int,
  date timestamp(14),
  PRIMARY KEY (id)
);
```

Inert some data:

```sql
INSERT INTO artist (first, last,description,sex,date)
  VALUES('Jane', 'Austin', 'English author.','female',NOW());
INSERT INTO artist (first, last,description,sex,date)
  VALUES('Thomas', 'Pynchon', 'American author.','male',NOW());
INSERT INTO artist (first, last,description,sex,date)
  VALUES('J. K.', 'Rowling', 'English author.','female',NOW());
INSERT INTO art(title,description,genre,artist_id,date) VALUES ('Emma','Boy meets girl','written word',1, NOW())  
INSERT INTO art(title,description,genre,artist_id,date) VALUES ('Gravity\'s Rainbow','World War II','written word',2,NOW());  
INSERT INTO art(title,description,genre,artist_id,date) VALUES ('The Crying of Lot 49','Conspiracy','written word',2,NOW());    
```

And run the one to many query:

```sql
SELECT artist.id,artist.last as Artist,art.title as Title
FROM artist,art
WHERE artist.id = art.artist_id
ORDER BY artist.last ASC;
```

One to Many Scripts {#onetomanyscript}
-------------------

```html
<html>
<body>
<?php
  print "<h1>Art and Artist</h1>";

  $con = mysql_connect("localhost","charlie","xxx");
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
  }

  $db_selected = mysql_select_db("charlie", $con);
  if (!$db_selected)
  {
    die ('Can\'t use database : ' . mysql_error());
  }

  $result = mysql_query("SELECT artist.id, artist.last AS Artist, art.title AS Title FROM artist, art WHERE artist.id = art.artist_id ORDER BY artist.last ASC");

  // Check result
  // This shows the actual query sent to MySQL, and the error. Useful for debugging.
  if (!$result) {
    $message = 'Invalid query: ' . mysql_error() . "\n";
    die($message);
  }

  while($row = mysql_fetch_array($result))
  {
    echo $row['Artist'] . " " . $row['Title'];
    echo "<br />";
  }

  mysql_close($con);
?>
</body>
</html>
```

If you would like a somewhat more interesting layout, then you can
delete the four lines beginning with **while (\$row... etc...** and
replace them with this table syntax:

```python
print "<table border=1>";
print "<tr><th>Author</th><th>Title</th></tr>";
while($row = mysql_fetch_array($result))
{
print "<tr><td>" . $row['Artist'] . "</td><td>" . $row['Title'] . "</td></tr>";
}
print "</table>";
```

Backup (Dump) a Database {#dump}
------------------------

You can backup, or dump, the complete description of a database with a
command like the following:

```bash
mysqldump -u root -p --database charlie --result-file=c:\users\charlie\documents\charlie.sql
```

The **mysqldump** utility is generally available from any command prompt
in Linux, and is available here in Windows:

```dos
C:\Program Files\MySQL\MySQL Server 5.1\bin>
```

There are several parameters passed to
[mysqldump](http://dev.mysql.com/doc/refman/5.1/en/mysqldump.html) in
the above example:

-   The user who has rights to the database you want to backup: **--u
    root**
-   A request to be prompted for a password: **-p**
-   The file that you want to create to hold the output:
    **--result-file=/home/charlie/charlie.sql**

To make it work, you have to go to the command line (DOS prompt) and
navigate to a directory similar to this one:

```dos
C:\Program Files\MySQL\MySQL Server 5.1\bin>
```

There you will find the mysqldump program which you run like this:

```bash
mysqldump -u root -p --database charlie --result-file=c:\users\charlie\documents\charlie.sql
```

Looking at the above command, there are three parts to it.

1.  Get in the MySql database utility:**mysqldump -u root -p**
2.  Specifiy the database you want to dump**: --database charlie**
3.  Define the output file:
    **--result-file=c:\\users\\charlie\\documents\\charlie.sql**

Put the all together into one command:

mysqldump -u root -p --database charlie
--result-file=c:\\users\\charlie\\documents\\charlie.sql

To restore the database, just redirect the output into the mysql
utility:

```bash
mysql -u root -p < c:\users\charlie\documents\charlie.sql
```

Do it for a single table in the database, where the first line pulls a
table called **additions** from a database called **charlie**, and the
second line restores the table to a database called **test:**

```bash
mysqldump -u root -p --database charlie --table additions --result-file=bar.sql
mysql -u root -p --database test < bar.sql
```

Here is a more in depth description of how to restore the database:

- [http://stackoverflow.com/questions/105776/how-do-i-restore-a-mysql-dump-file](http://stackoverflow.com/questions/105776/how-do-i-restore-a-mysql-dump-file)
- [http://www.techiecorner.com/31/how-to-restore-mysql-database-from-sql-dump-file/](http://www.techiecorner.com/31/how-to-restore-mysql-database-from-sql-dump-file/)
