---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Php/BasicDatabase.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Php
fileName: BasicDatabase.md
relativePath: /web/Php/BasicDatabase.md
title: BasicDatabase
directoryName: Php
category : cssguide-guide
---

<div id="container">

## PHP Database Basics


Learn some simple techniques for using PHP with databases. Mostly MySQL.

## Index

-   [PHP Database](#database)

PHP and Databases {#database}
-----------------

PHP provides excellent support for working with MySql databases. The
following commands play a key role:

-   [mysql\_connect](http://php.net/manual/en/function.mysql-connect.php) -
    Connect to a database
-   [mysql\_select\_db](http://www.php.net/manual/en/function.mysql-select-db.php) -
    Select a database
-   [mysql\_query](http://www.php.net/manual/en/function.mysql-query.php) -
    Query a database
-   [mysql\_fetch\_array](http://www.php.net/manual/en/function.mysql-fetch-array.php) -
    Return data from the results of a query
-   [mysql\_close](http://www.php.net/manual/en/function.mysql-close.php) -
    Close the connection to the database. Very important!

The following script shows an example of how to access a database.
Notice that after each call I report whether it succeeded or failed. In
a production application, you don't want to provide so much feedback, as
it will clutter the user's screen. But while you are learning, and while
you are developing an application, this kind of feedback can be very
useful and can save you a tremendous amount of time.

``` {.code}
<html>
<body>
<?php
  print "<h1>A PHP Script that Connects to a MySQL Database</h1>";

  $con = mysql_connect("localhost", "someDatabase", "somePassword");
  if (!$con)
  {
    die('Could not connect: ' . mysql_error());
  }
  else
  {
    Print "<p>Connection is valid</p>";
  }

  $db_selected = mysql_select_db("someDatabase", $con);
  if (!$db_selected)
  {
    die ('Can\'t use database : ' . mysql_error());
  }
  else
  {
    Print "<p>Using database charlie</p>";
  }

  $result = mysql_query("select first, last from presidents");

  // Check result
  // This shows the actual query sent to MySQL, and the error. Useful for debugging.
  if (!$result)
  {
    $message = 'Invalid query: ' . mysql_error() . "\n";
    die($message);
  }
  else
  {
    Print "<p>selected rows from database</p>";
  }

  while($row = mysql_fetch_array($result))
  {
    print "<p>row found: " . $row['first'] . " " . $row['last'] . "</p>";
  }

  mysql_close($con);
?>
</body>
</html>
```

More Information
----------------

This same subject is also covered from the point of view of a database
developer in one of the MySql pages:

<http://www.elvenware.com/charlie/development/database/mysql/MySql.html>

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)

</div>
