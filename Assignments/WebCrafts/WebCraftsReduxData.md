---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts/WebCraftsReduxData.md
relativePath: Assignments/WebCrafts/WebCraftsReduxData.md
title: WebCraftsReduxData
queryPath: Assignments/WebCrafts/
subject: WebCrafts
fileNameMarkdown: WebCraftsReduxData.md
fileNameHTML: WebCraftsReduxData.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

We start working with our **ElvenConfig.json** file via Redux.

![Redux Data View](https://s3.amazonaws.com/bucket01.elvenware.com/images/redux-data-view.png)

## Client and Server

You know the drill:

    mkdir Week09-ReduxData
    cd Week09-ReduxData
    create-react-app client
    CreateExpressProject server

## Concurrently

Do the [concurrently][cc] assignment.

## Load the config File

On the server, in **routes/index.js**:

```javascript
const config = require('isit-code-lastname').elfConfig;

---

router.get('/getConfig', function(req, res, next) { 'use strict';
    config.loadAsync()
        .then(function(configuration) {
            // WRITE CODE TO SEND THE CONFIGURATION
            // VIA HTTP
        })
        .catch(function(err) {
            throw err
        })
});
```

To call this route, you would do something like this in a file called **src/get-config.js**:

```javascript
export default () => {
    return new Promise(function (resolve, reject) {
        fetch('/get-config')
            .then(function (response) {
                return response.json();
            })
            .then(function (configuration) {
                resolve(configuration.configuration.users)
            })
            .catch(function (ex) {
                reject(ex);
            });
    });
};
```

## Client Actions

- ALL
- BOOTSWATCH
- SITE_DIRS
- DESTINATION_DIRS

## The Client Code {#the-client}

Install Material UI

    npm install --save material-ui
    npm install --save redux
    npm install --save react-redux


Use **RaisedButton**:

```javascript
import RaisedButton from 'material-ui/RaisedButton';
```

Put in Redux:

```javascript
import {connect} from 'react-redux';

let App = ({put, the, dispatched, functions, here}) => {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          App Reducer
        </p>
        // YOUR JSX HERE WITH RaisedButton HERE.
      </div>
    );

};

const mapStateToProps = (state) => {
  // YOUR CODE HERE
};

const mapDispatchToProps = (dispatch) => {
    siteDirsClick: () => {
        dispatch({type: 'SITE_DIRS'})
    },
    destinationDirsClick: () => {
        // YOU DO IT
    },
    bootswatchClick: () => {
        // YOU DO IT
    }
};

App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default App;
```

When filling the dispatched functions, review the actions outlined above.

## Redux

In **index.js**:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configReducer from './config-reducer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(configReducer);
const root = document.getElementById('root');

ReactDOM.render(
    <div>
        <Provider store={store}>
        <App />
        </Provider>, root);
    </div>
);
registerServiceWorker();
```

## Config Reducer

Basing your work on Spokesman from our Redux Starter assignment, create a reducer. Only this time, also create a promise in get-config that loads **ElvenConfig.json**.

The actions we respond to in the reducer:

- ALL
- BOOTSWATCH
- SITE_DIRS
- DESTINATION_DIRS

```javascript
let stateInit = {
    baseDir: 'unknown',
    bootswatch:'unknown',
    siteDirs: ['unknown'],
    destinationDirs: ['unknown']
};

const configReducer = (state = stateInit, action) => {
    switch (action.type) {
        case 'ALL':
            const user = action.users.calvert;
            return {
                ...user,
                baseDir: user['base-dir'],
                bootswatch: user.bootswatch,
                siteDirs: // YOU DO IT,
                destinationDirs: // YOU DO IT
            };
        case 'BOOTSWATCH':
            return {
                ...state,
                bootswatch: 'foo'
            };
        case 'SITE_DIRS':
            return {
                // YOU DO IT
            };
        case 'DESTINATION_DIRS':
            return {
                // YOU DO IT
            };
        default:
            return state;
    }
};

export default configReducer;
```

## Dialogs

Invoke the dialog like this in your JSX:

```XML
<ScrollableDialog dirs={siteDirs} title="Site Dirs"/>
```

The code passes two parameters to **ScrollableDialog** which turn up in the props of the dialog itself:

```javascript
constructor(props) {
    super(props);  << THE PARAMETERS ARE IN HERE
    ...
}
```

And here is the dialog in its entirety:

```javascript
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';

export default class DialogExampleScrollable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <div>
                <RaisedButton label={this.props.title} onClick={this.handleOpen} />
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <List>
                    {this.props.dirs.map((dir) => (
                        <ListItem key={dir} primaryText={dir} leftIcon={<FileFolder />} />
                    ))}
                    </List>
                </Dialog>
            </div>
        );
    }
}
```

## Error on Prepare styles

Error: **Cannot read property 'prepareStyles' of undefined**

Don't forget the MuiThemeProvider!

## Why Two Projects?

Ultimately, we will have only one app and it will be the server. The **create-react-app** **client** will be abandoned at release time.

In particular, we will choose **npm build** on the **client**, then copy the build output to the public directory of our **server**, and thus combine the front end and the back end into one app. But during development, it is simpler to have two apps, I think. That is assuming you like the benefits of **create-react-app**. In particular, the way it refreshes the web page automatically and handles other painful webpack chores for us.

The main reason we do things this way is to fit in comfortably with the applications created with **create-react-app**. They are set up very nicely to help with development and debugging of the front end, but they are not designed to have an Express back end during development. They are designed to have only the front end until we deploy them on top of a **server**.

- <https://daveceddia.com/create-react-app-express-backend/>

This is a fast-moving world, and things may change over time. But that is what I know now.

And I think, whether we wanted to make a call to our **server** or not, we are often going to want to build a backend for the output from **create-react-app** when we deploy. The thing we are doing differently than the default backend is to support REST calls, which we are shoehorning in with the **proxy** calls to the **server** until the release time when we combine both apps into the **server** via the **build** step.












[cc]: http://www.ccalvert.net/books/CloudNotes/Assignments/Npm/RunConcurrently.html
