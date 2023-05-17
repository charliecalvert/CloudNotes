---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/CouchDb/CouchSmallAddress.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/CouchDb
fileName: CouchSmallAddress.md
relativePath: /CouchDb/CouchSmallAddress.md
title: CouchSmallAddress
directoryName: CouchDb
category : couchdb-guide
---

## Overview

Refactor Pouch Starter and add support for live syncing.


## Update to Latest CouchDb

Details are [here][ulc].

## Get Template Tool

1. Go to JsObjects: **jo**
1. Pull the latest: **git pull**
1. Go to SetupLinuxBox: **slb**
1. Run CreateSymbolicLinks: **./CreateSymbolicLinks**

Now you can get a template by typing **get-template** and choosing the template you want from the menu.

Run: **source ./bashrc**

## Install Packages

Install **react-router-dom**:

```
npm i react-router-dom
yarn add react-router-dom
```

And a some [query tools][qt]:

```
yarn add pouchdb-find
npm i pouchdb-find
```

[qt]: https://pouchdb.com/guides/mango-queries.html  

## Design

We have the following:

- App
  - **ElfHeader** and **tileData**
  - **Home** page
  - **Address** and **AddressShow**
  - **AddressEdit** and **AddressEditFields**
  - **InitializeDatabase**
  - **PouchDbManager**

## Screenshots

Some screenshots.

### Home

![Home][home]

### Menu

![Menu][menu]

### InitializeDatabase

![InitializeDatabase][idb]

### Address

Sync mode was turned on when I took this screenshot which accounts for much of the data in the Console of the Developer Tools.

![Address][address]

## Functionality

- Display records originally loaded from **CongressAddress** server.
- CRUD (We create only during initialization.)
- Work offline
- Sync to CouchDB
- Sync between browser instances

## Set up Proxy

We need to be able to query our server during the init phase so that we can get our initialize list of Congress people.

In **package.json**:

```javascript
"proxy": "http://localhost:30026",
```

## Create App

Copy recursively (cp -r) the contents of **Week09-SmallAddressMaster** into **Week10-SmallAddressMaster**.

## Header

Our first chore is to begin refactoring. This is standard procedure. Many of us begin by getting code to work, then we start refactoring, looking for a maintainable design that follows basic [design principles][dp].

Start your application so you can follow your progress as you walk through the steps.

Create a **src/components** folder.

- Copy the **ElfHeader** and **tileData** from your latest Address Maven into the **components** directory.
- Move **App.js** into the **components** directory.
- Copy **App.js** to **Address.js**.

Also copy in **address-list.json** from your best Address Maven into your **src** directory. This is the short list of addresses used to initialize state in our constructors. It might look something like this:

```JavaScript
cp ../../AddressProxy/src/address-list.js .
```

In **Address.js**, rename **App** to **Address**.

Resolve any errors you are getting and ensure that your program continues to run.

## Basic HTML

We aren't going to use this bit of HTML, so remove it from **public/index.html** if it exists:

```html
<div id="sync-wrapper">
    <div id="sync-success">Currently syncing</div>
    <div id="sync-error">There was a problem syncing</div>
</div>
```

## Create Home

Just a default component that you can modify as you wish for the final:

```javascript
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

//export default Home;
export default withStyles(styles)(Home);
```

## Clean up App.js

Replace styles with a simple styles declaration with a container:

```JavaScript
const styles = theme => ({
    container: {
      flexGrow: 1
    }
});
```

Make sure your JSX uses it:

```javascript
render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
               // CODE OMITTED HERE
            </div>
        );
    }
```

Delete the contents of **componentDidMount**:

```javascript
componentDidMount() {
}
```

Delete the **constructor** and all other methods except **render**. In **render**, delete all the JSX and replace it with code to load the **Address** component.

Contents of the components folder at this stage:

- App.js
- Address.js
- ElfHeader.js
- tileData.js

At this stage, my **App.js** is about 35 lines long.

## Create the Menu

Add **ElfHeader** to the **App.js** JSX just above where you declare **Address**.

Modify **tileData** so that it contains three **ListItems**:

- **Home**: '/'
- **Address**: '/address'
- **InitializeDatabase**: './init-db'

Above, separated by a colon, I show:

- The **primary** attribute of the **ListItemText**
- The **to** attribute of the **ListItem**.

## Clean up Address.js

Remove the **header** code from the JSX.

Remove the **FormControls** and the **div** that wraps them. Remove the **addAddressReal** method and the **Button** associated with it.

