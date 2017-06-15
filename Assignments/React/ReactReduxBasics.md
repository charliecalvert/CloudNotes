# React Redux Basics

Install:

```
npm install --save redux react-redux redux-devtools
```  

## Redux

The overall goal is to:

- Put all our state in one place
- Make state immutable. You can completely rebuild it, but you can't modify it.
  - If you want to update it, you completely rebuild state


There is only one place where you rebuild state: the **reducer**. Hence there is never any question of where something happened in a big application. It could only have happened in the **reducer**. I explain reducers later in this document.

A Redux tracks your app's state. It has the following methods:

- subscribe,
- dispatch,
- getState


## Dispatch

We change state by "dispatching" an action. (You can log, serialize or store actions.)

Here is a typical call to **dispatch**:

```javascript
dispatch({
  type: 'GIT_USER',
  gitUser: gitUser
});
```

We name the action by giving it a **type**. And in this case, we have optionally included some data that will be used a **reducer** when it rebuilds state.

## Store state

Redux maintains your application's **state** in something called a **store**.
```javascript
import {createStore} from 'redux';

let store = createStore(spokesman);
```

## Example

In the next few sections we will put together an example.

## Actions

Lets begin by designing some simple actions:

```javascript
let verify = { type: 'VERIFY' }
let deny = { type: 'DENY' }
let noComment = { type: 'NO COMMENT' }
```

Note that there is no data associated with this actions. This means the actions are simple enough that they can re-build state without any additional information other than the action itself.

## The Reducer

This we will use in serveral places, so save it as **spokesman.js**:

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

Notice that this application has a very simple **state** object:

```javascript
state = { statement: 'No comment' }
```

That's it. That is the only moving part in the application. There are no other variables that can change that have any effect outside of the component in which they are declared.

In a for loop, we often declare a variable called **i**:

```javascript
  for (let i = 0; i < 3; i++) {}
```

We don't need to put **i** in our state since it is not used by any other components. In fact, it is only used this one place in one method.

But **statement** is different. It is used by multiple modules, or at least we are pretending it is the type of data will be used in various places throughout the app.

Noe that our **reducer** modifies **statement** by completely rebuilding **state**. And this is the only place in the application where **statement** can be modified.

## Dispatch

Here is an example call to **dispatch**:

```javascript
store.dispatch({ type: 'VERIFY' });
```

This message is *dispatched* to our reducer. The reducer responds by modifying the state like this:

```javascript
{ statement: 'We stand by it. In fact, we invented it.' };
```

## Subscribe

When the state changes, several parts of your app might want to be notified. You track changes to state by monitoring calls to subscribe():

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

Now you can modify the UI based on the changes.

## Simple Redux

At heart, Redux is very simple. Consider this _fake_ Redux implementation. It is not Redux itself, but it is Redux-like. Save it as **SimpleRedux.js**:


```javascript
import React, { Component } from 'react';
import spokesman from './spokesman';

class SimpleRedux extends Component {

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

In **index.js**, we want to do two things:

- Create our **store**
- Wrap the entire app in a Provider so that all parts of the app can independently access the **store** and other features of Redux.

In this code we are also displaying our **SimpleRedux** file, but it has nothing to do with implementing the real Redux. We only display it so that we can see it in action.

```javascript
import spokesman from './spokesman';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import SimpleRedux from 'SimpleRedux';

let store = createStore(spokesman);
ReactDOM.render(
    <div>
        <Provider store={store}>
            <div>
                <App />
                <SimpleRedux/>
            </div>
        </Provider>
    </div>
    , document.getElementById('root'));
```

## Redux with props

In its pure form, each component that wants to access Redux can do so on its own, without looking at **props**, and without peering into any other modules. But you can, if you want, pass down the Redux state in props. This is not the "right" way to do Redux. Yet, on the other hand, it is not wrong. Redux provides much more flexibility than a monolithic tool like **Angular.** So if you want to pass down **state** with **props**, go ahead and do it. But there is a "better" way, which will be explained later in this document.

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

    // IMPLEMENT denyEverything AND noComment HERE.

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

Notice that we do everything Redux-related on the **store** object passed as props from **index.js**:

```javascript
const storeState = this.props.store.getState();
this.props.store.dispatch({ type: 'VERIFY' });
```

To make the above work, your **index.js** might look like this:

```javascript
ReactDOM.render(
    <div>
        <Provider store={store}>
            <div>
                <App store={store}/>
                <hr /> <hr />
                <FakeRedux />
            </div>
        </Provider>
    </div>,
    document.getElementById('root'));
