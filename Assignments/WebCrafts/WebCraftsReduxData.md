## Overview

We start working with our **ElvenConfig.json** file via Redux.

## Client and Server

You know the drill:

    mkdir Week09-ReduxData
    cd Week09-ReduxData
    create-react-app client
    CreateExpressProject server

## Concurrently

Do the [concurrently][cc] assignment.

## Promises

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/nWV4Ed2gckk?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## Chained Promises

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/PU4gq6yTqyA?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

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
  // YOUR CODE HERE
};

App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

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
import getConfig from './get-config';
const state = getConfig();


const spokesman = (state = state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default spokesman;
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
