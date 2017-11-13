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

## The client

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
        // YOUR JSX HERE
      </div>
    );

};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {};

App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

```

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















[cc]: http://www.ccalvert.net/books/CloudNotes/Assignments/Npm/RunConcurrently.html
