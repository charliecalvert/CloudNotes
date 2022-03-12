---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide/HtmlFive.md
relativePath: elvenware/development/web/HtmlGuide/HtmlFive.md
title: HtmlFive
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

## Overview

At the time of this writing, HTML 5 is fairly well established. It has
enjoyed large adoption, and all of the major browsers on both desktops
and mobile devices support it to one degree or another.

HTML 5 has several major design goals which center around two major
pillars. It seeks to:

-   Support new features, such as animation and multimedia, that have
    typically forced developers to turn to outside tools such as
    Silverlight or Flash.
-   Provide a solid architecture that enables developers to:
    -   More easily design robust code that separates content and style,
    -   Adopts to its current platform which enhances HTML's built-in
        support for cross platform development.
    -   Gracefully integrates JavaScript and DOM manipulation to
        facilitate features such as Ajax.

The holy grail of web development is to entirely replace desktop
applications with pure HTML, CSS and JavaScript code that runs in a
browser. HTML 5 moves developers several steps closer to that
achievement.

HTML5 is also notable for providing support both for traditional HTML,
and also for XHTML. It provides support for SVG, which means that you
can easily embed text based graphics features such as this:

<svg width="350" height="120" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
 <g>
  <title>Layer 1</title>
  <circle id="svg_1" fill="blue" stroke-width="4" stroke="green" r="50" cy="60" cx="60"/>
  <circle id="svg_2" fill="green" stroke-width="4" stroke="blue" r="50" cy="60" cx="170"/>
  <circle id="svg_3" fill="red" stroke-width="4" stroke="green" r="50" cy="60" cx="280"/>
 </g>
</svg>

The circles shown above are simply a few lines of text pasted directly into this HTML file:

```html
<svg width="350" height="120" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
 <g>
  <title>Layer 1</title>
  <circle id="svg_1" fill="blue" stroke-width="4" stroke="green" r="50" cy="60" cx="60"/>
  <circle id="svg_2" fill="green" stroke-width="4" stroke="blue" r="50" cy="60" cx="170"/>
  <circle id="svg_3" fill="red" stroke-width="4" stroke="green" r="50" cy="60" cx="280"/>
 </g>
</svg>
```

Or use an **img** tag to load it from disk:

<img src="/images/SimpleGraphic.svg"  width="350" height="120" alt="SVG test">

The code looks like this:

```html
<img src="/images/SimpleGraphic.svg"  width="350" height="120" alt="SVG test">
```

You can learn more on [MDN][mdn-svg].

SVG Images on Linux
-------------------

If you are working with Apache on Linux you might need to add the following to your **.htaccess** file:

``` {.code}
AddType     image/svg+xml              svg svgz
AddEncoding gzip                       svgz
```


Browser Support for HTML 5
--------------------------

