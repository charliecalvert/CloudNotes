<html>
<body>
<?php
print "<h1>Ahoy</h1>";

$con = mysql_connect("209.237.150.136","19232_charlie","F00b@rOO");
if (!$con)
{
	die('Could not connect: ' . mysql_error());
}
else
{
	Print "<p>Connection is valid</p>";
}

$db_selected = mysql_select_db("19232_charlie", $con);
if (!$db_selected) 
{
	die ('Can\'t use database : ' . mysql_error());
}
else
{
	Print "<p>Using database charlie</p>";
}


$result = mysql_query("select first, last FROM presidents");

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