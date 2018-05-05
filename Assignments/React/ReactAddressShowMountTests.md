## Overview

**STATUS**: _This assignment is incomplete. You can look it over, and maybe work on a few sections, but it is not yet possible to complete as is._

This is assignment is not complete yet.

In this assignment we will get several tests up and running. Before begining this assignment, be sure you have the tests from the **ReactAddressShow** assignment working:

- [Testing Address Show][tas]
- [Testing Address][ta]

When you have it right, your tests should look something like the text shown in [ReactAddressShow][ras] assignments [Turn it in][rast] section

## Understanding Testing Child Components

Our next step will be to get the button click working. First, we should create tests that fail until we get our code working.

These tests will look a lot like the tests you did for the original **Address** component that contained both paragraphs and buttons. That was the way things looked before you moved the paragraphs and buttons into Tag it, then **AddressShow**.

There is one important change that you need to make. This has to do with Enzyme and the **shallow** vs **mount** methods.

Suppose one component nests another. For instance, suppose that your custom component **MyComponent** renders a second component called **MyOtherComponent**. Here is **MyComponent&#39;s** render method :

```javascript
class MyComponent extends Component {
  render() {
      return (
          <div>
              <MyOtherComponent />
          </div>
      );
  }
}
```

Here **MyComponent** does nothing but ask **MyOtherComponent** to render itself.

In cases like this, if you use Enzyme&#39;s [shallow][enzsh], your tests will only see the output from **MyComponent**. Indeed, that is often what you want. But sometimes, it is best to have the tests know about the output from both **MyComponent** and **MyOtherComponent**. To do that, you use **mount** rather than **shallow**. We usually do this:

```javascript
import { shallow } from 'enzyme';
```

If you want to see output from both components, then do this:

```javascript
import { mount } from 'enzyme';
```

[enzsh]:https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md

## Writing Tests for Child Components {#writing-child-tests}

The first step will be to load **mount** rather than **shallow** from enzyme.

```javascript
import React from 'react';
import Address from '../components/Address';
import { mount } from 'enzyme';
import addresses from '../address-list';
import ElfDebugEnzyme from '../ElfDebugEnzyme';
const elfDebugEnzyme = new ElfDebugEnzyme(false, 'NaiveAddressEdit.test.js');
import '../css/index.css';

const address = addresses[0];

describe('Naive Address Edit Mount Jest Suite', function () {

    it('renders and displays the default last name', () => {
        const wrapper = mount(<Address address={address}  />);
        const welcome = <p className='App-intro'>lastName: unknown</p>;
        elfDebugEnzyme.getIndex(wrapper, 'div#addressShowRender', 1, true);
        expect(wrapper.contains(welcome)).toEqual(true);
    });

    it('renders button click message for first name', () => {
        const wrapper = mount(<Address address={address}/>);
        const patty = <p className='App-intro'>lastName: Murray</p>;
        wrapper.find('button#showAddressClick').simulate('click');
        elfDebugEnzyme.getIndex(wrapper, 'div#addressShowRender', 1, true);
        expect(wrapper.contains(patty)).toEqual(true);
    });

});
```

After that, the tests look more or less the same.

## Writing Generic, Resuable Tests {#generic-tests}

Some tests are so similar that you can create a test blueprint, and call it:

```javascript
import React from 'react';
import Address from '../components/Address';
import { mount } from 'enzyme';

import addresses from '../address-list';
import '../css/index.css';

const address = addresses[0];

describe('Address mount Suite', function () {

    var quiet = true;

    /*
     * @param {object} wrapper - Container for a bunch of HTML nodes
     * @param {number} index - Index of HTML element.
     * @param {boolean} talkToMe - Speak even if quiet is true
     */
    const getIndex = function(wrapper, index, talkToMe) {
        if (!quiet || talkToMe) {
            const ninep = wrapper.find('div#addressShowRender').childAt(index).debug();
            console.log('NINEP:', ninep);
        }
    };

    const defaultFieldTest = (name, index, talkToMe) => {
        const wrapper = mount(<Address address={address}  />);
        const welcome = <p className="App-intro">{name}</p>;
        getIndex(wrapper, index, talkToMe);
        expect(wrapper.contains(welcome)).toEqual(true);
    };

    const afterClickFieldTest = (name, index, talkToMe) => {
        const wrapper = mount(<Address address={address}/>);
        const patty = <p className="App-intro">{name}</p>;
        wrapper.find('button#setAddress').simulate('click');
        getIndex(wrapper, index, talkToMe);
        expect(wrapper.contains(patty)).toEqual(true);
    };

    it('renders and displays the default first name', () => {
       defaultFieldTest('firstName: unknown', 0);
    });

    it('renders and displays the default last name', () => {
       defaultFieldTest('lastName: unknown', 1);
    });
});

```

Note that once you created the generic **defaultFieldTest** and **afterClickFieldTest** methods you can call them very simply with code that is not likely to break:

```javascript
it('renders and displays the default street', () => {
    defaultFieldTest('street: unknown', 2);
});
```

## Understanding getIndex

I've moved these methods into ElfDebugEnzyme.

- [http://bit.ly/elf-debug-enzyme](http://bit.ly/elf-debug-enzyme)

Note the **getIndex** method that replaces our **getFirst** method. This will help you pick out individual components from the render method of **AddressShow**.

```javascript
/*
 * @param {object} wrapper - Container for a bunch of HTML nodes
 * @param {number} index - Index of HTML element.
 * @param {boolean} talkToMe - Speak even if quiet is true
 */
const getIndex = function(wrapper, index, talkToMe) {
    if (!quiet || talkToMe) {
        const ninep = wrapper.find('div#addressShowRender').childAt(index).debug();
        console.log('NINEP:', ninep);
    }
};
```

In this case, I've made an exception to my general rule, and added some comments. This means something is probably wrong. I shouldn't need them, but I think we do here.

You already know what **wrapper** is: it's the collection of HTML elements that Enzyme culled from the DOM. In particular, it is a DIV, a bunch of P elements, and a BUTTON. **talkToMe** is added as a way of asking the method to ignore the **quiet** variable. Even if **quiet** is set to **true**, the component will still render output if **talkToMe** is set to **true**. It's a way of saying: "Ignore all the other calls to **getIndex** except those that have **talkTome** set to **true**."

<!-- LINKS -->

[ras]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressShow.html
[rast]:http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressShow.html#turn-it-in
[tas]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressShow.html#testing-address-show
[ta]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressShow.html#testing-address
