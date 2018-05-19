# React Git Menu

The goals of this assignment are:

- Create a menu with [react-router][rrb] no matter how limited
- Switch views between **Git View**, **BarFoo** and **SmallNumbers**

In this serious of screen shots you can see the menu, and the various views it provides. In particular, each view features one component, or one component and its child components. This is a [SPA][spa], or Single Page App.

![Git View][gf2]

**IMAGE**: _Home page with styling and menu at bottom of header._

![Bar Foo][bf2]

**IMAGE**: _Micro page with menu no styling._

![Foo API][fapi]

**IMAGE**: _Get Foo page with menu styling and menu at top._

![The components folder][rrcf]

**IMAGE**: The components folder

[rrcf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-router-menu-comps.png

## Install React Router

Read the [React Router Dom Install][rrdi] section from Elvenware then return to this document and install **react-router-dom** in the **client** directory.

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

Recall how our modified **index.js** file looks:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';

ReactDOM.render(
    <div>
        <App/>
    </div>,
    document.getElementById('root')
);
```

**NOTE**: _Notice how easy it is for us to move classes and views around when we use the **React** architecture.  The small, focused loosely coupled components that we have created give us the flexibility to accept changes in specifications with a minimum of disruption._

## App

We are going to fundamentally change the structure of our program. This means making changes to this JSX in App.js:

```javascript
<div className="App">
    <ElfHeader/>                        
    <GitUser/>
    <Micro/>
    <ApiFoo appInit={appInit}/>
</div>
```

## Add Menu

Let's add in the code in **ElfHeader** that defines the "visible" menu that the user will click on:

```javascript
// IMPORTS OMITTED HERE
import {Link} from "react-router-dom";


class ElfHeader extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Git User</Link>
                            </li>
                            // YOU WRITE LINKS FOR MICRO & APIFOO
                        </ul>
                    </div>
                    <img ...>
                    <h1 ...>
                </header>
            </div>
        );
    }
}

export default ElfHeader;
```

Here we are using the **react-router-dom** class called **Link** to help us create a link that behaves appropriately in this context. It will, for instance, turn the first two items into code that looks like this at run time:

```HTML
<li><a href="/">Home</a></li>
<li><a href="/api-foo">ApiFoo</a></li>
```

## Testing ElfHeader

We should wrap our Header in a **MemoryRouter** when doing the renders without crashing test:


```javascript
import {MemoryRouter} from "react-router-dom";

// CODE OMITTED

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ElfHeader /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
```


## Defining Routes

The final step involves defining what the application will do when the user clicks on a particular menu item. Here is the basic structure:

```JavaScript
import {BrowserRouter, Route} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <ElfHeader/>
                    <Route exact path="/" component={GitUser}/>
                    // YOU WRITE APIFOO AND MICRO
                </div>
            </BrowserRouter>
        );
    }
}
```

We do it like this for the home menu:

```HTML
<Route exact path="/" component={GitUser}/>
```

Note the user of the flag **exact**. This is necessary because a simple match on '/' will pass both '/' and '/api-foo'. In fact, it will match any URL beginning '/'. So we tell the router that we want an exact match.

I want you to have to figure out at least one of these routes on your own, so I will let you discover the solution for creating the Route to GetFoo. It isn't hard, so try not to over-complicate it.

The normal pattern is to define the path, and then the component:

```javascript
<Route path="/my-component" component={MyComponent}/>
```

You cannot, however, pass props to **MyComponent** the same way you can elsewhere in a React application. Instead, you use **render** instead of **component**, and the syntax looks like this in our case:

```javascript
<Route path="/api-foo"
    render={(props) => (
        <ApiFoo {...props}
            appInit={appInit} />
    )}
/>
```

We use this syntax because **react-router-dom** passes a certain number of props to a component by default, and we don't want to lose them. Here we use the [spread-operator](http://es6-features.org/#SpreadOperator) to pass the Router props and then we pass our own props.

Here is what it looks like in the debugger when working with a different component than the one we use in program:

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

[gf2]:https://s3.amazonaws.com/bucket01.elvenware.com/images/react-router-menu-git-user.png
[bf2]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-router-menu-no-style.png
[fapi]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-router-menu-styled.png

[gf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-home.png
[bf]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-barfoo.png
[sm]: https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-numbers.png

[lspn]: https://s3.amazonaws.com/bucket01.elvenware.com/images/small-number-props.png

[rrb]: https://reacttraining.com/react-router/web/example/basic

[spa]: https://en.wikipedia.org/wiki/Single-page_application
