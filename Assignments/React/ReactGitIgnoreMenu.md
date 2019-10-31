## Overview

Add a menu and client side routing. Begin refactoring into logical components.

We typically establish routes (endpoints) on our server. **react-router-dom** allows us to use the same type of technology not to call routes on the server, but to navigate between react components.

For instance we have used URLs like this to call endpoints on our server:

    /you-rang

With **react-router-dom** we can use a similar URL to switch from one React component to another. For instance, if we had a React component called **GetBranches**, we could use this URL to load it:

    /get-branches

In short React Router DOM is routing for the client.

## Setup

    npm i react-router-dom prop-types

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

## fetch with async-await {#fetch-async-await}

Change all your **fetch** methods to **async-await** as described [here][mdaa].

## Put You Rang in its Own Component

Create a third React component called **SystemEnvironmentYouRang**. Take the you rang code from GetBranches and put it there. Create a new menu item in App that instantiates it.

## Turn it in


[mdaa]: https://www.elvenware.com/teach/assignments/midterm-final/Isit320Midterm2019.html#fetchawait
