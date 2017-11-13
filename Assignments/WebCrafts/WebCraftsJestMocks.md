## Overview

Get rid of the **xmlhttprequest** syntax error when running WebCrafts test.

## Create a Mocks Directory

Just as Jest will look automatically for a **__tests__** directory, it will also look for a __mocks__ directory. Place the directory in the root of your project:

    isit-web-crafts-lastname/__mocks__

## Video

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/neyQ783127E?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Mock fetch

In a unit test, we don't want to try to set up an environment where we can make a real call from our client to our server. Tests should be simpler and faster than that. So we create a mock (fake) **fetch** method that simulates what happens when a call is made from the client to the server.

The is the error we are trying to avoid:

```nohighlighting
console.log source/MakeHtmlDropDowns.js:92
    parsing failed SyntaxError
        at XMLHttpRequest.open (/home/charlie/Git/WebCrafts-Isit320/vinicky/isit-web-crafts-vinicky/node_modules/jsdom/lib/jsdom/living/xmlhttprequest.js:486:15)
```

Our mock object allows us to test our client (browser-based) code against the results returned by a simulated call to the server. The server is not being tested, but the client code is tested. The difference between this and a runtime call is that we can predict exactly what a fake call to the server returns, but at runtime, we can't be sure that a call will even succeed. For instance, our Internet connection could be down, or the server could be down, or the server could be broken. We aren't testing any of those things, only if the client will respond properly if a particular set of data is returned from the server.

We can, of course, test to see how the client responds to various things, such as:

- Good data from the server
- Bad data from the server
- Or even, I think, an exception thrown by the server

Below is our mock version of **fetch** that returns a fake set of data that will be defined in a separate file. Save this as **__mocks__/whatwg-fetch.js**:

```javascript
import getData from './mock-data';

'use strict';

const whatwgFetch = jest.genMockFromModule('whatwg-fetch');

    const fetch = function(url) {

    const objectState = getData(url);

    const response = {};

    response.json = function() {
        return objectState;
    };

    return {
        then: function(func) {
            return {
                then: function(func) {
                    func(objectState);
                    return {
                        catch: function(e) {
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

## Define the Data

Here is the data defined linked in the first line of our mock object:

```javascript
const getData = (url) => {
    switch (url) {
        case '/api/foo':
            return {
                foo: 'url-mock-bar',
                file: 'url-mock-api.js'
            };

        case '/makers/config':
            const configSummary = {
                'base-dir': '/home/bcuser/',
                'bootswatch': 'cosmo',
                'most-recent-date': '2017-08-14',
                'highlight': true,
                'siteDirs': [
                    'Documents/AllTest',
                    'Git/CloudNotes/Isit320'
                ],
                'destinationDirs': [
                    '/var/www/html/AllSite/',
                    '/home/charlie/Git/charliecalvert.github.io/books/CloudNotes/Isit320/'
                ],
                'destination-dirs-extra': [{
                    'base': '/var/www/html/',
                    'extra': ''
                }, {
                    'base': '/var/www/html/Assignments/',
                    'extra': 'Assignments'
                }]
            };
            return configSummary;

        default:
            return {};
    }
};

export default getData;
```

## Sample Tests

To run a sample program that also provides hints as to how ot get started with testing, first clone the sample repo:

    git clone git@github.com:charliecalvert/WebCraftsJestHints.git

Then run the tests and study the code:

    cd WebCraftsJestHints && npm install && npm test

## Turn it in

Update your WebCrafts project so that they tests in the sample are present and all tests pass. You may not modify the tests except to add additional tests. The existing tests cannot change.

Push. Tell me:

- Repo
- Branch

:) Don't try to out think me or second guess me or set me straight. :) Just tell me the name of your repository and the branch you are working on. If there is anything else you think I might need to know, please include that information as well. Thank you!

## Error: Determining test suites {#jest-error}

_Determining test suites to run...Error: This promise must be present when running with -o._

I just spent over an hour wrestling with the above. At this time (jest 21.2.1) if you try to run a jest test with **--watch** outside of a repository you get the above error. There is a workaround: use **--watchAll** instead of **--watch**. I believe this will soon be fixed, but the fix has not yet been released.

They know about the problem, and here is the bug. If you want, click the thumbs up on the bug report at the top, to encourage them to get this fixed:

[https://github.com/facebook/jest/issues/4419](https://github.com/facebook/jest/issues/4419)

I don't really care about the dependency on a .git directory, though it is weird. But the error message has to be better if they are going to do that.

Here is an explanation of **watch** vs **watchAll**:

[https://facebook.github.io/jest/docs/en/cli.html#watch](https://facebook.github.io/jest/docs/en/cli.html#watch)
