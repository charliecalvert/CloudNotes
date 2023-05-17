---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts/WebCraftsPubSub.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts
fileName: WebCraftsPubSub.md
relativePath: /WebCrafts/WebCraftsPubSub.md
title: WebCraftsPubSub
directoryName: WebCrafts
category : webcrafts-guide
---

## Overview

The goal of this assignment is to learn how to get the React code to talk to the jQuery code.

We have:

- EC6 React code in **source**
- EC5 jQuery code in **public/javascripts**

The React and jQuery event models are very different. How can we get them to talk to one another?

## Pub Sub

PubSub stands for [Publish-Subscribe][ps]. A [canonical implementation][tp] in JavaScript looks like this:

```javascript
/*
 * jQuery Tiny Pub/Sub
 * https://github.com/cowboy/jquery-tiny-pubsub
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));
```

Save this file as **public/javascripts/tools/tiny-pub-sub.js**

## Link into Client

Again, I will not expect you to understand RequireJs at this point in the quarter. Instead, I will simply give you the updated **main.js**, which now includes code to load our **tiny-pub-sub** code:

```javascript
requirejs.config({
    baseUrl: '.',
    paths: {
        jquery: 'components/jquery/dist/jquery',
        bootstrap: 'components/bootstrap/dist/js/bootstrap',
        control: 'javascripts/control',
        elfLog: 'components/elven-tools/elf-log',
        makeHtml: 'javascripts/make-html/make-html',
        walking: 'javascripts/make-html/walking',
        makeImage: 'javascripts/make-image/make-image',
        imagePicker: 'javascripts/make-image/image-picker',
        display: 'javascripts/tools/display',
        settings: 'javascripts/tools/settings',
        utilities: 'javascripts/tools/utilities',
        reactBundle: 'javascripts/bundle',
        tinyPubSub: 'javascripts/tools/tiny-pub-sub'
    },
    shim : {
        "tinyPubSub" : {
            deps : [ "jquery" ],
            exports : "tinyPubSub"
        }
    }
});

requirejs(['jquery'], function($) {
    'use strict';
    requirejs(['bootstrap', 'control', 'reactBundle', 'tinyPubSub'], function(bootstrap, control) {
        control();
        $('.navbar-nav li.trigger-collapse a').click(function(event) {
            $('.navbar-collapse').collapse('hide');
        });
    });
});
```

We have to shim in **tiny-pub-sub** because it was not designed to be compatible with **RequireJs**.

**NOTE**: _RequireJs is -- very, very slowly -- being replaced with technologies such as ES6 import/export as well as webpack._

## Subscribe

Now that we have **tiny-pub-sub** loaded, we can begin to use it. The idea is simple:

- When the user clicks a button in our React component then a message is published to that effect.
- The jQuery code can listen (subscribe) for these **tiny-pub-sub** events.

In particular, we will respond to clicks on the **make-html** button by publishing an event. On the **jQuery** end, we will listen for this event and load the **makeHtml** page when so instructed.

Here is how we can modify our code in **public/javascripts/control.js** to subscribe to events:

```javascript
function SiteConfig() {
  $('#makeHtml').click(makeHtml.init);
  $('#makeImage').click(makeImage.init);
  $.subscribe('clientMakeHtml', makeHtml.init);
}
```

## Publish

Here is how to trigger the event in **HomeButton.js**:

```javascript
// CODE OMITTED HERE

makeHtml() {
    $.publish('clientMakeHtml', {
        message : "The user wants to makeHtml."
    });
}

render() {
  return <MuiThemeProvider>
        <div>
            <h1>Home Page</h1>
            <RaisedButton
                id="makeHtml"
                style={buttonStyle}
                primary={true}
                onClick={this.makeHtml}>{this.state.makeHtml}</RaisedButton>

            // CODE OMITTED HERE
        </div>
    </MuiThemeProvider>;
};
```

## Turn it in

You will need to add code very similar to that shown here that displays the **makeImage** page. Just follow the pattern already established, but send and respond to **clientMakeImage** messages. When you are done, both of the new React buttons should work.

Push your code and tell me:

- Repository URL
- Branch
- Folder

## Hint

When you move to the second page, the code attaches to a DIV on index.js called #pageLoad. You don't want to delete that node.

[ps]: https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern
[tp]: https://github.com/cowboy/jquery-tiny-pubsub/blob/master/src/tiny-pubsub.js
