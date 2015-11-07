# Twitter Interactive Comments

Notes for students by Charlie Calvert

## Use jQuery Each to Iterate {#iterate}

Don't forget to iterate over the records you get back from Twitter:

```javascript
$.getJSON('/search', function(result) {
    $('#tweetData').html(JSON.stringify(result, null, 4));
	$.each(result.statuses, function(index, tweet) {
		// Branching in here, as described below.
    });
});
```

In this case, the array we want to iterate over is called **result.statuses**. This is an array of objects. We can iterate over it with the jQuery [each method](http://api.jquery.com/jquery.each/).

## Test for URLS {#test-urls}

We need to detect if a Twitter record contains a URL, and to branch one way if it does, and another way if it does not.

If you do not test to see if there are any items in the urls array, then you might get the following error:

```
Uncaught TypeError: Cannot read property 'url' of undefined
```

Part of the fix is test if there are any items in the array:

```javascript
if(tweet.entities.urls.length > 0)
```

## Branch On URL State

Now let's talk about how to properly branch after you have detected the status of the **urls** array. Some students wrote code like this:

```javascript
 $.each(result.statuses, function(index, tweet) {
    console.log(tweet);
    appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
    renderTable(tweet.text, tweet.user.name);
});
```

This won't work because it contains no test to see if there are items in the **urls** array. As result, it can through the **url of undefined** error shown above.

Some students wrote code like this:

```javascript
if(tweet.entities.urls.length > 0)
{
appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
}
renderTable(tweet.text, tweet.user.name);
```

This code is not properly formated. It should look like this:

```javascript
if(tweet.entities.urls.length > 0) {
    appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
}
renderTable(tweet.text, tweet.user.name);
```

The curly brace was on the wrong line, and the **appendUrl** method was not properly indented. These types of formatting errors are dangerous. Without properly it can be hard to see the primary problem here, which is that the **renderTable** method is outside of any branch of the **if** statement.

Before seeing the solution, remember that our code should add the tweet text:

- to the list as a hyperlink if it has a Url

If it does not have a url, it should add it:

- to the list but without a hyperlink
- To the table

**NOTE**: *I'll accept other solutions, so long as you make some clear distinction between links with a URL those without a URL.*

One solution looks like this:

```javascript
if (tweet.entities.urls.length > 0) {
    appendUrl('#tweetList', index, tweet.text, tweet.entities.urls[0].url);
} else {
	$('#tweetList').append('<li>' + tweet.text + '</li>');
    renderTable(tweet.text, tweet.user.name);
}
```

Here we append the url and a hyperlink to the list if the url exists. If there is no url, then we add it to the list, but without a hyperlink. We also add it to the table.

## Format Jade

Some people had trouble properly formatting their Jade. Here is a correctly formatted file:

```jade
extends layout
include mixin-inputs
include mixin-radios
include mixin-buttons
include mixins

block content
    h1= title
    p Welcome to #{title}

    +elfPanel("Tweets Table").elfDiv
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

Indentation is crucial in Jade. You usually start with no indent, and then work in from there. First level has one tab, the second two tabs, and so on. The number of spaces for a tab is up to you. It can 2, 3 or 4 spaces. Or use tabs. You have lots of choices, but you must be consistent. In one of our earlier assignments I detailed how to view tabs and spaces in various editors.
