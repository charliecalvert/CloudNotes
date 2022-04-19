---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/TwitterInteractive.md
relativePath: Assignments/TwitterInteractive.md
title: TwitterInteractive
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: TwitterInteractive.md
fileNameHTML: TwitterInteractive.html
---


<!-- toc -->
<!-- tocstop -->

# Twitter Query

The goal of this project is to query Twitter. We will ask for details about our account, but also about things that are happening on Twitter.

While working on this project, use your Delcious and Bitly projects as references. There is lots of code from those programs that will also be used in this project.

## Step One

Make sure you have the most recent scripts:

```bash
cd $JSOBJECTS
git pull
cp $JSOBJECTS/Utilities/NodeInstall/CreateExpressProject ~/bin/.
cp $JSOBJECTS/Utilities/NodeInstall/TestReady ~/bin/.
cp $JSOBJECTS/Utilities/SetupLinuxBox/strip-triple-spaces ~/bin/.
```

If you don't have js-beautify installed globally, which you well might not, then run this command:

```
npm install -g js-beautify
```

Or use a different name for my scripts if you have custom versions with the same name.

I think most of you can then type **i3** to get back to your repositories.

```bash
export TWITTER_PROJECT=Week07-Twitter
CreateExpressProject $TWITTER_PROJECT
cd $TWITTER_PROJECT
TestReady
```

Now run the following commands, one at a time, to confirm that all is well:

```bash
grunt check
grunt test
```

## Step Two

To get started we need to get a **consumer_key** and **access_token_key** from Twitter:

