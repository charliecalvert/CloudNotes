## Overview

Extend our **week02-react-jest** project to support new React components with **props**.

## ENOSPC Error {#enospc}

Please look here:

- [Elvenware React][elf-enospc]

[elf-enospc]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#enospc
[enospc]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-props-enospc.png

## Props Singe Node Error {#props-single-node}

Please look here:

- [Elvenware React][elf-sync]

[elf-sync]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#props-single-node

## Tag

Since we are often working on a single project that has multiple phases, I suggest creating a git tag marking your current status:

```bash
$ git tag -a v3.0.0 -m "Start Week03"
$ git push origin v3.0.0
$ git tag -n1
```

The first command creates a tag that has a message associated with it. The message works much like the message in a commit.

The second command pushes the tag from your local machine to the cloud.

The last command lists your tags and their message on one line. If you have only a single tag, it is not particularly useful, but once you have multiple tags you will see how helpful this can be. Increase the value of the number after -n? to see more information about your tag. You can read about tags here:

- [git tag docs](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

## Create Address Component

In Webstorm:

* Create **components** directory.
* Create **components/Address.js**

## Define Address

Block copy the contents of **App.js** into **Address.js**. Get rid of anything that is not directly associated with the idea of defining an address.

* Rename the class from **App** to **Address**. At the bottom of the file, export **Address** rather than **App**.
* Inside **Address.js** Remove references **state.nine** and **getNine** from the **constructor** and **render** methods and from anywhere else you find them. Leave the tests alone. We are just editing **Address.js** in this step.
* Remove the **appHeader** section from **render**.
* Remove imports that are no longer needed such as **logo.svg**.

## Clean Up App.js

In **App.js** do the mirror image of what you did in **Address.js**: remove all references to an address from the **constructor** and **render** methods, etc.

## Add Address to our Main File {#add-address}

The next step is to display our new Address component. There are several ways to achieve this goal. One of the simplest is to render it in **index.js**. To do this, we will need to:

- **import** our **Address** component,
- Add a **DIV** to our **render** method
- Display the **Address** component by adding its tag to the **DIV**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Address from './components/Address'
import './index.css';

ReactDOM.render(
    <div>
        <App />
        <Address/>
    </div>,
    document.getElementById('root')
);
```

## Address List

```javascript
const unknown = 'unknown';
const addresses = [
    {
        firstName: unknown,
        lastName: unknown,
        street: unknown,
        city: unknown,
        state: unknown,
        zip: unknown
    },
    {
        firstName: 'Patty',
        lastName: 'Murray',
        street: unknown,
        city: 'Seattle',
        state: 'WA',
        zip: unknown
    }

];

export default addresses;
```

## Pass addresses to Address {#addresses}

Use **props** to pass **address** list to **Address**. First link in both our **Address** component and the **address-list**:

```javascript
import Address from './components/Address'
import addresses from './address-list';
```
Now pass the **address-list** to the **Address** component:

```javascript
<Address addressList={addresses} />
```

Altogether, it looks like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Address from './components/Address'
import addresses from './address-list';
import './index.css';

ReactDOM.render(
    <div>
        <App />
        <Address addressList={addresses} />
    </div>,
    document.getElementById('root')
);
```

## Consume props {#props-in-address}

We don't won't the **Address** component to be responsible for updating the **address-list**. Therefore, it does not own the list. Instead, it consumes it as props. We will set things up so the **Address** component can register changes to its state, but ultimately it will pass the changes back up the line and let some other component handle updated the **address-list**.

In the **Address** component, we need to consume the **address-list** passed in **props**:

```javascript
constructor(props) {
    super(props);

    console.log('ADDRESS PROPS', typeof this.props);
    const address = this.props.addressList[0];
    this.state = {
        firstName: address.firstName,
        lastName: address.lastName,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        phone: address.phone,
        website: address.website
    }
}
```

We grab the first item in the **address-list** array and use it to initialize our state.

## Display State

We now need to change what we display as our current state. At this point we are only part way to our solution, so we will simply get the second item in address-list, and display it to the user.

Note that the constructor gets the first item, this method gets the second item. This helps you see how the system works, but does not fully explain how our code will work in the long run.

```javascript
setAddress = () => {
    const address = this.props.addressList[1];

    this.setState({
        firstName: address.firstName,
        lastName: address.lastName,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        phone: address.phone,
        website: address.website
    })
};
```

Note that we are violating DRY. There are two chunks of code, one in the constructor, one here, that are identical. How can that be fixed?

## Tests

As you refactor your components, your tests might need to change. For instance, if you move the H2 for your app into **components/Header.js**, you might need to change your tests. Consider this code:

```javascript
import App from './App';

// Code omitted here

it.only('renders and reads H2 text', () => {
    const wrapper = shallow(<App />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

It will likely end up like this:

```javascript
import Header from './components/Header';

// Code omitted here

it.only('renders and reads H1 text', () => {
    const wrapper = shallow(<Header />);
    const welcome = <h2>Welcome to React</h2>;
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

If you want to start to test the Address component, remember that it expects to passed some props. You already saw how to do this in the main program.

## Debug Jest Message

```javascript
const getLast = (wrapper) => {
    const ninep = wrapper.find('p').last().debug();
    console.log(ninep);
};

const getFirst = (wrapper) => {
    const ninep = wrapper.find('p').first().debug();
    console.log(ninep);
};
```

Or like this, if you want something a bit more flexible. The important difference is that it has the **quiet** option, but not that this one goes after h2 instead of **P**:

```javascript
   var quiet = false;

    function getFirst(wrapper) {
        const eightp = wrapper.find('h2').first().debug();
        if (!quiet) {
            console.log("HEADER:", eightp);
        }
    }

    function getLast(wrapper) {
        const eightp = wrapper.find('h2').last().debug();
        if (!quiet) {
            console.log("HEADER:", eightp);
        }
    }
```

If want, make the HTML element configurable by passing in two parameters instead of one:

```javascript
   var quiet = false;

    function getFirst(wrapper, element) {
        const eightp = wrapper.find(element).first().debug();
        if (!quiet) {
            console.log("HEADER:", eightp);
        }
    }

    function getLast(wrapper) {
        const eightp = wrapper.find(element).last().debug();
        if (!quiet) {
            console.log("HEADER:", eightp);
        }
    }
```


## Turn it in

Commit your work, push.

As I drew near the end of the assignment, my tests looked, at minimum a bit like this:

![Final Tests][test-final]

[test-final]: 
