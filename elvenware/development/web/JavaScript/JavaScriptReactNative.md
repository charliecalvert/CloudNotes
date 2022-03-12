---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptReactNative.md
relativePath: elvenware/development/web/JavaScript/JavaScriptReactNative.md
title: JavaScriptReactNative
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
subject: JavaScript
---

<!-- toc -->
<!-- tocstop -->

## Overview

React Native

## Testing

To get your tests to work is mostly a matter of properly configuring **package.json**.

Here is what needs to be installed. I'll show the commands first with **yarn**, then with **npm**:

```bash
#!/usr/bin/env bash

yarn add --dev enzyme enzyme-adapter-react-16
yarn add --dev enzyme-to-json jest-serializer-enzyme
yarn add --dev react-addons-test-utils
yarn add react-dom
```

Then with npm:

```bash
#!/bin/bash

npm install --save-dev enzyme enzyme-adapter-react-16
npm install --save-dev enzyme-to-json jest-serializer-enzyme
npm install --save-dev react-addons-test-utils
npm install --save react-dom

```

Now open **package.json** and manually modify the **jest** property in **package.json** to look like this:

```javascript
"jest": {
    "preset": "jest-expo",
     "transformIgnorePatterns": [
         "!node_modules/react-runtime"
     ],
    "snapshotSerializers": ["enzyme-to-json/serializer"]
}
```
For simple programs you probably won't need **transformIgnorePatterns**, but lets put it in just in case. It fixes an error with **export** or **import** being flagged as bad when running tests. If you get an error like that, try this solution.


The key portions of my package.json file now look like this:

```javascript
"jest": {
    "preset": "jest-expo",
     "transformIgnorePatterns": [
         "!node_modules/react-runtime"
     ],
    "snapshotSerializers": ["enzyme-to-json/serializer"]
},
"dependencies": {
    "expo": "^27.0.2",
    "react": "16.3.2",
    "react-dom": "^16.3.2",
    "react-native": "~0.55.4",
    "react-router-native": "^4.2.0"
},
"devDependencies": {
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "enzyme-to-json": "^3.3.4",
    "jest-expo": "~27.0.1",
    "jest-serializer-enzyme": "^1.0.0",
    "react-addons-test-utils": "^15.6.2",
    "react-native-scripts": "1.14.0",
    "react-test-renderer": "^16.3.2"
}
```

## Testing Example

Near the top of your tests:

```javascript
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
```

Insert some simple text in the component you want to test:

```javascript
import React from 'react';
import {Text, View} from 'react-native';
import Address from "./Address";
import elfStyles from './elf-styles';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foobar: 'barfoo'
        }
    }

    clickFoobar = () => {
        this.setState({foobar: 'foobar1'});
    };

    render() {
        return (
            <View style={elfStyles.container}>
                <Text id="testClosed">{this.state.foobar}</Text>
                <button id="textOpen" onClick={this.clickFoobar}>
                    Foobar
                </button>
                <Address/>
            </View>
        );
    }
}
```

Here are some tests to try:

```javascript
import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('App tests', function() {

    const debug = false;

    it('renders without crashing', () => {
        const rendered = renderer.create(<App/>).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('renders default output with react (mount)', () => {
        const tree = renderer.create(<App/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('handles click on foobar with react', () => {
        const after = renderer.create(<App/>);
        after.getInstance().clickFoobar();
        expect(after.toJSON()).toMatchSnapshot();
    });

    it('renders default output with enzyme shallow', () => {
        const wrapper = shallow(<App/>);
        if (debug) {
            console.log(wrapper.debug());
        }
        expect(wrapper).toMatchSnapshot();

    });

    it('handles click on foobar with enzyme', () => {
        const wrapper = shallow(<App/>);
        if (debug) {
            console.log(wrapper.debug());
        }
        wrapper.find('#textOpen').simulate('click');
        expect(wrapper).toMatchSnapshot();
    });
});
```

Snapshots are new to us, but they are simple to use. Each time you call **toMatchSnapshot** one of two things happens:

- A snapshot is taken of the current output from your component
- The current output of your component is compared to the snapshot

The snapshot is saved as text in a directory called **__snapshots__**.

If you intentionally change the output of your component, then you can update the snapshot with this command:

```bash
npm test -u
```

Or issue the same command with yarn.

Multiple snapshots get saved in your **__snapshots__** directory in a file named after the file name of your test suite. For instance, if you call **toMatchSnapshot()** three times in one suite, there will be three snapshots in the file named after your suite. The first snapshot in the file reflects the state of your component after you first call **toMatchSnapshot()**, the second snapshot in that same file, reflects the state of your component the second time you call **toMatchSnapshot()**, and so on. Therefore, the first call can reflect what you component produces before you press a button, the second what it looks like after you press a button. This means we don't have to write separate tests for **firstName**, **lastName**, etc. Instead, we can see what all the fields look like before we click the button, and the again after we click the button.

## Second Example

Suppose you have this React Component:

```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text bar="3">Open</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Here are some tests for that component:

```javascript
import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {StyleSheet, Text, Component} from 'react-native';
configure({adapter: new Adapter()});


describe('App test', function() {


    it('renders without crashing', () => {
        const rendered = renderer.create(<App/>).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('test default output of App', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('test specific node with property/attribute called bar', () => {
        const wrapper = shallow(<App/>);
        console.log(wrapper.debug());
        const foo = <Text bar="3">Open</Text>;
        expect(wrapper.contains(foo)).toBe(true);
    });

    it('test for match element without props (ignores bar)', () => {
        const wrapper = shallow(<App/>);
        console.log(wrapper.debug());
        const openText = <Text>Open</Text>;
        expect(wrapper.containsMatchingElement(openText)).toEqual(true);
    });

});
```

Note that some of these tests are similar to the kind of tests we have been writing, and some rely only on testing snapshots.
