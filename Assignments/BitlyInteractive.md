# Bitly Interactive

The primary goal of this program is to create an interface for your Bitly data.

Other goals include:

* Learn about epoch time format and how to convert it to human readable dates
* Work with different styles of labels and controls in a form
* Use JavaScript to check a checkbox under certain conditions
* Multiple Modules: One JavaScript Object per file
* Function Objects
* Creating an access token for bitly


[![interface][bis]][bi]

**Bitly Interactive**: *Part of the interface. Click image to see larger version.*

[bi]:https://s3.amazonaws.com/bucket01.elvenware.com/images/Bitly-Interactive01.png
[bis]: https://s3.amazonaws.com/bucket01.elvenware.com/images/Bitly-Interactive01Small.png

## Get Started

Rather than start from scratch, copy your **BitlyQuery** program into a new folder called **Week06-BitlyInteractive**. To perform this action, first navigate to the root of your repository. Then issue a command like this:

```
cp -r Week06-BitlyQuery Week06-BitlyInteractive
```

You will have to make a few changes to the name of the application. In particular, look in these files:

- bin/www
- routes/index.js
- package.json

Find instances of the string **BitlyQuery**, or something similar, in each file, and change them to **BitlyInteractive**

## Load the data

Your program should be able to load data either directly from the Bitly website, or from a JSON file stored in your public directory.


## Get a Bitly Access Token

You will need a Bitly account, and you will need to create at least a few bitly links.

Once you have done that, go to the bitly API home page: [http://dev.bitly.com/](http://dev.bitly.com/). You should always be able to find a link to the API page under the **more** button at the bottom of the bitly home page, and at various other places, such as on the **tools** page.

On the right, at the bottom, choose **Manage my apps**. Generate a **Generic Access Token**.

## The interface

To get started, just boot up the program normally: **npm start**.

Copy the **bitly-links.json** file to a directory you create called **public/data**. Load it from document ready.

Using our mixins, create an editable interface that will show the following fields from a single object in bitlyLinks array. These fields should be in input controls:

* keyword_link
* title
* aggregate_link
* long_url
* client_id
* link

Also convert the timestamps, and display them in input fields, as described below:

* user_ts
* created_at
* modified_at

We need checkboxes to display these fields

* archived: false
* private: false

These should appear as the program loads so the user sees them by default. In other words, call your method that contains your getJson method from your **document ready** function.

## Check a CheckBox

Here is how to check a checkbox in JavaScript:

```javascript
// with jquery
if (bitlyLink.private) {
    $("#checkBoxPrivate").prop('checked', true);
}

// With the JavaScript DOM:
if (bitlyLink.archived) {
    document.getElementById("checkBoxArchived").checked = true;
}
```

## Converting Dates

The time stamps in the bitly data consist of numbers called epochs:

```javascript
"created_at": 1444163942
```

We typically convert them from epoch format to human readable format with code like this:

```javascript
new Date(bitlyLink.created_at * 1000)
```

Most of what you need to know is at the [epochconverter.com][epoch-converter] site and their [javascript][epoch-js] page:

[epoch-converter]: http://www.epochconverter.com
[epoch-js]: http://www.epochconverter.com/programming/#javascript

## Iterate

Your program should be able to iterate over the bitly objects in our bitly array. At the top of the program are three buttons:

```
+elfPanel("Iterate")
    button.btn.btn-success.btn-large(type='button', onclick="movement.left()")
        span.glyphicon.glyphicon-arrow-left
        | &nbsp; Left

    button.btn.btn-success.btn-large(type='button', onclick="movement.right()")
        | Right &nbsp;
        span.glyphicon.glyphicon-arrow-right

    span &nbsp;&nbsp;&nbsp;

    button.btn.btn-default(type='button', onclick="downloads.getBitlyData()")
        | Get Bitly Data &nbsp;&nbsp;
        span.glyphicon.glyphicon-download
```

The first two buttons allow you to move back and forth from record 0, to record 1 and so on. The third button can be used to load the data either from the:

* local json file
* Bitly web site

When iterating over the records, you need first an object that will allow you to respond to button clicks:

```javascript
var movement = {
    left: function () {
        'use strict';
        if (bitlyUrlParser.linkIndex > 0) {
            bitlyUrlParser.linkIndex -= 1;
            bitlyUrlParser.display();
        }
    },

    right: function () {
        'use strict';
		// You fill in this bit.
    }
};
```

The **bitlyUrlParser.display** method in **control.js** might look, in part, a bit like this:

```javascript
var bitlyUrlParser = {
    linkIndex: 0,

    bitlyLinks: null,

    display: function () {
        'use strict';
        var index = bitlyUrlParser.linkIndex;
        var bitlyLink = bitlyUrlParser.bitlyLinks.data.link_history[index];
        bitlyUrlParser.showRecord(bitlyLink);
    },

    getUrl: function (accessToken) {
        'use strict';

        if (accessToken === -1) {
            return 'data/bitly-links.json';
        } else {
            var url = 'https://api-ssl.bitly.com/v3/user/link_history?access_token=';
            return url += accessToken;
        }
    },

    getBitlyLinks: function (accessToken) {
        'use strict';
        var url = bitlyUrlParser.getUrl(accessToken);

        $.getJSON(url, function (result) {
            bitlyUrlParser.bitlyLinks = result;
            bitlyUrlParser.display();
            $('#displayLinks').html(JSON.stringify(result, null, 4));
        }).fail(function () {
            console.log("Error");
        });
    },

   showRecord: function (bitlyLink) {
        'use strict';
        if (bitlyLink.private) {
            $("#checkBoxPrivate").prop('checked', true);
        }

        if (bitlyLink.archived) {
            document.getElementById("checkBoxArchived").checked = true;
        }

        $('#keywordLink').val(bitlyLink.keyword_link);

        etc...

    }
```

Notice that the **getUrl** method returns different data depending on whether you pass in a Bitly access token or the number **-1**. This is how the program knows whether to get local data, or data from Bitly itself.

## Multiple Modules

Your program should have several objects in it. In particular, you should have at least three files on the client side:

* javascripts/control.js
* javascripts/downloads.js
* javascripts/movement.js

Don't forget to modify **layout.jade** to include links to these files. 

While we are on the subject of **layout.jade**, be sure that you declaring the **charset** and configuring the viewport:

```
doctype html
html
  head
    meta(charset='UTF-8')
    meta(name='viewport', content='width=device-width')
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    etc...
```

## The **downloads** module

```javascript
var downloads = function () { 'use strict'; };

downloads.accessToken = YOUR TOKEN HERE. AS A STRING...;

downloads.dataTypes = ["dtLocal", "dtCloud"];

downloads.dataType = downloads.dataTypes[0];

downloads.dataTypeSelection = function () {
    'use strict';
    if ($('#localData').is(':checked')) {
        $("#radioButtonDisplay01").html("You clicked localData ");
        downloads.dataType = downloads.dataTypes[0];
    } else {
    	YOUR CODE HERE
    }
};

downloads.getBitlyData = function () {
    'use strict';
    if (this.dataType === this.dataTypes[0]) {
        console.log("getBitlyData called: ", this.dataTypes[0]);
        bitlyUrlParser.getBitlyLinks(WHAT GOES HERE?);
    } else if (this.dataType === this.dataTypes[1]) {
    	YOUR CODE HERE
    }
};

```