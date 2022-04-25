---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/JQueryUi.md
relativePath: javascript-guide/JQueryUi.md
title: JQueryUi
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: JQueryUi.md
fileNameHTML: JQueryUi.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

```html

<style>
	#anchor {
		margin: 2px;
	}

	#sortable { list-style-type: none; margin: 0; padding: 0; width: 60%; }
	#sortable li { margin: 0 3px 3px 3px; padding: 0.4em; padding-left: 1.5em; font-size: 1.4em; height: 18px; }
	#sortable li span { position: absolute; margin-left: -1.3em; }

</style>

<script>

	$(function() {
		$(".accordion").accordion({
			collapsible: true, active: -1
		});
	});


	function hider()
	{
		$('#toggler').hide('Slide');
	}

	function reveal()
	{
	    setTimeout(function() {
		    $("#toggler").removeAttr("style").hide().slideDown();
		}, 200);
	}


	$(function() {
		$("#myDate").datepicker();
	});

	$(function() {
		$("#sortable").sortable();
		$("#sortable").disableSelection();
	});

	$(function() {

		$("input:submit, a, button", ".demo").button();

		$("button", ".demo").click(
			function()
			{
				$('.buttonDemo').html('You clicked the button');
			}
		);

		$("input", ".demo").click(
			function()
			{
				$('.buttonDemo').html('You clicked the input');
			}
		);		

		$("a", ".demo").click(
			function()
			{
				$('.buttonDemo').html('You clicked the anchor');
			}

		);

	});
</script>
```

jQuery UI Examples
==================

jQuery UI is a library for building plush, interactive web pages. It consists of numerous widgets and tools that brighten web pages and move your development away from static, inert pages and towards a more
dynamic, animated interface.

Here is the jQuery UI site where you can download the library:

