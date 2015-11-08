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

```bash
cp -r Week06-BitlyQuery Week06-BitlyInteractive
```

You will have to make a few changes to the name of the application. In particular, look in these files:

- bin/www
- routes/index.js
- package.json

Find instances of the string **BitlyQuery**, or something similar, in each file, and change them to **BitlyInteractive**. If you are working in WebStorm, also update the name of the project by right clicking on the top node in the project view and choosing refactor.

## Get a Bitly Access Token {#access-token}

Your program should be able to load data either directly from the Bitly website, or from a JSON file stored in your public directory. As a result, you will need a Bitly account, and you will need to create at least a few bitly links.

Once you have done that, go to the bitly API home page: [http://dev.bitly.com/](http://dev.bitly.com/). You should always be able to find a link to the API page under the **more** button at the bottom of the bitly home page, and at various other places, such as on the **tools** page.

On the right, at the bottom, choose **Manage my apps**. Generate a **Generic Access Token**. Save the token somewhere you can find it. For instance, in **control.js**, or create a **README.md** file for your project and put it there.

## Run Code and Tests {#run-code}

It is probably a good idea to keep both the program and your unit tests running at all times. To do this, you need to open two terminal windows.

To get started:

* boot up the program normally: **npm start**.
* In another terminal, start your tests: **grunt test**

You probably want to focus on the terminal window that contains your unit tests. The other one is necessary to run you program, but you will probably need to view it much less frequently. Both programs should continue running automatically, and will restart each time your change your code. The main exception would be changes to the karma config file, which would require a manual restart of your tests.

## Load JSON {#load-json}

Copy the **bitly-links.json** file to a directory you create called **public/data**. Load it from document ready. More specifically, copy **spec/bitly-links.js** into **public/data/bitly-links.json**. There are three steps involved:

```bash
	mkdir public/data
    cp spec/bitly-links.js public/data/bitly-links.json
```

Then you need to transform the JavaScript in bitly-links.json into real JSON. The simplest way to do this is to block copy the entire contents of the file. Then navigate to the [jsonlint.com](http://jsonlint.com/). Now best all the code from **bitly-links.json** into the text box on the jsonlint web site. Click the **Validate** button. Your JavaScript code will fail the test. That is because it is not pure JSON. In particular, there are three problems:

- Remove the comments at the top of the file
- Delete the variable declaration assigned to your bitly object.
- Remove the semicolon at the end of the object

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

Don't stop working in **jsonlint** until your code passes their test. You must be working with valid JSON or you can't retrieve it with **getJSON**. When you are done, paste your cleaned up code back into your file, entirely replacing its contents.

**NOTE**: *Don't attempt to make the changes by hand, instead delete all of the old contents and replace it with the new code that passed jsonlint. Experience has taught me that this is the only reasonably safe way to do this operation. Don't forget to delete the comments at the top of the file.*

At this point, you should be able to load the JSON with this call in your document ready:

```javascript
$(document).ready(function() { 'use strict';
    bitlyUrlParser.getBitlyLinks(downloads.dataTypes.dtLocal);
});
```

## Test the URL

If your call to **getBlitlyLinks** does not work, there are two things to check:

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

I've come up with some additional tests that were not part of the first 2015 version of **BitlyQuery**. Make sure these tests are included in the **Test Bitly Suite**. The tests are designed to help ensure that **getUrl** and **getBitlyLinks** are properly implemented:

```javascript
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

Ideally, these don't require any extra work on your part; they are just there to ensure that your implementations of **getUrl** and **getBitlyLinks** are correct. In particular, they check to ensure that your code can distinguish requests for the local url (-1) from the url that contains an access token. Take a look at the updated [BitlyQuery][bq] assignment, as these tests are now included in that assignment in their proper context.

[bq]:http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyQuery.html#set-up-unit-tests

## The interface

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

## Get New Mixins++

Run **git pull** on JsObjects. Copy in the new mixins from $ELF_TEMPLATES/JadeMixins. There are several files there now:

```bash
cp $ELF_TEMPLATES/JadeMixins/mixin-inputs.jade views/.
cp $ELF_TEMPLATES/JadeMixins/mixin-radios.jade views/.
cp $ELF_TEMPLATES/JadeMixins/mixin-buttons.jade views/.
```

**NOTE**: *My mixins are in a state of flux right now, so you might want to check for other mixins by looking in **$ELF_TEMPLATES/JadeMixins**. Also, don't forget to **include** these files at the top of **index.jade**. If there are more mixins that might be helpful, copy them over:

```
ls $ELF_TEMPLATES/JadeMixins/
```

Or compare the code in your project to the code in $ELF_TEMPLATES/JadeMixins/:

```
meld views $ELF_TEMPLATES/JadeMixins/
```

At the top of **index.jade**, link in the mixins that you want to use:

```
extends layout
include mixin-radios
include mixin-inputs
include mixin-buttons
```

## Creating Special Fields {#special-fields}

When creating the interface for your program, you need to know how to 

* Write JavaScript code that checks a checkBox.
* Convert an epoch date used in JSON to a human readable date.

The next two sections describe how to perform these relatively simple tasks.

### Check a CheckBox

There are two boolean fields in our bitly links data. These fields are called **archived** and **private**:

```json
{
    "keyword_link": "http://bit.ly/bootstrap-basics-01-sm",
    "archived": false,
    "user_ts": 1444163942,
    "title": "BootstrapBasics01Small.png (307×261)",
    "created_at": 1444163942,
    "tags": [
        "image"
    ],
    "modified_at": 1444164000,
    "campaign_ids": [],
    "private": false,
    "aggregate_link": "http://bit.ly/1OWCsXX",
    "long_url": "https://s3.amazonaws.com/bucket01.elvenware.com/images/BootstrapBasics01Small.png",
    "client_id": "298b336871d6aa29e06b3033269f21ced9717625",
    "link": "http://bit.ly/1OWCsXW"
}
```

We can capture a boolean field with a checkbox: **checked** means true, while **unchecked** means false. In our program, it is simplest for us to set these fields from inside our JavaScript code. This means we have to know how to check or uncheck a control depending on the value of a boolean variable.

Here are two ways to check a check box; one using jQuery, the other use raw JavaScript code:

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

Reference:

- jQuery [prop method](http://api.jquery.com/prop/).
- Stackoverflow discussion of [this issue](http://stackoverflow.com/a/8206573)

### Converting Dates

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

```jade
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

The code above can be improved with mixins:

```jade
div.row
    div.col-sm-6
        +forwardBack("elfMovement.left()", "elfMovement.right()")
    div.col-sm-6
        +elfCheckBox("Private", "checkBoxPrivate", "checkBoxPrivate")#checkBoxPrivate
        +elfCheckBox("Archived", "checkBoxArchived", "checkBoxArchived")#checkBoxArchived
```

The first two buttons allow you to move back and forth from record 0, to record 1 and so on. The third button can be used to load the data either from the:

* local json file
* Bitly web site

When iterating over the records, you need an object that will allow you to respond to button clicks:

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
		// YOUR CODE HERE. WHAT IS THE TEST TO BE SURE
        // YOU DON'T GO PAST THE END OF THE ARRAY?
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

    getUrl: function(accessToken) {
        'use strict';

        var cloudBaseUrl = 'https://api-ssl.bitly.com/v3/user/link_history';
        var cloudParams = '?access_token=';
        var localUrl = 'data/bitly-links.json';

        if (accessToken === downloads.dataTypes.dtLocal) {
            return localUrl;
        } else {
            return cloudBaseUrl + cloudParams + downloads.accessToken;
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

```javascript
var url = bitlyUrlParser.getUrl(accessToken);
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

This is the first time we are going to use function objects rather than plain old JavaScript literal objects. A plain old JavaScript object is declared like this:

```javascript
var myObject = { ... // STUFF IN HERE };
```

A function object is declared like this:

```javascript
function myFunction() { ... // STUFF IN HERE }
```

Or like this:

```javascript
var myFunction = function() { ... // STUFF IN HERE }
```

In my opinion, at least, function objects are much more flexible and powerful than plain objects.

In the code below, the first line creates an JavaScript object. We then declare three properties and two methods of that object:

```javascript
var downloads = function() {
    'use strict';
};

downloads.accessToken = '2ac4b4ccf91019cff6a6b3f23bcbe05ec2bf7a8c';

downloads.dataTypes = {"dtLocal": 0, "dtCloud": 1};

downloads.dataType = downloads.dataTypes.dtLocal;

downloads.dataTypeSelection = function() {
    'use strict';
    if ($('#localData').is(':checked')) {
        $('#radioButtonDisplay01').html('You clicked localData ');
        downloads.dataType = downloads.dataTypes.dtLocal;
    } else {
        $('#radioButtonDisplay01').html('You clicked cloudData ');
        downloads.dataType = downloads.dataTypes.dtCloud;
    }
};

downloads.getBitlyData = function() {
    'use strict';
    console.log('getBitlyData called: ', Object.keys[downloads.dataType]);
    bitlyUrlParser.getBitlyLinks(downloads.dataType);
};
```

When we are done, we can do things like this:

```javascript
console.log(downloads.dataTypes.dtLocal);
console.log(downloads.accessToken);
console.log(downloads.dataType);
```

Or we could call the methods of the object:

```javascript
downloads.getBitlyData(downloads.dataTypes.dtLocal);
```

Remember that the method **downloads.dataTypeSelection** won't respond to clicks on your radio butons unless you tell it do so:

```
$(WHAT SELECTOR GOES HERE?).click(WHAT METHOD GOES HERE?);
```

I would put code like this in my **document ready** handler.

## Grunt Issues

By default, our Gruntfile has been set up to display output in **result.xml** in **checkstyle** format. This does not work well on Cloud 9, and can be confusing to beginners. To fix the problem, switch from **checkstyle** to **jshint-stylish**.

To make the switch, open **Gruntfile.js** and make this change:

```javascript
reporter : require('jshint-stylish'),
// reporterOutput : 'result.xml',
```

At the command line, do this:

```bash
npm install jshint-stylish --save-dev
```

## Switch Data Source {#switch-source}

Your should allow the user to choose the data source. Do they want to view:

* The local **bitly-links.json** file?
* The live data from your **Bitly** account?

Include two radio buttons that allow the user to make this selection. If they select the local option, then call **getBitlyLinks** with an argument of **-1**. If they want the live data, then pass in the access token to your account.

**NOTE**: *Ultimately we will want to make the call to the live Bitly data on the server side so the user cannot see your access token. We aren't doing that yet, however.*

## Jasmine Fixtures

Suppose we write code like the following where one of two branches will execute:

```javascript
if (bitlyLink.archived) {
    document.getElementById('checkBoxArchived').checked = true;
} else {
    document.getElementById('checkBoxArchived').checked = false;
}
```

Suppose further that this code gets called by our unit tests. Since at least one branch in this **if** statement is sure to execute, we need to be sure it will not throw an error.

We have, however, a problem: *we are not loading any HTML in our tests.* As a result, there will be no element with an ID of **checkBoxArchived**. This means, the code will fail with an error like one of these:

```
 TypeError: Cannot set property 'checked' of null
 TypeError: 'null' is not an object (evaluating document.getElementById etc...)
```

It is possible to have our tests load our program's HTML files, but it turns out there is a simpler solution. We can take the little fragment of HTML that we need, and insert it into our tests. The code, which belongs in **spec/test-basic** looks like this:

```javascript
describe('Test Bitly Links', function() {
    'use strict';


    beforeEach(function() {
        var fixture =
            '<div id="fixture">' +
                '<input type="checkbox" name="checkBoxPrivate" value="checkBoxPrivate" id="checkBoxPrivate">' +
                '<label for="checkBoxPrivate">&nbsp; Private</label>' +
                '<input type="checkbox" name="checkBoxArchived" value="checkBoxArchived" id="checkBoxArchived">' +
                '<label for="checkBoxArchived">&nbsp; Private</label>' +
            '</div>';

        document.body.insertAdjacentHTML('afterbegin',  fixture);
    });

    // remove the html fixture from the DOM
    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });

    beforeEach(function() {
        spyOn($, 'getJSON').and.callFake(function(url, success) {
            success(bitlyLinks);
			etc....
```

I've tried to provide enough context so you can see exactly where to put it. The code is quite simple:

- We put the HTML for our checkboxes in a string called **fixture**.
- We use the built-in JavaScript **insertAdjacentHTML** function to insert out HTML into the empty body of the document object provided by the instance of **PhantomJS** launched by karma. (This would work if we used **Chrome** instead of **PhontomJS**).
- After the test is done, remove the **fixture** to ensure that one test does not rely on the results of another test.

With this code in place our calls to **document.getElementById** succeed and our tests pass.

If it takes you a moment to wrap your head around this, please sit back and read all this again. It is an extremely useful technique, and one that can help us write much more robust tests.

## Turn it in

Place your code in your repository in a folder with the name specified above. When you submit the assignment include the url of your repository and/or the folder in which the code you created resides. You can also include a comment of your choosing.
