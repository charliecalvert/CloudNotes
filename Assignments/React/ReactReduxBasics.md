---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactReduxBasics.md
relativePath: Assignments/React/ReactReduxBasics.md
title: ReactReduxBasics
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactReduxBasics.md
fileNameHTML: ReactReduxBasics.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

The goal of this assignment is to learn about Redux and Props.

- Redux allows us to maintain state. It is the model part of a Model-View-Controller architecture. React is the view part.

<div style="position:relative;height:0;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/rAMu5JUjQUs?ecver=2" width="640" height="360" frameborder="0" gesture="media" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe></div>

## React Redux Basics

Start in the root of your main (isit320-lastname-2017) repository. Build a **create-react-app** project called **Week08-ReduxBasics**:

    create-react-app week08-redux-basics

Navigate into your new project and install redux:

```
npm install --save redux react-redux redux-devtools
```  

## Redux

In Redux projects, it is often best to:

- Put all our state in one place
- Make state immutable. You can completely rebuild it, but you can't modify it.
  - If you want to update it, you completely rebuild state

There are several pieces in application of this type. One is a module called a **reducer**.

There is only one place where you rebuild state: the **reducer**. Hence there is never any question of where something happened in a big application. It could only have happened in the **reducer**. I explain reducers later in this document.

## Tracking State

Redux tracks your app's state. It has the following methods:

- subscribe,
- dispatch,
- getState

They are discussed below in various different sections of the document.

## Dispatch

We change state by "dispatching" an action. (You can log, serialize or store actions.)

Here is a typical call to **dispatch**:

```javascript
dispatch({
  type: 'GIT_USER',
  gitUser: gitUser
});
```

We name the action by giving it a **type**. And in this case, we have optionally included some data that will be used in a **reducer** when it rebuilds state.

## Store state

Redux maintains your application's **state** in something called a **store**.

```javascript
import {createStore} from 'redux';

let store = createStore(spokesman);
```

I write this code, which dispatches an action:

```javascript
store.dispatch({type:'ALL', users });
```
In your reducer, action.users is the thing you dispatched: **{type: ALL, users}**.

The usual flow:

-    Something is dispatched, as in the code shown above.
-    The dispatched code hits the reducer, which converts it into Redux state in the Redux store.
-    The dispatched message leaves the reducer and goes to all components that are connected to it. In particular, MapStateToProps gets called. Then you map the data from the Redux store to the properties you want to use in your component.
-    Then each connected components render method is called because (or if) its props were changed.

That's the end of the flow. Summary

-    Event dispatched to reducer
-    The reducer tracks the new state sent in the dispatched action
-    The components who are registered (connected) are notified of the updated state, which they transform into the components prop.
-    The component's render method is then called and you display the updated props.

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

This we will use in serveral places, so save it as **src/spokesman.js**:

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

The **spokesman** function takes two parameters:

- The current state, which is set to a default value
- The action, which was explained above.

This function has a very simple **state** object:

```javascript
state = { statement: 'No comment' }
```

That's it. The statement is the only moving part in the application. There are other variables, but their scope is limited to the object in which they are declared. The **state** object, however, has broader scope. In short, there are no other variables in the application that can change that have any effect outside of the component in which they are declared.

For instance, in a classic for loop, we often declare a variable called **i**:

```javascript
  for (let i = 0; i < 3; i++) {}
```

We don't need to put **i** in our application's **state** since it is not used by any other components. In fact, it is only used in one place in one method. So yes, the variable **i** is declared, and it can change value, but it is not part of our applications **state**. It's scope is very limited.

But the **state** object in spokesman is different. It is used by multiple modules, or at least we are pretending it is the type of data will be used in various places throughout the app. (This is, after all, an example, an academic exercise meant to teach principles. It is not meant perform a useful function in the real world in the sense that WebCrafts does.)

Our **reducer** modifies **statement** by completely rebuilding **state**. This is the only place in the application where **statement** can be modified.

In short, **state** is immutable. It can never be changed in any part of the programmer. We can send ask that **state** be rebuilt in the reducer, but we can't modify **state** on the fly in other parts of the app.

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

When the state changes, several parts of your app might want to be notified. You track changes **state** by monitoring calls to subscribe():

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

At heart, Redux is very simple. Consider this _fake_ Redux implementation. It is not Redux itself, but it is Redux-like. Save it as **src/FakeRedux.js**:


```javascript
import React, { Component } from 'react';
import spokesman from './spokesman';

class FakeRedux extends Component {

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
            <div className="App">
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

export default FakeRedux;
```

## Set up Index

In **index.js**, we want to do two things:

- Create our **store**
- Wrap the entire app in a Provider so that all parts of the app can independently access the **store** and other features of Redux.

In this code we are also displaying our **FakeRedux** file, but it has nothing to do with implementing the real Redux. We only display it so that we can see it in action.

Keep the declarations for **React** etc, but past this in as the working part of your **src/index.js** file:

