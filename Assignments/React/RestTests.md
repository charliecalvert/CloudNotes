# Rest Tests

This assignment is built on top of the [RestBasics][rb] assignment. Make your edits in the same directory you used for **RestBasics**, but you should be working in a new branch called **Week03-RestTest**. Create and switch to the branch first, and then begin your work.

I'm assuming that you are working in a folder called **week02-rest-basics** and that it has both a **client** and **server** folder in it. If there is any doubt about the primary folder name, be sure to specify it when you turn in the assignment.

## Install

Navigate to the root of the **client** project and install some NPM packages:

```
npm install --save-dev enzyme enzyme-adapter-react-16
# npm install --save-dev react-test-renderer
npm test
```

We want to ensure that we get all of these tools set to use the same version. For instance, my dependencies in **package.json** now look like this:

```json
"dependencies": {
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "react-scripts": "1.0.13"
},
"devDependencies": {
    "enzyme": "^3.0.0",
}
```

The point is not the specific versions, but that they are all the same version.

After editing your **package.json** file, run the following commands:

```
npm install
npm outdated
```

If everything is up to date, **npm outdated** will return with no output. If it complains, you can update your **package.json** and run **npm install** again. See also [npm-check-updates](https://www.npmjs.com/package/npm-check-updates).

If you try the above, and the versions still look wrong, try something like this, where the versions are specified:

```
npm i --save react@16 react-dom@16
npm i --save-dev enzyme enzyme-react-adapter-16
```

You can find the latest release of a package like this:

```
$ npm show react version
16.0.0
```

This is not the latest release on your system, but the latest release available from NPM.

## Render

If necessary, tweak your render method slightly as shown below. Notice that the state is set to a simpler object than in the previous version. Note that there are two paragraphs elements in the JSX. The portions of the code that changed now look like this:

```javascript
constructor() {
    super();
    this.state = {
        file: 'unknown',
        status: 'waiting'
    };
}

// CODE OMITTED HERE....

render() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to React</h2>
            </div>

            <p className="App-intro">
                state: {this.state.status}
            </p>
            <p className="App-intro">
                file: {this.state.file}
            </p>
            <button onClick={this.bar}>Bar</button>
        </div>
    );
}
```

## Configure Enzyme

Place this code at the top of app.test.js:

```javascript
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

The first line of code imports an object from an Airbnb library called [Enzyme][enz]. We will use a combination of a the unit test library called [Jest][jest] and [Enzyme][enz] to test our code.

Enzyme allows us to **wrap** React components in objects that we can transverse as if they were part of a DOM. This means we can test our components without having to load them into a browser.

The **shallow** object allows us to look only one level deep at the objects in our React code. For instance, if one React component contains another React component which contains yet a third, **shallow** will allow us to look at only the top level component. The fact that it is made of two other components is hidden from us.

Enzyme needs to be able to _adapt_ to the version of React that you are using. Hence, we have to take the extra step to **configure** an **Adapter**. That is the last line of code quoted above.

## Simple Debug Class

Enzyme has the ability to locate and display individual HTML elements. It provides various tools for navigating the Enzyme "DOM". I like to wrap these tools in an object so that I don't have to remember exactly how they work.

Some of you know that there is a relatively complete Enzyme debug object.

- [The original object saved as a gist on my GitHub account][enz-debug].
- Or clone it like this: https://gist.github.com/51daef341699943b07c9570c3ad2cbab.git

But all that is a bit heavyweight for this exercise. Instead, we can just put this simple ES6 class in a file called **src/ElfDebugEnzyme**:

```javascript
class ElfDebugEnzyme {

    display(value) {
        console.log(value);
    }

    getLast(wrapper, element, showMe) {
        if (showMe) {
            const paragraphData = wrapper.find(element).last().debug();
            this.display(paragraphData);
        }
    }
}

export default new ElfDebugEnzyme();
```

At the top of **App.test.js**, reference your new debug object:

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import elfDebugEnzyme from './ElfDebugEnzyme';
```

## The Tests

Beneath this code add a **describe method** and a new test:

```javascript
describe('rest basic tests', function() {    

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });

    it('renders initial value of paragraph with state.nine', () => {
        const wrapper = shallow(<App/>);
        const unknown = <p className="App-intro">file: unknown</p>;
        elfDebugEnzyme.getLast(wrapper, 'p', true);
        expect(wrapper.contains(unknown)).toEqual(true);
    });

});
```

**NOTE**: _Make sure you do not end up with two **renders without crashing** tests._

This code looks very much like the [Jasmine][jaz] test framework. The **describe** method is used to declare a suite of tests. Each individual test is defined inside an **it** method.

- The first parameter to **it** is a description of the test.
- The second is callback, a test function, that defines the test.
- There is an optional third timeout parameter that is rarely used.


## Call Server

Just as a reminder, here is the code for querying our server from our client. You should already have this code in your project in the file called **src/App.js**.

```javascript
bar = () => {
    const that = this;
    fetch('/api/foo')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log('parsed json', json);
            that.setState(foo => (json));
        })
        .catch(function(ex) {
            console.log('parsing failed', ex);
        });
};
```

Note the formatting on the code shown above. Where you place your curly braces and how you indent your code are both very important.

## Run your test

To run the tests, type the following:

<pre>
npm test
</pre>

The output should look something like this:

```
  console.log src/ElfDebugEnzyme.js:4
    <p className="App-intro">
      file:
      unknown
    </p>

 PASS  src/App.test.js
  rest basic tests
    ✓ renders without crashing (3ms)
    ✓ renders initial value of paragraph with state.nine (2ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.266s, estimated 1s
Ran all test suites.

Watch Usage: Press w to show more.
```

## Turn it in

Put your work in a branch called **Week03-RestTest** and then Git **tag**. Then run Git **add**, **push** and **commit**.

It's simplest if you provide a link to the correct folder and branch on GitHub/BitBucket, or else detail what you are doing:

- Branch: <THE BRANCH WHERE YOU DID YOUR WORK>
- Directory: <THE DIRECTORY WHERE YOU DID YOUR WORK>

Oddly enough, the second technique where you specify the branch and folder is easiest for me, but they both are simple to use from my end.

## Modern Tools

I stumbled across this project. Look at the tools used in building this application

- [HN Clone](https://github.com/clintonwoo/hackernews-react-graphql)

This is an interesting example of someone using a number of the latest technologies to build an application.

## PolyFill Fix

You may see this error, which is a bug on **react's** side that will be fixed soon.

```
console.error node_modules/fbjs/lib/warning.js:33
  Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills
```

In the meantime, if that is bothering you, to fix the error create a file called **temp-poly-fills** with the following content:

```
const raf = global.requestAnimationFrame = (cb) => {
    setTimeout(cb, 0)
};

export default raf;
```

Then include it in your test:

```
import './temp-poly-fills';
```

That should clean up the problem. When **react16.01** there should be a fix and this workaround should not be needed. See here:

- <https://github.com/facebookincubator/create-react-app/issues/3199>

[enz-debug]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab#file-elfdebugenzyme-js
[rb]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/RestBasics.html
[enz]: https://github.com/airbnb/enzyme
[jaz]: https://jasmine.github.io/
[jest]: https://facebook.github.io/jest/
