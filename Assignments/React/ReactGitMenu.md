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

Note the user of the flag **exact**. This is necessary because 

## Style the Menu

Read about it [here][rrdstm]

[rrdi]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReactMenu.html#router-install
[rrdstm]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptReactMenu.html#style-the-menu
[gf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-home.png
[bf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-barfoo.png
[sm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-numbers.png
