## Overview

Comments on the Twitter Refine assignment.

## Create a Timeline Function

When the user clicks on the **Timeline** button, several things should happen. The first is defined by the ID associated with the button:

```javascript
button.btn.btn-default#getTimeline(type='button') Timeline
```

As you can see, the ID is called **#getTimeline**

We set up an event handler for this button in the **document ready** callback:

```javascript
$(document).ready(function() {
    'use strict';

    $('#getTimeline').click(getTimeline);
    $('#search').click(search);
});
```

The key line, of course, is this one:

```javascript
    $('#getTimeline').click(getTimeline);
```

It states the clicks on the control with the ID **#getTimeline** should be delegated to the **getTimeline** function.

Our implementation for the **getTimeLine** function might look something like this:

```javascript
function getTimeline() {
    var timeline = $("#timelineQuery").val();
    $.getJSON('/time-line', {"screen_name": timeline}, function(result) {
        $('#tweetData').html(JSON.stringify(result, null, 4));
        clearControls();
        $.each(result, function(index, tweet) {
            if (tweet.entities.urls.length > 0) {
                appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
            } else {
                renderTable(tweet.text, tweet.user.name);
                $('#tweetList').append('<li>' + tweet.text + '</li>');
            }
        });
    });
}
```

## Provide Two Paths

Some students are correctly detecting that certain records have a URL associated with them, and that other records do not. However, you should provide a path for both cases, not just one.

Consider this code:

```javascript
 $.each(result, function(index, tweet) {
    if (tweet.entities.urls.length > 0) {
        appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
        renderTable(tweet.text, tweet.user.name);
    }
});
```

This path is clean, and runs smoothly. However, it only displays those tweets that have a URL. We want to display links that have a URL in one place, and those that don't in another place. For instance, this is one possible solution:

```javascript
$.each(result, function(index, tweet) {
    if (tweet.entities.urls.length > 0) {
        appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
    } else {
         renderTable(tweet.text, tweet.user.name);
    }
});
```

In this case, tweets that have a URL associated with the displayed in the clickable list. The others go in the scrollable table.

Another variation on this same problem looks like this:

```javascript
 $.each(result.statuses, function(index, tweet) {
    if (tweet.entities.urls.length > 0) {
        appendUrl("#tweetList", index, tweet.text, tweet.entities.urls[0].url);
    }
    renderTable(tweet.text, tweet.user.name);
});
```

This code renders everything to the table, rather than rendering only the tweets that do not have a link. The fix is the same as above.

## Debug 

When running your code, make sure the debug window is open. Consider the image shown below.

![Debug Twitter][debug01]

Notice the following:

- We are running Chrome/Chromium, not FireFox
- The Chrome Developer Tools are open (F12)
- We are turned to the **Sources** page
- The red circle with the white X at the top right of the Chrome Developer Tools means there is an error
- The blue **>_** symbol to the right of the red circle is toggled on (it is blue). When toggled on, this option displays the **console** at the bottom of the dev tools.
- The console shows our error, which states that "url" is part of an object that is not defined. We can see that the error is on line 33 of **control.js**
- The code in the display shows the actual line causing the problem. It is underlined with a red squiggly. Looking at the left of the display we can confirm that it is on line 33.

Turning to our editor, and moving to line 33, we can see the complete line of code causing the error:

```javascript
appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
```

From the error messages in the dev tools, we now know that **urls[0]** is undefined. This is almost certainly because this particular tweet has no **urls** associated with it. As you know from previous lessons, the fix for this problem is to write something like this:

```javascript
if (tweet.entities.urls.length > 0) { ... }
```

But my point here is not to provide the fix. It is to emphasize how crucially important it is that you use the debugger. I have come around to help many of you during or after class. As you know, the first thing I do is almost always to turn the debugger on. Without it the task of finding an error becomes much more difficult. We **can** walk from here to Tacoma rather than driving, but it is more difficult. We **can** fix problems in our code without the dev tools, but it is indeed much more difficult.

[debug01]: https://s3.amazonaws.com/bucket01.elvenware.com/images/debug-bitly-refine-01.png


## The Giant Jade Search Button {#jade-indent}

Consider this jade:

```javascript

  +elfPanel("Debug", "panel-default").elfDiv
    button.btn.btn-default#getTweets(type='button') Get Tweets
    button.btn.btn-default#search(type='button') Search

      div
        pre#tweetData
```

The DIV and PRE tags at the end are indented too far. As a result, they are shown as children of the button. This means they became the label for the button. The whole bottom of the screen becomes one gigantic button with hundreds of lines of text on it. Try it. If you see this in your program, try clicking on it. You will see that it is a button!

The fix is to move the DIV and PRE tags to the left.

Here it is, the giant search button:

![GiantSearchButton][gsb]

[gsb]:https://s3.amazonaws.com/bucket01.elvenware.com/images/giant-search-button.png

**Image**: *The Giant Seach Button*

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

## Match IDs in Jade and JavaScript

Suppose you declare a button with an id of **getTimeLine**:

```jade
    button.btn.btn-default#getTimeline(type='button') Timeline
```

Then suppose you tried to set up an event handler for that button with code that looks like this:

```javascript
$('#timeline').click(timeline)
```

This is never going to work because the ID specified in the javascript code and the ID specified in the jade are different: **getTimeLine** vs **timeLine**.

The fix would be to match the two IDs:

```javascript
$('#timeline').click(getTimeline);
```

Here I show the jQuery for setting up the button handler in the **document ready** function which is where it frequently goes:

```javascript
$(document).ready(function() {
    'use strict';
    $('#search').click(search);
    $('#timeline').click(getTimeline);
});

```

## Server Query

On the server side, some students wrote something like this:

```javascript
router.get('/search', function(req, res, next) {
    'use strict';
    var client = getClient();
    var params = {
        text: ''
    };
    client.get('search/tweets', params, function(error, tweets, response) {
        if (!error) {
            res.send(tweets);
        } else {
            res.send({
                fail: error
            });
        }
    });
});
```

The problem here is in the second parameter to **client.get**:

```javascript
var params = {
    text: ''
};
client.get('search/tweets', params, function(error, tweets, response) {
```

The right thing to do is delete the declaration for params and take the parameters passed from the client side by access request.query:

```javascript
router.get('/search', function(req, res, next) {
    'use strict';
    var client = getClient();
    /* var params = {
        q: '#node.js'
    }; */
    client.get('search/tweets', req.query, function(error, tweets, response) {
```

If we delete the dead code, it looks like this:

```javascript
router.get('/search', function(req, res, next) {
    'use strict';
    var client = getClient();
    client.get('search/tweets', req.query, function(error, tweets, response) {
```

The req.query bit is supplied on the client side in the second parameter to getJSON:

```javascript
search: function () {
    'use strict';
    var searchQuery = $('#searchQuery').val();
    $.getJSON('/search', {'q': searchQuery}, function (result) {
        $('#tweetData').html(JSON.stringify(result, null, 4));
        clearControls();
        $.each(result.statuses, function (index, tweet) {
            if (tweet.entities.urls.length > 0) {
                appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
            } else {
                renderTable(tweet.text, tweet.user.name);
                $('#tweetList').append('<li>' + tweet.text + '</li>');
            }
        });
    });
},
```

The key line is here, where we pass as the second parameter the tiny object that takes the place of **params** and that becomes **req.query**:

```javascript
$.getJSON('/search', {'q': searchQuery}, function (result) {
```

The object, which defines our search query, looks like this:

```javascript
{'q': searchQuery}
```