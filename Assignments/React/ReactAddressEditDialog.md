## Overview

Allow the user to pop up a dialog and edit a record. Something very much like this code should be added to both the **SmallAddress** program and in your **Final**.

## Create Files

- components/AddressEditFields
- components/AddressEdit

## Create Fields

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class AddressFields extends Component {
    render() {
        return (
            <div>
                <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="string"
                    value={this.props.address.firstName}
                    onChange={e => this.props.addressChangedByUser('firstName', e)}
                    fullWidth
                />
                // YOU ADD A LASTNAME TextField
            </div>
        );
    }
}

AddressFields.propTypes = {
    addressChangedByUser: PropTypes.func,
    address: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string
    })
};

export default AddressFields;
```

## Create a Dialog

Start with a simple React component called **AddressEdit**:

```JavaScript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddressEditFields from './AddressEditFields';
import addressList from '../address-list';

const styles = {};

export default class AddressEdit extends React.Component {
    render() {
        return (
            <div>
                <h1>I am Simple</h1>
            </div>
        );
    }
}

```

## Add a Dialog

In the DIV of the **render** method delete the H1. Add this instead:

```JavaScript
import Dialog from '@material-ui/core/Dialog';
```

```html
<Dialog
   open={this.props.open}
   onClose={this.userClosedDialogNormal}
   aria-labelledby="form-dialog-title"
>
  {/* DIALOG BODY WILL GO HERE */}
</Dialog>
```

## Create a Dialog Title

We are going to add several sections to the Dialog. Here is the overall flow, which I will build piece by piece in the next sections of this text:


- Dialog
  - DialogTitle
  - DialogContent
    - DialogContentText
    - AddressEditFields
  - DialogActions
    - Button
    - Button

It's important to get the components nested properly. We create a **Dialog**, then put a **DialogTitle**, **DialogContent** and **DialogActions** inside it. Inside of **DialogContent** we have **DialogContentText** and **AddressEditFields**. Inside of **DialogActions** we have two **Button** components.

Let's start by adding the **DialogTitle**. In the body of the **Dialog** so can have a title for our dialog:

```javascript
<DialogTitle id="form-dialog-title">
    Edit Address
</DialogTitle>
```

## Define Dialog Content

In the **Dialog** body below the **DialogTitle** add this:

```
<DialogContent>
   <DialogContentText>
       Fill in the fields of the address record.
   </DialogContentText>
</DialogContent>
```

**NOTE**: _The text "Fill in the fields..." etc is an instruction to the end user, not to you, the developer._

In the **DialogContent**, below the **DialogContentText** (after it, not inside it),  add the **AddressEditFields**. It will take two props. Study the **AddressEditFields** object and calculate the two props that need to be passed in:

```html
<AddressEditFields // YOU ADD THE PROPS />
```

To close out the body, define the **DialogActions**:

```html
<DialogActions>
    <Button onClick={this.userCanceledDialog} color="primary">
        Cancel
    </Button>
    // You add an Ok button where onClick calls
    // this.userClosedDialogNormal
</DialogActions>
```

## The Action

Above the render method add these methods:

```javascript
state = {
   open: this.props.open,
   address: addressList[0]
};

userClosedDialogNormal = () => {
   this.props.addressEdit(this.state.address);
};

userCanceledDialog = () => {
   this.props.addressEdit(null);
};

addressChangedByUser = (v, e) => {
   this.props.address[v] = e.target.value;
   this.setState({ address: this.props.address });
};
```   

We tend to declare state in a **constructor**, but I see a lot of developers write code like that shown above.

At the very bottom define props.

## Call Dialog

In AddressShow, in the render method, do this:

```javascript
render() {
    const {classes} = this.props;
    const editDialog = this.state.editOpen ? (
        <AddressEdit
            address={this.props.name}
            open={this.state.editOpen}
            addressEdit={this.addressEdit}
        />
    ) : (
        <div/>
    );

    return (

        <div className={classes.container}>
            // ALL YOUR ADDRESS SHOW JSX HERE
            <Button
                color="secondary"
                variant="raised"
                onClick={() => this.setState({editOpen: true})}
             >
                Edit
            </Button>
          {editDialog}
        <div>
    )
}
```

For this to work, there needs to be a bit of Boolean state called **editOpen** that is initialized to false. By default, **editDialog** is just an empty DIV. But if the user sets **editOpen** to true with a button click, then our **AddressEdit** component is defined. The syntax looks a bit funky, but this is just a simple JavaScript **if** statement of the shortcut persuasion. It uses [conditional, or ternary, operator][top].

## Turn it in

Push, tag, Let me know directory and tag.


## Data Cycle

We should pull data from **CongressServer** only once with the **Get Address List** button. Then we push it to **IndexedDB** with the **Convert Address** button.

From there we use the **Sync** button to push it to CouchDB. Once it is in CouchDb, then we get notified of of updates whenever we are in Sync mode.

Of course we can start the cycle again at any time by completely clearing Storage in the browser and deleting the database from CouchDB.

If you are in "Sync mode", that is, if you first push the Sync button, then when you Save your work, it will be saved both to IndexDB (in the browser) and to CouchDB.

The best way to see this is to open your to the same record in two browsers. For instance, one copy in Chrome and the other in FireFox. Now put them both in Sync mode. Then start editing a record you should automagically see the change in both browsers when you make the change in one.

Create Index doesn't copy the whole database, it just creates an Index on the **LastName** field.

When we Sync with CouchDb the first time, our App will send both the current data, including updates and deletes, and it will also send the Index on last name. Thereafter it will sync both to and from CouchDB, only the changes.

[top]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
