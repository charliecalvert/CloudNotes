---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide/Canvas01.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide
fileName: Canvas01.md
relativePath: /web/HtmlGuide/Canvas01.md
title: Canvas01
directoryName: HtmlGuide
category: HtmlGuide-guide
---


<script type="text/javascript">
	
	var context;
	var context02;
	var image;
	
	$('document').ready(function () {
		var canvas01 = $('#canvas01');
		context = canvas01.get(0).getContext('2d');
		var canvas02 = $('#canvas02');
		context02 = canvas02.get(0).getContext('2d');			
	});
	
	function loadImage(callback)
	{
		var image = new Image();
		image.onload = function() {
			callback(image);
		}
		image.src = "images/cscGarden.png";
	}

	function doLoad()
	{
		var canvas01 = document.getElementById('canvas01');
		var context = canvas01.getContext('2d');
		loadImage(function(image) {
		  context.drawImage(image, 0, 0);
		});
	}
	
	function doLoader()
	{
	
		image = new Image();
		image.src = "images/cscGarden.png";
		$(image).load(function() {
		  context.drawImage(image, 0, 0);
		  context.clearRect(0, 0, 75, 75);
		});
	}
	
	function blitTest()
	{
		// var imageData = context.getImageData(0, 0, 25, 25);
		for (var j = 0; j < 6; j++)
			for (var i = 0; i < 12; i++)
			{
				context.drawImage(image, 0, 25, 25, 25, i * 25, j * 25, 25, 25);
			}
	}
</script>


Canvas
======

<canvas id="canvas01">
	This text is displayed if your browser does not support HTML5 Canvas.
</canvas>

<canvas id="canvas02">
	This text is displayed if your browser does not support HTML5 Canvas.
</canvas>

<div>
	<button onclick="doLoader()">Load</button>
	<button onclick="blitTest()">BlitTest</button>
</div>
