## Overview

We want to write Jest tests that use a mock implementation of **fetch** that does not make an HTTP REST call over the network. This allows us to run our tests even if our server is not, or cannot, run. The point is that our tests should not depend on the state of the network, and should need minimal setup. If we can run the tests without having to start our server, then we are likely to run them more often. Also, this allows us to test just our client, without having to worry about errors (404, 500) that might occur on the server side.

## Get Started

Do your work in **GitExplorer**. If you don't a **GitExplorer** project yet, then work in **Week02-RestBasics**, **Micros** or wherever it is that you have code that has a **client** and **server** as well calls to one or more microservices. The test should be in the **client** project.

## Proper Mocking

This implementation allows us to use **_exactly_** the same code in **App.js** when we are testing and when we are running our app normally. In particular, here are the imports in **App.js**, or wherever we are calling **fetch**:

```javascript
import React, { Component } from 'react';
import './App.css';
```

And here is our call to **fetch**:

```javascript
fetch('/api/foo')
    .then((response) => {
        console.log('GETONE-FETCH-ONE', response.ok);
        return response.json();
    }).then((json) => {
        console.log('GETONE-FETCH-TWO');
        console.log('parsed json', json);
        that.setState(() => json);
    }).catch((ex) => {
        console.log('parsing failed', ex);
    });
```

Over time, you can comment out the calls to **console.log**. But they might be helpful at first when you are trying to understand what is going on.

## Create Mock Data

To test this code without running our server we use the mock library built into Jest. Here is how to get started:

- Create a new folder in the root of your project called: **\_\_mocks\_\_**
  - Two underscores, the word mocks, two more underscores
- Create a file in that directory called **fetch.js**

Create a module called **mock-data.js**. It contains a **switch** statement on a URL that returns the data we will use in our mock:

```javascript
const getData = (url) => {
    switch (url) {
        case '/api/foo':
            return {
                status: 'Mock Server Happy',
                file: 'api.js',
                result: 'success'
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

This code simply creates sets of data that mimic what our server would return given a call to a specific **URL**.

## Mocking fetch

Below is the source code for our new mock for **fetch**. Put it in a file called **fetch.js**. Note in particular the call to [jest.fn().mockImplementation][gmm]. That call asks Jest to generate a mock object for the module we want to replace with a mock:

```javascript
import getData from './mock-data';

'use strict';

const elfFetch = (url) => {
    return new Promise((resolve) => {
        resolve({
            ok: true,
            json: function() {
                return getData(url);
            }
        });
    });
};

global.fetch = jest.fn().mockImplementation(elfFetch);

module.exports = elfFetch;
```

The point here is that the real call to fetch won't be called. Instead, our mock implementation of **fetch** will be called. Inside the function, we can control exactly what is returned. Thus we get two benefits:

- We don't have actually run a server or maintain a network in order to test our client side code.
- We can control exactly what our fake "server" returns. This ensures that our client gets the data we expect every time. We can set things up so that it gets bad data, so we can see how the client handles that scenario. But whether we pass in good data or bad, we can be reasonable sure that our tests are set up properly.

## Working with create-react-app

If you use **create-react-app** to bootstrap your project, then the code in __mocks__ won't be called automatically. Instead, create a file called **[src/setupTests.js][sut]** with the following contents:

```JavaScript
require('../__mocks__/fetch');
```

You could arrange your code differently, but I think keeping the __mocks__ folder helps make our code transparent and properly refactored.

## Writing the Test

Here is a test:

```javascript
it('renders state of File paragraph after button click', (done) => {
    const wrapper = shallow(<App appInit={appInit}/>);
    const statusParagraph = <p className="App-intro">status: Mock Server Happy</p>;
    wrapper.find('#queryServer').simulate('click');
    setTimeout(() => {        
        elfDebugEnzyme.getFirst(wrapper, 'p');        
        expect(wrapper.contains(statusParagraph)).toBe(true);
        done();
    }, 0);
});
```

It took me a long time to see that this would work. The one drawback is that the code in [setImmediate][sim] completely blows up if our tests fail. If that happens, then use a call to expect that you know will pass. Then you can see your **ElfDebugEnzyme** output and hopefully understand what is wrong. Here is the relevant code fragment:

```javascript
setImmediate(() => {
    wrapper.update();
    elfDebugEnzyme.getFirst(wrapper, 'p');
    expect(true).toBe(true); <=== UNLIKELY TO FAIL ==<
    //expect(wrapper.contains(statusParagraph)).toBe(true);
});
```

An alternative is to add **try-catch-finally** statement:

```JavaScript
it('renders state of File paragraph after button click', () => {
    const wrapper = shallow(<App appInit={appInit}/>);
    const statusParagraph = <p className="App-intro">status: Mock Server Happy</p>;
    wrapper.find('#queryServer').simulate('click');
    setImmediate(() => {
        wrapper.update();
        elfDebugEnzyme.getFirst(wrapper, 'p');
        try {
            expect(wrapper.contains(statusParagraph)).toBe(true);
        } catch (e) {
            console.log(e);
        }
    });
});
```

That won't crash the tests.

If the above seems too problematic, try using **setTimeout** instead of **setImmediate**:

```JavaScript
it('renders state of File paragraph after button click', (done) => {
    const wrapper = shallow(<App appInit={appInit}/>);
    const statusParagraph = <p className="App-intro">status: Mock Server Happy</p>;
    wrapper.find('#queryServer').simulate('click');
    setTimeout(() => {
        wrapper.update();
        elfDebugEnzyme.getFirst(wrapper, 'p');        
        expect(wrapper.contains(statusParagraph)).toBe(true);
        done();
    }, 1);
});
```

Here we call **done** to tell Jest that we are through with our test.

This code also is a bit messy when our test fails, but it does not fail as catastrophically as **setImmediate**. If you want, you can put in the **try-catch-finally**, and then it fails relatively cleanly. Here you can see a code fragment that shows how it works:

```javascript
setTimeout(() => {
    wrapper.update();
    elfDebugEnzyme.getFirst(wrapper, 'p');
    try {
        expect(wrapper.contains(statusParagraph)).toBe(true);
    } catch (e) {
        console.log(e);
    } finally {
        done();
    }
}, 1);
```

## Turn it in

Push your work. Specify branch and folder when you turn it in:

- Branch: XXX
- Folder: YYY

[sut]: https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/template/README.md#testing-components
[sim]: https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate

## Quick and Dirty

This can be a quick and dirty way to get your tests running. At the top of your test module, add a **beforeEach**

```JavaScript
describe('Test App', function() {

    beforeEach(function() {

        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                resolve({
                    ok: true,
                    json: function() {
                        return {
                            status: 'barso',
                            file: 'api.js',
                            result: 'result'
                        };
                    }
                });
            });
        });

    });

    // TESTS OMITTED HERE
});
```

This is the same code as found in our **__mocks__/fetch.js** file, but it is a bit more difficult to reuse in multiple test modules. It is also less flexible, since we aren't taking into account the URL passed to **fetch**. But code like this can be useful in some cases.
