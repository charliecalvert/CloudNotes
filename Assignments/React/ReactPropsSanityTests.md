## Overview

**NOTE**: _I'm pushing this out before it is ready so you can be working on it over the weekend, etc. I will update with clarifications and perhaps requests for more code. But this gets you started._

The purpose: Getting ready for the midterm.

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
- Get the [Sanity.App.test.js](https://gist.github.com/charliecalvert/64d2a63ed40e116dd20f55e98116baa6) test Suite and put it in your new **sanity** folder.
  - You can also pull the latest from JsObjects, and then type **slb** and run **./CreateSymbolicLinks**
  - This will add a symbolic link to a new script to your bin folder: **~/bin/get-tests**
  - Run **get-tests** from your sanity folder and it will add **Sanity.App.test.js** to your project.
- Add the following to the **start** property in your **client/package.json** file: **"sanity-test": "react-scripts test Sanity*"**
- Run the test: **npm run sanity-tests** and make sure everything passes.

Needless to say, you cannot change anything in the test. However, I may change the test at some point. I'll try to set up something like the **get-gist** bash script so that you can easily get the latest version of my test. (I'm referring to **~/bin/get-gist**. I'm not talking about the **GetGist** component or microservice in our assignment.)

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

Convert the **src/components/GetGist.js** React component from a Function Component to a React Class Component. I'll leave that up to you.

If you are currently passing in only a single gist object, change your code so you pass in an array of gistList objects. For instance your **app-init gistList** could have something like this in, at least as a starting point:

```javascript
gistList: [{id: 'unknown1'}, {id: 'unknown2'}]
```

Of course, your call in the **git-gist** microservice will return objects with more than just an id field. In the midterm we will probably starting working with more than one field.

**NOTE**: _There should be no need to change the **git-gist** microservice from the previous assignment. It still does the same thing, and we still call it the same way. The difference will be in the way we display the data we get from the call to our microservice. Of course, the microservice gets its data from GitHub via our GitHub API call._

In **GetGist** declare **state** with at least one property called **index**. The ability to declare state is the reason we switch from a React Function to a React Class Component. (For now we will ignore the new React hooks technology.) Use this **index** property to iterate over your **gistList**. Add a **next** and **prev** buttons that increment and decrement our index state and update your component state. For instance, if the next button is pressed, index is incremented, and the next item in our gist list is displayed.

- The **next** and **prev** buttons should be declared inside **GetGist**
- **GetGist** should have an H1 element with this text: Get Gist Component
- You should also have one or two paragraph elements for displaying the date from an individual gist and current value of **appInit.result**.

The point is that much of **GetGist** is self contained. At this point, we will continue to show it on our main page, but we can use HR controls or other techniques to separate it from the other code.

For now, it is okay if your component iterates out of bounds if you press **next** or **previous** one too many times or at the wrong time. I'll probably ask you to fix that for the midterm, but you don't have to fix it for this assignment.

We should gray out the **FetchGistList** button after we select it once, but again, that is probably for the midterm.

To better understand what I want, watch the [2 minute video](https://youtu.be/BOGxRGy5MPA).

## Testing

I want to add tests like the ones in Address Simple. I've written a number of them myself, but have not gotten that written up yet. I'll add this soon.

Here is one of the tests I'll want you to include. We have not done anything exactly like this before:

```javascript
it('renders setGistList call directly', () => {
    const wrapper = shallow(<App appInit={appInit}/>);
    debug('IN TEST BUT BEFORE', wrapper.state('gistList'));
    expect(wrapper.state('gistList')).toEqual([{id: 'unknown'}]);
    const gistListFromServer = [{id: 'found'}];
    wrapper.instance().setGistList({gistList: gistListFromServer});
    expect(wrapper.state('gistList')).toEqual(gistListFromServer);
});
```    

The point is that our paragraph elements for displaying the data are now in **GetGist** so we need some other way to confirm that we can parse the mock data that could have been sent from the server.

## Turn it in

Just push your most recent work. I'm assuming you are working in **week03-rest-basics**, but regardless, please specify folder and branch. Tag it too.

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
