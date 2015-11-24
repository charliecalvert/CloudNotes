# Isit320 Midterm 2015

This document is still being tweaked, but there is enough here to get you to a reasonably complete state.

Here are the steps to complete the midterm:

Polish the following programs, making sure they run smoothly, test cleanly, and are reasonably complete:

- **BitlyRefine**
- **TwitterRefine** 
- **BootstrapDelicious**

Extend at least one of these programs to support viewing images stored in the cloud. Twitter might be a good choice for this.

Create a new program called **Week08-Midterm**. The program should integrate Delicious, Bitly and Twitter.

Store links in:

- Bitly
- Delicious
- Twitter

**NOTE**: *I have pulled this section of the midterm as too ambitious: **View a *gallery* of images created from Bitly or Delicious links and Twitter posts.** We will do this before the quarter ends, but not yet.*

## What to Build {#overview}

Create a new project based on **Week08-Single-Page-Express**. Alternatively, copy your **Bitly Refine** or **Twitter Refine** application into a new folder labeled: **Week08-Midterm**. If you copied a project, make all the appropriate changes regarding the name of the application. When changing the title in **/routes/index.js** make sure to include your name. For instance: **midterm-lastname**.

Your modified app should have the following as shown in this video:

<iframe width="420" height="315" src="https://www.youtube.com/embed/GZIvzVE5eD0" frameborder="0" allowfullscreen></iframe>

Four radio buttons in a panel labeled **Image Source**:

- Bitly
- Delicious
- Twitter
- Local

When the buttons are selected, search Bitly, Delicious or Twitter for your images. These means you need to create groups or hash tags in Bitly, Delicious and Twitter that will return the results you expect. For instance here is a possible twitter tag for my images: **#calvert-images**.

To make all this work, I created three three files and put them in **public/javascripts/link**:

- bitly.js
- twitter.js
- delicious.js

The code for handling our various link options is in each of these files. The bitly cloud and bitly local requests are handled in **bitly.js**, the twitter requests in **twitter.js**, and the delicious requests in **delicious.js**. In general, the code from the:

- TwitterRefine version of **control.js** is found in **twitter.js**
- DelicousBootstrap version of **control.js** is found in **delicious.js**
- BitlyRefine version of **control.js** is found in **bitly.js**

I tweaked the code here and there, and wrapped stand alone functions in JavaScript literal objects, but otherwise the majority of the code ported over unchanged. In general, the code changes were focused on changes in naming conventions, not in a program logic.

For instance, consider this excerpt from the sole object found in **delicious.js**:

```javascript
var elfDelicious = {

	// CODE OMITTED HERE

	delicious: function() {
        'use strict';
        var subject = $('#subject').val();
        elfDelicious.callDelicious(subject);
    },

    // CODE OMITTED HERE
}
```

As you can see, this is similar to a method found in **BootstrapDelicious**. There was only one change:

```javascript
callDelicious(subject) -> elfDelicious.callDelicious(subject)
```

Make some other minor changes to ensure that the unit tests pass. For instance:

- For better of worse, I have changed **elfDownloads.getBitlyData** to **elfDownloads.getLinks**.

![Midterm Uml Diagram][imu]

[imu]: https://s3.amazonaws.com/bucket01.elvenware.com/images/isit320-midterm-uml-2015.png

## What to Test

And the test runs should look a bit like this:

<iframe width="560" height="315" src="https://www.youtube.com/embed/PCqDX047PdI" frameborder="0" allowfullscreen></iframe>

There is a folder called **$ELF_TEMPLATES/UnitTest/Isit320Midterm2015** which currently contains at least numerous test suites. Use the new *focused specs* feature from Jasmine 2.1 to work with one suite at a time. To do this, change **describe** to **fdescribe** or **it** to **fit**. It you make a suite with **fdescribe**, then just that one suite will run and the others won't clutter your screen:

- [Focused Spec Examples][fse]
- [Focused Spec Announcement for Jasmine 2.1][fsa]

[fse]: http://jasmine.github.io/2.1/focused_specs.html
[fsa]: https://blog.pivotal.io/labs/labs/new-key-features-jasmine-2-1

