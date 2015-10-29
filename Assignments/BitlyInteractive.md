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

Bitly Api Official Docs:

* [Getting Started](http://dev.bitly.com/get_started.html)
* [API Docs](http://dev.bitly.com/api.html)
* [User Info](http://dev.bitly.com/user_info.html)
* [Best Practices](http://dev.bitly.com/best_practices.html)

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

Be sure to go to JsObjects, run **git pull**, and then copy in the latest mixins:

```
cp $ELF_TEMPLATES/JadeMixins/mixin-radios.jade views/.
cp $ELF_TEMPLATES/JadeMixins/mixins.jade views/.
```

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
		// YOUR CODE HERE
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

Notice that the **getUrl** method returns different data depending on whether you pass in a Bitly access token or the number **-1**. This is how the program knows whether to get local data, or data from Bitly itself. This method has changed from the implementation in **BitlyQuery**. The **getBitlyLinks** method also has several changes, including the fact that the call to **getUrl** now takes a parameter (as indeed it should have from the start):

```
var url = bitlyUrlParser.getUrl(accessToken);
```

## Load JSON {#load-json}

You need to copy **spec/bitly-links.js** into **public/data/bitly-links.json**. There are three steps involved:

```
	mkdir public/data
    cp spec/bitly-links.js public/data/bitly-links.json
```

Then you need to transform the JavaScript in bitly-links.json into real JSON. The simplest way to do this is to block copy the entire contents of the file. Then navigate to the [jsonlint.com](http://jsonlint.com/). Now best all the code from **bitly-links.json** into the text box on the jsonlint web site. Click the **Validate** button. Your JavaScript code will fail the test. That is because it is not pure JSON. In particular, there are three problems:

- We need to remove the comments at the top of the file
- There is a variable declaration at the beginning of the object declaration that needs to be deleted.
- And we also need to remove a semicolon at the end of the object

Suppose this were the contents of the file:

```javascript
var bitlyLinks = {
    "status_code": 200,
    "data": {
    "link_history": [
        {
            "keyword_link": "http://bit.ly/bootstrap-basics-01-sm",
            "archived": false
        },
        {
            "keyword_link": "http://bit.ly/bootstrap-basics-02-sm",
            "archived": false
        }
   ],
        "result_count": 165
},
    "status_txt": "OK"
};
```

To turn it into JSON, remove the variable declaration and the closing semicolon:

```javascript
{
    "status_code": 200,
    "data": {
        "link_history": [
            {
                "keyword_link": "http://bit.ly/bootstrap-basics-01-sm",
                "archived": false
            },
            {
                "keyword_link": "http://bit.ly/bootstrap-basics-02-sm",
                "archived": false
            }
        ],
        "result_count": 165
    },
    "status_txt": "OK"
}
```

Don't stop working in **jsonlint** until your code passes their test. You must be working with valid JSON or you can't retrieve it with **getJSON**. When you are done, paste your cleaned up code back into your file. 

**NOTE**: *Don't attempt to make the changes by hand, instead delete the old contents and replace it with the new code that passed jsonlint. Experience has taught me that this is the only reasonably safe way to do this operation.*

At this point, you should be able to load the JSON with this call in your document ready:

```javascript
$(document).ready(function() { 'use strict'; 
    bitlyUrlParser.getBitlyLinks(-1);
});
```

Two things to check, to be sure it will work:

- Make sure your **getUrl** and **getBitlyLinks** methods are as shown in this document. They have been messaged slightly from the version in **BitlyQuery**.
- Make sure your **index.jade** file has an a **PRE** tag that can be used to display your JSON:

```jade
extends layout

block content
  h1= title
  p Welcome to #{title}

  div
    pre#displayLinks
```


## Display with Jade

The JADE for the location where you display the data from a single object might start like this:

```
+elfFormPanel("Main Form")#target

    +elfPanel("Input")
        +elfInputB("Keyword Link", "keywordLink", "keywordLink")#keywordLink.form-control
        MORE CODE HERE
```

In the same part of the **index.jade**, you should display the **private** and **archive** bits:

```
+elfPanel("CheckBoxes")
    +elfCheckBox("Private", "checkBoxPrivate", "checkBoxPrivate")#checkBoxPrivate
    +elfCheckBox("Archived", "checkBoxArchived", "checkBoxArchived")#checkBoxArchived
```

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

## Grunt Issues

In Gruntfile.js make this change:

```
reporter : require('jshint-stylish'),
// reporterOutput : 'result.xml',
```

At the command line, do this:

```
npm install jshint-stylish --save-dev
```

## Test the URL

I've come up with some additional tests that were not part of the first 2015 version of **BitlyQuery**. Make sure these tests are included in the **Test Bitly Suite**:

```
    it("tests the local url we pass to getBitlyLinks", function() {
        var finalUrl;

        spyOn($, 'getJSON').and.callFake(function(url, success) {
            finalUrl = url;
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });

        bitlyUrlParser.getBitlyLinks(-1);
        expect(finalUrl).toBe('data/bitly-links.json');
    });

    it("tests the acccess token url we pass to getBitlyLinks", function() {
        var finalUrl;

        spyOn($, 'getJSON').and.callFake(function(url, success) {
            finalUrl = url;
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });

        bitlyUrlParser.getBitlyLinks(accessToken);
        expect(finalUrl).toContain(accessToken);
        expect(finalUrl).toContain('https');
    });
```

These don't require any extra work on your part, they are just they to help you make sure that your implementations of getUrl and getBitlyLinks are correct. In particular, they check to ensure that you have test to distinguish requests for the local url (-1) from the url that contains an access token. Take a look at the updated [BitlyQuery][bq] assignment, as these tests are now included in that assignment in their proper context.

[bq]:http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyQuery.html#set-up-unit-tests
