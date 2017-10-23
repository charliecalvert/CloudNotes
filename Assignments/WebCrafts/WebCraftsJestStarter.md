- Jest Deck [http://bit.ly/jest-cra](http://bit.ly/jest-cra)
- [React Tutorial][rt]

From the root of your project:

```nohighlighting
npm install --save-dev jest enzyme-adapter-react-16
npm install --save-dev react-test-renderer enzyme
mkdir source/__tests__
ln -s node_modules/.bin/jest .
```

Run:

```
jest --watch --coverage
```

A **.babelrc** file:

```javascript
{
  "presets": ["env", "react"]
}
```

## ElfDebugEnzyme

Find it [here][ed].

Or choose the **Raw** view of the code on GitHub, and then:

```
cd source
wget <THE LONG URL FROM RAW VIEW>
cd1
```

## NPM

In **package.json** rename old **test** script to **karma-test** and set up **test** script:

```
"scripts": {
    "test": "jest",
    "karma-test": "karma start",
    "start": "nodemon ./bin/www",
    "bundle": "node_modules/.bin/webpack"
},
```

## Sanity

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
//import '../../public/javascripts/tools/tiny-pub-sub.js';
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

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<HomeButtons/>, div);
    });

    it('renders default value of H1 tag', () => {
        const wrapper = shallow(<ReactHome/>);
        const nineSign = <h1>An H1 element in a React Component</h1>;
        elfDebugEnzyme.getLast(wrapper, 'h1', true);
        expect(wrapper.contains(nineSign)).toEqual(true);
    });

    it('renders state of File paragraph after button click', () => {

        const wrapper = shallow(<HomeButtons/>);
        const foo = wrapper.find('#makeHtml').simulate('click');
        elfDebugEnzyme.getLast(wrapper, 'p', true);
        //expect(wrapper.contains(nineSign)).toEqual(true);
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
