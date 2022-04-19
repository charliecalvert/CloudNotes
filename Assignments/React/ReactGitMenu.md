---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/React/ReactGitMenu.md
relativePath: Assignments/React/ReactGitMenu.md
title: ReactGitMenu
queryPath: Assignments/React/
subject: React
fileNameMarkdown: ReactGitMenu.md
fileNameHTML: ReactGitMenu.html
---


<!-- toc -->
<!-- tocstop -->

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

    elf-tagger "Before router dom menu" "week03-rest-basics"

Or:

    tag -a v0.X.X -m "Before building router dom menu in week04-docker-compose"

I often also start a **test** branch based on my working branch. I do my work there, and if I'm happy, I merge the changes back into my main working branch. If I got into to my trouble, I switch back to my working branch, delete the botched **test** branch, then start a new **test** branch and try again. If it is good this time, I merge it back into my working branch.

Delete: **git branch -d test**

## Install React Router

Read the [React Router Dom Install][rrdi] section from Elvenware then return to this document and install **react-router-dom** in the **client** directory.

    npm i react-router-dom

Be sure you have prop types:

    npm i prop-types;    

Optionally, consider installing a CSS library (I'm not doing this yet, myself)

Also install **material-ui**:

    npm i @material-ui/core @material-ui/icons

## Insert the new ElfHeader

Replace ElfHeader with the code in [this gist](https://gist.github.com/5cff61d7888cfd4097076835c5bc45c2.git).

You can download the tree of life into a directory called **source/images** like this:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/images/tree-of-life.png

There are three steps involved:

- Create the **images** directory
- Navigate into it
- Issue the **wget** command

Note that the Tree of Life is a PNG file, not an SVG. You should, therefore replace the extension in the appropriate line near the top of **ElfHeader** and play with the relative path to its location.

```javascript
import logo from './images/tree-of-life.png';
```

Here is the Tree of Life.

<img alt="Tree of Life" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/tree-of-life.png" class="sizer" />

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
                    <Route path="/git-user" component={GitUser}/>
                    // YOU WRITE APIFOO AND MICRO
                </div>
            </BrowserRouter>
        );
    }
}
```

And we will, in time do it like this for the home menu, where we use **exact path**:

```HTML
<Route exact path="/" component={Home}/>
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

## Load an Image

You can download the tree of life into a directory called **source/images** like this:

    wget https://s3.amazonaws.com/bucket01.elvenware.com/images/tree-of-life.png

There are three steps involved:

- Create the **images** directory
- Navigate into it
- Issue the **wget** command

Note that the Tree of Life is a PNG file, not an SVG. You should, therefore replace the extension in the appropriate line near the top of **ElfHeader** and play with the relative path to its location.

```javascript
import logo from './images/tree-of-life.png';
```

Here is the Tree of Life.

<img alt="Tree of Life" class="sizer" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/tree-of-life.png" />

Our create-react-app handles loading images for us, but if we were in an **elf-experss** app, to load the image, you need to add a new rule to webpack. The rule looks like this:

```javascript
{
    test: /\.(png|jpe?g|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {},
        },
    ],
}
```

The symtax in Webpack is tricky. Therefore I will show you the same code again, but this time in context. I'm trying to show you where in WebPack.config.js you want to put the next rule. It belongs in the **rules** property of the **module** section. So we do it like this:

```javascript
module: {
    rules: [
        {
            test: /.js?$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {},
                },
            ],
        }
    ]
}
```

Now there are two rules in webpack, one for loading babel and one for loading images.

The above needs to be done one time. After that, you can load images easily from your bundle. For instance, you can add this code to **App.js**:

```javascript
import logo from './images/tree-of-life.png';

<img src={logo} className="App-logo" alt="logo"/>
```

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

## Fill Menu

Your goal will be to fill in the menu for all the components we have created. When the program starts, none of them are visible, just the the area where we display data:

<img class="sizer" alt="Menu Open" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-open.png" />

**IMAGE**: The menu. First item is sort of home, the rest point to various components. (We will do login later. You can ignore it.)

<img class="sizer" alt="Home View no-size" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-empty.png" />

**IMAGE**: The home menu selected. (No components chosen)

<img class="sizer" alt="Qux" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-qux.png" />

**IMAGE**: Qux selected from menu

<img class="sizer" alt="Test Routes" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-test-routes.png" />

**IMAGE**: Test Routes selected from menu

<img class="sizer" alt="Git Menu no-size" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-get-gist.png" />

## Style the Menu

Read about it [here][rrdstm]

## Show All Fields of Git User

Run [the tests here][fct] to be sure that you are displaying a minimum number of fields from the User. These test check that you have created an element of some kind with an ID that corresponds to each of the fields that should be displayed. For instance, I'm checking that at minimum, you have something like this:

```javascript
<p id="login">Login: {body.login}</p>
```

The test is fairly loose. It does not check if the content of the node is correct. That would be difficult or impossible since everyone will have different content. But it does check that you have an element with the proper ID. You are, of course, expected to actually display the contents of the field in that element.

**NOTE**: _I'm deliberately keeping the type of the component unspecified to give you the freedom to design the page as you wish. I just want it to contain an element with a specific ID and I'm expecting you to use the element to display the appropriate field. For instance, the element could be a span, but the span should contain the relevant field from the User object returned by GitHub._

Something like this, but you are free to design it as you wish:

<img class="sizer" alt="React Git User Fields" src="https://s3.amazonaws.com/bucket01.elvenware.com/images/react-git-menu-get-user.png" />

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

- [ElfEnzymeDebug][eed]

<!--       -->
<!-- links -->
<!--       -->

[eed]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab

[fct]: https://github.com/charliecalvert/elven-sanity/blob/master/isit322-midterm-2019/client/Sanity.User.FieldChecks.test.js

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