Not all browsers provide equivalent support for all HTML 5 features. A
site called [html5test.com](http://html5test.com/) has developed an
dynamic test that rates browsers on a scale of 1 to 475. As of Feb 14,
2012, here are the scores for several major browsers running on Windows
7:

-   Chrome: 374
-   FireFox: 332
-   Safari: 302
-   Internet Explorer 9: 141

There are two caveats on IE 9 score:

-   Though they get less than half the points of the other browsers,
    they have done a good job of picking the areas where they did add
    features. As a result, they do better than it might seem at first.
-   I've read that the Internet Explorer 10 scores 306 points, which
    means that it is greatly improved over IE 9.

Finally, I should add that the scores for browsers in many phones and
tablets tend to range between 150 and 350. My Android Phone scores 182,
as does my copy of Android x86 2.3.3 running in VirtualBox. My Android
Tablet scores a 212 using the native broswer, and a 300 with the FireFox
browser.

Canvas
------

One of the most important features in HTML 5 is the addition of a new
tag called a **canvas.** Developers can draw on the canvas, and can
animate the elements of their drawing. For game developers in
particular, this is a huge step forward.

Here is a simple example:

```html
<doctype html>
<html>
<head>
	<title>Canvas Simple</title>
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="index.js"></script>
</head>
<body>
<h1>Canvas Size</h1>

<canvas id="myCanvas">
  If you see this text, then your browser does not support the Canvas Element
</canvas>

</body>
</html>
```

And here is the JavaScript:

```javascript
$(document).ready(function() {
	var myCanvas = document.getElementById('myCanvas');
	myCanvas.width = 600;
	myCanvas.height = 400;

	var context = myCanvas.getContext('2d');
	context.save();
	context.rect(10, 10, 280, 130);
	context.lineWidth = 7;
    context.strokeStyle = 'black';
	context.stroke();
	context.restore();
});
```

Canvas Size
-----------

By default, a Canvas element is 300 pixels wide and 150 pixels high:

```
<canvas id="myCanvas">
</canvas>
```

Even if you use CSS to set the size of the Canvas, the drawing surface of
the Canvas element will still be 300 X 150. The following code will not
change the size of the Canvas shown above:

```
	#myCanvas {
		width: 800px;
		height: 600px;
	}
```

The above code will make the Canvas element bigger, but it will not change
the size of the drawing surface. Instead, the drawing surface will scale up
to fit the size of the element.

Instead, you might write code that looks like this:

```JavaScript
var myCanvas = document.getElementById('myCanvas');
myCanvas.width = 600;
myCanvas.height = 400;
```

Full example. Here is the HTML:

```html
<doctype html>
<html>
<head>
	<title>Canvas Size</title>
	<link href="index.css" rel="stylesheet" type="text/css">
	<script src="jquery-1.10.2.js"></script>
	<script src="index.js"></script>
</head>
<body>
<h1>Canvas Size</h1>

<p>In this example, we try to set the Canvas size in CSS. We successfully make the
canvas larger, but we don't change the size of the drawing surface. To fix the
problem, click the button.

<div>
<button id='sizeButton'>Fix Canvas</button> <hr>
</div>


<canvas id="myCanvas">
</canvas>

</body>
</html>
```

And here is the JavaScript:

```javascript
var App = (function() {

	var myCanvas = null;
	var context = null;

	function App() {
		myCanvas = document.getElementById('myCanvas');
		context = myCanvas.getContext('2d');
		drawShape();

		$('#sizeButton').click(fixCanvas);
	}

	var drawShape = function() {
		context.save();
		context.rect(10, 10, 280, 130);
		context.lineWidth = 7;
		context.strokeStyle = 'black';
		context.stroke();
		context.restore();
}

	var fixCanvas = function() {
		myCanvas.width = 600;
		myCanvas.height = 400;
		drawShape();
	}

	return App;

})();

$(document).ready(function() {
	new App();
});
```

Create a Canvas on the Fly
------------------------

Here is some code showing how to create a Canvas element on the fly:

```javascript
s$("body").css("overflow", "hidden");  
var myCanvas = $('<canvas />');
myCanvas[0].height = 200;
myCanvas[0].width = 300;    
var scrollX = window.pageXOffset;
var scrollY = window.pageYOffset;    
$(myCanvas).css({ position: "absolute",
    left: 0,
    top: scrollY });

$(myCanvas).click(function() {
    $(myCanvas).hide();
    $("body").css("overflow", "auto");
});

$('body').append(myCanvas);
var context = myCanvas.get(0).getContext("2d");
myCanvas.attr("width", $(window).get(0).innerWidth);
myCanvas.attr("height", $(window).get(0).innerHeight);

context.lineWidth = 15;
context.strokeStyle = "green";
context.strokeRect(0, 0, myCanvas.width(), myCanvas.height());
```

The end result is to draw a canvas on top of the current page, and
inside the current viewport, like this:

<div>
<button name="buttonViewport" value="Toggle Viewport Border" onclick="elvenware.toggleViewportBorder()">Toggle Viewport Border</button>
</div>

Here is a more [complex example](ElvenCanvas.html).

Some examples from third parties:

* [A bit more](FastSin.html).
* [Fishbowl](https://testdrive-archive.azurewebsites.net/performance/fishbowl/)
* [Fishtank](https://testdrive-archive.azurewebsites.net/Performance/FishIETank/Default.html)

New Types
---------

HTML 5 introduces numerous new input types, including:

-   search, tel, url, email
-   datetime, date, month, week, time, datetime-local
-   number, range, color.
-   video, audio, canvas

Here is a color picker:

```html
Choose a color: <input type="color" name="myColor">
```

Here is a working example:

<div>
Choose a color: <input type="color" name="myColor">
</div>

HTML 5 Email Control{#email}
--------------------

The control HTML 5 email control is useful because it can automatically test
for valid email addresses. Here is the code for an email entry:

```html
<form action="FakeFile.py">
  E-mail: <input type="email" name="email">
  <input type="submit">
</form>
```

And here is an email tag example you can test on your browser. The
example I provide below will not do anything interesting if you enter a valid
address such as *foo@bar.com*. If you enter an invalid address, such as *foo*,
it will show how the control can flag such illegal entrees:

<form action="#email">
  E-mail: <input type="email" name="email"><br />
  <input type="submit">
</form>

Dates
-----

Here is the code for an HTML date picker:

    <input type="date" id="dateEntry" />

And here is a working example you can play with on your browser:

<div>
<input type="date" id="dateEntry" />
</div>

You can also use the [JQueryUI Datepicker](http://jqueryui.com/datepicker/). To
make this work, you need to add the control and a bit of JavaScript. Here
is the code for the control:

```html
<p>Date: <input id="myDate" type="text"></p>
```

And here is the JavaScript. You can place the JavaScript anywhere you want in
your HTML or in a separate file:

```html
<script>
  $(function() {
    $( "#myDate" ).datepicker();
  });
</script>
```

Here is a working example:

<p>Date: <input id="myDate" type="text"></p>

<script>
  $(function() {
    $( "#myDate" ).datepicker();
  });
</script>

ComputedStyle
-------------

If you want to know what styles are associated with a particular element in
your HTML file, you can use the HTML 5 getComputedStyle API.

Here is an example from JsObjects/Syntax/ComputedStyle/:

```javascript
var dump = function(value) {
	console.log(value);
	$('#myList').append('<li>' + value + '</li>');
};

function dumpAllStyles(elem,prop) {

	var computedStyle = window.getComputedStyle(elem,null);

	var len = computedStyle.length;

	for (var i=0;i<len;i++) {
		var style = computedStyle[i];
		dump(style + " : " + computedStyle.getPropertyValue(style)+"\n");
	}
}

var dumpStyles = function() {
	var elem = document.getElementById("computedStyle");
	dumpAllStyles(elem);
};

$(document).ready(function() {
	$('#computedStyle').click(dumpStyles);
});
```


Video
-----

This is a confusing world, with HTML5 standards undecided about whether
we should use [OGG](http://www.vorbis.com/) or maybe
[MPEG4](http://www.mpegif.org/mpeg4) or maybe
[WebM](http://www.webmproject.org/)

### Audio

Here is page with some HTML 5 audio capibility:

-   [HTML 5 Audio](Html5Audio.html)

Impact on DOM and JavaScript
----------------------------

See this [page](/javascript-guide/JavaScriptBasics.html#insertAdjacentHTML) for a
discussion of insertAdjacentHTML, which is an old method which has
finally been standardized in HTML 5.

Responsive Web Design {#responsive}
---------------------

- [Example Link](http://thinkvitamin.com/design/beginners-guide-to-responsive-web-design/)

<script src="/javascripts/dev-web/BasicSyntax.js" type="text/javascript"></script>

Img width and height in HTML5
-----------------------------

The right thing to do is put them in a css file:

```css
img.basic
{
    width:20%;
    height:20%;
}
```

Then use that class in your images:

```html
<img class="basic" src="calve300.jpg"  alt="Dad in uniform">
```

[mdn-svg]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Adding_vector_graphics_to_the_Web
