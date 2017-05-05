## Overview

The goals of this assignment are:

- Create a menu, no matter how limited
- Switch views between **Git View**, **BarFoo** and **SmallNumbers**

In this serious of screen shots you can see the menu, and the various views it provides. In particular, each view features one component, or one component and its child components.

![Git View][gf]

**IMAGE**: _Home page with no styling on menu._

![Bar Foo][bf]

**IMAGE**: _Get Foo page with menu styling._

![Small Numbers][sm]

**IMAGE**: _Small Numbers page with menu styling._

## Install React Router

Read the [React Router Dom Install][rrdi] section from Elvenware then return to this document.

## Rename Header to ElfHeader

In this assignment we will be working the component that we use to display our header. We initially called this class **Header**. Let's do a small refactor here and change its name to **ElfHeader**. This will make it less likely that its name will collide with the HTML tag of the same name, or some other JavaScript variable with the same name.

I prefer to use Git to rename files:

  git mv src/components/Header.js src/components/ElfHeader.js

Then open up the file and change the name of the class itself from **Header** to **ElfHeader**:

```javascript
class ElfHeader extends Component { ... }

export default ElfHeader;
```

## The Main Index

We are going to fundamentally change the structure of our program. This means, at least for now, that **index.js** should no longer be responsible for showing **GetUserInfo**, **GetFoo** or **SmallNumbers**. Instead, it should show only our **ElfHeader**, which is the class we will use to switch between component views. Here is our modified **index.js** file:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ElfHeader from './components/ElfHeader';
import './css/index.css';

ReactDOM.render(
    <div>
        <ElfHeader/>
    </div>,
    document.getElementById('root')
);
```

**NOTE**: _A crucial point, in fact, probably the central point, of this class, is how easy it is for us to move classes and views around when we use the **React** architecture. Yes, it is hard to get up to speed on React, and yes, it is a fairly complex tool. But once you have everything set up, making relatively large changes to our program's architecture are simple. The small, focused loosely coupled components that we have created give us the flexibility to accept changes in specifications with a minimum of disruption._

## The ElfHeader Shell

Open up **ElfHeader** in your editor. The first step will be to change our imports to pull in the components we want. We will also want to access some key classes from **react-router-dom**:

```javascript
/**
 * Created by charlie on 4/15/17.
 */

import React, { Component } from 'react';
import GetUserInfo from './GetUserInfo';
import GetFoo from './GetFoo';
import SmallNumbers from './SmallNumbers';
import numbersInit from '../numbers-data';
import logo from '../images/gold-fish.svg';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import '../css/App.css';

class ElfHeader extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
            </div>            
        );
    }
}

export default ElfHeader;
```

Note the code we have pulled in from **react-router-dom**. You don't have to do this, but if you are interested, you can view their source:

```bash
geany node_modules/react-router-dom/BrowserRouter.js
geany node_modules/react-router-dom/Route.js
geany node_modules/react-router-dom/Link.js
```

## Add Menu

Let's focus only on the render method from **ElfHeader**:

```javascript
render() {
    return (
        <Router>
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
            </div>
        </Router>
    );
}
```

Here we have added the **Router** react class from **react-router-dom**. I believe that it's goal will be to iterate through its children, find the ones that define the menu, and cause them to render appropriately. In any case, it needs to be there or our code won't work.

## Add Menu

Let's add in the code that defines the "visible" menu that the user will click on:

```javascript
render() {
    return (
        <Router>
            <div className="App">

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/get-foo">BarFoo</Link></li>
                    <li><Link to="/get-numbers">Numbers</Link></li>
                </ul>

                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
            </div>
        </Router>
    );
}
```

Here we are using the **react-router-dom** class called **Link** to help us create a link that behaves appropriately in this context. It will, for instance, turn the first two items into code that looks like this at run time:

```HTML
<li><a href="/">Home</a></li>
<li><a href="/get-foo">BarFoo</a></li>
```

## Defining Routes

The final step involves defining what the application will do when the user clicks on a particular menu item. We do it like this for the home menu:

```HTML
<Route exact path="/" component={GetUserInfo}/>
```

Note the user of the flag **exact**. This is necessary because a simple match on '/' will pass both '/' and '/get-foo'. In fact, it will match any URL beginning '/'. So we tell the router that we want an exact match.

I want you to have to figure out at least one of these routes on your own, so I will let you discover the solution for creating the Route to GetFoo. It isn't hard, so try not to over-complicate it.

It is, however, a bit tricky to use a **Route** to load a React component that expects props. Here is how to proceed:

```javascript
<Route path="/get-numbers"
    render={(props) => (
        <SmallNumbers {...props}
            numbers={numbersInit} />
    )}
/>
```

The normal pattern is to define the path, and then the component:

```javascript
<Route path="/my-component" component={MyComponent}/>
```

You cannot, however, pass props to **MyComponent** the same way you can elsewhere in a React application. Instead, you use **render** instead of **component**, and the syntax looks like this in our case:

```javascript
<Route path="/get-numbers"
    render={(props) => (
        <SmallNumbers {...props}
            numbers={numbersInit} />
    )}
/>
```

We use this syntax because **react-router-dom** passes a certain number of props to a component by default, and we don't want to lose them. Here we use the [spread-operator](http://es6-features.org/#SpreadOperator) to pass the Router props and then we pass our own props. Here is what it looks like in the debugger:

![Local Scope Props Numbers][lspn]

**IMAGES**: _You can see the **Sources** tab of Chrome Developer Tools_

I've run to a breakpoint on line 10 of **SmallNumbers.js**. At the bottom right we can see that **props** for SmallNumbers is in the **Local Scope**. The debugger displays our **Numbers** prop, along with three properties passed by the **react-router-dom**:

- history
- location
- match

They can come in useful in more advanced scenarios than the one we see here. In particular, they can help preserve history so the user can move back and forth through your site.

## Style the Menu

Read about it [here][rrdstm]

## Show All Fields of Git User

Be sure to replace the field-definitions.js file with new code from the **Git Convert** assignment. You should be able to display all the fields that are returned from Git.

You will need to make some edits here to the string that is assignment to the value attribute:

```javascript
<ElfElements {...field}
      value={this.props.gitUser[field.id]}
      onChange={this.props.onChange}
```

I ended up calling a function and doing my work there:

```javascript
value={getValue(this.props.gitUser)}
```

In the getValue function, you might want to use syntax like this:

```javascript
return testMe || ''
```

That code will return an empty string if **testMe** is **null** or **undefined**. You will also need to handle the case with **gitUser[field.id]** is a **boolean**.

When everything is working right, you won't see messages like this in the debugger: _Warning: `value` prop on `input` should not be null. Consider using the empty string to clear the component or `undefined` for uncontrolled components._ Also, your boolean fields such as **site-admin** will have strings in them rather than being blank. The point being, of course, that your code should run without warnings or errors.

## Turn it in

Add, commit, push, tag and/or branch. Let me know the tag and/or branch as well as the directory for your work. Make sure all your tests pass. For now.

## ElfDebug

 [ElfEnzymeDebug][eed]

[eed]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab


[rrdi]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReactMenu.html#router-install
[rrdstm]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReactMenu.html#style-the-menu
[gf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-home.png
[bf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-barfoo.png
[sm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-numbers.png
[lspn]: https://s3.amazonaws.com/bucket01.elvenware.com/images/small-number-props.png