[https://jqueryui.com](https://jqueryui.com/)

Here is the theme library:

[http://jqueryui.com/themeroller/](http://jqueryui.com/themeroller/)

In you pages, you should include links to the JQuierUI CSS file, to
jQueryUI javaScript and to jQuery itself:

``` {.code}
<link href="/charlie/libs/jquery-ui-1.8.18.custom/css/eggplant/jquery-ui-1.8.18.custom.css" rel="stylesheet" type="text/css" />
<script src="/charlie/libs/scripts/jquery.min.js" type="text/javascript"></script>
<scrip<script src="/charlie/libs/jquery-ui-1.8.18.custom/js/jquery-ui-1.8.18.custom.min.js" type="text/javascript"></script>
```

Here is where you can find the CDN hosted jQuery UI links:

-   [http://blog.jqueryui.com/2012/04/jquery-ui-1-8-20/](http://blog.jqueryui.com/2012/04/jquery-ui-1-8-20/)
-   [http://blog.jqueryui.com/2012/04/jquery-ui-1-8-19/](http://blog.jqueryui.com/2012/04/jquery-ui-1-8-19/)
-   [https://developers.google.com/speed/libraries/devguide\#jqueryUI](https://developers.google.com/speed/libraries/devguide#jqueryUI)
-   [http://docs.jquery.com/Downloading\_jQuery\#CDN\_Hosted\_jQuery](http://docs.jquery.com/Downloading_jQuery#CDN_Hosted_jQuery)

For instance:

``` {.code}
<!DOCTYPE html>
<html>

<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <title>Sample jQuery Ui</title>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.19/jquery-ui.min.js" type="text/javascript"></script>
  <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.19/themes/swanky-purse/jquery-ui.css" rel="stylesheet" type="text/css" />
</head>

<body class="ui-widget-header ui-corner-all">

  <h1 class="ui-widget-header ui-corner-all">Hello jQuery UI</h1>
  <p class="ui-widget-header ui-corner-all">A bit of text.</p>

</body>

</html>
```

[Try it](JQueryUiDemo.html) yourself. In the linked demo, I have added a
style sheet changer so you can view the different styles that are
available.

Examples of how to use a few of the key jQuery widgets are included
below after the discussion of jQuery UI styles.

jQuery UI Styles
----------------

You can change the styles of the elements on a page by attaching a class
defined in the jQuery UI CSS file to it. For instance:

``` {.code}
<h2 class="ui-widget-header">My Header</h2>
```

Above you see an H2 tag with it's class set to ui-widget-header. This is
the style of most of the headers on this page. It is what gives them
their three dimensional look. Other important classes include:

-   ui-widget
-   ui-widget-header - For headers
-   ui-widget-content - For tags that display normal content.

Learn more here:
[jQuery Theming API](https://api.jqueryui.com/category/theming/)

Accordian
---------

The accordian control is a jQuery staple that I once used on nearly every page
of the Elvenware site. When placed with the proper CSS: you could click on any
of the bars created by the code shown below to see them in action:

```html
<div class="accordion">
	<h2><a href="#">Margie Start</a></h2>
	<div>
		<p>Margie Accordian</p>
	</div>
	<h2><a href="#">Charlie Foo</a></h2>
	<div>
		<p>Charlie Accordian</p>
	</div>
</div>
```

The Data Picker:
----------------

When styled correctly the data picker control, shown below, allows users to just click in the "edit control" shown
below:

```
<div class="demo">
	<p>Date: <input id="myDate" type="text"></p>
</div>

<div style="display: none;" class="demo-description">
	<p>Put text here for optional demo mode comments</p>
</div>
```

Buttons
-------

Here are some fancy looking jQuery UI buttons. When clicked they invoke the JavaScript shown near the bottom of this page.

<p class="buttonDemo" ></p>


<div class="demo">
		<div id="anchor"><a href="#demoHere">Just a plain anchor</a></div>
		<div><button>Button tag used</button></div>
		<div><input value="An input tag with type submit" type="submit"></div>
</div>

Here is the code for the buttons shown above:

``` {.code}
<div class="demo">
  <button>Button tag used</button>
  <div><input value="An input tag with type submit" type="submit"></div>
  <a href="#">Just a plain anchor</a>
</div>
```

Put descriptive text here

Slide
-----

The code below shows a technique for hiding and revealing text. You will
need to click the buttons to make the text slide in and out.

### You can hide me by clicking a button below

<div id="toggler">
	My source looks something like this:

	<div>
		<h3">You can hide me by clicking a button below</h3>
		<p>My source looks something like this:</p>
	</div>
``` {.code}
<div id="toggler">
  <div class="ui-widget-content ui-corner-all">
    <h3 class="ui-widget-header ui-corner-all">
        You can hide me by clicking the button below
    </h3>
    <p>My source looks like this:</p>
      // Code omitted here...
    </div>
</div>
```
</div>

<p>&nbsp;</p>
<button id="button1" onclick="hider()">Hide</button>
<button id="button2" onclick="reveal()">Reveal</button>

Dialogs
-------

I need to put together dialog demo code. For now, you can visit the
[Nemikor
example](http://example.nemikor.com/basic-usage-of-the-jquery-ui-dialog/).

Lists
-----

Use your mouse to sort the items below.


<ul id="sortable">
	<li>Item1</li>
	<li>Item2</li>
	<li>Item3</li>
</ul>

``` {.code}
<!DOCTYPE html>
<html>

<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <title>Sample jQuery Ui</title>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.19/jquery-ui.min.js" type="text/javascript"></script>
  <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.19/themes/swanky-purse/jquery-ui.css" rel="stylesheet" type="text/css" />
  <script>
    $(function() {
      $("#sortable").sortable();
      $("#sortable").disableSelection();
    });
  </script>
</head>

<body class="ui-widget-header ui-corner-all">

<h1 class="ui-widget-header ui-corner-all">Hello jQuery UI</h1>
<p class="ui-widget-header ui-corner-all">A bit of text.</p>

<h2 class="ui-widget-header ui-corner-all">Bar</h2>

<ul id="sortable" class="ui-widget-header ui-corner-all">
<li class="ui-widget-header ui-corner-all">List 1</li>
<li class="ui-widget-header ui-corner-all">List 1</li>
<li class="ui-widget-header ui-corner-all">List 1</li>
</ul>
</body>

</html>
```

The JavaScript
--------------

You will also want to include a small amount of JavaScript. For
instance, the JavaScript for this page looks ike this:

```html
<script>
   $(function() {
      $("#accordion").accordion({
         collapsible: true, active: -1
      });
   });

   function hider()
   {   
      $('#toggler').hide('Slide');
   }

   function reveal()
   {
      $("#toggler").removeAttr("style").hide().fadeIn();
   }


   $(function() {
      $("#myDate").datepicker();
   });

   $(function() {
      $("#sortable").sortable();
      $("#sortable").disableSelection();
   });


   $(function() {

      $("input:submit, a, button", ".demo").button();

      $("button", ".demo").click(
         function()
         {
            $('.buttonDemo').html('You clicked the button');
         }
      );

      $("input", ".demo").click(
         function()
         {
            $('.buttonDemo').html('You clicked the input');
         }
      );      

      $("a", ".demo").click(
         function()
         {
            $('.buttonDemo').html('You clicked the anchor');
         }
      );
   });
</script>
```

To see where I have placed the source, just right click on this file and
choose View Source.
