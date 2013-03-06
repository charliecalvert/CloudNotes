Week 07
=======

Today we are going to look at loading data using several different techniques.
We will look at Handlebars.js and templating. We will look at jQuery load, and
at jQuery.getJSON.

-   HandleBarsDemo01
-   JQueryLoad01
-   JQuerySelect01 (Cordova)

Working with JSON:

<http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#getJSON>

This code can go in the head section of your HTML:
 
~~~~

	<script type="textx-handlebars-template" id="par01">  
		<p>{{text}}</p>  
	</script>

~~~~

Here is code for using the template:

~~~~
	function addItem(text) {  
		'use strict';  
	  
		var script = \$("#par01").html(),  
		template=Handlebars.compile(script);  
	  
		var result = template({  
			text: text  
		});  
	  
		$("#myDiv").append(result);  
	}

	$.getJSON("index.json", function(data) {  
		$.each(data, function(i, president) {  
			$('#data01').append("<p>" + president.firstName 
				+ ' ' + president.lastName + "</p>");  
		});  
	});

~~~~

You can download jQuery from http://jquery.com

