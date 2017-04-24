## Overview

We have two major several steps:

- Divide the Address Component up into:
  - A component that owns the data: **Address**
  - A component that displays the data: **AddressShow**
  - Update Tests
- Create a new Component
  - Create a component can all the user to edit the data: **AddressEdit**
- Both the **AddressShow** and **AddressEdit** components are children of Address
  - Modify the **Address** **render** method to reflect this
  - Update Tests, creating new test suite: **AddressEdit.test.js**

## Data

We will no longer load **addresses** in **index.js**. Instead, **Address** owns the data.

We will no longer work with the individual fields in **Address**. Intead, we will work with a single record from the **addresses** array.

```javascript
class Address extends Component {
    constructor(props) {
        super(props);

        this.addressIndex=0;
        const address = addresses[this.addressIndex];
        this.state = {
            address: address
        };
        this.quiet = true;
    }
}
```