Remove the **Add Address (FooBar)** button but keep the method it calls.

Make a copy of **Address.js** called **AddressShow.js**

From **Address.js** delete these methods if they exist:

- **addAddress**
- **update**
- **handleFirst**
- **handleLast**
- **sync**
- **syncError**
- **showIndex**

From **AddressShow.js**:

- Keep the **constructor** and **render**.
- Delete all the other methods.

## PouchDbManager

Create a directory called **src/tools**.

From the command prompt, navigate to the tools directory. We now need to copy the **PouchDbManager.js** from **JsObjects** to our project.

- Issue this command: **get-template**
- Select **A** to copy **PouchDbManager** into the current directory.
- Exit **get-template** and return to the IDE.

## Get InitializeDatabase

Navigate to the components directory in the Bash shell.

Run **get-template**

Choose option b, to get **InitializeDatabase.js**.

## Refactor Address.js

Here is our new constructor:

```javascript
constructor(props) {
    super(props);
    this.canceled = false;
    this.state = {
        editOpen: false,
        namesIndex: 0,
        names: [{
              _id: 'unknown',
              firstName: 'unknown',
              lastName: 'unknown'
        }]
    };
}
```

Delete all the JSX and replace it with code that loads **AddressShow** and passes in  a **name** object as a parameter. Pass in four methods, only one of which exists at this time:

```JavaScript
render() {
    const {classes} = this.props;
    return (
        <AddressShow
            name={this.state.names[this.state.namesIndex]}
            showAddress={this.showAddress}
            setAddress={this.setAddress}
            save={this.save}
            delete={this.delete}
        />
    );
}
```

Block out the missing methods:

```javascript
setAddress = () => {};
save = () => {};
delete = () => {};
```

## Refactor AddressShow

Add the following styles at the top of the file above the component declaration and replacing any existing styles:

```javascript
const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    container: {
        flexGrow: 1,
        textAlign: 'center'
    },
    rootBar: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3
    }),
});
```

Replace **state** in the constructor:

```javascript
this.state = {
    editOpen: false,
    edits: {
        _id: 'unknown',
        firstName: 'unknown',
        lastName: 'unknown'
    }
};
```

Replace the existing render method with this one:

```javascript
render() {
  const {classes} = this.props;

  return (
    <div className={classes.container}>
      <Paper className={classes.rootBar}>
        <p>{this.props.name.firstName}</p>
        <p>{this.props.name.lastName}</p>
        <Button
          color="secondary"
          variant="raised"
          onClick={this.props.showAddress}
        >
          Show
        </Button>

        <Button
          color="secondary"
          variant="raised"
          onClick={event => this.props.setAddress(-1, event)}
        >
          Back
        </Button>
        <Button
          color="secondary"
          variant="raised"
          onClick={event => this.props.setAddress(1, event)}
        >
          Forward
        </Button>
        <div>
          <Button
            color="secondary"
            variant="raised"
            onClick={() => this.setState({editOpen: true})}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            variant="raised"
            onClick={this.save}
          >
            Save
          </Button>
          <Button
            color="secondary"
            variant="raised"
            onClick={event =>
              this.props.delete(this.props.name, event)
            }
          >
            Delete
          </Button>
        </div>
      </Paper>
    </div>
  );
}
```

We are using the MaterialUi **Paper** component. Here are the docs:

