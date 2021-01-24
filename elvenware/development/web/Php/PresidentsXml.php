<?xml version="1.0"?>
<?php
print "";
print "<presidents>";

$con = mysql_connect("localhost","charlie","bar");
if (!$con)
{
	die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db("charlie", $con);
if (!$db_selected) {
	die ('Can\'t use database : ' . mysql_error());
}


$result = mysql_query("select first, last FROM presidents");

// Check result
// This shows the actual query sent to MySQL, and the error. Useful for debugging.
if (!$result) 
{
	$message = 'Invalid query: ' . mysql_error() . "\n"; 
	die($message);
}

while($row = mysql_fetch_array($result))
{
  print "<president>" . $row['first'] . " " . $row['last'] . "</president>";
}

mysql_close($con);

print "</presidents>";
?>
