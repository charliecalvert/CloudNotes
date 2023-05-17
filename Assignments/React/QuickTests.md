---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/QuickTests.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: QuickTests.md
relativePath: /React/QuickTests.md
title: QuickTests
directoryName: React
category : react-guide
---

## Video

It covers Test Driven Development (TDD) basics with [Jest](https://facebook.github.io/jest/) and [Enzyme](https://github.com/airbnb/enzyme). A major theme is how to focus on one component at a time with Enzyme [shallow](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md). We also briefly discuss Enzyme [mount](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md), which allows you to see components that are nested inside one another. **mount** can be useful at times, but in general, the goal of Unit Testing is to work with one component at a time.

It ends rather abruptly.

- [The Jest Enzyme Video](https://youtu.be/4_pZizupR7U)

## Overview

There are two key themes:

- Test one component at a time
  - Use shallow 98% of the time
  - Use mount 2% of the time
- Use **dive** when you have non-DOM Components
  - MuiThemeProvider is a non-DOM component
  - It's useful, but it never create HTML for the DOM
```
npm install enzyme enzyme-adapter-react-16

or

yarn add enzyme enzyme-adapter-react-16
```

```
npm install @material-ui/core
yarn add @material-ui/core
```

## Cheat Sheet

```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Address from './Address';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('App tests', function() {

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it('should find ElfHeader', () => {
        const wrapper = shallow(<App/>);
        // console.log(wrapper.debug());
        // console.log(wrapper.find('ElfHeader').debug());
        expect(wrapper
            .find('ElfHeader').debug())
            .toEqual('<ElfHeader />');
    });

    it('should find Address', () => {
        const wrapper = shallow(<App/>);
        //console.log(wrapper.debug());
        //console.log(wrapper.find('Address').debug());
        expect(wrapper
            .find('Address').debug())
            .toEqual('<Address />');
    });

    it('should find GetFile', () => {
        const wrapper = shallow(
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        );
        console.log(wrapper.dive().debug());
        console.log(wrapper.dive().find('GetFile').debug());
        expect(wrapper.dive()
            .find('GetFile').debug())
            .toEqual('<GetFile testValue={3} />');
    });
});
```
