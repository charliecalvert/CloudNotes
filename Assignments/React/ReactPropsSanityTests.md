## Overview

Getting ready for the midterm.

There are two pieces:

- Run some sanity tests.
- Convert GetGist from React Function to React Component so we can add state to it.
  - Use the state to allow the user to iterate over the list of Gists.

## But I don't Have any Gists {#no-gists}

I've noticed that not everyone has any gists or only have on gist. Think of gists as a place to store methods that you use a lot. Here are some candidates:

- An example of how to call fetch
- A simple default React Component.
- The **/foo** route that we use in **routes/index.js**
- Bash Scripts that you have written that you don't want to forget
- Your **.my_bash_aliases** file

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

## Update GetGist

Our goal is to be able to iterate over the list of gists you retrieved from your repository. The user should press buttons and see the various items in your list.

Convert GetGist from Function Component to a React Class Component.

If you are currently passing in only a single gist object, change your code so you pass in an array of gistObjects. For instance your **app-init gistList** could have something like this in, at least as a starting point:

```javascript
gistList: [{id: 'unknown1'}, {id: 'unknown2'}]
```

In **GetGist** declare **state** with at least one property called **index**. Use this property to iterate over your **gistList**. Add a **next** and **prev** buttons that increment and decrement state and then update your component state.

- The **next** and **prev** buttons should be declared inside **GetGist**
- GetGist should have an H1 element with this text: Get Gist Component
- You should also have one or two paragraph elements for displaying the date from an individual gist and current value of **appInit.result**.

The point is that much GetGist is self contained. At this point, we will continue to show it on our main page, but we can use HR controls or other techniques to separate it from the other code.

For now, it is okay if your component iterates out of bounds if you press **next** or **previous** one too many times or at the wrong time. I'll ask you to fix that for the midterm, but you don't have to fix it for this assignment.

We should gray out FetchGistList after we call it once, but again, that is for the midterm.

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
