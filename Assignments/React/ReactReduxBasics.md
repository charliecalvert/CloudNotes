# React Redux Basics

Install:

  npm install --save redux react-redux redux-devtools

## Redux

We change state by "dispatching" an action. (You can log, serialize or store actions.)

A Redux tracks your app's state. It has the following methods:

- subscribe,
- dispatch,
- getState

## Store state

```javascript
let store = createStore(spokesman);
```

## Actions

Design some simple actions:

```javascript
let verify = { type: 'VERIFY' }
let deny = { type: 'DENY' }
let noComment = { type: 'NO COMMENT' }
```

## The Reducer

This we will use, so save it as **spokesman.js**:

```javascript

const spokesman = (state = { statement: 'No comment' }, action) => {
    switch (action.type) {
        case 'VERIFY':
            return { statement: 'We stand by it. In fact, we invented it.' };
        case 'DENY':
            return { statement: 'We deny everything. We have never heard of it.' };
        case 'NO COMMENT':
            return {statement: 'No comment.'};
        default:
            return state;
    }
};

export default spokesman;
```

## Dispatch

```javascript
store.dispatch({ type: 'VERIFY' });
```

## Subscribe

When the state changes, you can update the UI by monitoring calls to subscribe():

```javascript
import {createStore} from 'redux';

let store = createStore(spokesman);

store.subscribe(() => {
    this.setState((prevState) => {
        const storeState = this.props.store.getState();        
        return {statement: storeState.statement}
    });
});
```

## Fake Redux

```javascript
import React, { Component } from 'react';
import spokesman from './spokesman';

class SimpleRedux extends Component {
    /*constructor() {
        super();
        this.
    }*/
    state = spokesman(undefined, {});

    dispatch(action) {
        this.setState( (prevState) => spokesman(prevState, action));
    }

    verifyStatement = () => {
        this.dispatch({ type: 'VERIFY' });
    };

    denyEverything = () => {
        this.dispatch({ type: 'DENY' });
    };

    noComment = () => {
        this.dispatch({ type: 'NO COMMENT' });
    };

    render() {
        return (
            <div>
                <h1>Political Science Fake Redux</h1>

                <p>This component does not use redux. It uses something redux-like.</p>
                {this.state.statement}
                <hr />
                <button onClick={this.verifyStatement}>Verify</button>
                <button onClick={this.denyEverything}>Deny</button>
                <button onClick={this.noComment}>No Comment</button>
            </div>
        )
    }
}

export default SimpleRedux;
```

## Set up Index

```javascript
import spokesman from './spokesman';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

let store = createStore(spokesman);
ReactDOM.render(
    <div>
        <Provider store={store}>
            <div>
                <App />
                <FakeRedux/>
            </div>
        </Provider>
    </div>

    , document.getElementById('root'));
```

## Redux with props

```javascript
constructor(props) {
        super(props);
        this.state = {
            statement: 'No comment'
        };
        this.props.store.subscribe(() => {
            const storeState = this.props.store.getState();
            this.setState((prevState) => {
                return {statement: storeState.statement}
            });
        })
    }

    verifyStatement = () => {
        this.props.store.dispatch({ type: 'VERIFY' });
    };
    <h1>Political Science Props Redux</h1>
    render() {
            return (
                <div className="App">

               <p>This component does not use redux. It uses something redux-like.</p>
               {this.state.statement}
               <hr />
               <button onClick={this.verifyStatement}>Verify</button>
               <button onClick={this.denyEverything}>Deny</button>
               <button onClick={this.noComment}>No Comment</button>
               </div>
        );
    }
```

Okay

## AppNoProps

We want to create a component that does not get props, but does have access to the Redux data store.

Import connect:

```javascript
import {connect} from 'react-redux';
```

Remove subscribe from the constructor:

```javascript
constructor(props) {
    super(props);
    this.state = {
        statement: 'No comment'
    };
}
```

