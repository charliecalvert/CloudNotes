# React Props

We will learn a bit about React props by continuing to expand the **week02-rest-basics** program. We will try to understand properties, and to see how they can be passed from one component to another.

## Tag

Since we are often working on a single project that has multiple phases, let's create a Git **tag** marking our current status:

```bash
$ git tag -a v3.0.0 -m "Start Week03"
$ git push origin v3.0.0
$ git tag -n1
```

The first command creates a tag that has a message associated with it. The message works much like the message in a commit.

The second command pushes the tag from your local machine to the cloud.

The last command lists your tags and their message on one line. If you have only a single tag, it is not particularly useful, but once you have multiple tags you will see how helpful this can be. Increase the value of the number after -n? to see more information about your tag. You can read about tags here:

- [git tag docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

You might create multiple tags for an assignment, but one of the tags should be made just after you commit and push the code you want me to see. Then turn in that tag with the assignment.


## New Branch

If you have not already done so, create a new branch called **Week03**. You **must** put your homework for week three in this branch! (You can do it!)

```bash
git branch Week03
git checkout Week03
```

Write some code, commit your work. Push it:

```bash
git push --set-upstream origin Week03
```

## Images and CSS

I found images here:

- <https://pixabay.com/en/gold-fish-aquarium-goldfish-fins-30831/>
- <https://pixabay.com/en/goldfish-fins-tropical-animal-47022/>
- <https://commons.wikimedia.org/wiki/File:Small_SVG_house_icon.svg>
- <https://commons.wikimedia.org/wiki/File:Flower-of-Life-91circles36arcs.svg>
- <https://commons.wikimedia.org/wiki/File:Tree-of-Life_Flower-of-Life_Stage.svg>

For instance:

```bash
cd src
mkdir images
cd images
wget https://upload.wikimedia.org/wikipedia/commons/6/60/Tree-of-Life_Flower-of-Life_Stage.svg
```

Now modify the line in **App.js** that loads your logo. You should load the image you downloaded instead. Note that I have picked an SVG file which should both be small and should load quickly.

Depending on your tastes and the image you choose to load, you may also want to edit the **background-color** for the **.App-header** in **App.css**.

To find more images you might like, try this search in Chrome/Chromium:

```
https://www.google.com/search?q=svg+free+small
```

In Google, turn to the images page. Select tools, and select **Labeled for non-commercial reuse** or something similar.

Also, let's put our images and CSS in their own folders:

- **src/css**
- **src/images**

You will need to make some changes to your code after doing this. In fact, you may have to play with these paths several times over the course of this assignment.

## Modularize

The key goal will be to move **App.js** to **components/App.js**. Then break **App.js** into discrete components such as **components/Header.js**, **components/GetFoo.js** and **components/SmallNumbers.js**.

The simplest way to proceed, I believe, is to copy **App.js** into **SmallNumbers.js**. Now delete everything from **SmallNumbers** that is not related to numbers. Go back to **App.js** and delete everything related to numbers from that file.

## Props

In **index.js** pass in some default numbers to **components/smallNumbers.js**:

```javascript
var numbersInit = {
    nine: '0',
    eight: '0'
};

ReactDOM.render(
  // CODE OMITTED HERE

     <SmallNumbers numbers={numbersInit} />
  </div>,
  document.getElementById('root')
);
```

And then use it in **SmallNumbers.js**:

```javascript
constructor(props) {
    super(props);
    this.state = {
        nine: props.numbers.nine,
        eight: props.numbers.eight
    }
}
```

## Put NumbersInit in its Own File {#num-int}

I called mine **numbers-data.js**, and for now, mine happens to be in the **src** directory, but ultimately we might want to refactor and move it elsewhere:

```javascript
export default {
    nine: '0',
    eight: '0'
};
```

Of course, you will now need to import this data into **index.js** and into your tests:

```javascript
import numbersInit from './numbers-data';
```

## Query the GitHub API

Install request: **npm install --save request**

In **server/routes/api.js** add this method. If you have GitHub account, use yours, not mine:

```javascript
var request = require('request');

// EXISTING CODE OMITTED HERE
router.get('/user', function(req, res, next) {
    const options = {
        url: 'https://api.github.com/users/charliecalvert',
        headers: {
            'User-Agent': 'request'
        }
    };

    request(options, function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        res.send({error: error, response: response, body: body});
    });

});
```

## Tests

As you refactor your components, your tests might need to change. For instance, if you move the H1 for your app into **components/Header.js**, you might need to change your tests. Consider this code:

```javascript
import App from './App';

// Code omitted here

it.only('renders and reads H1 text', () => {
    const wrapper = shallow(<App />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

It will likely end up like this:

```javascript
import Header from './components/Header';

// Code omitted here

it.only('renders and reads H1 text', () => {
    const wrapper = shallow(<Header />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

## Proper Mocking

I made some progress on mocking our **whatwg-fetch**  calls with jest. Recall that our goal is to create a mock implementation of fetch that does not make an HTTP REST call over the network. This allows us to run our tests even if our server is not, or cannot, run.

This new implementation allows us to use **_exactly_** the same code in **App.js** when we are testing and when we are running our app normally. In particular, here are the imports in **App.js**, or wherever we are calling **fetch**:

```javascript
import React, { Component } from 'react';
import './App.css';
```

And here is our call to **fetch**:

```javascript
fetch('/api/foo')
    .then(function (response) {
        console.log('GETONE-FETCH-ONE');
        return response.json();
    }).then(function (json) {
        console.log('GETONE-FETCH-TWO');
        console.log('parsed json', json);
        that.setState(foo => (json));
    }).catch(function (ex) {
        console.log('parsing failed', ex);
    });
```

As you can see, this code is back to our initial syntax. In particular, we are no longer passing this as the first parameter:

```javascript
fetch(this, '/api/user') <===== WE NO LONGER NEED this. COMPARE TO CODE ABOVE.
fetch('/api/user') <===== THIS IS HOW IT SHOULD LOOK NOW.
```

So how do we perform this miracle? To make a long story short: we use the mock library built into Jest. Here is how to proceed:

- Create a new folder in the root of your project called: **\_\_mocks\_\_**
  - Two underscores, the word mocks, two more underscores
- Create a file in that directory called **whatwg-fetch.js**

First lets create a simple module that contains the data we will use in our mock:

```javascript
const getData = (url) => {
    switch (url) {
        case '/api/foo':
            return {
                foo: 'bar',
                file: 'api.js'
            };

        case '/api/user':
            return {
                error: {},
                response: {},
                body: JSON.stringify({
                    login: 'Robin Dudette'
                })
            };

        default:
            return {}
    }
};

export default getData;
```

This code simply creates sets of data that mimic what our server would return given a call to a specific **url**.

Below is the source code for our new mock for **fetch**. Note in particular the call to [jest.genMockFromModule][gmm]. That call asks Jest to generate a mock object for the module we want to replace with a mock:

```javascript
import getData from './mock-data';

'use strict';

const whatwgFetch = jest.genMockFromModule('whatwg-fetch');

var fetch = function(url) {

    var objectState = getData(url);

    var response = {};
    response.json = function() {
        return objectState;
    };

    console.log("FETCH STATER", objectState);
    return {
        then: function(func) {
            console.log('FETCH TEST ONE', func(response));
            return {
                then: function(func) {
                    //func(JSON.stringify(stater));
                    func(objectState);
                    return {
                        catch: function() {

                        }
                    }
                }
            }
        }
    }
};

whatwgFetch.fetch = fetch;
window.fetch = fetch;

module.exports = whatwgFetch;
```

Over time, you can comment out the calls to **console.log**. But they might be helpful at first when you are trying to understand what is going on. Note in particular that we are now putting calls to the callbacks (func) passed into our labyrinthine series of **return** statements. The most important is the second call to **then** where we pass back the **stater** object. Recall that this is used as follows in our call to **fetch**:

```javascript
.then(function (json) {
    console.log('GETONE-FETCH-TWO');
    console.log('parsed json', json);
    that.setState(foo => (json));
})
```

## Logger Console {#control-console}

Here are Three steps to a poor man&#39;s logger:

- Declare a boolean in your constructor on your object called **quiet**.
- Create a method on your object called **debug**
- Use **debug** instead of console.log

Perhaps a bit like this:

```javascript
constructor() {
    super();
    this.state = {
        file: 'File Result will be placed here.',
        foo: 'waiting for express server'
    };

    // SET quiet TO false TO SEE DEBUG MESSAGES    
    this.quiet = true;
    this.debug('GetFoo constructor called');
}

debug = (message) => {
    if (!this.quiet) {
        console.log(message);
    }
};

getFoo = () => {
    const that = this;
    fetch('/api/foo')
        .then(function (response) {
            that.debug('GETONE-FETCH-ONE');
            return response.json();
        }).then(function (json) {
            that.debug('GETONE-FETCH-TWO');
            that.debug('parsed json', json);
            that.setState(foo => (json));
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
};
```

## Refactor Tests

Refactor your tests into:

- App.test.js
- GetFoo.test.js
- Header.test.js
- SmallNumbers.test.js

Move tests into their own folder called \_\_tests\_\_.

That's two underscores, the word _tests_, followed by two more underscores.

[Project Structure][proj-struct]

[proj-struct]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-address-refine-project.png

## Turn it in

First commit and push. Then tag and push. With the commit and the tag, create a message that includes the assignment name. When you turn in the assignment, designate the directory in your repo where you did your work.

## Props Single Node Error {#props-single-node}

Please go here:

- [Elvenware React][elf-sync]

[elf-sync]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#props-single-node

## ENOSPC Error {#enospc}

Please look here:

- [Elvenware React][elf-enospc]

[enospc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-enospc.png
[elf-enospc]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#enospc

## Bower

This is an outdated section, and no longer necessary. More specifically, you should already have **bower_components** in your **.gitignore** if you don't, put it there. I am, however, keeping this section for now in case some specific person needs to do this. However, most students can just ignore this entire section.

Unless you are sure you mean to do it. make sure that **components** is not listed in your **.gitignore** files.

Modify the hidden file **.bowerrc** to reference **public/bower-components**.

Add **bower-components** to **.gitignore**:

```
# Dependency directories
node_modules
jspm_packages
bower-components
```

Once again, be sure that you remove **components** from **.gitignore**

Here is **server/views/layout.jade** after this change with **bower-components** instead of **components**:

```javascript
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/bower-components/bootstrap/dist/css/bootstrap.css')
    // CODE YOU NEED TO MODIFY OMITTED HERE
  body
    block content
```


[gmm]: https://facebook.github.io/jest/docs/jest-object.html#jestgenmockfrommodulemodulename
