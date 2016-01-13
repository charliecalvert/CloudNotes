# Week11-HyperExplorer

by Charlie Calvert

## Images

If you try to load an image and it fails, do this in your jade:

```jade
+elfPanel("Image Display").elfDiv
    img(onerror="this.src = 'images/default.png'")#image
```

## Put Your Name in Title

Be sure to put your name in **routes/index.js**. I'm grading a lot of assignments, and I want to be able to tell immediately whose assignment is running:

```javascript
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'Hyperlink-Explorer-Calvert',
        author: 'Charles Calvert'
    });
});
```

## Grunt Check

Be sure that **grunt check** passes. By this time, most of the errors returned from **grunt jscs** are probably pretty trivial, but be sure that you final is clean before turning it in. You should also be sure that **grunt jshint** passes.

## Setup Pages

Be sure you call initialize or setup on your pages when you load them.

In the **call-server.js** file that I gave you is the following code:

```javascript
loadTwitter: function() {
    'use strict';
    $('#displayContainer').load('/twitter', function(response, status, xhr) {
        if (status == 'error') {
            var msg = 'Sorry but there was an error: ';
            // $( '#error' ).html( msg + xhr.status + ' ' + xhr.statusText );
            console.log(msg + xhr.status + ' ' + xhr.statusText);
        } else {
            elfTwitter.twitterSetup();
        }
    });
}
```

As you can see, this code calls elfTwitter.twitterSetup. It will not work, of course, unless the **twitterSetup** method exists:

```javascript
twitterSetup: function() {
    'use strict';
    elfTwitter.clearControls();
    $('#getTimeline').click(elfTwitter.getTimeline);
    $('#search').click(elfTwitter.search);
}
```

## Methods in elfDelicious

Most of you delicious and twitter in objects. This means that your code in your jade files needs to qualify the methods in these objects with the object name. Don't write this:

```javascript
button.btn.btn-primary(onclick="delicious()") Search Delicious
```

Instead write this:

```javascript
button.btn.btn-primary(onclick="elfDelicious.delicious()") Search Delicious
```

The difference is **delicious** vs **elfDelicious.delicious**.

## Forms not Needed

In most cases, we don't really need HTML **forms** for our code. But if you do use a form, be sure to handle the submit button in your setup methods for **twitter**, **delicious**, **bitly** or any place you use forms:

```javascript
$("#target").submit(function(event) {
    event.preventDefault();
    var userFormData = $(this).serialize();
    etc...
});
```

Bit if you don't want to handle forms explicitly, then be sure to remove them from your jade. In other words, don't do this: 

```jade
form#target
```
Instead do something like this:

```jade
#target
```

Don't do this:

```jade
+elfFormPanel("Options")#target.elfDiv
```

Instead do this:

```jade
+elfPanel("Options")#target.elfDiv
```

Whether you use HTML **forms** or not is up to you, but we have tended not to use them in most of our code.

## Call renderTable and appendUrl

In your delicious code, and elsewhere, you want to make sure that you are calling **appendUrl** and perhaps also **renderTable** from inside of **elfDelicious.callDelicious** and inside of **elfTwitter.search** and **elfTwitter.timeLine**. Depending on your approach to this part of the project, some of your code might look a bit like this:

```javascript
var elfDelicious = {

    deliciousLinks: null,

    deliciousSetup: function () {
        // CODE OMITTED HERE
    },

    delicious: function () {
        'use strict';
        var subject = $('#subject').val();
        elfDelicious.callDelicious(subject);
    },

    detailDelicious: function(index) {
        'use strict';
        $('#deliciousDetails').html(JSON.stringify(elfDelicious.deliciousLinks[index], null, 4));
    },

    appendUrl: function(index, deliciousLink) {
        // CODE OMITTED HERE
    },

    callDelicious: function (subject) {
        'use strict';
        var feedUrl = 'http://feeds.delicious.com/v2/json/charliecalvert/' + subject;
        $.ajax({
            url: feedUrl,

            dataType: 'jsonp',

            success: function (data) {
                // SOMEWHERE IN HERE CALL APPEND URL
                // IF YOU WANT THE TABLE, THEN ALSO CALL RENDERTABLE
            }
        });
    },

    // CODE OMITTED HERE
};
```


## Optional Tests

Most tests begin with **test-**. To include them, put this in the files object found in **karma.conf.js**:

```javascript
'spec/test*.js',
```

Some tests are optional (extra credit) and begin with **opt**. These are mostly twitter tests, which were added so late in the quarter that I did not want to insist that you include them in the final. Instead I made them optional. These tests begin with **spec/opt-test-**. To include them, write the following in the **files** object found in **karma.conf.js** :

```javascript
'spec/opt-test*.js',
```

When included these tests in my project, I had about 126 total tests.

You may also see some tests that begin **charlie-test-**. You can ignore these tests.  Of course, if you did want to use them, you should add the following to the **files** configuration object in **karma.conf.js**:

```javascript
'spec/charlie-test*.js'
```

## Test Directories

In **$ELF_TEMPLATES/UnitTest/HyperExplorer** there are two directories called **data** and **fixtures**. Your data directory should hold files like:

- bitly-links.js
- delicious-javascript-links.js
- tweets.js
- tweets-timeline.js

There is also a fixture directory. Your fixture directory should hold files like this:

- bitly.html
- delicious.html
- fixture.html
- test-local-cloud.html
- twitter.html

