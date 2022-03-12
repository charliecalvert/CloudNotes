---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Php/GettingStarted.md
relativePath: elvenware/development/web/Php/GettingStarted.md
title: GettingStarted
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

<div id="container">

A Simple PHP Script
===================

One declares a file to contain PHP by giving it the extension: .php.
When writing a PHP script, start by creating a normal HTML file. The
script portion of the file begins with the following syntax:

```code
<?php
```

You can mark the end of the embedded script by writing the following:

```code
?>
```

Everthing between these two bits of syntax can be pure PHP:

```php
<html>
<head>    
  <title>Sample PHP File</title>
</head>
<body>

<?php
  Print "<h1>Sonnet 79</h1>";"<p>Men call you fair, and you do credit it,</p>";
  Print "<p>For that yourself you daily such do see:</p>";
  Print "<p>But the true fair, that is the gentle wit</p>";
  Print "<p>And virtuous mind, is much more praised of me.</p>";
  Print "<p>For all the rest, however fair it be,</p>";
  Print "<p>Shall turn to naught and lose that glorious hue:</p>";
  Print "<p>But only that is permanent and free</p>";
  Print "<p>From frail corruption that doth flesh ensue,</p>";
  Print "<p>That is true beauty; that doth argue you</p>";
  Print "<p>To be divine and born of heavenly seed;</p>";
  Print "<p>Derived from that fair spirit, from whom all true</p>";
  Print "<p>And perfect beauty did at first proceed.</p>";
  Print "<p>He only fair, and what he fair hath made:</p>";
  Print "<p>All other fair, like flowers, untimely fade.</p>";
  Print "<p><em>Edmund Spenser</em></p>";
?>

</body>
</html>
```

Where to Put the File
---------------------

You should name the file something like **MyFile.php**, being sure to
give the file an extension of **php**.\
\
In Linux, you should save the file in **/var/www** or in another a valid
folder that you can access with your browser. On Windows, if you save it
in **c:\\inetpub\\wwwroot\\**, that you should also be able to browse to
it. For instance, to access the file in your browser, you might type
something like:

``` {.code}
http://localhost/MyFile.php
```

If the file does not display properly, it sometimes helps to try to run
your script from the command line. Open up a command window, and at the
prompt, you can type something like this on Linux:

``` {.code}
php MyFile.php
```

In Windows, it might look like this:

``` {.code}
c:\php\php.exe MyFile.php
```

Look at the output and see if there is anything suspicious. You should
also look for a file called something like **php\_errors.log**. This
file should be in the same folder as your script. The output in the log
file can sometimes help you find out what has gone wrong.

**Links**
---------

-   http://smashingweb.ge6.org/installing-apache-mysql-php-in-ubuntu-11-10/

Copyright © [Charlie Calvert](../../../index.html) | [Elvenware
Home](../../../index.html) | [Writing Code](../../index.html) |
[Delphi](../../delphi/index.html) | [CSharp](../../csharp/index.html) |
[My Books](../../../books/index.html)

</div>
