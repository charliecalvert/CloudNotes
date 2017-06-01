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


## Local Storage

Redux can write the current state to localStorage.