1. Go to: [https://apps.twitter.com/](https://apps.twitter.com/)
1. Sign in. 
1. Make sure you have a mobile phone number set up on your account
1. [Generate an application][gen-app]
1. On the application management page, choose **Create New App**
	1.   name: bc-tweeter-lastname
	1.   description: learning the twitter api
	1.   website: http://www.example.com (or what pleases you)
	1.   callback http://www.example.com/bc-tweeter-lastname
1. Generate the consumer key  (Button one of two)
1. Then generate the access token. (Button two of two)


[gen-app]: https://dev.twitter.com/oauth/overview/application-owner-access-tokens

## Step Three

Querying Twitter is perhaps unnecessarily complex. Fortunately, there is a [node package][npt] that handles the details for us. To get twitter support, start by adding the package:

```
npm install twitter --save
```

This is node package, so it works on the server side. This is as it should be, since it keeps your keys hidden from users. 

Our server side code can go in **routes/index.js**. First we want to include (**require**) the twitter package we downloaded. Then we create an **elfTwitterClient** from our Twitter package and use it when we query Twitter:

```javascript
var Twitter = require('twitter');
var elfTwitterClient;

function getClient() {
    if (!elfTwitterClient) {
        elfTwitterClient = new Twitter({
            consumer_key: 'YOUR CONSUMER KEY HERE',
            consumer_secret: 'YOUR CONSUMER SECRET HERE',
            access_token_key: 'YOUR TOKEN KEY HERE',
            access_token_secret: 'YOUR TOKEN SECRET HERE'
        });
    }
    return elfTwitterClient;
}
```

Here is a request for information about **#node.js**:

```javascript
router.get('/search', function (req, res, next) {
    var client = getClient();

    var params = {q: '#node.js'};
    client.get('search/tweets', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
            res.send(tweets);
        } else {
            console.log(error);
            res.send({fail: error});
        }
    });
});
```

We use **client.get** to retrieve information from Twitter, and we use **res.send** to send that information from the server to the browser.

We'll work on getting random searches a bit later.


[npt]: https://www.npmjs.com/package/twitter

## Step Three

Get our mixins:

```bash
cp ~/Git/JsObjects/Utilities/Templates/JadeMixins/* views/.
```

## Step Four

Notice that our search function calls **router.get**. The **router** object is built into express. The **get** function is a bit of middleware that is called when the browser sends a request to the server. In particular, it responds to URLs that contain the paramter **search**:

```
http://localhost:30025/search
```

Go ahead and paste that URL into your browser's address bar. Your server side method should get called and a lot of JSON should get send back and displayed in a big blob in your browser. To sort out that data, paste it into [http://jsonlint.com/](http://jsonlint.com/).

Of course, we want something a bit more fancy. But by now, you know how to transform data big blobs of JSON into code that someone can use.

The first step might be to declare a little jade:

```
+elfPanel("Bitly Links Table").elfDiv
    div.scroller
        table.table#tableLinks

+elfPanel("Debug", "panel-default").elfDiv
    button.btn.btn-default#getTweets(type='button') Get Tweets
    button.btn.btn-default#search(type='button') Search

    div
        ul#tweetList

    div
        pre#tweetData
```

The second step might be a call to **getJSON**:

```javascript
function search() {
    $.getJSON('/search', function(result) {

    	// STEP ONE:
        //    STRINGIFY THE RESULT AND DISPLAY IT IN THE PRE
        //    TAG WITH THE ID OF: #tweetData

        // STEP TWO:
        //   ITERATE OVER EACH ITEM IN THE RESULT'S STATUSES ARRAY
        //   AND DISPLY THE text PROPERTY IN THE #tweetList

    });
}

$(document).ready(function() {
    'use strict';

    $('#search').click(search)
});
```

At first, just display the **text** property from **statuses** array. Once that is working, you might want to get the first url from the **urls** array in the **entities** property and turn the text field into a hyperlink. More specifically:

Our code should add the tweet text:

- to the list as a hyperlink if it has a Url

If it does not have a url, it should add it:

- to the list but without a hyperlink
- To the table

It is **very important** that you test to make sure there are actually are URLs in the **entities.urls** array. If there are none, and you try to access one, then your code will throw a variable **undefined** error.

The data you get back is shaped a bit like this:

```json
{
  "statuses": [
		{
            "metadata": {
                "iso_language_code": "en",
                "result_type": "recent"
            },
            "created_at": "Tue Nov 03 19:25:02 +0000 2015",
            "id": 661625149184213000,
            "id_str": "661625149184212992",
            "text": "Understanding Components in Ember 2 https://t.co/iaKG6y6wIt #dev #node #js",
            // CODE OMITTED HERE
            "user": {
                "id": 3011007497,
                "id_str": "3011007497",
                "name": "Codi",
                "screen_name": "codi_ar",
                "location": "",
                "description": "",
                "url": null,
                "entities": {
                    "description": {
                        "urls": []
                    }
                },
                "protected": false,
                "followers_count": 11,
                // CODE OMITTED HERE
            },
            "geo": null,
            // CODE OMITTED HERE
            "entities": {
                "hashtags": [
                    { "text": "dev", "indices": [60, 64] },
                    { "text": "node", "indices": [65,70] },
                    { "text": "js", "indices": [71,74] }
                ],
                "symbols": [],
                "user_mentions": [],
                "urls": [
                    {
                        "url": "https://t.co/iaKG6y6wIt",
                        "expanded_url": "http://buff.ly/1Q3yPje",
                        "display_url": "buff.ly/1Q3yPje",
                        "indices": [36,59]
                    }
                ]
            },
            // CODE OMITTED HERE
        },
        // MANY SIMILAR OBJECTS
   ],
   search_metadata: {
        completed_in: 0.026,
        max_id: 661625223423385600,
        max_id_str: '661625223423385602',
        next_results: '?max_id=661623659165937663&q=%23node.js&include_entities=1',
        query: '%23node.js',
        refresh_url: '?since_id=661625223423385602&q=%23node.js&include_entities=1',
        count: 15,
        since_id: 0,
        since_id_str: '0'
 	}
 }
```

Here's a couple utility methods you can use if you don't want to write it yourself:

```javascript
function appendUrl(selector, index, text, url) {
    var anchor = '<a href="' + url + '" target="_blank">' + text + '</a>';
    var details = '<a onclick="detailDelicious(' + index + ')">Details</a>';
    $(selector).append('<li>' + anchor + ' - ' + details + '</li>');
}
```


## Step Five

The final step will be to use our scrolling table for items without links, and our list for any items that have links. Our vice-versa if you prefer. I'm not sure which is best. The point for now is just to get practice with both ways of displaying data.

Here is a method that you might find useful:

```javascript
var renderTable = function (text, user) {
    'use strict';
    var title = '<td>' + text + '</td>';
    var keyword = '<td>' + user + '</td>';
    var tableRowStart = '<tr>';
    $('#tableLinks').append(tableRowStart + title + keyword + '<tr>');
};

```

You would want to call this from your loop in the success callback for **getJSON**. The user should be the user name: **result.user.name** (or something like that).

## Step 5.5 Startup

**NOTE**: *No one has to follow the structure defined in this section. But if you need help building the application, this section might help.*

Normally, we would create a method like this that would initilize our buttons:

```javascript
$(document).ready(function() {
    $('#search').click(twitterRefine.search);
});
```

Let's move it into its own method:

```javascript
var init: function() {
    $('#search').click(twitterRefine.search);
}

$(document).ready(function() {
    'use strict';
    init();
});
```


Then, as we refine the code further, let's move it into an object that holds all the main methods for the program:

```javascript
var twitterInteractive = {

    init: function() {
        $('#search').click(twitterRefine.search);
    },

    appendUrl: function (selector, index, text, url) {
    	// CODE OMITTED HERE
    },

    // LOTS OF CODE OMITTED HERE

};

$(document).ready(function() {
    'use strict';
    twitterInteractive.init();
});
```

There is a unit test called **test-twitter-core.js** and a file called **tweets.js** in **$ELF_TEMPLATES/UnitTest/TwitterInteractive** that can help you define this object. Just copy the test into your spec folder. Don't forget to load **tweets.js** in **karma.conf.js**

## Turn it in

Per usual.

