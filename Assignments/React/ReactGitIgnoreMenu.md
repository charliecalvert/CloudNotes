## Overview

Add a menu and client side routing. Begin refactoring into logical components.

We typically establish routes (endpoints) on our server. **react-router-dom** allows us to use the same type of technology not to call routes on the server, but to navigate between react components.

For instance we have used URLs like this to call endpoints on our server:

    /you-rang

With **react-router-dom** we can use a similar URL to switch from one React component to another. For instance, if we had a React component called **GetBranches**, we could use this URL to load it:

    /get-branches

In short React Router DOM is routing for the client.

## Setup

    npm i react-router-dom

## Free App Component {#free-app}

We need to repurpose **App.js** for use primarily by our new menu. As a first step, copy it to a file called **source/GetBranches.js**.

    cp App.js GetBranches.js

Now rename instances of **App** in **GetBranches**. For instance, the declaration for our component should now look like this:

    class GetBranches extends Component

You need to change the **export** statement as well.

While you are at it, go ahead and import it into **App.js**, or at least be away that you will need to do so at some point.

## Put Menu in App

Start by deleting all the code in the **App** component except for the framework of the **render** method:

```javascript
class App extends Component {

    render() {
        return ()
    }
}
```

Add this import statement:

```javascript
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
```

We are going to use these **react-router-dom** methods to build a simple menu that will allow us to navigate to the **GetBranches** module:

```javascript
class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <nav>
                    </nav>

                    <Switch>
                    </Switch>
                </div>
            </Router>
        )
    }
}
```

In the **nav** element, use the UL and LI elements to build a simple menu:

```javascript
class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/get-branches">Get Branches</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                    </Switch>
                </div>
            </Router>
        )
    }
}
```

Now, inside the **Switch** element, add a **react-router-dom** component called a **Route** and use it to navigate to **GetBranches**:

```javascript
class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/get-branches">Get Branches</Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path="/get-branches">
                            <GetBranches />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
```

## Refresh Issue

To get rid of potential bugs when you refresh a page that contains a React Router DOM URL, do this instead:

```javascript
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
```

The downside is that **HashRouter** creates URLs that contain hash characters (#), and some folks don't like that, and the technique is considered old-fashioned and on the way out. However, it is a simple what to ensure that you can refresh a page without getting an error and it allows you to pass a URL to another user so they start on a certain page.

- [Excellent discussion of Entire Topic](https://stackoverflow.com/a/36623117/253576)
- [Also of interest](https://stackoverflow.com/a/43470639/253576)
- [HashRouter Docs with warning](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md)

Finally, there is a simple fix that allows you to keep using **BrowserRouter** and create code that is not so old fashioned. To implement it, put this code in **main/router/index.js** just before the **module.exports** statement and after all the other options:

```javascript
router.get('/:id', function(req, res) {
    res.redirect('/');
});
```

This is the method I recommend for now. The downside is that hitting refresh on a React Router DOM URL sends you to the home page and it is bad for SEO. The upside is that it is easy to use and robust.

One could argue that in a SPA, going back to the home page on refresh is intuitive, if not ideal. The ultimate fix is to run React Router DOM on the server (server side rendering), but I find that solution too complex at this time.

## fetch with async-await {#fetch-async-await}

Change all your **fetch** methods to **async-await** as described [here][mdaa].

## Put You Rang in its Own Component

Create a third React component called **YouRang**. Take the **you rang** code from **GetBranches** and put it there. Delete the **you rang** code from **GetBranches**. Create a new menu item in App that instantiates it:

```JavaScript
<li>
    <Link to="/you-rang">You Rang</Link>
</li>
```

You will also need to modify your Switch:

```javascript
<Route path="/you-rang">
    <YouRang />
</Route>
```

## Turn it in

I will want branch, folder, and a tag if you have one. A commit ID would also work.

One strategy might be to do this work on a **week07** a branch and put the **my-midterm** project on your **midterm** branch. Note that having this code in your midterm is extra-credit.

[mdaa]: https://www.elvenware.com/teach/assignments/midterm-final/Isit320Midterm2019.html#fetchawait
