# Bitly Refine Comments

Notes on Bitly Refine by Charlie Calvert

## Include Jade for the Table

Be sure you include this code in **index.jade**:

```jade
+elfPanel("Bitly Links Table").elfDiv
    div.scroller
        table.table#tableLinks
```

Without this code, the rest of your project will never work as the code that you insert into your table will not have a home in your HTML.

## Render the Table

Here is the correct code for rendering the table:

```javascript
renderTable: function(links) {
    'use strict';
    $.each(links, function(index, link) {
        var title = '<td>' + link.title + '</td>';
        var keyword = '<td>' + link.keyword_link + '</td>';
        var tableRowStart = '<tr class="linkTitle" index=' + index + '>';
        $('#tableLinks').append(tableRowStart + title + keyword + '<tr>');
    });
    $('.linkTitle').click(elfDisplay.showTableSelection);
},
```

Some students try to write code like this:

```javascript
var title = "<td>" + link.text + "</td>";
var keyword = "<td>" + link.user + "</td>";
```

That code won't work because Bitly does not return data with a property called **text** or **user**. Instead it has properties called **title** and **keyword_link**.

## Don't forget the Movement Object

A few students did not link in the **movement** object. It is described in general terms in the [Iterate section][bii] of the Bitly Interactive assignment. Those of you who turned that assignment in should also have the complete code for that object.

[bii]:http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyInteractive.html#iterate

## Don't forget the Downloads Object

A number of students failed to include the **downloads** module in the project. It was given to you in [bitly interactive][bid].

[bid]: http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyInteractive.html#the-downloads-module

## Consistent Naming

If you rename an object, be sure you change all references to that object. If you change any identifier, you have to rename all instances of that identifier. Consider this code:

```javascript
elfDownloads = function() {
    'use strict';
};

downloads.accessToken = '2ac etc...'; //YOUR TOKEN HERE. AS A STRING...;

downloads.dataTypes = {
    'dtLocal': 0,
    'dtCloud': 1
};
```

In the first line, the **downloads** object has been renamed to **elfDownloads**, per my instructions. This student did not, however, rename all instances of this variable. In particular, **acccessToken** and **dataTypes** still have the old object name of **downloads**. It should be changed from **downloads.accessToken** to **elfDownloads.accessToken**. When the changes are complete, the code should look like this:

```javascript
elfDownloads = function() {
    'use strict';
};

elfDownloads.accessToken = '2ac etc...'; //YOUR TOKEN HERE. AS A STRING...;

elfDownloads.dataTypes = {
    'dtLocal': 0,
    'dtCloud': 1
};

etc...
```

## Don't Directly Link to JSON Files

Some students wrote **layout.jade** files that look like this:

```jade
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(src="components/jquery/dist/jquery.js")
    script(src="components/bootstrap/dist/js/bootstrap.js")
    script(src="javascripts/control.js")
    script(src="data/bitly-links.json")
  body
    block content
```

This file is mostly correct, but the **script** tag that attempts to link in **bitly-links.json** causes an error. **JSON** files follow JavaScript syntax, but there are differences. As a result, they should not be directly linked into a web application using a **script** tag. 

Consider this JavaScript object:

```javascript
var myObject = {
	"firstName": "George",
	"lastName": "Washington"
};
```

This is a JavaScript [object literal](http://www.dyn-web.com/tutorials/object-literal/) with two string properties that consist of name-value pairs. These name-value pairs can be of type **function**. It has been assigned to the identifier **myObject** and it ends with a semicolon.

Now consider this JSON object:

```json
{
	"firstName": "George",
	"lastName": "Washington"
}
```

It too consists of a list of name-value pairs separated by a comma. Functions, however, are not allowed. Nor is the object assigned to a variable. In JSON, strings must be in double quotes.

We can link JavaScript files into a web application with a **script** tag. We should not link JSON files into our projects with a script tag. Instead, we usually access JSON in a web application by loading it with an http request (**ajax**).

