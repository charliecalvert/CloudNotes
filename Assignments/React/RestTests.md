# Rest Tests

This assignment is built on top of the [RestBasics] assignments. I'm assuming that you are working in a folder called **Week02-RestBasics** and that has both a **client** and **server** folder in it. If there is any doubt about the primary folder name, be sure to specify it when you turn in the assignment.

Install

Some notes on testing react

```
npm install --save-dev enzyme enzyme-adapter-react-16
npm install --save-dev react-test-renderer
npm test
```

We want to ensure that we get all of these tools set to use the same version. For instance, my dependencies in **package.json** now look like this:

```json
"dependencies": {
    "react": "^16.0.0",
    "react-dom": "^16.0.0",
    "react-scripts": "1.0.13",
    "whatwg-fetch": "^2.0.3"
},
"devDependencies": {
    "enzyme": "^3.0.0",
    "react-test-renderer": "^16.0.0"
}
```

After editing your package.json file, run the following commands:

```
npm install
npm outdated
```

If everything is up to date, **npm outdated** will return with no output. If it complains, you can update your **package.json** and run **npm install** again. See also [npm-check-updates](https://www.npmjs.com/package/npm-check-updates).

If you try the above, and the versions still look wrong, try something like this, where the versions are specified:

```
npm i --save react@16 react-dom@16
npm i --save-dev react-test-renderer@16
npm i --save-dev enzyme enzyme-react-adapter-16
```

## Render

If necessary, tweak your render method slightly. Notice that the state is set to a simpler object than in the previous version. Note that there are two paragraphs elements in the JSX. The portions of the code that changed now look like this:

```javascript
constructor() {
    super();
    this.state = {
        file: 'unknown',
        foo: 'waiting'
    };
}

// CODE OMITTED HERE....

render() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Welcome to React</h2>
            </div>

            <p className="App-intro">
                state: {this.state.foo}
            </p>
            <p className="App-intro">
                file: {this.state.file}
            </p>
            <button onClick={this.bar}>Bar</button>
        </div>
    );
}
```

## Configure Enzyme

Place this code at the top of app.test.js:

```javascript
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

## The Tests

Beneath this code add a **describe method** and a new test:

```javascript
describe('rest basic tests', function() {

    const elfDebugEnzyme = new ElfDebugEnzyme();

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });

    it('renders initial value of paragraph with state.nine', () => {
        const wrapper = shallow(<App/>);
        const nineSign = <p className="App-intro">file: unknown</p>;
        elfDebugEnzyme.getLast(wrapper, 'p', true);
        expect(wrapper.contains(nineSign)).toEqual(true);
    });

});
```

## Simple Debug Class

Some of you know that there is a relatively complete Enzyme debug object.

- [The original object saved as a gist on my GitHub account][enz-debug].
- Or clone it like this: https://gist.github.com/51daef341699943b07c9570c3ad2cbab.git

But all that is a bit heavyweight for this exercise. Instead, we can just use this simple ES6 class:

```javascript
class ElfDebugEnzyme {

    display(value) {
        console.log(value);
    }

    getLast(wrapper, element, showMe) {
        if (showMe) {
            const paragraphData = wrapper.find(element).last().debug();
            this.display(paragraphData);
        }
    }
}

export default new ElfDebugEnzyme();
```

Place this code in a file called **ElfDebugEnzyme.js**. At the top of **App.test.js**, reference the debug object:

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import elfDebugEnzyme from './ElfDebugEnzyme';
```

**NOTE**: _Make sure you don not end up with two **renders without crashing** tests._

## Call Server

```javascript
bar = () => {
    const that = this;
    fetch('/api/foo')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log('parsed json', json);
            that.setState(foo => (json));
        })
        .catch(function(ex) {
            console.log('parsing failed', ex);
        });
};
```

## Turn it in

Git **add**, **push** and **commit**. Put your work in a branch called **RestTest** and then Git **tag**.

[enz-debug]: https://gist.github.com/charliecalvert/51daef341699943b07c9570c3ad2cbab#file-elfdebugenzyme-js