Add this code at the bottom:
```javascript
const mapStateToProps = (state) => {
    return {
        statement: state.statement
    }
};

AppNoProps = connect(mapStateToProps)(AppNoProps);
```

And now we no longer get dispatch as props passed from **index.js**:

```javascript
verifyStatement = () => {
    this.props.dispatch({ type: 'VERIFY' });
};
```

## Updated spokesman

```javascript
const spokesman = (state = { statement: 'No comment' }, action) => {
    switch (action.type) {
        case 'VERIFY':
            return {
                statement: 'We stand by it. In fact, we invented it.',
                kind: 'verify'
            };
        case 'DENY':
            return {
                statement: 'We deny everything. We have never heard of it.',
                kind: 'deny'
            };
        case 'NO COMMENT':
            return {
                statement: 'No comment.',
                kind: 'no Comment'
            };
        default:
            return state;
    }
};

export default spokesman;
```

And then the function rather than class in **DispatchConnect.js**:

```javascript
let DispatchConnect = ({dispatch, statement, kind}) => {

    const verifyStatement = () => {
        dispatch({type: 'VERIFY'});
    };
    // And so on
    return (
    <div className="App">
        <div className="App-intro">
            <h2>Welcome to React</h2>
        </div>

        <h1>Political Science Dispatch Connect Redux</h1>

        <p>This component does not use redux. It uses something redux-like.</p>
        <p>{statement}</p>
        <p>{kind}</p>
        <hr />
        <button onClick={verifyStatement}>Verify</button>
        <button onClick={denyEverything}>Deny</button>
        <button onClick={noComment}>No Comment</button>

    </div>
  );
}
```

And modify **mapStateToProps** to see the new property:

```javascript
const mapStateToProps = (state) => {
    return {
        statement: state.statement,
        kind: state.kind
    }
};
```

## Final Index

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FakeRedux from './FakeRedux';
import AppNoProps from './AppNoProps';
import DispatchConnect from './DispatchConnect';
import AppConnect from './AppConnect';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import spokesman from './spokesman';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Connector from './Connector';

let store = createStore(spokesman);

ReactDOM.render(
    <div>
        <Provider store={store}>
            <div>
                <App store={store} />
                <hr /><hr />
                <AppNoProps/>
                <hr /><hr />
                <DispatchConnect/>
                <hr /><hr />
                <AppConnect/>
                <Connector/>
                <hr /><hr />
                <FakeRedux/>
            </div>
        </Provider>
    </div>

    , document.getElementById('root'));
registerServiceWorker();
```

And here is the Connector:

```javascript
/**
 * Created by bcuser on 6/1/17.
 */

import {connect} from 'react-redux';
import AppConnect from './AppConnect';

const mapStateToProps = (state) => {
    return {
        statement: state.statement,
        kind: state.kind
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyStatement: () => {
            dispatch({type: 'VERIFY'});
        },
        denyEverything: () => {
            dispatch({type: 'DENY'});
        },
        noComment: () => {
            dispatch({type: 'NO COMMENT'});
        }
    }
};

const Connector = connect(mapStateToProps, mapDispatchToProps)(AppConnect);

export default Connector;
```

And here is AppConnect:

```javascript
import React from 'react';
import './App.css';

let AppConnect = ({statement, kind, verifyStatement, denyEverything, noComment}) => {

    return (
        <div className="App">
            <div className="App-intro">
                <h2>Welcome to React</h2>
            </div>

            <h1>Political Science App Connect Redux</h1>

            <p>This component does not use redux. It uses something redux-like.</p>
            <p>{statement}</p>
            <p>{kind}</p>
            <hr />
            <button onClick={verifyStatement}>Verify</button>
            <button onClick={denyEverything}>Deny</button>
            <button onClick={noComment}>No Comment</button>

        </div>
    );
};


export default AppConnect;
```

## Local Storage

Redux can write the current state to localStorage.
