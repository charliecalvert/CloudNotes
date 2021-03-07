<html>
<body>
<?php
print "<h1>Elvenware Data</h1>";

$con = mysql_connect("209.237.150.136","19232_charlie","F00b@rOO");
if (!$con)
{
	die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db("19232_charlie", $con);
if (!$db_selected) {
	die ('Can\'t use database : ' . mysql_error());
}

$result = mysql_query("select path, folder FROM elvenpages");

// Check result
// This shows the actual query sent to MySQL, and the error. Useful for debugging.
if (!$result) 
{
	$message = 'Invalid query: ' . mysql_error() . "\n"; 
	die($message);
}


print "<table border=2>";
while($row = mysql_fetch_array($result))
{
  print "<tr><td>" . $row['path'] . "</td><td>". $row['folder'] . "</td></tr>";
}
print "</table>";
mysql_close($con);
?>
</body>
</html>