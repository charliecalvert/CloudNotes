## Proper Mocking

I made some progress on mocking our **fetch**  calls with jest. Recall that our goal is to create a mock implementation of **fetch** that does not make an HTTP REST call over the network. This allows us to run our tests even if our server is not, or cannot, run.

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
- Create a file in that directory called **fetch.js**

First lets create a simple module called **default_data.js** that contains the data we will use in our mock:

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

Below is the source code for our new mock for **fetch**. Put it in a file called **fetch-mock.js**. Note in particular the call to [jest.genMockFromModule][gmm]. That call asks Jest to generate a mock object for the module we want to replace with a mock:

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
