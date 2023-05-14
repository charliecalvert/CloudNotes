---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JsonBasics.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript
fileName: JsonBasics.md
relativePath: /web/JavaScript/JsonBasics.md
title: JsonBasics
directoryName: JavaScript
category : cssguide-guide
---

# JSON

JSON, like XML, is a text base sepecification for exchanging data. JSON is
based on JavaScript. In fact, it is a subset of JavaScript. In particular,
it allows you to declare simple JavaScript objects that consist of name
value pairs:

```javascript
{
	"firstName": "George",
	"lastName": "Washington"
}
```

You can also declare simple JavaScript arrays:

```javascript
[a, b, c]
```

You can combine the two:


```javascript
[
    {
        "firstName": "George",
        "lastName": "Washington"
    }, {
        "firstName": "John",
        "lastName": "Adams"
    }, {
        "firstName": "Thomas",      
        "lastName": "Jefferson"
    }
]
```

## Reading JSON with Node

There is a library called fs (FileSystem) that is built into Node. You can load the library like this:

```javascript
var fs = require('fs');
```

Then you can use the library to read in a file:

```javascript
var json = fs.readFileSync('index.json');
```

The code above reads in a text file and puts the contents in the variable of type **string** called **json**.

Here is how to do the same thing asynchronously:

```javascript
fs.readFile('index.json', function(err, result) {
	if (err) {
		throw err;
	}
	var json = result;
});
```

Finally, you can convert that JSON string into a real JavaScript object by writing this code:

```javascript
var obj = json.parse(json);
```

So your code might look like this:

```javascript
var fs = require('fs');

function DoSomethingWithTheJson(json) {
	console.log(JSON.stringify(json, null, 4));
}

fs.readFile('./index.json', function(err, result) {
	if (err) {
		throw err;
	}
	var json = JSON.parse(result);
	DoSomethingWithTheJson(json);
});
```

The **JSON.stringify** method is the opposite of **JSON.parse**: it converts a JavaScript object into a string. In this example, we ask that no special substitutions are made (null) and that the code be formated with 4 spaces in the indentations. It's a bit ironic that we convert the data from a string to JavaScript object and then back again. That step is not strictly necessary in this example, but it is a very common procedure in this type of coding, so I provide an example of how to do it. Of course, in a real program the actions you perform with the JSON you read from file is likely to be very different than this. I'm simply trying to provide a relatively easy to understand "getting started" example. More advanced examples are available elsewhere.

## Working with JSON {#working}

This code can go in the head section of your HTML:

```html
<script type="textx-handlebars-template" id="par01">
	<p>{{text}}</p>
</script>
```

Here is code for using the template:

```javascript
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
```

You can download jQuery from http://jquery.com

## Links

*   [JSON Home Site](http://www.json.org/)
*   [JSON Validator](http://jsonlint.com/)
