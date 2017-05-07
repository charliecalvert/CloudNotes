# Jest Create React App

By: _Charlie Calvert_

Jest with the npm packaged calld **create-react-app**

It is probably already on your system in ~/npm/bin. But if not:

```
npm install -g create-react-app
```

The accompanying deck is here: [http://bit.ly/jest-cra](http://bit.ly/jest-cra)

## Get Started

- Navigate to the root of your repository
- Issue this command:
- create-react-app week02-react-jest
- Set WebStorm to use JSX, React and ES6
- File | Settings | Languages and Settings | JavaScript | React/JSX
- If you get lots of JsHint, EsLint or other errors, for now, just disable them:
- File | Settings | Languages and Settings | JavaScript | Code Quality Tools


## Create a test

Open up src/App.test.js , shown below. This is a test that allows you to see if the syntax in App.js is good enough to allow the component to be loaded.

To run the tests, type: **npm test** in the project's root directory.

Jest tests are in files with these extensions:

- *.test.js,
- *.spec.js
- or in a folder called **\_\_tests\_\_**
  - That's two underscores on either side of the word tests.

A simple test:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<App />, div);
});


Put Code in Suite with describe
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('Jest Create React Tests', function () {

   it('renders without crashing', () => {
       const div = document.createElement('div');
       ReactDOM.render(<App />, div);
   });

});
```


## Enzyme

Install it:

```
npm install --save-dev enzyme react-test-renderer
npm install --save-dev react-addons-test-utils
```

We need a tool to capture and parse the output created by our React components. We test that output to see if it is valid. The tool that helps us do this is airbnb's Enzyme.

**Warning**: **ReactTestUtils** has been moved to **react-dom/test-utils**. Update references to remove this warning.
**Warning**: **Shallow renderer** has been moved to **react-test-renderer/shallow**. Update references to remove this warning

For awhile, I was seeing warnings due to outdated **react-addons-test-utils** and **enzyme** modules. I believe Enzyme has solved these issues. If you see the warnings below, try updating these two packages:

```
npm uninstall react-addons-test-utils enzyme
npm install react-addons-test-utils enzyme
```

## Enzyme Test of Component Output

The updated tests shown below import **shallow** from enzyme. It grabs text from our component and then checks to see if the text is what we expect it to be.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('jest test', function() {

   it('renders without crashing', () => {
       const div = document.createElement('div');
       ReactDOM.render(<App />, div);
   });

   it('renders and reads H1 text', () => {
       const wrapper = shallow(<App />);
       const welcome = <h2>Welcome to React</h2>;
       expect(wrapper.contains(welcome)).toEqual(true);
   });

});
```

## Add a constructor and declare some state. {#constructor-state}

The constructor is a function on your component. React calls is it before it mounts the component. Call super() first or else the this variable will not be valid in the constructor.

```javascript
class App extends Component {
   constructor() {
       super();
       this.state = {
           nine: '0'
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
- Display our state in a react expression defined with curly braces.

```html
<p className="App-intro">Nine: {this.state.nine}</p>
```

## Define a function called getNine {#define-getnine}

We declare an arrow function function in our component called getNine. Inside it, we call setState. Set state can take an object literal defining the new state.

```javascript
getNine = () => {
   console.log('state');
   this.setState({nine: '9'})
};
```

## In render, display the state {#render-state}

In our JSX, we:

- Declare a button
- Give it **_not_** an HTML **onclick** method, but a JSX **onClick** attribute
- And use a react expression, defined with curly braces, to call **getNine** when the button is clicked.

```html
<button className='elf' onClick={this.getNine}>Get Nine</button>
```

## Test button click {#test-click}

It's time to write some unit tests with Jest.

Call the enzyme simulate method to simulate clicking the button. Check to see if the form now contains the value we expect it to contain. In other words, check that the button click method worked.

```javascript
it('renders button click message', () => {
   const wrapper = shallow(<App />);
   const nineSign = <p className="App-intro">Nine: 9</p>;
   wrapper.find('button.elf').simulate('click');
   expect(wrapper.contains(nineSign)).toEqual(true);
});
```

To run only a single test use **it.only** or **fit**:

```javascript
fit.only('renders button click message', () => {
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

**NOTE**: _When I write something like **etc...** or **and so on...** or **You write the code**, then I'm saying that I expect you to complete the code as an exercise. Occasionally students who are not used to my style think I'm being lazy or writing code that has not been tested. This is generally not the case. I cut and paste working code into a document like this, and then delete the parts I want readers to complete. I usually mark the missing code as described above._

## Turn it in

Place your work in your repository in a folder called **Week02-ReactJest** if it is not already there.

## Hint

Don't nest folders! There should be only one folder called **Week02-ReactJest** in your repository. It should be in the root of your repository.

- Right: my-repo/Week02-ReactJest
- Wrong: my-repo/Week02-ReactJest/Week02-ReactJest

Push your repository. Go to GitHub/BitBucket and ensure that it is actually in your repository and that it contains the files and folders you expect it to contain.

Find the assignment on Canvas and submit it. Add text that states the name of the folder where you placed your assignment. A link to your folder on GitHub/Bitbucket is nice.

For most of the assignments, I'll just say something like: "Put your work in your repo and push," or simply "Push your work". That's a shorthand for something along the lines of what I'm saying here.
