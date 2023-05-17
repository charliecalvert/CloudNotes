---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactBootstrap.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/React
fileName: ReactBootstrap.md
relativePath: /React/ReactBootstrap.md
title: ReactBootstrap
directoryName: React
category : react-guide
---

# React Bootstrap

It's time to tweak our apps appearance so that it works on a phone. We will use bootstrap to help us achieve our goal.

## Get started

The first thing we want to do is to [install Bootstrap].

```
npm install --save bootstrap
npm install --save react-bootstrap
npm install --save react-router-bootstrap
```

Then in **index.js**, we load some bootstrap css:

```javascript
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
```

## container

The next step is to ensure all your code is included in a bootstrap **container**. The simplest thing might be to put it in the outer div in **DataMaven**:

```javascript
render() {
    return (

            <div className="container">
                <ElfMenu />
                // AND SO ON
            </div>
    )
}
```

## The header

We will now begin using some bootstrap components. If you are not familiar with bootstrap, you should visit their website and get up to speed with it as best you can. Even if you do know bootstrap, you should continuously be going back to both their reference page for components and for css:

- [Bootstrap Home](http://getbootstrap.com/)
- [Bootstrap Components](http://getbootstrap.com/components/)
- [Bootstrap CSS](http://getbootstrap.com/css/)

You probably noticed that we installed something called **react-bootstrap**. This library is currently under construction, but it will allow us to use bootstrap in our JSX.

**NOTE**: _It is possible that I will give up on **react-bootstrap** after a time, but let's try it for now._

The **react-bootstrap** package turns bootstrap components in JSX components. Lets start working with it by using the **Jumbotron** in our header:

```javascript
import React, {Component} from 'react';
import logo from '../images/goldfish.svg';
import {  Jumbotron } from 'react-bootstrap';

class ElfHeader extends Component {

    render() {

        return (
            <div>

            <Jumbotron>

                <div>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <h2>Welcome to Prog272</h2>
                </div>

            </Jumbotron>
            </div>
        );
    }
}

export default ElfHeader;
```

Notice that we import **Jumbotron**:

```javascript
import {  Jumbotron } from 'react-bootstrap';
```

We can then use it just as we would any other JSX class. After applying it, look at your app in the browser. It's going to take awhile to get it looking as we would wish, but this is a start.

## The menu

Bootstrap menus are one of the most complex parts of bootstrap. They need to look right on a desktop, and the respond correctly when loaded on a phone. To make it work, we do something like this:


```javascript
/**
 * Created by charlie on 5/1/17.
 */

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem   } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ElfMenu extends Component {

    render() {
        const navbarInstance = (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to='/'><NavItem>CongressAddress</NavItem></LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to='/'><NavItem>Address Show</NavItem></LinkContainer>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Link Right</NavItem>
                        <NavItem eventKey={2} href="#">Link Right</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
        return (
                <div>
                    {navbarInstance}
                </div>
        );
    }
}

export default ElfMenu;
```

If you know bootstrap menus, much or all of this should be familiar to you. The JSX that we use here follows the standard bootstrap syntax quite closely, with a few tiny twists. Notice in particular, that instead of applying classes to our HTML, we import several JSX components from **react-bootstrap**:

```javascript
import { MenuItem, Nav, Navbar, NavDropdown, NavItem   } from 'react-bootstrap';
```

It's a variation on the familiar bootstrap syntax, but it is closely enough aligned to be readily decipherable. If you are completely at sea, go to the bootstrap components page above and learn about navs and navbars.

One further wrinkle that we face is that our menu is implemented by **react-router-dom**. That we means we need a special set of custom components from the **react-router-bootstrap** package. Or, more precisely, we need to use **LinkContainer** instead of the **react-router-dom** object called **Link**:

```html
<LinkContainer to='/'><NavItem>CongressAddress</NavItem></LinkContainer>
```

We are, in effect, wrapping standard bootstrap JSX in our LinkContainer.

In the code provided above, I leave it up to you use **LinkContainer** twice more to create menu items for **AddressEdit** and **SmallNumbers**.

## AddressShow

Finally, we want to AddressShow and strip out almost all the CSS we have been using. Replace it with something like this:

```html
import { Button } from 'react-bootstrap';

// STUFF OMITTED HERE

<form className='navbar-form' action="">
    <div id='addressShowRender' className='row'>
        <div className="col-sm-12">
        <p className='elf-p'>
            firstName: {this.props.address.firstName}
        </p>
        // MORE OMITTED HERE
    </div>
</form>
```

And then, finally define **elf-p** in **App.css** or whereever you feel is appropriate.

```css
.elf-p {
    font-size: 18px;
}
```

You can tweak as you feel is appropriate. (There are other ways to change fonts in bootstrap, but this might work for us at least for now.)

Here is how to use the Button:

```html
<Button
  bsStyle='primary'
  id='decrementAddressClick'
  onClick={this.props.onAddressChange}>Prev Address</Button>
```

Or, simplest possible case:

```html
<Button bsStyle='warning'>Warning</Button>
```

## Turn it in

Add, commit, push, branch, tag. Use the words **bootstrap-react** in your messages.

## Hint

I don't think we use them any more, but just in case I tweaked my menu.css file so that we did not globally change **UL** and **LI** elements:

```css
.App.ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: coral;
}

.App.li {
    float: left;
}

.App.li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
.App.li a:hover {
    background-color: #111;
}
```