```javascript
import spokesman from './spokesman';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import FakeRedux from './FakeRedux';

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

Note that we are completely replacing the default call **ReactDOM.render**.

## Redux with props

In its pure form, each component that wants to access Redux can do so on its own, without looking at **props**, and without peering into any other modules. But you can, if you want, pass down the Redux state in props. This is not the "right" way to do Redux. Yet, on the other hand, it is not wrong. Redux provides much more flexibility than a monolithic tool like **Angular.** So if you want to pass down **state** with **props**, go ahead and do it. But there is a "better" way, which will be explained later in this document.

Save this object into "src/App.js":

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


  render() {
    return (                
        <div className="App">
          <h1>Political Science Props Redux in App</h1>
          <p>This component uses redux.</p>
          {this.state.statement}

          <div className="Box">
            <button onClick={this.verifyStatement}>Verify</button>
            <button onClick={this.denyEverything}>Deny</button>
            <button onClick={this.noComment}>No Comment</button>
          </div>
          <hr />
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

Create a new file called **src/ComponentConnect** that is based on **src/App.js**. Be sure to rename the React component to match the name of the file.

Import **connect** at the top of the component that we want to give access to the Redux **store**:

```javascript
import {connect} from 'react-redux';
```

This time we have no **subscribe** in the **constructor**:

```javascript
constructor(props) {
    super(props);
    this.state = {
        statement: 'No comment'
    };
}
```

In fact, we don't really need the constructor at all, and you can delete it.

Now we use **connect** to _connect_ our component to the Redux data **store**. We do this by adding the following code at the bottom of the file and outside of the component:

```javascript
const mapStateToProps = (state) => {
    return {
        statement: state.statement
    }
};

ComponentConnect = connect(mapStateToProps)(ComponentConnect);
```

The method called **mapStateToProps** is passed to connect as its first parameter. It is our chance to map the applications state found in **spokesman** to the props found in our component. We get the Redux (spokesman) state in our props, so we are mapping the Redux **state** to our component's **props**.

More information is [here][redox].

We no longer get **store** in the **props** passed from **index.js**. Here was the old code:

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

Finally, in your JSX, use **this.props.statement** rather than **this.state.statement**.

**NOTE**: _This is one of those occasions when I am not listing explicitly every change you need to make. Hopefully this is enough to help you see what to do, but it more than just a cut and paste operation._

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

            <div>
              <button onClick={verify}>Verify</button>
              <button onClick={deny}>Deny</button>
              <button onClick={noComment}>No Comment</button>
            </div>
            <hr />
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

Here is the JSX only part. Save it in **TwoPartJsx**:

```javascript
import React from 'react';
import './App.css';

let TwoPartJsx = ({statement, deny, verify, noComment}) => {

    return (
        <div className="App">
            <h1>Two Parts: Code and JSX</h1>
            <p className="App-intro">
                This AppConnect component uses Redux and connect.
                The connect bits are in a separate files.
            </p>

            {statement}
            <div className="Box">
                <button onClick={verify}>Verify</button>
                <button onClick={deny}>Deny</button>
                <button onClick={noComment}>No Comment</button>
            </div>
            <hr/>
        </div>
    );
};

export default TwoPartJsx;

```

And here is the **connect** only code. Save it in **TwoPartCode**:

```javascript
import {connect} from 'react-redux';
import TwoPartJsx from './TwoPartJsx';

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
)(TwoPartJsx);

```

The point is that our interface is now separate from our logic. This has two advantages:

- We can give the JSX part to the UI team and let them work on it separately from the coding team.
- We can swap out the JSX easily, thus changing the look and feel without having to worry about changes to our logic.

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

And then the show the new property in **TwoKindJsx.js**:

```javascript
import React from 'react';
import './App.css';

let TwoPartJsx = ({statement, kind, deny, verify, noComment}) => {

    return (
        <div className="App">
            <h1>Two Parts: Code and JSX</h1>
            <p className="App-intro">
                This AppConnect component uses Redux and connect.
                The connect bits are in a separate files.
            </p>
            <p><strong>Kind</strong>: {kind}</p>
            <p><strong>Statement</strong>: {statement}</p>
            <div className="Box">
                <button onClick={verify}>Verify</button>
                <button onClick={deny}>Deny</button>
                <button onClick={noComment}>No Comment</button>
            </div>
            <hr/>
        </div>
    );
};

export default TwoPartJsx;

```

And modify **TwoKindCode** to initialize the new property:

```javascript
const mapStateToProps = (state) => {
    return {
        statement: state.statement,
        kind: state.kind
    }
};
```

## Final Index

By popular demand, here is the final **index.js**:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import spokesman from './spokesman';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import FakeRedux from './FakeRedux';
import DispatchConnect from './ComponentConnect';
import AppConnect from './AppConnect';
import TwoPartCode from './TwoPartCode';

let store = createStore(spokesman);
ReactDOM.render(
    <div>
        <Provider store={store}>
            <div>
                <Header/>
                <TwoPartCode/>
                <AppConnect/>
                <DispatchConnect/>
                <App store={store}/>
                <FakeRedux/>
            </div>
        </Provider>
    </div>, document.getElementById('root')
);

registerServiceWorker();
```

## css

I put this in **App.css**:

```css
.Box {
    margin-top: 10px;
}
```

## Turn it in

Add, commit, push. Create branch and or tag. Push. Tell me branch, tag and folder when turning in assignment.

## Local Storage

In a later assignment we will see that Redux can write the current state to **localStorage**.

[redox]: https://github.com/reactjs/react-redux/blob/master/docs/api.md

## Notes

I think the main goal of Redux is to help us maintain state across an entire application. Like so many frameworks, it provides a means of codifying best practices. In this case, some of the benefits include:

- It enforces the best parts of the MVC architecture. In particular, it focuses on Separation of Concerns. It maintains state in a centralized location that is very loosely coupled to the view. So M in MVC is the Redux. It maintains our model, our state. The V in MVC in React. It creates our view.

- Another best practice that it enforces is immutability. We cannot modify the data maintained by Redux, we can only send it a command, an action, and in response Redux may rebuild our entire state, but it will not modify it.

There are other tricks that Redux can perform, like helping with storing state between sessions. But that is a side benefit. The key benefits are the centralized object with strong separation of concerns, along with the immutable object.
