## Overview

Read the PouchDb GetStarted App. It is similar to what we will build.

- [PouchDb][pdb]
- [PouchDb Get Started][pdbgs]

[pdb]: https://pouchdb.com/
[pdbgs]: https://pouchdb.com/getting-started.html

## Server

Download Ubuntu Server

- [http://bit.ly/pristine-ubuntu-server-16-10](http://bit.ly/pristine-ubuntu-server-16-10)

## Create Application

```
create-react-app Week09-SmallAddressCouch
```

## Material UI

```
yarn add pouchdb
yarn add @material-ui/icons
yarn add @material-ui/core
```

Here is **index.js**:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import registerServiceWorker from './registerServiceWorker';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const themePurple = createMuiTheme({
    palette: {
        primary: {
            light: purple[300],
            main: purple[500],
            dark: purple[700],
        },
        secondary: {
            light: green[300],
            main: green[500],
            dark: green[700],
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={themePurple}>
        <App/>
    </MuiThemeProvider>,

    document.getElementById('root')
);

registerServiceWorker();
```

## Add Pouch to App.js

```JavaScript
import PouchDB from 'pouchdb';
```

Add a constructor with some state:

```javascript
constructor(props) {
    super(props);
    this.state = {
        addressIndex: 10000,
        firstName: 'unknown',
        lastName: 'unknown',         
        ids: []
    }
}
```

Now initial the database:

```javascript
componentDidMount() {
    this.db = new PouchDB('addresses');
    //this.remoteCouch = 'http://192.168.2.25:5984/addresses';
    this.remoteCouch = false;
    this.syncDom = document.getElementById('sync-wrapper');
}
```

## Add an Address

```javascript
addAddress = (data) => {
    const indexValue = this.state.addressIndex + 1;
    this.setState({addressIndex: indexValue});
    const address = {
        _id: new Date().toISOString(),
        firstName: data.firstName,
        lastName: data.lastName,
        completed: false
    };
    this.db.put(address, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a r!');
        }
    });
};
```

We need a button to trigger the call to our method:

```javascript
import Button from '@material-ui/core/Button';

// Lots of code Here

<Button
    color='secondary'
    variant='raised'
    onClick={e => this.addAddress({firstName: 'foo', lastName: 'bar'}, e)}
>
    Insert FooBar
</Button>
```

## Show an Address

```JavaScript
showAddress = () => {
    const that = this;
    let ids = [];
    const getIds = this.state.ids.length === 0;
    this.db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        console.log(doc.rows);
        if (getIds) {
            ids = doc.rows.map((row) => {
                return row.id;
            });
            that.setState({ids: ids});
        }
    });
};
```

Create a button to call it:

```javascript
<Button
    color='secondary'
    variant='raised'
    onClick={this.showAddress}
>
    Show
</Button>
```

## Auto Refresh Data

Add this to **componentDidMount**:

```
this.db.changes({
    since: 'now',
    live: true
}).on('change', this.showAddress);
```

## Input Data

We'll need some JSX. I put mine near the top of the **render** method:

```html
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// LOTS OF CODE HERE. THEN IN RENDER:

<p>{this.state.firstName}</p>
<p>{this.state.lastName}</p>
<div>
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-simple">First Name</InputLabel>
        <Input id="name-simple"
               value={this.state.firstName}
               onChange={this.handleFirst} />
    </FormControl>

    <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-simple">Last Name</InputLabel>
        <Input id="name-simple"
               value={this.state.lastName}
               onChange={this.handleLast} />
    </FormControl>

</div>
```

Here is the **handleFirst** method:

```javascript
handleFirst = event => {
   this.setState({ firstName: event.target.value });
};
```

Well, I'll let you write **handleLast**

Then here is a method that can add an arbitrary small Address from the data in the input controls:

```javascript
addAddressReal = () => {
     const indexValue = this.state.addressIndex + 1;
     this.setState({addressIndex: indexValue});
     const address = {
         _id: new Date().toISOString(),
         firstName: this.state.firstName,
         // YOU GET THE LAST NAME
         completed: false
     };
     this.db.put(address, function callback(err, result) {
         if (!err) {
             console.log('Successfully posted a r!');
         }
     });
     this.state.ids.push(address._id);
     // You call this.setState and set the new ids value.
};
```

## Update a Record

For now, we will cheat and update only the most recently updated record by setting its completed field to true:

```
update = () => {
    this.db.get(this.state.ids[0])
        .then((address) => {
            address.completed = true;
            this.db.put(address);
        })
};
```

You add a button to call this method.

## Add CORS to CouchDb

This is okay because we are not doing it. Someone who knows what they are doing implemented it.

Don't do it on EC2 until we the Admin Party is over! But we can do it locally without needing username and password.

```
npm install -g add-cors-to-couchdb
add-cors-to-couchdb http://192.168.2.25:5984
```

## Connect to CouchDb

You need to add this to the body of your index.html:

```javascript
<div id="sync-wrapper">
  <div id="sync-success">Currently syncing</div>
  <div id="sync-error">There was a problem syncing</div>
</div>
```

Then add these methods just above your render method:


```
syncError = () => {
    this.syncDom.setAttribute('data-sync-state', 'error');
};

sync = () => {
    this.syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = {live: true};
    this.db.replicate.to(this.remoteCouch, opts, this.syncError);
    this.db.replicate.from(this.remoteCouch, opts, this.syncError);
};
```



## Turn it in

Turn in working code. Tag it, specify folder. Add the branch name if you are using one.

Include a screenshot of the CouchDb fouton view of the database showing that you inserted data into the addresses table.
