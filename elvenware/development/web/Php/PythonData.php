<html>
<body>
<?php
print "<h1>Ahoy</h1>";

$con = mysql_connect("localhost","charlie","bar");
if (!$con)
{
	die('Could not connect: ' . mysql_error());
}
else
{
	Print "<p>Connection is valid</p>";
}

$db_selected = mysql_select_db("charlie", $con);
if (!$db_selected) {
	die ('Can\'t use database : ' . mysql_error());
}

$result = mysql_query("select first, last FROM presidents");

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