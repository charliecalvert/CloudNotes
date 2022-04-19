---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/TwitterRefine.md
relativePath: Assignments/TwitterRefine.md
title: TwitterRefine
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: TwitterRefine.md
fileNameHTML: TwitterRefine.html
---


<!-- toc -->
<!-- tocstop -->

# Twitter Refine

The goal is to:

- Add a new route: **/user-data**
- Pass arbitrary searches to our search function

## Step Zero

Copy your TwitterInteractive project into a new folder of your repository called **Week07-TwitterRefine**. Make the appropriate changes to the program name in:

- **bin/www**
- **routes/index.js**
- **package.json**

And anywhere else that is appropriate.

## Step One

Add a button labeled **User Timeline** and two input controls labeled **Search Query**, **Timeline Query**. For the input control, use **elfInputB** or something else that pleases you.

- [Click here to a screenshot of my interface][tr01]

[tr01]:https://s3.amazonaws.com/bucket01.elvenware.com/images/TwitterRefine01.png

## Step Two

Put this code in **index.jade**. You can replace your existing code, or edit it. In the end, it should look like this:

```
+elfPanel("Debug", "panel-default").elfDiv
    +elfInputB("Search Query", "search", "timeline")#searchQuery
    +elfInputB("Timeline Query", "timeline", "timeline")#timelineQuery
    hr
    button.btn.btn-default#getTimeline(type='button') Timeline
    button.btn.btn-default#search(type='button') Search
```

## Step Three

Make the search query configurable so the user can search on any subject they choose, rather than just **nodejs**.

Here is how to send a custom query from the client to the server. Make these changes in **control.js**:

```javascript
function clearControls() {
	'use strict';
    $('#tweetList').empty();
    $('#tableLinks').empty();
}

function search() {
	'use strict';
    var searchQuery = $('#searchQuery').val();
    $.getJSON('/search', {"q": searchQuery}, function(result) {
        $('#tweetData').html(JSON.stringify(result, null, 4));
        clearControls();
        // ITERATE OVER RESULTS AND SHOW EACH TWEET
    });
}
```

The code above:

- Is called when the search button is clicked
- Retrieves the user query from the input control where it was entered
- Passes the query on to the server with this code: **{'q': searchQuery}**

It so happens that this is the format that twitter wants for the query string. 

Now rewrite the **search** route in **routes/index.js** so it can handle a random query:

```javascript
router.get('/search', function(req, res, next) {
    console.log("Search called");
    var client = getClient();

    console.log(req.query);

    client.get('search/tweets', req.query, function(error, tweets, response) {
        if (!error) {
            res.send(tweets);
        } else {
            console.log(error);
            res.send({
                fail: error
            });
        }
    });
});

```

The query sent by the user can be retrieved from **express** with the **query** property of the **request** object:

```javascript
req.query
```

If the user entered **#nodejs** in the search box, then the query would look like this if echoed to the console:

```javascript
console.log(req.query);
```

That code yields this on the command line:

```javascript
{ q: '#nodejs' }
```

## Step Four

We want to create a new route that searches on a user timeline. In effect, you are searching for tweets by a particular user, rather than tweets on a particular subject. The version of the query shown below will need to be modified slightly to complete the assignment. Right now it contains a hardcoded search on my screen name. You will want to make it possible for the user to enter a random search on any screen name, including your own:

```javascript
router.get('/time-line', function(req, res, next) {
	'use strict';
    var client = getClient();
    var params = {
        screen_name: 'calvertbc'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
            res.send(tweets);
        } else {
            console.log(error);
            res.send({
                fail: error
            });
        }
    });

});
```

For the **timeline** you will can create the search query in a manner very similar to the one shown in the previous section. However, the method should include code that looks something like this:

```javascript
var timeline = $("#timelineQuery").val();
$.getJSON('/time-line', {"screen_name": timeline}, function(result) {
```

## Startup

**NOTE**: *No one has to follow the structure defined in this section. But if you need help building the application, this section might help.*

Normally, we would create a method like this that would initilize our buttons:

```javascript
$(document).ready(function() {
	'use strict';
    $('#getTimeline').click(twitterRefine.getTimeline);
    $('#search').click(twitterRefine.search);
});
```

Let's move it into its own method:

```javascript
var init: function() {
	'use strict';
    $('#getTimeline').click(twitterRefine.getTimeline);
    $('#search').click(twitterRefine.search);
}

$(document).ready(function() {
    'use strict';
    init();
});
```

Then, as we refine the code further, let's move it into an object that holds all the main methods for the program:

```javascript
var twitterRefine = {

    init: function() {
    	'use strict';
        $('#search').click(twitterRefine.search);
        $('#getTimeline').click(twitterRefine.getTimeline);
    },

    // LOTS OF CODE OMITTED HERE
};

$(document).ready(function() {
    'use strict';
    twitterRefine.init();
});
```


## Turn it in

As usual. Submit your repository URL and/or the name of the folder designated above.

## Hints

We allow the user to enter a string such as one of the following, and then display the results of a twitter search on that string. These sites get an awful lot of stupid adds, but still there is some useful material found on these searches:

- **#javascript**
- **#node.js**
- **#jQuery**
- **#html5**
- **#html**
- **#css3**
- **#css**
- **#nodejs**
- **#js**
- **#developer**

When looking for user timelines, try these names, which are more useful than the hashtags above:

- martinfowler
- KentBeck
- jeresig
- codinghorror
- unclebobmartin
- WardCunningham

This Elvenware page may be a useful reference:

- [Twitter Accounts to Follow][taf]

[taf]: http://www.elvenware.com/charlie/development/cloud/TwitterAccountsToFollow.html

