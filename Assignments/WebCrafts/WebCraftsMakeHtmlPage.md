---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts/WebCraftsMakeHtmlPage.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts
fileName: WebCraftsMakeHtmlPage.md
relativePath: /WebCrafts/WebCraftsMakeHtmlPage.md
title: WebCraftsMakeHtmlPage
directoryName: WebCrafts
category : webcrafts-guide
---

## Overview

The goal of this assignment is to start converting the **MakeHtml** page to React.

Do your work in a branch called **Week07**

## WebPack Source Maps {#webpack}

First, let's do something to improve our development experience. In particular, let's add code that will allows us to debug our ES6 code directly in the [Chrome Developer Tools][cdt]

In **webpack.config.js** add a new property:

```
devtool: "source-map"
```

At runtime, look for a folder in the **source** page for the Chrome Dev Tools that says **webpack**. You have to click around a bit to find your **source** folder, but once you have it, you can set breakpoints and inspect directly on ES6 code. This is much better than having to spelunk through **bundle.js**.

## Run WebPack when Sources Files Change {#webpack-watch}

If we pass in **--watch** to **webpack** then webpack will run automatically when we update one of our ES6 files. This does for WebPack something similar to what **nodemon** does for your ES5 JavaScript files. To get this useful feature, modify the **buildDev** property in **package.json**. (It may be called something else on your system, such as **bundle**. The key thing is to change the property that runs webpack.)

```javascript
"buildDev": "node_modules/.bin/webpack --watch"
```

