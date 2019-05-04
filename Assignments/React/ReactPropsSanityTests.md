## Overview

Getting ready for the midterm.

## Sanity Tests

Let's build some tests that check whether or not we are all building more or less the same application.

- Create a directory called **client/src/sanity**.
- Get the **Sanity.App.test.js** test Suite and put i in your new **sanity** folder.
- Add the following to the **start** property in your **client/package.json** file: **"sanity-test": "react-scripts test Sanity*"**
- Run the test: **npm run sanity-tests** and make sure everything passes.

Needless to say, you cannot change anything in the test. However, I may change the test at some point. I'll try to set up something like **get-gist** so that you can easily get the latest version of my test.

At this time (May 3), a run on my system looks like this:

    PASS  src/sanity/Sanity.App.test.js
    App Tests
    ✓ renders without crashing (5ms)
    ✓ App.js includes the method setData (1ms)
    ✓ App.js includes the method setGistList (1ms)
    ✓ App.js includes the method fetchGistList
    ✓ App.js includes the method queryServer (1ms)
    ✓ checks if App.js exists
    ✓ checks if ElfHeader exists
    ✓ checks if GetGist exists
    ✓ checks if GetUser exists
    ✓ checks if Qux exists
    ✓ checks if TestRoutes exists (1ms)

    Test Suites: 1 passed, 1 total
    Tests:       11 passed, 11 total
    Snapshots:   0 total
    Time:        0.632s, estimated 1s
    Ran all test suites matching /Sanity*/i.

    Watch Usage: Press w to show more.

## Dates

What my tests looked like on various dates. The point being that we build up test suites slowly over time.

April 23:

    Test Suites: 1 failed, 1 total
    Tests:       1 failed, 1 total

April 27:

    PASS  src/tests/GetGist.test.js
    PASS  src/tests/GetUser.test.js
    PASS  src/tests/ElfHeader.test.js
    PASS  src/tests/Qux.test.js
    PASS  src/tests/App.test.js
     ● Console

       console.log src/components/App.js:10
         FOO test


    Test Suites: 5 passed, 5 total
    Tests:       5 passed, 5 total
    Snapshots:   0 total
    Time:        1.189s
    Ran all test suites.

    Watch Usage: Press w to show more.

April 30:

    Test Suites: 6 passed, 6 total
    Tests:       10 passed, 10 total

What my tests looked like on May 3:

    PASS  src/tests/Qux.test.js
    PASS  src/tests/TestRoutes.test.js
    PASS  src/tests/ElfHeader.test.js
    PASS  src/tests/App.test.js
    PASS  src/tests/GetUser.test.js
    PASS  src/tests/GetGist.test.js

    Test Suites: 6 passed, 6 total
    Tests:       12 passed, 12 total
    Snapshots:   0 total
    Time:        1.9s, estimated 2s
    Ran all test suites.

    Watch Usage: Press w to show more.
