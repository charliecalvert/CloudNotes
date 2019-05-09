
# React Git Menu

The goals of this assignment are:

- Add **material-ui** to our application.
- Create a material-ui menu that uses [react-router][rrb]
- Use the menu to display and hide the GetGist code.

**NOTE** _I heavily rewrote this assignment on May 8, 2019. (The last commit before: 21246)._

## Menu

In this serious of screen shots you can see the menu, and the various views it provides. In particular, each view features one component, or one component and its child components. This is a [SPA][spa], or Single Page App.

TODO Add screenshots

**IMAGE**: The components folder

TODO Add screenshots

## Tag It

Before performing major surgery, I like to tag my code. You should push your work, then tag it with elf-tagger:

    elf-tagger "Before Matieral UI menu" "week03-rest-basics"

I often also start a **test** branch based on my working branch. I do my work there, and if I'm happy, I merge the changes back into my main working branch. If I got into to my trouble, I switch back to my working branch, delete the botched **test** branch, then start a new **test** branch and try again. If it is good this time, I merge it back into my working branch.

Delete: **git branch -d test**

## Install React Router

Read the [React Router Dom Install][rrdi] section from Elvenware then return to this document and install **react-router-dom** in the **client** directory.

    npm i react-router-dom

Also install **material-ui**:

    npm i @material-ui/core @material-ui/icons

Also, be sure you have prop types:

    npm i prop-types;    

## Insert the new ElfHeader

Replace ElfHeader with the code in [this gist](https://gist.github.com/5cff61d7888cfd4097076835c5bc45c2.git).

If the logo or App.css fight back, just comment them out. I'll probably cut them, but later.

Create a new file called **client/components/tileData.js** with the content from [this gist](https://gist.github.com/8df01550bb74683023d205a28321a70f.git)

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

## Defining Routes

The final step involves defining what the application will do when the user clicks on a particular menu item. Here is the basic structure with everything else temporarly stripped away from App.js:

**NOTE**: _Don't actually strip things out. Just look at what I have done here and leave your code alone.__

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

And we will, in time do it like this for the home menu, where we use **exact path**:

```HTML
<Route exact path="/" component={GitUser}/>
```

Note the user of the flag **exact**. This is necessary because a simple match on '/' will pass both '/' and '/api-foo'. In fact, it will match any URL beginning '/'. So we tell the router that we want an exact match.

I want you to have to figure out at least one of these routes on your own, so I will let you discover the solution for creating the Route to GetFoo. It isn't hard, so try not to over-complicate it.

The normal pattern is to define the path, and then the component:

```javascript
<Route path="/api-foo" component={ApiFoo}/>
```

You cannot, however, pass props to **ApiFoo** the same way you can elsewhere in a React application. Instead, you use **render** in place of **component**, and the syntax looks like this in our hypothetical case:

```javascript
<Route
    path="/api-foo"
    render={(props) => (
        <ApiFoo {...props}  appInit={appInit} />
    )}
/>
```

We use this syntax because **react-router-dom** passes a certain number of props to a component by default, and we don't want to lose them. Here we use the [spread-operator](http://es6-features.org/#SpreadOperator) to pass the **Router** **props** and then we pass our own **props**.

This transformation is tricky. Do it bit by bit. Start here with this familiar code:

```javascript
<ApiFoo appiInit={appInit} />
```

Wrap it in the react-route-dom **Route**:

```javascript
<Route
  <ApiFoo appiInit={appInit} />
/>
```

Add in path and the spread props:

```javascript
<Route
  path="/api-foo"
  <ApiFoo {...props} appiInit={appInit} />
/>
```

So far so good. Now here is the tricky part: add the **render** method:

```javascript
<Route
    path="/api-foo"
    render={(props) => (
        <ApiFoo {...props}  appInit={appInit} />
    )}
/>
```

If you need to pass additional props, do it like this:

```javascript
<Route
    path="/api-foo"
    render={(props) => (
        <ApiFoo
          {...props}  
          appInit={appInit}
          foo={fooInit}
          bar={barInit}
        />
    )}
/>
```

It looks a horror, but if you take it step by step it makes sense.

Here is what it looks like in the debugger when working with a different component than the one we use in program:

![Local Scope Props Numbers][lspn]

**IMAGES**: _You can see the **Sources** tab of Chrome Developer Tools_

I've run to a breakpoint on line 10 of **SmallNumbers.js**. At the bottom right we can see that **props** for SmallNumbers is in the **Local Scope**. The debugger displays our **Numbers** prop, along with three properties passed by the **react-router-dom**:

- history
- location
- match

They can come in useful in more advanced scenarios than the one we see here. In particular, they can help preserve history so the user can move back and forth through your site.

## Fill Menu

Your goal will be to fill in the menu for all the components we have created. When the program starts, none of them are visible, just the the area where we display data:

![Menu Open no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-open.png)

**IMAGE**: The menu. First item is sort of home, the rest point to various compoents. (We will do login later. You can ignore it.)

![Home View no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-empty.png)

**IMAGE**: The home menu selected. (No components chosen)

![Qux no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-qux.png)

**IMAGE**: Qux selected from menu

![Test Routes no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-test-routes.png)

**IMAGE**: Test Routes selected from menu

![Git Menu no-size](https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-get-gist.png)


**IMAGE**: Get Gist with material-ui buttons

## Material UI Buttons

Assuming that GetGist.js is a React Class Component, then a button looks like this:

```JavaScript
import React from 'react';
import Button from '@material-ui/core/Button';

// Code omitted here. Then inside of render:

<Button
    variant="contained"
    color="primary"
    data-url="/git-gist-you-rang"
    onClick={this.props.queryServer}>
    Ring Git Gist
</Button>
```

The properties are [pretty self explanatory](https://material-ui.com/demos/buttons/).

When using a material ui button, our **fetch** calls in **App.js** should use **event.currentTarget** rather than **event.target**. Fortunately, **currentTarget** works for regular buttons as well. For instance:

```javascript
queryServer = (event) => {
        const url = event.currentTarget.dataset.url;
        // Now call fetch
}
```

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

## Testing ElfHeader

I need to review this code. Don't try it yet but look for updates. We should wrap our **ElfHeader** in a **MemoryRouter** when doing the renders without crashing test:

There are two ways to test ElfHeader. Method one:

```JavaScript
it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElfHeader/>, div);
        //ReactDOM.render(<MemoryRouter><ElfHeader /></MemoryRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
```

More complex, but apparently no longer needed:    

```javascript
import {MemoryRouter} from "react-router-dom";

// CODE OMITTED

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><ElfHeader /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
```


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
