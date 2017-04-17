
## Create Address Container

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
