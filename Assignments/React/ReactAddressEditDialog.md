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

In the body of the dialog add a title:

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



[top]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
