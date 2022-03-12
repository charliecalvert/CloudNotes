---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/JavaScript/JavaScriptReactMenu.md
relativePath: elvenware/development/web/JavaScript/JavaScriptReactMenu.md
title: JavaScriptReactMenu
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
subject: JavaScript
---

<!-- toc -->
<!-- tocstop -->

# React Menus

Create Menus in a React Program.

## Install React Router {#router-install}

An npm package called [react-router-dom][rrd] can help us both route user selections through the application and also to switch between views.

When we switch between views we frequently display a particular component and hide other components. This kind of technology is often talked about as a [Single Page App, or SPA][spa]. The point being that we navigate to a single page, and then change the content of that page as the user makes selections. This may look to the user as if they are navigating between different pages, but in fact we are simply showing and hiding various portions of the page.

The first step is to install the library we will use to help us accomplish our goals:

```bash
npm install --save react-router-dom
```

[rrd]: https://www.npmjs.com/package/react-router-dom
[spa]: https://en.wikipedia.org/wiki/Single-page_application

## Theory

If you go to the address bar in the browser and type the following, it _will_ take you to the **AddressEdit** view:

- <http://localhost:3000/edit>

The idea is this: rather than use explicit calls to navigate through the features of our application, we are using URLs. Thus, the list item you quote near the end of your question does take you to your edit view.

To make all this happen, react-router-dom has to do a significant amount of hand waving. It does not, however, want you to have to understand exactly how it achieves its goal. Instead, it creates a declarative syntax. Here we declare what we want our menu to say, and what link (URL) should be associated with it:

```html
 <li><Link to="/edit">AdressEdit</Link></li>
```

Here we state exactly which component should be loaded when the link is called:

```javascript
<Route path="/edit" component={AddressChanger}/>
```

This may seem odd at first, but it is common paradigm in the web development world. For instance, Angular has a similar syntax for a similar system.

One of the advantages can be that that the URL can serve as a means of saving the history of where the user has been in case we want to move backwards in time and revisit pages the user has already visited. But that is a more advanced issue.

## Style the Menu

It's nice to style the menu. Here is a naive implementation good for simple menus or testing:

```css
ul {
    background-color: #8a6d3b;
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
}

li {
    float: left;
}

li a {
    color: white;
    display: block;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
}

li a:hover {
    background-color: #985f0d;
}
```

You can put this code in your CSS folder in a file called **menu.css**. Then link it in to the Component where define the menu:

```javascript
import '../css/menu.css';
```

Since we are linking our code into a very targeted component, it is unlikely that there will be another UL or LI in that file. As a result, we should change only the unordered list that contains our menu.

W3Schools has a nice [write up](https://www.w3schools.com/css/css_navbar.asp) on all this.

## Testing

Sometimes, in our tests, we want to simulate a menu selection. If we have several menu items, we want to test what happens when the user selects a particular menu item. What is rendered after the menu is selected? Is it the correct HTML?

Here is how to to use mount and test the HTML that is rendered when the user selects an item from the menu. Suppose you have component that looks something like this:

```javascript
import React, {Component} from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// BUNCH MORE IMPORTS

class DataMaven extends Component {
  constructor() {
    super();        
    // INITIALIZATION OMITTED HERE
  }

  // SOME METHODS OMITTED HERE

  render() {
    return (
      <BrowserRouter>
        <div>
          <ElfHeader/>
          <Route exact path='/' component={GetUserInfo} />
          <Route path='/get-foo' component={GetFoo}/>
          <Route path='/get-gist' component={GetGist}/>
          <Route path='/get-gist-list' component={GistLister}/>

          <Route path='/get-numbers'
            render={(props) => (
               <SmallNumbers {...props} numbers={numbersInit}/>
            )}
          />
        </div>
      </BrowserRouter>   
    );
  }
}

export default DataMaven;
```

Take the BrowserRouter/Router out of DataMaven.

```javascript
render() {
  return (
    <div>
      <ElfHeader/>
      <Route exact path='/' component={GetUserInfo} />
      <Route path='/get-foo' component={GetFoo}/>
      <Route path='/get-gist' component={GetGist}/>
      <Route path='/get-gist-list' component={GistLister}/>

      <Route path='/get-numbers'
        render={(props) => (
           <SmallNumbers {...props} numbers={numbersInit}/>
        )}
      />
    </div>
  );
}
```

Put it in your main component, which is usually called **index.js**:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import DataMaven from './components/DataMaven';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <div>
        <Router>
            <DataMaven/>
        </Router>
    </div>,
    document.getElementById('root')
);
```

Now write a test that uses the special **MemoryRouter** designed for this specific purpose. Here, for instance, is a test in **SmallNumbers.test.js**:

```javascript
import { MemoryRouter } from 'react-router';

fit('renders with DataMaven the SmallNumbers state.eight', () => {
    const wrapper = mount(
        <MemoryRouter initialEntries={['/get-numbers']}>
            <DataMaven />
        </MemoryRouter>
    );
    elfDebug.getAll(wrapper);
    const eightSign = <p className='App-intro'>state.eight: 0</p>;
    expect(wrapper.contains(eightSign)).toEqual(true);
});
```

The point here is that **MemoryRouter** has a property called **initialEntries** that can be used to specify the path you want to use in your test. The code above is therefore the equivalent of selecting **SmallNumbers** from the menu.

And here is the output from **elfDebugEnzyme**. In other words, this is the HTML generated by the **DataMaven** component:

```
SmallNumbers.test.js:
    <MemoryRouter initialEntries={{...}}>
      <Router history={{...}}>
        <DataMaven>
          <div>
            <ElfHeader>
               // I'M OMITTING THE CONTENTS OF ELFHEADER
            </ElfHeader>
            <Route exact={true} path="/" render={[Function]} />
            <Route path="/get-foo" component={[Function]} />
            <Route path="/get-gist" render={[Function]} />
            <Route path="/get-gist-list" render={[Function]} />
            <Route path="/get-numbers" render={[Function]}>
              // THE FOLLOWING SHOWS HOW SMALL NUMBERS IS EXPANDED
              <SmallNumbers match={{...}} location={{...}} history={{...}} staticContext={[undefined]} numbers={{...}}>
                <div className="App">
                  <p className="App-intro">
                    state.nine:
                    0
                  </p>
                  <p className="App-intro">
                    state.eight:
                    0
                  </p>
                  <button className="getNine" onClick={[Function]}>
                    Get Nine
                  </button>
                  <button className="getEight" onClick={[Function]}>
                    Get Eight
                  </button>
                </div>
              </SmallNumbers>
            </Route>
          </div>
        </DataMaven>
      </Router>
    </MemoryRouter>

```

Notice that only the **SmallNumbers** component is expanded, is active. This is why the test shown above passes:

```
PASS  src/__tests__/SmallNumbers.test.js
 My Small Numbers Tests
   ✓ renders with DataMaven the SmallNumbers state.eight (12ms)
   ○ renders initial value of paragraph with state.eight
   ○ renders initial value of paragraph with state.nine

Test Suites: 1 passed, 1 total
Tests:       2 skipped, 1 passed, 3 total
Snapshots:   0 total
Time:        0.199s, estimated 1s
Ran all test suites matching "SmallNumbers".

Watch Usage
› Press a to run all tests.
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press q to quit watch mode.
› Press Enter to trigger a test run.
```
