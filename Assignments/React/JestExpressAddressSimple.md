## Overview

Learn the basics of React Components and how to write to use [Jest][jest] to test them.

A deck not designed for this assignment but with some useful information is here:

- [http://bit.ly/jest-cra](http://bit.ly/jest-cra)

This document has some sections in it not found in deck, so view both documents.

## Install

**elf-express** is probably already on your system in **~/npm/bin**. That directory should be on your path in the default Pristine Lubuntu system.

If **elf-express** is not on your system, then install it like this:

```
npm install -g elf-express-generator
```

Make sure you are on the latest version:

    ncu -g

If any globally installed apps are outdated, then [ncu](https://www.npmjs.com/package/npm-check-updates) will explain how to update them.

## JsObjects Update

Make sure JsObjects is up to date:

    jo
    git pull

The first command takes you to the JsObjects directory. The second pulls down the most recent code.

## ENOSPC

When running tests, you may get an ENOSPC (Not Enough Space or something similar). Let's try to fix this problem up front. The explanation of what you need to do is here:

- [ENOSPC on Elvenware][enspc]

## Set the Default Port

Load your **.bashrc** file into an editor and ensure that this line appears near the bottom of the file, if it is not already there:

```bash
export PORT=30025
```

Some of our programs will use this as the default PORT on which to run.

## Get Started

Switch to your **master** branch, or whatever branch I've asked you to create in class.

- Navigate to the root of your repository
- Issue this command:
  - elf-express **weekxx-address-simple**, where xx is the number of the current week of this quarter.  
- Open up the project in WebStorm
- Set WebStorm to use JSX, React and ES6
  - **File | Settings | Languages and Settings | JavaScript | React/JSX**
- If you get lots of JsHint, EsLint or other errors, for now, just disable them:
  - File | Settings | Languages and Settings | JavaScript | Code Quality Tools Tools
  - We will turn on EsLint, but you don't need it immediately.

## Set up React

There are several steps needed to set up react.

1. Navigate to the **weekXX-address-simple** directory.
2. Run **npm i && bower install**
3. Install React: **npm i react react-dom**

Open up **views/index.pug** and insert this line just above the line that loads **bundle.js**:

    #root

This will ensure create an HTML **DIV** with an ID of **root** in your **index.html** file.

## Understanding React

Let's review the basics of React by writing some code in **control.js**. We start by importing react from **node_modules**:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
```

Recall that we used npm to install these files earlier in this assignment.

Next we place a class called **Go** inside our **onload** function:

```javascript
 class Go extends React.Component {
      // IMPLEMENTATION GOES HERE
 }
```

Here we use React class syntax to define a simple react component that extends the built-in **React.Component** class. In other words, our class inherits some functionality from a base class, but we are not going to examine that base class in any detail at this point.

Perhaps the first thing that you will notice about this class is that it contains something that looks a good deal like HTML. The HTML-like syntax used in React **render** methods is called JSX. React knows how to convert this HTML-like code into JavaScript code that generates HTML. In other words, your finished component does not have HTML embedded in it, rather it has JavaScript code for creating HTML.

Here is a very simple **render** method:

```html
render() {
    return (
        <p>The future depends on what you do today.</p>
    )
}
```

But just a class and a render method is not quite enough to make react work. We also need to load it, and insert it into the **root DIV** that we created in **index.pug**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

window.onload = function () {

    class Go extends React.Component {
        render() {
            return (
                <p>The future depends on what you do today.</p>
            )
        }
    }

    ReactDOM.render(
        <Go/>,
        document.getElementById('root')
    )
};
```

That last bit about **ReactDOM** first uses JSX to instantiate your **Go** component. Then it snags the **root** element using our old friend **getElementById**. React then inserts your **Go** component into the HTML DOM and your done. There's your first React Component in its entirety, along with code to load it.

Perhaps the most important line is this one: **<Go/>**. It might take you a day or two to see it, but this line of code says that your JavaScript class Component can be inserted into an HTML file just as if it were any other HTML element.

We are used to seeing the HTML P, DIV, IMG and BODY components. But there is no HTML **Go** component. The magic of JSX is -- in part -- that it allows you to create new components and treat them as if they were composable HTML.

Suppose you built three components similar to our Go component. Lets call them **Foo**, **Bar** and **Qux**.

Now you could compose them like this:

```javascript
class Go extends React.Component {
    render() {
        return (
            <div>
                <p>The future depends on what you do today.</p>
                <Foo />
                <Bar />
                <Qux />
            </div>            
        )
    }
}
```

Or like this:

```javascript
ReactDOM.render(  
  <div>
      <p>The future depends on what you do today.</p>
      <Foo />
      <Bar />
      <Qux />
  </div>,
    document.getElementById('root')
)
```

Notice that when I string multiple JSX components together I wrap them in a DIV. This is one of the **gotchas** of React. For instance, the **ReactDOM.render** method shown above takes two parameters. If you wrote this, then it would take five parameters:

```javascript
ReactDOM.render(  
      <p>The future depends on what you do today.</p>,
      <Foo />
      <Bar />
      <Qux />
    document.getElementById('root')
)
```

Don't do that. Wrap them in a DIV or some similar component. Here is a sample error of the type you might see if you make this mistake.

```html
ERROR in ./source/control.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
SyntaxError: control.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (16:8)

  14 |     ReactDOM.render(
  15 |         <Go/>
> 16 |         <Go />,
     |         ^
  17 |         document.getElementById('root')
  18 |     )
  19 | };
```

## Call the Server

Let's now insert a more complex component. Because this code could change, and because you are likely to need this code multiple times, I have put our default, Bellevue College **hello world** React component in a Gist:

- [control.js with a React Component]

The simplest way to get this file is with **get-gist**. Note however, that this will overwrite the existing **control.js** file in the source directory. If you are following along, then you don't have any overwhelming importnat custom code in that file. Still, you probably, want to move it out of the way first by renaming it to **Go.js**.

**NOTE**: _In the process, don't let WebStorm fool you into renaming code in webpack.config.js. The entry point for our program is **control.js**, not **Go.js**._

Here are the steps to get the default React control.js file:

- Navigate to the **source** directory
- Run get-gist
- Select **m** from the menu
  - React Control Cmponent for elf-express

Here is the menu:

    $ get-gist

    =======================
    Menu
    =======================

     Gists
      a) Run ESLintRc and Prettier (cdef)
      b) ElfDebugEnzyme
      c) .eslintrc
      d) .eslintignore
      e) prettier
      f) .prettierrc
      g) Default React Component
      h) Setup React Native Enzyme Npm
      i) Setup React Native Enzyme Yarn
      j) ElvenLogger
      k) Elven Node systemd Tools
      l) Elven Create Concurrently
      m) React Control Component for elf-express
      x) Exit

Now go to **routes/index.js** and insert a **foo** route:

```javascript
router.get('/foo', function(request, response) {
    response.send({'result': 'success'});
});
```

Now run your program and click on the button. It should say **Hello success** or something similar.

## Running Tests

Create a **source/control.test.js** as shown below. This is a test that allows you to see if the syntax in **App.js** is good enough to allow the component to be loaded.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Go from './control';

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<Go />, div);
   ReactDOM.unmountComponentAtNode(div);
});
```

Add a test line to state section in **package.json**:

```javascript
"scripts": {
  "start": "npx webpack --watch & nodemon ./bin/www",
  "build": "npx webpack",
  "test": "jest"
},
```

Install jest:

```javascript
npm i -D jest
```

Create or modify **.babelrc**. It belongs in the root of your project, along with **package.json** and **bower.json**:

```json
{
    "plugins": ["@babel/plugin-proposal-class-properties"],
    "presets": [
        "@babel/preset-react", "@babel/preset-env"
    ],
    "env": {
        "test": {
            "presets": ["@babel/preset-react", "@babel/preset-env"]
        }
    }
}
```

To run the tests, type: **npm test** in the project's root directory.

[Jest][jest] tests are in files with these extensions:

- *.test.js,
- *.spec.js
- or in a folder called **\_\_tests\_\_**
  - That's two underscores on either side of the word tests.


This test is built with [Jest][jest] library, but the syntax looks just like the very popular Jasmine library. In most cases, it also behaves much like Jasmine.

## Writing Tests

Let's update the default example by wrapping the test in a **describe** method:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Go from './Go';

describe('Jest Create React Tests', function () {

  it('renders without crashing', () => {
     const div = document.createElement('div');
     ReactDOM.render(<Go />, div);
     ReactDOM.unmountComponentAtNode(div);
  });

});
```

[jest]: https://facebook.github.io/jest/

## Enzyme

We need a tool to capture and parse the output created by our React components. We test that output to see if it is valid. The tool that helps us do this is airbnb's Enzyme.

To install it run these commands:

```
npm install --save-dev enzyme react-test-renderer
npm install --save-dev enzyme-adapter-react-16
```

I believe we no longer need to use **react-addons-test-utils**

## Enzyme Test of Component Output

Add this to your component: **<h1>React and Jest</h1>**

The updated tests shown below import **shallow** from enzyme. It grabs text from our component and then checks to see if the text is what we expect it to be.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Go from './control';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
configure({ adapter: new Adapter() });

describe('jest test', function() {

   it('renders without crashing', () => {
       const div = document.createElement('div');
       ReactDOM.render(<Go />, div);
       ReactDOM.unmountComponentAtNode(div);
   });

   it('renders and reads H1 text', () => {
       const wrapper = shallow(<Go />);
       console.log(wrapper.debug());
       const welcome = <h1>React and Jest</h1>;
       expect(wrapper.contains(welcome)).toEqual(true);
   });

});
```

Perhaps you are getting an error when you run these tests. You may be able to fix it by yourself, but let's learn how to use ElfDebugEnzyme to help you find the error.

What we are looking for is the H1 tag near the top of the JSX quoted above. Be sure you don't get tripped up over **H1** vs **H2** tag differences.

## Elf Debug Enzyme

Get a copy of my gist ElfDebugEnzyme and save it to a file with the same name (ElfDebugEnzyme.js):

- [Elf Debug Enzyme](http://bit.ly/elf-debug-enzyme)

**NOTE**: _The file is available via **get-gist**._

One way to save the file is to the choose the **Raw** button on GitHub, and then blockcopy the code. Now create a new file in WebStorm and paste in the code.

Now import **ElfDebugEnzyme** into your test:

```JavaScript
import ElfDebugEnzyme from '../ElfDebugEnzyme';

const elfDebugEnzyme = new ElfDebugEnzyme(true, 'App.test.js', true);
```

Use **ElfDebugEnzyme** to display the first H1 element:

```JavaScript
it('renders and reads H1 text', () => {
    const wrapper = shallow(<Go />);
    const welcome = <h1>React and Jest</h1>;
    elfDebugEnzyme.getFirst(wrapper, welcome.type, true);
    expect(wrapper.contains(welcome)).toEqual(true);
});
```

The key line is this one:

```JavaScript
elfDebugEnzyme.getFirst(wrapper, welcome.type, true);
```

First, note that in this case **welcome.type** will be **H1** because that is the type we are searching on. Thus the two following lines are equivalent:

```javascript
elfDebugEnzyme.getFirst(wrapper, welcome.type, true);
elfDebugEnzyme.getFirst(wrapper, 'h1', true);
```

But we prefer the first because it is DRYer. If you decide to search on an H2 instead of an H1, you need make the change in only one place.

The **elfDebugEnzyme** call is to its **getFirst** method. The code asks to see the contents of the first **H1** element generated by your React component. In our case, there is only one **H1** element, and it looks like this, when printed out by **ElfDebugEnzyme**:

```html
console.log src/ElfDebugEnzyme.js:66
  Caller: App.test.js:
  Debug value:
  <h1>
      React and Jest
  </h1>
```

Lets review the use of **find.type**. When using **ElfDebugEnzyme** I have we don't need to hard code in the element we are searching. Instead, use **type**.

This code is not as good as it could be because we hard code in the type when calling the second parameter of **getFirst**:  

```javascript
const find = <button>Test Foo Route</button>;        
elfDebugEnzyme.getFirst(wrapper, 'button');
```

This is better because **find.type** is automatically set to **button**:

```javascript
const find = <button>Test Foo Route</button>;        
elfDebugEnzyme.getFirst(wrapper, find.type);
```

The big advantage is that **find.type** automatically picks up on changes to **find**. If you change **button** to **input** there would be no need to change the call to Enzyme:

```javascript
const find = <input>Test Foo Route</input>;        
elfDebugEnzyme.getFirst(wrapper, find.type);
```

Try passing in **false** to the last parameter of the constructor for ElfDebugEnzume:

```javascript
const elfDebugEnzyme = new ELfDebugEnzyme(true, "Go.test.js", true);
```

Then you should get this kind of output with minor differences:

```javascript
console.log src/ElfDebugEnzyme.js:66
  Caller: App.test.js:
  Debug value:
  {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
          "className": "App-title",
          "children": "Welcome to React"
      },
      "_owner": null,
      "_store": {}
  }
```

The relevant code in **ElfDebugEnzyme** is simple enough. It asks enzyme to find the first matching H1 element and display the **debug** information associated with that element:


```javascript
wrapper.find(element).first().debug();
```

Once you know the HTML that is being generated, you can adjust your test to ensure that it properly matches the HTML. Or vice versa, depending on your needs and circumstances.

Watch the [ElfDebugEnzyme video](https://youtu.be/JCfN8OgmKXA)

Watch a [second video](https://youtu.be/Z44pG1w-ZiU) documenting additional updates.

## Constructor and State. {#constructor-state}

Once you know how to test for static HTML generated by your React component, then next step will be to test the dynamic code, the code that changes when you -- for instance -- press a button. Let's begin by looking at the **constructor** for your React component.

The **constructor** is a function on your component. React calls is it before it mounts the component. Call **super()** first or else extended React class will not be properly initialized.

```javascript
class App extends React.Component {
   constructor() {
       super();
       this.state = {
           result: 'unknown'
       }
   }
… etc
}
```

React will keep your state variables up to date in your UI if you display and play by certain rules. In particular, when you change these variable, use **setState** as described later in this chapter.

## In render, display the state {#display-state}

In our JSX, we:

- declare a paragraph element,
- Style it not with **class**, but with the JSX **className** attribute
  - This is to avoid a collision with the JavaScript **class** keyword.
- Display our **state** in a react expression defined with curly braces.

```html
<p>Hello: {this.state.result}</p>
```

## Define or Query {#define-getnine}

We declare an arrow function function in our component called **elfQuery**. Inside it, we call **setData**. In **setData** we call **setState**. The **setState** call can take an object literal defining the new state. It updates the state and causes the Component to refresh/re-render. More specifically, it causes the render method to be called by React.

```javascript
setData = (json) => {
    console.log('parsed json', json);
    this.setState(json);
};

elfQuery = (url, setData, event) => {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then((json) => {
            setData(json)
        })
        .catch(function (ex) {
            console.log('parsing failed, URL bad, network down, or similar', ex);
        });
};
```

**NOTE**: _In class we might have called **setData** by another name such as **setFooData**. If so, the best fix -- at least for now -- would probably be to change the name **setFooData** to **setData**._

## Create a Button {#render-state}

In our JSX, we:

- Declare a button
- Give it **_not_** an HTML **onclick** attribute, but a JSX **onClick** attribute
- And use a react expression, defined with curly braces, to call **elfQuery** when the button is clicked.

```html
<button className='elf' onClick={(e) => this.elfQuery('/foo', this.setData, e)}>Get Nine</button>
```

The **onClick** method is a crazy trick that is really very simple, but that looks confusing at first. Recalls that our onClick methods always get passed an **event** object that describes the event that triggered the firing of the onClick event. What we are doing here here is implementing the **onClick** handler in place, and then using the implementation of our handler to call the **elfQuery** method, passing the url of the rouite, and the method that we want to use to handle returned from the call to the server.

**NOTE**: _The technique for calling **elfQuery** contains a level of indirection. There are two methods calls where normally we would have just one. I believe it is a beginners mistake to get too exercised about the overhead of the extra function call. Here are the reasons I believe this to be true:_

- Developers, and particularly beginners, tend to spend a lot of time trying to optimize the wrong methods in their code. They think they know where bottlenecks will appear, and so they spend lots of time optimizing them. In most cases, they end up either making the code slower than it would have been had they left it alone, or saving a few nanoseconds that no one will ever miss. Don't try to optimize anything until you have proof delivered by a profiler showing that a method is taking too long. Don't guess, get proof. If you can't get proof, don't optimize. It just isn't worth it in 9,999 cases out of 10,000, especially in a course like this. Optimization is for experts working on massive projects. Don't do it!
- In modern compilers, the overhead of a function call is very small. Unless it appears in a loop that is called tens of thousands of times, it is likely not to be noticed by most users.
- When a user clicks on a button, the act of simply clicking the mouse takes much longer than a function call. Suppose it takes two hours for you to mow the lawn, and it takes five seconds for you to take a sip of water. It would be a sign of admirable discipline if you worked for two hours without taking a sip of water, but it is very unlikely that any one will notice the results of your sacrifice. The same applies to this case. It takes so long to click a button and display data, that the overhead of the extra method call is simply not worth fussing over. No one is going to notice it. It simply won't be detectable to the human eye.

## Test button click {#test-click}

Call the enzyme simulate method to simulate clicking the button. In this first test we simply check to see if the button click calls the **elfQuery** method in **Go.js**.

```javascript
it('proves button click works', () => {
    const jestFunc = jest.fn();
    const wrapper = shallow(<Go />);
    wrapper.instance().elfQuery = jestFunc;
    wrapper.find('button').simulate('click');
    expect(jestFunc).toHaveBeenCalledTimes(1)
});
```

We have replaced our original elfQuery function with a [jest mock function](https://jestjs.io/docs/en/mock-functions). We do this, because we don't want to have to mock up **fetch** itself, which is a bit tricky. So we get around that by mocking the entire elfQuery function. Then we simulate clicking our button and check to make sure that out mocked elfQuery function was called. As mentioned above, this proves that button click works, but it doesn't prove that we can handle the JSON we get from the server.

**NOTE**: _Perhaps we will mock **fetch** itself at some point in this class, but it is too early in the class to introduce that relatively complex subject._

Now that we know that our button works, our next step is to test whether we can parse the JSON we would get from a successful call to the server. In other words, we are assuming our call to fetch worked, and now we want to test if we can properly handled the result that was sent back to us from the server:

```javascript
it('should call setData with valid JSON causing component refresh', () => {
    const wrapper = shallow(<Go />);
    const result = <p>Hello foo test code</p>;
    wrapper.instance().setData({result: 'foo test code'});
    expect(wrapper.contains(result)).toEqual(true);
});
```

This code tests if our **setData** function can parse a simple object of the type sent back to us from our server. We pass the JSON to **setData** which then calls **this.setState** which causes the **render** function in our Go component to be called. After the call to **render**, the output produced by the following line of code in our **Go** component should be **Hello foo test code**:

```html
<p>Hello {this.state.result}</p>
```

To check that we are indeed seeing that code, we use this test:

```javascript
expect(wrapper.contains(result)).toEqual(true);
```

To summarize: We wanted to test whether our button click method can successfully call **elfQuery** and update our the output from our component. We did not want to actually call the real **elfQuery** method, however, because it contains a call to **fetch**. As a result, we mocked **elfQuery** and ran our first test, which proved that the button we clicked on called our fake **elfQuery** method. This proves that the button is declared correctly and can call our real **elfQuery** method. All we care about at this button is that the button can call **elfQuery**. Whether it calls the real **elfQuery** method or our mock method is a matter of indifference to us.

Next we checked that the JSON that would have been fetched by a real call to **fetch** can be handled properly by our call to **setData**.

These two tests complete the cycle: the first test proves the button click works, the second proves we can properly handle the data sent back from the server.

## Narrowing the Number of Tests

If you have just one test that is failing, try type **f** in the tests. That should show you only the failed test. To end the mode in which you see only the failed test, press **f** again.

Here is another approach. To run only a single test use **it.only** or **fit**:

```javascript
fit('renders button click message', () => {
   const wrapper = shallow(<App />);
   etc...   
})
```

With only:

```javascript
it.only('renders button click message', () => {
   const wrapper = shallow(<App />);
   etc...
})
```

**NOTE**: _When I write something like **etc...** or **and so on...** or **You write the code**, then I'm saying that I expect you to complete the code as an exercise. I usually cut and paste working code into a document like this, and then delete the parts I want readers to complete. I usually mark the missing code as described above._

## ESLint

Eslint should be installed globally in **~./npm/bin**. Use [get-gist][esrc] to get it.

Run it like this:

```bash
eslint .
```
To see my current working **.eslintrc.json** file, go [here][eslintrc].

## Turn it in

Place your work in your repository if it is not already there. If you aren't already working in master, merge your finished project into **master**.

Push your repository. Go to GitHub and ensure that the code you want to turn in is actually in your repository and that it contains the files and folders you expect it to contain.

Find the assignment on Canvas and submit it. Add text that states the name of the folder where you placed your assignment. A link to your folder on GitHub is nice.

## Test Output

I'm expecting the test output to look something like this:

```javascript
PASS  src/App.test.js
 jest test
   ✓ renders without crashing (4ms)
   ✓ renders and reads H1 text (3ms)
   ✓ renders button click message (1ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.364s, estimated 1s
Ran all test suites.

 console.log ElfDebugEnzyme.js:45
   App.test.js:
   <h1 className="App-title">
     Welcome to React
   </h1>

 console.log src/App.js:14
   state

 console.log ElfDebugEnzyme.js:45
   App.test.js:
   App.test.js:
   <p className="App-intro">
     File:
     'url-file.js'
   </p>

```

## Hint

Don't nest folders! There should be only one folder called **week05-address-simple** in your repository. It should be in the root of your repository.

- Correct: my-repo/week05-address-simple
- Wrong: my-repo/week05-address-simple/week05-address-simple

## The warnings

You are probably no longer getting these warnings, but just in case I will include a few notes about warnings I received.

**Warning**: **ReactTestUtils** has been moved to **react-dom/test-utils**. Update references to remove this warning.
**Warning**: **Shallow renderer** has been moved to **react-test-renderer/shallow**. Update references to remove this warning

For awhile, I was seeing warnings due to outdated **react-addons-test-utils** and **enzyme** modules. I believe Enzyme has solved these issues. If you see the warnings below, try updating these two packages:

```
npm uninstall react-addons-test-utils enzyme
npm install react-addons-test-utils enzyme
```


[eslintrc]: https://gist.github.com/charliecalvert/c5952541925c04479150bbd8c40feac6
[esrc]: https://www.elvenware.com/teach/assignments/react/ReactEsLint.html
[enspc]: https://www.elvenware.com/javascript-guide/JavaScriptReact.html#enospc
