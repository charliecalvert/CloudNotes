## Overview

We have several steps that will allow us to start editing the data we view:

- Create an AddressEdit Component
  - Create a component can all the user to edit the data: **AddressEdit**
- Both the **AddressShow** and **AddressEdit** components are children of Address
  - Modify the **Address** **render** method to reflect this
  - Update Tests, creating new test suite: **AddressEdit.test.js**

## Create Tests

Please read this one section from Elvenware:

- [Emzyme Mount vs Shallow][emvz]

[emvz]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReact.html#enzyme-mount-vs-shallow

## Create AddressEdit

Make a copy of **AddressShow**. Rename the class from **AddressShow** to **AddressEdit**. Must be done in at least two places. Strip out everything except the render method.

- Replace the **P** elements with INPUT controls.
- Add an ID to each INPUT
- Add an ONCHANGE attribute to each INPUT

Here is an example:

```javascript
<input id="elfFN" className="App-intro" value={this.props.address.firstName} onChange={this.props.onNameChange}/>
```  

## Teach Address to Load AddressEdit {#load-address-edit}

All you need to do is add a new method for handling changes to the input control:

```javascript
onNameChange = (event) => {
    this.log("ON NAME CHANGE");
    const address = addresses[this.addressIndex];
    switch (event.target.id) {
        case 'elfFN':
            address.firstName = event.target.value;
            break;
        case 'elfLN':
            address.lastName = event.target.value;
            break;
        // ETC
        default:
            throw new Error('OH NO BAD CASE in Address onNameChange');
    }
    this.setState({
        address: address
    })
};
```

As you can see, key information about the user's action are passed in the **target** object that lives like a craven parasite on the **event** object. Note that:

- **event.target.id** contains the id of the INPUT control the user is editing.
- **event.target.value** contains the current value of the string the user is editing

To display the **AddressEdit** component, modify the **Address** render method to teach it to load **AddressEdit**:

```javascript
<AddressEdit
    address={this.state.address}
    onAddressChange={this.onAddressChange}
    onNameChange={this.onNameChange}
/>
<AddressShow
    address={this.state.address}
    onAddressChange={this.onAddressChange}
 />
```

When you are done, edits to the INPUT should automatically propogate to the paragraph controls.

## Turn it in

Add, commit, push. Tag. Push your tag.
