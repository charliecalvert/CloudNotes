## Overview

- Jest Deck [http://bit.ly/jest-cra](http://bit.ly/jest-cra)
- [React Tutorial][rt]

From the root of your WebCraft project:

```nohighlighting
npm install --save-dev jest enzyme-adapter-react-16
npm install --save-dev react-test-renderer enzyme
npm install --save-dev babel-preset-stage-0
mkdir source/__tests__
ln -s node_modules/.bin/jest .
```

## Set up Babel

In the root of your project create a **.babelrc** file:

```javascript
{
  "presets": ["env", "stage-0", "react"]
}
```

## The Jest Install

when we ran **npm install jest**, Jest was installed here:

```nohighlighting
node_modules/jest
```

The NPM install also placed a script to run Jest here:

```nohighlighting
node_modules/.bin/jest
```

In a previous part of this assignment, we created a link to the Jest script like this:

```nohighlighting
ln -s node_modules/.bin/jest .
```

This means you can run Jest from the root of your project with either of these commands:

```nohighlighting
node_modules/.bin/jest
./jest
```

Alternatively, you can set up your tests in **package.json** as described below in the section called [NPM](#NPM).

## NPM

In **package.json** rename the old **scripts/test** property to **karma-test** and set up a new **test** script:

```
"scripts": {
    "test": "jest",
    "karma-test": "karma start",
    "start": "nodemon ./bin/www",
    "bundle": "node_modules/.bin/webpack"
},
```

## Run

To run jest, you can just do one of the following:

```
./jest
./jest --watch
./jest --coverage
./jest --watch --coverage
```

If you choose the **watch** option your tests should be automatically rerun when you update your code.

If you use the **coverage** option you should be able to see if your tests are run against all of the code in your program. We will talk about **code coverage** more in class, or you can research this subject on the web.

When using Jest 21.2.1, I can see code coverage at the command line and create a coverage directory by passing **--coverage** to the jest script. Below are some examples.

I tend to install Jest locally, in which case the command might look like this:

```nohighlighting
node_modules/.bin/jest --coverage
```

I assume, but have not confirmed, that this would also work if I installed Jest globally:

```nohighlighting
jest --coverage
```

The very sparse docs are here:

- <https://facebook.github.io/jest/docs/en/cli.html#coverage>

When I navigated into the **coverage/lcov-report** directory I found an **index.html** file that could be loaded into a browser. It included the information printed at the command line, plus additional information and some graphical output.

## ElfDebugEnzyme

Find it [here][ed].

Or choose the **Raw** view of the code on GitHub, and then:

```
cd source
wget <THE LONG URL FROM RAW VIEW>
cd1
```


## Sanity

Here are a few simple tests that you can save into a file called **sanity.js**. Study them carefully. Also add a test that shows that **HomeButtons** can render without crashing.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactHome from '../ReactHome';
import HomeButtons from '../HomeButtons';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ElfDebugEnzyme from '../ElfDebugEnzyme';
const elfDebugEnzyme = new ElfDebugEnzyme(true, 'sanity');
configure({adapter: new Adapter()});
import jQuery from 'jquery';
global.jQuery = jQuery;
global.$ = jQuery;
import '../fake-pub-sub';
import raf from '../temp-poly-fills';

describe('WebCrafts Sanity Test', function() {

    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ReactHome/>, div);
    });

    it('renders default value of H1 tag', () => {
        const wrapper = shallow(<ReactHome/>);
        const h1tag = <h1>An H1 element in a React Component</h1>;
        elfDebugEnzyme.getLast(wrapper, 'h1', true);
        expect(wrapper.contains(h1tag)).toEqual(true);
    });
});
```

## Update

Get the latest packages:

```nohighlighting
npm install -g npm-check-updates
ncu
ncu -a
npm update
```
[rt]: http://facebook.github.io/jest/docs/en/tutorial-react.html
[ed]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab
