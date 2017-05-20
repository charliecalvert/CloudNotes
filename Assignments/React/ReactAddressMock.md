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

## Using Mocks in Tests

At the top of your address.test.js file, do this:

- jest.mock('whatwg-fetch');


## DataLoader

In the **constructor** for **Address** we have the following code. Its responsibility is to be sure that **localStorage** contains at least 100 records representing the addresses we placed in **address-list.json**.

```javascript
const that = this;
dataLoader.loadAddresses(function(addressCount) {
    if (!addressCount) {
        throw new Error('Cannot get address count in address.js');
    }
    that.addressCount = addressCount;
});
```

This code performs a little trick you have seen before:

- We a variable called **that** equal to **this**.
- Then we create an anonymous callback function.
- In that anonymous function we use that to be sure that we can initialize the variable called **addressCount**.

The **loadAddress** function has one responsibility but two parts:

- First it checks if **localStorage** already contains a copy of the data for our database. If it does, sends the number of records back to address in the anonymous callback and then exits.
- If **localStorage** does not contain our data, then it uses **fetch** to load the data and stuff our records into **localStorage**. When it is done it uses the callback to send the **addressCount** back to **Address**.

Here is some of **DataLoader**:

```javascript

/**
 * Created by bcuser on 5/10/17.
 */

import Logger from '../assets/elf-logger';
const logger = new Logger('data-loader', 'yellow', 'green', '18px');
import {saveByIndex} from '../assets/elf-local-storage';
import 'whatwg-fetch';

export default class DataLoader {

    constructor() {
        this.STORE_SET = ['elven-store', 'set', 'elven-count'];
        this.loadAddresses = this.loadAddresses.bind(this);
    }

    dataLoaded() {
        const elfStore = localStorage.getItem(this.STORE_SET[0]);
        return (elfStore === this.STORE_SET[1]);
    }

    setLocalStorage(addresses) {
        logger.log('SET LOCAL', addresses);
        //localStorage.setItem('elven-store', 'set');
        localStorage.setItem(this.STORE_SET[0], this.STORE_SET[1]);
        //localStorage.setItem('elven-count', addresses.length);
        localStorage.setItem(this.STORE_SET[2], addresses.length);
        addresses.forEach(function(address, index) {
            saveByIndex(address, index);
        });
        return addresses;
    }

    loadAddresses(callback) {
        const that = this;
        if (this.dataLoaded()) {
            logger.log('Using data from localstore');
            callback(localStorage.getItem(this.STORE_SET[2]));
        } else {
            logger.log('Loading data');
            fetch('./address-list.json').then(function(data) {
                const addresses = data.json();
                console.log(addresses);
                return addresses;
            }).then(function(data) {
                logger.log(JSON.stringify(data, null, 4));
                //console.log(that);
                that.setLocalStorage(data);
                callback(data.length);
            }).catch(function (err) {
                logger.log(err);
            });
        }
    }
}
```

## Elf Local Storage

The **DataLoader** code is specific to our current project. Here is a helper object with **localStorage** calls that could be reused in multiple programs. Save it as **elf-local-storage.js** in your assets directory.

```javascript
/**
 * Created by Charlie on 5/8/17.
 */

const ELF_TAG = 'elf';

const padNumber = function(numberToPad, width, padValue) {
    padValue = padValue || '0';
    numberToPad += '';
    if (numberToPad.length >= width) {
        return numberToPad;
    } else {
        return new Array(width - numberToPad.length + 1).join(padValue) + numberToPad;
    }
};

function saveByIndex(item, index) {
    if (typeof item === 'object') {
        item = JSON.stringify(item, null, 4);
    }
    const key = ELF_TAG + padNumber(index, 4, 0);
    localStorage.setItem(key, item);
}

function getByIndex(index) {
    const key = ELF_TAG + padNumber(index, 4, 0);
    return JSON.parse(localStorage.getItem(key));
}

function removeElfKeys() {
    for (var key in localStorage) {
        if (key.startsWith(ELF_TAG)) {
            localStorage.removeItem(key);
        }
    }
}

function clearLocalStorage() {
    localStorage.clear();
}

export {saveByIndex, getByIndex, removeElfKeys, clearLocalStorage};
```

## Load Local Data

In **onAddressChange** load data from the localStore:

```javascript
onAddressChange(event) {
    detailLogger.log('onAddressChange called with', event.target.id);
    if (event.target.id.startsWith('dec')) {
        if (this.addressIndex > 0) {
            this.addressIndex -= 1;
        }
    } else {
        if (this.addressIndex < this.addressCount) {
            this.addressIndex += 1;
        }
    }
    detailLogger.log('addressIndex', this.addressIndex);
    const address = getByIndex(this.addressIndex);

    this.setState({
        address: address
    });
};
```

## Turn it in

I'll be grading **React Address Mock** and **React Address DataMaven** assignments at the same time from the same codebase. You will get two grades, but I will be looking at one copy of **CongressAddress** when I grade them. I don't want to have to get two versions of **CongressAddress** going. Therefore, I will start a single version of the program, run the tests, and expect to be able to grade both assignments based on the code from the same commit. Two assignments, one version of **CongressAddress**:

- [React Address Mock][ram]
- [React Address DataMaven][radm]

Once you have a version of **CongressAddress** that contains code fulfilling the requirements for both assignments, then you should push, branch and tag:

```
git add .
git commit -m "Code for React Address Mock and React Address DataMaven"
git push
git branch week07-DataMavenMock
git tag -a v7.X.X -m "Code for React Address Mock and React Address DataMaven"
git push origin v7.X.X
```

Of course, the X.X bit would contain your idea of the appropriate numbering scheme. For instance: **v7.0.0**.

[edeg]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab
[ram]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressMock.html
[radm]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressDataMaven.html

## Hint Tagging

- [Git Tag][git-tag]
- [Understanding Tags][under-tag]

[git-tag]: http://www.elvenware.com/charlie/development/cloud/Git.html#git-tag
[under-tag]: http://www.elvenware.com/charlie/development/cloud/Git.html#understanding-tags
