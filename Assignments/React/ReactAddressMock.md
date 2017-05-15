# React Address Mock

- DevOps and TDD: [http://bit.ly/elf-dev-ops](http://bit.ly/elf-dev-ops)
- Elven Unit Tests: [http://bit.ly/elven-unit-tests][eut]

[eut]: http://bit.ly/elven-unit-tests

## Goals

- Mock Local Storage
- Create the mocks folder
- Put two files in it.
  - Mock Data
  - Mock fetch object
- Adjust our Tests

## Mock Local Storage

We are using **localstorage** in our browser. This is not going to be available in our tests since we are not executing our code inside a browser. Instead, we need to mock **localstorage**. We need to create a fake **localstorage** object that emulates what the browser local storage object.

In the browser, the global object is called **window**. **localStorage** is a method of this global objects: **window.localStorage**. In NodeJs the global object is called **global**. So we create **global.localStorage**. In both cases, one can access **localStorage** directly by name. We don't have to write **global.localStorage** or **window.localStorage**. It is not an error to do so, but it is not necessary. Therefore, in both our tests and in a browser, we can just call **localStorage** even though in one case it is called **global.localStorage** and in the other it is called **window.localStorage**.

At the risk of belaboring the point too long, I'll just sum up by saying that we are creating a mock **localStorage** object that acts just like the real **localStorage** object but does not require the presence of the browser and the **window** object.

Below is the code which implements the parts of **localStorage** that we use in our app. This code will be executed during our tests. Place the code near the top of the files that will need access to our data. For instance, if you checking for the value of **firstName** you will probably need the mock. A simple way to determine where it belongs is to simply run the tests in a module and see if they throw an exception saying that **localStorage** is not defined.

**NOTE**: _Remember that we can press the letter 'p' when running tests, then type in all or part of the name of the file for a test. Then only that file will be run. For instance, typing **Address** will run only **Address.test.js**. This works best if you can uniquely identify each file. For instance, if you have tests suites called **FooBar.test.js** and **Bar.test.js** then trying to filter on **Bar.test.js** will get both test suites because both names contain **Bar.test.js**. Typing **FooBar.test.js** will run only the tests in **FooBar.test.js**._

```javascript
// http://stackoverflow.com/a/32911774/253576
beforeEach(function() {
    const localStorageMock = (function() {
        let storage = {};
        return {
            getItem: function(key) {
                return storage[key];
            },
            setItem: function(key, value) {
                storage[key] = value.toString();
            },
            clear: function() {
                storage = {};
            }
        };
    })();
    Object.defineProperty(global, 'localStorage', {value: localStorageMock});

});
```

## Create Mocks Folder

So how do we perform this miracle? To make a long story short: we use the mock library built into Jest. Here is how to proceed:

- Create a new folder in the root of your project called: **\_\_mocks\_\_**
  - Two underscores, the word mocks, two more underscores
- Create a file in that directory called **whatwg-fetch.js**

## Mock Data

First lets create a simple module that contains the data we will use in our mock:

```javascript
/**
 * Created by charlie on 4/18/17.
 */

const getData = (url) => {
    switch (url) {
        case '/getJson':
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

Below is the source code for our new mock for **fetch**. Note in particular the call to [jest.genMockFromModule][gmm]. That call asks Jest to generate a mock object for the module we want to replace with a mock:

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