```

## AppNoProps

So what is the better way? What do we do if we want to create a component that does not get **props**, but does have access to the Redux data store?

We begin by importing connect at the top of the component that we want to give access to the Redux **store**:

```javascript
import {connect} from 'react-redux';
```

Remove **subscribe** from the **constructor**, or create a **constructor** that does not call **subscribe**:

```javascript
constructor(props) {
    super(props);
    this.state = {
        statement: 'No comment'
    };
}
```

Now we use **connect** to _connect_ our component to the Redux data **store**. We do this by adding the following code at the bottom of the component:

```javascript
const mapStateToProps = (state) => {
    return {
        statement: state.statement
    }
};

AppNoProps = connect(mapStateToProps)(AppNoProps);
```

And now we no longer get **store** in the **props** passed from **index.js**. Here was the old code:

```javascript
verifyStatement = () => {
    this.props.store.dispatch({ type: 'VERIFY' });
};
```

And here is the new code that does not rely on a **store**. Instead, dispatch is build in because we use **connect**:

```javascript
verifyStatement = () => {
    this.props.dispatch({ type: 'VERIFY' });
};
```

## MapDispatchToProps

Here is code that uses a method of **connect** called **mapDispatchToProps**. This allows us to define simple **dispatch** methods that are triggered by button clicks:

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
// We change state by "dispatching" an action.
// You can log, serialize or store actions.

let AppConnect = ({statement, deny, verify, noComment}) => {

    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to React and Redux</h2>
            </div>
            <p className="App-intro">
                This AppConnect component uses Redux and connect.
            </p>
            <h1>Political Science</h1>
            {statement}
            <hr />
            <button onClick={verify}>Verify</button>
            <button onClick={deny}>Deny</button>
            <button onClick={noComment}>No Comment</button>

        </div>
    );
    //}
};

const mapStateToProps = (state) => {
    return {
        statement: state.statement
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deny: () => {
            dispatch({type: 'DENY'})
        },
        verify: () => {
            dispatch({type: 'VERIFY'})
        },
        noComment: () => {
            dispatch({type: 'NO COMMENT'})
        }
    }
};

AppConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppConnect);

export default AppConnect;
```

Notice that we are using an arrow method rather than a component, and notice that it takes parameters, filled in by React, that represent the various methods and properties used by Redux.

Here is the arrow function:

```javascript
let AppConnect = ({statement, deny, verify, noComment}) => { ... }
```

And here where we use them in our JSX:

```html
{statement}
<hr />
<button onClick={verify}>Verify</button>
<button onClick={deny}>Deny</button>
<button onClick={noComment}>No Comment</button>
```

## Break out Connect

We can now break out our code into two pieces:

- One file contains **JSX** only
- One file contains our **connect** code.

JSX only. Save it in **AppConnectJsxOnly**:

```javascript
import React from 'react';
import './App.css';

let AppConnect = ({statement, deny, verify, noComment}) => {

    return (
        <div className="App">
            <p className="App-intro">
                This AppConnect component uses Redux and connect.
                The connect bits are in a separate file called <strong>AppConnectMaps</strong>.
            </p>
            <h1>App Connect JSX Only</h1>
            {statement}
            <hr />
            <button onClick={verify}>Verify</button>
            <button onClick={deny}>Deny</button>
            <button onClick={noComment}>No Comment</button>
        </div>
    );
};

export default AppConnect;
```

And here is the connect only code. Save it in AppConnectMaps.js:

```javascript
/**
 * Created by charlie on 6/6/17.
 */

import {connect} from 'react-redux';
import AppConnectJsxOnly from './AppConnectJsxOnly';

const mapStateToProps = (state) => {
    return {
        statement: state.statement
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deny: () => {
            dispatch({type: 'DENY'})
        },
        verify: () => {
            dispatch({type: 'VERIFY'})
        },
        noComment: () => {
            dispatch({type: 'NO COMMENT'})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppConnectJsxOnly);
```


## Updated spokesman

Suppose we wanted to update our code to use slightly more complex state that has two properties rather than one.

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

        <p>This component uses Redux.</p>
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
import SimpleRedux from './SimpleRedux';
import AppConnect from './AppConnect';
import AppConnectMaps from './AppConnectMaps';
import DispatchConnect from './DispatchConnect';
import DispactchComponentConnect from './DispatchComponentConnect';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import spokesman from './spokesman';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
let store = createStore(spokesman);

ReactDOM.render(
    <div>
        <Provider store={store}>
            <div>
                <AppConnect/>
                <hr /> <hr />
                <AppConnectMaps/>
                <hr /> <hr />
                <DispactchComponentConnect/>
                <hr /> <hr />
                <DispatchConnect/>
                <hr /> <hr />
                <App store={store}/>
                <hr /> <hr />
                <SimpleRedux />
            </div>
        </Provider>
    </div>,
    document.getElementById('root'));
registerServiceWorker();
```

## Turn it in

Add, commit, push. Create branch and or tag. Push. Tell me branch, tag and folder when turning in assignment.

## Local Storage

Redux can write the current state to localStorage.