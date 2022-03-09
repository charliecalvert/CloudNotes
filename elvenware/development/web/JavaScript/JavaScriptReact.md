---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptReact.md
relativePath: elvenware/development/web/JavaScript/JavaScriptReact.md
title: JavaScriptReact
debug: First time
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

# Overview

This page focuses on React. It is part of the Elvenware JavaScript portion of this site. There are other pages that cover React including:

- [React Menus](JavaScriptReactMenu.html)
- [React Native](JavaScriptReactNative.html)

React [Cheat Sheet](https://devhints.io/react) on [devhints.io](https://devhints.io/).

## Create React Application {#create-react-app}

Here is a simple way to create a React Application.

```
npm install -g create-react-app
mkdir ~/Source
cd ~/Source
create-react-app test
cd test
npm start
```

## Choosing a Browser

If you use Lubuntu, you can easily ask **create-react-app** to open Chrome or Chromium, not the default browser, which is FireFox. Click the Gear icon (Menu) at the top right of Lubuntu. Choose **System Settings**. Open up **Details**. Select **Default Applications**. Pick Chrome or Chromium, as you prefer. More details are [here](https://help.ubuntu.com/stable/ubuntu-help/net-default-browser.html)

## State

Each component can have any number of properties, but two properties in React are special:

- state
- props

State tracks the parts of the component that can change. As the official docs say, it is a way of "remembering" those changes.

We declare state in the constructor for a component:

```javascript
constructor(props) {
    super(props);
    this.state = {
        firstName: 'unknown'
    };
}
```

We change state by calling **setState**:

```javascript
handleClick = () => {
    this.setState({ firstName: 'Lisa' });
};
```

We can then display state to the user in the **render** method:

```JavaScript
render() {
  return (
     <section>
         <p>Checked radio: {this.state.firstName}</p>
         <button onClick={this.handleClick} type="button">Click Me</button>
     </section>
  );
}
```

A [working example][wss] is found in JsObjects.

A key point to grasp is that calls to **this.setState** trigger calls to **this.render**.

React components track the features that they can change with **state**. Each component has a **state** property and when it changes **render** is called. We change state with **this.setState**. We usually declare state in a constructor. We display state in the **render** method.

**props** are inherited from a component further up the component hierarchy and they can not, or at least should not, be changed.

- [Learn more about state][sr]

## State and Props

It is important to think about the the difference between State and Props.

![State and Props][sap]

## Sending Props

A common task is to send state to another component as **props**. This is analagous to how we send parameters to an object via a **constructor**.

![Send Props][sp]

## Rest with _fetch_ {#fetch}

Use **fetch** to retrieve data from the server. We make REST calls with **fetch**. For those familiar with jQuery, we will use fetch in lieu of **$.ajax** or **$.getJSON**.

**fetch** will eventually become part of JavaScript in ES6, but for now we have to install it separately:

```
npm install --save whatwg-fetch
```

In some cases, you may need to add it to **webpack.config.js** or **config/webpack.config.dev.js** in the **entry** property:

```javascript
entry: [
    'whatwg-fetch',
    ... and so on
]
```

Here is a simple call to fetch using ES6 arrow function syntax:

```javascript
bar = () => {
    const that = this;
    fetch('/api/foo')
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log('json sent from server', json);            
            that.setState(foo => (json));
        }).catch(function(ex) {
            console.log('parsing failed', ex);
        });
};
```

If the call succeeds, then it is the second **.this** method that gets the data from the server:

```javascript
console.log('json sent from server', json);
that.setState(foo => (json));
```

Here we use it to set a react components state, but exactly what you do with it is up to you. Certainly you don't have to use it set a component's state.

## More on **fetch** {#more-fetch}

You might notice that there are two calls to **.then** methods in our **fetch** promise:

- The first reports on the status of the call
- The second is called when data is returned from the server.

This example checks to **reponse.ok** in the first **.then** method of our promise to see that everything is good:

```javascript
const getServer = (url, dispatch) => {
    fetch(url)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText + '\n' +
                    response.url + '\n' +
                    'status: ' + response.status);
            }
        }).then(function(json) {
            dispatch({
                type: 'YOU-RANG',
                youRang: json
            });
        }).catch(function(ex) {
            alert(ex);
            console.log('parsing failed', ex);
        });

};
```

Or in excruciating detail, here are the things you can check when documenting the status of a call:

```javascript
const getServer = (url, dispatch) => {
    fetch(url)
        .then(function(response) {
            console.log('fetch ok:', response.ok);
            console.log('fetch status:', response.status);
            console.log('fetch statusText:', response.statusText);
            console.log('fetch type:', response.type);
            console.log('fetch url:', response.url);
            console.log('fetch body used:', response.bodyUsed);
            const json = response.json();
            console.log('fetch json:', json);
            if (response.ok) {
                return json;
            } else {
                throw new Error(response.statusText + '\n' +
                    response.url + '\n' +
                    'status: ' + response.status);
            }
        }).then(function(json) {
            dispatch({
                type: 'YOU-RANG',
                youRang: json
            });
        }).catch(function(ex) {
            alert(ex);
            console.log('parsing failed', ex);
        });

};
```

## Mocking Fetch

The next few sections describe how to mock fetch:

## Create Mocks Folder

A powerful mock library called [Manual Mocks][man-mocks] is built into Jest.  To use it, start by:

- Creating a new folder in the root of your project called: **\_\_mocks\_\_**
  - That's two underscores, the word mocks, and two more underscores
- Create two empty files in that directory called **whatwg-fetch.js** and **mock-data.js**.
  - The next two sections describe what goes into these files

[man-mocks]: https://facebook.github.io/jest/docs/en/manual-mocks.html

## Mock Data

First lets create a simple module that contains the data we will use in our mock and call it **\_\_mocks\_\_/mock-data.js**:

```javascript
/**
 * Created by charlie on 4/18/17.
 */

const getData = (url) => {
    switch (url) {
        case './address-list.json':
            return [{
                "firstName": "Lamar",
                "lastName": "Alexander",
                "street": "455 Dirksen Senate Office Building",
                "city": "Washington DC",
                "state": "TN",
                "zip": " 20510",
                "phone": "202-224-4944",
                "website": "https://www.alexander.senate.gov/public",
                "email": "",
                "contact": "http://www.alexander.senate.gov/public/index.cfm?p=Email"
            },
            {
                "firstName": "Roger",
                "lastName": "Wicker",
                "street": "555 Dirksen Senate Office Building",
                "city": "Washington DC",
                "state": "MS",
                "zip": " 20510",
                "phone": "202-224-6253",
                "website": "https://www.wicker.senate.gov",
                "email": "",
                "contact": "https://www.wicker.senate.gov/public/index.cfm/contact"
            },
            {
                "firstName": "Timothy",
                "lastName": "Kaine",
                "street": "231 Russell Senate Office Building",
                "city": "Washington DC",
                "state": "VA",
                "zip": " 20510",
                "phone": "202-224-4024",
                "website": "https://www.kaine.senate.gov",
                "email": "",
                "contact": "https://www.kaine.senate.gov/contact"
            }];

        default:
            return [];
    }
};

export default getData;
```

This code simply creates sets of data that mimic what our server would return given a call to a specific **url**.

## Mock fetch

Below is the source code for our new mock for **fetch** called **whatwg-fetch.js**. Save it and **mock-data.js** in the **\_\_mocks\_\_** folder. Note in particular the call to **jest.genMockFromModule**. That call asks Jest to generate a mock object for the module we want to replace with a mock:

```javascript
/**
 * Created by charlie on 4/17/17.
 */

import getData from './mock-data';

'use strict';

const whatwgFetch = jest.genMockFromModule('whatwg-fetch');

const fetch = function(url) {

    const objectState = getData(url);

    const response = {};
    response.json = function() {
        return objectState;
    };

    //console.log("FETCH STATER", objectState);
    return {
        then: function(func) {
            //console.log('FETCH TEST ONE', func(response));
            return {
                then: function(func) {
                    //func(JSON.stringify(stater));
                    func(objectState);
                    return {
                        catch: function() {

                        }
                    };
                }
            };
        }
    };
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

## Radio Buttons

Declare two radio buttons:

```javascript
var bookRadios = (
    <div>
        <input
            type="radio"
            name="book-radio"
            value="RadioOne"
            id="radio-one"
            checked={this.state.checkedRadioButton === 'RadioOne'}
            onChange={this.handleRadioChange}
        />
        <label htmlFor="radio-one" className="book-radio">Book Radio 2</label>
        <input
            type="radio"
            name="book-radio"
            value="RadioTwo"
            id="radio-two"
            checked={this.state.checkedRadioButton === 'RadioTwo'}
            onChange={this.handleRadioChange}
        />
        <label htmlFor="radio-two" className="book-radio">Book Radio 2</label>
    </div>
);
```

Use them in a render method:

```javascript
render() {
    var bookRadios = (...);

    return (
        <div className="App">
            <section>                
                {bookRadios}                
                <p>Selected radio button: {this.state.checkedRadioButton}</p>
            </section>
        </div>
    );
}
```

Note that we are also displaying some state. Here is how to declare the state and provide method for responding to clicks on the radio buttons:

```javascript
constructor(props) {
    super(props);
    this.state = {
        checkedRadioButton: ''
    };
}

handleRadioChange = (event) => {
    this.setState({checkedRadioButton: event.target.value});
};
```

At this stage you are all set. If you added a button, and the user clicked on it, you couold read **this.state.checkedRadioButton** to determine which button was selected. For instance, add the button in render:

```javascript
render() {
    var bookRadios = ( ... );

    return (
        <div className="App">
            <section>
                <hr/>
                {bookRadios}
                <hr/>
                <p>Selected radio button: {this.state.checkedRadioButton}</p>
                <p>Message: {this.state.message}</p>
                <button type="button" onClick={this.useRadioButtonSelection}>Use Radio Button to set the message</button>
            </section>
        </div>
    );
}
```

Then add a new property called **message** and set the property when the user clicks the button:

```javascript
constructor(props) {
    super(props);
    this.state = {
        checkedRadioButton: 'none',
        message: 'none'
    };
}

handleRadioChange = (event) => {
    this.setState({checkedRadioButton: event.target.value});
};

useRadioButtonSelection = (event) => {
    this.setState({message: "You've chosen " + this.state.checkedRadioButton})
};
```

The most likely source of confusion is that there are two event handlers you need to set up:

- One for handling radio button events
- The other for handling a button click

The first just records the user's choice when they click a button, the second does something with that choice.

There is a [working example][wrb] in JsObjects.

## ENOSPC Error {#enospc}

While testing, If you get an **ENOSPC** error, do this:

- **sudo nano /etc/sysctl.conf**
- Scroll to the bottom of the document.
- Add this line: **fs.inotify.max_user_watches = 524288**
- Save with **Ctrl-O**, exit with **Ctrl-X**.
- Then run: **sudo sysctl -p**

To get the current value:

    cat /proc/sys/fs/inotify/max_user_watches

![More watches][enospc]

**Figure**: _Inside nano, editing **/etc/sysctl.conf**._

## Props Single Node Error {#props-single-node}

Here is the error: _Method “props” is only meant to be run on a single node. 0 found instead._

I got this when I had a mismatch between what I thought a button click method was called and what it was really called. For instance, here is my test:

```javascript
wrapper.find('button#foo').simulate('click');
```

And here is my JSX:

```HTML
<button id="bar" onClick={this.getBar}>Get User</button>
```

Note that the **ID** of the button is **bar**, but I'm trying to **find** something with an **ID** of **foo**. To fix the proplem, bring them into sync:

```javascript
wrapper.find('button#bar').simulate('click');
```

## React in WebStorm

- [From JetBrains](http://bit.ly/webstorm-react)

**NOTE**: _Assuming you are working with ES6, JSX and React, from the menu select **File | Settings | Languages and Frameworks | JavaScript** and set the language version to **React JSX**_


## JSX Comments

Normally we can create comments like this in JavaScript code:

```javascript
/*<p>My Paragraph</p>*/
```

However, that will not work when creating JSX. Instead, we need to put the comments inside curly-braces. The braces, when seen in JSX, mean that we are about to write some JavaScript. They mean that we are switching from writing HTML like code to writing JavaScript. Since the kind of comments shown above are part of the JavaScript language, we have to put them inside curly-braces, like this:

```javascript
{/*<p>My Paragraph</p>*/}
```

## Enzyme mount vs shallow

Suppose one component nests another. For instance, suppose that your custom component **MyComponent** renders a second component called **MyOtherComponent**. Here is **MyComponent&#39;s** render method :

```javascript
class MyComponent extends Component {
  render() {
      return (
          <div>
              <MyOtherComponent />
          </div>
      );
  }
}
```

Here **MyComponent** does nothing but ask **MyOtherComponent** to render itself.

In cases like this, if you use Enzyme&#39;s [shallow][enzsh], you will only see the output from **MyComponent**. During the test, it will seem as though **MyOtherComponent** does not exist, or at least does not render anthing. Indeed, that is often what you want. But sometimes, it is best to see the output from both **MyComponent** and **MyOtherComponent**. To do that, you use **mount** rather than **shallow**. We usually do this:

```javascript
import { shallow } from 'enzyme';
```

If you want to see output from both components, then do this:

```javascript
import { mount } from 'enzyme';
```

[enzsh]:https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md

## React Links

- [React][react]
- [React Native][react-native]
- [JavaScript Versions][js-ver]
- EcmaScript 6
  - [Es6 Luke Hoban][es6-luke]
  - [Es6 Quick View][es6-over]
- create-react-app
  - [Home Page on GitHub][cra-git]
  - [Documentation][cra-doc]
  - [ReactBooks][react-gh-book]
- Jest and Enzyme
  - [Enzyme](http://airbnb.io/enzyme/)

## Enzyme Debug Class {#enzyme-debug-class}

We have several debug functions that we often append to the top of our test files. This violates our DRY principle. As a result, I've created the following simple class which we can reuse in multiple tests:

- [ElfEnzymeDebug][eed]

We could also, at least in theory, add to this class over time as we discover more useful tests.

## Promises

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/nWV4Ed2gckk?ecver=2" width="640" height="360" allow="autoplay" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Chained Promises

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/PU4gq6yTqyA?ecver=2" width="640" height="360" allow="autoplay" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

<!--       -->
<!-- links -->
<!--       -->

[cra-git]: https://github.com/facebookincubator/create-react-app
[cra-doc]: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
[eed]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab
[js-ver]: https://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/
[enospc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-enospc.png
[es6-over]: http://es6-features.org/#ClassInheritance
[es6-luke]: https://github.com/lukehoban/es6features
[react]: https://facebook.github.io/react/
[react-native]: https://facebook.github.io/react-native/
[react-gh-book]: https://github.com/vhf/free-programming-books/blob/master/javascript-frameworks-resources.md
[sr]: https://daveceddia.com/visual-guide-to-state-in-react/

[sap]: https://s3.amazonaws.com/bucket01.elvenware.com/images/AddressProps.svg

[sp]: https://s3.amazonaws.com/bucket01.elvenware.com/images/SendProps.svg
[wss]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/React/simple-state
[wrb]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/React/simple-radio-buttons
