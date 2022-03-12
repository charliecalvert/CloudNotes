---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests/TestAjax.md
relativePath: elvenware/development/web/UnitTests/TestAjax.md
title: TestAjax
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

## Overview

This page is currently broken and under construction

<script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
<script
  src="https://code.jquery.com/qunit/qunit-2.9.2.css"
  integrity="sha256-toepOe5D+ddXgUOGsijnhymZna5bakJ0gwRC/3bK1b0="
  crossorigin="anonymous"></script>
<!-- script
  src="https://code.jquery.com/qunit/qunit-2.9.2.js"
  integrity="sha256-EQ5rv6kPFPKQUYY+P4H6fm/le+yFRLVAb//2PfBswfE="
  crossorigin="anonymous"></script -->

<script src="/javascripts/dev-web/TestAjax.js" type="text/javascript"></script>

<div id="qunit-fixture">
<h1 id="qunit-header">Using QUnit</h1>
<h2 id="qunit-banner"></h2>
<h2 id="qunit-userAgent"></h2>
<ol id="qunit-tests">
</ol>

<ul id="debug"></ul>


## Using QUnit {#qunit-header}


 {#qunit-banner}

 {#qunit-userAgent}


```javascript
test('readJson', function() {

	$.ajax = function(options) {
      	equal(options.url, "MyData.json");
      	options.success( { "Result": "Success" } );
  	};

	var app = new App();
	app.readJsonTest(function(data) {
		equal(data.Result, 'Success');
		//start();
	}, function(request, ajaxOptions, thrownError) {
		ok(false, 'call to readJson failed: ' + request.responseText);
		//start();
	});
});
```
