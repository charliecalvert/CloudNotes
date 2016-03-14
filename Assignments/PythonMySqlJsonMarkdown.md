## Overview

Python MySql Json Markdown

- Set up Apache Python CGI scripts
- Set up MySQL database and table
- Use a python script to insert data in the database
- Access the data from one of your MakeHtml markdown files

## Some notes

CGI files are server (for now), from:

- /usr/lib/cgi-bin

They will be owned by root, so use sudo as needed.

You will not need them, but the configuration files for Apache are here:

- /etc/apache2

## Step One

Check to ensure Lamp and MySQL are installed. You know how to do this already.

Check the status of Apache CGI. Specifically, you will probably need to turn on CGI in order to access python server side scripts from your HTML code:

```
sudo a2enmod cgi
```

This command will return one of two values:

1. Enabling module cgi
2. Module cgi already enabled

If you get the first response, then do this:

```
service apache2 restart
```

Once CGI is enabled, then it stays enabled. You don't need to repeat this operation.

## Step Two

Create a simple test script to make sure Python CGI is working.

Create a simple python test script in **/usr/lig/cgi-bin**. Open a blank file called **simple.py** in the **cgi** directory with the **nano** editor.


```
sudo nano /usr/lib/cgi-bin/simple.py
```

Files with a **.py** are python scripts.

Paste this python script into the editor:

```python
#!/usr/bin/env python3

import cgi
import cgitb
cgitb.enable()  # debug

print("Content-type: text/html;charset=utf-8")
print()

print("""
<html>

<head><title>Prog270 CGI Script</title></head>

<body>

  <h1> This is the Header </h1>

</body>

</html>
""")
```

Set executable permissions on the script:

```
sudo chmod 755 /usr/lib/cgi-bin/simple.py
```

Test the script by going to this url:

- [http://localhost/cgi-bin/simple.py](http://localhost/cgi-bin/simple.py)

## MySQL

Start my SQL. You will prompted for the password you entered when you installed lamp:

```
mysql -u root -p
```

If you lost your password see the first link below. The second is an FYI:

- <https://help.ubuntu.com/community/MysqlPasswordReset>
- [Server Guide](https://help.ubuntu.com/lts/serverguide/mysql.html)
- [Elvenware Passwords](http://www.elvenware.com/charlie/development/database/mysql/linux-user-password.html)

Once you have loaded the mysql client, create a database called **prog270**:

```sql
create database prog270;
use prog270;
```

More info is found here:

- [Elvenware, Create Database](http://www.elvenware.com/charlie/development/database/mysql/MySql.html#createdatabase)

Create a simple table:

```sql
create table presidents (id int NOT NULL AUTO_INCREMENT, first varchar(128), last varchar(128), PRIMARY KEY (id));
```

Insert some data in the table:

```sql
insert into presidents (first, last) values ('George', 'Washington');
insert into presidents (first, last) values ('John', 'Adams');
insert into presidents (first, last) values ('Thomas', 'Jefferson');
```

Make sure that life is good:

```sql
select * from presidents;
mysql> select * from presidents;
+----+--------+------------+
| id | first  | last       |
+----+--------+------------+
|  1 | George | Washington |
|  2 | John   | Adams      |
|  3 | Thomas | Jefferson  |
+----+--------+------------+
3 rows in set (0.00 sec)
```

Type the following to exit mysql:

```
exit;
```

## Python Script

Put this in '/usr/lib/cgi-bin' as **get-presidents.py**:

```python
#! /usr/bin/python3

import cgitb
cgitb.enable()

import pymysql
import json

print("Content-Type: text/json")
print()

conn = pymysql.connect(host='localhost', user='root', passwd='foobar', db='prog270')

cursor = conn.cursor()

cursor.execute("SELECT * FROM presidents")

rows = cursor.fetchall()

print(json.dumps(rows));

cursor.close()
conn.close()
```

You might want to use this command:

```
sudo nano /usr/lib/cgi-bin/get-presidents.py
```

When you are done:

```
sudo chmod 755 /usr/lib/cgi-bin/get-presidents.py
```

## Show Data

Paste some HTML into a markdown file called **AllTest/presidents.md**:

```html
<div>
  <button id="getPresidents" type="button"> Get Presidents </button>
</div>

<div>
  <ul id='bar'>
  </ul>
</div>
```

Open up **/var/www/html/js/elven-help.js** and edit it until you get something like the following:

```javascript
$(document).ready(function() {
	$('table').addClass('table table-striped table-hover');

	$('#getPresidents').click(getPresidents);

	function getPresidents() {
		$.getJSON('/cgi-bin/get-presidents.py', function(presidents) {
			presidents.forEach(function(president) {
				$('#bar').append('<li>' + president[1] + ' ' + president[2] + '</li>');
			});
		})
	}
});
```

## Turn it in

Copy any new markdown, including **presidents.md** into your repository. It should end up in your **prog270-lastname-2016/AllTest** directory.

Copy the updated **elven-help.js** file and any other updated files into your **prog270-lastname-2016/ApacheHelpers** directory or subdirectories.

**NOTE**: _You should be using the scripts from [ApacheHtml][aphtml] assignment to aid with this process._

Push your repository. Switch to EC2, pull your repository, copy the new files out to **~/Documents/AllTest** and **/var/www/html** or their subdirectories, as appropriate.

On EC2, complete the steps found above in the [MYSQL](#MySQL) section.

Run MakeHtml. Take screenshots of your page running both on localhost and on EC2. Put them in our shared Google Drive folder in a folder called **PythonMySQlJson**.

On the text page of Canvas, include live links to your page on EC2 and to your new Google Drive folder. Don't put the links in a comment. I want to be able to click them and be taken directly to your work.

[aphtml]:http://www.ccalvert.net/books/CloudNotes/Assignments/ApacheHtml.html#apache-helpers

## Optional Setup cgi dir

THIS SECTION IS NOT YET COMPLETE. IGNORE IT FOR NOW.

Make sure CGI is turned on:

```
cd /var/www
sudo mkdir cgi
sudo chown -R bcuser:bcuser cgi
```

Create a simple python test script in **/var/www/cgi**. Open a blank file called **simple.py** in the **cgi** directory. Files with a **.py** are python scripts.


```
cd /var/www/cgi
nano simple.py
```