Don't forget to add this to **karma.conf.js**:

```javascript
reporters: ['spec'],

specReporter: {
    suppressSkipped: true // do not print information about skipped tests
},

plugins: [
    'karma-jasmine',
    'karma-spec-reporter',
    etc...
]
```

Don't forget that moving code in the **link** folder means you have to tweak the **karma.conf.js** files property:

```javascript
files: [
    'public/components/jquery/dist/jquery.js',
    'node_modules/jasmine-jquery/lib/*.js',
    'public/javascripts/**/*.js',
    'spec/test*.js',
    'spec/bitly-links.js',
    'spec/**/*.html'
]
```

The change is in the third line of the array. We morphed **public/javascripts/*.js** to **public/javascripts/\*\*/*.js**. This ensures that all javascripts in the **public/javascripts** and its subdirectiries gets loaded.

**NOTE**: *It is definitely worth the effort to learn at least a little about glob syntax such as \*\*/*.js*

Also make sure all the tests for **BitlyRefine** pass, as expained [here][brut]. The tests for that program are maintained here:

	$ELF_TEMPLATES/UnitTest/BitlyRefine

These tests are similar to the midterm tests, but not identical.

Make sure the **check-karma-grunt-config** bash script passes. This file can be copied from JsObjects to your **~/bin** directory:

```bash
cp $JSOBJECTS/Utilities/NodeInstall/check-karma-grunt-config ~/bin/.
```

Then copy the tests from the **Templates/UnitTest/Isit320Midterm2015** directory to your **spec** folder and make sure they all pass. The goal here is to help you complete the midterm, but getting the tests to pass also effects your grade.

You can have tests of your own besides the ones that I create. It would be good to prefix your tests with your last name:

- lastname-test-basic.js
- lastname-custom-tests.js

And so on. I'm not concerned about the name you give you the test files, only that I can easily tell your tests from my tests. Also, this will ensure that your custom tests are not lost when copy tests from JsObjects.

[brut]: http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyRefine.html#unit-tests

## Create Bitly.html

At some point in development, you want to take most of the jade from **Week08-BitlyRefine** and put it in **views/bitly.jade**. Don't link in **layout.jade** with an **extend** statement.

Then you want to run tests on the HTML generated by **bitly.jade**. To do this, you need to create the **bitly.html** that is loaded automatically by the tests I give you. Here is the command to create that HTML file:

```bash
jade views/bitly.jade --out spec/fixtures
```

A successful run looks like this:

```bash
$ jade views/bitly.jade --out spec/fixtures

  rendered spec/fixtures/bitly.html
```

## Turn it in

Update your Bitly, Delicious and Twitter projects. Create and complete as best you can the midterm, placing it in the folder specified above.

## Hints

Below are various hints, suggestions and details that will help you complete the midterm.

## Objects

The main class in **control.js** should now be called **elfMidterm**. The code for calling the server, creating the URL, and similar tasks should all be in the objects found in the **public/javascripts/link** folder.



- **#isit320-calvert-images**

Make sure the dashes work. I tried this on Bitly: **elf-image**. It did not work. But **image** did. I assume the trouble was the tag.

The query on bitly:

	https://api-ssl.bitly.com/v3/user/link_history?access_token=<TOKEN>&query=image

Display the images in a clickable list. When the user clicks on an item, display the image.

![Midterm Overview](https://s3.amazonaws.com/bucket01.elvenware.com/images/isit320-midterm-2015.png)

## Showing Images

To show an image dynamically, you can start with an image tag in your HTML:

```jade
+elfPanel("Image Display").elfDiv
    img#image
```

Then its nice to have a little code that will fill in the **src** field of the image tag when the user selects an image:

```javascript
hyperlinkUrl: function(index, text, url) {
    var anchor = '<a href="' + url + '" target="_blank">' + text + '</a>';
    var details = '<a onclick="elfDisplay.displayImage(' + index + ')">Details</a>';
    return { title: anchor, keyword: details };
},

displayImage: function(index) {
    var link = elfBitly.getLinkHistoryItem(index);
    $('#image').attr('src', link.keyword_link);
},
```

You have seen a variation of the first method before under the name **appendUrl**. It is used to wrap a bit of text in an anchor. This makes it clickable; it turns it into a hyperlink.

Here is what you **img** tag looks like before the **displayImage** method is called:

```xml
<img id="image">
```

After the **displayImage** method is called, the HTML that you create looks like this:

```xml
<img id="image" src="http://bit.ly/bootstrap-basics-01">
```

The second line of code in the method sets the **src** attribute of the **img** element. This is all that needs to be done to load the image. If you are at all unclear on how the [img tag][img-tag] and its **src** attribute work, please take a moment to do some research on the web. You have to understand those subjects to understand this code, or to continue doing any kind of serious work on the web.

**NOTE**: *In my implementation, both the **hyperlinkUrl** method, which you have seen before, and the **displayImage** method, are part of the **elfDisplay** object.*

[img-tag]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img

## Create Modules

I might well need more before I'm done, but I'm working hard to create small, easy to manage objects:

```bash
[charlie@rohan-gate ~/Git/isit320-calvert-2015/Week08-Midterm]
$ ls -l public/javascripts/
total 16
-rw-rw-r-- 1 charlie charlie 2467 Nov  7 15:19 control.js
-rw-rw-r-- 1 charlie charlie 2357 Nov  7 15:47 display.js
-rw-rw-r-- 1 charlie charlie 1143 Nov  7 15:26 downloads.js
-rw-rw-r-- 1 charlie charlie  475 Nov  7 14:51 movement.js
```

Of course, you will have to load this code in **layout.jade** as shown below.


## Fav-Icon Missing - 404 {#icon-missing}

Sometimes, on startup, you get an error about your favorite icon missing. I believe the **CreateExpressProject** script will put a 32 X 32 image file called called **favicon.png** in your **public** directory. To display the icon, you need to open **app.js**. Around line 17 you will find this code:

```javascript
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
```

Uncomment the second line and change **favicon.ico** to **favicon.png**.

```javascript
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
```

Now the error should go away. You can use any image editor you want to modify the **favicon.png** file. On Linux, the tool of choice is called **gimp**, but simpler tools will probably a do simple job like this just as well.

## Create Launcher

When we run our tests, **control.js** gets loaded. At the bottom (or top) of **control.js** is this code:

```javascript
$(document).ready(function() {
    'use strict';
    $('#localData').prop('checked', true);
    elfMidterm.getLinks(elfDownloads.dataTypes.dtLocal);
    $('#dataSource').click(elfDownloads.dataTypeSelection);
});
```

Notice in particular the call to **getBitlyLinks**. This call, or any similar call, will fail when we are running our tests. There are several solutions to this, but on simple solution is to move **documennt ready** into its own file, and then exclude that file from our tests. In particular, we can create a file called **loader.js**:

```javascript
$(document).ready(function() {
    'use strict';
    elfMidterm.initialize();
});
```

My elfMidterm is in **control.js** and looks like this:

```javascript
var elfMidterm = {

    initialize: function() {
        'use strict';
        $('#localData').prop('checked', true);
        elfCallServer.loadBitly();
        elfBitly.getLinks(elfDownloads.dataTypes.dtLocal);
        $('#dataSource').click(elfDownloads.dataTypeSelection);
    },

};
```

Then load the file in **layout.jade**

```javascript
doctype html
html
    head
        meta(charset='UTF-8')
        meta(name='viewport', content='width=device-width')
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
        link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
        script(src="components/jquery/dist/jquery.js")
        script(src="components/bootstrap/dist/js/bootstrap.js")
        script(src="javascripts/loader.js")
        script(src="javascripts/control.js")
        script(src="javascripts/downloads.js")
        script(src="javascripts/movement.js")
        script(src="javascripts/call-server.js")
        script(src="javascripts/link/display.js")
        script(src="javascripts/link/twitter.js")
        script(src="javascripts/link/delicious.js")
        script(src="javascripts/link/bitly.js")

    body
        block content
```

And exclude it form **karma.conf.js**:

```javascript
files: [
    'public/components/jquery/dist/jquery.js',
    'node_modules/jasmine-jquery/lib/*.js',
    'public/javascripts/**/*.js',
    'spec/test*.js',
    'spec/bitly-links.js',
    'spec/**/*.html'
],

