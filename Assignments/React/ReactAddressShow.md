## Overview

We have two major several steps:

- Divide the Address Component up into:
  - A component that owns the data: **Address**
  - A component that displays the data: **AddressShow**
  - Update Tests
- Insure that clicks on the Button work but that **Address** not **AddressShow** does the real work.
  - Update Tests

## Divide

The first step is to split **Address** and **AddressShow** into two distinct components. In particular, we will create a new component called **AddressShow** and put most of **Address** in it. We will then pare down **Address** so that its primary function will be handling data.

The first step will be set up our (initially) failing tests for **AddressShow**:

```javascript
// GET THE RIGHT IMPORTS

describe('AddressShow Shallow Suite', function () {

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
        const wrapper = shallow(<AddressShow address={address}  />);
        const welcome = <p className="App-intro">{name}</p>;
        getIndex(wrapper, index, talkToMe);
        expect(wrapper.contains(welcome)).toEqual(true);
    };

    it('renders and displays the default first name', () => {
        defaultFieldTest('firstName: unknown', 0);
    });

    // AND MANY MORE

});
```

Note that we don't create any tests for button clicks.

## Create AddressShow

To get started, make a copy of **Address** and call it **AddressShow**. For instance, you might right click on **Address** in WebStorm, choose **copy**, then right click on the **components** folder and choose **paste**. When prompted, you might call the copy you create **AddressShow**. There are many ways to do the same thing, and it doesn't really matter which one you prefer.

In **AddressShow**, rename the class from **Address** to **AddressShow**:

```javascript
class Address extends Component { ... }      <=== ORIGINAL
class AddressShow extends Component { ... }  <=== EDITED VERSION
```

Then, down at the bottom of the file, make the same change:

```javascript
export default Address;      <=== ORIGINAL
export default AddressShow;  <=== EDITED VERSION
```

## Data

We will no longer load **addresses** in **index.js**. Instead, **Address** owns the data. Move the import statement from **index.js** to **Address.js** and straighten out the path:

```javascript
import addresses from '../address-list';
```

**NOTE**: _Recall that our goal is to perform a complete mind-meld with the file system of our OS. Some part of your brain must become the file system, and you should take great joy and comfort from this fact. In particular, it should be intuitively obvious that the relative path part of the import statement must change after we move this line of code from a file in the **src** directory to a file in the **src/components** directory. You should also grok immediately the difference between a relative path that contains one dot and one that contains two dots. You shouldn't have to think about it any more than you have to think how to tie your shoes. The knowledge should just be there, fully formed, in your brain without thought or effort. I should perhaps remind you that this isn't a Linux thing, as you would have the same issue on Windows._

Lets also stop individual fields in **Address**. Intead, we will work with a single record from the **addresses** array.

```javascript
import addresses from '../address-list';

class Address extends Component {
    constructor(props) {
        super(props);

        this.addressIndex=0;
        const address = addresses[this.addressIndex];
        this.state = {
            address: address  <=== HERE
        };
        this.quiet = true;
    }
}
```

We create an **addressIndex** property and use it to index into our array of addresses. Our state tracks only a single address since that is all that **AddressShow** needs to know.

**NOTE**: _I'm having some doubts here as to whether this is the best way to do this. Certainly it works, but there may be a more elegant solution. I'll think about it._

We now radically strip down the **render** method for **Address**. Rather than render the address fields here, we will pass **this.state.address** to **AddressShow** and let that component render it:

```javascript
render() {
    if (!this.quiet) { console.log("ADDRESS RENDER"); }
    return (
        <div className="App">
            <AddressShow address={this.state.address} />
        </div>
    );
}
```

## AddressShow Receives the Address Data {#props-address-data}

The only thing that **AddressShow** really needs to do is display our **Address** record. It turns that at this time, **AddressShow** does not need a constructor, since there is no set up work need to get the object going. However, if it did need one, it might look like this:

```javascript
constructor(props) {
    super(props);
    console.log('SHOW ADDRESS CONSTRUCTOR', this.props.address);
}
```

As you can see, the constructor is passed **props**. As you know, **props** is the state passed to the object by its parent, which in this case is **Address**. This means that **this.props.address** in **AddressShow** is "the same thing" as **this.state.address** in the **Address** component. The data is passed from the **Address** render method to the **AddressShow** constructor.

You can keep the above constructor, but you should strip everything else from **AddressShow** expcept the **render** method.

**NOTE**: _Since the constructor for **AddressShow** doesn't do anything, the only thing we really need in **AddressShow** is the render method, but we are keeping the constructor for pedagogical purposes._

## Logging: Blessed Quiet {#quiet-log}

