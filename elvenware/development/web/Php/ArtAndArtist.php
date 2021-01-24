<html>
<body>
<?php
  print "<h1>Art and Artist</h1>";

  $con = mysql_connect("localhost","charlie","bar");
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

  print "<table border=1>";
  print "<tr><th>Author</th><th>Title</th></tr>";
  while($row = mysql_fetch_array($result))
  {
    print "<tr><td>" . $row['Artist'] . "</td><td>" . $row['Title'] . "</td></tr>";    
  }
  print "</table>";
  mysql_close($con);
?>
</body>
</html>