- [Paper API](https://material-ui.com/api/paper/)

- [Paper Demo](https://material-ui.com/demos/paper/)

Remember to hit the <> symbol to see the code on the demo page.

Here is the import statement:

```javascript
import Paper from '@material-ui/core/Paper';
```

## Enable the Menu

At the top of **App.js**:

```javascript
import { BrowserRouter, Route } from 'react-router-dom';
import dataManager from '../tools/PouchDbManager';
```

Replace the JSX with this:

```javascript
<BrowserRouter>
    <div className="App">
        <ElfHeader />
        <Route id="home" exact path="/" component={Home} />
        <Route
            id="address"
            path="/address"
            render={props => (
                <Address {...props} dataManager={dataManager} />
            )}
        />
        <Route
            id="initDb"
            path="/init-db"
            render={props => (
                <InitializeDatabase
                    {...props}
                    dataManager={dataManager}
                />
            )}
        />
    </div>
</BrowserRouter>
```

Add in the three missing import statements.

While we are at it, add in code for the **constructor** in **App.js** that will initialize PouchDB:

```javascript
constructor(props) {
    super(props);
    this.db = dataManager.init();
}

```

## Set Up the Database

In this application, we are not trying to create an enduser app, but to learn how to initialize Pouch Db. In the running app. In the app, try the following:

- Go to **InitializeDatabase**
- Run **Get Address List**
- Run **ConvertAddress**
- Run **CreateIndex**
- Run **Sync** to enter sync mode.

All should run without error. Lots of output in the console though.

## Show Address methods

```
setEdits = (name, event) => {
    var data = this.props.name;
    data[name] = event.target.value;
    this.setState({edits: data});
};

addressEdit = address => {
    console.log(address);

    if (!address) {
        return this.setState({editOpen: false});
    }

    this.setState({
        edits: address,
        editOpen: false
    });
};

save = () => {
    this.props.save(this.state.edits);
};
```

## Methods for Address

Don't have the Address component loaded in the running program while you do this:

```javascript
componentDidMount() {
    this.props.dataManager.watchChanges(this.watcher);
}

componentWillUnmount() {
    this.canceled = true;
}

watcher = event => {
    console.log('Watch Change', event);
    this.showAddress();
};

showAddress = () => {
    const that = this;
    return that.props.dataManager.db
        .find({
            selector: { lastName: { $gt: null } },
            sort: ['lastName']
        })
        .then(response => {
            console.log('RECORD COUNT:', response.docs.length);
            const names = response.docs.map(address => {
                return {
                    _id: address._id,
                    _rev: address._rev,
                    firstName: address.firstName,
                    lastName: address.lastName
                };
            });
            if (!this.canceled) {
                that.setState({ names: names });
            }
        });
};

setAddress = (offset) => {
    const value = this.state.namesIndex + offset;
    if (value >= 0 && value <= this.state.names.length - 1) {
        this.setState({ namesIndex: value, open: this.state.editOpen });
    }
};

save = (name) => {
    console.log(name);
    this.props.dataManager
        .save(name)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
        });
};

delete = (name) => {
    this.props.dataManager
        .delete(name._id)
        .then(function(result) {
            console.log('BAR', result);
        })
        .catch(function(err) {
            console.log(err);
        });
};
```

## Turn it in

Push Your work. Tag it. Submit the assignment.

We will add the edit functionality on Thursday.

## Data Cycle

Read about the PouchDb, IndexedDB and CouchDB [Data Cycle][pdbd].

## Where does the DOC come From {#what-doc}

In this code from **PouchDbManager.js**, where does the "doc" parameter come from?   

```javascript
delete = id => {
     const that = this;
     return that.db.get(id).then(function(doc) {
         return that.db.remove(doc);
     });
};
```

The **doc** is sent back from the database. We want to delete a particular document ( in traditional relational databases it would be called a record). We look it up by ID. The database sends the document (record) back to us, and then we use it in the call that actually removes the document. More details are here and at the top of this same page:

- [PouchDb Delete][delete]

In other words, you might want to read the [section on dancing][dance] from the document pointed to above. It will help you better understand the code for deleting a document.

## Nothing is Lost {#nothing-lost}

CouchDB (and therefore also PouchDB) never really deletes or updates a document. Instead, it marks a document as deleted creates a version of the document. That is what the **_rev** field is about. It marks the version of the document.

Suppose we update Robert Aderholt to Rob Aderholt. The old record is still visible in **IndexedDB**, as is the new one.

![Updated document visible and old document][updv]

Read the links in the previous section for more information on this process.

[pdbd]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ReactAddressEditDialog.html#data-cycle

[ulc]: http://www.ccalvert.net/books/CloudNotes/Assignments/CouchDb/PouchStarter.html#upgrade-to-latest-couchdb
[home]:https://s3.amazonaws.com/bucket01.elvenware.com/images/small-address-master-home.png
[address]:https://s3.amazonaws.com/bucket01.elvenware.com/images/small-address-master-address.png
[idb]:https://s3.amazonaws.com/bucket01.elvenware.com/images/small-address-master-tools.png
[menu]: https://s3.amazonaws.com/bucket01.elvenware.com/images/small-address-master-menu.png
[dp]: http://www.elvenware.com/charlie/development/web/JavaScript/GettingStarted.html#good-code

[delete]:  https://pouchdb.com/guides/updating-deleting.html#deleting-documents

[dance]: https://pouchdb.com/guides/updating-deleting.html#why-must-we-dance-this-dance

[updv]: https://s3.amazonaws.com/bucket01.elvenware.com/images/small-address-master-updates.png