To create some of the fixture code, expand the code in the files directory for **karma.conf.js**:

```javascript
jade: {
    compile: {
        options: {
            pretty: true,
            data: {
                debug: false
            }
        },
        files: {
            'spec/fixtures/delicious.html': ['views/delicious.jade', '$ELF_TEMPLATES/JadeMixins/*.jade'],
            'spec/fixtures/fixture.html': ['views/fixture.jade', '$ELF_TEMPLATES/JadeMixins/*.jade'],
            'spec/fixtures/twitter.html': ['views/twitter.jade', '$ELF_TEMPLATES/JadeMixins/*.jade']

        }
    }
},
```

## Link Index

in bitly.js, in getLinks, set linkIndex to 0:

```javascript
$.getJSON(url, function(result) {
    elfBitly.linkIndex = 0;
```

## Call Delicious

In **delicious.jade**, call **elfDelicious.delicious**, not **elfDelicious.callDelicious**:

```jade
button.btn.btn-primary(type="button", onclick="elfDelicious.delicious()") Search Delicious
```

You need to call delicious so that the index gets sets correctly. Like this:

```javascript
delicious: function() {
    'use strict';
    var subject = $('#subject').val();
    elfDelicious.callDelicious(subject);
},
```

## DataTypeSelection

On some student's assignments, When I switch to Twitter (or sometimes Delicious) I see results from Bitly at first in the Bitly Table Links. A number of things could cause this, but frequently it is related to the implemenation of elfDownloads.dataTypeSelection. In particular, sometimes a call to **elfDownloads.getLinkData**, down at the very bottom of the method, gets triggered.

Here is my current **elfDownloads.dataTypeSelection()**. Frankly, it is not very nice code, it is overly convoluted. But it did clear the problem up on my system, and in the programs of some students. It is question of calling **return** at the right time to so that **elfDownloads.getLinkData** does not get called:

```javascript
elfDownloads.dataTypeSelection = function(event) {
    'use strict';
    if ($('#localData').is(':checked')) {
        // TODO: We shouldn't need to make this check?
        if (elfDownloads.dataType !== elfDownloads.dataTypes.dtLocal) {
            elfDownloads.dataType = elfDownloads.dataTypes.dtLocal;
            elfCallServer.loadBitly();
            elfDownloads.getLinkData();
        }
    } else if ($('#bitlyData').is(':checked')) {
        if (elfDownloads.dataType !== elfDownloads.dataTypes.dtBitly) {
            elfDownloads.dataType = elfDownloads.dataTypes.dtBitly;
            elfCallServer.loadBitly();
            elfDownloads.getLinkData();
        }
    } else if ($('#deliciousData').is(':checked')) {
        if (elfDownloads.dataType !== elfDownloads.dataTypes.dtDelicious) {
            elfDownloads.dataType = elfDownloads.dataTypes.dtDelicious;
            elfCallServer.loadDelicious();
        }
    } else if ($('#twitterData').is(':checked')) {
        if (elfDownloads.dataType !== elfDownloads.dataTypes.dtTwitter) {
            elfDownloads.dataType = elfDownloads.dataTypes.dtTwitter;
            elfCallServer.loadTwitter();
        }
    }
};
```

## Delicious Radio Buttons

I used the bootstrap buttons that acted like radioButtons rather than real radioButtons:

```jade
div.panel.panel-default
    div.panel-heading Click a button to search delicious
    div.panel-body
        div.btn-group.elves(role="group")
            button.btn.btn-default#radioJavaScript(type="button" name='radioChoice') JavaScript
            button.btn.btn-default(type="button" name='radioChoice') Bootstrap
            button.btn.btn-default(type="button" name='radioChoice') Node
```

Then I set it up like this **elfDelicious.deliciousSetup**:

```jade
$('.btn-group .btn').click(elfDelicious.displayRadioButtonSelection);
```

And then handle clicks on the "radio buttons" like this:

```javascript
displayRadioButtonSelection: function() {
    'use strict';
    var id = $(this).text();
    $('#radioButtonDisplay01').html('You clicked ' + id);
    elfDelicious.callDelicious(id);
}
```

We get the text from the button, which will be **javascript**, **bootstrap** or **nodejs**. Then we pass that string to **callDelicious** which retrieves the data for us.

## Delicious Check Boxes

Some students had some trouble with the Delicious section. We should have something like this in **deliciousSetup**, where the name for all the check boxes is **deliciousCheckBox**:

```
$('input[name=deliciousCheckBox]:checkbox').click(elfDelicious.displayCheckboxSelection);
```

And then in the JADE, something like this, where we again spell out the name:

```
div.panel.panel-default
   div.panel-heading Select one or more CheckBoxes to search Delicious
   div.panel-body
       div
           input#chJavaScript(type='checkbox', name='deliciousCheckBox', value='JavaScript')
           label(for='chJavaScript') JavaScript
       div
           input#chBootstrap(type='checkbox', name='deliciousCheckBox', value='Bootstrap')
           label(for='chBootstrap')  Bootstrap
       div
           input#chNodeJs(type='checkbox', name='deliciousCheckBox', value='NodeJs')
           label(for='chNodeJs')  NodeJs
```

It didn't really matter what the name of the checkboxes was, so long as it matched the name of the selector in **deliciousSetup**. In this case, the match was on the word **deliciousCheckBox**.