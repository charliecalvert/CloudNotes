# Bitly Refine Comments

Notes on Bitly Refine by Charlie Calvert

## Grunt Jade

Move document ready into its own folder
Test for number of inputs
Simulate click?

npm install grunt-contrib-jade --save-dev
grunt.loadNpmTasks('grunt-contrib-jade');
npm install grunt-exec --save-dev
grunt.loadNpmTasks('grunt-exec');

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

## Use Proper Access Token

Some folks wrote code that looks a bit like this:

```javascript
 getUrl: function(accessToken) {
    'use strict';

    var params = '?access_token=';

    if (accessToken === elfDownloads.dataTypes.dtLocal) {
        return this.localUrl;
    } else {
        var url = this.baseUrl + params;
        return url += accessToken;
    }
}
```

The problem is that the wrong accessToken is being accessed in the **else** block. In this case, **accessToken** is either 0 or 1, which will not work when querying Bitly.

Here is the proper implementation, which ensures that you use the access token
from the **elfDownloads object:**.

```javascript
getUrl: function(userSelection) {
    'use strict';

    var params = '?access_token=';

    if (userSelection === elfDownloads.dataTypes.dtLocal) {
        return this.localUrl;
    } else {
        var url = this.baseUrl + params;
        return url += elfDownloads.accessToken;
    }
},
```

The key line is the last one to include a valid statement, the one in the **else** block:

```javascript
return url += elfDownloads.accessToken;
```

See the previous section for an example of how to declare the **accessToken.**

## Include Jade for the Table

Be sure you include this code in **index.jade**:

```jade
+elfPanel("Bitly Links Table").elfDiv
    div.scroller
        table.table#tableLinks
```

Without this code, the rest of your project will never work as the code that you insert into your table will not have a home in your HTML.

## Include Jade for the Radio Buttons

Something like this:

```jade
+elfPanelType("Options", "panel-primary").elfDiv
    div.row
        div.col-sm-6
            +elfPanel("Iterate", "panel-default")
                +downloadButton("Get Bitly Data", "elfDownloads.getBitlyData()")
        div.col-sm-6
            +elfRadioPanel("Radio Buttons", "dataSource")
                +elfRadio("Local Data", "localData")
                +elfRadio("Cloud Data", "cloudData")
```

## Render the Links

In **elf-bitly.js** don't call **elfBitly.display**. That method should be deleted and moved to **elfDisplay**. The following code, for instance, is wrong, since it calls **elfBitly.display**:

```javascript
$.getJSON(url, function(result) {
        elfBitly.bitlyLinks = result;
        elfBitly.display();
```

You should instead call code in **elfDisplay**:

```javascript
$.getJSON(url, function(result) {
    elfBitly.bitlyLinks = result;
    elfDisplay.render();
    elfDisplay.renderTable(elfBitly.getLinkHistoryArray());
```

The code in **elfDisplay.render** is similar to the code that was in **elfBitly.display**:

```javascript
render: function() {
    'use strict';
    var index = elfBitly.linkIndex;
    var bitlyLink = elfBitly.getLinkHistoryItem(index);
    elfDisplay.showRecord(bitlyLink);
},

```

I changed the name of the method from **display** to **render** because I thought that **elfDisplay.display** sounded awkward and repetitious.

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

## Clear Data

Before you fill in the table, you should clear any data that might already be in it. Otherwise our code continually appends code to the table. It is unlikely the user would even know this is happening since the new rows are not visible. We can only see four or five rows at a time, so if you append data down on the 25th row, for instance, the user won't be able to see it.

There are several reasonable solutions to this problem. One simple fix might be to write code like this:

```javascript
renderTable: function(links) {
    'use strict';
    $("#tableLinks").empty();
    $.each(links, function(index, link) { 
    
    // Code omitted here...
},
```

The call to empty ensures that the any data appended to the table will at least begin on row 1. This ensures that at least the first few rows of data are visible, and that the user is given a visual cue that something has changed.

## Don't forget the Movement Object

A few students did not link in the **movement** object. It is described in general terms in the [Iterate section][bii] of the Bitly Interactive assignment. Those of you who turned that assignment in should also have the complete code for that object.

[bii]:http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyInteractive.html#iterate

## Don't forget the Downloads Object

A number of students failed to include the **downloads** module in the project. It was given to you in [bitly interactive][bid].

[bid]: http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyInteractive.html#the-downloads-module


## More on Consistent Names

In index.jade, a student wrote this:

```jade
button.btn.btn-success.btn-large(type='button', onclick="movement.left()")
```

But in **movement.js** the **movement** object was correctly renamed to **elfMovement**. This means we must update our jade code:

```jade
button.btn.btn-success.btn-large(type='button', onclick="elfMovement.left()")
```

Notice that the jade code now references **elfMovement** rather than movement.

I'm intentionally putting up these kinds of roadblocks so that I can be sure that everyone understands the relationship between the IDs and objects referenced in one file, and the IDs and objects declared in another file.

Here is another way to look at it: I frequently give you code to help you get started, but you must show that you have worked with the code and understood its syntax. I put tests like this in front of you so you can demonstrate your understanding.

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