// list of files to exclude
exclude: ['public/javascripts/loader.js'],
```

Now our **document ready** function will get loaded when we run our program, but not when we run our tests.


## Call Server

When the user selects a radio button designating the service he wants to see, this method gets called:

```javascript
elfDownloads.dataTypeSelection = function(event) {
    'use strict';
    if ($('#localData').is(':checked')) {
        $('#radioButtonDisplay01').html('You clicked Local');
        if (elfDownloads.dataType !== elfDownloads.dataTypes.dtLocal) {
            elfDownloads.dataType = elfDownloads.dataTypes.dtLocal;
            elfCallServer.loadBitly();
        }
    } else if ($('#bitlyData').is(':checked')) {
        $('#radioButtonDisplay01').html('You clicked Bitly ');
        if (elfDownloads.dataType !== elfDownloads.dataTypes.dtBitly) {
            elfDownloads.dataType = elfDownloads.dataTypes.dtBitly;
            elfCallServer.loadBitly();
        }
    } else if ($('#deliciousData').is(':checked')) {
        if (elfDownloads.dataType !== elfDownloads.dataTypes.dtDelicious) {
            $('#radioButtonDisplay01').html('You clicked Delicious ');
            elfDownloads.dataType = elfDownloads.dataTypes.dtDelicious;
            elfCallServer.loadDelicious();
            return;
        }
    } else if ($('#twitterData').is(':checked')) {
        if (elfDownloads.dataType !== elfDownloads.dataTypes.dtTwitter) {
            $('#radioButtonDisplay01').html('You clicked Twitter ');
            elfDownloads.dataType = elfDownloads.dataTypes.dtTwitter;
            elfCallServer.loadTwitter();
            return;
        }
    }
    elfDownloads.getLinkData();
};
```

If the user chooses either local or cloud bitly, then **elfCallServer.loadBitly** is called. If they choose delicious or twitter, then similar methods is **elfCallServer** are triggered.

The code in **elfCallServer** handles:

- Calling the server to ask it to transform JADE into HTML and to send it to us via HTTP. For instance, delicious.jade becomes delicious.html.
- Call a setup method that ensures that the buttons and other controls for programs are properly initialized.

The one exceptoin is **bitly** which still just uses the **downloads** object to set up its display. This will need to be changed in a later version.

```javascript
var elfCallServer = {

    loadBitly: function () {
        'use strict';
        $('#displayContainer').load('/bitly');
    },

    loadDelicious: function () {
        'use strict';
        $('#displayContainer').load('/delicious', function (response, status, xhr) {
            if (status == 'error') {
                var msg = 'Sorry but there was an error: ';
                console.log(msg + xhr.status + ' ' + xhr.statusText);
            } else {
                elfDelicious.deliciousSetup();
            }
        });
    },

    loadTwitter: function () {
        'use strict';
        $('#displayContainer').load('/twitter', function (response, status, xhr) {
            if (status == 'error') {
                var msg = 'Sorry but there was an error: ';
                console.log(msg + xhr.status + ' ' + xhr.statusText);
            } else {
                elfTwitter.twitterSetup();
            }
        });

    }
};
```

## Find Images

A discussion of how to find and store images will be on elvenware in [cloud/FindImages page][find-images]. For now, however, you can find it [on ccalvert.net][cfimg].

[find-images]:http://www.elvenware.com/charlie/development/cloud/FindImages.html

[cfimg]:http://www.ccalvert.net/development/cloud/FindImages.html

## Package Compare

Sometimes it helps to compare the **package.json** files for two projects when you want to combine them. For instance, if we are trying to add TwitterRefine code to our midterm, then compare the TwitterRefine package.json file to the midterm package.json file. See if there is something obvious missing that you include in the TwitterRefine package.json that should be in the Midterm **package.json**. In this particular case, the following line might be relevent:

	"twitter": "^1.2.5"

The version is not some important, just the inclusion of the twitter package in **package.json**. You will, of course, have to either:

- Add the package to **package.json** by running npm install twitter --save-dev
- Or run **npm install** after editing **package.json** by hand.