By adding the **--watch** flag we tell WebPack to monitor our ES6 files referenced in the **entry** property of **webpack.config.js**. This won't refresh our web page automatically, but it will run **webpack** and generate a new **bundle.js** file. Then you can press F5 in the browser to refresh your Web App.

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/glQFWpKRhu4?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Pub Sub Flow {#pubsub-flow}

In the following text, we are going to define, or discuss various events that are published and subscribed to by various parts of our application. The following tables provide an overview of these events.

At this time, they may not make a great deal of sense to you. You should, however refer back to these tables while reading the rest of the discussion. The can help you get an overview of the application.

Don't be concerned if not all these events look familiar. Some of the events are already declared, others will be declared in this document.

Publishers:

| File           | Publisher       | Subscriber      | Why |
| :------------- | :-------------  | :-------------  |  :-------------  |
| HomeButtons    | clientMakeHtml  | control         | Show MakeHtml Page  |
| HomeButtons    | clientMakeImage | control         | Show MakeImage Page |
| MakeHtml       | home            | react-main      | Show Home Page |
| make-html      | reactMakeHtml   | react-main      | Insert React MakeHtml |

Another way to look at the messages:

| Message         | What it does |
| :-------------- | :-------------  |
| reactMakeHtml   | Inserts React code into MakeHtml |
| home            | Inserts React code into home page |
| clientMakeHtml  | Displays MakeHtml page |
| clientMakeImage | Displays MakeImage page |

Here is the flow:

1. The User Clicks the **MakeHtml** button on the home page.
  - In **HomeButtons.js** this causes the **clientMakeHtml** event to be published.
1. Code in **control** subscribes to this event and launches the **MakeHtml** page.
1. The code that loads the **MakeHtml** page also loads the react components associated with out main page.
2. Additionally, an event is fired that allows us to navigate from the **MakeHtml** page back to the Home page.

Since you already understand steps one and two above, the focus in this assignment will be on steps three and four.

## How to Insert React in MakeHtml {#react-in-make-html}

We have already added React buttons with **material-ui** styling to the home page. The next step is to make similar changes to the **MakeHtml** page. Because we need to attach our React code to a DOM node, we cannot insert our React code into the **MakeHtml** page until the **MakeHtml** page is loaded. Our goal, then, is to find the place in our code where the **MakeHtml** page is loaded, and to then piggyback on that code, inserting code that will add our React code after the page is loaded.

This is a serious problem for developers. If you are handed a fairly large code base, you sometimes must spelunk through it looking for the place where certain events take place. In this course, I will step you through that process, but you must take a moment to consider the magnitude of such problems and whether or not you think you are up to them.

Here is what happens when the **MakeHtml** button on the main page is pressed:

- **MakeHtml** button clicked.
- Code found in **public/javascripts/control.js** causes **makeHtml.item** to fire.
  - **$.subscribe('clientMakeHtml', makeHtml.init);**

The question then becomes, where is **makeHtml.init** implemented? At the top of **control.js**, we see this code:

```javascript
define(['makeHtml', 'makeImage'], function(makeHtml, makeImage) { ... });
```

This tells us that the **makeHtml** is loaded by **RequireJs** in **main.js**. In particular, see this line from **main.js**:

```javascripts
makeHtml: 'javascripts/make-html/make-html',
```

Now we know what file to look in. If you open that file, you will find the **init** method near the bottom of the file:

```javascript
return {
    init: function() {
        $('#pageLoad').load('/makers/makeHtml', function() {
          // CODE OMITTED HERE
        });        
    }
};
```

Now we know where the **MakeHtml** page is loaded, and hence where we need to insert our shim for our React code. Add this method to **public/javascripts/make-html/make-html.js**:

```javascript
function publishRectMakeHtml() {
    $.publish('reactMakeHtml', {
        message : "Publisher Constructor Called"
    });
}
```

Note that this code publishes an event call **reactMakeHtml**.

In the same file, make sure our **publishMakeHtml** method gets called when **makeHtml** is displayed:

```javascript
return {
    init: function() {
        $('#pageLoad').load('/makers/makeHtml', function() {
            $('#loadConfig').click(loadConfig);
            $('#walk').click(walk);
            $('#walktype').change(function() {
                radioWalkType = $('input[name=walktype]:checked').attr('id');
            });
            walking.configurePageOne();
            loadConfig();
            publishRectMakeHtml(); <=== HERE
        });
    }
};
```

Here is an overview of this subject:

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/5tg5aX6EvYw?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Go Home

Before we can handle the **reactMakeHtml** message, we have to make a couple simple changes. It turns out that memory is managed better if React has complete control of the DIV on which we place our components. This means we should not use the same DIV for jQuery components that we use for React components. So let's set up two DIVs on **views/index.pug**: one for **jQuery** and one for **React**. For now, I will call the **jQuery** DIV **pageLoad** and the **React** DIV **home**:

```nohighlighting
extends layout

block content

    .jumbotron
        h1 Elven Site Builder

    div#home

    div#pageLoad
        p To see options, select a button above.
```

## React Navigation

The next step is to write code that responds to the publication of the **reactMakeHtml**. Start by **subscribing** to the event in **document ready** block at the bottom of **source/react-main**:

```javascript
$(document).ready(function () {    
    $.subscribe('reactMakeHtml', reactMakeHtml);    
});
```
It turns out that we will need to reference our **home** DIV fairly often. Rather than searching for it each time, let's keep a reference to it:

```javascript
let homeDiv = null;
homeDiv = document.getElementById('home');
$.subscribe('reactMakeHtml', reactMakeHtml);
```    

Finally, let's insert our React components into the Home page at program start and into the MakeHtml page when the appropriate event is published:

```javascript
function reactMakeHtml(event, customMessage) {
    ReactDOM.render(<MakeHtml/>, homeDiv);
}

function home() {
    ReactDOM.render(<ReactHome/>, homeDiv);
}

$(document).ready(function () {
    homeDiv = document.getElementById('home');
    home();
    $.subscribe('reactMakeHtml', reactMakeHtml);    
});
```

## The MakeHtml React code

Here is the code for our new **MakeHtml** component.

```javascript
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class MakeHtml extends React.Component {
    constructor() {
        super();

        this.state = {
            home: 'Go Home'
        }
    }

    goHome() {
        $.publish('home', {
            message: "The user wants to go home."
        });
    }

    render() {

        return <MuiThemeProvider>
            <div>
                <RaisedButton
                    style={buttonStyle}
                    primary={true}
                    onClick={this.goHome}>
                        {this.state.home}
                </RaisedButton>
                <p>This is the React MakeHtml component.</p>
            </div>
        </MuiThemeProvider>;
    };
}

const buttonStyle = {
    margin: '10px 10px 10px 0'
};

export default MakeHtml;
```

Note that it display an event button and **publishes** an event that sends the user back to the home page.

## Go Home

Now lets add additional code to that page that allows us to navigate from the **MakeHtml** page to the Home page:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactHome from './ReactHome';
import MakeHtml from './MakeHtml';

let homeDiv = null;

function reactMakeHtml(event, customMessage) {
    ReactDOM.render(<MakeHtml/>, homeDiv);
}

function reactHome() {
  $('#pageLoad').empty();
  home();
}

function home() {
    ReactDOM.render(<ReactHome/>, homeDiv);
}

$(document).ready(function () {
    homeDiv = document.getElementById('home');
    home();
    $.subscribe('reactMakeHtml', reactMakeHtml);
    $.subscribe('home', reactHome);
});
```

Notice that we first call the jQuery **empty** method to blank out, clear, any content on the **pageLoad** DIV.  After clearing the **pageLoad** DIV, we load the Home React code back in the **home** DIV. This takes us full circle, back to where we were at the start.

## Turn it in

Push your code. When you are done, tell:

- Repository (isit-web-crafts-lastname)
- Branch (Week07)
- Merge your code back into the **master** branch.

## Going Forward

So how do we move forward? How do we begin to integrate React into our code?

Right now I have this configuration, but it will change:

- **source/MakeHtml** is very simple, as shown below

```javascript
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MakeHtmlDropDowns from './MakeHtmlDropDowns';
import MakeHtmlHomeButton from './MakeHtmlHomeButton';

class MakeHtml extends React.Component {
    render() {

        return <MuiThemeProvider>
            <div>
                <MakeHtmlHomeButton/>
                <MakeHtmlDropDowns/>
            </div>
        </MuiThemeProvider>;
    };
}

export default MakeHtml;
```

I'll leave it up to you to put together the **MakeHtmlHomeButton** component, which is obviously very similar to the original **MakeHtml** component shown above.

The **MakeHtmlDropDowns** component has a number of tricks in it. We will review in class:

```javascript
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';

const styles = {
    customWidth: {
        width: 500,
    },
};

const items = [];

class MakeHtmlDropDowns extends React.Component {


    constructor() {
        super();

        this.state = {
            makeImage: 'Make Image',
            makeHtml: 'Make HTML',
            value: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    /**
     * @typedef {Object} configSummary
     * @property {Object} siteDirs
     * @property {Object} destinationDirs
     * @property {String} baseDir
     * @property {String} mostRecentDate
     */
    loadConfig() {
        const that = this;
        fetch('/makers/config')
            .then(function (response) {
                return response.json();
            })
            .then(function (configSummary) {
                //console.log('parsed json', JSON.stringify(configSummary, null, 4));
                items.length = 0;
                configSummary.siteDirs.forEach(function (dir, index) {
                    const showDir = configSummary.baseDir + dir;
                    items.push(<MenuItem value={index} key={index} primaryText={showDir} />);
                });
            })
            .catch(function (ex) {
                console.log('parsing failed', ex);
            });
    }

    componentDidMount() {
        this.loadConfig();
    }

    render() {
        return <MuiThemeProvider>
            <div>
                <h1>Home Page</h1>
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                    autoWidth={false}
                >
                    {items}
                </DropDownMenu>

                <p>This is a DropDown component.</p>
            </div>
        </MuiThemeProvider>
    };
}

var buttonStyle = {
    margin: '15px'
};

export default MakeHtmlDropDowns;
```

This is far from a complete solution, but it should help you get started. What I'm looking for now is your ability to think ahead and create code of your own.

## Alternative way to Clear the jQuery Page {#clear-jquery-page}

We should let React handle the React DIV. The **PageLoad** DIV, however, needs to be cleared when we navigate back home. First, let's declare a bit of Pug code that consists of little more than an empty DIV. I save this as **views/empyt.pug**:

```nohighlighting
block content

    #empty
```

Now in **react-main**, rewrite the **reachHome** code to look like this:

```javascript
function reactHome() {
    $('#pageLoad').load('/empty', function () {
        home();
    });
}
```

Another alternative, here is how to empty a node using pure JavaScript. It works in ie 9+:

```javascript
document.getElementById('pageLoad').innerHTML = '';
```

See also [You Might not Need jQuery](http://youmightnotneedjquery.com/). This site has standard JavaScript code for many of the methods in jQuery. Back in the day, the standard JavaScript code did not run in many browsers, but it does now.

[cdt]: https://developers.google.com/web/tools/chrome-devtools/
