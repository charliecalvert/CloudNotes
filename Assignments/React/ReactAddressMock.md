

So how do we perform this miracle? To make a long story short: we use the mock library built into Jest. Here is how to proceed:

- Create a new folder in the root of your project called: **\_\_mocks\_\_**
  - Two underscores, the word mocks, two more underscores
- Create a file in that directory called **whatwg-fetch.js**

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