Since we don't really need the **constructor**, and yet we have implemented it anyway to help illustrate a point, we might as well see if we can find a way to complicate the code further.

As you probably know, **console.log** is both curse and blessing. Let's try to emphasize the blessing and mitigate the curse by creating a single place where we call the offending method:

```javascript
constructor(props) {
    super(props);
    this.quiet = true;
    this.log('SHOW ADDRESS CONSTRUCTOR', this.props.address);
}

log(message, message2 = '', message3 = '') {
    if (!this.quiet) {
        console.log(message, message2, message3);
    }
}
```

Now we can toggle a single variable, **this.quiet**, whenever we want to turn down the volume. For instance, we might want to log to the console in our render method. In the new system we would do it like this:

```javascript
render() {
    this.log("SHOW ADDRESS RENDER");
    return ( ... );
}
```

Now we can change the **this.quier** property from **true** to **false** to toggle the use of **console.log** throughout the object. There are other solutions, and better loggers, but this is a bit of a start on understanding the subject.

**NOTE**: _I state the name of the object in logging message to help me track down where it is coming from. Fancy loggers can give us more information in simpker ways, but we could do this:_

```javascript
constructor(props) {
    super(props);
    this.quiet = false;
    this.log('CONSTRUCTOR', this.props.address);
}

log(message, message2 = '', message3 = '') {

    if (!this.quiet) {
        const label = this.constructor.name + ': ';   < === HERE
        console.log(label, message, message2, message3);
    }
}

render() {
    this.log("RENDER");
}
```

_We are using **this.constructor.name** to get the name of our component._

## Rendering the Data

It should come as no surprise that **AddressShow** can, at least for now, render an address with almost the same code that we used in **Address**. The change will be simply to work with **props** rather than **state**:

```javascript
render() {
    this.log("SHOW ADDRESS RENDER");

    return (
        <div className="App">
            <p className="App-intro">
                firstName: {this.props.address.firstName}
            </p>

            // CODE OMITTED HERE

        </div>
    );
}
```

Note that we don't write **this.props.firstName** but **this.props.address.firstName**. This is because we pass in the whole address object, rather than a set of individual properties representing each field. One could argue the merits of each technique, but I like this one because it is relatively simple.

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

In cases like this, if you use Enzyme&#39;s [shallow][enzsh], your tests will only see the output from **MyComponent**. Indeed, that is often what you want. But sometimes, it is best to have the tests the output from both **MyComponent** and **MyOtherComponent**. To do that, you use **mount** rather than **shallow**. We usually do this:

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

After that, the tests look more or less the same.

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
});

```

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

You already know what **wrapper** is: it's the collection of HTML elements that Enzyme culled from the DOM. In particular, it is a DIV, a bunch of P elements, and a BUTTON. **talkToMe** is added as a way of asking the method to ignore the **quiet** variable. Even if **quiet** is set to **true**, the component will still render output if **talkToMe** is set to **true**. It's a way of saying: "Ignore all the other calls to **getIndex** except those that have **taslkTome** set to **true**."

## AddressShow Modify View with Button Click {#modify-view}

The next step will be to set up a button click for **AddressShow**. Recall that we deleted all the code except the render method a nominal constructor from **AddressShow**. Thus our button click no longer works, even if the button itself is still there.

We said earlier that **AddressShow** would display our data, and that **Address** would manipulate, modify and save our data. So our code for handling the button click belongs in Address. It is essentially the same code we had before, but now it is somewhat simpler since we are working on with the piece of data in our state:

```javascript
onAddressChange = (event) => {
    this.addressIndex = 1;
    const address = addresses[this.addressIndex];

    this.setState({
        address: address
    })
};
```

So now we have the method for changing our state. But that method is in **Address** and in our button is in **AddressShow**. How do we connect them?

The solution is to pass the **onAddressChange** function object to **AddressShow** in the render method of **Address**:

```javascript
<AddressShow
    address={this.state.address}
    onAddressChange={this.onAddressChange}
/>
```

As you can see, we are now passing not one, but two **props** to **AddressShow**.

And here is all we need to do in **AddressShow**. At the bottom of the render method, modify the button to look like this:

```javascript
<button id="showAddressClick" onClick={this.props.onAddressChange}>Show Address</button>
```

Note that I am both setting the **onclick** method to the function object passed from the **Address** object, and also being sure to create a unique **id** which is a portmanteau derived from the object's name and the button's purpose.

## Turn it in

Add, commit then push. Then Tag. Push you tag. When you turn in the assignment, give me the tag and the directory in which you did your work. I may just look at your most recent code, but being able to go back to where you were when you submitted the assignment can be helpful.
