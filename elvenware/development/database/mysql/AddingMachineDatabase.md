---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/database/mysql/AddingMachineDatabase.md
relativePath: elvenware/development/database/mysql/AddingMachineDatabase.md
title: AddingMachineDatabase
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:20:59 AM
fileNameMarkdown: AddingMachineDatabase.md
fileNameHTML: AddingMachineDatabase.html
---

<!-- toc -->
<!-- tocstop -->

﻿<script src="/charlie/development/web/Scripts/MyJQueryTests.js"></script>

## Overview

This page is not working properly at this time.

## Adding Machine

**_This is an excerpt from [a page on the Elvenware site](http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#adding). If I do have reason to update the text of the page, I will most likely update only the Elvenware page, and not this one. Note that this page essentially identical to the page with a similar name in the PythonAddingMachine folder except for the action attribute in the form._**

The section demonstrates how to use a form to submit data to Python script which writes the results to a database. There are also calls to JavaScript routines that perform simple addition. Follow the instructions outlined below, and then read the text found beneath example.

**Instructions**: Below you will find a form outlined in blue dashes. Enter two numbers in the fields labeled **Number One** and **Number Two**. Press the **Add** button to add the numbers. If you are satisfied with your result, press the **Submit** button.

<form action="/cgi-bin/AddingData.py" method="post">

<div class="addForm">Number One: <input id="operanda" name="operanda" type="text"></div>

<div class="addForm">Number Two: <input id="operandb" name="operandb" type="text"></div>

<div>

* * *

<div><span class="addForm">Result</span>:<span id="result"></span>

<div><span class="addForm">Result</span>: <input id="answer" name="answer" type="text"></div>

</div>

* * *

<div><input onclick="jQueryTests.addNumbers()" type="button" value="Add Numbers"> <input type="submit" value="Submit Query"></div>

</div>

</form>

Here is what is going on behind the scenes. When you press the **Submit** button two things happen:

*   The submit button forces the form to submit its data to a python script called AddingData.py which writes the data to a database. The script that knows how to write to a database is called because the form has its action attribute set to /cgi-bin/AddingData.py. It is AddingData.py that actually writes to the database.
    *   <**form** action="/cgi-bin/AddingData.py" **method**="post">
*   Three pieces of data are also submitted.
    *   The text from the input field labeled **Number One** and named **operanda**
    *   The text from the input field labeled **Number Two** and named **operandb**
    *   The text from the input field named **answer**.
*   There is a fourth input control, a button labeled **Add Numbers**. This control is used to call the JavaScript routine that adds the numbers together.

Here is the complete code for the form:

<pre class="code"><<span class="brown">form</span> action="/cgi-bin/AddingData.py" method="post">
  <div>Number One: <<span class="brown">input</span> type="text" 
  	name="operanda" 
  	id="operanda" /></div>
  <div>Number Two: <<span class="brown">input</span> type="text" 
  	name="operandb" 
  	sid="operandb" /></div>
  <div>
	<hr>
	<div><span>Result</span>: 
		<p id="result"></p>
		<<span class="brown">input</span> type="text" name="answer" id="answer"/>
	</div>
	<hr>
	<div>
		<<span class="brown">input</span> type="button" 
			onclick="jQueryTests.addNumbers()" 
			value="Add Numbers" />
		<<span class="brown">input</span> type="submit" />
	</div>
  </div>
</<span class="brown">form</span>></pre>

Below is the JavaScript routine that adds two numbers together. Note that it makes heavy use of JQuery to locate the fields were the operands are located, and where the result is displayed.

<pre class="code">this.addNumbers = function()
{
  var operanda = $("#operanda").val();
  var operandb = $("#operandb").val();
  var sum = parseInt(operanda) + parseInt(operandb);
  $("#result").html(sum);
  $("#answer").val(sum);
}</pre>

Press the **Get all additions** button to retrieve from the database a list of all the additions people have performed. Pressing this button calls a server side Python script that actually retrieves the data from the database, wraps the results in HTML, and returns them to your browser.

<form action="/cgi-bin/AddingMachineDataReader.py" method="post"><input type="submit" value="Get all additions"></form>
